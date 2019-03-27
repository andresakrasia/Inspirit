AFRAME.registerSystem('isvr-scene-helper', {

	showCursor: function () {

	},

	hideCursor: function () {

	},

});

AFRAME.registerComponent('isvr-scene', {



	init: function () {




		

		
		this.el.addEventListener('enter-vr', function () {
			//ir a la web de realidad
			top.location.href = 'https://www.google.es/';

		});

		this.el.addEventListener('exit-vr', function () {

			//location.reload();

		});

		var tarjetaMutua = document.querySelectorAll('.tarjetaMutua');
		var menu = document.querySelectorAll('.menusCiudad');
		
		var pantallaprimera = document.querySelectorAll('.primeraPantalla');
		var primerFondo = document.querySelectorAll('.primerFondo');

		var soundClick = document.querySelector('#sound-click');
		var pantallas = document.querySelectorAll('.pantalla');

		var juego = document.querySelectorAll('.juegoBoton');
		var blog = document.querySelectorAll('.blogBoton');
		var mutua = document.querySelectorAll('.mutuaBoton');
		var inspirit = document.querySelectorAll('.inspiritBoton');
		var logoBonton = document.querySelectorAll('.LogoBonton')
		setTimeout(function () {


			for (let i = 0; i < tarjetaMutua.length; i++) {

				

				
				

				tarjetaMutua[i].addEventListener('click', function () {


					tarjetaMutua[i].setAttribute("visible", false);

					menu[i].setAttribute("visible", true);
					
					

					

					primerFondo[i].emit('iniciarFading');
					pantallaprimera[i].emit('iniciarFading');

					var botons = document.querySelectorAll('.botones-'+i);
					
					for (let j = 0; j < botons.length; j++) {
						botons[j].setAttribute("visible", true);
						botons[j].emit('iniciarFading');
						

					}
					



				});
				
			}

		}, 10);



		/* Funcion animacion y sonido pantallas  */
		setTimeout(function () {


			var soundClick = document.querySelector('#sound-click');
			var pantallas = document.querySelectorAll('.pantalla');
			for (var j = 0; j < pantallas.length; j++) {

				pantallas[j].addEventListener('mouseenter', function (e) {

					e.target.emit('isvr_mouseenter');
					soundClick.components.sound.stopSound();
					soundClick.components.sound.playSound();

				});

				pantallas[j].addEventListener('mouseleave', function (e) {

					e.target.emit('isvr_mouseleave');

				});



			}



		}, 10);

		

		/*funcion botones cambiar color cuando esten seleccionados*/


		setTimeout(function () {
			for (let i = 0; i < logoBonton.length; i++) {
				logoBonton[i].addEventListener('click', function () {
					


					juego[i].setAttribute("material", "src", "#juegoInactivo");
					blog[i].setAttribute("material", "src", "#blogInactivo");
					mutua[i].setAttribute("material", "src", "#mutuaInactivo");
					inspirit[i].setAttribute("material", "src", "#inspiritInactivo");
					logoBonton[i].setAttribute("material","scr","#erasmusActivo");
					blog[i].emit('iniciarMenu');



				});
			}

		}, 10);
		setTimeout(function () {
			for (let i = 0; i < juego.length; i++) {
				juego[i].addEventListener('click', function () {
					


					juego[i].setAttribute("material", "src", "#juegoActivo");
					blog[i].setAttribute("material", "src", "#blogInactivo");
					mutua[i].setAttribute("material", "src", "#mutuaInactivo");
					inspirit[i].setAttribute("material", "src", "#inspiritInactivo");
					logoBonton[i].setAttribute("material","scr","#erasmusActivo");
					blog[i].emit('iniciarMenu');



				});
			}

		}, 10);
		setTimeout(function () {
			for (let i = 0; i < blog.length; i++) {
				blog[i].addEventListener('click', function () {
					

					juego[i].setAttribute("material", "src", "#juegoInactivo");
					blog[i].setAttribute("material", "src", "#blogActivo");
					mutua[i].setAttribute("material", "src", "#mutuaInactivo");
					inspirit[i].setAttribute("material", "src", "#inspiritInactivo");
					logoBonton[i].setAttribute("material","scr","#erasmusActivo");
					blog[i].emit('iniciarMenu');



				});
			}
		}, 10);
		setTimeout(function () {
			for (let i = 0; i < mutua.length; i++) {
				mutua[i].addEventListener('click', function () {
					

					blog[i].setAttribute("material", "src", "#blogInactivo");
					mutua[i].setAttribute("material", "src", "#mutuaActivo");
					inspirit[i].setAttribute("material", "src", "#inspiritInactivo");
					juego[i].setAttribute("material", "src", "#juegoInactivo");
					logoBonton[i].setAttribute("material","scr","#erasmusActivo");



				});
			}

		}, 10);
		setTimeout(function () {
			for (let i = 0; i < inspirit.length; i++) {
				inspirit[i].addEventListener('click', function () {
				

					blog[i].setAttribute("material", "src", "#blogInactivo");
					mutua[i].setAttribute("material", "src", "#mutuaInactivo");
					inspirit[i].setAttribute("material", "src", "#inspiritActivo");
					juego[i].setAttribute("material", "src", "#juegoInactivo");
					logoBonton[i].setAttribute("material","scr","#erasmusActivo");


				});
			}

		}, 10);


		/* workaround: it we don't wait, the first menu item mouseenter event is triggered and it causes wrong animation behaviour for that menu item */


		


	}


});