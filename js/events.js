AFRAME.registerComponent('markerhandler', {

    init: function () {
        const animatedMarker = document.querySelector("#animated-marker");
        const aEntity = document.querySelector("#animated-model");
        const trianguloAvanzar = document.querySelector('#trianguloAvanzar');
        const trianguloRetroceder = document.querySelector('#trianguloRetroceder');
        

        // every click, we make our model grow in size :)
        aEntity.addEventListener('click', function (ev, target) {

            const scale = aEntity.getAttribute('scale');
            Object.keys(scale).forEach((key) => scale[key] = scale[key] + 1);
            aEntity.setAttribute('scale', scale);
            
            sonidoClick.components.sound.stopSound();
            sonidoClick.components.sound.playSound();
            console.log('cacaaaa');

        });

        var sonidoClick = document.querySelector('#sonido-click');
        var triangulos = document.querySelectorAll('.triangulos');
        for (var j = 0; j < triangulos.length; j++) {
            //cambiar de color los triangulos
            triangulos[j].addEventListener('click', function (e) {
                e.target.emit('animacionTriangulo');
                console.log('caca');



                /*for (var i = 0; i < e.target.parentNode.childNodes.length; i++) {
                        if (e.target.parentNode.childNodes[i].className == "title") {
                                e.target.parentNode.childNodes[i].emit('isvr_titlein');
                                //e.target.parentNode.childNodes[i].setAttribute('visible', true);
                                break;
                        }        
                }*/


                sonidoClick.components.sound.stopSound();
                sonidoClick.components.sound.playSound();


            });



        }
     







    }
});