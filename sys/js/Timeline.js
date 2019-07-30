'use strict'

const Timeline = {

  currentTime: 0
, CLICK_LEN: 100 // tous les dizièmes de seconde

, reset(){
    console.log("-> Timeline.reset")
    const my = this
    this.currentFrame = 0
    this.currentTime  = 0
    this.istep = 0
  }
, start(){
    console.log("-> Timeline.start")
    const my = this
    this.setCursor(this.currentTime / 1000)
    this.timer = setInterval(my.checkTime.bind(my), my.CLICK_LEN)
  }
, checkTime(){
    if ( ! this.nextStep ) return
    this.currentTime += this.CLICK_LEN
    this.setCursor(this.currentTime / 1000)
    ++ this.currentFrame
    if ( this.currentFrame >= this.nextStep.frame) {
      this.nextStep.exec()
      ++ this.istep
      delete this._nextstep
      if ( ! this.nextStep ) {
        // Pas d'étape suivante
        Anim.current.stop()
      }
    }
  }
, stop(){
    console.log("-> Timeline.stop", this.timer)
    clearInterval(this.timer)
    this.timer = null
    this.setCursor(0)
  }
, setCursor(time){
    this.cursor.style.left = `${Math.round(time * this.coefT2P)}px`
    UI.setHorloge(time)
  }
, calcCoefT2P(){
    return (window.innerWidth - 20) / Anim.current.duration
  }
}
Object.defineProperties(Timeline,{
  nextStep:{
    get(){
      if ( undefined === this._nextstep && this.steps[this.istep] ) {
        this._nextstep = new Step(this.istep, this.steps[this.istep])
      }
      return this._nextstep
    }
  }
, cursor:{
    get(){return this._cursor || (this._cursor = document.querySelector('div#cursor'))}
  }
, coefT2P:{
    get(){return this._coeft2p || (this._coeft2p = this.calcCoefT2P())}
  }
})
