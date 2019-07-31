'use strict'

const Timeline = {

  currentTime: 0
, CLICK_LEN: 1000/24 // tous les 24e de seconde

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
    this.setCursor(this.currentTime)
    this.timer = setInterval(my.checkTime.bind(my), my.CLICK_LEN)
  }
, checkTime(){
    this.currentTime += this.CLICK_LEN
    this.setCursor(this.currentTime)
    ++ this.currentFrame
    if ( this.nextStep ) {
      // S'il y a une étape suivante
      if ( this.currentFrame >= this.nextStep.frame) {
        this.nextStep.exec()
        ++ this.istep
        delete this._nextstep
      }
    }
    // Si on arrive au bout du temps
    if ( this.currentTime > Anim.current.duration * 1000 ) {
      Anim.current.stop()
    }
  }
, stop(){
    console.log("-> Timeline.stop", this.timer)
    clearInterval(this.timer)
    this.timer = null
  }
, setCursor(time){
    this.cursor.style.left = `${Math.round((time / 1000) * this.coefT2P)}px`
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
