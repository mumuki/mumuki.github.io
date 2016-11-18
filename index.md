---
layout: default
---


# Arquitectura de Mumuki

## Introducción

La plataforma Mumuki consta actualmente de tres componentes:

  * Biblioteca (mumuki-bibliotheca): es un repositorio _headless_ de contenido didáctico (guías, ejercicios, capiítulos, libros), capaz de replicar dichos contenidos en repositorios GIT. Cuenta con una interfaz gráfica llamada Editor (mumuki-editor) que permite a un docente generar y mantener el contenido
  * Ateneo (mumuki-atheneum): es una aplicación web de _code-assesment_ que permite a un estudiante acceder a explicaciones y ejercicios, e interactuar con ellos a través del envío de soluciones a problemas
  * Aula virtual (mumuki-classroom): es una aplicación web de seguimiento de estudiantes que permite a los docentes de un curso navegar las soluciones de sus estudiantes, obtener estadísticas y proveer feedback manual.

Los tres componentes principales interactuan entre sí a través de tres medios de comunicación:

  * Colas de mensajes
  * APIs REST y WebHooks
  * Tokens JWT provistos por Auth0

## Diagrama de Arquitectura

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

## Detalle tecnológico

### Biblioteca

Es un servidor HTTP escrito en Ruby. Utiliza como motor de persistencia una base de datos Mongo. La sincronización con un repositorio GIT es opcional, configurable mediante variables de entorno. Expone sus operaciones mediante un API REST.

La interfaz grafíca de la biblioteca (Editor) es una aplicación de cliente pesado escrita utilizando el framework para SPA (Single Page Applications) Angular.js

### Ateneo

:warning: TODO

### Aula virtual

:warning: TODO

## Otros conceptos y componentes adicionales

### Organizaciones

### Gestión de usuarios, roles y permisos

### Ejecución de código (Runners)

