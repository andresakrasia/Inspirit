
/*
AFRAME.registerComponent('colorize',{
  schema:{
    initialColor: {type:'color',default:''},
    onClick:{type:'color', default:''}
  },

  init: function(){
    var el = this.el;
    var data = this.data;
    
    el.setAttribute('material','color', data.initialColor);
    
    el.addEventListener('click',function(){
      el.setAttribute('material','color',data.onClick);
    });
  }

});

AFRAME.registerComponent('random-color',{
  schema:{
    target:{type:'selector',default:''}
  },
  init: function(){
    var el = this.el;
    var data = this.data;

    el.addEventListener('click',function(){
      var randomHEX = '#' + Math.random().toString(16).substr(-6);
      if(data.targer){
        data.target.setAttribute('material','color',randomHEX);
      }else{
        el.setAttribute('material','color',randomHEX);
      }
    });
  }
});

AFRAME.registerComponent('visualize',{

schema:{
  target:{type:'selector',default:''}
},

  init:function(){
    var el = this.el;
    var data = this.data;

    el.addEventListener('click',function(){
      el.setAttribute('visible',false);
    });

    
  }
});
*/



AFRAME.registerComponent('visual-monument',{
 
  init:function(){
        var monumentos = document.querySelectorAll('.monumento');
       
        for(let i=0;i<monumentos.length;i++){}
                    setTimeout(function(){
                          
                            
                              monumentos[0].addEventListener('click',function(){
                              monumentos[0].setAttribute("visible",false);
                              monumentos[1].setAttribute("visible",true);
                              
                              });

                              
                      });

                      setTimeout(function(){
                          
                            
                        monumentos[1].addEventListener('click',function(){
                        monumentos[1].setAttribute("visible",false);
                        monumentos[2].setAttribute("visible",true);
                        });

                      });
                      setTimeout(function(){
                          
                            
                        monumentos[2].addEventListener('click',function(){
                        monumentos[2].setAttribute("visible",false);
                        monumentos[3].setAttribute("visible",true);
                        });

                      });
                      setTimeout(function(){
                          
                            
                        monumentos[3].addEventListener('click',function(){
                        monumentos[3].setAttribute("visible",false);
                        monumentos[4].setAttribute("visible",true);
                        });

                      });
                      setTimeout(function(){
                          
                            
                        monumentos[4].addEventListener('click',function(){
                        monumentos[4].setAttribute("visible",false);
                        monumentos[0].setAttribute("visible",true);
                        });

                      })
          
  }
});
