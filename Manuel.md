# Animate
# Manuel d'utilisation

Toute l'animation doit être contenue dans un dossier "animation" déposé à la racine de ce dossier.

Ce dossier "animation" doit impérativement contenir :

* un dossier `js` ou mettre tous les javascripts,
* un fichier `js/objets.js` définissant tous les objets (cf. [Définition d'un objet](#define_an_objet))
* un fichier `js/timeline.js` définition la timeline avec toutes les frames (cf. [Définition de la timeline](#define_the_timeline)),
* un dossier `js/objets` contenant la définition précise de tous les objets,


## Définition d'un objet {#define_an_objet}

Tous les objets doivent impérativement se définir dans le fichier `animation/js/objets.js`. Dans ce fichier, c'est la définition globale de l'objet. Par exemple :

```javascript

const JON = new Objet({
  name: "Jon", img: 'jon.png'
})

```

La propriété `name` est obligatoire et permet de charger le fichier `animation/js/objets/Jon.js` qui est la définition précise de l'objet, avec ses actions, ses propriétés changeantes, etc.

### Définition précise de l'objet {#define_precisely_objet}


## Définition de la timeline {#define_the_timeline}

La timeline, c'est-à-dire la définition des frames (keyframes), doit impérativement se définir dans le fichier `animation/js/timeline.js`
