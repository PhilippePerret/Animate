$(document).ready(function(){
  console.log("Je suis prêt.")
  // Quand on est prêt on charge les fichiers de l'animation
  Document.addScriptAnim('objets')
  Document.addScriptAnim('timeline')

  Anim.current.init()
})
