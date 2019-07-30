'use strict'
/**
  Class Objet
  -----------
  Gestion des objets
**/
class Objet {
  constructor(data){
    this.data = data
    for(var k in data) this[k] = data[k]
    // Quand on crée un objet, on crée automatiquement la balise chargeant
    // ses détails
    this.buildTag()
  }


  buildTag(){
    var tag = document.createElement('SCRIPT')
    tag.src = `animation/js/objets/${this.name}.js`
    document.body.appendChild(tag)
  }

}
