---
layout: post
title:  "Una plataforma de contenido"
date:   2015-07-04 15:30:00
categories: mumuki tech plataforma guia contenido ejercicios categorias
---

> Mumuki es una plataforma de contenido. Conozcamos entonces mejor cómo se organiza.

La plataforma Mumuki es el corazón del proyecto Mumuki. Y ahora nos toca describirla. ¿Qué es? ¿Para qué sirve? ¿Con qué está hecho? ¿Daña la capa de ozono?

Podemos decir muchas cosas bonitas (¡y ciertas!) sobre la plataforma:

 * es gratuita
 * es libre
 * es Web
 * sirve para aprender a programar
 * soporta [varios lenguajes](https://github.com/mumuki/mumuki-platform/wiki/Runners-Status) (5 oficiales, mas dos extra-oficiales)

Pero nada de esto nos dice qué es lo que hace. O en qué otros contextos podríamos usarla. Y esto es importante, porque **al ser una plataforma de código abierto, quizás, vos, ahora, que estás leyendo, podrías encontrarle un nuevo y fantástico uso**.

Así que despojémosla de su semántica y aplicación y vayamos a su esencia:

## La plataforma Mumuki es un CMS

(...un CMS muy especial)

La plataforma es escencia un [CMS (Sistema Gestor de Contenido)](https://en.wikipedia.org/wiki/Content_management_system) especializado en _[problemas](https://en.wikipedia.org/wiki/Problem_solving)_. Como cualquier CMS, permite

  * Cargar contenido
  * Administrar contenido
  * Compartir contenido

Pero la novedad está en que el contenido es interactivo: los usuarios no sólo podemos consultar los problemas, sino también:

 * Presentar una solución al problema
 * Obtener feedback de esa solución
 * Guardar la solución

Este formato de contenido es ideal para describir, por ejemplo, problemas de matemática, física, ajedrez, programación: en la plataforma cargaremos tanto la enunciación del problema, como las reglas para evaluar las soluciones; luego un usuario podrá proponer sus soluciones y tener un feedback inmediato sobre las mismas.

Es una idea simple. Y es justamente esta simpleza la que le otorga su flexibilidad. Con la plataforma Mumuki podemos fácilmente crear distintos tipos de contenido interactivo:

  * apuntes
  * guías de ejercitación
  * prácticas
  * exámenes
  * desafíos
  * juegos
  * competencias

¿Cómo se organiza este contenido? En términos de ejercicios, guías y categorías. Veamos qué representa cada uno.

## Ejercicios

El ejercicio es la mínima unidad de contenido: se trata de una descripción de un problema y una forma de evaluarlo.

Un ejercicio se estructura de la siguiente forma:

* Un título
* Una descripción del problema
* Ayudas al usuario, que complementan la descripción pero no se visualizan hasta que el usario lo solicite
* Un corolario: contenido que se muestra al usuario recién cuando ha resuelto el problema.
* Palabras claves, utilizadas para buscar más fácilmente al ejercicio


Con toda esta información, la plataforma puede presentar al usuario un problema, sin problemas (¡cuack!).

Pero ¿cómo hace para evaluar las soluciones?

Bueno, acá nos tenemos que meter en detalles un poco más técnicos. Al cargar un ejercicio también debemos especificar:

* _código_ extra: herramientas que el usuario puede utilizar al escribir su solución. Pueden ser fruto de ejercicios anteriores o simplemente **partes del problema que el autor quiera facilitar**.
* Una forma de evaluar **si la solución resuelve el problema**. La plataforma soporta dos técnicas complementarias:
  * Pruebas: evalúan que la solución resuelva el problema de forma correcta, es decir, **que llegue a un resultado esperado**.
  * Objetivos: evalúan que la solución resuelva el problema de forma adecuada, es decir, **que se utilicen las herramientas correctas**.

Probablemente estés pensando: ¿Pruebas, objetivos, _código_ extra? ¡En español por favor!

Acá el punto importante es que la forma específica de escribir estas reglas para evaluar tus ejercicios las ponés vos.

El proyecto Mumuki ofrece algunas, pero es probable que vos quieras agregar las tuyas. Por tanto, si sos programador, te recomendamos que leas [extendiendo Mumuki: Runners](/mumuki/tech/plataforma/runners/lenguaje/2015/06/22/extendiendo-mumuki-runners/).

Y si no lo sos, y tenés ganas de que soportemos algún tipo de ejercicio nuevo, [contactanos](mailto:info@mumuki.org).

## Guías

Para plantear un problema más largo o complejo, contamos con la guía: una secuencia lógica de ejercicios, de menor a mayor complejidad.

Una guía debe tener un hilo conductor, ya sea

* conceptual: todos los ejercicios están orientados a practicar un mismo concepto.
* o de _dominio_: todos los ejercicios describen una situación común. Por ejemplo, todos los problemas planteados ocurren en una granja.

La plataforma Mumuki diferencia dos tipos de guías:

* de aprendizaje: están orientadas a exponer un tema, antes que evaluarlo.
* de desafío: están orientadas a practicar o evaluar un tema.

Y al igual que los ejercicios, las guías presentan:

* una descripción
* un corolario, que se visualiza únicamente al terminar la guía
* _código_ extra, que está disponible a todos los ejercicios de la guía

Si bien no hay límite de ejercicios por categoría, empíricamente hemos llegado a la conclusión de que una buena guía debe tener entre 10 y 20 ejercicios.

## Categorías

Y finalmente llegamos a las categorías. Esta idea es la más simple de todas: se trata de una secuencia de guías sobre un mismo tema.

Categorías posibles son: "Programación funcional", "Álgebra", "Ajedrez".

Empíricamente hemos llegado a la conclusión de que una buena categoría debe tener entre 3 y 10 guías (¡lo que significa hasta 200 ejercicios por categoría!).


## En resúmen

Como vimos, la plataforma Mumuki es un sistema Web de gestión de contenidos, extensible y orientado a problemas.

Aquí explicamos cómo el contenido se organiza en torno a ejercicios, guías y categorías.

Pero a propósito obviamos ciertos detalles técnicos (¿En qué formato se escriben los enunciados? ¿Cómo se suben a la plataforma?) y didácticos (¿Cómo escribir un buen ejercicio?).

Estas y otras preguntas las responderemos en próximos artículos. ¡Quedate atento!



