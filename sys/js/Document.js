'use script'

const Document = {

  // Pour ajouter une balise script
  addScriptAnim(name){
    return new Promise((ok,ko) => {
      var t = document.createElement('SCRIPT')
      t.src = `animation/${name}.js`
      document.body.appendChild(t)
      t.addEventListener('load', ok)
    })
  }
}
