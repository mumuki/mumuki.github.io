---
layout: default
---

![Mumuki logo](http://mumuki.io/static/mumuki-banner-horizontal-gradient.png)

Los Componentes Mumuki
=======================

¡Hola! Esta es la documentación de los _Componentes Mumuki_, un ecosistema de piezas de software libre diseñado para construir herramientas educativas basadas en tres principios:

* aprendizaje y práctica mediante explicaciones interactivas y resolución de ejercicios de complejidad incremental;
* generazión de contenido didáctico, estructurado en términos de libros, capítulos, lecciones y ejercicios;
* seguimiento de estudiantes, en contextos de cursos presenciales, semipresencial o virtuales

Este ecosistema  presenta una arquitectura híbrida en torno a bibliotecas, aplicaciones HTTP y frameworks para el lenguaje Ruby. Además tiene excepcional soporte para ejercicios de programación y [pensamiento computacional](https://medium.com/proyecto-mumuki/de-qu%C3%A9-hablamos-cuando-hablamos-de-pensamiento-computacional-2bb6062aad79), al posibilitar la ejecución y evaluación de código, provisto en parte por la herramienta [Mulang](https://github.com/mumuki/mulang), desarrollada en Haskell.

Los componentes son desarrollados por el [Proyecto Mumuki](http://www.mumuki.org/) y una comunidad docente y programadora, y son la base de la [Plataforma Mumuki](http://mumuki.io).

* [Licencias](#licencias)
* [Reportando errores](#reportando-errores)
* [Arquitectura](#arquitectura)
* [Componentes principales](#componentes-principales)
* [Comenzando a desarrollar](#comenzando-a-desarrollar)
* [Requerimientos Mínimos](#requerimientos-mnimos)
* [Contribuyendo](#contribuyedo)

## Licencias

Todo el código (incluida esta misma documentación) se encuentra bajo la organización Github [Mumuki](https://github.com/mumuki), distribuido bajo licencias libres [GPL versión 3](https://www.gnu.org/licenses/gpl-3.0.en.html) o bien MIT, según el componente.

Por otro lado, el contenido, también libre y distribuido bajo licencia [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/), se encuentra distribuido a lo largo de varias organizaciones Github, como [MumukiProject](https://github.com/MumukiProject), [sagrado-corazon-alcal](https://github.com/sagrado-corazon-alcal/), [pdep-utn](https://github.com/pdep-utn), [10pines-mumuki](https://github.com/10pines-mumuki) entre otras.

## Reportando errores

Finalmente, esta documentación, al igual que la Plataforma Mumuki y el Proyecto Mumuki, se encuentra en continuo crecimiento.

Es probable que encuentres errores y omisiones; en tal caso no dudes en comunicarte con nosotros a través de nuestra cuenta info@mumuki.org, de nuestro grupo devs@mumuki.org, o de nuestras cuentas [en Facebook](https://www.facebook.com/MumukiProject) y [Twitter](https://twitter.com/MumukiProject)

## Arquitectura

Los cuatro servicios principales el ecosistema Mumuki están modelados como [Engines](https://guides.rubyonrails.org/engines.html) para el framework Web [Ruby on Rails](https://rubyonrails.org/)

 * [Laboratorio](https://github.com/mumuki/mumuki-laboratory) (`mumuki-laboratory`): provee funcionalidades de _code-assesment_ que permite a un estudiante acceder a explicaciones y ejercicios, e interactuar con ellos a través del envío de soluciones a problemas
 * [Biblioteca](https://github.com/mumuki/mumuki-bibliotheca-api) (`mumuki-bibliotheca-api`): es un repositorio _headless_ de contenido didáctico (guías, ejercicios, capiítulos, libros), capaz de replicar dichos contenidos en repositorios GIT.
 * [Aula](https://github.com/mumuki/mumuki-classroom-api) (`mumuki-classroom-api`): es una herramienta _headless_ de seguimiento de estudiantes que permite a los docentes de un curso navegar las soluciones de sus estudiantes, obtener estadísticas y proveer feedback manual.
 * [Dominio](https://github.com/mumuki/mumuki-domain) (`mumuki-domain`): modelo de dominio y persistencia del ecosistema Mumuki

Estos tres componentes interactuan entre sí a través de tres medios de comunicación:

  * Colas de mensajes
  * APIs REST y WebHooks
  * Tokens JWT provistos

Y todo esto se apoya en:

* Bibliotecas (`mumukit-*`): gemas reutilizables ruby (gems) que proveen funcionalidades comunes a toda la platorma
* Runners (`mumuki-*-runner`): servidores http (también distribuidos mediante gemas) que permiten la ejecución de código
* [Mulang](https://github.com/mumuki/mulang), un ejecutable de línea de comando que permite realizar el análisis de código.

<!--@startuml
artifact Laboratory
artifact Bibliotheca
artifact Classroom

database LaboratoryDB [
  PostgreSQL
  ....
  Users
  ....
  Progress
  ....
  Organizations

]

database BibliothecaDB [
  PostgreSQL
  ....
  Content
]

database ClassroomDB [
  MongoDB
  ....
  History
  ....
  Courses
]

queue Rabbit [
  Rabbit
  ....
  Events
  ....
  Queues
  ....
]

Laboratory -left- LaboratoryDB
Bibliotheca -right- BibliothecaDB
Classroom - ClassroomDB


Bibliotheca-down-Rabbit
Laboratory-down-Rabbit
Classroom-up-Rabbit

cloud Github

Bibliotheca <-.> Github

artifact Runners

actor Student
actor Teacher
actor Writer

Laboratory-down-Student
Teacher-Classroom
Writer--Bibliotheca


Laboratory-.>Runners
@enduml
-->

<img src="http://www.plantuml.com/plantuml/png/VPBFJiCm3CRlVegyGFO424tT41o6s1yG1yGXRRqsKXU3xO3WwKb5ksH2efVqS_spFwTUYZhMU1eW7Vxe6ZKRLnCx9VxAiShNWoVjiN4vk1gS21ET05gdhdQ21Rokp0iOioNHZl6msoInI4ywdWHPijmofGmf8W_SkU2_dNeAOem1UCqzIZF_D5bHK0nQajdnnDrJw6XTPUZEo-Yzh19PKCOgxn4ZchshQwyZFRtct9kFr4-otet0MQSA-NAC7V2ezkAwe9ZBMFPTh_PoLZZxDxQS1Q1aRKkVmKxcSeCod0lP-3R7e1aejkRMQnzhk71pPHVNyuVy__Sn16G1I8BO73Is67HIZ-YQ7dbIp-mrYJzsPcRAjdcbVWbhoyqh-UHexh_4qAOD_W40">

## Componentes principales

### Biblioteca (`bibliotheca-api`)

> [https://github.com/mumuki/mumuki-bibliotheca-api](https://github.com/mumuki/mumuki-bibliotheca-api)


Es un servidor HTTP escrito en Ruby. Utiliza como motor de persistencia una base de datos Mongo. La sincronización con un repositorio GIT es opcional, configurable mediante variables de entorno. Expone sus operaciones mediante un API REST.

La interfaz grafíca de la biblioteca (Editor) es una aplicación de cliente pesado escrita utilizando el framework para SPA (Single Page Applications) Angular.js

### Ateneo (`laboratory`)

> [https://github.com/mumuki/mumuki-laboratory](https://github.com/mumuki/mumuki-laboratory)


Es el servicio más visible: una plataforma web de autoestudio que presenta al estudiante ejercicios para que resuelva, y corrige automáticamente utilizando runners. Está desarrollada en Ruby, utilizando [el framework Rails](http://rubyonrails.org/).

### Aula virtual (`classroom-api`)

> [https://github.com/mumuki/mumuki-classroom-api](https://github.com/mumuki/mumuki-classroom-api)

:warning: TODO

### Analizador de código (`mulang`)

> [https://github.com/mumuki/mulang](https://github.com/mumuki/mulang)

A diferencia de los componentes anteriores, mulang, es un **ejecutable** y está **desarrollada en Haskell**.

## Bibliotecas (gemas)

Todas nuestras bibliotecas (gemas de ruby, todas publicadas en rubygems siguiendo estricto versionado semántico) tienen el prefijo `mumukit`

* mumukit: la _biblioteca original_. Para ser justos, se trata de un framework, pensado para implementar runners de forma muy fácil (y cuando decimos muy fácil, queremos decir que dar soporte a un lenguaje nuevo es tarea de un día de trabajo)
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

## Contribuyendo

Para contribuir al desarrollo de la Plataforma Mumuki sólo necesitás una cuenta en Github y las ganas de ayudarnos. No importa si sos una programadora Ruby, un diseñador Web o un docente que tiene propuestas de mejoras: todo suma.

Hay dos formas fundamentales de colaborar: subiendo pedidos de cambios y mejoras (_issues_), o haciendo _commits_.

## Subiendo _issues_

Subir issues es fácil, aunque a veces puede no ser obvio en qué repositorio github subirlo:

* Si es un _issue_ general sobre las herramientas docentes (ya sea el editor o el aula virtual), subilo a [mumuki/mumuki-teacher-tools](https://github.com/mumuki/mumuki-teacher-tools/blob/master/CONTRIBUTING.md)
* Si es un _issue_ general sobre la plataforma, o particular de la herramienta de autoestudio, subilo a [mumuki/mumuki-laboratory](https://github.com/mumuki/mumuki-teacher-tools/blob/master/CONTRIBUTING.md).
* Si es un _issue_ sobre el contenido didáctico, subilo al repositorio correspondiente. Por ejemplo, si querés subir uno sobre (la lección de Mixins y Autoclases en Ruby)[http://mumuki.io/lessons/127-metaprogramacion-mixins-y-autoclases], hacelo [acá](https://github.com/MumukiProject/mumuki-guia-ruby-metaprogramacion-el-modelo-de-mixins).

¡Y prestá atención a las guías de contribución específicas de cada proyecto! Ya Github te las senñalará cuando subas un _issue_ :wink:

## _Commiteando_

El proceso para contribur con aportes de código es simple:

* Forkea el proyecto desde Github (usando el botón Fork que está en la esquina superior derecha) y clonalo en tu computadora de trabajo
* Creá un branch por tema (feature branch) (git checkout -b my-new-feature)
* Comiteá tus cambios your changes `git commit -am 'Add some feature'`
* Hacé push al branch (git push origin my-new-feature)
* Hacé un nuevo Pull Request, desde el branch en tu fork hacia master en el repositorio de mumuki.

La idea de trabajar con Pull Requests es que sea fácil que cualquiera pueda proponer un cambio o mejora; si bien se pueden hacer PRs desde branches de los proyectos en la organización mumuki, eso implica tener que darle permisos especiales de collaborator a cada contribuidor, por cada repositorio, lo cual es lento, burocrático, y si no se tiene cuidado, un riesgo de seguridad. Por eso es que te pedimos hacer tu propio _fork_.

