'use strict'

const UI = {
  showCounter(content){this.compteur.innerHTML = content; this.compteur.className = '';}
, hideCounter(){this.compteur.className = 'hidden'}
}
Object.defineProperties(UI,{
  footer:{get(){return document.querySelector('section#footer')}}
, compteur:{get(){
    return this._counter || (this._counter = document.querySelector('div#counter'))}}
})
