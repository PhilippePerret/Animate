'use strict'

/**
  Class Camera
  ------------
  Pour la gestion de la caméra

**/
class Camera {

  constructor(anim /* instance Anim, courante */){
    this.a = this.animation = anim
  }

  init(){
    this.build()
    this.setDimensions()
    this.observe()
  }
  build(){
    let d = document.createElement('DIV')
    d.className = 'camera'
    this.obj = d
    Builder.append(this.obj)
  }

  setDimensions(){
    const mg = 40 // la marge autour
    let w = Renderer.width
    let h = Renderer.height
    this.obj.style = `width:${w}px;height:${h}px;margin-left:${mg}px;margin-top:${mg}px;`
  }

  observe(){
    $(this.obj).resizable({aspectRatio:true})
  }

  get x(){return this.position.left}
  get y(){return this.position.top}
  get position(){return $(this.obj).offset()}
}
