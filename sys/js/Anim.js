'use strict'
/**
  Class Anim
  -----------
  Gestion de l'animation
**/
class Anim {

  static get current(){
    return this._current || ( this._current = new Anim() )
  }


  // ---------------------------------------------------------------------

  //
  init(){
    this.observe()
  }

  // Méthodes de controleur

  toggleRun(){
    if ( this.running ) {
      this[this.pausing===true?'reprendre':'pause'].call(this)
      this.pausing = !this.pausing
    } else {
      this.run()
    }
  }
  run(){
    this.runButton.innerHTML = '⏸'
    this.running = true
  }
  stop(){
    this.runButton.innerHTML = '▶️'
    this.running = false
    this.pausing = false
  }
  pause(){
    this.runButton.innerHTML = '▶️'
  }
  reprendre(){
    this.run()
  }

  get runButton(){return document.querySelector('#btn-run')}
  get stopButton(){return document.querySelector('#btn-stop')}


  observe(){
    this.runButton.addEventListener('click', this.toggleRun.bind(this))
    this.stopButton.addEventListener('click', this.stop.bind(this))
  }
}
