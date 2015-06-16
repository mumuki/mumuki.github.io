En la [plataforma Mumuki](http://mumuki.io) para evaluar las soluciones que los usuarios envían utilizamos varias técnicas:

  1. pruebas automatizadas
  1. análisis sobre el código (lo que llamamos _expectativas_)
  1. análisis combinado (lo que llamamos _feedback_, aún en desarrollo)

Hoy vamos a hablar de la segunda forma: las expectativas.  

La idea es simple: queremos poder saber si una solución utiliza ciertas herramienas conceptuales, que en un análisis puro basado en pruebas automatizadas sería imposible. La forma de implementarlas depende del lenguaje, pero tenemos básicamente dos enfoques principales:

* Análisis del [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree), utilizando un parser
* Análisis del metamodelo, utilizando metaprogramación

Por si fuera poco, este análisis requiere


|Inspection|Significado|Lenguajes Soportados|
|----------|:----------|:-------------------|
|HasBinding|Debe existir el identificador (función, variable, método, predicado, clase, etc)|Haskell, Prolog, Gobstones|
|HasComposition|El identificador debe usar composicion|Haskell|
|HasComprehension|El identificador debe usar listas por comprensión|Haskell|
|HasConditional| '%{binding} %{must} utilizar condicionales (guardas/if)'
|HasDirectRecursion| '%{binding} %{must} emplear recursión'
|HasGuards| '%{binding} %{must} usar guardas'
|HasIf| '%{binding} %{must} usar if'
|HasLambda| '%{binding} %{must} emplear expresiones lambda'
|HasRedundantBooleanComparison| '%{binding} hace comparaciones booleanas innecesarias'
|HasRedundantGuards| '%{binding} tiene guardas innecesarias'
|HasRedundantIf| '%{binding} tiene ifs innecesarios'
|HasRedundantLambda| '%{binding} tiene lambdas innecesarias'
|HasRedundantParameter| '%{binding} tiene parámetros innecesarios (se pueden eliminar mediante point-free)'
|HasRepeatOf| '%{binding} %{must} usar una repetición simple de %{target}'
|HasTypeDeclaration| '%{must} existir una declaración para el sinónimo de tipo %{binding}'
|HasTypeSignature| La firma para %{binding} %{must} ser declarada
|HasUsage| '%{binding} %{must} utilizar %{target}'
|HasWhile| '%{binding} %{must} utilizar repetición condicional (sentencia <i>while</i>)'
  
