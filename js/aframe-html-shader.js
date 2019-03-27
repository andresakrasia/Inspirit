! function(t) {
    function e(r) {
        if (n[r]) return n[r].exports;
        var i = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return t[r].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports
    }
    var n = {};
    return e.m = t, e.c = n, e.p = "", e(0)
}([function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }

    function i(t, e) {
        return {
            status: "error",
            target: e,
            message: t,
            timestamp: Date.now()
        }
    }
    var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        },
        s = n(7),
        a = r(s);
    if ("undefined" == typeof AFRAME) throw "Component attempted to register before AFRAME was available.";
    var c = AFRAME.utils.debug;
    c.enable("shader:html:warn");
    var h = c("shader:html:warn"),
        u = c("shader:html:debug");
    AFRAME.registerShader("html", {
        schema: {
            color: {
                type: "color"
            },
            fog: {
                default: !0
            },
            target: {
                default: null
            },
            debug: {
                default: null
            },
            fps: {
                type: "number",
                default: 0
            },
            width: {
                default: null
            },
            height: {
                default: null
            },
            ratio: {
                default: null
            }
        },
        init: function(t) {
            return u("init", t), this.__cnv = document.createElement("canvas"), this.__cnv.width = 2, this.__cnv.height = 2, this.__ctx = this.__cnv.getContext("2d"), this.__texture = new THREE.Texture(this.__cnv), this.__reset(), this.material = new THREE.MeshBasicMaterial({
                map: this.__texture
            }), this.el.sceneEl.addBehavior(this), this.material
        },
        update: function(t) {
            return u("update", t), this.__updateMaterial(t), this.__updateTexture(t), this.material
        },
        tick: function(t) {
            if (!this.__paused && this.__target && this.__nextTime) {
                var e = Date.now();
                e > this.__nextTime && this.__render()
            }
        },
        __updateMaterial: function(t) {
            var e = this.material,
                n = this.__getMaterialData(t);
            Object.keys(n).forEach(function(t) {
                e[t] = n[t]
            })
        },
        __getMaterialData: function(t) {
            return {
                fog: t.fog,
                color: new THREE.Color(t.color)
            }
        },
        __setTexure: function(t) {
            u("__setTexure", t), "error" === t.status ? (h("Error: " + t.message + "\ntarget: " + t.target), this.__reset()) : "success" === t.status && t.target !== this.__textureSrc && this.__ready(t)
        },
        __updateTexture: function(t) {
            var e = this,
                n = t.target,
                r = t.fps,
                i = t.width,
                o = t.height,
                s = t.ratio;
            this.__width = i || this.schema.width.default, this.__height = o || this.schema.height.default;
            var a = function() {
                e.__debugEl && (e.__debugEl.innerHTML = "", e.__debugEl = e.schema.debug.default)
            };
            if (t.debug) {
                var c = this.__validateAndGetQuerySelector(t.debug);
                c && !c.error ? this.__debugEl = c : a()
            } else a();
            if (s && "width" === s || "height" === s ? this.__ratio = s : this.__ratio = this.schema.ratio.default, r)
                if (this.__fps > 0) this.__fps = r;
                else if (r === -1) {
                this.__fps = this.schema.fps.default, this.__target && this.__render();
                var h = Object.assign({}, this.el.getAttribute("material"));
                delete h.fps, this.el.setAttribute("material", h)
            } else this.__fps = r, this.__target && (this.play(), this.__render());
            else this.__fps > 0 ? this.pause() : this.__fps = this.schema.fps.default;
            if (n) {
                if (n === this.__target) return;
                this.__target = n, this.__validateSrc(n, this.__setTexure.bind(this))
            } else this.__reset()
        },
        __validateSrc: function(t, e) {
            var n = void 0,
                r = this.__validateAndGetQuerySelector(t);
            if (r && "object" === ("undefined" == typeof r ? "undefined" : o(r))) {
                if (r.error) n = r.error;
                else {
                    var s = r.tagName.toLowerCase();
                    "img" === s || "video" === s ? n = "For <" + s + "> element, please use `shader:flat`" : e({
                        status: "success",
                        target: t,
                        targetEl: r,
                        timestamp: Date.now()
                    })
                }
                if (n) {
                    var a = i(n, t);
                    e(a)
                }
            }
        },
        __validateAndGetQuerySelector: function(t) {
            try {
                var e = document.querySelector(t);
                return e ? e : {
                    error: "No element was found matching the selector"
                }
            } catch (t) {
                return {
                    error: "no valid selector"
                }
            }
        },
        pause: function() {
            u("pause"), this.__paused = !0, this.__nextTime = null
        },
        play: function() {
            u("play"), this.__paused = !1
        },
        togglePlayback: function() {
            this.paused() ? this.play() : this.pause()
        },
        paused: function() {
            return this.__paused
        },
        __clearCanvas: function() {
            this.__ctx && this.__texture && (this.__ctx.clearRect(0, 0, this.__width, this.__height), this.__texture.needsUpdate = !0)
        },
        __draw: function(t) {
            if (u("__draw"), this.__ctx && this.__texture) {
                var e = t.width / t.height,
                    n = this.__cnv.width = THREE.Math.nearestPowerOfTwo(t.width),
                    r = this.__cnv.height = THREE.Math.nearestPowerOfTwo(t.height);
                if (this.__ctx.drawImage(t, 0, 0, n, r), this.__texture.needsUpdate = !0, this.__ratio) {
                    var i = this.el.getObject3D("mesh").geometry.metadata.parameters,
                        o = i.width,
                        s = i.height;
                    this.el.setAttribute("geometry", Object.assign({}, this.el.getAttribute("geometry"), {
                        width: "width" === this.__ratio ? o : s * e,
                        height: "width" === this.__ratio ? o / e : s
                    }))
                }
                this.__debugEl && (this.__debugEl.innerHTML = "", this.__debugEl.appendChild(t)), this.__setNextTick()
            }
        },
        __render: function() {
            if (this.__nextTime = null, this.__targetEl) {
                var t = this.__targetEl.getBoundingClientRect(),
                    e = t.width,
                    n = t.height;
                (0, a.default)(this.__targetEl, {
                    background: void 0,
                    width: this.__width || e,
                    height: this.__height || n,
                    onrendered: this.__draw.bind(this)
                })
            }
        },
        __setNextTick: function() {
            this.__fps > 0 && (this.__nextTime = Date.now() + 1e3 / this.__fps)
        },
        __ready: function(t) {
            var e = t.target,
                n = t.targetEl;
            u("__ready"), this.__target = e, this.__targetEl = n, this.play(), this.__render()
        },
        __reset: function() {
            this.pause(), this.__clearCanvas(), this.__target = null, this.__targetEl = null, this.__debugEl = null
        }
    })
}, function(t, e) {
    "use strict";
    e.smallImage = function() {
        return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    }, e.bind = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    }, e.decode64 = function(t) {
        var e, n, r, i, o, s, a, c, h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            u = t.length,
            l = "";
        for (e = 0; e < u; e += 4) n = h.indexOf(t[e]), r = h.indexOf(t[e + 1]), i = h.indexOf(t[e + 2]), o = h.indexOf(t[e + 3]), s = n << 2 | r >> 4, a = (15 & r) << 4 | i >> 2, c = (3 & i) << 6 | o, l += 64 === i ? String.fromCharCode(s) : 64 === o || o === -1 ? String.fromCharCode(s, a) : String.fromCharCode(s, a, c);
        return l
    }, e.getBounds = function(t) {
        if (t.getBoundingClientRect) {
            var e = t.getBoundingClientRect(),
                n = null == t.offsetWidth ? e.width : t.offsetWidth;
            return {
                top: e.top,
                bottom: e.bottom || e.top + e.height,
                right: e.left + n,
                left: e.left,
                width: n,
                height: null == t.offsetHeight ? e.height : t.offsetHeight
            }
        }
        return {}
    }, e.offsetBounds = function(t) {
        var n = t.offsetParent ? e.offsetBounds(t.offsetParent) : {
            top: 0,
            left: 0
        };
        return {
            top: t.offsetTop + n.top,
            bottom: t.offsetTop + t.offsetHeight + n.top,
            right: t.offsetLeft + n.left + t.offsetWidth,
            left: t.offsetLeft + n.left,
            width: t.offsetWidth,
            height: t.offsetHeight
        }
    }, e.parseBackgrounds = function(t) {
        var e, n, r, i, o, s, a, c = " \r\n\t",
            h = [],
            u = 0,
            l = 0,
            d = function() {
                e && ('"' === n.substr(0, 1) && (n = n.substr(1, n.length - 2)), n && a.push(n), "-" === e.substr(0, 1) && (i = e.indexOf("-", 1) + 1) > 0 && (r = e.substr(0, i), e = e.substr(i)), h.push({
                    prefix: r,
                    method: e.toLowerCase(),
                    value: o,
                    args: a,
                    image: null
                })), a = [], e = r = n = o = ""
            };
        return a = [], e = r = n = o = "", t.split("").forEach(function(t) {
            if (!(0 === u && c.indexOf(t) > -1)) {
                switch (t) {
                    case '"':
                        s ? s === t && (s = null) : s = t;
                        break;
                    case "(":
                        if (s) break;
                        if (0 === u) return u = 1, void(o += t);
                        l++;
                        break;
                    case ")":
                        if (s) break;
                        if (1 === u) {
                            if (0 === l) return u = 0, o += t, void d();
                            l--
                        }
                        break;
                    case ",":
                        if (s) break;
                        if (0 === u) return void d();
                        if (1 === u && 0 === l && !e.match(/^url$/i)) return a.push(n), n = "", void(o += t)
                }
                o += t, 0 === u ? e += t : n += t
            }
        }), d(), h
    }
}, function(t, e) {
    "use strict";
    var n = function t() {
        t.options.logging && window.console && window.console.log && Function.prototype.bind.call(window.console.log, window.console).apply(window.console, [Date.now() - t.options.start + "ms", "html2canvas:"].concat([].slice.call(arguments, 0)))
    };
    n.options = {
        logging: !1
    }, t.exports = n
}, function(t, e, n) {
    "use strict";

    function r(t, e) {
        this.node = t, this.parent = e, this.stack = null, this.bounds = null, this.borders = null, this.clip = [], this.backgroundClip = [], this.offsetBounds = null, this.visible = null, this.computedStyles = null, this.colors = {}, this.styles = {}, this.backgroundImages = null, this.transformData = null, this.transformMatrix = null, this.isPseudoElement = !1, this.opacity = null
    }

    function i(t) {
        var e = t.options[t.selectedIndex || 0];
        return e ? e.text || "" : ""
    }

    function o(t) {
        if (t && "matrix" === t[1]) return t[2].split(",").map(function(t) {
            return parseFloat(t.trim())
        });
        if (t && "matrix3d" === t[1]) {
            var e = t[2].split(",").map(function(t) {
                return parseFloat(t.trim())
            });
            return [e[0], e[1], e[4], e[5], e[12], e[13]]
        }
    }

    function s(t) {
        return t.toString().indexOf("%") !== -1
    }

    function a(t) {
        return t.replace("px", "")
    }

    function c(t) {
        return parseFloat(t)
    }
    var h = n(4),
        u = n(1),
        l = u.getBounds,
        d = u.parseBackgrounds,
        p = u.offsetBounds;
    r.prototype.cloneTo = function(t) {
        t.visible = this.visible, t.borders = this.borders, t.bounds = this.bounds, t.clip = this.clip, t.backgroundClip = this.backgroundClip, t.computedStyles = this.computedStyles, t.styles = this.styles, t.backgroundImages = this.backgroundImages, t.opacity = this.opacity
    }, r.prototype.getOpacity = function() {
        return null === this.opacity ? this.opacity = this.cssFloat("opacity") : this.opacity
    }, r.prototype.assignStack = function(t) {
        this.stack = t, t.children.push(this)
    }, r.prototype.isElementVisible = function() {
        return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : "none" !== this.css("display") && "hidden" !== this.css("visibility") && !this.node.hasAttribute("data-html2canvas-ignore") && ("INPUT" !== this.node.nodeName || "hidden" !== this.node.getAttribute("type"))
    }, r.prototype.css = function(t) {
        return this.computedStyles || (this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null)), this.styles[t] || (this.styles[t] = this.computedStyles[t])
    }, r.prototype.prefixedCss = function(t) {
        var e = ["webkit", "moz", "ms", "o"],
            n = this.css(t);
        return void 0 === n && e.some(function(e) {
            return n = this.css(e + t.substr(0, 1).toUpperCase() + t.substr(1)), void 0 !== n
        }, this), void 0 === n ? null : n
    }, r.prototype.computedStyle = function(t) {
        return this.node.ownerDocument.defaultView.getComputedStyle(this.node, t)
    }, r.prototype.cssInt = function(t) {
        var e = parseInt(this.css(t), 10);
        return isNaN(e) ? 0 : e
    }, r.prototype.color = function(t) {
        return this.colors[t] || (this.colors[t] = new h(this.css(t)))
    }, r.prototype.cssFloat = function(t) {
        var e = parseFloat(this.css(t));
        return isNaN(e) ? 0 : e
    }, r.prototype.fontWeight = function() {
        var t = this.css("fontWeight");
        switch (parseInt(t, 10)) {
            case 401:
                t = "bold";
                break;
            case 400:
                t = "normal"
        }
        return t
    }, r.prototype.parseClip = function() {
        var t = this.css("clip").match(this.CLIP);
        return t ? {
            top: parseInt(t[1], 10),
            right: parseInt(t[2], 10),
            bottom: parseInt(t[3], 10),
            left: parseInt(t[4], 10)
        } : null
    }, r.prototype.parseBackgroundImages = function() {
        return this.backgroundImages || (this.backgroundImages = d(this.css("backgroundImage")))
    }, r.prototype.cssList = function(t, e) {
        var n = (this.css(t) || "").split(",");
        return n = n[e || 0] || n[0] || "auto", n = n.trim().split(" "), 1 === n.length && (n = [n[0], s(n[0]) ? "auto" : n[0]]), n
    }, r.prototype.parseBackgroundSize = function(t, e, n) {
        var r, i, o = this.cssList("backgroundSize", n);
        if (s(o[0])) r = t.width * parseFloat(o[0]) / 100;
        else {
            if (/contain|cover/.test(o[0])) {
                var a = t.width / t.height,
                    c = e.width / e.height;
                return a < c ^ "contain" === o[0] ? {
                    width: t.height * c,
                    height: t.height
                } : {
                    width: t.width,
                    height: t.width / c
                }
            }
            r = parseInt(o[0], 10)
        }
        return i = "auto" === o[0] && "auto" === o[1] ? e.height : "auto" === o[1] ? r / e.width * e.height : s(o[1]) ? t.height * parseFloat(o[1]) / 100 : parseInt(o[1], 10), "auto" === o[0] && (r = i / e.height * e.width), {
            width: r,
            height: i
        }
    }, r.prototype.parseBackgroundPosition = function(t, e, n, r) {
        var i, o, a = this.cssList("backgroundPosition", n);
        return i = s(a[0]) ? (t.width - (r || e).width) * (parseFloat(a[0]) / 100) : parseInt(a[0], 10), o = "auto" === a[1] ? i / e.width * e.height : s(a[1]) ? (t.height - (r || e).height) * parseFloat(a[1]) / 100 : parseInt(a[1], 10), "auto" === a[0] && (i = o / e.height * e.width), {
            left: i,
            top: o
        }
    }, r.prototype.parseBackgroundRepeat = function(t) {
        return this.cssList("backgroundRepeat", t)[0]
    }, r.prototype.parseTextShadows = function() {
        var t = this.css("textShadow"),
            e = [];
        if (t && "none" !== t)
            for (var n = t.match(this.TEXT_SHADOW_PROPERTY), r = 0; n && r < n.length; r++) {
                var i = n[r].match(this.TEXT_SHADOW_VALUES);
                e.push({
                    color: new h(i[0]),
                    offsetX: i[1] ? parseFloat(i[1].replace("px", "")) : 0,
                    offsetY: i[2] ? parseFloat(i[2].replace("px", "")) : 0,
                    blur: i[3] ? i[3].replace("px", "") : 0
                })
            }
        return e
    }, r.prototype.parseTransform = function() {
        if (!this.transformData)
            if (this.hasTransform()) {
                var t = this.parseBounds(),
                    e = this.prefixedCss("transformOrigin").split(" ").map(a).map(c);
                e[0] += t.left, e[1] += t.top, this.transformData = {
                    origin: e,
                    matrix: this.parseTransformMatrix()
                }
            } else this.transformData = {
                origin: [0, 0],
                matrix: [1, 0, 0, 1, 0, 0]
            };
        return this.transformData
    }, r.prototype.parseTransformMatrix = function() {
        if (!this.transformMatrix) {
            var t = this.prefixedCss("transform"),
                e = t ? o(t.match(this.MATRIX_PROPERTY)) : null;
            this.transformMatrix = e ? e : [1, 0, 0, 1, 0, 0]
        }
        return this.transformMatrix
    }, r.prototype.parseBounds = function() {
        return this.bounds || (this.bounds = this.hasTransform() ? p(this.node) : l(this.node))
    }, r.prototype.hasTransform = function() {
        return "1,0,0,1,0,0" !== this.parseTransformMatrix().join(",") || this.parent && this.parent.hasTransform()
    }, r.prototype.getValue = function() {
        var t = this.node.value || "";
        return "SELECT" === this.node.tagName ? t = i(this.node) : "password" === this.node.type && (t = Array(t.length + 1).join("•")), 0 === t.length ? this.node.placeholder || "" : t
    }, r.prototype.MATRIX_PROPERTY = /(matrix|matrix3d)\((.+)\)/, r.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g, r.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g, r.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/, t.exports = r
}, function(t, e) {
    "use strict";

    function n(t) {
        this.r = 0, this.g = 0, this.b = 0, this.a = null;
        this.fromArray(t) || this.namedColor(t) || this.rgb(t) || this.rgba(t) || this.hex6(t) || this.hex3(t)
    }
    n.prototype.darken = function(t) {
        var e = 1 - t;
        return new n([Math.round(this.r * e), Math.round(this.g * e), Math.round(this.b * e), this.a])
    }, n.prototype.isTransparent = function() {
        return 0 === this.a
    }, n.prototype.isBlack = function() {
        return 0 === this.r && 0 === this.g && 0 === this.b
    }, n.prototype.fromArray = function(t) {
        return Array.isArray(t) && (this.r = Math.min(t[0], 255), this.g = Math.min(t[1], 255), this.b = Math.min(t[2], 255), t.length > 3 && (this.a = t[3])), Array.isArray(t)
    };
    var r = /^#([a-f0-9]{3})$/i;
    n.prototype.hex3 = function(t) {
        var e = null;
        return null !== (e = t.match(r)) && (this.r = parseInt(e[1][0] + e[1][0], 16), this.g = parseInt(e[1][1] + e[1][1], 16), this.b = parseInt(e[1][2] + e[1][2], 16)), null !== e
    };
    var i = /^#([a-f0-9]{6})$/i;
    n.prototype.hex6 = function(t) {
        var e = null;
        return null !== (e = t.match(i)) && (this.r = parseInt(e[1].substring(0, 2), 16), this.g = parseInt(e[1].substring(2, 4), 16), this.b = parseInt(e[1].substring(4, 6), 16)), null !== e
    };
    var o = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
    n.prototype.rgb = function(t) {
        var e = null;
        return null !== (e = t.match(o)) && (this.r = Number(e[1]), this.g = Number(e[2]), this.b = Number(e[3])), null !== e
    };
    var s = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/;
    n.prototype.rgba = function(t) {
        var e = null;
        return null !== (e = t.match(s)) && (this.r = Number(e[1]), this.g = Number(e[2]), this.b = Number(e[3]), this.a = Number(e[4])), null !== e
    }, n.prototype.toString = function() {
        return null !== this.a && 1 !== this.a ? "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" : "rgb(" + [this.r, this.g, this.b].join(",") + ")"
    }, n.prototype.namedColor = function(t) {
        t = t.toLowerCase();
        var e = a[t];
        if (e) this.r = e[0], this.g = e[1], this.b = e[2];
        else if ("transparent" === t) return this.r = this.g = this.b = this.a = 0, !0;
        return !!e
    }, n.prototype.isColor = !0;
    var a = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50]
    };
    t.exports = n
}, function(t, e, n) {
    "use strict";

    function r(t, e, n) {
        var r = "withCredentials" in new XMLHttpRequest;
        if (!e) return Promise.reject("No proxy configured");
        var i = s(r),
            c = a(e, t, i);
        return r ? u(c) : o(n, c, i).then(function(t) {
            return f(t.content)
        })
    }

    function i(t, e, n) {
        var r = "crossOrigin" in new Image,
            i = s(r),
            c = a(e, t, i);
        return r ? Promise.resolve(c) : o(n, c, i).then(function(t) {
            return "data:" + t.type + ";base64," + t.content
        })
    }

    function o(t, e, n) {
        return new Promise(function(r, i) {
            var o = t.createElement("script"),
                s = function() {
                    delete window.html2canvas.proxy[n], t.body.removeChild(o)
                };
            window.html2canvas.proxy[n] = function(t) {
                s(), r(t)
            }, o.src = e, o.onerror = function(t) {
                s(), i(t)
            }, t.body.appendChild(o)
        })
    }

    function s(t) {
        return t ? "" : "html2canvas_" + Date.now() + "_" + ++g + "_" + Math.round(1e5 * Math.random())
    }

    function a(t, e, n) {
        return t + "?url=" + encodeURIComponent(e) + (n.length ? "&callback=html2canvas.proxy." + n : "")
    }

    function c(t) {
        return function(e) {
            var n, r = new DOMParser;
            try {
                n = r.parseFromString(e, "text/html")
            } catch (t) {
                d("DOMParser not supported, falling back to createHTMLDocument"), n = document.implementation.createHTMLDocument("");
                try {
                    n.open(), n.write(e), n.close()
                } catch (t) {
                    d("createHTMLDocument write not supported, falling back to document.body.innerHTML"), n.body.innerHTML = e
                }
            }
            var i = n.querySelector("base");
            if (!i || !i.href.host) {
                var o = n.createElement("base");
                o.href = t, n.head.insertBefore(o, n.head.firstChild)
            }
            return n
        }
    }

    function h(t, e, n, i, o, s) {
        return new r(t, e, window.document).then(c(t)).then(function(t) {
            return p(t, n, i, o, s, 0, 0)
        })
    }
    var u = n(11),
        l = n(1),
        d = n(2),
        p = n(6),
        f = l.decode64,
        g = 0;
    e.Proxy = r, e.ProxyURL = i, e.loadUrlDocument = h
}, function(t, e, n) {
    "use strict";

    function r(t, e, n) {
        !t.defaultView || e === t.defaultView.pageXOffset && n === t.defaultView.pageYOffset || t.defaultView.scrollTo(e, n)
    }

    function i(t, e) {
        try {
            e && (e.width = t.width, e.height = t.height, e.getContext("2d").putImageData(t.getContext("2d").getImageData(0, 0, t.width, t.height), 0, 0))
        } catch (e) {
            a("Unable to copy canvas content from", t, e)
        }
    }

    function o(t, e) {
        for (var n = 3 === t.nodeType ? document.createTextNode(t.nodeValue) : t.cloneNode(!1), r = t.firstChild; r;) e !== !0 && 1 === r.nodeType && "SCRIPT" === r.nodeName || n.appendChild(o(r, e)), r = r.nextSibling;
        return 1 === t.nodeType && (n._scrollTop = t.scrollTop, n._scrollLeft = t.scrollLeft, "CANVAS" === t.nodeName ? i(t, n) : "TEXTAREA" !== t.nodeName && "SELECT" !== t.nodeName || (n.value = t.value)), n
    }

    function s(t) {
        if (1 === t.nodeType) {
            t.scrollTop = t._scrollTop, t.scrollLeft = t._scrollLeft;
            for (var e = t.firstChild; e;) s(e), e = e.nextSibling
        }
    }
    var a = n(2);
    t.exports = function(t, e, n, i, a, c, h) {
        var u = o(t.documentElement, a.javascriptEnabled),
            l = e.createElement("iframe");
        return l.className = "html2canvas-container", l.style.visibility = "hidden", l.style.position = "fixed", l.style.left = "-10000px", l.style.top = "0px", l.style.border = "0", l.width = n, l.height = i, l.scrolling = "no", e.body.appendChild(l), new Promise(function(e) {
            var n = l.contentWindow.document;
            l.contentWindow.onload = l.onload = function() {
                var t = setInterval(function() {
                    n.body.childNodes.length > 0 && (s(n.documentElement), clearInterval(t), "view" === a.type && (l.contentWindow.scrollTo(c, h), !/(iPad|iPhone|iPod)/g.test(navigator.userAgent) || l.contentWindow.scrollY === h && l.contentWindow.scrollX === c || (n.documentElement.style.top = -h + "px", n.documentElement.style.left = -c + "px", n.documentElement.style.position = "absolute")), e(l))
                }, 50)
            }, n.open(), n.write("<!DOCTYPE html><html></html>"), r(t, c, h), n.replaceChild(n.adoptNode(u), n.documentElement), n.close()
        })
    }
}, function(t, e, n) {
    function r(t, e) {
        g++;
        e = e || {}, e.logging && (d.options.logging = !0, d.options.start = Date.now()), e.async = "undefined" == typeof e.async || e.async, e.allowTaint = "undefined" != typeof e.allowTaint && e.allowTaint, e.removeContainer = "undefined" == typeof e.removeContainer || e.removeContainer, e.javascriptEnabled = "undefined" != typeof e.javascriptEnabled && e.javascriptEnabled, e.imageTimeout = "undefined" == typeof e.imageTimeout ? 1e4 : e.imageTimeout, e.renderer = "function" == typeof e.renderer ? e.renderer : c, e.strict = !!e.strict;
        var n = e.width || 512,
            r = e.height || 512;
        return i(t, n, r).then(function(t) {
            e.onrendered(t)
        })
    }

    function i(t, e, n) {
        var i = new a(t.ownerDocument),
            o = new h({
                useCORS: !0
            }, i),
            s = {
                renderer: r.CanvasRenderer
            },
            c = (f(t), new s.renderer(e, n, o, s, document)),
            l = new u(t, c, i, o, s);
        return l.ready.then(function() {
            return c.canvas
        })
    }
    var o, s, a = n(24),
        c = n(22),
        h = n(17),
        u = n(18),
        l = n(3),
        d = n(2),
        p = n(1),
        f = (n(6), n(5).loadUrlDocument, p.getBounds),
        g = 0;
    r.CanvasRenderer = c, r.NodeContainer = l, r.log = d, r.utils = p;
    var m = "undefined" == typeof document || "function" != typeof Object.create || "function" != typeof document.createElement("canvas").getContext ? function() {
        return Promise.reject("No canvas support")
    } : r;
    t.exports = m, o = [], s = function() {
        return m
    }.apply(e, o), !(void 0 !== s && (t.exports = s))
}, function(t, e) {
    "use strict";

    function n(t) {
        this.src = t.value, this.colorStops = [], this.type = null, this.x0 = .5, this.y0 = .5, this.x1 = .5, this.y1 = .5, this.promise = Promise.resolve(!0)
    }
    n.TYPES = {
        LINEAR: 1,
        RADIAL: 2
    }, n.REGEXP_COLORSTOP = /^\s*(rgba?\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}(?:,\s*[0-9\.]+)?\s*\)|[a-z]{3,20}|#[a-f0-9]{3,6})(?:\s+(\d{1,3}(?:\.\d+)?)(%|px)?)?(?:\s|$)/i, t.exports = n
}, function(t, e, n) {
    "use strict";

    function r(t) {
        i.apply(this, arguments), this.type = i.TYPES.LINEAR;
        var e = r.REGEXP_DIRECTION.test(t.args[0]) || !i.REGEXP_COLORSTOP.test(t.args[0]);
        e ? t.args[0].split(/\s+/).reverse().forEach(function(t, e) {
            switch (t) {
                case "left":
                    this.x0 = 0, this.x1 = 1;
                    break;
                case "top":
                    this.y0 = 0, this.y1 = 1;
                    break;
                case "right":
                    this.x0 = 1, this.x1 = 0;
                    break;
                case "bottom":
                    this.y0 = 1, this.y1 = 0;
                    break;
                case "to":
                    var n = this.y0,
                        r = this.x0;
                    this.y0 = this.y1, this.x0 = this.x1, this.x1 = r, this.y1 = n;
                    break;
                case "center":
                    break;
                default:
                    var i = .01 * parseFloat(t, 10);
                    if (isNaN(i)) break;
                    0 === e ? (this.y0 = i, this.y1 = 1 - this.y0) : (this.x0 = i, this.x1 = 1 - this.x0)
            }
        }, this) : (this.y0 = 0, this.y1 = 1), this.colorStops = t.args.slice(e ? 1 : 0).map(function(t) {
            var e = t.match(i.REGEXP_COLORSTOP),
                n = +e[2],
                r = 0 === n ? "%" : e[3];
            return {
                color: new o(e[1]),
                stop: "%" === r ? n / 100 : null
            }
        }), null === this.colorStops[0].stop && (this.colorStops[0].stop = 0), null === this.colorStops[this.colorStops.length - 1].stop && (this.colorStops[this.colorStops.length - 1].stop = 1), this.colorStops.forEach(function(t, e) {
            null === t.stop && this.colorStops.slice(e).some(function(n, r) {
                return null !== n.stop && (t.stop = (n.stop - this.colorStops[e - 1].stop) / (r + 1) + this.colorStops[e - 1].stop, !0)
            }, this)
        }, this)
    }
    var i = n(8),
        o = n(4);
    r.prototype = Object.create(i.prototype), r.REGEXP_DIRECTION = /^\s*(?:to|left|right|top|bottom|center|\d{1,3}(?:\.\d+)?%?)(?:\s|$)/i, t.exports = r
}, function(t, e, n) {
    "use strict";

    function r(t) {
        this.src = t, this.image = null;
        var e = this;
        this.promise = this.hasFabric().then(function() {
            return e.isInline(t) ? Promise.resolve(e.inlineFormatting(t)) : i(t)
        }).then(function(t) {
            return new Promise(function(n) {
                window.html2canvas.svg.fabric.loadSVGFromString(t, e.createCanvas.call(e, n))
            })
        })
    }
    var i = n(11),
        o = n(1).decode64;
    r.prototype.hasFabric = function() {
        return window.html2canvas.svg && window.html2canvas.svg.fabric ? Promise.resolve() : Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg"))
    }, r.prototype.inlineFormatting = function(t) {
        return /^data:image\/svg\+xml;base64,/.test(t) ? this.decode64(this.removeContentType(t)) : this.removeContentType(t)
    }, r.prototype.removeContentType = function(t) {
        return t.replace(/^data:image\/svg\+xml(;base64)?,/, "")
    }, r.prototype.isInline = function(t) {
        return /^data:image\/svg\+xml/i.test(t)
    }, r.prototype.createCanvas = function(t) {
        var e = this;
        return function(n, r) {
            var i = new window.html2canvas.svg.fabric.StaticCanvas("c");
            e.image = i.lowerCanvasEl, i.setWidth(r.width).setHeight(r.height).add(window.html2canvas.svg.fabric.util.groupSVGElements(n, r)).renderAll(), t(i.lowerCanvasEl)
        }
    }, r.prototype.decode64 = function(t) {
        return "function" == typeof window.atob ? window.atob(t) : o(t)
    }, t.exports = r
}, function(t, e) {
    "use strict";

    function n(t) {
        return new Promise(function(e, n) {
            var r = new XMLHttpRequest;
            r.open("GET", t), r.onload = function() {
                200 === r.status ? e(r.responseText) : n(new Error(r.statusText))
            }, r.onerror = function() {
                n(new Error("Network Error"))
            }, r.send()
        })
    }
    t.exports = n
}, function(t, e, n) {
    "use strict";

    function r(t) {
        if (this.src = t, i("DummyImageContainer for", t), !this.promise || !this.image) {
            i("Initiating DummyImageContainer"), r.prototype.image = new Image;
            var e = this.image;
            r.prototype.promise = new Promise(function(t, n) {
                e.onload = t, e.onerror = n, e.src = o(), e.complete === !0 && t(e)
            })
        }
    }
    var i = n(2),
        o = n(1).smallImage;
    t.exports = r
}, function(t, e, n) {
    "use strict";

    function r(t, e) {
        var n, r, o = document.createElement("div"),
            s = document.createElement("img"),
            a = document.createElement("span"),
            c = "Hidden Text";
        o.style.visibility = "hidden", o.style.fontFamily = t, o.style.fontSize = e, o.style.margin = 0, o.style.padding = 0, document.body.appendChild(o), s.src = i(), s.width = 1, s.height = 1, s.style.margin = 0, s.style.padding = 0, s.style.verticalAlign = "baseline", a.style.fontFamily = t, a.style.fontSize = e, a.style.margin = 0, a.style.padding = 0, a.appendChild(document.createTextNode(c)), o.appendChild(a), o.appendChild(s), n = s.offsetTop - a.offsetTop + 1, o.removeChild(a), o.appendChild(document.createTextNode(c)), o.style.lineHeight = "normal", s.style.verticalAlign = "super", r = s.offsetTop - o.offsetTop + 1, document.body.removeChild(o), this.baseline = n, this.lineWidth = 1, this.middle = r
    }
    var i = n(1).smallImage;
    t.exports = r
}, function(t, e, n) {
    "use strict";

    function r() {
        this.data = {}
    }
    var i = n(13);
    r.prototype.getMetrics = function(t, e) {
        return void 0 === this.data[t + "-" + e] && (this.data[t + "-" + e] = new i(t, e)), this.data[t + "-" + e]
    }, t.exports = r
}, function(t, e, n) {
    "use strict";

    function r(t, e, r) {
        this.image = null, this.src = t;
        var i = this,
            s = o(t);
        this.promise = (e ? new Promise(function(e) {
            "about:blank" === t.contentWindow.document.URL || null == t.contentWindow.document.documentElement ? t.contentWindow.onload = t.onload = function() {
                e(t)
            } : e(t)
        }) : this.proxyLoad(r.proxy, s, r)).then(function(t) {
            var e = n(7);
            return e(t.contentWindow.document.documentElement, {
                type: "view",
                width: t.width,
                height: t.height,
                proxy: r.proxy,
                javascriptEnabled: r.javascriptEnabled,
                removeContainer: r.removeContainer,
                allowTaint: r.allowTaint,
                imageTimeout: r.imageTimeout / 2
            })
        }).then(function(t) {
            return i.image = t
        })
    }
    var i = n(1),
        o = i.getBounds,
        s = n(5).loadUrlDocument;
    r.prototype.proxyLoad = function(t, e, n) {
        var r = this.src;
        return s(r.src, t, r.ownerDocument, e.width, e.height, n)
    }, t.exports = r
}, function(t, e) {
    "use strict";

    function n(t, e) {
        this.src = t, this.image = new Image;
        var n = this;
        this.tainted = null, this.promise = new Promise(function(r, i) {
            n.image.onload = r, n.image.onerror = i, e && (n.image.crossOrigin = "anonymous"), n.image.src = t, n.image.complete === !0 && r(n.image)
        })
    }
    t.exports = n
}, function(t, e, n) {
    "use strict";

    function r(t, e) {
        this.link = null, this.options = t, this.support = e, this.origin = this.getOrigin(window.location.href)
    }
    var i = n(2),
        o = n(16),
        s = n(12),
        a = n(19),
        c = n(15),
        h = n(10),
        u = n(25),
        l = n(9),
        d = n(27),
        p = n(1).bind;
    r.prototype.findImages = function(t) {
        var e = [];
        return t.reduce(function(t, e) {
            switch (e.node.nodeName) {
                case "IMG":
                    return t.concat([{
                        args: [e.node.src],
                        method: "url"
                    }]);
                case "svg":
                case "IFRAME":
                    return t.concat([{
                        args: [e.node],
                        method: e.node.nodeName
                    }])
            }
            return t
        }, []).forEach(this.addImage(e, this.loadImage), this), e
    }, r.prototype.findBackgroundImage = function(t, e) {
        return e.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(t, this.loadImage), this), t
    }, r.prototype.addImage = function(t, e) {
        return function(n) {
            n.args.forEach(function(r) {
                this.imageExists(t, r) || (t.splice(0, 0, e.call(this, n)), i("Added image #" + t.length, "string" == typeof r ? r.substring(0, 100) : r))
            }, this)
        }
    }, r.prototype.hasImageBackground = function(t) {
        return "none" !== t.method
    }, r.prototype.loadImage = function(t) {
        if ("url" === t.method) {
            var e = t.args[0];
            return !this.isSVG(e) || this.support.svg || this.options.allowTaint ? e.match(/data:image\/.*;base64,/i) ? new o(e.replace(/url\(['"]{0,}|['"]{0,}\)$/gi, ""), !1) : this.isSameOrigin(e) || this.options.allowTaint === !0 || this.isSVG(e) ? new o(e, !1) : this.support.cors && !this.options.allowTaint && this.options.useCORS ? new o(e, !0) : this.options.proxy ? new a(e, this.options.proxy) : new s(e) : new h(e)
        }
        return "linear-gradient" === t.method ? new l(t) : "gradient" === t.method ? new d(t) : "svg" === t.method ? new u(t.args[0], this.support.svg) : "IFRAME" === t.method ? new c(t.args[0], this.isSameOrigin(t.args[0].src), this.options) : new s(t)
    }, r.prototype.isSVG = function(t) {
        return "svg" === t.substring(t.length - 3).toLowerCase() || h.prototype.isInline(t)
    }, r.prototype.imageExists = function(t, e) {
        return t.some(function(t) {
            return t.src === e
        })
    }, r.prototype.isSameOrigin = function(t) {
        return this.getOrigin(t) === this.origin
    }, r.prototype.getOrigin = function(t) {
        var e = this.link || (this.link = document.createElement("a"));
        return e.href = t, e.href = e.href, e.protocol + e.hostname + e.port
    }, r.prototype.getPromise = function(t) {
        return this.timeout(t, this.options.imageTimeout).catch(function() {
            var e = new s(t.src);
            return e.promise.then(function(e) {
                t.image = e
            })
        })
    }, r.prototype.get = function(t) {
        var e = null;
        return this.images.some(function(n) {
            return (e = n).src === t
        }) ? e : null
    }, r.prototype.fetch = function(t) {
        return this.images = t.reduce(p(this.findBackgroundImage, this), this.findImages(t)), this.images.forEach(function(t, e) {
            t.promise.then(function() {
                i("Succesfully loaded image #" + (e + 1), t)
            }, function(n) {
                i("Failed loading image #" + (e + 1), t, n)
            })
        }), this.ready = Promise.all(this.images.map(this.getPromise, this)), i("Finished searching images"), this
    }, r.prototype.timeout = function(t, e) {
        var n, r = Promise.race([t.promise, new Promise(function(r, o) {
            n = setTimeout(function() {
                i("Timed out loading image", t), o(t)
            }, e)
        })]).then(function(t) {
            return clearTimeout(n), t
        });
        return r.catch(function() {
            clearTimeout(n)
        }), r
    }, t.exports = r
}, function(t, e, n) {
    "use strict";

    function r(t, e, n, r, i) {
        j("Starting NodeParser"), this.renderer = e, this.options = i, this.range = null, this.support = n, this.renderQueue = [], this.stack = new q(!0, 1, t.ownerDocument, null);
        var o = new W(t, null);
        if (i.background && e.rectangle(0, 0, e.width, e.height, new G(i.background)), t === t.ownerDocument.documentElement) {
            var s = new W(o.color("backgroundColor").isTransparent() ? t.ownerDocument.body : t.ownerDocument.documentElement, null);
            e.rectangle(0, 0, e.width, e.height, s.color("backgroundColor"))
        }
        o.visibile = o.isElementVisible(), this.createPseudoHideStyles(t.ownerDocument),
            this.disableAnimations(t.ownerDocument), this.nodes = B([o].concat(this.getChildren(o)).filter(function(t) {
                return t.visible = t.isElementVisible()
            }).map(this.getPseudoElements, this)), this.fontMetrics = new X, j("Fetched nodes, total:", this.nodes.length), j("Calculate overflow clips"), this.calculateOverflowClips(), j("Start fetching images"), this.images = r.fetch(this.nodes.filter(S)), this.ready = this.images.ready.then(Q(function() {
                return j("Images loaded, starting parsing"), j("Creating stacking contexts"), this.createStackingContexts(), j("Sorting stacking contexts"), this.sortStackingContexts(this.stack), this.parse(this.stack), j("Render queue created with " + this.renderQueue.length + " items"), new Promise(Q(function(t) {
                    i.async ? "function" == typeof i.async ? i.async.call(this, this.renderQueue, t) : this.renderQueue.length > 0 ? (this.renderIndex = 0, this.asyncRenderer(this.renderQueue, t)) : t() : (this.renderQueue.forEach(this.paint, this), t())
                }, this))
            }, this))
    }

    function i(t) {
        return t.parent && t.parent.clip.length
    }

    function o(t) {
        return t.replace(/(\-[a-z])/g, function(t) {
            return t.toUpperCase().replace("-", "")
        })
    }

    function s() {}

    function a(t, e, n, r) {
        return t.map(function(i, o) {
            if (i.width > 0) {
                var s = e.left,
                    a = e.top,
                    c = e.width,
                    h = e.height - t[2].width;
                switch (o) {
                    case 0:
                        h = t[0].width, i.args = l({
                            c1: [s, a],
                            c2: [s + c, a],
                            c3: [s + c - t[1].width, a + h],
                            c4: [s + t[3].width, a + h]
                        }, r[0], r[1], n.topLeftOuter, n.topLeftInner, n.topRightOuter, n.topRightInner);
                        break;
                    case 1:
                        s = e.left + e.width - t[1].width, c = t[1].width, i.args = l({
                            c1: [s + c, a],
                            c2: [s + c, a + h + t[2].width],
                            c3: [s, a + h],
                            c4: [s, a + t[0].width]
                        }, r[1], r[2], n.topRightOuter, n.topRightInner, n.bottomRightOuter, n.bottomRightInner);
                        break;
                    case 2:
                        a = a + e.height - t[2].width, h = t[2].width, i.args = l({
                            c1: [s + c, a + h],
                            c2: [s, a + h],
                            c3: [s + t[3].width, a],
                            c4: [s + c - t[3].width, a]
                        }, r[2], r[3], n.bottomRightOuter, n.bottomRightInner, n.bottomLeftOuter, n.bottomLeftInner);
                        break;
                    case 3:
                        c = t[3].width, i.args = l({
                            c1: [s, a + h + t[2].width],
                            c2: [s, a],
                            c3: [s + c, a + t[0].width],
                            c4: [s + c, a + h]
                        }, r[3], r[0], n.bottomLeftOuter, n.bottomLeftInner, n.topLeftOuter, n.topLeftInner)
                }
            }
            return i
        })
    }

    function c(t, e, n, r) {
        var i = 4 * ((Math.sqrt(2) - 1) / 3),
            o = n * i,
            s = r * i,
            a = t + n,
            c = e + r;
        return {
            topLeft: u({
                x: t,
                y: c
            }, {
                x: t,
                y: c - s
            }, {
                x: a - o,
                y: e
            }, {
                x: a,
                y: e
            }),
            topRight: u({
                x: t,
                y: e
            }, {
                x: t + o,
                y: e
            }, {
                x: a,
                y: c - s
            }, {
                x: a,
                y: c
            }),
            bottomRight: u({
                x: a,
                y: e
            }, {
                x: a,
                y: e + s
            }, {
                x: t + o,
                y: c
            }, {
                x: t,
                y: c
            }),
            bottomLeft: u({
                x: a,
                y: c
            }, {
                x: a - o,
                y: c
            }, {
                x: t,
                y: e + s
            }, {
                x: t,
                y: e
            })
        }
    }

    function h(t, e, n) {
        var r = t.left,
            i = t.top,
            o = t.width,
            s = t.height,
            a = e[0][0] < o / 2 ? e[0][0] : o / 2,
            h = e[0][1] < s / 2 ? e[0][1] : s / 2,
            u = e[1][0] < o / 2 ? e[1][0] : o / 2,
            l = e[1][1] < s / 2 ? e[1][1] : s / 2,
            d = e[2][0] < o / 2 ? e[2][0] : o / 2,
            p = e[2][1] < s / 2 ? e[2][1] : s / 2,
            f = e[3][0] < o / 2 ? e[3][0] : o / 2,
            g = e[3][1] < s / 2 ? e[3][1] : s / 2,
            m = o - u,
            y = s - p,
            w = o - d,
            b = s - g;
        return {
            topLeftOuter: c(r, i, a, h).topLeft.subdivide(.5),
            topLeftInner: c(r + n[3].width, i + n[0].width, Math.max(0, a - n[3].width), Math.max(0, h - n[0].width)).topLeft.subdivide(.5),
            topRightOuter: c(r + m, i, u, l).topRight.subdivide(.5),
            topRightInner: c(r + Math.min(m, o + n[3].width), i + n[0].width, m > o + n[3].width ? 0 : u - n[3].width, l - n[0].width).topRight.subdivide(.5),
            bottomRightOuter: c(r + w, i + y, d, p).bottomRight.subdivide(.5),
            bottomRightInner: c(r + Math.min(w, o - n[3].width), i + Math.min(y, s + n[0].width), Math.max(0, d - n[1].width), p - n[2].width).bottomRight.subdivide(.5),
            bottomLeftOuter: c(r, i + b, f, g).bottomLeft.subdivide(.5),
            bottomLeftInner: c(r + n[3].width, i + b, Math.max(0, f - n[3].width), g - n[2].width).bottomLeft.subdivide(.5)
        }
    }

    function u(t, e, n, r) {
        var i = function(t, e, n) {
            return {
                x: t.x + (e.x - t.x) * n,
                y: t.y + (e.y - t.y) * n
            }
        };
        return {
            start: t,
            startControl: e,
            endControl: n,
            end: r,
            subdivide: function(o) {
                var s = i(t, e, o),
                    a = i(e, n, o),
                    c = i(n, r, o),
                    h = i(s, a, o),
                    l = i(a, c, o),
                    d = i(h, l, o);
                return [u(t, s, h, d), u(d, l, c, r)]
            },
            curveTo: function(t) {
                t.push(["bezierCurve", e.x, e.y, n.x, n.y, r.x, r.y])
            },
            curveToReversed: function(r) {
                r.push(["bezierCurve", n.x, n.y, e.x, e.y, t.x, t.y])
            }
        }
    }

    function l(t, e, n, r, i, o, s) {
        var a = [];
        return e[0] > 0 || e[1] > 0 ? (a.push(["line", r[1].start.x, r[1].start.y]), r[1].curveTo(a)) : a.push(["line", t.c1[0], t.c1[1]]), n[0] > 0 || n[1] > 0 ? (a.push(["line", o[0].start.x, o[0].start.y]), o[0].curveTo(a), a.push(["line", s[0].end.x, s[0].end.y]), s[0].curveToReversed(a)) : (a.push(["line", t.c2[0], t.c2[1]]), a.push(["line", t.c3[0], t.c3[1]])), e[0] > 0 || e[1] > 0 ? (a.push(["line", i[1].end.x, i[1].end.y]), i[1].curveToReversed(a)) : a.push(["line", t.c4[0], t.c4[1]]), a
    }

    function d(t, e, n, r, i, o, s) {
        e[0] > 0 || e[1] > 0 ? (t.push(["line", r[0].start.x, r[0].start.y]), r[0].curveTo(t), r[1].curveTo(t)) : t.push(["line", o, s]), (n[0] > 0 || n[1] > 0) && t.push(["line", i[0].start.x, i[0].start.y])
    }

    function p(t) {
        return t.cssInt("zIndex") < 0
    }

    function f(t) {
        return t.cssInt("zIndex") > 0
    }

    function g(t) {
        return 0 === t.cssInt("zIndex")
    }

    function m(t) {
        return ["inline", "inline-block", "inline-table"].indexOf(t.css("display")) !== -1
    }

    function y(t) {
        return t instanceof q
    }

    function w(t) {
        return t.node.data.trim().length > 0
    }

    function b(t) {
        return /^(normal|none|0px)$/.test(t.parent.css("letterSpacing"))
    }

    function v(t) {
        return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(e) {
            var n = t.css("border" + e + "Radius"),
                r = n.split(" ");
            return r.length <= 1 && (r[1] = r[0]), r.map(P)
        })
    }

    function x(t) {
        return t.nodeType === Node.TEXT_NODE || t.nodeType === Node.ELEMENT_NODE
    }

    function _(t) {
        var e = t.css("position"),
            n = ["absolute", "relative", "fixed"].indexOf(e) !== -1 ? t.css("zIndex") : "auto";
        return "auto" !== n
    }

    function E(t) {
        return "static" !== t.css("position")
    }

    function T(t) {
        return "none" !== t.css("float")
    }

    function k(t) {
        return ["inline-block", "inline-table"].indexOf(t.css("display")) !== -1
    }

    function C(t) {
        var e = this;
        return function() {
            return !t.apply(e, arguments)
        }
    }

    function S(t) {
        return t.node.nodeType === Node.ELEMENT_NODE
    }

    function I(t) {
        return t.isPseudoElement === !0
    }

    function R(t) {
        return t.node.nodeType === Node.TEXT_NODE
    }

    function O(t) {
        return function(e, n) {
            return e.cssInt("zIndex") + t.indexOf(e) / t.length - (n.cssInt("zIndex") + t.indexOf(n) / t.length)
        }
    }

    function A(t) {
        return t.getOpacity() < 1
    }

    function P(t) {
        return parseInt(t, 10)
    }

    function L(t) {
        return t.width
    }

    function N(t) {
        return t.node.nodeType !== Node.ELEMENT_NODE || ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(t.node.nodeName) === -1
    }

    function B(t) {
        return [].concat.apply([], t)
    }

    function M(t) {
        var e = t.substr(0, 1);
        return e === t.substr(t.length - 1) && e.match(/'|"/) ? t.substr(1, t.length - 2) : t
    }

    function D(t) {
        for (var e, n = [], r = 0, i = !1; t.length;) F(t[r]) === i ? (e = t.splice(0, r), e.length && n.push(V.ucs2.encode(e)), i = !i, r = 0) : r++, r >= t.length && (e = t.splice(0, r), e.length && n.push(V.ucs2.encode(e)));
        return n
    }

    function F(t) {
        return [32, 13, 10, 9, 45].indexOf(t) !== -1
    }

    function H(t) {
        return /[^\u0000-\u00ff]/.test(t)
    }
    var j = n(2),
        V = n(28),
        W = n(3),
        z = n(26),
        U = n(20),
        X = n(14),
        G = n(4),
        q = n(23),
        Y = n(1),
        Q = Y.bind,
        $ = Y.getBounds,
        J = Y.parseBackgrounds,
        K = Y.offsetBounds;
    r.prototype.calculateOverflowClips = function() {
        this.nodes.forEach(function(t) {
            if (S(t)) {
                I(t) && t.appendToDOM(), t.borders = this.parseBorders(t);
                var e = "hidden" === t.css("overflow") ? [t.borders.clip] : [],
                    n = t.parseClip();
                n && ["absolute", "fixed"].indexOf(t.css("position")) !== -1 && e.push([
                    ["rect", t.bounds.left + n.left, t.bounds.top + n.top, n.right - n.left, n.bottom - n.top]
                ]), t.clip = i(t) ? t.parent.clip.concat(e) : e, t.backgroundClip = "hidden" !== t.css("overflow") ? t.clip.concat([t.borders.clip]) : t.clip, I(t) && t.cleanDOM()
            } else R(t) && (t.clip = i(t) ? t.parent.clip : []);
            I(t) || (t.bounds = null)
        }, this)
    }, r.prototype.asyncRenderer = function(t, e, n) {
        n = n || Date.now(), this.paint(t[this.renderIndex++]), t.length === this.renderIndex ? e() : n + 20 > Date.now() ? this.asyncRenderer(t, e, n) : setTimeout(Q(function() {
            this.asyncRenderer(t, e)
        }, this), 0)
    }, r.prototype.createPseudoHideStyles = function(t) {
        this.createStyles(t, "." + U.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }.' + U.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }')
    }, r.prototype.disableAnimations = function(t) {
        this.createStyles(t, "* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}")
    }, r.prototype.createStyles = function(t, e) {
        if (!window.hidePseudoElementsAdded) {
            window.hidePseudoElementsAdded = !0;
            var n = t.createElement("style");
            n.innerHTML = e, t.body.appendChild(n)
        }
    }, r.prototype.getPseudoElements = function(t) {
        var e = [
            [t]
        ];
        if (t.node.nodeType === Node.ELEMENT_NODE) {
            var n = this.getPseudoElement(t, ":before"),
                r = this.getPseudoElement(t, ":after");
            n && e.push(n), r && e.push(r)
        }
        return B(e)
    }, r.prototype.getPseudoElement = function(t, e) {
        var n = t.computedStyle(e);
        if (!n || !n.content || "none" === n.content || "-moz-alt-content" === n.content || "none" === n.display) return null;
        for (var r = M(n.content), i = "url" === r.substr(0, 3), s = document.createElement(i ? "img" : "html2canvaspseudoelement"), a = new U(s, t, e), c = n.length - 1; c >= 0; c--) {
            var h = o(n.item(c));
            s.style[h] = n[h]
        }
        if (s.className = U.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + U.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER, i) return s.src = J(r)[0].args[0], [a];
        var u = document.createTextNode(r);
        return s.appendChild(u), [a, new z(u, a)]
    }, r.prototype.getChildren = function(t) {
        return B([].filter.call(t.node.childNodes, x).map(function(e) {
            var n = [e.nodeType === Node.TEXT_NODE ? new z(e, t) : new W(e, t)].filter(N);
            return e.nodeType === Node.ELEMENT_NODE && n.length && "TEXTAREA" !== e.tagName ? n[0].isElementVisible() ? n.concat(this.getChildren(n[0])) : [] : n
        }, this))
    }, r.prototype.newStackingContext = function(t, e) {
        var n = new q(e, t.getOpacity(), t.node, t.parent);
        t.cloneTo(n);
        var r = e ? n.getParentStack(this) : n.parent.stack;
        r.contexts.push(n), t.stack = n
    }, r.prototype.createStackingContexts = function() {
        this.nodes.forEach(function(t) {
            S(t) && (this.isRootElement(t) || A(t) || _(t) || this.isBodyWithTransparentRoot(t) || t.hasTransform()) ? this.newStackingContext(t, !0) : S(t) && (E(t) && g(t) || k(t) || T(t)) ? this.newStackingContext(t, !1) : t.assignStack(t.parent.stack)
        }, this)
    }, r.prototype.isBodyWithTransparentRoot = function(t) {
        return "BODY" === t.node.nodeName && t.parent.color("backgroundColor").isTransparent()
    }, r.prototype.isRootElement = function(t) {
        return null === t.parent
    }, r.prototype.sortStackingContexts = function(t) {
        t.contexts.sort(O(t.contexts.slice(0))), t.contexts.forEach(this.sortStackingContexts, this)
    }, r.prototype.parseTextBounds = function(t) {
        return function(e, n, r) {
            if ("none" !== t.parent.css("textDecoration").substr(0, 4) || 0 !== e.trim().length) {
                if (this.support.rangeBounds && !t.parent.hasTransform()) {
                    var i = r.slice(0, n).join("").length;
                    return this.getRangeBounds(t.node, i, e.length)
                }
                if (t.node && "string" == typeof t.node.data) {
                    var o = t.node.splitText(e.length),
                        s = this.getWrapperBounds(t.node, t.parent.hasTransform());
                    return t.node = o, s
                }
            } else this.support.rangeBounds && !t.parent.hasTransform() || (t.node = t.node.splitText(e.length));
            return {}
        }
    }, r.prototype.getWrapperBounds = function(t, e) {
        var n = t.ownerDocument.createElement("html2canvaswrapper"),
            r = t.parentNode,
            i = t.cloneNode(!0);
        n.appendChild(t.cloneNode(!0)), r.replaceChild(n, t);
        var o = e ? K(n) : $(n);
        return r.replaceChild(i, n), o
    }, r.prototype.getRangeBounds = function(t, e, n) {
        var r = this.range || (this.range = t.ownerDocument.createRange());
        return r.setStart(t, e), r.setEnd(t, e + n), r.getBoundingClientRect()
    }, r.prototype.parse = function(t) {
        var e = t.contexts.filter(p),
            n = t.children.filter(S),
            r = n.filter(C(T)),
            i = r.filter(C(E)).filter(C(m)),
            o = n.filter(C(E)).filter(T),
            a = r.filter(C(E)).filter(m),
            c = t.contexts.concat(r.filter(E)).filter(g),
            h = t.children.filter(R).filter(w),
            u = t.contexts.filter(f);
        e.concat(i).concat(o).concat(a).concat(c).concat(h).concat(u).forEach(function(t) {
            this.renderQueue.push(t), y(t) && (this.parse(t), this.renderQueue.push(new s))
        }, this)
    }, r.prototype.paint = function(t) {
        try {
            t instanceof s ? this.renderer.ctx.restore() : R(t) ? (I(t.parent) && t.parent.appendToDOM(), this.paintText(t), I(t.parent) && t.parent.cleanDOM()) : this.paintNode(t)
        } catch (t) {
            if (j(t), this.options.strict) throw t
        }
    }, r.prototype.paintNode = function(t) {
        y(t) && (this.renderer.setOpacity(t.opacity), this.renderer.ctx.save(), t.hasTransform() && this.renderer.setTransform(t.parseTransform())), "INPUT" === t.node.nodeName && "checkbox" === t.node.type ? this.paintCheckbox(t) : "INPUT" === t.node.nodeName && "radio" === t.node.type ? this.paintRadio(t) : this.paintElement(t)
    }, r.prototype.paintElement = function(t) {
        var e = t.parseBounds();
        this.renderer.clip(t.backgroundClip, function() {
            this.renderer.renderBackground(t, e, t.borders.borders.map(L))
        }, this), this.renderer.clip(t.clip, function() {
            this.renderer.renderBorders(t.borders.borders)
        }, this), this.renderer.clip(t.backgroundClip, function() {
            switch (t.node.nodeName) {
                case "svg":
                case "IFRAME":
                    var n = this.images.get(t.node);
                    n ? this.renderer.renderImage(t, e, t.borders, n) : j("Error loading <" + t.node.nodeName + ">", t.node);
                    break;
                case "IMG":
                    var r = this.images.get(t.node.src);
                    r ? this.renderer.renderImage(t, e, t.borders, r) : j("Error loading <img>", t.node.src);
                    break;
                case "CANVAS":
                    this.renderer.renderImage(t, e, t.borders, {
                        image: t.node
                    });
                    break;
                case "SELECT":
                case "INPUT":
                case "TEXTAREA":
                    this.paintFormValue(t)
            }
        }, this)
    }, r.prototype.paintCheckbox = function(t) {
        var e = t.parseBounds(),
            n = Math.min(e.width, e.height),
            r = {
                width: n - 1,
                height: n - 1,
                top: e.top,
                left: e.left
            },
            i = [3, 3],
            o = [i, i, i, i],
            s = [1, 1, 1, 1].map(function(t) {
                return {
                    color: new G("#A5A5A5"),
                    width: t
                }
            }),
            c = h(r, o, s);
        this.renderer.clip(t.backgroundClip, function() {
            this.renderer.rectangle(r.left + 1, r.top + 1, r.width - 2, r.height - 2, new G("#DEDEDE")), this.renderer.renderBorders(a(s, r, c, o)), t.node.checked && (this.renderer.font(new G("#424242"), "normal", "normal", "bold", n - 3 + "px", "arial"), this.renderer.text("✔", r.left + n / 6, r.top + n - 1))
        }, this)
    }, r.prototype.paintRadio = function(t) {
        var e = t.parseBounds(),
            n = Math.min(e.width, e.height) - 2;
        this.renderer.clip(t.backgroundClip, function() {
            this.renderer.circleStroke(e.left + 1, e.top + 1, n, new G("#DEDEDE"), 1, new G("#A5A5A5")), t.node.checked && this.renderer.circle(Math.ceil(e.left + n / 4) + 1, Math.ceil(e.top + n / 4) + 1, Math.floor(n / 2), new G("#424242"))
        }, this)
    }, r.prototype.paintFormValue = function(t) {
        var e = t.getValue();
        if (e.length > 0) {
            var n = t.node.ownerDocument,
                r = n.createElement("html2canvaswrapper"),
                i = ["lineHeight", "textAlign", "fontFamily", "fontWeight", "fontSize", "color", "paddingLeft", "paddingTop", "paddingRight", "paddingBottom", "width", "height", "borderLeftStyle", "borderTopStyle", "borderLeftWidth", "borderTopWidth", "boxSizing", "whiteSpace", "wordWrap"];
            i.forEach(function(e) {
                try {
                    r.style[e] = t.css(e)
                } catch (t) {
                    j("html2canvas: Parse: Exception caught in renderFormValue: " + t.message)
                }
            });
            var o = t.parseBounds();
            r.style.position = "fixed", r.style.left = o.left + "px", r.style.top = o.top + "px", r.textContent = e, n.body.appendChild(r), this.paintText(new z(r.firstChild, t)), n.body.removeChild(r)
        }
    }, r.prototype.paintText = function(t) {
        t.applyTextTransform();
        var e = V.ucs2.decode(t.node.data),
            n = this.options.letterRendering && !b(t) || H(t.node.data) ? e.map(function(t) {
                return V.ucs2.encode([t])
            }) : D(e),
            r = t.parent.fontWeight(),
            i = t.parent.css("fontSize"),
            o = t.parent.css("fontFamily"),
            s = t.parent.parseTextShadows();
        this.renderer.font(t.parent.color("color"), t.parent.css("fontStyle"), t.parent.css("fontVariant"), r, i, o), s.length ? this.renderer.fontShadow(s[0].color, s[0].offsetX, s[0].offsetY, s[0].blur) : this.renderer.clearShadow(), this.renderer.clip(t.parent.clip, function() {
            n.map(this.parseTextBounds(t), this).forEach(function(e, r) {
                e && (this.renderer.text(n[r], e.left, e.bottom), this.renderTextDecoration(t.parent, e, this.fontMetrics.getMetrics(o, i)))
            }, this)
        }, this)
    }, r.prototype.renderTextDecoration = function(t, e, n) {
        switch (t.css("textDecoration").split(" ")[0]) {
            case "underline":
                this.renderer.rectangle(e.left, Math.round(e.top + n.baseline + n.lineWidth), e.width, 1, t.color("color"));
                break;
            case "overline":
                this.renderer.rectangle(e.left, Math.round(e.top), e.width, 1, t.color("color"));
                break;
            case "line-through":
                this.renderer.rectangle(e.left, Math.ceil(e.top + n.middle + n.lineWidth), e.width, 1, t.color("color"))
        }
    };
    var Z = {
        inset: [
            ["darken", .6],
            ["darken", .1],
            ["darken", .1],
            ["darken", .6]
        ]
    };
    r.prototype.parseBorders = function(t) {
        var e = t.parseBounds(),
            n = v(t),
            r = ["Top", "Right", "Bottom", "Left"].map(function(e, n) {
                var r = t.css("border" + e + "Style"),
                    i = t.color("border" + e + "Color");
                "inset" === r && i.isBlack() && (i = new G([255, 255, 255, i.a]));
                var o = Z[r] ? Z[r][n] : null;
                return {
                    width: t.cssInt("border" + e + "Width"),
                    color: o ? i[o[0]](o[1]) : i,
                    args: null
                }
            }),
            i = h(e, n, r);
        return {
            clip: this.parseBackgroundClip(t, i, r, n, e),
            borders: a(r, e, i, n)
        }
    }, r.prototype.parseBackgroundClip = function(t, e, n, r, i) {
        var o = t.css("backgroundClip"),
            s = [];
        switch (o) {
            case "content-box":
            case "padding-box":
                d(s, r[0], r[1], e.topLeftInner, e.topRightInner, i.left + n[3].width, i.top + n[0].width), d(s, r[1], r[2], e.topRightInner, e.bottomRightInner, i.left + i.width - n[1].width, i.top + n[0].width), d(s, r[2], r[3], e.bottomRightInner, e.bottomLeftInner, i.left + i.width - n[1].width, i.top + i.height - n[2].width), d(s, r[3], r[0], e.bottomLeftInner, e.topLeftInner, i.left + n[3].width, i.top + i.height - n[2].width);
                break;
            default:
                d(s, r[0], r[1], e.topLeftOuter, e.topRightOuter, i.left, i.top), d(s, r[1], r[2], e.topRightOuter, e.bottomRightOuter, i.left + i.width, i.top), d(s, r[2], r[3], e.bottomRightOuter, e.bottomLeftOuter, i.left + i.width, i.top + i.height), d(s, r[3], r[0], e.bottomLeftOuter, e.topLeftOuter, i.left, i.top + i.height)
        }
        return s
    }, t.exports = r
}, function(t, e, n) {
    "use strict";

    function r(t, e) {
        var n = document.createElement("a");
        n.href = t, t = n.href, this.src = t, this.image = new Image;
        var r = this;
        this.promise = new Promise(function(n, o) {
            r.image.crossOrigin = "Anonymous", r.image.onload = n, r.image.onerror = o, new i(t, e, document).then(function(t) {
                r.image.src = t
            }).catch(o)
        })
    }
    var i = n(5).ProxyURL;
    t.exports = r
}, function(t, e, n) {
    "use strict";

    function r(t, e, n) {
        i.call(this, t, e), this.isPseudoElement = !0, this.before = ":before" === n
    }
    var i = n(3);
    r.prototype.cloneTo = function(t) {
        r.prototype.cloneTo.call(this, t), t.isPseudoElement = !0, t.before = this.before
    }, r.prototype = Object.create(i.prototype), r.prototype.appendToDOM = function() {
        this.before ? this.parent.node.insertBefore(this.node, this.parent.node.firstChild) : this.parent.node.appendChild(this.node), this.parent.node.className += " " + this.getHideClass()
    }, r.prototype.cleanDOM = function() {
        this.node.parentNode.removeChild(this.node), this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "")
    }, r.prototype.getHideClass = function() {
        return this["PSEUDO_HIDE_ELEMENT_CLASS_" + (this.before ? "BEFORE" : "AFTER")]
    }, r.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before", r.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after", t.exports = r
}, function(t, e, n) {
    "use strict";

    function r(t, e, n, r, i) {
        this.width = t, this.height = e, this.images = n, this.options = r, this.document = i
    }
    var i = n(2);
    r.prototype.renderImage = function(t, e, n, r) {
        var i = t.cssInt("paddingLeft"),
            o = t.cssInt("paddingTop"),
            s = t.cssInt("paddingRight"),
            a = t.cssInt("paddingBottom"),
            c = n.borders,
            h = e.width - (c[1].width + c[3].width + i + s),
            u = e.height - (c[0].width + c[2].width + o + a);
        this.drawImage(r, 0, 0, r.image.width || h, r.image.height || u, e.left + i + c[3].width, e.top + o + c[0].width, h, u)
    }, r.prototype.renderBackground = function(t, e, n) {
        e.height > 0 && e.width > 0 && (this.renderBackgroundColor(t, e), this.renderBackgroundImage(t, e, n))
    }, r.prototype.renderBackgroundColor = function(t, e) {
        var n = t.color("backgroundColor");
        n.isTransparent() || this.rectangle(e.left, e.top, e.width, e.height, n)
    }, r.prototype.renderBorders = function(t) {
        t.forEach(this.renderBorder, this)
    }, r.prototype.renderBorder = function(t) {
        t.color.isTransparent() || null === t.args || this.drawShape(t.args, t.color)
    }, r.prototype.renderBackgroundImage = function(t, e, n) {
        var r = t.parseBackgroundImages();
        r.reverse().forEach(function(r, o, s) {
            switch (r.method) {
                case "url":
                    var a = this.images.get(r.args[0]);
                    a ? this.renderBackgroundRepeating(t, e, a, s.length - (o + 1), n) : i("Error loading background-image", r.args[0]);
                    break;
                case "linear-gradient":
                case "gradient":
                    var c = this.images.get(r.value);
                    c ? this.renderBackgroundGradient(c, e, n) : i("Error loading background-image", r.args[0]);
                    break;
                case "none":
                    break;
                default:
                    i("Unknown background-image type", r.args[0])
            }
        }, this)
    }, r.prototype.renderBackgroundRepeating = function(t, e, n, r, i) {
        var o = t.parseBackgroundSize(e, n.image, r),
            s = t.parseBackgroundPosition(e, n.image, r, o),
            a = t.parseBackgroundRepeat(r);
        switch (a) {
            case "repeat-x":
            case "repeat no-repeat":
                this.backgroundRepeatShape(n, s, o, e, e.left + i[3], e.top + s.top + i[0], 99999, o.height, i);
                break;
            case "repeat-y":
            case "no-repeat repeat":
                this.backgroundRepeatShape(n, s, o, e, e.left + s.left + i[3], e.top + i[0], o.width, 99999, i);
                break;
            case "no-repeat":
                this.backgroundRepeatShape(n, s, o, e, e.left + s.left + i[3], e.top + s.top + i[0], o.width, o.height, i);
                break;
            default:
                this.renderBackgroundRepeat(n, s, o, {
                    top: e.top,
                    left: e.left
                }, i[3], i[0])
        }
    }, t.exports = r
}, function(t, e, n) {
    "use strict";

    function r(t, e) {
        s.apply(this, arguments), this.canvas = this.options.canvas || this.document.createElement("canvas"), this.options.canvas || (this.canvas.width = t, this.canvas.height = e), this.ctx = this.canvas.getContext("2d"), this.taintCtx = this.document.createElement("canvas").getContext("2d"), this.ctx.textBaseline = "bottom", this.variables = {}, c("Initialized CanvasRenderer with size", t, "x", e)
    }

    function i(t) {
        return t.length > 0
    }
    var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        },
        s = n(21),
        a = n(9),
        c = n(2);
    r.prototype = Object.create(s.prototype), r.prototype.setFillStyle = function(t) {
        return this.ctx.fillStyle = "object" === ("undefined" == typeof t ? "undefined" : o(t)) && t.isColor ? t.toString() : t, this.ctx
    }, r.prototype.rectangle = function(t, e, n, r, i) {
        this.setFillStyle(i).fillRect(t, e, n, r)
    }, r.prototype.circle = function(t, e, n, r) {
        this.setFillStyle(r), this.ctx.beginPath(), this.ctx.arc(t + n / 2, e + n / 2, n / 2, 0, 2 * Math.PI, !0), this.ctx.closePath(), this.ctx.fill()
    }, r.prototype.circleStroke = function(t, e, n, r, i, o) {
        this.circle(t, e, n, r), this.ctx.strokeStyle = o.toString(), this.ctx.stroke()
    }, r.prototype.drawShape = function(t, e) {
        this.shape(t), this.setFillStyle(e).fill()
    }, r.prototype.taints = function(t) {
        if (null === t.tainted) {
            this.taintCtx.drawImage(t.image, 0, 0);
            try {
                this.taintCtx.getImageData(0, 0, 1, 1), t.tainted = !1
            } catch (e) {
                this.taintCtx = document.createElement("canvas").getContext("2d"), t.tainted = !0
            }
        }
        return t.tainted
    }, r.prototype.drawImage = function(t, e, n, r, i, o, s, a, c) {
        this.taints(t) && !this.options.allowTaint || this.ctx.drawImage(t.image, e, n, r, i, o, s, a, c)
    }, r.prototype.clip = function(t, e, n) {
        this.ctx.save(), t.filter(i).forEach(function(t) {
            this.shape(t).clip()
        }, this), e.call(n), this.ctx.restore()
    }, r.prototype.shape = function(t) {
        return this.ctx.beginPath(), t.forEach(function(t, e) {
            "rect" === t[0] ? this.ctx.rect.apply(this.ctx, t.slice(1)) : this.ctx[0 === e ? "moveTo" : t[0] + "To"].apply(this.ctx, t.slice(1))
        }, this), this.ctx.closePath(), this.ctx
    }, r.prototype.font = function(t, e, n, r, i, o) {
        this.setFillStyle(t).font = [e, n, r, i, o].join(" ").split(",")[0]
    }, r.prototype.fontShadow = function(t, e, n, r) {
        this.setVariable("shadowColor", t.toString()).setVariable("shadowOffsetY", e).setVariable("shadowOffsetX", n).setVariable("shadowBlur", r)
    }, r.prototype.clearShadow = function() {
        this.setVariable("shadowColor", "rgba(0,0,0,0)")
    }, r.prototype.setOpacity = function(t) {
        this.ctx.globalAlpha = t
    }, r.prototype.setTransform = function(t) {
        this.ctx.translate(t.origin[0], t.origin[1]), this.ctx.transform.apply(this.ctx, t.matrix), this.ctx.translate(-t.origin[0], -t.origin[1])
    }, r.prototype.setVariable = function(t, e) {
        return this.variables[t] !== e && (this.variables[t] = this.ctx[t] = e), this
    }, r.prototype.text = function(t, e, n) {
        this.ctx.fillText(t, e, n)
    }, r.prototype.backgroundRepeatShape = function(t, e, n, r, i, o, s, a, c) {
        var h = [
            ["line", Math.round(i), Math.round(o)],
            ["line", Math.round(i + s), Math.round(o)],
            ["line", Math.round(i + s), Math.round(a + o)],
            ["line", Math.round(i), Math.round(a + o)]
        ];
        this.clip([h], function() {
            this.renderBackgroundRepeat(t, e, n, r, c[3], c[0])
        }, this)
    }, r.prototype.renderBackgroundRepeat = function(t, e, n, r, i, o) {
        var s = Math.round(r.left + e.left + i),
            a = Math.round(r.top + e.top + o);
        this.setFillStyle(this.ctx.createPattern(this.resizeImage(t, n), "repeat")), this.ctx.translate(s, a), this.ctx.fill(), this.ctx.translate(-s, -a)
    }, r.prototype.renderBackgroundGradient = function(t, e) {
        if (t instanceof a) {
            var n = this.ctx.createLinearGradient(e.left + e.width * t.x0, e.top + e.height * t.y0, e.left + e.width * t.x1, e.top + e.height * t.y1);
            t.colorStops.forEach(function(t) {
                n.addColorStop(t.stop, t.color.toString())
            }), this.rectangle(e.left, e.top, e.width, e.height, n)
        }
    }, r.prototype.resizeImage = function(t, e) {
        var n = t.image;
        if (n.width === e.width && n.height === e.height) return n;
        var r, i = document.createElement("canvas");
        return i.width = e.width, i.height = e.height, r = i.getContext("2d"), r.drawImage(n, 0, 0, n.width, n.height, 0, 0, e.width, e.height), i
    }, t.exports = r
}, function(t, e, n) {
    "use strict";

    function r(t, e, n, r) {
        i.call(this, n, r), this.ownStacking = t, this.contexts = [], this.children = [], this.opacity = (this.parent ? this.parent.stack.opacity : 1) * e
    }
    var i = n(3);
    r.prototype = Object.create(i.prototype), r.prototype.getParentStack = function(t) {
        var e = this.parent ? this.parent.stack : null;
        return e ? e.ownStacking ? e : e.getParentStack(t) : t.stack
    }, t.exports = r
}, function(t, e) {
    "use strict";

    function n(t) {
        this.rangeBounds = this.testRangeBounds(t), this.cors = this.testCORS(), this.svg = this.testSVG()
    }
    n.prototype.testRangeBounds = function(t) {
        var e, n, r, i, o = !1;
        return t.createRange && (e = t.createRange(), e.getBoundingClientRect && (n = t.createElement("boundtest"), n.style.height = "123px", n.style.display = "block", t.body.appendChild(n), e.selectNode(n), r = e.getBoundingClientRect(), i = r.height, 123 === i && (o = !0), t.body.removeChild(n))), o
    }, n.prototype.testCORS = function() {
        return "undefined" != typeof(new Image).crossOrigin
    }, n.prototype.testSVG = function() {
        var t = new Image,
            e = document.createElement("canvas"),
            n = e.getContext("2d");
        t.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
        try {
            n.drawImage(t, 0, 0), e.toDataURL()
        } catch (t) {
            return !1
        }
        return !0
    }, t.exports = n
}, function(t, e, n) {
    "use strict";

    function r(t, e) {
        this.src = t, this.image = null;
        var n = this;
        this.promise = e ? new Promise(function(e, r) {
            n.image = new Image, n.image.onload = e, n.image.onerror = r, n.image.src = "data:image/svg+xml," + (new XMLSerializer).serializeToString(t), n.image.complete === !0 && e(n.image)
        }) : this.hasFabric().then(function() {
            return new Promise(function(e) {
                window.html2canvas.svg.fabric.parseSVGDocument(t, n.createCanvas.call(n, e))
            })
        })
    }
    var i = n(10);
    r.prototype = Object.create(i.prototype), t.exports = r
}, function(t, e, n) {
    "use strict";

    function r(t, e) {
        o.call(this, t, e)
    }

    function i(t, e, n) {
        if (t.length > 0) return e + n.toUpperCase()
    }
    var o = n(3);
    r.prototype = Object.create(o.prototype), r.prototype.applyTextTransform = function() {
        this.node.data = this.transform(this.parent.css("textTransform"))
    }, r.prototype.transform = function(t) {
        var e = this.node.data;
        switch (t) {
            case "lowercase":
                return e.toLowerCase();
            case "capitalize":
                return e.replace(/(^|\s|:|-|\(|\))([a-z])/g, i);
            case "uppercase":
                return e.toUpperCase();
            default:
                return e
        }
    }, t.exports = r
}, function(t, e, n) {
    "use strict";

    function r(t) {
        i.apply(this, arguments), this.type = "linear" === t.args[0] ? i.TYPES.LINEAR : i.TYPES.RADIAL
    }
    var i = n(8);
    r.prototype = Object.create(i.prototype), t.exports = r
}, function(t, e, n) {
    var r;
    (function(t, i) {
        ! function(o) {
            function s(t) {
                throw new RangeError(P[t])
            }

            function a(t, e) {
                for (var n = t.length, r = []; n--;) r[n] = e(t[n]);
                return r
            }

            function c(t, e) {
                var n = t.split("@"),
                    r = "";
                n.length > 1 && (r = n[0] + "@", t = n[1]), t = t.replace(A, ".");
                var i = t.split("."),
                    o = a(i, e).join(".");
                return r + o
            }

            function h(t) {
                for (var e, n, r = [], i = 0, o = t.length; i < o;) e = t.charCodeAt(i++), e >= 55296 && e <= 56319 && i < o ? (n = t.charCodeAt(i++), 56320 == (64512 & n) ? r.push(((1023 & e) << 10) + (1023 & n) + 65536) : (r.push(e), i--)) : r.push(e);
                return r
            }

            function u(t) {
                return a(t, function(t) {
                    var e = "";
                    return t > 65535 && (t -= 65536, e += B(t >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e += B(t)
                }).join("")
            }

            function l(t) {
                return t - 48 < 10 ? t - 22 : t - 65 < 26 ? t - 65 : t - 97 < 26 ? t - 97 : x
            }

            function d(t, e) {
                return t + 22 + 75 * (t < 26) - ((0 != e) << 5)
            }

            function p(t, e, n) {
                var r = 0;
                for (t = n ? N(t / k) : t >> 1, t += N(t / e); t > L * E >> 1; r += x) t = N(t / L);
                return N(r + (L + 1) * t / (t + T))
            }

            function f(t) {
                var e, n, r, i, o, a, c, h, d, f, g = [],
                    m = t.length,
                    y = 0,
                    w = S,
                    b = C;
                for (n = t.lastIndexOf(I), n < 0 && (n = 0), r = 0; r < n; ++r) t.charCodeAt(r) >= 128 && s("not-basic"), g.push(t.charCodeAt(r));
                for (i = n > 0 ? n + 1 : 0; i < m;) {
                    for (o = y, a = 1, c = x; i >= m && s("invalid-input"), h = l(t.charCodeAt(i++)), (h >= x || h > N((v - y) / a)) && s("overflow"), y += h * a, d = c <= b ? _ : c >= b + E ? E : c - b, !(h < d); c += x) f = x - d, a > N(v / f) && s("overflow"), a *= f;
                    e = g.length + 1, b = p(y - o, e, 0 == o), N(y / e) > v - w && s("overflow"), w += N(y / e), y %= e, g.splice(y++, 0, w)
                }
                return u(g)
            }

            function g(t) {
                var e, n, r, i, o, a, c, u, l, f, g, m, y, w, b, T = [];
                for (t = h(t), m = t.length, e = S, n = 0, o = C, a = 0; a < m; ++a) g = t[a], g < 128 && T.push(B(g));
                for (r = i = T.length, i && T.push(I); r < m;) {
                    for (c = v, a = 0; a < m; ++a) g = t[a], g >= e && g < c && (c = g);
                    for (y = r + 1, c - e > N((v - n) / y) && s("overflow"), n += (c - e) * y, e = c, a = 0; a < m; ++a)
                        if (g = t[a], g < e && ++n > v && s("overflow"), g == e) {
                            for (u = n, l = x; f = l <= o ? _ : l >= o + E ? E : l - o, !(u < f); l += x) b = u - f, w = x - f, T.push(B(d(f + b % w, 0))), u = N(b / w);
                            T.push(B(d(u, 0))), o = p(n, y, r == i), n = 0, ++r
                        }++n, ++e
                }
                return T.join("")
            }

            function m(t) {
                return c(t, function(t) {
                    return R.test(t) ? f(t.slice(4).toLowerCase()) : t
                })
            }

            function y(t) {
                return c(t, function(t) {
                    return O.test(t) ? "xn--" + g(t) : t
                })
            }
            var w = ("object" == typeof e && e && !e.nodeType && e, "object" == typeof t && t && !t.nodeType && t, "object" == typeof i && i);
            w.global !== w && w.window !== w && w.self !== w || (o = w);
            var b, v = 2147483647,
                x = 36,
                _ = 1,
                E = 26,
                T = 38,
                k = 700,
                C = 72,
                S = 128,
                I = "-",
                R = /^xn--/,
                O = /[^\x20-\x7E]/,
                A = /[\x2E\u3002\uFF0E\uFF61]/g,
                P = {
                    overflow: "Overflow: input needs wider integers to process",
                    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                    "invalid-input": "Invalid input"
                },
                L = x - _,
                N = Math.floor,
                B = String.fromCharCode;
            b = {
                version: "1.4.1",
                ucs2: {
                    decode: h,
                    encode: u
                },
                decode: f,
                encode: g,
                toASCII: y,
                toUnicode: m
            }, r = function() {
                return b
            }.call(e, n, e, t), !(void 0 !== r && (t.exports = r))
        }(this)
    }).call(e, n(29)(t), function() {
        return this
    }())
}, function(t, e) {
    t.exports = function(t) {
        return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children = [], t.webpackPolyfill = 1), t
    }
}]);