# Animate
# Manuel d'utilisation

* [Configuration générale de l'animation](#animation_general_config)
  * [Définir la taille de la vidéo](#define_anim_sizes)
  * [Définir le décompte](#define_config_decompte)
* [Définition d'un objet](#define_an_objet)
  * [Définition précise de l'objet](#define_precisely_objet)
    * [Définition d'un objet image multiple](#define_objet_image_multiple)
    * [Définition d'un objet code HTML (SVG)](#define_objet_code_html)
    * [Modification précise d'un objet](#modify_precise_objet)

Toute l'animation doit être contenue dans un dossier "animation" déposé à la racine de ce dossier.

Ce dossier "animation" doit impérativement contenir :

* un DOSSIER `animation` ou mettre tous les éléments (note : c'est le dossier qui se trouve déjà à la racine de l'application),
* un fichier `animation/config.js` définissant la configuration générale de l'animation (cf. [Configuration générale de l'animation](#animation_general_config)),
* un fichier `animation/objets.js` définissant tous les objets (cf. [Définition d'un objet](#define_an_objet))
* un fichier `animation/timeline.js` définition la timeline avec toutes les frames (cf. [Définition de la timeline](#define_the_timeline)),
* un DOSSIER `animations/objets` contenant la définition précise de tous les objets,


## Configuration générale de l'animation {#animation_general_config}

La configuration générale de l'animation se définit dans le fichier obligatoire `js/config.js`. Ce fichier définit la configuration par :

```javascript

Anim.current.config = {
  //...
}

```

Cette configuration permet de définir la taille de la vidéo, la vitesse de l'animation ainsi que tout ce qui relève de la configuration.

### Définir la taille de la vidéo {#define_anim_sizes}

Elle se définit dans le fichier `animation/js/config.js` :

```javascript

Anim.current.config = {
  // ...
    width:  largeur en nombre de pixels
  , height: hauteur en nombre de pixels
}

```

### Définir le décompte {#define_config_decompte}

Le décompte en secondes se définit à l'aide de la propriété `decompte` :

```javascript

Anim.current.config = {
  // ...
  , decompte:  nombre de secondes
  // ...
}

```

## Définition d'un objet {#define_an_objet}

Tous les objets doivent impérativement se définir dans le fichier `animation/objets.js`. Dans ce fichier, c'est la définition globale de l'objet. Par exemple :

```javascript

const JON = new Objet({
  name: "Jon", img: 'jon.png'
})

```

La propriété `name` est obligatoire et permet de charger le fichier `animation/objets/Jon/objet.js` qui est la définition précise de l'objet, avec ses actions, ses propriétés changeantes, etc.

Un objet peut être défini par une image (propriété `img`), un ensemble d'images (propriété `imgs`) ou un code HTML (propriété `html`). Dans tous les cas une de ces trois propriétés doit être définies, sinon une erreur est générée.

### Définition précise de l'objet {#define_precisely_objet}

Tous les éléments concernant l'objet sont à placer dans le dossier `animation/objets/<name objet>` que nous appellerons le *dossier de l'objet*.

La définition précise de l'objet — comprendre principalement : ses actions — doit être définie dans le fichier `animation/objets/<name objet>/objet.js`

On peut définir ses styles CSS dans le fichier `animation/objets/<name objet>/styles.css`. Dans ce cas, la définition générale de l'objet doit contenir soit `css: true` soit le nom du fichier CSS : `css: 'styles.css'`.

On peut mettre ses images dans le dossier `animation/objets/<name objet>/img/`.

### Définition d'un objet image unique {#define_objet_image_unique}

L'image sera placée dans un `div` en position `absolute` qui portera l'id `<name objet>`.

### Définition d'un objet image multiple {#define_objet_image_multiple}

L'image courante sera placée dans un `div` en position `absolute` qui portera l'id `<name objet>`.


### Définition d'un objet code HTML (SVG) {#define_objet_code_html}

On définit ce code dans la définition générale de l'objet, donc dans `animation/objets.js`, en définissant la propriété `html`.

Ce code sera placé dans un `div` en position `absolute` qui portera l'id `<name objet>`.

```javascript

// dans animation/objets.js
const OBJETHTML = new Objet({
    name: 'ObjetHTML'
  , html: '<div>Mon objet html</div>'
})

```

### Modification précise d'un objet {#modify_precise_objet}

Pour modifier précisément un objet, on peut utiliser la console du pied de page en respectant les règles suivantes :

* l'objet à modifier doit être sélectionné,
* une propriété doit être définie par `<nom_prop>=<valeur>`,
* chaque propriété doit être séparée par une espace. Par exemple `x=12 y=24`.


## Définition de la timeline {#define_the_timeline}

La timeline, c'est-à-dire la définition des frames (keyframes), doit impérativement se définir dans le fichier `animation/timeline.js`
