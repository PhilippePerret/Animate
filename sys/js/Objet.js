'use strict'

/**
  Class Objet
  -----------
  Gestion des objets
**/
class Objet {

  // Retourne l'objet de nom +objet_name+
  static get(objet_name){
    switch (objet_name) {
      case 'Camera':
        return Anim.current.camera
      default:
        return this.items.get(objet_name)
    }
  }
  static add(objet){
    if (undefined === this.items) this.items = new Map()
    this.items.set(objet.name, objet)
  }
  static select(objet){
    this.deselect(this._selected)
    this._selected = objet
    $(this._selected.obj).addClass('selected')
  }
  static deselect(objet){
    objet && $(objet.obj).removeClass('selected')
  }
  static deselectAll(){
    this.deselect(this._selected) // pour le moment, un seul
  }

  static resetAllItems(){
    console.log("-> Objet::resetAllItems")
    this.items.forEach( o => o.reset() )
  }

  static appendAllToBuilder(){
    this.items.forEach( o => o.add2Builder() )
  }

  static modifySelection(code){
    if ( ! this._selected ) return
    const sel = this._selected
    console.log("Je dois modifier la sélection avec %s", code)
    this._selected.setProps(code)
  }

  // ---------------------------------------------------------------------
  //  INSTANCE

  constructor(data){
    this.data = data
    for(var k in data) this[k] = data[k]

    // On regarde si cet objet est valide
    var err = this.isValid()
    !err || raise(`L'objet ${JSON.stringify(data)} n'est pas valide : ${err}.`)

    // On ajoute cet objet à la liste des objets
    this.constructor.add(this)

    // Quand on crée un objet, on crée automatiquement la balise chargeant
    // ses détails
    this.buildScriptTag()

    // Si des propriétés ont été définies, il faut les prendre pour
    // pouvoir les appliquer dans la construction de l'objet
    if ( this.props ) this.setProps(this.props)

    // On crée l'objet
    this.buildObjet()
    // On observe l'objet
    this.observe()
  }


  // Retourne un message d'erreur si l'objet n'est pas valide
  isValid(){
    try {
      this.name || raise("la propriété `name` doit être définie", false)
      this.img || this.imgs || this.html || raise("Une des trois propriétés `img`, `imgs` ou `html` doit définir le contenu de l'objet", false)
    } catch (e) {
      return e.message
    }
  }

  // Dispatche les propriétés +props+
  // @param {String} props Liste de paire prop=val séparées par des espaces
  setProps(props){
    for( var paire of props.split(' ')){
      var [prop, valStr] = paire.split('=')
      // console.log("Mettre `%s` à %s", prop, valStr)
      var valInt = parseInt(valStr,10)
      switch (prop) {
        case 'x':
        case 'y':
        case 'h':
        case 'w':
        case 'r':
          this[prop] = valInt; break
        default:
          console.error("Je ne sais pas traiter la propriété `%s` de l'objet %s.", prop, this.name)
      }
    }
  }

  // Construction de la balise <script> qui charge la définition des
  // actions et états de l'objet.
  buildScriptTag(){
    var tag = document.createElement('SCRIPT')
    tag.src = `${this.folder}/objet.js`
    document.body.appendChild(tag)
    if ( this.css ) {
      tag = document.createElement('LINK')
      tag.setAttribute('REL', 'stylesheet')
      this.css === true && ( this.css = 'styles.css' )
      if ( ! this.css.endsWith('.css') ) this.css += '.css'
      tag.setAttribute('href',`${this.folder}/${this.css}`)
      document.body.appendChild(tag)
    }
  }

  buildObjet(){
    var d = document.createElement('DIV')
    d.id = this.name
    d.className = 'objet-conteneur'
    d.style = this.defaultStyle
    if (this.img) {
      var i = document.createElement('IMG')
      i.src = `${this.folder}/img/${this.img}`
      i.style = 'width:100%;'
      d.appendChild(i)
    } else if ( this.imgs ) {

    } else /* if this.html */ {
      d.innerHTML = this.html
    }
    this.obj = d
    Builder.append(this.obj)
    d = null
  }

  // ---------------------------------------------------------------------
  //  MÉTHODES D'ANIMATION

  addAction(actionName, actionFunction){
    if (undefined === this.actions) this.actions = new Map()
    this.actions.set(actionName, actionFunction)
  }
  // Pour jouer une action
  do(actionName){
    switch (actionName) {
      case 'show':
        this.setInRenderer()
        this.add2Renderer()
        break
      case 'hide':
        this.add2Builder()
        break
      default:
        let action = this.actions.get(actionName)
        action.call(this)
    }
  }

  add2Renderer() { Renderer.append(this.obj)}
  add2Builder()  { Builder.append(this.obj)}

  // ---------------------------------------------------------------------
  //  MÉTHODES DE POSITIONS ET POSITIONNEMENT

  // Positionne et dimensionne l'objet dans le renderer en fonction des
  // données courantes.
  // Ces données peuvent être modifiées en fonction du ratio de la caméra
  // courante et de sa position.
  setInRenderer(){
    let p = []
      , cam = Anim.current.camera
    p.push(`left:${this.x - cam.x}px;`)
    p.push(`top:${this.y - cam.y}px;`)
    if ( this.w ) p.push(`${Math.round(this.w / cam.r)}px;`)
    if ( this.h ) p.push(`${Math.round(this.h / cam.r)}px;`)
    this.obj.style = p.join('')
  }

  reset(){
    this.obj.style = this.defaultStyle
  }

  // Style par défaut (dans le builder)
  get defaultStyle(){
    if ( undefined === this._defaultstyle ) {
      this._defaultstyle = `left:${this.x}px;top:${this.y}px;width:${this.w}px;`
      if ( this.r ) this._defaultstyle += `transform:rotate(${this.r}deg)`
    }
    return this._defaultstyle
  }

  // Position horizontale dans le Builder
  get x(){return this._x || 10}
  set x(v){this._x = v}
  getX(){return this.offset.left}
  setX(){$(this.obj).css('left', `${this.x}px`)}

  // Position verticale dans le Builder
  get y(){return this._y || 10}
  set y(v){this._y = v}
  getY(){return this.offset.top}
  setY(){$(this.obj).css('top', `${this.y}px`)}

  // Largeur
  get w(){return this._w}
  set w(v){this._w = v}
  getW(){return $(this.obj).width}
  setW(){$(this.obj).css('width', `${this.w}px`)}

  // Hauteur
  get h(){return this._h}
  set h(v){this._h = v}
  getH(){return $(this.obj).height}
  setH(){$(this.obj).css('height', `${this.h}px`)}

  get offset(){return $(this.obj).offset()}

  // ---------------------------------------------------------------------
  //  Méthodes évènementielles

  observe(){
    const my = this
    $(this.obj).draggable({stop: my.endDrag.bind(my), drag:my.onDrag.bind(my)})
    $(this.obj).on('click', my.select.bind(my))
    $(this.obj).resizable({
        aspectRatio:true, ghost:true
      , stop:my.writeSize.bind(my)
    })
  }

  // Méthode appelée quand on a fini de dragguer l'objet
  endDrag(e){
    // console.log("x: %d, y:%d, camera-x: %d, camera-y: %d", this.x, this.y, Anim.current.camera.x, Anim.current.camera.y)
    Console.write(`x=${this.getX()} y=${this.getY()}`)
    if ( ! this.isSelected ) this.select(e)
  }
  // Méthode appelée pendant qu'on draggue l'objet
  onDrag(e){
    Console.write(`x=${this.getX()} y=${this.getY()}`)
  }

  // Méthode appelée quand on a fini de redimensionner l'élément
  writeSize(e, ui){
    Console.write(`w=${Math.round(ui.size.width)} h=${Math.round(ui.size.height)}`)
  }

  select(e){
    console.log("-> select %s", this.name)
    this.constructor.select(this, /* keep = */ e.shiftKey)
    this.isSelected = true
    return stopEvent(e)
  }

  deselect(){
    this.constructor.deselect(this, /* keep = */ e.shiftKey)
    this.isSelected = false
    return stopEvent(e)
  }
  // ---------------------------------------------------------------------

  // Paths

  // Le dossier qui contient tous les éléments de l'objet
  // Note : pour les src et href des images, css, etc.
  get folder(){
    return this._folder || ( this._folder = `animation/objets/${this.name}` )
  }

  get id(){
    return this.name
  }
}
