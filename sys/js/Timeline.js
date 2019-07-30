'use strict'

const Timeline = {

  currentTime: 0
, CLICK_LEN: 100 // tous les dizièmes de seconde

, start(){
    const my = this
    this.currentFrame = 0
    this.istep = 0
    this.timer = setInterval(my.checkTime.bind(my), this.CLICK_LEN)
  }
, checkTime(){
    if ( ! this.nextStep ) return
    this.currentTime += this.CLICK_LEN
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
    clearInterval(this.timer)
    this.timer = null
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
})
