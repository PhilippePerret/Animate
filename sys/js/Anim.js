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
    console.log("-> Anim.run")
    const my = this
    this.runButton.innerHTML = '⏸'
    this.running = true
    Renderer.show()
    Builder.hide()
    UI.showHorloge()
    UI.hideConsole()
    Objet.resetAllItems()
    Timeline.reset()
    this.decompteAndStart()
  }
  decompteAndStart(){
    const my = this
    this.config.decompte || ( this.config.decompte = 3)
    UI.showCounter(this.config.decompte)
    my.decompteTimer = setInterval(()=>{
      -- my.config.decompte
      if ( my.config.decompte < 0 ) {
        clearInterval(my.decompteTimer)
        my.decompteTimer = null
        UI.hideCounter()
        my.start()
      } else {
        UI.compteur.innerHTML = my.config.decompte
      }
    }, 1000)
  }
  start(){
    console.log("-> Anim.start")
    Timeline.start()
  }
  stop(){
    console.log("-> Anim.stop")
    UI.hideHorloge()
    UI.showConsole()
    this.runButton.innerHTML = '▶️'
    Timeline.stop.call(Timeline)
    this.running = false
    this.pausing = false
    Timeline.setCursor(0)
    Renderer.hide()
    Builder.show()
    Objet.resetAllItems()
    Objet.appendAllToBuilder()
  }
  pause(){
    console.log("-> Anim.pause")
    this.runButton.innerHTML = '▶️'
    Timeline.stop.call(Timeline)
  }
  reprendre(){
    console.log("-> Anim.reprendre")
    this.start()
  }

  get runButton(){return document.querySelector('#btn-run')}
  get stopButton(){return document.querySelector('#btn-stop')}


  observe(){
    this.runButton.addEventListener('click', this.toggleRun.bind(this))
    this.stopButton.addEventListener('click', this.stop.bind(this))
  }

  // Durée en nombre de secondes
  get duration(){
    return this._duration || ( this._duration = this.config.duration || 60)
  }
}
