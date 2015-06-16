---
layout: post
title:  "El Lenguaje de expectativas"
date:   2015-06-16 19:09:00
categories: expectativas plataform
---

En la [plataforma Mumuki](http://mumuki.io) para evaluar las soluciones que los usuarios envían utilizamos varias técnicas:

  1. pruebas automatizadas
  1. análisis sobre el código (lo que llamamos _expectativas_)
  1. análisis combinado (lo que llamamos _feedback_, aún en desarrollo)

Hoy vamos a hablar de la segunda forma: las expectativas.  

La idea es simple: queremos poder saber si una solución utiliza ciertas herramienas conceptuales, que en un análisis puro basado en pruebas automatizadas sería imposible. La forma de implementarlas depende del lenguaje, pero tenemos básicamente dos enfoques principales:

* Análisis del [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree), utilizando un parser
* Análisis del metamodelo, utilizando metaprogramación

Por si fuera poco, este análisis requiere

* que sus resultados sean comprensibles para el usuario final, en su idioma
* que sea simple de describir

Por eso lo que hemos creado es un lenguaje muy simple de inspecciones: consultas booleanas sobre un identificador del programa (llamado `binding`. Con lo que nos queda `expectativa = (binding, inspection)`.

## Inspecciones disponibles 

|Inspection|Significado|Lenguajes Soportados|
|----------|:----------|:-------------------|
|HasBinding|Existe el identificador (función, variable, método, predicado, clase, etc)|Haskell, Prolog, Gobstones|
|HasComposition|El identificador usa composicion|Haskell|
|HasComprehension|El identificador usa listas por comprensión|Haskell|
|HasConditional| El identificador debe utilizar condicionales|Haskell|
|HasDirectRecursion| El identificador debe emplear recursión|Haskell, Prolog|
|HasGuards| El identificador usa guardas|Haskell|
|HasIf| El identificador usa if|Haskell|
|HasLambda| El identificador debe emplear expresiones lambda|Haskell|
|HasRedundantBooleanComparison| El identificador hace comparaciones booleanas innecesarias|Haskell|
|HasRedundantGuards| El identificador tiene guardas innecesarias|Haskell|
|HasRedundantIf| El identificador tiene ifs innecesarios|Haskell|
|HasRedundantLambda| El identificador tiene lambdas innecesarias|Haskell|
|HasRedundantParameter| El identificador tiene parámetros innecesarios (se pueden eliminar mediante point-free)|Haskell|
|HasRepeatOf:_target_| El identificador usa una repetición simple de _target_ ciclos |Gobstones|
|HasTypeDeclaration|El identificador existe y es un sinónimo de tipo|Haskell|
|HasTypeSignature|El identificador usa firma de tipo|Haskell|
|HasForall|El identificador usa forall|Prolog|
|HasFindall|El identificador usa findall|Prolog|
|HasNot|El identificador usa not|Prolog|
|HasUsage:_target_| El identificador utiliza el identificador _target_|Haskell, Prolog, Gobstones|
|HasWhile| El identificador utiliza repetición condicional|Gobstones|
  
## Generalidades

### Inspecciones con argumentos

Como se aprecia en el cuadro anterior, la mayoría de las inspecciones no toman argumentos, pero algunas, como `HasUsage` requieren uno. Así, por ejemplo, la inspección de _usa el identificador en su definición a identificador foo?_ se escribe `HasUsage:foo`

### Expectativas locales vs globales

Las expectativas que describimos hasta ahora son un par `(binding, inspection)`; se tratan de expectativas _locales_. 

Sin embargo, la plataforma también puede ejecutar expectativas _globales_, que se componen de sólamente una inspección, y analizan si algún identificador cumple una propiedad. Por ahora, no es posible escribir estas expectativas en los ejercicios de Mumuki, y se reservan sólo para expectativas implicitas (ver más abajo)

### Expectativas explícitas vs Implícitas

La mayoriai de las inspecciones se ejecutan sólo si son especificadas en el ejercicio, pero algunas se ejecutan siempre (típicamente para detectar code smells). A las primeras expectativas se les dice explícitas, mientras que a las segundas, implícitas. 

Como regla general, las inspecciones de la forma `HasRedundant*` **no deberían** ser utilizadas en expectativas explícitas, ya que suelen ser utilizadas de forma implícita, negada (ver más abajo) y global por el runner. 

### Negación de inspecciones

Toda inspeccion puede ser negada anteponiendo `Not:`. Por ejemplo:

*  `Not:HasBinding` se debe leer como _¿es cierto que no existe el identificador?_
*  `Not:HasUsage:bar` se debe leer como _¿es cierto que el identificador no utiliza a bar?_

### Defaults

Todo runner debe soportar recibir exectativas con inspecciones que no soporta; ante este escenario, el runner debe indicar que **se cumplió la expectativa**.

### Transitividad

El lenguaje no especifica si la inspección será evaluada solo para el identificado o también para los identificadores que utiliza (inspección transitiva), y queda librado a la implementación de cada runner. Sin embargo, es posible que en el futuro se modifique el lenguaje para soportar esto. 
