AFRAME.registerSystem('isvr-scene-helper', {

    showCursor: function () {

    },

    hideCursor: function () {

    },

});

AFRAME.registerComponent('escena-interactiva', {
  
    init: function () {

        this.el.addEventListener('enter-vr', function() {

            top.location.href = 'https://www.google.es/';

        });

        this.el.addEventListener('exit-vr', function() {

            //location.reload();

        });


			
    }

});

