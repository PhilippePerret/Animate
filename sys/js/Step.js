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
    this.objet.do(this.action)
  }

  get objet(){
    return this._objet || ( this._objet = Objet.get(this.name))
  }
}
