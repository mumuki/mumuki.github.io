---
layout: post
title:  "Extendiendo Mumuki: Runners"
date:   2015-06-22 20:30:00
categories: mumuki tech plataforma runners lenguaje
author: flbulgarelli
---

> [Mumuki](http://es.mumuki.io) es una plataforma extensible: agregar soporte para tu lenguaje favorito es muy simple.
>
> En este artículo vamos a contar justamente cómo hacer eso. Pero primero, repasemos rápidamente la arquitectura de Mumuki.


## Arquitectura Mumuki

### La plataforma

El corazón de Mumuki es su plataforma: una aplicación [Ruby on Rails](http://rubyonrails.org/), **stateful** que permite la carga de ejercicios y guías, y el envío de soluciones a los problemas. ¿Pero cómo hacemos para poder validar los ejercicios, escritos en lenguajes tan diversos como Haskell, [Gobstones](http://www.gobstones.org/), o Ruby? Acá entran en escena los _test runner servers_, o simplemente, _runners_.

### Los _runners_

Un runner es simplemente un servidor HTTP, **stateless**, responsable de evaluar las soluciones.

Para cada lenguaje en la plataforma, existe un runner asociado, identificado mediante su URL.

Cada vez que es necesario validar una solución, en función del lenguaje del ejercicio, Mumuki elige la URL correspondiente y se comunica con el runner.

Ahora bien, ¿qué significa "evaluar las soluciones"? ¿Cuáles son las responsabilidades en detalle de un runner?

### Responsabilidades de los _runners_

En lo que concierne a la evaluación de soluciones, un ejercicio Mumuki consta de:

  * **Código extra**, que es código que se cargará al evaluar las soluciones pero que el usuario no puede ver. Este código está escrito, obviamente, en el mismo lenguaje del ejercicio.
  * Una suite de **tests**, expresada en el lenguaje y framework de testing que el runner soporte (que normalmente coincide con el lenguaje del ejercicio, aunque Gobstones es una excepción notable).
  * Cero o más **expectativas**: una lista de pares `(binding, inspection)` valor que indican objetivos que la solución debe cumplir. Más información [aquí](http://mumuki.org/expectativas/plataform/2015/06/16/el-lenguaje-de-expectativas.html).

Un runner deberá entonces procesar estos tres elementos junto a la solución del alumno, y generará los siguientes resultados:

  * La **salida** del framework de test, en cualquiera de los siguientes formatos: texto plano, markdown o html. Esta información es **obligatoria**
  * Un indicador de **éxito** de las pruebas: `passed` o `failed`. Esta información es **obligatoria**
  * Los **resultados de las expectativas**: una lista de cero o más pares `(expectation, result)`, donde `result` es simplemente un booleano. Esta información es **opcional**
  * **Feedback**: explicación humana de los errores y propuesta de solucion. Esta información es **opcional**

Ahora que entendimos lo que la plataforma y runners intercambian, analicemos el protocolo de comunicación.

## El protocolo

Toda la interacción entre plataforma y runner es via HTTP, y pasa por una única ruta:

```
POST /test
```

La cual espera un JSON como _body_ del pedido, y debe retornar un JSON como respuesta, con código 200.

### JSON de pedido

{% highlight json %}
{
 "locale": "en|es",
 "content": "...the submission...",
 "test": "...the test code ...",
 "extra": "...extra code...",
 "expectations": [
    {"binding":"..the binding...", "inspection": "...the inspection..."},
    ...
 ]
}
{% endhighlight %}

El protocolo es bastante autodescriptivo:

* `content` es la solución que envió el usario. Su procesamiento es **obligatorio**.
* `test` es el código del test. Su procesamiento es **obligatorio**.
* `extra` es el código extra, si lo hubiera, o un string vacío, en caso contrario. Su procesamiento es **opcional**: un runner puede ignorar este campo, aunque se recomienda fuertamente soportarlo.
* `expectations`, es la lista de expectativas (vacía si no las hubiera). Su procesamiento es **opcional**.
* `locale`, es el idioma en que está el enunciado del ejercicio. Su procesamiento es **opcional**; si se lo procesa el runner deberá generar la salida de test y feedback en el idioma indicado.

### JSON de salida:

{% highlight json %}
{
  "exit":"passed/failed",
  "out":"....the test runner raw output ...." ,
  "feedback": "...the runner feedback....",
  "expectationResults": [
    {"expectation":{"binding":"..the binding...", "inspection": "...the inspection..."}, "result":true/false},
    ...
  ]
}
{% endhighlight %}

Como se comentó más arriba, el feedback y resultados de expectativas son opcionales. Devolver un string vacío y una lista vacía en caso de que el runner no lo soporte es suficiente.

### Consideraciones sobre seguridad

Es importante que un runner no permita ejecución de código arbitrario, para su propia seguridad. En este sentido, deberá prestar atención a:

  * Evitar procesamientos durante períodos largos: debería abortarlo si excede los 3 segundos de ejecución totales
  * Evitar consumo excesivo de memoria: debería abortar el programa si empieza a consumir "grandes" cantidades de memoria.
  * Evitar acceso a recursos compartidos como file system e interfaces de red.


## Implementación

En general, la implementación básica de un runner consiste en concatenar los tres fragmentos de código (solución, extra y test), persistirlo en un archivo temporal y ejecutarlo contra un test runner como [junit](http://junit.org/) o [rspec](http://rspec.info/).

Sin embargo, muchas veces deberemos ponerle un poco más de amor:

 * algunas tecnologías requieren un tratamiento más complejo del código antes de ser testeado: agregar imports, headers, compilar a bytecode, etc.
 * cuanto más soporte agreguemos para las características opcionales, mejor será la información retornada al usuario final.

En ese sentido, runners más sofisticados deberán:

 * contar con alguna herramienta de metaprogramación o parsers para poder realizar el análisis de expectativas y code smells (`expectationResults`)
 * analizar las entradas, resultados intermedios y salidas para poder detectar errores comunes y dar información sobre ellos (`feedback`)

## Ejemplos

> Ya hablamos mucho. ¡Quiero ver código!

Acá hay algunos ejemplos:

 * [mocha-server](https://github.com/mumuki/mumuki-mocha-server)
 * [hspec-server](https://github.com/mumuki/mumuki-hspec-server)
 * [rspec-server](https://github.com/mumuki/mumuki-rspec-server)
 * [plunit-server](https://github.com/mumuki/mumuki-plunit-server)


## Lo que se viene

Conforme avanza la plataforma, el protocolo de comunicación se irá complejizando, buscando siempre compatibilidad hacia atrás. Algunos agregados futuros incluirán:

  * Agregado de una nueva ruta `/query` para realizar evaluar expresiones al vuelo.
  * Resultados estructurados: posibilidad de retornar resultados de los tests en formato JSON
  * Agregar `aborted` a los indicadores de éxito `passed` y `failed`


## Mumukit

Si bien implementar un runner básico desde cero es relativamente sencillo, para poder soportar las funcionalidades más avanzadas es necesario más trabajo, y la complejidad del runner aumenta.

Por eso creamos gemas para simplificar el proceso de construcción de runners implementados en Ruby:

  * [mumukit](https://github.com/mumuki/mumukit): framework minimalista para crear runners con un mínimo esfuerzo, sin tener que preocuparse por la interacción HTTP.
  * [mumukit-inspection](https://github.com/mumuki/mumukit-inspection): parser para el lenguaje de expectativas
  * [mumukit-bridge](https://github.com/mumuki/mumukit-bridge): conector http que es usado por la plataforma para interactuar con los runners; útil para realizar pruebas de integración


En un próximo articulo, hablaremos sobre cómo implementar un runner usando mumukit.

