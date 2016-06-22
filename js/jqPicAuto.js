/**
 * jqPicAutoY 圆形 放大
 * jqPicAutoX 圆形 不放大
 * jqPicAutoR 矩形 放大
 * jqPicAutoZ 矩形 不放大
 * 
 * 
 * jqPicAuto BY zhoupeihuang
 * start 2015.06.18
 * 裁切的图片是圆形 自适应
 * 且鼠标悬浮有方法效果
 * Y------>代表圆形
 * 
 **/
! function(a, b, c) {
	function d(b, c) {
		this.element = b, this.settings = a.extend({}, g, c), this.settings.width = this.settings.width.toString().replace(/px/g, ""), this.settings.height = this.settings.height.toString().replace(/px/g, ""), this.settings.position.top = this.settings.position.top.toString().replace(/px/g, ""), this.settings.position.left = this.settings.position.left.toString().replace(/px/g, ""), this._defaults = g, this._name = e, "string" == typeof c ? "kill" == c.toLowerCase() && this.kill(this.element) : this.init()
	}
	var e = "jqPicAutoY",
		f = {
			outputElems: [],
			inputElems: []
		},
		g = {
			classname: "jqPicAutoY",
			width: 100,
			height: 100,
			position: {
				top: "50%",
				left: "50%"
			},
			source: "src",
			showoncomplete: !0,
			before: function() {},
			after: function() {},
			done: function() {}
		};
	d.prototype = {
		init: function() {
			this.support_css3_attr("backgroundSize") === !1 ? this.nonCss3Supported_method(this.element, this.settings) : this.css3Supported_method(this.element, this.settings)
		},
		kill: function(b) {
			if (a(b).data(e)) {
				if (a(b).prev().data(e) !== e) return console.error("We could not find the element created by jqthumb. It is probably due to one or more element has been added right before the image element after the plugin initialization, or it was removed."), !1;
				var c = [];
				a.each(f.outputElems, function(d, e) {
					a(e)[0] == a(b).prev()[0] || c.push(f.outputElems[d])
				}), f.outputElems = c, c = [], a.each(f.inputElems, function(d, e) {
					a(e)[0] == a(b)[0] || c.push(f.inputElems[d])
				}), f.inputElems = c, a(b).prev().remove(), a(b).removeAttr("style"), "undefined" != typeof a(b).data(e + "-original-styles") && a(b).attr("style", a(b).data(e + "-original-styles")), "undefined" != typeof a(b).data(e + "-original-styles") && a(b).removeData(e + "-original-styles"), "undefined" != typeof a(b).data(e) && a(b).removeData(e)
			}
		},
		nonCss3Supported_method: function(b, c) {
			c.before.call(b, b);
			var d = this,
				f = a(b);
			f.data(e + "-original-styles", f.attr("style")), f.hide();
			var g = a("<img/>");
			g.bind("load", function() {
				var h = {
						obj: g,
						size: {
							width: this.width,
							height: this.height
						}
					},
					i = d.percentOrPixel(c.width),
					j = d.percentOrPixel(c.height),
					k = a("<div />"),
					l = 0;
				a(k).insertBefore(f).append(a(h.obj)).css({
					position: "relative",
					overflow: "hidden",
					width: "%" == i ? c.width : c.width + "px",
					height: "%" == j ? c.height : c.height + "px"
				}).data(e, e), h.size.width > h.size.height ? (a(h.obj).css({
					width: "auto",
					"max-height": 99999999,
					"min-height": 0,
					"max-width": 99999999,
					"min-width": 0,
					height: a(h.obj).parent().height() + "px"
				}), l = a(h.obj).height() / a(h.obj).width(), a(h.obj).width() < a(h.obj).parent().width() && a(h.obj).css({
					width: a(h.obj).parent().width(),
					height: parseFloat(a(h.obj).parent().width() * l)
				})) : (a(h.obj).css({
					width: a(h.obj).parent().width() + "px",
					"max-height": 99999999,
					"min-height": 0,
					"max-width": 99999999,
					"min-width": 0,
					height: "auto"
				}), l = a(h.obj).width() / a(h.obj).height(), a(h.obj).height() < a(h.obj).parent().height() && a(h.obj).css({
					width: parseFloat(a(h.obj).parent().height() * l),
					height: a(h.obj).parent().height()
				})), posTop = "%" == d.percentOrPixel(c.position.top) ? c.position.top : c.position.top + "px", posLeft = "%" == d.percentOrPixel(c.position.left) ? c.position.left : c.position.left + "px", a(h.obj).css({
					position: "absolute",
					top: posTop,
					"margin-top": function() {
						return "%" == d.percentOrPixel(c.position.top) ? "-" + parseFloat(a(h.obj).height() / 100 * c.position.top.slice(0, -1)) + "px" : void 0
					}(),
					left: posLeft,
					"margin-left": function() {
						return "%" == d.percentOrPixel(c.position.left) ? "-" + parseFloat(a(h.obj).width() / 100 * c.position.left.slice(0, -1)) + "px" : void 0
					}()
				}), a(k).hide().addClass(c.classname), c.showoncomplete === !0 && a(k).show(), c.after.call(b, a(k)), d.updateGlobal(b, a(k), c)
			}).attr("src", f.attr(c.source))
		},
		css3Supported_method: function(b, c) {
			c.before.call(b, b);
			var d = this,
				f = a(b),
				g = a("<img />").attr("src", f.attr(c.source));
			f.data(e + "-original-styles", f.attr("style")), f.hide(), a.each(g, function(g, h) {
				var i = a(h);
				i.one("load", function() {
					var g = d.percentOrPixel(c.width),
						h = d.percentOrPixel(c.height),
						i = null,
						j = null;
					i = a("<div/>").css({
						width: "%" == g ? c.width : c.width + "px",
						height: "%" == h ? c.height : c.height + "px",
						display: "none"
					}).addClass(c.classname).data(e, e), j = a("<div/>").css({
						width: "100%",
						height: "100%",
						"border-radius":"100%",
						"margin":"3px auto",
  						"cursor":"pointer",
  						'transition':' All 0.4s ease-in-out',
						'-webkit-transition':' All 0.4s ease-in-out',
						'-moz-transition':' All 0.4s ease-in-out',
						'-o-transition':' All 0.4s ease-in-out',
						"background-image": 'url("' + f.attr(c.source) + '")',
						"background-repeat": "no-repeat",
						"background-position": function() {
							var a = "%" == d.percentOrPixel(c.position.top) ? c.position.top : c.position.top + "px",
								b = "%" == d.percentOrPixel(c.position.left) ? c.position.left : c.position.left + "px";
							return a + " " + b
						}(),
						"background-size": "cover"
					}).hover(function(){
						$(this).css({
						"transform":  'scale(1.2)',
						"-webkit-transform":'scale(1.2)',
						"-moz-transform":'scale(1.2)',
						"-o-transform":'scale(1.2)',
						"-ms-transform":'scale(1.2)'
						})
					},function(){
						 
						$(this).css({
						"transform":  'scale(1)',
						"-webkit-transform":'scale(1)',
						"-moz-transform":'scale(1)',
						"-o-transform":'scale(1)',
						"-ms-transform":'scale(1)'
						})
					 
					}).appendTo(a(i)), a(i).insertBefore(a(b)), c.showoncomplete === !0 && a(i).show(), d.checkSrcAttrName(b, c), c.after.call(b, a(i)), d.updateGlobal(b, a(i), c)
				})
			})
		},
		updateGlobal: function(b, c, d) {
			b.global.outputElems.push(a(c)[0]), b.global.elemCounter++, f.outputElems.push(a(c)[0]), b.global.elemCounter == b.global.inputElems.length && d.done.call(b, b.global.outputElems)
		},
		checkSrcAttrName: function(b, c) {
			"src" == c.source || "undefined" != typeof a(b).attr("src") && "" !== a(b).attr("src") || a(b).attr("src", a(b).attr(c.source))
		},
		percentOrPixel: function(a) {
			return a = a.toString(), a.match("px$") || a.match("PX$") || a.match("pX$") || a.match("Px$") ? "px" : a.match("%$") ? "%" : void 0
		},
		support_css3_attr: function() {
			{
				var a = c.createElement("div"),
					b = "Khtml Ms O Moz Webkit".split(" ");
				b.length
			}
			return function(c) {
				if (c in a.style) return !0;
				for (c = c.replace(/^[a-z]/, function(a) {
					return a.toUpperCase()
				}), i = 0; i < b.length; i++)
					if (b[i] + c in a.style) return !0;
				return !1
			}
		}()
	}, a.fn[e] = function(b) {
		var c = {
			elemCounter: 0,
			outputElems: [],
			inputElems: function(b) {
				for (var c = a(b), d = c.length, e = [], f = 0; d > f; f++) e.push(c.get(f));
				return e
			}(a(this))
		};
		return obj = {}, obj[e] = function(b) {
			return "undefined" == typeof b ? void console.error('Please specify an action like $.jqthumb("killall")') : (b = b.toLowerCase(), void("killall" == b && a.each(f.inputElems, function() {
				new d(this, "kill")
			})))
		}, a.extend(a, obj), this.each(function() {
			var g = a(this);
			this.global = c, f.inputElems.push(g), "string" == typeof b ? new d(this, b) : g.data(e) ? (new d(this, "kill"), g.data(e, new d(this, b))) : g.data(e, new d(this, b))
		})
	}
}(window.jQuery || window.Zepto, window, document);
/**
 * 
 * jqPicAuto BY zhoupeihuang
 * start 2015.06.18
 * 裁切的图片是圆形 自适应
 * 且鼠标悬浮有方法效果
 * X------>代表圆形
 * 
 **/
! function(a, b, c) {
	function d(b, c) {
		this.element = b, this.settings = a.extend({}, g, c), this.settings.width = this.settings.width.toString().replace(/px/g, ""), this.settings.height = this.settings.height.toString().replace(/px/g, ""), this.settings.position.top = this.settings.position.top.toString().replace(/px/g, ""), this.settings.position.left = this.settings.position.left.toString().replace(/px/g, ""), this._defaults = g, this._name = e, "string" == typeof c ? "kill" == c.toLowerCase() && this.kill(this.element) : this.init()
	}
	var e = "jqPicAutoX",
		f = {
			outputElems: [],
			inputElems: []
		},
		g = {
			classname: "jqPicAutoX",
			width: 100,
			height: 100,
			position: {
				top: "50%",
				left: "50%"
			},
			source: "src",
			showoncomplete: !0,
			before: function() {},
			after: function() {},
			done: function() {}
		};
	d.prototype = {
		init: function() {
			this.support_css3_attr("backgroundSize") === !1 ? this.nonCss3Supported_method(this.element, this.settings) : this.css3Supported_method(this.element, this.settings)
		},
		kill: function(b) {
			if (a(b).data(e)) {
				if (a(b).prev().data(e) !== e) return console.error("We could not find the element created by jqthumb. It is probably due to one or more element has been added right before the image element after the plugin initialization, or it was removed."), !1;
				var c = [];
				a.each(f.outputElems, function(d, e) {
					a(e)[0] == a(b).prev()[0] || c.push(f.outputElems[d])
				}), f.outputElems = c, c = [], a.each(f.inputElems, function(d, e) {
					a(e)[0] == a(b)[0] || c.push(f.inputElems[d])
				}), f.inputElems = c, a(b).prev().remove(), a(b).removeAttr("style"), "undefined" != typeof a(b).data(e + "-original-styles") && a(b).attr("style", a(b).data(e + "-original-styles")), "undefined" != typeof a(b).data(e + "-original-styles") && a(b).removeData(e + "-original-styles"), "undefined" != typeof a(b).data(e) && a(b).removeData(e)
			}
		},
		nonCss3Supported_method: function(b, c) {
			c.before.call(b, b);
			var d = this,
				f = a(b);
			f.data(e + "-original-styles", f.attr("style")), f.hide();
			var g = a("<img/>");
			g.bind("load", function() {
				var h = {
						obj: g,
						size: {
							width: this.width,
							height: this.height
						}
					},
					i = d.percentOrPixel(c.width),
					j = d.percentOrPixel(c.height),
					k = a("<div />"),
					l = 0;
				a(k).insertBefore(f).append(a(h.obj)).css({
					position: "relative",
					overflow: "hidden",
					width: "%" == i ? c.width : c.width + "px",
					height: "%" == j ? c.height : c.height + "px"
				}).data(e, e), h.size.width > h.size.height ? (a(h.obj).css({
					width: "auto",
					"max-height": 99999999,
					"min-height": 0,
					"max-width": 99999999,
					"min-width": 0,
					height: a(h.obj).parent().height() + "px"
				}), l = a(h.obj).height() / a(h.obj).width(), a(h.obj).width() < a(h.obj).parent().width() && a(h.obj).css({
					width: a(h.obj).parent().width(),
					height: parseFloat(a(h.obj).parent().width() * l)
				})) : (a(h.obj).css({
					width: a(h.obj).parent().width() + "px",
					"max-height": 99999999,
					"min-height": 0,
					"max-width": 99999999,
					"min-width": 0,
					height: "auto"
				}), l = a(h.obj).width() / a(h.obj).height(), a(h.obj).height() < a(h.obj).parent().height() && a(h.obj).css({
					width: parseFloat(a(h.obj).parent().height() * l),
					height: a(h.obj).parent().height()
				})), posTop = "%" == d.percentOrPixel(c.position.top) ? c.position.top : c.position.top + "px", posLeft = "%" == d.percentOrPixel(c.position.left) ? c.position.left : c.position.left + "px", a(h.obj).css({
					position: "absolute",
					top: posTop,
					"margin-top": function() {
						return "%" == d.percentOrPixel(c.position.top) ? "-" + parseFloat(a(h.obj).height() / 100 * c.position.top.slice(0, -1)) + "px" : void 0
					}(),
					left: posLeft,
					"margin-left": function() {
						return "%" == d.percentOrPixel(c.position.left) ? "-" + parseFloat(a(h.obj).width() / 100 * c.position.left.slice(0, -1)) + "px" : void 0
					}()
				}), a(k).hide().addClass(c.classname), c.showoncomplete === !0 && a(k).show(), c.after.call(b, a(k)), d.updateGlobal(b, a(k), c)
			}).attr("src", f.attr(c.source))
		},
		css3Supported_method: function(b, c) {
			c.before.call(b, b);
			var d = this,
				f = a(b),
				g = a("<img />").attr("src", f.attr(c.source));
			f.data(e + "-original-styles", f.attr("style")), f.hide(), a.each(g, function(g, h) {
				var i = a(h);
				i.one("load", function() {
					var g = d.percentOrPixel(c.width),
						h = d.percentOrPixel(c.height),
						i = null,
						j = null;
					i = a("<div/>").css({
						width: "%" == g ? c.width : c.width + "px",
						height: "%" == h ? c.height : c.height + "px",
						display: "none"
					}).addClass(c.classname).data(e, e), j = a("<div/>").css({
						width: "100%",
						height: "100%",
						"border-radius":"100%",
						"margin":"3px auto",
  						"cursor":"pointer",
  						'transition':' All 0.4s ease-in-out',
						'-webkit-transition':' All 0.4s ease-in-out',
						'-moz-transition':' All 0.4s ease-in-out',
						'-o-transition':' All 0.4s ease-in-out',
						"background-image": 'url("' + f.attr(c.source) + '")',
						"background-repeat": "no-repeat",
						"background-position": function() {
							var a = "%" == d.percentOrPixel(c.position.top) ? c.position.top : c.position.top + "px",
								b = "%" == d.percentOrPixel(c.position.left) ? c.position.left : c.position.left + "px";
							return a + " " + b
						}(),
						"background-size": "cover"
					}).hover(function(){
						$(this).css({
						"transform":  'scale(1)',
						"-webkit-transform":'scale(1)',
						"-moz-transform":'scale(1)',
						"-o-transform":'scale(1)',
						"-ms-transform":'scale(1)'
						})
					},function(){
						 
						$(this).css({
						"transform":  'scale(1)',
						"-webkit-transform":'scale(1)',
						"-moz-transform":'scale(1)',
						"-o-transform":'scale(1)',
						"-ms-transform":'scale(1)'
						})
					 
					}).appendTo(a(i)), a(i).insertBefore(a(b)), c.showoncomplete === !0 && a(i).show(), d.checkSrcAttrName(b, c), c.after.call(b, a(i)), d.updateGlobal(b, a(i), c)
				})
			})
		},
		updateGlobal: function(b, c, d) {
			b.global.outputElems.push(a(c)[0]), b.global.elemCounter++, f.outputElems.push(a(c)[0]), b.global.elemCounter == b.global.inputElems.length && d.done.call(b, b.global.outputElems)
		},
		checkSrcAttrName: function(b, c) {
			"src" == c.source || "undefined" != typeof a(b).attr("src") && "" !== a(b).attr("src") || a(b).attr("src", a(b).attr(c.source))
		},
		percentOrPixel: function(a) {
			return a = a.toString(), a.match("px$") || a.match("PX$") || a.match("pX$") || a.match("Px$") ? "px" : a.match("%$") ? "%" : void 0
		},
		support_css3_attr: function() {
			{
				var a = c.createElement("div"),
					b = "Khtml Ms O Moz Webkit".split(" ");
				b.length
			}
			return function(c) {
				if (c in a.style) return !0;
				for (c = c.replace(/^[a-z]/, function(a) {
					return a.toUpperCase()
				}), i = 0; i < b.length; i++)
					if (b[i] + c in a.style) return !0;
				return !1
			}
		}()
	}, a.fn[e] = function(b) {
		var c = {
			elemCounter: 0,
			outputElems: [],
			inputElems: function(b) {
				for (var c = a(b), d = c.length, e = [], f = 0; d > f; f++) e.push(c.get(f));
				return e
			}(a(this))
		};
		return obj = {}, obj[e] = function(b) {
			return "undefined" == typeof b ? void console.error('Please specify an action like $.jqthumb("killall")') : (b = b.toLowerCase(), void("killall" == b && a.each(f.inputElems, function() {
				new d(this, "kill")
			})))
		}, a.extend(a, obj), this.each(function() {
			var g = a(this);
			this.global = c, f.inputElems.push(g), "string" == typeof b ? new d(this, b) : g.data(e) ? (new d(this, "kill"), g.data(e, new d(this, b))) : g.data(e, new d(this, b))
		})
	}
}(window.jQuery || window.Zepto, window, document);
/**
 * 
 * jqPicAuto BY zhoupeihuang
 * start 2015.06.19
 * 裁切的图片是正方形 自适应
 * R----->矩形
 * 
 **/
;(function ( $, window, document, undefined ) {

    var pluginName  = "jqPicAutoR",
        grandGlobal = { outputElems: [], inputElems: [] },
        defaults    = {
            classname      : 'jqPicAutoR',
            width          : 100,
            height         : 100,
            position       : { top: '50%', left: '50%' },
            source         : 'src',
            showoncomplete : true,
            before         : function(){},
            after          : function(){},
            done           : function(){}
        };


    function Plugin ( element, options ) {// The actual plugin constructor
        this.element                = element;
        this.settings               = $.extend( {}, defaults, options );
        this.settings.width         = this.settings.width.toString().replace(/px/g, '');
        this.settings.height        = this.settings.height.toString().replace(/px/g, '');
        this.settings.position.top  = this.settings.position.top.toString().replace(/px/g, '');
        this.settings.position.left = this.settings.position.left.toString().replace(/px/g, '');
        this._defaults              = defaults;
        this._name                  = pluginName;
        if(typeof options == 'string'){
            if(options.toLowerCase() == 'kill'){
                this.kill(this.element);
            }
        }else{
            this.init();
        }
    }

    Plugin.prototype = {
        init: function () {
            if(this.support_css3_attr('backgroundSize') === false){ // old browsers need to do calculation to perform same output like "background-size: cover"
                this.nonCss3Supported_method(this.element, this.settings);
            }else{ // modern browsers that support CSS3 would be easier
                this.css3Supported_method(this.element, this.settings);
            }
        },

        kill: function(_this){
            if( $(_this).data(pluginName)){

                if($(_this).prev().data(pluginName) !== pluginName){
                    console.error('We could not find the element created by jqPicAuto. It is probably due to one or more element has been added right before the image element after the plugin initialization, or it was removed.');
                    return false;
                }

                /* START: remove output elements */
                var tempArr = [];
                $.each(grandGlobal.outputElems, function(index, obj){
                    if($(obj)[0] == $(_this).prev()[0]){
                    }else{
                        tempArr.push(grandGlobal.outputElems[index]);
                    }
                });
                grandGlobal.outputElems = tempArr;
                /* END: remove output elements */

                /* START: remove input elements */
                tempArr = [];
                $.each(grandGlobal.inputElems, function(index, obj){
                    if($(obj)[0] == $(_this)[0]){
                    }else{
                        tempArr.push(grandGlobal.inputElems[index]);
                    }
                });
                grandGlobal.inputElems = tempArr;
                /* END: remove input elements */

                $(_this).prev().remove();

                $(_this).removeAttr('style'); // first, remove all the styles first
                if(typeof $(_this).data(pluginName + '-original-styles') !== 'undefined'){
                    $(_this).attr('style', $(_this).data(pluginName + '-original-styles')); // then re-store the original styles
                }

                if(typeof $(_this).data(pluginName + '-original-styles') !== 'undefined'){
                    $(_this).removeData(pluginName + '-original-styles'); // remove data that stores the original stylings before the image being rendered
                }

                if(typeof $(_this).data(pluginName) !== 'undefined'){
                    $(_this).removeData(pluginName); // remove data that stored during plugin initialization
                }
            }
        },

        nonCss3Supported_method: function(_this, options){

            options.before.call(_this, _this);

            var that = this,
                $this = $(_this);

            $this.data(pluginName + '-original-styles', $this.attr('style')); // keep original styles into data

            $this.hide();

            var $tempImg = $("<img/>");

            $tempImg.bind('load', function(){
                var newImg = {
                        obj: $tempImg,
                        size: {
                            width: this.width,
                            height: this.height
                        }
                    },
                    pw = that.percentOrPixel(options.width),
                    ph = that.percentOrPixel(options.height),
                    imgContainer = $('<div />'),
                    ratio = 0;

                $(imgContainer)
                    .insertBefore($this)
                    .append($(newImg.obj))
                    .css({
                        'position' : 'relative',
                        'overflow' : 'hidden',
                        'width'    : (pw == '%') ? options.width : options.width + 'px',
                        'height'   : (ph == '%') ? options.height : options.height + 'px'
                    })
                    .data(pluginName, pluginName); // it would be easy to kill later

                if(newImg.size.width > newImg.size.height){ // horizontal

                    $(newImg.obj).css({
                        'width'      : 'auto',
                        'max-height' : 99999999,
                        'min-height' : 0,
                        'max-width'  : 99999999,
                        'min-width'  : 0,
                        'height'     : $(newImg.obj).parent().height() + 'px'
                    });

                    ratio = $(newImg.obj).height() / $(newImg.obj).width(); // get ratio

                    if( $(newImg.obj).width() < $(newImg.obj).parent().width() ){
                        $(newImg.obj).css({
                            'width': $(newImg.obj).parent().width(),
                            'height': parseFloat($(newImg.obj).parent().width() * ratio)
                        });
                    }

                }else{ // vertical

                    $(newImg.obj).css({
                        'width'      : $(newImg.obj).parent().width() + 'px',
                        'max-height' : 99999999,
                        'min-height' : 0,
                        'max-width'  : 99999999,
                        'min-width'  : 0,
                        'height'     : 'auto'
                    });

                    ratio = $(newImg.obj).width() / $(newImg.obj).height(); // get ratio

                    if( $(newImg.obj).height() < $(newImg.obj).parent().height() ){
                        $(newImg.obj).css({
                            'width': parseFloat($(newImg.obj).parent().height() * ratio),
                            'height': $(newImg.obj).parent().height()
                        });
                    }
                }

                posTop = (that.percentOrPixel(options.position.top) == '%') ? options.position.top : options.position.top + 'px';
                posLeft = (that.percentOrPixel(options.position.left) == '%') ? options.position.left : options.position.left + 'px';

                $(newImg.obj).css({
                    'position'    : 'absolute',
                    'top'         : posTop,
                    'margin-top'  : (function(){
                                        if(that.percentOrPixel(options.position.top) == '%'){
                                            return '-' + parseFloat(($(newImg.obj).height() / 100) * options.position.top.slice(0,-1)) + 'px';
                                        }
                                    })(),
                    'left'        : posLeft,
                    'margin-left' : (function(){
                                        if(that.percentOrPixel(options.position.left) == '%'){
                                            return '-' + parseFloat(($(newImg.obj).width() / 100) * options.position.left.slice(0,-1)) + 'px';
                                        }
                                    })()
                });

                $(imgContainer)
                    .hide()
                    .addClass(options.classname);

                if(options.showoncomplete === true){
                    $(imgContainer).show();
                }
                options.after.call(_this, $(imgContainer));

                that.updateGlobal(_this, $(imgContainer), options);

            }).attr("src", $this.attr(options.source)); // for older browsers, must bind events first then set attr later (IE7, IE8)
        },

        css3Supported_method: function (_this, options) {
            options.before.call(_this, _this);

            var that = this,
                $oriImage = $(_this),
                $tempImg = $('<img />').attr('src', $oriImage.attr(options.source));

            $oriImage.data(pluginName + '-original-styles', $oriImage.attr('style')); // keep original styles into data

            $oriImage.hide();

            $.each($tempImg, function(index, obj){
                var $tempImg = $(obj);

                $tempImg.one('load', function() {
                    var pw = that.percentOrPixel(options.width),
                        ph = that.percentOrPixel(options.height),
                        featuredBgImgContainer = null,
                        featuredBgImg = null;

                    featuredBgImgContainer = $('<div/>')
                                                .css({
                                                    'width'   : (pw == '%') ? options.width : options.width + 'px',
                                                    'height'  : (ph == '%') ? options.height : options.height + 'px',
                                                    'display' : 'none'
                                                })
                                                .addClass(options.classname)
                                                .data(pluginName, pluginName); // it would be easy to kill later

                    featuredBgImg = $('<div/>').css({
                        'width'              : '100%',
                        'height'             : '100%',
                        'background-image'   : 'url("' + $oriImage.attr(options.source) + '")',
                        // '-ms-filter'         : '"progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + $oriImage.attr(options.source) + '",sizingMethod="scale")', // this does not work in Zepto
                        'background-repeat'  : 'no-repeat',
                        'background-color': 'white',
                        'background-position': (function(){
                            var posTop = (that.percentOrPixel(options.position.top) == '%') ? options.position.top : options.position.top + 'px',
                                posLeft = (that.percentOrPixel(options.position.left) == '%') ? options.position.left : options.position.left + 'px';
                            return posTop + ' ' + posLeft;
                        })(),
                        'background-size'    : 'contain'
                    })
                    .appendTo($(featuredBgImgContainer));

                    $(featuredBgImgContainer).insertBefore($(_this));

                    if(options.showoncomplete === true){
                        $(featuredBgImgContainer).show();
                    }

                    that.checkSrcAttrName(_this, options);

                    options.after.call(_this, $(featuredBgImgContainer));

                    that.updateGlobal(_this, $(featuredBgImgContainer), options);
                });
            });
        },

        updateGlobal: function(_this, obj, options){
            _this.global.outputElems.push( $(obj)[0] );
            _this.global.elemCounter++;
            grandGlobal.outputElems.push( $(obj)[0] );
            if(_this.global.elemCounter == _this.global.inputElems.length){
                options.done.call(_this, _this.global.outputElems);
            }
        },

        checkSrcAttrName: function(_this, options){
            if(
                options.source != 'src' &&
                (
                    typeof $(_this).attr('src') === 'undefined' ||
                    $(_this).attr('src') === ''
                )
            )
            {
                $(_this).attr('src', $(_this).attr(options.source));
            }
        },

        percentOrPixel: function(str){
            str = str.toString();
            if(str.match("px$") || str.match("PX$") || str.match("pX$") || str.match("Px$")) {
                return 'px';
            }else if(str.match("%$")) {
                return '%';
            }
        },

        support_css3_attr: (function() {
            /* code available at http://net.tutsplus.com/tutorials/html-css-techniques/quick-tip-detect-css-support-in-browsers-with-javascript/ */
            var div = document.createElement('div'),
                vendors = 'Khtml Ms O Moz Webkit'.split(' '),
                len = vendors.length;

            return function(prop) {
                if ( prop in div.style ) return true;

                prop = prop.replace(/^[a-z]/, function(val) {
                    return val.toUpperCase();
                });

                for(i=0; i<vendors.length; i++){
                    if ( vendors[i] + prop in div.style ) {
                        return true;
                    }
                }
                return false;
            };
        })()
    };

    $.fn[ pluginName ] = function ( options ) {

        var global = {
            elemCounter : 0,
            outputElems : [],
            inputElems  : (function(_this){
                                var $this   = $(_this),
                                    total   = $this.length,
                                    tempArr = [];
                                for(var i=0; i<total; i++){
                                    tempArr.push($this.get(i));
                                }
                                return tempArr;
                            })($(this))
        };
        obj = {};
        obj[pluginName] = function(action){
            if(typeof action == 'undefined'){
                console.error('Please specify an action like $.jqPicAuto("killall")');
                return;
            }
            action = action.toLowerCase();
            if(action == 'killall'){
                $.each(grandGlobal.inputElems, function(){
                    new Plugin(this, 'kill');
                });
            }
        };
        $.extend($, obj);

        return this.each(function() {

            var $eachImg = $(this);
            this.global = global;

            grandGlobal.inputElems.push($eachImg);

            if(typeof options == 'string'){
                new Plugin(this, options);
            }else{
                if (!$eachImg.data(pluginName)){
                    $eachImg.data(pluginName, new Plugin( this, options ));
                }else{ // re-rendered without killing it
                    new Plugin(this, 'kill');
                    $eachImg.data(pluginName, new Plugin( this, options ));
                }
            }
        });
    };

})( (window.jQuery || window.Zepto), window, document );

/**
 * 
 * jqPicAuto BY zhoupeihuang
 * start 2015.06.19
 * 裁切的图片是正方形 自适应
 * Z----->矩形
 * 不放大
 * 
 **/
;(function ( $, window, document, undefined ) {

    var pluginName  = "jqPicAutoZ",
        grandGlobal = { outputElems: [], inputElems: [] },
        defaults    = {
            classname      : 'jqPicAutoZ',
            width          : 100,
            height         : 100,
            position       : { top: '50%', left: '50%' },
            source         : 'src',
            showoncomplete : true,
            before         : function(){},
            after          : function(){},
            done           : function(){}
        };


    function Plugin ( element, options ) {// The actual plugin constructor
        this.element                = element;
        this.settings               = $.extend( {}, defaults, options );
        this.settings.width         = this.settings.width.toString().replace(/px/g, '');
        this.settings.height        = this.settings.height.toString().replace(/px/g, '');
        this.settings.position.top  = this.settings.position.top.toString().replace(/px/g, '');
        this.settings.position.left = this.settings.position.left.toString().replace(/px/g, '');
        this._defaults              = defaults;
        this._name                  = pluginName;
        if(typeof options == 'string'){
            if(options.toLowerCase() == 'kill'){
                this.kill(this.element);
            }
        }else{
            this.init();
        }
    }

    Plugin.prototype = {
        init: function () {
            if(this.support_css3_attr('backgroundSize') === false){ // old browsers need to do calculation to perform same output like "background-size: cover"
                this.nonCss3Supported_method(this.element, this.settings);
            }else{ // modern browsers that support CSS3 would be easier
                this.css3Supported_method(this.element, this.settings);
            }
        },

        kill: function(_this){
            if( $(_this).data(pluginName)){

                if($(_this).prev().data(pluginName) !== pluginName){
                    console.error('We could not find the element created by jqPicAuto. It is probably due to one or more element has been added right before the image element after the plugin initialization, or it was removed.');
                    return false;
                }

                /* START: remove output elements */
                var tempArr = [];
                $.each(grandGlobal.outputElems, function(index, obj){
                    if($(obj)[0] == $(_this).prev()[0]){
                    }else{
                        tempArr.push(grandGlobal.outputElems[index]);
                    }
                });
                grandGlobal.outputElems = tempArr;
                /* END: remove output elements */

                /* START: remove input elements */
                tempArr = [];
                $.each(grandGlobal.inputElems, function(index, obj){
                    if($(obj)[0] == $(_this)[0]){
                    }else{
                        tempArr.push(grandGlobal.inputElems[index]);
                    }
                });
                grandGlobal.inputElems = tempArr;
                /* END: remove input elements */

                $(_this).prev().remove();

                $(_this).removeAttr('style'); // first, remove all the styles first
                if(typeof $(_this).data(pluginName + '-original-styles') !== 'undefined'){
                    $(_this).attr('style', $(_this).data(pluginName + '-original-styles')); // then re-store the original styles
                }

                if(typeof $(_this).data(pluginName + '-original-styles') !== 'undefined'){
                    $(_this).removeData(pluginName + '-original-styles'); // remove data that stores the original stylings before the image being rendered
                }

                if(typeof $(_this).data(pluginName) !== 'undefined'){
                    $(_this).removeData(pluginName); // remove data that stored during plugin initialization
                }
            }
        },

        nonCss3Supported_method: function(_this, options){

            options.before.call(_this, _this);

            var that = this,
                $this = $(_this);

            $this.data(pluginName + '-original-styles', $this.attr('style')); // keep original styles into data

            $this.hide();

            var $tempImg = $("<img/>");

            $tempImg.bind('load', function(){
                var newImg = {
                        obj: $tempImg,
                        size: {
                            width: this.width,
                            height: this.height
                        }
                    },
                    pw = that.percentOrPixel(options.width),
                    ph = that.percentOrPixel(options.height),
                    imgContainer = $('<div />'),
                    ratio = 0;

                $(imgContainer)
                    .insertBefore($this)
                    .append($(newImg.obj))
                    .css({
                        'position' : 'relative',
                        'overflow' : 'hidden',
                        'width'    : (pw == '%') ? options.width : options.width + 'px',
                        'height'   : (ph == '%') ? options.height : options.height + 'px'
                    })
                    .data(pluginName, pluginName); // it would be easy to kill later

                if(newImg.size.width > newImg.size.height){ // horizontal

                    $(newImg.obj).css({
                        'width'      : 'auto',
                        'max-height' : 99999999,
                        'min-height' : 0,
                        'max-width'  : 99999999,
                        'min-width'  : 0,
                        'height'     : $(newImg.obj).parent().height() + 'px'
                    });

                    ratio = $(newImg.obj).height() / $(newImg.obj).width(); // get ratio

                    if( $(newImg.obj).width() < $(newImg.obj).parent().width() ){
                        $(newImg.obj).css({
                            'width': $(newImg.obj).parent().width(),
                            'height': parseFloat($(newImg.obj).parent().width() * ratio)
                        });
                    }

                }else{ // vertical

                    $(newImg.obj).css({
                        'width'      : $(newImg.obj).parent().width() + 'px',
                        'max-height' : 99999999,
                        'min-height' : 0,
                        'max-width'  : 99999999,
                        'min-width'  : 0,
                        'height'     : 'auto'
                    });

                    ratio = $(newImg.obj).width() / $(newImg.obj).height(); // get ratio

                    if( $(newImg.obj).height() < $(newImg.obj).parent().height() ){
                        $(newImg.obj).css({
                            'width': parseFloat($(newImg.obj).parent().height() * ratio),
                            'height': $(newImg.obj).parent().height()
                        });
                    }
                }

                posTop = (that.percentOrPixel(options.position.top) == '%') ? options.position.top : options.position.top + 'px';
                posLeft = (that.percentOrPixel(options.position.left) == '%') ? options.position.left : options.position.left + 'px';

                $(newImg.obj).css({
                    'position'    : 'absolute',
                    'top'         : posTop,
                    'margin-top'  : (function(){
                                        if(that.percentOrPixel(options.position.top) == '%'){
                                            return '-' + parseFloat(($(newImg.obj).height() / 100) * options.position.top.slice(0,-1)) + 'px';
                                        }
                                    })(),
                    'left'        : posLeft,
                    'margin-left' : (function(){
                                        if(that.percentOrPixel(options.position.left) == '%'){
                                            return '-' + parseFloat(($(newImg.obj).width() / 100) * options.position.left.slice(0,-1)) + 'px';
                                        }
                                    })()
                });

                $(imgContainer)
                    .hide()
                    .addClass(options.classname);

                if(options.showoncomplete === true){
                    $(imgContainer).show();
                }
                options.after.call(_this, $(imgContainer));

                that.updateGlobal(_this, $(imgContainer), options);

            }).attr("src", $this.attr(options.source)); // for older browsers, must bind events first then set attr later (IE7, IE8)
        },

        css3Supported_method: function (_this, options) {
            options.before.call(_this, _this);

            var that = this,
                $oriImage = $(_this),
                $tempImg = $('<img />').attr('src', $oriImage.attr(options.source));

            $oriImage.data(pluginName + '-original-styles', $oriImage.attr('style')); // keep original styles into data

            $oriImage.hide();

            $.each($tempImg, function(index, obj){
                var $tempImg = $(obj);

                $tempImg.one('load', function() {
                    var pw = that.percentOrPixel(options.width),
                        ph = that.percentOrPixel(options.height),
                        featuredBgImgContainer = null,
                        featuredBgImg = null;

                    featuredBgImgContainer = $('<div/>')
                                                .css({
                                                    'width'   : (pw == '%') ? options.width : options.width + 'px',
                                                    'height'  : (ph == '%') ? options.height : options.height + 'px',
                                                    'display' : 'none'
                                                })
                                                .addClass(options.classname)
                                                .data(pluginName, pluginName); // it would be easy to kill later

                    featuredBgImg = $('<div/>').css({
                        'width'              : '100%',
                        'height'             : '100%',
                        'background-image'   : 'url("' + $oriImage.attr(options.source) + '")',
                        // '-ms-filter'         : '"progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + $oriImage.attr(options.source) + '",sizingMethod="scale")', // this does not work in Zepto
                        'background-repeat'  : 'no-repeat',
                        'background-position': (function(){
                            var posTop = (that.percentOrPixel(options.position.top) == '%') ? options.position.top : options.position.top + 'px',
                                posLeft = (that.percentOrPixel(options.position.left) == '%') ? options.position.left : options.position.left + 'px';
                            return posTop + ' ' + posLeft;
                        })(),
                        'background-size'    : 'cover'
                    })
                    .appendTo($(featuredBgImgContainer));

                    $(featuredBgImgContainer).insertBefore($(_this));

                    if(options.showoncomplete === true){
                        $(featuredBgImgContainer).show();
                    }

                    that.checkSrcAttrName(_this, options);

                    options.after.call(_this, $(featuredBgImgContainer));

                    that.updateGlobal(_this, $(featuredBgImgContainer), options);
                });
            });
        },

        updateGlobal: function(_this, obj, options){
            _this.global.outputElems.push( $(obj)[0] );
            _this.global.elemCounter++;
            grandGlobal.outputElems.push( $(obj)[0] );
            if(_this.global.elemCounter == _this.global.inputElems.length){
                options.done.call(_this, _this.global.outputElems);
            }
        },

        checkSrcAttrName: function(_this, options){
            if(
                options.source != 'src' &&
                (
                    typeof $(_this).attr('src') === 'undefined' ||
                    $(_this).attr('src') === ''
                )
            )
            {
                $(_this).attr('src', $(_this).attr(options.source));
            }
        },

        percentOrPixel: function(str){
            str = str.toString();
            if(str.match("px$") || str.match("PX$") || str.match("pX$") || str.match("Px$")) {
                return 'px';
            }else if(str.match("%$")) {
                return '%';
            }
        },

        support_css3_attr: (function() {
            /* code available at http://net.tutsplus.com/tutorials/html-css-techniques/quick-tip-detect-css-support-in-browsers-with-javascript/ */
            var div = document.createElement('div'),
                vendors = 'Khtml Ms O Moz Webkit'.split(' '),
                len = vendors.length;

            return function(prop) {
                if ( prop in div.style ) return true;

                prop = prop.replace(/^[a-z]/, function(val) {
                    return val.toUpperCase();
                });

                for(i=0; i<vendors.length; i++){
                    if ( vendors[i] + prop in div.style ) {
                        return true;
                    }
                }
                return false;
            };
        })()
    };

    $.fn[ pluginName ] = function ( options ) {

        var global = {
            elemCounter : 0,
            outputElems : [],
            inputElems  : (function(_this){
                                var $this   = $(_this),
                                    total   = $this.length,
                                    tempArr = [];
                                for(var i=0; i<total; i++){
                                    tempArr.push($this.get(i));
                                }
                                return tempArr;
                            })($(this))
        };
        obj = {};
        obj[pluginName] = function(action){
            if(typeof action == 'undefined'){
                console.error('Please specify an action like $.jqPicAuto("killall")');
                return;
            }
            action = action.toLowerCase();
            if(action == 'killall'){
                $.each(grandGlobal.inputElems, function(){
                    new Plugin(this, 'kill');
                });
            }
        };
        $.extend($, obj);

        return this.each(function() {

            var $eachImg = $(this);
            this.global = global;

            grandGlobal.inputElems.push($eachImg);

            if(typeof options == 'string'){
                new Plugin(this, options);
            }else{
                if (!$eachImg.data(pluginName)){
                    $eachImg.data(pluginName, new Plugin( this, options ));
                }else{ // re-rendered without killing it
                    new Plugin(this, 'kill');
                    $eachImg.data(pluginName, new Plugin( this, options ));
                }
            }
        });
    };

})( (window.jQuery || window.Zepto), window, document );