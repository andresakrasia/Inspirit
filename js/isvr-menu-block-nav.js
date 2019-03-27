
AFRAME.registerComponent('isvr-menu-block-nav-0', {


        schema: {
                show: {
                        type: 'string'
                },
                inactivecolor: {
                        type: 'string'
                },
                activecolor: {
                        type: 'string'
                }
        },


        init: function () {

                var self = this;
                var data = this.data;


                /* initial state */
                if (this.el.getAttribute('color') == data.activecolor) {
                        this.el.addState('active');
                }




                this.el.addEventListener('mouseleave', function () {

                        if (!self.el.is('active')) {
                                self.el.setAttribute('color', data.inactivecolor);
                        }
                });




                var all = document.querySelectorAll('.botones-0');
                var soundClick = document.querySelector('#sound-click')

                this.el.addEventListener('click', function (evt) {



                        var activeEl = null;

                        if (self.el.is('active')) {
                                return;
                        }

                        for (var i = 0; i < all.length; i++) {
                                if (all[i].is('active')) {
                                        activeEl = all[i];
                                }
                                all[i].setAttribute('color', data.inactivecolor);
                                all[i].removeState('active');
                        }

                        self.el.setAttribute('color', data.activecolor);
                        self.el.addState('active');
                        soundClick.components.sound.stopSound();
                        soundClick.components.sound.playSound();

                        var next_number = data.show.slice(-1);
                        var current_number = activeEl.getAttribute('isvr-menu-block-nav-0').show.slice(-1);




                        document.querySelector('#menuCiudad0').emit('from_' + current_number + '_to_' + next_number);






                        var marcadores = document.querySelectorAll('.marcador');

                        /* show next menu block */
                        setTimeout(function () {
                                //document.querySelector('#menu-block-' + next_number).setAttribute('visible', true);

                                if (current_number < next_number) {
                                        for (var j = current_number; j <= next_number; j++) {
                                                marcadores[0].querySelector('.menu-' + j).setAttribute('visible', true);
                                        }
                                } else {
                                        for (var j = current_number; j >= next_number; j--) {
                                                marcadores[0].querySelector('.menu-' + j).setAttribute('visible', true);
                                        }
                                }

                        }, 300);


                        setTimeout(function () {
                                //marcadores[0].querySelector('.menu-' + current_number).setAttribute('visible', false);


                                if (current_number < next_number) {
                                        for (var j = current_number; j < next_number; j++) {
                                                marcadores[0].querySelector('.menu-' + j).setAttribute('visible', false);
                                        }
                                } else {
                                        for (var j = current_number; j > next_number; j--) {
                                                marcadores[0].querySelector('.menu-' + j).setAttribute('visible', false);
                                        }
                                }

                        }, 500);

                });




        }

});

AFRAME.registerComponent('isvr-menu-block-nav-1', {


        schema: {
                show: {
                        type: 'string'
                },
                inactivecolor: {
                        type: 'string'
                },
                activecolor: {
                        type: 'string'
                }
        },


        init: function () {

                var self = this;
                var data = this.data;


                /* initial state */
                if (this.el.getAttribute('color') == data.activecolor) {
                        this.el.addState('active');
                }




                this.el.addEventListener('mouseleave', function () {

                        if (!self.el.is('active')) {
                                self.el.setAttribute('color', data.inactivecolor);
                        }
                });




                var all = document.querySelectorAll('.botones-1');
                var soundClick = document.querySelector('#sound-click')

                this.el.addEventListener('click', function (evt) {



                        var activeEl = null;

                        if (self.el.is('active')) {
                                return;
                        }

                        for (var i = 0; i < all.length; i++) {
                                if (all[i].is('active')) {
                                        activeEl = all[i];
                                }
                                all[i].setAttribute('color', data.inactivecolor);
                                all[i].removeState('active');
                        }

                        self.el.setAttribute('color', data.activecolor);
                        self.el.addState('active');
                        soundClick.components.sound.stopSound();
                        soundClick.components.sound.playSound();

                        var next_number = data.show.slice(-1);
                        var current_number = activeEl.getAttribute('isvr-menu-block-nav-1').show.slice(-1);




                        document.querySelector('#menuCiudad1').emit('from_' + current_number + '_to_' + next_number);






                        var marcadores = document.querySelectorAll('.marcador');

                        /* show next menu block */
                        setTimeout(function () {
                                //document.querySelector('#menu-block-' + next_number).setAttribute('visible', true);

                                if (current_number < next_number) {
                                        for (var j = current_number; j <= next_number; j++) {
                                                marcadores[1].querySelector('.menu-' + j).setAttribute('visible', true);
                                        }
                                } else {
                                        for (var j = current_number; j >= next_number; j--) {
                                                marcadores[1].querySelector('.menu-' + j).setAttribute('visible', true);
                                        }
                                }

                        }, 300);


                        setTimeout(function () {
                                //marcadores[0].querySelector('.menu-' + current_number).setAttribute('visible', false);


                                if (current_number < next_number) {
                                        for (var j = current_number; j < next_number; j++) {
                                                marcadores[1].querySelector('.menu-' + j).setAttribute('visible', false);
                                        }
                                } else {
                                        for (var j = current_number; j > next_number; j--) {
                                                marcadores[1].querySelector('.menu-' + j).setAttribute('visible', false);
                                        }
                                }

                        }, 500);

                });




        }

});