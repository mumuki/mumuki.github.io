---
layout: post
title:  "Escribiendo Guías"
date:   2015-07-10 12:30:00
categories: mumuki tech plataforma guia
---

Como [explicamos anteriormente](/mumuki/tech/plataforma/guia/contenido/ejercicios/categorias/2015/07/04/una-plataforma-de-contenido/), una guía es en esencia un conjunto ordenado de ejercicios.

Si bien es posible tener ejercicios sueltos, es muy recomendable que antes o después sean integrados dentro de una guía, dado que:

  * hace más fácil dar con el ejercicio
  * ayuda al usuario a organizar mejor su estudio

Las guías se escribe en un repositorio Github. Veamos cómo:

## El repositorio

Un repositorio de guía es un repositorio git común y corriente, que puede ser tanto público como privado. Para crearlo, debemos hacerlo a través de Github, [siguiendo el procedimiento estándar](https://help.github.com/articles/create-a-repo/).

> Si bien no hay ninguna restricción respecto al nombre del repositorio, recomendamos la siguiente convención:
> `mumuki-<categoria>-<lenguaje>-guia-<titulo>`

Una vez hecho esto, procederemos a bajarlo con nuestro cliente Git favorito. Por ejemplo:

{% highlight bash %}
~$ git clone <url-repositorio> mi-guia
~$ cd mi-guia
{% endhighlight %}


Este repositorio debe cumplir una determinada estructura de directorios, como veremos a continuación.


## Anatomía de una guía

Veamos un ejemplo de repositorio, extraído de [la primera Guía de Gobstones](https://github.com/sagrado-corazon-alcal/mumuki-fundamentos-gobstones-guia-1-primeros-programas)

{% highlight bash %}
mumuki-fundamentos-gobstones-guia-1-primeros-programas
├── 00100_El Tablero
│   ├── corollary.md
│   ├── description.md
│   ├── extra.gbs
│   ├── meta.yml
│   └── test.yml
├── 00200_El Cabezal
│   ├── description.md
│   ├── extra.gbs
│   ├── meta.yml
│   └── test.yml
├── ....
├── 01400_Reemplazar Bolitas
│   ├── description.md
│   ├── hint.md
│   ├── meta.yml
│   └── test.yml
├── corollary.md
├── description.md
└── meta.yml

{% endhighlight %}

### Estructura de directorios

Como podemos observar, un repositorio de guía se compone de varios archivos organizados en directorios, cada uno de los cuales representa un ejercicio.

El nombre del directorio de ejercicio tiene que tener el formato

{% highlight bash %}
<numeroDelEjercicio>_<nombreDelEjercicio>
{% endhighlight %}

donde `nombreDelEjercicio` es un texto (breve, 4 o 5 palabras como mucho) que describe al ejercicio, y `numeroDelEjercicio`, un número a asignarle a cada uno.

No es necesario que los números de ejercicios sean correlativos o que empiecen en algún valor particular, pero sí que sean únicos y crecientes.

> Recomendamos numerar inicialmente a nuestros ejercicios partir del 100, completando con ceros hasta tener 5 dígitos. De esta forma es fácil luego introducir ejercicios en el medio; por ejemplo si queremos introducir un ejercicio entre el `00100` y `00200`, lo podremos numerar como `00150`.

### Estructura de un directorio de ejercicio

Dentro de un directorio de ejercicio, deberemos crear tres archivos obligatorios: `test`, `meta.yml`, `description.md`.

 * `test`: este archivo describe un test en e lenguaje en cuestión. En el caso particular [del test runner de Gobstones](https://github.com/uqbar-project/stones-spec), la extensión del archivo de test es `.yml`, por ello el nombre completo de archivo es `test.yml`. Sin embargo, dependiendo del lenguaje del ejercicio, utilizaremos otras extensiones:
   * `.js` para JavaScript
   * `.hs` para Haskell
   * `.rb` para Ruby
   * etc
 * `meta.yml`: es un archivo de propiedades [YAML](http://yaml.org/). Entre las propiedad soportadas más importantes tenemos:
    * `layout`: indica en qué posición se mostrará el editor. Puede tomar los valores `no_editor`, `editor_left`, `editor_bottom`, `scratchy`. Para más información y ejemplos, [ver aquí](https://github.com/mumuki/mumuki-platform/pull/235#issue-89811282). El default es `editor_left`
    * `tags`: una lista de tags: etiquetas como los hashtags de twitter, pero sin el #. Los tags son muy importantes, porque sirven para buscar el ejercicio después.
 * `description.md`: es la descripción del ejercicio, que es básicamente tomar el enunciado y formatearlo en [Markdown](http://daringfireball.net/projects/markdown/).

 > En todos los archivos Markdown, también soportamos varias [extensiones de Github Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/) y [emojis](http://www.emoji-cheat-sheet.com/).

Además, hay algunos archivos opcionales:

 * `hint.md`: otro archivo Markdown con con _tips_ sobre có:mo resolver el ejercicio; es similar al description.md, pero por defecto el contenido aparece oculto hasta que el usuario lo seleccione. Este archivo es importante para ayudar al usuario a resolver el problema cuando no sabe cómo encararlo, y debería tener enlaces a apuntes o explicaciones.:
 * `extra`: un archivo con código extra que el usuario no verá, pero estará disponible cuando el usuario ejecute las pruebas. **La extensión del archivo depende del lenguaje**: `.js`, `.gbs`, `.hs`, etc.
 * `corollary.md`: un tercer archivo Markdown que se muestra después de hacer bien el ejercicio
 * `expectations.yml`: un YML con las _expectations_, [podés leer sobre eso acá](http://mumuki.org/expectativas/plataform/2015/06/16/el-lenguaje-de-expectativas.html)

### Archivos en la raíz

Finalmente, hay algunos archivos que van en la raíz del repositorio.

Obligatorios:

* `description.md`: una descripción de la guía, en Markdown.
* `corollary.md`: similar al corollary del ejercicio, pero que se muestra al terminar la guía
* `meta.yml`: un archivo de propiedades sobre la guía:
  * `locale`: en idioma de la guía. Soportamos `en` (Inglés) y `es` (Español)
  * `language`: el lenguaje de programación. Soportamos:
    * `prolog`
    * `javascript`
    * `haskell`
    * `gobstones`
    * `ruby`
  * `learning`: _flag_ _booleano_ que indica si la guía es un apunte.
  * `original_id_format`, `order`: permiten cambiar el formato del numero de ejericio, y modificar el orden natural de los ejercicios. Recomendamos no utilizarlos (¡salvo que sepas lo que estás haciendo!)
* `expectations.md`: expectations globales **no está aún soportado, [pero pronto lo estará](https://github.com/mumuki/mumuki-platform/issues/192)**


## Cualidades de una guía

Escribir una buena guía no es trivial, dado que debe ser al mismo tiempo educativa y atractiva al usuario; he aquí algunas recomendaciones:

* **Brevedad**: no hacer guías o ejercicios innecesariamente largos
* **Unidad conceptual**: todos los ejercicios de la guía deben tener algo que ver. O bien todos tratan de un mismo modelo, o bien todos tratan los giren en torno a los mismos conceptos.
* **Respetar los tipos**: si la guía es un apunte, marcarla como `learning: true`
* **Reforzar teoría**: siempre que sea posible, colocar corolarios reforzando los elementos teóricos del ejercicio, o llamando al usuario a reflexionar sobre lo que hizo. Esto es particularmente importante en guías de tipo apunte.
* **Poner ayudas útiles**: Si el ejercicio tiene aspectos complejos o utiliza herramientas poco usadas hasta ese punto, colocar en `hint.md` ayudas valiosas sobre cómo encarar el ejercicio.
* **Expresividad**: poner cantidad suficiente de tests, y muy buenos títulos para los mismos. Pensá que cuando un test falle, ese título es el que verá el usuario final, y si no es suficientemente expresivo, no sabrá en qué se equivocó.
* **Complementar las formas de evaluación**: si el _runner_ soporta _expectations_, utilizarlas. Recomendamos poner al menos una _expectation_ de `HasBinding` por cada punto pedido en el ejercicio.