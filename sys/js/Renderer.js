'use strict'

/**
  L'objet qui s'occupe du rendu de l'animation
**/
const Renderer = {
  show(){ this.obj.className = ''; this.fixeDimensions() }
, hide(){ this.obj.className = 'hidden'}

  // Méthode qui permet de fixer les dimensions du rendu en fonction
  // des défintions de l'animation (fichier config.js)
  // Voir le dessin sur https://fr.wikipedia.org/wiki/Définition_d%27écran#/media/Fichier:Vector_Video_Standards8.svg
  // pour voir les dimensions
, fixeDimensions(){
    delete this._width; delete this._height;
    let w = this.width
    let h = this.height
    let sw = window.innerWidth
    let sh = window.innerHeight - UI.footer.offsetHeight
    let mh = Math.round((sw - w) / 2)
    mh > 0 || (mh = 4)
    let mv = Math.round((sh - h) / 2)
    mv > 0 || (mv = 4)
    this.obj.style.width  = `${w}px`
    this.obj.style.marginLeft = `${mh}px`
    this.obj.style.height = `${h}px`
    this.obj.style.marginTop = `${mv}px`
  }
}
Object.defineProperties(Renderer,{
  obj:{get(){return document.querySelector('section#renderer')}}
, width:{get(){
    return this._width || (
      this._width = Anim.current.config.width || 800
    )
  }}
, height:{get(){
    return this._height || (
      this._height = Anim.current.config.height || 480
    )
  }}
})
