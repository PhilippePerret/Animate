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
    let w = Renderer.width  // correspond à Anim.current.width
    let h = Renderer.height // correspond à Anim.current.height
    this.obj.style = `width:${w}px;height:${h}px;margin-left:${mg}px;margin-top:${mg}px;`
  }

  // Dispatche les propriétés +props+
  // @param {String} props Liste de paire prop=val séparées par des espaces
  setProps(props){
    for( var paire of props.split(' ')){
      var [prop, valStr] = paire.split('=')
      // console.log("Mettre `%s` à %s", prop, valStr)
      var valInt = parseInt(valStr,10)
        , valFloat = parseFloat(valStr)
      switch (prop) {
        case 'x':
        case 'y':
        case 'h':
        case 'w':
          this[prop] = valInt; break
        case 'r':
          this.r = valFloat; break
        default:
          console.error("Je ne sais pas traiter la propriété `%s` de la caméra.", prop)
      }
    }
  }

  observe(){
    const my = this
    $(this.obj)
      .resizable({aspectRatio:true, stop:my.onEndResize.bind(my)})
      .draggable({stop: my.onEndDrag.bind(my)})
  }

  // Méthode appelée en fin de drag de la caméra
  onEndDrag(e){
    this.x = this.getX()
    this.y = this.getY()
    Console.write(this.props)
  }

  // Méthode appelée quand on finit de redimensionner la caméra
  onEndResize(e,ui){
    var newW = ui.size.width
    this._r = Math.round((newW / Renderer.width) * 100) / 100
    Console.write(this.props)
  }

  // Retourne les propriétés courantes sous forme de string
  get props(){
    return `x=${this.getX()} y=${this.getY()} r=${this.r}`
  }

  // Position horizontale de la caméra
  get x() {return this._x || 40 }
  set x(v){ this._x = v }
  getX(){return this.position.left}

  // Position verticale de la caméra
  get y() {return this._y || 40 }
  set y(v){ this._y = v }
  getY(){return this.position.top}

  get w() { return this._w || (Renderer.width * this.r) }
  set w(v){ this._w = v}
  getW(){return $(this.obj).width()}

  get h() { return this._h || (Renderer.height * this.r) }
  set h(v){ this._h = v}
  getH(){return $(this.obj).height()}

  // Ratio de la caméra
  get r() { return this._r || 1 }
  set r(v){ this._r = v }

  get position(){return $(this.obj).offset()}
  get name(){return 'Camera'} // cohérence avec les objets
}
