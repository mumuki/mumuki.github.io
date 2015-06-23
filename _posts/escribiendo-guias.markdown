
¿Cómo crear una guía?
====================

# Introducción

Una guía es un conjunto de ejercicios de Mumuki. Dado que todo ejercicio pertenece a una guía, si querés crear tus propios ejercicios vas a tener que:
 * Encontrar alguna guía ya existente y contribuir a ella
 * O bien, crear una guía propia

En cualquier caso, se trabaja de forma similar: con un repositorio git por cada guía.

Un repositorio de guía es un repositorio git común y corriente, pero que cumple una determinada estructura de directorios, como veremos a continuación.

# Paso a paso

## Creación del repositorio

Para empezar, tenemos que decidir si vamos a crear un repositorio nuevo o trabajar en uno existente. En el primer caso, tenemos que por inicializar un repositorio en un directorio vacío:

```
~$ mkdir mi-guia
mi-guia$ cd mi-guia
mi-guia$ git init .
```

En el segundo caso, simplemente clonaremos un repositorio existente:

```
~$ git clone <url> mi-guia
mi-guia$ cd mi-guia
```

## Creando ejercicios

Ahora tenemos que crear al menos un ejercicio. Primero, tenemos que crear un directorio para nuestro ejercicio, dentro del repositorio. El nombre del directorio tiene que tener el formato `numeroDelEjercicio_nombreDelEjercicio`, donde `nombreDelEjercicio` tiene que ser camelCase, y número del ejercicio, un número que vamos a asignarle al mismo.

**Nota**: No es necesario que los números de ejercicios sean correlativos o que empiecen en algún valor particular, pero sí que sean únicos y crecientes*

Por ejemplo, si queremos crear el ejercicio `sonCoprimos`:

```
mi-guia$ mkdir 001_sonCoprimos
mi-guia$ cd sonCoprimos
```

Allí dentro crearemos tres archivos: test.hs, meta.yml, description.md.
 * `test.hs`: el primero es un test en el lenguaje en cuestion (.hs si es Haskell, .pl en Prolog, etc).
 * `meta.yml`: el segundo es un archivo de propiedades que dice en que idioma está (locale: es) y los tags del ejercicio (una lista de etiquetas como los hashtags de twitter, pero sin el #). Los tags son muy importantes, porque sirven para buscar el ejercicio después.
 * `description.md`: el tercero es la descripción, que es básicamente tomar el enunciado y formatearlo en Markdown (el mismo que usa Github)


**Opcional**:  Se puede poner un archivo hints.md con tips sobre como resolver el ejercicio (es similar al description.md, pero por defecto el contenido aparece oculto hasta que el usuario lo seleccione). Este archivo es importante para ayudar al usuario a resolver el problema cuando no sabe cómo encararlo, y debería tener enlaces a apuntes o explicaciones.



- Una guía = un repo en GitHub
- Un ejercicio = una carpeta en ese repo
- Para crearla, lo más fácil es hacerlo desde la plataforma, navegando a /guides/new
- Luego deberías crear ejercicios, desde /exercises/new. Básicamente un ejercicio consta de 2 partes obligatorias:
* una descripción, en Markdown
* tests, en el lenguaje que estés usando

Y otras 3 opcionales:
* hints que sólo se ven si el usuario las pide, en Markdown
* un corolario que se muestra después de hacer bien el ejercicio, en Markdown
* un YML con las expectations, podés leer sobre eso acá: http://mumuki.org/expectativas/plataform/2015/06/16/el-lenguaje-de-expectativas.html

Todo esto se puede manejar desde la plataforma, pero te vas a aburrir muy rápido y nos vas a putear. Lo que te recomiendo entonces es:

- Hacete 1 o 2 ejercicios desde la plataforma
- Exportalos, eso lo hacés parándote en la guía que creaste y yendo a la sección de Importar/Exportar. Te va a crear un commit en GitHub con todos los archivos
- Mirá un poco la estructura y seguí editándolos a mano en tu compu. Cada vez que pushees se importan los cambios automáticamente

Y te dejo algunos ejemplos para que chusmees:
- Guia introductoria de Gobstones
- Guía 1 de funcional en Haskell
- Guía introductoria de objetos, en Ruby