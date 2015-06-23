

If you want to process expectations, there is another gem you can include into you runner: mumukit-inspection, which helps with parsing the Mumuki inspection language.

We want to make those servers easily pluggable, providing each one test running capabilities, and metadata consumed by the ruby app.

In order to keep things simple, concerns like load balancing for test servers is resposibility of each server. We could move that logic to the mumuki core in the future.

Test Runners are called synchronously from the platform - we know this should be modified but it just works by now.


* Responsabilidades de un runner
* futuras responsabilidades
* Mumukit
  * cuando usarlo
  * Como se escribe
  * opciones
* deployando
* Limites de memoria, fs
* Agregando a la plataforma


Create a new ruby project:
create an empty directory
add an empty Gemfile - you can use bundle init
add a Rakefile if you want - usefull for running tests
and a .ruby-version, so that tools like rvm or rbenv know the version of ruby
Add mumukit as dependency in the Gemfile: gem 'mumukit', github: 'uqbar-project/mumukit', tag: 'v0.2.0'
Add a test runner in lib/test_runner. It must be a class that at implements at least a run_test_command method Example
Add a test compiler in lib/test_compiler. It must be a class that at least implements a compile method. Example
Add the following config.ru:
require 'mumukit'

require_relative 'lib/test_compiler'
require_relative 'lib/test_runner'

run Mumukit::TestServerApp
And run as bundle exec rackup

Testing

You can unit test any runner developed with mumukit since you are just extending plain ruby classes.

You can also do integration testing. There are two options:

Running a local mumuki-platform instance
Or using mumukit-bridge, wich is the standalone component that is used by the platform to interact with the runners. Here there is a test template: https://gist.github.com/flbulgarelli/defdc7adbd115481d4bc


Si bien se puede hacer en cualquier lenguaje, porque en definitiva te comunicás via JSON, lo que sugiere el team Mumuki es que uses Ruby para poder aprovechar todas las gemas helper que tenemos. Lo que sigue asume que querrías hacerme caso con esta sugerencia.

1) Create un proyecto con Mumukit (la gema que te resuelve la comunicación HTTP) según cuenta acá: https://github.com/mumuki/mumukit

2) Tenés que implementar al menos 2 cosas:
* Un TestCompiler, que va a recibir el código del test, el código extra y el código que envió el alumno y tiene que devolver un sólo string, que luego irá a parar a un archivo. La implementación típica es concatenar todo eso y ya.
* Un TestRunner, que recibe un archivo con el output que generaste antes y espera que devuelvas una tupla [result, status], donde result es un symbol con valores posibles :failed, :passed y status es un string, típicamente la salida de tu test runner.

Algunos ejemplos:
- Gobstones (es un poquito más complejo que el resto, porque interactua con un formato inventado por nosotros para definir tests)
- Prolog

3) Deployar eso a algún lado (Heroku) y pedirme que te cree el lenguaje dentro de la plataforma


