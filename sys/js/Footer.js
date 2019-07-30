'use strict'

const Footer = {
  init(){
    this.observe()
  }
, write(msg){
    this.console.value = msg
  }

, observe(){
    $(this.console).bind('keyup', (e) => {
      if ( e.key === 'Enter'){
        // On regarde si le contenu de la console peut être appliqué à la
        // sélection courante
        Objet.modifySelection(this.console.value)
        return stopEvent(e)
      } else {
        // console.log("Touche which: %s, key: %s", e.which, e.key)
        return true
      }
    })
  }
}
Object.defineProperties(Footer,{
  console:{get(){return document.querySelector('section#footer input#console')}}
})
