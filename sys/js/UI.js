'use strict'

const UI = {
  name: 'UI'

  // Pour l'horloge de temps
, showHorloge(time){this.setHorloge(time || 0); this.horloge.className = ''}
, hideHorloge(){this.horloge.className = 'hidden'}
, setHorloge(time){this.horloge.value = String(time).padEnd(3,'.0')}

  // La console pour entrer des valeurs
, showConsole(){this.console.className = ''}
, hideConsole(){this.console.className = 'hidden'}

, showCounter(content){this.compteur.innerHTML = content; this.compteur.className = '';}
, hideCounter(){this.compteur.className = 'hidden'}

}
Object.defineProperties(UI,{
  footer:{get(){
    return document.querySelector('section#footer')
  }}
, compteur:{get(){
    return this._counter || (this._counter = document.querySelector('div#counter'))
  }}
, horloge:{get(){
    return this._horloge || (this._horloge = document.querySelector('input#horloge'))
  }}
, console:{get(){
    return this._console || (this._console = document.querySelector('input#console'))
  }}

})
