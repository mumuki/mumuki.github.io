---
layout: default
---

La Plataforma Mumuki
====================

La Plataforma Mumuki es un ecosistema web de herramientas educativas que permite

* aprender mediante explicaciones interactivas y resolución de ejercicios de complejidad incremental
* editar contenido el didáctico, estructurado en términos de libros, capítulos, lecciones y ejercicios 
* realizar seguimiento de los estudiantes, en el contexto de un curso presencial, semipresencial o virtual

La misma presenta una arquitectura híbrida que combina microservicios, aplicaciones de línea de comando y bibliotecas reutilizables, libres y de código abierto, desarrolladas principalmente utilizando los lenguajes Ruby, JavaScript y Haskell. 

## Arquitectura

La plataforma Mumuki consta de tres servicios principales:

 * Biblioteca (`mumuki-bibliotheca`): es un repositorio _headless_ de contenido didáctico (guías, ejercicios, capiítulos, libros), capaz de replicar dichos contenidos en repositorios GIT. Cuenta con una interfaz gráfica llamada Editor (mumuki-editor) que permite a un docente generar y mantener el contenido
 * Ateneo (`mumuki-atheneum`): es una aplicación web de _code-assesment_ que permite a un estudiante acceder a explicaciones y ejercicios, e interactuar con ellos a través del envío de soluciones a problemas
 * Aula virtual (`mumuki-classroom`): es una aplicación web de seguimiento de estudiantes que permite a los docentes de un curso navegar las soluciones de sus estudiantes, obtener estadísticas y proveer feedback manual.

Estos tres componentes interactuan entre sí a través de tres medios de comunicación:

  * Colas de mensajes
  * APIs REST y WebHooks
  * Tokens JWT provistos por Auth0
 
Además, la plataforma cuenta con dos ejecutables de línea de comando (CLI): 

* Mulang: realiza el análisis de código
* Escualo: posibilita la configuración, instalación y despliegue de la plataforma. 
 
Y todo esto se apoya en: 

* Bibliotecas (`mumukit-*`): gemas reutilizables ruby (gems) que proveen funcionalidades comunes a toda la platorma 
* Runners (`mumuki-*-runner`): servidores http (también distribuidos mediante gemas) que permiten la ejecución de código

<!--artifact atheneum
artifact bibliotheca
artifact classroom

database atheneumdb [
  atheneum
  ....
  postgre
]

database bibliothecadb [
  bibliotheca
  ---
  mongo
]

database classroomdb [
  classroom
  ---
  mongo
]

database rabbit [
  rabbit
  ----
  ----
  ----
]

atheneum -left- atheneumdb
bibliotheca -right- bibliothecadb
classroom - classroomdb


bibliotheca-down-rabbit
atheneum-down-rabbit
classroom-up-rabbit


artifact editor

editor-down-bibliotheca

cloud Github

bibliotheca ~~ Github

artifact runners

actor student
actor teacher
actor writer

atheneum-down-student
teacher-classroom
writer--editor


atheneum-.up->runners
bibliotheca-.up->runners
-->

<img src="http://www.plantuml.com/plantuml/img/TP5DZiCW38NtFeKlu1vXjdE8KHScq0GfWGgCkklPnvhmbqgJHOmV_km7S1B_u4MGPNF1bGEuASQRtKUL5nxYidFEASO3mBAmuUmwQWt-08vEY3VzD3nZbZKvk4_GrBroypn48jB_4SCQBrmtKAbXw7yciJ5U_ihFvLbB7q6HvXrfTm-XwMWmsKDAVjrq-t88w5QGPfi0CqislW9L6wtzHUmebMVJOBo0irvY0ZZZISvNftmi5h-zRCLSHkFxtUNUBfKGNCggBDeEinJhWjHC72-RIpLx9I-QVBXkHAsbyI1dFL5pFC2RdkohJPulPzxu1G00">

## Componetes principales

### Biblioteca (`bibliotheca`)

> https://github.com/mumuki/mumuki-bibliotheca

Es un servidor HTTP escrito en Ruby. Utiliza como motor de persistencia una base de datos Mongo. La sincronización con un repositorio GIT es opcional, configurable mediante variables de entorno. Expone sus operaciones mediante un API REST.

La interfaz grafíca de la biblioteca (Editor) es una aplicación de cliente pesado escrita utilizando el framework para SPA (Single Page Applications) Angular.js

### Ateneo (`atheneum`)

:warning: TODO

### Aula virtual (`classroom`)

:warning: TODO

### Analizador de código (`mulang`)

A diferencia de los componentes anteriores, mulang, es un **ejecutable** y está **desarrollada en Haskell**.

### Provisionador (`escualo`)

:warning: TODO

## Bibliotecas (gemas)

> "No utilizar bibliotecas compartidas en una arquitectura de microservicios" 

Sí, sabemos que estamos yendo abiertamente en contra éste principio. ¿Entonces por qué lo hacemos? Simple: hemos privilegiado DRY por sobre esta premisa, y hemos llegado a la conclusión de que si...

* las bibliotecas tienen la granularidad suficiente
* se utiliza versionado semántico 
* se crean buenas abstracciones reutilizables 
* se extraen en una biblioteca elementos no centrales al dominio
* el código presenta una alta cobertura

...tenemos lo mejor de los dos mundos: código reutilizable (mayor velocidad de desarrollo, menos propensión a bugs) y microservicios aislados. 

Todas nuestras bibliotecas (gemas de ruby, todas publicadas en rubygems siguiendo estricto versionado semántico) tienen el prefijo `mumukit` (juego de palabras entre mumuki y kit, un guiño a octokit)

* mumukit: la “biblioteca” original. Para ser justos, se trata de un framework, pensado para implementar runners de forma muy fácil (y cuando decimos muy fácil, queremos decir que dar soporte a un lenguaje nuevo es tarea de un día de trabajo)
* mumukit-core: extensiones a active-support, que en tanto son extensiones al lenguaje ruby. 
* mumukit-nuntius: manejo de colas de mensajes RabbitMQ, de forma que sea muy fácil para cualquier servicio enviar mensajes asincrónicos y confiables a otros servicios. 
* mumukit-bridge: manejo de comunicación hacia los runners via HTTP. A diferencia de los mensajes que se envían a través de nuntius, los mensajes que se intercambian con los runners son sincrónicos y no confiables. 
* mumukit-inspection
* mumukit-directives
* mumukit-content-type

