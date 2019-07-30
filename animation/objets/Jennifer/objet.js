'use strict'
Jennifer.addAction('cligne', function(){

})
Jennifer.addAction('ecrit', function(){

})

Jennifer.addAction('start', function(){
  this.x = -62
  this.y = -35
  this.do('show')
})
Jennifer.addAction('grossit', function(){
  $(this.obj).css('width', '20px')
  $(this.obj).animate({width:'440px'}, 1000)
})
Jennifer.addAction('diminue', function(){
  $(this.obj).animate({width:'20px'}, 1000)
})
