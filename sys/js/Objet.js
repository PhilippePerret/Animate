'use strict'

/**
  Class Objet
  -----------
  Gestion des objets
**/
class Objet {

  // Retourne l'objet de nom +objet_name+
  static get(objet_name){
    return this.items.get(objet_name)
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

  static modifySelection(code){
    if ( ! this._selected ) return
    const sel = this._selected
    console.log("Je dois modifier la sélection avec %s", code)
    // On décompose par pair
    for( var paire of code.split(' ')){
      var [prop, valStr] = paire.split('=')
      console.log("Mettre `%s` à %s", prop, valStr)
      var valInt = parseInt(valStr,10)
      switch (prop) {
        case 'x': sel.camX = valInt; break;
        case 'y': sel.camY = valInt; break;
        case 'h': sel.h = valInt; break;
        case 'w': sel.w = valInt; break;
        default:
          console.error("Je ne sais pas traiter la propriété `%s`", prop)
      }
    }
  }

  // ---------------------------------------------------------------------
  //  INSTANCE

  constructor(data){
    this.data = data
    for(var k in data) this[k] = data[k]
    // On l'ajoute à la liste des objets
    this.constructor.add(this)

    var err = this.isValid()
    !err || raise(`L'objet ${JSON.stringify(data)} n'est pas valide : ${err}.`)
    // Quand on crée un objet, on crée automatiquement la balise chargeant
    // ses détails
    this.buildTag()
    // On crée l'objet
    this.buildObjet()
    // On observe l'objet
    this.observe()
  }


  isValid(){
    try {
      this.name || raise("la propriété `name` doit être définie", false)
      this.img || this.imgs || this.html || raise("Une des trois propriétés `img`, `imgs` ou `html` doit définir le contenu de l'objet", false)
    } catch (e) {
      return e.message
    }
  }
  buildTag(){
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

  addAction(actionName, actionFunction){
    if (undefined === this.actions) this.actions = new Map()
    this.actions.set(actionName, actionFunction)
  }
  // Pour jouer une action
  do(actionName){
    switch (actionName) {
      case 'show':
        Renderer.append(this.obj)
        break
      case 'hide':
        Renderer.remove(this.obj)
        break
      default:
        let action = this.actions.get(actionName)
        action.call(this)
    }
  }

  // ---------------------------------------------------------------------
  //  MÉTHODES DE POSITIONS ET POSITIONNEMENT

  // Position horizontale dans le Builder
  get x(){return this.offset.left}
  set x(v){$(this.obj).css('left', `${v}px`)}
  // Position horizontale par rapport à la caméra
  get camX(){return this.x - Anim.current.camera.x}
  set camX(v){this.x = v + Anim.current.camera.x}
  // Position verticale dans le Builder
  get y(){return this.offset.top}
  set y(v){$(this.obj).css('top', `${v}px`)}
  // Position verticale par rapport à la caméra courante
  get camY(){return this.y - Anim.current.camera.y}
  set camY(v){this.y = v + Anim.current.camera.y}
  get offset(){return $(this.obj).offset()}
  // Largeur
  get w(){return $(this.obj).width}
  set w(v){$(this.obj).css('width', `${v}px`)}
  // Hauteur
  get h(){return $(this.obj).height}
  set h(v){$(this.obj).css('height', `${v}px`)}


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
    Footer.write(`x=${this.camX} y=${this.camY}`)
    if ( ! this.isSelected ) this.select(e)
  }
  // Méthode appelée pendant qu'on draggue l'objet
  onDrag(e){
    Footer.write(`x=${this.camX} y=${this.camY}`)
  }

  // Méthode appelée quand on a fini de redimensionner l'élément
  writeSize(e, ui){
    console.log("ui = ", ui)
    Footer.write(`w=${Math.round(ui.size.width)} h=${Math.round(ui.size.height)}`)
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
