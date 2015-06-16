En la [plataforma Mumuki](http://mumuki.io) para evaluar las soluciones que los usuarios envían utilizamos varias técnicas:

  1. pruebas automatizadas
  1. análisis sobre el código (lo que llamamos _expectativas_)
  1. análisis combinado (lo que llamamos _feedback_, aún en desarrollo)

Hoy vamos a hablar de la segunda forma: las expectativas.  

La idea es simple: queremos poder saber si una solución utiliza ciertas herramienas conceptuales, que en un análisis puro basado en pruebas automatizadas sería imposible. La forma de implementarlas depende del lenguaje, pero tenemos básicamente dos enfoques principales:

* Análisis del [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree), utilizando un parser
* Análisis del metamodelo, utilizando metaprogramación

Por si fuera poco, este análisis requiere
