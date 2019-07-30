'use script'

const Document = {

  // Pour ajouter une balise script
  addScriptAnim(name){
    var t = document.createElement('SCRIPT')
    t.src = `animation/js/${name}.js`
    document.body.appendChild(t)
  }
}
