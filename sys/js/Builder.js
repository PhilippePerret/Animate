'use strict'
/**
  Objet gérant le builder, constructeur de l'animation
**/
const Builder = {
  init(){
    this.observe()
    this.show() // règle aussi les dimensions
  }
, hide(){this.obj.className = 'hidden'}
, show(){this.obj.className = ''; this.setDimensions()}
, setDimensions(){
    let w = window.innerHeight - UI.footer.offsetHeight - 14
    this.obj.style.marginTop  = '4px'
    this.obj.style.height     = `${w}px`
  }
, append(node){
    this.obj.appendChild(node)
  }
, appendHTML(codeHTML){
    this.obj.insertAdjacentHTML('beforeend', codeHTML)
  }


, observe(){
    this.obj.addEventListener('click', function(e){
      Objet.deselectAll();
      return stopEvent(e);
    })
  }
}
Object.defineProperties(Builder,{
  obj:{get(){return document.querySelector('section#builder')}}
})
