!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : 
        "function" == typeof define && define.amd ? define(e) : t.MetisMenu = e()
}(this, function() {
    "use strict";
    let t = function() {
            return (t = Object.assign || function(t) {
                for (let e, i = 1, n = arguments.length; i < n; i++) {
                    e = arguments[i];
                    for (let i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                }
                return t
            }).apply(this, arguments)
        },
        e = {
            parentTrigger: "li",
            subMenu: "ul",
            toggle: !0,
            triggerElement: "a"
        },
        i = "active",
        n = "collapse",
        s = "in",
        o = "collapsing";
    return function() {
        function r(i, n) {
            this.element = "string" == typeof i ? document.querySelector(i) : i, this.cacheEl = this.element, this.config = t({}, e, n), this.cacheConfig = this.config, this.disposed = !1, this.ulArr = [], this.listenerOb = [], this.init()
        }

        return r.prototype.update = function() {
            this.disposed = !1, this.element = this.cacheEl, this.config = this.cacheConfig, this.setTransitioning(!1), this.init()
        }, r.prototype.dispose = function() {
            for (let t = 0, e = this.listenerOb; t < e.length; t++) {
                let i = e[t];
                for (let t in i)
                    if (i.hasOwnProperty(t)) {
                        let e = i[t];
                        e[1].removeEventListener(e[0], e[2])
                    }
            }
            this.ulArr = [], this.listenerOb = [], this.config = null, this.element = null, this.disposed = !0
        }, r.prototype.on = function(t, e) {
            return this.element.addEventListener(t, e, !1), this
        }, r.prototype.off = function(t, e) {
            return this.element.removeEventListener(t, e), this
        }, r.prototype.emit = function(t, e, i) {
            let n;
            return void 0 === i && (i = !1), "function" == typeof CustomEvent ? n = new CustomEvent(t, {
                bubbles: i,
                detail: e
            }) : (n = document.createEvent("CustomEvent")).initCustomEvent(t, i, !1, e), this.element.dispatchEvent(n), this
        }, r.prototype.init = function() {
            this.ulArr = [].slice.call(this.element.querySelectorAll(this.config.subMenu));
            for (let t = 0, e = this.ulArr; t < e.length; t++) {
                let s = e[t];
                if (!s.classList.contains("navd")) {
                    let t = s.parentNode;
                    s.classList.add(n), t.classList.contains(i) ? this.show(s) : this.hide(s);
                    let e = t.querySelector(this.config.triggerElement);
                    if ("true" === e.getAttribute("aria-disabled")) return;
                    e.setAttribute("aria-expanded", "false");
                    let o = {
                        aClick: ["click", e, this.clickEvent.bind(this)]
                    };
                    for (let t in o)
                        if (o.hasOwnProperty(t)) {
                            let e = o[t];
                            e[1].addEventListener(e[0], e[2])
                        }
                    this.listenerOb.push(o)
                }
            }
        }, r.prototype.clickEvent = function(t) {
            if (!this.disposed) {
                "A" === t.currentTarget.tagName && t.preventDefault();
                let e = t.currentTarget.parentNode.querySelector(this.config.subMenu);
                this.toggle(e)
            }
        }, r.prototype.toggle = function(t) {
            // t.parentNode.classList.contains(i) ? this.hide(t) : this.show(t)
        }, r.prototype.show = function(t) {
            let e = this;
            if (this.isTransitioning || t.classList.contains(s)) return;
            let r = function() {
                    t.classList.remove(o), t.style.height = "", t.removeEventListener("transitionend", r), e.setTransitioning(!1), e.emit("shown.metisMenu", {
                        shownElement: t
                    })
                },
                l = t.parentNode;
            l.classList.add(i), l.querySelector(this.config.triggerElement).setAttribute("aria-expanded", "true"), t.style.height = "0px", t.classList.remove(n), t.classList.remove(s), t.classList.add(o);
            let h = [].slice.call(l.parentNode.children).filter(function(t) {
                return t !== l
            });
            if (this.config.toggle && h.length > 0)
                for (let t = 0, e = h; t < e.length; t++) {
                    let i = e[t].querySelector(this.config.subMenu);
                    null !== i && this.hide(i)
                }
            t.classList.add(n);
            t.classList.add(s);
            t.style.height = t.scrollHeight + "px";
             "0px" == t.style.height?
                (t.classList.remove(o), t.style.height = "",
                        e.setTransitioning(!1)
                    // ,e.emit("shown.metisMenu", {shownElement: t})
                ) :
                (this.setTransitioning(!0),
                        // this.emit("show.metisMenu", {showElement: t}),
                        t.addEventListener("transitionend", r)
                )
        }, r.prototype.hide = function(t) {
            if (!t.classList.contains("navd")) {
                let e = this;
                if (this.isTransitioning || !t.classList.contains(s)) return;
                this.emit("hide.metisMenu", {
                    hideElement: t
                });
                let r = t.parentNode;
                r.classList.remove(i);
                let l = function() {
                    t.classList.remove(o), t.classList.add(n), t.removeEventListener("transitionend", l), e.setTransitioning(!1), e.emit("hidden.metisMenu", {
                        hiddenElement: t
                    })
                };
                t.style.height = t.getBoundingClientRect().height + "px", t.style.height = t.offsetHeight + "px", t.classList.add(o), t.classList.remove(n), t.classList.remove(s), "0px" == t.style.height ? (t.classList.remove(o), t.classList.add(n), e.setTransitioning(!1), e.emit("hidden.metisMenu", {
                    hiddenElement: t
                })) : (this.setTransitioning(!0), t.addEventListener("transitionend", l), t.style.height = "0px"), r.querySelector(this.config.triggerElement).setAttribute("aria-expanded", "false")
            }
        }, r.prototype.setTransitioning = function(t) {
            this.isTransitioning = t
        }, r
    }()
});
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).CodeMirror = t()
}(this, function() {
    "use strict";
    var e = navigator.userAgent,
        t = navigator.platform,
        r = /gecko\/\d/i.test(e),
        n = /MSIE \d/.test(e),
        i = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(e),
        o = /Edge\/(\d+)/.exec(e),
        l = n || i || o,
        s = l && (n ? document.documentMode || 6 : +(o || i)[1]),
        a = !o && /WebKit\//.test(e),
        u = a && /Qt\/\d+\.\d+/.test(e),
        c = !o && /Chrome\//.test(e),
        h = /Opera\//.test(e),
        f = /Apple Computer/.test(navigator.vendor),
        d = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(e),
        p = /PhantomJS/.test(e),
        g = f && (/Mobile\/\w+/.test(e) || navigator.maxTouchPoints > 2),
        v = /Android/.test(e),
        m = g || v || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(e),
        y = g || /Mac/.test(t),
        b = /\bCrOS\b/.test(e),
        w = /win/i.test(t),
        x = h && e.match(/Version\/(\d*\.\d*)/);
    x && (x = Number(x[1])), x && x >= 15 && (h = !1, a = !0);
    var C = y && (u || h && (null == x || x < 12.11)),
        S = r || l && s >= 9;

    function L(e) {
        return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*")
    }

    var k, T = function(e, t) {
        var r = e.className,
            n = L(t).exec(r);
        if (n) {
            var i = r.slice(n.index + n[0].length);
            e.className = r.slice(0, n.index) + (i ? n[1] + i : "")
        }
    };

    function M(e) {
        for (var t = e.childNodes.length; t > 0; --t) e.removeChild(e.firstChild);
        return e
    }

    function N(e, t) {
        return M(e).appendChild(t)
    }

    function O(e, t, r, n) {
        var i = document.createElement(e);
        if (r && (i.className = r), n && (i.style.cssText = n), "string" == typeof t) i.appendChild(document.createTextNode(t));
        else if (t)
            for (var o = 0; o < t.length; ++o) i.appendChild(t[o]);
        return i
    }

    function A(e, t, r, n) {
        var i = O(e, t, r, n);
        return i.setAttribute("role", "presentation"), i
    }

    function D(e, t) {
        if (3 == t.nodeType && (t = t.parentNode), e.contains) return e.contains(t);
        do {
            if (11 == t.nodeType && (t = t.host), t == e) return !0
        } while (t = t.parentNode)
    }

    function W() {
        var e;
        try {
            e = document.activeElement
        } catch (t) {
            e = document.body || null
        }
        for (; e && e.shadowRoot && e.shadowRoot.activeElement;) e = e.shadowRoot.activeElement;
        return e
    }

    function H(e, t) {
        var r = e.className;
        L(t).test(r) || (e.className += (r ? " " : "") + t)
    }

    function F(e, t) {
        for (var r = e.split(" "), n = 0; n < r.length; n++) r[n] && !L(r[n]).test(t) && (t += " " + r[n]);
        return t
    }

    k = document.createRange ? function(e, t, r, n) {
        var i = document.createRange();
        return i.setEnd(n || e, r), i.setStart(e, t), i
    } : function(e, t, r) {
        var n = document.body.createTextRange();
        try {
            n.moveToElementText(e.parentNode)
        } catch (e) {
            return n
        }
        return n.collapse(!0), n.moveEnd("character", r), n.moveStart("character", t), n
    };
    var P = function(e) {
        e.select()
    };

    function E(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return function() {
            return e.apply(null, t)
        }
    }

    function I(e, t, r) {
        for (var n in t || (t = {}), e) !e.hasOwnProperty(n) || !1 === r && t.hasOwnProperty(n) || (t[n] = e[n]);
        return t
    }

    function R(e, t, r, n, i) {
        null == t && -1 == (t = e.search(/[^\s\u00a0]/)) && (t = e.length);
        for (var o = n || 0, l = i || 0;;) {
            var s = e.indexOf("\t", o);
            if (s < 0 || s >= t) return l + (t - o);
            l += s - o, l += r - l % r, o = s + 1
        }
    }

    g ? P = function(e) {
        e.selectionStart = 0, e.selectionEnd = e.value.length
    } : l && (P = function(e) {
        try {
            e.select()
        } catch (e) {}
    });
    var z = function() {
        this.id = null, this.f = null, this.time = 0, this.handler = E(this.onTimeout, this)
    };

    function B(e, t) {
        for (var r = 0; r < e.length; ++r)
            if (e[r] == t) return r;
        return -1
    }

    z.prototype.onTimeout = function(e) {
        e.id = 0, e.time <= +new Date ? e.f() : setTimeout(e.handler, e.time - +new Date)
    }, z.prototype.set = function(e, t) {
        this.f = t;
        var r = +new Date + e;
        (!this.id || r < this.time) && (clearTimeout(this.id), this.id = setTimeout(this.handler, e), this.time = r)
    };
    var G = 50,
        U = {
            toString: function() {
                return "CodeMirror.Pass"
            }
        },
        V = {
            scroll: !1
        },
        K = {
            origin: "*mouse"
        },
        j = {
            origin: "+move"
        };

    function X(e, t, r) {
        for (var n = 0, i = 0;;) {
            var o = e.indexOf("\t", n); -
                1 == o && (o = e.length);
            var l = o - n;
            if (o == e.length || i + l >= t) return n + Math.min(l, t - i);
            if (i += o - n, n = o + 1, (i += r - i % r) >= t) return n
        }
    }

    var Y = [""];

    function _(e) {
        for (; Y.length <= e;) Y.push($(Y) + " ");
        return Y[e]
    }

    function $(e) {
        return e[e.length - 1]
    }

    function q(e, t) {
        for (var r = [], n = 0; n < e.length; n++) r[n] = t(e[n], n);
        return r
    }

    function Z() {}

    function Q(e, t) {
        var r;
        return Object.create ? r = Object.create(e) : (Z.prototype = e, r = new Z), t && I(t, r), r
    }

    var J = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;

    function ee(e) {
        return /\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || J.test(e))
    }

    function te(e, t) {
        return t ? !!(t.source.indexOf("\\w") > -1 && ee(e)) || t.test(e) : ee(e)
    }

    function re(e) {
        for (var t in e)
            if (e.hasOwnProperty(t) && e[t]) return !1;
        return !0
    }

    var ne = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;

    function ie(e) {
        return e.charCodeAt(0) >= 768 && ne.test(e)
    }

    function oe(e, t, r) {
        for (;
            (r < 0 ? t > 0 : t < e.length) && ie(e.charAt(t));) t += r;
        return t
    }

    function le(e, t, r) {
        for (var n = t > r ? -1 : 1;;) {
            if (t == r) return t;
            var i = (t + r) / 2,
                o = n < 0 ? Math.ceil(i) : Math.floor(i);
            if (o == t) return e(o) ? t : r;
            e(o) ? r = o : t = o + n
        }
    }

    var se = null;

    function ae(e, t, r) {
        var n;
        se = null;
        for (var i = 0; i < e.length; ++i) {
            var o = e[i];
            if (o.from < t && o.to > t) return i;
            o.to == t && (o.from != o.to && "before" == r ? n = i : se = i), o.from == t && (o.from != o.to && "before" != r ? n = i : se = i)
        }
        return null != n ? n : se
    }

    var ue = function() {
        var e = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
            t = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
        var r = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
            n = /[stwN]/,
            i = /[LRr]/,
            o = /[Lb1n]/,
            l = /[1n]/;

        function s(e, t, r) {
            this.level = e, this.from = t, this.to = r
        }

        return function(a, u) {
            var c = "ltr" == u ? "L" : "R";
            if (0 == a.length || "ltr" == u && !r.test(a)) return !1;
            for (var h, f = a.length, d = [], p = 0; p < f; ++p) d.push((h = a.charCodeAt(p)) <= 247 ? e.charAt(h) : 1424 <= h && h <= 1524 ? "R" : 1536 <= h && h <= 1785 ? t.charAt(h - 1536) : 1774 <= h && h <= 2220 ? "r" : 8192 <= h && h <= 8203 ? "w" : 8204 == h ? "b" : "L");
            for (var g = 0, v = c; g < f; ++g) {
                var m = d[g];
                "m" == m ? d[g] = v : v = m
            }
            for (var y = 0, b = c; y < f; ++y) {
                var w = d[y];
                "1" == w && "r" == b ? d[y] = "n" : i.test(w) && (b = w, "r" == w && (d[y] = "R"))
            }
            for (var x = 1, C = d[0]; x < f - 1; ++x) {
                var S = d[x];
                "+" == S && "1" == C && "1" == d[x + 1] ? d[x] = "1" : "," != S || C != d[x + 1] || "1" != C && "n" != C || (d[x] = C), C = S
            }
            for (var L = 0; L < f; ++L) {
                var k = d[L];
                if ("," == k) d[L] = "N";
                else if ("%" == k) {
                    var T = void 0;
                    for (T = L + 1; T < f && "%" == d[T]; ++T);
                    for (var M = L && "!" == d[L - 1] || T < f && "1" == d[T] ? "1" : "N", N = L; N < T; ++N) d[N] = M;
                    L = T - 1
                }
            }
            for (var O = 0, A = c; O < f; ++O) {
                var D = d[O];
                "L" == A && "1" == D ? d[O] = "L" : i.test(D) && (A = D)
            }
            for (var W = 0; W < f; ++W)
                if (n.test(d[W])) {
                    var H = void 0;
                    for (H = W + 1; H < f && n.test(d[H]); ++H);
                    for (var F = "L" == (W ? d[W - 1] : c), P = F == ("L" == (H < f ? d[H] : c)) ? F ? "L" : "R" : c, E = W; E < H; ++E) d[E] = P;
                    W = H - 1
                }
            for (var I, R = [], z = 0; z < f;)
                if (o.test(d[z])) {
                    var B = z;
                    for (++z; z < f && o.test(d[z]); ++z);
                    R.push(new s(0, B, z))
                } else {
                    var G = z,
                        U = R.length,
                        V = "rtl" == u ? 1 : 0;
                    for (++z; z < f && "L" != d[z]; ++z);
                    for (var K = G; K < z;)
                        if (l.test(d[K])) {
                            G < K && (R.splice(U, 0, new s(1, G, K)), U += V);
                            var j = K;
                            for (++K; K < z && l.test(d[K]); ++K);
                            R.splice(U, 0, new s(2, j, K)), U += V, G = K
                        } else ++K;
                    G < z && R.splice(U, 0, new s(1, G, z))
                }
            return "ltr" == u && (1 == R[0].level && (I = a.match(/^\s+/)) && (R[0].from = I[0].length, R.unshift(new s(0, 0, I[0].length))), 1 == $(R).level && (I = a.match(/\s+$/)) && ($(R).to -= I[0].length, R.push(new s(0, f - I[0].length, f)))), "rtl" == u ? R.reverse() : R
        }
    }();

    function ce(e, t) {
        var r = e.order;
        return null == r && (r = e.order = ue(e.text, t)), r
    }

    var he = [],
        fe = function(e, t, r) {
            if (e.addEventListener) e.addEventListener(t, r, !1);
            else if (e.attachEvent) e.attachEvent("on" + t, r);
            else {
                var n = e._handlers || (e._handlers = {});
                n[t] = (n[t] || he).concat(r)
            }
        };

    function de(e, t) {
        return e._handlers && e._handlers[t] || he
    }

    function pe(e, t, r) {
        if (e.removeEventListener) e.removeEventListener(t, r, !1);
        else if (e.detachEvent) e.detachEvent("on" + t, r);
        else {
            var n = e._handlers,
                i = n && n[t];
            if (i) {
                var o = B(i, r);
                o > -1 && (n[t] = i.slice(0, o).concat(i.slice(o + 1)))
            }
        }
    }

    function ge(e, t) {
        var r = de(e, t);
        if (r.length)
            for (var n = Array.prototype.slice.call(arguments, 2), i = 0; i < r.length; ++i) r[i].apply(null, n)
    }

    function ve(e, t, r) {
        return "string" == typeof t && (t = {
            type: t,
            preventDefault: function() {
                this.defaultPrevented = !0
            }
        }), ge(e, r || t.type, e, t), Ce(t) || t.codemirrorIgnore
    }

    function me(e) {
        var t = e._handlers && e._handlers.cursorActivity;
        if (t)
            for (var r = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), n = 0; n < t.length; ++n) - 1 == B(r, t[n]) && r.push(t[n])
    }

    function ye(e, t) {
        return de(e, t).length > 0
    }

    function be(e) {
        e.prototype.on = function(e, t) {
            fe(this, e, t)
        }, e.prototype.off = function(e, t) {
            pe(this, e, t)
        }
    }

    function we(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
    }

    function xe(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
    }

    function Ce(e) {
        return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue
    }

    function Se(e) {
        we(e), xe(e)
    }

    function Le(e) {
        return e.target || e.srcElement
    }

    function ke(e) {
        var t = e.which;
        return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)), y && e.ctrlKey && 1 == t && (t = 3), t
    }

    var Te, Me, Ne = function() {
        if (l && s < 9) return !1;
        var e = O("div");
        return "draggable" in e || "dragDrop" in e
    }();

    function Oe(e) {
        if (null == Te) {
            var t = O("span", "​");
            N(e, O("span", [t, document.createTextNode("x")])), 0 != e.firstChild.offsetHeight && (Te = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(l && s < 8))
        }
        var r = Te ? O("span", "​") : O("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
        return r.setAttribute("cm-text", ""), r
    }

    function Ae(e) {
        if (null != Me) return Me;
        var t = N(e, document.createTextNode("AخA")),
            r = k(t, 0, 1).getBoundingClientRect(),
            n = k(t, 1, 2).getBoundingClientRect();
        return M(e), !(!r || r.left == r.right) && (Me = n.right - r.right < 3)
    }

    var De, We = 3 != "\n\nb".split(/\n/).length ? function(e) {
            for (var t = 0, r = [], n = e.length; t <= n;) {
                var i = e.indexOf("\n", t); -
                    1 == i && (i = e.length);
                var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
                    l = o.indexOf("\r"); -
                    1 != l ? (r.push(o.slice(0, l)), t += l + 1) : (r.push(o), t = i + 1)
            }
            return r
        } : function(e) {
            return e.split(/\r\n?|\n/)
        },
        He = window.getSelection ? function(e) {
            try {
                return e.selectionStart != e.selectionEnd
            } catch (e) {
                return !1
            }
        } : function(e) {
            var t;
            try {
                t = e.ownerDocument.selection.createRange()
            } catch (e) {}
            return !(!t || t.parentElement() != e) && 0 != t.compareEndPoints("StartToEnd", t)
        },
        Fe = "oncopy" in (De = O("div")) || (De.setAttribute("oncopy", "return;"), "function" == typeof De.oncopy),
        Pe = null;
    var Ee = {},
        Ie = {};

    function Re(e) {
        if ("string" == typeof e && Ie.hasOwnProperty(e)) e = Ie[e];
        else if (e && "string" == typeof e.name && Ie.hasOwnProperty(e.name)) {
            var t = Ie[e.name];
            "string" == typeof t && (t = {
                name: t
            }), (e = Q(t, e)).name = t.name
        } else {
            if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+xml$/.test(e)) return Re("application/xml");
            if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+json$/.test(e)) return Re("application/json")
        }
        return "string" == typeof e ? {
            name: e
        } : e || {
            name: "null"
        }
    }

    function ze(e, t) {
        t = Re(t);
        var r = Ee[t.name];
        if (!r) return ze(e, "text/plain");
        var n = r(e, t);
        if (Be.hasOwnProperty(t.name)) {
            var i = Be[t.name];
            for (var o in i) i.hasOwnProperty(o) && (n.hasOwnProperty(o) && (n["_" + o] = n[o]), n[o] = i[o])
        }
        if (n.name = t.name, t.helperType && (n.helperType = t.helperType), t.modeProps)
            for (var l in t.modeProps) n[l] = t.modeProps[l];
        return n
    }

    var Be = {};

    function Ge(e, t) {
        I(t, Be.hasOwnProperty(e) ? Be[e] : Be[e] = {})
    }

    function Ue(e, t) {
        if (!0 === t) return t;
        if (e.copyState) return e.copyState(t);
        var r = {};
        for (var n in t) {
            var i = t[n];
            i instanceof Array && (i = i.concat([])), r[n] = i
        }
        return r
    }

    function Ve(e, t) {
        for (var r; e.innerMode && (r = e.innerMode(t)) && r.mode != e;) t = r.state, e = r.mode;
        return r || {
            mode: e,
            state: t
        }
    }

    function Ke(e, t, r) {
        return !e.startState || e.startState(t, r)
    }

    var je = function(e, t, r) {
        this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0, this.lineOracle = r
    };

    function Xe(e, t) {
        if ((t -= e.first) < 0 || t >= e.size) throw new Error("There is no line " + (t + e.first) + " in the document.");
        for (var r = e; !r.lines;)
            for (var n = 0;; ++n) {
                var i = r.children[n],
                    o = i.chunkSize();
                if (t < o) {
                    r = i;
                    break
                }
                t -= o
            }
        return r.lines[t]
    }

    function Ye(e, t, r) {
        var n = [],
            i = t.line;
        return e.iter(t.line, r.line + 1, function(e) {
            var o = e.text;
            i == r.line && (o = o.slice(0, r.ch)), i == t.line && (o = o.slice(t.ch)), n.push(o), ++i
        }), n
    }

    function _e(e, t, r) {
        var n = [];
        return e.iter(t, r, function(e) {
            n.push(e.text)
        }), n
    }

    function $e(e, t) {
        var r = t - e.height;
        if (r)
            for (var n = e; n; n = n.parent) n.height += r
    }

    function qe(e) {
        if (null == e.parent) return null;
        for (var t = e.parent, r = B(t.lines, e), n = t.parent; n; t = n, n = n.parent)
            for (var i = 0; n.children[i] != t; ++i) r += n.children[i].chunkSize();
        return r + t.first
    }

    function Ze(e, t) {
        var r = e.first;
        e: do {
            for (var n = 0; n < e.children.length; ++n) {
                var i = e.children[n],
                    o = i.height;
                if (t < o) {
                    e = i;
                    continue e
                }
                t -= o, r += i.chunkSize()
            }
            return r
        } while (!e.lines);
        for (var l = 0; l < e.lines.length; ++l) {
            var s = e.lines[l].height;
            if (t < s) break;
            t -= s
        }
        return r + l
    }

    function Qe(e, t) {
        return t >= e.first && t < e.first + e.size
    }

    function Je(e, t) {
        return String(e.lineNumberFormatter(t + e.firstLineNumber))
    }

    function et(e, t, r) {
        if (void 0 === r && (r = null), !(this instanceof et)) return new et(e, t, r);
        this.line = e, this.ch = t, this.sticky = r
    }

    function tt(e, t) {
        return e.line - t.line || e.ch - t.ch
    }

    function rt(e, t) {
        return e.sticky == t.sticky && 0 == tt(e, t)
    }

    function nt(e) {
        return et(e.line, e.ch)
    }

    function it(e, t) {
        return tt(e, t) < 0 ? t : e
    }

    function ot(e, t) {
        return tt(e, t) < 0 ? e : t
    }

    function lt(e, t) {
        return Math.max(e.first, Math.min(t, e.first + e.size - 1))
    }

    function st(e, t) {
        if (t.line < e.first) return et(e.first, 0);
        var r = e.first + e.size - 1;
        return t.line > r ? et(r, Xe(e, r).text.length) : function(e, t) {
            var r = e.ch;
            return null == r || r > t ? et(e.line, t) : r < 0 ? et(e.line, 0) : e
        }(t, Xe(e, t.line).text.length)
    }

    function at(e, t) {
        for (var r = [], n = 0; n < t.length; n++) r[n] = st(e, t[n]);
        return r
    }

    je.prototype.eol = function() {
        return this.pos >= this.string.length
    }, je.prototype.sol = function() {
        return this.pos == this.lineStart
    }, je.prototype.peek = function() {
        return this.string.charAt(this.pos) || void 0
    }, je.prototype.next = function() {
        if (this.pos < this.string.length) return this.string.charAt(this.pos++)
    }, je.prototype.eat = function(e) {
        var t = this.string.charAt(this.pos);
        if ("string" == typeof e ? t == e : t && (e.test ? e.test(t) : e(t))) return ++this.pos, t
    }, je.prototype.eatWhile = function(e) {
        for (var t = this.pos; this.eat(e););
        return this.pos > t
    }, je.prototype.eatSpace = function() {
        for (var e = this.pos;
             /[\s\u00a0]/.test(this.string.charAt(this.pos));) ++this.pos;
        return this.pos > e
    }, je.prototype.skipToEnd = function() {
        this.pos = this.string.length
    }, je.prototype.skipTo = function(e) {
        var t = this.string.indexOf(e, this.pos);
        if (t > -1) return this.pos = t, !0
    }, je.prototype.backUp = function(e) {
        this.pos -= e
    }, je.prototype.column = function() {
        return this.lastColumnPos < this.start && (this.lastColumnValue = R(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? R(this.string, this.lineStart, this.tabSize) : 0)
    }, je.prototype.indentation = function() {
        return R(this.string, null, this.tabSize) - (this.lineStart ? R(this.string, this.lineStart, this.tabSize) : 0)
    }, je.prototype.match = function(e, t, r) {
        if ("string" != typeof e) {
            var n = this.string.slice(this.pos).match(e);
            return n && n.index > 0 ? null : (n && !1 !== t && (this.pos += n[0].length), n)
        }
        var i = function(e) {
            return r ? e.toLowerCase() : e
        };
        if (i(this.string.substr(this.pos, e.length)) == i(e)) return !1 !== t && (this.pos += e.length), !0
    }, je.prototype.current = function() {
        return this.string.slice(this.start, this.pos)
    }, je.prototype.hideFirstChars = function(e, t) {
        this.lineStart += e;
        try {
            return t()
        } finally {
            this.lineStart -= e
        }
    }, je.prototype.lookAhead = function(e) {
        var t = this.lineOracle;
        return t && t.lookAhead(e)
    }, je.prototype.baseToken = function() {
        var e = this.lineOracle;
        return e && e.baseToken(this.pos)
    };
    var ut = function(e, t) {
            this.state = e, this.lookAhead = t
        },
        ct = function(e, t, r, n) {
            this.state = t, this.doc = e, this.line = r, this.maxLookAhead = n || 0, this.baseTokens = null, this.baseTokenPos = 1
        };

    function ht(e, t, r, n) {
        var i = [e.state.modeGen],
            o = {};
        wt(e, t.text, e.doc.mode, r, function(e, t) {
            return i.push(e, t)
        }, o, n);
        for (var l = r.state, s = function(n) {
            r.baseTokens = i;
            var s = e.state.overlays[n],
                a = 1,
                u = 0;
            r.state = !0, wt(e, t.text, s.mode, r, function(e, t) {
                for (var r = a; u < e;) {
                    var n = i[a];
                    n > e && i.splice(a, 1, e, i[a + 1], n), a += 2, u = Math.min(e, n)
                }
                if (t)
                    if (s.opaque) i.splice(r, a - r, e, "overlay " + t), a = r + 2;
                    else
                        for (; r < a; r += 2) {
                            var o = i[r + 1];
                            i[r + 1] = (o ? o + " " : "") + "overlay " + t
                        }
            }, o), r.state = l, r.baseTokens = null, r.baseTokenPos = 1
        }, a = 0; a < e.state.overlays.length; ++a) s(a);
        return {
            styles: i,
            classes: o.bgClass || o.textClass ? o : null
        }
    }

    function ft(e, t, r) {
        if (!t.styles || t.styles[0] != e.state.modeGen) {
            var n = dt(e, qe(t)),
                i = t.text.length > e.options.maxHighlightLength && Ue(e.doc.mode, n.state),
                o = ht(e, t, n);
            i && (n.state = i), t.stateAfter = n.save(!i), t.styles = o.styles, o.classes ? t.styleClasses = o.classes : t.styleClasses && (t.styleClasses = null), r === e.doc.highlightFrontier && (e.doc.modeFrontier = Math.max(e.doc.modeFrontier, ++e.doc.highlightFrontier))
        }
        return t.styles
    }

    function dt(e, t, r) {
        var n = e.doc,
            i = e.display;
        if (!n.mode.startState) return new ct(n, !0, t);
        var o = function(e, t, r) {
                for (var n, i, o = e.doc, l = r ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), s = t; s > l; --s) {
                    if (s <= o.first) return o.first;
                    var a = Xe(o, s - 1),
                        u = a.stateAfter;
                    if (u && (!r || s + (u instanceof ut ? u.lookAhead : 0) <= o.modeFrontier)) return s;
                    var c = R(a.text, null, e.options.tabSize);
                    (null == i || n > c) && (i = s - 1, n = c)
                }
                return i
            }(e, t, r),
            l = o > n.first && Xe(n, o - 1).stateAfter,
            s = l ? ct.fromSaved(n, l, o) : new ct(n, Ke(n.mode), o);
        return n.iter(o, t, function(r) {
            pt(e, r.text, s);
            var n = s.line;
            r.stateAfter = n == t - 1 || n % 5 == 0 || n >= i.viewFrom && n < i.viewTo ? s.save() : null, s.nextLine()
        }), r && (n.modeFrontier = s.line), s
    }

    function pt(e, t, r, n) {
        var i = e.doc.mode,
            o = new je(t, e.options.tabSize, r);
        for (o.start = o.pos = n || 0, "" == t && gt(i, r.state); !o.eol();) vt(i, o, r.state), o.start = o.pos
    }

    function gt(e, t) {
        if (e.blankLine) return e.blankLine(t);
        if (e.innerMode) {
            var r = Ve(e, t);
            return r.mode.blankLine ? r.mode.blankLine(r.state) : void 0
        }
    }

    function vt(e, t, r, n) {
        for (var i = 0; i < 10; i++) {
            n && (n[0] = Ve(e, r).mode);
            var o = e.token(t, r);
            if (t.pos > t.start) return o
        }
        throw new Error("Mode " + e.name + " failed to advance stream.")
    }

    ct.prototype.lookAhead = function(e) {
        var t = this.doc.getLine(this.line + e);
        return null != t && e > this.maxLookAhead && (this.maxLookAhead = e), t
    }, ct.prototype.baseToken = function(e) {
        if (!this.baseTokens) return null;
        for (; this.baseTokens[this.baseTokenPos] <= e;) this.baseTokenPos += 2;
        var t = this.baseTokens[this.baseTokenPos + 1];
        return {
            type: t && t.replace(/( |^)overlay .*/, ""),
            size: this.baseTokens[this.baseTokenPos] - e
        }
    }, ct.prototype.nextLine = function() {
        this.line++, this.maxLookAhead > 0 && this.maxLookAhead--
    }, ct.fromSaved = function(e, t, r) {
        return t instanceof ut ? new ct(e, Ue(e.mode, t.state), r, t.lookAhead) : new ct(e, Ue(e.mode, t), r)
    }, ct.prototype.save = function(e) {
        var t = !1 !== e ? Ue(this.doc.mode, this.state) : this.state;
        return this.maxLookAhead > 0 ? new ut(t, this.maxLookAhead) : t
    };
    var mt = function(e, t, r) {
        this.start = e.start, this.end = e.pos, this.string = e.current(), this.type = t || null, this.state = r
    };

    function yt(e, t, r, n) {
        var i, o, l = e.doc,
            s = l.mode,
            a = Xe(l, (t = st(l, t)).line),
            u = dt(e, t.line, r),
            c = new je(a.text, e.options.tabSize, u);
        for (n && (o = []);
             (n || c.pos < t.ch) && !c.eol();) c.start = c.pos, i = vt(s, c, u.state), n && o.push(new mt(c, i, Ue(l.mode, u.state)));
        return n ? o : new mt(c, i, u.state)
    }

    function bt(e, t) {
        if (e)
            for (;;) {
                var r = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
                if (!r) break;
                e = e.slice(0, r.index) + e.slice(r.index + r[0].length);
                var n = r[1] ? "bgClass" : "textClass";
                null == t[n] ? t[n] = r[2] : new RegExp("(?:^|\\s)" + r[2] + "(?:$|\\s)").test(t[n]) || (t[n] += " " + r[2])
            }
        return e
    }

    function wt(e, t, r, n, i, o, l) {
        var s = r.flattenSpans;
        null == s && (s = e.options.flattenSpans);
        var a, u = 0,
            c = null,
            h = new je(t, e.options.tabSize, n),
            f = e.options.addModeClass && [null];
        for ("" == t && bt(gt(r, n.state), o); !h.eol();) {
            if (h.pos > e.options.maxHighlightLength ? (s = !1, l && pt(e, t, n, h.pos), h.pos = t.length, a = null) : a = bt(vt(r, h, n.state, f), o), f) {
                var d = f[0].name;
                d && (a = "m-" + (a ? d + " " + a : d))
            }
            if (!s || c != a) {
                for (; u < h.start;) i(u = Math.min(h.start, u + 5e3), c);
                c = a
            }
            h.start = h.pos
        }
        for (; u < h.pos;) {
            var p = Math.min(h.pos, u + 5e3);
            i(p, c), u = p
        }
    }

    var xt = !1,
        Ct = !1;

    function St(e, t, r) {
        this.marker = e, this.from = t, this.to = r
    }

    function Lt(e, t) {
        if (e)
            for (var r = 0; r < e.length; ++r) {
                var n = e[r];
                if (n.marker == t) return n
            }
    }

    function kt(e, t) {
        for (var r, n = 0; n < e.length; ++n) e[n] != t && (r || (r = [])).push(e[n]);
        return r
    }

    function Tt(e, t) {
        if (t.full) return null;
        var r = Qe(e, t.from.line) && Xe(e, t.from.line).markedSpans,
            n = Qe(e, t.to.line) && Xe(e, t.to.line).markedSpans;
        if (!r && !n) return null;
        var i = t.from.ch,
            o = t.to.ch,
            l = 0 == tt(t.from, t.to),
            s = function(e, t, r) {
                var n;
                if (e)
                    for (var i = 0; i < e.length; ++i) {
                        var o = e[i],
                            l = o.marker;
                        if (null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t) || o.from == t && "bookmark" == l.type && (!r || !o.marker.insertLeft)) {
                            var s = null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t);
                            (n || (n = [])).push(new St(l, o.from, s ? null : o.to))
                        }
                    }
                return n
            }(r, i, l),
            a = function(e, t, r) {
                var n;
                if (e)
                    for (var i = 0; i < e.length; ++i) {
                        var o = e[i],
                            l = o.marker;
                        if (null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t) || o.from == t && "bookmark" == l.type && (!r || o.marker.insertLeft)) {
                            var s = null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t);
                            (n || (n = [])).push(new St(l, s ? null : o.from - t, null == o.to ? null : o.to - t))
                        }
                    }
                return n
            }(n, o, l),
            u = 1 == t.text.length,
            c = $(t.text).length + (u ? i : 0);
        if (s)
            for (var h = 0; h < s.length; ++h) {
                var f = s[h];
                if (null == f.to) {
                    var d = Lt(a, f.marker);
                    d ? u && (f.to = null == d.to ? null : d.to + c) : f.to = i
                }
            }
        if (a)
            for (var p = 0; p < a.length; ++p) {
                var g = a[p];
                if (null != g.to && (g.to += c), null == g.from) Lt(s, g.marker) || (g.from = c, u && (s || (s = [])).push(g));
                else g.from += c, u && (s || (s = [])).push(g)
            }
        s && (s = Mt(s)), a && a != s && (a = Mt(a));
        var v = [s];
        if (!u) {
            var m, y = t.text.length - 2;
            if (y > 0 && s)
                for (var b = 0; b < s.length; ++b) null == s[b].to && (m || (m = [])).push(new St(s[b].marker, null, null));
            for (var w = 0; w < y; ++w) v.push(m);
            v.push(a)
        }
        return v
    }

    function Mt(e) {
        for (var t = 0; t < e.length; ++t) {
            var r = e[t];
            null != r.from && r.from == r.to && !1 !== r.marker.clearWhenEmpty && e.splice(t--, 1)
        }
        return e.length ? e : null
    }

    function Nt(e) {
        var t = e.markedSpans;
        if (t) {
            for (var r = 0; r < t.length; ++r) t[r].marker.detachLine(e);
            e.markedSpans = null
        }
    }

    function Ot(e, t) {
        if (t) {
            for (var r = 0; r < t.length; ++r) t[r].marker.attachLine(e);
            e.markedSpans = t
        }
    }

    function At(e) {
        return e.inclusiveLeft ? -1 : 0
    }

    function Dt(e) {
        return e.inclusiveRight ? 1 : 0
    }

    function Wt(e, t) {
        var r = e.lines.length - t.lines.length;
        if (0 != r) return r;
        var n = e.find(),
            i = t.find(),
            o = tt(n.from, i.from) || At(e) - At(t);
        if (o) return -o;
        var l = tt(n.to, i.to) || Dt(e) - Dt(t);
        return l || t.id - e.id
    }

    function Ht(e, t) {
        var r, n = Ct && e.markedSpans;
        if (n)
            for (var i = void 0, o = 0; o < n.length; ++o)(i = n[o]).marker.collapsed && null == (t ? i.from : i.to) && (!r || Wt(r, i.marker) < 0) && (r = i.marker);
        return r
    }

    function Ft(e) {
        return Ht(e, !0)
    }

    function Pt(e) {
        return Ht(e, !1)
    }

    function Et(e, t) {
        var r, n = Ct && e.markedSpans;
        if (n)
            for (var i = 0; i < n.length; ++i) {
                var o = n[i];
                o.marker.collapsed && (null == o.from || o.from < t) && (null == o.to || o.to > t) && (!r || Wt(r, o.marker) < 0) && (r = o.marker)
            }
        return r
    }

    function It(e, t, r, n, i) {
        var o = Xe(e, t),
            l = Ct && o.markedSpans;
        if (l)
            for (var s = 0; s < l.length; ++s) {
                var a = l[s];
                if (a.marker.collapsed) {
                    var u = a.marker.find(0),
                        c = tt(u.from, r) || At(a.marker) - At(i),
                        h = tt(u.to, n) || Dt(a.marker) - Dt(i);
                    if (!(c >= 0 && h <= 0 || c <= 0 && h >= 0) && (c <= 0 && (a.marker.inclusiveRight && i.inclusiveLeft ? tt(u.to, r) >= 0 : tt(u.to, r) > 0) || c >= 0 && (a.marker.inclusiveRight && i.inclusiveLeft ? tt(u.from, n) <= 0 : tt(u.from, n) < 0))) return !0
                }
            }
    }

    function Rt(e) {
        for (var t; t = Ft(e);) e = t.find(-1, !0).line;
        return e
    }

    function zt(e, t) {
        var r = Xe(e, t),
            n = Rt(r);
        return r == n ? t : qe(n)
    }

    function Bt(e, t) {
        if (t > e.lastLine()) return t;
        var r, n = Xe(e, t);
        if (!Gt(e, n)) return t;
        for (; r = Pt(n);) n = r.find(1, !0).line;
        return qe(n) + 1
    }

    function Gt(e, t) {
        var r = Ct && t.markedSpans;
        if (r)
            for (var n = void 0, i = 0; i < r.length; ++i)
                if ((n = r[i]).marker.collapsed) {
                    if (null == n.from) return !0;
                    if (!n.marker.widgetNode && 0 == n.from && n.marker.inclusiveLeft && Ut(e, t, n)) return !0
                }
    }

    function Ut(e, t, r) {
        if (null == r.to) {
            var n = r.marker.find(1, !0);
            return Ut(e, n.line, Lt(n.line.markedSpans, r.marker))
        }
        if (r.marker.inclusiveRight && r.to == t.text.length) return !0;
        for (var i = void 0, o = 0; o < t.markedSpans.length; ++o)
            if ((i = t.markedSpans[o]).marker.collapsed && !i.marker.widgetNode && i.from == r.to && (null == i.to || i.to != r.from) && (i.marker.inclusiveLeft || r.marker.inclusiveRight) && Ut(e, t, i)) return !0
    }

    function Vt(e) {
        for (var t = 0, r = (e = Rt(e)).parent, n = 0; n < r.lines.length; ++n) {
            var i = r.lines[n];
            if (i == e) break;
            t += i.height
        }
        for (var o = r.parent; o; o = (r = o).parent)
            for (var l = 0; l < o.children.length; ++l) {
                var s = o.children[l];
                if (s == r) break;
                t += s.height
            }
        return t
    }

    function Kt(e) {
        if (0 == e.height) return 0;
        for (var t, r = e.text.length, n = e; t = Ft(n);) {
            var i = t.find(0, !0);
            n = i.from.line, r += i.from.ch - i.to.ch
        }
        for (n = e; t = Pt(n);) {
            var o = t.find(0, !0);
            r -= n.text.length - o.from.ch, r += (n = o.to.line).text.length - o.to.ch
        }
        return r
    }

    function jt(e) {
        var t = e.display,
            r = e.doc;
        t.maxLine = Xe(r, r.first), t.maxLineLength = Kt(t.maxLine), t.maxLineChanged = !0, r.iter(function(e) {
            var r = Kt(e);
            r > t.maxLineLength && (t.maxLineLength = r, t.maxLine = e)
        })
    }

    var Xt = function(e, t, r) {
        this.text = e, Ot(this, t), this.height = r ? r(this) : 1
    };

    function Yt(e) {
        e.parent = null, Nt(e)
    }

    Xt.prototype.lineNo = function() {
        return qe(this)
    }, be(Xt);
    var _t = {},
        $t = {};

    function qt(e, t) {
        if (!e || /^\s*$/.test(e)) return null;
        var r = t.addModeClass ? $t : _t;
        return r[e] || (r[e] = e.replace(/\S+/g, "cm-$&"))
    }

    function Zt(e, t) {
        var r = A("span", null, null, a ? "padding-right: .1px" : null),
            n = {
                pre: A("pre", [r], "CodeMirror-line"),
                content: r,
                col: 0,
                pos: 0,
                cm: e,
                trailingSpace: !1,
                splitSpaces: e.getOption("lineWrapping")
            };
        t.measure = {};
        for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
            var o = i ? t.rest[i - 1] : t.line,
                l = void 0;
            n.pos = 0, n.addToken = Jt, Ae(e.display.measure) && (l = ce(o, e.doc.direction)) && (n.addToken = er(n.addToken, l)), n.map = [], rr(o, n, ft(e, o, t != e.display.externalMeasured && qe(o))), o.styleClasses && (o.styleClasses.bgClass && (n.bgClass = F(o.styleClasses.bgClass, n.bgClass || "")), o.styleClasses.textClass && (n.textClass = F(o.styleClasses.textClass, n.textClass || ""))), 0 == n.map.length && n.map.push(0, 0, n.content.appendChild(Oe(e.display.measure))), 0 == i ? (t.measure.map = n.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(n.map), (t.measure.caches || (t.measure.caches = [])).push({}))
        }
        if (a) {
            var s = n.content.lastChild;
            (/\bcm-tab\b/.test(s.className) || s.querySelector && s.querySelector(".cm-tab")) && (n.content.className = "cm-tab-wrap-hack")
        }
        return ge(e, "renderLine", e, t.line, n.pre), n.pre.className && (n.textClass = F(n.pre.className, n.textClass || "")), n
    }

    function Qt(e) {
        var t = O("span", "•", "cm-invalidchar");
        return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), t
    }

    function Jt(e, t, r, n, i, o, a) {
        if (t) {
            var u, c = e.splitSpaces ? function(e, t) {
                    if (e.length > 1 && !/  /.test(e)) return e;
                    for (var r = t, n = "", i = 0; i < e.length; i++) {
                        var o = e.charAt(i);
                        " " != o || !r || i != e.length - 1 && 32 != e.charCodeAt(i + 1) || (o = " "), n += o, r = " " == o
                    }
                    return n
                }(t, e.trailingSpace) : t,
                h = e.cm.state.specialChars,
                f = !1;
            if (h.test(t)) {
                u = document.createDocumentFragment();
                for (var d = 0;;) {
                    h.lastIndex = d;
                    var p = h.exec(t),
                        g = p ? p.index - d : t.length - d;
                    if (g) {
                        var v = document.createTextNode(c.slice(d, d + g));
                        l && s < 9 ? u.appendChild(O("span", [v])) : u.appendChild(v), e.map.push(e.pos, e.pos + g, v), e.col += g, e.pos += g
                    }
                    if (!p) break;
                    d += g + 1;
                    var m = void 0;
                    if ("\t" == p[0]) {
                        var y = e.cm.options.tabSize,
                            b = y - e.col % y;
                        (m = u.appendChild(O("span", _(b), "cm-tab"))).setAttribute("role", "presentation"), m.setAttribute("cm-text", "\t"), e.col += b
                    } else "\r" == p[0] || "\n" == p[0] ? ((m = u.appendChild(O("span", "\r" == p[0] ? "␍" : "␤", "cm-invalidchar"))).setAttribute("cm-text", p[0]), e.col += 1) : ((m = e.cm.options.specialCharPlaceholder(p[0])).setAttribute("cm-text", p[0]), l && s < 9 ? u.appendChild(O("span", [m])) : u.appendChild(m), e.col += 1);
                    e.map.push(e.pos, e.pos + 1, m), e.pos++
                }
            } else e.col += t.length, u = document.createTextNode(c), e.map.push(e.pos, e.pos + t.length, u), l && s < 9 && (f = !0), e.pos += t.length;
            if (e.trailingSpace = 32 == c.charCodeAt(t.length - 1), r || n || i || f || o || a) {
                var w = r || "";
                n && (w += n), i && (w += i);
                var x = O("span", [u], w, o);
                if (a)
                    for (var C in a) a.hasOwnProperty(C) && "style" != C && "class" != C && x.setAttribute(C, a[C]);
                return e.content.appendChild(x)
            }
            e.content.appendChild(u)
        }
    }

    function er(e, t) {
        return function(r, n, i, o, l, s, a) {
            i = i ? i + " cm-force-border" : "cm-force-border";
            for (var u = r.pos, c = u + n.length;;) {
                for (var h = void 0, f = 0; f < t.length && !((h = t[f]).to > u && h.from <= u); f++);
                if (h.to >= c) return e(r, n, i, o, l, s, a);
                e(r, n.slice(0, h.to - u), i, o, null, s, a), o = null, n = n.slice(h.to - u), u = h.to
            }
        }
    }

    function tr(e, t, r, n) {
        var i = !n && r.widgetNode;
        i && e.map.push(e.pos, e.pos + t, i), !n && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))), i.setAttribute("cm-marker", r.id)), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)), e.pos += t, e.trailingSpace = !1
    }

    function rr(e, t, r) {
        var n = e.markedSpans,
            i = e.text,
            o = 0;
        if (n)
            for (var l, s, a, u, c, h, f, d = i.length, p = 0, g = 1, v = "", m = 0;;) {
                if (m == p) {
                    a = u = c = s = "", f = null, h = null, m = 1 / 0;
                    for (var y = [], b = void 0, w = 0; w < n.length; ++w) {
                        var x = n[w],
                            C = x.marker;
                        if ("bookmark" == C.type && x.from == p && C.widgetNode) y.push(C);
                        else if (x.from <= p && (null == x.to || x.to > p || C.collapsed && x.to == p && x.from == p)) {
                            if (null != x.to && x.to != p && m > x.to && (m = x.to, u = ""), C.className && (a += " " + C.className), C.css && (s = (s ? s + ";" : "") + C.css), C.startStyle && x.from == p && (c += " " + C.startStyle), C.endStyle && x.to == m && (b || (b = [])).push(C.endStyle, x.to), C.title && ((f || (f = {})).title = C.title), C.attributes)
                                for (var S in C.attributes)(f || (f = {}))[S] = C.attributes[S];
                            C.collapsed && (!h || Wt(h.marker, C) < 0) && (h = x)
                        } else x.from > p && m > x.from && (m = x.from)
                    }
                    if (b)
                        for (var L = 0; L < b.length; L += 2) b[L + 1] == m && (u += " " + b[L]);
                    if (!h || h.from == p)
                        for (var k = 0; k < y.length; ++k) tr(t, 0, y[k]);
                    if (h && (h.from || 0) == p) {
                        if (tr(t, (null == h.to ? d + 1 : h.to) - p, h.marker, null == h.from), null == h.to) return;
                        h.to == p && (h = !1)
                    }
                }
                if (p >= d) break;
                for (var T = Math.min(d, m);;) {
                    if (v) {
                        var M = p + v.length;
                        if (!h) {
                            var N = M > T ? v.slice(0, T - p) : v;
                            t.addToken(t, N, l ? l + a : a, c, p + N.length == m ? u : "", s, f)
                        }
                        if (M >= T) {
                            v = v.slice(T - p), p = T;
                            break
                        }
                        p = M, c = ""
                    }
                    v = i.slice(o, o = r[g++]), l = qt(r[g++], t.cm.options)
                }
            } else
            for (var O = 1; O < r.length; O += 2) t.addToken(t, i.slice(o, o = r[O]), qt(r[O + 1], t.cm.options))
    }

    function nr(e, t, r) {
        this.line = t, this.rest = function(e) {
            for (var t, r; t = Pt(e);) e = t.find(1, !0).line, (r || (r = [])).push(e);
            return r
        }(t), this.size = this.rest ? qe($(this.rest)) - r + 1 : 1, this.node = this.text = null, this.hidden = Gt(e, t)
    }

    function ir(e, t, r) {
        for (var n, i = [], o = t; o < r; o = n) {
            var l = new nr(e.doc, Xe(e.doc, o), o);
            n = o + l.size, i.push(l)
        }
        return i
    }

    var or = null;
    var lr = null;

    function sr(e, t) {
        var r = de(e, t);
        if (r.length) {
            var n, i = Array.prototype.slice.call(arguments, 2);
            or ? n = or.delayedCallbacks : lr ? n = lr : (n = lr = [], setTimeout(ar, 0));
            for (var o = function(e) {
                n.push(function() {
                    return r[e].apply(null, i)
                })
            }, l = 0; l < r.length; ++l) o(l)
        }
    }

    function ar() {
        var e = lr;
        lr = null;
        for (var t = 0; t < e.length; ++t) e[t]()
    }

    function ur(e, t, r, n) {
        for (var i = 0; i < t.changes.length; i++) {
            var o = t.changes[i];
            "text" == o ? fr(e, t) : "gutter" == o ? pr(e, t, r, n) : "class" == o ? dr(e, t) : "widget" == o && gr(e, t, n)
        }
        t.changes = null
    }

    function cr(e) {
        return e.node == e.text && (e.node = O("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), l && s < 8 && (e.node.style.zIndex = 2)), e.node
    }

    function hr(e, t) {
        var r = e.display.externalMeasured;
        return r && r.line == t.line ? (e.display.externalMeasured = null, t.measure = r.measure, r.built) : Zt(e, t)
    }

    function fr(e, t) {
        var r = t.text.className,
            n = hr(e, t);
        t.text == t.node && (t.node = n.pre), t.text.parentNode.replaceChild(n.pre, t.text), t.text = n.pre, n.bgClass != t.bgClass || n.textClass != t.textClass ? (t.bgClass = n.bgClass, t.textClass = n.textClass, dr(e, t)) : r && (t.text.className = r)
    }

    function dr(e, t) {
        ! function(e, t) {
            var r = t.bgClass ? t.bgClass + " " + (t.line.bgClass || "") : t.line.bgClass;
            if (r && (r += " CodeMirror-linebackground"), t.background) r ? t.background.className = r : (t.background.parentNode.removeChild(t.background), t.background = null);
            else if (r) {
                var n = cr(t);
                t.background = n.insertBefore(O("div", null, r), n.firstChild), e.display.input.setUneditable(t.background)
            }
        }(e, t), t.line.wrapClass ? cr(t).className = t.line.wrapClass : t.node != t.text && (t.node.className = "");
        var r = t.textClass ? t.textClass + " " + (t.line.textClass || "") : t.line.textClass;
        t.text.className = r || ""
    }

    function pr(e, t, r, n) {
        if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
            var i = cr(t);
            t.gutterBackground = O("div", null, "CodeMirror-gutter-background " + t.line.gutterClass, "left: " + (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) + "px; width: " + n.gutterTotalWidth + "px"), e.display.input.setUneditable(t.gutterBackground), i.insertBefore(t.gutterBackground, t.text)
        }
        var o = t.line.gutterMarkers;
        if (e.options.lineNumbers || o) {
            var l = cr(t),
                s = t.gutter = O("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) + "px");
            if (e.display.input.setUneditable(s), l.insertBefore(s, t.text), t.line.gutterClass && (s.className += " " + t.line.gutterClass), !e.options.lineNumbers || o && o["CodeMirror-linenumbers"] || (t.lineNumber = s.appendChild(O("div", Je(e.options, r), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + n.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))), o)
                for (var a = 0; a < e.display.gutterSpecs.length; ++a) {
                    var u = e.display.gutterSpecs[a].className,
                        c = o.hasOwnProperty(u) && o[u];
                    c && s.appendChild(O("div", [c], "CodeMirror-gutter-elt", "left: " + n.gutterLeft[u] + "px; width: " + n.gutterWidth[u] + "px"))
                }
        }
    }

    function gr(e, t, r) {
        t.alignable && (t.alignable = null);
        for (var n = L("CodeMirror-linewidget"), i = t.node.firstChild, o = void 0; i; i = o) o = i.nextSibling, n.test(i.className) && t.node.removeChild(i);
        mr(e, t, r)
    }

    function vr(e, t, r, n) {
        var i = hr(e, t);
        return t.text = t.node = i.pre, i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), dr(e, t), pr(e, t, r, n), mr(e, t, n), t.node
    }

    function mr(e, t, r) {
        if (yr(e, t.line, t, r, !0), t.rest)
            for (var n = 0; n < t.rest.length; n++) yr(e, t.rest[n], t, r, !1)
    }

    function yr(e, t, r, n, i) {
        if (t.widgets)
            for (var o = cr(r), l = 0, s = t.widgets; l < s.length; ++l) {
                var a = s[l],
                    u = O("div", [a.node], "CodeMirror-linewidget" + (a.className ? " " + a.className : ""));
                a.handleMouseEvents || u.setAttribute("cm-ignore-events", "true"), br(a, u, r, n), e.display.input.setUneditable(u), i && a.above ? o.insertBefore(u, r.gutter || r.text) : o.appendChild(u), sr(a, "redraw")
            }
    }

    function br(e, t, r, n) {
        if (e.noHScroll) {
            (r.alignable || (r.alignable = [])).push(t);
            var i = n.wrapperWidth;
            t.style.left = n.fixedPos + "px", e.coverGutter || (i -= n.gutterTotalWidth, t.style.paddingLeft = n.gutterTotalWidth + "px"), t.style.width = i + "px"
        }
        e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -n.gutterTotalWidth + "px"))
    }

    function wr(e) {
        if (null != e.height) return e.height;
        var t = e.doc.cm;
        if (!t) return 0;
        if (!D(document.body, e.node)) {
            var r = "position: relative;";
            e.coverGutter && (r += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (r += "width: " + t.display.wrapper.clientWidth + "px;"), N(t.display.measure, O("div", [e.node], null, r))
        }
        return e.height = e.node.parentNode.offsetHeight
    }

    function xr(e, t) {
        for (var r = Le(t); r != e.wrapper; r = r.parentNode)
            if (!r || 1 == r.nodeType && "true" == r.getAttribute("cm-ignore-events") || r.parentNode == e.sizer && r != e.mover) return !0
    }

    function Cr(e) {
        return e.lineSpace.offsetTop
    }

    function Sr(e) {
        return e.mover.offsetHeight - e.lineSpace.offsetHeight
    }

    function Lr(e) {
        if (e.cachedPaddingH) return e.cachedPaddingH;
        var t = N(e.measure, O("pre", "x", "CodeMirror-line-like")),
            r = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle,
            n = {
                left: parseInt(r.paddingLeft),
                right: parseInt(r.paddingRight)
            };
        return isNaN(n.left) || isNaN(n.right) || (e.cachedPaddingH = n), n
    }

    function kr(e) {
        return G - e.display.nativeBarWidth
    }

    function Tr(e) {
        return e.display.scroller.clientWidth - kr(e) - e.display.barWidth
    }

    function Mr(e) {
        return e.display.scroller.clientHeight - kr(e) - e.display.barHeight
    }

    function Nr(e, t, r) {
        if (e.line == t) return {
            map: e.measure.map,
            cache: e.measure.cache
        };
        for (var n = 0; n < e.rest.length; n++)
            if (e.rest[n] == t) return {
                map: e.measure.maps[n],
                cache: e.measure.caches[n]
            };
        for (var i = 0; i < e.rest.length; i++)
            if (qe(e.rest[i]) > r) return {
                map: e.measure.maps[i],
                cache: e.measure.caches[i],
                before: !0
            }
    }

    function Or(e, t, r, n) {
        return Wr(e, Dr(e, t), r, n)
    }

    function Ar(e, t) {
        if (t >= e.display.viewFrom && t < e.display.viewTo) return e.display.view[an(e, t)];
        var r = e.display.externalMeasured;
        return r && t >= r.lineN && t < r.lineN + r.size ? r : void 0
    }

    function Dr(e, t) {
        var r = qe(t),
            n = Ar(e, r);
        n && !n.text ? n = null : n && n.changes && (ur(e, n, r, rn(e)), e.curOp.forceUpdate = !0), n || (n = function(e, t) {
            var r = qe(t = Rt(t)),
                n = e.display.externalMeasured = new nr(e.doc, t, r);
            n.lineN = r;
            var i = n.built = Zt(e, n);
            return n.text = i.pre, N(e.display.lineMeasure, i.pre), n
        }(e, t));
        var i = Nr(n, t, r);
        return {
            line: t,
            view: n,
            rect: null,
            map: i.map,
            cache: i.cache,
            before: i.before,
            hasHeights: !1
        }
    }

    function Wr(e, t, r, n, i) {
        t.before && (r = -1);
        var o, a = r + (n || "");
        return t.cache.hasOwnProperty(a) ? o = t.cache[a] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (! function(e, t, r) {
            var n = e.options.lineWrapping,
                i = n && Tr(e);
            if (!t.measure.heights || n && t.measure.width != i) {
                var o = t.measure.heights = [];
                if (n) {
                    t.measure.width = i;
                    for (var l = t.text.firstChild.getClientRects(), s = 0; s < l.length - 1; s++) {
                        var a = l[s],
                            u = l[s + 1];
                        Math.abs(a.bottom - u.bottom) > 2 && o.push((a.bottom + u.top) / 2 - r.top)
                    }
                }
                o.push(r.bottom - r.top)
            }
        }(e, t.view, t.rect), t.hasHeights = !0), (o = function(e, t, r, n) {
            var i, o = Pr(t.map, r, n),
                a = o.node,
                u = o.start,
                c = o.end,
                h = o.collapse;
            if (3 == a.nodeType) {
                for (var f = 0; f < 4; f++) {
                    for (; u && ie(t.line.text.charAt(o.coverStart + u));) --u;
                    for (; o.coverStart + c < o.coverEnd && ie(t.line.text.charAt(o.coverStart + c));) ++c;
                    if ((i = l && s < 9 && 0 == u && c == o.coverEnd - o.coverStart ? a.parentNode.getBoundingClientRect() : Er(k(a, u, c).getClientRects(), n)).left || i.right || 0 == u) break;
                    c = u, u -= 1, h = "right"
                }
                l && s < 11 && (i = function(e, t) {
                    if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || ! function(e) {
                        if (null != Pe) return Pe;
                        var t = N(e, O("span", "x")),
                            r = t.getBoundingClientRect(),
                            n = k(t, 0, 1).getBoundingClientRect();
                        return Pe = Math.abs(r.left - n.left) > 1
                    }(e)) return t;
                    var r = screen.logicalXDPI / screen.deviceXDPI,
                        n = screen.logicalYDPI / screen.deviceYDPI;
                    return {
                        left: t.left * r,
                        right: t.right * r,
                        top: t.top * n,
                        bottom: t.bottom * n
                    }
                }(e.display.measure, i))
            } else {
                var d;
                u > 0 && (h = n = "right"), i = e.options.lineWrapping && (d = a.getClientRects()).length > 1 ? d["right" == n ? d.length - 1 : 0] : a.getBoundingClientRect()
            }
            if (l && s < 9 && !u && (!i || !i.left && !i.right)) {
                var p = a.parentNode.getClientRects()[0];
                i = p ? {
                    left: p.left,
                    right: p.left + tn(e.display),
                    top: p.top,
                    bottom: p.bottom
                } : Fr
            }
            for (var g = i.top - t.rect.top, v = i.bottom - t.rect.top, m = (g + v) / 2, y = t.view.measure.heights, b = 0; b < y.length - 1 && !(m < y[b]); b++);
            var w = b ? y[b - 1] : 0,
                x = y[b],
                C = {
                    left: ("right" == h ? i.right : i.left) - t.rect.left,
                    right: ("left" == h ? i.left : i.right) - t.rect.left,
                    top: w,
                    bottom: x
                };
            i.left || i.right || (C.bogus = !0);
            e.options.singleCursorHeightPerLine || (C.rtop = g, C.rbottom = v);
            return C
        }(e, t, r, n)).bogus || (t.cache[a] = o)), {
            left: o.left,
            right: o.right,
            top: i ? o.rtop : o.top,
            bottom: i ? o.rbottom : o.bottom
        }
    }

    var Hr, Fr = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    function Pr(e, t, r) {
        for (var n, i, o, l, s, a, u = 0; u < e.length; u += 3)
            if (s = e[u], a = e[u + 1], t < s ? (i = 0, o = 1, l = "left") : t < a ? o = (i = t - s) + 1 : (u == e.length - 3 || t == a && e[u + 3] > t) && (i = (o = a - s) - 1, t >= a && (l = "right")), null != i) {
                if (n = e[u + 2], s == a && r == (n.insertLeft ? "left" : "right") && (l = r), "left" == r && 0 == i)
                    for (; u && e[u - 2] == e[u - 3] && e[u - 1].insertLeft;) n = e[2 + (u -= 3)], l = "left";
                if ("right" == r && i == a - s)
                    for (; u < e.length - 3 && e[u + 3] == e[u + 4] && !e[u + 5].insertLeft;) n = e[(u += 3) + 2], l = "right";
                break
            }
        return {
            node: n,
            start: i,
            end: o,
            collapse: l,
            coverStart: s,
            coverEnd: a
        }
    }

    function Er(e, t) {
        var r = Fr;
        if ("left" == t)
            for (var n = 0; n < e.length && (r = e[n]).left == r.right; n++);
        else
            for (var i = e.length - 1; i >= 0 && (r = e[i]).left == r.right; i--);
        return r
    }

    function Ir(e) {
        if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest))
            for (var t = 0; t < e.rest.length; t++) e.measure.caches[t] = {}
    }

    function Rr(e) {
        e.display.externalMeasure = null, M(e.display.lineMeasure);
        for (var t = 0; t < e.display.view.length; t++) Ir(e.display.view[t])
    }

    function zr(e) {
        Rr(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null
    }

    function Br() {
        return c && v ? -(document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft)) : window.pageXOffset || (document.documentElement || document.body).scrollLeft
    }

    function Gr() {
        return c && v ? -(document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop)) : window.pageYOffset || (document.documentElement || document.body).scrollTop
    }

    function Ur(e) {
        var t = 0;
        if (e.widgets)
            for (var r = 0; r < e.widgets.length; ++r) e.widgets[r].above && (t += wr(e.widgets[r]));
        return t
    }

    function Vr(e, t, r, n, i) {
        if (!i) {
            var o = Ur(t);
            r.top += o, r.bottom += o
        }
        if ("line" == n) return r;
        n || (n = "local");
        var l = Vt(t);
        if ("local" == n ? l += Cr(e.display) : l -= e.display.viewOffset, "page" == n || "window" == n) {
            var s = e.display.lineSpace.getBoundingClientRect();
            l += s.top + ("window" == n ? 0 : Gr());
            var a = s.left + ("window" == n ? 0 : Br());
            r.left += a, r.right += a
        }
        return r.top += l, r.bottom += l, r
    }

    function Kr(e, t, r) {
        if ("div" == r) return t;
        var n = t.left,
            i = t.top;
        if ("page" == r) n -= Br(), i -= Gr();
        else if ("local" == r || !r) {
            var o = e.display.sizer.getBoundingClientRect();
            n += o.left, i += o.top
        }
        var l = e.display.lineSpace.getBoundingClientRect();
        return {
            left: n - l.left,
            top: i - l.top
        }
    }

    function jr(e, t, r, n, i) {
        return n || (n = Xe(e.doc, t.line)), Vr(e, n, Or(e, n, t.ch, i), r)
    }

    function Xr(e, t, r, n, i, o) {
        function l(t, l) {
            var s = Wr(e, i, t, l ? "right" : "left", o);
            return l ? s.left = s.right : s.right = s.left, Vr(e, n, s, r)
        }

        n = n || Xe(e.doc, t.line), i || (i = Dr(e, n));
        var s = ce(n, e.doc.direction),
            a = t.ch,
            u = t.sticky;
        if (a >= n.text.length ? (a = n.text.length, u = "before") : a <= 0 && (a = 0, u = "after"), !s) return l("before" == u ? a - 1 : a, "before" == u);

        function c(e, t, r) {
            var n = 1 == s[t].level;
            return l(r ? e - 1 : e, n != r)
        }

        var h = ae(s, a, u),
            f = se,
            d = c(a, h, "before" == u);
        return null != f && (d.other = c(a, f, "before" != u)), d
    }

    function Yr(e, t) {
        var r = 0;
        t = st(e.doc, t), e.options.lineWrapping || (r = tn(e.display) * t.ch);
        var n = Xe(e.doc, t.line),
            i = Vt(n) + Cr(e.display);
        return {
            left: r,
            right: r,
            top: i,
            bottom: i + n.height
        }
    }

    function _r(e, t, r, n, i) {
        var o = et(e, t, r);
        return o.xRel = i, n && (o.outside = n), o
    }

    function $r(e, t, r) {
        var n = e.doc;
        if ((r += e.display.viewOffset) < 0) return _r(n.first, 0, null, -1, -1);
        var i = Ze(n, r),
            o = n.first + n.size - 1;
        if (i > o) return _r(n.first + n.size - 1, Xe(n, o).text.length, null, 1, 1);
        t < 0 && (t = 0);
        for (var l = Xe(n, i);;) {
            var s = Jr(e, l, i, t, r),
                a = Et(l, s.ch + (s.xRel > 0 || s.outside > 0 ? 1 : 0));
            if (!a) return s;
            var u = a.find(1);
            if (u.line == i) return u;
            l = Xe(n, i = u.line)
        }
    }

    function qr(e, t, r, n) {
        n -= Ur(t);
        var i = t.text.length,
            o = le(function(t) {
                return Wr(e, r, t - 1).bottom <= n
            }, i, 0);
        return {
            begin: o,
            end: i = le(function(t) {
                return Wr(e, r, t).top > n
            }, o, i)
        }
    }

    function Zr(e, t, r, n) {
        return r || (r = Dr(e, t)), qr(e, t, r, Vr(e, t, Wr(e, r, n), "line").top)
    }

    function Qr(e, t, r, n) {
        return !(e.bottom <= r) && (e.top > r || (n ? e.left : e.right) > t)
    }

    function Jr(e, t, r, n, i) {
        i -= Vt(t);
        var o = Dr(e, t),
            l = Ur(t),
            s = 0,
            a = t.text.length,
            u = !0,
            c = ce(t, e.doc.direction);
        if (c) {
            var h = (e.options.lineWrapping ? function(e, t, r, n, i, o, l) {
                var s = qr(e, t, n, l),
                    a = s.begin,
                    u = s.end;
                /\s/.test(t.text.charAt(u - 1)) && u--;
                for (var c = null, h = null, f = 0; f < i.length; f++) {
                    var d = i[f];
                    if (!(d.from >= u || d.to <= a)) {
                        var p = 1 != d.level,
                            g = Wr(e, n, p ? Math.min(u, d.to) - 1 : Math.max(a, d.from)).right,
                            v = g < o ? o - g + 1e9 : g - o;
                        (!c || h > v) && (c = d, h = v)
                    }
                }
                c || (c = i[i.length - 1]);
                c.from < a && (c = {
                    from: a,
                    to: c.to,
                    level: c.level
                });
                c.to > u && (c = {
                    from: c.from,
                    to: u,
                    level: c.level
                });
                return c
            } : function(e, t, r, n, i, o, l) {
                var s = le(function(s) {
                        var a = i[s],
                            u = 1 != a.level;
                        return Qr(Xr(e, et(r, u ? a.to : a.from, u ? "before" : "after"), "line", t, n), o, l, !0)
                    }, 0, i.length - 1),
                    a = i[s];
                if (s > 0) {
                    var u = 1 != a.level,
                        c = Xr(e, et(r, u ? a.from : a.to, u ? "after" : "before"), "line", t, n);
                    Qr(c, o, l, !0) && c.top > l && (a = i[s - 1])
                }
                return a
            })(e, t, r, o, c, n, i);
            s = (u = 1 != h.level) ? h.from : h.to - 1, a = u ? h.to : h.from - 1
        }
        var f, d, p = null,
            g = null,
            v = le(function(t) {
                var r = Wr(e, o, t);
                return r.top += l, r.bottom += l, !!Qr(r, n, i, !1) && (r.top <= i && r.left <= n && (p = t, g = r), !0)
            }, s, a),
            m = !1;
        if (g) {
            var y = n - g.left < g.right - n,
                b = y == u;
            v = p + (b ? 0 : 1), d = b ? "after" : "before", f = y ? g.left : g.right
        } else {
            u || v != a && v != s || v++, d = 0 == v ? "after" : v == t.text.length ? "before" : Wr(e, o, v - (u ? 1 : 0)).bottom + l <= i == u ? "after" : "before";
            var w = Xr(e, et(r, v, d), "line", t, o);
            f = w.left, m = i < w.top ? -1 : i >= w.bottom ? 1 : 0
        }
        return _r(r, v = oe(t.text, v, 1), d, m, n - f)
    }

    function en(e) {
        if (null != e.cachedTextHeight) return e.cachedTextHeight;
        if (null == Hr) {
            Hr = O("pre", null, "CodeMirror-line-like");
            for (var t = 0; t < 49; ++t) Hr.appendChild(document.createTextNode("x")), Hr.appendChild(O("br"));
            Hr.appendChild(document.createTextNode("x"))
        }
        N(e.measure, Hr);
        var r = Hr.offsetHeight / 50;
        return r > 3 && (e.cachedTextHeight = r), M(e.measure), r || 1
    }

    function tn(e) {
        if (null != e.cachedCharWidth) return e.cachedCharWidth;
        var t = O("span", "xxxxxxxxxx"),
            r = O("pre", [t], "CodeMirror-line-like");
        N(e.measure, r);
        var n = t.getBoundingClientRect(),
            i = (n.right - n.left) / 10;
        return i > 2 && (e.cachedCharWidth = i), i || 10
    }

    function rn(e) {
        for (var t = e.display, r = {}, n = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, l = 0; o; o = o.nextSibling, ++l) {
            var s = e.display.gutterSpecs[l].className;
            r[s] = o.offsetLeft + o.clientLeft + i, n[s] = o.clientWidth
        }
        return {
            fixedPos: nn(t),
            gutterTotalWidth: t.gutters.offsetWidth,
            gutterLeft: r,
            gutterWidth: n,
            wrapperWidth: t.wrapper.clientWidth
        }
    }

    function nn(e) {
        return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left
    }

    function on(e) {
        var t = en(e.display),
            r = e.options.lineWrapping,
            n = r && Math.max(5, e.display.scroller.clientWidth / tn(e.display) - 3);
        return function(i) {
            if (Gt(e.doc, i)) return 0;
            var o = 0;
            if (i.widgets)
                for (var l = 0; l < i.widgets.length; l++) i.widgets[l].height && (o += i.widgets[l].height);
            return r ? o + (Math.ceil(i.text.length / n) || 1) * t : o + t
        }
    }

    function ln(e) {
        var t = e.doc,
            r = on(e);
        t.iter(function(e) {
            var t = r(e);
            t != e.height && $e(e, t)
        })
    }

    function sn(e, t, r, n) {
        var i = e.display;
        if (!r && "true" == Le(t).getAttribute("cm-not-content")) return null;
        var o, l, s = i.lineSpace.getBoundingClientRect();
        try {
            o = t.clientX - s.left, l = t.clientY - s.top
        } catch (e) {
            return null
        }
        var a, u = $r(e, o, l);
        if (n && u.xRel > 0 && (a = Xe(e.doc, u.line).text).length == u.ch) {
            var c = R(a, a.length, e.options.tabSize) - a.length;
            u = et(u.line, Math.max(0, Math.round((o - Lr(e.display).left) / tn(e.display)) - c))
        }
        return u
    }

    function an(e, t) {
        if (t >= e.display.viewTo) return null;
        if ((t -= e.display.viewFrom) < 0) return null;
        for (var r = e.display.view, n = 0; n < r.length; n++)
            if ((t -= r[n].size) < 0) return n
    }

    function un(e, t, r, n) {
        null == t && (t = e.doc.first), null == r && (r = e.doc.first + e.doc.size), n || (n = 0);
        var i = e.display;
        if (n && r < i.viewTo && (null == i.updateLineNumbers || i.updateLineNumbers > t) && (i.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= i.viewTo) Ct && zt(e.doc, t) < i.viewTo && hn(e);
        else if (r <= i.viewFrom) Ct && Bt(e.doc, r + n) > i.viewFrom ? hn(e) : (i.viewFrom += n, i.viewTo += n);
        else if (t <= i.viewFrom && r >= i.viewTo) hn(e);
        else if (t <= i.viewFrom) {
            var o = fn(e, r, r + n, 1);
            o ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += n) : hn(e)
        } else if (r >= i.viewTo) {
            var l = fn(e, t, t, -1);
            l ? (i.view = i.view.slice(0, l.index), i.viewTo = l.lineN) : hn(e)
        } else {
            var s = fn(e, t, t, -1),
                a = fn(e, r, r + n, 1);
            s && a ? (i.view = i.view.slice(0, s.index).concat(ir(e, s.lineN, a.lineN)).concat(i.view.slice(a.index)), i.viewTo += n) : hn(e)
        }
        var u = i.externalMeasured;
        u && (r < u.lineN ? u.lineN += n : t < u.lineN + u.size && (i.externalMeasured = null))
    }

    function cn(e, t, r) {
        e.curOp.viewChanged = !0;
        var n = e.display,
            i = e.display.externalMeasured;
        if (i && t >= i.lineN && t < i.lineN + i.size && (n.externalMeasured = null), !(t < n.viewFrom || t >= n.viewTo)) {
            var o = n.view[an(e, t)];
            if (null != o.node) {
                var l = o.changes || (o.changes = []); -
                    1 == B(l, r) && l.push(r)
            }
        }
    }

    function hn(e) {
        e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0
    }

    function fn(e, t, r, n) {
        var i, o = an(e, t),
            l = e.display.view;
        if (!Ct || r == e.doc.first + e.doc.size) return {
            index: o,
            lineN: r
        };
        for (var s = e.display.viewFrom, a = 0; a < o; a++) s += l[a].size;
        if (s != t) {
            if (n > 0) {
                if (o == l.length - 1) return null;
                i = s + l[o].size - t, o++
            } else i = s - t;
            t += i, r += i
        }
        for (; zt(e.doc, r) != r;) {
            if (o == (n < 0 ? 0 : l.length - 1)) return null;
            r += n * l[o - (n < 0 ? 1 : 0)].size, o += n
        }
        return {
            index: o,
            lineN: r
        }
    }

    function dn(e) {
        for (var t = e.display.view, r = 0, n = 0; n < t.length; n++) {
            var i = t[n];
            i.hidden || i.node && !i.changes || ++r
        }
        return r
    }

    function pn(e) {
        e.display.input.showSelection(e.display.input.prepareSelection())
    }

    function gn(e, t) {
        void 0 === t && (t = !0);
        for (var r = e.doc, n = {}, i = n.cursors = document.createDocumentFragment(), o = n.selection = document.createDocumentFragment(), l = 0; l < r.sel.ranges.length; l++)
            if (t || l != r.sel.primIndex) {
                var s = r.sel.ranges[l];
                if (!(s.from().line >= e.display.viewTo || s.to().line < e.display.viewFrom)) {
                    var a = s.empty();
                    (a || e.options.showCursorWhenSelecting) && vn(e, s.head, i), a || yn(e, s, o)
                }
            }
        return n
    }

    function vn(e, t, r) {
        var n = Xr(e, t, "div", null, null, !e.options.singleCursorHeightPerLine),
            i = r.appendChild(O("div", " ", "CodeMirror-cursor"));
        if (i.style.left = n.left + "px", i.style.top = n.top + "px", i.style.height = Math.max(0, n.bottom - n.top) * e.options.cursorHeight + "px", n.other) {
            var o = r.appendChild(O("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
            o.style.display = "", o.style.left = n.other.left + "px", o.style.top = n.other.top + "px", o.style.height = .85 * (n.other.bottom - n.other.top) + "px"
        }
    }

    function mn(e, t) {
        return e.top - t.top || e.left - t.left
    }

    function yn(e, t, r) {
        var n = e.display,
            i = e.doc,
            o = document.createDocumentFragment(),
            l = Lr(e.display),
            s = l.left,
            a = Math.max(n.sizerWidth, Tr(e) - n.sizer.offsetLeft) - l.right,
            u = "ltr" == i.direction;

        function c(e, t, r, n) {
            t < 0 && (t = 0), t = Math.round(t), n = Math.round(n), o.appendChild(O("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px;\n                             top: " + t + "px; width: " + (null == r ? a - e : r) + "px;\n                             height: " + (n - t) + "px"))
        }

        function h(t, r, n) {
            var o, l, h = Xe(i, t),
                f = h.text.length;

            function d(r, n) {
                return jr(e, et(t, r), "div", h, n)
            }

            function p(t, r, n) {
                var i = Zr(e, h, null, t),
                    o = "ltr" == r == ("after" == n) ? "left" : "right";
                return d("after" == n ? i.begin : i.end - (/\s/.test(h.text.charAt(i.end - 1)) ? 2 : 1), o)[o]
            }

            var g = ce(h, i.direction);
            return function(e, t, r, n) {
                if (!e) return n(t, r, "ltr", 0);
                for (var i = !1, o = 0; o < e.length; ++o) {
                    var l = e[o];
                    (l.from < r && l.to > t || t == r && l.to == t) && (n(Math.max(l.from, t), Math.min(l.to, r), 1 == l.level ? "rtl" : "ltr", o), i = !0)
                }
                i || n(t, r, "ltr")
            }(g, r || 0, null == n ? f : n, function(e, t, i, h) {
                var v = "ltr" == i,
                    m = d(e, v ? "left" : "right"),
                    y = d(t - 1, v ? "right" : "left"),
                    b = null == r && 0 == e,
                    w = null == n && t == f,
                    x = 0 == h,
                    C = !g || h == g.length - 1;
                if (y.top - m.top <= 3) {
                    var S = (u ? w : b) && C,
                        L = (u ? b : w) && x ? s : (v ? m : y).left,
                        k = S ? a : (v ? y : m).right;
                    c(L, m.top, k - L, m.bottom)
                } else {
                    var T, M, N, O;
                    v ? (T = u && b && x ? s : m.left, M = u ? a : p(e, i, "before"), N = u ? s : p(t, i, "after"), O = u && w && C ? a : y.right) : (T = u ? p(e, i, "before") : s, M = !u && b && x ? a : m.right, N = !u && w && C ? s : y.left, O = u ? p(t, i, "after") : a), c(T, m.top, M - T, m.bottom), m.bottom < y.top && c(s, m.bottom, null, y.top), c(N, y.top, O - N, y.bottom)
                }
                (!o || mn(m, o) < 0) && (o = m), mn(y, o) < 0 && (o = y), (!l || mn(m, l) < 0) && (l = m), mn(y, l) < 0 && (l = y)
            }), {
                start: o,
                end: l
            }
        }

        var f = t.from(),
            d = t.to();
        if (f.line == d.line) h(f.line, f.ch, d.ch);
        else {
            var p = Xe(i, f.line),
                g = Xe(i, d.line),
                v = Rt(p) == Rt(g),
                m = h(f.line, f.ch, v ? p.text.length + 1 : null).end,
                y = h(d.line, v ? 0 : null, d.ch).start;
            v && (m.top < y.top - 2 ? (c(m.right, m.top, null, m.bottom), c(s, y.top, y.left, y.bottom)) : c(m.right, m.top, y.left - m.right, m.bottom)), m.bottom < y.top && c(s, m.bottom, null, y.top)
        }
        r.appendChild(o)
    }

    function bn(e) {
        if (e.state.focused) {
            var t = e.display;
            clearInterval(t.blinker);
            var r = !0;
            t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function() {
                e.hasFocus() || Sn(e), t.cursorDiv.style.visibility = (r = !r) ? "" : "hidden"
            }, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden")
        }
    }

    function wn(e) {
        e.hasFocus() || (e.display.input.focus(), e.state.focused || Cn(e))
    }

    function xn(e) {
        e.state.delayingBlurEvent = !0, setTimeout(function() {
            e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, e.state.focused && Sn(e))
        }, 100)
    }

    function Cn(e, t) {
        e.state.delayingBlurEvent && !e.state.draggingText && (e.state.delayingBlurEvent = !1), "nocursor" != e.options.readOnly && (e.state.focused || (ge(e, "focus", e, t), e.state.focused = !0, H(e.display.wrapper, "CodeMirror-focused"), e.curOp || e.display.selForContextMenu == e.doc.sel || (e.display.input.reset(), a && setTimeout(function() {
            return e.display.input.reset(!0)
        }, 20)), e.display.input.receivedFocus()), bn(e))
    }

    function Sn(e, t) {
        e.state.delayingBlurEvent || (e.state.focused && (ge(e, "blur", e, t), e.state.focused = !1, T(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout(function() {
            e.state.focused || (e.display.shift = !1)
        }, 150))
    }

    function Ln(e) {
        for (var t = e.display, r = t.lineDiv.offsetTop, n = 0; n < t.view.length; n++) {
            var i = t.view[n],
                o = e.options.lineWrapping,
                a = void 0,
                u = 0;
            if (!i.hidden) {
                if (l && s < 8) {
                    var c = i.node.offsetTop + i.node.offsetHeight;
                    a = c - r, r = c
                } else {
                    var h = i.node.getBoundingClientRect();
                    a = h.bottom - h.top, !o && i.text.firstChild && (u = i.text.firstChild.getBoundingClientRect().right - h.left - 1)
                }
                var f = i.line.height - a;
                if ((f > .005 || f < -.005) && ($e(i.line, a), kn(i.line), i.rest))
                    for (var d = 0; d < i.rest.length; d++) kn(i.rest[d]);
                if (u > e.display.sizerWidth) {
                    var p = Math.ceil(u / tn(e.display));
                    p > e.display.maxLineLength && (e.display.maxLineLength = p, e.display.maxLine = i.line, e.display.maxLineChanged = !0)
                }
            }
        }
    }

    function kn(e) {
        if (e.widgets)
            for (var t = 0; t < e.widgets.length; ++t) {
                var r = e.widgets[t],
                    n = r.node.parentNode;
                n && (r.height = n.offsetHeight)
            }
    }

    function Tn(e, t, r) {
        var n = r && null != r.top ? Math.max(0, r.top) : e.scroller.scrollTop;
        n = Math.floor(n - Cr(e));
        var i = r && null != r.bottom ? r.bottom : n + e.wrapper.clientHeight,
            o = Ze(t, n),
            l = Ze(t, i);
        if (r && r.ensure) {
            var s = r.ensure.from.line,
                a = r.ensure.to.line;
            s < o ? (o = s, l = Ze(t, Vt(Xe(t, s)) + e.wrapper.clientHeight)) : Math.min(a, t.lastLine()) >= l && (o = Ze(t, Vt(Xe(t, a)) - e.wrapper.clientHeight), l = a)
        }
        return {
            from: o,
            to: Math.max(l, o + 1)
        }
    }

    function Mn(e, t) {
        var r = e.display,
            n = en(e.display);
        t.top < 0 && (t.top = 0);
        var i = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop : r.scroller.scrollTop,
            o = Mr(e),
            l = {};
        t.bottom - t.top > o && (t.bottom = t.top + o);
        var s = e.doc.height + Sr(r),
            a = t.top < n,
            u = t.bottom > s - n;
        if (t.top < i) l.scrollTop = a ? 0 : t.top;
        else if (t.bottom > i + o) {
            var c = Math.min(t.top, (u ? s : t.bottom) - o);
            c != i && (l.scrollTop = c)
        }
        var h = e.options.fixedGutter ? 0 : r.gutters.offsetWidth,
            f = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : r.scroller.scrollLeft - h,
            d = Tr(e) - r.gutters.offsetWidth,
            p = t.right - t.left > d;
        return p && (t.right = t.left + d), t.left < 10 ? l.scrollLeft = 0 : t.left < f ? l.scrollLeft = Math.max(0, t.left + h - (p ? 0 : 10)) : t.right > d + f - 3 && (l.scrollLeft = t.right + (p ? 0 : 10) - d), l
    }

    function Nn(e, t) {
        null != t && (Dn(e), e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + t)
    }

    function On(e) {
        Dn(e);
        var t = e.getCursor();
        e.curOp.scrollToPos = {
            from: t,
            to: t,
            margin: e.options.cursorScrollMargin
        }
    }

    function An(e, t, r) {
        null == t && null == r || Dn(e), null != t && (e.curOp.scrollLeft = t), null != r && (e.curOp.scrollTop = r)
    }

    function Dn(e) {
        var t = e.curOp.scrollToPos;
        t && (e.curOp.scrollToPos = null, Wn(e, Yr(e, t.from), Yr(e, t.to), t.margin))
    }

    function Wn(e, t, r, n) {
        var i = Mn(e, {
            left: Math.min(t.left, r.left),
            top: Math.min(t.top, r.top) - n,
            right: Math.max(t.right, r.right),
            bottom: Math.max(t.bottom, r.bottom) + n
        });
        An(e, i.scrollLeft, i.scrollTop)
    }

    function Hn(e, t) {
        Math.abs(e.doc.scrollTop - t) < 2 || (r || oi(e, {
            top: t
        }), Fn(e, t, !0), r && oi(e), ei(e, 100))
    }

    function Fn(e, t, r) {
        t = Math.max(0, Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, t)), (e.display.scroller.scrollTop != t || r) && (e.doc.scrollTop = t, e.display.scrollbars.setScrollTop(t), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t))
    }

    function Pn(e, t, r, n) {
        t = Math.max(0, Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth)), (r ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) && !n || (e.doc.scrollLeft = t, ai(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t))
    }

    function En(e) {
        var t = e.display,
            r = t.gutters.offsetWidth,
            n = Math.round(e.doc.height + Sr(e.display));
        return {
            clientHeight: t.scroller.clientHeight,
            viewHeight: t.wrapper.clientHeight,
            scrollWidth: t.scroller.scrollWidth,
            clientWidth: t.scroller.clientWidth,
            viewWidth: t.wrapper.clientWidth,
            barLeft: e.options.fixedGutter ? r : 0,
            docHeight: n,
            scrollHeight: n + kr(e) + t.barHeight,
            nativeBarWidth: t.nativeBarWidth,
            gutterWidth: r
        }
    }

    var In = function(e, t, r) {
        this.cm = r;
        var n = this.vert = O("div", [O("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"),
            i = this.horiz = O("div", [O("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
        n.tabIndex = i.tabIndex = -1, e(n), e(i), fe(n, "scroll", function() {
            n.clientHeight && t(n.scrollTop, "vertical")
        }), fe(i, "scroll", function() {
            i.clientWidth && t(i.scrollLeft, "horizontal")
        }), this.checkedZeroWidth = !1, l && s < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px")
    };
    In.prototype.update = function(e) {
        var t = e.scrollWidth > e.clientWidth + 1,
            r = e.scrollHeight > e.clientHeight + 1,
            n = e.nativeBarWidth;
        if (r) {
            this.vert.style.display = "block", this.vert.style.bottom = t ? n + "px" : "0";
            var i = e.viewHeight - (t ? n : 0);
            this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px"
        } else this.vert.style.display = "", this.vert.firstChild.style.height = "0";
        if (t) {
            this.horiz.style.display = "block", this.horiz.style.right = r ? n + "px" : "0", this.horiz.style.left = e.barLeft + "px";
            var o = e.viewWidth - e.barLeft - (r ? n : 0);
            this.horiz.firstChild.style.width = Math.max(0, e.scrollWidth - e.clientWidth + o) + "px"
        } else this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
        return !this.checkedZeroWidth && e.clientHeight > 0 && (0 == n && this.zeroWidthHack(), this.checkedZeroWidth = !0), {
            right: r ? n : 0,
            bottom: t ? n : 0
        }
    }, In.prototype.setScrollLeft = function(e) {
        this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz")
    }, In.prototype.setScrollTop = function(e) {
        this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert")
    }, In.prototype.zeroWidthHack = function() {
        var e = y && !d ? "12px" : "18px";
        this.horiz.style.height = this.vert.style.width = e, this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none", this.disableHoriz = new z, this.disableVert = new z
    }, In.prototype.enableZeroWidthBar = function(e, t, r) {
        e.style.pointerEvents = "auto", t.set(1e3, function n() {
            var i = e.getBoundingClientRect();
            ("vert" == r ? document.elementFromPoint(i.right - 1, (i.top + i.bottom) / 2) : document.elementFromPoint((i.right + i.left) / 2, i.bottom - 1)) != e ? e.style.pointerEvents = "none" : t.set(1e3, n)
        })
    }, In.prototype.clear = function() {
        var e = this.horiz.parentNode;
        e.removeChild(this.horiz), e.removeChild(this.vert)
    };
    var Rn = function() {};

    function zn(e, t) {
        t || (t = En(e));
        var r = e.display.barWidth,
            n = e.display.barHeight;
        Bn(e, t);
        for (var i = 0; i < 4 && r != e.display.barWidth || n != e.display.barHeight; i++) r != e.display.barWidth && e.options.lineWrapping && Ln(e), Bn(e, En(e)), r = e.display.barWidth, n = e.display.barHeight
    }

    function Bn(e, t) {
        var r = e.display,
            n = r.scrollbars.update(t);
        r.sizer.style.paddingRight = (r.barWidth = n.right) + "px", r.sizer.style.paddingBottom = (r.barHeight = n.bottom) + "px", r.heightForcer.style.borderBottom = n.bottom + "px solid transparent", n.right && n.bottom ? (r.scrollbarFiller.style.display = "block", r.scrollbarFiller.style.height = n.bottom + "px", r.scrollbarFiller.style.width = n.right + "px") : r.scrollbarFiller.style.display = "", n.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (r.gutterFiller.style.display = "block", r.gutterFiller.style.height = n.bottom + "px", r.gutterFiller.style.width = t.gutterWidth + "px") : r.gutterFiller.style.display = ""
    }

    Rn.prototype.update = function() {
        return {
            bottom: 0,
            right: 0
        }
    }, Rn.prototype.setScrollLeft = function() {}, Rn.prototype.setScrollTop = function() {}, Rn.prototype.clear = function() {};
    var Gn = {
        native: In,
        null: Rn
    };

    function Un(e) {
        e.display.scrollbars && (e.display.scrollbars.clear(), e.display.scrollbars.addClass && T(e.display.wrapper, e.display.scrollbars.addClass)), e.display.scrollbars = new Gn[e.options.scrollbarStyle](function(t) {
            e.display.wrapper.insertBefore(t, e.display.scrollbarFiller), fe(t, "mousedown", function() {
                e.state.focused && setTimeout(function() {
                    return e.display.input.focus()
                }, 0)
            }), t.setAttribute("cm-not-content", "true")
        }, function(t, r) {
            "horizontal" == r ? Pn(e, t) : Hn(e, t)
        }, e), e.display.scrollbars.addClass && H(e.display.wrapper, e.display.scrollbars.addClass)
    }

    var Vn = 0;

    function Kn(e) {
        var t;
        e.curOp = {
            cm: e,
            viewChanged: !1,
            startHeight: e.doc.height,
            forceUpdate: !1,
            updateInput: 0,
            typing: !1,
            changeObjs: null,
            cursorActivityHandlers: null,
            cursorActivityCalled: 0,
            selectionChanged: !1,
            updateMaxLine: !1,
            scrollLeft: null,
            scrollTop: null,
            scrollToPos: null,
            focus: !1,
            id: ++Vn
        }, t = e.curOp, or ? or.ops.push(t) : t.ownsGroup = or = {
            ops: [t],
            delayedCallbacks: []
        }
    }

    function jn(e) {
        var t = e.curOp;
        t && function(e, t) {
            var r = e.ownsGroup;
            if (r) try {
                ! function(e) {
                    var t = e.delayedCallbacks,
                        r = 0;
                    do {
                        for (; r < t.length; r++) t[r].call(null);
                        for (var n = 0; n < e.ops.length; n++) {
                            var i = e.ops[n];
                            if (i.cursorActivityHandlers)
                                for (; i.cursorActivityCalled < i.cursorActivityHandlers.length;) i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm)
                        }
                    } while (r < t.length)
                }(r)
            } finally {
                or = null, t(r)
            }
        }(t, function(e) {
            for (var t = 0; t < e.ops.length; t++) e.ops[t].cm.curOp = null;
            ! function(e) {
                for (var t = e.ops, r = 0; r < t.length; r++) Xn(t[r]);
                for (var n = 0; n < t.length; n++)(i = t[n]).updatedDisplay = i.mustUpdate && ni(i.cm, i.update);
                var i;
                for (var o = 0; o < t.length; o++) Yn(t[o]);
                for (var l = 0; l < t.length; l++) _n(t[l]);
                for (var s = 0; s < t.length; s++) $n(t[s])
            }(e)
        })
    }

    function Xn(e) {
        var t = e.cm,
            r = t.display;
        ! function(e) {
            var t = e.display;
            !t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = kr(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = kr(e) + "px", t.scrollbarsClipped = !0)
        }(t), e.updateMaxLine && jt(t), e.mustUpdate = e.viewChanged || e.forceUpdate || null != e.scrollTop || e.scrollToPos && (e.scrollToPos.from.line < r.viewFrom || e.scrollToPos.to.line >= r.viewTo) || r.maxLineChanged && t.options.lineWrapping, e.update = e.mustUpdate && new ri(t, e.mustUpdate && {
            top: e.scrollTop,
            ensure: e.scrollToPos
        }, e.forceUpdate)
    }

    function Yn(e) {
        var t = e.cm,
            r = t.display;
        e.updatedDisplay && Ln(t), e.barMeasure = En(t), r.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = Or(t, r.maxLine, r.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(r.scroller.clientWidth, r.sizer.offsetLeft + e.adjustWidthTo + kr(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, r.sizer.offsetLeft + e.adjustWidthTo - Tr(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = r.input.prepareSelection())
    }

    function _n(e) {
        var t = e.cm;
        null != e.adjustWidthTo && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && Pn(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1);
        var r = e.focus && e.focus == W();
        e.preparedSelection && t.display.input.showSelection(e.preparedSelection, r), (e.updatedDisplay || e.startHeight != t.doc.height) && zn(t, e.barMeasure), e.updatedDisplay && si(t, e.barMeasure), e.selectionChanged && bn(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), r && wn(e.cm)
    }

    function $n(e) {
        var t = e.cm,
            r = t.display,
            n = t.doc;
        (e.updatedDisplay && ii(t, e.update), null == r.wheelStartX || null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos || (r.wheelStartX = r.wheelStartY = null), null != e.scrollTop && Fn(t, e.scrollTop, e.forceScroll), null != e.scrollLeft && Pn(t, e.scrollLeft, !0, !0), e.scrollToPos) && function(e, t) {
            if (!ve(e, "scrollCursorIntoView")) {
                var r = e.display,
                    n = r.sizer.getBoundingClientRect(),
                    i = null;
                if (t.top + n.top < 0 ? i = !0 : t.bottom + n.top > (window.innerHeight || document.documentElement.clientHeight) && (i = !1), null != i && !p) {
                    var o = O("div", "​", null, "position: absolute;\n                         top: " + (t.top - r.viewOffset - Cr(e.display)) + "px;\n                         height: " + (t.bottom - t.top + kr(e) + r.barHeight) + "px;\n                         left: " + t.left + "px; width: " + Math.max(2, t.right - t.left) + "px;");
                    e.display.lineSpace.appendChild(o), o.scrollIntoView(i), e.display.lineSpace.removeChild(o)
                }
            }
        }(t, function(e, t, r, n) {
            var i;
            null == n && (n = 0), e.options.lineWrapping || t != r || (r = "before" == (t = t.ch ? et(t.line, "before" == t.sticky ? t.ch - 1 : t.ch, "after") : t).sticky ? et(t.line, t.ch + 1, "before") : t);
            for (var o = 0; o < 5; o++) {
                var l = !1,
                    s = Xr(e, t),
                    a = r && r != t ? Xr(e, r) : s,
                    u = Mn(e, i = {
                        left: Math.min(s.left, a.left),
                        top: Math.min(s.top, a.top) - n,
                        right: Math.max(s.left, a.left),
                        bottom: Math.max(s.bottom, a.bottom) + n
                    }),
                    c = e.doc.scrollTop,
                    h = e.doc.scrollLeft;
                if (null != u.scrollTop && (Hn(e, u.scrollTop), Math.abs(e.doc.scrollTop - c) > 1 && (l = !0)), null != u.scrollLeft && (Pn(e, u.scrollLeft), Math.abs(e.doc.scrollLeft - h) > 1 && (l = !0)), !l) break
            }
            return i
        }(t, st(n, e.scrollToPos.from), st(n, e.scrollToPos.to), e.scrollToPos.margin));
        var i = e.maybeHiddenMarkers,
            o = e.maybeUnhiddenMarkers;
        if (i)
            for (var l = 0; l < i.length; ++l) i[l].lines.length || ge(i[l], "hide");
        if (o)
            for (var s = 0; s < o.length; ++s) o[s].lines.length && ge(o[s], "unhide");
        r.wrapper.offsetHeight && (n.scrollTop = t.display.scroller.scrollTop), e.changeObjs && ge(t, "changes", t, e.changeObjs), e.update && e.update.finish()
    }

    function qn(e, t) {
        if (e.curOp) return t();
        Kn(e);
        try {
            return t()
        } finally {
            jn(e)
        }
    }

    function Zn(e, t) {
        return function() {
            if (e.curOp) return t.apply(e, arguments);
            Kn(e);
            try {
                return t.apply(e, arguments)
            } finally {
                jn(e)
            }
        }
    }

    function Qn(e) {
        return function() {
            if (this.curOp) return e.apply(this, arguments);
            Kn(this);
            try {
                return e.apply(this, arguments)
            } finally {
                jn(this)
            }
        }
    }

    function Jn(e) {
        return function() {
            var t = this.cm;
            if (!t || t.curOp) return e.apply(this, arguments);
            Kn(t);
            try {
                return e.apply(this, arguments)
            } finally {
                jn(t)
            }
        }
    }

    function ei(e, t) {
        e.doc.highlightFrontier < e.display.viewTo && e.state.highlight.set(t, E(ti, e))
    }

    function ti(e) {
        var t = e.doc;
        if (!(t.highlightFrontier >= e.display.viewTo)) {
            var r = +new Date + e.options.workTime,
                n = dt(e, t.highlightFrontier),
                i = [];
            t.iter(n.line, Math.min(t.first + t.size, e.display.viewTo + 500), function(o) {
                if (n.line >= e.display.viewFrom) {
                    var l = o.styles,
                        s = o.text.length > e.options.maxHighlightLength ? Ue(t.mode, n.state) : null,
                        a = ht(e, o, n, !0);
                    s && (n.state = s), o.styles = a.styles;
                    var u = o.styleClasses,
                        c = a.classes;
                    c ? o.styleClasses = c : u && (o.styleClasses = null);
                    for (var h = !l || l.length != o.styles.length || u != c && (!u || !c || u.bgClass != c.bgClass || u.textClass != c.textClass), f = 0; !h && f < l.length; ++f) h = l[f] != o.styles[f];
                    h && i.push(n.line), o.stateAfter = n.save(), n.nextLine()
                } else o.text.length <= e.options.maxHighlightLength && pt(e, o.text, n), o.stateAfter = n.line % 5 == 0 ? n.save() : null, n.nextLine();
                if (+new Date > r) return ei(e, e.options.workDelay), !0
            }), t.highlightFrontier = n.line, t.modeFrontier = Math.max(t.modeFrontier, n.line), i.length && qn(e, function() {
                for (var t = 0; t < i.length; t++) cn(e, i[t], "text")
            })
        }
    }

    var ri = function(e, t, r) {
        var n = e.display;
        this.viewport = t, this.visible = Tn(n, e.doc, t), this.editorIsHidden = !n.wrapper.offsetWidth, this.wrapperHeight = n.wrapper.clientHeight, this.wrapperWidth = n.wrapper.clientWidth, this.oldDisplayWidth = Tr(e), this.force = r, this.dims = rn(e), this.events = []
    };

    function ni(e, t) {
        var r = e.display,
            n = e.doc;
        if (t.editorIsHidden) return hn(e), !1;
        if (!t.force && t.visible.from >= r.viewFrom && t.visible.to <= r.viewTo && (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo) && r.renderedView == r.view && 0 == dn(e)) return !1;
        ui(e) && (hn(e), t.dims = rn(e));
        var i = n.first + n.size,
            o = Math.max(t.visible.from - e.options.viewportMargin, n.first),
            l = Math.min(i, t.visible.to + e.options.viewportMargin);
        r.viewFrom < o && o - r.viewFrom < 20 && (o = Math.max(n.first, r.viewFrom)), r.viewTo > l && r.viewTo - l < 20 && (l = Math.min(i, r.viewTo)), Ct && (o = zt(e.doc, o), l = Bt(e.doc, l));
        var s = o != r.viewFrom || l != r.viewTo || r.lastWrapHeight != t.wrapperHeight || r.lastWrapWidth != t.wrapperWidth;
        ! function(e, t, r) {
            var n = e.display;
            0 == n.view.length || t >= n.viewTo || r <= n.viewFrom ? (n.view = ir(e, t, r), n.viewFrom = t) : (n.viewFrom > t ? n.view = ir(e, t, n.viewFrom).concat(n.view) : n.viewFrom < t && (n.view = n.view.slice(an(e, t))), n.viewFrom = t, n.viewTo < r ? n.view = n.view.concat(ir(e, n.viewTo, r)) : n.viewTo > r && (n.view = n.view.slice(0, an(e, r)))), n.viewTo = r
        }(e, o, l), r.viewOffset = Vt(Xe(e.doc, r.viewFrom)), e.display.mover.style.top = r.viewOffset + "px";
        var u = dn(e);
        if (!s && 0 == u && !t.force && r.renderedView == r.view && (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo)) return !1;
        var c = function(e) {
            if (e.hasFocus()) return null;
            var t = W();
            if (!t || !D(e.display.lineDiv, t)) return null;
            var r = {
                activeElt: t
            };
            if (window.getSelection) {
                var n = window.getSelection();
                n.anchorNode && n.extend && D(e.display.lineDiv, n.anchorNode) && (r.anchorNode = n.anchorNode, r.anchorOffset = n.anchorOffset, r.focusNode = n.focusNode, r.focusOffset = n.focusOffset)
            }
            return r
        }(e);
        return u > 4 && (r.lineDiv.style.display = "none"),
            function(e, t, r) {
                var n = e.display,
                    i = e.options.lineNumbers,
                    o = n.lineDiv,
                    l = o.firstChild;

                function s(t) {
                    var r = t.nextSibling;
                    return a && y && e.display.currentWheelTarget == t ? t.style.display = "none" : t.parentNode.removeChild(t), r
                }

                for (var u = n.view, c = n.viewFrom, h = 0; h < u.length; h++) {
                    var f = u[h];
                    if (f.hidden);
                    else if (f.node && f.node.parentNode == o) {
                        for (; l != f.node;) l = s(l);
                        var d = i && null != t && t <= c && f.lineNumber;
                        f.changes && (B(f.changes, "gutter") > -1 && (d = !1), ur(e, f, c, r)), d && (M(f.lineNumber), f.lineNumber.appendChild(document.createTextNode(Je(e.options, c)))), l = f.node.nextSibling
                    } else {
                        var p = vr(e, f, c, r);
                        o.insertBefore(p, l)
                    }
                    c += f.size
                }
                for (; l;) l = s(l)
            }(e, r.updateLineNumbers, t.dims), u > 4 && (r.lineDiv.style.display = ""), r.renderedView = r.view,
            function(e) {
                if (e && e.activeElt && e.activeElt != W() && (e.activeElt.focus(), !/^(INPUT|TEXTAREA)$/.test(e.activeElt.nodeName) && e.anchorNode && D(document.body, e.anchorNode) && D(document.body, e.focusNode))) {
                    var t = window.getSelection(),
                        r = document.createRange();
                    r.setEnd(e.anchorNode, e.anchorOffset), r.collapse(!1), t.removeAllRanges(), t.addRange(r), t.extend(e.focusNode, e.focusOffset)
                }
            }(c), M(r.cursorDiv), M(r.selectionDiv), r.gutters.style.height = r.sizer.style.minHeight = 0, s && (r.lastWrapHeight = t.wrapperHeight, r.lastWrapWidth = t.wrapperWidth, ei(e, 400)), r.updateLineNumbers = null, !0
    }

    function ii(e, t) {
        for (var r = t.viewport, n = !0;; n = !1) {
            if (n && e.options.lineWrapping && t.oldDisplayWidth != Tr(e)) n && (t.visible = Tn(e.display, e.doc, r));
            else if (r && null != r.top && (r = {
                top: Math.min(e.doc.height + Sr(e.display) - Mr(e), r.top)
            }), t.visible = Tn(e.display, e.doc, r), t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo) break;
            if (!ni(e, t)) break;
            Ln(e);
            var i = En(e);
            pn(e), zn(e, i), si(e, i), t.force = !1
        }
        t.signal(e, "update", e), e.display.viewFrom == e.display.reportedViewFrom && e.display.viewTo == e.display.reportedViewTo || (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo)
    }

    function oi(e, t) {
        var r = new ri(e, t);
        if (ni(e, r)) {
            Ln(e), ii(e, r);
            var n = En(e);
            pn(e), zn(e, n), si(e, n), r.finish()
        }
    }

    function li(e) {
        var t = e.gutters.offsetWidth;
        e.sizer.style.marginLeft = t + "px"
    }

    function si(e, t) {
        e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = t.docHeight + e.display.barHeight + kr(e) + "px"
    }

    function ai(e) {
        var t = e.display,
            r = t.view;
        if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
            for (var n = nn(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = n + "px", l = 0; l < r.length; l++)
                if (!r[l].hidden) {
                    e.options.fixedGutter && (r[l].gutter && (r[l].gutter.style.left = o), r[l].gutterBackground && (r[l].gutterBackground.style.left = o));
                    var s = r[l].alignable;
                    if (s)
                        for (var a = 0; a < s.length; a++) s[a].style.left = o
                }
            e.options.fixedGutter && (t.gutters.style.left = n + i + "px")
        }
    }

    function ui(e) {
        if (!e.options.lineNumbers) return !1;
        var t = e.doc,
            r = Je(e.options, t.first + t.size - 1),
            n = e.display;
        if (r.length != n.lineNumChars) {
            var i = n.measure.appendChild(O("div", [O("div", r)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
                o = i.firstChild.offsetWidth,
                l = i.offsetWidth - o;
            return n.lineGutter.style.width = "", n.lineNumInnerWidth = Math.max(o, n.lineGutter.offsetWidth - l) + 1, n.lineNumWidth = n.lineNumInnerWidth + l, n.lineNumChars = n.lineNumInnerWidth ? r.length : -1, n.lineGutter.style.width = n.lineNumWidth + "px", li(e.display), !0
        }
        return !1
    }

    function ci(e, t) {
        for (var r = [], n = !1, i = 0; i < e.length; i++) {
            var o = e[i],
                l = null;
            if ("string" != typeof o && (l = o.style, o = o.className), "CodeMirror-linenumbers" == o) {
                if (!t) continue;
                n = !0
            }
            r.push({
                className: o,
                style: l
            })
        }
        return t && !n && r.push({
            className: "CodeMirror-linenumbers",
            style: null
        }), r
    }

    function hi(e) {
        var t = e.gutters,
            r = e.gutterSpecs;
        M(t), e.lineGutter = null;
        for (var n = 0; n < r.length; ++n) {
            var i = r[n],
                o = i.className,
                l = i.style,
                s = t.appendChild(O("div", null, "CodeMirror-gutter " + o));
            l && (s.style.cssText = l), "CodeMirror-linenumbers" == o && (e.lineGutter = s, s.style.width = (e.lineNumWidth || 1) + "px")
        }
        t.style.display = r.length ? "" : "none", li(e)
    }

    function fi(e) {
        hi(e.display), un(e), ai(e)
    }

    ri.prototype.signal = function(e, t) {
        ye(e, t) && this.events.push(arguments)
    }, ri.prototype.finish = function() {
        for (var e = 0; e < this.events.length; e++) ge.apply(null, this.events[e])
    };
    var di = 0,
        pi = null;

    function gi(e) {
        var t = e.wheelDeltaX,
            r = e.wheelDeltaY;
        return null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), null == r && e.detail && e.axis == e.VERTICAL_AXIS ? r = e.detail : null == r && (r = e.wheelDelta), {
            x: t,
            y: r
        }
    }

    function vi(e) {
        var t = gi(e);
        return t.x *= pi, t.y *= pi, t
    }

    function mi(e, t) {
        var n = gi(t),
            i = n.x,
            o = n.y,
            l = e.display,
            s = l.scroller,
            u = s.scrollWidth > s.clientWidth,
            c = s.scrollHeight > s.clientHeight;
        if (i && u || o && c) {
            if (o && y && a) e: for (var f = t.target, d = l.view; f != s; f = f.parentNode)
                for (var p = 0; p < d.length; p++)
                    if (d[p].node == f) {
                        e.display.currentWheelTarget = f;
                        break e
                    }
            if (i && !r && !h && null != pi) return o && c && Hn(e, Math.max(0, s.scrollTop + o * pi)), Pn(e, Math.max(0, s.scrollLeft + i * pi)), (!o || o && c) && we(t), void(l.wheelStartX = null);
            if (o && null != pi) {
                var g = o * pi,
                    v = e.doc.scrollTop,
                    m = v + l.wrapper.clientHeight;
                g < 0 ? v = Math.max(0, v + g - 50) : m = Math.min(e.doc.height, m + g + 50), oi(e, {
                    top: v,
                    bottom: m
                })
            }
            di < 20 && (null == l.wheelStartX ? (l.wheelStartX = s.scrollLeft, l.wheelStartY = s.scrollTop, l.wheelDX = i, l.wheelDY = o, setTimeout(function() {
                if (null != l.wheelStartX) {
                    var e = s.scrollLeft - l.wheelStartX,
                        t = s.scrollTop - l.wheelStartY,
                        r = t && l.wheelDY && t / l.wheelDY || e && l.wheelDX && e / l.wheelDX;
                    l.wheelStartX = l.wheelStartY = null, r && (pi = (pi * di + r) / (di + 1), ++di)
                }
            }, 200)) : (l.wheelDX += i, l.wheelDY += o))
        }
    }

    l ? pi = -.53 : r ? pi = 15 : c ? pi = -.7 : f && (pi = -1 / 3);
    var yi = function(e, t) {
        this.ranges = e, this.primIndex = t
    };
    yi.prototype.primary = function() {
        return this.ranges[this.primIndex]
    }, yi.prototype.equals = function(e) {
        if (e == this) return !0;
        if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length) return !1;
        for (var t = 0; t < this.ranges.length; t++) {
            var r = this.ranges[t],
                n = e.ranges[t];
            if (!rt(r.anchor, n.anchor) || !rt(r.head, n.head)) return !1
        }
        return !0
    }, yi.prototype.deepCopy = function() {
        for (var e = [], t = 0; t < this.ranges.length; t++) e[t] = new bi(nt(this.ranges[t].anchor), nt(this.ranges[t].head));
        return new yi(e, this.primIndex)
    }, yi.prototype.somethingSelected = function() {
        for (var e = 0; e < this.ranges.length; e++)
            if (!this.ranges[e].empty()) return !0;
        return !1
    }, yi.prototype.contains = function(e, t) {
        t || (t = e);
        for (var r = 0; r < this.ranges.length; r++) {
            var n = this.ranges[r];
            if (tt(t, n.from()) >= 0 && tt(e, n.to()) <= 0) return r
        }
        return -1
    };
    var bi = function(e, t) {
        this.anchor = e, this.head = t
    };

    function wi(e, t, r) {
        var n = e && e.options.selectionsMayTouch,
            i = t[r];
        t.sort(function(e, t) {
            return tt(e.from(), t.from())
        }), r = B(t, i);
        for (var o = 1; o < t.length; o++) {
            var l = t[o],
                s = t[o - 1],
                a = tt(s.to(), l.from());
            if (n && !l.empty() ? a > 0 : a >= 0) {
                var u = ot(s.from(), l.from()),
                    c = it(s.to(), l.to()),
                    h = s.empty() ? l.from() == l.head : s.from() == s.head;
                o <= r && --r, t.splice(--o, 2, new bi(h ? c : u, h ? u : c))
            }
        }
        return new yi(t, r)
    }

    function xi(e, t) {
        return new yi([new bi(e, t || e)], 0)
    }

    function Ci(e) {
        return e.text ? et(e.from.line + e.text.length - 1, $(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to
    }

    function Si(e, t) {
        if (tt(e, t.from) < 0) return e;
        if (tt(e, t.to) <= 0) return Ci(t);
        var r = e.line + t.text.length - (t.to.line - t.from.line) - 1,
            n = e.ch;
        return e.line == t.to.line && (n += Ci(t).ch - t.to.ch), et(r, n)
    }

    function Li(e, t) {
        for (var r = [], n = 0; n < e.sel.ranges.length; n++) {
            var i = e.sel.ranges[n];
            r.push(new bi(Si(i.anchor, t), Si(i.head, t)))
        }
        return wi(e.cm, r, e.sel.primIndex)
    }

    function ki(e, t, r) {
        return e.line == t.line ? et(r.line, e.ch - t.ch + r.ch) : et(r.line + (e.line - t.line), e.ch)
    }

    function Ti(e) {
        e.doc.mode = ze(e.options, e.doc.modeOption), Mi(e)
    }

    function Mi(e) {
        e.doc.iter(function(e) {
            e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null)
        }), e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first, ei(e, 100), e.state.modeGen++, e.curOp && un(e)
    }

    function Ni(e, t) {
        return 0 == t.from.ch && 0 == t.to.ch && "" == $(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore)
    }

    function Oi(e, t, r, n) {
        function i(e) {
            return r ? r[e] : null
        }

        function o(e, r, i) {
            ! function(e, t, r, n) {
                e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), null != e.order && (e.order = null), Nt(e), Ot(e, r);
                var i = n ? n(e) : 1;
                i != e.height && $e(e, i)
            }(e, r, i, n), sr(e, "change", e, t)
        }

        function l(e, t) {
            for (var r = [], o = e; o < t; ++o) r.push(new Xt(u[o], i(o), n));
            return r
        }

        var s = t.from,
            a = t.to,
            u = t.text,
            c = Xe(e, s.line),
            h = Xe(e, a.line),
            f = $(u),
            d = i(u.length - 1),
            p = a.line - s.line;
        if (t.full) e.insert(0, l(0, u.length)), e.remove(u.length, e.size - u.length);
        else if (Ni(e, t)) {
            var g = l(0, u.length - 1);
            o(h, h.text, d), p && e.remove(s.line, p), g.length && e.insert(s.line, g)
        } else if (c == h)
            if (1 == u.length) o(c, c.text.slice(0, s.ch) + f + c.text.slice(a.ch), d);
            else {
                var v = l(1, u.length - 1);
                v.push(new Xt(f + c.text.slice(a.ch), d, n)), o(c, c.text.slice(0, s.ch) + u[0], i(0)), e.insert(s.line + 1, v)
            }
        else if (1 == u.length) o(c, c.text.slice(0, s.ch) + u[0] + h.text.slice(a.ch), i(0)), e.remove(s.line + 1, p);
        else {
            o(c, c.text.slice(0, s.ch) + u[0], i(0)), o(h, f + h.text.slice(a.ch), d);
            var m = l(1, u.length - 1);
            p > 1 && e.remove(s.line + 1, p - 1), e.insert(s.line + 1, m)
        }
        sr(e, "change", e, t)
    }

    function Ai(e, t, r) {
        ! function e(n, i, o) {
            if (n.linked)
                for (var l = 0; l < n.linked.length; ++l) {
                    var s = n.linked[l];
                    if (s.doc != i) {
                        var a = o && s.sharedHist;
                        r && !a || (t(s.doc, a), e(s.doc, n, a))
                    }
                }
        }(e, null, !0)
    }

    function Di(e, t) {
        if (t.cm) throw new Error("This document is already in use.");
        e.doc = t, t.cm = e, ln(e), Ti(e), Wi(e), e.options.lineWrapping || jt(e), e.options.mode = t.modeOption, un(e)
    }

    function Wi(e) {
        ("rtl" == e.doc.direction ? H : T)(e.display.lineDiv, "CodeMirror-rtl")
    }

    function Hi(e) {
        this.done = [], this.undone = [], this.undoDepth = 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e || 1
    }

    function Fi(e, t) {
        var r = {
            from: nt(t.from),
            to: Ci(t),
            text: Ye(e, t.from, t.to)
        };
        return zi(e, r, t.from.line, t.to.line + 1), Ai(e, function(e) {
            return zi(e, r, t.from.line, t.to.line + 1)
        }, !0), r
    }

    function Pi(e) {
        for (; e.length;) {
            if (!$(e).ranges) break;
            e.pop()
        }
    }

    function Ei(e, t, r, n) {
        var i = e.history;
        i.undone.length = 0;
        var o, l, s = +new Date;
        if ((i.lastOp == n || i.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && i.lastModTime > s - (e.cm ? e.cm.options.historyEventDelay : 500) || "*" == t.origin.charAt(0))) && (o = function(e, t) {
            return t ? (Pi(e.done), $(e.done)) : e.done.length && !$(e.done).ranges ? $(e.done) : e.done.length > 1 && !e.done[e.done.length - 2].ranges ? (e.done.pop(), $(e.done)) : void 0
        }(i, i.lastOp == n))) l = $(o.changes), 0 == tt(t.from, t.to) && 0 == tt(t.from, l.to) ? l.to = Ci(t) : o.changes.push(Fi(e, t));
        else {
            var a = $(i.done);
            for (a && a.ranges || Ri(e.sel, i.done), o = {
                changes: [Fi(e, t)],
                generation: i.generation
            }, i.done.push(o); i.done.length > i.undoDepth;) i.done.shift(), i.done[0].ranges || i.done.shift()
        }
        i.done.push(r), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = s, i.lastOp = i.lastSelOp = n, i.lastOrigin = i.lastSelOrigin = t.origin, l || ge(e, "historyAdded")
    }

    function Ii(e, t, r, n) {
        var i = e.history,
            o = n && n.origin;
        r == i.lastSelOp || o && i.lastSelOrigin == o && (i.lastModTime == i.lastSelTime && i.lastOrigin == o || function(e, t, r, n) {
            var i = t.charAt(0);
            return "*" == i || "+" == i && r.ranges.length == n.ranges.length && r.somethingSelected() == n.somethingSelected() && new Date - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500)
        }(e, o, $(i.done), t)) ? i.done[i.done.length - 1] = t : Ri(t, i.done), i.lastSelTime = +new Date, i.lastSelOrigin = o, i.lastSelOp = r, n && !1 !== n.clearRedo && Pi(i.undone)
    }

    function Ri(e, t) {
        var r = $(t);
        r && r.ranges && r.equals(e) || t.push(e)
    }

    function zi(e, t, r, n) {
        var i = t["spans_" + e.id],
            o = 0;
        e.iter(Math.max(e.first, r), Math.min(e.first + e.size, n), function(r) {
            r.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = r.markedSpans), ++o
        })
    }

    function Bi(e) {
        if (!e) return null;
        for (var t, r = 0; r < e.length; ++r) e[r].marker.explicitlyCleared ? t || (t = e.slice(0, r)) : t && t.push(e[r]);
        return t ? t.length ? t : null : e
    }

    function Gi(e, t) {
        var r = function(e, t) {
                var r = t["spans_" + e.id];
                if (!r) return null;
                for (var n = [], i = 0; i < t.text.length; ++i) n.push(Bi(r[i]));
                return n
            }(e, t),
            n = Tt(e, t);
        if (!r) return n;
        if (!n) return r;
        for (var i = 0; i < r.length; ++i) {
            var o = r[i],
                l = n[i];
            if (o && l) e: for (var s = 0; s < l.length; ++s) {
                for (var a = l[s], u = 0; u < o.length; ++u)
                    if (o[u].marker == a.marker) continue e;
                o.push(a)
            } else l && (r[i] = l)
        }
        return r
    }

    function Ui(e, t, r) {
        for (var n = [], i = 0; i < e.length; ++i) {
            var o = e[i];
            if (o.ranges) n.push(r ? yi.prototype.deepCopy.call(o) : o);
            else {
                var l = o.changes,
                    s = [];
                n.push({
                    changes: s
                });
                for (var a = 0; a < l.length; ++a) {
                    var u = l[a],
                        c = void 0;
                    if (s.push({
                        from: u.from,
                        to: u.to,
                        text: u.text
                    }), t)
                        for (var h in u)(c = h.match(/^spans_(\d+)$/)) && B(t, Number(c[1])) > -1 && ($(s)[h] = u[h], delete u[h])
                }
            }
        }
        return n
    }

    function Vi(e, t, r, n) {
        if (n) {
            var i = e.anchor;
            if (r) {
                var o = tt(t, i) < 0;
                o != tt(r, i) < 0 ? (i = t, t = r) : o != tt(t, r) < 0 && (t = r)
            }
            return new bi(i, t)
        }
        return new bi(r || t, t)
    }

    function Ki(e, t, r, n, i) {
        null == i && (i = e.cm && (e.cm.display.shift || e.extend)), $i(e, new yi([Vi(e.sel.primary(), t, r, i)], 0), n)
    }

    function ji(e, t, r) {
        for (var n = [], i = e.cm && (e.cm.display.shift || e.extend), o = 0; o < e.sel.ranges.length; o++) n[o] = Vi(e.sel.ranges[o], t[o], null, i);
        $i(e, wi(e.cm, n, e.sel.primIndex), r)
    }

    function Xi(e, t, r, n) {
        var i = e.sel.ranges.slice(0);
        i[t] = r, $i(e, wi(e.cm, i, e.sel.primIndex), n)
    }

    function Yi(e, t, r, n) {
        $i(e, xi(t, r), n)
    }

    function _i(e, t, r) {
        var n = e.history.done,
            i = $(n);
        i && i.ranges ? (n[n.length - 1] = t, qi(e, t, r)) : $i(e, t, r)
    }

    function $i(e, t, r) {
        qi(e, t, r), Ii(e, e.sel, e.cm ? e.cm.curOp.id : NaN, r)
    }

    function qi(e, t, r) {
        (ye(e, "beforeSelectionChange") || e.cm && ye(e.cm, "beforeSelectionChange")) && (t = function(e, t, r) {
            var n = {
                ranges: t.ranges,
                update: function(t) {
                    this.ranges = [];
                    for (var r = 0; r < t.length; r++) this.ranges[r] = new bi(st(e, t[r].anchor), st(e, t[r].head))
                },
                origin: r && r.origin
            };
            return ge(e, "beforeSelectionChange", e, n), e.cm && ge(e.cm, "beforeSelectionChange", e.cm, n), n.ranges != t.ranges ? wi(e.cm, n.ranges, n.ranges.length - 1) : t
        }(e, t, r)), Zi(e, Ji(e, t, r && r.bias || (tt(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1), !0)), r && !1 === r.scroll || !e.cm || "nocursor" == e.cm.getOption("readOnly") || On(e.cm)
    }

    function Zi(e, t) {
        t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = 1, e.cm.curOp.selectionChanged = !0, me(e.cm)), sr(e, "cursorActivity", e))
    }

    function Qi(e) {
        Zi(e, Ji(e, e.sel, null, !1))
    }

    function Ji(e, t, r, n) {
        for (var i, o = 0; o < t.ranges.length; o++) {
            var l = t.ranges[o],
                s = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o],
                a = to(e, l.anchor, s && s.anchor, r, n),
                u = to(e, l.head, s && s.head, r, n);
            (i || a != l.anchor || u != l.head) && (i || (i = t.ranges.slice(0, o)), i[o] = new bi(a, u))
        }
        return i ? wi(e.cm, i, t.primIndex) : t
    }

    function eo(e, t, r, n, i) {
        var o = Xe(e, t.line);
        if (o.markedSpans)
            for (var l = 0; l < o.markedSpans.length; ++l) {
                var s = o.markedSpans[l],
                    a = s.marker,
                    u = "selectLeft" in a ? !a.selectLeft : a.inclusiveLeft,
                    c = "selectRight" in a ? !a.selectRight : a.inclusiveRight;
                if ((null == s.from || (u ? s.from <= t.ch : s.from < t.ch)) && (null == s.to || (c ? s.to >= t.ch : s.to > t.ch))) {
                    if (i && (ge(a, "beforeCursorEnter"), a.explicitlyCleared)) {
                        if (o.markedSpans) {
                            --l;
                            continue
                        }
                        break
                    }
                    if (!a.atomic) continue;
                    if (r) {
                        var h = a.find(n < 0 ? 1 : -1),
                            f = void 0;
                        if ((n < 0 ? c : u) && (h = ro(e, h, -n, h && h.line == t.line ? o : null)), h && h.line == t.line && (f = tt(h, r)) && (n < 0 ? f < 0 : f > 0)) return eo(e, h, t, n, i)
                    }
                    var d = a.find(n < 0 ? -1 : 1);
                    return (n < 0 ? u : c) && (d = ro(e, d, n, d.line == t.line ? o : null)), d ? eo(e, d, t, n, i) : null
                }
            }
        return t
    }

    function to(e, t, r, n, i) {
        var o = n || 1,
            l = eo(e, t, r, o, i) || !i && eo(e, t, r, o, !0) || eo(e, t, r, -o, i) || !i && eo(e, t, r, -o, !0);
        return l || (e.cantEdit = !0, et(e.first, 0))
    }

    function ro(e, t, r, n) {
        return r < 0 && 0 == t.ch ? t.line > e.first ? st(e, et(t.line - 1)) : null : r > 0 && t.ch == (n || Xe(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? et(t.line + 1, 0) : null : new et(t.line, t.ch + r)
    }

    function no(e) {
        e.setSelection(et(e.firstLine(), 0), et(e.lastLine()), V)
    }

    function io(e, t, r) {
        var n = {
            canceled: !1,
            from: t.from,
            to: t.to,
            text: t.text,
            origin: t.origin,
            cancel: function() {
                return n.canceled = !0
            }
        };
        return r && (n.update = function(t, r, i, o) {
            t && (n.from = st(e, t)), r && (n.to = st(e, r)), i && (n.text = i), void 0 !== o && (n.origin = o)
        }), ge(e, "beforeChange", e, n), e.cm && ge(e.cm, "beforeChange", e.cm, n), n.canceled ? (e.cm && (e.cm.curOp.updateInput = 2), null) : {
            from: n.from,
            to: n.to,
            text: n.text,
            origin: n.origin
        }
    }

    function oo(e, t, r) {
        if (e.cm) {
            if (!e.cm.curOp) return Zn(e.cm, oo)(e, t, r);
            if (e.cm.state.suppressEdits) return
        }
        if (!(ye(e, "beforeChange") || e.cm && ye(e.cm, "beforeChange")) || (t = io(e, t, !0))) {
            var n = xt && !r && function(e, t, r) {
                var n = null;
                if (e.iter(t.line, r.line + 1, function(e) {
                    if (e.markedSpans)
                        for (var t = 0; t < e.markedSpans.length; ++t) {
                            var r = e.markedSpans[t].marker;
                            !r.readOnly || n && -1 != B(n, r) || (n || (n = [])).push(r)
                        }
                }), !n) return null;
                for (var i = [{
                    from: t,
                    to: r
                }], o = 0; o < n.length; ++o)
                    for (var l = n[o], s = l.find(0), a = 0; a < i.length; ++a) {
                        var u = i[a];
                        if (!(tt(u.to, s.from) < 0 || tt(u.from, s.to) > 0)) {
                            var c = [a, 1],
                                h = tt(u.from, s.from),
                                f = tt(u.to, s.to);
                            (h < 0 || !l.inclusiveLeft && !h) && c.push({
                                from: u.from,
                                to: s.from
                            }), (f > 0 || !l.inclusiveRight && !f) && c.push({
                                from: s.to,
                                to: u.to
                            }), i.splice.apply(i, c), a += c.length - 3
                        }
                    }
                return i
            }(e, t.from, t.to);
            if (n)
                for (var i = n.length - 1; i >= 0; --i) lo(e, {
                    from: n[i].from,
                    to: n[i].to,
                    text: i ? [""] : t.text,
                    origin: t.origin
                });
            else lo(e, t)
        }
    }

    function lo(e, t) {
        if (1 != t.text.length || "" != t.text[0] || 0 != tt(t.from, t.to)) {
            var r = Li(e, t);
            Ei(e, t, r, e.cm ? e.cm.curOp.id : NaN), uo(e, t, r, Tt(e, t));
            var n = [];
            Ai(e, function(e, r) {
                r || -1 != B(n, e.history) || (po(e.history, t), n.push(e.history)), uo(e, t, null, Tt(e, t))
            })
        }
    }

    function so(e, t, r) {
        var n = e.cm && e.cm.state.suppressEdits;
        if (!n || r) {
            for (var i, o = e.history, l = e.sel, s = "undo" == t ? o.done : o.undone, a = "undo" == t ? o.undone : o.done, u = 0; u < s.length && (i = s[u], r ? !i.ranges || i.equals(e.sel) : i.ranges); u++);
            if (u != s.length) {
                for (o.lastOrigin = o.lastSelOrigin = null;;) {
                    if (!(i = s.pop()).ranges) {
                        if (n) return void s.push(i);
                        break
                    }
                    if (Ri(i, a), r && !i.equals(e.sel)) return void $i(e, i, {
                        clearRedo: !1
                    });
                    l = i
                }
                var c = [];
                Ri(l, a), a.push({
                    changes: c,
                    generation: o.generation
                }), o.generation = i.generation || ++o.maxGeneration;
                for (var h = ye(e, "beforeChange") || e.cm && ye(e.cm, "beforeChange"), f = function(r) {
                    var n = i.changes[r];
                    if (n.origin = t, h && !io(e, n, !1)) return s.length = 0, {};
                    c.push(Fi(e, n));
                    var o = r ? Li(e, n) : $(s);
                    uo(e, n, o, Gi(e, n)), !r && e.cm && e.cm.scrollIntoView({
                        from: n.from,
                        to: Ci(n)
                    });
                    var l = [];
                    Ai(e, function(e, t) {
                        t || -1 != B(l, e.history) || (po(e.history, n), l.push(e.history)), uo(e, n, null, Gi(e, n))
                    })
                }, d = i.changes.length - 1; d >= 0; --d) {
                    var p = f(d);
                    if (p) return p.v
                }
            }
        }
    }

    function ao(e, t) {
        if (0 != t && (e.first += t, e.sel = new yi(q(e.sel.ranges, function(e) {
            return new bi(et(e.anchor.line + t, e.anchor.ch), et(e.head.line + t, e.head.ch))
        }), e.sel.primIndex), e.cm)) {
            un(e.cm, e.first, e.first - t, t);
            for (var r = e.cm.display, n = r.viewFrom; n < r.viewTo; n++) cn(e.cm, n, "gutter")
        }
    }

    function uo(e, t, r, n) {
        if (e.cm && !e.cm.curOp) return Zn(e.cm, uo)(e, t, r, n);
        if (t.to.line < e.first) ao(e, t.text.length - 1 - (t.to.line - t.from.line));
        else if (!(t.from.line > e.lastLine())) {
            if (t.from.line < e.first) {
                var i = t.text.length - 1 - (e.first - t.from.line);
                ao(e, i), t = {
                    from: et(e.first, 0),
                    to: et(t.to.line + i, t.to.ch),
                    text: [$(t.text)],
                    origin: t.origin
                }
            }
            var o = e.lastLine();
            t.to.line > o && (t = {
                from: t.from,
                to: et(o, Xe(e, o).text.length),
                text: [t.text[0]],
                origin: t.origin
            }), t.removed = Ye(e, t.from, t.to), r || (r = Li(e, t)), e.cm ? function(e, t, r) {
                var n = e.doc,
                    i = e.display,
                    o = t.from,
                    l = t.to,
                    s = !1,
                    a = o.line;
                e.options.lineWrapping || (a = qe(Rt(Xe(n, o.line))), n.iter(a, l.line + 1, function(e) {
                    if (e == i.maxLine) return s = !0, !0
                }));
                n.sel.contains(t.from, t.to) > -1 && me(e);
                Oi(n, t, r, on(e)), e.options.lineWrapping || (n.iter(a, o.line + t.text.length, function(e) {
                    var t = Kt(e);
                    t > i.maxLineLength && (i.maxLine = e, i.maxLineLength = t, i.maxLineChanged = !0, s = !1)
                }), s && (e.curOp.updateMaxLine = !0));
                (function(e, t) {
                    if (e.modeFrontier = Math.min(e.modeFrontier, t), !(e.highlightFrontier < t - 10)) {
                        for (var r = e.first, n = t - 1; n > r; n--) {
                            var i = Xe(e, n).stateAfter;
                            if (i && (!(i instanceof ut) || n + i.lookAhead < t)) {
                                r = n + 1;
                                break
                            }
                        }
                        e.highlightFrontier = Math.min(e.highlightFrontier, r)
                    }
                })(n, o.line), ei(e, 400);
                var u = t.text.length - (l.line - o.line) - 1;
                t.full ? un(e) : o.line != l.line || 1 != t.text.length || Ni(e.doc, t) ? un(e, o.line, l.line + 1, u) : cn(e, o.line, "text");
                var c = ye(e, "changes"),
                    h = ye(e, "change");
                if (h || c) {
                    var f = {
                        from: o,
                        to: l,
                        text: t.text,
                        removed: t.removed,
                        origin: t.origin
                    };
                    h && sr(e, "change", e, f), c && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(f)
                }
                e.display.selForContextMenu = null
            }(e.cm, t, n) : Oi(e, t, n), qi(e, r, V), e.cantEdit && to(e, et(e.firstLine(), 0)) && (e.cantEdit = !1)
        }
    }

    function co(e, t, r, n, i) {
        var o;
        n || (n = r), tt(n, r) < 0 && (r = (o = [n, r])[0], n = o[1]), "string" == typeof t && (t = e.splitLines(t)), oo(e, {
            from: r,
            to: n,
            text: t,
            origin: i
        })
    }

    function ho(e, t, r, n) {
        r < e.line ? e.line += n : t < e.line && (e.line = t, e.ch = 0)
    }

    function fo(e, t, r, n) {
        for (var i = 0; i < e.length; ++i) {
            var o = e[i],
                l = !0;
            if (o.ranges) {
                o.copied || ((o = e[i] = o.deepCopy()).copied = !0);
                for (var s = 0; s < o.ranges.length; s++) ho(o.ranges[s].anchor, t, r, n), ho(o.ranges[s].head, t, r, n)
            } else {
                for (var a = 0; a < o.changes.length; ++a) {
                    var u = o.changes[a];
                    if (r < u.from.line) u.from = et(u.from.line + n, u.from.ch), u.to = et(u.to.line + n, u.to.ch);
                    else if (t <= u.to.line) {
                        l = !1;
                        break
                    }
                }
                l || (e.splice(0, i + 1), i = 0)
            }
        }
    }

    function po(e, t) {
        var r = t.from.line,
            n = t.to.line,
            i = t.text.length - (n - r) - 1;
        fo(e.done, r, n, i), fo(e.undone, r, n, i)
    }

    function go(e, t, r, n) {
        var i = t,
            o = t;
        return "number" == typeof t ? o = Xe(e, lt(e, t)) : i = qe(t), null == i ? null : (n(o, i) && e.cm && cn(e.cm, i, r), o)
    }

    function vo(e) {
        this.lines = e, this.parent = null;
        for (var t = 0, r = 0; r < e.length; ++r) e[r].parent = this, t += e[r].height;
        this.height = t
    }

    function mo(e) {
        this.children = e;
        for (var t = 0, r = 0, n = 0; n < e.length; ++n) {
            var i = e[n];
            t += i.chunkSize(), r += i.height, i.parent = this
        }
        this.size = t, this.height = r, this.parent = null
    }

    bi.prototype.from = function() {
        return ot(this.anchor, this.head)
    }, bi.prototype.to = function() {
        return it(this.anchor, this.head)
    }, bi.prototype.empty = function() {
        return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
    }, vo.prototype = {
        chunkSize: function() {
            return this.lines.length
        },
        removeInner: function(e, t) {
            for (var r = e, n = e + t; r < n; ++r) {
                var i = this.lines[r];
                this.height -= i.height, Yt(i), sr(i, "delete")
            }
            this.lines.splice(e, t)
        },
        collapse: function(e) {
            e.push.apply(e, this.lines)
        },
        insertInner: function(e, t, r) {
            this.height += r, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
            for (var n = 0; n < t.length; ++n) t[n].parent = this
        },
        iterN: function(e, t, r) {
            for (var n = e + t; e < n; ++e)
                if (r(this.lines[e])) return !0
        }
    }, mo.prototype = {
        chunkSize: function() {
            return this.size
        },
        removeInner: function(e, t) {
            this.size -= t;
            for (var r = 0; r < this.children.length; ++r) {
                var n = this.children[r],
                    i = n.chunkSize();
                if (e < i) {
                    var o = Math.min(t, i - e),
                        l = n.height;
                    if (n.removeInner(e, o), this.height -= l - n.height, i == o && (this.children.splice(r--, 1), n.parent = null), 0 == (t -= o)) break;
                    e = 0
                } else e -= i
            }
            if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof vo))) {
                var s = [];
                this.collapse(s), this.children = [new vo(s)], this.children[0].parent = this
            }
        },
        collapse: function(e) {
            for (var t = 0; t < this.children.length; ++t) this.children[t].collapse(e)
        },
        insertInner: function(e, t, r) {
            this.size += t.length, this.height += r;
            for (var n = 0; n < this.children.length; ++n) {
                var i = this.children[n],
                    o = i.chunkSize();
                if (e <= o) {
                    if (i.insertInner(e, t, r), i.lines && i.lines.length > 50) {
                        for (var l = i.lines.length % 25 + 25, s = l; s < i.lines.length;) {
                            var a = new vo(i.lines.slice(s, s += 25));
                            i.height -= a.height, this.children.splice(++n, 0, a), a.parent = this
                        }
                        i.lines = i.lines.slice(0, l), this.maybeSpill()
                    }
                    break
                }
                e -= o
            }
        },
        maybeSpill: function() {
            if (!(this.children.length <= 10)) {
                var e = this;
                do {
                    var t = new mo(e.children.splice(e.children.length - 5, 5));
                    if (e.parent) {
                        e.size -= t.size, e.height -= t.height;
                        var r = B(e.parent.children, e);
                        e.parent.children.splice(r + 1, 0, t)
                    } else {
                        var n = new mo(e.children);
                        n.parent = e, e.children = [n, t], e = n
                    }
                    t.parent = e.parent
                } while (e.children.length > 10);
                e.parent.maybeSpill()
            }
        },
        iterN: function(e, t, r) {
            for (var n = 0; n < this.children.length; ++n) {
                var i = this.children[n],
                    o = i.chunkSize();
                if (e < o) {
                    var l = Math.min(t, o - e);
                    if (i.iterN(e, l, r)) return !0;
                    if (0 == (t -= l)) break;
                    e = 0
                } else e -= o
            }
        }
    };
    var yo = function(e, t, r) {
        if (r)
            for (var n in r) r.hasOwnProperty(n) && (this[n] = r[n]);
        this.doc = e, this.node = t
    };

    function bo(e, t, r) {
        Vt(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && Nn(e, r)
    }

    yo.prototype.clear = function() {
        var e = this.doc.cm,
            t = this.line.widgets,
            r = this.line,
            n = qe(r);
        if (null != n && t) {
            for (var i = 0; i < t.length; ++i) t[i] == this && t.splice(i--, 1);
            t.length || (r.widgets = null);
            var o = wr(this);
            $e(r, Math.max(0, r.height - o)), e && (qn(e, function() {
                bo(e, r, -o), cn(e, n, "widget")
            }), sr(e, "lineWidgetCleared", e, this, n))
        }
    }, yo.prototype.changed = function() {
        var e = this,
            t = this.height,
            r = this.doc.cm,
            n = this.line;
        this.height = null;
        var i = wr(this) - t;
        i && (Gt(this.doc, n) || $e(n, n.height + i), r && qn(r, function() {
            r.curOp.forceUpdate = !0, bo(r, n, i), sr(r, "lineWidgetChanged", r, e, qe(n))
        }))
    }, be(yo);
    var wo = 0,
        xo = function(e, t) {
            this.lines = [], this.type = t, this.doc = e, this.id = ++wo
        };

    function Co(e, t, r, n, i) {
        if (n && n.shared) return function(e, t, r, n, i) {
            (n = I(n)).shared = !1;
            var o = [Co(e, t, r, n, i)],
                l = o[0],
                s = n.widgetNode;
            return Ai(e, function(e) {
                s && (n.widgetNode = s.cloneNode(!0)), o.push(Co(e, st(e, t), st(e, r), n, i));
                for (var a = 0; a < e.linked.length; ++a)
                    if (e.linked[a].isParent) return;
                l = $(o)
            }), new So(o, l)
        }(e, t, r, n, i);
        if (e.cm && !e.cm.curOp) return Zn(e.cm, Co)(e, t, r, n, i);
        var o = new xo(e, i),
            l = tt(t, r);
        if (n && I(n, o, !1), l > 0 || 0 == l && !1 !== o.clearWhenEmpty) return o;
        if (o.replacedWith && (o.collapsed = !0, o.widgetNode = A("span", [o.replacedWith], "CodeMirror-widget"), n.handleMouseEvents || o.widgetNode.setAttribute("cm-ignore-events", "true"), n.insertLeft && (o.widgetNode.insertLeft = !0)), o.collapsed) {
            if (It(e, t.line, t, r, o) || t.line != r.line && It(e, r.line, t, r, o)) throw new Error("Inserting collapsed marker partially overlapping an existing one");
            Ct = !0
        }
        o.addToHistory && Ei(e, {
            from: t,
            to: r,
            origin: "markText"
        }, e.sel, NaN);
        var s, a = t.line,
            u = e.cm;
        if (e.iter(a, r.line + 1, function(e) {
            u && o.collapsed && !u.options.lineWrapping && Rt(e) == u.display.maxLine && (s = !0), o.collapsed && a != t.line && $e(e, 0),
                function(e, t) {
                    e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], t.marker.attachLine(e)
                }(e, new St(o, a == t.line ? t.ch : null, a == r.line ? r.ch : null)), ++a
        }), o.collapsed && e.iter(t.line, r.line + 1, function(t) {
            Gt(e, t) && $e(t, 0)
        }), o.clearOnEnter && fe(o, "beforeCursorEnter", function() {
            return o.clear()
        }), o.readOnly && (xt = !0, (e.history.done.length || e.history.undone.length) && e.clearHistory()), o.collapsed && (o.id = ++wo, o.atomic = !0), u) {
            if (s && (u.curOp.updateMaxLine = !0), o.collapsed) un(u, t.line, r.line + 1);
            else if (o.className || o.startStyle || o.endStyle || o.css || o.attributes || o.title)
                for (var c = t.line; c <= r.line; c++) cn(u, c, "text");
            o.atomic && Qi(u.doc), sr(u, "markerAdded", u, o)
        }
        return o
    }

    xo.prototype.clear = function() {
        if (!this.explicitlyCleared) {
            var e = this.doc.cm,
                t = e && !e.curOp;
            if (t && Kn(e), ye(this, "clear")) {
                var r = this.find();
                r && sr(this, "clear", r.from, r.to)
            }
            for (var n = null, i = null, o = 0; o < this.lines.length; ++o) {
                var l = this.lines[o],
                    s = Lt(l.markedSpans, this);
                e && !this.collapsed ? cn(e, qe(l), "text") : e && (null != s.to && (i = qe(l)), null != s.from && (n = qe(l))), l.markedSpans = kt(l.markedSpans, s), null == s.from && this.collapsed && !Gt(this.doc, l) && e && $e(l, en(e.display))
            }
            if (e && this.collapsed && !e.options.lineWrapping)
                for (var a = 0; a < this.lines.length; ++a) {
                    var u = Rt(this.lines[a]),
                        c = Kt(u);
                    c > e.display.maxLineLength && (e.display.maxLine = u, e.display.maxLineLength = c, e.display.maxLineChanged = !0)
                }
            null != n && e && this.collapsed && un(e, n, i + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && Qi(e.doc)), e && sr(e, "markerCleared", e, this, n, i), t && jn(e), this.parent && this.parent.clear()
        }
    }, xo.prototype.find = function(e, t) {
        var r, n;
        null == e && "bookmark" == this.type && (e = 1);
        for (var i = 0; i < this.lines.length; ++i) {
            var o = this.lines[i],
                l = Lt(o.markedSpans, this);
            if (null != l.from && (r = et(t ? o : qe(o), l.from), -1 == e)) return r;
            if (null != l.to && (n = et(t ? o : qe(o), l.to), 1 == e)) return n
        }
        return r && {
            from: r,
            to: n
        }
    }, xo.prototype.changed = function() {
        var e = this,
            t = this.find(-1, !0),
            r = this,
            n = this.doc.cm;
        t && n && qn(n, function() {
            var i = t.line,
                o = qe(t.line),
                l = Ar(n, o);
            if (l && (Ir(l), n.curOp.selectionChanged = n.curOp.forceUpdate = !0), n.curOp.updateMaxLine = !0, !Gt(r.doc, i) && null != r.height) {
                var s = r.height;
                r.height = null;
                var a = wr(r) - s;
                a && $e(i, i.height + a)
            }
            sr(n, "markerChanged", n, e)
        })
    }, xo.prototype.attachLine = function(e) {
        if (!this.lines.length && this.doc.cm) {
            var t = this.doc.cm.curOp;
            t.maybeHiddenMarkers && -1 != B(t.maybeHiddenMarkers, this) || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this)
        }
        this.lines.push(e)
    }, xo.prototype.detachLine = function(e) {
        if (this.lines.splice(B(this.lines, e), 1), !this.lines.length && this.doc.cm) {
            var t = this.doc.cm.curOp;
            (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this)
        }
    }, be(xo);
    var So = function(e, t) {
        this.markers = e, this.primary = t;
        for (var r = 0; r < e.length; ++r) e[r].parent = this
    };

    function Lo(e) {
        return e.findMarks(et(e.first, 0), e.clipPos(et(e.lastLine())), function(e) {
            return e.parent
        })
    }

    function ko(e) {
        for (var t = function(t) {
            var r = e[t],
                n = [r.primary.doc];
            Ai(r.primary.doc, function(e) {
                return n.push(e)
            });
            for (var i = 0; i < r.markers.length; i++) {
                var o = r.markers[i]; -
                    1 == B(n, o.doc) && (o.parent = null, r.markers.splice(i--, 1))
            }
        }, r = 0; r < e.length; r++) t(r)
    }

    So.prototype.clear = function() {
        if (!this.explicitlyCleared) {
            this.explicitlyCleared = !0;
            for (var e = 0; e < this.markers.length; ++e) this.markers[e].clear();
            sr(this, "clear")
        }
    }, So.prototype.find = function(e, t) {
        return this.primary.find(e, t)
    }, be(So);
    var To = 0,
        Mo = function(e, t, r, n, i) {
            if (!(this instanceof Mo)) return new Mo(e, t, r, n, i);
            null == r && (r = 0), mo.call(this, [new vo([new Xt("", null)])]), this.first = r, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.modeFrontier = this.highlightFrontier = r;
            var o = et(r, 0);
            this.sel = xi(o), this.history = new Hi(null), this.id = ++To, this.modeOption = t, this.lineSep = n, this.direction = "rtl" == i ? "rtl" : "ltr", this.extend = !1, "string" == typeof e && (e = this.splitLines(e)), Oi(this, {
                from: o,
                to: o,
                text: e
            }), $i(this, xi(o), V)
        };
    Mo.prototype = Q(mo.prototype, {
        constructor: Mo,
        iter: function(e, t, r) {
            r ? this.iterN(e - this.first, t - e, r) : this.iterN(this.first, this.first + this.size, e)
        },
        insert: function(e, t) {
            for (var r = 0, n = 0; n < t.length; ++n) r += t[n].height;
            this.insertInner(e - this.first, t, r)
        },
        remove: function(e, t) {
            this.removeInner(e - this.first, t)
        },
        getValue: function(e) {
            var t = _e(this, this.first, this.first + this.size);
            return !1 === e ? t : t.join(e || this.lineSeparator())
        },
        setValue: Jn(function(e) {
            var t = et(this.first, 0),
                r = this.first + this.size - 1;
            oo(this, {
                from: t,
                to: et(r, Xe(this, r).text.length),
                text: this.splitLines(e),
                origin: "setValue",
                full: !0
            }, !0), this.cm && An(this.cm, 0, 0), $i(this, xi(t), V)
        }),
        replaceRange: function(e, t, r, n) {
            co(this, e, t = st(this, t), r = r ? st(this, r) : t, n)
        },
        getRange: function(e, t, r) {
            var n = Ye(this, st(this, e), st(this, t));
            return !1 === r ? n : n.join(r || this.lineSeparator())
        },
        getLine: function(e) {
            var t = this.getLineHandle(e);
            return t && t.text
        },
        getLineHandle: function(e) {
            if (Qe(this, e)) return Xe(this, e)
        },
        getLineNumber: function(e) {
            return qe(e)
        },
        getLineHandleVisualStart: function(e) {
            return "number" == typeof e && (e = Xe(this, e)), Rt(e)
        },
        lineCount: function() {
            return this.size
        },
        firstLine: function() {
            return this.first
        },
        lastLine: function() {
            return this.first + this.size - 1
        },
        clipPos: function(e) {
            return st(this, e)
        },
        getCursor: function(e) {
            var t = this.sel.primary();
            return null == e || "head" == e ? t.head : "anchor" == e ? t.anchor : "end" == e || "to" == e || !1 === e ? t.to() : t.from()
        },
        listSelections: function() {
            return this.sel.ranges
        },
        somethingSelected: function() {
            return this.sel.somethingSelected()
        },
        setCursor: Jn(function(e, t, r) {
            Yi(this, st(this, "number" == typeof e ? et(e, t || 0) : e), null, r)
        }),
        setSelection: Jn(function(e, t, r) {
            Yi(this, st(this, e), st(this, t || e), r)
        }),
        extendSelection: Jn(function(e, t, r) {
            Ki(this, st(this, e), t && st(this, t), r)
        }),
        extendSelections: Jn(function(e, t) {
            ji(this, at(this, e), t)
        }),
        extendSelectionsBy: Jn(function(e, t) {
            ji(this, at(this, q(this.sel.ranges, e)), t)
        }),
        setSelections: Jn(function(e, t, r) {
            if (e.length) {
                for (var n = [], i = 0; i < e.length; i++) n[i] = new bi(st(this, e[i].anchor), st(this, e[i].head));
                null == t && (t = Math.min(e.length - 1, this.sel.primIndex)), $i(this, wi(this.cm, n, t), r)
            }
        }),
        addSelection: Jn(function(e, t, r) {
            var n = this.sel.ranges.slice(0);
            n.push(new bi(st(this, e), st(this, t || e))), $i(this, wi(this.cm, n, n.length - 1), r)
        }),
        getSelection: function(e) {
            for (var t, r = this.sel.ranges, n = 0; n < r.length; n++) {
                var i = Ye(this, r[n].from(), r[n].to());
                t = t ? t.concat(i) : i
            }
            return !1 === e ? t : t.join(e || this.lineSeparator())
        },
        getSelections: function(e) {
            for (var t = [], r = this.sel.ranges, n = 0; n < r.length; n++) {
                var i = Ye(this, r[n].from(), r[n].to());
                !1 !== e && (i = i.join(e || this.lineSeparator())), t[n] = i
            }
            return t
        },
        replaceSelection: function(e, t, r) {
            for (var n = [], i = 0; i < this.sel.ranges.length; i++) n[i] = e;
            this.replaceSelections(n, t, r || "+input")
        },
        replaceSelections: Jn(function(e, t, r) {
            for (var n = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
                var l = i.ranges[o];
                n[o] = {
                    from: l.from(),
                    to: l.to(),
                    text: this.splitLines(e[o]),
                    origin: r
                }
            }
            for (var s = t && "end" != t && function(e, t, r) {
                for (var n = [], i = et(e.first, 0), o = i, l = 0; l < t.length; l++) {
                    var s = t[l],
                        a = ki(s.from, i, o),
                        u = ki(Ci(s), i, o);
                    if (i = s.to, o = u, "around" == r) {
                        var c = e.sel.ranges[l],
                            h = tt(c.head, c.anchor) < 0;
                        n[l] = new bi(h ? u : a, h ? a : u)
                    } else n[l] = new bi(a, a)
                }
                return new yi(n, e.sel.primIndex)
            }(this, n, t), a = n.length - 1; a >= 0; a--) oo(this, n[a]);
            s ? _i(this, s) : this.cm && On(this.cm)
        }),
        undo: Jn(function() {
            so(this, "undo")
        }),
        redo: Jn(function() {
            so(this, "redo")
        }),
        undoSelection: Jn(function() {
            so(this, "undo", !0)
        }),
        redoSelection: Jn(function() {
            so(this, "redo", !0)
        }),
        setExtending: function(e) {
            this.extend = e
        },
        getExtending: function() {
            return this.extend
        },
        historySize: function() {
            for (var e = this.history, t = 0, r = 0, n = 0; n < e.done.length; n++) e.done[n].ranges || ++t;
            for (var i = 0; i < e.undone.length; i++) e.undone[i].ranges || ++r;
            return {
                undo: t,
                redo: r
            }
        },
        clearHistory: function() {
            var e = this;
            this.history = new Hi(this.history.maxGeneration), Ai(this, function(t) {
                return t.history = e.history
            }, !0)
        },
        markClean: function() {
            this.cleanGeneration = this.changeGeneration(!0)
        },
        changeGeneration: function(e) {
            return e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation
        },
        isClean: function(e) {
            return this.history.generation == (e || this.cleanGeneration)
        },
        getHistory: function() {
            return {
                done: Ui(this.history.done),
                undone: Ui(this.history.undone)
            }
        },
        setHistory: function(e) {
            var t = this.history = new Hi(this.history.maxGeneration);
            t.done = Ui(e.done.slice(0), null, !0), t.undone = Ui(e.undone.slice(0), null, !0)
        },
        setGutterMarker: Jn(function(e, t, r) {
            return go(this, e, "gutter", function(e) {
                var n = e.gutterMarkers || (e.gutterMarkers = {});
                return n[t] = r, !r && re(n) && (e.gutterMarkers = null), !0
            })
        }),
        clearGutter: Jn(function(e) {
            var t = this;
            this.iter(function(r) {
                r.gutterMarkers && r.gutterMarkers[e] && go(t, r, "gutter", function() {
                    return r.gutterMarkers[e] = null, re(r.gutterMarkers) && (r.gutterMarkers = null), !0
                })
            })
        }),
        lineInfo: function(e) {
            var t;
            if ("number" == typeof e) {
                if (!Qe(this, e)) return null;
                if (t = e, !(e = Xe(this, e))) return null
            } else if (null == (t = qe(e))) return null;
            return {
                line: t,
                handle: e,
                text: e.text,
                gutterMarkers: e.gutterMarkers,
                textClass: e.textClass,
                bgClass: e.bgClass,
                wrapClass: e.wrapClass,
                widgets: e.widgets
            }
        },
        addLineClass: Jn(function(e, t, r) {
            return go(this, e, "gutter" == t ? "gutter" : "class", function(e) {
                var n = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass";
                if (e[n]) {
                    if (L(r).test(e[n])) return !1;
                    e[n] += " " + r
                } else e[n] = r;
                return !0
            })
        }),
        removeLineClass: Jn(function(e, t, r) {
            return go(this, e, "gutter" == t ? "gutter" : "class", function(e) {
                var n = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass",
                    i = e[n];
                if (!i) return !1;
                if (null == r) e[n] = null;
                else {
                    var o = i.match(L(r));
                    if (!o) return !1;
                    var l = o.index + o[0].length;
                    e[n] = i.slice(0, o.index) + (o.index && l != i.length ? " " : "") + i.slice(l) || null
                }
                return !0
            })
        }),
        addLineWidget: Jn(function(e, t, r) {
            return function(e, t, r, n) {
                var i = new yo(e, r, n),
                    o = e.cm;
                return o && i.noHScroll && (o.display.alignWidgets = !0), go(e, t, "widget", function(t) {
                    var r = t.widgets || (t.widgets = []);
                    if (null == i.insertAt ? r.push(i) : r.splice(Math.min(r.length, Math.max(0, i.insertAt)), 0, i), i.line = t, o && !Gt(e, t)) {
                        var n = Vt(t) < e.scrollTop;
                        $e(t, t.height + wr(i)), n && Nn(o, i.height), o.curOp.forceUpdate = !0
                    }
                    return !0
                }), o && sr(o, "lineWidgetAdded", o, i, "number" == typeof t ? t : qe(t)), i
            }(this, e, t, r)
        }),
        removeLineWidget: function(e) {
            e.clear()
        },
        markText: function(e, t, r) {
            return Co(this, st(this, e), st(this, t), r, r && r.type || "range")
        },
        setBookmark: function(e, t) {
            var r = {
                replacedWith: t && (null == t.nodeType ? t.widget : t),
                insertLeft: t && t.insertLeft,
                clearWhenEmpty: !1,
                shared: t && t.shared,
                handleMouseEvents: t && t.handleMouseEvents
            };
            return Co(this, e = st(this, e), e, r, "bookmark")
        },
        findMarksAt: function(e) {
            var t = [],
                r = Xe(this, (e = st(this, e)).line).markedSpans;
            if (r)
                for (var n = 0; n < r.length; ++n) {
                    var i = r[n];
                    (null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker)
                }
            return t
        },
        findMarks: function(e, t, r) {
            e = st(this, e), t = st(this, t);
            var n = [],
                i = e.line;
            return this.iter(e.line, t.line + 1, function(o) {
                var l = o.markedSpans;
                if (l)
                    for (var s = 0; s < l.length; s++) {
                        var a = l[s];
                        null != a.to && i == e.line && e.ch >= a.to || null == a.from && i != e.line || null != a.from && i == t.line && a.from >= t.ch || r && !r(a.marker) || n.push(a.marker.parent || a.marker)
                    }
                ++i
            }), n
        },
        getAllMarks: function() {
            var e = [];
            return this.iter(function(t) {
                var r = t.markedSpans;
                if (r)
                    for (var n = 0; n < r.length; ++n) null != r[n].from && e.push(r[n].marker)
            }), e
        },
        posFromIndex: function(e) {
            var t, r = this.first,
                n = this.lineSeparator().length;
            return this.iter(function(i) {
                var o = i.text.length + n;
                if (o > e) return t = e, !0;
                e -= o, ++r
            }), st(this, et(r, t))
        },
        indexFromPos: function(e) {
            var t = (e = st(this, e)).ch;
            if (e.line < this.first || e.ch < 0) return 0;
            var r = this.lineSeparator().length;
            return this.iter(this.first, e.line, function(e) {
                t += e.text.length + r
            }), t
        },
        copy: function(e) {
            var t = new Mo(_e(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);
            return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t
        },
        linkedDoc: function(e) {
            e || (e = {});
            var t = this.first,
                r = this.first + this.size;
            null != e.from && e.from > t && (t = e.from), null != e.to && e.to < r && (r = e.to);
            var n = new Mo(_e(this, t, r), e.mode || this.modeOption, t, this.lineSep, this.direction);
            return e.sharedHist && (n.history = this.history), (this.linked || (this.linked = [])).push({
                doc: n,
                sharedHist: e.sharedHist
            }), n.linked = [{
                doc: this,
                isParent: !0,
                sharedHist: e.sharedHist
            }],
                function(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var n = t[r],
                            i = n.find(),
                            o = e.clipPos(i.from),
                            l = e.clipPos(i.to);
                        if (tt(o, l)) {
                            var s = Co(e, o, l, n.primary, n.primary.type);
                            n.markers.push(s), s.parent = n
                        }
                    }
                }(n, Lo(this)), n
        },
        unlinkDoc: function(e) {
            if (e instanceof Sl && (e = e.doc), this.linked)
                for (var t = 0; t < this.linked.length; ++t) {
                    if (this.linked[t].doc == e) {
                        this.linked.splice(t, 1), e.unlinkDoc(this), ko(Lo(this));
                        break
                    }
                }
            if (e.history == this.history) {
                var r = [e.id];
                Ai(e, function(e) {
                    return r.push(e.id)
                }, !0), e.history = new Hi(null), e.history.done = Ui(this.history.done, r), e.history.undone = Ui(this.history.undone, r)
            }
        },
        iterLinkedDocs: function(e) {
            Ai(this, e)
        },
        getMode: function() {
            return this.mode
        },
        getEditor: function() {
            return this.cm
        },
        splitLines: function(e) {
            return this.lineSep ? e.split(this.lineSep) : We(e)
        },
        lineSeparator: function() {
            return this.lineSep || "\n"
        },
        setDirection: Jn(function(e) {
            var t;
            ("rtl" != e && (e = "ltr"), e != this.direction) && (this.direction = e, this.iter(function(e) {
                return e.order = null
            }), this.cm && qn(t = this.cm, function() {
                Wi(t), un(t)
            }))
        })
    }), Mo.prototype.eachLine = Mo.prototype.iter;
    var No = 0;

    function Oo(e) {
        var t = this;
        if (Ao(t), !ve(t, e) && !xr(t.display, e)) {
            we(e), l && (No = +new Date);
            var r = sn(t, e, !0),
                n = e.dataTransfer.files;
            if (r && !t.isReadOnly())
                if (n && n.length && window.FileReader && window.File)
                    for (var i = n.length, o = Array(i), s = 0, a = function() {
                        ++s == i && Zn(t, function() {
                            var e = {
                                from: r = st(t.doc, r),
                                to: r,
                                text: t.doc.splitLines(o.filter(function(e) {
                                    return null != e
                                }).join(t.doc.lineSeparator())),
                                origin: "paste"
                            };
                            oo(t.doc, e), _i(t.doc, xi(st(t.doc, r), st(t.doc, Ci(e))))
                        })()
                    }, u = function(e, r) {
                        if (t.options.allowDropFileTypes && -1 == B(t.options.allowDropFileTypes, e.type)) a();
                        else {
                            var n = new FileReader;
                            n.onerror = function() {
                                return a()
                            }, n.onload = function() {
                                var e = n.result;
                                /[\x00-\x08\x0e-\x1f]{2}/.test(e) ? a() : (o[r] = e, a())
                            }, n.readAsText(e)
                        }
                    }, c = 0; c < n.length; c++) u(n[c], c);
                else {
                    if (t.state.draggingText && t.doc.sel.contains(r) > -1) return t.state.draggingText(e), void setTimeout(function() {
                        return t.display.input.focus()
                    }, 20);
                    try {
                        var h = e.dataTransfer.getData("Text");
                        if (h) {
                            var f;
                            if (t.state.draggingText && !t.state.draggingText.copy && (f = t.listSelections()), qi(t.doc, xi(r, r)), f)
                                for (var d = 0; d < f.length; ++d) co(t.doc, "", f[d].anchor, f[d].head, "drag");
                            t.replaceSelection(h, "around", "paste"), t.display.input.focus()
                        }
                    } catch (e) {}
                }
        }
    }

    function Ao(e) {
        e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null)
    }

    function Do(e) {
        if (document.getElementsByClassName) {
            for (var t = document.getElementsByClassName("CodeMirror"), r = [], n = 0; n < t.length; n++) {
                var i = t[n].CodeMirror;
                i && r.push(i)
            }
            r.length && r[0].operation(function() {
                for (var t = 0; t < r.length; t++) e(r[t])
            })
        }
    }

    var Wo = !1;

    function Ho() {
        var e;
        Wo || (fe(window, "resize", function() {
            null == e && (e = setTimeout(function() {
                e = null, Do(Fo)
            }, 100))
        }), fe(window, "blur", function() {
            return Do(Sn)
        }), Wo = !0)
    }

    function Fo(e) {
        var t = e.display;
        t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize()
    }

    for (var Po = {
        3: "Pause",
        8: "Backspace",
        9: "Tab",
        13: "Enter",
        16: "Shift",
        17: "Ctrl",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Esc",
        32: "Space",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down",
        44: "PrintScrn",
        45: "Insert",
        46: "Delete",
        59: ";",
        61: "=",
        91: "Mod",
        92: "Mod",
        93: "Mod",
        106: "*",
        107: "=",
        109: "-",
        110: ".",
        111: "/",
        145: "ScrollLock",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'",
        224: "Mod",
        63232: "Up",
        63233: "Down",
        63234: "Left",
        63235: "Right",
        63272: "Delete",
        63273: "Home",
        63275: "End",
        63276: "PageUp",
        63277: "PageDown",
        63302: "Insert"
    }, Eo = 0; Eo < 10; Eo++) Po[Eo + 48] = Po[Eo + 96] = String(Eo);
    for (var Io = 65; Io <= 90; Io++) Po[Io] = String.fromCharCode(Io);
    for (var Ro = 1; Ro <= 12; Ro++) Po[Ro + 111] = Po[Ro + 63235] = "F" + Ro;
    var zo = {};

    function Bo(e) {
        var t, r, n, i, o = e.split(/-(?!$)/);
        e = o[o.length - 1];
        for (var l = 0; l < o.length - 1; l++) {
            var s = o[l];
            if (/^(cmd|meta|m)$/i.test(s)) i = !0;
            else if (/^a(lt)?$/i.test(s)) t = !0;
            else if (/^(c|ctrl|control)$/i.test(s)) r = !0;
            else {
                if (!/^s(hift)?$/i.test(s)) throw new Error("Unrecognized modifier name: " + s);
                n = !0
            }
        }
        return t && (e = "Alt-" + e), r && (e = "Ctrl-" + e), i && (e = "Cmd-" + e), n && (e = "Shift-" + e), e
    }

    function Go(e) {
        var t = {};
        for (var r in e)
            if (e.hasOwnProperty(r)) {
                var n = e[r];
                if (/^(name|fallthrough|(de|at)tach)$/.test(r)) continue;
                if ("..." == n) {
                    delete e[r];
                    continue
                }
                for (var i = q(r.split(" "), Bo), o = 0; o < i.length; o++) {
                    var l = void 0,
                        s = void 0;
                    o == i.length - 1 ? (s = i.join(" "), l = n) : (s = i.slice(0, o + 1).join(" "), l = "...");
                    var a = t[s];
                    if (a) {
                        if (a != l) throw new Error("Inconsistent bindings for " + s)
                    } else t[s] = l
                }
                delete e[r]
            }
        for (var u in t) e[u] = t[u];
        return e
    }

    function Uo(e, t, r, n) {
        var i = (t = Xo(t)).call ? t.call(e, n) : t[e];
        if (!1 === i) return "nothing";
        if ("..." === i) return "multi";
        if (null != i && r(i)) return "handled";
        if (t.fallthrough) {
            if ("[object Array]" != Object.prototype.toString.call(t.fallthrough)) return Uo(e, t.fallthrough, r, n);
            for (var o = 0; o < t.fallthrough.length; o++) {
                var l = Uo(e, t.fallthrough[o], r, n);
                if (l) return l
            }
        }
    }

    function Vo(e) {
        var t = "string" == typeof e ? e : Po[e.keyCode];
        return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t
    }

    function Ko(e, t, r) {
        var n = e;
        return t.altKey && "Alt" != n && (e = "Alt-" + e), (C ? t.metaKey : t.ctrlKey) && "Ctrl" != n && (e = "Ctrl-" + e), (C ? t.ctrlKey : t.metaKey) && "Mod" != n && (e = "Cmd-" + e), !r && t.shiftKey && "Shift" != n && (e = "Shift-" + e), e
    }

    function jo(e, t) {
        if (h && 34 == e.keyCode && e.char) return !1;
        var r = Po[e.keyCode];
        return null != r && !e.altGraphKey && (3 == e.keyCode && e.code && (r = e.code), Ko(r, e, t))
    }

    function Xo(e) {
        return "string" == typeof e ? zo[e] : e
    }

    function Yo(e, t) {
        for (var r = e.doc.sel.ranges, n = [], i = 0; i < r.length; i++) {
            for (var o = t(r[i]); n.length && tt(o.from, $(n).to) <= 0;) {
                var l = n.pop();
                if (tt(l.from, o.from) < 0) {
                    o.from = l.from;
                    break
                }
            }
            n.push(o)
        }
        qn(e, function() {
            for (var t = n.length - 1; t >= 0; t--) co(e.doc, "", n[t].from, n[t].to, "+delete");
            On(e)
        })
    }

    function _o(e, t, r) {
        var n = oe(e.text, t + r, r);
        return n < 0 || n > e.text.length ? null : n
    }

    function $o(e, t, r) {
        var n = _o(e, t.ch, r);
        return null == n ? null : new et(t.line, n, r < 0 ? "after" : "before")
    }

    function qo(e, t, r, n, i) {
        if (e) {
            "rtl" == t.doc.direction && (i = -i);
            var o = ce(r, t.doc.direction);
            if (o) {
                var l, s = i < 0 ? $(o) : o[0],
                    a = i < 0 == (1 == s.level) ? "after" : "before";
                if (s.level > 0 || "rtl" == t.doc.direction) {
                    var u = Dr(t, r);
                    l = i < 0 ? r.text.length - 1 : 0;
                    var c = Wr(t, u, l).top;
                    l = le(function(e) {
                        return Wr(t, u, e).top == c
                    }, i < 0 == (1 == s.level) ? s.from : s.to - 1, l), "before" == a && (l = _o(r, l, 1))
                } else l = i < 0 ? s.to : s.from;
                return new et(n, l, a)
            }
        }
        return new et(n, i < 0 ? r.text.length : 0, i < 0 ? "before" : "after")
    }

    zo.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharAfter",
        Backspace: "delCharBefore",
        "Shift-Backspace": "delCharBefore",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite",
        Esc: "singleSelection"
    }, zo.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Up": "goLineUp",
        "Ctrl-Down": "goLineDown",
        "Ctrl-Left": "goGroupLeft",
        "Ctrl-Right": "goGroupRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delGroupBefore",
        "Ctrl-Delete": "delGroupAfter",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        "Ctrl-U": "undoSelection",
        "Shift-Ctrl-U": "redoSelection",
        "Alt-U": "redoSelection",
        fallthrough: "basic"
    }, zo.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-D": "delWordAfter",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars",
        "Ctrl-O": "openLine"
    }, zo.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Home": "goDocStart",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
        "Cmd-Left": "goLineLeft",
        "Cmd-Right": "goLineRight",
        "Alt-Backspace": "delGroupBefore",
        "Ctrl-Alt-Backspace": "delGroupAfter",
        "Alt-Delete": "delGroupAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        "Cmd-Backspace": "delWrappedLineLeft",
        "Cmd-Delete": "delWrappedLineRight",
        "Cmd-U": "undoSelection",
        "Shift-Cmd-U": "redoSelection",
        "Ctrl-Up": "goDocStart",
        "Ctrl-Down": "goDocEnd",
        fallthrough: ["basic", "emacsy"]
    }, zo.default = y ? zo.macDefault : zo.pcDefault;
    var Zo = {
        selectAll: no,
        singleSelection: function(e) {
            return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), V)
        },
        killLine: function(e) {
            return Yo(e, function(t) {
                if (t.empty()) {
                    var r = Xe(e.doc, t.head.line).text.length;
                    return t.head.ch == r && t.head.line < e.lastLine() ? {
                        from: t.head,
                        to: et(t.head.line + 1, 0)
                    } : {
                        from: t.head,
                        to: et(t.head.line, r)
                    }
                }
                return {
                    from: t.from(),
                    to: t.to()
                }
            })
        },
        deleteLine: function(e) {
            return Yo(e, function(t) {
                return {
                    from: et(t.from().line, 0),
                    to: st(e.doc, et(t.to().line + 1, 0))
                }
            })
        },
        delLineLeft: function(e) {
            return Yo(e, function(e) {
                return {
                    from: et(e.from().line, 0),
                    to: e.from()
                }
            })
        },
        delWrappedLineLeft: function(e) {
            return Yo(e, function(t) {
                var r = e.charCoords(t.head, "div").top + 5;
                return {
                    from: e.coordsChar({
                        left: 0,
                        top: r
                    }, "div"),
                    to: t.from()
                }
            })
        },
        delWrappedLineRight: function(e) {
            return Yo(e, function(t) {
                var r = e.charCoords(t.head, "div").top + 5,
                    n = e.coordsChar({
                        left: e.display.lineDiv.offsetWidth + 100,
                        top: r
                    }, "div");
                return {
                    from: t.from(),
                    to: n
                }
            })
        },
        undo: function(e) {
            return e.undo()
        },
        redo: function(e) {
            return e.redo()
        },
        undoSelection: function(e) {
            return e.undoSelection()
        },
        redoSelection: function(e) {
            return e.redoSelection()
        },
        goDocStart: function(e) {
            return e.extendSelection(et(e.firstLine(), 0))
        },
        goDocEnd: function(e) {
            return e.extendSelection(et(e.lastLine()))
        },
        goLineStart: function(e) {
            return e.extendSelectionsBy(function(t) {
                return Qo(e, t.head.line)
            }, {
                origin: "+move",
                bias: 1
            })
        },
        goLineStartSmart: function(e) {
            return e.extendSelectionsBy(function(t) {
                return Jo(e, t.head)
            }, {
                origin: "+move",
                bias: 1
            })
        },
        goLineEnd: function(e) {
            return e.extendSelectionsBy(function(t) {
                return function(e, t) {
                    var r = Xe(e.doc, t),
                        n = function(e) {
                            for (var t; t = Pt(e);) e = t.find(1, !0).line;
                            return e
                        }(r);
                    n != r && (t = qe(n));
                    return qo(!0, e, r, t, -1)
                }(e, t.head.line)
            }, {
                origin: "+move",
                bias: -1
            })
        },
        goLineRight: function(e) {
            return e.extendSelectionsBy(function(t) {
                var r = e.cursorCoords(t.head, "div").top + 5;
                return e.coordsChar({
                    left: e.display.lineDiv.offsetWidth + 100,
                    top: r
                }, "div")
            }, j)
        },
        goLineLeft: function(e) {
            return e.extendSelectionsBy(function(t) {
                var r = e.cursorCoords(t.head, "div").top + 5;
                return e.coordsChar({
                    left: 0,
                    top: r
                }, "div")
            }, j)
        },
        goLineLeftSmart: function(e) {
            return e.extendSelectionsBy(function(t) {
                var r = e.cursorCoords(t.head, "div").top + 5,
                    n = e.coordsChar({
                        left: 0,
                        top: r
                    }, "div");
                return n.ch < e.getLine(n.line).search(/\S/) ? Jo(e, t.head) : n
            }, j)
        },
        goLineUp: function(e) {
            return e.moveV(-1, "line")
        },
        goLineDown: function(e) {
            return e.moveV(1, "line")
        },
        goPageUp: function(e) {
            return e.moveV(-1, "page")
        },
        goPageDown: function(e) {
            return e.moveV(1, "page")
        },
        goCharLeft: function(e) {
            return e.moveH(-1, "char")
        },
        goCharRight: function(e) {
            return e.moveH(1, "char")
        },
        goColumnLeft: function(e) {
            return e.moveH(-1, "column")
        },
        goColumnRight: function(e) {
            return e.moveH(1, "column")
        },
        goWordLeft: function(e) {
            return e.moveH(-1, "word")
        },
        goGroupRight: function(e) {
            return e.moveH(1, "group")
        },
        goGroupLeft: function(e) {
            return e.moveH(-1, "group")
        },
        goWordRight: function(e) {
            return e.moveH(1, "word")
        },
        delCharBefore: function(e) {
            return e.deleteH(-1, "codepoint")
        },
        delCharAfter: function(e) {
            return e.deleteH(1, "char")
        },
        delWordBefore: function(e) {
            return e.deleteH(-1, "word")
        },
        delWordAfter: function(e) {
            return e.deleteH(1, "word")
        },
        delGroupBefore: function(e) {
            return e.deleteH(-1, "group")
        },
        delGroupAfter: function(e) {
            return e.deleteH(1, "group")
        },
        indentAuto: function(e) {
            return e.indentSelection("smart")
        },
        indentMore: function(e) {
            return e.indentSelection("add")
        },
        indentLess: function(e) {
            return e.indentSelection("subtract")
        },
        insertTab: function(e) {
            return e.replaceSelection("\t")
        },
        insertSoftTab: function(e) {
            for (var t = [], r = e.listSelections(), n = e.options.tabSize, i = 0; i < r.length; i++) {
                var o = r[i].from(),
                    l = R(e.getLine(o.line), o.ch, n);
                t.push(_(n - l % n))
            }
            e.replaceSelections(t)
        },
        defaultTab: function(e) {
            e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab")
        },
        transposeChars: function(e) {
            return qn(e, function() {
                for (var t = e.listSelections(), r = [], n = 0; n < t.length; n++)
                    if (t[n].empty()) {
                        var i = t[n].head,
                            o = Xe(e.doc, i.line).text;
                        if (o)
                            if (i.ch == o.length && (i = new et(i.line, i.ch - 1)), i.ch > 0) i = new et(i.line, i.ch + 1), e.replaceRange(o.charAt(i.ch - 1) + o.charAt(i.ch - 2), et(i.line, i.ch - 2), i, "+transpose");
                            else if (i.line > e.doc.first) {
                                var l = Xe(e.doc, i.line - 1).text;
                                l && (i = new et(i.line, 1), e.replaceRange(o.charAt(0) + e.doc.lineSeparator() + l.charAt(l.length - 1), et(i.line - 1, l.length - 1), i, "+transpose"))
                            }
                        r.push(new bi(i, i))
                    }
                e.setSelections(r)
            })
        },
        newlineAndIndent: function(e) {
            return qn(e, function() {
                for (var t = e.listSelections(), r = t.length - 1; r >= 0; r--) e.replaceRange(e.doc.lineSeparator(), t[r].anchor, t[r].head, "+input");
                t = e.listSelections();
                for (var n = 0; n < t.length; n++) e.indentLine(t[n].from().line, null, !0);
                On(e)
            })
        },
        openLine: function(e) {
            return e.replaceSelection("\n", "start")
        },
        toggleOverwrite: function(e) {
            return e.toggleOverwrite()
        }
    };

    function Qo(e, t) {
        var r = Xe(e.doc, t),
            n = Rt(r);
        return n != r && (t = qe(n)), qo(!0, e, n, t, 1)
    }

    function Jo(e, t) {
        var r = Qo(e, t.line),
            n = Xe(e.doc, r.line),
            i = ce(n, e.doc.direction);
        if (!i || 0 == i[0].level) {
            var o = Math.max(r.ch, n.text.search(/\S/)),
                l = t.line == r.line && t.ch <= o && t.ch;
            return et(r.line, l ? 0 : o, r.sticky)
        }
        return r
    }

    function el(e, t, r) {
        if ("string" == typeof t && !(t = Zo[t])) return !1;
        e.display.input.ensurePolled();
        var n = e.display.shift,
            i = !1;
        try {
            e.isReadOnly() && (e.state.suppressEdits = !0), r && (e.display.shift = !1), i = t(e) != U
        } finally {
            e.display.shift = n, e.state.suppressEdits = !1
        }
        return i
    }

    var tl = new z;

    function rl(e, t, r, n) {
        var i = e.state.keySeq;
        if (i) {
            if (Vo(t)) return "handled";
            if (/\'$/.test(t) ? e.state.keySeq = null : tl.set(50, function() {
                e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset())
            }), nl(e, i + " " + t, r, n)) return !0
        }
        return nl(e, t, r, n)
    }

    function nl(e, t, r, n) {
        var i = function(e, t, r) {
            for (var n = 0; n < e.state.keyMaps.length; n++) {
                var i = Uo(t, e.state.keyMaps[n], r, e);
                if (i) return i
            }
            return e.options.extraKeys && Uo(t, e.options.extraKeys, r, e) || Uo(t, e.options.keyMap, r, e)
        }(e, t, n);
        return "multi" == i && (e.state.keySeq = t), "handled" == i && sr(e, "keyHandled", e, t, r), "handled" != i && "multi" != i || (we(r), bn(e)), !!i
    }

    function il(e, t) {
        var r = jo(t, !0);
        return !!r && (t.shiftKey && !e.state.keySeq ? rl(e, "Shift-" + r, t, function(t) {
            return el(e, t, !0)
        }) || rl(e, r, t, function(t) {
            if ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) return el(e, t)
        }) : rl(e, r, t, function(t) {
            return el(e, t)
        }))
    }

    var ol = null;

    function ll(e) {
        var t = this;
        if (!(e.target && e.target != t.display.input.getField() || (t.curOp.focus = W(), ve(t, e)))) {
            l && s < 11 && 27 == e.keyCode && (e.returnValue = !1);
            var n = e.keyCode;
            t.display.shift = 16 == n || e.shiftKey;
            var i = il(t, e);
            h && (ol = i ? n : null, !i && 88 == n && !Fe && (y ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")), r && !y && !i && 46 == n && e.shiftKey && !e.ctrlKey && document.execCommand && document.execCommand("cut"), 18 != n || /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) || function(e) {
                var t = e.display.lineDiv;

                function r(e) {
                    18 != e.keyCode && e.altKey || (T(t, "CodeMirror-crosshair"), pe(document, "keyup", r), pe(document, "mouseover", r))
                }

                H(t, "CodeMirror-crosshair"), fe(document, "keyup", r), fe(document, "mouseover", r)
            }(t)
        }
    }

    function sl(e) {
        16 == e.keyCode && (this.doc.sel.shift = !1), ve(this, e)
    }

    function al(e) {
        var t = this;
        if (!(e.target && e.target != t.display.input.getField() || xr(t.display, e) || ve(t, e) || e.ctrlKey && !e.altKey || y && e.metaKey)) {
            var r = e.keyCode,
                n = e.charCode;
            if (h && r == ol) return ol = null, void we(e);
            if (!h || e.which && !(e.which < 10) || !il(t, e)) {
                var i = String.fromCharCode(null == n ? r : n);
                "\b" != i && (function(e, t, r) {
                    return rl(e, "'" + r + "'", t, function(t) {
                        return el(e, t, !0)
                    })
                }(t, e, i) || t.display.input.onKeyPress(e))
            }
        }
    }

    var ul, cl, hl = function(e, t, r) {
        this.time = e, this.pos = t, this.button = r
    };

    function fl(e) {
        var t = this,
            r = t.display;
        if (!(ve(t, e) || r.activeTouch && r.input.supportsTouch()))
            if (r.input.ensurePolled(), r.shift = e.shiftKey, xr(r, e)) a || (r.scroller.draggable = !1, setTimeout(function() {
                return r.scroller.draggable = !0
            }, 100));
            else if (!gl(t, e)) {
                var n = sn(t, e),
                    i = ke(e),
                    o = n ? function(e, t) {
                        var r = +new Date;
                        return cl && cl.compare(r, e, t) ? (ul = cl = null, "triple") : ul && ul.compare(r, e, t) ? (cl = new hl(r, e, t), ul = null, "double") : (ul = new hl(r, e, t), cl = null, "single")
                    }(n, i) : "single";
                window.focus(), 1 == i && t.state.selectingText && t.state.selectingText(e), n && function(e, t, r, n, i) {
                    var o = "Click";
                    "double" == n ? o = "Double" + o : "triple" == n && (o = "Triple" + o);
                    return rl(e, Ko(o = (1 == t ? "Left" : 2 == t ? "Middle" : "Right") + o, i), i, function(t) {
                        if ("string" == typeof t && (t = Zo[t]), !t) return !1;
                        var n = !1;
                        try {
                            e.isReadOnly() && (e.state.suppressEdits = !0), n = t(e, r) != U
                        } finally {
                            e.state.suppressEdits = !1
                        }
                        return n
                    })
                }(t, i, n, o, e) || (1 == i ? n ? function(e, t, r, n) {
                    l ? setTimeout(E(wn, e), 0) : e.curOp.focus = W();
                    var i, o = function(e, t, r) {
                            var n = e.getOption("configureMouse"),
                                i = n ? n(e, t, r) : {};
                            if (null == i.unit) {
                                var o = b ? r.shiftKey && r.metaKey : r.altKey;
                                i.unit = o ? "rectangle" : "single" == t ? "char" : "double" == t ? "word" : "line"
                            }
                            (null == i.extend || e.doc.extend) && (i.extend = e.doc.extend || r.shiftKey);
                            null == i.addNew && (i.addNew = y ? r.metaKey : r.ctrlKey);
                            null == i.moveOnDrag && (i.moveOnDrag = !(y ? r.altKey : r.ctrlKey));
                            return i
                        }(e, r, n),
                        u = e.doc.sel;
                    e.options.dragDrop && Ne && !e.isReadOnly() && "single" == r && (i = u.contains(t)) > -1 && (tt((i = u.ranges[i]).from(), t) < 0 || t.xRel > 0) && (tt(i.to(), t) > 0 || t.xRel < 0) ? function(e, t, r, n) {
                        var i = e.display,
                            o = !1,
                            u = Zn(e, function(t) {
                                a && (i.scroller.draggable = !1), e.state.draggingText = !1, e.state.delayingBlurEvent && (e.hasFocus() ? e.state.delayingBlurEvent = !1 : xn(e)), pe(i.wrapper.ownerDocument, "mouseup", u), pe(i.wrapper.ownerDocument, "mousemove", c), pe(i.scroller, "dragstart", h), pe(i.scroller, "drop", u), o || (we(t), n.addNew || Ki(e.doc, r, null, null, n.extend), a && !f || l && 9 == s ? setTimeout(function() {
                                    i.wrapper.ownerDocument.body.focus({
                                        preventScroll: !0
                                    }), i.input.focus()
                                }, 20) : i.input.focus())
                            }),
                            c = function(e) {
                                o = o || Math.abs(t.clientX - e.clientX) + Math.abs(t.clientY - e.clientY) >= 10
                            },
                            h = function() {
                                return o = !0
                            };
                        a && (i.scroller.draggable = !0);
                        e.state.draggingText = u, u.copy = !n.moveOnDrag, fe(i.wrapper.ownerDocument, "mouseup", u), fe(i.wrapper.ownerDocument, "mousemove", c), fe(i.scroller, "dragstart", h), fe(i.scroller, "drop", u), e.state.delayingBlurEvent = !0, setTimeout(function() {
                            return i.input.focus()
                        }, 20), i.scroller.dragDrop && i.scroller.dragDrop()
                    }(e, n, t, o) : function(e, t, r, n) {
                        l && xn(e);
                        var i = e.display,
                            o = e.doc;
                        we(t);
                        var s, a, u = o.sel,
                            c = u.ranges;
                        n.addNew && !n.extend ? (a = o.sel.contains(r), s = a > -1 ? c[a] : new bi(r, r)) : (s = o.sel.primary(), a = o.sel.primIndex);
                        if ("rectangle" == n.unit) n.addNew || (s = new bi(r, r)), r = sn(e, t, !0, !0), a = -1;
                        else {
                            var h = dl(e, r, n.unit);
                            s = n.extend ? Vi(s, h.anchor, h.head, n.extend) : h
                        }
                        n.addNew ? -1 == a ? (a = c.length, $i(o, wi(e, c.concat([s]), a), {
                            scroll: !1,
                            origin: "*mouse"
                        })) : c.length > 1 && c[a].empty() && "char" == n.unit && !n.extend ? ($i(o, wi(e, c.slice(0, a).concat(c.slice(a + 1)), 0), {
                            scroll: !1,
                            origin: "*mouse"
                        }), u = o.sel) : Xi(o, a, s, K) : (a = 0, $i(o, new yi([s], 0), K), u = o.sel);
                        var f = r;

                        function d(t) {
                            if (0 != tt(f, t))
                                if (f = t, "rectangle" == n.unit) {
                                    for (var i = [], l = e.options.tabSize, c = R(Xe(o, r.line).text, r.ch, l), h = R(Xe(o, t.line).text, t.ch, l), d = Math.min(c, h), p = Math.max(c, h), g = Math.min(r.line, t.line), v = Math.min(e.lastLine(), Math.max(r.line, t.line)); g <= v; g++) {
                                        var m = Xe(o, g).text,
                                            y = X(m, d, l);
                                        d == p ? i.push(new bi(et(g, y), et(g, y))) : m.length > y && i.push(new bi(et(g, y), et(g, X(m, p, l))))
                                    }
                                    i.length || i.push(new bi(r, r)), $i(o, wi(e, u.ranges.slice(0, a).concat(i), a), {
                                        origin: "*mouse",
                                        scroll: !1
                                    }), e.scrollIntoView(t)
                                } else {
                                    var b, w = s,
                                        x = dl(e, t, n.unit),
                                        C = w.anchor;
                                    tt(x.anchor, C) > 0 ? (b = x.head, C = ot(w.from(), x.anchor)) : (b = x.anchor, C = it(w.to(), x.head));
                                    var S = u.ranges.slice(0);
                                    S[a] = function(e, t) {
                                        var r = t.anchor,
                                            n = t.head,
                                            i = Xe(e.doc, r.line);
                                        if (0 == tt(r, n) && r.sticky == n.sticky) return t;
                                        var o = ce(i);
                                        if (!o) return t;
                                        var l = ae(o, r.ch, r.sticky),
                                            s = o[l];
                                        if (s.from != r.ch && s.to != r.ch) return t;
                                        var a, u = l + (s.from == r.ch == (1 != s.level) ? 0 : 1);
                                        if (0 == u || u == o.length) return t;
                                        if (n.line != r.line) a = (n.line - r.line) * ("ltr" == e.doc.direction ? 1 : -1) > 0;
                                        else {
                                            var c = ae(o, n.ch, n.sticky),
                                                h = c - l || (n.ch - r.ch) * (1 == s.level ? -1 : 1);
                                            a = c == u - 1 || c == u ? h < 0 : h > 0
                                        }
                                        var f = o[u + (a ? -1 : 0)],
                                            d = a == (1 == f.level),
                                            p = d ? f.from : f.to,
                                            g = d ? "after" : "before";
                                        return r.ch == p && r.sticky == g ? t : new bi(new et(r.line, p, g), n)
                                    }(e, new bi(st(o, C), b)), $i(o, wi(e, S, a), K)
                                }
                        }

                        var p = i.wrapper.getBoundingClientRect(),
                            g = 0;

                        function v(t) {
                            e.state.selectingText = !1, g = 1 / 0, t && (we(t), i.input.focus()), pe(i.wrapper.ownerDocument, "mousemove", m), pe(i.wrapper.ownerDocument, "mouseup", y), o.history.lastSelOrigin = null
                        }

                        var m = Zn(e, function(t) {
                                0 !== t.buttons && ke(t) ? function t(r) {
                                    var l = ++g;
                                    var s = sn(e, r, !0, "rectangle" == n.unit);
                                    if (!s) return;
                                    if (0 != tt(s, f)) {
                                        e.curOp.focus = W(), d(s);
                                        var a = Tn(i, o);
                                        (s.line >= a.to || s.line < a.from) && setTimeout(Zn(e, function() {
                                            g == l && t(r)
                                        }), 150)
                                    } else {
                                        var u = r.clientY < p.top ? -20 : r.clientY > p.bottom ? 20 : 0;
                                        u && setTimeout(Zn(e, function() {
                                            g == l && (i.scroller.scrollTop += u, t(r))
                                        }), 50)
                                    }
                                }(t) : v(t)
                            }),
                            y = Zn(e, v);
                        e.state.selectingText = y, fe(i.wrapper.ownerDocument, "mousemove", m), fe(i.wrapper.ownerDocument, "mouseup", y)
                    }(e, n, t, o)
                }(t, n, o, e) : Le(e) == r.scroller && we(e) : 2 == i ? (n && Ki(t.doc, n), setTimeout(function() {
                    return r.input.focus()
                }, 20)) : 3 == i && (S ? t.display.input.onContextMenu(e) : xn(t)))
            }
    }

    function dl(e, t, r) {
        if ("char" == r) return new bi(t, t);
        if ("word" == r) return e.findWordAt(t);
        if ("line" == r) return new bi(et(t.line, 0), st(e.doc, et(t.line + 1, 0)));
        var n = r(e, t);
        return new bi(n.from, n.to)
    }

    function pl(e, t, r, n) {
        var i, o;
        if (t.touches) i = t.touches[0].clientX, o = t.touches[0].clientY;
        else try {
            i = t.clientX, o = t.clientY
        } catch (e) {
            return !1
        }
        if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right)) return !1;
        n && we(t);
        var l = e.display,
            s = l.lineDiv.getBoundingClientRect();
        if (o > s.bottom || !ye(e, r)) return Ce(t);
        o -= s.top - l.viewOffset;
        for (var a = 0; a < e.display.gutterSpecs.length; ++a) {
            var u = l.gutters.childNodes[a];
            if (u && u.getBoundingClientRect().right >= i) return ge(e, r, e, Ze(e.doc, o), e.display.gutterSpecs[a].className, t), Ce(t)
        }
    }

    function gl(e, t) {
        return pl(e, t, "gutterClick", !0)
    }

    function vl(e, t) {
        xr(e.display, t) || function(e, t) {
            if (!ye(e, "gutterContextMenu")) return !1;
            return pl(e, t, "gutterContextMenu", !1)
        }(e, t) || ve(e, t, "contextmenu") || S || e.display.input.onContextMenu(t)
    }

    function ml(e) {
        e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), zr(e)
    }

    hl.prototype.compare = function(e, t, r) {
        return this.time + 400 > e && 0 == tt(t, this.pos) && r == this.button
    };
    var yl = {
            toString: function() {
                return "CodeMirror.Init"
            }
        },
        bl = {},
        wl = {};

    function xl(e, t, r) {
        if (!t != !(r && r != yl)) {
            var n = e.display.dragFunctions,
                i = t ? fe : pe;
            i(e.display.scroller, "dragstart", n.start), i(e.display.scroller, "dragenter", n.enter), i(e.display.scroller, "dragover", n.over), i(e.display.scroller, "dragleave", n.leave), i(e.display.scroller, "drop", n.drop)
        }
    }

    function Cl(e) {
        e.options.lineWrapping ? (H(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (T(e.display.wrapper, "CodeMirror-wrap"), jt(e)), ln(e), un(e), zr(e), setTimeout(function() {
            return zn(e)
        }, 100)
    }

    function Sl(e, t) {
        var n = this;
        if (!(this instanceof Sl)) return new Sl(e, t);
        this.options = t = t ? I(t) : {}, I(bl, t, !1);
        var i = t.value;
        "string" == typeof i ? i = new Mo(i, t.mode, null, t.lineSeparator, t.direction) : t.mode && (i.modeOption = t.mode), this.doc = i;
        var o = new Sl.inputStyles[t.inputStyle](this),
            u = this.display = new function(e, t, n, i) {
                var o = this;
                this.input = n, o.scrollbarFiller = O("div", null, "CodeMirror-scrollbar-filler"), o.scrollbarFiller.setAttribute("cm-not-content", "true"), o.gutterFiller = O("div", null, "CodeMirror-gutter-filler"), o.gutterFiller.setAttribute("cm-not-content", "true"), o.lineDiv = A("div", null, "CodeMirror-code"), o.selectionDiv = O("div", null, null, "position: relative; z-index: 1"), o.cursorDiv = O("div", null, "CodeMirror-cursors"), o.measure = O("div", null, "CodeMirror-measure"), o.lineMeasure = O("div", null, "CodeMirror-measure"), o.lineSpace = A("div", [o.measure, o.lineMeasure, o.selectionDiv, o.cursorDiv, o.lineDiv], null, "position: relative; outline: none");
                var u = A("div", [o.lineSpace], "CodeMirror-lines");
                o.mover = O("div", [u], null, "position: relative"), o.sizer = O("div", [o.mover], "CodeMirror-sizer"), o.sizerWidth = null, o.heightForcer = O("div", null, null, "position: absolute; height: " + G + "px; width: 1px;"), o.gutters = O("div", null, "CodeMirror-gutters"), o.lineGutter = null, o.scroller = O("div", [o.sizer, o.heightForcer, o.gutters], "CodeMirror-scroll"), o.scroller.setAttribute("tabIndex", "-1"), o.wrapper = O("div", [o.scrollbarFiller, o.gutterFiller, o.scroller], "CodeMirror"), l && s < 8 && (o.gutters.style.zIndex = -1, o.scroller.style.paddingRight = 0), a || r && m || (o.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(o.wrapper) : e(o.wrapper)), o.viewFrom = o.viewTo = t.first, o.reportedViewFrom = o.reportedViewTo = t.first, o.view = [], o.renderedView = null, o.externalMeasured = null, o.viewOffset = 0, o.lastWrapHeight = o.lastWrapWidth = 0, o.updateLineNumbers = null, o.nativeBarWidth = o.barHeight = o.barWidth = 0, o.scrollbarsClipped = !1, o.lineNumWidth = o.lineNumInnerWidth = o.lineNumChars = null, o.alignWidgets = !1, o.cachedCharWidth = o.cachedTextHeight = o.cachedPaddingH = null, o.maxLine = null, o.maxLineLength = 0, o.maxLineChanged = !1, o.wheelDX = o.wheelDY = o.wheelStartX = o.wheelStartY = null, o.shift = !1, o.selForContextMenu = null, o.activeTouch = null, o.gutterSpecs = ci(i.gutters, i.lineNumbers), hi(o), n.init(o)
            }(e, i, o, t);
        for (var c in u.wrapper.CodeMirror = this, ml(this), t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), Un(this), this.state = {
            keyMaps: [],
            overlays: [],
            modeGen: 0,
            overwrite: !1,
            delayingBlurEvent: !1,
            focused: !1,
            suppressEdits: !1,
            pasteIncoming: -1,
            cutIncoming: -1,
            selectingText: !1,
            draggingText: !1,
            highlight: new z,
            keySeq: null,
            specialChars: null
        }, t.autofocus && !m && u.input.focus(), l && s < 11 && setTimeout(function() {
            return n.display.input.reset(!0)
        }, 20),
            function(e) {
                var t = e.display;
                fe(t.scroller, "mousedown", Zn(e, fl)), fe(t.scroller, "dblclick", l && s < 11 ? Zn(e, function(t) {
                    if (!ve(e, t)) {
                        var r = sn(e, t);
                        if (r && !gl(e, t) && !xr(e.display, t)) {
                            we(t);
                            var n = e.findWordAt(r);
                            Ki(e.doc, n.anchor, n.head)
                        }
                    }
                }) : function(t) {
                    return ve(e, t) || we(t)
                });
                fe(t.scroller, "contextmenu", function(t) {
                    return vl(e, t)
                }), fe(t.input.getField(), "contextmenu", function(r) {
                    t.scroller.contains(r.target) || vl(e, r)
                });
                var r, n = {
                    end: 0
                };

                function i() {
                    t.activeTouch && (r = setTimeout(function() {
                        return t.activeTouch = null
                    }, 1e3), (n = t.activeTouch).end = +new Date)
                }

                function o(e, t) {
                    if (null == t.left) return !0;
                    var r = t.left - e.left,
                        n = t.top - e.top;
                    return r * r + n * n > 400
                }

                fe(t.scroller, "touchstart", function(i) {
                    if (!ve(e, i) && ! function(e) {
                        if (1 != e.touches.length) return !1;
                        var t = e.touches[0];
                        return t.radiusX <= 1 && t.radiusY <= 1
                    }(i) && !gl(e, i)) {
                        t.input.ensurePolled(), clearTimeout(r);
                        var o = +new Date;
                        t.activeTouch = {
                            start: o,
                            moved: !1,
                            prev: o - n.end <= 300 ? n : null
                        }, 1 == i.touches.length && (t.activeTouch.left = i.touches[0].pageX, t.activeTouch.top = i.touches[0].pageY)
                    }
                }), fe(t.scroller, "touchmove", function() {
                    t.activeTouch && (t.activeTouch.moved = !0)
                }), fe(t.scroller, "touchend", function(r) {
                    var n = t.activeTouch;
                    if (n && !xr(t, r) && null != n.left && !n.moved && new Date - n.start < 300) {
                        var l, s = e.coordsChar(t.activeTouch, "page");
                        l = !n.prev || o(n, n.prev) ? new bi(s, s) : !n.prev.prev || o(n, n.prev.prev) ? e.findWordAt(s) : new bi(et(s.line, 0), st(e.doc, et(s.line + 1, 0))), e.setSelection(l.anchor, l.head), e.focus(), we(r)
                    }
                    i()
                }), fe(t.scroller, "touchcancel", i), fe(t.scroller, "scroll", function() {
                    t.scroller.clientHeight && (Hn(e, t.scroller.scrollTop), Pn(e, t.scroller.scrollLeft, !0), ge(e, "scroll", e))
                }), fe(t.scroller, "mousewheel", function(t) {
                    return mi(e, t)
                }), fe(t.scroller, "DOMMouseScroll", function(t) {
                    return mi(e, t)
                }), fe(t.wrapper, "scroll", function() {
                    return t.wrapper.scrollTop = t.wrapper.scrollLeft = 0
                }), t.dragFunctions = {
                    enter: function(t) {
                        ve(e, t) || Se(t)
                    },
                    over: function(t) {
                        ve(e, t) || (! function(e, t) {
                            var r = sn(e, t);
                            if (r) {
                                var n = document.createDocumentFragment();
                                vn(e, r, n), e.display.dragCursor || (e.display.dragCursor = O("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), N(e.display.dragCursor, n)
                            }
                        }(e, t), Se(t))
                    },
                    start: function(t) {
                        return function(e, t) {
                            if (l && (!e.state.draggingText || +new Date - No < 100)) Se(t);
                            else if (!ve(e, t) && !xr(e.display, t) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !f)) {
                                var r = O("img", null, null, "position: fixed; left: 0; top: 0;");
                                r.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", h && (r.width = r.height = 1, e.display.wrapper.appendChild(r), r._top = r.offsetTop), t.dataTransfer.setDragImage(r, 0, 0), h && r.parentNode.removeChild(r)
                            }
                        }(e, t)
                    },
                    drop: Zn(e, Oo),
                    leave: function(t) {
                        ve(e, t) || Ao(e)
                    }
                };
                var a = t.input.getField();
                fe(a, "keyup", function(t) {
                    return sl.call(e, t)
                }), fe(a, "keydown", Zn(e, ll)), fe(a, "keypress", Zn(e, al)), fe(a, "focus", function(t) {
                    return Cn(e, t)
                }), fe(a, "blur", function(t) {
                    return Sn(e, t)
                })
            }(this), Ho(), Kn(this), this.curOp.forceUpdate = !0, Di(this, i), t.autofocus && !m || this.hasFocus() ? setTimeout(function() {
            n.hasFocus() && !n.state.focused && Cn(n)
        }, 20) : Sn(this), wl) wl.hasOwnProperty(c) && wl[c](this, t[c], yl);
        ui(this), t.finishInit && t.finishInit(this);
        for (var d = 0; d < Ll.length; ++d) Ll[d](this);
        jn(this), a && t.lineWrapping && "optimizelegibility" == getComputedStyle(u.lineDiv).textRendering && (u.lineDiv.style.textRendering = "auto")
    }

    Sl.defaults = bl, Sl.optionHandlers = wl;
    var Ll = [];

    function kl(e, t, r, n) {
        var i, o = e.doc;
        null == r && (r = "add"), "smart" == r && (o.mode.indent ? i = dt(e, t).state : r = "prev");
        var l = e.options.tabSize,
            s = Xe(o, t),
            a = R(s.text, null, l);
        s.stateAfter && (s.stateAfter = null);
        var u, c = s.text.match(/^\s*/)[0];
        if (n || /\S/.test(s.text)) {
            if ("smart" == r && ((u = o.mode.indent(i, s.text.slice(c.length), s.text)) == U || u > 150)) {
                if (!n) return;
                r = "prev"
            }
        } else u = 0, r = "not";
        "prev" == r ? u = t > o.first ? R(Xe(o, t - 1).text, null, l) : 0 : "add" == r ? u = a + e.options.indentUnit : "subtract" == r ? u = a - e.options.indentUnit : "number" == typeof r && (u = a + r), u = Math.max(0, u);
        var h = "",
            f = 0;
        if (e.options.indentWithTabs)
            for (var d = Math.floor(u / l); d; --d) f += l, h += "\t";
        if (f < u && (h += _(u - f)), h != c) return co(o, h, et(t, 0), et(t, c.length), "+input"), s.stateAfter = null, !0;
        for (var p = 0; p < o.sel.ranges.length; p++) {
            var g = o.sel.ranges[p];
            if (g.head.line == t && g.head.ch < c.length) {
                var v = et(t, c.length);
                Xi(o, p, new bi(v, v));
                break
            }
        }
    }

    Sl.defineInitHook = function(e) {
        return Ll.push(e)
    };
    var Tl = null;

    function Ml(e) {
        Tl = e
    }

    function Nl(e, t, r, n, i) {
        var o = e.doc;
        e.display.shift = !1, n || (n = o.sel);
        var l = +new Date - 200,
            s = "paste" == i || e.state.pasteIncoming > l,
            a = We(t),
            u = null;
        if (s && n.ranges.length > 1)
            if (Tl && Tl.text.join("\n") == t) {
                if (n.ranges.length % Tl.text.length == 0) {
                    u = [];
                    for (var c = 0; c < Tl.text.length; c++) u.push(o.splitLines(Tl.text[c]))
                }
            } else a.length == n.ranges.length && e.options.pasteLinesPerSelection && (u = q(a, function(e) {
                return [e]
            }));
        for (var h = e.curOp.updateInput, f = n.ranges.length - 1; f >= 0; f--) {
            var d = n.ranges[f],
                p = d.from(),
                g = d.to();
            d.empty() && (r && r > 0 ? p = et(p.line, p.ch - r) : e.state.overwrite && !s ? g = et(g.line, Math.min(Xe(o, g.line).text.length, g.ch + $(a).length)) : s && Tl && Tl.lineWise && Tl.text.join("\n") == a.join("\n") && (p = g = et(p.line, 0)));
            var v = {
                from: p,
                to: g,
                text: u ? u[f % u.length] : a,
                origin: i || (s ? "paste" : e.state.cutIncoming > l ? "cut" : "+input")
            };
            oo(e.doc, v), sr(e, "inputRead", e, v)
        }
        t && !s && Al(e, t), On(e), e.curOp.updateInput < 2 && (e.curOp.updateInput = h), e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = -1
    }

    function Ol(e, t) {
        var r = e.clipboardData && e.clipboardData.getData("Text");
        if (r) return e.preventDefault(), t.isReadOnly() || t.options.disableInput || qn(t, function() {
            return Nl(t, r, 0, null, "paste")
        }), !0
    }

    function Al(e, t) {
        if (e.options.electricChars && e.options.smartIndent)
            for (var r = e.doc.sel, n = r.ranges.length - 1; n >= 0; n--) {
                var i = r.ranges[n];
                if (!(i.head.ch > 100 || n && r.ranges[n - 1].head.line == i.head.line)) {
                    var o = e.getModeAt(i.head),
                        l = !1;
                    if (o.electricChars) {
                        for (var s = 0; s < o.electricChars.length; s++)
                            if (t.indexOf(o.electricChars.charAt(s)) > -1) {
                                l = kl(e, i.head.line, "smart");
                                break
                            }
                    } else o.electricInput && o.electricInput.test(Xe(e.doc, i.head.line).text.slice(0, i.head.ch)) && (l = kl(e, i.head.line, "smart"));
                    l && sr(e, "electricInput", e, i.head.line)
                }
            }
    }

    function Dl(e) {
        for (var t = [], r = [], n = 0; n < e.doc.sel.ranges.length; n++) {
            var i = e.doc.sel.ranges[n].head.line,
                o = {
                    anchor: et(i, 0),
                    head: et(i + 1, 0)
                };
            r.push(o), t.push(e.getRange(o.anchor, o.head))
        }
        return {
            text: t,
            ranges: r
        }
    }

    function Wl(e, t, r, n) {
        e.setAttribute("autocorrect", r ? "" : "off"), e.setAttribute("autocapitalize", n ? "" : "off"), e.setAttribute("spellcheck", !!t)
    }

    function Hl() {
        var e = O("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"),
            t = O("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        return a ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), g && (e.style.border = "1px solid black"), Wl(e), t
    }

    function Fl(e, t, r, n, i) {
        var o = t,
            l = r,
            s = Xe(e, t.line),
            a = i && "rtl" == e.direction ? -r : r;

        function u(o) {
            var l, u;
            if ("codepoint" == n) {
                var c = s.text.charCodeAt(t.ch + (r > 0 ? 0 : -1));
                if (isNaN(c)) l = null;
                else {
                    var h = r > 0 ? c >= 55296 && c < 56320 : c >= 56320 && c < 57343;
                    l = new et(t.line, Math.max(0, Math.min(s.text.length, t.ch + r * (h ? 2 : 1))), -r)
                }
            } else l = i ? function(e, t, r, n) {
                var i = ce(t, e.doc.direction);
                if (!i) return $o(t, r, n);
                r.ch >= t.text.length ? (r.ch = t.text.length, r.sticky = "before") : r.ch <= 0 && (r.ch = 0, r.sticky = "after");
                var o = ae(i, r.ch, r.sticky),
                    l = i[o];
                if ("ltr" == e.doc.direction && l.level % 2 == 0 && (n > 0 ? l.to > r.ch : l.from < r.ch)) return $o(t, r, n);
                var s, a = function(e, r) {
                        return _o(t, e instanceof et ? e.ch : e, r)
                    },
                    u = function(r) {
                        return e.options.lineWrapping ? (s = s || Dr(e, t), Zr(e, t, s, r)) : {
                            begin: 0,
                            end: t.text.length
                        }
                    },
                    c = u("before" == r.sticky ? a(r, -1) : r.ch);
                if ("rtl" == e.doc.direction || 1 == l.level) {
                    var h = 1 == l.level == n < 0,
                        f = a(r, h ? 1 : -1);
                    if (null != f && (h ? f <= l.to && f <= c.end : f >= l.from && f >= c.begin)) {
                        var d = h ? "before" : "after";
                        return new et(r.line, f, d)
                    }
                }
                var p = function(e, t, n) {
                        for (var o = function(e, t) {
                            return t ? new et(r.line, a(e, 1), "before") : new et(r.line, e, "after")
                        }; e >= 0 && e < i.length; e += t) {
                            var l = i[e],
                                s = t > 0 == (1 != l.level),
                                u = s ? n.begin : a(n.end, -1);
                            if (l.from <= u && u < l.to) return o(u, s);
                            if (u = s ? l.from : a(l.to, -1), n.begin <= u && u < n.end) return o(u, s)
                        }
                    },
                    g = p(o + n, n, c);
                if (g) return g;
                var v = n > 0 ? c.end : a(c.begin, -1);
                return null == v || n > 0 && v == t.text.length || !(g = p(n > 0 ? 0 : i.length - 1, n, u(v))) ? null : g
            }(e.cm, s, t, r) : $o(s, t, r);
            if (null == l) {
                if (o || (u = t.line + a) < e.first || u >= e.first + e.size || (t = new et(u, t.ch, t.sticky), !(s = Xe(e, u)))) return !1;
                t = qo(i, e.cm, s, t.line, a)
            } else t = l;
            return !0
        }

        if ("char" == n || "codepoint" == n) u();
        else if ("column" == n) u(!0);
        else if ("word" == n || "group" == n)
            for (var c = null, h = "group" == n, f = e.cm && e.cm.getHelper(t, "wordChars"), d = !0; !(r < 0) || u(!d); d = !1) {
                var p = s.text.charAt(t.ch) || "\n",
                    g = te(p, f) ? "w" : h && "\n" == p ? "n" : !h || /\s/.test(p) ? null : "p";
                if (!h || d || g || (g = "s"), c && c != g) {
                    r < 0 && (r = 1, u(), t.sticky = "after");
                    break
                }
                if (g && (c = g), r > 0 && !u(!d)) break
            }
        var v = to(e, t, o, l, !0);
        return rt(o, v) && (v.hitSide = !0), v
    }

    function Pl(e, t, r, n) {
        var i, o, l = e.doc,
            s = t.left;
        if ("page" == n) {
            var a = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight),
                u = Math.max(a - .5 * en(e.display), 3);
            i = (r > 0 ? t.bottom : t.top) + r * u
        } else "line" == n && (i = r > 0 ? t.bottom + 3 : t.top - 3);
        for (;
            (o = $r(e, s, i)).outside;) {
            if (r < 0 ? i <= 0 : i >= l.height) {
                o.hitSide = !0;
                break
            }
            i += 5 * r
        }
        return o
    }

    var El = function(e) {
        this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new z, this.composing = null, this.gracePeriod = !1, this.readDOMTimeout = null
    };

    function Il(e, t) {
        var r = Ar(e, t.line);
        if (!r || r.hidden) return null;
        var n = Xe(e.doc, t.line),
            i = Nr(r, n, t.line),
            o = ce(n, e.doc.direction),
            l = "left";
        o && (l = ae(o, t.ch) % 2 ? "right" : "left");
        var s = Pr(i.map, t.ch, l);
        return s.offset = "right" == s.collapse ? s.end : s.start, s
    }

    function Rl(e, t) {
        return t && (e.bad = !0), e
    }

    function zl(e, t, r) {
        var n;
        if (t == e.display.lineDiv) {
            if (!(n = e.display.lineDiv.childNodes[r])) return Rl(e.clipPos(et(e.display.viewTo - 1)), !0);
            t = null, r = 0
        } else
            for (n = t;; n = n.parentNode) {
                if (!n || n == e.display.lineDiv) return null;
                if (n.parentNode && n.parentNode == e.display.lineDiv) break
            }
        for (var i = 0; i < e.display.view.length; i++) {
            var o = e.display.view[i];
            if (o.node == n) return Bl(o, t, r)
        }
    }

    function Bl(e, t, r) {
        var n = e.text.firstChild,
            i = !1;
        if (!t || !D(n, t)) return Rl(et(qe(e.line), 0), !0);
        if (t == n && (i = !0, t = n.childNodes[r], r = 0, !t)) {
            var o = e.rest ? $(e.rest) : e.line;
            return Rl(et(qe(o), o.text.length), i)
        }
        var l = 3 == t.nodeType ? t : null,
            s = t;
        for (l || 1 != t.childNodes.length || 3 != t.firstChild.nodeType || (l = t.firstChild, r && (r = l.nodeValue.length)); s.parentNode != n;) s = s.parentNode;
        var a = e.measure,
            u = a.maps;

        function c(t, r, n) {
            for (var i = -1; i < (u ? u.length : 0); i++)
                for (var o = i < 0 ? a.map : u[i], l = 0; l < o.length; l += 3) {
                    var s = o[l + 2];
                    if (s == t || s == r) {
                        var c = qe(i < 0 ? e.line : e.rest[i]),
                            h = o[l] + n;
                        return (n < 0 || s != t) && (h = o[l + (n ? 1 : 0)]), et(c, h)
                    }
                }
        }

        var h = c(l, s, r);
        if (h) return Rl(h, i);
        for (var f = s.nextSibling, d = l ? l.nodeValue.length - r : 0; f; f = f.nextSibling) {
            if (h = c(f, f.firstChild, 0)) return Rl(et(h.line, h.ch - d), i);
            d += f.textContent.length
        }
        for (var p = s.previousSibling, g = r; p; p = p.previousSibling) {
            if (h = c(p, p.firstChild, -1)) return Rl(et(h.line, h.ch + g), i);
            g += p.textContent.length
        }
    }

    El.prototype.init = function(e) {
        var t = this,
            r = this,
            n = r.cm,
            i = r.div = e.lineDiv;

        function o(e) {
            for (var t = e.target; t; t = t.parentNode) {
                if (t == i) return !0;
                if (/\bCodeMirror-(?:line)?widget\b/.test(t.className)) break
            }
            return !1
        }

        function l(e) {
            if (o(e) && !ve(n, e)) {
                if (n.somethingSelected()) Ml({
                    lineWise: !1,
                    text: n.getSelections()
                }), "cut" == e.type && n.replaceSelection("", null, "cut");
                else {
                    if (!n.options.lineWiseCopyCut) return;
                    var t = Dl(n);
                    Ml({
                        lineWise: !0,
                        text: t.text
                    }), "cut" == e.type && n.operation(function() {
                        n.setSelections(t.ranges, 0, V), n.replaceSelection("", null, "cut")
                    })
                }
                if (e.clipboardData) {
                    e.clipboardData.clearData();
                    var l = Tl.text.join("\n");
                    if (e.clipboardData.setData("Text", l), e.clipboardData.getData("Text") == l) return void e.preventDefault()
                }
                var s = Hl(),
                    a = s.firstChild;
                n.display.lineSpace.insertBefore(s, n.display.lineSpace.firstChild), a.value = Tl.text.join("\n");
                var u = document.activeElement;
                P(a), setTimeout(function() {
                    n.display.lineSpace.removeChild(s), u.focus(), u == i && r.showPrimarySelection()
                }, 50)
            }
        }

        Wl(i, n.options.spellcheck, n.options.autocorrect, n.options.autocapitalize), fe(i, "paste", function(e) {
            !o(e) || ve(n, e) || Ol(e, n) || s <= 11 && setTimeout(Zn(n, function() {
                return t.updateFromDOM()
            }), 20)
        }), fe(i, "compositionstart", function(e) {
            t.composing = {
                data: e.data,
                done: !1
            }
        }), fe(i, "compositionupdate", function(e) {
            t.composing || (t.composing = {
                data: e.data,
                done: !1
            })
        }), fe(i, "compositionend", function(e) {
            t.composing && (e.data != t.composing.data && t.readFromDOMSoon(), t.composing.done = !0)
        }), fe(i, "touchstart", function() {
            return r.forceCompositionEnd()
        }), fe(i, "input", function() {
            t.composing || t.readFromDOMSoon()
        }), fe(i, "copy", l), fe(i, "cut", l)
    }, El.prototype.screenReaderLabelChanged = function(e) {
        e ? this.div.setAttribute("aria-label", e) : this.div.removeAttribute("aria-label")
    }, El.prototype.prepareSelection = function() {
        var e = gn(this.cm, !1);
        return e.focus = document.activeElement == this.div, e
    }, El.prototype.showSelection = function(e, t) {
        e && this.cm.display.view.length && ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e))
    }, El.prototype.getSelection = function() {
        return this.cm.display.wrapper.ownerDocument.getSelection()
    }, El.prototype.showPrimarySelection = function() {
        var e = this.getSelection(),
            t = this.cm,
            n = t.doc.sel.primary(),
            i = n.from(),
            o = n.to();
        if (t.display.viewTo == t.display.viewFrom || i.line >= t.display.viewTo || o.line < t.display.viewFrom) e.removeAllRanges();
        else {
            var l = zl(t, e.anchorNode, e.anchorOffset),
                s = zl(t, e.focusNode, e.focusOffset);
            if (!l || l.bad || !s || s.bad || 0 != tt(ot(l, s), i) || 0 != tt(it(l, s), o)) {
                var a = t.display.view,
                    u = i.line >= t.display.viewFrom && Il(t, i) || {
                        node: a[0].measure.map[2],
                        offset: 0
                    },
                    c = o.line < t.display.viewTo && Il(t, o);
                if (!c) {
                    var h = a[a.length - 1].measure,
                        f = h.maps ? h.maps[h.maps.length - 1] : h.map;
                    c = {
                        node: f[f.length - 1],
                        offset: f[f.length - 2] - f[f.length - 3]
                    }
                }
                if (u && c) {
                    var d, p = e.rangeCount && e.getRangeAt(0);
                    try {
                        d = k(u.node, u.offset, c.offset, c.node)
                    } catch (e) {}
                    d && (!r && t.state.focused ? (e.collapse(u.node, u.offset), d.collapsed || (e.removeAllRanges(), e.addRange(d))) : (e.removeAllRanges(), e.addRange(d)), p && null == e.anchorNode ? e.addRange(p) : r && this.startGracePeriod()), this.rememberSelection()
                } else e.removeAllRanges()
            }
        }
    }, El.prototype.startGracePeriod = function() {
        var e = this;
        clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function() {
            e.gracePeriod = !1, e.selectionChanged() && e.cm.operation(function() {
                return e.cm.curOp.selectionChanged = !0
            })
        }, 20)
    }, El.prototype.showMultipleSelections = function(e) {
        N(this.cm.display.cursorDiv, e.cursors), N(this.cm.display.selectionDiv, e.selection)
    }, El.prototype.rememberSelection = function() {
        var e = this.getSelection();
        this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset
    }, El.prototype.selectionInEditor = function() {
        var e = this.getSelection();
        if (!e.rangeCount) return !1;
        var t = e.getRangeAt(0).commonAncestorContainer;
        return D(this.div, t)
    }, El.prototype.focus = function() {
        "nocursor" != this.cm.options.readOnly && (this.selectionInEditor() && document.activeElement == this.div || this.showSelection(this.prepareSelection(), !0), this.div.focus())
    }, El.prototype.blur = function() {
        this.div.blur()
    }, El.prototype.getField = function() {
        return this.div
    }, El.prototype.supportsTouch = function() {
        return !0
    }, El.prototype.receivedFocus = function() {
        var e = this;
        this.selectionInEditor() ? this.pollSelection() : qn(this.cm, function() {
            return e.cm.curOp.selectionChanged = !0
        }), this.polling.set(this.cm.options.pollInterval, function t() {
            e.cm.state.focused && (e.pollSelection(), e.polling.set(e.cm.options.pollInterval, t))
        })
    }, El.prototype.selectionChanged = function() {
        var e = this.getSelection();
        return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset
    }, El.prototype.pollSelection = function() {
        if (null == this.readDOMTimeout && !this.gracePeriod && this.selectionChanged()) {
            var e = this.getSelection(),
                t = this.cm;
            if (v && c && this.cm.display.gutterSpecs.length && function(e) {
                for (var t = e; t; t = t.parentNode)
                    if (/CodeMirror-gutter-wrapper/.test(t.className)) return !0;
                return !1
            }(e.anchorNode)) return this.cm.triggerOnKeyDown({
                type: "keydown",
                keyCode: 8,
                preventDefault: Math.abs
            }), this.blur(), void this.focus();
            if (!this.composing) {
                this.rememberSelection();
                var r = zl(t, e.anchorNode, e.anchorOffset),
                    n = zl(t, e.focusNode, e.focusOffset);
                r && n && qn(t, function() {
                    $i(t.doc, xi(r, n), V), (r.bad || n.bad) && (t.curOp.selectionChanged = !0)
                })
            }
        }
    }, El.prototype.pollContent = function() {
        null != this.readDOMTimeout && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);
        var e, t, r, n = this.cm,
            i = n.display,
            o = n.doc.sel.primary(),
            l = o.from(),
            s = o.to();
        if (0 == l.ch && l.line > n.firstLine() && (l = et(l.line - 1, Xe(n.doc, l.line - 1).length)), s.ch == Xe(n.doc, s.line).text.length && s.line < n.lastLine() && (s = et(s.line + 1, 0)), l.line < i.viewFrom || s.line > i.viewTo - 1) return !1;
        l.line == i.viewFrom || 0 == (e = an(n, l.line)) ? (t = qe(i.view[0].line), r = i.view[0].node) : (t = qe(i.view[e].line), r = i.view[e - 1].node.nextSibling);
        var a, u, c = an(n, s.line);
        if (c == i.view.length - 1 ? (a = i.viewTo - 1, u = i.lineDiv.lastChild) : (a = qe(i.view[c + 1].line) - 1, u = i.view[c + 1].node.previousSibling), !r) return !1;
        for (var h = n.doc.splitLines(function(e, t, r, n, i) {
            var o = "",
                l = !1,
                s = e.doc.lineSeparator(),
                a = !1;

            function u() {
                l && (o += s, a && (o += s), l = a = !1)
            }

            function c(e) {
                e && (u(), o += e)
            }

            function h(t) {
                if (1 == t.nodeType) {
                    var r = t.getAttribute("cm-text");
                    if (r) return void c(r);
                    var o, f = t.getAttribute("cm-marker");
                    if (f) {
                        var d = e.findMarks(et(n, 0), et(i + 1, 0), (v = +f, function(e) {
                            return e.id == v
                        }));
                        return void(d.length && (o = d[0].find(0)) && c(Ye(e.doc, o.from, o.to).join(s)))
                    }
                    if ("false" == t.getAttribute("contenteditable")) return;
                    var p = /^(pre|div|p|li|table|br)$/i.test(t.nodeName);
                    if (!/^br$/i.test(t.nodeName) && 0 == t.textContent.length) return;
                    p && u();
                    for (var g = 0; g < t.childNodes.length; g++) h(t.childNodes[g]);
                    /^(pre|p)$/i.test(t.nodeName) && (a = !0), p && (l = !0)
                } else 3 == t.nodeType && c(t.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
                var v
            }

            for (; h(t), t != r;) t = t.nextSibling, a = !1;
            return o
        }(n, r, u, t, a)), f = Ye(n.doc, et(t, 0), et(a, Xe(n.doc, a).text.length)); h.length > 1 && f.length > 1;)
            if ($(h) == $(f)) h.pop(), f.pop(), a--;
            else {
                if (h[0] != f[0]) break;
                h.shift(), f.shift(), t++
            }
        for (var d = 0, p = 0, g = h[0], v = f[0], m = Math.min(g.length, v.length); d < m && g.charCodeAt(d) == v.charCodeAt(d);) ++d;
        for (var y = $(h), b = $(f), w = Math.min(y.length - (1 == h.length ? d : 0), b.length - (1 == f.length ? d : 0)); p < w && y.charCodeAt(y.length - p - 1) == b.charCodeAt(b.length - p - 1);) ++p;
        if (1 == h.length && 1 == f.length && t == l.line)
            for (; d && d > l.ch && y.charCodeAt(y.length - p - 1) == b.charCodeAt(b.length - p - 1);) d--, p++;
        h[h.length - 1] = y.slice(0, y.length - p).replace(/^\u200b+/, ""), h[0] = h[0].slice(d).replace(/\u200b+$/, "");
        var x = et(t, d),
            C = et(a, f.length ? $(f).length - p : 0);
        return h.length > 1 || h[0] || tt(x, C) ? (co(n.doc, h, x, C, "+input"), !0) : void 0
    }, El.prototype.ensurePolled = function() {
        this.forceCompositionEnd()
    }, El.prototype.reset = function() {
        this.forceCompositionEnd()
    }, El.prototype.forceCompositionEnd = function() {
        this.composing && (clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(), this.div.blur(), this.div.focus())
    }, El.prototype.readFromDOMSoon = function() {
        var e = this;
        null == this.readDOMTimeout && (this.readDOMTimeout = setTimeout(function() {
            if (e.readDOMTimeout = null, e.composing) {
                if (!e.composing.done) return;
                e.composing = null
            }
            e.updateFromDOM()
        }, 80))
    }, El.prototype.updateFromDOM = function() {
        var e = this;
        !this.cm.isReadOnly() && this.pollContent() || qn(this.cm, function() {
            return un(e.cm)
        })
    }, El.prototype.setUneditable = function(e) {
        e.contentEditable = "false"
    }, El.prototype.onKeyPress = function(e) {
        0 == e.charCode || this.composing || (e.preventDefault(), this.cm.isReadOnly() || Zn(this.cm, Nl)(this.cm, String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), 0))
    }, El.prototype.readOnlyChanged = function(e) {
        this.div.contentEditable = String("nocursor" != e)
    }, El.prototype.onContextMenu = function() {}, El.prototype.resetPosition = function() {}, El.prototype.needsContentAttribute = !0;
    var Gl = function(e) {
        this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new z, this.hasSelection = !1, this.composing = null
    };
    Gl.prototype.init = function(e) {
        var t = this,
            r = this,
            n = this.cm;
        this.createField(e);
        var i = this.textarea;

        function o(e) {
            if (!ve(n, e)) {
                if (n.somethingSelected()) Ml({
                    lineWise: !1,
                    text: n.getSelections()
                });
                else {
                    if (!n.options.lineWiseCopyCut) return;
                    var t = Dl(n);
                    Ml({
                        lineWise: !0,
                        text: t.text
                    }), "cut" == e.type ? n.setSelections(t.ranges, null, V) : (r.prevInput = "", i.value = t.text.join("\n"), P(i))
                }
                "cut" == e.type && (n.state.cutIncoming = +new Date)
            }
        }

        e.wrapper.insertBefore(this.wrapper, e.wrapper.firstChild), g && (i.style.width = "0px"), fe(i, "input", function() {
            l && s >= 9 && t.hasSelection && (t.hasSelection = null), r.poll()
        }), fe(i, "paste", function(e) {
            ve(n, e) || Ol(e, n) || (n.state.pasteIncoming = +new Date, r.fastPoll())
        }), fe(i, "cut", o), fe(i, "copy", o), fe(e.scroller, "paste", function(t) {
            if (!xr(e, t) && !ve(n, t)) {
                if (!i.dispatchEvent) return n.state.pasteIncoming = +new Date, void r.focus();
                var o = new Event("paste");
                o.clipboardData = t.clipboardData, i.dispatchEvent(o)
            }
        }), fe(e.lineSpace, "selectstart", function(t) {
            xr(e, t) || we(t)
        }), fe(i, "compositionstart", function() {
            var e = n.getCursor("from");
            r.composing && r.composing.range.clear(), r.composing = {
                start: e,
                range: n.markText(e, n.getCursor("to"), {
                    className: "CodeMirror-composing"
                })
            }
        }), fe(i, "compositionend", function() {
            r.composing && (r.poll(), r.composing.range.clear(), r.composing = null)
        })
    }, Gl.prototype.createField = function(e) {
        this.wrapper = Hl(), this.textarea = this.wrapper.firstChild
    }, Gl.prototype.screenReaderLabelChanged = function(e) {
        e ? this.textarea.setAttribute("aria-label", e) : this.textarea.removeAttribute("aria-label")
    }, Gl.prototype.prepareSelection = function() {
        var e = this.cm,
            t = e.display,
            r = e.doc,
            n = gn(e);
        if (e.options.moveInputWithCursor) {
            var i = Xr(e, r.sel.primary().head, "div"),
                o = t.wrapper.getBoundingClientRect(),
                l = t.lineDiv.getBoundingClientRect();
            n.teTop = Math.max(0, Math.min(t.wrapper.clientHeight - 10, i.top + l.top - o.top)), n.teLeft = Math.max(0, Math.min(t.wrapper.clientWidth - 10, i.left + l.left - o.left))
        }
        return n
    }, Gl.prototype.showSelection = function(e) {
        var t = this.cm.display;
        N(t.cursorDiv, e.cursors), N(t.selectionDiv, e.selection), null != e.teTop && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px")
    }, Gl.prototype.reset = function(e) {
        if (!this.contextMenuPending && !this.composing) {
            var t = this.cm;
            if (t.somethingSelected()) {
                this.prevInput = "";
                var r = t.getSelection();
                this.textarea.value = r, t.state.focused && P(this.textarea), l && s >= 9 && (this.hasSelection = r)
            } else e || (this.prevInput = this.textarea.value = "", l && s >= 9 && (this.hasSelection = null))
        }
    }, Gl.prototype.getField = function() {
        return this.textarea
    }, Gl.prototype.supportsTouch = function() {
        return !1
    }, Gl.prototype.focus = function() {
        if ("nocursor" != this.cm.options.readOnly && (!m || W() != this.textarea)) try {
            this.textarea.focus()
        } catch (e) {}
    }, Gl.prototype.blur = function() {
        this.textarea.blur()
    }, Gl.prototype.resetPosition = function() {
        this.wrapper.style.top = this.wrapper.style.left = 0
    }, Gl.prototype.receivedFocus = function() {
        this.slowPoll()
    }, Gl.prototype.slowPoll = function() {
        var e = this;
        this.pollingFast || this.polling.set(this.cm.options.pollInterval, function() {
            e.poll(), e.cm.state.focused && e.slowPoll()
        })
    }, Gl.prototype.fastPoll = function() {
        var e = !1,
            t = this;
        t.pollingFast = !0, t.polling.set(20, function r() {
            t.poll() || e ? (t.pollingFast = !1, t.slowPoll()) : (e = !0, t.polling.set(60, r))
        })
    }, Gl.prototype.poll = function() {
        var e = this,
            t = this.cm,
            r = this.textarea,
            n = this.prevInput;
        if (this.contextMenuPending || !t.state.focused || He(r) && !n && !this.composing || t.isReadOnly() || t.options.disableInput || t.state.keySeq) return !1;
        var i = r.value;
        if (i == n && !t.somethingSelected()) return !1;
        if (l && s >= 9 && this.hasSelection === i || y && /[\uf700-\uf7ff]/.test(i)) return t.display.input.reset(), !1;
        if (t.doc.sel == t.display.selForContextMenu) {
            var o = i.charCodeAt(0);
            if (8203 != o || n || (n = "​"), 8666 == o) return this.reset(), this.cm.execCommand("undo")
        }
        for (var a = 0, u = Math.min(n.length, i.length); a < u && n.charCodeAt(a) == i.charCodeAt(a);) ++a;
        return qn(t, function() {
            Nl(t, i.slice(a), n.length - a, null, e.composing ? "*compose" : null), i.length > 1e3 || i.indexOf("\n") > -1 ? r.value = e.prevInput = "" : e.prevInput = i, e.composing && (e.composing.range.clear(), e.composing.range = t.markText(e.composing.start, t.getCursor("to"), {
                className: "CodeMirror-composing"
            }))
        }), !0
    }, Gl.prototype.ensurePolled = function() {
        this.pollingFast && this.poll() && (this.pollingFast = !1)
    }, Gl.prototype.onKeyPress = function() {
        l && s >= 9 && (this.hasSelection = null), this.fastPoll()
    }, Gl.prototype.onContextMenu = function(e) {
        var t = this,
            r = t.cm,
            n = r.display,
            i = t.textarea;
        t.contextMenuPending && t.contextMenuPending();
        var o = sn(r, e),
            u = n.scroller.scrollTop;
        if (o && !h) {
            r.options.resetSelectionOnContextMenu && -1 == r.doc.sel.contains(o) && Zn(r, $i)(r.doc, xi(o), V);
            var c, f = i.style.cssText,
                d = t.wrapper.style.cssText,
                p = t.wrapper.offsetParent.getBoundingClientRect();
            if (t.wrapper.style.cssText = "position: static", i.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - p.top - 5) + "px; left: " + (e.clientX - p.left - 5) + "px;\n      z-index: 1000; background: " + (l ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", a && (c = window.scrollY), n.input.focus(), a && window.scrollTo(null, c), n.input.reset(), r.somethingSelected() || (i.value = t.prevInput = " "), t.contextMenuPending = m, n.selForContextMenu = r.doc.sel, clearTimeout(n.detectingSelectAll), l && s >= 9 && v(), S) {
                Se(e);
                var g = function() {
                    pe(window, "mouseup", g), setTimeout(m, 20)
                };
                fe(window, "mouseup", g)
            } else setTimeout(m, 50)
        }

        function v() {
            if (null != i.selectionStart) {
                var e = r.somethingSelected(),
                    o = "​" + (e ? i.value : "");
                i.value = "⇚", i.value = o, t.prevInput = e ? "" : "​", i.selectionStart = 1, i.selectionEnd = o.length, n.selForContextMenu = r.doc.sel
            }
        }

        function m() {
            if (t.contextMenuPending == m && (t.contextMenuPending = !1, t.wrapper.style.cssText = d, i.style.cssText = f, l && s < 9 && n.scrollbars.setScrollTop(n.scroller.scrollTop = u), null != i.selectionStart)) {
                (!l || l && s < 9) && v();
                var e = 0,
                    o = function() {
                        n.selForContextMenu == r.doc.sel && 0 == i.selectionStart && i.selectionEnd > 0 && "​" == t.prevInput ? Zn(r, no)(r) : e++ < 10 ? n.detectingSelectAll = setTimeout(o, 500) : (n.selForContextMenu = null, n.input.reset())
                    };
                n.detectingSelectAll = setTimeout(o, 200)
            }
        }
    }, Gl.prototype.readOnlyChanged = function(e) {
        e || this.reset(), this.textarea.disabled = "nocursor" == e, this.textarea.readOnly = !!e
    }, Gl.prototype.setUneditable = function() {}, Gl.prototype.needsContentAttribute = !1,
        function(e) {
            var t = e.optionHandlers;

            function r(r, n, i, o) {
                e.defaults[r] = n, i && (t[r] = o ? function(e, t, r) {
                    r != yl && i(e, t, r)
                } : i)
            }

            e.defineOption = r, e.Init = yl, r("value", "", function(e, t) {
                return e.setValue(t)
            }, !0), r("mode", null, function(e, t) {
                e.doc.modeOption = t, Ti(e)
            }, !0), r("indentUnit", 2, Ti, !0), r("indentWithTabs", !1), r("smartIndent", !0), r("tabSize", 4, function(e) {
                Mi(e), zr(e), un(e)
            }, !0), r("lineSeparator", null, function(e, t) {
                if (e.doc.lineSep = t, t) {
                    var r = [],
                        n = e.doc.first;
                    e.doc.iter(function(e) {
                        for (var i = 0;;) {
                            var o = e.text.indexOf(t, i);
                            if (-1 == o) break;
                            i = o + t.length, r.push(et(n, o))
                        }
                        n++
                    });
                    for (var i = r.length - 1; i >= 0; i--) co(e.doc, t, r[i], et(r[i].line, r[i].ch + t.length))
                }
            }), r("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200c\u200e\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g, function(e, t, r) {
                e.state.specialChars = new RegExp(t.source + (t.test("\t") ? "" : "|\t"), "g"), r != yl && e.refresh()
            }), r("specialCharPlaceholder", Qt, function(e) {
                return e.refresh()
            }, !0), r("electricChars", !0), r("inputStyle", m ? "contenteditable" : "textarea", function() {
                throw new Error("inputStyle can not (yet) be changed in a running editor")
            }, !0), r("spellcheck", !1, function(e, t) {
                return e.getInputField().spellcheck = t
            }, !0), r("autocorrect", !1, function(e, t) {
                return e.getInputField().autocorrect = t
            }, !0), r("autocapitalize", !1, function(e, t) {
                return e.getInputField().autocapitalize = t
            }, !0), r("rtlMoveVisually", !w), r("wholeLineUpdateBefore", !0), r("theme", "default", function(e) {
                ml(e), fi(e)
            }, !0), r("keyMap", "default", function(e, t, r) {
                var n = Xo(t),
                    i = r != yl && Xo(r);
                i && i.detach && i.detach(e, n), n.attach && n.attach(e, i || null)
            }), r("extraKeys", null), r("configureMouse", null), r("lineWrapping", !1, Cl, !0), r("gutters", [], function(e, t) {
                e.display.gutterSpecs = ci(t, e.options.lineNumbers), fi(e)
            }, !0), r("fixedGutter", !0, function(e, t) {
                e.display.gutters.style.left = t ? nn(e.display) + "px" : "0", e.refresh()
            }, !0), r("coverGutterNextToScrollbar", !1, function(e) {
                return zn(e)
            }, !0), r("scrollbarStyle", "native", function(e) {
                Un(e), zn(e), e.display.scrollbars.setScrollTop(e.doc.scrollTop), e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)
            }, !0), r("lineNumbers", !1, function(e, t) {
                e.display.gutterSpecs = ci(e.options.gutters, t), fi(e)
            }, !0), r("firstLineNumber", 1, fi, !0), r("lineNumberFormatter", function(e) {
                return e
            }, fi, !0), r("showCursorWhenSelecting", !1, pn, !0), r("resetSelectionOnContextMenu", !0), r("lineWiseCopyCut", !0), r("pasteLinesPerSelection", !0), r("selectionsMayTouch", !1), r("readOnly", !1, function(e, t) {
                "nocursor" == t && (Sn(e), e.display.input.blur()), e.display.input.readOnlyChanged(t)
            }), r("screenReaderLabel", null, function(e, t) {
                t = "" === t ? null : t, e.display.input.screenReaderLabelChanged(t)
            }), r("disableInput", !1, function(e, t) {
                t || e.display.input.reset()
            }, !0), r("dragDrop", !0, xl), r("allowDropFileTypes", null), r("cursorBlinkRate", 530), r("cursorScrollMargin", 0), r("cursorHeight", 1, pn, !0), r("singleCursorHeightPerLine", !0, pn, !0), r("workTime", 100), r("workDelay", 100), r("flattenSpans", !0, Mi, !0), r("addModeClass", !1, Mi, !0), r("pollInterval", 100), r("undoDepth", 200, function(e, t) {
                return e.doc.history.undoDepth = t
            }), r("historyEventDelay", 1250), r("viewportMargin", 10, function(e) {
                return e.refresh()
            }, !0), r("maxHighlightLength", 1e4, Mi, !0), r("moveInputWithCursor", !0, function(e, t) {
                t || e.display.input.resetPosition()
            }), r("tabindex", null, function(e, t) {
                return e.display.input.getField().tabIndex = t || ""
            }), r("autofocus", null), r("direction", "ltr", function(e, t) {
                return e.doc.setDirection(t)
            }, !0), r("phrases", null)
        }(Sl),
        function(e) {
            var t = e.optionHandlers,
                r = e.helpers = {};
            e.prototype = {
                constructor: e,
                focus: function() {
                    window.focus(), this.display.input.focus()
                },
                setOption: function(e, r) {
                    var n = this.options,
                        i = n[e];
                    n[e] == r && "mode" != e || (n[e] = r, t.hasOwnProperty(e) && Zn(this, t[e])(this, r, i), ge(this, "optionChange", this, e))
                },
                getOption: function(e) {
                    return this.options[e]
                },
                getDoc: function() {
                    return this.doc
                },
                addKeyMap: function(e, t) {
                    this.state.keyMaps[t ? "push" : "unshift"](Xo(e))
                },
                removeKeyMap: function(e) {
                    for (var t = this.state.keyMaps, r = 0; r < t.length; ++r)
                        if (t[r] == e || t[r].name == e) return t.splice(r, 1), !0
                },
                addOverlay: Qn(function(t, r) {
                    var n = t.token ? t : e.getMode(this.options, t);
                    if (n.startState) throw new Error("Overlays may not be stateful.");
                    ! function(e, t, r) {
                        for (var n = 0, i = r(t); n < e.length && r(e[n]) <= i;) n++;
                        e.splice(n, 0, t)
                    }(this.state.overlays, {
                        mode: n,
                        modeSpec: t,
                        opaque: r && r.opaque,
                        priority: r && r.priority || 0
                    }, function(e) {
                        return e.priority
                    }), this.state.modeGen++, un(this)
                }),
                removeOverlay: Qn(function(e) {
                    for (var t = this.state.overlays, r = 0; r < t.length; ++r) {
                        var n = t[r].modeSpec;
                        if (n == e || "string" == typeof e && n.name == e) return t.splice(r, 1), this.state.modeGen++, void un(this)
                    }
                }),
                indentLine: Qn(function(e, t, r) {
                    "string" != typeof t && "number" != typeof t && (t = null == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"), Qe(this.doc, e) && kl(this, e, t, r)
                }),
                indentSelection: Qn(function(e) {
                    for (var t = this.doc.sel.ranges, r = -1, n = 0; n < t.length; n++) {
                        var i = t[n];
                        if (i.empty()) i.head.line > r && (kl(this, i.head.line, e, !0), r = i.head.line, n == this.doc.sel.primIndex && On(this));
                        else {
                            var o = i.from(),
                                l = i.to(),
                                s = Math.max(r, o.line);
                            r = Math.min(this.lastLine(), l.line - (l.ch ? 0 : 1)) + 1;
                            for (var a = s; a < r; ++a) kl(this, a, e);
                            var u = this.doc.sel.ranges;
                            0 == o.ch && t.length == u.length && u[n].from().ch > 0 && Xi(this.doc, n, new bi(o, u[n].to()), V)
                        }
                    }
                }),
                getTokenAt: function(e, t) {
                    return yt(this, e, t)
                },
                getLineTokens: function(e, t) {
                    return yt(this, et(e), t, !0)
                },
                getTokenTypeAt: function(e) {
                    e = st(this.doc, e);
                    var t, r = ft(this, Xe(this.doc, e.line)),
                        n = 0,
                        i = (r.length - 1) / 2,
                        o = e.ch;
                    if (0 == o) t = r[2];
                    else
                        for (;;) {
                            var l = n + i >> 1;
                            if ((l ? r[2 * l - 1] : 0) >= o) i = l;
                            else {
                                if (!(r[2 * l + 1] < o)) {
                                    t = r[2 * l + 2];
                                    break
                                }
                                n = l + 1
                            }
                        }
                    var s = t ? t.indexOf("overlay ") : -1;
                    return s < 0 ? t : 0 == s ? null : t.slice(0, s - 1)
                },
                getModeAt: function(t) {
                    var r = this.doc.mode;
                    return r.innerMode ? e.innerMode(r, this.getTokenAt(t).state).mode : r
                },
                getHelper: function(e, t) {
                    return this.getHelpers(e, t)[0]
                },
                getHelpers: function(e, t) {
                    var n = [];
                    if (!r.hasOwnProperty(t)) return n;
                    var i = r[t],
                        o = this.getModeAt(e);
                    if ("string" == typeof o[t]) i[o[t]] && n.push(i[o[t]]);
                    else if (o[t])
                        for (var l = 0; l < o[t].length; l++) {
                            var s = i[o[t][l]];
                            s && n.push(s)
                        } else o.helperType && i[o.helperType] ? n.push(i[o.helperType]) : i[o.name] && n.push(i[o.name]);
                    for (var a = 0; a < i._global.length; a++) {
                        var u = i._global[a];
                        u.pred(o, this) && -1 == B(n, u.val) && n.push(u.val)
                    }
                    return n
                },
                getStateAfter: function(e, t) {
                    var r = this.doc;
                    return dt(this, (e = lt(r, null == e ? r.first + r.size - 1 : e)) + 1, t).state
                },
                cursorCoords: function(e, t) {
                    var r = this.doc.sel.primary();
                    return Xr(this, null == e ? r.head : "object" == typeof e ? st(this.doc, e) : e ? r.from() : r.to(), t || "page")
                },
                charCoords: function(e, t) {
                    return jr(this, st(this.doc, e), t || "page")
                },
                coordsChar: function(e, t) {
                    return $r(this, (e = Kr(this, e, t || "page")).left, e.top)
                },
                lineAtHeight: function(e, t) {
                    return e = Kr(this, {
                        top: e,
                        left: 0
                    }, t || "page").top, Ze(this.doc, e + this.display.viewOffset)
                },
                heightAtLine: function(e, t, r) {
                    var n, i = !1;
                    if ("number" == typeof e) {
                        var o = this.doc.first + this.doc.size - 1;
                        e < this.doc.first ? e = this.doc.first : e > o && (e = o, i = !0), n = Xe(this.doc, e)
                    } else n = e;
                    return Vr(this, n, {
                        top: 0,
                        left: 0
                    }, t || "page", r || i).top + (i ? this.doc.height - Vt(n) : 0)
                },
                defaultTextHeight: function() {
                    return en(this.display)
                },
                defaultCharWidth: function() {
                    return tn(this.display)
                },
                getViewport: function() {
                    return {
                        from: this.display.viewFrom,
                        to: this.display.viewTo
                    }
                },
                addWidget: function(e, t, r, n, i) {
                    var o, l, s, a = this.display,
                        u = (e = Xr(this, st(this.doc, e))).bottom,
                        c = e.left;
                    if (t.style.position = "absolute", t.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(t), a.sizer.appendChild(t), "over" == n) u = e.top;
                    else if ("above" == n || "near" == n) {
                        var h = Math.max(a.wrapper.clientHeight, this.doc.height),
                            f = Math.max(a.sizer.clientWidth, a.lineSpace.clientWidth);
                        ("above" == n || e.bottom + t.offsetHeight > h) && e.top > t.offsetHeight ? u = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= h && (u = e.bottom), c + t.offsetWidth > f && (c = f - t.offsetWidth)
                    }
                    t.style.top = u + "px", t.style.left = t.style.right = "", "right" == i ? (c = a.sizer.clientWidth - t.offsetWidth, t.style.right = "0px") : ("left" == i ? c = 0 : "middle" == i && (c = (a.sizer.clientWidth - t.offsetWidth) / 2), t.style.left = c + "px"), r && (o = this, l = {
                        left: c,
                        top: u,
                        right: c + t.offsetWidth,
                        bottom: u + t.offsetHeight
                    }, null != (s = Mn(o, l)).scrollTop && Hn(o, s.scrollTop), null != s.scrollLeft && Pn(o, s.scrollLeft))
                },
                triggerOnKeyDown: Qn(ll),
                triggerOnKeyPress: Qn(al),
                triggerOnKeyUp: sl,
                triggerOnMouseDown: Qn(fl),
                execCommand: function(e) {
                    if (Zo.hasOwnProperty(e)) return Zo[e].call(null, this)
                },
                triggerElectric: Qn(function(e) {
                    Al(this, e)
                }),
                findPosH: function(e, t, r, n) {
                    var i = 1;
                    t < 0 && (i = -1, t = -t);
                    for (var o = st(this.doc, e), l = 0; l < t && !(o = Fl(this.doc, o, i, r, n)).hitSide; ++l);
                    return o
                },
                moveH: Qn(function(e, t) {
                    var r = this;
                    this.extendSelectionsBy(function(n) {
                        return r.display.shift || r.doc.extend || n.empty() ? Fl(r.doc, n.head, e, t, r.options.rtlMoveVisually) : e < 0 ? n.from() : n.to()
                    }, j)
                }),
                deleteH: Qn(function(e, t) {
                    var r = this.doc.sel,
                        n = this.doc;
                    r.somethingSelected() ? n.replaceSelection("", null, "+delete") : Yo(this, function(r) {
                        var i = Fl(n, r.head, e, t, !1);
                        return e < 0 ? {
                            from: i,
                            to: r.head
                        } : {
                            from: r.head,
                            to: i
                        }
                    })
                }),
                findPosV: function(e, t, r, n) {
                    var i = 1,
                        o = n;
                    t < 0 && (i = -1, t = -t);
                    for (var l = st(this.doc, e), s = 0; s < t; ++s) {
                        var a = Xr(this, l, "div");
                        if (null == o ? o = a.left : a.left = o, (l = Pl(this, a, i, r)).hitSide) break
                    }
                    return l
                },
                moveV: Qn(function(e, t) {
                    var r = this,
                        n = this.doc,
                        i = [],
                        o = !this.display.shift && !n.extend && n.sel.somethingSelected();
                    if (n.extendSelectionsBy(function(l) {
                        if (o) return e < 0 ? l.from() : l.to();
                        var s = Xr(r, l.head, "div");
                        null != l.goalColumn && (s.left = l.goalColumn), i.push(s.left);
                        var a = Pl(r, s, e, t);
                        return "page" == t && l == n.sel.primary() && Nn(r, jr(r, a, "div").top - s.top), a
                    }, j), i.length)
                        for (var l = 0; l < n.sel.ranges.length; l++) n.sel.ranges[l].goalColumn = i[l]
                }),
                findWordAt: function(e) {
                    var t = Xe(this.doc, e.line).text,
                        r = e.ch,
                        n = e.ch;
                    if (t) {
                        var i = this.getHelper(e, "wordChars");
                        "before" != e.sticky && n != t.length || !r ? ++n : --r;
                        for (var o = t.charAt(r), l = te(o, i) ? function(e) {
                            return te(e, i)
                        } : /\s/.test(o) ? function(e) {
                            return /\s/.test(e)
                        } : function(e) {
                            return !/\s/.test(e) && !te(e)
                        }; r > 0 && l(t.charAt(r - 1));) --r;
                        for (; n < t.length && l(t.charAt(n));) ++n
                    }
                    return new bi(et(e.line, r), et(e.line, n))
                },
                toggleOverwrite: function(e) {
                    null != e && e == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? H(this.display.cursorDiv, "CodeMirror-overwrite") : T(this.display.cursorDiv, "CodeMirror-overwrite"), ge(this, "overwriteToggle", this, this.state.overwrite))
                },
                hasFocus: function() {
                    return this.display.input.getField() == W()
                },
                isReadOnly: function() {
                    return !(!this.options.readOnly && !this.doc.cantEdit)
                },
                scrollTo: Qn(function(e, t) {
                    An(this, e, t)
                }),
                getScrollInfo: function() {
                    var e = this.display.scroller;
                    return {
                        left: e.scrollLeft,
                        top: e.scrollTop,
                        height: e.scrollHeight - kr(this) - this.display.barHeight,
                        width: e.scrollWidth - kr(this) - this.display.barWidth,
                        clientHeight: Mr(this),
                        clientWidth: Tr(this)
                    }
                },
                scrollIntoView: Qn(function(e, t) {
                    null == e ? (e = {
                        from: this.doc.sel.primary().head,
                        to: null
                    }, null == t && (t = this.options.cursorScrollMargin)) : "number" == typeof e ? e = {
                        from: et(e, 0),
                        to: null
                    } : null == e.from && (e = {
                        from: e,
                        to: null
                    }), e.to || (e.to = e.from), e.margin = t || 0, null != e.from.line ? function(e, t) {
                        Dn(e), e.curOp.scrollToPos = t
                    }(this, e) : Wn(this, e.from, e.to, e.margin)
                }),
                setSize: Qn(function(e, t) {
                    var r = this,
                        n = function(e) {
                            return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e
                        };
                    null != e && (this.display.wrapper.style.width = n(e)), null != t && (this.display.wrapper.style.height = n(t)), this.options.lineWrapping && Rr(this);
                    var i = this.display.viewFrom;
                    this.doc.iter(i, this.display.viewTo, function(e) {
                        if (e.widgets)
                            for (var t = 0; t < e.widgets.length; t++)
                                if (e.widgets[t].noHScroll) {
                                    cn(r, i, "widget");
                                    break
                                }
                        ++ i
                    }), this.curOp.forceUpdate = !0, ge(this, "refresh", this)
                }),
                operation: function(e) {
                    return qn(this, e)
                },
                startOperation: function() {
                    return Kn(this)
                },
                endOperation: function() {
                    return jn(this)
                },
                refresh: Qn(function() {
                    var e = this.display.cachedTextHeight;
                    un(this), this.curOp.forceUpdate = !0, zr(this), An(this, this.doc.scrollLeft, this.doc.scrollTop), li(this.display), (null == e || Math.abs(e - en(this.display)) > .5 || this.options.lineWrapping) && ln(this), ge(this, "refresh", this)
                }),
                swapDoc: Qn(function(e) {
                    var t = this.doc;
                    return t.cm = null, this.state.selectingText && this.state.selectingText(), Di(this, e), zr(this), this.display.input.reset(), An(this, e.scrollLeft, e.scrollTop), this.curOp.forceScroll = !0, sr(this, "swapDoc", this, t), t
                }),
                phrase: function(e) {
                    var t = this.options.phrases;
                    return t && Object.prototype.hasOwnProperty.call(t, e) ? t[e] : e
                },
                getInputField: function() {
                    return this.display.input.getField()
                },
                getWrapperElement: function() {
                    return this.display.wrapper
                },
                getScrollerElement: function() {
                    return this.display.scroller
                },
                getGutterElement: function() {
                    return this.display.gutters
                }
            }, be(e), e.registerHelper = function(t, n, i) {
                r.hasOwnProperty(t) || (r[t] = e[t] = {
                    _global: []
                }), r[t][n] = i
            }, e.registerGlobalHelper = function(t, n, i, o) {
                e.registerHelper(t, n, o), r[t]._global.push({
                    pred: i,
                    val: o
                })
            }
        }(Sl);
    var Ul = "iter insert remove copy getEditor constructor".split(" ");
    for (var Vl in Mo.prototype) Mo.prototype.hasOwnProperty(Vl) && B(Ul, Vl) < 0 && (Sl.prototype[Vl] = function(e) {
        return function() {
            return e.apply(this.doc, arguments)
        }
    }(Mo.prototype[Vl]));
    return be(Mo), Sl.inputStyles = {
        textarea: Gl,
        contenteditable: El
    }, Sl.defineMode = function(e) {
        Sl.defaults.mode || "null" == e || (Sl.defaults.mode = e),
            function(e, t) {
                arguments.length > 2 && (t.dependencies = Array.prototype.slice.call(arguments, 2)), Ee[e] = t
            }.apply(this, arguments)
    }, Sl.defineMIME = function(e, t) {
        Ie[e] = t
    }, Sl.defineMode("null", function() {
        return {
            token: function(e) {
                return e.skipToEnd()
            }
        }
    }), Sl.defineMIME("text/plain", "null"), Sl.defineExtension = function(e, t) {
        Sl.prototype[e] = t
    }, Sl.defineDocExtension = function(e, t) {
        Mo.prototype[e] = t
    }, Sl.fromTextArea = function(e, t) {
        if ((t = t ? I(t) : {}).value = e.value, !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex), !t.placeholder && e.placeholder && (t.placeholder = e.placeholder), null == t.autofocus) {
            var r = W();
            t.autofocus = r == e || null != e.getAttribute("autofocus") && r == document.body
        }

        function n() {
            e.value = s.getValue()
        }

        var i;
        if (e.form && (fe(e.form, "submit", n), !t.leaveSubmitMethodAlone)) {
            var o = e.form;
            i = o.submit;
            try {
                var l = o.submit = function() {
                    n(), o.submit = i, o.submit(), o.submit = l
                }
            } catch (e) {}
        }
        t.finishInit = function(r) {
            r.save = n, r.getTextArea = function() {
                return e
            }, r.toTextArea = function() {
                r.toTextArea = isNaN, n(), e.parentNode.removeChild(r.getWrapperElement()), e.style.display = "", e.form && (pe(e.form, "submit", n), t.leaveSubmitMethodAlone || "function" != typeof e.form.submit || (e.form.submit = i))
            }
        }, e.style.display = "none";
        var s = Sl(function(t) {
            return e.parentNode.insertBefore(t, e.nextSibling)
        }, t);
        return s
    },
        function(e) {
            e.off = pe, e.on = fe, e.wheelEventPixels = vi, e.Doc = Mo, e.splitLines = We, e.countColumn = R, e.findColumn = X, e.isWordChar = ee, e.Pass = U, e.signal = ge, e.Line = Xt, e.changeEnd = Ci, e.scrollbarModel = Gn, e.Pos = et, e.cmpPos = tt, e.modes = Ee, e.mimeModes = Ie, e.resolveMode = Re, e.getMode = ze, e.modeExtensions = Be, e.extendMode = Ge, e.copyState = Ue, e.startState = Ke, e.innerMode = Ve, e.commands = Zo, e.keyMap = zo, e.keyName = jo, e.isModifierKey = Vo, e.lookupKey = Uo, e.normalizeKeyMap = Go, e.StringStream = je, e.SharedTextMarker = So, e.TextMarker = xo, e.LineWidget = yo, e.e_preventDefault = we, e.e_stopPropagation = xe, e.e_stop = Se, e.addClass = H, e.contains = D, e.rmClass = T, e.keyNames = Po
        }(Sl), Sl.version = "5.59.2", Sl
});
! function(t) {
    "object" == typeof exports && "object" == typeof module ? t(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], t) : t(CodeMirror)
}(function(t) {
    "use strict";
    var i = "CodeMirror-hint",
        e = "CodeMirror-hint-active";

    function n(t, i) {
        if (this.cm = t, this.options = i, this.widget = null, this.debounce = 0, this.tick = 0, this.startPos = this.cm.getCursor("start"), this.startLen = this.cm.getLine(this.startPos.line).length - this.cm.getSelection().length, this.options.updateOnCursorActivity) {
            var e = this;
            t.on("cursorActivity", this.activityFunc = function() {
                e.cursorActivity()
            })
        }
    }

    t.showHint = function(t, i, e) {
        if (!i) return t.showHint(e);
        e && e.async && (i.async = !0);
        var n = {
            hint: i
        };
        if (e)
            for (var o in e) n[o] = e[o];
        return t.showHint(n)
    }, t.defineExtension("showHint", function(i) {
        i = function(t, i, e) {
            var n = t.options.hintOptions,
                o = {};
            for (var s in a) o[s] = a[s];
            if (n)
                for (var s in n) void 0 !== n[s] && (o[s] = n[s]);
            if (e)
                for (var s in e) void 0 !== e[s] && (o[s] = e[s]);
            o.hint.resolve && (o.hint = o.hint.resolve(t, i));
            return o
        }(this, this.getCursor("start"), i);
        var e = this.listSelections();
        if (!(e.length > 1)) {
            if (this.somethingSelected()) {
                if (!i.hint.supportsSelection) return;
                for (var o = 0; o < e.length; o++)
                    if (e[o].head.line != e[o].anchor.line) return
            }
            this.state.completionActive && this.state.completionActive.close();
            var s = this.state.completionActive = new n(this, i);
            s.options.hint && (t.signal(this, "startCompletion", this), s.update(!0))
        }
    }), t.defineExtension("closeHint", function() {
        this.state.completionActive && this.state.completionActive.close()
    });
    var o = window.requestAnimationFrame || function(t) {
            return setTimeout(t, 1e3 / 60)
        },
        s = window.cancelAnimationFrame || clearTimeout;

    function c(t) {
        return "string" == typeof t ? t : t.text
    }

    function r(t, i) {
        for (; i && i != t;) {
            if ("LI" === i.nodeName.toUpperCase() && i.parentNode == t) return i;
            i = i.parentNode
        }
    }

    function l(n, o) {
        this.completion = n, this.data = o, this.picked = !1;
        var s = this,
            l = n.cm,
            h = l.getInputField().ownerDocument,
            a = h.defaultView || h.parentWindow,
            f = this.hints = h.createElement("ul"),
            u = n.cm.options.theme;
        f.className = "CodeMirror-hints " + u, this.selectedHint = o.selectedHint || 0;
        for (var p = o.list, d = 0; d < p.length; ++d) {
            var m = f.appendChild(h.createElement("li")),
                g = p[d],
                v = i + (d != this.selectedHint ? "" : " " + e);
            null != g.className && (v = g.className + " " + v), m.className = v, g.render ? g.render(m, o, g) : m.appendChild(h.createTextNode(g.displayText || c(g))), m.hintId = d
        }
        var y = n.options.container || h.body,
            w = l.cursorCoords(n.options.alignWithWord ? o.from : null),
            H = w.left,
            C = w.bottom,
            b = !0,
            k = 0,
            A = 0;
        if (y !== h.body) {
            var S = -1 !== ["absolute", "relative", "fixed"].indexOf(a.getComputedStyle(y).position) ? y : y.offsetParent,
                x = S.getBoundingClientRect(),
                T = h.body.getBoundingClientRect();
            k = x.left - T.left - S.scrollLeft, A = x.top - T.top - S.scrollTop
        }
        f.style.left = H - k + "px", f.style.top = C - A + "px";
        var O = a.innerWidth || Math.max(h.body.offsetWidth, h.documentElement.offsetWidth),
            M = a.innerHeight || Math.max(h.body.offsetHeight, h.documentElement.offsetHeight);
        y.appendChild(f);
        var F, N = n.options.moveOnOverlap ? f.getBoundingClientRect() : new DOMRect,
            P = !!n.options.paddingForScrollbar && f.scrollHeight > f.clientHeight + 1;
        if (setTimeout(function() {
            F = l.getScrollInfo()
        }), N.bottom - M > 0) {
            var E = N.bottom - N.top;
            if (w.top - (w.bottom - N.top) - E > 0) f.style.top = (C = w.top - E - A) + "px", b = !1;
            else if (E > M) {
                f.style.height = M - 5 + "px", f.style.top = (C = w.bottom - N.top - A) + "px";
                var R = l.getCursor();
                o.from.ch != R.ch && (w = l.cursorCoords(R), f.style.left = (H = w.left - k) + "px", N = f.getBoundingClientRect())
            }
        }
        var W, I = N.right - O;
        if (I > 0 && (N.right - N.left > O && (f.style.width = O - 5 + "px", I -= N.right - N.left - O), f.style.left = (H = w.left - I - k) + "px"), P)
            for (var B = f.firstChild; B; B = B.nextSibling) B.style.paddingRight = l.display.nativeBarWidth + "px";
        (l.addKeyMap(this.keyMap = function(t, i) {
            var e = {
                Up: function() {
                    i.moveFocus(-1)
                },
                Down: function() {
                    i.moveFocus(1)
                },
                PageUp: function() {
                    i.moveFocus(1 - i.menuSize(), !0)
                },
                PageDown: function() {
                    i.moveFocus(i.menuSize() - 1, !0)
                },
                Home: function() {
                    i.setFocus(0)
                },
                End: function() {
                    i.setFocus(i.length - 1)
                },
                Enter: i.pick,
                Tab: i.pick,
                Esc: i.close
            };
            /Mac/.test(navigator.platform) && (e["Ctrl-P"] = function() {
                i.moveFocus(-1)
            }, e["Ctrl-N"] = function() {
                i.moveFocus(1)
            });
            var n = t.options.customKeys,
                o = n ? {} : e;

            function s(t, n) {
                var s;
                s = "string" != typeof n ? function(t) {
                    return n(t, i)
                } : e.hasOwnProperty(n) ? e[n] : n, o[t] = s
            }

            if (n)
                for (var c in n) n.hasOwnProperty(c) && s(c, n[c]);
            var r = t.options.extraKeys;
            if (r)
                for (var c in r) r.hasOwnProperty(c) && s(c, r[c]);
            return o
        }(n, {
            moveFocus: function(t, i) {
                s.changeActive(s.selectedHint + t, i)
            },
            setFocus: function(t) {
                s.changeActive(t)
            },
            menuSize: function() {
                return s.screenAmount()
            },
            length: p.length,
            close: function() {
                n.close()
            },
            pick: function() {
                s.pick()
            },
            data: o
        })), n.options.closeOnUnfocus) && (l.on("blur", this.onBlur = function() {
            W = setTimeout(function() {
                n.close()
            }, 100)
        }), l.on("focus", this.onFocus = function() {
            clearTimeout(W)
        }));
        l.on("scroll", this.onScroll = function() {
            var t = l.getScrollInfo(),
                i = l.getWrapperElement().getBoundingClientRect(),
                e = C + F.top - t.top,
                o = e - (a.pageYOffset || (h.documentElement || h.body).scrollTop);
            if (b || (o += f.offsetHeight), o <= i.top || o >= i.bottom) return n.close();
            f.style.top = e + "px", f.style.left = H + F.left - t.left + "px"
        }), t.on(f, "dblclick", function(t) {
            var i = r(f, t.target || t.srcElement);
            i && null != i.hintId && (s.changeActive(i.hintId), s.pick())
        }), t.on(f, "click", function(t) {
            var i = r(f, t.target || t.srcElement);
            i && null != i.hintId && (s.changeActive(i.hintId), n.options.completeOnSingleClick && s.pick())
        }), t.on(f, "mousedown", function() {
            setTimeout(function() {
                l.focus()
            }, 20)
        });
        var K = this.getSelectedHintRange();
        return 0 === K.from && 0 === K.to || this.scrollToActive(), t.signal(o, "select", p[this.selectedHint], f.childNodes[this.selectedHint]), !0
    }

    function h(t, i, e, n) {
        if (t.async) t(i, n, e);
        else {
            var o = t(i, e);
            o && o.then ? o.then(n) : n(o)
        }
    }

    n.prototype = {
        close: function() {
            this.active() && (this.cm.state.completionActive = null, this.tick = null, this.options.updateOnCursorActivity && this.cm.off("cursorActivity", this.activityFunc), this.widget && this.data && t.signal(this.data, "close"), this.widget && this.widget.close(), t.signal(this.cm, "endCompletion", this.cm))
        },
        active: function() {
            return this.cm.state.completionActive == this
        },
        pick: function(i, e) {
            var n = i.list[e],
                o = this;
            this.cm.operation(function() {
                n.hint ? n.hint(o.cm, i, n) : o.cm.replaceRange(c(n), n.from || i.from, n.to || i.to, "complete"), t.signal(i, "pick", n), o.cm.scrollIntoView()
            }), this.options.closeOnPick && this.close()
        },
        cursorActivity: function() {
            this.debounce && (s(this.debounce), this.debounce = 0);
            var t = this.startPos;
            this.data && (t = this.data.from);
            var i = this.cm.getCursor(),
                e = this.cm.getLine(i.line);
            if (i.line != this.startPos.line || e.length - i.ch != this.startLen - this.startPos.ch || i.ch < t.ch || this.cm.somethingSelected() || !i.ch || this.options.closeCharacters.test(e.charAt(i.ch - 1))) this.close();
            else {
                var n = this;
                this.debounce = o(function() {
                    n.update()
                }), this.widget && this.widget.disable()
            }
        },
        update: function(t) {
            if (null != this.tick) {
                var i = this,
                    e = ++this.tick;
                h(this.options.hint, this.cm, this.options, function(n) {
                    i.tick == e && i.finishUpdate(n, t)
                })
            }
        },
        finishUpdate: function(i, e) {
            this.data && t.signal(this.data, "update");
            var n = this.widget && this.widget.picked || e && this.options.completeSingle;
            this.widget && this.widget.close(), this.data = i, i && i.list.length && (n && 1 == i.list.length ? this.pick(i, 0) : (this.widget = new l(this, i), t.signal(i, "shown")))
        }
    }, l.prototype = {
        close: function() {
            if (this.completion.widget == this) {
                this.completion.widget = null, this.hints.parentNode.removeChild(this.hints), this.completion.cm.removeKeyMap(this.keyMap);
                var t = this.completion.cm;
                this.completion.options.closeOnUnfocus && (t.off("blur", this.onBlur), t.off("focus", this.onFocus)), t.off("scroll", this.onScroll)
            }
        },
        disable: function() {
            this.completion.cm.removeKeyMap(this.keyMap);
            var t = this;
            this.keyMap = {
                Enter: function() {
                    t.picked = !0
                }
            }, this.completion.cm.addKeyMap(this.keyMap)
        },
        pick: function() {
            this.completion.pick(this.data, this.selectedHint)
        },
        changeActive: function(i, n) {
            if (i >= this.data.list.length ? i = n ? this.data.list.length - 1 : 0 : i < 0 && (i = n ? 0 : this.data.list.length - 1), this.selectedHint != i) {
                var o = this.hints.childNodes[this.selectedHint];
                o && (o.className = o.className.replace(" " + e, "")), (o = this.hints.childNodes[this.selectedHint = i]).className += " " + e, this.scrollToActive(), t.signal(this.data, "select", this.data.list[this.selectedHint], o)
            }
        },
        scrollToActive: function() {
            var t = this.getSelectedHintRange(),
                i = this.hints.childNodes[t.from],
                e = this.hints.childNodes[t.to],
                n = this.hints.firstChild;
            i.offsetTop < this.hints.scrollTop ? this.hints.scrollTop = i.offsetTop - n.offsetTop : e.offsetTop + e.offsetHeight > this.hints.scrollTop + this.hints.clientHeight && (this.hints.scrollTop = e.offsetTop + e.offsetHeight - this.hints.clientHeight + n.offsetTop)
        },
        screenAmount: function() {
            return Math.floor(this.hints.clientHeight / this.hints.firstChild.offsetHeight) || 1
        },
        getSelectedHintRange: function() {
            var t = this.completion.options.scrollMargin || 0;
            return {
                from: Math.max(0, this.selectedHint - t),
                to: Math.min(this.data.list.length - 1, this.selectedHint + t)
            }
        }
    }, t.registerHelper("hint", "auto", {
        resolve: function(i, e) {
            var n, o = i.getHelpers(e, "hint");
            if (o.length) {
                var s = function(t, i, e) {
                    var n = function(t, i) {
                        if (!t.somethingSelected()) return i;
                        for (var e = [], n = 0; n < i.length; n++) i[n].supportsSelection && e.push(i[n]);
                        return e
                    }(t, o);
                    ! function o(s) {
                        if (s == n.length) return i(null);
                        h(n[s], t, e, function(t) {
                            t && t.list.length > 0 ? i(t) : o(s + 1)
                        })
                    }(0)
                };
                return s.async = !0, s.supportsSelection = !0, s
            }
            return (n = i.getHelper(i.getCursor(), "hintWords")) ? function(i) {
                return t.hint.fromList(i, {
                    words: n
                })
            } : t.hint.anyword ? function(i, e) {
                return t.hint.anyword(i, e)
            } : function() {}
        }
    }), t.registerHelper("hint", "fromList", function(i, e) {
        var n, o = i.getCursor(),
            s = i.getTokenAt(o),
            c = t.Pos(o.line, s.start),
            r = o;
        s.start < o.ch && /\w/.test(s.string.charAt(o.ch - s.start - 1)) ? n = s.string.substr(0, o.ch - s.start) : (n = "", c = o);
        for (var l = [], h = 0; h < e.words.length; h++) {
            var a = e.words[h];
            a.slice(0, n.length) == n && l.push(a)
        }
        if (l.length) return {
            list: l,
            from: c,
            to: r
        }
    }), t.commands.autocomplete = t.showHint;
    var a = {
        hint: t.hint.auto,
        completeSingle: !0,
        alignWithWord: !0,
        closeCharacters: /[\s()\[\]{};:>,]/,
        closeOnPick: !0,
        closeOnUnfocus: !0,
        updateOnCursorActivity: !0,
        completeOnSingleClick: !0,
        container: null,
        customKeys: null,
        extraKeys: null,
        paddingForScrollbar: !0,
        moveOnOverlap: !0
    };
    t.defineOption("hintOptions", null)
});
! function(t) {
    "object" == typeof exports && "object" == typeof module ? t(require("../../lib/codemirror"), require("../../mode/sql/sql")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../../mode/sql/sql"], t) : t(CodeMirror)
}(function(t) {
    "use strict";
    var e, r, n, o, i = {
            QUERY_DIV: ";",
            ALIAS_KEYWORD: "AS"
        },
        s = t.Pos,
        a = t.cmpPos;

    function u(t) {
        return "[object Array]" == Object.prototype.toString.call(t)
    }

    function l(t) {
        return "string" == typeof t ? t : t.text
    }

    function f(t, e) {
        return u(e) && (e = {
            columns: e
        }), e.text || (e.text = t), e
    }

    function c(t) {
        return e[t.toUpperCase()]
    }

    function p(t) {
        var e = {};
        for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
        return e
    }

    function d(t, e) {
        var r = t.length,
            n = l(e).substr(0, r);
        return t.toUpperCase() === n.toUpperCase()
    }

    function g(t, e, r, n) {
        if (u(r))
            for (var o = 0; o < r.length; o++) d(e, r[o]) && t.push(n(r[o]));
        else
            for (var i in r)
                if (r.hasOwnProperty(i)) {
                    var s = r[i];
                    d(e, s = s && !0 !== s ? s.displayText ? {
                        text: s.text,
                        displayText: s.displayText
                    } : s.text : i) && t.push(n(s))
                }
    }

    function h(t) {
        "." == t.charAt(0) && (t = t.substr(1));
        for (var e = t.split(o + o), r = 0; r < e.length; r++) e[r] = e[r].replace(new RegExp(o, "g"), "");
        return e.join(o)
    }

    function v(t) {
        for (var e = l(t).split("."), r = 0; r < e.length; r++) e[r] = o + e[r].replace(new RegExp(o, "g"), o + o) + o;
        var n = e.join(".");
        return "string" == typeof t ? n : ((t = p(t)).text = n, t)
    }

    function x(t, e) {
        for (var r = t.split(/\s+/), n = 0; n < r.length; n++) r[n] && e(r[n].replace(/[`,;]/g, ""))
    }

    function m(t, e) {
        for (var r = e.doc, n = r.getValue(), o = t.toUpperCase(), u = "", l = "", f = [], p = {
            start: s(0, 0),
            end: s(e.lastLine(), e.getLineHandle(e.lastLine()).length)
        }, d = n.indexOf(i.QUERY_DIV); - 1 != d;) f.push(r.posFromIndex(d)), d = n.indexOf(i.QUERY_DIV, d + 1);
        f.unshift(s(0, 0)), f.push(s(e.lastLine(), e.getLineHandle(e.lastLine()).text.length));
        for (var g = null, h = e.getCursor(), v = 0; v < f.length; v++) {
            if ((null == g || a(h, g) > 0) && a(h, f[v]) <= 0) {
                p = {
                    start: g,
                    end: f[v]
                };
                break
            }
            g = f[v]
        }
        if (p.start) {
            var m = r.getRange(p.start, p.end, !1);
            for (v = 0; v < m.length; v++) {
                if (x(m[v], function(t) {
                    var e = t.toUpperCase();
                    e === o && c(u) && (l = u), e !== i.ALIAS_KEYWORD && (u = t)
                }), l) break
            }
        }
        return l
    }

    t.registerHelper("hint", "sql", function(i, a) {
        e = function(t) {
            var e = {};
            if (u(t))
                for (var r = t.length - 1; r >= 0; r--) {
                    var n = t[r];
                    e[l(n).toUpperCase()] = f(l(n), n)
                } else if (t)
                for (var o in t) e[o.toUpperCase()] = f(o, t[o]);
            return e
        }(a && a.tables);
        var d = a && a.defaultTable,
            x = a && a.disableKeywords;
        r = d && c(d), n = function(e) {
            var r = e.doc.modeOption;
            return "sql" === r && (r = "text/x-sql"), t.resolveMode(r).keywords
        }(i), o = function(e) {
            var r = e.doc.modeOption;
            return "sql" === r && (r = "text/x-sql"), t.resolveMode(r).identifierQuote || "`"
        }(i), d && !r && (r = m(d, i)), (r = r || []).columns && (r = r.columns);
        var b, y, C, A = i.getCursor(),
            q = [],
            U = i.getTokenAt(A);
        U.end > A.ch && (U.end = A.ch, U.string = U.string.slice(0, A.ch - U.start)), U.string.match(/^[.`"'\w@][\w$#]*$/g) ? (C = U.string, b = U.start, y = U.end) : (b = y = A.ch, C = "");
        let j = a && a.column ? a.column : [];
        if ("." == C.charAt(0) || C.charAt(0) == o) b = function(t, n, i, a) {
            for (var u = !1, l = [], f = n.start, d = !0; d;) d = "." == n.string.charAt(0), u = u || n.string.charAt(0) == o, f = n.start, l.unshift(h(n.string)), "." == (n = a.getTokenAt(s(t.line, n.start))).string && (d = !0, n = a.getTokenAt(s(t.line, n.start)));
            var x = l.join(".");
            g(i, x, e, function(t) {
                return u ? v(t) : t
            }), g(i, x, r, function(t) {
                return u ? v(t) : t
            }), x = l.pop();
            var b = l.join("."),
                y = !1,
                C = b;
            if (!c(b)) {
                var A = b;
                (b = m(b, a)) !== A && (y = !0)
            }
            var q = c(b);
            return q && q.columns && (q = q.columns), q && g(i, x, q, function(t) {
                var e = b;
                return 1 == y && (e = C), "string" == typeof t ? t = e + "." + t : (t = p(t)).text = e + "." + t.text, u ? v(t) : t
            }), f
        }(A, U, q, i);
        else {
            var w = function(t, e) {
                return "object" == typeof t ? t.className = e : t = {
                    text: t,
                    className: e
                }, t
            };
            g(q, C, r, function(t) {
                return w(t, "CodeMirror-hint-table CodeMirror-hint-default-table")
            }), g(q, C, e, function(t) {
                return w(t, "CodeMirror-hint-table")
            }), g(q, C, j, function(t) {
                return w(t, "CodeMirror-hint-table")
            }), x || g(q, C, n, function(t) {
                return w(t.toUpperCase(), "CodeMirror-hint-keyword")
            })
        }
        return {
            list: q,
            from: s(A.line, b),
            to: s(A.line, y)
        }
    })
});
! function(t) {
    "object" == typeof exports && "object" == typeof module ? t(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], t) : t(CodeMirror)
}(function(t) {
    "use strict";

    function e(e, o, i) {
        this.orientation = o, this.scroll = i, this.screen = this.total = this.size = 1, this.pos = 0, this.node = document.createElement("div"), this.node.className = e + "-" + o, this.inner = this.node.appendChild(document.createElement("div"));
        var n = this;

        function s(e) {
            var o = t.wheelEventPixels(e)["horizontal" == n.orientation ? "x" : "y"],
                i = n.pos;
            n.moveTo(n.pos + o), n.pos != i && t.e_preventDefault(e)
        }

        t.on(this.inner, "mousedown", function(e) {
            if (1 == e.which) {
                t.e_preventDefault(e);
                var o = "horizontal" == n.orientation ? "pageX" : "pageY",
                    i = e[o],
                    s = n.pos;
                t.on(document, "mousemove", h), t.on(document, "mouseup", r)
            }

            function r() {
                t.off(document, "mousemove", h), t.off(document, "mouseup", r)
            }

            function h(t) {
                if (1 != t.which) return r();
                n.moveTo(s + (t[o] - i) * (n.total / n.size))
            }
        }), t.on(this.node, "click", function(e) {
            t.e_preventDefault(e);
            var o, i = n.inner.getBoundingClientRect();
            o = "horizontal" == n.orientation ? e.clientX < i.left ? -1 : e.clientX > i.right ? 1 : 0 : e.clientY < i.top ? -1 : e.clientY > i.bottom ? 1 : 0, n.moveTo(n.pos + o * n.screen)
        }), t.on(this.node, "mousewheel", s), t.on(this.node, "DOMMouseScroll", s)
    }

    e.prototype.setPos = function(t, e) {
        return t < 0 && (t = 0), t > this.total - this.screen && (t = this.total - this.screen), !(!e && t == this.pos) && (this.pos = t, this.inner.style["horizontal" == this.orientation ? "left" : "top"] = t * (this.size / this.total) + "px", !0)
    }, e.prototype.moveTo = function(t) {
        this.setPos(t) && this.scroll(t, this.orientation)
    };

    function o(t, o, i) {
        this.addClass = t, this.horiz = new e(t, "horizontal", i), o(this.horiz.node), this.vert = new e(t, "vertical", i), o(this.vert.node), this.width = null
    }

    e.prototype.update = function(t, e, o) {
        var i = this.screen != e || this.total != t || this.size != o;
        i && (this.screen = e, this.total = t, this.size = o);
        var n = this.screen * (this.size / this.total);
        n < 10 && (this.size -= 10 - n, n = 10), this.inner.style["horizontal" == this.orientation ? "width" : "height"] = n + "px", this.setPos(this.pos, i)
    }, o.prototype.update = function(t) {
        if (null == this.width) {
            var e = window.getComputedStyle ? window.getComputedStyle(this.horiz.node) : this.horiz.node.currentStyle;
            e && (this.width = parseInt(e.height))
        }
        var o = this.width || 0,
            i = t.scrollWidth > t.clientWidth + 1,
            n = t.scrollHeight > t.clientHeight + 1;
        return this.vert.node.style.display = n ? "block" : "none", this.horiz.node.style.display = i ? "block" : "none", n && (this.vert.update(t.scrollHeight, t.clientHeight, t.viewHeight - (i ? o : 0)), this.vert.node.style.bottom = i ? o + "px" : "0"), i && (this.horiz.update(t.scrollWidth, t.clientWidth, t.viewWidth - (n ? o : 0) - t.barLeft), this.horiz.node.style.right = n ? o + "px" : "0", this.horiz.node.style.left = t.barLeft + "px"), {
            right: n ? o : 0,
            bottom: i ? o : 0
        }
    }, o.prototype.setScrollTop = function(t) {
        this.vert.setPos(t)
    }, o.prototype.setScrollLeft = function(t) {
        this.horiz.setPos(t)
    }, o.prototype.clear = function() {
        var t = this.horiz.node.parentNode;
        t.removeChild(this.horiz.node), t.removeChild(this.vert.node)
    }, t.scrollbarModel.simple = function(t, e) {
        return new o("CodeMirror-simplescroll", t, e)
    }, t.scrollbarModel.overlay = function(t, e) {
        return new o("CodeMirror-overlayscroll", t, e)
    }
});
! function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(e) {
    "use strict";
    e.runMode = function(t, n, r, o) {
        var a = e.getMode(e.defaults, n),
            i = o && o.tabSize || e.defaults.tabSize;
        if (r.appendChild) {
            var d = /MSIE \d/.test(navigator.userAgent) && (null == document.documentMode || document.documentMode < 9),
                c = r,
                l = 0;
            c.innerHTML = "", r = function(e, t) {
                if ("\n" == e) return c.appendChild(document.createTextNode(d ? "\r" : e)), void(l = 0);
                for (var n = "", r = 0;;) {
                    var o = e.indexOf("\t", r);
                    if (-1 == o) {
                        n += e.slice(r), l += e.length - r;
                        break
                    }
                    l += o - r, n += e.slice(r, o);
                    var a = i - l % i;
                    l += a;
                    for (var u = 0; u < a; ++u) n += " ";
                    r = o + 1
                }
                if (t) {
                    var f = c.appendChild(document.createElement("span"));
                    f.className = "cm-" + t.replace(/ +/g, " cm-"), f.appendChild(document.createTextNode(n))
                } else c.appendChild(document.createTextNode(n))
            }
        }
        for (var u = e.splitLines(t), f = o && o.state || e.startState(a), s = 0, p = u.length; s < p; ++s) {
            s && r("\n");
            var m = new e.StringStream(u[s], null, {
                lookAhead: function(e) {
                    return u[s + e]
                },
                baseToken: function() {}
            });
            for (!m.string && a.blankLine && a.blankLine(f); !m.eol();) {
                var v = a.token(m, f);
                r(m.current(), v, s, m.start, f), m.start = m.pos
            }
        }
    }
});
! function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(e) {
    "use strict";

    function t(e) {
        for (var t; null != (t = e.next());)
            if ("`" == t && !e.eat("`")) return "variable-2";
        return e.backUp(e.current().length - 1), e.eatWhile(/\w/) ? "variable-2" : null
    }

    function r(e) {
        return e.eat("@") && (e.match("session."), e.match("local."), e.match("global.")), e.eat("'") ? (e.match(/^.*'/), "variable-2") : e.eat('"') ? (e.match(/^.*"/), "variable-2") : e.eat("`") ? (e.match(/^.*`/), "variable-2") : e.match(/^[0-9a-zA-Z$\.\_]+/) ? "variable-2" : null
    }

    function a(e) {
        return e.eat("N") ? "atom" : e.match(/^[a-zA-Z.#!?]/) ? "variable-2" : null
    }

    e.defineMode("sql", function(t, r) {
        var a = r.client || {},
            s = r.atoms || {
                false: !0,
                true: !0,
                null: !0
            },
            l = r.builtin || n(o),
            c = r.keywords || n(i),
            u = r.operatorChars || /^[*+\-%<>!=&|~^\/]/,
            d = r.support || {},
            m = r.hooks || {},
            p = r.dateSQL || {
                date: !0,
                time: !0,
                timestamp: !0
            },
            g = !1 !== r.backslashStringEscapes,
            b = r.brackets || /^[\{}\(\)\[\]]/,
            h = r.punctuation || /^[;.,:]/;

        function f(e, t) {
            var r = e.next();
            if (m[r]) {
                var i = m[r](e, t);
                if (!1 !== i) return i
            }
            if (d.hexNumber && ("0" == r && e.match(/^[xX][0-9a-fA-F]+/) || ("x" == r || "X" == r) && e.match(/^'[0-9a-fA-F]+'/))) return "number";
            if (d.binaryNumber && (("b" == r || "B" == r) && e.match(/^'[01]+'/) || "0" == r && e.match(/^b[01]+/))) return "number";
            if (r.charCodeAt(0) > 47 && r.charCodeAt(0) < 58) return e.match(/^[0-9]*(\.[0-9]+)?([eE][-+]?[0-9]+)?/), d.decimallessFloat && e.match(/^\.(?!\.)/), "number";
            if ("?" == r && (e.eatSpace() || e.eol() || e.eat(";"))) return "variable-3";
            if ("'" == r || '"' == r && d.doubleQuote) return t.tokenize = _(r), t.tokenize(e, t);
            if ((d.nCharCast && ("n" == r || "N" == r) || d.charsetCast && "_" == r && e.match(/[a-z][a-z0-9]*/i)) && ("'" == e.peek() || '"' == e.peek())) return "keyword";
            if (d.escapeConstant && ("e" == r || "E" == r) && ("'" == e.peek() || '"' == e.peek() && d.doubleQuote)) return t.tokenize = function(e, t) {
                return (t.tokenize = _(e.next(), !0))(e, t)
            }, "keyword";
            if (d.commentSlashSlash && "/" == r && e.eat("/")) return e.skipToEnd(), "comment";
            if (d.commentHash && "#" == r || "-" == r && e.eat("-") && (!d.commentSpaceRequired || e.eat(" "))) return e.skipToEnd(), "comment";
            if ("/" == r && e.eat("*")) return t.tokenize = function e(t) {
                return function(r, a) {
                    var i = r.match(/^.*?(\/\*|\*\/)/);
                    return i ? "/*" == i[1] ? a.tokenize = e(t + 1) : a.tokenize = t > 1 ? e(t - 1) : f : r.skipToEnd(), "comment"
                }
            }(1), t.tokenize(e, t);
            if ("." != r) {
                if (u.test(r)) return e.eatWhile(u), "operator";
                if (b.test(r)) return "bracket";
                if (h.test(r)) return e.eatWhile(h), "punctuation";
                if ("{" == r && (e.match(/^( )*(d|D|t|T|ts|TS)( )*'[^']*'( )*}/) || e.match(/^( )*(d|D|t|T|ts|TS)( )*"[^"]*"( )*}/))) return "number";
                e.eatWhile(/^[_\w\d]/);
                var n = e.current().toLowerCase();
                return p.hasOwnProperty(n) && (e.match(/^( )+'[^']*'/) || e.match(/^( )+"[^"]*"/)) ? "number" : s.hasOwnProperty(n) ? "atom" : l.hasOwnProperty(n) ? "builtin" : c.hasOwnProperty(n) ? "keyword" : a.hasOwnProperty(n) ? "string-2" : null
            }
            return d.zerolessFloat && e.match(/^(?:\d+(?:e[+-]?\d+)?)/i) ? "number" : e.match(/^\.+/) ? null : d.ODBCdotTable && e.match(/^[\w\d_$#]+/) ? "variable-2" : void 0
        }

        function _(e, t) {
            return function(r, a) {
                for (var i, n = !1; null != (i = r.next());) {
                    if (i == e && !n) {
                        a.tokenize = f;
                        break
                    }
                    n = (g || t) && !n && "\\" == i
                }
                return "string"
            }
        }

        function y(e, t, r) {
            t.context = {
                prev: t.context,
                indent: e.indentation(),
                col: e.column(),
                type: r
            }
        }

        return {
            startState: function() {
                return {
                    tokenize: f,
                    context: null
                }
            },
            token: function(e, t) {
                if (e.sol() && t.context && null == t.context.align && (t.context.align = !1), t.tokenize == f && e.eatSpace()) return null;
                var r = t.tokenize(e, t);
                if ("comment" == r) return r;
                t.context && null == t.context.align && (t.context.align = !0);
                var a = e.current();
                return "(" == a ? y(e, t, ")") : "[" == a ? y(e, t, "]") : t.context && t.context.type == a && function(e) {
                    e.indent = e.context.indent, e.context = e.context.prev
                }(t), r
            },
            indent: function(r, a) {
                var i = r.context;
                if (!i) return e.Pass;
                var n = a.charAt(0) == i.type;
                return i.align ? i.col + (n ? 0 : 1) : i.indent + (n ? 0 : t.indentUnit)
            },
            blockCommentStart: "/*",
            blockCommentEnd: "*/",
            lineComment: d.commentSlashSlash ? "//" : d.commentHash ? "#" : "--",
            closeBrackets: "()[]{}''\"\"``"
        }
    });
    var i = "alter and as asc between by count create delete desc distinct drop from group having in insert into is join like not on or order select set table union update values where limit ";

    function n(e) {
        for (var t = {}, r = e.split(" "), a = 0; a < r.length; ++a) t[r[a]] = !0;
        return t
    }

    var o = "bool boolean bit blob enum long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision real date datetime year unsigned signed decimal numeric";
    e.defineMIME("text/x-sql", {
        name: "sql",
        keywords: n(i + "begin"),
        builtin: n(o),
        atoms: n("false true null unknown"),
        dateSQL: n("date time timestamp"),
        support: n("ODBCdotTable doubleQuote binaryNumber hexNumber")
    }), e.defineMIME("text/x-mssql", {
        name: "sql",
        client: n("$partition binary_checksum checksum connectionproperty context_info current_request_id error_line error_message error_number error_procedure error_severity error_state formatmessage get_filestream_transaction_context getansinull host_id host_name isnull isnumeric min_active_rowversion newid newsequentialid rowcount_big xact_state object_id"),
        keywords: n(i + "begin trigger proc view index for add constraint key primary foreign collate clustered nonclustered declare exec go if use index holdlock nolock nowait paglock readcommitted readcommittedlock readpast readuncommitted repeatableread rowlock serializable snapshot tablock tablockx updlock with"),
        builtin: n("bigint numeric bit smallint decimal smallmoney int tinyint money float real char varchar text nchar nvarchar ntext binary varbinary image cursor timestamp hierarchyid uniqueidentifier sql_variant xml table "),
        atoms: n("is not null like and or in left right between inner outer join all any some cross unpivot pivot exists"),
        operatorChars: /^[*+\-%<>!=^\&|\/]/,
        brackets: /^[\{}\(\)]/,
        punctuation: /^[;.,:/]/,
        backslashStringEscapes: !1,
        dateSQL: n("date datetimeoffset datetime2 smalldatetime datetime time"),
        hooks: {
            "@": r
        }
    }), e.defineMIME("text/x-mysql", {
        name: "sql",
        client: n("charset clear connect edit ego exit go help nopager notee nowarning pager print prompt quit rehash source status system tee"),
        keywords: n(i + "accessible action add after algorithm all analyze asensitive at authors auto_increment autocommit avg avg_row_length before binary binlog both btree cache call cascade cascaded case catalog_name chain change changed character check checkpoint checksum class_origin client_statistics close coalesce code collate collation collations column columns comment commit committed completion concurrent condition connection consistent constraint contains continue contributors convert cross current current_date current_time current_timestamp current_user cursor data database databases day_hour day_microsecond day_minute day_second deallocate dec declare default delay_key_write delayed delimiter des_key_file describe deterministic dev_pop dev_samp deviance diagnostics directory disable discard distinctrow div dual dumpfile each elseif enable enclosed end ends engine engines enum errors escape escaped even event events every execute exists exit explain extended fast fetch field fields first flush for force foreign found_rows full fulltext function general get global grant grants group group_concat handler hash help high_priority hosts hour_microsecond hour_minute hour_second if ignore ignore_server_ids import index index_statistics infile inner innodb inout insensitive insert_method install interval invoker isolation iterate key keys kill language last leading leave left level limit linear lines list load local localtime localtimestamp lock logs low_priority master master_heartbeat_period master_ssl_verify_server_cert masters match max max_rows maxvalue message_text middleint migrate min min_rows minute_microsecond minute_second mod mode modifies modify mutex mysql_errno natural next no no_write_to_binlog offline offset one online open optimize option optionally out outer outfile pack_keys parser partition partitions password phase plugin plugins prepare preserve prev primary privileges procedure processlist profile profiles purge query quick range read read_write reads real rebuild recover references regexp relaylog release remove rename reorganize repair repeatable replace require resignal restrict resume return returns revoke right rlike rollback rollup row row_format rtree savepoint schedule schema schema_name schemas second_microsecond security sensitive separator serializable server session share show signal slave slow smallint snapshot soname spatial specific sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sqlexception sqlstate sqlwarning ssl start starting starts status std stddev stddev_pop stddev_samp storage straight_join subclass_origin sum suspend table_name table_statistics tables tablespace temporary terminated to trailing transaction trigger triggers truncate uncommitted undo uninstall unique unlock upgrade usage use use_frm user user_resources user_statistics using utc_date utc_time utc_timestamp value variables varying view views warnings when while with work write xa xor year_month zerofill begin do then else loop repeat"),
        builtin: n("bool boolean bit blob decimal double float long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision date datetime year unsigned signed numeric"),
        atoms: n("false true null unknown"),
        operatorChars: /^[*+\-%<>!=&|^]/,
        dateSQL: n("date time timestamp"),
        support: n("ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber doubleQuote nCharCast charsetCast commentHash commentSpaceRequired"),
        hooks: {
            "@": r,
            "`": t,
            "\\": a
        }
    }), e.defineMIME("text/x-mariadb", {
        name: "sql",
        client: n("charset clear connect edit ego exit go help nopager notee nowarning pager print prompt quit rehash source status system tee"),
        keywords: n(i + "accessible action add after algorithm all always analyze asensitive at authors auto_increment autocommit avg avg_row_length before binary binlog both btree cache call cascade cascaded case catalog_name chain change changed character check checkpoint checksum class_origin client_statistics close coalesce code collate collation collations column columns comment commit committed completion concurrent condition connection consistent constraint contains continue contributors convert cross current current_date current_time current_timestamp current_user cursor data database databases day_hour day_microsecond day_minute day_second deallocate dec declare default delay_key_write delayed delimiter des_key_file describe deterministic dev_pop dev_samp deviance diagnostics directory disable discard distinctrow div dual dumpfile each elseif enable enclosed end ends engine engines enum errors escape escaped even event events every execute exists exit explain extended fast fetch field fields first flush for force foreign found_rows full fulltext function general generated get global grant grants group groupby_concat handler hard hash help high_priority hosts hour_microsecond hour_minute hour_second if ignore ignore_server_ids import index index_statistics infile inner innodb inout insensitive insert_method install interval invoker isolation iterate key keys kill language last leading leave left level limit linear lines list load local localtime localtimestamp lock logs low_priority master master_heartbeat_period master_ssl_verify_server_cert masters match max max_rows maxvalue message_text middleint migrate min min_rows minute_microsecond minute_second mod mode modifies modify mutex mysql_errno natural next no no_write_to_binlog offline offset one online open optimize option optionally out outer outfile pack_keys parser partition partitions password persistent phase plugin plugins prepare preserve prev primary privileges procedure processlist profile profiles purge query quick range read read_write reads real rebuild recover references regexp relaylog release remove rename reorganize repair repeatable replace require resignal restrict resume return returns revoke right rlike rollback rollup row row_format rtree savepoint schedule schema schema_name schemas second_microsecond security sensitive separator serializable server session share show shutdown signal slave slow smallint snapshot soft soname spatial specific sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sqlexception sqlstate sqlwarning ssl start starting starts status std stddev stddev_pop stddev_samp storage straight_join subclass_origin sum suspend table_name table_statistics tables tablespace temporary terminated to trailing transaction trigger triggers truncate uncommitted undo uninstall unique unlock upgrade usage use use_frm user user_resources user_statistics using utc_date utc_time utc_timestamp value variables varying view views virtual warnings when while with work write xa xor year_month zerofill begin do then else loop repeat"),
        builtin: n("bool boolean bit blob decimal double float long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision date datetime year unsigned signed numeric"),
        atoms: n("false true null unknown"),
        operatorChars: /^[*+\-%<>!=&|^]/,
        dateSQL: n("date time timestamp"),
        support: n("ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber doubleQuote nCharCast charsetCast commentHash commentSpaceRequired"),
        hooks: {
            "@": r,
            "`": t,
            "\\": a
        }
    }), e.defineMIME("text/x-sqlite", {
        name: "sql",
        client: n("auth backup bail binary changes check clone databases dbinfo dump echo eqp exit explain fullschema headers help import imposter indexes iotrace limit lint load log mode nullvalue once open output print prompt quit read restore save scanstats schema separator session shell show stats system tables testcase timeout timer trace vfsinfo vfslist vfsname width"),
        keywords: n(i + "abort action add after all analyze attach autoincrement before begin cascade case cast check collate column commit conflict constraint cross current_date current_time current_timestamp database default deferrable deferred detach each else end escape except exclusive exists explain fail for foreign full glob if ignore immediate index indexed initially inner instead intersect isnull key left limit match natural no notnull null of offset outer plan pragma primary query raise recursive references regexp reindex release rename replace restrict right rollback row savepoint temp temporary then to transaction trigger unique using vacuum view virtual when with without"),
        builtin: n("bool boolean bit blob decimal double float long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text clob bigint int int2 int8 integer float double char varchar date datetime year unsigned signed numeric real"),
        atoms: n("null current_date current_time current_timestamp"),
        operatorChars: /^[*+\-%<>!=&|/~]/,
        dateSQL: n("date time timestamp datetime"),
        support: n("decimallessFloat zerolessFloat"),
        identifierQuote: '"',
        hooks: {
            "@": r,
            ":": r,
            "?": r,
            $: r,
            '"': function(e) {
                for (var t; null != (t = e.next());)
                    if ('"' == t && !e.eat('"')) return "variable-2";
                return e.backUp(e.current().length - 1), e.eatWhile(/\w/) ? "variable-2" : null
            },
            "`": t
        }
    }), e.defineMIME("text/x-cassandra", {
        name: "sql",
        client: {},
        keywords: n("add all allow alter and any apply as asc authorize batch begin by clustering columnfamily compact consistency count create custom delete desc distinct drop each_quorum exists filtering from grant if in index insert into key keyspace keyspaces level limit local_one local_quorum modify nan norecursive nosuperuser not of on one order password permission permissions primary quorum rename revoke schema select set storage superuser table three to token truncate ttl two type unlogged update use user users using values where with writetime"),
        builtin: n("ascii bigint blob boolean counter decimal double float frozen inet int list map static text timestamp timeuuid tuple uuid varchar varint"),
        atoms: n("false true infinity NaN"),
        operatorChars: /^[<>=]/,
        dateSQL: {},
        support: n("commentSlashSlash decimallessFloat"),
        hooks: {}
    }), e.defineMIME("text/x-plsql", {
        name: "sql",
        client: n("appinfo arraysize autocommit autoprint autorecovery autotrace blockterminator break btitle cmdsep colsep compatibility compute concat copycommit copytypecheck define describe echo editfile embedded escape exec execute feedback flagger flush heading headsep instance linesize lno loboffset logsource long longchunksize markup native newpage numformat numwidth pagesize pause pno recsep recsepchar release repfooter repheader serveroutput shiftinout show showmode size spool sqlblanklines sqlcase sqlcode sqlcontinue sqlnumber sqlpluscompatibility sqlprefix sqlprompt sqlterminator suffix tab term termout time timing trimout trimspool ttitle underline verify version wrap"),
        keywords: n("abort accept access add all alter and any array arraylen as asc assert assign at attributes audit authorization avg base_table begin between binary_integer body boolean by case cast char char_base check close cluster clusters colauth column comment commit compress connect connected constant constraint crash create current currval cursor data_base database date dba deallocate debugoff debugon decimal declare default definition delay delete desc digits dispose distinct do drop else elseif elsif enable end entry escape exception exception_init exchange exclusive exists exit external fast fetch file for force form from function generic goto grant group having identified if immediate in increment index indexes indicator initial initrans insert interface intersect into is key level library like limited local lock log logging long loop master maxextents maxtrans member minextents minus mislabel mode modify multiset new next no noaudit nocompress nologging noparallel not nowait number_base object of off offline on online only open option or order out package parallel partition pctfree pctincrease pctused pls_integer positive positiven pragma primary prior private privileges procedure public raise range raw read rebuild record ref references refresh release rename replace resource restrict return returning returns reverse revoke rollback row rowid rowlabel rownum rows run savepoint schema segment select separate session set share snapshot some space split sql start statement storage subtype successful synonym tabauth table tables tablespace task terminate then to trigger truncate type union unique unlimited unrecoverable unusable update use using validate value values variable view views when whenever where while with work"),
        builtin: n("abs acos add_months ascii asin atan atan2 average bfile bfilename bigserial bit blob ceil character chartorowid chr clob concat convert cos cosh count dec decode deref dual dump dup_val_on_index empty error exp false float floor found glb greatest hextoraw initcap instr instrb int integer isopen last_day least length lengthb ln lower lpad ltrim lub make_ref max min mlslabel mod months_between natural naturaln nchar nclob new_time next_day nextval nls_charset_decl_len nls_charset_id nls_charset_name nls_initcap nls_lower nls_sort nls_upper nlssort no_data_found notfound null number numeric nvarchar2 nvl others power rawtohex real reftohex round rowcount rowidtochar rowtype rpad rtrim serial sign signtype sin sinh smallint soundex sqlcode sqlerrm sqrt stddev string substr substrb sum sysdate tan tanh to_char text to_date to_label to_multi_byte to_number to_single_byte translate true trunc uid unlogged upper user userenv varchar varchar2 variance varying vsize xml"),
        operatorChars: /^[*\/+\-%<>!=~]/,
        dateSQL: n("date time timestamp"),
        support: n("doubleQuote nCharCast zerolessFloat binaryNumber hexNumber")
    }), e.defineMIME("text/x-hive", {
        name: "sql",
        keywords: n("select alter $elem$ $key$ $value$ add after all analyze and archive as asc before between binary both bucket buckets by cascade case cast change cluster clustered clusterstatus collection column columns comment compute concatenate continue create cross cursor data database databases dbproperties deferred delete delimited desc describe directory disable distinct distribute drop else enable end escaped exclusive exists explain export extended external fetch fields fileformat first format formatted from full function functions grant group having hold_ddltime idxproperties if import in index indexes inpath inputdriver inputformat insert intersect into is items join keys lateral left like limit lines load local location lock locks mapjoin materialized minus msck no_drop nocompress not of offline on option or order out outer outputdriver outputformat overwrite partition partitioned partitions percent plus preserve procedure purge range rcfile read readonly reads rebuild recordreader recordwriter recover reduce regexp rename repair replace restrict revoke right rlike row schema schemas semi sequencefile serde serdeproperties set shared show show_database sort sorted ssl statistics stored streamtable table tables tablesample tblproperties temporary terminated textfile then tmp to touch transform trigger unarchive undo union uniquejoin unlock update use using utc utc_tmestamp view when where while with admin authorization char compact compactions conf cube current current_date current_timestamp day decimal defined dependency directories elem_type exchange file following for grouping hour ignore inner interval jar less logical macro minute month more none noscan over owner partialscan preceding pretty principals protection reload rewrite role roles rollup rows second server sets skewed transactions truncate unbounded unset uri user values window year"),
        builtin: n("bool boolean long timestamp tinyint smallint bigint int float double date datetime unsigned string array struct map uniontype key_type utctimestamp value_type varchar"),
        atoms: n("false true null unknown"),
        operatorChars: /^[*+\-%<>!=]/,
        dateSQL: n("date timestamp"),
        support: n("ODBCdotTable doubleQuote binaryNumber hexNumber")
    }), e.defineMIME("text/x-pgsql", {
        name: "sql",
        client: n("source"),
        keywords: n(i + "a abort abs absent absolute access according action ada add admin after aggregate alias all allocate also alter always analyse analyze and any are array array_agg array_max_cardinality as asc asensitive assert assertion assignment asymmetric at atomic attach attribute attributes authorization avg backward base64 before begin begin_frame begin_partition bernoulli between bigint binary bit bit_length blob blocked bom boolean both breadth by c cache call called cardinality cascade cascaded case cast catalog catalog_name ceil ceiling chain char char_length character character_length character_set_catalog character_set_name character_set_schema characteristics characters check checkpoint class class_origin clob close cluster coalesce cobol collate collation collation_catalog collation_name collation_schema collect column column_name columns command_function command_function_code comment comments commit committed concurrently condition condition_number configuration conflict connect connection connection_name constant constraint constraint_catalog constraint_name constraint_schema constraints constructor contains content continue control conversion convert copy corr corresponding cost count covar_pop covar_samp create cross csv cube cume_dist current current_catalog current_date current_default_transform_group current_path current_role current_row current_schema current_time current_timestamp current_transform_group_for_type current_user cursor cursor_name cycle data database datalink datatype date datetime_interval_code datetime_interval_precision day db deallocate debug dec decimal declare default defaults deferrable deferred defined definer degree delete delimiter delimiters dense_rank depends depth deref derived desc describe descriptor detach detail deterministic diagnostics dictionary disable discard disconnect dispatch distinct dlnewcopy dlpreviouscopy dlurlcomplete dlurlcompleteonly dlurlcompletewrite dlurlpath dlurlpathonly dlurlpathwrite dlurlscheme dlurlserver dlvalue do document domain double drop dump dynamic dynamic_function dynamic_function_code each element else elseif elsif empty enable encoding encrypted end end_frame end_partition endexec enforced enum equals errcode error escape event every except exception exclude excluding exclusive exec execute exists exit exp explain expression extension external extract false family fetch file filter final first first_value flag float floor following for force foreach foreign fortran forward found frame_row free freeze from fs full function functions fusion g general generated get global go goto grant granted greatest group grouping groups handler having header hex hierarchy hint hold hour id identity if ignore ilike immediate immediately immutable implementation implicit import in include including increment indent index indexes indicator info inherit inherits initially inline inner inout input insensitive insert instance instantiable instead int integer integrity intersect intersection interval into invoker is isnull isolation join k key key_member key_type label lag language large last last_value lateral lead leading leakproof least left length level library like like_regex limit link listen ln load local localtime localtimestamp location locator lock locked log logged loop lower m map mapping match matched materialized max max_cardinality maxvalue member merge message message_length message_octet_length message_text method min minute minvalue mod mode modifies module month more move multiset mumps name names namespace national natural nchar nclob nesting new next nfc nfd nfkc nfkd nil no none normalize normalized not nothing notice notify notnull nowait nth_value ntile null nullable nullif nulls number numeric object occurrences_regex octet_length octets of off offset oids old on only open operator option options or order ordering ordinality others out outer output over overlaps overlay overriding owned owner p pad parallel parameter parameter_mode parameter_name parameter_ordinal_position parameter_specific_catalog parameter_specific_name parameter_specific_schema parser partial partition pascal passing passthrough password path percent percent_rank percentile_cont percentile_disc perform period permission pg_context pg_datatype_name pg_exception_context pg_exception_detail pg_exception_hint placing plans pli policy portion position position_regex power precedes preceding precision prepare prepared preserve primary print_strict_params prior privileges procedural procedure procedures program public publication query quote raise range rank read reads real reassign recheck recovery recursive ref references referencing refresh regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy regr_syy reindex relative release rename repeatable replace replica requiring reset respect restart restore restrict result result_oid return returned_cardinality returned_length returned_octet_length returned_sqlstate returning returns reverse revoke right role rollback rollup routine routine_catalog routine_name routine_schema routines row row_count row_number rows rowtype rule savepoint scale schema schema_name schemas scope scope_catalog scope_name scope_schema scroll search second section security select selective self sensitive sequence sequences serializable server server_name session session_user set setof sets share show similar simple size skip slice smallint snapshot some source space specific specific_name specifictype sql sqlcode sqlerror sqlexception sqlstate sqlwarning sqrt stable stacked standalone start state statement static statistics stddev_pop stddev_samp stdin stdout storage strict strip structure style subclass_origin submultiset subscription substring substring_regex succeeds sum symmetric sysid system system_time system_user t table table_name tables tablesample tablespace temp template temporary text then ties time timestamp timezone_hour timezone_minute to token top_level_count trailing transaction transaction_active transactions_committed transactions_rolled_back transform transforms translate translate_regex translation treat trigger trigger_catalog trigger_name trigger_schema trim trim_array true truncate trusted type types uescape unbounded uncommitted under unencrypted union unique unknown unlink unlisten unlogged unnamed unnest until untyped update upper uri usage use_column use_variable user user_defined_type_catalog user_defined_type_code user_defined_type_name user_defined_type_schema using vacuum valid validate validator value value_of values var_pop var_samp varbinary varchar variable_conflict variadic varying verbose version versioning view views volatile warning when whenever where while whitespace width_bucket window with within without work wrapper write xml xmlagg xmlattributes xmlbinary xmlcast xmlcomment xmlconcat xmldeclaration xmldocument xmlelement xmlexists xmlforest xmliterate xmlnamespaces xmlparse xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltext xmlvalidate year yes zone"),
        builtin: n("bigint int8 bigserial serial8 bit varying varbit boolean bool box bytea character char varchar cidr circle date double precision float8 inet integer int int4 interval json jsonb line lseg macaddr macaddr8 money numeric decimal path pg_lsn point polygon real float4 smallint int2 smallserial serial2 serial serial4 text time without zone with timetz timestamp timestamptz tsquery tsvector txid_snapshot uuid xml"),
        atoms: n("false true null unknown"),
        operatorChars: /^[*\/+\-%<>!=&|^\/#@?~]/,
        backslashStringEscapes: !1,
        dateSQL: n("date time timestamp"),
        support: n("ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber nCharCast charsetCast escapeConstant")
    }), e.defineMIME("text/x-gql", {
        name: "sql",
        keywords: n("ancestor and asc by contains desc descendant distinct from group has in is limit offset on order select superset where"),
        atoms: n("false true"),
        builtin: n("blob datetime first key __key__ string integer double boolean null"),
        operatorChars: /^[*+\-%<>!=]/
    }), e.defineMIME("text/x-gpsql", {
        name: "sql",
        client: n("source"),
        keywords: n("abort absolute access action active add admin after aggregate all also alter always analyse analyze and any array as asc assertion assignment asymmetric at authorization backward before begin between bigint binary bit boolean both by cache called cascade cascaded case cast chain char character characteristics check checkpoint class close cluster coalesce codegen collate column comment commit committed concurrency concurrently configuration connection constraint constraints contains content continue conversion copy cost cpu_rate_limit create createdb createexttable createrole createuser cross csv cube current current_catalog current_date current_role current_schema current_time current_timestamp current_user cursor cycle data database day deallocate dec decimal declare decode default defaults deferrable deferred definer delete delimiter delimiters deny desc dictionary disable discard distinct distributed do document domain double drop dxl each else enable encoding encrypted end enum errors escape every except exchange exclude excluding exclusive execute exists explain extension external extract false family fetch fields filespace fill filter first float following for force foreign format forward freeze from full function global grant granted greatest group group_id grouping handler hash having header hold host hour identity if ignore ilike immediate immutable implicit in including inclusive increment index indexes inherit inherits initially inline inner inout input insensitive insert instead int integer intersect interval into invoker is isnull isolation join key language large last leading least left level like limit list listen load local localtime localtimestamp location lock log login mapping master match maxvalue median merge minute minvalue missing mode modifies modify month move name names national natural nchar new newline next no nocreatedb nocreateexttable nocreaterole nocreateuser noinherit nologin none noovercommit nosuperuser not nothing notify notnull nowait null nullif nulls numeric object of off offset oids old on only operator option options or order ordered others out outer over overcommit overlaps overlay owned owner parser partial partition partitions passing password percent percentile_cont percentile_disc placing plans position preceding precision prepare prepared preserve primary prior privileges procedural procedure protocol queue quote randomly range read readable reads real reassign recheck recursive ref references reindex reject relative release rename repeatable replace replica reset resource restart restrict returning returns revoke right role rollback rollup rootpartition row rows rule savepoint scatter schema scroll search second security segment select sequence serializable session session_user set setof sets share show similar simple smallint some split sql stable standalone start statement statistics stdin stdout storage strict strip subpartition subpartitions substring superuser symmetric sysid system table tablespace temp template temporary text then threshold ties time timestamp to trailing transaction treat trigger trim true truncate trusted type unbounded uncommitted unencrypted union unique unknown unlisten until update user using vacuum valid validation validator value values varchar variadic varying verbose version view volatile web when where whitespace window with within without work writable write xml xmlattributes xmlconcat xmlelement xmlexists xmlforest xmlparse xmlpi xmlroot xmlserialize year yes zone"),
        builtin: n("bigint int8 bigserial serial8 bit varying varbit boolean bool box bytea character char varchar cidr circle date double precision float float8 inet integer int int4 interval json jsonb line lseg macaddr macaddr8 money numeric decimal path pg_lsn point polygon real float4 smallint int2 smallserial serial2 serial serial4 text time without zone with timetz timestamp timestamptz tsquery tsvector txid_snapshot uuid xml"),
        atoms: n("false true null unknown"),
        operatorChars: /^[*+\-%<>!=&|^\/#@?~]/,
        dateSQL: n("date time timestamp"),
        support: n("ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber nCharCast charsetCast")
    }), e.defineMIME("text/x-sparksql", {
        name: "sql",
        keywords: n("add after all alter analyze and anti archive array as asc at between bucket buckets by cache cascade case cast change clear cluster clustered codegen collection column columns comment commit compact compactions compute concatenate cost create cross cube current current_date current_timestamp database databases data dbproperties defined delete delimited deny desc describe dfs directories distinct distribute drop else end escaped except exchange exists explain export extended external false fields fileformat first following for format formatted from full function functions global grant group grouping having if ignore import in index indexes inner inpath inputformat insert intersect interval into is items join keys last lateral lazy left like limit lines list load local location lock locks logical macro map minus msck natural no not null nulls of on optimize option options or order out outer outputformat over overwrite partition partitioned partitions percent preceding principals purge range recordreader recordwriter recover reduce refresh regexp rename repair replace reset restrict revoke right rlike role roles rollback rollup row rows schema schemas select semi separated serde serdeproperties set sets show skewed sort sorted start statistics stored stratify struct table tables tablesample tblproperties temp temporary terminated then to touch transaction transactions transform true truncate unarchive unbounded uncache union unlock unset use using values view when where window with"),
        builtin: n("tinyint smallint int bigint boolean float double string binary timestamp decimal array map struct uniontype delimited serde sequencefile textfile rcfile inputformat outputformat"),
        atoms: n("false true null"),
        operatorChars: /^[*\/+\-%<>!=~&|^]/,
        dateSQL: n("date time timestamp"),
        support: n("ODBCdotTable doubleQuote zerolessFloat")
    }), e.defineMIME("text/x-esper", {
        name: "sql",
        client: n("source"),
        keywords: n("alter and as asc between by count create delete desc distinct drop from group having in insert into is join like not on or order select set table union update values where limit after all and as at asc avedev avg between by case cast coalesce count create current_timestamp day days delete define desc distinct else end escape events every exists false first from full group having hour hours in inner insert instanceof into irstream is istream join last lastweekday left limit like max match_recognize matches median measures metadatasql min minute minutes msec millisecond milliseconds not null offset on or order outer output partition pattern prev prior regexp retain-union retain-intersection right rstream sec second seconds select set some snapshot sql stddev sum then true unidirectional until update variable weekday when where window"),
        builtin: {},
        atoms: n("false true null"),
        operatorChars: /^[*+\-%<>!=&|^\/#@?~]/,
        dateSQL: n("time"),
        support: n("decimallessFloat zerolessFloat binaryNumber hexNumber")
    })
});
! function(t, o) {
    "object" == typeof module && module.exports ? module.exports = o() : t.Toastify = o()
}(this, function(t) {
    let o = function(t) {
        return new o.lib.init(t)
    };

    function i(t, o) {
        return !(!t || "string" != typeof o) && !!(t.className && t.className.trim().split(/\s+/gi).indexOf(o) > -1)
    }

    return o.lib = o.prototype = {
        toastify: "1.6.1",
        constructor: o,
        init: function(t) {
            return t || (t = {}), this.options = {}, this.toastElement = null, this.options.text = t.text || "Hi there!", this.options.duration = t.duration || 3e3, this.options.selector = t.selector, this.options.callback = t.callback || function() {}, this.options.destination = t.destination, this.options.newWindow = t.newWindow || !1, this.options.close = t.close || !1, this.options.closeOnClick = t.closeOnClick || !1, this.options.gravity = "bottom" == t.gravity ? "toastify-bottom" : "toastify-top", this.options.positionLeft = t.positionLeft || !1, this.options.position = t.position || "", this.options.backgroundColor = t.backgroundColor, this.options.avatar = t.avatar || "", this.options.className = t.className || "", this.options.stopOnFocus = void 0 === t.stopOnFocus || t.stopOnFocus, this.options.onClick = t.onClick, this
        },
        buildToast: function() {
            if (!this.options) throw "Toastify is not initialized";
            const t = document.createElement("div");
            if (t.className = "toastify on " + this.options.className, this.options.closeOnClick) {
                let o = this;
                t.addEventListener("click", function(i) {
                    o.removeElement(t)
                })
            }
            if (this.options.position ? t.className += " toastify-" + this.options.position : !0 === this.options.positionLeft ? (t.className += " toastify-left", console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.")) : t.className += " toastify-right", t.className += " " + this.options.gravity, this.options.backgroundColor && (t.style.background = this.options.backgroundColor), t.innerHTML = this.options.text, "" !== this.options.avatar) {
                const o = document.createElement("img");
                o.src = this.options.avatar, o.className = "toastify-avatar", "left" == this.options.position || !0 === this.options.positionLeft ? t.appendChild(o) : t.insertAdjacentElement("beforeend", o)
            }
            if (!0 === this.options.close) {
                const o = document.createElement("span");
                if (o.innerHTML = "&#10006;", o.className = "toast-close", o.addEventListener("click", function(t) {
                    t.stopPropagation(), this.removeElement(t.target.parentElement), window.clearTimeout(t.target.parentElement.timeOutValue)
                }.bind(this)), this.options.stopOnFocus && this.options.duration > 0) {
                    let o = this;
                    t.addEventListener("mouseover", function(o) {
                        window.clearTimeout(t.timeOutValue)
                    }), t.addEventListener("mouseleave", function() {
                        t.timeOutValue = window.setTimeout(function() {
                            o.removeElement(t)
                        }, o.options.duration)
                    })
                }
                const i = window.innerWidth > 0 ? window.innerWidth : screen.width;
                ("left" == this.options.position || !0 === this.options.positionLeft) && i > 360 ? t.insertAdjacentElement("afterbegin", o) : t.appendChild(o)
            }
            return void 0 !== this.options.destination && t.addEventListener("click", function(t) {
                t.stopPropagation(), !0 === this.options.newWindow ? window.open(this.options.destination, "_blank") : window.location = this.options.destination
            }.bind(this)), "function" == typeof this.options.onClick && void 0 === this.options.destination && t.addEventListener("click", function(t) {
                t.stopPropagation(), this.options.onClick()
            }.bind(this)), t
        },
        showToast: function() {
            let t;
            if (this.toastElement = this.buildToast(), !(t = void 0 === this.options.selector ? document.body : document.getElementById(this.options.selector))) throw "Root element is not defined";
            return t.insertBefore(this.toastElement, t.firstChild), o.reposition(), this.options.duration > 0 && (this.toastElement.timeOutValue = window.setTimeout(function() {
                this.removeElement(this.toastElement)
            }.bind(this), this.options.duration)), this
        },
        hideToast: function() {
            this.toastElement.timeOutValue && clearTimeout(this.toastElement.timeOutValue), this.removeElement(this.toastElement)
        },
        removeElement: function(t) {
            t.className = t.className.replace(" on", ""), window.setTimeout(function() {
                t && t.parentNode && (t.parentNode.removeChild(t), this.options.callback.call(t), o.reposition())
            }.bind(this), 400)
        }
    }, o.reposition = function() {
        let t = {
                top: 15,
                bottom: 15
            },
            o = {
                top: 15,
                bottom: 15
            },
            n = {
                top: 15,
                bottom: 15
            };
        const s = document.getElementsByClassName("toastify");
        let e;
        for (let a = 0; a < s.length; a++) {
            e = !0 === i(s[a], "toastify-top") ? "toastify-top" : "toastify-bottom";
            const l = s[a].offsetHeight;
            e = e.substr(9, e.length - 1);
            const r = 15;
            (window.innerWidth > 0 ? window.innerWidth : screen.width) <= 360 ? (s[a].style[e] = n[e] + "px", n[e] += l + r) : !0 === i(s[a], "toastify-left") ? (s[a].style[e] = t[e] + "px", t[e] += l + r) : (s[a].style[e] = o[e] + "px", o[e] += l + r)
        }
        return this
    }, o.lib.init.prototype = o.lib, o
});
! function(e, t) {
    if ("function" == typeof define && define.amd) define([], t);
    else if ("undefined" != typeof exports) t();
    else {
        t(), e.FileSaver = {}
    }
}(this, function() {
    "use strict";
    var e = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof global && global.global === global ? global : void 0;

    function t(e, t, o) {
        var n = new XMLHttpRequest;
        n.open("GET", e), n.responseType = "blob", n.onload = function() {
            a(n.response, t, o)
        }, n.onerror = function() {
            console.error("could not download file")
        }, n.send()
    }

    function o(e) {
        var t = new XMLHttpRequest;
        return t.open("HEAD", e, !1), t.send(), t.status >= 200 && t.status <= 299
    }

    function n(e) {
        try {
            e.dispatchEvent(new MouseEvent("click"))
        } catch (o) {
            var t = document.createEvent("MouseEvents");
            t.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(t)
        }
    }

    var a = e.saveAs || ("object" != typeof window || window !== e ? function() {} : "download" in HTMLAnchorElement.prototype ? function(a, i, r) {
        var l = e.URL || e.webkitURL,
            c = document.createElement("a");
        i = i || a.name || "download", c.download = i, c.rel = "noopener", "string" == typeof a ? (c.href = a, c.origin !== location.origin ? o(c.href) ? t(a, i, r) : n(c, c.target = "_blank") : n(c)) : (c.href = l.createObjectURL(a), setTimeout(function() {
            l.revokeObjectURL(c.href)
        }, 4e4), setTimeout(function() {
            n(c)
        }, 0))
    } : "msSaveOrOpenBlob" in navigator ? function(e, a, i) {
        if (a = a || e.name || "download", "string" == typeof e)
            if (o(e)) t(e, a, i);
            else {
                var r = document.createElement("a");
                r.href = e, r.target = "_blank", setTimeout(function() {
                    n(r)
                })
            }
        else navigator.msSaveOrOpenBlob(function(e, t) {
            return void 0 === t ? t = {
                autoBom: !1
            } : "object" != typeof t && (console.warn("Depricated: Expected third argument to be a object"), t = {
                autoBom: !t
            }), t.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob([String.fromCharCode(65279), e], {
                type: e.type
            }) : e
        }(e, i), a)
    } : function(o, n, a, i) {
        if ((i = i || open("", "_blank")) && (i.document.title = i.document.body.innerText = "downloading..."), "string" == typeof o) return t(o, n, a);
        var r = "application/octet-stream" === o.type,
            l = /constructor/i.test(e.HTMLElement) || e.safari,
            c = /CriOS\/[\d]+/.test(navigator.userAgent);
        if ((c || r && l) && "object" == typeof FileReader) {
            var s = new FileReader;
            s.onloadend = function() {
                var e = s.result;
                e = c ? e : e.replace(/^data:[^;]*;/, "data:attachment/file;"), i ? i.location.href = e : location = e, i = null
            }, s.readAsDataURL(o)
        } else {
            var f = e.URL || e.webkitURL,
                d = f.createObjectURL(o);
            i ? i.location = d : location.href = d, i = null, setTimeout(function() {
                f.revokeObjectURL(d)
            }, 4e4)
        }
    });
    e.saveAs = a.saveAs = a, "undefined" != typeof module && (module.exports = a)
});
(!localStorage || 1 != localStorage.getItem("lic")) && Toastify({
    text: '<b>General disclaimer</b><p><small>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.<br>By continuing to visit this site you agree to our use of everything.</small></p><p><small>Click to close</small></p>',
    duration: -1,
    backgroundColor: "#1ab394",
    position: "center",
    gravity: "bottom",
    className: "toastr-fl",
    close: !1,
    closeOnClick: !0,
    onClick: function() {
        localStorage && localStorage.setItem("lic", 1)
    }
}).showToast();

function getStrDateName() {
    return (new Date).toISOString().substr(0, 19).replaceAll("-", "").replaceAll(":", "").replace("T", "") + ".sqliteonline.com"
}

function getToString(t) {
    let e = "";
    try {
        e = null === t ? "null" : void 0 === t ? "" : t && "object" == typeof t && t.toString ? t.toString() : "" + t
    } catch (t) {
        e = "[err]"
    }
    return e
}

function twoDigits(t) {
    return t < 10 ? "0" + t.toString() : t.toString()
}

function bytes_to_string(t, e) {
    e = !!e;
    let r = t.length,
        n = new Array(r);
    for (var o = 0, i = 0; o < r; o++) {
        let s = t[o];
        if (!e || s < 128) n[i++] = s;
        else if (s >= 192 && s < 224 && o + 1 < r) n[i++] = (31 & s) << 6 | 63 & t[++o];
        else if (s >= 224 && s < 240 && o + 2 < r) n[i++] = (15 & s) << 12 | (63 & t[++o]) << 6 | 63 & t[++o];
        else {
            if (!(s >= 240 && s < 248 && o + 3 < r)) throw new Error("Malformed UTF8 character at byte offset " + o); {
                let e = (7 & s) << 18 | (63 & t[++o]) << 12 | (63 & t[++o]) << 6 | 63 & t[++o];
                e <= 65535 ? n[i++] = e : (e ^= 65536, n[i++] = 55296 | e >> 10, n[i++] = 56320 | 1023 & e)
            }
        }
    }
    let s = "";
    for (let t = 0; t < i; t += 16384) s += String.fromCharCode.apply(String, n.slice(t, t + 16384 <= i ? t + 16384 : i));
    return s
}

function bytes_to_base64(t) {
    return btoa(bytes_to_string(t))
}

function string_to_bytes(t, e) {
    e = !!e;
    let r = t.length,
        n = new Uint8Array(e ? 4 * r : r);
    for (var o = 0, i = 0; o < r; o++) {
        let s = t.charCodeAt(o);
        if (e && 55296 <= s && s <= 56319) {
            if (++o >= r) throw new Error("Malformed string, low surrogate expected at position " + o);
            s = (55296 ^ s) << 10 | 65536 | 56320 ^ t.charCodeAt(o)
        } else if (!e && s >>> 8) throw new Error("Wide characters are not allowed.");
        !e || s <= 127 ? n[i++] = s : s <= 2047 ? (n[i++] = 192 | s >> 6, n[i++] = 128 | 63 & s) : s <= 65535 ? (n[i++] = 224 | s >> 12, n[i++] = 128 | s >> 6 & 63, n[i++] = 128 | 63 & s) : (n[i++] = 240 | s >> 18, n[i++] = 128 | s >> 12 & 63, n[i++] = 128 | s >> 6 & 63, n[i++] = 128 | 63 & s)
    }
    return n.subarray(0, i)
}

function base64_to_bytes(t) {
    return string_to_bytes(atob(t))
}

function buf2hex(t) {
    return Array.prototype.map.call(new Uint8Array(t), function(t) {
        return ("00" + t.toString(16)).slice(-2)
    }).join("")
}

function sqlE(t) {
    return t && t.toString ? t.toString().replaceAll("'", "''") : ""
}

function isEmpty(t) {
    return t.replace(/^\s+/, "")
}

function isNumber(t) {
    return !isNaN(parseFloat(t)) && isFinite(t)
}

function isTNum(t) {
    const e = 1 * t;
    let r = 0;
    return isNaN(e) || (r = Number.isInteger(e) ? 1 : 2), r
}

function isUrl(t) {
    return new RegExp(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/).test(t)
}

function isHexColor(t) {
    return new RegExp(/^#(?:[0-9a-f]{3}){1,2}$/i).test(t)
}

function fAddSpaceText(t, e) {
    for (; t.length < e;) t += " ";
    return t
}

function CMGetHStr(t, e) {
    let r = "",
        n = CodeMirror.splitLines(t);
    return n && n.forEach && n.forEach(function(t) {
        let n = "",
            o = 0;
        CodeMirror.runMode(t, e, function(t, e) {
            if ("\n" === t) return n += "\n", void(o = 0);
            let r = "",
                i = 0;
            for (;;) {
                let e = t.indexOf("\t", i);
                if (-1 === e) {
                    r += t.slice(i), o += t.length - i;
                    break
                } {
                    o += e - i, r += t.slice(i, e);
                    let n = 4 - o % 4;
                    o += n;
                    for (let t = 0; t < n; ++t) r += " ";
                    i = e + 1
                }
            }
            if (e) {
                r = '<span class="' + ("cm-" + e.replace(/ +/g, "cm-")) + '">' + r + "</span>"
            }
            n += r
        }), 0 == t.length ? r += '<pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre>' : r += '<pre class=" CodeMirror-line " role="presentation">' + n + "</pre>\n"
    }), r
}

function escapeHtml(t) {
    const e = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    };
    return t.replace(/[&<>"']/g, function(t) {
        return e[t]
    })
}

String.prototype.replaceAll = function(t, e) {
    return this.replace(new RegExp(t, "g"), e)
}, Date.prototype.toFormatYMDHMS = function() {
    return twoDigits(this.getUTCDate()) + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + this.getUTCFullYear() + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds())
}, Object.defineProperty && Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(Element.prototype, "textContent") && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get && function() {
    let t = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
    Object.defineProperty(Element.prototype, "textContent", {
        get: function() {
            return t.get.call(this)
        },
        set: function(e) {
            return t.set.call(this, e)
        }
    })
}();
const zzz = {
    g: function(t) {
        return document.getElementById(t)
    },
    q: function(t) {
        return document.querySelector(t)
    },
    qa: function(t) {
        return document.querySelectorAll(t)
    },
    ct: function(t) {
        return document.createTextNode(t)
    },
    ce: function(t) {
        return document.createElement(t)
    },
    cec: function(t, n) {
        const e = zzz.ce(t);
        return e.className = n, e
    },
    ceca: function(t, n, e) {
        const c = zzz.cec(t, n);
        return e.forEach(function(t) {
            c.setAttribute(t[0], t[1])
        }), c
    },
    esa: function(t, n) {
        n.forEach(function(n) {
            t.setAttribute(n[0], n[1])
        })
    },
    csl: function(t) {
        const n = zzz.ce("select");
        return t.forEach(function(t, e) {
            const c = n.appendChild(zzz.ce("option"));
            c.textContent = t, c.setAttribute("value", e + 1)
        }), n
    },
    cesl: function(t, n, e, c) {
        const o = t.appendChild(zzz.cec("div", "group group-inp"));
        let u = [
            ["type", "text"]
        ];
        void 0 !== e && u.push(["maxlength", e]);
        const i = o.appendChild(zzz.ceca("input", "i-type", u));
        i.value = n[0];
        const r = o.appendChild(zzz.ceca("button", "btn bg", [
            ["style", "border-right-width:1px;width:35px"]
        ]));
        r.innerHTML = '<i class="fa fa-caret-down" aria-hidden="true"></i>';
        const a = function() {
            i.value = this.textContent, "function" == typeof c && c()
        };
        let f = [];
        return n.forEach(function(t) {
            f.push({
                n: t,
                o: a
            })
        }), r.onclick = function(t) {
            SQP.g(t, f)
        }, i
    }
};
const SQmodiV5 = (() => {
    let t, e = !0;
    const o = window.matchMedia("(max-width: 768px)"),
        n = zzz.g("main-col-team"),
        i = zzz.g("main-col-left"),
        c = zzz.g("main-row-top"),
        u = zzz.g("main-row-slider");
    o.matches ? (u.style.top = "-10px",
        u.style.height = "15px") : u.style.top = "-4px",
    "ontouchstart" in window && (zzz.g("main-team-slider").ontouchstart = function(t) {
        let e = t.touches[0].clientX;
        document.ontouchmove = function(t) {
            const o = t.touches[0];
            n.style.width = (n.offsetWidth - o.clientX + e).toFixed(0) + "px", e = o.clientX
        }, document.ontouchend = function(t) {
            document.ontouchmove = document.ontouchend = null
        }
    },
        zzz.g("main-col-slider").ontouchstart = function(t) {
            let e = t.touches[0].clientX;
            document.ontouchmove = function(t) {
                const o = t.touches[0];
                i.style.width = (i.offsetWidth + o.clientX - e).toFixed(0) + "px", e = o.clientX
            }, document.ontouchend = function(t) {
                document.ontouchmove = document.ontouchend = null
            }
        },
        zzz.g("main-row-slider").ontouchstart = function(t) {
            let o = t.touches[0].clientY;
            document.ontouchmove = function(t) {
                const n = t.touches[0];
                c.style.height = e ? (c.offsetHeight + n.clientY - o).toFixed(0) + "px" : (c.offsetHeight - n.clientY + o).toFixed(0) + "px", o = n.clientY
            }, document.ontouchend = function(t) {
                document.ontouchmove = document.ontouchend = null
            }
        }),
        zzz.g("main-team-slider").onmousedown = function(t) {
            let e = t.clientX;
            document.onmousemove = function(t) {
                n.style.width = (n.offsetWidth - t.clientX + e).toFixed(0) + "px", e = t.clientX
            }, document.onmouseup = function(t) {
                document.onmousemove = document.onmouseup = null
            }
        },
        zzz.g("main-col-slider").onmousedown = function(t) {
            let e = t.clientX;
            document.onmousemove = function(t) {
                i.style.width = (i.offsetWidth + t.clientX - e).toFixed(0) + "px", e = t.clientX
            }, document.onmouseup = function(t) {
                document.onmousemove = document.onmouseup = null
            }
        },
        zzz.g("main-row-slider").onmousedown = function(o) {
            let n = o.clientY;
            document.onmousemove = function(t) {
                c.style.height = e ? (c.offsetHeight + t.clientY - n).toFixed(0) + "px" : (c.offsetHeight - t.clientY + n).toFixed(0) + "px", n = t.clientY
            }, document.onmouseup = function(e) {
                t && t(), document.onmousemove = document.onmouseup = null
            }
        };
    let l = !0,
        m = !1;
    const s = zzz.g("main-col-left").classList;

    function d() {
        (m = o.matches) && (i.style.width = "200px"), s.remove("active"), s.remove("hide"), l = !0
    }

    d(), o.addListener(d), zzz.g("menu-sidnav").onclick = function() {
        m ? l ? s.add("active") : s.remove("active") : l ? s.add("hide") : s.remove("hide"), l = !l
    };
    let h = !0;
    return zzz.g("main-bar-right").style.transition = "0.3s",
        //     zzz.g("menu-setnav").onclick = function () {
        //     zzz.g("main-bar-right").style.right = h ? "0" : "-260px", h = !h
        // }, 
        {
            setCB: function(e) {
                t = e
            },
            reversRight: function() {
                (e = !e) ? (zzz.g("main-col-right").style.flexDirection = "column", zzz.g("main-row-top").style.flexDirection = "column", u.style.bottom = "", o.matches ? (u.style.top = "-10px", u.style.height = "15px") : u.style.top = "-4px") : (zzz.g("main-col-right").style.flexDirection = "column-reverse", zzz.g("main-row-top").style.flexDirection = "column-reverse", u.style.top = "", o.matches ? (u.style.bottom = "-7px", u.style.height = "8px") : u.style.bottom = "-7px")
            },
            getRevers: function() {
                return e
            },
            setCDXRDB: function(t, e) {
                localStorage && (localStorage.setItem(t + "_tic", e.length > 0 ? Date.now().toString() : "0"), localStorage.setItem(t + "_uid", e))
            }
        }
})();
const SQS = function(o) {
    let e = {
        o: o
    };

    function t(o, t, s, n) {
        const l = t / s;
        if (l >= 1) o.style.display = "none";
        else {
            o.style.display = "block";
            const i = Math.max(Math.floor(t * l), 10),
                c = n ? e.o.o.scrollTop : e.o.o.scrollLeft,
                r = (t - i) / (s - t),
                d = c * r + (e.o.k ? 0 : c);
            e.f = r, n ? (o.style.height = i + "px", o.style.top = (d + i < s ? d : s - i) + "px") : (o.style.width = i + "px", o.style.left = (d + i < s ? d : s - i) + "px")
        }
    }

    function s() {
        const o = e.o.o.scrollHeight,
            s = e.o.o.clientHeight,
            n = e.o.o.scrollWidth,
            l = e.o.o.clientWidth;
        e.o.y && t(e.y, s, o, !0), e.o.x && t(e.x, l, n, !1)
    }

    function n(o, t, s) {
        let n, l;
        const i = function(o) {
                let t;
                t = s ? o.pageY - n : o.pageX - n, s ? e.o.o.scrollTop = l + t / e.f : e.o.o.scrollLeft = l + t / e.f
            },
            c = function() {
                t.removeEventListener("mousemove", i), t.removeEventListener("mouseup", c)
            };
        o.addEventListener("mousedown", function(o) {
            return s ? (n = o.pageY, l = e.o.o.scrollTop) : (n = o.pageX, l = e.o.o.scrollLeft), t.addEventListener("mousemove", i), t.addEventListener("mouseup", c), !1
        })
    }

    e.o.o.classList.add("sb-n"), e.o.y && (e.o.o.style.overflowY = "scroll", e.y = e.o.o.appendChild(zzz.cec("div", "sb sb-y nosel")), n(e.y, document, !0), e.o.r && (e.y.style.right = e.o.r + "px")), e.o.x && (e.o.o.style.overflowX = "scroll", e.x = e.o.o.appendChild(zzz.cec("div", "sb sb-x nosel")), n(e.x, document, !1)), s(), window.addEventListener("resize", s), e.o.o.addEventListener("scroll", s), e.o.o.addEventListener("mouseenter", s), e.o.o.addEventListener("mouseup", function() {
        setTimeout(s, 100), setTimeout(s, 300)
    })
};
const SQM = function() {
    const n = zzz.g("sql-online"),
        e = document.body.appendChild(zzz.ceca("div", "dlg act nosel", [
            ["id", "da-modal"],
            ["style", "z-index:40;"]
        ]));
    let t, o, i, c, d, l, a = !1,
        s = !0,
        p = !0;
    const f = document.body.appendChild(zzz.ceca("div", "d-lock bga7", [
            ["id", "dl-modal"],
            ["style", "overflow-y: auto;z-index:30;"]
        ])),
        y = f.appendChild(zzz.ceca("div", "dlg modal bw", [
            ["id", "dh-modal"],
            ["style", "display: block"]
        ])),
        u = y.appendChild(zzz.cec("div", "header")),
        b = y.appendChild(zzz.cec("div", "body")),
        r = y.appendChild(zzz.cec("pre", "hint cm-s-eclipse ow-x-a")),
        m = y.appendChild(zzz.cec("div", "footer")),
        z = m.appendChild(zzz.ceca("button", "btn bg", [
            ["style", "margin-right: auto;"]
        ])),
        h = m.appendChild(zzz.cec("button", "btn bg show")),
        v = m.appendChild(zzz.cec("button", "btn bg")),
        g = y.appendChild(zzz.cec("button", "btn ba")),
        k = u.appendChild(zzz.cec("i", "ibtn bl fa fa-chevron-left")),
        C = u.appendChild(zzz.cec("i", "ibtn br fa fa-chevron-right")),
        x = u.appendChild(zzz.cec("i", "log fa fa-id-card-o")),
        w = u.appendChild(zzz.ce("h4")),
        L = u.appendChild(zzz.ce("small"));

    function E(n) {
        document.removeEventListener("mouseup", H), document.removeEventListener("contextmenu", H), "function" == typeof t && (t(n), t = void 0)
    }

    h.textContent = "Ok", v.textContent = "Close", z.innerHTML = '<i class="fa fa-question" aria-hidden="true"></i>', g.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>', f.onclick = function() {
        o = void 0, i = void 0, d = void 0, l = void 0, f.style.display = "none", "function" == typeof c && (c(), c = void 0), y.classList.remove("ahide")
    }, y.onclick = function(n) {
        n.stopPropagation()
    }, v.onclick = f.onclick, g.onclick = f.onclick, h.onclick = function() {
        let n = !0;
        if ("function" == typeof o) {
            const e = o();
            "boolean" == typeof e && (n = e)
        }
        n && (p ? v.onclick() : h.style.display = "none")
    }, z.onclick = function() {
        "function" == typeof i && i()
    }, k.onclick = function() {
        "function" == typeof d && d()
    }, C.onclick = function() {
        "function" == typeof l && l()
    };
    const H = function(n) {
            if (s) return void 0 !== n && n.preventDefault(), a && (a = !1, E(!0), e.style.display = "none"), !1;
            s = !0
        },
        M = function(n) {
            document.removeEventListener("mousedown", M), n.stopPropagation(), document.addEventListener("mouseup", H, !1), document.addEventListener("contextmenu", H, !1)
        };

    function T(o, i, c) {
        E(!1), "function" == typeof c && (t = c), document.addEventListener("mousedown", M, !1), e.setAttribute("style", "z-index:40;"), e.style.display = "block";
        const d = n.getBoundingClientRect(),
            l = e.getBoundingClientRect();
        if (i + l.height < d.height) e.style.top = i + "px";
        else {
            const n = d.height - l.height - 14;
            n < 0 ? (e.style.top = i + "px", e.style.maxHeight = d.height - (7 + i) + "px", e.style.overflowY = "scroll", e.scrollTop = 0) : e.style.top = n + "px"
        }
        o + l.width < d.width ? e.style.left = o + "px" : e.style.left = d.width - l.width - 7 + "px", a = !0, s = !0
    }

    return {
        s: function(n, t, o) {
            e.onmousedown = void 0, T(n, t, o)
        },
        sd: function(n, t, o) {
            s = !0, e.onmousedown = function() {
                s = !1
            }, T(n, t, o)
        },
        hp: function() {
            return e
        },
        d: function() {
            a && H()
        },
        m: function(n) {
            "object" == typeof n ? (n.cbl ? (d = n.cbl ? n.cbl : void 0, l = n.cbr ? n.cbr : void 0, k.style.display = n.cbl ? "block" : "none", C.style.display = n.cbr ? "block" : "none") : (k.style.display = "none", C.style.display = "none"), o = n.cbo ? n.cbo : void 0, p = void 0 === n.kbo || n.kbo, h.style.display = n.cbo ? "block" : "none", c = n.cbc ? n.cbc : void 0, i = n.cbf ? n.cbf : void 0, z.style.display = n.cbf ? "block" : "none", z.innerHTML = n.bf ? n.bf : '<i class="fa fa-question" aria-hidden="true"></i>', b.style.display = n.mb ? n.mb : "block", r.style.display = n.mt ? n.mt : "none", u.style.display = n.mh ? n.mh : "block", x.className = n.logo ? "log fa " + n.logo : "log fa fa-id-card-o", w.textContent = n.name ? n.name : "", L.textContent = n.hint ? n.hint : "", y.className = n.cw ? "dlg modal " + n.cw : "dlg modal bw", b.style.padding = void 0 !== n.mbp ? n.mbp : "", y.style.padding = void 0 !== n.mdp ? n.mdp : "") : (b.innerHTML = "string" == typeof n ? n : "", r.innerHTML = "", b.style.display = "block", r.style.display = "none", u.style.display = "none", h.style.display = "none", z.style.display = "none", k.style.display = "none", C.style.display = "none", b.style.padding = "", y.style.padding = "", o = void 0, c = void 0, i = void 0, d = void 0, l = void 0, x.className = "log fa fa-id-card-o", w.textContent = "", L.textContent = "", y.className = "dlg modal bw"), f.style.display = "block"
        },
        mo: function() {
            h && h.onclick && h.onclick()
        },
        mc: function() {
            v && v.onclick && v.onclick()
        },
        mb: function() {
            return b
        },
        ns: function() {
            return L
        },
        mt: function() {
            return r
        },
        mah: function() {
            y.classList.add("ahide")
        },
        mar: function() {
            y.classList.remove("ahide")
        }
    }
}();
const SQP = function() {
    let t = 0,
        e = 0,
        n = 0,
        i = "";

    function o(i, o) {
        n > -1 && (i || o && (t != o.r || e != o.x || n != o.y)) && ot && ot.tabCols()[t] && ot.tabCols()[t][e] && ot.tabCols()[t][e].removeAttribute("style")
    }

    function c(t, e, n, c, a, l) {
        o(!a), i = "";
        const p = SQM.hp();
        p.innerHTML = "";
        const d = p.appendChild(zzz.ce("ul"));
        c.forEach(function(t) {
            if (t.n) {
                const e = d.appendChild(zzz.ce("li")).appendChild(zzz.ceca("a", "", [
                    ["tabindex", "-1"]
                ]));
                if (t.i && (Array.isArray(t.i) ? t.i.forEach(t => {
                    e.appendChild(zzz.ceca("i", t, [
                        ["style", "margin-right:5px"]
                    ]))
                }) : e.appendChild(zzz.ceca("i", t.i, [
                    ["style", "margin-right:5px"]
                ]))), t.b) {
                    e.appendChild(zzz.ce("b")).textContent = t.n
                } else e.appendChild(zzz.ct(t.n));
                t.o && (e.onclick = t.o)
            } else d.appendChild(zzz.cec("li", "divider"))
        }), SQM.s(t, e, function(t) {
            l && l(t)
        }), n > 0 && (p.style.width = n + "px")
    }

    return {
        s: function(t, e) {
            t.preventDefault(), SQM.hp().innerHTML = "<ul>" + e + "</ul>", SQM.s(t.pageX, t.pageY, 0)
        },
        g: function(t, e) {
            c(t.pageX, t.pageY, 0, e)
        },
        o: function(t, e) {
            const n = t.getBoundingClientRect();
            c(n.left + 1, n.bottom + 2, n.width - 2, e)
        },
        t: function(i, a, l) {
            o(!1, a), a.y > -1 && ot.tabCols()[a.r][a.x].setAttribute("style", "box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2); position: relative"), t = a.r, e = a.x, n = a.y, c(i.pageX, i.pageY, 0, l, !0, t => {
                o(t)
            })
        },
        p: function(t, e) {
            if (i !== t.id) {
                const n = t.getBoundingClientRect();
                c(n.left, n.bottom + 3, 0, e, !1, () => {
                    setTimeout(() => {
                        i === t.id && (i = "")
                    }, 100)
                }), i = t.id
            } else SQM.d(), i = ""
        }
    }
}();
const SQT = function() {
    return {
        s: function(t) {
            ! function(t) {
                const e = zzz.g(t);
                e.querySelectorAll("li > a").forEach(function(t) {
                    t.onclick = function(t) {
                        t.stopPropagation();
                        const n = t.target.getAttribute("data-link");
                        return n && n.length > 0 && (zzz.q(n).classList.add("active"), t.target.classList.add("active"), e.querySelectorAll("li > a").forEach(function(t) {
                            const e = t.getAttribute("data-link");
                            e != n && (zzz.q(e).classList.remove("active"), "none" != t.parentElement.style.display && t.classList.remove("active"))
                        })), !1
                    }
                })
            }(t)
        }
    }
}();
const SQsw = (() => {
    let e = !1,
        t = !0,
        n = !1;
    const o = zzz.g("div-col-help"),
        i = zzz.g("main-col-team"),
        c = zzz.g("main-col-team-div"),
        z = zzz.g("main-team-slider"),
        a = zzz.g("zce-book"),
        l = zzz.g("div-html-header"),
        d = zzz.g("div-html"),
        s = window.matchMedia("(max-width: 1300px)");

    function r() {
        e = s.matches, t ? e || h() : (h(), e || 1 != SQA.getce_switch() || SQA.fceSwitch(0)), g(!e), t = !1
    }

    function m(e, t) {
        e.parentNode.removeChild(e), t.appendChild(e)
    }

    function h() {
        const t = e ? o : c;
        m(l, t), m(d, t)
    }

    function g(e) {
        return n = "boolean" == typeof e ? e : !n, i.style.display = n ? "block" : "none", z.style.display = n ? "block" : "none", a.className = "btn bg " + (n ? "show" : ""), !t && ot && ot.resTH(), n
    }

    return r(), s.addListener(r), {
        getXK: function() {
            return e
        },
        getTSD: function(e) {
            return g(e)
        }
    }
})();
const ecm = function() {
    let e = {};
    const t = ["ct", "sf", "ii", "us", "uw", "df", "dw", "s*", "sl"];

    function n(e, t, n, o) {
        e.replaceRange(o, {
            line: t.line,
            ch: 0
        }, {
            line: t.line,
            ch: t.ch
        }, n)
    }

    function o(e, t, o, r) {
        const a = function() {
                switch (SQA.get_mm_s()) {
                    case "mariadb":
                        return SQmodMDB.getmarr_shema();
                    case "pgsql":
                        return SQmodPDB.getmarr_shema();
                    case "mssql":
                        return SQmodSDB.getmarr_shema();
                    case "plsql":
                        return SQmodODB.getmarr_shema();
                    default:
                        return SQmodSQL.getmarr_shema()
                }
            }().table,
            c = r.trimLeft(),
            i = r.length - c.length,
            s = r.substr(0, i);
        let l = c.split(" "),
            m = 0,
            u = !1;
        if ((l = l.filter(function(e) {
            return m += u && "" === e ? 1 : 0, u = "" != e
        })).length > 1) {
            l[1] = l[1].toLocaleLowerCase();
            let c = 0,
                i = -1;
            if (a.a.forEach(function(e, t) {
                const n = e.name.toLocaleLowerCase();
                if (1 === m) n === l[1] && (c = 1, i = t);
                else {
                    0 === n.indexOf(l[1]) && (c++, i = t)
                }
            }), 1 === c) {
                const c = a.a[i].name,
                    l = function(e, t) {
                        let n = [],
                            o = [],
                            r = [];
                        return e.j[t].c.forEach(function(e, t) {
                            1 === e.pk ? r.push(e.name) : n.push(e.name), t > 0 && o.push(",")
                        }), {
                            c: n,
                            l: o,
                            p: r
                        }
                    }(a, c);
                switch (o) {
                    case 1:
                        n(e, t, r, s + "SELECT " + l.p.concat(l.c).join(", ") + " FROM " + c + ";");
                        break;
                    case 2:
                        n(e, t, r, s + "INSERT INTO " + c + " (" + l.p.concat(l.c).join(", ") + ") VALUES (" + l.l.join("") + ");");
                        break;
                    case 3:
                        n(e, t, r, s + "UPDATE " + c + " SET " + l.p.concat(l.c).join(", ") + ";");
                        break;
                    case 4:
                        n(e, t, r, s + "UPDATE " + c + " SET " + l.c.join(", ") + " WHERE " + l.p.join(", ") + ";");
                        break;
                    case 5:
                        n(e, t, r, s + "DELETE FROM " + c + ";");
                        break;
                    case 6:
                        n(e, t, r, s + "DELETE FROM " + c + " WHERE " + l.p.join(", ") + ";");
                        break;
                    case 7:
                        n(e, t, r, s + "SELECT * FROM " + c + ";");
                        break;
                    case 8:
                        const a = l.p.join(", ");
                        n(e, t, r, s + "SELECT * FROM " + c + (a.trim().length > 0 ? " ORDER BY " + a + " DESC " : "") + " LIMIT 100;")
                }
            }
        } else 0 === o && n(e, t, r, s + "CREATE TABLE ")
    }

    function r(e, n, r) {
        //let a = CodeMirror.fromTextArea(zzz.g("text-sql-" + e), {
        //    theme: "eclipse",
        //    mode: "text/x-mssql",
        //    scrollbarStyle: "simple",
        //    lineNumbers: !0,
        //    extraKeys: {
        //        "Ctrl-Space": "autocomplete",
        //        "Alt-Space": "autocomplete",
        //        "Shift-Enter": function(e) {
        //            SQA.run()
        //        },
        //        "Ctrl-S": function(e) {
        //            const t = r && r.x ? r.x : 0;
        //            t > 0 ? SQmodCloud.updASQL(t, e.getValue()) : SQmodSQLFile.saveText()
        //        }
        //    }
        //});
        //return a.focus(), CodeMirror.commands.autocomplete = function(e) {
        //    switch (SQA.get_mm_s()) {
        //        case "mariadb":
        //            CodeMirror.showHint(e, CodeMirror.hint.sql, {
        //                completeSingle: !1,
        //                tables: SQmodMDB.getmarr_shema_hint().tables,
        //                column: SQmodMDB.getmarr_shema_hint().column
        //            });
        //            break;
        //        case "pgsql":
        //            CodeMirror.showHint(e, CodeMirror.hint.sql, {
        //                completeSingle: !1,
        //                tables: SQmodPDB.getmarr_shema_hint().tables,
        //                column: SQmodPDB.getmarr_shema_hint().column
        //            });
        //            break;
        //        case "mssql":
        //            CodeMirror.showHint(e, CodeMirror.hint.sql, {
        //                completeSingle: !1,
        //                tables: SQmodSDB.getmarr_shema_hint().tables,
        //                column: SQmodSDB.getmarr_shema_hint().column
        //            });
        //            break;
        //        case "plsql":
        //            CodeMirror.showHint(e, CodeMirror.hint.sql, {
        //                completeSingle: !1,
        //                tables: SQmodODB.getmarr_shema_hint().tables,
        //                column: SQmodODB.getmarr_shema_hint().column
        //            });
        //            break;
        //        default:
        //            CodeMirror.showHint(e, CodeMirror.hint.sql, {
        //                completeSingle: !1,
        //                tables: SQmodSQL.getmarr_shema_hint().tables,
        //                column: SQmodSQL.getmarr_shema_hint().column
        //            })
        //    }
        //}, a.on("keyup", function(e, n) {
        //    let r = n.keyCode || n.which,
        //        a = e.getDoc().getCursor(),
        //        c = e.getTokenAt(a),
        //        i = !c || !c.type || "string" != c.type;
        //    if (!e.state.completionActive && !n.ctrlKey && (r >= 65 && r <= 90 || 190 == r) && i && CodeMirror.commands.autocomplete(e, null, {
        //        completeSingle: !1
        //    }), null === a.sticky) {
        //        const n = e.getLine(a.line),
        //            r = function(e) {
        //                let n = -1;
        //                return t.forEach(function(t, o) {
        //                    0 === e.trimLeft().toLocaleLowerCase().indexOf(t + " ") && (n = o)
        //                }), n
        //            }(n);
        //        r > -1 && o(e, a, r, n)
        //    }
        //}), a
    }

    return {
        c: function(t, n, o) {
            e[t] = {
                c: r(t, n, o),
                m: n,
                o: o
            }
        },
        l: function() {
            return e
        },
        g: function(t) {
            return e[t] ? e[t].c : void 0
        },
        m: function(t) {
            return e[t].m
        },
        a: function() {
            return e[SQA.get_sel_tab()].c
        },
        v: function() {
            return e[SQA.get_sel_tab()].c.getValue()
        },
        s: function(t) {
            return e[SQA.get_sel_tab()].c.setValue(t)
        },
        o: function(t) {
            return e[t].o
        },
        d: function(t) {
            e[t] && delete e[t]
        }
    }
}();
const SQN = function() {
    const t = {
        ma: "https://mdb2.sqliteonline.com/fn/mariadb/",
        pg: "https://pdb.sqliteonline.com/fn/postgresql/",
        or: "https://odb.sqliteonline.com/fn/oracle/",
        ms: "https://sdb.sqliteonline.com/fn/mssql/"
    };
    let n = {
        lo: "",
        ca: "https://cloud.sqliteonline.net",
        ma: "https://mdb2.sqliteonline.com/fn/mariadb/",
        pg: "https://pdb.sqliteonline.com/fn/postgresql/",
        or: "https://odb.sqliteonline.com/fn/oracle/",
        ms: "https://sdb.sqliteonline.com/fn/mssql/"
    };

    async function e(t, e, o, s) {
        let i = {},
            c = "function" == typeof s;
        try {
            const s = await fetch(n[t] + e, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(o)
            });
            c && (i = await s.json()), i.kerr = !0
        } catch (t) {
            i = {
                err: "The service is temporarily unavailable. Please try again in a few minutes. | " + t.message,
                kerr: !1
            }
        }
        c && s(i)
    }

    return {
        a: function(t, n, o) {
            e("ca", t, n, o)
        },
        b: function(t, n) {},
        c: function(t, n, o, s) {
            e(t, n, o, s)
        },
        e: function(t, e, o, s) {
            !async function(t, e, o, s) {
                let i = {
                    k: !1,
                    e: "",
                    b: ""
                };
                try {
                    const s = await fetch(n[t] + e + (o.length > 0 ? "?" + o : ""));
                    i.b = await s.text(), i.k = !0
                } catch (t) {
                    i.e = t.message
                }
                "function" == typeof s && s(i)
            }(t, e, o, s)
        },
        g: function(t) {
            return n[t]
        },
        x: function(t, e) {
            n[t] = e
        },
        z: function(e) {
            n[e] = t[e]
        }
    }
}();
const SQmodPage = function() {
    const e = '<div id="div-html-name-z" style="display: none" description="SQL Online: SELECT INSERT DELETE UPDATE DROP CREATE ..." keywords="sql example,sql online, sql syntax, sqlite syntax, syntax, sqlite">Syntax</div><div class="ndex row-2"><p><a onclick="foncindex(event, this)" href="/syntax/all_functions">all functions</a></p><p><a onclick="foncindex(event, this)" href="/syntax/comment">comment</a></p></div><div class="ndex row-2"><p><a onclick="foncindex(event, this)" href="/syntax/alter_table">ALTER TABLE</a></p><p><a onclick="foncindex(event, this)" href="/syntax/analyze">ANALYZE</a></p><p><a onclick="foncindex(event, this)" href="/syntax/attach_database">ATTACH DATABASE</a></p></div><div class="ndex row-2"><p><a onclick="foncindex(event, this)" href="/syntax/create_index">CREATE INDEX</a></p><p><a onclick="foncindex(event, this)" href="/syntax/create_table">CREATE TABLE</a></p><p><a onclick="foncindex(event, this)" href="/syntax/create_trigger">CREATE TRIGGER</a></p><p><a onclick="foncindex(event, this)" href="/syntax/create_view">CREATE VIEW</a></p></div><div class="ndex row-2"><p><a onclick="foncindex(event, this)" href="/syntax/drop_index">DROP INDEX</a></p><p><a onclick="foncindex(event, this)" href="/syntax/drop_table">DROP TABLE</a></p><p><a onclick="foncindex(event, this)" href="/syntax/drop_trigger">DROP TRIGGER</a></p><p><a onclick="foncindex(event, this)" href="/syntax/drop_view">DROP VIEW</a></p><p><a onclick="foncindex(event, this)" href="/syntax/delete">DELETE</a></p><p><a onclick="foncindex(event, this)" href="/syntax/detach_database">DETACH DATABASE</a></p></div><div class="ndex row-2"><p><a onclick="foncindex(event, this)" href="/syntax/insert">INSERT</a></p><p><a onclick="foncindex(event, this)" href="/syntax/select">SELECT</a></p><p><a onclick="foncindex(event, this)" href="/syntax/update">UPDATE</a></p><p><a onclick="foncindex(event, this)" href="/syntax/transaction">TRANSACTION</a></p><p><a onclick="foncindex(event, this)" href="/syntax/vacuum">VACUUM</a></p><p><a onclick="foncindex(event, this)" href="/syntax/with">WITH</a></p></div>';
    let n = !1,
        t = "",
        i = !0,
        a = {
            sTitle: "",
            sDescription: "",
            sKeywords: ""
        };

    function s(e) {
        e && e.length > 0 ? (zzz.g("htitle").innerHTML = e, zzz.g("hkeywords").content = "sqlite, sqlite online, data science, sqlite viewer, sqlite editor, sqlite manager, sqlite browser,select,insert,update,delete,sql", zzz.g("hdescription").content = "SQL OnLine - SQLite, MySQL / MariaDB, PostgreSQL, MsSQL, Oracle. User-friendly interface for Data Science. No DownLoad, No Install.") : (zzz.g("htitle").innerHTML = a.sTitle, zzz.g("hkeywords").content = a.sKeywords, zzz.g("hdescription").content = a.sDescription)
    }

    function o(e, n) {
        zzz.g("div-html").innerHTML = e;
        try {
            let e = zzz.g("div-html-name-z").textContent;
            e && 0 != e.toLocaleLowerCase().indexOf("index") ? (a.sTitle = "Online SQL Compiler: " + e, a.sKeywords = zzz.g("div-html-name-z").getAttribute("keywords"), a.sDescription = zzz.g("div-html-name-z").getAttribute("description")) : (a.sTitle = "SQL Online IDE", a.sKeywords = "sql, sql online, data science, sqlite, sqlite online, sqlite viewer, sqlite editor, sqlite manager, sqlite browser,select,insert,update,delete,sql", a.sDescription = "SQL OnLine - SQLite, MariaDB / MySQL, PostgreSQL. User-friendly interface for Data Science. No registration for start, No DownLoad, No Install."), e && (zzz.g("div-html-name").innerHTML = e), s()
        } catch (e) {}
        n && SQsw.getXK() && 1 != SQA.getce_switch() && n && SQA.fceSwitch(1)
    }

    return {
        index: function() {
            t.length < 1 ? (t = SQsw.getXK() ? e : '<div id="sql-adv2"><ins class="adsbygoogle" style="display:block; text-align:center;" data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-4902214716381705" data-ad-slot="5258365579"></ins></div>' + e, zzz.g("div-html").innerHTML = t, zzz.g("div-html-name").innerHTML = "Syntax") : o(t, !0), n = !1
        },
        open: function(e) {
            i = !1,
                function(e, n, a) {
                    SQN.e("lo", "/syntax/" + e + ".html", "", function(s) {
                        s.k ? ("index" == e && (t = s.b), n && (o(s.b, a), a && SQX.sendstat(5))) : toastr.error("The service is temporarily unavailable. Please try again in a few minutes. " + s.e, "Network"), i = !0
                    })
                }(e, !0, !0), n = !1
        },
        akey: function(e) {
            return "boolean" == typeof e && (n = e), n
        },
        getbkey: function() {
            return i
        },
        getTitle: function(e) {
            s(e)
        }
    }
}();
const SQmodChart = function() {
    const t = zzz.g("div-col-chart-hint"),
        o = zzz.g("canvas").getContext("2d");
    let e, n;

    function a(o) {
        t.style.display = o ? "block" : "none"
    }

    zzz.g("btn-chart-hide").onclick = function() {
        a("none" === t.style.display)
    };
    let i = [],
        l = [],
        s = 0;

    function r() {
        l = [], i = ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"], s = 0
    }

    function c() {
        let t;
        if (i.length > 0) {
            const e = (o = i.length, Math.floor(Math.random() * Math.floor(o)));
            t = i[e], l.push(t), i.splice(e, 1)
        } else s = s < l.length - 1 ? s + 1 : 1, t = l[s];
        var o;
        return t
    }

    function d(t, n, a) {
        e && n !== e.config.type && (e.destroy(), e = void 0), e ? (e.config.type = n, e.config.data = t, e.config.options = t, e.update()) : e = new Chart(o, {
            options: a,
            type: n,
            data: t
        })
    }

    function f(t) {
        let o = c(),
            e = t.toLowerCase(),
            n = e.indexOf("_c");
        if (n > 0) {
            let a = e.substr(n + 2, e.length - (n + 2));
            [3, 6].indexOf(a.length) > -1 && (o = "#" + a, t = t.substr(0, n))
        }
        return {
            c: o,
            n: t
        }
    }

    let u = !0,
        h = !1;
    return {
        show: function(t) {
            SQA.flockbtn(),
                function(t) {
                    if (u) {
                        u = !1;
                        let o = document.createElement("script");
                        o.onload = function() {
                            h = !0, t()
                        }, o.async = 1, o.src = "/l/cm300a.js", document.getElementsByTagName("head")[0].appendChild(o)
                    } else h && t()
                }(function() {
                    switch (a(!1), n = Chart.helpers.color, t) {
                        case 2:
                            ! function() {
                                let t = [],
                                    o = [];
                                r(), ot.getMAV().forEach(function(e, a) {
                                    e.forEach(function(e, i) {
                                        if (i > 0)
                                            if (a > 0) o[i - 1].data.push(e);
                                            else {
                                                const t = f(ot.getMC(i));
                                                o.push({
                                                    lineTension: .5,
                                                    label: t.n,
                                                    backgroundColor: n(t.c).alpha(.5).rgbString(),
                                                    borderColor: t.c,
                                                    fill: "start",
                                                    data: [e]
                                                })
                                            }
                                        else t.push(e)
                                    })
                                }), d({
                                    labels: t,
                                    datasets: o
                                }, "line", {
                                    maintainAspectRatio: !1,
                                    legend: {
                                        position: "bottom"
                                    },
                                    responsive: !0,
                                    plugins: {
                                        filler: {
                                            propagate: !0
                                        }
                                    },
                                    scales: {
                                        yAxes: [{
                                            stacked: !0
                                        }]
                                    }
                                })
                            }();
                            break;
                        case 3:
                            ! function() {
                                let t = [],
                                    o = [];
                                r(), ot.getMAV().forEach(function(e, a) {
                                    e.forEach(function(e, i) {
                                        if (i > 0)
                                            if (a > 0) o[i - 1].data.push(e);
                                            else {
                                                const t = f(ot.getMC(i));
                                                o.push({
                                                    label: t.n,
                                                    backgroundColor: n(t.c).alpha(.5).rgbString(),
                                                    borderColor: t.c,
                                                    borderWidth: 1,
                                                    data: [e]
                                                })
                                            }
                                        else t.push(e)
                                    })
                                }), d({
                                    labels: t,
                                    datasets: o
                                }, "bar", {
                                    maintainAspectRatio: !1,
                                    legend: {
                                        position: "bottom"
                                    },
                                    responsive: !0,
                                    title: {
                                        display: !1
                                    }
                                })
                            }();
                            break;
                        case 4:
                            ! function() {
                                let t = [],
                                    o = [];
                                if (r(), ot.getMAV().forEach(function(e, a) {
                                    e.forEach(function(e, i) {
                                        if (i > 0)
                                            if (a > 0) {
                                                if (o[i - 1].data.push(e), 1 === i) {
                                                    const t = c();
                                                    o[i - 1].backgroundColor.push(t)
                                                }
                                            } else if (1 === i) {
                                                const t = c();
                                                o.push({
                                                    backgroundColor: [n(t).alpha(.5).rgbString()],
                                                    borderColor: t,
                                                    borderWidth: 1,
                                                    data: [e]
                                                })
                                            } else o.push({
                                                borderWidth: 1,
                                                data: [e]
                                            });
                                        else t.push(e)
                                    })
                                }), o.length > 1)
                                    for (let t = 1; t < o.length; t++) o[t].backgroundColor = o[0].backgroundColor, o[t].borderColor = o[0].borderColor;
                                d({
                                    labels: t,
                                    datasets: o
                                }, "pie", {
                                    maintainAspectRatio: !1,
                                    responsive: !0
                                })
                            }();
                            break;
                        default:
                            ! function() {
                                let t = [],
                                    o = [];
                                r(), ot.getMAV().forEach(function(e, a) {
                                    e.forEach(function(e, i) {
                                        if (i > 0)
                                            if (a > 0) o[i - 1].data.push(e);
                                            else {
                                                const t = f(ot.getMC(i));
                                                o.push({
                                                    lineTension: .5,
                                                    label: t.n,
                                                    backgroundColor: n(t.c).alpha(.5).rgbString(),
                                                    borderColor: t.c,
                                                    fill: !1,
                                                    data: [e]
                                                })
                                            }
                                        else t.push(e)
                                    })
                                }), d({
                                    labels: t,
                                    datasets: o
                                }, "line", {
                                    maintainAspectRatio: !1,
                                    responsive: !0,
                                    legend: {
                                        position: "bottom"
                                    },
                                    title: {
                                        display: !1
                                    }
                                })
                            }()
                    }
                    SQA.funlockbtn()
                }), SQX.sendstat(21)
        }
    }
}();
const ot = function() {
    let e = [],
        t = [],
        n = 0,
        o = [],
        l = 0;
    const a = zzz.g("main-col-right"),
        i = zzz.g("table-btn-tab-page"),
        s = zzz.g("table-btn-tab-page-scroll"),
        c = zzz.g("table-head"),
        r = zzz.g("table-body"),
        d = zzz.q(".div-main-main");
    let u = 0,
        f = 0,
        h = 21,
        p = !0,
        g = document.createElement("canvas"),
        m = !1,
        b = [],
        z = [],
        y = {
            o: void 0,
            x: -1,
            y: -1,
            b: !0
        };
    const C = window.innerHeight,
        x = window.innerWidth,
        v = x > C ? x / 30 | 0 : C / 30 | 0,
        T = v < 100 ? 100 : v;
    let w = Array(T),
        L = 0,
        M = Array(T).fill(0).map(function() {
            return Array(T).fill(0)
        }),
        S = Array(T).fill(0).map(function() {
            return Array(T).fill(0)
        }),
        A = Array(T).fill(!1).map(function() {
            return Array(T).fill(!1)
        }),
        k = Array(T).fill(!1).map(function() {
            return Array(T).fill(!1)
        });
    zzz.g("main-table-scroll").onscroll = function() {
        let e = zzz.g("main-table-scroll").scrollTop;
        ot.tableupdatez(e), SQM.d(), U()
    };
    try {
        g && g.getContext && (m = g.getContext("2d")) && m.font ? m.font = 'font-size: 13px;font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;' : p = !1
    } catch (e) {
        p = !1
    }
    let N, E = [],
        H = [],
        O = zzz.g("div-main-grid-table-scroll");
    try {
        if (localStorage) {
            let e = localStorage.getItem("columns-size"),
                t = JSON.parse(e);
            if (Array.isArray(t)) {
                let e = !0,
                    n = 0;
                t.forEach(function(t) {
                    !e || t.s && t.a ? "id,name,hint" === t.s && t++ : e = !1
                }), e && n < 2 && (H = t)
            }
        }
    } catch (e) {}
    let R = 0;

    function I(e) {
        let n = !0,
            o = 0;
        const l = t.join(",").toLocaleLowerCase();
        if (E.length > 0 || H.length > 0)
            for (let e = 0; e < H.length; e++)
                if (H[e].s === l) {
                    E = H[e].a, o = e, n = !1;
                    break
                }
        return n ? (E = Array(e + 1).fill(0), H.push({
            s: l,
            a: E
        }), H.length > 20 && H.splice(0, 1)) : H.push(H.splice(o, 1)[0]), localStorage && (window.clearTimeout(R), R = window.setTimeout(function() {
            localStorage.setItem("columns-size", JSON.stringify(H))
        }, 1e3)), n
    }

    function D(e, t, n, o) {
        let l = 0;
        const a = O.getBoundingClientRect(),
            i = z.length - 1;
        z.forEach(function(e, t) {
            i > t && (l += e === n ? o : E[e])
        }), l + t < a.width ? e.style.width = "auto" : e.style.width = t + "px", H.length > 0 && (H[H.length - 1].a = E)
    }

    function Q(n) {
        let o = e[n],
            l = SQM.mb();
        l.innerHTML = "", o && Array.isArray(o) ? o.forEach(function(e, n) {
            let o = zzz.ce("p"),
                a = zzz.ce("strong");
            a.textContent = t[n] ? t[n] : "";
            let i = zzz.cec("pre", "code");
            if (o.appendChild(a), o.appendChild(i), l.appendChild(o), e instanceof Uint8Array) {
                let t = 0,
                    n = 0,
                    o = [255, 216, 255, 224, 0, 16, 74, 70, 73, 70],
                    l = !0,
                    a = [137, 80, 78, 71, 13, 10, 26, 10],
                    s = !0,
                    c = [71, 73, 70],
                    r = !0;
                if (e.length > 10)
                    for (; n < 10;) l && o[n] != e[n] ? l = !1 : l && 9 == n && (t = 1, n = 10), s && a[n] != e[n] ? s = !1 : s && 7 == n && (t = 2, n = 10), r && c[n] != e[n] ? r = !1 : r && 2 == n && (t = 3, n = 10), n++;
                switch (i.className = "row-img-limit", t) {
                    case 1:
                        i.innerHTML = '<IMG src="' + URL.createObjectURL(new Blob([e], {
                            type: "image/jpg"
                        })) + '">';
                        break;
                    case 2:
                        i.innerHTML = '<IMG src="' + URL.createObjectURL(new Blob([e], {
                            type: "image/png"
                        })) + '">';
                        break;
                    case 3:
                        i.innerHTML = '<IMG src="' + URL.createObjectURL(new Blob([e], {
                            type: "image/gif"
                        })) + '">';
                        break;
                    default:
                        let n = "";
                        e.forEach(function(e) {
                            let t = e.toString(16);
                            n += e < 10 ? "0" + t : t
                        }), i.textContent = e
                }
            } else if (null === e) i.className = "tdobj2", i.textContent = "Null";
            else {
                let t = e,
                    n = !1;
                try {
                    "string" == typeof t && "data:image/" == t.substr(0, 11).toLowerCase() && (n = !0)
                } catch (e) {}
                if (n) {
                    i.className = "row-img-limit", i.innerHTML = "", i.appendChild(document.createElement("img")).setAttribute("src", t)
                } else {
                    let e = "",
                        n = 0;
                    try {
                        e = getToString(t)
                    } catch (e) {}
                    switch (e.indexOf("://") > 0 ? isUrl(e) && (n = 1) : "#" == e[0] && isHexColor(e) && (n = 2), i.className = "", n) {
                        case 1:
                            i.innerHTML = "";
                            let o = i.appendChild(document.createElement("a"));
                            o.setAttribute("href", t), o.setAttribute("target", "_blank"), o.textContent = t;
                            break;
                        case 2:
                            i.textContent = t, i.setAttribute("style", "border-left: 35px solid " + t + ";padding-left: 3px;");
                            break;
                        default:
                            i.textContent = t
                    }
                }
            }
        }) : toastr.error("Error data row", "Table")
    }

    function W(n, o) {
        let l = n ? t.length : 1,
            i = document.createElement("tr");
        i.className = "noselect", L = 0, z = [];
        const s = SQmodMMal.getDefTableName().s;
        for (let e = 0; e < l; e++)
            if (b[e]) {
                z.push(e), n && L++;
                let o = i.appendChild(document.createElement("th"));
                o.setAttribute("id", "table-th-" + e), o.className = "noselect colresize";
                let l = o.appendChild(document.createElement("div"));
                l.className = "tdhed cuttextsize", l.innerHTML = "", n ? s.n === t[e] ? (l.appendChild(zzz.ct(t[e])), "ASC" === s.t ? l.appendChild(zzz.ceca("i", "fa fa-sort-amount-asc", [
                    ["style", "margin-left:5px;"]
                ])) : l.appendChild(zzz.ceca("i", "fa fa-sort-amount-desc", [
                    ["style", "margin-left:5px;"]
                ]))) : l.textContent = t[e] : l.innerHTML = "&nbsp;"
            }
        c.innerHTML = "", c.appendChild(i), ot.setscrollbar();
        const f = a.getBoundingClientRect().height;
        (u = f / 34 + 3 | 0) > T && (u = T), r.innerHTML = "";
        for (let t = 0; t < u; t++) {
            w[t] = zzz.ce("tr"), n && 0 !== e.length || (w[t].className = (t / 2 | 0) == t / 2 ? "table-tr-d" : "table-tr-h");
            for (let e = 0; e < l; e++) b[e] && (M[t][e] = w[t].appendChild(zzz.cec("td", "noselect tablemouseevent")), S[t][e] = M[t][e].appendChild(zzz.cec("div", "thover")), S[t][e].innerHTML = "&nbsp;", A[t][e] = !1, k[t][e] = !1);
            r.appendChild(w[t])
        }
        n && (ot.tablerepaint(), function(e, t) {
            let n, o = 0,
                l = 0,
                a = 0;
            a = parseInt((d.getBoundingClientRect().width - 38) / e, 10);
            const i = c.querySelectorAll(".colresize"),
                s = i.length - 1;
            t || (t = !I(s)), i.forEach(function(e, i) {
                e.style.position = "relative", t || (E[i] = a), s == i ? (N = e, t ? D(N, E[z[i]]) : e.style.width = "auto") : e.style.width = E[z[i]] + "px";
                let c = document.createElement("div");
                c.innerHTML = "&nbsp;", c.style.top = "0", c.style.right = i < s ? "-4px" : "0", c.style.bottom = "0", c.style.width = i < s ? "7px" : "6px", c.style.position = "absolute", c.style.cursor = "col-resize", c.style.zIndex = "3", c.className = "noselect", c.addEventListener("mousedown", function(t) {
                    SQM.d(), n = e, o = i, l = e.offsetWidth - t.pageX
                }), e.appendChild(c)
            }), document.addEventListener("mousemove", function(e) {
                if (n) {
                    let t = l + e.pageX;
                    E[z[o]] = t < 40 ? 40 : t, n.style.width = E[z[o]] + "px", D(N, E[z[z.length - 1]])
                }
            }), document.addEventListener("mouseup", function() {
                n = void 0
            })
        }(L, o))
    }

    function B(e, t) {
        const n = zzz.q("#table-head TR"),
            o = zzz.q("#table-body TR"),
            l = document.querySelectorAll("#table-head TH");
        if (n && o && l) {
            const a = e.layerX,
                i = e.layerY,
                s = n.getBoundingClientRect(),
                c = o.getBoundingClientRect(),
                r = s.height + 1,
                d = c.height,
                u = i - zzz.g("main-table-scroll").scrollTop - r;
            let f = a + zzz.g("div-main-grid-table-scroll").scrollLeft,
                h = 0,
                p = !1;
            Array.prototype.forEach.call(l, function(e) {
                let t = e.getBoundingClientRect();
                (f -= t.width) > 0 && h++, p = !0
            }), p && t(u, d, h)
        }
    }

    function U() {
        y.o && y.o.classList && (["table-mouse-active", "table-mouse-active-shadow", "table-mouse-active-shadow-bo", "table-mouse-active-re"].forEach(e => {
            y.o.classList.contains(e) && y.o.classList.remove(e)
        }), y.o = void 0)
    }

    const j = !(navigator && navigator.userAgent && navigator.userAgent.toLowerCase().indexOf("safari") > -1 && navigator.userAgent.toLowerCase().indexOf("chrome") < 0),
        q = zzz.g("div-col-table");
    let F = 0;
    const P = zzz.g("hover-cell");
    if (P) {
        if (localStorage) try {
            F = parseInt(localStorage.getItem("ihc") || F);
            let e = P.options;
            for (let t, n = 0; t = e[n]; n++)
                if (parseInt(t.value) === F) {
                    P.selectedIndex = n;
                    break
                }
        } catch (e) {}
        P.onchange = function(e) {
            var t;
            F = parseInt(e.srcElement.value), t = F, localStorage ? localStorage.setItem("ihc", t) : toastr.error("Sorry, your browser do not support.", "Setting")
        }
    }

    function V(e) {
        switch (e.which) {
            case 39:
                ot.OpenROWCNext();
                break;
            case 37:
                ot.OpenROWCBack()
        }
    }

    q.addEventListener("mousemove", function(n) {
        n.preventDefault(), y.b && (y.b = !1, B(n, function(n, o, l) {
            const a = 1 + (n / o | 0),
                i = a + f - 1;
            if (n > 0 && a > 0 && l >= 0 && l < t.length && i >= 0 && i < e.length) {
                const e = z[l],
                    t = a - 1,
                    o = M[t][e];
                if (q.style.cursor = k[t][e] ? "pointer" : "default", y.o && (y.x !== e || y.y !== t || n <= 0) && U(), F > 0 && n > 0 && o.className.indexOf("table-mouse-active") < 0 && i > -1 && !y.o) switch (y.x = e, y.y = t, y.o = o, F) {
                    case 1:
                        o.classList.add("table-mouse-active"), o.classList.add("table-mouse-active-shadow"), j && o.classList.add("table-mouse-active-shadow-bo");
                        break;
                    case 2:
                        o.classList.add("table-mouse-active-re")
                }
            } else y.o && U(), q.style.cursor = "default";
            y.b = !0
        }))
    }), q.addEventListener("mouseleave", function(e) {
        e.preventDefault(), y.o && U()
    }), q.addEventListener("click", function(n) {
        n.preventDefault(), B(n, function(n, o, l) {
            if (n > 0) {
                const a = 1 + (n / o | 0),
                    i = a + f - 1;
                if (a > 0 && l >= 0 && l < t.length && i >= 0 && i < e.length) {
                    const e = z[l],
                        t = a - 1,
                        n = M[t][e];
                    if (k[t][e] && n) {
                        const e = n.querySelector("A");
                        e && e.dispatchEvent(new MouseEvent("click"))
                    }
                }
            }
        })
    }), q.addEventListener("dblclick", function(n) {
        n.preventDefault(), B(n, function(n, o, l) {
            if (n > 0) {
                let a = 1 + (n / o | 0) + f - 1;
                l >= 0 && l < t.length && a >= 0 && a < e.length && ot.OpenROW(a)
            }
        })
    }), q.addEventListener("contextmenu", function(n) {
        "A" !== n.target.nodeName && (n.preventDefault(), B(n, function(o, l, a) {
            if (o > 0) {
                const i = 1 + (o / l | 0),
                    s = i + f - 1;
                if (a >= 0 && a < t.length && s >= 0 && s < e.length) {
                    let e = [{
                        n: "Copy to SQL-text",
                        o: function() {
                            ot.CopyToText(z[a], s)
                        }
                    }, {
                        n: "Copy to Clipboard",
                        o: function() {
                            ot.CopyToClipboard(z[a], s)
                        }
                    }, {
                        n: "Save to File",
                        o: function() {
                            ot.CopyToFile(z[a], s)
                        }
                    }, {
                        d: 1
                    }, {
                        n: "Open row",
                        o: function() {
                            ot.OpenROW(s)
                        }
                    }];
                    SQmodMMal.getIColPK() > 0 && (e.unshift({
                        d: 1
                    }), e.unshift({
                        n: "DELETE",
                        o: function() {
                            SQmodMMal.DelROW(s)
                        }
                    }), e.unshift({
                        n: "UPDATE (edit row)",
                        o: function() {
                            SQmodMMal.UpdROW(s)
                        }
                    })), SQP.t(n, {
                        y: s,
                        x: z[a],
                        r: i - 1
                    }, e)
                }
            } else if ((a = a < 0 ? 0 : a > t.length - 1 ? t.length - 1 : a) >= 0) {
                let e = [{
                    n: "Copy to SQL-text",
                    o: () => {
                        ot.CopyToText(z[a], -1)
                    }
                }, {
                    d: 1
                }, {
                    n: "Width",
                    o: () => {
                        ot.ShowColWIDTH(z[a])
                    }
                }, {
                    n: "auto-Width",
                    o: ot.setAutoWIDTH
                }];
                SQmodMMal.getDefTableName().n.length > 0 && (e.push({
                    d: 1
                }), e.push({
                    n: "ASC",
                    o: () => {
                        SQmodMMal.sortDASC(t[z[a]], "ASC")
                    }
                }), e.push({
                    n: "DESC",
                    o: () => {
                        SQmodMMal.sortDASC(t[z[a]], "DESC")
                    }
                })), SQP.t(n, {
                    y: -1,
                    x: 0,
                    r: 0
                }, e)
            }
        }))
    });
    const G = zzz.g("table-btn-oc");
    let X;

    function _() {
        i.innerHTML = "", s.style.boxShadow = "", s.scrollLeft = 0;
        const l = o.length;
        if (l > 1) {
            for (let a = 0; a < l; a++) {
                const l = i.appendChild(zzz.cec("button", "btn bg" + (a === n ? " show" : "")));
                l.textContent = a + 1, a === n && (X = l), l.onclick = function() {
                    a !== n && (X && X.classList.remove("show"), (X = l).classList.add("show"), e = o[n = a].v, t = o[n].c, ot.tableload())
                }
            }
            s.style.display = "block"
        } else s.style.display = "none"
    }

    return G.onclick = (e => {
        let n = [];
        if (t.length > 0) {
            const e = t.length;
            for (let o = 0; o < e; o++) o < T && n.push({
                n: t[o],
                i: b[o] ? "fa fa-check-square-o" : "fa fa-square-o",
                o: () => {
                    b[o] = !b[o], W(!0, !0)
                }
            });
            n.length > 0 && SQP.p(G, n)
        }
    }), {
        tablerepaint: function() {
            const n = t.length;
            if (L > 0 && e.length > 0)
                for (let t = f, o = 0; o < u; t++, o++)
                    if (w[o].className = t % 2 == 0 ? "table-tr-d" : "table-tr-h", t < e.length) {
                        let l = e[t];
                        for (let e = 0; e < n; e++)
                            if (b[e]) {
                                const t = S[o][e];
                                switch (k[o][e] ? (t.innerHTML = "", k[o][e] = !1) : A[o][e] && (t.innerHTML = "", A[o][e] = !1), typeof l[e]) {
                                    case "boolean":
                                        t.className = "tdbol thover cuttextsize", t.textContent = l[e];
                                        break;
                                    case "number":
                                        t.className = "tdnum thover cuttextsize", t.textContent = l[e];
                                        break;
                                    case "function":
                                        t.className = "tdfun thover cuttextsize", t.textContent = "Function";
                                        break;
                                    case "undefined":
                                        t.className = "tdund thover cuttextsize", t.textContent = "Undefined";
                                        break;
                                    case "string":
                                        let n = "",
                                            a = 0;
                                        try {
                                            n = "" + l[e]
                                        } catch (e) {}
                                        if (n.indexOf("://") > 0 && isUrl(n)) a = 1;
                                        else if ("#" === n[0] && isHexColor(n)) a = 2;
                                        else {
                                            let e = n.length;
                                            e < 25 && !isNaN(1 * n) ? a = 3 : e > 500 && (n = n.substr(0, 500))
                                        }
                                        switch (a) {
                                            case 1:
                                                k[o][e] = !0, t.className = "thover cuttextsize", t.innerHTML = "";
                                                let i = t.appendChild(document.createElement("a"));
                                                i.setAttribute("rel", "noopener"), i.setAttribute("href", n), i.setAttribute("target", "_blank"), i.textContent = n;
                                                break;
                                            case 2:
                                                A[o][e] = !0, t.className = "thover cuttextsize", t.innerHTML = "";
                                                let s = t.appendChild(document.createElement("div"));
                                                s.textContent = n, s.setAttribute("style", "border-left: 20px solid " + n + ";padding-left: 3px;");
                                                break;
                                            case 3:
                                                t.className = "thover tdnum cuttextsize", t.textContent = l[e];
                                                break;
                                            default:
                                                t.className = "thover cuttextsize", t.textContent = n
                                        }
                                        break;
                                    default:
                                        null === l[e] ? (t.className = "tdobj thover cuttextsize", t.textContent = "Null") : (t.className = "tdobj thover cuttextsize", t.textContent = "Blob")
                                }
                            }
                    } else
                        for (let e = 0; e < n; e++)
                            if (b[e]) {
                                const t = S[o][e];
                                k[o][e] ? (t.innerHTML = "", k[o][e] = !1) : A[o][e] && (t.removeAttribute("style"), A[o][e] = !1), t.className = "thover", t.innerHTML = "&nbsp;"
                            }
        },
        tableclr: function() {
            ot.setDBM([]), zzz.g("main-table-scroll").scrollTop = 0, zzz.g("main-table-scroll2").style.height = "0px", c.innerHTML = "", r.innerHTML = "", W(!1), _()
        },
        tableload: function() {
            if (zzz.g("main-table-scroll").scrollTop = 0, u = 0, f = 0, t.length > 0) {
                const e = t.length;
                b = [];
                for (let t = 0; t < e; t++) b[t] = t < T;
                W(!0)
            }
        },
        setscrollbar: function() {
            let t = e.length,
                n = zzz.g("main-row-bottom").offsetHeight,
                o = t * (h = t < 1e4 && t > 0 ? t < 300 ? 21 : Math.round(14 - 14 * t / 1e4 + 7) : 7) + n;
            zzz.g("main-table-scroll2").style.height = o + "px"
        },
        tableupdatez: function(t) {
            (f = Math.round(t / h)) > e.length - 1 && (f = e.length - 1), f < 0 && (f = 0), ot.tablerepaint()
        },
        CopyToText: function(n, o) {
            try {
                const l = ecm.a();
                let a, i = "";
                i = o < 0 ? t[n] : (a = e[o])[n], l.replaceRange(getToString(i), l.getCursor())
            } catch (e) {
                toastr.error(e.message, "CopyToText")
            }
        },
        CopyToFile: function(t, n) {
            try {
                const o = e[n][t],
                    l = new Blob([o]);
                saveAs(l, "cell" + t + "_" + n + ".txt")
            } catch (e) {
                toastr.error(e.message, "CopyToFile")
            }
        },
        CopyToClipboard: function(t, n) {
            try {
                const o = e[n][t],
                    l = document.createElement("textarea");
                l.value = o, document.body.appendChild(l), l.select(), document.execCommand("Copy"), document.body.removeChild(l)
            } catch (e) {
                toastr.error(e.message, "CopyToFile")
            }
        },
        ShowROW: function(e) {
            Q(e)
        },
        OpenROW: function(e) {
            Q(l = e), document.addEventListener("keydown", V, {
                passive: !0
            }), SQM.m({
                name: "Open ROW",
                cbc: function() {
                    document.removeEventListener("keydown", V)
                },
                cbl: function() {
                    ot.OpenROWCBack()
                },
                cbr: function() {
                    ot.OpenROWCNext()
                }
            })
        },
        OpenROWCBack: function() {
            l > 0 && Q(--l)
        },
        OpenROWCNext: function() {
            e.length - 1 > l && Q(++l)
        },
        ShowColWIDTH: function(e) {
            let t = !0;
            const n = e,
                o = zzz.g("table-th-" + n),
                l = o.getBoundingClientRect(),
                a = o.style.width,
                i = SQM.hp(),
                s = n != z[z.length - 1],
                c = E[n];
            i.innerHTML = "";
            const r = i.appendChild(zzz.ceca("DIV", "group group-inp", [
                    ["style", "margin:6px 8px;width:120px;"]
                ])),
                d = r.appendChild(zzz.ceca("INPUT", "", [
                    ["type", "number"],
                    ["min", 40],
                    ["max", 1e4],
                    ["value", c]
                ])),
                u = r.appendChild(zzz.ceca("BUTTON", "btn bg", [
                    ["style", "border-left-width: 1px;"]
                ]));
            u.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>', d.onkeyup = function() {
                if (t) {
                    const t = parseInt(d.value, 10);
                    isNaN(t) || (t < 40 && (d.value = 40), s ? (o.style.width = t + "px", D(N, E[z[z.length - 1]], e, t)) : D(N, t))
                }
            }, u.onclick = function() {
                d.onkeyup(), E[n] = parseInt(d.value, 10), t = !1, SQM.d()
            }, d.onkeydown = function(e) {
                27 == e.keyCode && SQM.d(), 13 == e.keyCode && u.onclick()
            }, SQM.sd(l.left, l.height + l.top + 3, function(e) {
                t && (o.style.width = a, D(N, E[z[z.length - 1]]))
            }), d.focus()
        },
        setAutoWIDTH: function() {
            if (SQA.flockbtn(), p) {
                let n = {};
                const o = t.length,
                    l = e.length;
                for (let t = f, a = 0; a < u; t++, a++)
                    if (t < l) {
                        let l = e[t];
                        for (let e = 0; e < o; e++)
                            if (b[e]) {
                                let t = parseInt(m.measureText(l[e]).width.toFixed(0), 10) + 50;
                                if (n[e]) {
                                    n[e] < t && (n[e] = t)
                                } else n[e] = t
                            }
                    }
                for (let e in n) {
                    let t = n[e];
                    if (b[e]) {
                        let n = zzz.g("table-th-" + e);
                        n && (E[e] = t, n.style.width = t + "px")
                    }
                }
                D(N, E[z[z.length - 1]])
            } else toastr.error("You browser not support!", "Table AutoWIDTH");
            SQA.funlockbtn()
        },
        tabCols: function() {
            return M
        },
        resTH: function() {
            W(!0, !0)
        },
        setMVC: function(n, o) {
            e = n, t = o
        },
        setDBM: function(l) {
            n = 0, (o = l).length > 0 ? (e = o[n].v, t = o[n].c) : (e = [], t = []), _(), ot.tableload()
        },
        getMV: function(t) {
            return e[t] ? e[t] : []
        },
        getMC: function(e) {
            return t[e] ? t[e] : ""
        },
        getMAV: function() {
            return e.slice()
        },
        getMAC: function() {
            return t.slice()
        }
    }
}();
const SQmodExport = function() {
    function e(e, t) {
        const n = e.appendChild(zzz.cec("div", "row-2 ei-row"));
        return n.appendChild(zzz.ct(t)), n
    }

    return {
        ExSaveBlob: function(e, t, n) {
            try {
                let o = new Blob([e]);
                const l = "string" == typeof n ? n + t : SQA.get_tab_name(t);
                saveAs(o, l)
            } catch (e) {
                toastr.error(e.message, "Save")
            }
        },
        ExSaveCSV: function(e, t, n, o, l) {
            let r = "";
            if (2 == l) {
                let e = "";
                for (let l = 0; l < t.length; l++) {
                    e.length > 0 && (e += n);
                    let r = getToString(t[l]);
                    e += r = r.indexOf(o) > -1 ? o + r.replaceAll(o, o + o) + o : o + r + o
                }
                e.length > 0 && (r += e + "\r\n")
            }
            for (let t = 0; t < e.length; t++) {
                let l = "";
                for (let r in e[t]) {
                    l.length > 0 && (l += n);
                    let a = getToString(e[t][r]);
                    l += a = a.indexOf(o) > -1 ? o + a.replaceAll(o, o + o) + o : o + a + o
                }
                r += l + "\r\n"
            }
            SQmodExport.ExSaveBlob(r, ".csv")
        },
        ExSaveXML: function(e, t) {
            let n = '<?xml version="1.0" encoding="UTF-8" ?>\r\n';
            n += "<!DOCTYPE items>\r\n", n += "<items>\r\n";
            for (let o = 0; o < e.length; o++) {
                let l = "";
                for (let n = 0; n < t.length; n++) l += "       <" + t[n] + ">" + e[o][n] + "</" + t[n] + ">\r\n";
                n += "    <row>\r\n" + l + "    </row>\r\n"
            }
            n += "</items>\r\n", SQmodExport.ExSaveBlob(n, ".xml")
        },
        ExSaveJSON: function(e, t) {
            let n = [];
            for (let o = 0; o < e.length; o++) {
                let l = {};
                for (let n = 0; n < t.length; n++) l[t[n]] = e[o][n];
                n.push(l)
            }
            SQmodExport.ExSaveBlob(JSON.stringify(n), ".json")
        },
        ExSaveSQLSchema: function(e) {
            let t = "",
                n = SQmodSQL.getmarr_shema();
            for (let e in n) n[e].a && (t += "-- " + e.toUpperCase() + "\r\n", n[e].a.forEach(function(e) {
                t += e.shema + ";\r\n"
            }), t += " \r\n");
            SQA.funlockbtn(), SQmodExport.ExSaveBlob(t, ".sql", e)
        },
        actExport: function(t) {
            if (1 === t) {
                const t = SQM.mb();
                t.innerHTML = "";
                const n = e(t, "Type").appendChild(zzz.csl(["CSV", "XML", "JSON", "SQL Schema"])),
                    o = e(t, "Delimiter"),
                    l = zzz.cesl(o, [",", ";", "|"], 1),
                    r = e(t, "Escape"),
                    a = zzz.cesl(r, ['"', "'"], 1),
                    s = e(t, "Column name"),
                    i = s.appendChild(zzz.csl(["none", "First line"]));
                n.onchange = function() {
                    1 === parseInt(n.value, 10) ? (o.style.display = "grid", r.style.display = "grid", s.style.display = "grid") : (o.style.display = "none", r.style.display = "none", s.style.display = "none")
                }, SQM.m({
                    name: "Export",
                    cw: "mw",
                    logo: "fa-download",
                    cbo: function() {
                        const e = parseInt(n.value, 10);
                        1 === e ? SQmodExport.ExSaveCSV(ot.getMAV(), ot.getMAC(), l.value, a.value, parseInt(i.value, 10)) : SQmodExport.fnExport(e)
                    }
                })
            } else SQmodExport.fnExport(t)
        },
        fnExport: function(e) {
            switch (e) {
                case 2:
                    SQmodExport.ExSaveXML(ot.getMAV(), ot.getMAC());
                    break;
                case 3:
                    SQmodExport.ExSaveJSON(ot.getMAV(), ot.getMAC());
                    break;
                case 4:
                    SQA.flockbtn(), SQH.stopEr(), db.dump()
            }
        }
    }
}();
const SQmodImport = function() {
    let e, t, n, l, a, o, s, r, i = ",",
        d = '"';

    function c(e, t) {
        const n = e.appendChild(zzz.cec("div", "row-2 ei-row"));
        return n.appendChild(zzz.ct(t)), n
    }

    // zzz.g("importfile").onchange = function () {
    //     let e = zzz.g("importfile").files[0];
    //     if (e && e.name) {
    //         let n = e.name;
    //         SQM.ns() && (SQM.ns().textContent = n);
    //         const l = n.lastIndexOf("."), a = n.length;
    //         let o = n.substr(l, a - l).toLocaleLowerCase();
    //         if (t) switch (!0) {
    //             case".csv" == o:
    //                 t.value = 1, t.disabled = !0;
    //                 break;
    //             case".json" == o:
    //                 t.value = 2, t.disabled = !0;
    //                 break;
    //             case".sql" == o:
    //                 t.value = 3, t.disabled = !0;
    //                 break;
    //             default:
    //                 t.disabled = !1
    //         }
    //         let s = new FileReader;
    //         s.onload = function (e) {
    //             SQmodImport.saveFile(e.target.result), document.getElementById("dbform").reset(), y()
    //         }, s.readAsText(e)
    //     } else toastr.error("File error", "Import")
    // };
    const p = function() {
        let e = 1.1;
        return e = e.toString().substring(1, 2)
    }();

    function h(e) {
        let t = {
            t: 0,
            l: e.length
        };
        return isNaN(1 * e) || (e.includes(p) ? t.t = 1 : t.t = 2), t
    }

    function u(t, n) {
        let l = "",
            a = [],
            o = [],
            s = [],
            r = 0,
            c = !0,
            p = !1,
            u = !0,
            f = 0,
            z = e.length,
            y = () => {
                "'" === e[f] ? l += "''" : l += e[f]
            },
            b = () => {
                const e = a.length,
                    t = h(l);
                (n < 2 || o.length > 0) && (s[e] ? (s[e].t > t.t && (s[e].t = t.t), s[e].l = s[e].l < t.l ? t.l : s[e].l) : s.push(t)), a.push(l), l = "", p = !1, c = !0, u = !1
            },
            m = () => {
                u = !0, c = !0;
                let e = a.length;
                switch (r < e && (r = e), l.length > 0 && b(), e > 0 && (o.push(a), a = []), t) {
                    case 3:
                        o.length >= 3 && (f = z);
                        break;
                    case 4:
                        o.length >= 4 && (f = z)
                }
            };
        for (; f < z;) c ? [10, 13].includes(e[f].charCodeAt(0)) ? m() : e[f] === i ? b() : (u = !0, c = !1, (p = e[f] === d) || y()) : p ? e[f] === d ? f + 1 < z && e[f + 1] === d ? (f++, y()) : (p = !1, c = !0) : y() : [10, 13].includes(e[f].charCodeAt(0)) ? m() : e[f] === i ? u ? b() : c = !0 : y(), f++;
        return m(), {
            m: r,
            a: o,
            t: s
        }
    }

    function f() {
        if (r.style.display = "block", r.innerHTML = "", e.length > 0) {
            let e = [],
                t = [],
                n = parseInt(o.value, 10),
                s = 2 === n ? 4 : 3;
            l.value.length > 0 && (i = l.value), a.value.length > 0 && (d = a.value);
            let c = u(s, n);
            if (2 === n) c.a.forEach((n, l) => {
                0 === l ? t = n : e.push(n)
            });
            else {
                for (let e = 0; e < c.m + 1; e++) t.push("c" + (e + 1));
                e = c.a
            }
            if (e && e.length > 0) {
                let n = r.appendChild(zzz.ceca("table", "table", [
                        ["style", "min-width: 100%;"]
                    ])),
                    l = n.appendChild(zzz.cec("thead", "table-head")).appendChild(zzz.ce("tr"));
                t.forEach(function(e) {
                    l.appendChild(zzz.ce("th")).textContent = e
                });
                let a = n.appendChild(zzz.cec("tbody", "table-body"));
                e.forEach(function(e, t) {
                    let n = a.appendChild(zzz.ce("tr"));
                    n.className = (t / 2 | 0) == t / 2 ? "table-tr-d" : "table-tr-h", e.forEach(function(e) {
                        n.appendChild(zzz.ce("td")).textContent = e.replaceAll("''", "'")
                    })
                })
            }
        }
    }

    function z(e, t) {
        const n = t.length;
        let l = "";
        for (let a = 0; a < n; a++) e.l < t[a].l && (l = t[a].n + (t[a].b ? "(" + 10 * Math.ceil(e.l / 10) + ")" : ""), a = n);
        return l
    }

    function y() {
        let e = parseInt(t.value, 10);
        switch (t.parentNode.style.display = "grid", e) {
            case 1:
                n.parentNode.style.display = "grid", l.parentNode.parentNode.style.display = "grid", a.parentNode.parentNode.style.display = "grid", o.parentNode.style.display = "grid", s.parentNode.style.display = "none", f();
                break;
            case 2:
                n.parentNode.style.display = "grid", l.parentNode.parentNode.style.display = "none", a.parentNode.parentNode.style.display = "none", o.parentNode.style.display = "none", s.parentNode.style.display = "none";
                break;
            case 3:
                n.parentNode.style.display = "none", l.parentNode.parentNode.style.display = "none", a.parentNode.parentNode.style.display = "none", o.parentNode.style.display = "none", s.parentNode.style.display = "grid"
        }
    }

    return
    // zzz.g("mt-btn-import").onclick = function () {
    //     const p = SQM.mb();
    //     p.innerHTML = "";
    //     const b = c(p, "File").appendChild(zzz.ceca("button", "btn bg show", [["style", "width: 100%"]]));
    //     b.textContent = "Open", b.onclick = function () {
    //         // zzz.g("importfile").click()
    //     }, (t = c(p, "Type").appendChild(zzz.csl(["CSV", "JSON", "SQL Schema"]))).onchange = function () {
    //         y()
    //     }, n = c(p, "Table name").appendChild(zzz.ceca("input", "", [["placeholder", "Table"]]));
    //     const m = c(p, "Delimiter");
    //     l = zzz.cesl(m, [",", ";", "|"], 1, function () {
    //         f()
    //     });
    //     const g = c(p, "Escape");
    //     a = zzz.cesl(g, ['"', "'"], 1, function () {
    //         f()
    //     });
    //     const N = c(p, "Column name");
    //     o = N.appendChild(zzz.csl(["New-auto", "First line"])), s = c(p, "Command").appendChild(zzz.csl(["Run", "Run && Show Code", "Show Code"])), o.onchange = function () {
    //         f()
    //     }, a.onchange = function () {
    //         f()
    //     }, l.onchange = function () {
    //         f()
    //     }, l.oninput = function () {
    //         f()
    //     }, a.oninput = function () {
    //         f()
    //     }, t.parentNode.style.display = "none", n.parentNode.style.display = "none", l.parentNode.parentNode.style.display = "none", a.parentNode.parentNode.style.display = "none", o.parentNode.style.display = "none", s.parentNode.style.display = "none", (r = p.appendChild(zzz.ceca("div", "", [["style", "border: 1px solid var(--bgr-d);overflow: auto;"]]))).style.display = "none", n.onkeypress = function (e) {
    //         let t = new RegExp(/^[a-z_0-9]+$/i), l = new RegExp(/^[a-z_]+$/i),
    //             a = String.fromCharCode(e.charCode ? e.charCode : e.which), o = n.value.length;
    //         if (!t.test(a) && o > 0 || !l.test(a) && 0 == o) return e.preventDefault(), !1
    //     }, SQM.m({
    //         name: "Import", cw: "mw", logo: "fa-upload", hint: "import file name", cbo: function () {
    //             let r = !1;
    //             if (e && e.length > 0) {
    //                 let c = parseInt(t.value, 10), p = n.value;
    //                 if (/^[A-Z_a-z]{1}[A-Z_a-z0-9]*$/.test(p) || 3 == c) {
    //                     switch (c) {
    //                         case 1:
    //                             p = p, SQA.flockbtn(), setTimeout(function () {
    //                                 try {
    //                                     i = l.value, d = a.value;
    //                                     let e = parseInt(o.value), t = u(0, e), n = [], s = "", r = "";
    //                                     if (t.a && t.a.length > 0) {
    //                                         const l = db.jtype();
    //                                         if (t.t.forEach(e => {
    //                                             let t = z(e, l[e.t]);
    //                                             e.t > 0 && 0 === t.length && (t = z(e, l[0])), e.v = t
    //                                         }), 2 !== e) {
    //                                             for (let e = 0; e < t.m + 1; e++) n.push("c" + (e + 1));
    //                                             r = n.join(",")
    //                                         }
    //                                         t.a.forEach((t, l) => {
    //                                             0 === l && 2 === e ? r = (n = t).map((e, t) => db.chcol(e)).join(",") : s += "\r\nINSERT INTO " + db.chcol(p) + " (" + r + ") VALUES (" + t.map(e => "'" + e + "'").join(",") + ");"
    //                                         }), r = n.map((e, n) => db.chcol(e) + (t.t[n].v ? " " + t.t[n].v : "")).join(","), s = "CREATE TABLE " + db.chcol(p) + " (" + r + ");" + s
    //                                     }
    //                                     SQH.stopEr(), SQX.sendstat(3), db.sql(s)
    //                                 } catch (e) {
    //                                     toastr.error(e.message, "Import")
    //                                 }
    //                             }, 100);
    //                             break;
    //                         case 2:
    //                             !function (t) {
    //                                 SQA.flockbtn(), setTimeout(function () {
    //                                     try {
    //                                         let n = JSON.parse(e), l = {}, a = 0, o = "";
    //                                         n.forEach(function (e) {
    //                                             let n = "", s = "";
    //                                             for (let t in e) {
    //                                                 l[t] || (a++, l[t] = {n: "c" + a, t: !1});
    //                                                 let o = getToString(e[t]).replaceAll("'", "''");
    //                                                 n.length > 0 ? (n += ", " + l[t].n, s += ", '" + o + "'") : (n = "" + l[t].n, s = "'" + o + "'");
    //                                                 const r = h(o);
    //                                                 l[t].t ? (l[t].t.t > r.t && (l[t].t.t = r.t), l[t].t.l = l[t].t.l < r.l ? r.l : l[t].t.l) : l[t].t = r
    //                                             }
    //                                             o += "\r\nINSERT INTO " + db.chcol(t) + " (" + n + ") VALUES (" + s + ");"
    //                                         });
    //                                         let s = [], r = db.jtype();
    //                                         for (let e in l) {
    //                                             const t = l[e].t;
    //                                             let n = z(t, r[t.t]);
    //                                             t.t > 0 && 0 === n.length && (n = z(t, r[0])), s.push(l[e].n + (n.length > 0 ? " " + n : ""))
    //                                         }
    //                                         o = "CREATE TABLE " + db.chcol(t) + " (" + s.join(",") + ");" + o, SQH.stopEr(), SQX.sendstat(3), db.sql(o)
    //                                     } catch (e) {
    //                                         toastr.error(e.message, "Import")
    //                                     }
    //                                 }, 100)
    //                             }(p);
    //                             break;
    //                         case 3:
    //                             SQA.flockbtn(), setTimeout(function () {
    //                                 try {
    //                                     let t = parseInt(s.value, 10);
    //                                     if (SQH.stopEr(), e.length > 0) switch (t) {
    //                                         case 1:
    //                                             SQX.sendstat(3), db.sql(e, void 0, "sqlite");
    //                                             break;
    //                                         case 2:
    //                                             ecm.s(e), SQmodMMal.setDefTableName(""), SQX.sendstat(3), db.sql(e, void 0, "sqlite");
    //                                             break;
    //                                         case 3:
    //                                             ecm.s(e), SQmodMMal.setDefTableName(""), SQA.funlockbtn()
    //                                     }
    //                                 } catch (e) {
    //                                     toastr.error(e.message, "Import")
    //                                 }
    //                             }, 100)
    //                     }
    //                     r = !0
    //                 } else toastr.error("No table name", "Import")
    //             } else toastr.error("File is not open", "Import");
    //             var c;
    //             return r
    //         }
    //     })
    // },
    //     {
    //     saveFile: function (t) {
    //         e = t
    //     }
    // }
}();
const SQH = (() => {
    const e = zzz.g("div-html"),
        t = zzz.g("div-html-name");
    let n = {};

    function a(e, t, n) {
        const a = t.o ? t.o : zzz.cec("div", "ndex" + (e ? " ashow" : ""));
        if (!t.o && t.u) {
            const e = a.appendChild(zzz.ceca("p", "", [
                ["style", "padding-right: 55px;"]
            ]));
            e.appendChild(zzz.ceca("i", "fa " + t.u, [
                ["style", "margin-right: 7px; padding-bottom:7px;"]
            ])), e.appendChild(zzz.ct(t.m))
        }
        if (!t.o && t.h) {
            const e = a.appendChild(zzz.cec("div", "content CodeMirror cm-s-eclipse ow-x-a"));
            let o = t.h;
            o.length > 100 && (o = o.substr(0, 100) + "\r\n..."), e.innerHTML = CMGetHStr(o, "text/x-" + n);
            const i = a.appendChild(zzz.ceca("div", "group group-btn tools", [
                    ["style", "top:15px;right:12px;"]
                ])),
                s = i.appendChild(zzz.cec("button", "btn bg")),
                l = i.appendChild(zzz.cec("button", "btn bg"));
            s.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>', l.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>', s.onclick = function(e) {
                e.preventDefault(), ecm.g(SQA.addNewTAB(t.m ? t.m : "", {
                    i: "fa-history"
                })).setValue(t.h)
            }, l.onclick = function(e) {
                e.preventDefault(), SQmodMMal.setDefTableName(""), db.sql(t.h, void 0, void 0, {
                    i: "fa-history",
                    n: t.m ? t.m : ""
                })
            }
        }
        if (t.e && t.e.t) {
            const e = a.appendChild(zzz.cec("p", "sql-error")),
                o = e.appendChild(zzz.ce("a"));
            o.textContent = "Help: ", o.onclick = function(e) {
                e.preventDefault(), window.open("http://google.com/search?q=" + n + " " + encodeURIComponent(t.e.t))
            }, e.appendChild(zzz.ct(t.e.t.length > 300 ? t.e.t.substr(0, 300) + "\r\n..." : t.e.t)), t.e.h && t.e.h.length > 0 && t.e.h.forEach(function(t) {
                e.appendChild(zzz.ce("p")).textContent = t
            }), a.classList.add("box-error")
        }
        return a
    }

    function o() {
        e.innerHTML = "", t.innerHTML = "History";
        const o = SQA.get_mm_s();
        if (n[o]) {
            for (let t = n[o].a.length - 1; t >= 0; t--) {
                const i = n[o].a[t],
                    s = i.o ? i.o : a(!1, i, o);
                s.classList.remove("ashow"), e.appendChild(s)
            }
        }
        i(!0)
    }

    function i(e) {
        SQsw.getXK() ? 1 != SQA.getce_switch() && SQA.fceSwitch(1) : e && SQsw.getTSD(!0)
    }

    function s(e, t) {
        let n = [];
        if ("sqlite" == SQA.get_mm_s()) {
            let a = SQmodSQL.getmarr_shema();
            switch (!0) {
                case e.indexOf("file is not a database") > -1:
                    n.push("Support DB file only SQLite version 3!"), n.push("Open default DB");
                    break;
                case e.indexOf("no such table") > -1:
                    if (a && a.table && a.table.a)
                        if (a.table.a.length > 0) {
                            let e = [];
                            a.table.a.forEach(function(t) {
                                e.push(t.name)
                            }), n.push("List table`s in datebase: " + e.join(", "))
                        } else n.push("You datebase empty!");
                    break;
                case e.indexOf("no such column") > -1:
                    if (a && a.table && a.table.a && a.table.j && a.table.a.length > 0 && t) {
                        const e = t.toLocaleLowerCase();
                        a.table.a.forEach(function(t) {
                            const o = t.name.toLocaleLowerCase();
                            if (e.indexOf(o) > -1 && a.table.j[t.name] && a.table.j[t.name].c) {
                                let e = [];
                                a.table.j[t.name].c.forEach(function(t) {
                                    e.push(t.name)
                                }), n.push("Table - [" + t.name + "] column: " + e.join(", "))
                            }
                        })
                    }
            }
        }
        return n
    }

    function l(e) {
        return "string" == typeof e ? (String.prototype.trimEnd && (e = e.trimEnd()), e.length > 0 && ";" !== e[e.length - 1] && (e += ";")) : e = "", e
    }

    return {
        close: function() {
            SQUH.h("/"), SQA.fceSwitch(0)
        },
        showHist: function() {
            o(), SQmodPage.akey(!0)
        },
        stopEr: function() {
            const e = SQA.get_mm_s();
            n[e] ? n[e].k = !1 : n[e] = {
                k: !1,
                a: []
            }
        },
        hist: function(t, o, s, l, c) {
            const h = l || SQA.get_mm_s();
            if (n[h] && n[h].a ? s ? c ? n[h].a.push({
                t: Date.now(),
                h: t,
                u: o,
                m: s,
                e: {
                    t: c
                }
            }) : "fa-user" !== o ? (n[h].k = !0, n[h].l = n[h].a.push({
                t: Date.now(),
                h: t,
                u: o,
                m: s
            }) - 1) : n[h].a.push({
                t: Date.now(),
                h: t,
                u: o,
                m: s
            }) : (n[h].l = n[h].a.push({
                t: Date.now(),
                u: o,
                m: s,
                h: t
            }) - 1, n[h].k = !0) : n[h] = s ? c ? {
                a: [{
                    t: Date.now(),
                    h: t,
                    u: o,
                    m: s,
                    e: {
                        t: c
                    }
                }],
                k: !1,
                l: 0
            } : {
                a: [{
                    t: Date.now(),
                    h: t,
                    u: o,
                    m: s
                }],
                k: "fa-user" !== o,
                l: 0
            } : {
                a: [{
                    t: Date.now(),
                    u: o,
                    m: s,
                    h: t
                }],
                k: !0,
                l: 0
            }, SQmodPage.akey()) {
                const t = n[h].a.length - 1,
                    o = a(!0, n[h].a[t], h);
                n[h].a[t].o = o, e.insertBefore(o, e.firstChild), i(!1)
            }
        },
        help: function(t) {
            const l = SQA.get_mm_s();
            if (n[l] && n[l].a ? (n[l].k ? n[l].a[n[l].l].e = {
                t: t,
                h: s(t, n[l].a[n[l].l].h)
            } : n[l].l = n[l].a.push({
                t: Date.now(),
                e: {
                    t: t,
                    h: s(t)
                }
            }) - 1, n[l].k = !1) : n[l] = {
                a: [{
                    e: {
                        t: t,
                        h: s(t)
                    }
                }],
                k: !1,
                l: 0
            }, SQmodPage.akey()) {
                const t = n[l].a[n[l].l];
                t.o ? a(!0, t, l) : e.insertBefore(a(!0, t, l), e.firstChild), i(!0)
            } else o(), SQmodPage.akey(!0)
        },
        save: function(e) {
            let t = "";
            if (n[e]) {
                const a = n[e].a.length;
                for (let o = 0; o < a; o++) {
                    const a = n[e].a[o];
                    if (a.h) {
                        const e = new Date(a.t),
                            n = new Date(e.valueOf() - 6e4 * e.getTimezoneOffset());
                        a.e && a.e.t ? (t += "--- " + n.toFormatYMDHMS() + "\n", a.m && (t += "--- " + a.m + "\n"), t += "/***** ERROR ******\n" + a.e.t + "\n ----- \n" + l(a.h) + "\n*****/\n\n") : (t += "--- " + n.toFormatYMDHMS() + "\n", a.m && (t += "--- " + a.m + "\n"), t += l(a.h) + "\n\n")
                    }
                }
            }
            let a = new Blob([t]);
            saveAs(a, "History " + SQA.eSJ(e) + ".sql")
        },
        clear: function(t) {
            n[t] && delete n[t], SQmodPage.akey() && (e.innerHTML = "", i(!1))
        },
        clearall: function() {
            n = {}, SQmodPage.akey() && (e.innerHTML = "", i(!1))
        }
    }
})();
const SQmodCloud = (() => {
    const e = zzz.g("cloud-menu-top"),
        t = zzz.g("ce-save"),
        o = zzz.g("cloud-list");
    let r = "",
        n = "",
        a = "",
        i = !1,
        s = "",
        l = 0,
        c = 24,
        d = !1,
        u = {},
        p = !0;

    function f(e) {
        return new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(e)
    }

    let g = !0;

    function h(e) {
        if (d = e && e.z) {
            const e = zzz.g("sql-adv1"),
                t = zzz.g("sql-adv2");
            e && e.style && (e.style.display = "none"), t && t.style && (t.style.display = "none")
        } else ! function(e) {
            if (g) {
                g = !1;
                let t = zzz.g("sql-online");
                t && t.offsetWidth > 768 && setTimeout(function() {
                    let t = document.createElement("script");
                    t.onload = function() {
                        e()
                    }, t.async = 1, t.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", document.getElementsByTagName("head")[0].appendChild(t)
                }, 3e4)
            }
        }(function() {
            SQA.ePN("sa.1");
            const e = zzz.g("sql-adv1"),
                t = zzz.g("sql-adv2");
            if (e && e.style) {
                e.style.display = "block", e.style.minWidth = "220px", e.style.minHeight = "480px";
                const t = e.getBoundingClientRect();
                t.width > 0 && t.height > 0 && (adsbygoogle = window.adsbygoogle || []).push({})
            }
            if (t && t.style) {
                t.style.display = "block", t.style.minWidth = "300px", t.style.minHeight = "200px";
                const e = t.getBoundingClientRect();
                e.width > 0 && e.height > 0 && (adsbygoogle = window.adsbygoogle || []).push({})
            }
        })
    }

    function z() {
        const e = SQM.mb();
        e.innerHTML = "";
        const t = w(e, "fa-lock", "input", "", [
                ["type", "password"],
                ["placeholder", "New password"]
            ]),
            o = w(e, "fa-lock", "input", "", [
                ["type", "password"],
                ["placeholder", "Confirm password"]
            ]);
        SQM.m({
            name: "New password",
            hint: "Create a unique password",
            logo: "fa-key",
            cw: "mw",
            cbo: function() {
                const e = t.value,
                    r = o.value;
                let i = !0;
                return e.length < 5 && (i = !1, toastr.error("Password small", "Error")), e !== r && (i = !1, toastr.error("Password does not match!", "Password ")), i && SQN.a("/fn/uic/up", {
                    c: M(),
                    m: a,
                    u: n,
                    p: e
                }, function(e) {
                    e.err ? toastr.error(e.err, "Password") : e.s ? toastr.success("Password update", "Cloud") : toastr.error("Error", "Network")
                }), i
            }
        })
    }

    function m() {
        SQM.mb().innerHTML = '<table class="table" width="100%"><tbody><tr><td>No AD</td><td><i class="fa fa-asterisk" aria-hidden="true"></i></td></tr><tr><td>...</td><td><i class="fa fa-question" aria-hidden="true"></i></td></tr></tbody></table>', SQM.m({
            name: "Premium",
            hint: "free.test / Month",
            logo: "fa-credit-card",
            cw: "mw",
            cbo: function() {
                SQN.a("/fn/uic/prem", {
                    c: M(),
                    i: 1
                }, function(e) {
                    e.err ? toastr.error(e.err, "Premium") : e.s ? (h(e), toastr.success("Activation successfully. ", "Premium")) : toastr.error("Error", "Network")
                })
            }
        })
    }

    function b(o) {
        i = !0, a = o.m, n = o.p, h(o), e.innerHTML = "";
        const r = e.appendChild(zzz.ceca("button", "btn bs", [
            ["aria-label", "login"],
            ["id", "tm-btn-cloud-user"]
        ]));
        r.innerHTML = '<i class="fa fa-user"></i>', r.onclick = function() {
            SQP.p(r, [{
                n: a,
                b: !0
            }, {
                d: 1
            }, {
                n: "Premium",
                o: m
            }, {
                n: "Password",
                o: z
            }, {
                d: 1
            }, {
                n: "Exit",
                o: SQmodCloud.aLogout
            }])
        }, zzz.g("cloud-tab-a").style.display = "list-item", t.classList.add("show")
    }

    let S, C = !1;

    function w(e, t, o, r, n) {
        const a = e.appendChild(zzz.cec("p", "input-log"));
        return t && t.length > 0 && a.appendChild(zzz.cec("i", "fa " + t)), a.appendChild(zzz.ceca(o, r, n))
    }

    function Q() {
        i = !1, k(""), a = "", n = "", h();
            // e.innerHTML = '<button class="btn bs" id="menu-signin"  aria-label="sgin in"><i class="fa fa-sign-in mh"></i><span class="hm">Sign in</span></button>',
            //     zzz.g("menu-signin").onclick = function () {
            //     const e = SQM.mb();
            //     e.innerHTML = "";
            //     const t = e.appendChild(zzz.cec("div", "row-2")),
            //         o = t.appendChild(zzz.ceca("div", "bgcl p24", [["style", "padding-top: 40px"]]));
            //     t.appendChild(zzz.cec("div", "p24")).innerHTML = '<h2 class="font-bold"> Welcome to cloud .concept </h2><ul><li>Create share link</li><li>Save cloud sql text <br> (Concept limit: 24 script, 8k char)</li></ul><h2 class="font-bold"> Premium </h2><ul>\x3c!--<li>Team</li>--\x3e<li>Close AD</li></ul><small>* after logging</small>';
            //     const r = w(o, "fa-envelope", "input", "", [["type", "email"], ["placeholder", "E-mail"]]),
            //         n = w(o, "fa-lock", "input", "", [["type", "password"], ["placeholder", "Password"]]),
            //         a = w(o, "", "button", "btn bg show", [["style", "width: 100%"]]);
            //     a.textContent = "Login", a.onclick = function (e) {
            //         SQmodCloud.aLogin(e, r.value, n.value, a)
            //     }, r.onkeyup = function (e) {
            //         13 == e.keyCode && n.focus()
            //     }, n.onkeyup = function (e) {
            //         13 == e.keyCode && (n.value.length > 0 && r.value.length > 0 ? a.click() : r.focus())
            //     };
            //     const i = o.appendChild(zzz.ce("div"));
            //     i.style.width = "0", i.style.overflow = "auto hidden", i.textContent = "reCAPTCHA", function (e) {
            //         if (p) {
            //             p = !1;
            //             let t = document.createElement("script");
            //             t.onload = function () {
            //                 C = !0, e(!0)
            //             }, t.async = 1, t.src = "https://www.google.com/recaptcha/api.js", document.getElementsByTagName("head")[0].appendChild(t)
            //         } else e(!1)
            //     }(function (e) {
            //         C && grecaptcha && grecaptcha.ready(function () {
            //             S = grecaptcha.render(i, {sitekey: "6LcJaj4UAAAAAL5dek2vNUhg4237FagJ4CmLBT22"})
            //         })
            //     });
            //     const s = o.appendChild(zzz.ceca("div", "row-2", [["style", "padding: 16px 0 8px;grid-gap: 10px;"]])),
            //         l = s.appendChild(zzz.cec("button", "btn bg", [["style", "width: 100%"]])),
            //         c = s.appendChild(zzz.cec("button", "btn bg", [["style", "width: 100%"]]));
            //     l.textContent = "Forgot password", c.textContent = "Create an account", l.onclick = function (e) {
            //         SQmodCloud.aForgot(e, r.value, l)
            //     }, c.onclick = function (e) {
            //         SQmodCloud.aRegist(e, r.value, n.value, c)
            //     }, o.appendChild(zzz.ce("small")).textContent = "SqliteOnline.com © 2020 0.4", SQM.m({
            //         cw: "bw",
            //         mh: "none",
            //         mbp: "0",
            //         mdp: "2px 0 0 0"
            //     }), i.style.width = r.clientWidth + "px", r.focus()
            // },
            //zzz.g("cloud-tab-a").style.display = "none",
            //SQA.showfirsttab(), t.classList.remove("show");
        //, o.innerHTML = "", k(""), SQA.cOUT()
    }

    function y() {
        if (l <= c) {
            const e = SQA.get_sel_tab();
            (s = ecm.g(e).getValue()).length > 8e3 ? toastr.error(".beta LIMIT 8k char!", "Cloud") : function(e) {
                const o = SQM.hp(),
                    r = t.getBoundingClientRect();
                o.innerHTML = "";
                const n = o.appendChild(zzz.ceca("DIV", "group group-inp", [
                        ["style", "margin:6px 8px;width:180px;"]
                    ])),
                    a = n.appendChild(zzz.ceca("INPUT", "", [
                        ["type", "text"],
                        ["maxlength", 250],
                        ["value", e]
                    ])),
                    i = n.appendChild(zzz.cec("BUTTON", "btn bg"));
                i.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>', i.onclick = function() {
                    const e = ecm.v();
                    SQmodCloud.addSQL(a.value, e), SQM.d()
                }, a.onkeydown = function(e) {
                    27 == e.keyCode && SQM.d(), 13 == e.keyCode && i.onclick()
                }, SQM.sd(r.left, r.bottom + 3);
                try {
                    e && e.length > 0 && (a.selectionStart = e.length, a.selectionEnd = e.length)
                } catch (e) {}
                a.focus()
            }(zzz.g("ntab-" + e).textContent)
        } else toastr.error(".beta LIMIT 24 script!", "Cloud")
    }

    function k(e) {
        let t = !1;
        return localStorage ? (localStorage.setItem("cdx", e), r = e, t = !0) : toastr.error("Sorry, your browser do not support.", "Browser"), t
    }

    function M() {
        let e = "";
        return r.length < 10 ? localStorage ? e = localStorage.getItem("cdx") : toastr.error("Sorry, your browser do not support.", "Browser") : e = r, e
    }

    function v(e, t, o) {
        SQA.flockbtn(), SQN.a("/fn/asql/get", {
            c: M(),
            i: e
        }, e => {
            t && SQA.funlockbtn(), e.err ? toastr.error(e.err, "Cloud") : e.s && "string" == typeof e.t ? "function" == typeof o && o(e.t) : toastr.error("Error", "Network")
        })
    }

    function x(e, t) {
        l++;
        const o = e.appendChild(zzz.ceca("div", "title", [
                ["id", "cloud-el-title-" + t.i]
            ])),
            r = e.appendChild(zzz.cec("div", "group group-btn")),
            n = r.appendChild(zzz.cec("button", "btn bg")),
            a = r.appendChild(zzz.cec("button", "btn bg")),
            i = r.appendChild(zzz.cec("button", "btn bg")),
            s = e.appendChild(zzz.ceca("div", "content CodeMirror cm-s-eclipse ow-x-a", [
                ["id", "cloud-el-cm-" + t.i]
            ])),
            c = e.appendChild(zzz.ceca("div", "time", [
                ["id", "cloud-el-dt-" + t.i]
            ]));
        n.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>', a.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>', i.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>', c.textContent = t.d, o.textContent = t.n;
        let d = t.s;
        d.length > 100 && (d = d.substr(0, 300) + "\r\n..."), s.innerHTML = CMGetHStr(d, "text/x-sqlite"), n.onclick = (() => {
            v(t.i, !1, e => {
                SQmodMMal.setDefTableName(""), db.sql(e, void 0, void 0, {
                    i: "fa-cloud",
                    n: t.n ? t.n : ""
                })
            })
        }), a.onclick = (() => {
            v(t.i, !0, e => {
                ecm.g(SQA.addNewTAB(o.textContent, {
                    i: "fa-cloud-download",
                    x: t.i
                })).setValue(e)
            })
        }), i.onclick = (() => {
            ! function(e, t, o) {
                const r = SQM.hp(),
                    n = e.getBoundingClientRect();
                r.innerHTML = "";
                const a = r.appendChild(zzz.ceca("DIV", "group group-inp", [
                        ["style", "margin:6px 8px;width:56px;"]
                    ])),
                    i = a.appendChild(zzz.cec("BUTTON", "btn bg")),
                    s = a.appendChild(zzz.cec("BUTTON", "btn bg"));
                i.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>', s.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>', i.onclick = function() {
                    SQmodCloud.delSQL(o, t), SQA.delCloudTAB(o), SQM.d()
                }, s.onclick = function() {
                    SQM.d()
                };
                let l = n.top + n.height + 3;
                SQmodiV5.getRevers() || (l = n.top - n.height), SQM.sd(n.left - 36, l)
            }(i, e, t.i)
        })
    }

    return {
        aLogin: function(e, t, o, r) {
            e.preventDefault();
            let n = !0;
            (t.length < 5 || !f(t)) && (n = !1, toastr.error("Mail bad", "Error")), o.length < 6 && (n = !1, toastr.error("Password small", "Error")), n ? (r.disabled = !0, SQM.mah(), SQN.a("/fn/uic/lg", {
                mail: t,
                pass: o
            }, function(e) {
                r.disabled = !1, SQM.mar(), e.err ? toastr.error(e.err, "Login") : e.s ? (SQM.mc(), k(e.c) && (b(e), SQmodCloud.ShowListSQL(!0))) : toastr.error("Error", "Network")
            })) : r.disabled = !1
        },
        testPriv: function() {
            return d
        },
        aLogout: function() {
            const e = M();
            Q(), SQN.a("/fn/uic/lo", {
                c: e
            }, function(e) {
                e.err ? toastr.error(e.err, "Login") : e.s || toastr.error("Error", "Network")
            })
        },
        aRegist: function(e, t, o, r) {
            let n, a = !0;
            (t.length < 5 || !f(t)) && (a = !1, toastr.error("Mail bad", "Error")), o.length < 6 && (a = !1, toastr.error("Password small", "Error")), C && grecaptcha && grecaptcha.getResponse ? !(n = grecaptcha.getResponse(S)) && n.length < 1 && (a = !1, toastr.error("No selecting", "reCAPTHA")) : (a = !1, toastr.error("Wait loading", "reCAPTHA")), a && (r.disabled = !0, SQA.flockbtn(), SQN.a("/fn/uic/rg", {
                rech: n,
                mail: t,
                pass: o
            }, function(e) {
                r.disabled = !1, SQA.funlockbtn(), e.err ? toastr.error(e.err, "Registration") : e.s ? (toastr.success("Please Confirm Your Email", "Auth"), grecaptcha.reset()) : toastr.error("Error", "Network")
            }))
        },
        TestVerify: function(e) {
            var t;
            t = e, SQN.a("/fn/uic/vm", {
                v: t
            }, function(e) {
                e.err ? toastr.error(e.err, "Cloud") : e.s ? (toastr.success("Email verify Good!", "Registration"), location.href = "#") : toastr.error("Error", "Network"), SQA.funlockbtn()
            })
        },
        TestForgot: function(e) {
            var t;
            t = e, SQN.a("/fn/uic/fv", {
                v: t
            }, function(e) {
                e.err ? toastr.error(e.err, "Cloud") : e.s ? (z(), k(e.c)) : toastr.error("Error", "Network"), SQA.funlockbtn()
            })
        },
        aForgot: function(e, t, o) {
            let r, n = !0;
            (t.length < 5 || !f(t)) && (n = !1, toastr.error("Mail bad", "Error")), C && grecaptcha && grecaptcha.getResponse ? !(r = grecaptcha.getResponse(S)) && r.length < 1 && (n = !1, toastr.error("No selecting", "reCAPTHA")) : (n = !1, toastr.error("Wait loading", "reCAPTHA")), n && (o.disabled = !0, SQA.flockbtn(), SQN.a("/fn/uic/fg", {
                rech: grecaptcha.getResponse(),
                m: t
            }, function(e) {
                o.disabled = !1, SQA.funlockbtn(), e.err ? toastr.error(e.err, "Forgot") : e.s ? (toastr.success("Please Confirm Your Email", "Forgot password"), grecaptcha.reset()) : toastr.error("Error", "Network"), SQA.funlockbtn()
            }))
        },
        ShowListSQL: function(e, t) {
            let r = M();
            r && r.length > 0 ? SQN.a("/fn/asql/sl", {
                c: r,
                u: n,
                v: 2
            }, function(e) {
                e.err ? i ? toastr.error(e.err, "Cloud") : Q() : e.s ? (i || b(e), e.r.forEach(function(e) {
                    const t = new Date(e.d),
                        r = new Date(t.valueOf() - 6e4 * t.getTimezoneOffset());
                    x(o.appendChild(zzz.cec("div", "el")), {
                        d: r.toFormatYMDHMS(),
                        n: e.n,
                        s: e.s,
                        i: e.i
                    })
                })) : (Q(), toastr.error("Error", "Network")), t && t()
            }, e) : (Q(), t && t())
        },
        delSQL: function(e, t) {
            t.classList.add("ahide"), SQN.a("/fn/asql/dl", {
                c: M(),
                i: e
            }, function(e) {
                t.classList.remove("ahide"), e.err ? toastr.error(e.err, "Cloud") : e.s ? (t.parentNode.removeChild(t), l--) : toastr.error("Error", "Network"), SQA.funlockbtn()
            })
        },
        addSQL: function(e, t) {
            SQN.a("/fn/asql/ad", {
                c: M(),
                n: e,
                a: t
            }, function(r) {
                if (r.err) toastr.error(r.err, "Cloud");
                else if (r.s) {
                    const n = new Date,
                        a = new Date(n.valueOf() - 6e4 * n.getTimezoneOffset());
                    x(o.insertBefore(zzz.cec("div", "el"), o.firstChild), {
                        d: a.toFormatYMDHMS(),
                        n: e,
                        s: t,
                        i: r.i
                    }), toastr.success("Add in cloud", "Cloud")
                } else toastr.error("Error", "Network");
                SQA.funlockbtn()
            })
        },
        updASQL: function(e, t) {
            SQN.a("/fn/asql/ups", {
                c: M(),
                i: e,
                a: t
            }, function(o) {
                if (o.err) toastr.error(o.err, "Cloud");
                else if (o.s) {
                    const o = new Date,
                        r = new Date(o.valueOf() - 6e4 * o.getTimezoneOffset());
                    t.length > 100 && (t = t.substr(0, 300) + "\r\n..."), zzz.g("cloud-el-cm-" + e).innerHTML = CMGetHStr(t, "text/x-sqlite"), zzz.g("cloud-el-dt-" + e).textContent = r.toFormatYMDHMS(), toastr.success("Update sql", "Cloud")
                } else toastr.error("Error", "Network");
                SQA.funlockbtn()
            })
        },
        updATab: function(e, t) {
            SQN.a("/fn/asql/upt", {
                c: M(),
                i: e,
                n: t
            }, function(o) {
                if (o.err) toastr.error(o.err, "Cloud");
                else if (o.s) {
                    const o = new Date,
                        r = new Date(o.valueOf() - 6e4 * o.getTimezoneOffset());
                    zzz.g("cloud-el-title-" + e).textContent = t, zzz.g("cloud-el-dt-" + e).textContent = r.toFormatYMDHMS(), toastr.success("Update name", "Cloud")
                } else toastr.error("Error", "Network");
                SQA.funlockbtn()
            })
        },
        start: function() {
            //SQmodCloud.ShowListSQL(!1, function() {
            //    SQUH.testJoin()
            //}), t.onclick = function(e) {
            //    e.preventDefault(), i ? y() : SQmodSQLFile.saveText()
            //}
        },
        sMail: function() {
            SQM.mb().innerHTML = '<label>Email</label><input id="fsm-email" type="email" placeholder="Your email" style="margin:5px 0 10px 0"><label>Text</label><textarea id="fsm-text" placeholder="Your question (eng/rus)" rows="5" style="margin:5px 0 10px 0"></textarea>', zzz.g("fsm-email").value = a, SQM.m({
                name: "Support",
                cw: "bw",
                logo: "fa-envelope-o",
                cbo: function() {
                    const e = zzz.g("fsm-email").value,
                        t = zzz.g("fsm-text").value;
                    let o = !0;
                    return e.trim().length < 3 && (o = !1, toastr.error("Error email", "System")), t.trim().length < 3 && (o = !1, toastr.error("Error text", "System")), o && SQN.a("/fn/log/mail", {
                        ename: e,
                        etext: t,
                        c: M()
                    }, function(e) {
                        e.err ? toastr.error(e.err, "Mail") : e.s ? toastr.success("Send successfully. ", "Mail") : toastr.error("Error", "Network")
                    }), o
                }
            })
        },
        setDB: function(e, t) {
            u[e] = t
        },
        getTeam: function(e) {
            const t = u[e];
            return {
                d: t || "",
                c: M(),
                u: n
            }
        },
        getMail: function() {
            return a
        },
        fiddForm: function() {
            i ? SQmodSQL.fiddCreate(M()) : toastr.success('Click: "Sign in" and authorize', "Team")
        }
    }
})();
const SQmodMenu = function() {
    const e = zzz.cec("div", "menu-tooltip");

    function n(n, t) {
        e.textContent = t;
        const a = n.getBoundingClientRect();
        e.style.left = a.left + a.width + "px", e.style.top = a.top + "px", e.style.display = "block"
    }

    function t() {
        e.style.display = "none"
    }

    function a(e, a, l, i, o, c) {
        let d = a.appendChild(zzz.ce("li"));
        d.style.paddingTop = "5px", d.appendChild(zzz.cec("a", "menu-group-sub")).appendChild(zzz.ce("b")).textContent = o, ["Index", "Trigger"].includes(o) && l.sort((e, n) => {
            let t = e.name.toLocaleUpperCase(),
                a = n.name.toLocaleUpperCase();
            return t == a ? 0 : t > a ? 1 : -1
        }), l.forEach(function(l) {
            let d = a.appendChild(zzz.ce("li")).appendChild(zzz.cec("a", "menu-group-sub"));
            d.onmouseover = function() {
                n(d, l.hint)
            }, d.onmouseout = function() {
                t()
            };
            let p = d.appendChild(zzz.ceca("div", "left-menu-item-f", [
                ["irem", l.irem],
                ["id", "menu-el-rem-" + e + l.irem]
            ]));
            if (l.objs = p, l.pk > 0 ? p.appendChild(zzz.cec("i", "fa fa-key")) : p.appendChild(zzz.cec("i", c)), p.appendChild(document.createTextNode(l.name)), "Column" === o) {
                p.appendChild(zzz.cec("small", "left-menu-item-column-type")).textContent = l.type
            }
            d.addEventListener("contextmenu", function(n) {
                switch (n.preventDefault(), o) {
                    case "Index":
                        SQmodMGUI.EventCMIndex(e, n, l.name);
                        break;
                    case "Trigger":
                        SQmodMGUI.EventCMTriger(e, n, l.name);
                        break;
                    case "Column":
                        SQmodMGUI.EventCMColumn(e, n, l.name, i.name, l.irem, l.type)
                }
            })
        })
    }

    function l(e, n, t) {
        let a = e.indexOf("#"),
            l = a + 1 ? e.substr(0, a) : e,
            i = a + 1 ? e.substr(a + 1) : "",
            o = !1,
            c = l.length > 0,
            d = i.length > 0;
        return n.a.forEach(function(p) {
            let s = p.name.toLocaleLowerCase().includes(l) && c && !d || 0 === e.length,
                r = !1;
            if ("Table" == t && n.j && n.j[p.name]) {
                let e = 0,
                    t = n.j[p.name];
                t && ["c", "i", "t"].forEach(function(n) {
                    t[n] && t[n].length > 0 && t[n].forEach(function(n) {
                        let t = n.name.toLocaleLowerCase().includes(l),
                            o = !1;
                        a + 1 && (!c || t) && d && n.type && (o = n.type.toLocaleLowerCase().includes(i)), (o || !d && t && c) && e++, n.objs.style.borderRight = o || !d && t && c ? "10px solid var(--bgr-g)" : "none"
                    })
                }), r = e > 0, p.objs.setAttribute("data-before", r ? e : "")
            }
            p.obj.style.display = s || r ? "block" : "none", p.objs.style.borderRight = s && c ? "10px solid var(--bgr-g)" : "none", o || (o = s || r)
        }), o
    }

    function i(e, i, o, c, d) {
        if (o && c.a && c.a.length > 0) {
            let p = SQmodMenu.r(o),
                s = p.appendChild(zzz.ceca("li", "title", [
                    ["style", "padding-top: 7px; padding-bottom: 3px;"]
                ]));
            s.appendChild(zzz.ceca("div", "name", [
                ["style", "padding-left: 37px;"]
            ])).textContent = i, c.a.sort((e, n) => {
                let t = e.name.toLocaleUpperCase(),
                    a = n.name.toLocaleUpperCase();
                return t == a ? 0 : t > a ? 1 : -1
            });
            const r = 100;
            let m = 0;
            if (c.a.forEach(function(l) {
                if (++m <= r) {
                    let o = p.appendChild(zzz.ce("li"));
                    l.obj = o;
                    let s = o.appendChild(zzz.cec("a", "menu-group"));
                    s.onmouseover = function() {
                        n(s, l.name)
                    }, s.onmouseout = function() {
                        t()
                    };
                    let r = s.appendChild(zzz.ceca("div", "left-menu-item", [
                        ["irem", l.irem],
                        ["id", "menu-el-rem-" + e + l.irem]
                    ]));
                    if (l.objs = r, r.appendChild(zzz.ceca("i", d, [
                        ["style", "margin-right: 10px;"]
                    ])), r.appendChild(zzz.ct(l.name)), s.addEventListener("contextmenu", function(n) {
                        switch (n.preventDefault(), i) {
                            case "Table":
                                SQmodMGUI.EventCMTable(e, n, l.name, l.irem);
                                break;
                            case "View":
                                SQmodMGUI.EventCMView(e, n, l.name);
                                break;
                            case "Procedure":
                                SQmodMGUI.EventCMProc(e, n, l.name);
                                break;
                            case "Function":
                                SQmodMGUI.EventCMFunc(e, n, l.name)
                        }
                    }), s.addEventListener("dblclick", function(n) {
                        n.stopPropagation(), n.preventDefault(), "Table" == i && SQmodMGUI.on_menu_show_table(e, l.name), "View" == i && SQmodMGUI.on_menu_show_view(e, l.name)
                    }), c.j && c.j[l.name] && "Table" == i) {
                        let n = c.j[l.name];
                        s.appendChild(zzz.ce("span")).className = "fa arrow";
                        let t = o.appendChild(zzz.cec("ul", "nav nav-third-level"));
                        n && n.c && n.c.length > 0 && a(e, t, n.c, l, "Column", "fa fa-columns"), n && n.i && n.i.length > 0 && a(e, t, n.i, l, "Index", "fa fa-list-ol"), n && n.t && n.t.length > 0 && a(e, t, n.t, l, "Trigger", "fa fa-cogs")
                    }
                }
            }), c.a.length > 4 || c.a.length > 1 && "Table" == i) {
                let e = p.appendChild(zzz.ce("li"));
                e.style.display = "none", e.appendChild(zzz.ceca("a", "menu-group", [
                    ["style", "cursor: default;"]
                ])).appendChild(zzz.cec("div", "left-menu-item")).textContent = "none";
                let n = s.appendChild(zzz.cec("div", "mbtn")),
                    t = n.appendChild(zzz.cec("a", "fa fa-search bSearch")),
                    a = n.appendChild(zzz.ceca("input", "hinput", [
                        ["placeholder", "Search"]
                    ])),
                    o = () => {
                        a.value = "", a.className = "hinput", t.className = "fa fa-search bSearch", n.className = "mbtn", e.style.display = "none", l("", c, i)
                    };
                t.onclick = (() => {
                    n.classList.contains("sbtn") ? o() : (a.className = "sinput", t.className = "fa fa-close bSearch", n.className = "sbtn", a.focus())
                }), a.onkeyup = (() => {
                    e.style.display = l(a.value.toLocaleLowerCase(), c, i) ? "none" : "block"
                }), a.onkeydown = (e => {
                    27 == e.keyCode && o()
                })
            }
            m > r && toastr.warring("Limit count " + r + " - " + i, "Schema SQL")
        }
    }

    return document.body.appendChild(e), {
        r: e => e.appendChild(zzz.cec("ul", "nav navd nav-second-level ")),
        updMenu: function(e) {
            const n = {
                    t: {
                        n: "Table",
                        i: "table"
                    },
                    v: {
                        n: "View",
                        i: "th"
                    },
                    p: {
                        n: "Procedure",
                        i: "fire"
                    },
                    f: {
                        n: "Function",
                        i: "bolt"
                    },
                    o: {
                        n: "Package",
                        i: "archive"
                    },
                    b: {
                        n: "Package body",
                        i: "briefcase"
                    }
                },
                t = e.n,
                a = zzz.g("menu-left-db-" + t);
            if (SQA.menustop(), a.innerHTML = "", e.v.length > 0) {
                SQmodMenu.r(a).appendChild(zzz.ceca("li", "", [
                    ["style", "padding-top: 7px;"]
                ])).appendChild(zzz.ceca("i", "", [
                    ["style", "padding-left: 37px;"]
                ])).textContent = e.v
            }
            "sqlite" === t && SQA.menuLeftFirst();
            let l = 0;
            for (let o in e.m) e.m[o].a.length > 0 && (l++, i(t, n[o].n, a, e.m[o], "fa fa-" + n[o].i));
            0 === l && function(e) {
                e && (SQmodMenu.r(e).appendChild(zzz.ceca("li", "", [
                    ["style", "padding-top: 7px;"]
                ])).appendChild(zzz.ceca("i", "", [
                    ["style", "padding-left: 37px;"]
                ])).textContent = "DB is empty")
            }(a), SQA.menustart()
        }
    }
}();
const SQmodMDB = function() {
    const e = {
        2: [{
            n: "TINYINT",
            l: 3
        }, {
            n: "SMALLINT",
            l: 5
        }, {
            n: "MEDIUMINT",
            l: 7
        }, {
            n: "INT",
            l: 10
        }, {
            n: "BIGINT",
            l: 19
        }],
        1: [{
            n: "FLOAT",
            l: 10
        }, {
            n: "DOUBLE",
            l: 19
        }],
        0: [{
            n: "VARCHAR",
            l: 21844,
            b: !0
        }, {
            n: "TEXT",
            l: 65535,
            b: !1
        }, {
            n: "MEDIUMTEXT",
            l: 16777215,
            b: !1
        }, {
            n: "LONGTEXT",
            l: 4294967295,
            b: !1
        }]
    };
    let n = "",
        t = "",
        a = !0,
        r = {
            table: {
                j: {},
                a: [],
                h: ""
            },
            index: {
                a: [],
                h: ""
            },
            trigger: {
                a: [],
                h: ""
            },
            view: {
                j: {},
                a: [],
                h: ""
            },
            proc: {
                j: {},
                a: [],
                h: ""
            },
            func: {
                j: {},
                a: [],
                h: ""
            },
            mlen: {
                col: 0,
                tip: 0,
                tab: 0,
                viw: 0,
                ind: 0,
                tri: 0,
                fun: 0,
                pro: 0
            }
        },
        i = {
            tables: [],
            column: []
        };

    function l(e) {
        n = "", e || SQmodiV5.setCDXRDB("mariadb", n), SQmodCloud.setDB("mariadb", n);
        let t = zzz.g("menu-left-db-mariadb");
        t.innerHTML = "",
            function(e, n, t, a, r) {
                let i = SQmodMenu.r(e).appendChild(zzz.ce("li")).appendChild(zzz.ceca("a", "", a));
                i.appendChild(zzz.ceca("i", t, [
                    ["style", "margin-right: 10px;"]
                ])), i.appendChild(zzz.ct(n)), i.onclick = r
            }(t, "Click to connect", "fa fa-plug", [], function() {
                SQA.flockbtn(), SQmodMDB.gettag()
            }), SQN.z("ma")
    }

    function o(e) {
        r = {
            table: {
                j: {},
                a: [],
                h: ""
            },
            index: {
                a: [],
                b: [],
                h: ""
            },
            trigger: {
                a: [],
                h: ""
            },
            view: {
                j: {},
                a: [],
                h: ""
            },
            proc: {
                j: {},
                a: [],
                h: ""
            },
            func: {
                j: {},
                a: [],
                h: ""
            },
            mlen: {
                col: 0,
                tip: 0,
                tab: 0,
                viw: 0,
                ind: 0,
                tri: 0,
                fun: 0,
                pro: 0
            }
        };
        let n = 0;
        if (e) {
            e.forEach(function(e) {
                if (n++, Array.isArray(e) && 12 === e.length) {
                    let t = "";
                    switch (parseInt(e[0], 10)) {
                        case 1:
                            if (e[11] && "view" === e[11].toLowerCase()) r.view.j[e[2]] || (r.view.j[e[2]] = {
                                p: e,
                                c: [],
                                i: [],
                                t: [],
                                k: 0
                            }, r.view.a.push({
                                name: e[2],
                                hint: e[2],
                                shema: "",
                                type: "",
                                irem: n
                            }), t = e[2].toString().length, r.mlen.viw < t && (r.mlen.viw = t));
                            else {
                                r.table.j[e[2]] || (r.table.a.push({
                                    name: e[2],
                                    hint: e[2],
                                    shema: "",
                                    type: "",
                                    irem: n
                                }), r.table.j[e[2]] = {
                                    p: e,
                                    c: [],
                                    i: [],
                                    t: [],
                                    k: 0
                                }, t = e[2].toString().length, r.mlen.tab < t && (r.mlen.tab = t));
                                let a = r.table.j[e[2]],
                                    i = "PRI" == e[9] ? 1 : 0;
                                a.c.push({
                                    name: e[3],
                                    type: e[7],
                                    pk: i,
                                    irem: n,
                                    hint: e[3] + " " + e[7].toUpperCase(),
                                    cid: e[1]
                                }), 1 == i && (a.k = 1), t = e[3].toString().length, r.mlen.col < t && (r.mlen.col = t)
                            }
                            break;
                        case 2:
                            let a = r.table.j[e[1]];
                            a && r.index.b.indexOf(e[1] + "." + e[2]) < 0 && (r.index.b.push(e[1] + "." + e[2]), r.index.a.push({
                                name: e[2],
                                hint: e[2],
                                tbl_name: e[1]
                            }), a.i.push({
                                name: e[2],
                                hint: e[2],
                                tbl_name: e[1]
                            }), t = e[2].toString().length, r.mlen.ind < t && (r.mlen.ind = t));
                            break;
                        case 3:
                            let i = r.table.j[e[1]];
                            i && (r.trigger.a.push({
                                name: e[3],
                                hint: e[3] + " " + e[4] + " " + e[5],
                                tbl_name: e[1]
                            }), i.t.push({
                                name: e[3],
                                hint: e[3] + " " + e[4] + " " + e[5],
                                tbl_name: e[1]
                            }), t = e[3].toString().length, r.mlen.tri < t && (r.mlen.tri = t));
                            break;
                        case 4:
                            switch (e[2]) {
                                case "FUNCTION":
                                    r.func.a.push({
                                        name: e[1],
                                        hint: e[1],
                                        shema: "",
                                        type: "",
                                        irem: n
                                    }), t = e[1].toString().length, r.mlen.fun < t && (r.mlen.fun = t);
                                    break;
                                case "PROCEDURE":
                                    r.proc.a.push({
                                        name: e[1],
                                        hint: e[1],
                                        shema: "",
                                        type: "",
                                        irem: n
                                    }), t = e[1].toString().length, r.mlen.pro < t && (r.mlen.pro = t)
                            }
                    }
                } else if ("object" == typeof e) {
                    let t = "";
                    switch (parseInt(e.n0, 10)) {
                        case 1:
                            if (e.n11 && "view" == e.n11.toLowerCase()) r.view.j[e.n2] || (r.view.j[e.n2] = {
                                p: e,
                                c: [],
                                i: [],
                                t: [],
                                k: 0
                            }, r.view.a.push({
                                name: e.n2,
                                hint: e.n2,
                                shema: "",
                                type: "",
                                irem: n
                            }), t = e.n2.toString().length, r.mlen.viw < t && (r.mlen.viw = t));
                            else {
                                r.table.j[e.n2] || (r.table.a.push({
                                    name: e.n2,
                                    hint: e.n2,
                                    shema: "",
                                    type: "",
                                    irem: n
                                }), r.table.j[e.n2] = {
                                    p: e,
                                    c: [],
                                    i: [],
                                    t: [],
                                    k: 0
                                }, t = e.n2.toString().length, r.mlen.tab < t && (r.mlen.tab = t));
                                let a = r.table.j[e.n2],
                                    i = "PRI" == e.n9 ? 1 : 0;
                                a.c.push({
                                    name: e.n3,
                                    type: e.n7,
                                    pk: i,
                                    irem: n,
                                    hint: e.n3 + " " + e.n7.toUpperCase(),
                                    cid: e.n1
                                }), 1 == i && (a.k = 1), t = e.n3.toString().length, r.mlen.col < t && (r.mlen.col = t)
                            }
                            break;
                        case 2:
                            let a = r.table.j[e.n1];
                            a && r.index.b.indexOf(e.n1 + "." + e.n2) < 0 && (r.index.b.push(e.n1 + "." + e.n2), r.index.a.push({
                                name: e.n2,
                                hint: e.n2,
                                tbl_name: e.n1
                            }), a.i.push({
                                name: e.n2,
                                hint: e.n2,
                                tbl_name: e.n1
                            }), t = e.n2.toString().length, r.mlen.ind < t && (r.mlen.ind = t));
                            break;
                        case 3:
                            let i = r.table.j[e.n1];
                            i && (r.trigger.a.push({
                                name: e.n3,
                                hint: e.n3 + " " + e.n4 + " " + e.n5,
                                tbl_name: e.n1
                            }), i.t.push({
                                name: e.n3,
                                hint: e.n3 + " " + e.n4 + " " + e.n5,
                                tbl_name: e.n1
                            }), t = e.n3.toString().length, r.mlen.tri < t && (r.mlen.tri = t));
                            break;
                        case 4:
                            switch (e.n2) {
                                case "FUNCTION":
                                    r.func.a.push({
                                        name: e.n1,
                                        hint: e.n1,
                                        shema: "",
                                        type: "",
                                        irem: n
                                    }), t = e.n1.toString().length, r.mlen.fun < t && (r.mlen.fun = t);
                                    break;
                                case "PROCEDURE":
                                    r.proc.a.push({
                                        name: e.n1,
                                        hint: e.n1,
                                        shema: "",
                                        type: "",
                                        irem: n
                                    }), t = e.n1.toString().length, r.mlen.pro < t && (r.mlen.pro = t)
                            }
                    }
                } else console.error("Error: schema!")
            }), i = {
                tables: [],
                column: []
            };
            let t = {};
            r.table.a.forEach(function(e) {
                let n = {
                    text: e.name,
                    displayText: fAddSpaceText(e.name, r.mlen.tab) + " - TABLE",
                    columns: []
                };
                r.table.j[e.name] && r.table.j[e.name].c && r.table.j[e.name].c.forEach(function(a) {
                    let i = {
                        text: a.name,
                        displayText: fAddSpaceText(a.name, r.mlen.col) + " | " + fAddSpaceText(a.type, r.mlen.tip) + " [" + e.name + "]"
                    };
                    n.columns.push(i);
                    let l = a.name.toString().toLowerCase();
                    t[l] && t[l].tab && t[l].tab.length > 0 ? t[l].tab.push(e.name.toUpperCase() + ":" + a.type.toLowerCase()) : t[l] = {
                        tab: [e.name.toUpperCase() + ":" + a.type.toLowerCase()]
                    }
                }), i.tables.unshift(n)
            });
            for (let e in t) {
                let n = t[e],
                    a = "";
                n && n.tab && n.tab.length > 0 && (a = n.tab.join(", ")), i.column.push({
                    text: e,
                    displayText: fAddSpaceText(e, r.mlen.col) + " " + a,
                    columns: []
                })
            }
            r.index.a.forEach(function(e) {
                i.column.push({
                    text: e.name,
                    displayText: fAddSpaceText(e.name, r.mlen.ind) + " - INDEX: [" + e.tbl_name + "]",
                    columns: []
                })
            }), r.trigger.a.forEach(function(e) {
                i.column.push({
                    text: e.name,
                    displayText: fAddSpaceText(e.name, r.mlen.tri) + " - TRIGGER: [" + e.tbl_name + "]",
                    columns: []
                })
            }), r.func.a.forEach(function(e) {
                i.column.push({
                    text: e.name,
                    displayText: fAddSpaceText(e.name, r.mlen.fun) + " - FUNCTION",
                    columns: []
                })
            }), r.proc.a.forEach(function(e) {
                i.column.push({
                    text: e.name,
                    displayText: fAddSpaceText(e.name, r.mlen.pro) + " - PROCEDURE",
                    columns: []
                })
            }), r.view.a.forEach(function(e) {
                i.column.push({
                    text: e.name,
                    displayText: fAddSpaceText(e.name, r.mlen.viw) + " - VIEW",
                    columns: []
                })
            })
        }
        SQmodMenu.updMenu({
            n: "mariadb",
            v: t,
            m: {
                t: r.table,
                v: r.view,
                p: r.proc,
                f: r.func
            }
        })
    }

    return l(!0), {
        query: function(e, t) {
            0 == n.length ? (toastr.success('"Click to connect" in menu', "MariaDB"), SQA.funlockbtn()) : SQN.c("ma", "query", {
                s: e,
                u: n,
                m: SQmodCloud.getMail(),
                p: t
            }, function(e) {
                if (a && SQmodiV5.setCDXRDB("mariadb", n), e.err) {
                    let n = "";
                    n = e.err.text ? e.err.code + " " + e.err.text : e.err, toastr.error(n, "MariaDB"), e.kerr && SQH.help(n)
                }
                if (e.w && e.w.length > 0 && toastr.warring(e.w, "MariaDB"), 7 == e.stat) l();
                else if (e.p && 11 == e.p.t && e.arr && Array.isArray(e.arr) && e.arr.length > 0) e.arr[0].c.forEach(function(n, t) {
                    0 === n.toLowerCase().indexOf("create ") && e.arr[0].v && e.arr[0].v[0] && e.arr[0].v[0][t] && ecm.s(e.arr[0].v[0][t])
                });
                else if (e.m && o(e.m), ot.tableclr(), e.arr && Array.isArray(e.arr)) ot.setDBM(e.arr), db.show();
                else if (e.rez) {
                    if (Array.isArray(e.rez)) {
                        let n = !0,
                            t = [],
                            a = [];
                        e.rez.forEach(function(e) {
                            let r = [];
                            for (let t in e) n && a.push(t), r.push(e[t]);
                            n = !1, t.push(r)
                        }), ot.setMVC(t, a)
                    } else if ("object" == typeof e.rez) {
                        let e = [],
                            n = [];
                        for (let t in m) n.push(t), e.push(m[t]);
                        ot.setMVC(e, n)
                    }
                    ot.tableload(), db.show()
                }
                SQA.funlockbtn()
            })
        },
        dump: function(e) {
            0 == n.length ? (toastr.success('"Click to connect" in menu', "MariaDB"), SQA.funlockbtn()) : SQN.c("ma", "dump", {
                u: n
            }, function(n) {
                n.err && toastr.error(n.err, "MariaDB"), 7 == n.stat ? l() : n.out && SQmodExport.ExSaveBlob(n.out, ".sql", e), SQA.funlockbtn()
            })
        },
        gettag: function(e, r) {
            const i = "boolean" != typeof r || r;
            SQN.c("ma", "gettag", {
                u: n
            }, function(r) {
                r.err ? toastr.error(r.err, "MariaDB") : r.r ? (n = r.r, t = r.v ? r.v : "", SQmodCloud.setDB("mariadb", n), SQmodiV5.setCDXRDB("mariadb", n), a = !0, r.m && o(r.m), e && e(n)) : toastr.error("no Connected", "MariaDB"), i && SQA.funlockbtn()
            }), SQX.sendstat(8)
        },
        start: function(e) {
            const t = n;
            e && t.length > 0 && SQN.c("ma", "close", {
                u: t
            }, function(e) {}), l()
        },
        getmarr_shema: function() {
            return r
        },
        getmarr_shema_hint: function() {
            return i
        },
        getjtype: function() {
            return e
        },
        team: function(e, r) {
            SQN.c("ma", "schema", {
                u: e
            }, function(i) {
                i.err ? toastr.error(i.err, "MariaDB") : i.m ? (a = !r, n = e, SQmodCloud.setDB("mariadb", n), t = i.v ? i.v : "", o(i.m), toastr.success("Connecting", "MariaDB")) : toastr.error("no Connected [2]", "MariaDB"), SQA.funlockbtn()
            })
        },
        schema: function(e) {
            o(e)
        },
        stat: function() {
            return n.length > 0
        },
        connPS: function(e, r, i) {
            a = !1, SQmodCloud.setDB("mariadb", ""), t = i, n = e, r && Array.isArray(r) && o(r)
        }
    }
}();
const SQmodPDB = function() {
    const e = {
        2: [{
            n: "SMALLINT",
            l: 5
        }, {
            n: "INTEGER",
            l: 10
        }, {
            n: "BIGINT",
            l: 19
        }],
        1: [{
            n: "REAL",
            l: 10
        }, {
            n: "DOUBLE PRECISION",
            l: 19
        }],
        0: [{
            n: "VARCHAR",
            l: 10485760,
            b: !0
        }, {
            n: "TEXT",
            l: 0,
            b: !1
        }]
    };
    let t = "",
        n = "",
        a = !0,
        o = {
            table: {
                j: {},
                a: [],
                h: ""
            },
            index: {
                a: [],
                h: ""
            },
            trigger: {
                a: [],
                h: ""
            },
            view: {
                j: {},
                a: [],
                h: ""
            },
            proc: {
                j: {},
                a: [],
                h: ""
            },
            func: {
                j: {},
                a: [],
                h: ""
            },
            mlen: {
                col: 0,
                tip: 0,
                tab: 0,
                viw: 0,
                ind: 0,
                tri: 0,
                fun: 0,
                pro: 0
            }
        },
        r = {
            tables: [],
            column: []
        };

    function l(e) {
        t = "", e || SQmodiV5.setCDXRDB("pgsql", t), SQmodCloud.setDB("pgsql", t);
        let n = zzz.g("menu-left-db-pgsql");
        n.innerHTML = "",
            function(e, t, n, a, o) {
                let r = SQmodMenu.r(e).appendChild(zzz.ce("li")).appendChild(zzz.ceca("a", "", a));
                r.appendChild(zzz.ceca("i", n, [
                    ["style", "margin-right: 10px;"]
                ])), r.appendChild(zzz.ct(t)), r.onclick = o
            }(n, "Click to connect", "fa fa-plug", [], function() {
                SQA.flockbtn(), SQmodPDB.gettag()
            }), SQN.z("pg")
    }

    function c(e) {
        o = {
            table: {
                j: {},
                a: [],
                h: ""
            },
            index: {
                a: [],
                b: [],
                h: ""
            },
            trigger: {
                a: [],
                h: ""
            },
            view: {
                j: {},
                a: [],
                h: ""
            },
            proc: {
                j: {},
                a: [],
                h: ""
            },
            func: {
                j: {},
                a: [],
                h: ""
            },
            mlen: {
                col: 0,
                tip: 0,
                tab: 0,
                viw: 0,
                ind: 0,
                tri: 0,
                fun: 0,
                pro: 0
            }
        };
        let t = 0;
        if (e && 5 == e.length) {
            let n = e[0],
                a = e[1],
                l = e[2],
                c = e[3],
                i = e[4];
            n.forEach(function(e) {
                let n = "";
                t++, o.table.j[e[0]] || (o.table.a.push({
                    name: e[0],
                    hint: e[0],
                    shema: "",
                    type: "",
                    irem: t
                }), o.table.j[e[0]] = {
                    p: e,
                    c: [],
                    i: [],
                    t: [],
                    k: 0
                }, n = e[0].toString().length, o.mlen.tab < n && (o.mlen.tab = n)), o.table.j[e[0]].c.push({
                    name: e[1],
                    type: e[2],
                    pk: 0,
                    irem: t,
                    hint: e[1] + " " + e[2].toUpperCase(),
                    cid: 1
                }), n = e[1].toString().length, o.mlen.col < n && (o.mlen.col = n)
            }), i.forEach(function(e) {
                t++, o.view.a.push({
                    name: e[0],
                    hint: e[0],
                    shema: "",
                    type: "",
                    irem: t
                }), o.view.j[e[0]] = {
                    p: e,
                    c: [],
                    i: [],
                    t: [],
                    k: 0
                };
                let n = e[0].toString().length;
                o.mlen.viw < n && (o.mlen.viw = n)
            }), a.forEach(function(e) {
                let n = "";
                t++;
                let a = o.table.j[e[0]];
                a && (e[4] && "f" != e[4] ? (a.k = 1, a.c.forEach(function(t) {
                    t.name == e[2] && (t.pk = 1)
                })) : o.index.b.indexOf(e[0] + "." + e[1]) < 0 && (o.index.b.push(e[0] + "." + e[1]), o.index.a.push({
                    name: e[1],
                    hint: e[1],
                    tbl_name: e[0]
                }), a.i.push({
                    name: e[1],
                    hint: e[1],
                    tbl_name: e[0]
                }), n = e[1].toString().length, o.mlen.ind < n && (o.mlen.ind = n)))
            }), l.forEach(function(e) {
                let n = "";
                t++;
                let a = o.table.j[e[0]];
                a && (o.trigger.a.push({
                    name: e[1],
                    hint: e[1],
                    tbl_name: e[0]
                }), a.t.push({
                    name: e[1],
                    hint: e[1],
                    tbl_name: e[0]
                }), n = e[1].toString().length, o.mlen.tri < n && (o.mlen.tri = n))
            }), c.forEach(function(e) {
                let n = "";
                switch (t++, e[2]) {
                    case "f":
                        o.func.a.push({
                            name: e[1],
                            hint: e[1],
                            shema: "",
                            type: "",
                            irem: t
                        }), n = e[1].toString().length, o.mlen.fun < n && (o.mlen.fun = n);
                        break;
                    case "p":
                        o.proc.a.push({
                            name: e[1],
                            hint: e[1],
                            shema: "",
                            type: "",
                            irem: t
                        }), n = e[1].toString().length, o.mlen.pro < n && (o.mlen.pro = n)
                }
            }), r = {
                tables: [],
                column: []
            };
            let s = {};
            o.table.a.forEach(function(e) {
                let t = {
                    text: e.name,
                    displayText: fAddSpaceText(e.name, o.mlen.tab) + " - TABLE",
                    columns: []
                };
                o.table.j[e.name] && o.table.j[e.name].c && o.table.j[e.name].c.forEach(function(n) {
                    let a = {
                        text: n.name,
                        displayText: fAddSpaceText(n.name, o.mlen.col) + " | " + fAddSpaceText(n.type, o.mlen.tip) + " [" + e.name + "]"
                    };
                    t.columns.push(a);
                    let r = n.name.toString().toLowerCase();
                    s[r] && s[r].tab && s[r].tab.length > 0 ? s[r].tab.push(e.name.toUpperCase() + ":" + n.type.toLowerCase()) : s[r] = {
                        tab: [e.name.toUpperCase() + ":" + n.type.toLowerCase()]
                    }
                }), r.tables.unshift(t)
            });
            for (let e in s) {
                let t = s[e],
                    n = "";
                t && t.tab && t.tab.length > 0 && (n = t.tab.join(", ")), r.column.push({
                    text: e,
                    displayText: fAddSpaceText(e, o.mlen.col) + " " + n,
                    columns: []
                })
            }
            o.index.a.forEach(function(e) {
                r.column.push({
                    text: e.name,
                    displayText: fAddSpaceText(e.name, o.mlen.ind) + " - INDEX: [" + e.tbl_name + "]",
                    columns: []
                })
            }), o.trigger.a.forEach(function(e) {
                r.column.push({
                    text: e.name,
                    displayText: fAddSpaceText(e.name, o.mlen.tri) + " - TRIGGER: [" + e.tbl_name + "]",
                    columns: []
                })
            }), o.func.a.forEach(function(e) {
                r.column.push({
                    text: e.name,
                    displayText: fAddSpaceText(e.name, o.mlen.fun) + " - FUNCTION",
                    columns: []
                })
            }), o.proc.a.forEach(function(e) {
                r.column.push({
                    text: e.name,
                    displayText: fAddSpaceText(e.name, o.mlen.pro) + " - PROCEDURE",
                    columns: []
                })
            }), o.view.a.forEach(function(e) {
                r.column.push({
                    text: e.name,
                    displayText: fAddSpaceText(e.name, o.mlen.viw) + " - VIEW",
                    columns: []
                })
            })
        }
        SQmodMenu.updMenu({
            n: "pgsql",
            v: n,
            m: {
                t: o.table,
                v: o.view,
                p: o.proc,
                f: o.func
            }
        })
    }

    return l(!0), {
        query: function(e, n) {
            0 == t.length ? (toastr.success('"Click to connect" in menu', "PostgreSQL"), SQA.funlockbtn()) : SQN.c("pg", "query", {
                s: e,
                u: t,
                m: SQmodCloud.getMail(),
                p: n
            }, function(e) {
                if (a && SQmodiV5.setCDXRDB("pgsql", t), e.err) {
                    let t = "";
                    t = e.err.text ? e.err.code + " " + e.err.text : e.err, toastr.error(t, "PostgreSQL"), e.kerr && SQH.help(t)
                }
                if (e.w && e.w.length > 0 && toastr.warring(e.w, "PostgreSQL"), 7 == e.stat) l();
                else if (e.m && c(e.m), ot.tableclr(), e.arr && Array.isArray(e.arr)) ot.setDBM(e.arr), db.show();
                else if (e.rez && e.rez.r) {
                    let t = e.rez.r;
                    if (t)
                        if (Array.isArray(t)) {
                            let e = !0,
                                n = [],
                                a = [];
                            t.forEach(function(t) {
                                let o = [];
                                for (let n in t) e && a.push(n), o.push(t[n]);
                                e = !1, n.push(o)
                            }), ot.setMVC(n, a)
                        } else if ("object" == typeof t) {
                            let e = [],
                                n = [];
                            for (let a in t) n.push(a), e.push(t[a]);
                            ot.setMVC(e, n)
                        }
                    ot.tableload(), db.show()
                }
                SQA.funlockbtn()
            })
        },
        dump: function(e) {
            0 == t.length ? (toastr.success('"Click to connect" in menu', "MariaDB"), SQA.funlockbtn()) : SQN.c("pg", "dump", {
                u: t
            }, function(t) {
                t.err && toastr.error(t.err, "MariaDB"), 7 == t.stat ? l() : t.out && SQmodExport.ExSaveBlob(t.out, ".sql", e), SQA.funlockbtn()
            })
        },
        gettag: function(e, o) {
            const r = "boolean" != typeof o || o;
            SQN.c("pg", "gettag", {
                u: t,
                k: r
            }, function(o) {
                o.err ? toastr.error(o.err, "PostgreSQL") : o.r ? (t = o.r, n = o.v ? o.v : "", SQmodCloud.setDB("pgsql", t), SQmodiV5.setCDXRDB("pgsql", t), a = !0, o.m && c(o.m), e && e(t)) : toastr.error("no Connected", "PostgreSQL"), r && SQA.funlockbtn()
            }), SQX.sendstat(13)
        },
        start: function() {
            l()
        },
        getmarr_shema: function() {
            return o
        },
        getmarr_shema_hint: function() {
            return r
        },
        getjtype: function() {
            return e
        },
        team: function(e, o) {
            SQN.c("pg", "schema", {
                u: e
            }, function(r) {
                r.err ? toastr.error(r.err, "PostgreSQL") : r.m ? (a = !o, t = e, SQmodCloud.setDB("pgsql", t), n = r.v ? r.v : "", c(r.m), toastr.success("Connecting", "PostgreSQL")) : toastr.error("no Connected [2]", "PostgreSQL"), SQA.funlockbtn()
            })
        },
        schema: function(e) {
            c(e)
        },
        stat: function() {
            return t.length > 0
        },
        connPS: function(e, o, r) {
            a = !1, SQmodCloud.setDB("pgsql", ""), n = r, t = e, o && Array.isArray(o) && c(o)
        }
    }
}();
const SQmodSDB = function() {
    const e = {
        2: [{
            n: "TINYINT",
            l: 3
        }, {
            n: "SMALLINT",
            l: 5
        }, {
            n: "INT",
            l: 10
        }, {
            n: "BIGINT",
            l: 19
        }],
        1: [{
            n: "REAL",
            l: 10
        }, {
            n: "FLOAT",
            l: 19
        }],
        0: [{
            n: "VARCHAR",
            l: 8e3,
            b: !0
        }, {
            n: "TEXT",
            l: 2147483647,
            b: !1
        }]
    };
    let n = "",
        t = "",
        a = !0,
        o = {
            table: {
                j: {},
                a: [],
                h: ""
            },
            index: {
                a: [],
                h: ""
            },
            trigger: {
                a: [],
                h: ""
            },
            view: {
                j: {},
                a: [],
                h: ""
            },
            proc: {
                j: {},
                a: [],
                h: ""
            },
            func: {
                j: {},
                a: [],
                h: ""
            },
            mlen: {
                col: 0,
                tip: 0,
                tab: 0,
                viw: 0,
                ind: 0,
                tri: 0,
                fun: 0,
                pro: 0
            }
        },
        l = {
            tables: [],
            column: []
        };

    function r(e) {
        n = "", e || SQmodiV5.setCDXRDB("mssql", n), SQmodCloud.setDB("mssql", n);
        let t = zzz.g("menu-left-db-mssql");
        t.innerHTML = "";
        let a = SQmodMenu.r(t).appendChild(zzz.ce("li")).appendChild(zzz.ce("a"));
        a.appendChild(zzz.ceca("i", "fa fa-plug", [
            ["style", "margin-right: 10px;"]
        ])), a.appendChild(zzz.ct("Click to connect")), a.onclick = function() {
            SQM.mb().innerHTML = '<ul><li>License to use Microsoft SQL Server 2019 Express: <a rel="noopener" href="https://www.microsoft.com/en-us/sql-server/sql-server-2019-pricing" target="_blank">link</a> </li><li>Allowed to be used for reference only!</li><li>You cannot use for commercial!</li><li>Before using, you must agree to all the conditions.</li></ul>', SQM.m({
                name: "isTest()",
                cw: "bw",
                logo: "fa-handshake-o",
                cbo: function() {
                    SQA.flockbtn(), SQmodSDB.gettag()
                }
            })
        }, SQN.z("ms")
    }

    function m(e) {
        o = {
            table: {
                j: {},
                a: [],
                h: ""
            },
            index: {
                a: [],
                b: [],
                h: ""
            },
            trigger: {
                a: [],
                h: ""
            },
            view: {
                j: {},
                a: [],
                h: ""
            },
            proc: {
                j: {},
                a: [],
                h: ""
            },
            func: {
                j: {},
                a: [],
                h: ""
            },
            mlen: {
                col: 0,
                tip: 0,
                tab: 0,
                viw: 0,
                ind: 0,
                tri: 0,
                fun: 0,
                pro: 0
            }
        };
        let n = 0;
        if (e && 3 == e.length) {
            let t = e[2].r,
                a = e[1].r,
                r = e[0].r;
            t.forEach(function(e) {
                let t = "";
                n++, o.table.j[e.tabname] || (o.table.a.push({
                    name: e.tabname,
                    hint: e.tabname,
                    shema: "",
                    type: "",
                    irem: n
                }), o.table.j[e.tabname] = {
                    p: e,
                    c: [],
                    i: [],
                    t: [],
                    k: 0
                }, t = e.tabname.toString().length, o.mlen.tab < t && (o.mlen.tab = t)), o.table.j[e.tabname].c.push({
                    name: e.name,
                    type: e.type,
                    len: e.len,
                    pk: 0,
                    irem: n,
                    hint: e.name + " " + e.type.toUpperCase() + "(" + e.len + ")",
                    cid: 1
                }), t = e.name.toString().length, o.mlen.col < t && (o.mlen.col = t)
            }), a.forEach(function(e) {
                let t = "";
                n++;
                let a = o.table.j[e.tabname];
                a && (e.pk ? (a.k = 1, a.c.forEach(function(n) {
                    n.name == e.colname && (n.pk = 1)
                })) : o.index.b.indexOf(e.tabname + "." + e.name) < 0 && (o.index.b.push(e.tabname + "." + e.name), o.index.a.push({
                    name: e.name,
                    hint: e.name,
                    tbl_name: e.tabname
                }), a.i.push({
                    name: e.name,
                    hint: e.name,
                    tbl_name: e.tabname
                }), t = e.name.toString().length, o.mlen.ind < t && (o.mlen.ind = t)))
            }), r.forEach(function(e) {
                let t = "",
                    a = e.type;
                switch (n++, a) {
                    case "P ":
                        o.proc.a.push({
                            name: e.name,
                            hint: e.name,
                            shema: "",
                            type: "",
                            irem: n
                        }), t = e.name.toString().length, o.mlen.pro < t && (o.mlen.pro = t);
                        break;
                    case "FN":
                        o.func.a.push({
                            name: e.name,
                            hint: e.name,
                            shema: "",
                            type: "",
                            irem: n
                        }), t = e.name.toString().length, o.mlen.fun < t && (o.mlen.fun = t);
                        break;
                    case "TR":
                        let l = o.table.j[e.tabname];
                        l && (o.trigger.a.push({
                            name: e.name,
                            hint: e.name,
                            tbl_name: e.tabname
                        }), l.t.push({
                            name: e.name,
                            hint: e.name,
                            tbl_name: e.tabname
                        }), t = e.name.toString().length, o.mlen.tri < t && (o.mlen.tri = t))
                }
            }), l = {
                tables: [],
                column: []
            };
            let m = {};
            o.table.a.forEach(function(e) {
                let n = {
                    text: e.name,
                    displayText: fAddSpaceText(e.name, o.mlen.tab) + " - TABLE",
                    columns: []
                };
                o.table.j[e.name] && o.table.j[e.name].c && o.table.j[e.name].c.forEach(function(t) {
                    let a = {
                        text: t.name,
                        displayText: fAddSpaceText(t.name, o.mlen.col) + " | " + fAddSpaceText(t.type, o.mlen.tip) + " [" + e.name + "]"
                    };
                    n.columns.push(a);
                    let l = t.name.toString().toLowerCase();
                    m[l] && m[l].tab && m[l].tab.length > 0 ? m[l].tab.push(e.name.toUpperCase() + ":" + t.type.toLowerCase()) : m[l] = {
                        tab: [e.name.toUpperCase() + ":" + t.type.toLowerCase()]
                    }
                }), l.tables.unshift(n)
            });
            for (let e in m) {
                let n = m[e],
                    t = "";
                n && n.tab && n.tab.length > 0 && (t = n.tab.join(", ")), l.column.push({
                    text: e,
                    displayText: fAddSpaceText(e, o.mlen.col) + " " + t,
                    columns: []
                })
            }
            o.index.a.forEach(function(e) {
                l.column.push({
                    text: e.name,
                    displayText: fAddSpaceText(e.name, o.mlen.ind) + " - INDEX: [" + e.tbl_name + "]",
                    columns: []
                })
            }), o.trigger.a.forEach(function(e) {
                l.column.push({
                    text: e.name,
                    displayText: fAddSpaceText(e.name, o.mlen.tri) + " - TRIGGER: [" + e.tbl_name + "]",
                    columns: []
                })
            }), o.func.a.forEach(function(e) {
                l.column.push({
                    text: e.name,
                    displayText: fAddSpaceText(e.name, o.mlen.fun) + " - FUNCTION",
                    columns: []
                })
            }), o.proc.a.forEach(function(e) {
                l.column.push({
                    text: e.name,
                    displayText: fAddSpaceText(e.name, o.mlen.pro) + " - PROCEDURE",
                    columns: []
                })
            })
        }
        SQmodMenu.updMenu({
            n: "mssql",
            v: t,
            m: {
                t: o.table,
                p: o.proc,
                f: o.func
            }
        })
    }

    return r(!0), {
        query: function(e) {
            0 == n.length ? (toastr.success('"Click to connect" in menu', "MS SQL"), SQA.funlockbtn()) : SQN.c("ms", "query", {
                s: e,
                u: n,
                m: SQmodCloud.getMail()
            }, function(e) {
                if (a && SQmodiV5.setCDXRDB("mssql", n), e.err) {
                    let n = "";
                    n = e.err.text ? e.err.code + " " + e.err.text : e.err, toastr.error(n, "MS SQL"), e.kerr && SQH.help(n)
                }
                if (7 == e.stat) r();
                else if (e.m && m(e.m), ot.tableclr(), e.arr && Array.isArray(e.arr)) ot.setDBM(e.arr), db.show();
                else if (e.rez && e.rez.r) {
                    let n = e.rez.r;
                    if (n)
                        if (Array.isArray(n)) {
                            let e = !0,
                                t = [],
                                a = [];
                            n.forEach(function(n) {
                                let o = [];
                                for (let t in n) e && a.push(t), o.push(n[t]);
                                e = !1, t.push(o)
                            }), ot.setMVC(t, a)
                        } else if ("object" == typeof n) {
                            let e = [],
                                t = [];
                            for (let a in n) t.push(a), e.push(n[a]);
                            ot.setMVC(e, t)
                        }
                    ot.tableload(), db.show()
                }
                SQA.funlockbtn()
            })
        },
        dump: function(e) {
            0 == n.length ? (toastr.success('"Click to connect" in menu', "MS SQL"), SQA.funlockbtn()) : SQN.c("ms", "dump", {
                u: n
            }, function(n) {
                n.err && toastr.error(n.err, "MS SQL"), 7 == n.stat ? r() : n.out && SQmodExport.ExSaveBlob(n.out, ".sql", e), SQA.funlockbtn()
            })
        },
        gettag: function(e, o) {
            const l = "boolean" != typeof o || o;
            SQN.c("ms", "gettag", {
                u: n
            }, function(o) {
                o.err ? toastr.error(o.err, "MS SQL") : o.r ? (n = o.r, t = o.v ? o.v : "", SQmodCloud.setDB("mssql", n), SQmodiV5.setCDXRDB("mssql", n), a = !0, o.m && m(o.m), e && e(n)) : toastr.error("no Connected", "MS SQL"), l && SQA.funlockbtn()
            }), SQX.sendstat(14)
        },
        start: function() {
            r()
        },
        getmarr_shema: function() {
            return o
        },
        getmarr_shema_hint: function() {
            return l
        },
        getjtype: function() {
            return e
        },
        team: function(e, o) {
            SQN.c("ms", "schema", {
                u: e
            }, function(l) {
                l.err ? toastr.error(l.err, "MS SQL") : l.m ? (a = !o, n = e, SQmodCloud.setDB("mssql", n), t = l.v ? l.v : "", m(l.m), toastr.success("Connecting", "MS SQL")) : toastr.error("no Connected [2]", "MS SQL"), SQA.funlockbtn()
            })
        },
        schema: function(e) {
            m(e)
        },
        stat: function() {
            return n.length > 0
        },
        connPS: function(e, o, l) {
            a = !1, SQmodCloud.setDB("mssql", ""), t = l, n = e, o && Array.isArray(o) && m(o)
        }
    }
}();
const SQmodODB = function() {
    let e = "",
        t = "",
        n = {
            table: {
                j: {},
                a: [],
                h: ""
            },
            index: {
                a: [],
                h: ""
            },
            trigger: {
                a: [],
                h: ""
            },
            view: {
                j: {},
                a: [],
                h: ""
            },
            proc: {
                j: {},
                a: [],
                h: ""
            },
            func: {
                j: {},
                a: [],
                h: ""
            },
            mlen: {
                col: 0,
                tip: 0,
                tab: 0,
                viw: 0,
                ind: 0,
                tri: 0,
                fun: 0,
                pro: 0
            }
        },
        a = {
            tables: [],
            column: []
        };

    function l() {
        e = "", SQmodCloud.setDB("plsql", e);
        let t = zzz.g("menu-left-db-plsql");
        t.innerHTML = "";
        let n = SQmodMenu.r(t).appendChild(zzz.ce("li")).appendChild(zzz.ce("a"));
        n.appendChild(zzz.ceca("i", "fa fa-plug", [
            ["style", "margin-right: 10px;"]
        ])), n.appendChild(zzz.ct("Click to connect")), SQN.z("or")
    }

    function o(e) {
        n = {
            table: {
                j: {},
                a: [],
                h: ""
            },
            index: {
                a: [],
                b: [],
                h: ""
            },
            trigger: {
                a: [],
                h: ""
            },
            view: {
                j: {},
                a: [],
                h: ""
            },
            proc: {
                j: {},
                a: [],
                h: ""
            },
            func: {
                j: {},
                a: [],
                h: ""
            },
            pack: {
                j: {},
                a: [],
                h: ""
            },
            pacb: {
                j: {},
                a: [],
                h: ""
            },
            mlen: {
                col: 0,
                tip: 0,
                tab: 0,
                viw: 0,
                ind: 0,
                tri: 0,
                fun: 0,
                pro: 0,
                pac: 0,
                pab: 0
            }
        };
        let l = 0;
        if (e && e.c && e.i && e.o && e.t) {
            e.c.forEach(function(e) {
                let t = "";
                l++, n.table.j[e[0]] || (n.table.a.push({
                    name: e[0],
                    hint: e[0],
                    shema: "",
                    type: "",
                    irem: l
                }), n.table.j[e[0]] = {
                    p: e,
                    c: [],
                    i: [],
                    t: [],
                    k: 0
                }, t = e[0].toString().length, n.mlen.tab < t && (n.mlen.tab = t)), n.table.j[e[0]].c.push({
                    name: e[1],
                    type: e[2],
                    len: e[3],
                    pk: 0,
                    irem: l,
                    hint: e[1] + " " + e[2].toUpperCase() + "(" + e[3] + ")",
                    cid: 1
                }), t = e[1].toString().length, n.mlen.col < t && (n.mlen.col = t)
            }), e.i.forEach(function(e) {
                let t = "";
                l++;
                let a = n.table.j[e[4]];
                a && ("P" == e[6] ? (a.k = 1, a.c.forEach(function(t) {
                    t.name == e[1] && (t.pk = 1)
                })) : n.index.b.indexOf(e[4] + "." + e[0]) < 0 && (n.index.b.push(e[4] + "." + e[0]), n.index.a.push({
                    name: e[0],
                    hint: e[0],
                    tbl_name: e[4]
                }), a.i.push({
                    name: e[0],
                    hint: e[0],
                    tbl_name: e[4]
                }), t = e[0].toString().length, n.mlen.ind < t && (n.mlen.ind = t)))
            }), e.t.forEach(function(e) {
                let t = "";
                l++;
                let a = n.table.j[e[3]];
                a && (n.trigger.a.push({
                    name: e[0],
                    hint: e[0],
                    tbl_name: e[3]
                }), a.t.push({
                    name: e[0],
                    hint: e[0],
                    tbl_name: e[3]
                }), t = e[0].toString().length, n.mlen.tri < t && (n.mlen.tri = t))
            }), e.o.forEach(function(e) {
                let t = "",
                    a = e[1];
                switch (l++, a) {
                    case "FUNCTION":
                        n.func.a.push({
                            name: e[0],
                            hint: e[0],
                            shema: "",
                            type: "",
                            irem: l
                        }), t = e[0].toString().length, n.mlen.fun < t && (n.mlen.fun = t);
                        break;
                    case "PACKAGE":
                        n.pack.a.push({
                            name: e[0],
                            hint: e[0],
                            shema: "",
                            type: "",
                            irem: l
                        }), t = e[0].toString().length, n.mlen.pac < t && (n.mlen.pac = t);
                        break;
                    case "PACKAGE BODY":
                        n.pacb.a.push({
                            name: e[0],
                            hint: e[0],
                            shema: "",
                            type: "",
                            irem: l
                        }), t = e[0].toString().length, n.mlen.pab < t && (n.mlen.pab = t);
                        break;
                    case "PROCEDURE":
                        n.proc.a.push({
                            name: e[0],
                            hint: e[0],
                            shema: "",
                            type: "",
                            irem: l
                        }), t = e[0].toString().length, n.mlen.pro < t && (n.mlen.pro = t)
                }
            }), a = {
                tables: [],
                column: []
            };
            let t = {};
            n.table.a.forEach(function(e) {
                let l = {
                    text: e.name,
                    displayText: fAddSpaceText(e.name, n.mlen.tab) + " - TABLE",
                    columns: []
                };
                n.table.j[e.name] && n.table.j[e.name].c && n.table.j[e.name].c.forEach(function(a) {
                    let o = {
                        text: a.name,
                        displayText: fAddSpaceText(a.name, n.mlen.col) + " | " + fAddSpaceText(a.type, n.mlen.tip) + " [" + e.name + "]"
                    };
                    l.columns.push(o);
                    let c = a.name.toString().toLowerCase();
                    t[c] && t[c].tab && t[c].tab.length > 0 ? t[c].tab.push(e.name.toUpperCase() + ":" + a.type.toLowerCase()) : t[c] = {
                        tab: [e.name.toUpperCase() + ":" + a.type.toLowerCase()]
                    }
                }), a.tables.unshift(l)
            });
            for (let e in t) {
                let l = t[e],
                    o = "";
                l && l.tab && l.tab.length > 0 && (o = l.tab.join(", ")), a.column.push({
                    text: e,
                    displayText: fAddSpaceText(e, n.mlen.col) + " " + o,
                    columns: []
                })
            }
            n.index.a.forEach(function(e) {
                a.column.push({
                    text: e.name,
                    displayText: fAddSpaceText(e.name, n.mlen.ind) + " - INDEX: [" + e.tbl_name + "]",
                    columns: []
                })
            }), n.trigger.a.forEach(function(e) {
                a.column.push({
                    text: e.name,
                    displayText: fAddSpaceText(e.name, n.mlen.tri) + " - TRIGGER: [" + e.tbl_name + "]",
                    columns: []
                })
            }), n.func.a.forEach(function(e) {
                a.column.push({
                    text: e.name,
                    displayText: fAddSpaceText(e.name, n.mlen.fun) + " - FUNCTION",
                    columns: []
                })
            }), n.proc.a.forEach(function(e) {
                a.column.push({
                    text: e.name,
                    displayText: fAddSpaceText(e.name, n.mlen.pro) + " - PROCEDURE",
                    columns: []
                })
            }), n.pack.a.forEach(function(e) {
                a.column.push({
                    text: e.name,
                    displayText: fAddSpaceText(e.name, n.mlen.fun) + " - PACKAGE",
                    columns: []
                })
            }), n.pacb.a.forEach(function(e) {
                a.column.push({
                    text: e.name,
                    displayText: fAddSpaceText(e.name, n.mlen.pro) + " - PACKAGE BODY",
                    columns: []
                })
            })
        }
        SQmodMenu.updMenu({
            n: "plsql",
            v: t,
            m: {
                t: n.table,
                p: n.proc,
                f: n.func,
                o: n.pack,
                b: n.pacb
            }
        })
    }

    return l(), {
        query: function(t) {
            0 == e.length ? (toastr.success('"Click to connect" in menu', "Oracle"), SQA.funlockbtn()) : SQN.c("or", "query", {
                s: t,
                u: e
            }, function(e) {
                if (e.err) {
                    let t = "";
                    t = e.err.text ? e.err.code + " " + e.err.text : e.err, toastr.error(t, "Oracle"), e.kerr && SQH.help(t)
                }
                if (7 == e.stat) l();
                else if (e.m && o(e.m), ot.tableclr(), e.rez && e.rez.r) {
                    let t = e.rez.r;
                    if (t)
                        if (Array.isArray(t)) {
                            let e = !0,
                                n = [],
                                a = [];
                            t.forEach(function(t) {
                                let l = [];
                                for (let n in t) e && a.push(n), l.push(t[n]);
                                e = !1, n.push(l)
                            }), ot.setMVC(n, a)
                        } else if ("object" == typeof t) {
                            let e = [],
                                n = [];
                            for (let a in t) n.push(a), e.push(t[a]);
                            ot.setMVC(e, n)
                        }
                    ot.tableload(), db.show()
                }
                SQA.funlockbtn()
            })
        },
        dump: function(t) {
            0 == e.length ? (toastr.success('"Click to connect" in menu', "Oracle"), SQA.funlockbtn()) : SQN.c("or", "dump", {
                u: e
            }, function(e) {
                e.err && toastr.error(e.err, "Oracle"), 7 == e.stat ? l() : e.out && SQmodExport.ExSaveBlob(e.out, ".sql", t), SQA.funlockbtn()
            })
        },
        gettag: function() {
            SQN.c("or", "gettag", {
                u: e
            }, function(n) {
                n.err ? toastr.error(n.err, "Oracle") : n.r ? (e = n.r, t = n.v ? n.v : "", SQmodCloud.setDB("plsql", e), n.m && o(n.m)) : toastr.error("no Connected", "Oracle"), SQA.funlockbtn()
            }), SQX.sendstat(15)
        },
        start: function() {
            l()
        },
        getmarr_shema: function() {
            return n
        },
        getmarr_shema_hint: function() {
            return a
        }
    }
}();
const db = function() {
    let e = 0;
    return {
        sql: function(s, t, a, c) {
            SQA.flockbtn(), c ? SQH.hist(s, c.i, c.n) : SQH.hist(s, "fa-pencil", SQA.getTabAName());
            let d = s.toLowerCase().trimLeft(),
                m = d.indexOf(" "),
                S = d.substr(0, m);
            switch (e = 0, S) {
                case "line-select":
                    e = 1;
                    break;
                case "area-select":
                    e = 2;
                    break;
                case "bar-select":
                    e = 3;
                    break;
                case "pie-select":
                    e = 4
            }
            e > 0 && (s = "SELECT" + d.substr(m, d.length - m));
            const r = a || SQA.get_mm_s(),
                Q = c && c.p ? c.p : {
                    t: 0
                };
            switch (r) {
                case "mariadb":
                    SQmodMDB.query(s, Q), SQX.sendstat(9);
                    break;
                case "pgsql":
                    SQmodPDB.query(s, Q), SQX.sendstat(10);
                    break;
                case "mssql":
                    SQmodSDB.query(s), SQX.sendstat(11);
                    break;
                case "plsql":
                    SQmodODB.query(s), SQX.sendstat(12);
                    break;
                default:
                    const e = void 0 !== t ? t : 2;
                    SQmodSQL.execSQL(s, e), SQX.sendstat(3)
            }
        },
        dump: function(e) {
            switch (e || SQA.get_mm_s()) {
                case "mariadb":
                    SQmodMDB.dump("dump.mariadb"), SQX.sendstat(17);
                    break;
                case "pgsql":
                    SQmodPDB.dump("dump.pgsql"), SQX.sendstat(18);
                    break;
                case "mssql":
                    SQmodSDB.dump("dump.mssql"), SQX.sendstat(19);
                    break;
                case "plsql":
                    SQmodODB.dump("dump.plsql"), SQX.sendstat(20);
                    break;
                default:
                    SQmodExport.ExSaveSQLSchema("dump.sqlite"), SQX.sendstat(16)
            }
        },
        show: function() {
            e > 0 ? (SQmodChart.show(e), SQA.fceSwitch(2)) : SQH.close()
        },
        jtype: function() {
            let e = [];
            switch (SQA.get_mm_s()) {
                case "mariadb":
                    e = SQmodMDB.getjtype();
                    break;
                case "pgsql":
                    e = SQmodPDB.getjtype();
                    break;
                case "mssql":
                    e = SQmodSDB.getjtype();
                    break;
                default:
                    e = SQmodSQL.getjtype()
            }
            return e
        },
        chcol: function(e) {
            let s = /'/g,
                t = ["'", "'"];
            switch (SQA.get_mm_s()) {
                case "mariadb":
                    s = /`/g, t = ["`", "`"];
                    break;
                case "pgsql":
                    s = /"/g, t = ['"', '"'];
                    break;
                case "mssql":
                    s = /[\[\]]/g, t = ["[", "]"]
            }
            return t[0] + e.replace(s, () => "").replace(/ /g, () => "_") + t[1]
        }
    }
}();
const SQX = function() {
    return SQN.b("/fn/log/sq", {
        refcrf: document.referrer
    }), {
        // sendstat: function (e) {
        //     !function (e) {
        //         try {
        //             SQN.b("/fn/log/sq", {typecrf: e, geo: uGEO})
        //         } catch (e) {
        //         }
        //         switch (e) {
        //             case 1:
        //                 ga("send", "event", "page", "save", 1);
        //                 break;
        //             case 2:
        //                 ga("send", "event", "page", "open", 2);
        //                 break;
        //             case 3:
        //                 ga("send", "event", "page", "run", 3);
        //                 break;
        //             case 4:
        //                 ga("send", "event", "page", "fiddle", 4);
        //                 break;
        //             case 5:
        //                 ga("send", "event", "page", "syntax", 5);
        //                 break;
        //             case 6:
        //                 ga("send", "event", "page", "vadd", 6);
        //                 break;
        //             case 7:
        //                 ga("send", "event", "page", "cver", 7);
        //                 break;
        //             case 8:
        //                 ga("send", "event", "page", "mdb", 8);
        //                 break;
        //             case 9:
        //                 ga("send", "event", "page", "ma-run", 9);
        //                 break;
        //             case 10:
        //                 ga("send", "event", "page", "pg-run", 10);
        //                 break;
        //             case 11:
        //                 ga("send", "event", "page", "ms-run", 11);
        //                 break;
        //             case 12:
        //                 ga("send", "event", "page", "or-run", 12);
        //                 break;
        //             case 13:
        //                 ga("send", "event", "page", "pdb", 13);
        //                 break;
        //             case 14:
        //                 ga("send", "event", "page", "sdb", 14);
        //                 break;
        //             case 15:
        //                 ga("send", "event", "page", "odb", 15);
        //                 break;
        //             case 16:
        //                 ga("send", "event", "page", "dump", 16);
        //                 break;
        //             case 17:
        //                 ga("send", "event", "page", "ma-dp", 17);
        //                 break;
        //             case 18:
        //                 ga("send", "event", "page", "pg-dp", 18);
        //                 break;
        //             case 19:
        //                 ga("send", "event", "page", "ms-dp", 19);
        //                 break;
        //             case 20:
        //                 ga("send", "event", "page", "or-dp", 20);
        //                 break;
        //             case 21:
        //                 ga("send", "event", "page", "chart", 21);
        //                 break;
        //             case 22:
        //                 ga("send", "event", "page", "team", 22);
        //                 break;
        //             case 23:
        //                 ga("send", "event", "page", "ma-odb", 23)
        //         }
        //     }(e)
        // }
    }
}();
const SQConn = function() {
    function e(e, t, n, a) {
        let l = !0;
        return 0 === e.value.trim().length ? (e.focus(), l = !1) : 0 === t.value.trim().length ? (t.focus(), l = !1) : 0 === n.value.trim().length ? (n.focus(), l = !1) : a.focus(), l
    }

    function t(e, t, n, a, l, o) {
        const c = e.appendChild(zzz.cec("p", "input-log"));
        return t && t.length > 0 && c.appendChild(zzz.cec("i", "fa " + t)), {
            i: c.appendChild(zzz.ceca(n, a, l)),
            p: c
        }
    }

    return {
        show: function(n) {
            const a = SQM.mb();
            a.innerHTML = "";
            const l = a.appendChild(zzz.cec("div", "row-2")),
                o = l.appendChild(zzz.ceca("div", "bgcl p24", [
                    ["style", "padding-top: 40px"]
                ]));
            l.appendChild(zzz.cec("div", "p24")).innerHTML = '<h2 class="font-bold"> Connect to "Remote DB"</h2><p>Install guide on docker:</p><ul><li><a href="https://hub.docker.com/r/sqliteonlinecom/soe-mariadb" target="_blank">MariaDB</a> 10.5 10.4 10.3 10.2 10.1</li></ul><ul><li><a href="https://hub.docker.com/r/sqliteonlinecom/soe-mysql" target="_blank">MySQL</a> 8.0 5.7</li></ul><ul><li><a href="https://hub.docker.com/r/sqliteonlinecom/soe-postgres" target="_blank">PostgreSQL</a> 13.1 12.5 11.10</li></ul><p>DataBase including external module "sqliteonline.com"</p>';
            const c = t(o, "fa-globe", "input", "", [
                    ["type", "text"],
                    ["placeholder", "url"]
                ]).i,
                i = t(o, "fa-database", "input", "", [
                    ["type", "text"],
                    ["placeholder", "db name"]
                ]).i,
                d = t(o, "fa-user", "input", "", [
                    ["type", "text"],
                    ["placeholder", "login"]
                ]).i,
                r = t(o, "fa-lock", "input", "", [
                    ["type", "password"],
                    ["placeholder", "password"]
                ]).i,
                s = o.appendChild(zzz.ceca("div", "row-2", [
                    ["style", "padding: 0 0 8px;grid-gap: 10px;"]
                ])),
                p = s.appendChild(zzz.cec("button", "btn bg", [
                    ["style", "width: 100%"]
                ])),
                u = s.appendChild(zzz.cec("button", "btn bg", [
                    ["style", "width: 100%"]
                ]));
            p.textContent = "Connect", u.textContent = "Link", o.appendChild(zzz.ce("small")).textContent = "Link: create share link (Url + DataBase Name + Login)", p.onclick = function(e) {
                var t, n, a, l, o;
                t = c.value, n = i.value, a = d.value, l = r.value, (o = p).disabled = !0, SQM.mah(), SQN.c("lo", t + "gettag", {
                    login: a,
                    password: l,
                    dbname: n
                }, function(e) {
                    if (SQM.mar(), o.disabled = !1, e.kerr)
                        if (e.key) {
                            switch (e.d) {
                                case "pgsql":
                                    SQN.x("pg", t), SQmodPDB.connPS(e.eid, e.m, e.v);
                                    break;
                                default:
                                    SQN.x("ma", t), SQmodMDB.connPS(e.eid, e.m, e.v), e.d = "mariadb"
                            }
                            SQM.mc(), SQmodMMal.setDefTableName(""), zzz.g("m-" + e.d).parentElement.className.indexOf("active") < 0 && zzz.g("m-" + e.d).click(), SQX.sendstat(23)
                        } else toastr.error(e.err, "Remote DB");
                    else toastr.error(e.err, "Network")
                }), localStorage && (localStorage.setItem("s.u", c.value), localStorage.setItem("s.d", i.value), localStorage.setItem("s.l", d.value))
            }, u.onclick = function(e) {
                let t = SQM.mt();
                t.innerHTML = "", t.style.display = "block";
                const n = "https://sqliteonline.com/#emlink=" + encodeURIComponent(c.value.trim()) + ";" + encodeURIComponent(i.value.trim()) + ";" + encodeURIComponent(d.value.trim());
                t.appendChild(zzz.ceca("a", "", [
                    ["href", n]
                ])).textContent = n
            }, c.onkeyup = function(e) {
                13 === e.keyCode && i.focus()
            }, i.onkeyup = function(e) {
                13 === e.keyCode && d.focus()
            }, d.onkeyup = function(e) {
                13 === e.keyCode && r.focus()
            }, r.onkeyup = function(t) {
                13 === t.keyCode && e(c, i, d, r) && r.value.length > 0 && d.value.length > 0 && i.value.length > 0 && c.value.length > 0 && p.click()
            }, SQM.m({
                cw: "bw",
                mh: "none",
                mbp: "0",
                mdp: "2px 0 0 0",
                bf: '<i class="fa fa-gamepad" aria-hidden="true"></i> Demo',
                cbf: function() {
                    SQM.mc(), SQmodMDB.stat() || (SQA.flockbtn(), SQmodMDB.start(), SQmodMDB.gettag()), zzz.g("m-mariadb").parentElement.className.indexOf("active") < 0 && zzz.g("m-mariadb").click()
                }
            });
            let m = !0;
            if ("string" == typeof n) {
                const e = n.split(";");
                e && 3 === e.length && (c.value = decodeURIComponent(e[0]), i.value = decodeURIComponent(e[1]), d.value = decodeURIComponent(e[2]), m = !1)
            }
            m && localStorage && (c.value = localStorage.getItem("s.u"), i.value = localStorage.getItem("s.d"), d.value = localStorage.getItem("s.l")), e(c, i, d, r)
        }
    }
}();
const SQUH = function() {
    window.addEventListener("hashchange", function(e) {
        o(3)
    }), window.onpopstate = function(e) {
        try {
            if (SQmodPage.getbkey()) {
                t(location.pathname)
            }
        } catch (e) {
            console.log(e)
        }
    };
    let e = !1;

    function n(n, t) {
        if (t || e) try {
            history.pushState(null, null, n)
        } catch (e) {}
        e = !0
    }

    function t(e) {
        if (0 == e.indexOf("/syntax/")) {
            e.indexOf("#") > -1 && (e = e.substr(0, e.indexOf("#") - 1));
            let n = e.substr(e.indexOf("/syntax/") + 8),
                t = n.indexOf("/");
            t > 0 && (n = n.substr(0, t)), (t = n.indexOf("#")) > 0 && (n = n.substr(0, t)), (t = n.indexOf("?")) > 0 && (n = n.substr(0, t)), SQmodPage.open(n)
        } else SQmodPage.index(!0, !1)
    }

    function o(e) {
        let t = location.hash,
            o = 0;
        try {
            if (0 === t.indexOf("#") && (t = t.substr(1, t.length - 1)), t.indexOf("fiddle-") > -1 && (t = t.replaceAll("fiddle-", "fiddle=")), t.indexOf("=") > 0) {
                const i = t.split("&")[0].split("="),
                    c = i[0];
                if (i.length > 1) switch (c) {
                    case "verify":
                        [1, 3].includes(e) && (SQA.flockbtn(), o = 1, SQmodCloud.TestVerify(i[1]), n("/", !0));
                        break;
                    case "forgot":
                        [1, 3].includes(e) && (SQA.flockbtn(), o = 2, SQmodCloud.TestForgot(i[1]), n("/", !0));
                        break;
                    case "fiddle":
                        [1, 3].includes(e) && (SQA.flockbtn(), o = 3, SQmodSQLFile.fiddLoad(i[1]), n("/", !0));
                        break;
                    case "emlink":
                        [2, 3].includes(e) && (o = 5, SQConn.show(i[1]), n("/", !0))
                }
            }
        } catch (e) {
            SQA.funlockbtn(), toastr.error(e.message, "Cloud")
        }
        return o
    }

    return zzz.g("side-menu").querySelectorAll(".link-ajax").forEach(function(e) {
        e.onclick = function(o) {
            if (o.stopPropagation(), SQmodPage.getbkey()) {
                const o = e.getAttribute("href");
                n(o), t(o)
            }
            return !1
        }
    }), t(location.pathname), {
        h: function(e) {
            n(e)
        },
        foncindex: function(e, o) {
            if (e.preventDefault(), SQmodPage.getbkey()) {
                const e = o.getAttribute("href");
                n(e), t(e)
            }
        },
        testFiddle: function() {
            return 3 !== o(1)
        },
        testJoin: function() {
            return o(2)
        }
    }
}();

function foncindex(e, n) {
    SQUH.foncindex(e, n)
}

const SQmodMMal = function() {
    let e = {
            n: "demo",
            t: "sqlite",
            s: {
                n: "",
                t: ""
            }
        },
        t = {},
        l = {
            n: "",
            v: ""
        };

    function n(e, t) {
        const n = SQmodMMal.getDefTableName();
        if (n && n.n && n.t && n.n.length > 0) {
            let a = "";
            e.forEach(function(e) {
                0 == a.length ? a = "  " + e[0] + "=" + e[1] : a += ",\r\n  " + e[0] + "=" + e[1]
            });
            let s = "UPDATE " + n.n + " SET \r\n" + a + "\r\n WHERE " + l.n + "=" + l.v + "; ";
            if (t) {
                const e = n.s.n.length > 0 ? " ORDER BY " + n.s.n + " " + n.s.t + " " : "";
                db.sql(s + "SELECT * FROM " + n.n + e + ";")
            } else {
                let e = SQM.mt();
                e.style.display = "block", CodeMirror.runMode(s, "text/x-" + SQA.get_mm_s(), e)
            }
        }
    }

    function a(e, n, a) {
        try {
            let s, i = SQmodMMal.getDefTableName();
            if (i && i.n && i.t && i.n.length > 0) {
                let o = !1;
                switch (i.t) {
                    case "sqlite":
                        s = SQmodSQL.getmarr_shema().table.j[i.n];
                        break;
                    case "mariadb":
                        s = SQmodMDB.getmarr_shema().table.j[i.n];
                        break;
                    case "pgsql":
                        s = SQmodPDB.getmarr_shema().table.j[i.n];
                        break;
                    case "mssql":
                        s = SQmodSDB.getmarr_shema().table.j[i.n], o = !0
                }
                if (s && s.c) {
                    t = s.c;
                    const i = SQM.mb();
                    i.innerHTML = "";
                    for (let s in t) {
                        let c, d, r = t[s],
                            m = !0,
                            f = "";
                        r.def && (f = r.def), c = e ? ot.getMV(n) : [];
                        const u = i.appendChild(zzz.ceca("P", "db-ritem db-item-" + s, [
                            ["rowname", s]
                        ]));
                        u.appendChild(zzz.ce("STRONG")).textContent = r.name + " - " + r.type.toUpperCase();
                        const b = u.appendChild(zzz.cec("DIV", "group"));
                        switch (r.sype) {
                            case "BLOB":
                                d = zzz.ceca("INPUT", "db-item", [
                                    ["type", "file"],
                                    ["id", "db-fitem-" + s]
                                ]), m = !1;
                                break;
                            case "TEXT":
                            case "CLOB":
                                (d = zzz.cec("TEXTAREA", "db-item")).textContent = f, e && (d.textContent = c[s]);
                                break;
                            case "VARCHAR":
                            case "CHARACTER":
                            case "NCHAR":
                                let t = [
                                    ["type", "text"]
                                ];
                                r.blen && t.push(["maxlength", r.ilen]), r.def && t.push(["value", r.def]), d = zzz.ceca("INPUT", "db-item", t), e && d.setAttribute("value", c[s]);
                                break;
                            case "INT":
                            case "INTEGER":
                            case "TINYINT":
                            case "SMALLINT":
                            case "MEDIUMINT":
                            case "BIGINT":
                                let l = [
                                    ["type", "number"]
                                ];
                                r.def && l.push(["value", r.def]), d = zzz.ceca("INPUT", "db-item", l), e && d.setAttribute("value", c[s]);
                                break;
                            default:
                                let n = [
                                    ["type", "text"]
                                ];
                                r.def && n.push(["value", r.def]), d = zzz.ceca("INPUT", "db-item", n), e && d.setAttribute("value", c[s])
                        }
                        if (m) {
                            let e;
                            d.onkeydown = function(t) {
                                t && 27 == t.which && (d.value = c[s]), "block" == SQM.mt().style.display && (e && (clearTimeout(e), e = void 0), e = setTimeout(function() {
                                    a && a(), e = void 0
                                }, 300))
                            }, d.oninput = d.onkeydown, d.onpaste = d.onkeydown
                        }
                        const p = b.appendChild(zzz.ceca("SPAN", "g-left", [
                            ["style", "width: 35px;"]
                        ]));
                        b.appendChild(d);
                        let h = !0;
                        o && 1 == r.pk ? (h = !1, d && d.setAttribute("disabled", "disabled")) : !m && e && d.setAttribute("disabled", "disabled");
                        const g = p.appendChild(zzz.ceca("i", !h || !m && e ? "fa fa-square-o" : "fa fa-check-square-o", [
                            ["style", "cursor:pointer;"]
                        ]));
                        h && (g.onclick = function() {
                            d.disabled = !d.disabled, g.className = d.disabled ? "fa fa-square-o" : "fa fa-check-square-o", m && d.onkeydown && d.onkeydown()
                        }), e && 1 == r.pk && (l.n = r.name, "number" == typeof c[s] ? l.v = c[s] : l.v = "'" + sqlE(c[s]) + "'")
                    }
                }
            }
        } catch (e) {
            toastr.error(e.message, "SQL Schema")
        }
    }

    function s(e, t) {
        let l = SQmodMMal.getDefTableName();
        if (l && l.n && l.t && l.n.length > 0) {
            let n = "",
                a = "";
            e.forEach(function(e) {
                0 == n.length ? (n = e[0], a = "  " + e[1]) : (n += "," + e[0], a += ",\r\n  " + e[1])
            });
            let s = "INSERT INTO " + l.n + " (" + n + ") VALUES (\r\n" + a + "\r\n); ";
            if (t) {
                const e = l.s.n.length > 0 ? " ORDER BY " + l.s.n + " " + l.s.t + " " : "";
                db.sql(s + "SELECT * FROM " + l.n + e + ";")
            } else {
                let e = SQM.mt();
                e.style.display = "block", CodeMirror.runMode(s, "text/x-" + SQA.get_mm_s(), e)
            }
        }
    }

    return zzz.g("zce-add").onclick = function() {
        SQmodMMal.ShowAddROW(), SQX.sendstat(6)
    }, {
        getIColPK: function() {
            let e, l = 0,
                n = SQmodMMal.getDefTableName();
            if (t = [], n && n.n && n.t && n.n.length > 0) {
                switch (n.t) {
                    case "sqlite":
                        e = SQmodSQL.getmarr_shema().table.j[n.n];
                        break;
                    case "mariadb":
                        e = SQmodMDB.getmarr_shema().table.j[n.n];
                        break;
                    case "pgsql":
                        e = SQmodPDB.getmarr_shema().table.j[n.n];
                        break;
                    case "mssql":
                        e = SQmodSDB.getmarr_shema().table.j[n.n]
                }
                e && e.c && (t = e.c, l = e.k)
            }
            return l
        },
        UpdROW: function(e) {
            a(!0, e, function() {
                SQmodMMal.ClickUpdROW(!1)
            }), SQM.m({
                name: "UPDATE",
                hint: "Change row to table",
                cw: "bw",
                logo: "fa-pencil-square-o",
                bf: '<i class="fa fa-question" aria-hidden="true"></i> Show SQL',
                cbo: function() {
                    SQmodMMal.ClickUpdROW(!0)
                },
                cbf: function() {
                    SQmodMMal.ClickUpdROW(!1)
                }
            })
        },
        DelROW: function(e) {
            ot.ShowROW(e), SQM.m({
                name: "DELETE",
                hint: "Remove line from table",
                cw: "bw",
                logo: "fa-trash-o",
                bf: '<i class="fa fa-question" aria-hidden="true"></i> Show SQL',
                cbo: function() {
                    SQmodMMal.ClickDelROW(!0, e)
                },
                cbf: function() {
                    SQmodMMal.ClickDelROW(!1, e)
                }
            })
        },
        ShowAddROW: function() {
            a(!1, void 0, function() {
                SQmodMMal.ClickAddROW(!1)
            }), SQM.m({
                name: "INSERT",
                hint: "Add new row to table",
                cw: "bw",
                logo: "fa-pencil-square-o",
                bf: '<i class="fa fa-question" aria-hidden="true"></i> Show SQL',
                cbo: function() {
                    SQmodMMal.ClickAddROW(!0)
                },
                cbf: function() {
                    SQmodMMal.ClickAddROW(!1)
                }
            })
        },
        ClickAddROW: function(e) {
            e && SQA.flockbtn();
            let l = SQM.mb().getElementsByClassName("db-ritem");
            if (l) {
                let n = [];
                Array.prototype.filter.call(l, function(l, a, i) {
                    let o = parseInt(l.getAttribute("rowname"), 10);
                    if (!l.getElementsByClassName("db-item")[0].disabled) switch (t[o].t) {
                        case 1:
                            let c = l.getElementsByClassName("db-item")[0];
                            if (c && c.files && c.files[0]) {
                                let l = c.files[0],
                                    d = new FileReader;
                                d.onload = function(l) {
                                    let c = new Uint8Array(l.target.result).buffer;
                                    n.push([t[o].name, "x'" + buf2hex(c) + "'"]), a + 1 == i.length && s(n, e)
                                }, d.readAsArrayBuffer(l)
                            } else a + 1 == i.length && s(n, e);
                            break;
                        default:
                            let d = l.getElementsByClassName("db-item")[0];
                            d ? (n.push([t[o].name, "'" + sqlE(d.value) + "'"]), a + 1 == i.length && s(n, e)) : a + 1 == i.length && s(n, e)
                    } else a + 1 == i.length && s(n, e)
                })
            }
        },
        ClickDelROW: function(e, l) {
            let n = SQmodMMal.getDefTableName();
            if (n && n.n && n.t && n.n.length > 0) {
                e && SQA.flockbtn();
                let a = "",
                    s = "",
                    i = !1,
                    o = ot.getMV(l);
                for (let e in t) {
                    let l = t[e];
                    1 == l.pk && (a = l.name, s = o[e], i = "number" == typeof o[e])
                }
                let c = "";
                if (c = i ? "DELETE FROM " + n.n + " WHERE " + a + "=" + s + "; " : "DELETE FROM " + n.n + " WHERE " + a + "='" + sqlE(s) + "'; ", e) db.sql(c + "SELECT * FROM " + n.n + ";");
                else {
                    let e = SQM.mt();
                    e.style.display = "block", CodeMirror.runMode(c, "text/x-" + SQA.get_mm_s(), e)
                }
            }
        },
        ClickUpdROW: function(e) {
            e && SQA.flockbtn();
            let l = SQM.mb().getElementsByClassName("db-ritem");
            if (l) {
                let a = [];
                Array.prototype.filter.call(l, function(l, s, i) {
                    let o = parseInt(l.getAttribute("rowname"), 10);
                    if (!l.getElementsByClassName("db-item")[0].disabled) switch (t[o].t) {
                        case 1:
                            let c = l.getElementsByClassName("db-item")[0];
                            if (c && c.files && c.files[0]) {
                                let l = c.files[0],
                                    d = new FileReader;
                                d.onload = function(l) {
                                    let c = new Uint8Array(l.target.result).buffer;
                                    a.push([t[o].name, "x'" + buf2hex(c) + "'"]), s + 1 == i.length && n(a, e)
                                }, d.readAsArrayBuffer(l)
                            } else s + 1 == i.length && n(a, e);
                            break;
                        default:
                            let d = l.getElementsByClassName("db-item")[0];
                            d ? (a.push([t[o].name, "'" + sqlE(d.value) + "'"]), s + 1 == i.length && n(a, e)) : s + 1 == i.length && n(a, e)
                    } else s + 1 == i.length && n(a, e)
                })
            }
        },
        ClickCRmROW: function(e, t, l, n, a, s) {
            if (a && a.length > 0) {
                let n = "";
                switch (SQA.get_mm_s()) {
                    case "oracle":
                        n = l && l.length > 0 ? "ALTER TABLE " + t + " RENAME COLUMN " + l + " TO " + a + " " : "RENAME " + t + " TO " + a + " ";
                        break;
                    case "mssql":
                        n = l && l.length > 0 ? "exec sp_rename '" + t + "." + l + "', '" + a + "', 'COLUMN' " : "exec sp_rename '" + t + "','" + a + "' ";
                        break;
                    case "mariadb":
                        n = l && l.length > 0 ? "ALTER TABLE " + t + " CHANGE COLUMN " + l + " " + a + " " + s + ";" : "ALTER TABLE " + t + " RENAME TO " + a + ";";
                        break;
                    default:
                        n = l && l.length > 0 ? "ALTER TABLE " + t + " RENAME COLUMN " + l + " TO " + a + ";" : "ALTER TABLE " + t + " RENAME TO " + a + ";"
                }
                if (e) SQA.flockbtn(), SQmodMMal.setDefTableName(""), db.sql(n);
                else {
                    let e = SQM.mt();
                    e.style.display = "block", CodeMirror.runMode(n, "text/x-" + SQA.get_mm_s(), e)
                }
            } else toastr.error("Name is null", "Error")
        },
        ClickAddRColumn: function() {
            const e = SQM.mb().querySelector("#list-adcol").appendChild(zzz.cec("div", "row-3")),
                t = e.appendChild(zzz.cec("div", "group group-inp")),
                l = t.appendChild(zzz.ceca("button", "btn bg", [
                    ["style", "border-right-width:1px;width:35px"]
                ]));
            l.onclick = function() {
                e.parentNode.removeChild(e)
            }, l.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>', t.appendChild(zzz.ceca("input", "i-name", [
                ["type", "text"]
            ]));
            const n = e.appendChild(zzz.cec("div", "group group-inp")),
                a = n.appendChild(zzz.ceca("input", "i-type", [
                    ["type", "text"]
                ])),
                s = n.appendChild(zzz.ceca("button", "btn bg", [
                    ["style", "border-right-width:1px;width:35px"]
                ]));
            s.innerHTML = '<i class="fa fa-caret-down" aria-hidden="true"></i>';
            const i = function() {
                a.value = this.textContent
            };
            s.onclick = function(e) {
                SQP.o(n, [{
                    n: "INTEGER",
                    o: i
                }, {
                    n: "TEXT",
                    o: i
                }, {
                    n: "BLOB",
                    o: i
                }, {
                    n: "REAL",
                    o: i
                }, {
                    n: "NUMERIC",
                    o: i
                }])
            };
            const o = e.appendChild(zzz.cec("div", "group group-inp")),
                c = o.appendChild(zzz.ceca("span", "g-left", [
                    ["style", "width:35px"]
                ])),
                d = o.appendChild(zzz.ceca("input", "i-def", [
                    ["type", "text"],
                    ["disabled", ""]
                ])),
                r = c.appendChild(zzz.ceca("i", "fa fa-square-o", [
                    ["style", "cursor:pointer;"]
                ]));
            r.onclick = function() {
                d.disabled = !d.disabled, r.className = d.disabled ? "fa fa-square-o" : "fa fa-check-square-o"
            }
        },
        ClickAddColumn: function(e, t) {
            let l = SQM.mb().querySelector("#list-adcol").getElementsByClassName("row-3"),
                n = "";
            if (Array.prototype.filter.call(l, function(e) {
                let l = e.getElementsByClassName("i-name")[0],
                    a = e.getElementsByClassName("i-type")[0],
                    s = e.getElementsByClassName("i-def")[0],
                    i = l.value.trim();
                if (i.length > 0) {
                    const e = a.value.trim();
                    let l = i + (e.length > 0 ? " " + e : "");
                    s.disabled || (l += " NOT NULL DEFAULT '" + sqlE(s.value) + "'"), n += "ALTER TABLE " + t + " ADD COLUMN " + l + "; \r\n"
                }
            }), n.length > 0)
                if (e) SQA.flockbtn(), db.sql(n);
                else {
                    let e = SQM.mt();
                    e.style.display = "block", CodeMirror.runMode(n, "text/x-sqlite", e)
                }
            else toastr.error("Name is null", "Error")
        },
        ClickDelColumn: function(e) {
            SQA.flockbtn(), db.sql(e)
        },
        setDefTableName: function(t) {
            e.n = t, e.t = SQA.get_mm_s(), e.s = {
                n: "",
                t: ""
            }, e.n.length > 0 ? zzz.g("zce-add").style.display = "block" : zzz.g("zce-add").style.display = "none"
        },
        getDefTableName: function() {
            return e
        },
        sortDASC: function(t, l) {
            e.s = {
                n: t,
                t: l
            };
            const n = e.s.n.length > 0 ? " ORDER BY " + e.s.n + " " + e.s.t + " " : "";
            let a = "SELECT * FROM " + e.n + n + " ";
            ecm.s(a), SQA.flockbtn(), db.sql(a)
        }
    }
}();
const SQmodMGUI = function() {
    function n(n, o) {
        SQP.g(n, o)
    }

    function o(n) {
        return n.indexOf("'") < 0 ? n : "'" + sqlE(n) + "'"
    }

    return {
        EventCMIndex: function(o, e, m) {
            "sqlite" == SQA.get_mm_s() ? n(e, [{
                n: m,
                o: function() {
                    SQmodMGUI.on_menu_copy_name(o, m)
                },
                b: 1
            }, {
                d: 1
            }, {
                n: "SQL Schema",
                o: function() {
                    SQmodMGUI.on_menu_sql_schema(o, 2, m)
                }
            }, {
                n: "DROP",
                o: function() {
                    SQmodMGUI.on_menu_drop(o, 2, m)
                }
            }]) : n(e, [{
                n: m,
                o: function() {
                    SQmodMGUI.on_menu_copy_name(o, m)
                },
                b: 1
            }, {
                d: 1
            }, {
                n: "DROP",
                o: function() {
                    SQmodMGUI.on_menu_drop(o, 2, m)
                }
            }])
        },
        EventCMTriger: function(o, e, m) {
            "sqlite" == SQA.get_mm_s() ? n(e, [{
                n: m,
                o: function() {
                    SQmodMGUI.on_menu_copy_name(o, m)
                },
                b: 1
            }, {
                d: 1
            }, {
                n: "SQL Schema",
                o: function() {
                    SQmodMGUI.on_menu_sql_schema(o, 4, m)
                }
            }, {
                n: "DROP",
                o: function() {
                    SQmodMGUI.on_menu_drop(o, 4, m)
                }
            }]) : n(e, [{
                n: m,
                o: function() {
                    SQmodMGUI.on_menu_copy_name(o, m)
                },
                b: 1
            }, {
                d: 1
            }, {
                n: "DROP",
                o: function() {
                    SQmodMGUI.on_menu_drop(o, 4, m)
                }
            }])
        },
        EventCMColumn: function(o, e, m, t, c, u) {
            "sqlite" == SQA.get_mm_s() ? n(e, [{
                n: m,
                o: function() {
                    SQmodMGUI.on_menu_copy_name(o, m)
                },
                b: 1
            }, {
                d: 1
            }, {
                n: "ADD COLUMN",
                o: function() {
                    SQmodMGUI.on_menu_add_column(o, t)
                }
            }, {
                n: "RENAME",
                o: function() {
                    SQmodMGUI.on_menu_sql_acrename(o, m, t, c, u)
                }
            }, {
                d: 1
            }, {
                n: "DROP",
                o: function() {
                    SQmodMGUI.on_menu_drop_column(o, m, t)
                }
            }]) : n(e, [{
                n: m,
                o: function() {
                    SQmodMGUI.on_menu_copy_name(o, m)
                },
                b: 1
            }, {
                d: 1
            }, {
                n: "RENAME",
                o: function() {
                    SQmodMGUI.on_menu_sql_acrename(o, m, t, c, u)
                }
            }, {
                d: 1
            }, {
                n: "DROP",
                o: function() {
                    SQmodMGUI.on_menu_drop_column(o, m, t)
                }
            }])
        },
        EventCMView: function(o, e, m) {
            "sqlite" == SQA.get_mm_s() ? n(e, [{
                n: m,
                o: function() {
                    SQmodMGUI.on_menu_copy_name(o, m)
                },
                b: 1
            }, {
                d: 1
            }, {
                n: "SELECT",
                o: function() {
                    SQmodMGUI.on_menu_show_view(o, m)
                }
            }, {
                n: "SQL Schema",
                o: function() {
                    SQmodMGUI.on_menu_sql_schema(o, 3, m)
                }
            }, {
                n: "DROP",
                o: function() {
                    SQmodMGUI.on_menu_drop(o, 3, m)
                }
            }]) : n(e, [{
                n: m,
                o: function() {
                    SQmodMGUI.on_menu_copy_name(o, m)
                },
                b: 1
            }, {
                d: 1
            }, {
                n: "SELECT",
                o: function() {
                    SQmodMGUI.on_menu_show_view(o, m)
                }
            }, {
                n: "DROP",
                o: function() {
                    SQmodMGUI.on_menu_drop(o, 3, m)
                }
            }])
        },
        EventCMProc: function(o, e, m) {
            "mariadb" === SQA.get_mm_s() ? n(e, [{
                n: m,
                o: function() {
                    SQmodMGUI.on_menu_copy_name(o, m)
                },
                b: 1
            }, {
                d: 1
            }, {
                n: "DROP",
                o: function() {
                    SQmodMGUI.on_menu_drop(o, 5, m)
                }
            }, {
                d: 1
            }, {
                n: "SQL Schema",
                o: function() {
                    SQmodMGUI.on_menu_sql_schema(o, 5, m)
                }
            }]) : n(e, [{
                n: m,
                o: function() {
                    SQmodMGUI.on_menu_copy_name(o, m)
                },
                b: 1
            }, {
                d: 1
            }, {
                n: "DROP",
                o: function() {
                    SQmodMGUI.on_menu_drop(o, 5, m)
                }
            }])
        },
        EventCMFunc: function(o, e, m) {
            "mariadb" === SQA.get_mm_s() ? n(e, [{
                n: m,
                o: function() {
                    SQmodMGUI.on_menu_copy_name(o, m)
                },
                b: 1
            }, {
                d: 1
            }, {
                n: "DROP",
                o: function() {
                    SQmodMGUI.on_menu_drop(o, 6, m)
                }
            }, {
                d: 1
            }, {
                n: "SQL Schema",
                o: function() {
                    SQmodMGUI.on_menu_sql_schema(o, 6, m)
                }
            }]) : n(e, [{
                n: m,
                o: function() {
                    SQmodMGUI.on_menu_copy_name(o, m)
                },
                b: 1
            }, {
                d: 1
            }, {
                n: "DROP",
                o: function() {
                    SQmodMGUI.on_menu_drop(o, 6, m)
                }
            }])
        },
        EventCMTable: function(o, e, m, t) {
            "sqlite" === SQA.get_mm_s() ? n(e, [{
                n: m,
                o: function() {
                    SQmodMGUI.on_menu_copy_name(o, m)
                },
                b: 1
            }, {
                d: 1
            }, {
                n: "SELECT (Show table)",
                o: function() {
                    SQmodMGUI.on_menu_show_table(o, m)
                }
            }, {
                n: "INSERT (Add row)",
                o: function() {
                    SQmodMGUI.on_menu_add_table(o, m)
                }
            }, {
                n: "ADD COLUMN",
                o: function() {
                    SQmodMGUI.on_menu_add_column(o, m)
                }
            }, {
                n: "RENAME",
                o: function() {
                    SQmodMGUI.on_menu_sql_atrename(o, m, t)
                }
            }, {
                n: "DELETE",
                o: function() {
                    SQmodMGUI.on_menu_delete(o, m)
                }
            }, {
                n: "DROP",
                o: function() {
                    SQmodMGUI.on_menu_drop(o, 1, m)
                }
            }, {
                d: 1
            }, {
                n: "SQL Schema",
                o: function() {
                    SQmodMGUI.on_menu_sql_schema(o, 1, m)
                }
            }, {
                n: "Export table (JSON)",
                o: function() {
                    switch (SQA.get_mm_s()) {
                        case "sqlite":
                            SQmodSQL.getsqliteJSON(4, m)
                    }
                }
            }]) : "mariadb" === SQA.get_mm_s() ? n(e, [{
                n: m,
                o: function() {
                    SQmodMGUI.on_menu_copy_name(o, m)
                },
                b: 1
            }, {
                d: 1
            }, {
                n: "SELECT (Show table)",
                o: function() {
                    SQmodMGUI.on_menu_show_table(o, m)
                }
            }, {
                n: "INSERT (Add row)",
                o: function() {
                    SQmodMGUI.on_menu_add_table(o, m)
                }
            }, {
                n: "RENAME",
                o: function() {
                    SQmodMGUI.on_menu_sql_atrename(o, m, t)
                }
            }, {
                n: "DELETE",
                o: function() {
                    SQmodMGUI.on_menu_delete(o, m)
                }
            }, {
                n: "DROP",
                o: function() {
                    SQmodMGUI.on_menu_drop(o, 1, m)
                }
            }, {
                d: 1
            }, {
                n: "SQL Schema",
                o: function() {
                    SQmodMGUI.on_menu_sql_schema(o, 1, m)
                }
            }]) : n(e, [{
                n: m,
                o: function() {
                    SQmodMGUI.on_menu_copy_name(o, m)
                },
                b: 1
            }, {
                d: 1
            }, {
                n: "SELECT (Show table)",
                o: function() {
                    SQmodMGUI.on_menu_show_table(o, m)
                }
            }, {
                n: "INSERT (Add row)",
                o: function() {
                    SQmodMGUI.on_menu_add_table(o, m)
                }
            }, {
                n: "RENAME",
                o: function() {
                    SQmodMGUI.on_menu_sql_atrename(o, m, t)
                }
            }, {
                n: "DELETE",
                o: function() {
                    SQmodMGUI.on_menu_delete(o, m)
                }
            }, {
                n: "DROP",
                o: function() {
                    SQmodMGUI.on_menu_drop(o, 1, m)
                }
            }])
        },
        on_menu_copy_name: function(n, e) {
            try {
                let n = ecm.a();
                e = e == sqlE(e) ? e : "'" + sqlE(e) + "'", n.replaceRange(o(e), n.getCursor())
            } catch (n) {
                toastr.error(n.message, "CopyToText")
            }
        },
        on_menu_sql_schema: function(n, e, m) {
            let t = "";
            switch (e) {
                case 1:
                    t = "table";
                    break;
                case 2:
                    t = "index";
                    break;
                case 3:
                    t = "view";
                    break;
                case 4:
                    t = "trigger";
                    break;
                case 5:
                    t = "procedure";
                    break;
                case 6:
                    t = "function"
            }
            if (t.length > 0)
                if ("mariadb" === SQA.get_mm_s()) SQA.addNewTAB("Schema " + m), db.sql("SHOW CREATE " + t + " " + m, void 0, "mariadb", {
                    p: {
                        t: 11
                    }
                });
                else {
                    SQA.addNewTAB("Schema " + o(m));
                    let n = "SELECT `sql` FROM `sqlite_master` WHERE name LIKE '" + sqlE(m) + "' AND type LIKE '" + t + "';";
                    SQmodSQL.execSQL(n, 11)
                }
        },
        on_menu_drop: function(n, o, e) {
            let m = "";
            switch (o) {
                case 1:
                    m = "TABLE";
                    break;
                case 2:
                    m = "INDEX";
                    break;
                case 3:
                    m = "VIEW";
                    break;
                case 4:
                    m = "TRIGGER";
                    break;
                case 5:
                    m = "PROCEDURE";
                    break;
                case 6:
                    m = "FUNCTION"
            }
            if (m.length > 0) {
                SQmodMMal.setDefTableName("");
                const n = "DROP " + m + " " + e + " ",
                    o = SQM.mt();
                CodeMirror.runMode(n, "text/x-sqlite", o), SQM.m({
                    name: "DROP",
                    hint: m,
                    cw: "mw",
                    logo: "fa-ban",
                    mb: "none",
                    mt: "block",
                    cbo: function() {
                        SQA.flockbtn(), db.sql(n)
                    }
                })
            }
        },
        on_menu_add_column: function(n, o) {
            const e = SQM.mb();
            e.innerHTML = '<div class="row-3"><b>Name</b><b>Type</b><b>Default</b></div><div id="list-adcol"><div/>';
            const m = e.appendChild(zzz.ceca("div", "", [
                ["style", "display:flex;justify-content: center;padding-top:5px;"]
            ])).appendChild(zzz.ceca("button", "btn bg", [
                ["style", "width: 100px; margin: 0 auto;"]
            ]));
            m.innerHTML = '<i class="fa fa-plus"></i>', m.onclick = function() {
                SQmodMMal.ClickAddRColumn()
            }, SQmodMMal.ClickAddRColumn(), SQM.m({
                name: "ADD Column",
                cw: "bw",
                logo: "fa-address-card-o",
                bf: '<i class="fa fa-question" aria-hidden="true"></i> Show SQL',
                cbo: function() {
                    SQmodMMal.ClickAddColumn(!0, o)
                },
                cbf: function() {
                    SQmodMMal.ClickAddColumn(!1, o)
                }
            })
        },
        on_menu_sql_acrename: function(n, o, e, m, t) {
            const c = SQM.mb();
            c.innerHTML = "";
            const u = c.appendChild(zzz.ce("input"));
            u.value = o;
            let a, d = !1;
            u.onkeydown = function(n) {
                switch (n.which) {
                    case 27:
                        u.value = o;
                        break;
                    case 13:
                        SQM.mo()
                }
                d && (a && (clearTimeout(a), a = void 0), a = setTimeout(function() {
                    SQmodMMal.ClickCRmROW(!1, e, o, m, u.value.trim(), t), a = void 0
                }, 300))
            }, u.oninput = u.onkeydown, u.onpaste = u.onkeydown, SQM.m({
                name: "RENAME",
                hint: "Rename column from table",
                cw: "mw",
                logo: "fa-pencil-square-o",
                bf: '<i class="fa fa-question" aria-hidden="true"></i> Show SQL',
                cbo: function() {
                    SQmodMMal.ClickCRmROW(!0, e, o, m, u.value.trim(), t)
                },
                cbf: function() {
                    SQmodMMal.ClickCRmROW(!1, e, o, m, u.value.trim(), t), d = !0, u.focus()
                }
            }), u.focus()
        },
        on_menu_drop_column: function(n, o, e) {
            const m = SQM.mt();
            let t = "";
            switch (SQA.get_mm_s()) {
                case "sqlite":
                    t = SQmodSQL.getDelColumn(e, o);
                    break;
                default:
                    t = "ALTER TABLE " + e + " DROP COLUMN " + o + " "
            }
            CodeMirror.runMode(t, "text/x-sqlite", m), SQM.m({
                name: "DROP Column",
                cw: "bw",
                logo: "fa-trash-o",
                mb: "none",
                mt: "block",
                cbo: function() {
                    SQmodMMal.ClickDelColumn(t)
                }
            })
        },
        on_menu_show_table: function(n, e) {
            let m = "SELECT * FROM " + o(e) + " ";
            ecm.s(m), SQA.flockbtn(), SQmodMMal.setDefTableName(e), db.sql(m)
        },
        on_menu_show_view: function(n, e) {
            let m = "SELECT * FROM " + o(e) + " ";
            ecm.s(m), SQA.flockbtn(), SQmodMMal.setDefTableName(""), db.sql(m)
        },
        on_menu_add_table: function(n, o) {
            SQmodMMal.setDefTableName(o), SQmodMMal.ShowAddROW(), SQX.sendstat(6)
        },
        on_menu_sql_atrename: function(n, o, e) {
            const m = SQM.mb();
            m.innerHTML = "";
            const t = m.appendChild(zzz.ce("input"));
            t.value = o;
            let c, u = !1;
            t.onkeydown = function(n) {
                switch (n.which) {
                    case 27:
                        t.value = o;
                        break;
                    case 13:
                        SQM.mo()
                }
                u && (c && (clearTimeout(c), c = void 0), c = setTimeout(function() {
                    SQmodMMal.ClickCRmROW(!1, o, "", e, t.value.trim()), c = void 0
                }, 300))
            }, t.oninput = t.onkeydown, t.onpaste = t.onkeydown, SQM.m({
                name: "RENAME",
                hint: "Rename table",
                cw: "mw",
                logo: "fa-pencil-square-o",
                bf: '<i class="fa fa-question" aria-hidden="true"></i> Show SQL',
                cbo: function() {
                    SQmodMMal.ClickCRmROW(!0, o, "", e, t.value.trim())
                },
                cbf: function() {
                    SQmodMMal.ClickCRmROW(!1, o, "", e, t.value.trim()), u = !0, t.focus()
                }
            }), t.focus()
        },
        on_menu_delete: function(n, e) {
            const m = "DELETE FROM " + o(e) + " ",
                t = SQM.mt();
            CodeMirror.runMode(m, "text/x-sqlite", t), SQM.m({
                name: "DELETE",
                hint: "Table",
                cw: "mw",
                logo: "fa-trash-o",
                mb: "none",
                mt: "block",
                cbo: function() {
                    SQA.flockbtn(), db.sql(m)
                }
            })
        }
    }
}();
// const SQmodSQLFile = function () {
//     let e = !0;
//
//     function t(e) {
//         if (e && e.name) {
//             const t = e.name;
//             let l = new FileReader;
//             l.onload = function (e) {
//                 ecm.g(SQA.addNewTAB(t)).setValue(e.target.result)
//             }, l.readAsText(e)
//         }
//     }
//
//     return zzz.g("dbfile").onchange = function () {
//         const e = zzz.g("dbfile").files[0];
//         if (e && e.name) {
//             const t = e.name;
//             let l = new FileReader;
//             l.onload = function (e) {
//                 SQA.flockbtn();
//                 let l = e.target.result;
//                 SQmodSQL.setFileName(t), SQmodSQL.loadbuf(l), zzz.g("dbform").reset(), SQX.sendstat(2)
//             }, l.readAsArrayBuffer(e)
//         }
//     }, zzz.g("textfile").onchange = function () {
//         const e = zzz.g("textfile").files;
//         if (e && e.length > 0) {
//             for (let l = 0; l < e.length; l++) t(e[l]);
//             zzz.g("dbform").reset()
//         }
//     }, {
//         loadurl: function () {
//         }, saveText: function () {
//             let e = ecm.v(), t = new Blob([e]);
//             saveAs(t, SQA.get_tab_name(".sql"))
//         }, fiddLoad: function (t) {
//             var l;
//             SQmodMMal.setDefTableName(""), l = t, e && (e = !1, SQN.a("/fn/file/getuidn", {uid: l}, function (t) {
//                 if (t.err) toastr.error(t.err, "Cloud"), SQmodSQL.startDefDB(); else if (t.res) {
//                     let e = JSON.parse(t.res);
//                     zzz.g("m-sqlite").parentElement.className.indexOf("active") < 0 && zzz.g("m-sqlite").click(), SQA.closeAllTAB(), e && e.tl && e.tl.forEach(function (e, t) {
//                         if (t > 0) {
//                             const t = SQA.addNewTAB(e.name ? e.name : "", {
//                                 i: "fa-link",
//                                 m: e.m ? e.m : "sqlite",
//                                 c: !0
//                             });
//                             ecm.g(t).setValue(e.sql)
//                         } else {
//                             const t = zzz.g("ntab-sqlite");
//                             (t.childNodes && t.childNodes[1] ? t.childNodes[1] : t).textContent = e.name ? e.name : "SQLite", ecm.g("sqlite").setValue(e.sql)
//                         }
//                     }), zzz.g("edit-tab-all").scrollLeft = 0;
//                     let l = base64_to_bytes(e.ab);
//                     SQmodSQL.loadbuf(l), SQX.sendstat(4)
//                 } else toastr.error("no DB", "Cloud"), SQmodSQL.startDefDB();
//                 e = !0
//             }))
//         }
//     }
// }();
const toastr = (() => ({
        error: function(t, e, o) {
            // Toastify({
            //     text: "<b>" + e + "</b><p>" + escapeHtml(t) + "</p>",
            //     backgroundColor: "#ed5565",
            //     position: "center",
            //     close: !0,
            //     className: "toastr-cl"
            // }).showToast(), SQA.funlockbtn()
        },
        warring: function(t, e, o) {
            // Toastify({
            //     text: "<b>" + e + "</b><p>" + escapeHtml(t) + "</p>",
            //     backgroundColor: "#ed7c55",
            //     position: "center",
            //     close: !0,
            //     className: "toastr-cl"
            // }).showToast()
        },
        success: function(t, e, o) {
            // Toastify({
            //     text: "<b>" + e + "</b><p>" + escapeHtml(t) + "</p>",
            //     backgroundColor: "#1ab394",
            //     position: "center",
            //     close: !0,
            //     className: "toastr-cl"
            // }).showToast()
        }
    }))(),
    SQA = (() => {
        let t = 0,
            e = "",
            o = -1,
            n = {
                sqlite: {
                    n: "SQLite",
                    sel: "sqlite",
                    def: "sqlite"
                },
                mariadb: {
                    n: "MariaDB",
                    sel: "mariadb",
                    def: "mariadb",
                    mod: SQmodMDB
                },
                pgsql: {
                    n: "PostgreSQL",
                    sel: "pgsql",
                    def: "pgsql",
                    mod: SQmodPDB
                },
                mssql: {
                    n: "MS SQL Server",
                    sel: "mssql",
                    def: "mssql",
                    mod: SQmodSDB
                },
                plsql: {
                    n: "Oracle",
                    sel: "plsql",
                    def: "plsql",
                    mod: SQmodODB
                }
            };
        const i = new MetisMenu("#side-menu"),
            c = zzz.g("edit-tab-all"),
            a = zzz.q("body");
        let l = "sqlite";
        i.on("show.metisMenu", function(t) {
            let e = t.detail.showElement;
            if (e && e.getAttribute) {
                let t = e.getAttribute("m-type");
                t && t.length > 0 && l != t && (l = t, a.className = t, SQA.showfirsttab(), SQmodMMal.setDefTableName(""), SQmodPage.akey() && SQH.showHist())
            }
        });
        let s = 0,
            r = 0,
            d = !1;

        function z() {
            zzz.g("lock-wait").style.display = "none"
        }


        function f(t) {
            r = t, SQsw.getXK() ? (zzz.g("div-col-table").style.display = 0 === t ? "block" : "none", zzz.g("zce-table").className = "btn bg " + (0 === t ? "show" : ""), zzz.g("div-col-help").style.display = 1 === t ? "block" : "none", zzz.g("zce-book").className = "btn bg " + (1 === t ? "show" : ""), zzz.g("div-col-chart").style.display = 2 === t ? "block" : "none", zzz.g("zce-chart").className = "btn bg " + (2 === t ? "show" : ""), SQmodPage.getTitle(0 === t ? "SQL OnLine IDE" : "")) : 1 === t ? SQsw.getTSD() : (zzz.g("div-col-table").style.display = 0 === t ? "block" : "none", zzz.g("zce-table").className = "btn bg " + (0 === t ? "show" : ""), zzz.g("div-col-chart").style.display = 2 === t ? "block" : "none", zzz.g("zce-chart").className = "btn bg " + (2 === t ? "show" : ""), zzz.g("div-col-help").style.display = "none", SQmodPage.getTitle(0 === t ? "SQL OnLine IDE" : ""))
        }

        function u() {
            return n[l].sel
        }

        function g() {
            SQmodMMal.setDefTableName("");
            const t = ecm.v();
            db.sql(t)
        }

        function m(t, e, o) {
            let n = !0;
            const i = SQM.hp(),
                c = e.textContent,
                a = t.target.getBoundingClientRect();
            i.innerHTML = "";
            const l = i.appendChild(zzz.ceca("DIV", "group group-inp", [
                    ["style", "margin:6px 8px;width:180px;"]
                ])),
                s = l.appendChild(zzz.ceca("INPUT", "", [
                    ["type", "text"],
                    ["maxlength", 250],
                    ["value", c]
                ])),
                r = l.appendChild(zzz.cec("BUTTON", "btn bg"));
            r.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>', s.onkeyup = function() {
                n && (e.textContent = s.value)
            }, r.onclick = function() {
                n = !1;
                const t = s.value;
                e.textContent = t, e.parentNode.setAttribute("title", t), o && SQmodCloud.updATab(o, t), SQM.d()
            }, s.onkeydown = function(t) {
                n && (27 == t.keyCode && SQM.d(), 13 == t.keyCode && r.onclick())
            };
            let d = a.top + a.height + 3;
            SQmodiV5.getRevers() || (d = a.top - a.height), SQM.sd(a.left, d, function(t) {
                n && (e.textContent = c)
            });
            try {
                c && c.length > 0 && (s.selectionStart = c.length, s.selectionEnd = c.length)
            } catch (t) {}
            s.focus()
        }

        const b = zzz.g("edit-tab-all"),
            p = zzz.g("edit-tab-list"),
            S = zzz.g("edit-box");
        let h = {},
            Q = "sqlite",
            y = zzz.g("ntab-sqlite");
        const L = function(t) {
            t.stopPropagation();
            const e = t.target.getAttribute("data-link");
            if (e && e.length > 0 && Q !== e) {
                const o = zzz.g("tab-" + Q);
                o && o.classList.remove("active"), y && y.classList.remove("active"), Q = e, (y = t.target).classList.add("active"), zzz.g("tab-" + e).classList.add("active"), "cloud" !== e && (n[l].sel = e, ecm.g(e) && ecm.g(e).refresh && (ecm.g(e).refresh(), ecm.g(e).focus()))
            }
        };

        function v() {
            if (h[l]) {
                SQA.showfirsttab();
                for (const t in h[l]) {
                    let e = h[l][t];
                    e && e.t && e.e && (p.removeChild(e.t), S.removeChild(e.e)), ecm.d(t)
                }
                h[l] = {}
            }
        }

        function k(t, e) {
            s++;
            const o = e || {
                    i: "fa-pencil-square-o"
                },
                n = o.m ? o.m : l,
                i = s,
                c = void 0 === t ? n + "." + i : t,
                // a = p.appendChild(zzz.cec("LI", "idb idb-" + n)),
                r = a.appendChild(zzz.ceca("A", "", [
                    ["data-link", i],
                    ["id", "ntab-" + i]
                ])),
                d = r.appendChild(zzz.cec("i", "fa " + o.i)),
                z = S.appendChild(zzz.ceca("DIV", "tab-pane", [
                    ["id", "tab-" + i]
                ]));
            z.appendChild(zzz.ceca("TEXTAREA", "text-sql", [
                ["id", "text-sql-" + i]
            ]));
            const f = a.appendChild(zzz.ce("SPAN"));
            f.innerHTML = '<i class="fa fa-times-circle"></i>', h[n] || (h[n] = {}), h[n][i] = {
                t: a,
                e: z,
                a: r,
                ico: d,
                o: o
            }, f.onclick = function() {
                SQA.showfirsttab(), p.removeChild(a), S.removeChild(z), h[n] && h[n][i] && delete h[n][i], ecm.d(i)
            };
            const u = r.appendChild(zzz.ct(c));
            return r.onclick = L, r.setAttribute("title", c), r.oncontextmenu = function(t) {
                t.preventDefault();
                let e = [{
                    n: "Rename",
                    b: !0,
                    o: function() {
                        m(t, u, o.x)
                    }
                }, {
                    d: 1
                }, {
                    n: "Close",
                    o: function() {
                        f.onclick()
                    }
                }, {
                    n: "Close ALL",
                    o: function() {
                        v()
                    }
                }];
                h[n][i] && h[n][i].o && h[n][i].o.x > 0 && (e.push({
                    d: 1
                }), e.push({
                    n: "Update [Ctrl+S]",
                    o: function() {
                        SQmodCloud.updASQL(o.x, ecm.v())
                    }
                })), SQP.g(t, e)
            }, r.onmouseup = function(t) {
                "object" == typeof t && 0 === t.button || t.stopPropagation(), "object" == typeof t && 1 === t.button && (t.stopPropagation(), f.onclick(), SQM.d())
            }, o.c || r.click(), ecm.c(s, "text/x-" + n, o), b.scrollLeft = b.scrollWidth - b.clientWidth, s
        }

        function C(t) {
            ecm.c(t, "text/x-" + t, {});
            const e = zzz.g("ntab-" + t)
                //,
                //o = e.childNodes && e.childNodes[1] ? e.childNodes[1] : e;
            //e.onclick = L, e.oncontextmenu = function(t) {
            //    t.preventDefault(), SQP.g(t, [{
            //        n: "Rename",
            //        b: !0,
            //        o: function() {
            //            m(t, o)
            //        }
            //    }, {
            //        d: 1
            //    }, {
            //        n: "Close ALL",
            //        o: function() {
            //            v()
            //        }
            //    }])
            //}
        }

        return {
            start: function() {
                t = Date.now(), new SQS({
                    o: zzz.g("main-col-left-nav"),
                    y: !0,
                    r: 4,
                    k: !0
                }), new SQS({
                    o: zzz.g("main-bar-right"),
                    y: !0
                }), new SQS({
                    o: zzz.g("edit-tab-all"),
                    x: !0
                }), new SQS({
                    o: zzz.g("table-btn-tab-page-scroll"),
                    x: !0
                }), C("sqlite"), C("mariadb"), C("pgsql"), C("mssql"), C("plsql"),
                    //zzz.g("cloud-tab-z").onclick = L,
                    SQT.s("bar-right-tab");
                // const e = zzz.g("tm-btn-file");
                // e.onclick = (t => {
                //     let o = [{
                //         n: "Open DB", i: "fa fa-folder-open", o: () => {
                //             SQH.stopEr(), zzz.g("dbfile").click()
                //         }
                //     }, {
                //         n: "Save DB", i: "fa fa-save", o: () => {
                //             SQH.stopEr(), SQmodSQL.save()
                //         }
                //     }, {d: 1}, {
                //         n: "Open SQL", i: "fa fa-folder-open", o: () => {
                //             zzz.g("textfile").click()
                //         }
                //     }, {
                //         n: "Save SQL", i: "fa fa-save", o: () => {
                //             SQmodSQLFile.saveText()
                //         }
                //     }, {d: 1}, {
                //         n: "Save history - " + n[l].n, i: "fa fa-save", o: () => {
                //             SQH.save(l)
                //         }
                //     }, {
                //         n: "Clear history - " + n[l].n, i: "fa fa-trash-o", o: () => {
                //             SQH.clear(l)
                //         }
                //     }, {
                //         n: "Clear all-history", i: "fa fa-trash", o: () => {
                //             SQH.clearall()
                //         }
                //     }], i = !0;
                //     for (let t in n) n[t].mod && n[t].mod.stat && n[t].mod.stat() && (i && (o.push({d: 1}), i = !1), o.push({
                //         n: "Close - " + n[t].n,
                //         i: "fa fa-times",
                //         o: () => {
                //             n[t].mod.start(!0)
                //         }
                //     }));
                //     SQP.p(e, o)
                // });
                // const o = zzz.g("tm-btn-export");
                // o.onclick = (t => {
                //     SQP.p(o, [{
                //         n: "CSV", i: ["fa fa-table", "fa fa-long-arrow-right"], o: () => {
                //             SQmodExport.actExport(1)
                //         }
                //     }, {
                //         n: "XML", i: ["fa fa-table", "fa fa-long-arrow-right"], o: () => {
                //             SQmodExport.actExport(2)
                //         }
                //     }, {
                //         n: "JSON", i: ["fa fa-table", "fa fa-long-arrow-right"], o: () => {
                //             SQmodExport.actExport(3)
                //         }
                //     }, {d: 1}, {
                //         n: "SQL Schema", i: ["fa fa-database", "fa fa-long-arrow-right"], o: () => {
                //             SQmodExport.actExport(4)
                //         }
                //     }])
                // })
                // zzz.g("mt-btn-cloud").onclick = function () {
                //     SQmodCloud.fiddForm()
                // },
                zzz.g("mt-btn-run").onclick = function() {
                    g()
                },
                    zzz.g("mt-btn-mod").onclick = function() {

                    },
                    zzz.g("btn-syn-table").onclick = function() {
                        SQA.fceSwitch(0), ot.setscrollbar()
                    },
                    zzz.g("btn-syn-index").onclick = function() {
                        if (SQmodPage.index(!0, !0), SQUH.h("/"), !SQmodCloud.testPriv()) try {
                            SQA.ePN("sa.2");
                            const t = zzz.g("sql-adv2");
                            if (t && t.style && window.adsbygoogle) {
                                t.style.display = "block", t.style.minWidth = "300px", t.style.minHeight = "200px";
                                const e = t.getBoundingClientRect();
                                e.width > 0 && e.height > 0 && (adsbygoogle = window.adsbygoogle || []).push({})
                            }
                        } catch (t) {}
                    },
                    zzz.g("btn-syn-histo").onclick = function() {
                        SQH.showHist()
                    },
                    zzz.g("ce-add").onclick = function(t) {
                        // k()
                    },
                    //zzz.g("ce-revers").onclick = function(t) {
                    //    SQmodiV5.reversRight()
                    //},
                    //     zzz.g("menu-smail").onclick = function () {
                    //     SQmodCloud.sMail()
                    // },
                    zzz.g("edit-tab-list").onmouseup = function(t) {
                        "object" == typeof t && 1 === t.button && (t.stopPropagation(), k(), SQM.d())
                    };
                try {
                    const t = zzz.g("main-table-scroll").offsetWidth - zzz.g("main-table-scroll2").offsetWidth;
                    zzz.g("main-table-scroll").style.height = "calc(100% - " + t + "px)", zzz.g("div-main-grid-table-scroll").style.width = "calc(100% - " + t + "px)"
                } catch (t) {
                    console.warn(t)
                }
                setTimeout(function() {
                    window.onresize = function(t) {
                        d && clearTimeout(d), d = setTimeout(function() {
                            ot.setscrollbar()
                        }, 300)
                    }, SQmodiV5.setCB(function() {
                        ot.setscrollbar()
                    })
                }, 200), ot.setscrollbar(), zzz.g("zce-table").onclick = function() {
                    f(0)
                }, zzz.g("zce-chart").onclick = function() {
                    f(2)
                }, zzz.g("zce-book").onclick = function() {
                    try {
                        1 == location.hash.indexOf("/act/") && (location.hash = "/act/idx")
                    } catch (t) {}
                    f(1)
                }, b.addEventListener("wheel", function(t) {
                    t.deltaY > 0 ? b.scrollLeft += 87 : b.scrollLeft -= 87, SQM.d()
                }, {
                    passive: !0
                });
                const i = zzz.g("table-btn-tab-page-scroll");
                i.addEventListener("wheel", function(t) {
                    t.deltaY > 0 ? i.scrollLeft += 27 : i.scrollLeft -= 27, SQM.d()
                }, {
                    passive: !0
                }), zzz.g("edit-tab-list").oncontextmenu = function(t) {
                    t && t.target && "UL" === t.target.tagName && (t.preventDefault(), SQP.g(t, [{
                        n: "New Tab",
                        o: function() {
                            k()
                        }
                    }, {
                        n: "Close ALL",
                        o: function() {
                            v()
                        }
                    }]))
                }, window.onbeforeunload = function() {
                    SQX.sendstat(-1)
                }, window.onerror = function(e, o, n, i, c) {
                    if (e.indexOf("Script error") < 0 && e.indexOf("ResizeObserver loop limit exceeded") < 0 && e.indexOf("SecurityError") < 0 && (e.indexOf("adsbygoogle") < 0 && toastr.error(e, "System"), !SQmodCloud || !SQmodCloud.testPriv())) {
                        const i = navigator && navigator.userAgent ? navigator.userAgent : "",
                            a = Date.now();
                        let l = "\n| ";
                        try {
                            l += c.stack
                        } catch (t) {}
                        SQN.b("/fn/log/er", {
                            v: 22,
                            msg: e + l,
                            url: o,
                            num: n,
                            sys: i,
                            t: 0 === t ? 0 : a - t
                        })
                    }
                    return z(), !0
                }
            },
            funlockbtn: function() {
                z()
            },
            flockbtn: function() {
                zzz.g("lock-wait").style.display = "block"
            },
            getce_switch: function() {
                return r
            },
            fceSwitch: function(t) {
                f(t)
            },
            get_tab_name: function(t) {
                const e = zzz.g("ntab-" + u()),
                    o = e ? e.textContent : "";
                let n = getStrDateName() + t;
                return o.trim().length > 0 && (n = o + (o.indexOf(t) < 0 ? t : "")), n
            },
            get_sel_tab: function() {
                return u()
            },
            tab_id: function(t) {
                return s += t
            },
            get_mm_s: function() {
                return l
            },
            menustop: function() {
                i.dispose()
            },
            menustart: function() {
                i.update()
            },
            showfirsttab: function() {
                c.querySelector("LI.idb-" + l + " A").click(), b.scrollLeft = 0
            },
            closeAllTAB: function() {
                v()
            },
            addNewTAB: function(t, e) {
                return k(t, e)
            },
            delCloudTAB: function(t) {
                for (let e in h)
                    for (let o in h[e]) h[e][o].o && h[e][o].o.x === t && (h[e][o].o.x = 0, h[e][o].ico && h[e][o].ico.className && (h[e][o].ico.className = "fa fa-pencil-square-o"))
            },
            menuLeftClr: function() {
                const t = zzz.g("side-menu");
                t.querySelectorAll("LI").forEach(function(t) {
                    t.classList.remove("ss-hidden")
                }), t.querySelectorAll("UL").forEach(function(t) {
                    t.classList.remove("in"), t.classList.remove("collapse"), t.classList.remove("collapsing"), t.removeAttribute("style")
                })
            },
            menuLeftFirst: function() {
                SQA.menuLeftClr();
                const t = zzz.g("side-menu");
                t.querySelector("LI").classList.add("active"), t.querySelector("A").setAttribute("aria-expanded", "true"), t.querySelector("UL").classList.add("in")
            },
            run: function() {
                g()
            },
            DCL: function() {
                SQmodCloud.start(), SQA.start(), ["mariadb", "pgsql", "mssql"].forEach(function(t) {
                    const e = function(t) {
                        let e = !1;
                        if (localStorage) {
                            const o = Date.now(),
                                n = localStorage.getItem(t + "_tic"),
                                i = n ? parseInt(n, 10) : 0;
                            !isNaN(i) && (o - i) / 108e5 < 1 ? e = localStorage.getItem(t + "_uid") : localStorage.setItem(t + "_tic", "0")
                        }
                        return e
                    }(t);
                    e && e.length > 0 && n[t] && n[t].mod && n[t].mod.team && n[t].mod.team(e)
                }), SSQv.s()
            },
            cOUT: function() {
                for (let t in h)
                    for (let e in h[t]) h[t][e] && h[t][e].o && (h[t][e].o = 0, h[t][e].ico && h[t][e].ico.className && (h[t][e].ico.className = "fa fa-pencil-square-o"))
            },
            ePN: function(t) {
                o = Date.now(), e = l + "* " + t
            },
            eSJ: function(t) {
                return n[t].n
            },
            getTabAName: function() {
                return y ? y.textContent : ""
            }
        }
    })();
let bDCLk = !0;
document.addEventListener("DOMContentLoaded", function() {
    bDCLk && (bDCLk = !1, SQA.DCL())
}), "loading" !== document.readyState && bDCLk && (bDCLk = !1, SQA.DCL());
const SQmodSQL = function() {
    const e = {
        2: [{
            n: "INTEGER",
            l: 19
        }],
        1: [{
            n: "REAL",
            l: 19
        }],
        0: [{
            n: "TEXT",
            l: 1e9,
            b: !1
        }]
    };
    let t, n = !1,
        a = 0,
        i = 2,
        l = "",
        o = "",
        s = "",
        r = "demo",
        c = {
            table: {
                j: {},
                a: [],
                h: ""
            },
            index: {
                a: [],
                h: ""
            },
            trigger: {
                a: [],
                h: ""
            },
            view: {
                j: {},
                a: [],
                h: ""
            },
            mlen: {
                col: 0,
                tip: 0,
                tab: 0,
                viw: 0,
                ind: 0,
                tri: 0
            }
        },
        m = {
            tables: [],
            column: []
        },
        u = !0;

    function d() {
        // !function () {
        //     let e, t = !1, n = navigator && navigator.userAgent ? navigator.userAgent : "",
        //         a = n.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        //     return /trident/i.test(a[1]) ? "IE " + ((e = /\brv[ :]+(\d+)/g.exec(n) || [])[1] || "") : "Chrome" === a[1] && null != (e = n.match(/\b(OPR|Edge)\/(\d+)/)) ? e.slice(1).join(" ").replace("OPR", "Opera") : (a = a[2] ? [a[1], a[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (e = n.match(/version\/(\d+)/i)) && a.splice(1, 1, e[1]), a[0].toLocaleLowerCase().indexOf("chrome") > -1 && parseInt(a[1], 10) > 73 && (t = !0), a[0].toLocaleLowerCase().indexOf("firefox") > -1 && parseInt(a[1], 10) > 65 && (t = !0), t)
        // }() ? f("/a/j/wv3.34.1.js") : (f("/a/w/wa3.34.1.js"), setTimeout(function () {
        //     u && (toastr.error('Error load "wasm", reconnect to "asm.js".', "SQLite.WASM"), t && t.terminate(), f("/a/j/wv3.34.1.js"), ga("send", "event", "err", "wasm", 4001))
        // }, 6e4))
    }

    const p = window.matchMedia("(max-width: 768px)"),
        b = location.pathname;

    function f(e) {
        SQA.flockbtn(), n = !0, a = 0, (t = new Worker(e)).onerror = function(e) {
            let n = e && e.message ? e.message : "";
            toastr.error(n, "SqLite.js"), SQH.help(n), n.includes("file is not a database") ? (a = 0, i = 0, t.postMessage({
                action: "open"
            }), toastr.error("Open default database", "SQLite")) : n.indexOf("already exists") > -1 ? SQmodSQL.workerOnMess(3, "") : SQA.funlockbtn()
        }, t.onmessage = function(e) {
            if (e && e.data && e.data.error) {
                let n = e.data.error;
                toastr.error(n, "SqLite.js"), SQH.help(n), n.includes("file is not a database") ? (a = 0, i = 0, t.postMessage({
                    action: "open"
                }), toastr.error("Open default database", "SQLite")) : n.indexOf("already exists") > -1 ? SQmodSQL.workerOnMess(3, "") : SQA.funlockbtn()
            } else SQmodSQL.workerOnMess(a, e)
        }, t.postMessage({
            action: "open"
        })
    }

    function h() {
        return n || SQA.funlockbtn(), n
    }

    function E(e, n) {
        h() ? (a = void 0 !== n ? n : 2, l = e, t.postMessage({
            action: "exec",
            sql: l
        })) : toastr.success('"Click to connect" in menu', "SQLite")
    }

    function S() {
        E("SELECT a.name, a.type, a.sql, a.tbl_name, a.rootpage, p.cid, p.name, p.type, p.'notnull', p.dflt_value, p.pk FROM sqlite_master AS a, pragma_table_info(a.name) as p WHERE a.type='table'  UNION ALL SELECT b.name, b.type, b.sql, b.tbl_name, b.rootpage,-1,0,0,0,0,0 FROM sqlite_master AS b WHERE sql not null order by cid, name asc;", 1)
    }

    function g(e) {
        t && t.terminate(), i = 1, f(e), SQX.sendstat(7)
    }

    return p.matches || b.indexOf("/syntax/") > -1 || b.indexOf("#jointeam") > -1 || b.indexOf("#emlink") > -1 ? (! function() {
        SQA.menustop();
        let e = zzz.g("menu-left-db-sqlite");
        e.innerHTML = "";
        let n = SQmodMenu.r(e).appendChild(zzz.ce("li")).appendChild(zzz.ce("a"));
        n.appendChild(zzz.ceca("i", "fa fa-plug", [
            ["style", "margin-right: 10px;"]
        ])), n.appendChild(zzz.ct("Click to connect")), n.onclick = function() {
            t && t.terminate(), i = 2, d()
        }, zzz.g("zce-add").style.display = "none", SQA.menuLeftFirst(), SQA.menustart()
    }(), ot.setMVC([
        ["Open left menu"],
        ["Select DB"],
        ['"Click to connect" in left-menu']
    ], ["hint"]), ot.tableload(), SQA.funlockbtn()) : d(), zzz.g("sqlite-select").onchange = function(e) {
        const t = e.srcElement.value,
            n = e.srcElement.selectedIndex,
            a = e.srcElement.options[n].label;
        "string" == typeof a && a.length > 0 && ("w" === t ? g("/a/w/wa" + a + ".js") : "j" === t ? g("/a/j/wv" + a + ".js") : d())
    }, {
        save: function() {
            h() && (a = 7, t.postMessage({
                action: "export"
            }))
        },
        loadbuf: function(e) {
            if (h()) {
                c = {
                    table: {
                        j: {},
                        a: [],
                        h: ""
                    },
                    index: {
                        a: [],
                        h: ""
                    },
                    trigger: {
                        a: [],
                        h: ""
                    },
                    view: {
                        j: {},
                        a: [],
                        h: ""
                    },
                    mlen: {
                        col: 0,
                        tip: 0,
                        tab: 0,
                        viw: 0,
                        ind: 0,
                        tri: 0
                    }
                }, SQA.menustop(), zzz.g("menu-left-db-sqlite").innerHTML = "", SQA.menuLeftClr(), SQA.menustart(), a = 3;
                try {
                    t.postMessage({
                        action: "open",
                        buffer: e
                    }, [e])
                } catch (n) {
                    t.postMessage({
                        action: "open",
                        buffer: e
                    })
                }
            } else toastr.success('"Click to connect" in menu', "SQLite")
        },
        fiddCreate: function(e) {
            o = e, SQM.mb().innerHTML = '<div style="text-align: center"><h3>Create public link?</h3><p style="margin-bottom: 0">(the database is stored for only 3 months)</p></div>', SQM.m({
                name: "Share",
                hint: "Upload you DB file and SQL text.",
                cw: "bw",
                logo: "fa-cloud-upload",
                kbo: !1,
                cbo: function() {
                    h() && (SQA.flockbtn(), a = 12, t.postMessage({
                        action: "export"
                    }))
                }
            })
        },
        setFileName: function(e) {
            s = e
        },
        execSQL: function(e, t) {
            E(e, void 0 !== t ? t : 2)
        },
        getsqliteJSON: function(e, t) {
            let n = void 0 !== e ? e : 2;
            r = t, E("SELECT * FROM '" + sqlE(t) + "';", n)
        },
        workerOnMess: function(e, t) {
            switch (e) {
                case 0:
                    ! function() {
                        if (u = !1, SQUH.testFiddle()) {
                            let e = " ";
                            switch (e += " CREATE TABLE demo (ID integer primary key, Name varchar(20), Hint text );", e += " BEGIN TRANSACTION;", e += " insert into demo (name, hint) values ('SQL Online', 'for Data Science');", e += " insert into demo (name, hint) values ('Chart', 'LINE-SELECT name, cos(id), sin(id) FROM demo;');", e += " insert into demo (name, hint) values ('Short CODE', 's* tableName => SELECT * FROM tableName\r\nsf tableName => SELECT columns FROM tableName\r\nsl tableName => SELECT * FROM tableName ORDER BY key DESC LIMIT 100;\r\nct => CREATE TABLE\r\nii tableName => INSERT INTO\r\nus tableName => UPDATE SET\r\nuw tableName => UPDATE SET WHERE\r\ndf tableName => DELETE FROM\r\ndw tableName => DELETE FROM WHERE');", e += " insert into demo (name, hint) values ('SqLite 3.34.1', 'SQL OnLine on JavaScript');", e += " insert into demo (name, hint) values ('MultiVersion', '3.28.0 to Last (load on settings)');", e += " insert into demo (name, hint) values ('[RightClick] mouse', 'Opens many additional features');", e += " insert into demo (name, hint) values ('Left-Panel, Table', '[RightClick] mouse \"Context menu\" or [DbClick]');", e += " insert into demo (name, hint) values ('Tabs', 'mouse: [RightClick] , [MiddleClick] , [Wheel] , [LeftClick]');", e += " insert into demo (name, hint) values ('SQL Editor', 'autocomplete: [Ctrl-Space] or [Alt-Space]; run: [Shift-Enter]');", e += " insert into demo (name, hint) values ('Size table', 'Fast scroll million rows');", e += " insert into demo (name, hint) values ('Share', 'Create public link DB');", e += " insert into demo (name, hint) values ('ai.Url', 'https://twitter.com/SqliteOnlineCom');", e += " insert into demo (name, hint) values ('ai.Color', '#9393ad');", e += " insert into demo (name, hint) values ('ai.Image', 'Blob - png, jpg, gif or String(base64) [DbClick] row');", e += " insert into demo (name, hint) values ('SQL', 'Syntax example library');", e += " insert into demo (name, hint) values ('CREATE', 'CREATE TABLE table_name (col1, col2)');", e += " insert into demo (name, hint) values ('SELECT', 'SELECT * FROM table_name');", e += " insert into demo (name, hint) values ('INSERT', 'INSERT INTO table_name (col1, col2) VALUES (\"example\",\"test\")');", e += " insert into demo (name, hint) values ('UPDATE', 'UPDATE table_name SET col1=\"work\" WHERE col2=\"test\"');", e += " insert into demo (name, hint) values ('DELETE', 'DELETE FROM table_name');", e += " COMMIT;", i) {
                                case 1:
                                    e += " SELECT sqlite_version();";
                                    break;
                                case 2:
                                    e += " SELECT * FROM demo;"
                            }
                            E(e)
                        }
                    }();
                    break;
                case 1:
                    ! function(e) {
                        let t = e.data.results,
                            n = 0;
                        if (c = {
                            table: {
                                j: {},
                                a: [],
                                h: ""
                            },
                            index: {
                                a: [],
                                h: ""
                            },
                            trigger: {
                                a: [],
                                h: ""
                            },
                            view: {
                                j: {},
                                a: [],
                                h: ""
                            },
                            mlen: {
                                col: 0,
                                tip: 0,
                                tab: 0,
                                viw: 0,
                                ind: 0,
                                tri: 0
                            }
                        }, m = {
                            tables: [],
                            column: []
                        }, t && t.length > 0) {
                            let e = t[0].values;
                            for (let t = 0; t < e.length; t++) {
                                n++;
                                let a = e[t];
                                if (parseInt(a[5], 10) < 0) {
                                    let e = a[0].toString().length;
                                    switch (a[1]) {
                                        case "table":
                                            c.table.a.push({
                                                name: a[0],
                                                tbl_name: a[3],
                                                shema: a[2],
                                                type: a[1],
                                                irem: n
                                            }), c.table.j[a[0]] = {
                                                p: a,
                                                c: [],
                                                i: [],
                                                t: [],
                                                k: 0
                                            }, c.mlen.tab < e && (c.mlen.tab = e);
                                            break;
                                        case "index":
                                            c.index.a.push({
                                                name: a[0],
                                                hint: a[0],
                                                tbl_name: a[3],
                                                shema: a[2],
                                                type: a[1],
                                                irem: n
                                            }), c.mlen.ind < e && (c.mlen.ind = e);
                                            break;
                                        case "view":
                                            c.view.a.push({
                                                name: a[0],
                                                tbl_name: a[3],
                                                shema: a[2],
                                                type: a[1],
                                                irem: n
                                            }), c.view.j[a[0]] = {
                                                p: a,
                                                c: [],
                                                i: [],
                                                t: [],
                                                k: 0
                                            }, c.mlen.viw < e && (c.mlen.viw = e);
                                            break;
                                        case "trigger":
                                            c.trigger.a.push({
                                                name: a[0],
                                                hint: a[0],
                                                tbl_name: a[3],
                                                shema: a[2],
                                                type: a[1],
                                                irem: n
                                            }), c.mlen.tri < e && (c.mlen.tri = e)
                                    }
                                } else {
                                    let e = {
                                            name: a[6],
                                            hint: a[6] + " " + a[7].toUpperCase(),
                                            cid: parseInt(a[5], 10),
                                            type: a[7],
                                            nnull: parseInt(a[8]),
                                            def: a[9],
                                            pk: parseInt(a[10]),
                                            irem: n
                                        },
                                        t = a[6].toString().length;
                                    switch (c.mlen.col < t && (c.mlen.col = t), t = a[7].toString().length, c.mlen.tip < t && (c.mlen.tip = t), a[1]) {
                                        case "table":
                                            if (c.table.j[a[0]]) {
                                                let t = e.type.indexOf("("),
                                                    n = !1,
                                                    i = 0,
                                                    l = "",
                                                    o = 0;
                                                if (t > -1) {
                                                    n = !0;
                                                    let a = e.type.substr(0, t);
                                                    i = e.type.replace(/.*?\((.*?)\).*/gi, "$1"), l = a.toUpperCase()
                                                } else l = e.type.toUpperCase();
                                                switch (l) {
                                                    case "BLOB":
                                                        o = 1;
                                                        break;
                                                    case "TEXT":
                                                    case "CLOB":
                                                        o = 2;
                                                        break;
                                                    case "VARCHAR":
                                                    case "CHARACTER":
                                                    case "NCHAR":
                                                        o = 3;
                                                        break;
                                                    case "INT":
                                                    case "INTEGER":
                                                    case "TINYINT":
                                                    case "SMALLINT":
                                                    case "MEDIUMINT":
                                                    case "BIGINT":
                                                        o = 4
                                                }
                                                e.blen = n, e.ilen = i, e.t = o, e.sype = l, c.table.j[a[0]].c.push(e), e.pk > 0 && (c.table.j[a[0]].k = 1)
                                            }
                                            break;
                                        case "view":
                                            c.view.j[a[0]] && c.view.j[a[0]].c.push(e)
                                    }
                                }
                            }
                            let a = {};
                            c.table.a.forEach(function(e) {
                                let t = {
                                    text: e.name,
                                    displayText: fAddSpaceText(e.name, c.mlen.tab) + " - TABLE",
                                    columns: []
                                };
                                c.table.j[e.name] && c.table.j[e.name].c && c.table.j[e.name].c.forEach(function(n) {
                                    let i = {
                                        text: n.name,
                                        displayText: fAddSpaceText(n.name, c.mlen.col) + " | " + fAddSpaceText(n.type, c.mlen.tip) + " [" + e.name + "]"
                                    };
                                    t.columns.push(i);
                                    let l = n.name.toString().toLowerCase();
                                    a[l] && a[l].tab && a[l].tab.length > 0 ? a[l].tab.push(e.name.toUpperCase() + ":" + n.type.toLowerCase()) : a[l] = {
                                        tab: [e.name.toUpperCase() + ":" + n.type.toLowerCase()]
                                    }
                                }), m.tables.unshift(t)
                            });
                            for (let e in a) {
                                let t = a[e],
                                    n = "";
                                t && t.tab && t.tab.length > 0 && (n = t.tab.join(", ")), m.column.push({
                                    text: e,
                                    displayText: fAddSpaceText(e, c.mlen.col) + " " + n,
                                    columns: []
                                })
                            }
                            c.view.a.forEach(function(e) {
                                m.column.push({
                                    text: e.name,
                                    displayText: fAddSpaceText(e.name, c.mlen.viw) + " - VIEW",
                                    columns: []
                                })
                            }), c.index.a.forEach(function(e) {
                                c.table.j[e.tbl_name] && c.table.j[e.tbl_name].i.push(e), c.view.j[e.tbl_name] && c.view.j[e.tbl_name].i.push(e), m.column.push({
                                    text: e.name,
                                    displayText: fAddSpaceText(e.name, c.mlen.ind) + " - INDEX: [" + e.tbl_name + "]",
                                    columns: []
                                })
                            }), c.trigger.a.forEach(function(e) {
                                c.table.j[e.tbl_name] && c.table.j[e.tbl_name].t.push(e), c.view.j[e.tbl_name] && c.view.j[e.tbl_name].t.push(e), m.column.push({
                                    text: e.name,
                                    displayText: fAddSpaceText(e.name, c.mlen.tri) + " - TRIGGER: [" + e.tbl_name + "]",
                                    columns: []
                                })
                            })
                        }
                        SQmodMenu.updMenu({
                            n: "sqlite",
                            v: "",
                            m: {
                                t: c.table,
                                v: c.view
                            }
                        }), SQA.funlockbtn()
                    }(t);
                    break;
                case 2:
                    ! function(e) {
                        let t = e.data.results;
                        if (ot.tableclr(), t) {
                            const e = t.length;
                            if (e > 0) {
                                let n = [];
                                for (let a = 0; a < e; a++) n.push({
                                    v: t[a].values,
                                    c: t[a].columns
                                });
                                ot.setDBM(n), db.show()
                            }
                        }
                        l.toLowerCase().indexOf("create ".toLowerCase()) > -1 || l.toLowerCase().indexOf("drop ".toLowerCase()) > -1 || l.toLowerCase().indexOf("alter ".toLowerCase()) > -1 ? S() : SQA.funlockbtn()
                    }(t);
                    break;
                case 3:
                    S();
                    break;
                case 4:
                    let n = t.data.results;
                    n && n.length > 0 && SQmodExport.ExSaveJSON(n[0].values, n[0].columns, r);
                    break;
                case 7:
                    let a = t.data.buffer,
                        d = new Blob([a]);
                    0 == s.length && (s = "sqlite.db"), saveAs(d, s), SQA.funlockbtn(), SQX.sendstat(1);
                    break;
                case 11:
                    ! function(e) {
                        ot.tableclr();
                        let t = e.data.results;
                        try {
                            if (t && t.length > 0) {
                                let e = t[0].values;
                                e.length > 0 && ecm.s(e[0][0])
                            }
                        } catch (e) {
                            toastr.error(e.message, "SQL Schema")
                        }
                        SQA.funlockbtn()
                    }(t);
                    break;
                case 12:
                    ! function(e) {
                        let t = {
                                ab: bytes_to_base64(new Uint8Array(e.data.buffer)),
                                tl: []
                            },
                            n = 0;
                        n++;
                        const a = zzz.g("ntab-sqlite");
                        t.tl.push({
                            id: "tab" + n,
                            name: a ? a.textContent : "Tab " + n,
                            sql: ecm.g("sqlite").getValue()
                        });
                        const i = ecm.l();
                        for (let e in i)
                            if ("sqlite" != e && (n++, ecm.m(e).indexOf("sqlite") > -1)) {
                                const a = zzz.g("ntab-" + e);
                                t.tl.push({
                                    id: "tab" + n,
                                    name: a ? a.textContent : "Tab " + n,
                                    sql: ecm.g(e).getValue()
                                })
                            }
                        let l = {
                            u: o
                        };
                        l.sdt = JSON.stringify(t), l.sdt.length < 1e7 ? SQN.a("/fn/file/setuidn", l, function(e) {
                            if (e.err) toastr.error(e.err, "Cloud");
                            else if (e.uid) {
                                let t = "https://sqliteonline.com/#fiddle=" + e.uid;
                                SQM.mb().innerHTML = '<div style="word-wrap: break-word;"><h3 style="text-align: left"><a href="' + t + '" target="_blank">' + t + "</a></h3></div>"
                            }
                            SQA.funlockbtn()
                        }) : (SQA.funlockbtn(), toastr.error("You have exceeded the allowable limit 7mb!", "Cloud"))
                    }(t);
                    break;
                case 16:
                    E("SELECT * FROM '" + sqlE(SQmodMMal.getDefTableName().n) + "'");
                    break;
                case 17:
                    S()
            }
        },
        getmarr_shema: function() {
            return c
        },
        getmarr_shema_hint: function() {
            return m
        },
        getjtype: function() {
            return e
        },
        getDelColumn: function(e, t) {
            let n = c.table.j[e],
                a = [],
                i = n.p[2].replace(/\s+/g, " ").trim().toLowerCase();
            n.c.forEach(function(e) {
                e.name != t && a.push(e)
            });
            let l = "",
                o = "";
            a.forEach(function(e) {
                let t = l.length > 0 ? ", " : "";
                1 == e.pk ? t += e.name + " " + e.type + " PRIMARY KEY" + (i.indexOf("integer primary key autoincrement") > -1 ? " AUTOINCREMENT" : "") + (1 == e.nnull ? " NOT NULL" : "") + (e.def ? " DEFAULT " + e.def : "") : t += e.name + " " + e.type + (1 == e.nnull ? " NOT NULL" : "") + (e.def ? " DEFAULT " + e.def : ""), l += t, o += (o.length > 0 ? ", " : "") + e.name
            });
            let s = e + "_temp",
                r = 0;
            for (; c.table.j[s];) s = e + "_temp" + ++r;
            let m = "";
            return n.i && n.i.forEach(function(e) {
                m += "\r\n" + e.shema + ";"
            }), n.t && n.t.forEach(function(e) {
                m += "\r\n" + e.shema + ";"
            }), "CREATE TABLE " + s + " (" + l + "); \r\nINSERT INTO " + s + "(" + o + ") SELECT " + o + " FROM " + e + "; \r\nDROP TABLE " + e + "; \r\nALTER TABLE " + s + " RENAME TO " + e + "; " + m
        },
        startDefDB: function() {
            a = 0, i = 0, t.postMessage({
                action: "open"
            }), toastr.error("Open default database", "SQLite")
        }
    }
}();