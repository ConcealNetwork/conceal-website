(function(d, w, ua) {

	"use strict";

	// Configuration options

	var
		loaderMinTime = 2000, // ms
		loaderAnimTime = 50, // ms between updates
		scroll = {
			acceleration : 1.1,
			startAmt : Math.max(Math.ceil(w.screen.height) / 540, 1),
			max : Math.ceil(w.screen.height / 8)
		}; // scroll

	// Function library

	function arrayRemoveIndex(arr, index) {
		return arr.filter(function(e, i) { return i != index; });
	} // arrayRemoveIndex

	function eventPrevent(e) {
		// IE 10 doesn't know "preventDefault"
		if (e.preventDefault) e.preventDefault();
		// and incorrectly uses "returnValue" instead
		else e.returnValue = false;
	} // eventPrevent

	function hasParentId(e, id) {
		while (
			e = e.parentNode &&
			e != d.body
		) if (e.id == id) return true;
		return false;
	} // hasParentId

	function offsetTop(e) {
		if (e.style.position == 'fixed') return e.offsetTop;
		var result = e.offsetTop;
		while (e = e.offsetParent) result += e.offsetTop;
		return result;
	} // offsetTop

	function scrollData() {
		// cross browser scroll.active info
		var
			sx = w.scrollX || w.pageXOffset || d.body.scrollLeft,
			sy = w.scrollY || w.pageYOffset || d.body.scrollTop;
		return {
			left : sx,
			top : sy,
			maxX : d.body.scrollWidth - w.innerWidth,
			maxY : d.body.scrollHeight - w.innerHeight,
			right : sx + w.innerWidth,
			bottom : sy + w.innerHeight
		};
	} // scrollData

	function make(tagName, attribs) {
		var
			e = d.createElement(tagName),
			appended = false;
		for (var attrName in attribs) {
			var attr = attribs[attrName];
			switch (attrName) {
				case 'events':
					for (var eventName in attr)
						e.addEventListener(eventName, attr[eventName], false);
				break;
				case 'firstIn':
					attr.insertBefore(e, attr.firstChild);
					break;
				case 'lastIn':
					attr.appendChild(e);
					break;
				case 'style':
					for (var styleName in attr) e.style[styleName] = attr[styleName];
					break;
				case 'content':
					e.appendChild('object' == typeof attr ? attr : d.createTextNode(attr));
					break;
				default:
					if (
						('object' == typeof attr) ||
						('function' == typeof attr) ||
						(attr instanceof Array)
					) e[attrName] = attr;
					else e.setAttribute(attrName, attr);
			}
		}
		return e;
	} // make
	
	// System Extensions
	
	if (!Array.includes) Object.defineProperties(Array.prototype, {
		includes : { value : function(s, i) {
			if (this == null || typeof this == 'undefined') throw new TypeError(
				'Variable Null or Undefined'
			);
			if (this.length == 0) return false;
			if (typeof i == "undefined" || (i < 0 && (i += this.length) < 0)) i = 0;
			var t = s != s;
			for (var iLen = this.length; i < iLen; i++)
				if (s == this[i] || (t && this[i] != this[i])) return true;
			return false;
		}}
	});

	Object.defineProperties(Element.prototype, {

		__class : {

			get : function() {
				var className = this.getAttribute('class');
				return className ? className.split(' ') : [];
			}, // Element.__class get

			set : function(values) {
				var classes = this.__class;
				if (!(values instanceof Array)) values = values.trim().split(' ');
				for (var i = 0, idx, newClass; newClass = values[i]; i++) {
					switch (newClass.charAt(0)) {
						case '~':
							newClass = newClass.substr(1);
							if ((idx = classes.indexOf(newClass)) >= 0)
								classes.splice(idx, 1);
							else
								classes.push(newClass);
							break;
						case '-':
							if ((idx = classes.indexOf(newClass.substr(1))) >= 0)
								classes.splice(idx, 1);
							break;
						case '+':
							newClass = newClass.substr(1);
							// YES, drop-through!!!
						default:
							if (!classes.includes(newClass)) classes.push(newClass);
					}
				}
				this.setAttribute('class', classes.join(' '));
			} // Element.__class set

		}, // Element.__class

		__classExists : {
			value : function(className) {
				if (className instanceof Array) {
					for (var i = 0, cName; cName = className[i]; i++) {
						if (this.__classExists(cName)) return true;
					}
					return false;
				}
				return RegExp('(\\s|^)' + className + '(\\s|$)').test(this.className);
			}
		} // Element.__className

	}); // Element.prototype.defineProperties


	// Internal Variables

	var
		ua_msie = ua.match(/MSIE ([0-9\.]+)/i),
		ua_edge = ua.match(/Edge\/([0-9\.]+)/i),
		ua_rv = ua.match(/rv:([0-9\.]+)/i),
		ua_ie = ua_msie ? ua_msie[1] : (/Trident/i.test(ua) ? ua_rv[1] : false),
		originalTitle = document.title,
		top = d.getElementById('top'),
		header = d.querySelector('#top header'),
		animScript = make('script', { 
			src : '/static/animSelectors.js?1',
			events : { 'load' : initAnims },
			lastIn : d.body
		}),
		scrollTargets = [],
		ch = make('div', { style : { 'height' : '1em' }, lastIn : d.body}),
		emSize = ch.offsetHeight,
		emScale = emSize / 16,
		windowLoaded = false,
		loaderStartTime = 0;

	// remove scale check and adjust any values
	d.body.removeChild(ch);

	// create loading animation
    document.getElementsByTagName("BODY")[0].style.visibility = "visible";
	var loaderDivWrapper = document.getElementById('loader-wrapper');
 	var	animSheet = make('style', {
			content : '\
				#loader-wrapper,\
				#loader-wrapper * {\
					margin:0;\
					padding:0;\
					box-sizing:border-box;\
				}\
				#loader-wrapper,\
				#loader-wrapper span,\
				#loader-wrapper b,\
				#loader-wrapper i,\
				#loader-wrapper i:after {\
					position:absolute;\
					top:0;\
					left:0;\
					width:100%;\
					height:100%;\
				}\
				#loader-wrapper {\
					position:fixed;\
					z-index:9999;\
					display:flex;\
					flex-direction:row;\
					flex-wrap:wrap;\
					background:#000;\
				}\
				#loader-wrapper i:after,\
				#loader-wrapper b {\
					background:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAwIDIwMDAiPjxkZWZzPjxzdHlsZT5wb2x5Z29ue2ZpbGw6Izg4ODt9cG9seWdvbjpudGgtY2hpbGQoM24rMSl7ZmlsbDojNjY2O31wb2x5Z29uOm50aC1jaGlsZCgzbisyKXtmaWxsOiM5OTk7fXBvbHlnb246bGFzdC1jaGlsZHtmaWxsOiM3Nzc7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5DTiBHcmF5IFNvbGlkPC90aXRsZT48cG9seWdvbiBwb2ludHM9Ijk4NCAxNTU4LjQxIDk4NCAxNjc4LjYyIDY5Ny43MSAxNTY0LjExIDY2NS43MSAxNTUxLjMxIDU0NS40NSAxNTAzLjIgNTQ1LjQ1IDUzNS4yIDYwOC44OSA1NjguNzkgNjQwLjI2IDU4NS40IDY2NS43MSA1OTguODggNjY1LjcxIDE0MzEuMTYgNjc0LjcgMTQzNC43NiA2OTcuNzEgMTQ0My45NSA4MTguMTggMTQ5Mi4xMyA5ODQgMTU1OC40MSIvPjxwb2x5Z29uIHBvaW50cz0iMTQ1NC41NSAxMzgzLjA5IDE0NTQuNTUgMTUwMy4yIDEyNDYuMzMgMTU4Ni40OCAxMDE2IDE2NzguNjIgMTAxNiAxNTU4LjQxIDEyNDYuMzMgMTQ2Ni4zNCAxNDU0LjU1IDEzODMuMDkiLz48cG9seWdvbiBwb2ludHM9IjE0NTQuNTUgNTAzLjE5IDEzNTYuNyA1NTUuMDEgMTM0MS4zIDU2My4xNyAxMzI1LjMgNTcxLjY0IDEzMDkuMyA1NjUuMjUgMTAwMCA0NDEuNTggODE4LjE4IDUxNC4yNyA2OTcuNzEgNTYyLjQ1IDY3NC43IDU3MS42NCA2NjUuNzEgNTY2Ljg4IDY0My4zIDU1NS4wMSA1NDUuNDcgNTAzLjIgNTQ1LjQ1IDUwMy4xOSA2NjUuNzEgNDU1LjEgNjk3LjcxIDQ0Mi4zIDEwMDAgMzIxLjM4IDEzMDkuMyA0NDUuMSAxMzQxLjMgNDU3Ljg5IDE0NTQuNTUgNTAzLjE5Ii8+PHBvbHlnb24gcG9pbnRzPSI5ODQgNDgwLjMgOTg0IDYwMC41OCA4MzguODggNjU4LjYgODE4LjE4IDY2Ni44OCA4MTguMTggMTMyNi43NyA4MDQuNDUgMTMzNC4wNCA3MDYuNjIgMTM4NS44NiA2OTcuNzEgMTM5MC41NyA2OTcuNzEgNTk0Ljc1IDcwOS40NiA1OTAuMDUgODE4LjE4IDU0Ni41OSA5ODQgNDgwLjMiLz48cG9seWdvbiBwb2ludHM9IjE0NTQuNTUgNTM1LjIgMTQ1NC41NSA2NTUuNjMgMTM0MS4zIDcxNS42MSAxMzQxLjMgNTk1LjE3IDEzNTkuNzQgNTg1LjQgMTM5MS4xMSA1NjguNzkgMTQ1NC41NSA1MzUuMiIvPjxwb2x5Z29uIHBvaW50cz0iMTQxOS43OSAxMzY0LjY3IDEyNDYuMzMgMTQzNC4wMyAxMDAwIDE1MzIuNTEgODE4LjE4IDE0NTkuODIgNzA5LjQ2IDE0MTYuMzUgNzQxLjA0IDEzOTkuNjMgODE4LjE4IDEzNTguNzcgODM4Ljg4IDEzNDcuODEgMTAwMCAxNDEyLjI5IDEyNDYuMzMgMTMxMy43MiAxMjkwLjM1IDEyOTYuMTMgMTI5MC4zNiAxMjk2LjEzIDEzODguMTggMTM0Ny45MyAxNDE5Ljc5IDEzNjQuNjciLz48cG9seWdvbiBwb2ludHM9IjEzMDkuMyA1OTcuNTUgMTMwOS4zIDcxNy44NSAxMTk1LjU1IDY3Mi4zNyAxMTYxLjEyIDY1OC42IDEwMTYgNjAwLjU4IDEwMTYgNDgwLjMgMTI5MC41NCA1OTAuMDUgMTMwOS4zIDU5Ny41NSIvPjwvc3ZnPg==") center center no-repeat;\
					background-size:auto 100%;\
					opacity:0.15;\
				}\
				#loader-wrapper i:after {\
					content:"";\
				}\
				#loader-wrapper i {\
					background-color:rgba(255,175,0,0.6);\
					backface-visibility:hidden;\
					transition:transform 0s;\
					transform:rotateY(0deg);\
					transform-origin:50% 50%;\
					border:1px solid #850;\
					transform-style:preserve-3d;\
				}\
				#loader-wrapper.loaded {\
					transition:all 1s;\
					transform:scale(2);\
					opacity:0;\
					background:transparent;\
				}\
			',
			lastIn : d.head
		});

	function loaderTransitionEnd(e) {
		e.currentTarget.setAttribute('data-transitionActive', '0');
	} // loaderTransitionEnd

	function loaderAnimationFrame() {
		if (windowLoaded && (loaderStartTime > loaderMinTime)) {
			setTimeout(loaderDone, 1100);
			setTimeout(scrollTestAnimated, 500);
			document.getElementsByTagName('body')[0].__class = '+loaded';
		} else {
			setTimeout(loaderAnimationFrame, loaderAnimTime);
		}
		loaderStartTime += loaderAnimTime;
	} // loaderAnimationFrame

	/*
		Smooth Scroll
	*/

	function scrollAnimation() {
		// our actual animation loop
		var
			sp = scrollData(),
			destY = Math.min(
				offsetTop(scroll.to),
				sp.maxY
			);
		if (sp.top < destY) {
			if ((sp.top += scroll.amt) > destY) sp.top = destY;
		} else if (sp.top > destY) {
			if ((sp.top -= scroll.amt) < destY) sp.top = destY;
		}
		if (scroll.amt < scroll.max) scroll.amt *= scroll.acceleration;
		if (sp.top == destY) {
			scroll.active = false;
			if (scroll.to.id == 'top') history.pushState(
				'',
				d.title,
				w.location.pathname + w.location.search
			); else w.location.hash = '#' + scroll.to.id;
		}
		else scroll.active = w.requestAnimationFrame(scrollAnimation);
		w.scroll(sp.left, sp.top);
	} // scrollAnimation

	function smoothScrollClick(e) {
		var
			lastHash = e.currentTarget.hash,
			target = d.getElementById(lastHash.substr(1));
		if (target) {
			scroll.to = target;
			scroll.amt = scroll.startAmt;
			var h2 = target.querySelector('h2');
			if (h2) document.title = h2.textContent + ' - ' + originalTitle;
			if (
				e.currentTarget.getAttribute('data-isInMenu') &&
				!ua_ie &&
				!ua_edge
			) {
				var sp = scrollData();
				w.location.hash = '';
				w.scroll(sp.left, sp.top);
			}
			if (!scroll.active) scrollAnimation();
		}
		eventPrevent(e);
	} // smoothScrollClick

	function smoothScrollClickTop(e) {
		scroll.to = top;
		scroll.amt = scroll.startAmt;
		if (!scroll.active) scrollAnimation();
		document.title = originalTitle;
		eventPrevent(e);
	} // smoothScrollClickTop

	function modalClose(e) {
		w.history.back();
		eventPrevent(e);
	} // modalClose

	function scrollTestAnimated() {
		var sp = scrollData();
		for (var i = scrollTargets.length - 1, target; target = scrollTargets[i]; i--) {
			var targetTop = offsetTop(target);
			if (target.__classExists('anim_slideInBottom')) targetTop -= (
				target.__classExists('anim_fadeIn') ? 80 : w.screen.height / 2
			);
			if (target.__classExists('anim_slideInTop')) targetTop += (
				target.__classExists('anim_fadeIn') ? 80 : w.screen.height / 2
			);
			var targetBottom = targetTop + target.offsetHeight;
			if (
				sp.bottom > targetTop &&
				sp.top < targetBottom
			) {
				target.__class = '+anim_show';
				scrollTargets = arrayRemoveIndex(scrollTargets, i);
			}
		}
		if (scrollTargets.length == 0) {
			w.removeEventListener('resize', scrollTestAnimated);
			w.removeEventListener('scroll', scrollTestAnimated);
		}
	} // scrollTestAnimated

	for (
		var i = 0, anchors = d.getElementsByTagName('a'), a;
		a = anchors[i];
		i++
	) {
		var
			href = a.getAttribute('href'),
			target;
		if (
			href.charAt(0) == '#' &&
			href != '#' &&
			(target = d.getElementById(a.hash.substr(1))) &&
			target.id != 'menus' &&
			!a.classList.contains('noSmoothScroll') &&
			!a.classList.contains('mainMenuOpen')
		) {
			a.setAttribute('data-isInMenu', hasParentId(a, 'mainMenu'));
			a.addEventListener('click', smoothScrollClick, false);
		} else if (
			a.classList.contains('modalClose') &&
			!ua_ie &&
			!ua_edge
		) {
			a.addEventListener('click', modalClose, false);
		} else if (href == '/') {
			a.addEventListener('click', smoothScrollClickTop, false);
		}
	} // for anchors
	
	function loaderDone() {
		loaderDivWrapper.parentNode.removeChild(loaderDivWrapper);
		w.addEventListener('resize', scrollTestAnimated, false);
		w.addEventListener('scroll', scrollTestAnimated, false);
		/*var langScript = document.createElement('script');
    	langScript.src = 'js/language.js?v9';
    	document.body.appendChild(langScript);*/
	} // loaderDone

	function initAnims() {

		for (var selectors in scrollAnimatedTargets) {
			var
				targets = d.querySelectorAll(selectors),
				newClasses = '+anim ' + scrollAnimatedTargets[selectors].replace(/[+-]/g, '$&anim_');
			scrollTargets = scrollTargets.concat(Array.prototype.slice.call(targets));
			for (var i = 0, target; target = targets[i]; i++) {
				target.__class = newClasses;
				if (target.__classExists([
					'anim_rotateInX',
					'anim_rotateInY',
					'anim_rotateInClockwise',
					'anim_rotateInCounterClockwise',
					'anim_flipInTop',
					'anim_flipInBottom',
					'anim_flipInLeft',
					'anim_flipInright'
				])) target.parentNode.__class = '+anim_perspectiveParent';
			}
		}
		
		w.addEventListener('load', function() { windowLoaded = true; }, false);

	} // initAnims
	
	setTimeout(loaderAnimationFrame, loaderAnimTime);

})(document, window, navigator.userAgent);

$(document).ready(function($) {
	"use strict";
	var siteMenuClone = function() {
		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});
		setTimeout(function() {
			var counter = 0;
			$('.site-mobile-menu .has-children').each(function(){
				var $this = $(this);
				
				$this.prepend('<span class="arrow-collapse collapsed">');
				$this.find('.arrow-collapse').attr({
				'data-toggle' : 'collapse',
				'data-target' : '#collapseItem' + counter,
				});
				$this.find('> ul').attr({
				'class' : 'collapse',
				'id' : 'collapseItem' + counter,
				});
				counter++;
      		});
    	}, 1000);
		$('body').on('click', '.arrow-collapse', function(e) {
			var $this = $(this);
			if ( $this.closest('li').find('.collapse').hasClass('show') ) {
				$this.removeClass('active');
			} else {
				$this.addClass('active');
			}
			e.preventDefault();  
		});
		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();
			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})
		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();
			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 
		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();

});