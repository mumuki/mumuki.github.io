Aloha!

El resumen, para quien pueda entenderlo: https://travis-ci.org/mumuki/mumuki-rspec-server

Ahora sí, la explicación.

Pasaron varias semanas sin novedades, pero no porque no se estuviera haciendo nada. Nos disfrazamos de devops y la gran noticia es que ya tenemos infra propia, modesta, pero infra propia al fin: está corriendo en Digital Ocean. 

Y eso significó salir del esquema de no poner un mango, pero bueno, es barato, por ahora. 

La ventaja es que ahora tenemos mucha mas libertad, y el primer problema que atacamos fue dockerizar (algunos) runners, en particular el de ruby. 

Esto se debe a que con algunas tecnologias es muy dificil validar que el código que está mandando el usuario no sea malicioso. Entonces, ahora por primera vez podemos decir que tenemos un modelo de seguridad razonable: lo estamos corriendo dentro de un contenedor docker: llega el pedido, el servidor lo procesa, y cuando tiene que ejecutar el código, ahí crea un contenedor (un corralito, digamos) y lo ejecuta. Y cuando termina, lo mata. Eso nos da mas seguridades respecto a que hace el cacho de código con la red, la memoria y el disco.  

(Nota tangencial, ahora mumuki tiene su propia org en dockerhub: https://hub.docker.com/u/mumuki/dashboard/, con nuestras imagenes docker listas para usar)

Ahora, para hacer esto también hubo que salir del modelo PaaS de heroku/openshift, porque... no le da la nafta para esto. Así que armamos nuestro propio mumuki-runner-oriented pass (?. 

Se llama escualo (https://github.com/mumuki/mumuki-escualo, y por ahora (y no hay muchos planes de que eso cambie) es código bash que nos permite convertir un servidor cualquiera en una máquina lista para despelgar un runner, y además, nos da deploy mediante git, como heroku.  

(Otra nota tangencial: la idea original era correr docker dentro de docker y que el servidor también estuviera dockerizado, todo sonaba bien hasta que hubo que implementarlo y saltaron mil errores)

Y.... también nos da un script para desplegar todo automáticamente via travis cuando se pushea a master. ¡Felicidad! Digamos que casi ni se siente que no estamos en Heroku, al menos mientras no haya que escalar fuerte. 

Y también, como prueba de concepto en parte pero con la intención de usarlos posta el próximo año, se incorporaron dos runners nuevos: C, con cspec (bueno, existía, pero estaba desactualizado y nunca se había puesto en producción) y C++, con CPPUnit. Todo está corriendo en Escualo.

Y desplegar un runner es tan fácil como correr tres comandos, con 0 instalación manual en el servidor. 

Y esto abre muchas posibilidades, que nos va a permitir hacer aún más facil desarrollar runners para la JVM o que tengan requerimientos de instalación as complejos, al separar al entorno servidor del entorno que realmente corre el código del usuario. 

Próximo paso: terminar los cambios que faltan de la plataforma para el próximo año (vamos a hacerla multitenant, ya les contaré), moverla a Digital Ocean y dejar el editor corriendo (en parte no podía avanzar porque todo el tema de infra me estaba bloqueando)

Eso fue el mágico mundo del deploy para mumuki64, espero que les haya gustado, chau. 
