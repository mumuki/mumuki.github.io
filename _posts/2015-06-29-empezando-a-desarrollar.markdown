---
layout: post
title:  "Empezando a desarrollar Mumuki"
date:   2015-06-29 20:30:00
categories: mumuki tech plataforma runners lenguaje bootstrap
author: flbulgarelli
---

Ya escuchaste de Mumuki. Ya lo probaste. Y te encantó la idea, pero hay algunas cosas que te gustaría mejorar. O estás haciendo un [test runner](http://mumuki.org/mumuki/tech/plataforma/runners/lenguaje/2015/06/22/extendiendo-mumuki-runners/), y querés hacer una prueba de integración. O simplemente querés forkear Mumuki para hacer alguna otra cosa.

En cualquier caso, tenés que instalarlo localmente. Veamos cómo se hace.

## Bajando el código

El código de la plataforma se encuentra [en Github](https://github.com/mumuki/mumuki-platform). Bajalo con tu cliente [git](https://git-scm.com/) favorito.

## Preparando el ambiente

Mumuki Platform es una aplicación Rails bastante estándar. Así que vas a necesitar las herramientas estándares para desarrollar en Rails:

  * Un gestor de versiones. Nosotros recomendamos [rbenv](https://github.com/sstephenson/rbenv) .
  * Una instalación de Ruby. Todo Mumuki está desarrollado bajo ruby `2.0.0`
  * Bundler
  * PostgreSQL `9.1`
  * El mar de dependencias nativas instaladas en tu sistema operativo

No vamos a repetir lo que ya Internet escribió; acá hay algunos tutoriales:

 * [Guía de Instalación de Ruby](http://uqbar-wiki.org/index.php?title=Gu%C3%ADa_de_Instalaci%C3%B3n_de_Ruby)
 * [Guía de Instalación de Rails](http://uqbar-wiki.org/index.php?title=Gu%C3%ADa_de_Instalaci%C3%B3n_de_Rails)
 * [Gorails](https://gorails.com/setup)

## Preparando la base

Una vez instalado Postgres, es necesario crear un usuario `mumuki`:

{% highlight bash %}
sudo su postgres
psql
create role mumuki with createdb login password 'mumuki';
CTRL + D
{% endhighlight %}


## Iniciando el servidor por primera vez

Ahora ya estamos en condiciones de levantar el servidor por primera vez. Lo haremos de la forma estándar:

{% highlight bash %}
rake db:create db:migrate db:seed
rails s
{% endhighlight %}

> Nota: si estás desarrollando un runner nuevo, o si tu lenguaje simplemente no está listado en el archivo `db/seeds.rb`, agregalo antes de correr el comando anterior. Y cuando tu runner esté listo, mandanos un Pull Request a la pltaforma. Está bien si apunta a una URL local, dado que el seeds no se ejecuta en producción.

## Creando un ejercicio

Si estás instalando a Mumuki localmente para modificar algo relacionado con el envío de soluciones o para agregar o modificar un runner, probablemente quieras cargar ejercicios.

Para ello, tenés dos opciones:

 * Crear a mano tu propio ejercicio
 * Importar una guía preexistente

Vamos a asumir el segundo caso. Realizá los siguientes pasos:

1. Logueate en la plataforma. Localmente se utiliza un usuario _fake_, por lo que automáticamente ingresarás como `testuser` sin pasar por el login normal.
2. Andá al perfil del usuario `testuser`
3. Seleccioná _Guías_ y allí _crear guía_
4. Ingresá un nombre cualquiera y la URL del repo Github que contiene la guía.
5. Guardá los cambios
6. Recibirás un warning de que el usuario no tiene permisos; simplemente ignoralo porque el usuario `testuser` no tiene acceso a Github.
7. Dirigite a la solapa _importar/exportar_ y seleccioná _Importar_

Después de unos segundos, deberías tener los ejercicios listos para ser utilizados.
