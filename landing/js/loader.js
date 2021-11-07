(function(d, w, ua) {

	"use strict";

	// Configuration options

	var
		loaderMinTime = 2000, // ms
		loaderAnimTime = 50, // ms between updates
		windowLoaded = false,
		loaderStartTime = 0;

	// Function library
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
			setTimeout(loaderDone, 200);
			document.getElementsByTagName('body')[0].__class = '+loaded';
		} else {
			setTimeout(loaderAnimationFrame, loaderAnimTime);
		}
		loaderStartTime += loaderAnimTime;
	} // loaderAnimationFrame
	
	function loaderDone() {
		loaderDivWrapper.parentNode.removeChild(loaderDivWrapper);
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