---
layout: default
---

La Plataforma Mumuki
====================

¡Hola! Esta es la documentación de la Plataforma Mumuki: un un ecosistema web de herramientas educativas que permite

* aprender mediante explicaciones interactivas y resolución de ejercicios de complejidad incremental
* editar contenido el didáctico, estructurado en términos de libros, capítulos, lecciones y ejercicios 
* realizar seguimiento de los estudiantes, en el contexto de un curso presencial, semipresencial o virtual

La misma presenta una arquitectura híbrida que combina microservicios, aplicaciones de línea de comando y bibliotecas reutilizables, libres y de código abierto, desarrolladas principalmente utilizando los lenguajes Ruby, JavaScript y Haskell. 

La Plataforma Mumuki es desarrollada por el [Proyecto Mumuki](http://www.mumuki.org/) y una comunidad docente y programadora, y podés verla funcionando, por ejemplo, en [Academia Mumuki](http://mumuki.academy), un sitio (totalmente funcional) de demostración de sus capactidades. 

Todo el código (incluida esta misma documentación) se encuentra bajo la organización Github [Mumuki](https://github.com/mumuki), distribuido bajo licencias libres [GPL](https://www.gnu.org/licenses/gpl-3.0.en.html) y MIT. Por otro lado, el contenido, también libre y distribuido bajo licencia [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/), se encuentra distribuido a lo largo de varias organizaciones Github, como [MumukiProject](https://github.com/MumukiProject), [sagrado-corazon-alcal](https://github.com/sagrado-corazon-alcal/), [pdep-utn](https://github.com/pdep-utn), entre otras. 

Finalmente, esta documentación, al igual que la Plataforma Mumuki y el Proyecto Mumuki, se encuentra en continuo crecimiento. Es probable que encuentres errores y omisiones; en tal caso no dudes en comunicarte con nosotros a través de nuestra cuenta info@mumuki.org, de nuestro grupo devs@mumuki.org, o de nuestra cuenta en Facebook 


## Arquitectura

La plataforma Mumuki consta de tres servicios principales:

 * [Biblioteca](https://github.com/mumuki/mumuki-bibliotheca) (`mumuki-bibliotheca`): es un repositorio _headless_ de contenido didáctico (guías, ejercicios, capiítulos, libros), capaz de replicar dichos contenidos en repositorios GIT. Cuenta con una interfaz gráfica llamada Editor (mumuki-editor) que permite a un docente generar y mantener el contenido
 * [Ateneo](https://github.com/mumuki/mumuki-atheneum) (`mumuki-atheneum`): es una aplicación web de _code-assesment_ que permite a un estudiante acceder a explicaciones y ejercicios, e interactuar con ellos a través del envío de soluciones a problemas
 * [Aula virtual](https://github.com/mumuki/mumuki-classroom-api) (`mumuki-classroom`): es una aplicación web de seguimiento de estudiantes que permite a los docentes de un curso navegar las soluciones de sus estudiantes, obtener estadísticas y proveer feedback manual.

Estos tres componentes interactuan entre sí a través de tres medios de comunicación:

  * Colas de mensajes
  * APIs REST y WebHooks
  * Tokens JWT provistos por Auth0
 
Además, la plataforma cuenta con dos ejecutables de línea de comando (CLI): 

* [Mulang](https://github.com/mumuki/mulang): realiza el análisis de código
* [Escualo](https://github.com/mumuki/escualo.rb): posibilita la configuración, instalación y despliegue de la plataforma. 
 
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

Es el servicio más visible: una plataforma web de autoestudio que presenta al estudiante ejercicios para que resuelva, y corrige automáticamente utilizando runners. Está desarrollada en Ruby, utilizando [el framework Rails](http://rubyonrails.org/). 

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

## Runners

Los runners son componentes que capaces de ejecutar y probar porciones de código en un cierto lenguaje. 

* Son componentes 100% stateless. 
* Por motivos de seguridad, la mayoría de ellos ejecutan el código del usuario dentro de un sandbox, creado mediante un contenedor Docker instanciado ante demanda. 
* Exponen sus funcionalidades mediante HTTP
* Exponente tres _endpoints_ principales: 
   * `/test`: permite probar el código, lo cual normalmente involucra los siguientes pasos: 
      * ejecutar pruebas unitarias 
      * disparar el análisis de código (típicamente, mediante Mulang)
      * Proveer feedback (esto es, analizar los resultados del compilador/intérprete del lenguaje y proveer al usuario una descripción más amena del error e indicios de solución)
   * `/query`: permite ejecutar consultas, de forma similar a cómo lo hace un intérprete interactivo
   * `/info`: provee información introspectiva sobre el runner: su versión, información de ambiente, versiones del lenguaje y framework de test que ejecuta, íconos, editores ACE recomendados, etc. 

