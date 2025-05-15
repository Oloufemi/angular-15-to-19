# TestMajorMigration

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# TUTORIALS 

### Add existing project to github repository
* Create a GitHub repository for the existing project.
* Perform a git init command in the root folder of the existing project.
* Add all of the existing project’s files to the Git index and then commit.
* Add the GitHub repo as a remote reference for the existing project with this : 
   git remote add origin git@github_repo_url
   git branch -M main
   git push -u origin main

### Switch Angular CLI version
* [tutorial_link](https://indepthcoder.medium.com/maintain-different-versions-of-angular-cli-on-the-same-machine-6828df198f59)

### RxJS
* [intro](https://youtu.be/FITI5ASi6dQ?si=EqTl6MdROEYuEPog)
* [useful_link_1](https://kevin-tale.medium.com/tout-ce-que-je-sais-sur-rxjs-partie-2-a092c3d920a6)
* [useful_link_2](https://makina-corpus.com/front-end/mise-en-pratique-rxjs-angular)
* Pipe : create a pipeline; Literally create a pipeline in which a series of transformations can 
be applied to data. 
* Tap (do) : Opérateur uitlitaire qu'on utilisera juste pour consulter la donnée, aucune transformation 
possible. [useful_link](https://javascript.plainenglish.io/mastering-the-rxjs-tap-operator-in-angular-real-life-examples-776ba8bedf15)
* Map : Prend les données émises au niveau de la source et applique une fonction qui transformera 
chacune d'elle. [useful_link](https://medium.com/@yuvidev/rxjs-operator-21-map-operator-3e980876b735)
* Mergemap : Une première valeur émet un observable et on veut cette valeur de l'observable
pour générer un nouvel observable. Utiliser la sortie d'un observable en entrée d'un autre
* toArray : transformer un flux de plusieurs données en un tableau unique de données. [useful_link](https://rxjs.fr/transform/toarray.html)
* [ErrorHandling](https://blog.angular-university.io/rxjs-error-handling/) 
