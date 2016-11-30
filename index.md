---
layout: default
---
![](http://mumuki.io/logo-alt-large.png)

La Plataforma Mumuki
====================

¡Hola! Esta es la documentación de la Plataforma Mumuki: un ecosistema web de herramientas educativas que permite

* aprender mediante explicaciones interactivas y resolución de ejercicios de complejidad incremental
* editar contenido didáctico, estructurado en términos de libros, capítulos, lecciones y ejercicios 
* realizar seguimiento de estudiantes, en el contexto de un curso presencial, semipresencial o virtual

La misma presenta una arquitectura híbrida que combina microservicios, aplicaciones de línea de comando y bibliotecas reutilizables, libres y de código abierto, desarrolladas principalmente utilizando los lenguajes Ruby, JavaScript y Haskell. 

La Plataforma Mumuki es desarrollada por el [Proyecto Mumuki](http://www.mumuki.org/) y una comunidad docente y programadora, y podés verla funcionando, por ejemplo, en [Academia Mumuki](http://mumuki.academy), un sitio (totalmente funcional) de demostración de sus capacidades. 

* [Licencias](#licencias)
* [Reportando errores](#reportando-errores)
* [Arquitectura](#arquitectura) 
* [Componentes principales](#componentes-principales)
* [Comenzando a desarrollar](#comenzando-a-desarrollar)
* [Requerimientos Mínimos](#requerimientos-mnimos)
* [Desplegando la plataforma](#desplegando-la-plataforma)
* [Contribuyendo](#contribuyedo)

## Licencias

Todo el código (incluida esta misma documentación) se encuentra bajo la organización Github [Mumuki](https://github.com/mumuki), distribuido bajo licencias libres [GPL](https://www.gnu.org/licenses/gpl-3.0.en.html) y MIT.

Por otro lado, el contenido, también libre y distribuido bajo licencia [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/), se encuentra distribuido a lo largo de varias organizaciones Github, como [MumukiProject](https://github.com/MumukiProject), [sagrado-corazon-alcal](https://github.com/sagrado-corazon-alcal/), [pdep-utn](https://github.com/pdep-utn), entre otras. 

## Reportando errores

Finalmente, esta documentación, al igual que la Plataforma Mumuki y el Proyecto Mumuki, se encuentra en continuo crecimiento. 

Es probable que encuentres errores y omisiones; en tal caso no dudes en comunicarte con nosotros a través de nuestra cuenta info@mumuki.org, de nuestro grupo devs@mumuki.org, o de [nuestra cuenta](https://www.facebook.com/MumukiProject) en Facebook 

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

## Componentes principales

### Biblioteca (`bibliotheca`)

> [https://github.com/mumuki/mumuki-bibliotheca](https://github.com/mumuki/mumuki-bibliotheca)
> [https://github.com/mumuki/mumuki-editor](https://github.com/mumuki/mumuki-editor)


Es un servidor HTTP escrito en Ruby. Utiliza como motor de persistencia una base de datos Mongo. La sincronización con un repositorio GIT es opcional, configurable mediante variables de entorno. Expone sus operaciones mediante un API REST.

La interfaz grafíca de la biblioteca (Editor) es una aplicación de cliente pesado escrita utilizando el framework para SPA (Single Page Applications) Angular.js

### Ateneo (`atheneum`)

> [https://github.com/mumuki/mumuki-atheneum](https://github.com/mumuki/mumuki-atheneum)


Es el servicio más visible: una plataforma web de autoestudio que presenta al estudiante ejercicios para que resuelva, y corrige automáticamente utilizando runners. Está desarrollada en Ruby, utilizando [el framework Rails](http://rubyonrails.org/). 

### Aula virtual (`classroom`)

> [https://github.com/mumuki/mumuki-classroom-api](https://github.com/mumuki/mumuki-classroom-api)
> [https://github.com/mumuki/mumuki-classroom](https://github.com/mumuki/mumuki-clasroom)

:warning: TODO

### Analizador de código (`mulang`)

> [https://github.com/mumuki/mulang](https://github.com/mumuki/mulang)

A diferencia de los componentes anteriores, mulang, es un **ejecutable** y está **desarrollada en Haskell**.

### Provisionador (`escualo`)

> [https://github.com/mumuki/escualo.rb](https://github.com/mumuki/escualo.rb)

`escualo` es una gema ruby que permite aprovisionar un host, de modo que se puedan instalar componentes de la plataforma en éste. Se instala mediante `gem install escualo` y se puede usar en dos modalidades: 

* Configurando el host a mano, utilizando los varios comandos que ofrece la herramienta. Por ejemplo: 

```
OPTIONS='--host mi-maquina.mi-dominio.com'

escualo bootstrap $OPTIONS
escualo env set UNA_VARIABLE=un_valor $OPTIONS
escualo plugin install mongo $OPTIONS
escualo artifact create bibliotheca 80 $OPTIONS
escualo deploy bibliotheca mumuki/mumuki-bibliotheca $OPTIONS
```

* Ejecutar un script, como [los que se encuentran acá](https://github.com/mumuki/mumuki-escualo-sample-scripts) mediante el comando: 

```
escualo script nombre_del_script.yml
```

Los scripts son configuraciones estandarizadas y reutilizables para desplegar un componente mumuki. Varios ejemplos de scripts, con las configuraciones más típicas, se pueden encontrar en el repositorio [https://github.com/mumuki/mumuki-escualo-sample-scripts](https://github.com/mumuki/mumuki-escualo-sample-scripts)  

En cualquier caso, recomendamos que dar un vistazo al README (que muestra casos de uso comunes) y a `escualo --help`.

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

## Comenzando a desarrollar

Todo muy lindo, ¿pero cómo empiezo a desarrollar? Hay dos caminos: 

1. El fácil: utilizando [mumuki-development-installer](https://github.com/mumuki/mumuki-development-installer)
2. El difícil: siguiendo los pasos de instalación de cada componente

### Development Installer

:warning: TODO

### Instalación Manual

:warning: TODO

## Requerimientos Mínimos

:warning: TODO

## Desplegando la plataforma

:warning: TODO

## Contribuyendo

Para contribuir al desarrollo de la Plataforma Mumuki sólo necesitás una cuenta en Github y las ganas de aun yudarnos. No importa si sos una programadora Ruby, un diseñador Web o un docente que tiene propuestas de mejoras: todo suma. 

Hay dos formas fundamentales de colaborar: subiendo pedidos de cambios y mejoras (_issues_), o haciendo _commits_. 

## Subiendo _issues_

:warning: TODO

## _Commit_eando 

El proceso para contribur con aportes de código es simple: 

* Forkea el proyecto desde Github (usando el botón Fork que está en la esquina superior derecha) y clonalo en tu computadora de trabajo
* Creá un branch por tema (feature branch) (git checkout -b my-new-feature)
* Comiteá tus cambios your changes `git commit -am 'Add some feature'`
* Hacé push al branch (git push origin my-new-feature)
* Hacé un nuevo Pull Request, desde el branch en tu fork hacia master en el repositorio de mumuki. 

La idea de trabajar con Pull Requests es que sea fácil que cualquiera pueda proponer un cambio o mejora; si bien se pueden hacer PRs desde branches de los proyectos en la organización mumuki, eso implica tener que darle permisos especiales de collaborator a cada contribuidor, por cada repositorio, lo cual es lento, burocrático, y si no se tiene cuidado, un riesgo de seguridad. Por eso es que te pedimos hacer tu propio _fork_. 

