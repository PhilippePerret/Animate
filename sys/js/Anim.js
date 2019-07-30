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

  // Méthode principale appelée à l'ouverture de la page, quand elle
  // est prête.
  async init(){
    Footer.init()
    // Quand on est prêt on charge les fichiers de l'animation
    await Document.addScriptAnim('config')
    await Document.addScriptAnim('objets')
    await Document.addScriptAnim('timeline')
    this.observe()
    Builder.init() // règle aussi les dimensions
    // On crée une caméra pour l'animation
    this.camera = new Camera(this)
    this.camera.init()
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
    Renderer.show()
    Builder.hide()
  }
  stop(){
    this.runButton.innerHTML = '▶️'
    this.running = false
    this.pausing = false
    Renderer.hide()
    Builder.show()
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
