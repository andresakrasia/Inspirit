!function(t) {
    function e(i) {
        if(a[i])return a[i].exports;
        var d=a[i]= {
            exports: {}
            ,
            id: i, loaded: !1
        }
        ;
        return t[i].call(d.exports, d, d.exports, e),
        d.loaded=!0,
        d.exports
    }
    var a= {}
    ;
    return e.m=t,
    e.c=a,
    e.p="",
    e(0)
}

([function(t, e) {
    AFRAME.registerComponent("rounded", {
        schema: {
            enabled: {
                default: !0
            }
            , width: {
                type: "number", default: 1
            }
            , height: {
                type: "number", default: 1
            }
            , radius: {
                type: "number", default: .3
            }
            , topLeftRadius: {
                type: "number", default: -1
            }
            , topRightRadius: {
                type: "number", default: -1
            }
            , bottomLeftRadius: {
                type: "number", default: -1
            }
            , bottomRightRadius: {
                type: "number", default: -1
            }
            , color: {
                type: "color", default: "#F0F0F0"
            }
            , opacity: {
                type: "number", default: 1
            }
        }
        , init:function() {
            this.rounded=new THREE.Mesh(this.draw(), new THREE.MeshPhongMaterial( {
                color: new THREE.Color(this.data.color), side: THREE.DoubleSide
            }
            )), this.updateOpacity(), this.el.setObject3D("mesh", this.rounded)
        }
        , update:function() {
            this.data.enabled?this.rounded&&(this.rounded.visible=!0, this.rounded.geometry=this.draw(), this.rounded.material.color=new THREE.Color(this.data.color), this.updateOpacity()): this.rounded.visible=!1
        }
        , updateOpacity:function() {
            this.data.opacity<0&&(this.data.opacity=0), this.data.opacity>1&&(this.data.opacity=1), this.data.opacity<1?this.rounded.material.transparent=!0: this.rounded.material.transparent=!1, this.rounded.material.opacity=this.data.opacity
        }
        , tick:function() {}
        , remove:function() {
            this.rounded&&(this.el.object3D.remove(this.rounded), this.rounded=null)
        }
        , draw:function() {
            function t(t, e, a, i, d, o, u, r, s) {
                o||(o=1e-5), u||(u=1e-5), r||(r=1e-5), s||(s=1e-5), t.moveTo(e, a+o), t.lineTo(e, a+d-o), t.quadraticCurveTo(e, a+d, e+o, a+d), t.lineTo(e+i-u, a+d), t.quadraticCurveTo(e+i, a+d, e+i, a+d-u), t.lineTo(e+i, a+s), t.quadraticCurveTo(e+i, a, e+i-s, a), t.lineTo(e+r, a), t.quadraticCurveTo(e, a, e, a+r)
            }
            var e=new THREE.Shape, a=[this.data.radius, this.data.radius, this.data.radius, this.data.radius];
            return this.data.topLeftRadius!=-1&&(a[0]=this.data.topLeftRadius), this.data.topRightRadius!=-1&&(a[1]=this.data.topRightRadius), this.data.bottomLeftRadius!=-1&&(a[2]=this.data.bottomLeftRadius), this.data.bottomRightRadius!=-1&&(a[3]=this.data.bottomRightRadius), t(e, -this.data.width/2, -this.data.height/2, this.data.width, this.data.height, a[0], a[1], a[2], a[3]), new THREE.ShapeBufferGeometry(e)
        }
        , pause:function() {}
        , play:function() {}
    }
    ), AFRAME.registerPrimitive("a-rounded", {
        defaultComponents: {
            rounded: {}
        }
        , mappings: {
            enabled: "rounded.enabled", width: "rounded.width", height: "rounded.height", radius: "rounded.radius", "top-left-radius": "rounded.topLeftRadius", "top-right-radius": "rounded.topRightRadius", "bottom-left-radius": "rounded.bottomLeftRadius", "bottom-right-radius": "rounded.bottomRightRadius", color: "rounded.color", opacity: "rounded.opacity"
        }
    }
    )
}

]);