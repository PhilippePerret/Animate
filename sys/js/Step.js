'use strict'

class Step {
  static get(istep, data){
    if ( undefined === this.items ) this.items = new Map()
    if ( undefined === this.items.get(istep) ) this.items.set(istep, new Step(istep, data))
    return this.items.get(istep)
  }

  // ---------------------------------------------------------------------
  //  INSTANCE

  constructor(istep, data){
    this.index  = istep
    this.data   = data
    for(var k in data) this[k] = data[k]
  }

  exec(){
    console.log("Je vais exécuter l'objet %s", this.name)
    // Si de nouvelle propriétés sont définies
    if ( this.props ) {
      console.log("Nouvelles propriétés définies : %s, à appliquer en %d secondes", this.props, this.duration)
      if ( this.isCamera ) {
        // Propriétés appliquées à la caméra
        // => ce sont les objets visibles qu'il faut modifier
        let hprops = strToHash(this.props)

        // TODO : VOIR SI ON PEUT FAIRE DES SCREENSHOTS POUR VRAIMENT FAIRE UN
        // RENDU
        
      } else {
        // Propriétés appliquées à un objet quelconque
        $(this.objet.obj).css(strToHashProps(this.props))
      }
    }
    // Si une action est définie
    if ( this.action ) {
      this.objet.do(this.action)
    }
  }

  get objet(){
    return this._objet || ( this._objet = Objet.get(this.name))
  }
  get isCamera(){return this.name === 'Camera'}
}
