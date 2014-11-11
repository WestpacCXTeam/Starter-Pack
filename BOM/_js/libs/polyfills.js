/*!
 * selectivizr v1.0.2 - (c) Keith Clark, freely distributable under the terms of the MIT license.
 * selectivizr.com
 *
 * Used to pollyfill the selectors for IE
 */

(function(j){function A(a){return a.replace(B,h).replace(C,function(a,d,b){for(var a=b.split(","),b=0,e=a.length;b<e;b++){var s=D(a[b].replace(E,h).replace(F,h))+o,l=[];a[b]=s.replace(G,function(a,b,c,d,e){if(b){if(l.length>0){var a=l,f,e=s.substring(0,e).replace(H,i);if(e==i||e.charAt(e.length-1)==o)e+="*";try{f=t(e)}catch(k){}if(f){e=0;for(c=f.length;e<c;e++){for(var d=f[e],h=d.className,j=0,m=a.length;j<m;j++){var g=a[j];if(!RegExp("(^|\\s)"+g.className+"(\\s|$)").test(d.className)&&g.b&&(g.b===!0||g.b(d)===!0))h=u(h,g.className,!0)}d.className=h}}l=[]}return b}else{if(b=c?I(c):!v||v.test(d)?{className:w(d),b:!0}:null)return l.push(b),"."+b.className;return a}})}return d+a.join(",")})}function I(a){var c=!0,d=w(a.slice(1)),b=a.substring(0,5)==":not(",e,f;b&&(a=a.slice(5,-1));var l=a.indexOf("(");l>-1&&(a=a.substring(0,l));if(a.charAt(0)==":")switch(a.slice(1)){case "root":c=function(a){return b?a!=p:a==p};break;case "target":if(m==8){c=function(a){function c(){var d=location.hash,e=d.slice(1);return b?d==i||a.id!=e:d!=i&&a.id==e}k(j,"hashchange",function(){g(a,d,c())});return c()};break}return!1;case "checked":c=function(a){J.test(a.type)&&k(a,"propertychange",function(){event.propertyName=="checked"&&g(a,d,a.checked!==b)});return a.checked!==b};break;case "disabled":b=!b;case "enabled":c=function(c){if(K.test(c.tagName))return k(c,"propertychange",function(){event.propertyName=="$disabled"&&g(c,d,c.a===b)}),q.push(c),c.a=c.disabled,c.disabled===b;return a==":enabled"?b:!b};break;case "focus":e="focus",f="blur";case "hover":e||(e="mouseenter",f="mouseleave");c=function(a){k(a,b?f:e,function(){g(a,d,!0)});k(a,b?e:f,function(){g(a,d,!1)});return b};break;default:if(!L.test(a))return!1}return{className:d,b:c}}function w(a){return M+"-"+(m==6&&N?O++:a.replace(P,function(a){return a.charCodeAt(0)}))}function D(a){return a.replace(x,h).replace(Q,o)}function g(a,c,d){var b=a.className,c=u(b,c,d);if(c!=b)a.className=c,a.parentNode.className+=i}function u(a,c,d){var b=RegExp("(^|\\s)"+c+"(\\s|$)"),e=b.test(a);return d?e?a:a+o+c:e?a.replace(b,h).replace(x,h):a}function k(a,c,d){a.attachEvent("on"+c,d)}function r(a,c){if(/^https?:\/\//i.test(a))return c.substring(0,c.indexOf("/",8))==a.substring(0,a.indexOf("/",8))?a:null;if(a.charAt(0)=="/")return c.substring(0,c.indexOf("/",8))+a;var d=c.split(/[?#]/)[0];a.charAt(0)!="?"&&d.charAt(d.length-1)!="/"&&(d=d.substring(0,d.lastIndexOf("/")+1));return d+a}function y(a){if(a)return n.open("GET",a,!1),n.send(),(n.status==200?n.responseText:i).replace(R,i).replace(S,function(c,d,b,e,f){return y(r(b||f,a))}).replace(T,function(c,d,b){d=d||i;return" url("+d+r(b,a)+d+") "});return i}function U(){var a,c;a=f.getElementsByTagName("BASE");for(var d=a.length>0?a[0].href:f.location.href,b=0;b<f.styleSheets.length;b++)if(c=f.styleSheets[b],c.href!=i&&(a=r(c.href,d)))c.cssText=A(y(a));q.length>0&&setInterval(function(){for(var a=0,c=q.length;a<c;a++){var b=q[a];if(b.disabled!==b.a)b.disabled?(b.disabled=!1,b.a=!0,b.disabled=!0):b.a=b.disabled}},250)}if(!/*@cc_on!@*/true){var f=document,p=f.documentElement,n=function(){if(j.XMLHttpRequest)return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(a){return null}}(),m=/MSIE (\d+)/.exec(navigator.userAgent)[1];if(!(f.compatMode!="CSS1Compat"||m<6||m>8||!n)){var z={NW:"*.Dom.select",MooTools:"$$",DOMAssistant:"*.$",Prototype:"$$",YAHOO:"*.util.Selector.query",Sizzle:"*",jQuery:"*",dojo:"*.query"},t,q=[],O=0,N=!0,M="slvzr",R=/(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)\s*/g,S=/@import\s*(?:(?:(?:url\(\s*(['"]?)(.*)\1)\s*\))|(?:(['"])(.*)\3))[^;]*;/g,T=/\burl\(\s*(["']?)(?!data:)([^"')]+)\1\s*\)/g,L=/^:(empty|(first|last|only|nth(-last)?)-(child|of-type))$/,B=/:(:first-(?:line|letter))/g,C=/(^|})\s*([^\{]*?[\[:][^{]+)/g,G=/([ +~>])|(:[a-z-]+(?:\(.*?\)+)?)|(\[.*?\])/g,H=/(:not\()?:(hover|enabled|disabled|focus|checked|target|active|visited|first-line|first-letter)\)?/g,P=/[^\w-]/g,K=/^(INPUT|SELECT|TEXTAREA|BUTTON)$/,J=/^(checkbox|radio)$/,v=m>6?/[\$\^*]=(['"])\1/:null,E=/([(\[+~])\s+/g,F=/\s+([)\]+~])/g,Q=/\s+/g,x=/^\s*((?:[\S\s]*\S)?)\s*$/,i="",o=" ",h="$1";(function(a,c){function d(){try{p.doScroll("left")}catch(a){setTimeout(d,50);return}b("poll")}function b(d){if(!(d.type=="readystatechange"&&f.readyState!="complete")&&((d.type=="load"?a:f).detachEvent("on"+d.type,b,!1),!e&&(e=!0)))c.call(a,d.type||d)}var e=!1,g=!0;if(f.readyState=="complete")c.call(a,i);else{if(f.createEventObject&&p.doScroll){try{g=!a.frameElement}catch(h){}g&&d()}k(f,"readystatechange",b);k(a,"load",b)}})(j,function(){for(var a in z){var c,d,b=j;if(j[a]){for(c=z[a].replace("*",a).split(".");(d=c.shift())&&(b=b[d]););if(typeof b=="function"){t=b;U();break}}}})}}})(this);

//checked / uncheck plugin used as an IE polyfill
(function( $ ) {
    $.fn.checked = function(value) {
            if (!value.is(':checked')) {
                value.prop('checked',true);
            } else if (value.is(':checked')) {
                value.prop('checked',false);
            }
        return this;
    };
})( jQuery );


$(function() {
    //1.find all of the labels that have a input after them,
    //2.  bind a click event to the label
    //3. add the checked property tto the input.
    $('label').each(function( index ) {
        if ($(this).prev().attr('type') === 'checkbox' || $(this).prev().attr('type') === 'radio') {
            $(this).click(function() {
                $.fn.checked($(this).prev());
            });
        }
    });
});


/* Placeholders.js v3.0.2 */
(function(t){"use strict";function e(t,e,r){return t.addEventListener?t.addEventListener(e,r,!1):t.attachEvent?t.attachEvent("on"+e,r):void 0}function r(t,e){var r,n;for(r=0,n=t.length;n>r;r++)if(t[r]===e)return!0;return!1}function n(t,e){var r;t.createTextRange?(r=t.createTextRange(),r.move("character",e),r.select()):t.selectionStart&&(t.focus(),t.setSelectionRange(e,e))}function a(t,e){try{return t.type=e,!0}catch(r){return!1}}t.Placeholders={Utils:{addEventListener:e,inArray:r,moveCaret:n,changeType:a}}})(this),function(t){"use strict";function e(){}function r(){try{return document.activeElement}catch(t){}}function n(t,e){var r,n,a=!!e&&t.value!==e,u=t.value===t.getAttribute(V);return(a||u)&&"true"===t.getAttribute(D)?(t.removeAttribute(D),t.value=t.value.replace(t.getAttribute(V),""),t.className=t.className.replace(R,""),n=t.getAttribute(F),parseInt(n,10)>=0&&(t.setAttribute("maxLength",n),t.removeAttribute(F)),r=t.getAttribute(P),r&&(t.type=r),!0):!1}function a(t){var e,r,n=t.getAttribute(V);return""===t.value&&n?(t.setAttribute(D,"true"),t.value=n,t.className+=" "+I,r=t.getAttribute(F),r||(t.setAttribute(F,t.maxLength),t.removeAttribute("maxLength")),e=t.getAttribute(P),e?t.type="text":"password"===t.type&&M.changeType(t,"text")&&t.setAttribute(P,"password"),!0):!1}function u(t,e){var r,n,a,u,i,l,o;if(t&&t.getAttribute(V))e(t);else for(a=t?t.getElementsByTagName("input"):b,u=t?t.getElementsByTagName("textarea"):f,r=a?a.length:0,n=u?u.length:0,o=0,l=r+n;l>o;o++)i=r>o?a[o]:u[o-r],e(i)}function i(t){u(t,n)}function l(t){u(t,a)}function o(t){return function(){m&&t.value===t.getAttribute(V)&&"true"===t.getAttribute(D)?M.moveCaret(t,0):n(t)}}function c(t){return function(){a(t)}}function s(t){return function(e){return A=t.value,"true"===t.getAttribute(D)&&A===t.getAttribute(V)&&M.inArray(C,e.keyCode)?(e.preventDefault&&e.preventDefault(),!1):void 0}}function d(t){return function(){n(t,A),""===t.value&&(t.blur(),M.moveCaret(t,0))}}function g(t){return function(){t===r()&&t.value===t.getAttribute(V)&&"true"===t.getAttribute(D)&&M.moveCaret(t,0)}}function v(t){return function(){i(t)}}function p(t){t.form&&(T=t.form,"string"==typeof T&&(T=document.getElementById(T)),T.getAttribute(U)||(M.addEventListener(T,"submit",v(T)),T.setAttribute(U,"true"))),M.addEventListener(t,"focus",o(t)),M.addEventListener(t,"blur",c(t)),m&&(M.addEventListener(t,"keydown",s(t)),M.addEventListener(t,"keyup",d(t)),M.addEventListener(t,"click",g(t))),t.setAttribute(j,"true"),t.setAttribute(V,x),(m||t!==r())&&a(t)}var b,f,m,h,A,y,E,x,L,T,N,S,w,B=["text","search","url","tel","email","password","number","textarea"],C=[27,33,34,35,36,37,38,39,40,8,46],k="#ccc",I="placeholdersjs",R=RegExp("(?:^|\\s)"+I+"(?!\\S)"),V="data-placeholder-value",D="data-placeholder-active",P="data-placeholder-type",U="data-placeholder-submit",j="data-placeholder-bound",q="data-placeholder-focus",z="data-placeholder-live",F="data-placeholder-maxlength",G=document.createElement("input"),H=document.getElementsByTagName("head")[0],J=document.documentElement,K=t.Placeholders,M=K.Utils;if(K.nativeSupport=void 0!==G.placeholder,!K.nativeSupport){for(b=document.getElementsByTagName("input"),f=document.getElementsByTagName("textarea"),m="false"===J.getAttribute(q),h="false"!==J.getAttribute(z),y=document.createElement("style"),y.type="text/css",E=document.createTextNode("."+I+" { color:"+k+"; }"),y.styleSheet?y.styleSheet.cssText=E.nodeValue:y.appendChild(E),H.insertBefore(y,H.firstChild),w=0,S=b.length+f.length;S>w;w++)N=b.length>w?b[w]:f[w-b.length],x=N.attributes.placeholder,x&&(x=x.nodeValue,x&&M.inArray(B,N.type)&&p(N));L=setInterval(function(){for(w=0,S=b.length+f.length;S>w;w++)N=b.length>w?b[w]:f[w-b.length],x=N.attributes.placeholder,x?(x=x.nodeValue,x&&M.inArray(B,N.type)&&(N.getAttribute(j)||p(N),(x!==N.getAttribute(V)||"password"===N.type&&!N.getAttribute(P))&&("password"===N.type&&!N.getAttribute(P)&&M.changeType(N,"text")&&N.setAttribute(P,"password"),N.value===N.getAttribute(V)&&(N.value=x),N.setAttribute(V,x)))):N.getAttribute(D)&&(n(N),N.removeAttribute(V));h||clearInterval(L)},100)}M.addEventListener(t,"beforeunload",function(){K.disable()}),K.disable=K.nativeSupport?e:i,K.enable=K.nativeSupport?e:l}(this);



/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referring to this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'westpac-icons\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-loading-48': '&#x4dc0;',
		'icon-loading-47': '&#x4dc1;',
		'icon-loading-46': '&#x4dc2;',
		'icon-loading-45': '&#x4dc3;',
		'icon-loading-44': '&#x4dc4;',
		'icon-loading-43': '&#x4dc5;',
		'icon-loading-42': '&#x4dc6;',
		'icon-loading-41': '&#x4dc7;',
		'icon-loading-40': '&#x4dc8;',
		'icon-loading-39': '&#x4dc9;',
		'icon-loading-38': '&#x4dca;',
		'icon-loading-37': '&#x4dcb;',
		'icon-loading-36': '&#x4dcc;',
		'icon-loading-35': '&#x4dcd;',
		'icon-loading-34': '&#x4dce;',
		'icon-loading-33': '&#x4dcf;',
		'icon-loading-32': '&#x4dd0;',
		'icon-loading-31': '&#x4dd1;',
		'icon-loading-30': '&#x4dd2;',
		'icon-loading-29': '&#x4dd3;',
		'icon-loading-28': '&#x4dd4;',
		'icon-loading-27': '&#x4dd5;',
		'icon-loading-26': '&#x4dd6;',
		'icon-loading-25': '&#x4dd7;',
		'icon-loading-24': '&#x4dd8;',
		'icon-loading-23': '&#x4dd9;',
		'icon-loading-22': '&#x4dda;',
		'icon-loading-21': '&#x4ddb;',
		'icon-loading-20': '&#x4ddc;',
		'icon-loading-19': '&#x4ddd;',
		'icon-loading-18': '&#x4dde;',
		'icon-loading-17': '&#x4ddf;',
		'icon-loading-16': '&#x4de0;',
		'icon-loading-15': '&#x4de1;',
		'icon-loading-14': '&#x4de2;',
		'icon-loading-13': '&#x4de3;',
		'icon-loading-12': '&#x4de4;',
		'icon-loading-11': '&#x4de5;',
		'icon-loading-10': '&#x4de6;',
		'icon-loading-9': '&#x4de7;',
		'icon-loading-8': '&#x4de8;',
		'icon-loading-7': '&#x4de9;',
		'icon-loading-6': '&#x4dea;',
		'icon-loading-5': '&#x4deb;',
		'icon-loading-4': '&#x4dec;',
		'icon-loading-3': '&#x4ded;',
		'icon-loading-2': '&#x4dee;',
		'icon-loading-1': '&#x4def;',
		'icon-progress': '&#xffee;',
		'icon-stopwatch': '&#x2733;',
		'icon-save': '&#xe60b;',
		'icon-person': '&#x270c;',
		'icon-money-out': '&#x2903;',
		'icon-money-in': '&#x2902;',
		'icon-backspace': '&#x2946;',
		'icon-upload': '&#x2b06;',
		'icon-sign-out': '&#x238b;',
		'icon-shop': '&#xe60c;',
		'icon-refresh': '&#x27f3;',
		'icon-office': '&#xe61a;',
		'icon-key': '&#xe61b;',
		'icon-id-card': '&#xe61c;',
		'icon-download': '&#x2b07;',
		'icon-contacts': '&#xe61f;',
		'icon-business-person': '&#xe620;',
		'icon-zip-file': '&#xe600;',
		'icon-word-file': '&#xe601;',
		'icon-windows-old': '&#xe602;',
		'icon-windows-new': '&#xe604;',
		'icon-twitter': '&#xe605;',
		'icon-switch': '&#xe606;',
		'icon-sms': '&#xe607;',
		'icon-share': '&#x27a6;',
		'icon-rss': '&#xe609;',
		'icon-pdf-file': '&#xe60a;',
		'icon-move-to': '&#x21b3;',
		'icon-move-from': '&#x21b5;',
		'icon-logo-westpac': '&#xe60f;',
		'icon-linkedin': '&#xe610;',
		'icon-invest': '&#xe611;',
		'icon-house-b': '&#xe612;',
		'icon-generic-file': '&#xe613;',
		'icon-facebook': '&#xe614;',
		'icon-excel-file': '&#xe615;',
		'icon-download-file': '&#x21a7;',
		'icon-credit-card': '&#xe617;',
		'icon-apple': '&#xf8ff;',
		'icon-android': '&#xe619;',
		'icon-accessibility': '&#x29e8;',
		'icon-trash': '&#x2612;',
		'icon-transfer': '&#x27a5;',
		'icon-tick': '&#x2713;',
		'icon-tablet': '&#xe603;',
		'icon-star3': '&#x272c;',
		'icon-star2': '&#x2606;',
		'icon-star1': '&#x2605;',
		'icon-shelf-menu': '&#x22ee;',
		'icon-settings': '&#x2731;',
		'icon-service-bell': '&#x2616;',
		'icon-search': '&#x26b2;',
		'icon-print': '&#x2117;',
		'icon-pie-chart': '&#x29b6;',
		'icon-phone': '&#xe60d;',
		'icon-telephone': '&#x260e;',
		'icon-people': '&#x263b;',
		'icon-pause': '&#x29b7;',
		'icon-padlock': '&#x27dc;',
		'icon-new-window': '&#x29c9;',
		'icon-message': '&#x27a3;',
		'icon-map-pin': '&#x2691;',
		'icon-limit': '&#x29b8;',
		'icon-info': '&#x2139;',
		'icon-house-a': '&#x2a5f;',
		'icon-history-clock': '&#x27f2;',
		'icon-help': '&#x2602;',
		'icon-grip-vertical': '&#x2980;',
		'icon-grip-horizontal': '&#x2261;',
		'icon-global': '&#x2708;',
		'icon-file-pdf': '&#xe61d;',
		'icon-face-sad': '&#x2639;',
		'icon-face-hmm': '&#x2687;',
		'icon-face-happy': '&#x263a;',
		'icon-email': '&#x40;',
		'icon-edit': '&#x270e;',
		'icon-dollar': '&#x24;',
		'icon-desktop': '&#x2610;',
		'icon-cube': '&#x2752;',
		'icon-compass': '&#x2734;',
		'icon-chat': '&#x275e;',
		'icon-calendar': '&#x262f;',
		'icon-calculator': '&#x2a38;',
		'icon-bpay': '&#x24b7;',
		'icon-book': '&#x274f;',
		'icon-bar-chart': '&#x2ae2;',
		'icon-australia': '&#x273f;',
		'icon-arrow-a-right': '&#x203a;',
		'icon-arrow-a-left': '&#x2039;',
		'icon-alert': '&#x26a0;',
		'icon-alarm': '&#x2600;',
		'icon-add': '&#x2295;',
		'icon-account': '&#x274d;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
