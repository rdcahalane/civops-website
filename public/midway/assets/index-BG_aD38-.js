var dm=Object.defineProperty;var fm=(r,e,t)=>e in r?dm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Te=(r,e,t)=>fm(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var gu="1.3.25";function af(r,e,t){return Math.max(r,Math.min(e,t))}function pm(r,e,t){return(1-t)*r+t*e}function mm(r,e,t,n){return pm(r,e,1-Math.exp(-t*n))}function gm(r,e){return(r%e+e)%e}var _m=class{constructor(){Te(this,"isRunning",!1);Te(this,"value",0);Te(this,"from",0);Te(this,"to",0);Te(this,"currentTime",0);Te(this,"lerp");Te(this,"duration");Te(this,"easing");Te(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=af(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=mm(this.value,this.to,this.lerp*60,r),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:a}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=a}};function vm(r,e){let t;return function(...n){clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(this,n)},e)}}var xm=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){Te(this,"width",0);Te(this,"height",0);Te(this,"scrollHeight",0);Te(this,"scrollWidth",0);Te(this,"debouncedResize");Te(this,"wrapperResizeObserver");Te(this,"contentResizeObserver");Te(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Te(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Te(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=vm(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},of=class{constructor(){Te(this,"events",{})}emit(r,...e){var n;const t=this.events[r]||[];for(let i=0,s=t.length;i<s;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){return this.events[r]?this.events[r].push(e):this.events[r]=[e],()=>{var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}};const ym=100/6,Xi={passive:!1};function _u(r,e){return r===1?ym:r===2?e:1}var Sm=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){Te(this,"touchStart",{x:0,y:0});Te(this,"lastDelta",{x:0,y:0});Te(this,"window",{width:0,height:0});Te(this,"emitter",new of);Te(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});Te(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});Te(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});Te(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=_u(n,this.window.width),s=_u(n,this.window.height);e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});Te(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Xi),this.element.addEventListener("touchstart",this.onTouchStart,Xi),this.element.addEventListener("touchmove",this.onTouchMove,Xi),this.element.addEventListener("touchend",this.onTouchEnd,Xi)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,Xi),this.element.removeEventListener("touchstart",this.onTouchStart,Xi),this.element.removeEventListener("touchmove",this.onTouchMove,Xi),this.element.removeEventListener("touchend",this.onTouchEnd,Xi)}};const vu=r=>Math.min(1,1.001-2**(-10*r));var Mm=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaExponent:a=1.7,duration:o,easing:l,lerp:c=.1,infinite:h=!1,orientation:f="vertical",gestureOrientation:u=f==="horizontal"?"both":"vertical",touchMultiplier:d=1,wheelMultiplier:g=1,autoResize:_=!0,prevent:p,virtualScroll:m,overscroll:v=!0,autoRaf:x=!1,anchors:M=!1,autoToggle:A=!1,allowNestedScroll:T=!1,__experimental__naiveDimensions:S=!1,naiveDimensions:R=S,stopInertiaOnNavigate:I=!1}={}){Te(this,"_isScrolling",!1);Te(this,"_isStopped",!1);Te(this,"_isLocked",!1);Te(this,"_preventNextNativeScrollEvent",!1);Te(this,"_resetVelocityTimeout",null);Te(this,"_rafId",null);Te(this,"_isDraggingSelection",!1);Te(this,"isTouching");Te(this,"isIos");Te(this,"time",0);Te(this,"userData",{});Te(this,"lastVelocity",0);Te(this,"velocity",0);Te(this,"direction",0);Te(this,"options");Te(this,"targetScroll");Te(this,"animatedScroll");Te(this,"animate",new _m);Te(this,"emitter",new of);Te(this,"dimensions");Te(this,"virtualScroll");Te(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});Te(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Te(this,"onTransitionEnd",r=>{var e;(e=r.propertyName)!=null&&e.includes("overflow")&&r.target===this.rootElement&&this.checkOverflow()});Te(this,"onClick",r=>{const e=r.composedPath().filter(n=>n instanceof HTMLAnchorElement&&n.href).map(n=>new URL(n.href)),t=new URL(window.location.href);if(this.options.anchors){const n=e.find(i=>t.host===i.host&&t.pathname===i.pathname&&i.hash);if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,s=decodeURIComponent(n.hash);this.scrollTo(s,i);return}}if(this.options.stopInertiaOnNavigate&&e.some(n=>t.host===n.host&&t.pathname!==n.pathname)){this.reset();return}});Te(this,"onPointerDown",r=>{r.button===1&&this.reset()});Te(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");if(i&&this.isIos&&(n.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(n)),this._isDraggingSelection)){n.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=n.type==="touchstart"||n.type==="touchmove";const a=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&a&&!this.isStopped&&!this.isLocked){this.reset();return}const o=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(a||o)return;let l=n.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,h=Math.abs(e)>=Math.abs(t)?"horizontal":"vertical";if(l.find(g=>{var _,p,m,v,x;return g instanceof HTMLElement&&(typeof c=="function"&&(c==null?void 0:c(g))||((_=g.hasAttribute)==null?void 0:_.call(g,"data-lenis-prevent"))||h==="vertical"&&((p=g.hasAttribute)==null?void 0:p.call(g,"data-lenis-prevent-vertical"))||h==="horizontal"&&((m=g.hasAttribute)==null?void 0:m.call(g,"data-lenis-prevent-horizontal"))||i&&((v=g.hasAttribute)==null?void 0:v.call(g,"data-lenis-prevent-touch"))||s&&((x=g.hasAttribute)==null?void 0:x.call(g,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.hasNestedScroll(g,{deltaX:e,deltaY:t}))}))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=t;this.options.gestureOrientation==="both"?f=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(f=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();const u=i&&this.options.syncTouch,d=i&&n.type==="touchend";d&&(f=Math.sign(f)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+f,{programmatic:!1,...u?{lerp:d?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Te(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Te(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=gu,window.lenis||(window.lenis={}),window.lenis.version=gu,f==="horizontal"&&(window.lenis.horizontal=!0),i===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!r||r===document.documentElement)&&(r=window),typeof o=="number"&&typeof l!="function"?l=vu:typeof l=="function"&&typeof o!="number"&&(o=1),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaExponent:a,duration:o,easing:l,lerp:c,infinite:h,gestureOrientation:u,orientation:f,touchMultiplier:d,wheelMultiplier:g,autoResize:_,prevent:p,virtualScroll:m,overscroll:v,autoRaf:x,anchors:M,autoToggle:A,allowNestedScroll:T,naiveDimensions:R,stopInertiaOnNavigate:I},this.dimensions=new xm(r,e,{autoResize:_}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new Sm(t,{touchMultiplier:d,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}get overflow(){const r=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[r]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}isTouchOnSelectionHandle(r){const e=window.getSelection();if(!e||e.isCollapsed||e.rangeCount===0)return!1;const t=r.targetTouches[0]??r.changedTouches[0];if(!t)return!1;const n=e.getRangeAt(0).getClientRects();if(n.length===0)return!1;const i=n[0],s=n[n.length-1],a=40,o=Math.hypot(t.clientX-i.left,t.clientY-i.top)<=a,l=Math.hypot(t.clientX-s.right,t.clientY-s.bottom)<=a;return o||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,programmatic:i=!0,lerp:s=i?this.options.lerp:void 0,duration:a=i?this.options.duration:void 0,easing:o=i?this.options.easing:void 0,onStart:l,onComplete:c,force:h=!1,userData:f}={}){if((this.isStopped||this.isLocked)&&!h)return;let u=r,d=e;if(typeof u=="string"&&["top","left","start","#"].includes(u))u=0;else if(typeof u=="string"&&["bottom","right","end"].includes(u))u=this.limit;else{let g=null;if(typeof u=="string"?(g=u.startsWith("#")?document.getElementById(u.slice(1)):document.querySelector(u),g||(u==="#top"?u=0:console.warn("Lenis: Target not found",u))):u instanceof HTMLElement&&(u!=null&&u.nodeType)&&(g=u),g){if(this.options.wrapper!==window){const M=this.rootElement.getBoundingClientRect();d-=this.isHorizontal?M.left:M.top}const _=g.getBoundingClientRect(),p=getComputedStyle(g),m=this.isHorizontal?Number.parseFloat(p.scrollMarginLeft):Number.parseFloat(p.scrollMarginTop),v=getComputedStyle(this.rootElement),x=this.isHorizontal?Number.parseFloat(v.scrollPaddingLeft):Number.parseFloat(v.scrollPaddingTop);u=(this.isHorizontal?_.left:_.top)+this.animatedScroll-(Number.isNaN(m)?0:m)-(Number.isNaN(x)?0:x)}}if(typeof u=="number"){if(u+=d,this.options.infinite){if(i){this.targetScroll=this.animatedScroll=this.scroll;const g=u-this.animatedScroll;g>this.limit/2?u-=this.limit:g<-this.limit/2&&(u+=this.limit)}}else u=af(0,u,this.limit);if(u===this.targetScroll){l==null||l(this),c==null||c(this);return}if(this.userData=f??{},t){this.animatedScroll=this.targetScroll=u,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}i||(this.targetScroll=u),typeof a=="number"&&typeof o!="function"?o=vu:typeof o=="function"&&typeof a!="number"&&(a=1),this.animate.fromTo(this.animatedScroll,u,{duration:a,easing:o,lerp:s,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",l==null||l(this)},onUpdate:(g,_)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=g-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=g,this.setScroll(this.scroll),i&&(this.targetScroll=g),_||this.emit(),_&&(this.reset(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(r,{deltaX:e,deltaY:t}){const n=Date.now();r._lenis||(r._lenis={});const i=r._lenis;let s,a,o,l,c,h,f,u,d,g;if(n-(i.time??0)>2e3){i.time=Date.now();const T=window.getComputedStyle(r);if(i.computedStyle=T,s=["auto","overlay","scroll"].includes(T.overflowX),a=["auto","overlay","scroll"].includes(T.overflowY),c=["auto"].includes(T.overscrollBehaviorX),h=["auto"].includes(T.overscrollBehaviorY),i.hasOverflowX=s,i.hasOverflowY=a,!(s||a))return!1;f=r.scrollWidth,u=r.scrollHeight,d=r.clientWidth,g=r.clientHeight,o=f>d,l=u>g,i.isScrollableX=o,i.isScrollableY=l,i.scrollWidth=f,i.scrollHeight=u,i.clientWidth=d,i.clientHeight=g,i.hasOverscrollBehaviorX=c,i.hasOverscrollBehaviorY=h}else o=i.isScrollableX,l=i.isScrollableY,s=i.hasOverflowX,a=i.hasOverflowY,f=i.scrollWidth,u=i.scrollHeight,d=i.clientWidth,g=i.clientHeight,c=i.hasOverscrollBehaviorX,h=i.hasOverscrollBehaviorY;if(!(s&&o||a&&l))return!1;const _=Math.abs(e)>=Math.abs(t)?"horizontal":"vertical";let p,m,v,x,M,A;if(_==="horizontal")p=Math.round(r.scrollLeft),m=f-d,v=e,x=s,M=o,A=c;else if(_==="vertical")p=Math.round(r.scrollTop),m=u-g,v=t,x=a,M=l,A=h;else return!1;return!A&&(p>=m||p<=0)?!0:(v>0?p<m:p>0)&&x&&M}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?gm(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(r=>{this.rootElement.classList.add(r)})}cleanUpClassName(){for(const r of Array.from(this.rootElement.classList))(r==="lenis"||r.startsWith("lenis-"))&&this.rootElement.classList.remove(r)}};function Pi(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function lf(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Hn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ea={duration:.5,overwrite:!1,delay:0},Ch,Qt,wt,Zn=1e8,xt=1/Zn,pc=Math.PI*2,bm=pc/4,Em=0,cf=Math.sqrt,Tm=Math.cos,wm=Math.sin,Zt=function(e){return typeof e=="string"},Dt=function(e){return typeof e=="function"},zi=function(e){return typeof e=="number"},Ph=function(e){return typeof e>"u"},bi=function(e){return typeof e=="object"},Mn=function(e){return e!==!1},Dh=function(){return typeof window<"u"},Ga=function(e){return Dt(e)||Zt(e)},hf=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},on=Array.isArray,Am=/random\([^)]+\)/g,Rm=/,\s*/g,xu=/(?:-?\.?\d|\.)+/gi,uf=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,xs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Ml=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,df=/[+-]=-?[.\d]+/,Cm=/[^,'"\[\]\s]+/gi,Pm=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Rt,fi,mc,Lh,Gn={},Xo={},ff,pf=function(e){return(Xo=Is(e,Gn))&&Rn},Ih=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Ta=function(e,t){return!t&&console.warn(e)},mf=function(e,t){return e&&(Gn[e]=t)&&Xo&&(Xo[e]=t)||Gn},wa=function(){return 0},Dm={suppressEvents:!0,isStart:!0,kill:!1},Ro={suppressEvents:!0,kill:!1},Lm={suppressEvents:!0},Uh={},ar=[],gc={},gf,Nn={},bl={},yu=30,Co=[],Nh="",Oh=function(e){var t=e[0],n,i;if(bi(t)||Dt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=Co.length;i--&&!Co[i].targetTest(t););n=Co[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new kf(e[i],n)))||e.splice(i,1);return e},Br=function(e){return e._gsap||Oh(jn(e))[0]._gsap},_f=function(e,t,n){return(n=e[t])&&Dt(n)?e[t]():Ph(n)&&e.getAttribute&&e.getAttribute(t)||n},bn=function(e,t){return(e=e.split(",")).forEach(t)||e},Ot=function(e){return Math.round(e*1e5)/1e5||0},At=function(e){return Math.round(e*1e7)/1e7||0},bs=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},Im=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Yo=function(){var e=ar.length,t=ar.slice(0),n,i;for(gc={},ar.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Fh=function(e){return!!(e._initted||e._startAt||e.add)},vf=function(e,t,n,i){ar.length&&!Qt&&Yo(),e.render(t,n,!!(Qt&&t<0&&Fh(e))),ar.length&&!Qt&&Yo()},xf=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Cm).length<2?t:Zt(e)?e.trim():e},yf=function(e){return e},Vn=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Um=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},Is=function(e,t){for(var n in t)e[n]=t[n];return e},Su=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=bi(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},qo=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},da=function(e){var t=e.parent||Rt,n=e.keyframes?Um(on(e.keyframes)):Vn;if(Mn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},Nm=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},Sf=function(e,t,n,i,s){var a=e[i],o;if(s)for(o=t[s];a&&a[s]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=a,t.parent=t._dp=e,t},hl=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,a=t._next;s?s._next=a:e[n]===t&&(e[n]=a),a?a._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},dr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},zr=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Om=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},_c=function(e,t,n,i){return e._startAt&&(Qt?e._startAt.revert(Ro):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},Fm=function r(e){return!e||e._ts&&r(e.parent)},Mu=function(e){return e._repeat?Us(e._tTime,e=e.duration()+e._rDelay)*e:0},Us=function(e,t){var n=Math.floor(e=At(e/t));return e&&n===e?n-1:n},$o=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},ul=function(e){return e._end=At(e._start+(e._tDur/Math.abs(e._ts||e._rts||xt)||0))},dl=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=At(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),ul(e),n._dirty||zr(n,e)),e},Mf=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=$o(e.rawTime(),t),(!t._dur||Na(0,t.totalDuration(),n)-t._tTime>xt)&&t.render(n,!0)),zr(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-xt}},_i=function(e,t,n,i){return t.parent&&dr(t),t._start=At((zi(n)?n:n||e!==Rt?Yn(e,n,t):e._time)+t._delay),t._end=At(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Sf(e,t,"_first","_last",e._sort?"_start":0),vc(t)||(e._recent=t),i||Mf(e,t),e._ts<0&&dl(e,e._tTime),e},bf=function(e,t){return(Gn.ScrollTrigger||Ih("scrollTrigger",t))&&Gn.ScrollTrigger.create(t,e)},Ef=function(e,t,n,i,s){if(Bh(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!Qt&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&gf!==Fn.frame)return ar.push(e),e._lazy=[s,i],1},km=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},vc=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},Bm=function(e,t,n,i){var s=e.ratio,a=t<0||!t&&(!e._start&&km(e)&&!(!e._initted&&vc(e))||(e._ts<0||e._dp._ts<0)&&!vc(e))?0:1,o=e._rDelay,l=0,c,h,f;if(o&&e._repeat&&(l=Na(0,e._tDur,t),h=Us(l,o),e._yoyo&&h&1&&(a=1-a),h!==Us(e._tTime,o)&&(s=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==s||Qt||i||e._zTime===xt||!t&&e._zTime){if(!e._initted&&Ef(e,t,i,n,l))return;for(f=e._zTime,e._zTime=t||(n?xt:0),n||(n=t&&!f),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=l,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&_c(e,t,n,!0),e._onUpdate&&!n&&Bn(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&Bn(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&dr(e,1),!n&&!Qt&&(Bn(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},zm=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Ns=function(e,t,n,i){var s=e._repeat,a=At(t)||0,o=e._tTime/e._tDur;return o&&!i&&(e._time*=a/e._dur),e._dur=a,e._tDur=s?s<0?1e10:At(a*(s+1)+e._rDelay*s):a,o>0&&!i&&dl(e,e._tTime=e._tDur*o),e.parent&&ul(e),n||zr(e.parent,e),e},bu=function(e){return e instanceof Sn?zr(e):Ns(e,e._dur)},Hm={_start:0,endTime:wa,totalDuration:wa},Yn=function r(e,t,n){var i=e.labels,s=e._recent||Hm,a=e.duration()>=Zn?s.endTime(!1):e._dur,o,l,c;return Zt(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(t in i||(i[t]=a),i[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&n&&(l=l/100*(on(n)?n[0]:n).totalDuration()),o>1?r(e,t.substr(0,o-1),n)+l:a+l)):t==null?a:+t},fa=function(e,t,n){var i=zi(t[1]),s=(i?2:1)+(e<2?0:1),a=t[s],o,l;if(i&&(a.duration=t[1]),a.parent=n,e){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=Mn(l.vars.inherit)&&l.parent;a.immediateRender=Mn(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[s-1]}return new Ht(t[0],a,t[s+1])},vr=function(e,t){return e||e===0?t(e):t},Na=function(e,t,n){return n<e?e:n>t?t:n},sn=function(e,t){return!Zt(e)||!(t=Pm.exec(e))?"":t[1]},Gm=function(e,t,n){return vr(n,function(i){return Na(e,t,i)})},xc=[].slice,Tf=function(e,t){return e&&bi(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&bi(e[0]))&&!e.nodeType&&e!==fi},Vm=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return Zt(i)&&!t||Tf(i,1)?(s=n).push.apply(s,jn(i)):n.push(i)})||n},jn=function(e,t,n){return wt&&!t&&wt.selector?wt.selector(e):Zt(e)&&!n&&(mc||!Os())?xc.call((t||Lh).querySelectorAll(e),0):on(e)?Vm(e,n):Tf(e)?xc.call(e,0):e?[e]:[]},yc=function(e){return e=jn(e)[0]||Ta("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return jn(t,n.querySelectorAll?n:n===e?Ta("Invalid scope")||Lh.createElement("div"):e)}},wf=function(e){return e.sort(function(){return .5-Math.random()})},Af=function(e){if(Dt(e))return e;var t=bi(e)?e:{each:e},n=Hr(t.ease),i=t.from||0,s=parseFloat(t.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=t.axis,h=i,f=i;return Zt(i)?h=f={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(h=i[0],f=i[1]),function(u,d,g){var _=(g||t).length,p=a[_],m,v,x,M,A,T,S,R,I;if(!p){if(I=t.grid==="auto"?0:(t.grid||[1,Zn])[1],!I){for(S=-Zn;S<(S=g[I++].getBoundingClientRect().left)&&I<_;);I<_&&I--}for(p=a[_]=[],m=l?Math.min(I,_)*h-.5:i%I,v=I===Zn?0:l?_*f/I-.5:i/I|0,S=0,R=Zn,T=0;T<_;T++)x=T%I-m,M=v-(T/I|0),p[T]=A=c?Math.abs(c==="y"?M:x):cf(x*x+M*M),A>S&&(S=A),A<R&&(R=A);i==="random"&&wf(p),p.max=S-R,p.min=R,p.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(I>_?_-1:c?c==="y"?_/I:I:Math.max(I,_/I))||0)*(i==="edges"?-1:1),p.b=_<0?s-_:s,p.u=sn(t.amount||t.each)||0,n=n&&_<0?ng(n):n}return _=(p[u]-p.min)/p.max||0,At(p.b+(n?n(_):_)*p.v)+p.u}},Sc=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=At(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(zi(n)?0:sn(n))}},Rf=function(e,t){var n=on(e),i,s;return!n&&bi(e)&&(i=n=e.radius||Zn,e.values?(e=jn(e.values),(s=!zi(e[0]))&&(i*=i)):e=Sc(e.increment)),vr(t,n?Dt(e)?function(a){return s=e(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=Zn,h=0,f=e.length,u,d;f--;)s?(u=e[f].x-o,d=e[f].y-l,u=u*u+d*d):u=Math.abs(e[f]-o),u<c&&(c=u,h=f);return h=!i||c<=i?e[h]:a,s||h===a||zi(a)?h:h+sn(a)}:Sc(e))},Cf=function(e,t,n,i){return vr(on(e)?!t:n===!0?!!(n=0):!i,function(){return on(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},Wm=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,a){return a(s)},i)}},Xm=function(e,t){return function(n){return e(parseFloat(n))+(t||sn(n))}},Ym=function(e,t,n){return Df(e,t,0,1,n)},Pf=function(e,t,n){return vr(n,function(i){return e[~~t(i)]})},qm=function r(e,t,n){var i=t-e;return on(e)?Pf(e,r(0,e.length),t):vr(n,function(s){return(i+(s-e)%i)%i+e})},$m=function r(e,t,n){var i=t-e,s=i*2;return on(e)?Pf(e,r(0,e.length-1),t):vr(n,function(a){return a=(s+(a-e)%s)%s||0,e+(a>i?s-a:a)})},Aa=function(e){return e.replace(Am,function(t){var n=t.indexOf("[")+1,i=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(Rm);return Cf(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},Df=function(e,t,n,i,s){var a=t-e,o=i-n;return vr(s,function(l){return n+((l-e)/a*o||0)})},Km=function r(e,t,n,i){var s=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!s){var a=Zt(e),o={},l,c,h,f,u;if(n===!0&&(i=1)&&(n=null),a)e={p:e},t={p:t};else if(on(e)&&!on(t)){for(h=[],f=e.length,u=f-2,c=1;c<f;c++)h.push(r(e[c-1],e[c]));f--,s=function(g){g*=f;var _=Math.min(u,~~g);return h[_](g-_)},n=t}else i||(e=Is(on(e)?[]:{},e));if(!h){for(l in t)kh.call(o,e,l,"get",t[l]);s=function(g){return Gh(g,o)||(a?e.p:e)}}}return vr(n,s)},Eu=function(e,t,n){var i=e.labels,s=Zn,a,o,l;for(a in i)o=i[a]-t,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},Bn=function(e,t,n){var i=e.vars,s=i[t],a=wt,o=e._ctx,l,c,h;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&ar.length&&Yo(),o&&(wt=o),h=l?s.apply(c,l):s.call(c),wt=a,h},ra=function(e){return dr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Qt),e.progress()<1&&Bn(e,"onInterrupt"),e},ys,Lf=[],If=function(e){if(e)if(e=!e.name&&e.default||e,Dh()||e.headless){var t=e.name,n=Dt(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:wa,render:Gh,add:kh,kill:dg,modifier:ug,rawVars:0},a={targetTest:0,get:0,getSetter:Hh,aliases:{},register:0};if(Os(),e!==i){if(Nn[t])return;Vn(i,Vn(qo(e,s),a)),Is(i.prototype,Is(s,qo(e,a))),Nn[i.prop=t]=i,e.targetTest&&(Co.push(i),Uh[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}mf(t,i),e.register&&e.register(Rn,i,En)}else Lf.push(e)},vt=255,sa={aqua:[0,vt,vt],lime:[0,vt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,vt],navy:[0,0,128],white:[vt,vt,vt],olive:[128,128,0],yellow:[vt,vt,0],orange:[vt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[vt,0,0],pink:[vt,192,203],cyan:[0,vt,vt],transparent:[vt,vt,vt,0]},El=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*vt+.5|0},Uf=function(e,t,n){var i=e?zi(e)?[e>>16,e>>8&vt,e&vt]:0:sa.black,s,a,o,l,c,h,f,u,d,g;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),sa[e])i=sa[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+s+s+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&vt,i&vt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&vt,e&vt]}else if(e.substr(0,3)==="hsl"){if(i=g=e.match(xu),!t)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,a=h<=.5?h*(c+1):h+c-h*c,s=h*2-a,i.length>3&&(i[3]*=1),i[0]=El(l+1/3,s,a),i[1]=El(l,s,a),i[2]=El(l-1/3,s,a);else if(~e.indexOf("="))return i=e.match(uf),n&&i.length<4&&(i[3]=1),i}else i=e.match(xu)||sa.transparent;i=i.map(Number)}return t&&!g&&(s=i[0]/vt,a=i[1]/vt,o=i[2]/vt,f=Math.max(s,a,o),u=Math.min(s,a,o),h=(f+u)/2,f===u?l=c=0:(d=f-u,c=h>.5?d/(2-f-u):d/(f+u),l=f===s?(a-o)/d+(a<o?6:0):f===a?(o-s)/d+2:(s-a)/d+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},Nf=function(e){var t=[],n=[],i=-1;return e.split(or).forEach(function(s){var a=s.match(xs)||[];t.push.apply(t,a),n.push(i+=a.length+1)}),t.c=n,t},Tu=function(e,t,n){var i="",s=(e+i).match(or),a=t?"hsla(":"rgba(",o=0,l,c,h,f;if(!s)return e;if(s=s.map(function(u){return(u=Uf(u,t,1))&&a+(t?u[0]+","+u[1]+"%,"+u[2]+"%,"+u[3]:u.join(","))+")"}),n&&(h=Nf(e),l=n.c,l.join(i)!==h.c.join(i)))for(c=e.replace(or,"1").split(xs),f=c.length-1;o<f;o++)i+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(h.length?h:s.length?s:n).shift());if(!c)for(c=e.split(or),f=c.length-1;o<f;o++)i+=c[o]+s[o];return i+c[f]},or=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in sa)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),Zm=/hsl[a]?\(/,Of=function(e){var t=e.join(" "),n;if(or.lastIndex=0,or.test(t))return n=Zm.test(t),e[1]=Tu(e[1],n),e[0]=Tu(e[0],n,Nf(e[1])),!0},Ra,Fn=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,a=s,o=[],l,c,h,f,u,d,g=function _(p){var m=r()-i,v=p===!0,x,M,A,T;if((m>e||m<0)&&(n+=m-t),i+=m,A=i-n,x=A-a,(x>0||v)&&(T=++f.frame,u=A-f.time*1e3,f.time=A=A/1e3,a+=x+(x>=s?4:s-x),M=1),v||(l=c(_)),M)for(d=0;d<o.length;d++)o[d](A,u,T,p)};return f={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(p){return u/(1e3/(p||60))},wake:function(){ff&&(!mc&&Dh()&&(fi=mc=window,Lh=fi.document||{},Gn.gsap=Rn,(fi.gsapVersions||(fi.gsapVersions=[])).push(Rn.version),pf(Xo||fi.GreenSockGlobals||!fi.gsap&&fi||{}),Lf.forEach(If)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=h||function(p){return setTimeout(p,a-f.time*1e3+1|0)},Ra=1,g(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),Ra=0,c=wa},lagSmoothing:function(p,m){e=p||1/0,t=Math.min(m||33,e)},fps:function(p){s=1e3/(p||240),a=f.time*1e3+s},add:function(p,m,v){var x=m?function(M,A,T,S){p(M,A,T,S),f.remove(x)}:p;return f.remove(p),o[v?"unshift":"push"](x),Os(),x},remove:function(p,m){~(m=o.indexOf(p))&&o.splice(m,1)&&d>=m&&d--},_listeners:o},f}(),Os=function(){return!Ra&&Fn.wake()},ot={},jm=/^[\d.\-M][\d.\-,\s]/,Jm=/["']/g,Qm=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),t[i]=isNaN(c)?c.replace(Jm,"").trim():+c,i=l.substr(o+1).trim();return t},eg=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},tg=function(e){var t=(e+"").split("("),n=ot[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[Qm(t[1])]:eg(e).split(",").map(xf)):ot._CE&&jm.test(e)?ot._CE("",e):n},ng=function(e){return function(t){return 1-e(1-t)}},Hr=function(e,t){return e&&(Dt(e)?e:ot[e]||tg(e))||t},jr=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},a;return bn(e,function(o){ot[o]=Gn[o]=s,ot[a=o.toLowerCase()]=n;for(var l in s)ot[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=ot[o+"."+l]=s[l]}),s},Ff=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Tl=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),a=s/pc*(Math.asin(1/i)||0),o=function(h){return h===1?1:i*Math.pow(2,-10*h)*wm((h-a)*s)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:Ff(o);return s=pc/s,l.config=function(c,h){return r(e,c,h)},l},wl=function r(e,t){t===void 0&&(t=1.70158);var n=function(a){return a?--a*a*((t+1)*a+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:Ff(n);return i.config=function(s){return r(e,s)},i};bn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;jr(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});ot.Linear.easeNone=ot.none=ot.Linear.easeIn;jr("Elastic",Tl("in"),Tl("out"),Tl());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(o){return o<t?r*o*o:o<n?r*Math.pow(o-1.5/e,2)+.75:o<i?r*(o-=2.25/e)*o+.9375:r*Math.pow(o-2.625/e,2)+.984375};jr("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);jr("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});jr("Circ",function(r){return-(cf(1-r*r)-1)});jr("Sine",function(r){return r===1?1:-Tm(r*bm)+1});jr("Back",wl("in"),wl("out"),wl());ot.SteppedEase=ot.steps=Gn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,a=1-xt;return function(o){return((i*Na(0,a,o)|0)+s)*n}}};Ea.ease=ot["quad.out"];bn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return Nh+=r+","+r+"Params,"});var kf=function(e,t){this.id=Em++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:_f,this.set=t?t.getSetter:Hh},Ca=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Ns(this,+t.duration,1,1),this.data=t.data,wt&&(this._ctx=wt,wt.data.push(this)),Ra||Fn.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Ns(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Os(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(dl(this,n),!s._dp||s.parent||Mf(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&_i(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===xt||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),vf(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Mu(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Mu(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Us(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-xt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?$o(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-xt?0:this._rts,this.totalTime(Na(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),ul(this),Om(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Os(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==xt&&(this._tTime-=xt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=At(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&_i(i,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Mn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?$o(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=Lm);var i=Qt;return Qt=n,Fh(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Qt=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,bu(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,bu(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(Yn(this,n),Mn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Mn(i)),this._dur||(this._zTime=-xt),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-xt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-xt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-xt)},e.eventCallback=function(n,i,s){var a=this.vars;return arguments.length>1?(i?(a[n]=i,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},e.then=function(n){var i=this,s=i._prom;return new Promise(function(a){var o=Dt(n)?n:yf,l=function(){var h=i.then;i.then=null,s&&s(),Dt(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=h),a(o),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},e.kill=function(){ra(this)},r}();Vn(Ca.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-xt,_prom:0,_ps:!1,_rts:1});var Sn=function(r){lf(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Mn(n.sortChildren),Rt&&_i(n.parent||Rt,Pi(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&bf(Pi(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,a){return fa(0,arguments,this),this},t.from=function(i,s,a){return fa(1,arguments,this),this},t.fromTo=function(i,s,a,o){return fa(2,arguments,this),this},t.set=function(i,s,a){return s.duration=0,s.parent=this,da(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Ht(i,s,Yn(this,a),1),this},t.call=function(i,s,a){return _i(this,Ht.delayedCall(0,i,s),a)},t.staggerTo=function(i,s,a,o,l,c,h){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=h,a.parent=this,new Ht(i,a,Yn(this,l)),this},t.staggerFrom=function(i,s,a,o,l,c,h){return a.runBackwards=1,da(a).immediateRender=Mn(a.immediateRender),this.staggerTo(i,s,a,o,l,c,h)},t.staggerFromTo=function(i,s,a,o,l,c,h,f){return o.startAt=a,da(o).immediateRender=Mn(o.immediateRender),this.staggerTo(i,s,o,l,c,h,f)},t.render=function(i,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:At(i),f=this._zTime<0!=i<0&&(this._initted||!c),u,d,g,_,p,m,v,x,M,A,T,S;if(this!==Rt&&h>l&&i>=0&&(h=l),h!==this._tTime||a||f){if(o!==this._time&&c&&(h+=this._time-o,i+=this._time-o),u=h,M=this._start,x=this._ts,m=!x,f&&(c||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(T=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,s,a);if(u=At(h%p),h===l?(_=this._repeat,u=c):(A=At(h/p),_=~~A,_&&_===A&&(u=c,_--),u>c&&(u=c)),A=Us(this._tTime,p),!o&&this._tTime&&A!==_&&this._tTime-A*p-this._dur<=0&&(A=_),T&&_&1&&(u=c-u,S=1),_!==A&&!this._lock){var R=T&&A&1,I=R===(T&&_&1);if(_<A&&(R=!R),o=R?0:h%c?c:h,this._lock=1,this.render(o||(S?0:At(_*p)),s,!c)._lock=0,this._tTime=h,!s&&this.parent&&Bn(this,"onRepeat"),this.vars.repeatRefresh&&!S&&(this.invalidate()._lock=1,A=_),o&&o!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,I&&(this._lock=2,o=R?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!S&&this.invalidate()),this._lock=0,!this._ts&&!m)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(v=zm(this,At(o),At(u)),v&&(h-=u-(u=v._start))),this._tTime=h,this._time=u,this._act=!!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&h&&c&&!s&&!A&&(Bn(this,"onStart"),this._tTime!==h))return this;if(u>=o&&i>=0)for(d=this._first;d;){if(g=d._next,(d._act||u>=d._start)&&d._ts&&v!==d){if(d.parent!==this)return this.render(i,s,a);if(d.render(d._ts>0?(u-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(u-d._start)*d._ts,s,a),u!==this._time||!this._ts&&!m){v=0,g&&(h+=this._zTime=-xt);break}}d=g}else{d=this._last;for(var y=i<0?i:u;d;){if(g=d._prev,(d._act||y<=d._end)&&d._ts&&v!==d){if(d.parent!==this)return this.render(i,s,a);if(d.render(d._ts>0?(y-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(y-d._start)*d._ts,s,a||Qt&&Fh(d)),u!==this._time||!this._ts&&!m){v=0,g&&(h+=this._zTime=y?-xt:xt);break}}d=g}}if(v&&!s&&(this.pause(),v.render(u>=o?0:-xt)._zTime=u>=o?1:-1,this._ts))return this._start=M,ul(this),this.render(i,s,a);this._onUpdate&&!s&&Bn(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&o)&&(M===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&dr(this,1),!s&&!(i<0&&!o)&&(h||o||!l)&&(Bn(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var a=this;if(zi(s)||(s=Yn(this,s,i)),!(i instanceof Ca)){if(on(i))return i.forEach(function(o){return a.add(o,s)}),this;if(Zt(i))return this.addLabel(i,s);if(Dt(i))i=Ht.delayedCall(0,i);else return this}return this!==i?_i(this,i,s):this},t.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-Zn);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Ht?s&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},t.remove=function(i){return Zt(i)?this.removeLabel(i):Dt(i)?this.killTweensOf(i):(i.parent===this&&hl(this,i),i===this._recent&&(this._recent=this._last),zr(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=At(Fn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=Yn(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,a){var o=Ht.delayedCall(0,s||wa,a);return o.data="isPause",this._hasPause=1,_i(this,o,Yn(this,i))},t.removePause=function(i){var s=this._first;for(i=Yn(this,i);s;)s._start===i&&s.data==="isPause"&&dr(s),s=s._next},t.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)er!==o[l]&&o[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var a=[],o=jn(i),l=this._first,c=zi(s),h;l;)l instanceof Ht?Im(l._targets,o)&&(c?(!er||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(h=l.getTweensOf(o,s)).length&&a.push.apply(a,h),l=l._next;return a},t.tweenTo=function(i,s){s=s||{};var a=this,o=Yn(a,i),l=s,c=l.startAt,h=l.onStart,f=l.onStartParams,u=l.immediateRender,d,g=Ht.to(a,Vn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||xt,onStart:function(){if(a.pause(),!d){var p=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());g._dur!==p&&Ns(g,p,0,1).render(g._time,!0,!0),d=1}h&&h.apply(g,f||[])}},s));return u?g.render(0):g},t.tweenFromTo=function(i,s,a){return this.tweenTo(s,Vn({startAt:{time:Yn(this,i)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Eu(this,Yn(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Eu(this,Yn(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+xt)},t.shiftChildren=function(i,s,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(i=At(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=i);return zr(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),zr(this)},t.totalDuration=function(i){var s=0,a=this,o=a._last,l=Zn,c,h,f;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(f=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,_i(a,o,h-o._delay,1)._lock=0):l=h,h<0&&o._ts&&(s-=h,(!f&&!a._dp||f&&f.smoothChildTiming)&&(a._start+=At(h/a._ts),a._time-=h,a._tTime-=h),a.shiftChildren(-h,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;Ns(a,a===Rt&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(i){if(Rt._ts&&(vf(Rt,$o(i,Rt)),gf=Fn.frame),Fn.frame>=yu){yu+=Hn.autoSleep||120;var s=Rt._first;if((!s||!s._ts)&&Hn.autoSleep&&Fn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Fn.sleep()}}},e}(Ca);Vn(Sn.prototype,{_lock:0,_hasPause:0,_forcing:0});var ig=function(e,t,n,i,s,a,o){var l=new En(this._pt,e,t,0,1,Wf,null,s),c=0,h=0,f,u,d,g,_,p,m,v;for(l.b=n,l.e=i,n+="",i+="",(m=~i.indexOf("random("))&&(i=Aa(i)),a&&(v=[n,i],a(v,e,t),n=v[0],i=v[1]),u=n.match(Ml)||[];f=Ml.exec(i);)g=f[0],_=i.substring(c,f.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),g!==u[h++]&&(p=parseFloat(u[h-1])||0,l._pt={_next:l._pt,p:_||h===1?_:",",s:p,c:g.charAt(1)==="="?bs(p,g)-p:parseFloat(g)-p,m:d&&d<4?Math.round:0},c=Ml.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(df.test(i)||m)&&(l.e=0),this._pt=l,l},kh=function(e,t,n,i,s,a,o,l,c,h){Dt(i)&&(i=i(s||0,e,a));var f=e[t],u=n!=="get"?n:Dt(f)?c?e[t.indexOf("set")||!Dt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():f,d=Dt(f)?c?lg:Gf:zh,g;if(Zt(i)&&(~i.indexOf("random(")&&(i=Aa(i)),i.charAt(1)==="="&&(g=bs(u,i)+(sn(u)||0),(g||g===0)&&(i=g))),!h||u!==i||Mc)return!isNaN(u*i)&&i!==""?(g=new En(this._pt,e,t,+u||0,i-(u||0),typeof f=="boolean"?hg:Vf,0,d),c&&(g.fp=c),o&&g.modifier(o,this,e),this._pt=g):(!f&&!(t in e)&&Ih(t,i),ig.call(this,e,t,u,i,d,l||Hn.stringFilter,c))},rg=function(e,t,n,i,s){if(Dt(e)&&(e=pa(e,s,t,n,i)),!bi(e)||e.style&&e.nodeType||on(e)||hf(e))return Zt(e)?pa(e,s,t,n,i):e;var a={},o;for(o in e)a[o]=pa(e[o],s,t,n,i);return a},Bf=function(e,t,n,i,s,a){var o,l,c,h;if(Nn[e]&&(o=new Nn[e]).init(s,o.rawVars?t[e]:rg(t[e],i,s,a,n),n,i,a)!==!1&&(n._pt=l=new En(n._pt,s,e,0,1,o.render,o,0,o.priority),n!==ys))for(c=n._ptLookup[n._targets.indexOf(s)],h=o._props.length;h--;)c[o._props[h]]=l;return o},er,Mc,Bh=function r(e,t,n){var i=e.vars,s=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,f=i.yoyoEase,u=i.keyframes,d=i.autoRevert,g=e._dur,_=e._startAt,p=e._targets,m=e.parent,v=m&&m.data==="nested"?m.vars.targets:p,x=e._overwrite==="auto"&&!Ch,M=e.timeline,A=i.easeReverse||f,T,S,R,I,y,b,P,U,k,Y,z,G,W;if(M&&(!u||!s)&&(s="none"),e._ease=Hr(s,Ea.ease),e._rEase=A&&(Hr(A)||e._ease),e._from=!M&&!!i.runBackwards,e._from&&(e.ratio=1),!M||u&&!i.stagger){if(U=p[0]?Br(p[0]).harness:0,G=U&&i[U.prop],T=qo(i,Uh),_&&(_._zTime<0&&_.progress(1),t<0&&h&&o&&!d?_.render(-1,!0):_.revert(h&&g?Ro:Dm),_._lazy=0),a){if(dr(e._startAt=Ht.set(p,Vn({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!_&&Mn(l),startAt:null,delay:0,onUpdate:c&&function(){return Bn(e,"onUpdate")},stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Qt||!o&&!d)&&e._startAt.revert(Ro),o&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(h&&g&&!_){if(t&&(o=!1),R=Vn({overwrite:!1,data:"isFromStart",lazy:o&&!_&&Mn(l),immediateRender:o,stagger:0,parent:m},T),G&&(R[U.prop]=G),dr(e._startAt=Ht.set(p,R)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Qt?e._startAt.revert(Ro):e._startAt.render(-1,!0)),e._zTime=t,!o)r(e._startAt,xt,xt);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&Mn(l)||l&&!g,S=0;S<p.length;S++){if(y=p[S],P=y._gsap||Oh(p)[S]._gsap,e._ptLookup[S]=Y={},gc[P.id]&&ar.length&&Yo(),z=v===p?S:v.indexOf(y),U&&(k=new U).init(y,G||T,e,z,v)!==!1&&(e._pt=I=new En(e._pt,y,k.name,0,1,k.render,k,0,k.priority),k._props.forEach(function(re){Y[re]=I}),k.priority&&(b=1)),!U||G)for(R in T)Nn[R]&&(k=Bf(R,T,e,z,y,v))?k.priority&&(b=1):Y[R]=I=kh.call(e,y,R,"get",T[R],z,v,0,i.stringFilter);e._op&&e._op[S]&&e.kill(y,e._op[S]),x&&e._pt&&(er=e,Rt.killTweensOf(y,Y,e.globalTime(t)),W=!e.parent,er=0),e._pt&&l&&(gc[P.id]=1)}b&&Xf(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!W,u&&t<=0&&M.render(Zn,!0,!0)},sg=function(e,t,n,i,s,a,o,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],h,f,u,d;if(!c)for(c=e._ptCache[t]=[],u=e._ptLookup,d=e._targets.length;d--;){if(h=u[d][t],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==t&&h.fp!==t;)h=h._next;if(!h)return Mc=1,e.vars[t]="+=0",Bh(e,o),Mc=0,l?Ta(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(d=c.length;d--;)f=c[d],h=f._pt||f,h.s=(i||i===0)&&!s?i:h.s+(i||0)+a*h.c,h.c=n-h.s,f.e&&(f.e=Ot(n)+sn(f.e)),f.b&&(f.b=h.s+sn(f.b))},ag=function(e,t){var n=e[0]?Br(e[0]).harness:0,i=n&&n.aliases,s,a,o,l;if(!i)return t;s=Is({},t);for(a in i)if(a in s)for(l=i[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},og=function(e,t,n,i){var s=t.ease||i||"power1.inOut",a,o;if(on(t))o=n[e]||(n[e]=[]),t.forEach(function(l,c){return o.push({t:c/(t.length-1)*100,v:l,e:s})});else for(a in t)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:s})},pa=function(e,t,n,i,s){return Dt(e)?e.call(t,n,i,s):Zt(e)&&~e.indexOf("random(")?Aa(e):e},zf=Nh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Hf={};bn(zf+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Hf[r]=1});var Ht=function(r){lf(e,r);function e(n,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=r.call(this,a?i:da(i))||this;var l=o.vars,c=l.duration,h=l.delay,f=l.immediateRender,u=l.stagger,d=l.overwrite,g=l.keyframes,_=l.defaults,p=l.scrollTrigger,m=i.parent||Rt,v=(on(n)||hf(n)?zi(n[0]):"length"in i)?[n]:jn(n),x,M,A,T,S,R,I,y;if(o._targets=v.length?Oh(v):Ta("GSAP target "+n+" not found. https://gsap.com",!Hn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=d,g||u||Ga(c)||Ga(h)){i=o.vars;var b=i.easeReverse||i.yoyoEase;if(x=o.timeline=new Sn({data:"nested",defaults:_||{},targets:m&&m.data==="nested"?m.vars.targets:v}),x.kill(),x.parent=x._dp=Pi(o),x._start=0,u||Ga(c)||Ga(h)){if(T=v.length,I=u&&Af(u),bi(u))for(S in u)~zf.indexOf(S)&&(y||(y={}),y[S]=u[S]);for(M=0;M<T;M++)A=qo(i,Hf),A.stagger=0,b&&(A.easeReverse=b),y&&Is(A,y),R=v[M],A.duration=+pa(c,Pi(o),M,R,v),A.delay=(+pa(h,Pi(o),M,R,v)||0)-o._delay,!u&&T===1&&A.delay&&(o._delay=h=A.delay,o._start+=h,A.delay=0),x.to(R,A,I?I(M,R,v):0),x._ease=ot.none;x.duration()?c=h=0:o.timeline=0}else if(g){da(Vn(x.vars.defaults,{ease:"none"})),x._ease=Hr(g.ease||i.ease||"none");var P=0,U,k,Y;if(on(g))g.forEach(function(z){return x.to(v,z,">")}),x.duration();else{A={};for(S in g)S==="ease"||S==="easeEach"||og(S,g[S],A,g.easeEach);for(S in A)for(U=A[S].sort(function(z,G){return z.t-G.t}),P=0,M=0;M<U.length;M++)k=U[M],Y={ease:k.e,duration:(k.t-(M?U[M-1].t:0))/100*c},Y[S]=k.v,x.to(v,Y,P),P+=Y.duration;x.duration()<c&&x.to({},{duration:c-x.duration()})}}c||o.duration(c=x.duration())}else o.timeline=0;return d===!0&&!Ch&&(er=Pi(o),Rt.killTweensOf(v),er=0),_i(m,Pi(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(f||!c&&!g&&o._start===At(m._time)&&Mn(f)&&Fm(Pi(o))&&m.data!=="nested")&&(o._tTime=-xt,o.render(Math.max(0,-h)||0)),p&&bf(Pi(o),p),o}var t=e.prototype;return t.render=function(i,s,a){var o=this._time,l=this._tDur,c=this._dur,h=i<0,f=i>l-xt&&!h?l:i<xt?0:i,u,d,g,_,p,m,v,x;if(!c)Bm(this,i,s,a);else if(f!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(u=f,x=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(_*100+i,s,a);if(u=At(f%_),f===l?(g=this._repeat,u=c):(p=At(f/_),g=~~p,g&&g===p?(u=c,g--):u>c&&(u=c)),m=this._yoyo&&g&1,m&&(u=c-u),p=Us(this._tTime,_),u===o&&!a&&this._initted&&g===p)return this._tTime=f,this;g!==p&&this.vars.repeatRefresh&&!m&&!this._lock&&u!==_&&this._initted&&(this._lock=a=1,this.render(At(_*g),!0).invalidate()._lock=0)}if(!this._initted){if(Ef(this,h?i:u,a,s,f))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&g!==p))return this;if(c!==this._dur)return this.render(i,s,a)}if(this._rEase){var M=u<o;if(M!==this._inv){var A=M?o:c-o;this._inv=M,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=A?(M?-1:1)/A:0,this._invScale=M?-this.ratio:1-this.ratio,this._invEase=M?this._rEase:this._ease}this.ratio=v=this._invRatio+this._invScale*this._invEase((u-this._invTime)*this._invRecip)}else this.ratio=v=this._ease(u/c);if(this._from&&(this.ratio=v=1-v),this._tTime=f,this._time=u,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&f&&!s&&!p&&(Bn(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(v,d.d),d=d._next;x&&x.render(i<0?i:x._dur*x._ease(u/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(h&&_c(this,i,s,a),Bn(this,"onUpdate")),this._repeat&&g!==p&&this.vars.onRepeat&&!s&&this.parent&&Bn(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(h&&!this._onUpdate&&_c(this,i,!0,!0),(i||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&dr(this,1),!s&&!(h&&!o)&&(f||o||m)&&(Bn(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,a,o,l){Ra||Fn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||Bh(this,c),h=this._ease(c/this._dur),sg(this,i,s,a,o,h,c,l)?this.resetTo(i,s,a,o,1):(dl(this,0),this.parent||Sf(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?ra(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Qt),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,er&&er.vars.overwrite!==!0)._first||ra(this),this.parent&&a!==this.timeline.totalDuration()&&Ns(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?jn(i):o,c=this._ptLookup,h=this._pt,f,u,d,g,_,p,m;if((!s||s==="all")&&Nm(o,l))return s==="all"&&(this._pt=0),ra(this);for(f=this._op=this._op||[],s!=="all"&&(Zt(s)&&(_={},bn(s,function(v){return _[v]=1}),s=_),s=ag(o,s)),m=o.length;m--;)if(~l.indexOf(o[m])){u=c[m],s==="all"?(f[m]=s,g=u,d={}):(d=f[m]=f[m]||{},g=s);for(_ in g)p=u&&u[_],p&&((!("kill"in p.d)||p.d.kill(_)===!0)&&hl(this,p,"_pt"),delete u[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&h&&ra(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return fa(1,arguments)},e.delayedCall=function(i,s,a,o){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(i,s,a){return fa(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,a){return Rt.killTweensOf(i,s,a)},e}(Ca);Vn(Ht.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});bn("staggerTo,staggerFrom,staggerFromTo",function(r){Ht[r]=function(){var e=new Sn,t=xc.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var zh=function(e,t,n){return e[t]=n},Gf=function(e,t,n){return e[t](n)},lg=function(e,t,n,i){return e[t](i.fp,n)},cg=function(e,t,n){return e.setAttribute(t,n)},Hh=function(e,t){return Dt(e[t])?Gf:Ph(e[t])&&e.setAttribute?cg:zh},Vf=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},hg=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Wf=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},Gh=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},ug=function(e,t,n,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(e,t,n),s=a},dg=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?hl(this,t,"_pt"):t.dep||(n=1),t=i;return!n},fg=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},Xf=function(e){for(var t=e._pt,n,i,s,a;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:a)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:a=t,t=n}e._pt=s},En=function(){function r(t,n,i,s,a,o,l,c,h){this.t=n,this.s=s,this.c=a,this.p=i,this.r=o||Vf,this.d=l||this,this.set=c||zh,this.pr=h||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=fg,this.m=n,this.mt=s,this.tween=i},r}();bn(Nh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return Uh[r]=1});Gn.TweenMax=Gn.TweenLite=Ht;Gn.TimelineLite=Gn.TimelineMax=Sn;Rt=new Sn({sortChildren:!1,defaults:Ea,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Hn.stringFilter=Of;var Gr=[],Po={},pg=[],wu=0,mg=0,Al=function(e){return(Po[e]||pg).map(function(t){return t()})},bc=function(){var e=Date.now(),t=[];e-wu>2&&(Al("matchMediaInit"),Gr.forEach(function(n){var i=n.queries,s=n.conditions,a,o,l,c;for(o in i)a=fi.matchMedia(i[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&t.push(n))}),Al("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),wu=e,Al("matchMedia"))},Yf=function(){function r(t,n){this.selector=n&&yc(n),this.data=[],this._r=[],this.isReverted=!1,this.id=mg++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){Dt(n)&&(s=i,i=n,n=Dt);var a=this,o=function(){var c=wt,h=a.selector,f;return c&&c!==a&&c.data.push(a),s&&(a.selector=yc(s)),wt=a,f=i.apply(a,arguments),Dt(f)&&a._r.push(f),wt=c,a.selector=h,a.isReverted=!1,f};return a.last=o,n===Dt?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},e.ignore=function(n){var i=wt;wt=null,n(this),wt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Ht&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return o.splice(o.indexOf(h),1)}));for(o.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,f){return f.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Sn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Ht)&&c.revert&&c.revert(n);s._r.forEach(function(h){return h(n,s)}),s.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var a=Gr.length;a--;)Gr[a].id===this.id&&Gr.splice(a,1)},e.revert=function(n){this.kill(n||{})},r}(),gg=function(){function r(t){this.contexts=[],this.scope=t,wt&&wt.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){bi(n)||(n={matches:n});var a=new Yf(0,s||this.scope),o=a.conditions={},l,c,h;wt&&!a.selector&&(a.selector=wt.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?h=1:(l=fi.matchMedia(n[c]),l&&(Gr.indexOf(a)<0&&Gr.push(a),(o[c]=l.matches)&&(h=1),l.addListener?l.addListener(bc):l.addEventListener("change",bc)));return h&&i(a,function(f){return a.add(null,f)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),Ko={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return If(i)})},timeline:function(e){return new Sn(e)},getTweensOf:function(e,t){return Rt.getTweensOf(e,t)},getProperty:function(e,t,n,i){Zt(e)&&(e=jn(e)[0]);var s=Br(e||{}).get,a=n?yf:xf;return n==="native"&&(n=""),e&&(t?a((Nn[t]&&Nn[t].get||s)(e,t,n,i)):function(o,l,c){return a((Nn[o]&&Nn[o].get||s)(e,o,l,c))})},quickSetter:function(e,t,n){if(e=jn(e),e.length>1){var i=e.map(function(h){return Rn.quickSetter(h,t,n)}),s=i.length;return function(h){for(var f=s;f--;)i[f](h)}}e=e[0]||{};var a=Nn[t],o=Br(e),l=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(h){var f=new a;ys._pt=0,f.init(e,n?h+n:h,ys,0,[e]),f.render(1,f),ys._pt&&Gh(1,ys)}:o.set(e,l);return a?c:function(h){return c(e,l,n?h+n:h,o,1)}},quickTo:function(e,t,n){var i,s=Rn.to(e,Vn((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(l,c,h){return s.resetTo(t,l,c,h)};return a.tween=s,a},isTweening:function(e){return Rt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Hr(e.ease,Ea.ease)),Su(Ea,e||{})},config:function(e){return Su(Hn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,a=e.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!Nn[o]&&!Gn[o]&&Ta(t+" effect requires "+o+" plugin.")}),bl[t]=function(o,l,c){return n(jn(o),Vn(l||{},s),c)},a&&(Sn.prototype[t]=function(o,l,c){return this.add(bl[t](o,bi(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){ot[e]=Hr(t)},parseEase:function(e,t){return arguments.length?Hr(e,t):ot},getById:function(e){return Rt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Sn(e),i,s;for(n.smoothChildTiming=Mn(e.smoothChildTiming),Rt.remove(n),n._dp=0,n._time=n._tTime=Rt._time,i=Rt._first;i;)s=i._next,(t||!(!i._dur&&i instanceof Ht&&i.vars.onComplete===i._targets[0]))&&_i(n,i,i._start-i._delay),i=s;return _i(Rt,n,0),n},context:function(e,t){return e?new Yf(e,t):wt},matchMedia:function(e){return new gg(e)},matchMediaRefresh:function(){return Gr.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||bc()},addEventListener:function(e,t){var n=Po[e]||(Po[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Po[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:qm,wrapYoyo:$m,distribute:Af,random:Cf,snap:Rf,normalize:Ym,getUnit:sn,clamp:Gm,splitColor:Uf,toArray:jn,selector:yc,mapRange:Df,pipe:Wm,unitize:Xm,interpolate:Km,shuffle:wf},install:pf,effects:bl,ticker:Fn,updateRoot:Sn.updateRoot,plugins:Nn,globalTimeline:Rt,core:{PropTween:En,globals:mf,Tween:Ht,Timeline:Sn,Animation:Ca,getCache:Br,_removeLinkedListItem:hl,reverting:function(){return Qt},context:function(e){return e&&wt&&(wt.data.push(e),e._ctx=wt),wt},suppressOverwrites:function(e){return Ch=e}}};bn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Ko[r]=Ht[r]});Fn.add(Sn.updateRoot);ys=Ko.to({},{duration:0});var _g=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},vg=function(e,t){var n=e._targets,i,s,a;for(i in t)for(s=n.length;s--;)a=e._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=_g(a,i)),a&&a.modifier&&a.modifier(t[i],e,n[s],i))},Rl=function(e,t){return{name:e,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var l,c;if(Zt(s)&&(l={},bn(s,function(h){return l[h]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}vg(o,s)}}}},Rn=Ko.registerPlugin({name:"attr",init:function(e,t,n,i,s){var a,o,l;this.tween=n;for(a in t)l=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(l||0)+"",t[a],i,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)Qt?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Rl("roundProps",Sc),Rl("modifiers"),Rl("snap",Rf))||Ko;Ht.version=Sn.version=Rn.version="3.15.0";ff=1;Dh()&&Os();ot.Power0;ot.Power1;ot.Power2;ot.Power3;ot.Power4;ot.Linear;ot.Quad;ot.Cubic;ot.Quart;ot.Quint;ot.Strong;ot.Elastic;ot.Back;ot.SteppedEase;ot.Bounce;ot.Sine;ot.Expo;ot.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Au,tr,Es,Vh,Nr,Ru,Wh,xg=function(){return typeof window<"u"},Hi={},Rr=180/Math.PI,Ts=Math.PI/180,Qr=Math.atan2,Cu=1e8,Xh=/([A-Z])/g,yg=/(left|right|width|margin|padding|x)/i,Sg=/[\s,\(]\S/,xi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Ec=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Mg=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},bg=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Eg=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Tg=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},qf=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},$f=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},wg=function(e,t,n){return e.style[t]=n},Ag=function(e,t,n){return e.style.setProperty(t,n)},Rg=function(e,t,n){return e._gsap[t]=n},Cg=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},Pg=function(e,t,n,i,s){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},Dg=function(e,t,n,i,s){var a=e._gsap;a[t]=n,a.renderTransform(s,a)},Ct="transform",Tn=Ct+"Origin",Lg=function r(e,t){var n=this,i=this.target,s=i.style,a=i._gsap;if(e in Hi&&s){if(this.tfm=this.tfm||{},e!=="transform")e=xi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return n.tfm[o]=Di(i,o)}):this.tfm[e]=a.x?a[e]:Di(i,e),e===Tn&&(this.tfm.zOrigin=a.zOrigin);else return xi.transform.split(",").forEach(function(o){return r.call(n,o,t)});if(this.props.indexOf(Ct)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Tn,t,"")),e=Ct}(s||t)&&this.props.push(e,t,s[e])},Kf=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},Ig=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,a;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Xh,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Wh(),(!s||!s.isStart)&&!n[Ct]&&(Kf(n),i.zOrigin&&n[Tn]&&(n[Tn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Zf=function(e,t){var n={target:e,props:[],revert:Ig,save:Lg};return e._gsap||Rn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},jf,Tc=function(e,t){var n=tr.createElementNS?tr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):tr.createElement(e);return n&&n.style?n:tr.createElement(e)},zn=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(Xh,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,Fs(t)||t,1)||""},Pu="O,Moz,ms,Ms,Webkit".split(","),Fs=function(e,t,n){var i=t||Nr,s=i.style,a=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!(Pu[a]+e in s););return a<0?null:(a===3?"ms":a>=0?Pu[a]:"")+e},wc=function(){xg()&&window.document&&(Au=window,tr=Au.document,Es=tr.documentElement,Nr=Tc("div")||{style:{}},Tc("div"),Ct=Fs(Ct),Tn=Ct+"Origin",Nr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",jf=!!Fs("perspective"),Wh=Rn.core.reverting,Vh=1)},Du=function(e){var t=e.ownerSVGElement,n=Tc("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Es.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Es.removeChild(n),s},Lu=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Jf=function(e){var t,n;try{t=e.getBBox()}catch{t=Du(e),n=1}return t&&(t.width||t.height)||n||(t=Du(e)),t&&!t.width&&!t.x&&!t.y?{x:+Lu(e,["x","cx","x1"])||0,y:+Lu(e,["y","cy","y1"])||0,width:0,height:0}:t},Qf=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Jf(e))},fr=function(e,t){if(t){var n=e.style,i;t in Hi&&t!==Tn&&(t=Ct),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(Xh,"-$1").toLowerCase())):n.removeAttribute(t)}},nr=function(e,t,n,i,s,a){var o=new En(e._pt,t,n,0,1,a?$f:qf);return e._pt=o,o.b=i,o.e=s,e._props.push(n),o},Iu={deg:1,rad:1,turn:1},Ug={grid:1,flex:1},pr=function r(e,t,n,i){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=Nr.style,l=yg.test(t),c=e.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),f=100,u=i==="px",d=i==="%",g,_,p,m;if(i===a||!s||Iu[i]||Iu[a])return s;if(a!=="px"&&!u&&(s=r(e,t,n,"px")),m=e.getCTM&&Qf(e),(d||a==="%")&&(Hi[t]||~t.indexOf("adius")))return g=m?e.getBBox()[l?"width":"height"]:e[h],Ot(d?s/g*f:s/100*g);if(o[l?"width":"height"]=f+(u?a:i),_=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,m&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===tr||!_.appendChild)&&(_=tr.body),p=_._gsap,p&&d&&p.width&&l&&p.time===Fn.time&&!p.uncache)return Ot(s/p.width*f);if(d&&(t==="height"||t==="width")){var v=e.style[t];e.style[t]=f+i,g=e[h],v?e.style[t]=v:fr(e,t)}else(d||a==="%")&&!Ug[zn(_,"display")]&&(o.position=zn(e,"position")),_===e&&(o.position="static"),_.appendChild(Nr),g=Nr[h],_.removeChild(Nr),o.position="absolute";return l&&d&&(p=Br(_),p.time=Fn.time,p.width=_[h]),Ot(u?g*s/f:g&&s?f/g*s:0)},Di=function(e,t,n,i){var s;return Vh||wc(),t in xi&&t!=="transform"&&(t=xi[t],~t.indexOf(",")&&(t=t.split(",")[0])),Hi[t]&&t!=="transform"?(s=Da(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:jo(zn(e,Tn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Zo[t]&&Zo[t](e,t,n)||zn(e,t)||_f(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?pr(e,t,s,n)+n:s},Ng=function(e,t,n,i){if(!n||n==="none"){var s=Fs(t,e,1),a=s&&zn(e,s,1);a&&a!==n?(t=s,n=a):t==="borderColor"&&(n=zn(e,"borderTopColor"))}var o=new En(this._pt,e.style,t,0,1,Wf),l=0,c=0,h,f,u,d,g,_,p,m,v,x,M,A;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=zn(e,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=e.style[t],e.style[t]=i,i=zn(e,t)||i,_?e.style[t]=_:fr(e,t)),h=[n,i],Of(h),n=h[0],i=h[1],u=n.match(xs)||[],A=i.match(xs)||[],A.length){for(;f=xs.exec(i);)p=f[0],v=i.substring(l,f.index),g?g=(g+1)%5:(v.substr(-5)==="rgba("||v.substr(-5)==="hsla(")&&(g=1),p!==(_=u[c++]||"")&&(d=parseFloat(_)||0,M=_.substr((d+"").length),p.charAt(1)==="="&&(p=bs(d,p)+M),m=parseFloat(p),x=p.substr((m+"").length),l=xs.lastIndex-x.length,x||(x=x||Hn.units[t]||M,l===i.length&&(i+=x,o.e+=x)),M!==x&&(d=pr(e,t,_,x)||0),o._pt={_next:o._pt,p:v||c===1?v:",",s:d,c:m-d,m:g&&g<4||t==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=t==="display"&&i==="none"?$f:qf;return df.test(i)&&(o.e=0),this._pt=o,o},Uu={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Og=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=Uu[n]||n,t[1]=Uu[i]||i,t.join(" ")},Fg=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],Hi[o]&&(l=1,o=o==="transformOrigin"?Tn:Ct),fr(n,o);l&&(fr(n,Ct),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Da(n,1),a.uncache=1,Kf(i)))}},Zo={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var a=e._pt=new En(e._pt,t,n,0,0,Fg);return a.u=i,a.pr=-10,a.tween=s,e._props.push(n),1}}},Pa=[1,0,0,1,0,0],ep={},tp=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Nu=function(e){var t=zn(e,Ct);return tp(t)?Pa:t.substr(7).match(uf).map(Ot)},Yh=function(e,t){var n=e._gsap||Br(e),i=e.style,s=Nu(e),a,o,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Pa:s):(s===Pa&&!e.offsetParent&&e!==Es&&!n.svg&&(l=i.display,i.display="block",a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,Es.appendChild(e)),s=Nu(e),l?i.display=l:fr(e,"display"),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):Es.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Ac=function(e,t,n,i,s,a){var o=e._gsap,l=s||Yh(e,!0),c=o.xOrigin||0,h=o.yOrigin||0,f=o.xOffset||0,u=o.yOffset||0,d=l[0],g=l[1],_=l[2],p=l[3],m=l[4],v=l[5],x=t.split(" "),M=parseFloat(x[0])||0,A=parseFloat(x[1])||0,T,S,R,I;n?l!==Pa&&(S=d*p-g*_)&&(R=M*(p/S)+A*(-_/S)+(_*v-p*m)/S,I=M*(-g/S)+A*(d/S)-(d*v-g*m)/S,M=R,A=I):(T=Jf(e),M=T.x+(~x[0].indexOf("%")?M/100*T.width:M),A=T.y+(~(x[1]||x[0]).indexOf("%")?A/100*T.height:A)),i||i!==!1&&o.smooth?(m=M-c,v=A-h,o.xOffset=f+(m*d+v*_)-m,o.yOffset=u+(m*g+v*p)-v):o.xOffset=o.yOffset=0,o.xOrigin=M,o.yOrigin=A,o.smooth=!!i,o.origin=t,o.originIsAbsolute=!!n,e.style[Tn]="0px 0px",a&&(nr(a,o,"xOrigin",c,M),nr(a,o,"yOrigin",h,A),nr(a,o,"xOffset",f,o.xOffset),nr(a,o,"yOffset",u,o.yOffset)),e.setAttribute("data-svg-origin",M+" "+A)},Da=function(e,t){var n=e._gsap||new kf(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(e),c=zn(e,Tn)||"0",h,f,u,d,g,_,p,m,v,x,M,A,T,S,R,I,y,b,P,U,k,Y,z,G,W,re,D,oe,Be,Xe,$,Q;return h=f=u=_=p=m=v=x=M=0,d=g=1,n.svg=!!(e.getCTM&&Qf(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Ct]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ct]!=="none"?l[Ct]:"")),i.scale=i.rotate=i.translate="none"),S=Yh(e,n.svg),n.svg&&(n.uncache?(W=e.getBBox(),c=n.xOrigin-W.x+"px "+(n.yOrigin-W.y)+"px",G=""):G=!t&&e.getAttribute("data-svg-origin"),Ac(e,G||c,!!G||n.originIsAbsolute,n.smooth!==!1,S)),A=n.xOrigin||0,T=n.yOrigin||0,S!==Pa&&(b=S[0],P=S[1],U=S[2],k=S[3],h=Y=S[4],f=z=S[5],S.length===6?(d=Math.sqrt(b*b+P*P),g=Math.sqrt(k*k+U*U),_=b||P?Qr(P,b)*Rr:0,v=U||k?Qr(U,k)*Rr+_:0,v&&(g*=Math.abs(Math.cos(v*Ts))),n.svg&&(h-=A-(A*b+T*U),f-=T-(A*P+T*k))):(Q=S[6],Xe=S[7],D=S[8],oe=S[9],Be=S[10],$=S[11],h=S[12],f=S[13],u=S[14],R=Qr(Q,Be),p=R*Rr,R&&(I=Math.cos(-R),y=Math.sin(-R),G=Y*I+D*y,W=z*I+oe*y,re=Q*I+Be*y,D=Y*-y+D*I,oe=z*-y+oe*I,Be=Q*-y+Be*I,$=Xe*-y+$*I,Y=G,z=W,Q=re),R=Qr(-U,Be),m=R*Rr,R&&(I=Math.cos(-R),y=Math.sin(-R),G=b*I-D*y,W=P*I-oe*y,re=U*I-Be*y,$=k*y+$*I,b=G,P=W,U=re),R=Qr(P,b),_=R*Rr,R&&(I=Math.cos(R),y=Math.sin(R),G=b*I+P*y,W=Y*I+z*y,P=P*I-b*y,z=z*I-Y*y,b=G,Y=W),p&&Math.abs(p)+Math.abs(_)>359.9&&(p=_=0,m=180-m),d=Ot(Math.sqrt(b*b+P*P+U*U)),g=Ot(Math.sqrt(z*z+Q*Q)),R=Qr(Y,z),v=Math.abs(R)>2e-4?R*Rr:0,M=$?1/($<0?-$:$):0),n.svg&&(G=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!tp(zn(e,Ct)),G&&e.setAttribute("transform",G))),Math.abs(v)>90&&Math.abs(v)<270&&(s?(d*=-1,v+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,v+=v<=0?180:-180)),t=t||n.uncache,n.x=h-((n.xPercent=h&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-h)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=f-((n.yPercent=f&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=u+a,n.scaleX=Ot(d),n.scaleY=Ot(g),n.rotation=Ot(_)+o,n.rotationX=Ot(p)+o,n.rotationY=Ot(m)+o,n.skewX=v+o,n.skewY=x+o,n.transformPerspective=M+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[Tn]=jo(c)),n.xOffset=n.yOffset=0,n.force3D=Hn.force3D,n.renderTransform=n.svg?Bg:jf?np:kg,n.uncache=0,n},jo=function(e){return(e=e.split(" "))[0]+" "+e[1]},Cl=function(e,t,n){var i=sn(t);return Ot(parseFloat(t)+parseFloat(pr(e,"x",n+"px",i)))+i},kg=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,np(e,t)},yr="0deg",$s="0px",Sr=") ",np=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,h=n.rotationY,f=n.rotationX,u=n.skewX,d=n.skewY,g=n.scaleX,_=n.scaleY,p=n.transformPerspective,m=n.force3D,v=n.target,x=n.zOrigin,M="",A=m==="auto"&&e&&e!==1||m===!0;if(x&&(f!==yr||h!==yr)){var T=parseFloat(h)*Ts,S=Math.sin(T),R=Math.cos(T),I;T=parseFloat(f)*Ts,I=Math.cos(T),a=Cl(v,a,S*I*-x),o=Cl(v,o,-Math.sin(T)*-x),l=Cl(v,l,R*I*-x+x)}p!==$s&&(M+="perspective("+p+Sr),(i||s)&&(M+="translate("+i+"%, "+s+"%) "),(A||a!==$s||o!==$s||l!==$s)&&(M+=l!==$s||A?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+Sr),c!==yr&&(M+="rotate("+c+Sr),h!==yr&&(M+="rotateY("+h+Sr),f!==yr&&(M+="rotateX("+f+Sr),(u!==yr||d!==yr)&&(M+="skew("+u+", "+d+Sr),(g!==1||_!==1)&&(M+="scale("+g+", "+_+Sr),v.style[Ct]=M||"translate(0, 0)"},Bg=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,h=n.skewY,f=n.scaleX,u=n.scaleY,d=n.target,g=n.xOrigin,_=n.yOrigin,p=n.xOffset,m=n.yOffset,v=n.forceCSS,x=parseFloat(a),M=parseFloat(o),A,T,S,R,I;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=Ts,c*=Ts,A=Math.cos(l)*f,T=Math.sin(l)*f,S=Math.sin(l-c)*-u,R=Math.cos(l-c)*u,c&&(h*=Ts,I=Math.tan(c-h),I=Math.sqrt(1+I*I),S*=I,R*=I,h&&(I=Math.tan(h),I=Math.sqrt(1+I*I),A*=I,T*=I)),A=Ot(A),T=Ot(T),S=Ot(S),R=Ot(R)):(A=f,R=u,T=S=0),(x&&!~(a+"").indexOf("px")||M&&!~(o+"").indexOf("px"))&&(x=pr(d,"x",a,"px"),M=pr(d,"y",o,"px")),(g||_||p||m)&&(x=Ot(x+g-(g*A+_*S)+p),M=Ot(M+_-(g*T+_*R)+m)),(i||s)&&(I=d.getBBox(),x=Ot(x+i/100*I.width),M=Ot(M+s/100*I.height)),I="matrix("+A+","+T+","+S+","+R+","+x+","+M+")",d.setAttribute("transform",I),v&&(d.style[Ct]=I)},zg=function(e,t,n,i,s){var a=360,o=Zt(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?Rr:1),c=l-i,h=i+c+"deg",f,u;return o&&(f=s.split("_")[1],f==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),f==="cw"&&c<0?c=(c+a*Cu)%a-~~(c/a)*a:f==="ccw"&&c>0&&(c=(c-a*Cu)%a-~~(c/a)*a)),e._pt=u=new En(e._pt,t,n,i,c,Mg),u.e=h,u.u="deg",e._props.push(n),u},Ou=function(e,t){for(var n in t)e[n]=t[n];return e},Hg=function(e,t,n){var i=Ou({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,h,f,u,d,g;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[Ct]=t,o=Da(n,1),fr(n,Ct),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Ct],a[Ct]=t,o=Da(n,1),a[Ct]=c);for(l in Hi)c=i[l],h=o[l],c!==h&&s.indexOf(l)<0&&(d=sn(c),g=sn(h),f=d!==g?pr(n,l,c,g):parseFloat(c),u=parseFloat(h),e._pt=new En(e._pt,o,l,f,u-f,Ec),e._pt.u=g||0,e._props.push(l));Ou(o,i)};bn("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",a=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(o){return e<2?r+o:"border"+o+r});Zo[e>1?"border"+r:r]=function(o,l,c,h,f){var u,d;if(arguments.length<4)return u=a.map(function(g){return Di(o,g,c)}),d=u.join(" "),d.split(u[0]).length===5?u[0]:d;u=(h+"").split(" "),d={},a.forEach(function(g,_){return d[g]=u[_]=u[_]||u[(_-1)/2|0]}),o.init(l,d,f)}});var ip={name:"css",register:wc,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var a=this._props,o=e.style,l=n.vars.startAt,c,h,f,u,d,g,_,p,m,v,x,M,A,T,S,R,I;Vh||wc(),this.styles=this.styles||Zf(e),R=this.styles.props,this.tween=n;for(_ in t)if(_!=="autoRound"&&(h=t[_],!(Nn[_]&&Bf(_,t,n,i,e,s)))){if(d=typeof h,g=Zo[_],d==="function"&&(h=h.call(n,i,e,s),d=typeof h),d==="string"&&~h.indexOf("random(")&&(h=Aa(h)),g)g(this,e,_,h,n)&&(S=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(_)+"").trim(),h+="",or.lastIndex=0,or.test(c)||(p=sn(c),m=sn(h),m?p!==m&&(c=pr(e,_,c,m)+m):p&&(h+=p)),this.add(o,"setProperty",c,h,i,s,0,0,_),a.push(_),R.push(_,0,o[_]);else if(d!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,e,s):l[_],Zt(c)&&~c.indexOf("random(")&&(c=Aa(c)),sn(c+"")||c==="auto"||(c+=Hn.units[_]||sn(Di(e,_))||""),(c+"").charAt(1)==="="&&(c=Di(e,_))):c=Di(e,_),u=parseFloat(c),v=d==="string"&&h.charAt(1)==="="&&h.substr(0,2),v&&(h=h.substr(2)),f=parseFloat(h),_ in xi&&(_==="autoAlpha"&&(u===1&&Di(e,"visibility")==="hidden"&&f&&(u=0),R.push("visibility",0,o.visibility),nr(this,o,"visibility",u?"inherit":"hidden",f?"inherit":"hidden",!f)),_!=="scale"&&_!=="transform"&&(_=xi[_],~_.indexOf(",")&&(_=_.split(",")[0]))),x=_ in Hi,x){if(this.styles.save(_),I=h,d==="string"&&h.substring(0,6)==="var(--"){if(h=zn(e,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var y=e.style.perspective;e.style.perspective=h,h=zn(e,"perspective"),y?e.style.perspective=y:fr(e,"perspective")}f=parseFloat(h)}if(M||(A=e._gsap,A.renderTransform&&!t.parseTransform||Da(e,t.parseTransform),T=t.smoothOrigin!==!1&&A.smooth,M=this._pt=new En(this._pt,o,Ct,0,1,A.renderTransform,A,0,-1),M.dep=1),_==="scale")this._pt=new En(this._pt,A,"scaleY",A.scaleY,(v?bs(A.scaleY,v+f):f)-A.scaleY||0,Ec),this._pt.u=0,a.push("scaleY",_),_+="X";else if(_==="transformOrigin"){R.push(Tn,0,o[Tn]),h=Og(h),A.svg?Ac(e,h,0,T,0,this):(m=parseFloat(h.split(" ")[2])||0,m!==A.zOrigin&&nr(this,A,"zOrigin",A.zOrigin,m),nr(this,o,_,jo(c),jo(h)));continue}else if(_==="svgOrigin"){Ac(e,h,1,T,0,this);continue}else if(_ in ep){zg(this,A,_,u,v?bs(u,v+h):h);continue}else if(_==="smoothOrigin"){nr(this,A,"smooth",A.smooth,h);continue}else if(_==="force3D"){A[_]=h;continue}else if(_==="transform"){Hg(this,h,e);continue}}else _ in o||(_=Fs(_)||_);if(x||(f||f===0)&&(u||u===0)&&!Sg.test(h)&&_ in o)p=(c+"").substr((u+"").length),f||(f=0),m=sn(h)||(_ in Hn.units?Hn.units[_]:p),p!==m&&(u=pr(e,_,c,m)),this._pt=new En(this._pt,x?A:o,_,u,(v?bs(u,v+f):f)-u,!x&&(m==="px"||_==="zIndex")&&t.autoRound!==!1?Tg:Ec),this._pt.u=m||0,x&&I!==h?(this._pt.b=c,this._pt.e=I,this._pt.r=Eg):p!==m&&m!=="%"&&(this._pt.b=c,this._pt.r=bg);else if(_ in o)Ng.call(this,e,_,c,v?v+h:h);else if(_ in e)this.add(e,_,c||e[_],v?v+h:h,i,s);else if(_!=="parseTransform"){Ih(_,h);continue}x||(_ in o?R.push(_,0,o[_]):typeof e[_]=="function"?R.push(_,2,e[_]()):R.push(_,1,c||e[_])),a.push(_)}}S&&Xf(this)},render:function(e,t){if(t.tween._time||!Wh())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Di,aliases:xi,getSetter:function(e,t,n){var i=xi[t];return i&&i.indexOf(",")<0&&(t=i),t in Hi&&t!==Tn&&(e._gsap.x||Di(e,"x"))?n&&Ru===n?t==="scale"?Cg:Rg:(Ru=n||{})&&(t==="scale"?Pg:Dg):e.style&&!Ph(e.style[t])?wg:~t.indexOf("-")?Ag:Hh(e,t)},core:{_removeProperty:fr,_getMatrix:Yh}};Rn.utils.checkPrefix=Fs;Rn.core.getStyleSaver=Zf;(function(r,e,t,n){var i=bn(r+","+e+","+t,function(s){Hi[s]=1});bn(e,function(s){Hn.units[s]="deg",ep[s]=1}),xi[i[13]]=r+","+e,bn(n,function(s){var a=s.split(":");xi[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");bn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Hn.units[r]="px"});Rn.registerPlugin(ip);var Pt=Rn.registerPlugin(ip)||Rn;Pt.core.Tween;function Gg(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Vg(r,e,t){return e&&Gg(r.prototype,e),r}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Jt,Do,kn,ir,rr,ws,rp,Cr,As,sp,Oi,si,ap,op=function(){return Jt||typeof window<"u"&&(Jt=window.gsap)&&Jt.registerPlugin&&Jt},lp=1,Ss=[],tt=[],Mi=[],ma=Date.now,Rc=function(e,t){return t},Wg=function(){var e=As.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,tt),i.push.apply(i,Mi),tt=n,Mi=i,Rc=function(a,o){return t[a](o)}},lr=function(e,t){return~Mi.indexOf(e)&&Mi[Mi.indexOf(e)+1][t]},ga=function(e){return!!~sp.indexOf(e)},cn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},ln=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Va="scrollLeft",Wa="scrollTop",Cc=function(){return Oi&&Oi.isPressed||tt.cache++},Jo=function(e,t){var n=function i(s){if(s||s===0){lp&&(kn.history.scrollRestoration="manual");var a=Oi&&Oi.isPressed;s=i.v=Math.round(s)||(Oi&&Oi.iOS?1:0),e(s),i.cacheID=tt.cache,a&&Rc("ss",s)}else(t||tt.cache!==i.cacheID||Rc("ref"))&&(i.cacheID=tt.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},mn={s:Va,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Jo(function(r){return arguments.length?kn.scrollTo(r,Vt.sc()):kn.pageXOffset||ir[Va]||rr[Va]||ws[Va]||0})},Vt={s:Wa,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:mn,sc:Jo(function(r){return arguments.length?kn.scrollTo(mn.sc(),r):kn.pageYOffset||ir[Wa]||rr[Wa]||ws[Wa]||0})},vn=function(e,t){return(t&&t._ctx&&t._ctx.selector||Jt.utils.toArray)(e)[0]||(typeof e=="string"&&Jt.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Xg=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},mr=function(e,t){var n=t.s,i=t.sc;ga(e)&&(e=ir.scrollingElement||rr);var s=tt.indexOf(e),a=i===Vt.sc?1:2;!~s&&(s=tt.push(e)-1),tt[s+a]||cn(e,"scroll",Cc);var o=tt[s+a],l=o||(tt[s+a]=Jo(lr(e,n),!0)||(ga(e)?i:Jo(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,o||(l.smooth=Jt.getProperty(e,"scrollBehavior")==="smooth"),l},Pc=function(e,t,n){var i=e,s=e,a=ma(),o=a,l=t||50,c=Math.max(500,l*3),h=function(g,_){var p=ma();_||p-a>l?(s=i,i=g,o=a,a=p):n?i+=g:i=s+(g-s)/(p-o)*(a-o)},f=function(){s=i=n?0:i,o=a=0},u=function(g){var _=o,p=s,m=ma();return(g||g===0)&&g!==i&&h(g),a===o||m-o>c?0:(i+(n?p:-p))/((n?m:a)-_)*1e3};return{update:h,reset:f,getVelocity:u}},Ks=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Fu=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},cp=function(){As=Jt.core.globals().ScrollTrigger,As&&As.core&&Wg()},hp=function(e){return Jt=e||op(),!Do&&Jt&&typeof document<"u"&&document.body&&(kn=window,ir=document,rr=ir.documentElement,ws=ir.body,sp=[kn,ir,rr,ws],Jt.utils.clamp,ap=Jt.core.context||function(){},Cr="onpointerenter"in ws?"pointer":"mouse",rp=kt.isTouch=kn.matchMedia&&kn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in kn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,si=kt.eventTypes=("ontouchstart"in rr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in rr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return lp=0},500),Do=1),As||cp(),Do};mn.op=Vt;tt.cache=0;var kt=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){Do||hp(Jt)||console.warn("Please gsap.registerPlugin(Observer)"),As||cp();var i=n.tolerance,s=n.dragMinimum,a=n.type,o=n.target,l=n.lineHeight,c=n.debounce,h=n.preventDefault,f=n.onStop,u=n.onStopDelay,d=n.ignore,g=n.wheelSpeed,_=n.event,p=n.onDragStart,m=n.onDragEnd,v=n.onDrag,x=n.onPress,M=n.onRelease,A=n.onRight,T=n.onLeft,S=n.onUp,R=n.onDown,I=n.onChangeX,y=n.onChangeY,b=n.onChange,P=n.onToggleX,U=n.onToggleY,k=n.onHover,Y=n.onHoverEnd,z=n.onMove,G=n.ignoreCheck,W=n.isNormalizer,re=n.onGestureStart,D=n.onGestureEnd,oe=n.onWheel,Be=n.onEnable,Xe=n.onDisable,$=n.onClick,Q=n.scrollSpeed,de=n.capture,ae=n.allowClicks,we=n.lockAxis,Me=n.onLockAxis;this.target=o=vn(o)||rr,this.vars=n,d&&(d=Jt.utils.toArray(d)),i=i||1e-9,s=s||0,g=g||1,Q=Q||1,a=a||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(kn.getComputedStyle(ws).lineHeight)||22);var We,Ve,Ne,L,rt,Oe,ze,B=this,je=0,De=0,C=n.passive||!h&&n.passive!==!1,E=mr(o,mn),X=mr(o,Vt),j=E(),te=X(),Z=~a.indexOf("touch")&&!~a.indexOf("pointer")&&si[0]==="pointerdown",ye=ga(o),ie=o.ownerDocument||ir,fe=[0,0,0],Ge=[0,0,0],ne=0,ve=function(){return ne=ma()},xe=function(be,lt){return(B.event=be)&&d&&Xg(be.target,d)||lt&&Z&&be.pointerType!=="touch"||G&&G(be,lt)},Ie=function(){B._vx.reset(),B._vy.reset(),Ve.pause(),f&&f(B)},_e=function(){var be=B.deltaX=Fu(fe),lt=B.deltaY=Fu(Ge),pe=Math.abs(be)>=i,Le=Math.abs(lt)>=i;b&&(pe||Le)&&b(B,be,lt,fe,Ge),pe&&(A&&B.deltaX>0&&A(B),T&&B.deltaX<0&&T(B),I&&I(B),P&&B.deltaX<0!=je<0&&P(B),je=B.deltaX,fe[0]=fe[1]=fe[2]=0),Le&&(R&&B.deltaY>0&&R(B),S&&B.deltaY<0&&S(B),y&&y(B),U&&B.deltaY<0!=De<0&&U(B),De=B.deltaY,Ge[0]=Ge[1]=Ge[2]=0),(L||Ne)&&(z&&z(B),Ne&&(p&&Ne===1&&p(B),v&&v(B),Ne=0),L=!1),Oe&&!(Oe=!1)&&Me&&Me(B),rt&&(oe(B),rt=!1),We=0},Ye=function(be,lt,pe){fe[pe]+=be,Ge[pe]+=lt,B._vx.update(be),B._vy.update(lt),c?We||(We=requestAnimationFrame(_e)):_e()},Fe=function(be,lt){we&&!ze&&(B.axis=ze=Math.abs(be)>Math.abs(lt)?"x":"y",Oe=!0),ze!=="y"&&(fe[2]+=be,B._vx.update(be,!0)),ze!=="x"&&(Ge[2]+=lt,B._vy.update(lt,!0)),c?We||(We=requestAnimationFrame(_e)):_e()},st=function(be){if(!xe(be,1)){be=Ks(be,h);var lt=be.clientX,pe=be.clientY,Le=lt-B.x,Ce=pe-B.y,He=B.isDragging;B.x=lt,B.y=pe,(He||(Le||Ce)&&(Math.abs(B.startX-lt)>=s||Math.abs(B.startY-pe)>=s))&&(Ne||(Ne=He?2:1),He||(B.isDragging=!0),Fe(Le,Ce))}},N=B.onPress=function(Re){xe(Re,1)||Re&&Re.button||(B.axis=ze=null,Ve.pause(),B.isPressed=!0,Re=Ks(Re),je=De=0,B.startX=B.x=Re.clientX,B.startY=B.y=Re.clientY,B._vx.reset(),B._vy.reset(),cn(W?o:ie,si[1],st,C,!0),B.deltaX=B.deltaY=0,x&&x(B))},ee=B.onRelease=function(Re){if(!xe(Re,1)){ln(W?o:ie,si[1],st,!0);var be=!isNaN(B.y-B.startY),lt=B.isDragging,pe=lt&&(Math.abs(B.x-B.startX)>3||Math.abs(B.y-B.startY)>3),Le=Ks(Re);!pe&&be&&(B._vx.reset(),B._vy.reset(),h&&ae&&Jt.delayedCall(.08,function(){if(ma()-ne>300&&!Re.defaultPrevented){if(Re.target.click)Re.target.click();else if(ie.createEvent){var Ce=ie.createEvent("MouseEvents");Ce.initMouseEvent("click",!0,!0,kn,1,Le.screenX,Le.screenY,Le.clientX,Le.clientY,!1,!1,!1,!1,0,null),Re.target.dispatchEvent(Ce)}}})),B.isDragging=B.isGesturing=B.isPressed=!1,f&&lt&&!W&&Ve.restart(!0),Ne&&_e(),m&&lt&&m(B),M&&M(B,pe)}},K=function(be){return be.touches&&be.touches.length>1&&(B.isGesturing=!0)&&re(be,B.isDragging)},J=function(){return(B.isGesturing=!1)||D(B)},le=function(be){if(!xe(be)){var lt=E(),pe=X();Ye((lt-j)*Q,(pe-te)*Q,1),j=lt,te=pe,f&&Ve.restart(!0)}},ce=function(be){if(!xe(be)){be=Ks(be,h),oe&&(rt=!0);var lt=(be.deltaMode===1?l:be.deltaMode===2?kn.innerHeight:1)*g;Ye(be.deltaX*lt,be.deltaY*lt,0),f&&!W&&Ve.restart(!0)}},qe=function(be){if(!xe(be)){var lt=be.clientX,pe=be.clientY,Le=lt-B.x,Ce=pe-B.y;B.x=lt,B.y=pe,L=!0,f&&Ve.restart(!0),(Le||Ce)&&Fe(Le,Ce)}},gt=function(be){B.event=be,k(B)},Et=function(be){B.event=be,Y(B)},nt=function(be){return xe(be)||Ks(be,h)&&$(B)};Ve=B._dc=Jt.delayedCall(u||.25,Ie).pause(),B.deltaX=B.deltaY=0,B._vx=Pc(0,50,!0),B._vy=Pc(0,50,!0),B.scrollX=E,B.scrollY=X,B.isDragging=B.isGesturing=B.isPressed=!1,ap(this),B.enable=function(Re){return B.isEnabled||(cn(ye?ie:o,"scroll",Cc),a.indexOf("scroll")>=0&&cn(ye?ie:o,"scroll",le,C,de),a.indexOf("wheel")>=0&&cn(o,"wheel",ce,C,de),(a.indexOf("touch")>=0&&rp||a.indexOf("pointer")>=0)&&(cn(o,si[0],N,C,de),cn(ie,si[2],ee),cn(ie,si[3],ee),ae&&cn(o,"click",ve,!0,!0),$&&cn(o,"click",nt),re&&cn(ie,"gesturestart",K),D&&cn(ie,"gestureend",J),k&&cn(o,Cr+"enter",gt),Y&&cn(o,Cr+"leave",Et),z&&cn(o,Cr+"move",qe)),B.isEnabled=!0,B.isDragging=B.isGesturing=B.isPressed=L=Ne=!1,B._vx.reset(),B._vy.reset(),j=E(),te=X(),Re&&Re.type&&N(Re),Be&&Be(B)),B},B.disable=function(){B.isEnabled&&(Ss.filter(function(Re){return Re!==B&&ga(Re.target)}).length||ln(ye?ie:o,"scroll",Cc),B.isPressed&&(B._vx.reset(),B._vy.reset(),ln(W?o:ie,si[1],st,!0)),ln(ye?ie:o,"scroll",le,de),ln(o,"wheel",ce,de),ln(o,si[0],N,de),ln(ie,si[2],ee),ln(ie,si[3],ee),ln(o,"click",ve,!0),ln(o,"click",nt),ln(ie,"gesturestart",K),ln(ie,"gestureend",J),ln(o,Cr+"enter",gt),ln(o,Cr+"leave",Et),ln(o,Cr+"move",qe),B.isEnabled=B.isPressed=B.isDragging=!1,Xe&&Xe(B))},B.kill=B.revert=function(){B.disable();var Re=Ss.indexOf(B);Re>=0&&Ss.splice(Re,1),Oi===B&&(Oi=0)},Ss.push(B),W&&ga(o)&&(Oi=B),B.enable(_)},Vg(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();kt.version="3.15.0";kt.create=function(r){return new kt(r)};kt.register=hp;kt.getAll=function(){return Ss.slice()};kt.getById=function(r){return Ss.filter(function(e){return e.vars.id===r})[0]};op()&&Jt.registerPlugin(kt);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Se,_s,et,pt,On,ut,qh,Qo,La,_a,aa,Xa,nn,fl,Dc,fn,ku,Bu,vs,up,Pl,dp,dn,Lc,fp,pp,Ji,Ic,$h,Rs,Kh,va,Uc,Dl,Ya=1,rn=Date.now,Ll=rn(),Qn=0,oa=0,zu=function(e,t,n){var i=Un(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},Hu=function(e,t){return t&&(!Un(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},Yg=function r(){return oa&&requestAnimationFrame(r)},Gu=function(){return fl=1},Vu=function(){return fl=0},pi=function(e){return e},la=function(e){return Math.round(e*1e5)/1e5||0},mp=function(){return typeof window<"u"},gp=function(){return Se||mp()&&(Se=window.gsap)&&Se.registerPlugin&&Se},Yr=function(e){return!!~qh.indexOf(e)},_p=function(e){return(e==="Height"?Kh:et["inner"+e])||On["client"+e]||ut["client"+e]},vp=function(e){return lr(e,"getBoundingClientRect")||(Yr(e)?function(){return Oo.width=et.innerWidth,Oo.height=Kh,Oo}:function(){return Ii(e)})},qg=function(e,t,n){var i=n.d,s=n.d2,a=n.a;return(a=lr(e,"getBoundingClientRect"))?function(){return a()[i]}:function(){return(t?_p(s):e["client"+s])||0}},$g=function(e,t){return!t||~Mi.indexOf(e)?vp(e):function(){return Oo}},yi=function(e,t){var n=t.s,i=t.d2,s=t.d,a=t.a;return Math.max(0,(n="scroll"+i)&&(a=lr(e,n))?a()-vp(e)()[s]:Yr(e)?(On[n]||ut[n])-_p(i):e[n]-e["offset"+i])},qa=function(e,t){for(var n=0;n<vs.length;n+=3)(!t||~t.indexOf(vs[n+1]))&&e(vs[n],vs[n+1],vs[n+2])},Un=function(e){return typeof e=="string"},an=function(e){return typeof e=="function"},ca=function(e){return typeof e=="number"},Pr=function(e){return typeof e=="object"},Zs=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},es=function(e,t,n){if(e.enabled){var i=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);i&&i.totalTime&&(e.callbackAnimation=i)}},ts=Math.abs,xp="left",yp="top",Zh="right",jh="bottom",Vr="width",Wr="height",xa="Right",ya="Left",Sa="Top",Ma="Bottom",zt="padding",qn="margin",ks="Width",Jh="Height",Gt="px",$n=function(e){return et.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},Kg=function(e){var t=$n(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},Wu=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Ii=function(e,t){var n=t&&$n(e)[Dc]!=="matrix(1, 0, 0, 1, 0, 0)"&&Se.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),i},el=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},Sp=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},Zg=function(e){return function(t){return Se.utils.snap(Sp(e),t)}},Qh=function(e){var t=Se.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,a){a===void 0&&(a=.001);var o;if(!s)return t(i);if(s>0){for(i-=a,o=0;o<n.length;o++)if(n[o]>=i)return n[o];return n[o-1]}else for(o=n.length,i+=a;o--;)if(n[o]<=i)return n[o];return n[0]}:function(i,s,a){a===void 0&&(a=.001);var o=t(i);return!s||Math.abs(o-i)<a||o-i<0==s<0?o:t(s<0?i-e:i+e)}},jg=function(e){return function(t,n){return Qh(Sp(e))(t,n.direction)}},$a=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},Kt=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},$t=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Ka=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Xu={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Za={toggleActions:"play",anticipatePin:0},tl={top:0,left:0,center:.5,bottom:1,right:1},Lo=function(e,t){if(Un(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in tl?tl[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},ja=function(e,t,n,i,s,a,o,l){var c=s.startColor,h=s.endColor,f=s.fontSize,u=s.indent,d=s.fontWeight,g=pt.createElement("div"),_=Yr(n)||lr(n,"pinType")==="fixed",p=e.indexOf("scroller")!==-1,m=_?ut:n.tagName==="IFRAME"?n.contentDocument.body:n,v=e.indexOf("start")!==-1,x=v?c:h,M="border-color:"+x+";font-size:"+f+";color:"+x+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return M+="position:"+((p||l)&&_?"fixed;":"absolute;"),(p||l||!_)&&(M+=(i===Vt?Zh:jh)+":"+(a+parseFloat(u))+"px;"),o&&(M+="box-sizing:border-box;text-align:left;width:"+o.offsetWidth+"px;"),g._isStart=v,g.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),g.style.cssText=M,g.innerText=t||t===0?e+"-"+t:e,m.children[0]?m.insertBefore(g,m.children[0]):m.appendChild(g),g._offset=g["offset"+i.op.d2],Io(g,0,i,v),g},Io=function(e,t,n,i){var s={display:"block"},a=n[i?"os2":"p2"],o=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+a+ks]=1,s["border"+o+ks]=0,s[n.p]=t+"px",Se.set(e,s)},Qe=[],Nc={},Ia,Yu=function(){return rn()-Qn>34&&(Ia||(Ia=requestAnimationFrame(Bi)))},ns=function(){(!dn||!dn.isPressed||dn.startX>ut.clientWidth)&&(tt.cache++,dn?Ia||(Ia=requestAnimationFrame(Bi)):Bi(),Qn||$r("scrollStart"),Qn=rn())},Il=function(){pp=et.innerWidth,fp=et.innerHeight},ha=function(e){tt.cache++,(e===!0||!nn&&!dp&&!pt.fullscreenElement&&!pt.webkitFullscreenElement&&(!Lc||pp!==et.innerWidth||Math.abs(et.innerHeight-fp)>et.innerHeight*.25))&&Qo.restart(!0)},qr={},Jg=[],Mp=function r(){return $t(ke,"scrollEnd",r)||Or(!0)},$r=function(e){return qr[e]&&qr[e].map(function(t){return t()})||Jg},In=[],bp=function(e){for(var t=0;t<In.length;t+=5)(!e||In[t+4]&&In[t+4].query===e)&&(In[t].style.cssText=In[t+1],In[t].getBBox&&In[t].setAttribute("transform",In[t+2]||""),In[t+3].uncache=1)},Ep=function(){return tt.forEach(function(e){return an(e)&&++e.cacheID&&(e.rec=e())})},eu=function(e,t){var n;for(fn=0;fn<Qe.length;fn++)n=Qe[fn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));va=!0,t&&bp(t),t||$r("revert")},Tp=function(e,t){tt.cache++,(t||!pn)&&tt.forEach(function(n){return an(n)&&n.cacheID++&&(n.rec=0)}),Un(e)&&(et.history.scrollRestoration=$h=e)},pn,Xr=0,qu,Qg=function(){if(qu!==Xr){var e=qu=Xr;requestAnimationFrame(function(){return e===Xr&&Or(!0)})}},wp=function(){ut.appendChild(Rs),Kh=!dn&&Rs.offsetHeight||et.innerHeight,ut.removeChild(Rs)},$u=function(e){return La(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Or=function(e,t){if(On=pt.documentElement,ut=pt.body,qh=[et,pt,On,ut],Qn&&!e&&!va){Kt(ke,"scrollEnd",Mp);return}wp(),pn=ke.isRefreshing=!0,va||Ep();var n=$r("refreshInit");up&&ke.sort(),t||eu(),tt.forEach(function(i){an(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),Qe.slice(0).forEach(function(i){return i.refresh()}),va=!1,Qe.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",a=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-a),i.refresh()}}),Uc=1,$u(!0),Qe.forEach(function(i){var s=yi(i.scroller,i._dir),a=i.vars.end==="max"||i._endClamp&&i.end>s,o=i._startClamp&&i.start>=s;(a||o)&&i.setPositions(o?s-1:i.start,a?Math.max(o?s:i.start+1,s):i.end,!0)}),$u(!1),Uc=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),tt.forEach(function(i){an(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),Tp($h,1),Qo.pause(),Xr++,pn=2,Bi(2),Qe.forEach(function(i){return an(i.vars.onRefresh)&&i.vars.onRefresh(i)}),pn=ke.isRefreshing=!1,$r("refresh")},Oc=0,Uo=1,ba,Bi=function(e){if(e===2||!pn&&!va){ke.isUpdating=!0,ba&&ba.update(0);var t=Qe.length,n=rn(),i=n-Ll>=50,s=t&&Qe[0].scroll();if(Uo=Oc>s?-1:1,pn||(Oc=s),i&&(Qn&&!fl&&n-Qn>200&&(Qn=0,$r("scrollEnd")),aa=Ll,Ll=n),Uo<0){for(fn=t;fn-- >0;)Qe[fn]&&Qe[fn].update(0,i);Uo=1}else for(fn=0;fn<t;fn++)Qe[fn]&&Qe[fn].update(0,i);ke.isUpdating=!1}Ia=0},Fc=[xp,yp,jh,Zh,qn+Ma,qn+xa,qn+Sa,qn+ya,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],No=Fc.concat([Vr,Wr,"boxSizing","max"+ks,"max"+Jh,"position",qn,zt,zt+Sa,zt+xa,zt+Ma,zt+ya]),e_=function(e,t,n){Cs(n);var i=e._gsap;if(i.spacerIsNative)Cs(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},Ul=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=Fc.length,a=t.style,o=e.style,l;s--;)l=Fc[s],a[l]=n[l];a.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(a.display="inline-block"),o[jh]=o[Zh]="auto",a.flexBasis=n.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[Vr]=el(e,mn)+Gt,a[Wr]=el(e,Vt)+Gt,a[zt]=o[qn]=o[yp]=o[xp]="0",Cs(i),o[Vr]=o["max"+ks]=n[Vr],o[Wr]=o["max"+Jh]=n[Wr],o[zt]=n[zt],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},t_=/([A-Z])/g,Cs=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,a;for((e.t._gsap||Se.core.getCache(e.t)).uncache=1;i<n;i+=2)a=e[i+1],s=e[i],a?t[s]=a:t[s]&&t.removeProperty(s.replace(t_,"-$1").toLowerCase())}},Ja=function(e){for(var t=No.length,n=e.style,i=[],s=0;s<t;s++)i.push(No[s],n[No[s]]);return i.t=e,i},n_=function(e,t,n){for(var i=[],s=e.length,a=n?8:0,o;a<s;a+=2)o=e[a],i.push(o,o in t?t[o]:e[a+1]);return i.t=e.t,i},Oo={left:0,top:0},Ku=function(e,t,n,i,s,a,o,l,c,h,f,u,d,g){an(e)&&(e=e(l)),Un(e)&&e.substr(0,3)==="max"&&(e=u+(e.charAt(4)==="="?Lo("0"+e.substr(3),n):0));var _=d?d.time():0,p,m,v;if(d&&d.seek(0),isNaN(e)||(e=+e),ca(e))d&&(e=Se.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,u,e)),o&&Io(o,n,i,!0);else{an(t)&&(t=t(l));var x=(e||"0").split(" "),M,A,T,S;v=vn(t,l)||ut,M=Ii(v)||{},(!M||!M.left&&!M.top)&&$n(v).display==="none"&&(S=v.style.display,v.style.display="block",M=Ii(v),S?v.style.display=S:v.style.removeProperty("display")),A=Lo(x[0],M[i.d]),T=Lo(x[1]||"0",n),e=M[i.p]-c[i.p]-h+A+s-T,o&&Io(o,T,i,n-T<20||o._isStart&&T>20),n-=n-T}if(g&&(l[g]=e||-.001,e<0&&(e=0)),a){var R=e+n,I=a._isStart;p="scroll"+i.d2,Io(a,R,i,I&&R>20||!I&&(f?Math.max(ut[p],On[p]):a.parentNode[p])<=R+1),f&&(c=Ii(o),f&&(a.style[i.op.p]=c[i.op.p]-i.op.m-a._offset+Gt))}return d&&v&&(p=Ii(v),d.seek(u),m=Ii(v),d._caScrollDist=p[i.p]-m[i.p],e=e/d._caScrollDist*u),d&&d.seek(_),d?e:Math.round(e)},i_=/(webkit|moz|length|cssText|inset)/i,Zu=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,a,o;if(t===ut){e._stOrig=s.cssText,o=$n(e);for(a in o)!+a&&!i_.test(a)&&o[a]&&typeof s[a]=="string"&&a!=="0"&&(s[a]=o[a]);s.top=n,s.left=i}else s.cssText=e._stOrig;Se.core.getCache(e).uncache=1,t.appendChild(e)}},Ap=function(e,t,n){var i=t,s=i;return function(a){var o=Math.round(e());return o!==i&&o!==s&&Math.abs(o-i)>3&&Math.abs(o-s)>3&&(a=o,n&&n()),s=i,i=Math.round(a),i}},Qa=function(e,t,n){var i={};i[t.p]="+="+n,Se.set(e,i)},ju=function(e,t){var n=mr(e,t),i="_scroll"+t.p2,s=function a(o,l,c,h,f){var u=a.tween,d=l.onComplete,g={};c=c||n();var _=Ap(n,c,function(){u.kill(),a.tween=0});return f=h&&f||0,h=h||o-c,u&&u.kill(),l[i]=o,l.inherit=!1,l.modifiers=g,g[i]=function(){return _(c+h*u.ratio+f*u.ratio*u.ratio)},l.onUpdate=function(){tt.cache++,a.tween&&Bi()},l.onComplete=function(){a.tween=0,d&&d.call(u)},u=a.tween=Se.to(e,l),u};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Kt(e,"wheel",n.wheelHandler),ke.isTouch&&Kt(e,"touchmove",n.wheelHandler),s},ke=function(){function r(t,n){_s||r.register(Se)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Ic(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!oa){this.update=this.refresh=this.kill=pi;return}n=Wu(Un(n)||ca(n)||n.nodeType?{trigger:n}:n,Za);var s=n,a=s.onUpdate,o=s.toggleClass,l=s.id,c=s.onToggle,h=s.onRefresh,f=s.scrub,u=s.trigger,d=s.pin,g=s.pinSpacing,_=s.invalidateOnRefresh,p=s.anticipatePin,m=s.onScrubComplete,v=s.onSnapComplete,x=s.once,M=s.snap,A=s.pinReparent,T=s.pinSpacer,S=s.containerAnimation,R=s.fastScrollEnd,I=s.preventOverlaps,y=n.horizontal||n.containerAnimation&&n.horizontal!==!1?mn:Vt,b=!f&&f!==0,P=vn(n.scroller||et),U=Se.core.getCache(P),k=Yr(P),Y=("pinType"in n?n.pinType:lr(P,"pinType")||k&&"fixed")==="fixed",z=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],G=b&&n.toggleActions.split(" "),W="markers"in n?n.markers:Za.markers,re=k?0:parseFloat($n(P)["border"+y.p2+ks])||0,D=this,oe=n.onRefreshInit&&function(){return n.onRefreshInit(D)},Be=qg(P,k,y),Xe=$g(P,k),$=0,Q=0,de=0,ae=mr(P,y),we,Me,We,Ve,Ne,L,rt,Oe,ze,B,je,De,C,E,X,j,te,Z,ye,ie,fe,Ge,ne,ve,xe,Ie,_e,Ye,Fe,st,N,ee,K,J,le,ce,qe,gt,Et;if(D._startClamp=D._endClamp=!1,D._dir=y,p*=45,D.scroller=P,D.scroll=S?S.time.bind(S):ae,Ve=ae(),D.vars=n,i=i||n.animation,"refreshPriority"in n&&(up=1,n.refreshPriority===-9999&&(ba=D)),U.tweenScroll=U.tweenScroll||{top:ju(P,Vt),left:ju(P,mn)},D.tweenTo=we=U.tweenScroll[y.p],D.scrubDuration=function(pe){K=ca(pe)&&pe,K?ee?ee.duration(pe):ee=Se.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:K,paused:!0,onComplete:function(){return m&&m(D)}}):(ee&&ee.progress(1).kill(),ee=0)},i&&(i.vars.lazy=!1,i._initted&&!D.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),D.animation=i.pause(),i.scrollTrigger=D,D.scrubDuration(f),st=0,l||(l=i.vars.id)),M&&((!Pr(M)||M.push)&&(M={snapTo:M}),"scrollBehavior"in ut.style&&Se.set(k?[ut,On]:P,{scrollBehavior:"auto"}),tt.forEach(function(pe){return an(pe)&&pe.target===(k?pt.scrollingElement||On:P)&&(pe.smooth=!1)}),We=an(M.snapTo)?M.snapTo:M.snapTo==="labels"?Zg(i):M.snapTo==="labelsDirectional"?jg(i):M.directional!==!1?function(pe,Le){return Qh(M.snapTo)(pe,rn()-Q<500?0:Le.direction)}:Se.utils.snap(M.snapTo),J=M.duration||{min:.1,max:2},J=Pr(J)?_a(J.min,J.max):_a(J,J),le=Se.delayedCall(M.delay||K/2||.1,function(){var pe=ae(),Le=rn()-Q<500,Ce=we.tween;if((Le||Math.abs(D.getVelocity())<10)&&!Ce&&!fl&&$!==pe){var He=(pe-L)/E,It=i&&!b?i.totalProgress():He,$e=Le?0:(It-N)/(rn()-aa)*1e3||0,Tt=Se.utils.clamp(-He,1-He,ts($e/2)*$e/.185),Ut=He+(M.inertia===!1?0:Tt),St,_t,ft=M,Cn=ft.onStart,Mt=ft.onInterrupt,w=ft.onComplete;if(St=We(Ut,D),ca(St)||(St=Ut),_t=Math.max(0,Math.round(L+St*E)),pe<=rt&&pe>=L&&_t!==pe){if(Ce&&!Ce._initted&&Ce.data<=ts(_t-pe))return;M.inertia===!1&&(Tt=St-He),we(_t,{duration:J(ts(Math.max(ts(Ut-It),ts(St-It))*.185/$e/.05||0)),ease:M.ease||"power3",data:ts(_t-pe),onInterrupt:function(){return le.restart(!0)&&Mt&&es(D,Mt)},onComplete:function(){D.update(),$=ae(),i&&!b&&(ee?ee.resetTo("totalProgress",St,i._tTime/i._tDur):i.progress(St)),st=N=i&&!b?i.totalProgress():D.progress,v&&v(D),w&&es(D,w)}},pe,Tt*E,_t-pe-Tt*E),Cn&&es(D,Cn,we.tween)}}else D.isActive&&$!==pe&&le.restart(!0)}).pause()),l&&(Nc[l]=D),u=D.trigger=vn(u||d!==!0&&d),Et=u&&u._gsap&&u._gsap.stRevert,Et&&(Et=Et(D)),d=d===!0?u:vn(d),Un(o)&&(o={targets:u,className:o}),d&&(g===!1||g===qn||(g=!g&&d.parentNode&&d.parentNode.style&&$n(d.parentNode).display==="flex"?!1:zt),D.pin=d,Me=Se.core.getCache(d),Me.spacer?X=Me.pinState:(T&&(T=vn(T),T&&!T.nodeType&&(T=T.current||T.nativeElement),Me.spacerIsNative=!!T,T&&(Me.spacerState=Ja(T))),Me.spacer=Z=T||pt.createElement("div"),Z.classList.add("pin-spacer"),l&&Z.classList.add("pin-spacer-"+l),Me.pinState=X=Ja(d)),n.force3D!==!1&&Se.set(d,{force3D:!0}),D.spacer=Z=Me.spacer,Fe=$n(d),ve=Fe[g+y.os2],ie=Se.getProperty(d),fe=Se.quickSetter(d,y.a,Gt),Ul(d,Z,Fe),te=Ja(d)),W){De=Pr(W)?Wu(W,Xu):Xu,B=ja("scroller-start",l,P,y,De,0),je=ja("scroller-end",l,P,y,De,0,B),ye=B["offset"+y.op.d2];var nt=vn(lr(P,"content")||P);Oe=this.markerStart=ja("start",l,nt,y,De,ye,0,S),ze=this.markerEnd=ja("end",l,nt,y,De,ye,0,S),S&&(gt=Se.quickSetter([Oe,ze],y.a,Gt)),!Y&&!(Mi.length&&lr(P,"fixedMarkers")===!0)&&(Kg(k?ut:P),Se.set([B,je],{force3D:!0}),Ie=Se.quickSetter(B,y.a,Gt),Ye=Se.quickSetter(je,y.a,Gt))}if(S){var Re=S.vars.onUpdate,be=S.vars.onUpdateParams;S.eventCallback("onUpdate",function(){D.update(0,0,1),Re&&Re.apply(S,be||[])})}if(D.previous=function(){return Qe[Qe.indexOf(D)-1]},D.next=function(){return Qe[Qe.indexOf(D)+1]},D.revert=function(pe,Le){if(!Le)return D.kill(!0);var Ce=pe!==!1||!D.enabled,He=nn;Ce!==D.isReverted&&(Ce&&(ce=Math.max(ae(),D.scroll.rec||0),de=D.progress,qe=i&&i.progress()),Oe&&[Oe,ze,B,je].forEach(function(It){return It.style.display=Ce?"none":"block"}),Ce&&(nn=D,D.update(Ce)),d&&(!A||!D.isActive)&&(Ce?e_(d,Z,X):Ul(d,Z,$n(d),xe)),Ce||D.update(Ce),nn=He,D.isReverted=Ce)},D.refresh=function(pe,Le,Ce,He){if(!((nn||!D.enabled)&&!Le)){if(d&&pe&&Qn){Kt(r,"scrollEnd",Mp);return}!pn&&oe&&oe(D),nn=D,we.tween&&!Ce&&(we.tween.kill(),we.tween=0),ee&&ee.pause(),_&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(Je){return Je.vars.immediateRender&&Je.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),D.isReverted||D.revert(!0,!0),D._subPinOffset=!1;var It=Be(),$e=Xe(),Tt=S?S.duration():yi(P,y),Ut=E<=.01||!E,St=0,_t=He||0,ft=Pr(Ce)?Ce.end:n.end,Cn=n.endTrigger||u,Mt=Pr(Ce)?Ce.start:n.start||(n.start===0||!u?0:d?"0 0":"0 100%"),w=D.pinnedContainer=n.pinnedContainer&&vn(n.pinnedContainer,D),F=u&&Math.max(0,Qe.indexOf(D))||0,H=F,V,O,se,ge,ue,he,Ae,Ue,Ee,at,it,mt,Yt;for(W&&Pr(Ce)&&(mt=Se.getProperty(B,y.p),Yt=Se.getProperty(je,y.p));H-- >0;)he=Qe[H],he.end||he.refresh(0,1)||(nn=D),Ae=he.pin,Ae&&(Ae===u||Ae===d||Ae===w)&&!he.isReverted&&(at||(at=[]),at.unshift(he),he.revert(!0,!0)),he!==Qe[H]&&(F--,H--);for(an(Mt)&&(Mt=Mt(D)),Mt=zu(Mt,"start",D),L=Ku(Mt,u,It,y,ae(),Oe,B,D,$e,re,Y,Tt,S,D._startClamp&&"_startClamp")||(d?-.001:0),an(ft)&&(ft=ft(D)),Un(ft)&&!ft.indexOf("+=")&&(~ft.indexOf(" ")?ft=(Un(Mt)?Mt.split(" ")[0]:"")+ft:(St=Lo(ft.substr(2),It),ft=Un(Mt)?Mt:(S?Se.utils.mapRange(0,S.duration(),S.scrollTrigger.start,S.scrollTrigger.end,L):L)+St,Cn=u)),ft=zu(ft,"end",D),rt=Math.max(L,Ku(ft||(Cn?"100% 0":Tt),Cn,It,y,ae()+St,ze,je,D,$e,re,Y,Tt,S,D._endClamp&&"_endClamp"))||-.001,St=0,H=F;H--;)he=Qe[H]||{},Ae=he.pin,Ae&&he.start-he._pinPush<=L&&!S&&he.end>0&&(V=he.end-(D._startClamp?Math.max(0,he.start):he.start),(Ae===u&&he.start-he._pinPush<L||Ae===w)&&isNaN(Mt)&&(St+=V*(1-he.progress)),Ae===d&&(_t+=V));if(L+=St,rt+=St,D._startClamp&&(D._startClamp+=St),D._endClamp&&!pn&&(D._endClamp=rt||-.001,rt=Math.min(rt,yi(P,y))),E=rt-L||(L-=.01)&&.001,Ut&&(de=Se.utils.clamp(0,1,Se.utils.normalize(L,rt,ce))),D._pinPush=_t,Oe&&St&&(V={},V[y.a]="+="+St,w&&(V[y.p]="-="+ae()),Se.set([Oe,ze],V)),d&&!(Uc&&D.end>=yi(P,y)))V=$n(d),ge=y===Vt,se=ae(),Ge=parseFloat(ie(y.a))+_t,!Tt&&rt>1&&(it=(k?pt.scrollingElement||On:P).style,it={style:it,value:it["overflow"+y.a.toUpperCase()]},k&&$n(ut)["overflow"+y.a.toUpperCase()]!=="scroll"&&(it.style["overflow"+y.a.toUpperCase()]="scroll")),Ul(d,Z,V),te=Ja(d),O=Ii(d,!0),Ue=Y&&mr(P,ge?mn:Vt)(),g?(xe=[g+y.os2,E+_t+Gt],xe.t=Z,H=g===zt?el(d,y)+E+_t:0,H&&(xe.push(y.d,H+Gt),Z.style.flexBasis!=="auto"&&(Z.style.flexBasis=H+Gt)),Cs(xe),w&&Qe.forEach(function(Je){Je.pin===w&&Je.vars.pinSpacing!==!1&&(Je._subPinOffset=!0)}),Y&&ae(ce)):(H=el(d,y),H&&Z.style.flexBasis!=="auto"&&(Z.style.flexBasis=H+Gt)),Y&&(ue={top:O.top+(ge?se-L:Ue)+Gt,left:O.left+(ge?Ue:se-L)+Gt,boxSizing:"border-box",position:"fixed"},ue[Vr]=ue["max"+ks]=Math.ceil(O.width)+Gt,ue[Wr]=ue["max"+Jh]=Math.ceil(O.height)+Gt,ue[qn]=ue[qn+Sa]=ue[qn+xa]=ue[qn+Ma]=ue[qn+ya]="0",ue[zt]=V[zt],ue[zt+Sa]=V[zt+Sa],ue[zt+xa]=V[zt+xa],ue[zt+Ma]=V[zt+Ma],ue[zt+ya]=V[zt+ya],j=n_(X,ue,A),pn&&ae(0)),i?(Ee=i._initted,Pl(1),i.render(i.duration(),!0,!0),ne=ie(y.a)-Ge+E+_t,_e=Math.abs(E-ne)>1,Y&&_e&&j.splice(j.length-2,2),i.render(0,!0,!0),Ee||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Pl(0)):ne=E,it&&(it.value?it.style["overflow"+y.a.toUpperCase()]=it.value:it.style.removeProperty("overflow-"+y.a));else if(u&&ae()&&!S)for(O=u.parentNode;O&&O!==ut;)O._pinOffset&&(L-=O._pinOffset,rt-=O._pinOffset),O=O.parentNode;at&&at.forEach(function(Je){return Je.revert(!1,!0)}),D.start=L,D.end=rt,Ve=Ne=pn?ce:ae(),!S&&!pn&&(Ve<ce&&ae(ce),D.scroll.rec=0),D.revert(!1,!0),Q=rn(),le&&($=-1,le.restart(!0)),nn=0,i&&b&&(i._initted||qe)&&i.progress()!==qe&&i.progress(qe||0,!0).render(i.time(),!0,!0),(Ut||de!==D.progress||S||_||i&&!i._initted)&&(i&&!b&&(i._initted||de||i.vars.immediateRender!==!1)&&i.totalProgress(S&&L<-.001&&!de?Se.utils.normalize(L,rt,0):de,!0),D.progress=Ut||(Ve-L)/E===de?0:de),d&&g&&(Z._pinOffset=Math.round(D.progress*ne)),ee&&ee.invalidate(),isNaN(mt)||(mt-=Se.getProperty(B,y.p),Yt-=Se.getProperty(je,y.p),Qa(B,y,mt),Qa(Oe,y,mt-(He||0)),Qa(je,y,Yt),Qa(ze,y,Yt-(He||0))),Ut&&!pn&&D.update(),h&&!pn&&!C&&(C=!0,h(D),C=!1)}},D.getVelocity=function(){return(ae()-Ne)/(rn()-aa)*1e3||0},D.endAnimation=function(){Zs(D.callbackAnimation),i&&(ee?ee.progress(1):i.paused()?b||Zs(i,D.direction<0,1):Zs(i,i.reversed()))},D.labelToScroll=function(pe){return i&&i.labels&&(L||D.refresh()||L)+i.labels[pe]/i.duration()*E||0},D.getTrailing=function(pe){var Le=Qe.indexOf(D),Ce=D.direction>0?Qe.slice(0,Le).reverse():Qe.slice(Le+1);return(Un(pe)?Ce.filter(function(He){return He.vars.preventOverlaps===pe}):Ce).filter(function(He){return D.direction>0?He.end<=L:He.start>=rt})},D.update=function(pe,Le,Ce){if(!(S&&!Ce&&!pe)){var He=pn===!0?ce:D.scroll(),It=pe?0:(He-L)/E,$e=It<0?0:It>1?1:It||0,Tt=D.progress,Ut,St,_t,ft,Cn,Mt,w,F;if(Le&&(Ne=Ve,Ve=S?ae():He,M&&(N=st,st=i&&!b?i.totalProgress():$e)),p&&d&&!nn&&!Ya&&Qn&&(!$e&&L<He+(He-Ne)/(rn()-aa)*p?$e=1e-4:$e===1&&rt>He+(He-Ne)/(rn()-aa)*p&&($e=.9999)),$e!==Tt&&D.enabled){if(Ut=D.isActive=!!$e&&$e<1,St=!!Tt&&Tt<1,Mt=Ut!==St,Cn=Mt||!!$e!=!!Tt,D.direction=$e>Tt?1:-1,D.progress=$e,Cn&&!nn&&(_t=$e&&!Tt?0:$e===1?1:Tt===1?2:3,b&&(ft=!Mt&&G[_t+1]!=="none"&&G[_t+1]||G[_t],F=i&&(ft==="complete"||ft==="reset"||ft in i))),I&&(Mt||F)&&(F||f||!i)&&(an(I)?I(D):D.getTrailing(I).forEach(function(se){return se.endAnimation()})),b||(ee&&!nn&&!Ya?(ee._dp._time-ee._start!==ee._time&&ee.render(ee._dp._time-ee._start),ee.resetTo?ee.resetTo("totalProgress",$e,i._tTime/i._tDur):(ee.vars.totalProgress=$e,ee.invalidate().restart())):i&&i.totalProgress($e,!!(nn&&(Q||pe)))),d){if(pe&&g&&(Z.style[g+y.os2]=ve),!Y)fe(la(Ge+ne*$e));else if(Cn){if(w=!pe&&$e>Tt&&rt+1>He&&He+1>=yi(P,y),A)if(!pe&&(Ut||w)){var H=Ii(d,!0),V=He-L;Zu(d,ut,H.top+(y===Vt?V:0)+Gt,H.left+(y===Vt?0:V)+Gt)}else Zu(d,Z);Cs(Ut||w?j:te),_e&&$e<1&&Ut||fe(Ge+($e===1&&!w?ne:0))}}M&&!we.tween&&!nn&&!Ya&&le.restart(!0),o&&(Mt||x&&$e&&($e<1||!Dl))&&La(o.targets).forEach(function(se){return se.classList[Ut||x?"add":"remove"](o.className)}),a&&!b&&!pe&&a(D),Cn&&!nn?(b&&(F&&(ft==="complete"?i.pause().totalProgress(1):ft==="reset"?i.restart(!0).pause():ft==="restart"?i.restart(!0):i[ft]()),a&&a(D)),(Mt||!Dl)&&(c&&Mt&&es(D,c),z[_t]&&es(D,z[_t]),x&&($e===1?D.kill(!1,1):z[_t]=0),Mt||(_t=$e===1?1:3,z[_t]&&es(D,z[_t]))),R&&!Ut&&Math.abs(D.getVelocity())>(ca(R)?R:2500)&&(Zs(D.callbackAnimation),ee?ee.progress(1):Zs(i,ft==="reverse"?1:!$e,1))):b&&a&&!nn&&a(D)}if(Ye){var O=S?He/S.duration()*(S._caScrollDist||0):He;Ie(O+(B._isFlipped?1:0)),Ye(O)}gt&&gt(-He/S.duration()*(S._caScrollDist||0))}},D.enable=function(pe,Le){D.enabled||(D.enabled=!0,Kt(P,"resize",ha),k||Kt(P,"scroll",ns),oe&&Kt(r,"refreshInit",oe),pe!==!1&&(D.progress=de=0,Ve=Ne=$=ae()),Le!==!1&&D.refresh())},D.getTween=function(pe){return pe&&we?we.tween:ee},D.setPositions=function(pe,Le,Ce,He){if(S){var It=S.scrollTrigger,$e=S.duration(),Tt=It.end-It.start;pe=It.start+Tt*pe/$e,Le=It.start+Tt*Le/$e}D.refresh(!1,!1,{start:Hu(pe,Ce&&!!D._startClamp),end:Hu(Le,Ce&&!!D._endClamp)},He),D.update()},D.adjustPinSpacing=function(pe){if(xe&&pe){var Le=xe.indexOf(y.d)+1;xe[Le]=parseFloat(xe[Le])+pe+Gt,xe[1]=parseFloat(xe[1])+pe+Gt,Cs(xe)}},D.disable=function(pe,Le){if(pe!==!1&&D.revert(!0,!0),D.enabled&&(D.enabled=D.isActive=!1,Le||ee&&ee.pause(),ce=0,Me&&(Me.uncache=1),oe&&$t(r,"refreshInit",oe),le&&(le.pause(),we.tween&&we.tween.kill()&&(we.tween=0)),!k)){for(var Ce=Qe.length;Ce--;)if(Qe[Ce].scroller===P&&Qe[Ce]!==D)return;$t(P,"resize",ha),k||$t(P,"scroll",ns)}},D.kill=function(pe,Le){D.disable(pe,Le),ee&&!Le&&ee.kill(),l&&delete Nc[l];var Ce=Qe.indexOf(D);Ce>=0&&Qe.splice(Ce,1),Ce===fn&&Uo>0&&fn--,Ce=0,Qe.forEach(function(He){return He.scroller===D.scroller&&(Ce=1)}),Ce||pn||(D.scroll.rec=0),i&&(i.scrollTrigger=null,pe&&i.revert({kill:!1}),Le||i.kill()),Oe&&[Oe,ze,B,je].forEach(function(He){return He.parentNode&&He.parentNode.removeChild(He)}),ba===D&&(ba=0),d&&(Me&&(Me.uncache=1),Ce=0,Qe.forEach(function(He){return He.pin===d&&Ce++}),Ce||(Me.spacer=0)),n.onKill&&n.onKill(D)},Qe.push(D),D.enable(!1,!1),Et&&Et(D),i&&i.add&&!E){var lt=D.update;D.update=function(){D.update=lt,tt.cache++,L||rt||D.refresh()},Se.delayedCall(.01,D.update),E=.01,L=rt=0}else D.refresh();d&&Qg()},r.register=function(n){return _s||(Se=n||gp(),mp()&&window.document&&r.enable(),_s=oa),_s},r.defaults=function(n){if(n)for(var i in n)Za[i]=n[i];return Za},r.disable=function(n,i){oa=0,Qe.forEach(function(a){return a[i?"kill":"disable"](n)}),$t(et,"wheel",ns),$t(pt,"scroll",ns),clearInterval(Xa),$t(pt,"touchcancel",pi),$t(ut,"touchstart",pi),$a($t,pt,"pointerdown,touchstart,mousedown",Gu),$a($t,pt,"pointerup,touchend,mouseup",Vu),Qo.kill(),qa($t);for(var s=0;s<tt.length;s+=3)Ka($t,tt[s],tt[s+1]),Ka($t,tt[s],tt[s+2])},r.enable=function(){if(et=window,pt=document,On=pt.documentElement,ut=pt.body,Se){if(La=Se.utils.toArray,_a=Se.utils.clamp,Ic=Se.core.context||pi,Pl=Se.core.suppressOverwrites||pi,$h=et.history.scrollRestoration||"auto",Oc=et.pageYOffset||0,Se.core.globals("ScrollTrigger",r),ut){oa=1,Rs=document.createElement("div"),Rs.style.height="100vh",Rs.style.position="absolute",wp(),Yg(),kt.register(Se),r.isTouch=kt.isTouch,Ji=kt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Lc=kt.isTouch===1,Kt(et,"wheel",ns),qh=[et,pt,On,ut],Se.matchMedia?(r.matchMedia=function(h){var f=Se.matchMedia(),u;for(u in h)f.add(u,h[u]);return f},Se.addEventListener("matchMediaInit",function(){Ep(),eu()}),Se.addEventListener("matchMediaRevert",function(){return bp()}),Se.addEventListener("matchMedia",function(){Or(0,1),$r("matchMedia")}),Se.matchMedia().add("(orientation: portrait)",function(){return Il(),Il})):console.warn("Requires GSAP 3.11.0 or later"),Il(),Kt(pt,"scroll",ns);var n=ut.hasAttribute("style"),i=ut.style,s=i.borderTopStyle,a=Se.core.Animation.prototype,o,l;for(a.revert||Object.defineProperty(a,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",o=Ii(ut),Vt.m=Math.round(o.top+Vt.sc())||0,mn.m=Math.round(o.left+mn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(ut.setAttribute("style",""),ut.removeAttribute("style")),Xa=setInterval(Yu,250),Se.delayedCall(.5,function(){return Ya=0}),Kt(pt,"touchcancel",pi),Kt(ut,"touchstart",pi),$a(Kt,pt,"pointerdown,touchstart,mousedown",Gu),$a(Kt,pt,"pointerup,touchend,mouseup",Vu),Dc=Se.utils.checkPrefix("transform"),No.push(Dc),_s=rn(),Qo=Se.delayedCall(.2,Or).pause(),vs=[pt,"visibilitychange",function(){var h=et.innerWidth,f=et.innerHeight;pt.hidden?(ku=h,Bu=f):(ku!==h||Bu!==f)&&ha()},pt,"DOMContentLoaded",Or,et,"load",Or,et,"resize",ha],qa(Kt),Qe.forEach(function(h){return h.enable(0,1)}),l=0;l<tt.length;l+=3)Ka($t,tt[l],tt[l+1]),Ka($t,tt[l],tt[l+2])}else if(pt){var c=function h(){r.enable(),pt.removeEventListener("DOMContentLoaded",h)};pt.addEventListener("DOMContentLoaded",c)}}},r.config=function(n){"limitCallbacks"in n&&(Dl=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Xa)||(Xa=i)&&setInterval(Yu,i),"ignoreMobileResize"in n&&(Lc=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(qa($t)||qa(Kt,n.autoRefreshEvents||"none"),dp=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=vn(n),a=tt.indexOf(s),o=Yr(s);~a&&tt.splice(a,o?6:2),i&&(o?Mi.unshift(et,i,ut,i,On,i):Mi.unshift(s,i))},r.clearMatchMedia=function(n){Qe.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var a=(Un(n)?vn(n):n).getBoundingClientRect(),o=a[s?Vr:Wr]*i||0;return s?a.right-o>0&&a.left+o<et.innerWidth:a.bottom-o>0&&a.top+o<et.innerHeight},r.positionInViewport=function(n,i,s){Un(n)&&(n=vn(n));var a=n.getBoundingClientRect(),o=a[s?Vr:Wr],l=i==null?o/2:i in tl?tl[i]*o:~i.indexOf("%")?parseFloat(i)*o/100:parseFloat(i)||0;return s?(a.left+l)/et.innerWidth:(a.top+l)/et.innerHeight},r.killAll=function(n){if(Qe.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=qr.killAll||[];qr={},i.forEach(function(s){return s()})}},r}();ke.version="3.15.0";ke.saveStyles=function(r){return r?La(r).forEach(function(e){if(e&&e.style){var t=In.indexOf(e);t>=0&&In.splice(t,5),In.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Se.core.getCache(e),Ic())}}):In};ke.revert=function(r,e){return eu(!r,e)};ke.create=function(r,e){return new ke(r,e)};ke.refresh=function(r){return r?ha(!0):(_s||ke.register())&&Or(!0)};ke.update=function(r){return++tt.cache&&Bi(r===!0?2:0)};ke.clearScrollMemory=Tp;ke.maxScroll=function(r,e){return yi(r,e?mn:Vt)};ke.getScrollFunc=function(r,e){return mr(vn(r),e?mn:Vt)};ke.getById=function(r){return Nc[r]};ke.getAll=function(){return Qe.filter(function(r){return r.vars.id!=="ScrollSmoother"})};ke.isScrolling=function(){return!!Qn};ke.snapDirectional=Qh;ke.addEventListener=function(r,e){var t=qr[r]||(qr[r]=[]);~t.indexOf(e)||t.push(e)};ke.removeEventListener=function(r,e){var t=qr[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};ke.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,a=function(c,h){var f=[],u=[],d=Se.delayedCall(i,function(){h(f,u),f=[],u=[]}).pause();return function(g){f.length||d.restart(!0),f.push(g.trigger),u.push(g),s<=f.length&&d.progress(1)}},o;for(o in e)n[o]=o.substr(0,2)==="on"&&an(e[o])&&o!=="onRefreshInit"?a(o,e[o]):e[o];return an(s)&&(s=s(),Kt(ke,"refresh",function(){return s=e.batchMax()})),La(r).forEach(function(l){var c={};for(o in n)c[o]=n[o];c.trigger=l,t.push(ke.create(c))}),t};var Ju=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},Nl=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(kt.isTouch?" pinch-zoom":""):"none",e===On&&r(ut,t)},eo={auto:1,scroll:1},r_=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,a=s._gsap||Se.core.getCache(s),o=rn(),l;if(!a._isScrollT||o-a._isScrollT>2e3){for(;s&&s!==ut&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(eo[(l=$n(s)).overflowY]||eo[l.overflowX]));)s=s.parentNode;a._isScroll=s&&s!==n&&!Yr(s)&&(eo[(l=$n(s)).overflowY]||eo[l.overflowX]),a._isScrollT=o}(a._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},Rp=function(e,t,n,i){return kt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&r_,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&Kt(pt,kt.eventTypes[0],ed,!1,!0)},onDisable:function(){return $t(pt,kt.eventTypes[0],ed,!0)}})},s_=/(input|label|select|textarea)/i,Qu,ed=function(e){var t=s_.test(e.target.tagName);(t||Qu)&&(e._gsapAllow=!0,Qu=t)},a_=function(e){Pr(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,a=t.onRelease,o,l,c=vn(e.target)||On,h=Se.core.globals().ScrollSmoother,f=h&&h.get(),u=Ji&&(e.content&&vn(e.content)||f&&e.content!==!1&&!f.smooth()&&f.content()),d=mr(c,Vt),g=mr(c,mn),_=1,p=(kt.isTouch&&et.visualViewport?et.visualViewport.scale*et.visualViewport.width:et.outerWidth)/et.innerWidth,m=0,v=an(i)?function(){return i(o)}:function(){return i||2.8},x,M,A=Rp(c,e.type,!0,s),T=function(){return M=!1},S=pi,R=pi,I=function(){l=yi(c,Vt),R=_a(Ji?1:0,l),n&&(S=_a(0,yi(c,mn))),x=Xr},y=function(){u._gsap.y=la(parseFloat(u._gsap.y)+d.offset)+"px",u.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(u._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},b=function(){if(M){requestAnimationFrame(T);var W=la(o.deltaY/2),re=R(d.v-W);if(u&&re!==d.v+d.offset){d.offset=re-d.v;var D=la((parseFloat(u&&u._gsap.y)||0)-d.offset);u.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+D+", 0, 1)",u._gsap.y=D+"px",d.cacheID=tt.cache,Bi()}return!0}d.offset&&y(),M=!0},P,U,k,Y,z=function(){I(),P.isActive()&&P.vars.scrollY>l&&(d()>l?P.progress(1)&&d(l):P.resetTo("scrollY",l))};return u&&Se.set(u,{y:"+=0"}),e.ignoreCheck=function(G){return Ji&&G.type==="touchmove"&&b()||_>1.05&&G.type!=="touchstart"||o.isGesturing||G.touches&&G.touches.length>1},e.onPress=function(){M=!1;var G=_;_=la((et.visualViewport&&et.visualViewport.scale||1)/p),P.pause(),G!==_&&Nl(c,_>1.01?!0:n?!1:"x"),U=g(),k=d(),I(),x=Xr},e.onRelease=e.onGestureStart=function(G,W){if(d.offset&&y(),!W)Y.restart(!0);else{tt.cache++;var re=v(),D,oe;n&&(D=g(),oe=D+re*.05*-G.velocityX/.227,re*=Ju(g,D,oe,yi(c,mn)),P.vars.scrollX=S(oe)),D=d(),oe=D+re*.05*-G.velocityY/.227,re*=Ju(d,D,oe,yi(c,Vt)),P.vars.scrollY=R(oe),P.invalidate().duration(re).play(.01),(Ji&&P.vars.scrollY>=l||D>=l-1)&&Se.to({},{onUpdate:z,duration:re})}a&&a(G)},e.onWheel=function(){P._ts&&P.pause(),rn()-m>1e3&&(x=0,m=rn())},e.onChange=function(G,W,re,D,oe){if(Xr!==x&&I(),W&&n&&g(S(D[2]===W?U+(G.startX-G.x):g()+W-D[1])),re){d.offset&&y();var Be=oe[2]===re,Xe=Be?k+G.startY-G.y:d()+re-oe[1],$=R(Xe);Be&&Xe!==$&&(k+=$-Xe),d($)}(re||W)&&Bi()},e.onEnable=function(){Nl(c,n?!1:"x"),ke.addEventListener("refresh",z),Kt(et,"resize",z),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=g.smooth=!1),A.enable()},e.onDisable=function(){Nl(c,!0),$t(et,"resize",z),ke.removeEventListener("refresh",z),A.kill()},e.lockAxis=e.lockAxis!==!1,o=new kt(e),o.iOS=Ji,Ji&&!d()&&d(1),Ji&&Se.ticker.add(pi),Y=o._dc,P=Se.to(o,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:Ap(d,d(),function(){return P.pause()})},onUpdate:Bi,onComplete:Y.vars.onComplete}),o};ke.sort=function(r){if(an(r))return Qe.sort(r);var e=et.pageYOffset||0;return ke.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+et.innerHeight}),Qe.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};ke.observe=function(r){return new kt(r)};ke.normalizeScroll=function(r){if(typeof r>"u")return dn;if(r===!0&&dn)return dn.enable();if(r===!1){dn&&dn.kill(),dn=r;return}var e=r instanceof kt?r:a_(r);return dn&&dn.target===e.target&&dn.kill(),Yr(e.target)&&(dn=e),e};ke.core={_getVelocityProp:Pc,_inputObserver:Rp,_scrollers:tt,_proxies:Mi,bridge:{ss:function(){Qn||$r("scrollStart"),Qn=rn()},ref:function(){return nn}}};gp()&&Se.registerPlugin(ke);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const tu="169",o_=0,td=1,l_=2,Cp=1,c_=2,Ci=3,gr=0,wn=1,Ui=2,cr=0,Ps=1,nd=2,id=3,rd=4,h_=5,Ir=100,u_=101,d_=102,f_=103,p_=104,m_=200,g_=201,__=202,v_=203,kc=204,Bc=205,x_=206,y_=207,S_=208,M_=209,b_=210,E_=211,T_=212,w_=213,A_=214,zc=0,Hc=1,Gc=2,Bs=3,Vc=4,Wc=5,Xc=6,Yc=7,Pp=0,R_=1,C_=2,hr=0,P_=1,D_=2,L_=3,I_=4,U_=5,N_=6,O_=7,Dp=300,zs=301,Hs=302,qc=303,$c=304,pl=306,Kc=1e3,Fr=1001,Zc=1002,Jn=1003,F_=1004,to=1005,oi=1006,Ol=1007,kr=1008,Gi=1009,Lp=1010,Ip=1011,Ua=1012,nu=1013,Kr=1014,Fi=1015,Oa=1016,iu=1017,ru=1018,Gs=1020,Up=35902,Np=1021,Op=1022,hi=1023,Fp=1024,kp=1025,Ds=1026,Vs=1027,Bp=1028,su=1029,zp=1030,au=1031,ou=1033,Fo=33776,ko=33777,Bo=33778,zo=33779,jc=35840,Jc=35841,Qc=35842,eh=35843,th=36196,nh=37492,ih=37496,rh=37808,sh=37809,ah=37810,oh=37811,lh=37812,ch=37813,hh=37814,uh=37815,dh=37816,fh=37817,ph=37818,mh=37819,gh=37820,_h=37821,Ho=36492,vh=36494,xh=36495,Hp=36283,yh=36284,Sh=36285,Mh=36286,k_=3200,B_=3201,z_=0,H_=1,Qi="",mi="srgb",xr="srgb-linear",lu="display-p3",ml="display-p3-linear",nl="linear",bt="srgb",il="rec709",rl="p3",is=7680,sd=519,G_=512,V_=513,W_=514,Gp=515,X_=516,Y_=517,q_=518,$_=519,ad=35044,od="300 es",ki=2e3,sl=2001;class Xs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Fl=Math.PI/180,bh=180/Math.PI;function Fa(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(en[r&255]+en[r>>8&255]+en[r>>16&255]+en[r>>24&255]+"-"+en[e&255]+en[e>>8&255]+"-"+en[e>>16&15|64]+en[e>>24&255]+"-"+en[t&63|128]+en[t>>8&255]+"-"+en[t>>16&255]+en[t>>24&255]+en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]).toLowerCase()}function yn(r,e,t){return Math.max(e,Math.min(t,r))}function K_(r,e){return(r%e+e)%e}function kl(r,e,t){return(1-t)*r+t*e}function js(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function _n(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class yt{constructor(e=0,t=0){yt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(yn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ze{constructor(e,t,n,i,s,a,o,l,c){Ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],f=n[7],u=n[2],d=n[5],g=n[8],_=i[0],p=i[3],m=i[6],v=i[1],x=i[4],M=i[7],A=i[2],T=i[5],S=i[8];return s[0]=a*_+o*v+l*A,s[3]=a*p+o*x+l*T,s[6]=a*m+o*M+l*S,s[1]=c*_+h*v+f*A,s[4]=c*p+h*x+f*T,s[7]=c*m+h*M+f*S,s[2]=u*_+d*v+g*A,s[5]=u*p+d*x+g*T,s[8]=u*m+d*M+g*S,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=h*a-o*c,u=o*l-h*s,d=c*s-a*l,g=t*f+n*u+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(i*c-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=u*_,e[4]=(h*t-i*l)*_,e[5]=(i*s-o*t)*_,e[6]=d*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Bl.makeScale(e,t)),this}rotate(e){return this.premultiply(Bl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Bl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Bl=new Ze;function Vp(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function al(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Z_(){const r=al("canvas");return r.style.display="block",r}const ld={};function Go(r){r in ld||(ld[r]=!0,console.warn(r))}function j_(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function J_(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Q_(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const cd=new Ze().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),hd=new Ze().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Js={[xr]:{transfer:nl,primaries:il,luminanceCoefficients:[.2126,.7152,.0722],toReference:r=>r,fromReference:r=>r},[mi]:{transfer:bt,primaries:il,luminanceCoefficients:[.2126,.7152,.0722],toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[ml]:{transfer:nl,primaries:rl,luminanceCoefficients:[.2289,.6917,.0793],toReference:r=>r.applyMatrix3(hd),fromReference:r=>r.applyMatrix3(cd)},[lu]:{transfer:bt,primaries:rl,luminanceCoefficients:[.2289,.6917,.0793],toReference:r=>r.convertSRGBToLinear().applyMatrix3(hd),fromReference:r=>r.applyMatrix3(cd).convertLinearToSRGB()}},e0=new Set([xr,ml]),dt={enabled:!0,_workingColorSpace:xr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!e0.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=Js[e].toReference,i=Js[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return Js[r].primaries},getTransfer:function(r){return r===Qi?nl:Js[r].transfer},getLuminanceCoefficients:function(r,e=this._workingColorSpace){return r.fromArray(Js[e].luminanceCoefficients)}};function Ls(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function zl(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let rs;class t0{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{rs===void 0&&(rs=al("canvas")),rs.width=e.width,rs.height=e.height;const n=rs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=rs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=al("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Ls(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ls(t[n]/255)*255):t[n]=Ls(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let n0=0;class Wp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:n0++}),this.uuid=Fa(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(Hl(i[a].image)):s.push(Hl(i[a]))}else s=Hl(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Hl(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?t0.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let i0=0;class An extends Xs{constructor(e=An.DEFAULT_IMAGE,t=An.DEFAULT_MAPPING,n=Fr,i=Fr,s=oi,a=kr,o=hi,l=Gi,c=An.DEFAULT_ANISOTROPY,h=Qi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:i0++}),this.uuid=Fa(),this.name="",this.source=new Wp(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new yt(0,0),this.repeat=new yt(1,1),this.center=new yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Dp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Kc:e.x=e.x-Math.floor(e.x);break;case Fr:e.x=e.x<0?0:1;break;case Zc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Kc:e.y=e.y-Math.floor(e.y);break;case Fr:e.y=e.y<0?0:1;break;case Zc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}An.DEFAULT_IMAGE=null;An.DEFAULT_MAPPING=Dp;An.DEFAULT_ANISOTROPY=1;class Ft{constructor(e=0,t=0,n=0,i=1){Ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],h=l[4],f=l[8],u=l[1],d=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,M=(d+1)/2,A=(m+1)/2,T=(h+u)/4,S=(f+_)/4,R=(g+p)/4;return x>M&&x>A?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=T/n,s=S/n):M>A?M<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(M),n=T/i,s=R/i):A<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(A),n=S/s,i=R/s),this.set(n,i,s,t),this}let v=Math.sqrt((p-g)*(p-g)+(f-_)*(f-_)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(p-g)/v,this.y=(f-_)/v,this.z=(u-h)/v,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class r0 extends Xs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ft(0,0,e,t),this.scissorTest=!1,this.viewport=new Ft(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:oi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new An(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Wp(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Zr extends r0{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Xp extends An{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Jn,this.minFilter=Jn,this.wrapR=Fr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class s0 extends An{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Jn,this.minFilter=Jn,this.wrapR=Fr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ka{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],f=n[i+3];const u=s[a+0],d=s[a+1],g=s[a+2],_=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=f;return}if(o===1){e[t+0]=u,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(f!==_||l!==u||c!==d||h!==g){let p=1-o;const m=l*u+c*d+h*g+f*_,v=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const A=Math.sqrt(x),T=Math.atan2(A,m*v);p=Math.sin(p*T)/A,o=Math.sin(o*T)/A}const M=o*v;if(l=l*p+u*M,c=c*p+d*M,h=h*p+g*M,f=f*p+_*M,p===1-o){const A=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=A,c*=A,h*=A,f*=A}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],f=s[a],u=s[a+1],d=s[a+2],g=s[a+3];return e[t]=o*g+h*f+l*d-c*u,e[t+1]=l*g+h*u+c*f-o*d,e[t+2]=c*g+h*d+o*u-l*f,e[t+3]=h*g-o*f-l*u-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),f=o(s/2),u=l(n/2),d=l(i/2),g=l(s/2);switch(a){case"XYZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"YXZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"ZXY":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"ZYX":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"YZX":this._x=u*h*f+c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f-u*d*g;break;case"XZY":this._x=u*h*f-c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f+u*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],f=t[10],u=n+o+f;if(u>0){const d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(s-c)*d,this._z=(a-i)*d}else if(n>o&&n>f){const d=2*Math.sqrt(1+n-o-f);this._w=(h-l)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(s+c)/d}else if(o>f){const d=2*Math.sqrt(1+o-n-f);this._w=(s-c)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+f-n-o);this._w=(a-i)/d,this._x=(s+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(yn(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const d=1-t;return this._w=d*a+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),f=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=a*f+this._w*u,this._x=n*f+this._x*u,this._y=i*f+this._y*u,this._z=s*f+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class q{constructor(e=0,t=0,n=0){q.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ud.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ud.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-s*i),f=2*(s*n-a*t);return this.x=t+l*c+a*f-o*h,this.y=n+l*h+o*c-s*f,this.z=i+l*f+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Gl.copy(this).projectOnVector(e),this.sub(Gl)}reflect(e){return this.sub(Gl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(yn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Gl=new q,ud=new ka;class Ba{constructor(e=new q(1/0,1/0,1/0),t=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ni.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ni.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=ni.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ni):ni.fromBufferAttribute(s,a),ni.applyMatrix4(e.matrixWorld),this.expandByPoint(ni);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),no.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),no.copy(n.boundingBox)),no.applyMatrix4(e.matrixWorld),this.union(no)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ni),ni.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Qs),io.subVectors(this.max,Qs),ss.subVectors(e.a,Qs),as.subVectors(e.b,Qs),os.subVectors(e.c,Qs),Yi.subVectors(as,ss),qi.subVectors(os,as),Mr.subVectors(ss,os);let t=[0,-Yi.z,Yi.y,0,-qi.z,qi.y,0,-Mr.z,Mr.y,Yi.z,0,-Yi.x,qi.z,0,-qi.x,Mr.z,0,-Mr.x,-Yi.y,Yi.x,0,-qi.y,qi.x,0,-Mr.y,Mr.x,0];return!Vl(t,ss,as,os,io)||(t=[1,0,0,0,1,0,0,0,1],!Vl(t,ss,as,os,io))?!1:(ro.crossVectors(Yi,qi),t=[ro.x,ro.y,ro.z],Vl(t,ss,as,os,io))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ni).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ni).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ei),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ei=[new q,new q,new q,new q,new q,new q,new q,new q],ni=new q,no=new Ba,ss=new q,as=new q,os=new q,Yi=new q,qi=new q,Mr=new q,Qs=new q,io=new q,ro=new q,br=new q;function Vl(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){br.fromArray(r,s);const o=i.x*Math.abs(br.x)+i.y*Math.abs(br.y)+i.z*Math.abs(br.z),l=e.dot(br),c=t.dot(br),h=n.dot(br);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const a0=new Ba,ea=new q,Wl=new q;class za{constructor(e=new q,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):a0.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ea.subVectors(e,this.center);const t=ea.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ea,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Wl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ea.copy(e.center).add(Wl)),this.expandByPoint(ea.copy(e.center).sub(Wl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ti=new q,Xl=new q,so=new q,$i=new q,Yl=new q,ao=new q,ql=new q;class cu{constructor(e=new q,t=new q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ti)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ti.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ti.copy(this.origin).addScaledVector(this.direction,t),Ti.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Xl.copy(e).add(t).multiplyScalar(.5),so.copy(t).sub(e).normalize(),$i.copy(this.origin).sub(Xl);const s=e.distanceTo(t)*.5,a=-this.direction.dot(so),o=$i.dot(this.direction),l=-$i.dot(so),c=$i.lengthSq(),h=Math.abs(1-a*a);let f,u,d,g;if(h>0)if(f=a*l-o,u=a*o-l,g=s*h,f>=0)if(u>=-g)if(u<=g){const _=1/h;f*=_,u*=_,d=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=s,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u=-s,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u<=-g?(f=Math.max(0,-(-a*s+o)),u=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+u*(u+2*l)+c):u<=g?(f=0,u=Math.min(Math.max(-s,-l),s),d=u*(u+2*l)+c):(f=Math.max(0,-(a*s+o)),u=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+u*(u+2*l)+c);else u=a>0?-s:s,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(Xl).addScaledVector(so,u),d}intersectSphere(e,t){Ti.subVectors(e.center,this.origin);const n=Ti.dot(this.direction),i=Ti.dot(Ti)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),f>=0?(o=(e.min.z-u.z)*f,l=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,l=(e.min.z-u.z)*f),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Ti)!==null}intersectTriangle(e,t,n,i,s){Yl.subVectors(t,e),ao.subVectors(n,e),ql.crossVectors(Yl,ao);let a=this.direction.dot(ql),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;$i.subVectors(this.origin,e);const l=o*this.direction.dot(ao.crossVectors($i,ao));if(l<0)return null;const c=o*this.direction.dot(Yl.cross($i));if(c<0||l+c>a)return null;const h=-o*$i.dot(ql);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Lt{constructor(e,t,n,i,s,a,o,l,c,h,f,u,d,g,_,p){Lt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,h,f,u,d,g,_,p)}set(e,t,n,i,s,a,o,l,c,h,f,u,d,g,_,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=f,m[14]=u,m[3]=d,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Lt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/ls.setFromMatrixColumn(e,0).length(),s=1/ls.setFromMatrixColumn(e,1).length(),a=1/ls.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const u=a*h,d=a*f,g=o*h,_=o*f;t[0]=l*h,t[4]=-l*f,t[8]=c,t[1]=d+g*c,t[5]=u-_*c,t[9]=-o*l,t[2]=_-u*c,t[6]=g+d*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,d=l*f,g=c*h,_=c*f;t[0]=u+_*o,t[4]=g*o-d,t[8]=a*c,t[1]=a*f,t[5]=a*h,t[9]=-o,t[2]=d*o-g,t[6]=_+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,d=l*f,g=c*h,_=c*f;t[0]=u-_*o,t[4]=-a*f,t[8]=g+d*o,t[1]=d+g*o,t[5]=a*h,t[9]=_-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,d=a*f,g=o*h,_=o*f;t[0]=l*h,t[4]=g*c-d,t[8]=u*c+_,t[1]=l*f,t[5]=_*c+u,t[9]=d*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,d=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=_-u*f,t[8]=g*f+d,t[1]=f,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=d*f+g,t[10]=u-_*f}else if(e.order==="XZY"){const u=a*l,d=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=-f,t[8]=c*h,t[1]=u*f+_,t[5]=a*h,t[9]=d*f-g,t[2]=g*f-d,t[6]=o*h,t[10]=_*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(o0,e,l0)}lookAt(e,t,n){const i=this.elements;return Dn.subVectors(e,t),Dn.lengthSq()===0&&(Dn.z=1),Dn.normalize(),Ki.crossVectors(n,Dn),Ki.lengthSq()===0&&(Math.abs(n.z)===1?Dn.x+=1e-4:Dn.z+=1e-4,Dn.normalize(),Ki.crossVectors(n,Dn)),Ki.normalize(),oo.crossVectors(Dn,Ki),i[0]=Ki.x,i[4]=oo.x,i[8]=Dn.x,i[1]=Ki.y,i[5]=oo.y,i[9]=Dn.y,i[2]=Ki.z,i[6]=oo.z,i[10]=Dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],f=n[5],u=n[9],d=n[13],g=n[2],_=n[6],p=n[10],m=n[14],v=n[3],x=n[7],M=n[11],A=n[15],T=i[0],S=i[4],R=i[8],I=i[12],y=i[1],b=i[5],P=i[9],U=i[13],k=i[2],Y=i[6],z=i[10],G=i[14],W=i[3],re=i[7],D=i[11],oe=i[15];return s[0]=a*T+o*y+l*k+c*W,s[4]=a*S+o*b+l*Y+c*re,s[8]=a*R+o*P+l*z+c*D,s[12]=a*I+o*U+l*G+c*oe,s[1]=h*T+f*y+u*k+d*W,s[5]=h*S+f*b+u*Y+d*re,s[9]=h*R+f*P+u*z+d*D,s[13]=h*I+f*U+u*G+d*oe,s[2]=g*T+_*y+p*k+m*W,s[6]=g*S+_*b+p*Y+m*re,s[10]=g*R+_*P+p*z+m*D,s[14]=g*I+_*U+p*G+m*oe,s[3]=v*T+x*y+M*k+A*W,s[7]=v*S+x*b+M*Y+A*re,s[11]=v*R+x*P+M*z+A*D,s[15]=v*I+x*U+M*G+A*oe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],f=e[6],u=e[10],d=e[14],g=e[3],_=e[7],p=e[11],m=e[15];return g*(+s*l*f-i*c*f-s*o*u+n*c*u+i*o*d-n*l*d)+_*(+t*l*d-t*c*u+s*a*u-i*a*d+i*c*h-s*l*h)+p*(+t*c*f-t*o*d-s*a*f+n*a*d+s*o*h-n*c*h)+m*(-i*o*h-t*l*f+t*o*u+i*a*f-n*a*u+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=e[9],u=e[10],d=e[11],g=e[12],_=e[13],p=e[14],m=e[15],v=f*p*c-_*u*c+_*l*d-o*p*d-f*l*m+o*u*m,x=g*u*c-h*p*c-g*l*d+a*p*d+h*l*m-a*u*m,M=h*_*c-g*f*c+g*o*d-a*_*d-h*o*m+a*f*m,A=g*f*l-h*_*l-g*o*u+a*_*u+h*o*p-a*f*p,T=t*v+n*x+i*M+s*A;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const S=1/T;return e[0]=v*S,e[1]=(_*u*s-f*p*s-_*i*d+n*p*d+f*i*m-n*u*m)*S,e[2]=(o*p*s-_*l*s+_*i*c-n*p*c-o*i*m+n*l*m)*S,e[3]=(f*l*s-o*u*s-f*i*c+n*u*c+o*i*d-n*l*d)*S,e[4]=x*S,e[5]=(h*p*s-g*u*s+g*i*d-t*p*d-h*i*m+t*u*m)*S,e[6]=(g*l*s-a*p*s-g*i*c+t*p*c+a*i*m-t*l*m)*S,e[7]=(a*u*s-h*l*s+h*i*c-t*u*c-a*i*d+t*l*d)*S,e[8]=M*S,e[9]=(g*f*s-h*_*s-g*n*d+t*_*d+h*n*m-t*f*m)*S,e[10]=(a*_*s-g*o*s+g*n*c-t*_*c-a*n*m+t*o*m)*S,e[11]=(h*o*s-a*f*s-h*n*c+t*f*c+a*n*d-t*o*d)*S,e[12]=A*S,e[13]=(h*_*i-g*f*i+g*n*u-t*_*u-h*n*p+t*f*p)*S,e[14]=(g*o*i-a*_*i-g*n*l+t*_*l+a*n*p-t*o*p)*S,e[15]=(a*f*i-h*o*i+h*n*l-t*f*l-a*n*u+t*o*u)*S,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,f=o+o,u=s*c,d=s*h,g=s*f,_=a*h,p=a*f,m=o*f,v=l*c,x=l*h,M=l*f,A=n.x,T=n.y,S=n.z;return i[0]=(1-(_+m))*A,i[1]=(d+M)*A,i[2]=(g-x)*A,i[3]=0,i[4]=(d-M)*T,i[5]=(1-(u+m))*T,i[6]=(p+v)*T,i[7]=0,i[8]=(g+x)*S,i[9]=(p-v)*S,i[10]=(1-(u+_))*S,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=ls.set(i[0],i[1],i[2]).length();const a=ls.set(i[4],i[5],i[6]).length(),o=ls.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],ii.copy(this);const c=1/s,h=1/a,f=1/o;return ii.elements[0]*=c,ii.elements[1]*=c,ii.elements[2]*=c,ii.elements[4]*=h,ii.elements[5]*=h,ii.elements[6]*=h,ii.elements[8]*=f,ii.elements[9]*=f,ii.elements[10]*=f,t.setFromRotationMatrix(ii),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=ki){const l=this.elements,c=2*s/(t-e),h=2*s/(n-i),f=(t+e)/(t-e),u=(n+i)/(n-i);let d,g;if(o===ki)d=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===sl)d=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=ki){const l=this.elements,c=1/(t-e),h=1/(n-i),f=1/(a-s),u=(t+e)*c,d=(n+i)*h;let g,_;if(o===ki)g=(a+s)*f,_=-2*f;else if(o===sl)g=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ls=new q,ii=new Lt,o0=new q(0,0,0),l0=new q(1,1,1),Ki=new q,oo=new q,Dn=new q,dd=new Lt,fd=new ka;class Vi{constructor(e=0,t=0,n=0,i=Vi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],f=i[2],u=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(yn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-yn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(yn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-yn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(yn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-yn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return dd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(dd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return fd.setFromEuler(this),this.setFromQuaternion(fd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vi.DEFAULT_ORDER="XYZ";class Yp{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let c0=0;const pd=new q,cs=new ka,wi=new Lt,lo=new q,ta=new q,h0=new q,u0=new ka,md=new q(1,0,0),gd=new q(0,1,0),_d=new q(0,0,1),vd={type:"added"},d0={type:"removed"},hs={type:"childadded",child:null},$l={type:"childremoved",child:null};class gn extends Xs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:c0++}),this.uuid=Fa(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gn.DEFAULT_UP.clone();const e=new q,t=new Vi,n=new ka,i=new q(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Lt},normalMatrix:{value:new Ze}}),this.matrix=new Lt,this.matrixWorld=new Lt,this.matrixAutoUpdate=gn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return cs.setFromAxisAngle(e,t),this.quaternion.multiply(cs),this}rotateOnWorldAxis(e,t){return cs.setFromAxisAngle(e,t),this.quaternion.premultiply(cs),this}rotateX(e){return this.rotateOnAxis(md,e)}rotateY(e){return this.rotateOnAxis(gd,e)}rotateZ(e){return this.rotateOnAxis(_d,e)}translateOnAxis(e,t){return pd.copy(e).applyQuaternion(this.quaternion),this.position.add(pd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(md,e)}translateY(e){return this.translateOnAxis(gd,e)}translateZ(e){return this.translateOnAxis(_d,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(wi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?lo.copy(e):lo.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ta.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wi.lookAt(ta,lo,this.up):wi.lookAt(lo,ta,this.up),this.quaternion.setFromRotationMatrix(wi),i&&(wi.extractRotation(i.matrixWorld),cs.setFromRotationMatrix(wi),this.quaternion.premultiply(cs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(vd),hs.child=e,this.dispatchEvent(hs),hs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(d0),$l.child=e,this.dispatchEvent($l),$l.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),wi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),wi.multiply(e.parent.matrixWorld)),e.applyMatrix4(wi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(vd),hs.child=e,this.dispatchEvent(hs),hs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ta,e,h0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ta,u0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),f=a(e.shapes),u=a(e.skeletons),d=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}gn.DEFAULT_UP=new q(0,1,0);gn.DEFAULT_MATRIX_AUTO_UPDATE=!0;gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ri=new q,Ai=new q,Kl=new q,Ri=new q,us=new q,ds=new q,xd=new q,Zl=new q,jl=new q,Jl=new q,Ql=new Ft,ec=new Ft,tc=new Ft;class li{constructor(e=new q,t=new q,n=new q){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),ri.subVectors(e,t),i.cross(ri);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){ri.subVectors(i,t),Ai.subVectors(n,t),Kl.subVectors(e,t);const a=ri.dot(ri),o=ri.dot(Ai),l=ri.dot(Kl),c=Ai.dot(Ai),h=Ai.dot(Kl),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const u=1/f,d=(c*l-o*h)*u,g=(a*h-o*l)*u;return s.set(1-d-g,g,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Ri)===null?!1:Ri.x>=0&&Ri.y>=0&&Ri.x+Ri.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,Ri)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ri.x),l.addScaledVector(a,Ri.y),l.addScaledVector(o,Ri.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return Ql.setScalar(0),ec.setScalar(0),tc.setScalar(0),Ql.fromBufferAttribute(e,t),ec.fromBufferAttribute(e,n),tc.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Ql,s.x),a.addScaledVector(ec,s.y),a.addScaledVector(tc,s.z),a}static isFrontFacing(e,t,n,i){return ri.subVectors(n,t),Ai.subVectors(e,t),ri.cross(Ai).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ri.subVectors(this.c,this.b),Ai.subVectors(this.a,this.b),ri.cross(Ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return li.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return li.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return li.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return li.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return li.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;us.subVectors(i,n),ds.subVectors(s,n),Zl.subVectors(e,n);const l=us.dot(Zl),c=ds.dot(Zl);if(l<=0&&c<=0)return t.copy(n);jl.subVectors(e,i);const h=us.dot(jl),f=ds.dot(jl);if(h>=0&&f<=h)return t.copy(i);const u=l*f-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(us,a);Jl.subVectors(e,s);const d=us.dot(Jl),g=ds.dot(Jl);if(g>=0&&d<=g)return t.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(ds,o);const p=h*g-d*f;if(p<=0&&f-h>=0&&d-g>=0)return xd.subVectors(s,i),o=(f-h)/(f-h+(d-g)),t.copy(i).addScaledVector(xd,o);const m=1/(p+_+u);return a=_*m,o=u*m,t.copy(n).addScaledVector(us,a).addScaledVector(ds,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const qp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},co={h:0,s:0,l:0};function nc(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class ct{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=mi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,dt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=dt.workingColorSpace){if(e=K_(e,1),t=yn(t,0,1),n=yn(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=nc(a,s,e+1/3),this.g=nc(a,s,e),this.b=nc(a,s,e-1/3)}return dt.toWorkingColorSpace(this,i),this}setStyle(e,t=mi){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=mi){const n=qp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ls(e.r),this.g=Ls(e.g),this.b=Ls(e.b),this}copyLinearToSRGB(e){return this.r=zl(e.r),this.g=zl(e.g),this.b=zl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=mi){return dt.fromWorkingColorSpace(tn.copy(this),e),Math.round(yn(tn.r*255,0,255))*65536+Math.round(yn(tn.g*255,0,255))*256+Math.round(yn(tn.b*255,0,255))}getHexString(e=mi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.fromWorkingColorSpace(tn.copy(this),t);const n=tn.r,i=tn.g,s=tn.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case n:l=(i-s)/f+(i<s?6:0);break;case i:l=(s-n)/f+2;break;case s:l=(n-i)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=dt.workingColorSpace){return dt.fromWorkingColorSpace(tn.copy(this),t),e.r=tn.r,e.g=tn.g,e.b=tn.b,e}getStyle(e=mi){dt.fromWorkingColorSpace(tn.copy(this),e);const t=tn.r,n=tn.g,i=tn.b;return e!==mi?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Zi),this.setHSL(Zi.h+e,Zi.s+t,Zi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Zi),e.getHSL(co);const n=kl(Zi.h,co.h,t),i=kl(Zi.s,co.s,t),s=kl(Zi.l,co.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const tn=new ct;ct.NAMES=qp;let f0=0;class Ys extends Xs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:f0++}),this.uuid=Fa(),this.name="",this.type="Material",this.blending=Ps,this.side=gr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kc,this.blendDst=Bc,this.blendEquation=Ir,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ct(0,0,0),this.blendAlpha=0,this.depthFunc=Bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=is,this.stencilZFail=is,this.stencilZPass=is,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ps&&(n.blending=this.blending),this.side!==gr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==kc&&(n.blendSrc=this.blendSrc),this.blendDst!==Bc&&(n.blendDst=this.blendDst),this.blendEquation!==Ir&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Bs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==is&&(n.stencilFail=this.stencilFail),this.stencilZFail!==is&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==is&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class hu extends Ys{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vi,this.combine=Pp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Bt=new q,ho=new yt;class ui{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ad,this.updateRanges=[],this.gpuType=Fi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ho.fromBufferAttribute(this,t),ho.applyMatrix3(e),this.setXY(t,ho.x,ho.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=js(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_n(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=js(t,this.array)),t}setX(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=js(t,this.array)),t}setY(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=js(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=js(t,this.array)),t}setW(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),n=_n(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),n=_n(n,this.array),i=_n(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),n=_n(n,this.array),i=_n(i,this.array),s=_n(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ad&&(e.usage=this.usage),e}}class $p extends ui{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Kp extends ui{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class di extends ui{constructor(e,t,n){super(new Float32Array(e),t,n)}}let p0=0;const Xn=new Lt,ic=new gn,fs=new q,Ln=new Ba,na=new Ba,qt=new q;class ei extends Xs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:p0++}),this.uuid=Fa(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Vp(e)?Kp:$p)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ze().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Xn.makeRotationFromQuaternion(e),this.applyMatrix4(Xn),this}rotateX(e){return Xn.makeRotationX(e),this.applyMatrix4(Xn),this}rotateY(e){return Xn.makeRotationY(e),this.applyMatrix4(Xn),this}rotateZ(e){return Xn.makeRotationZ(e),this.applyMatrix4(Xn),this}translate(e,t,n){return Xn.makeTranslation(e,t,n),this.applyMatrix4(Xn),this}scale(e,t,n){return Xn.makeScale(e,t,n),this.applyMatrix4(Xn),this}lookAt(e){return ic.lookAt(e),ic.updateMatrix(),this.applyMatrix4(ic.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fs).negate(),this.translate(fs.x,fs.y,fs.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new di(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ba);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Ln.setFromBufferAttribute(s),this.morphTargetsRelative?(qt.addVectors(this.boundingBox.min,Ln.min),this.boundingBox.expandByPoint(qt),qt.addVectors(this.boundingBox.max,Ln.max),this.boundingBox.expandByPoint(qt)):(this.boundingBox.expandByPoint(Ln.min),this.boundingBox.expandByPoint(Ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new za);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new q,1/0);return}if(e){const n=this.boundingSphere.center;if(Ln.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];na.setFromBufferAttribute(o),this.morphTargetsRelative?(qt.addVectors(Ln.min,na.min),Ln.expandByPoint(qt),qt.addVectors(Ln.max,na.max),Ln.expandByPoint(qt)):(Ln.expandByPoint(na.min),Ln.expandByPoint(na.max))}Ln.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)qt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(qt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)qt.fromBufferAttribute(o,c),l&&(fs.fromBufferAttribute(e,c),qt.add(fs)),i=Math.max(i,n.distanceToSquared(qt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ui(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<n.count;R++)o[R]=new q,l[R]=new q;const c=new q,h=new q,f=new q,u=new yt,d=new yt,g=new yt,_=new q,p=new q;function m(R,I,y){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,I),f.fromBufferAttribute(n,y),u.fromBufferAttribute(s,R),d.fromBufferAttribute(s,I),g.fromBufferAttribute(s,y),h.sub(c),f.sub(c),d.sub(u),g.sub(u);const b=1/(d.x*g.y-g.x*d.y);isFinite(b)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(b),p.copy(f).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(b),o[R].add(_),o[I].add(_),o[y].add(_),l[R].add(p),l[I].add(p),l[y].add(p))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let R=0,I=v.length;R<I;++R){const y=v[R],b=y.start,P=y.count;for(let U=b,k=b+P;U<k;U+=3)m(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const x=new q,M=new q,A=new q,T=new q;function S(R){A.fromBufferAttribute(i,R),T.copy(A);const I=o[R];x.copy(I),x.sub(A.multiplyScalar(A.dot(I))).normalize(),M.crossVectors(T,I);const b=M.dot(l[R])<0?-1:1;a.setXYZW(R,x.x,x.y,x.z,b)}for(let R=0,I=v.length;R<I;++R){const y=v[R],b=y.start,P=y.count;for(let U=b,k=b+P;U<k;U+=3)S(e.getX(U+0)),S(e.getX(U+1)),S(e.getX(U+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ui(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);const i=new q,s=new q,a=new q,o=new q,l=new q,c=new q,h=new q,f=new q;if(e)for(let u=0,d=e.count;u<d;u+=3){const g=e.getX(u+0),_=e.getX(u+1),p=e.getX(u+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),h.subVectors(a,s),f.subVectors(i,s),h.cross(f),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,d=t.count;u<d;u+=3)i.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),f.subVectors(i,s),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)qt.fromBufferAttribute(e,t),qt.normalize(),e.setXYZ(t,qt.x,qt.y,qt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,f=o.normalized,u=new c.constructor(l.length*h);let d=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?d=l[_]*o.data.stride+o.offset:d=l[_]*h;for(let m=0;m<h;m++)u[g++]=c[d++]}return new ui(u,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ei,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,f=c.length;h<f;h++){const u=c[h],d=e(u,n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){const d=c[f];h.push(d.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],f=s[c];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const yd=new Lt,Er=new cu,uo=new za,Sd=new q,fo=new q,po=new q,mo=new q,rc=new q,go=new q,Md=new q,_o=new q;class Si extends gn{constructor(e=new ei,t=new hu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){go.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],f=s[l];h!==0&&(rc.fromBufferAttribute(f,e),a?go.addScaledVector(rc,h):go.addScaledVector(rc.sub(t),h))}t.add(go)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),uo.copy(n.boundingSphere),uo.applyMatrix4(s),Er.copy(e.ray).recast(e.near),!(uo.containsPoint(Er.origin)===!1&&(Er.intersectSphere(uo,Sd)===null||Er.origin.distanceToSquared(Sd)>(e.far-e.near)**2))&&(yd.copy(s).invert(),Er.copy(e.ray).applyMatrix4(yd),!(n.boundingBox!==null&&Er.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Er)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,f=s.attributes.normal,u=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const p=u[g],m=a[p.materialIndex],v=Math.max(p.start,d.start),x=Math.min(o.count,Math.min(p.start+p.count,d.start+d.count));for(let M=v,A=x;M<A;M+=3){const T=o.getX(M),S=o.getX(M+1),R=o.getX(M+2);i=vo(this,m,e,n,c,h,f,T,S,R),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const v=o.getX(p),x=o.getX(p+1),M=o.getX(p+2);i=vo(this,a,e,n,c,h,f,v,x,M),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const p=u[g],m=a[p.materialIndex],v=Math.max(p.start,d.start),x=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let M=v,A=x;M<A;M+=3){const T=M,S=M+1,R=M+2;i=vo(this,m,e,n,c,h,f,T,S,R),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const v=p,x=p+1,M=p+2;i=vo(this,a,e,n,c,h,f,v,x,M),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function m0(r,e,t,n,i,s,a,o){let l;if(e.side===wn?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===gr,o),l===null)return null;_o.copy(o),_o.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(_o);return c<t.near||c>t.far?null:{distance:c,point:_o.clone(),object:r}}function vo(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,fo),r.getVertexPosition(l,po),r.getVertexPosition(c,mo);const h=m0(r,e,t,n,fo,po,mo,Md);if(h){const f=new q;li.getBarycoord(Md,fo,po,mo,f),i&&(h.uv=li.getInterpolatedAttribute(i,o,l,c,f,new yt)),s&&(h.uv1=li.getInterpolatedAttribute(s,o,l,c,f,new yt)),a&&(h.normal=li.getInterpolatedAttribute(a,o,l,c,f,new q),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new q,materialIndex:0};li.getNormal(fo,po,mo,u.normal),h.face=u,h.barycoord=f}return h}class Ha extends ei{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],f=[];let u=0,d=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new di(c,3)),this.setAttribute("normal",new di(h,3)),this.setAttribute("uv",new di(f,2));function g(_,p,m,v,x,M,A,T,S,R,I){const y=M/S,b=A/R,P=M/2,U=A/2,k=T/2,Y=S+1,z=R+1;let G=0,W=0;const re=new q;for(let D=0;D<z;D++){const oe=D*b-U;for(let Be=0;Be<Y;Be++){const Xe=Be*y-P;re[_]=Xe*v,re[p]=oe*x,re[m]=k,c.push(re.x,re.y,re.z),re[_]=0,re[p]=0,re[m]=T>0?1:-1,h.push(re.x,re.y,re.z),f.push(Be/S),f.push(1-D/R),G+=1}}for(let D=0;D<R;D++)for(let oe=0;oe<S;oe++){const Be=u+oe+Y*D,Xe=u+oe+Y*(D+1),$=u+(oe+1)+Y*(D+1),Q=u+(oe+1)+Y*D;l.push(Be,Xe,Q),l.push(Xe,$,Q),W+=6}o.addGroup(d,W,I),d+=W,u+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ha(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ws(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function hn(r){const e={};for(let t=0;t<r.length;t++){const n=Ws(r[t]);for(const i in n)e[i]=n[i]}return e}function g0(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Zp(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:dt.workingColorSpace}const _0={clone:Ws,merge:hn};var v0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,x0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _r extends Ys{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=v0,this.fragmentShader=x0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ws(e.uniforms),this.uniformsGroups=g0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class jp extends gn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Lt,this.projectionMatrix=new Lt,this.projectionMatrixInverse=new Lt,this.coordinateSystem=ki}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ji=new q,bd=new yt,Ed=new yt;class Kn extends jp{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=bh*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Fl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return bh*2*Math.atan(Math.tan(Fl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ji.x,ji.y).multiplyScalar(-e/ji.z),ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ji.x,ji.y).multiplyScalar(-e/ji.z)}getViewSize(e,t){return this.getViewBounds(e,bd,Ed),t.subVectors(Ed,bd)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Fl*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ps=-90,ms=1;class y0 extends gn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Kn(ps,ms,e,t);i.layers=this.layers,this.add(i);const s=new Kn(ps,ms,e,t);s.layers=this.layers,this.add(s);const a=new Kn(ps,ms,e,t);a.layers=this.layers,this.add(a);const o=new Kn(ps,ms,e,t);o.layers=this.layers,this.add(o);const l=new Kn(ps,ms,e,t);l.layers=this.layers,this.add(l);const c=new Kn(ps,ms,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===ki)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===sl)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(f,u,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Jp extends An{constructor(e,t,n,i,s,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:zs,super(e,t,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class S0 extends Zr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Jp(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:oi}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Ha(5,5,5),s=new _r({name:"CubemapFromEquirect",uniforms:Ws(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:wn,blending:cr});s.uniforms.tEquirect.value=t;const a=new Si(i,s),o=t.minFilter;return t.minFilter===kr&&(t.minFilter=oi),new y0(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}const sc=new q,M0=new q,b0=new Ze;class Dr{constructor(e=new q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=sc.subVectors(n,t).cross(M0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(sc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||b0.getNormalMatrix(e),i=this.coplanarPoint(sc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Tr=new za,xo=new q;class Qp{constructor(e=new Dr,t=new Dr,n=new Dr,i=new Dr,s=new Dr,a=new Dr){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ki){const n=this.planes,i=e.elements,s=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],f=i[6],u=i[7],d=i[8],g=i[9],_=i[10],p=i[11],m=i[12],v=i[13],x=i[14],M=i[15];if(n[0].setComponents(l-s,u-c,p-d,M-m).normalize(),n[1].setComponents(l+s,u+c,p+d,M+m).normalize(),n[2].setComponents(l+a,u+h,p+g,M+v).normalize(),n[3].setComponents(l-a,u-h,p-g,M-v).normalize(),n[4].setComponents(l-o,u-f,p-_,M-x).normalize(),t===ki)n[5].setComponents(l+o,u+f,p+_,M+x).normalize();else if(t===sl)n[5].setComponents(o,f,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Tr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Tr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Tr)}intersectsSprite(e){return Tr.center.set(0,0,0),Tr.radius=.7071067811865476,Tr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Tr)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(xo.x=i.normal.x>0?e.max.x:e.min.x,xo.y=i.normal.y>0?e.max.y:e.min.y,xo.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(xo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function em(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function E0(r){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,f=c.byteLength,u=r.createBuffer();r.bindBuffer(l,u),r.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=r.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=r.SHORT;else if(c instanceof Uint32Array)d=r.UNSIGNED_INT;else if(c instanceof Int32Array)d=r.INT;else if(c instanceof Int8Array)d=r.BYTE;else if(c instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){const h=l.array,f=l.updateRanges;if(r.bindBuffer(c,o),f.length===0)r.bufferSubData(c,0,h);else{f.sort((d,g)=>d.start-g.start);let u=0;for(let d=1;d<f.length;d++){const g=f[u],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,f[u]=_)}f.length=u+1;for(let d=0,g=f.length;d<g;d++){const _=f[d];r.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}class gl extends ei{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,f=e/o,u=t/l,d=[],g=[],_=[],p=[];for(let m=0;m<h;m++){const v=m*u-a;for(let x=0;x<c;x++){const M=x*f-s;g.push(M,-v,0),_.push(0,0,1),p.push(x/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let v=0;v<o;v++){const x=v+c*m,M=v+c*(m+1),A=v+1+c*(m+1),T=v+1+c*m;d.push(x,M,T),d.push(M,A,T)}this.setIndex(d),this.setAttribute("position",new di(g,3)),this.setAttribute("normal",new di(_,3)),this.setAttribute("uv",new di(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gl(e.width,e.height,e.widthSegments,e.heightSegments)}}var T0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,w0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,A0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,R0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,C0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,P0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,D0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,L0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,I0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,U0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,N0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,O0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,F0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,k0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,B0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,z0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,H0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,G0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,V0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,W0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,X0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Y0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,q0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,$0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,K0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Z0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,j0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,J0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Q0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ev=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tv="gl_FragColor = linearToOutputTexel( gl_FragColor );",nv=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,iv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,rv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,sv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,av=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ov=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,lv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,hv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,uv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,fv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,pv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,mv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,_v=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,vv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Sv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Mv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,bv=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ev=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Tv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,wv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Av=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Rv=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Dv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Lv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Iv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Uv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ov=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Fv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,kv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Bv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Hv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Vv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Wv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,qv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,$v=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Kv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Jv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Qv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ex=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,nx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ix=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ax=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,ox=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,lx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,cx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,hx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ux=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,dx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,px=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_x=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,vx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,xx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,yx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,bx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ex=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ax=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Px=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Dx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Lx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ix=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ux=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Nx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ox=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Bx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Vx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Xx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Yx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$x=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Kx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Qx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ey=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ty=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ny=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,iy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ke={alphahash_fragment:T0,alphahash_pars_fragment:w0,alphamap_fragment:A0,alphamap_pars_fragment:R0,alphatest_fragment:C0,alphatest_pars_fragment:P0,aomap_fragment:D0,aomap_pars_fragment:L0,batching_pars_vertex:I0,batching_vertex:U0,begin_vertex:N0,beginnormal_vertex:O0,bsdfs:F0,iridescence_fragment:k0,bumpmap_pars_fragment:B0,clipping_planes_fragment:z0,clipping_planes_pars_fragment:H0,clipping_planes_pars_vertex:G0,clipping_planes_vertex:V0,color_fragment:W0,color_pars_fragment:X0,color_pars_vertex:Y0,color_vertex:q0,common:$0,cube_uv_reflection_fragment:K0,defaultnormal_vertex:Z0,displacementmap_pars_vertex:j0,displacementmap_vertex:J0,emissivemap_fragment:Q0,emissivemap_pars_fragment:ev,colorspace_fragment:tv,colorspace_pars_fragment:nv,envmap_fragment:iv,envmap_common_pars_fragment:rv,envmap_pars_fragment:sv,envmap_pars_vertex:av,envmap_physical_pars_fragment:_v,envmap_vertex:ov,fog_vertex:lv,fog_pars_vertex:cv,fog_fragment:hv,fog_pars_fragment:uv,gradientmap_pars_fragment:dv,lightmap_pars_fragment:fv,lights_lambert_fragment:pv,lights_lambert_pars_fragment:mv,lights_pars_begin:gv,lights_toon_fragment:vv,lights_toon_pars_fragment:xv,lights_phong_fragment:yv,lights_phong_pars_fragment:Sv,lights_physical_fragment:Mv,lights_physical_pars_fragment:bv,lights_fragment_begin:Ev,lights_fragment_maps:Tv,lights_fragment_end:wv,logdepthbuf_fragment:Av,logdepthbuf_pars_fragment:Rv,logdepthbuf_pars_vertex:Cv,logdepthbuf_vertex:Pv,map_fragment:Dv,map_pars_fragment:Lv,map_particle_fragment:Iv,map_particle_pars_fragment:Uv,metalnessmap_fragment:Nv,metalnessmap_pars_fragment:Ov,morphinstance_vertex:Fv,morphcolor_vertex:kv,morphnormal_vertex:Bv,morphtarget_pars_vertex:zv,morphtarget_vertex:Hv,normal_fragment_begin:Gv,normal_fragment_maps:Vv,normal_pars_fragment:Wv,normal_pars_vertex:Xv,normal_vertex:Yv,normalmap_pars_fragment:qv,clearcoat_normal_fragment_begin:$v,clearcoat_normal_fragment_maps:Kv,clearcoat_pars_fragment:Zv,iridescence_pars_fragment:jv,opaque_fragment:Jv,packing:Qv,premultiplied_alpha_fragment:ex,project_vertex:tx,dithering_fragment:nx,dithering_pars_fragment:ix,roughnessmap_fragment:rx,roughnessmap_pars_fragment:sx,shadowmap_pars_fragment:ax,shadowmap_pars_vertex:ox,shadowmap_vertex:lx,shadowmask_pars_fragment:cx,skinbase_vertex:hx,skinning_pars_vertex:ux,skinning_vertex:dx,skinnormal_vertex:fx,specularmap_fragment:px,specularmap_pars_fragment:mx,tonemapping_fragment:gx,tonemapping_pars_fragment:_x,transmission_fragment:vx,transmission_pars_fragment:xx,uv_pars_fragment:yx,uv_pars_vertex:Sx,uv_vertex:Mx,worldpos_vertex:bx,background_vert:Ex,background_frag:Tx,backgroundCube_vert:wx,backgroundCube_frag:Ax,cube_vert:Rx,cube_frag:Cx,depth_vert:Px,depth_frag:Dx,distanceRGBA_vert:Lx,distanceRGBA_frag:Ix,equirect_vert:Ux,equirect_frag:Nx,linedashed_vert:Ox,linedashed_frag:Fx,meshbasic_vert:kx,meshbasic_frag:Bx,meshlambert_vert:zx,meshlambert_frag:Hx,meshmatcap_vert:Gx,meshmatcap_frag:Vx,meshnormal_vert:Wx,meshnormal_frag:Xx,meshphong_vert:Yx,meshphong_frag:qx,meshphysical_vert:$x,meshphysical_frag:Kx,meshtoon_vert:Zx,meshtoon_frag:jx,points_vert:Jx,points_frag:Qx,shadow_vert:ey,shadow_frag:ty,sprite_vert:ny,sprite_frag:iy},me={common:{diffuse:{value:new ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new ct(16777215)},opacity:{value:1},center:{value:new yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},gi={basic:{uniforms:hn([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:hn([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new ct(0)}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:hn([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new ct(0)},specular:{value:new ct(1118481)},shininess:{value:30}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:hn([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:hn([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new ct(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:hn([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:hn([me.points,me.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:hn([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:hn([me.common,me.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:hn([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:hn([me.sprite,me.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distanceRGBA:{uniforms:hn([me.common,me.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distanceRGBA_vert,fragmentShader:Ke.distanceRGBA_frag},shadow:{uniforms:hn([me.lights,me.fog,{color:{value:new ct(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};gi.physical={uniforms:hn([gi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new ct(0)},specularColor:{value:new ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const yo={r:0,b:0,g:0},wr=new Vi,ry=new Lt;function sy(r,e,t,n,i,s,a){const o=new ct(0);let l=s===!0?0:1,c,h,f=null,u=0,d=null;function g(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?t:e).get(x)),x}function _(v){let x=!1;const M=g(v);M===null?m(o,l):M&&M.isColor&&(m(M,1),x=!0);const A=r.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function p(v,x){const M=g(x);M&&(M.isCubeTexture||M.mapping===pl)?(h===void 0&&(h=new Si(new Ha(1,1,1),new _r({name:"BackgroundCubeMaterial",uniforms:Ws(gi.backgroundCube.uniforms),vertexShader:gi.backgroundCube.vertexShader,fragmentShader:gi.backgroundCube.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,T,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),wr.copy(x.backgroundRotation),wr.x*=-1,wr.y*=-1,wr.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(wr.y*=-1,wr.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ry.makeRotationFromEuler(wr)),h.material.toneMapped=dt.getTransfer(M.colorSpace)!==bt,(f!==M||u!==M.version||d!==r.toneMapping)&&(h.material.needsUpdate=!0,f=M,u=M.version,d=r.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Si(new gl(2,2),new _r({name:"BackgroundMaterial",uniforms:Ws(gi.background.uniforms),vertexShader:gi.background.vertexShader,fragmentShader:gi.background.fragmentShader,side:gr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=dt.getTransfer(M.colorSpace)!==bt,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(f!==M||u!==M.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,f=M,u=M.version,d=r.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function m(v,x){v.getRGB(yo,Zp(r)),n.buffers.color.setClear(yo.r,yo.g,yo.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(v,x=1){o.set(v),l=x,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,m(o,l)},render:_,addToRenderList:p}}function ay(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=u(null);let s=i,a=!1;function o(y,b,P,U,k){let Y=!1;const z=f(U,P,b);s!==z&&(s=z,c(s.object)),Y=d(y,U,P,k),Y&&g(y,U,P,k),k!==null&&e.update(k,r.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,M(y,b,P,U),k!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function l(){return r.createVertexArray()}function c(y){return r.bindVertexArray(y)}function h(y){return r.deleteVertexArray(y)}function f(y,b,P){const U=P.wireframe===!0;let k=n[y.id];k===void 0&&(k={},n[y.id]=k);let Y=k[b.id];Y===void 0&&(Y={},k[b.id]=Y);let z=Y[U];return z===void 0&&(z=u(l()),Y[U]=z),z}function u(y){const b=[],P=[],U=[];for(let k=0;k<t;k++)b[k]=0,P[k]=0,U[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:b,enabledAttributes:P,attributeDivisors:U,object:y,attributes:{},index:null}}function d(y,b,P,U){const k=s.attributes,Y=b.attributes;let z=0;const G=P.getAttributes();for(const W in G)if(G[W].location>=0){const D=k[W];let oe=Y[W];if(oe===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(oe=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(oe=y.instanceColor)),D===void 0||D.attribute!==oe||oe&&D.data!==oe.data)return!0;z++}return s.attributesNum!==z||s.index!==U}function g(y,b,P,U){const k={},Y=b.attributes;let z=0;const G=P.getAttributes();for(const W in G)if(G[W].location>=0){let D=Y[W];D===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(D=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(D=y.instanceColor));const oe={};oe.attribute=D,D&&D.data&&(oe.data=D.data),k[W]=oe,z++}s.attributes=k,s.attributesNum=z,s.index=U}function _(){const y=s.newAttributes;for(let b=0,P=y.length;b<P;b++)y[b]=0}function p(y){m(y,0)}function m(y,b){const P=s.newAttributes,U=s.enabledAttributes,k=s.attributeDivisors;P[y]=1,U[y]===0&&(r.enableVertexAttribArray(y),U[y]=1),k[y]!==b&&(r.vertexAttribDivisor(y,b),k[y]=b)}function v(){const y=s.newAttributes,b=s.enabledAttributes;for(let P=0,U=b.length;P<U;P++)b[P]!==y[P]&&(r.disableVertexAttribArray(P),b[P]=0)}function x(y,b,P,U,k,Y,z){z===!0?r.vertexAttribIPointer(y,b,P,k,Y):r.vertexAttribPointer(y,b,P,U,k,Y)}function M(y,b,P,U){_();const k=U.attributes,Y=P.getAttributes(),z=b.defaultAttributeValues;for(const G in Y){const W=Y[G];if(W.location>=0){let re=k[G];if(re===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(re=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(re=y.instanceColor)),re!==void 0){const D=re.normalized,oe=re.itemSize,Be=e.get(re);if(Be===void 0)continue;const Xe=Be.buffer,$=Be.type,Q=Be.bytesPerElement,de=$===r.INT||$===r.UNSIGNED_INT||re.gpuType===nu;if(re.isInterleavedBufferAttribute){const ae=re.data,we=ae.stride,Me=re.offset;if(ae.isInstancedInterleavedBuffer){for(let We=0;We<W.locationSize;We++)m(W.location+We,ae.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let We=0;We<W.locationSize;We++)p(W.location+We);r.bindBuffer(r.ARRAY_BUFFER,Xe);for(let We=0;We<W.locationSize;We++)x(W.location+We,oe/W.locationSize,$,D,we*Q,(Me+oe/W.locationSize*We)*Q,de)}else{if(re.isInstancedBufferAttribute){for(let ae=0;ae<W.locationSize;ae++)m(W.location+ae,re.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ae=0;ae<W.locationSize;ae++)p(W.location+ae);r.bindBuffer(r.ARRAY_BUFFER,Xe);for(let ae=0;ae<W.locationSize;ae++)x(W.location+ae,oe/W.locationSize,$,D,oe*Q,oe/W.locationSize*ae*Q,de)}}else if(z!==void 0){const D=z[G];if(D!==void 0)switch(D.length){case 2:r.vertexAttrib2fv(W.location,D);break;case 3:r.vertexAttrib3fv(W.location,D);break;case 4:r.vertexAttrib4fv(W.location,D);break;default:r.vertexAttrib1fv(W.location,D)}}}}v()}function A(){R();for(const y in n){const b=n[y];for(const P in b){const U=b[P];for(const k in U)h(U[k].object),delete U[k];delete b[P]}delete n[y]}}function T(y){if(n[y.id]===void 0)return;const b=n[y.id];for(const P in b){const U=b[P];for(const k in U)h(U[k].object),delete U[k];delete b[P]}delete n[y.id]}function S(y){for(const b in n){const P=n[b];if(P[y.id]===void 0)continue;const U=P[y.id];for(const k in U)h(U[k].object),delete U[k];delete P[y.id]}}function R(){I(),a=!0,s!==i&&(s=i,c(s.object))}function I(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:R,resetDefaultState:I,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfProgram:S,initAttributes:_,enableAttribute:p,disableUnusedAttributes:v}}function oy(r,e,t){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,f){f!==0&&(r.drawArraysInstanced(n,c,h,f),t.update(h,n,f))}function o(c,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,f);let d=0;for(let g=0;g<f;g++)d+=h[g];t.update(d,n,1)}function l(c,h,f,u){if(f===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)a(c[g],h[g],u[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,f);let g=0;for(let _=0;_<f;_++)g+=h[_];for(let _=0;_<u.length;_++)t.update(g,n,u[_])}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function ly(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const S=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(S){return!(S!==hi&&n.convert(S)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(S){const R=S===Oa&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(S!==Gi&&n.convert(S)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&S!==Fi&&!R)}function l(S){if(S==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const f=t.logarithmicDepthBuffer===!0,u=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(u===!0){const S=e.get("EXT_clip_control");S.clipControlEXT(S.LOWER_LEFT_EXT,S.ZERO_TO_ONE_EXT)}const d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),p=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),v=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),x=r.getParameter(r.MAX_VARYING_VECTORS),M=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,T=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:u,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:v,maxVaryings:x,maxFragmentUniforms:M,vertexTextures:A,maxSamples:T}}function cy(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new Dr,o=new Ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const d=f.length!==0||u||n!==0||i;return i=u,n=f.length,d},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,d){const g=f.clippingPlanes,_=f.clipIntersection,p=f.clipShadows,m=r.get(f);if(!i||g===null||g.length===0||s&&!p)s?h(null):c();else{const v=s?0:n,x=v*4;let M=m.clippingState||null;l.value=M,M=h(g,u,x,d);for(let A=0;A!==x;++A)M[A]=t[A];m.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,u,d,g){const _=f!==null?f.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const m=d+_*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(p===null||p.length<m)&&(p=new Float32Array(m));for(let x=0,M=d;x!==_;++x,M+=4)a.copy(f[x]).applyMatrix4(v,o),a.normal.toArray(p,M),p[M+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function hy(r){let e=new WeakMap;function t(a,o){return o===qc?a.mapping=zs:o===$c&&(a.mapping=Hs),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===qc||o===$c)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new S0(l.height);return c.fromEquirectangularTexture(r,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class uy extends jp{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ms=4,Td=[.125,.215,.35,.446,.526,.582],Ur=20,ac=new uy,wd=new ct;let oc=null,lc=0,cc=0,hc=!1;const Lr=(1+Math.sqrt(5))/2,gs=1/Lr,Ad=[new q(-Lr,gs,0),new q(Lr,gs,0),new q(-gs,0,Lr),new q(gs,0,Lr),new q(0,Lr,-gs),new q(0,Lr,gs),new q(-1,1,-1),new q(1,1,-1),new q(-1,1,1),new q(1,1,1)];class Rd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){oc=this._renderer.getRenderTarget(),lc=this._renderer.getActiveCubeFace(),cc=this._renderer.getActiveMipmapLevel(),hc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Pd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(oc,lc,cc),this._renderer.xr.enabled=hc,e.scissorTest=!1,So(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===zs||e.mapping===Hs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),oc=this._renderer.getRenderTarget(),lc=this._renderer.getActiveCubeFace(),cc=this._renderer.getActiveMipmapLevel(),hc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:oi,minFilter:oi,generateMipmaps:!1,type:Oa,format:hi,colorSpace:xr,depthBuffer:!1},i=Cd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cd(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=dy(s)),this._blurMaterial=fy(s,e,t)}return i}_compileMaterial(e){const t=new Si(this._lodPlanes[0],e);this._renderer.compile(t,ac)}_sceneToCubeUV(e,t,n,i){const o=new Kn(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,u=h.toneMapping;h.getClearColor(wd),h.toneMapping=hr,h.autoClear=!1;const d=new hu({name:"PMREM.Background",side:wn,depthWrite:!1,depthTest:!1}),g=new Si(new Ha,d);let _=!1;const p=e.background;p?p.isColor&&(d.color.copy(p),e.background=null,_=!0):(d.color.copy(wd),_=!0);for(let m=0;m<6;m++){const v=m%3;v===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):v===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));const x=this._cubeSize;So(i,v*x,m>2?x:0,x,x),h.setRenderTarget(i),_&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=f,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===zs||e.mapping===Hs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Pd());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new Si(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;So(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ac)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Ad[(i-s-1)%Ad.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new Si(this._lodPlanes[i],c),u=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Ur-1),_=s/g,p=isFinite(s)?1+Math.floor(h*_):Ur;p>Ur&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Ur}`);const m=[];let v=0;for(let S=0;S<Ur;++S){const R=S/_,I=Math.exp(-R*R/2);m.push(I),S===0?v+=I:S<p&&(v+=2*I)}for(let S=0;S<m.length;S++)m[S]=m[S]/v;u.envMap.value=e.texture,u.samples.value=p,u.weights.value=m,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:x}=this;u.dTheta.value=g,u.mipInt.value=x-n;const M=this._sizeLods[i],A=3*M*(i>x-Ms?i-x+Ms:0),T=4*(this._cubeSize-M);So(t,A,T,3*M,2*M),l.setRenderTarget(t),l.render(f,ac)}}function dy(r){const e=[],t=[],n=[];let i=r;const s=r-Ms+1+Td.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);t.push(o);let l=1/o;a>r-Ms?l=Td[a-r+Ms-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,f=1+c,u=[h,h,f,h,f,f,h,h,f,f,h,f],d=6,g=6,_=3,p=2,m=1,v=new Float32Array(_*g*d),x=new Float32Array(p*g*d),M=new Float32Array(m*g*d);for(let T=0;T<d;T++){const S=T%3*2/3-1,R=T>2?0:-1,I=[S,R,0,S+2/3,R,0,S+2/3,R+1,0,S,R,0,S+2/3,R+1,0,S,R+1,0];v.set(I,_*g*T),x.set(u,p*g*T);const y=[T,T,T,T,T,T];M.set(y,m*g*T)}const A=new ei;A.setAttribute("position",new ui(v,_)),A.setAttribute("uv",new ui(x,p)),A.setAttribute("faceIndex",new ui(M,m)),e.push(A),i>Ms&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Cd(r,e,t){const n=new Zr(r,e,t);return n.texture.mapping=pl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function So(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function fy(r,e,t){const n=new Float32Array(Ur),i=new q(0,1,0);return new _r({name:"SphericalGaussianBlur",defines:{n:Ur,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:uu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:cr,depthTest:!1,depthWrite:!1})}function Pd(){return new _r({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:uu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:cr,depthTest:!1,depthWrite:!1})}function Dd(){return new _r({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:uu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:cr,depthTest:!1,depthWrite:!1})}function uu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function py(r){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===qc||l===$c,h=l===zs||l===Hs;if(c||h){let f=e.get(o);const u=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new Rd(r)),f=c?t.fromEquirectangular(o,f):t.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),f.texture;if(f!==void 0)return f.texture;{const d=o.image;return c&&d&&d.height>0||h&&d&&i(d)?(t===null&&(t=new Rd(r)),f=c?t.fromEquirectangular(o):t.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),o.addEventListener("dispose",s),f.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function my(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Go("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function gy(r,e,t,n){const i={},s=new WeakMap;function a(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);for(const g in u.morphAttributes){const _=u.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)e.remove(_[p])}u.removeEventListener("dispose",a),delete i[u.id];const d=s.get(u);d&&(e.remove(d),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,t.memory.geometries++),u}function l(f){const u=f.attributes;for(const g in u)e.update(u[g],r.ARRAY_BUFFER);const d=f.morphAttributes;for(const g in d){const _=d[g];for(let p=0,m=_.length;p<m;p++)e.update(_[p],r.ARRAY_BUFFER)}}function c(f){const u=[],d=f.index,g=f.attributes.position;let _=0;if(d!==null){const v=d.array;_=d.version;for(let x=0,M=v.length;x<M;x+=3){const A=v[x+0],T=v[x+1],S=v[x+2];u.push(A,T,T,S,S,A)}}else if(g!==void 0){const v=g.array;_=g.version;for(let x=0,M=v.length/3-1;x<M;x+=3){const A=x+0,T=x+1,S=x+2;u.push(A,T,T,S,S,A)}}else return;const p=new(Vp(u)?Kp:$p)(u,1);p.version=_;const m=s.get(f);m&&e.remove(m),s.set(f,p)}function h(f){const u=s.get(f);if(u){const d=f.index;d!==null&&u.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:h}}function _y(r,e,t){let n;function i(u){n=u}let s,a;function o(u){s=u.type,a=u.bytesPerElement}function l(u,d){r.drawElements(n,d,s,u*a),t.update(d,n,1)}function c(u,d,g){g!==0&&(r.drawElementsInstanced(n,d,s,u*a,g),t.update(d,n,g))}function h(u,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,u,0,g);let p=0;for(let m=0;m<g;m++)p+=d[m];t.update(p,n,1)}function f(u,d,g,_){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<u.length;m++)c(u[m]/a,d[m],_[m]);else{p.multiDrawElementsInstancedWEBGL(n,d,0,s,u,0,_,0,g);let m=0;for(let v=0;v<g;v++)m+=d[v];for(let v=0;v<_.length;v++)t.update(m,n,_[v])}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function vy(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function xy(r,e,t){const n=new WeakMap,i=new Ft;function s(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==f){let y=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",y)};var d=y;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),_===!0&&(M=2),p===!0&&(M=3);let A=o.attributes.position.count*M,T=1;A>e.maxTextureSize&&(T=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const S=new Float32Array(A*T*4*f),R=new Xp(S,A,T,f);R.type=Fi,R.needsUpdate=!0;const I=M*4;for(let b=0;b<f;b++){const P=m[b],U=v[b],k=x[b],Y=A*T*4*b;for(let z=0;z<P.count;z++){const G=z*I;g===!0&&(i.fromBufferAttribute(P,z),S[Y+G+0]=i.x,S[Y+G+1]=i.y,S[Y+G+2]=i.z,S[Y+G+3]=0),_===!0&&(i.fromBufferAttribute(U,z),S[Y+G+4]=i.x,S[Y+G+5]=i.y,S[Y+G+6]=i.z,S[Y+G+7]=0),p===!0&&(i.fromBufferAttribute(k,z),S[Y+G+8]=i.x,S[Y+G+9]=i.y,S[Y+G+10]=i.z,S[Y+G+11]=k.itemSize===4?i.w:1)}}u={count:f,texture:R,size:new yt(A,T)},n.set(o,u),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const _=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(r,"morphTargetBaseInfluence",_),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}return{update:s}}function yy(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,f=e.get(l,h);if(i.get(f)!==c&&(e.update(f),i.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return f}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class tm extends An{constructor(e,t,n,i,s,a,o,l,c,h=Ds){if(h!==Ds&&h!==Vs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ds&&(n=Kr),n===void 0&&h===Vs&&(n=Gs),super(null,i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Jn,this.minFilter=l!==void 0?l:Jn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const nm=new An,Ld=new tm(1,1),im=new Xp,rm=new s0,sm=new Jp,Id=[],Ud=[],Nd=new Float32Array(16),Od=new Float32Array(9),Fd=new Float32Array(4);function qs(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Id[i];if(s===void 0&&(s=new Float32Array(i),Id[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Wt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Xt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function _l(r,e){let t=Ud[e];t===void 0&&(t=new Int32Array(e),Ud[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Sy(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function My(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;r.uniform2fv(this.addr,e),Xt(t,e)}}function by(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Wt(t,e))return;r.uniform3fv(this.addr,e),Xt(t,e)}}function Ey(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;r.uniform4fv(this.addr,e),Xt(t,e)}}function Ty(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Fd.set(n),r.uniformMatrix2fv(this.addr,!1,Fd),Xt(t,n)}}function wy(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Od.set(n),r.uniformMatrix3fv(this.addr,!1,Od),Xt(t,n)}}function Ay(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Nd.set(n),r.uniformMatrix4fv(this.addr,!1,Nd),Xt(t,n)}}function Ry(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Cy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;r.uniform2iv(this.addr,e),Xt(t,e)}}function Py(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;r.uniform3iv(this.addr,e),Xt(t,e)}}function Dy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;r.uniform4iv(this.addr,e),Xt(t,e)}}function Ly(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Iy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;r.uniform2uiv(this.addr,e),Xt(t,e)}}function Uy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;r.uniform3uiv(this.addr,e),Xt(t,e)}}function Ny(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;r.uniform4uiv(this.addr,e),Xt(t,e)}}function Oy(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Ld.compareFunction=Gp,s=Ld):s=nm,t.setTexture2D(e||s,i)}function Fy(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||rm,i)}function ky(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||sm,i)}function By(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||im,i)}function zy(r){switch(r){case 5126:return Sy;case 35664:return My;case 35665:return by;case 35666:return Ey;case 35674:return Ty;case 35675:return wy;case 35676:return Ay;case 5124:case 35670:return Ry;case 35667:case 35671:return Cy;case 35668:case 35672:return Py;case 35669:case 35673:return Dy;case 5125:return Ly;case 36294:return Iy;case 36295:return Uy;case 36296:return Ny;case 35678:case 36198:case 36298:case 36306:case 35682:return Oy;case 35679:case 36299:case 36307:return Fy;case 35680:case 36300:case 36308:case 36293:return ky;case 36289:case 36303:case 36311:case 36292:return By}}function Hy(r,e){r.uniform1fv(this.addr,e)}function Gy(r,e){const t=qs(e,this.size,2);r.uniform2fv(this.addr,t)}function Vy(r,e){const t=qs(e,this.size,3);r.uniform3fv(this.addr,t)}function Wy(r,e){const t=qs(e,this.size,4);r.uniform4fv(this.addr,t)}function Xy(r,e){const t=qs(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Yy(r,e){const t=qs(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function qy(r,e){const t=qs(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function $y(r,e){r.uniform1iv(this.addr,e)}function Ky(r,e){r.uniform2iv(this.addr,e)}function Zy(r,e){r.uniform3iv(this.addr,e)}function jy(r,e){r.uniform4iv(this.addr,e)}function Jy(r,e){r.uniform1uiv(this.addr,e)}function Qy(r,e){r.uniform2uiv(this.addr,e)}function eS(r,e){r.uniform3uiv(this.addr,e)}function tS(r,e){r.uniform4uiv(this.addr,e)}function nS(r,e,t){const n=this.cache,i=e.length,s=_l(t,i);Wt(n,s)||(r.uniform1iv(this.addr,s),Xt(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||nm,s[a])}function iS(r,e,t){const n=this.cache,i=e.length,s=_l(t,i);Wt(n,s)||(r.uniform1iv(this.addr,s),Xt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||rm,s[a])}function rS(r,e,t){const n=this.cache,i=e.length,s=_l(t,i);Wt(n,s)||(r.uniform1iv(this.addr,s),Xt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||sm,s[a])}function sS(r,e,t){const n=this.cache,i=e.length,s=_l(t,i);Wt(n,s)||(r.uniform1iv(this.addr,s),Xt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||im,s[a])}function aS(r){switch(r){case 5126:return Hy;case 35664:return Gy;case 35665:return Vy;case 35666:return Wy;case 35674:return Xy;case 35675:return Yy;case 35676:return qy;case 5124:case 35670:return $y;case 35667:case 35671:return Ky;case 35668:case 35672:return Zy;case 35669:case 35673:return jy;case 5125:return Jy;case 36294:return Qy;case 36295:return eS;case 36296:return tS;case 35678:case 36198:case 36298:case 36306:case 35682:return nS;case 35679:case 36299:case 36307:return iS;case 35680:case 36300:case 36308:case 36293:return rS;case 36289:case 36303:case 36311:case 36292:return sS}}class oS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=zy(t.type)}}class lS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=aS(t.type)}}class cS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const uc=/(\w+)(\])?(\[|\.)?/g;function kd(r,e){r.seq.push(e),r.map[e.id]=e}function hS(r,e,t){const n=r.name,i=n.length;for(uc.lastIndex=0;;){const s=uc.exec(n),a=uc.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){kd(t,c===void 0?new oS(o,r,e):new lS(o,r,e));break}else{let f=t.map[o];f===void 0&&(f=new cS(o),kd(t,f)),t=f}}}class Vo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),a=e.getUniformLocation(t,s.name);hS(s,a,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Bd(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const uS=37297;let dS=0;function fS(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function pS(r){const e=dt.getPrimaries(dt.workingColorSpace),t=dt.getPrimaries(r);let n;switch(e===t?n="":e===rl&&t===il?n="LinearDisplayP3ToLinearSRGB":e===il&&t===rl&&(n="LinearSRGBToLinearDisplayP3"),r){case xr:case ml:return[n,"LinearTransferOETF"];case mi:case lu:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function zd(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+fS(r.getShaderSource(e),a)}else return i}function mS(r,e){const t=pS(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function gS(r,e){let t;switch(e){case P_:t="Linear";break;case D_:t="Reinhard";break;case L_:t="Cineon";break;case I_:t="ACESFilmic";break;case N_:t="AgX";break;case O_:t="Neutral";break;case U_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Mo=new q;function _S(){dt.getLuminanceCoefficients(Mo);const r=Mo.x.toFixed(4),e=Mo.y.toFixed(4),t=Mo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vS(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ua).join(`
`)}function xS(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function yS(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function ua(r){return r!==""}function Hd(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Gd(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const SS=/^[ \t]*#include +<([\w\d./]+)>/gm;function Eh(r){return r.replace(SS,bS)}const MS=new Map;function bS(r,e){let t=Ke[e];if(t===void 0){const n=MS.get(e);if(n!==void 0)t=Ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Eh(t)}const ES=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vd(r){return r.replace(ES,TS)}function TS(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Wd(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function wS(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Cp?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===c_?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Ci&&(e="SHADOWMAP_TYPE_VSM"),e}function AS(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case zs:case Hs:e="ENVMAP_TYPE_CUBE";break;case pl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function RS(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Hs:e="ENVMAP_MODE_REFRACTION";break}return e}function CS(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Pp:e="ENVMAP_BLENDING_MULTIPLY";break;case R_:e="ENVMAP_BLENDING_MIX";break;case C_:e="ENVMAP_BLENDING_ADD";break}return e}function PS(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function DS(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=wS(t),c=AS(t),h=RS(t),f=CS(t),u=PS(t),d=vS(t),g=xS(s),_=i.createProgram();let p,m,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ua).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ua).join(`
`),m.length>0&&(m+=`
`)):(p=[Wd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ua).join(`
`),m=[Wd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==hr?"#define TONE_MAPPING":"",t.toneMapping!==hr?Ke.tonemapping_pars_fragment:"",t.toneMapping!==hr?gS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,mS("linearToOutputTexel",t.outputColorSpace),_S(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ua).join(`
`)),a=Eh(a),a=Hd(a,t),a=Gd(a,t),o=Eh(o),o=Hd(o,t),o=Gd(o,t),a=Vd(a),o=Vd(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===od?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===od?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=v+p+a,M=v+m+o,A=Bd(i,i.VERTEX_SHADER,x),T=Bd(i,i.FRAGMENT_SHADER,M);i.attachShader(_,A),i.attachShader(_,T),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function S(b){if(r.debug.checkShaderErrors){const P=i.getProgramInfoLog(_).trim(),U=i.getShaderInfoLog(A).trim(),k=i.getShaderInfoLog(T).trim();let Y=!0,z=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(Y=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,A,T);else{const G=zd(i,A,"vertex"),W=zd(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+b.name+`
Material Type: `+b.type+`

Program Info Log: `+P+`
`+G+`
`+W)}else P!==""?console.warn("THREE.WebGLProgram: Program Info Log:",P):(U===""||k==="")&&(z=!1);z&&(b.diagnostics={runnable:Y,programLog:P,vertexShader:{log:U,prefix:p},fragmentShader:{log:k,prefix:m}})}i.deleteShader(A),i.deleteShader(T),R=new Vo(i,_),I=yS(i,_)}let R;this.getUniforms=function(){return R===void 0&&S(this),R};let I;this.getAttributes=function(){return I===void 0&&S(this),I};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(_,uS)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=dS++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=T,this}let LS=0;class IS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new US(e),t.set(e,n)),n}}class US{constructor(e){this.id=LS++,this.code=e,this.usedTimes=0}}function NS(r,e,t,n,i,s,a){const o=new Yp,l=new IS,c=new Set,h=[],f=i.logarithmicDepthBuffer,u=i.reverseDepthBuffer,d=i.vertexTextures;let g=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,b,P,U,k){const Y=U.fog,z=k.geometry,G=y.isMeshStandardMaterial?U.environment:null,W=(y.isMeshStandardMaterial?t:e).get(y.envMap||G),re=W&&W.mapping===pl?W.image.height:null,D=_[y.type];y.precision!==null&&(g=i.getMaxPrecision(y.precision),g!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",g,"instead."));const oe=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Be=oe!==void 0?oe.length:0;let Xe=0;z.morphAttributes.position!==void 0&&(Xe=1),z.morphAttributes.normal!==void 0&&(Xe=2),z.morphAttributes.color!==void 0&&(Xe=3);let $,Q,de,ae;if(D){const Re=gi[D];$=Re.vertexShader,Q=Re.fragmentShader}else $=y.vertexShader,Q=y.fragmentShader,l.update(y),de=l.getVertexShaderID(y),ae=l.getFragmentShaderID(y);const we=r.getRenderTarget(),Me=k.isInstancedMesh===!0,We=k.isBatchedMesh===!0,Ve=!!y.map,Ne=!!y.matcap,L=!!W,rt=!!y.aoMap,Oe=!!y.lightMap,ze=!!y.bumpMap,B=!!y.normalMap,je=!!y.displacementMap,De=!!y.emissiveMap,C=!!y.metalnessMap,E=!!y.roughnessMap,X=y.anisotropy>0,j=y.clearcoat>0,te=y.dispersion>0,Z=y.iridescence>0,ye=y.sheen>0,ie=y.transmission>0,fe=X&&!!y.anisotropyMap,Ge=j&&!!y.clearcoatMap,ne=j&&!!y.clearcoatNormalMap,ve=j&&!!y.clearcoatRoughnessMap,xe=Z&&!!y.iridescenceMap,Ie=Z&&!!y.iridescenceThicknessMap,_e=ye&&!!y.sheenColorMap,Ye=ye&&!!y.sheenRoughnessMap,Fe=!!y.specularMap,st=!!y.specularColorMap,N=!!y.specularIntensityMap,ee=ie&&!!y.transmissionMap,K=ie&&!!y.thicknessMap,J=!!y.gradientMap,le=!!y.alphaMap,ce=y.alphaTest>0,qe=!!y.alphaHash,gt=!!y.extensions;let Et=hr;y.toneMapped&&(we===null||we.isXRRenderTarget===!0)&&(Et=r.toneMapping);const nt={shaderID:D,shaderType:y.type,shaderName:y.name,vertexShader:$,fragmentShader:Q,defines:y.defines,customVertexShaderID:de,customFragmentShaderID:ae,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:g,batching:We,batchingColor:We&&k._colorsTexture!==null,instancing:Me,instancingColor:Me&&k.instanceColor!==null,instancingMorph:Me&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:we===null?r.outputColorSpace:we.isXRRenderTarget===!0?we.texture.colorSpace:xr,alphaToCoverage:!!y.alphaToCoverage,map:Ve,matcap:Ne,envMap:L,envMapMode:L&&W.mapping,envMapCubeUVHeight:re,aoMap:rt,lightMap:Oe,bumpMap:ze,normalMap:B,displacementMap:d&&je,emissiveMap:De,normalMapObjectSpace:B&&y.normalMapType===H_,normalMapTangentSpace:B&&y.normalMapType===z_,metalnessMap:C,roughnessMap:E,anisotropy:X,anisotropyMap:fe,clearcoat:j,clearcoatMap:Ge,clearcoatNormalMap:ne,clearcoatRoughnessMap:ve,dispersion:te,iridescence:Z,iridescenceMap:xe,iridescenceThicknessMap:Ie,sheen:ye,sheenColorMap:_e,sheenRoughnessMap:Ye,specularMap:Fe,specularColorMap:st,specularIntensityMap:N,transmission:ie,transmissionMap:ee,thicknessMap:K,gradientMap:J,opaque:y.transparent===!1&&y.blending===Ps&&y.alphaToCoverage===!1,alphaMap:le,alphaTest:ce,alphaHash:qe,combine:y.combine,mapUv:Ve&&p(y.map.channel),aoMapUv:rt&&p(y.aoMap.channel),lightMapUv:Oe&&p(y.lightMap.channel),bumpMapUv:ze&&p(y.bumpMap.channel),normalMapUv:B&&p(y.normalMap.channel),displacementMapUv:je&&p(y.displacementMap.channel),emissiveMapUv:De&&p(y.emissiveMap.channel),metalnessMapUv:C&&p(y.metalnessMap.channel),roughnessMapUv:E&&p(y.roughnessMap.channel),anisotropyMapUv:fe&&p(y.anisotropyMap.channel),clearcoatMapUv:Ge&&p(y.clearcoatMap.channel),clearcoatNormalMapUv:ne&&p(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&p(y.clearcoatRoughnessMap.channel),iridescenceMapUv:xe&&p(y.iridescenceMap.channel),iridescenceThicknessMapUv:Ie&&p(y.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&p(y.sheenColorMap.channel),sheenRoughnessMapUv:Ye&&p(y.sheenRoughnessMap.channel),specularMapUv:Fe&&p(y.specularMap.channel),specularColorMapUv:st&&p(y.specularColorMap.channel),specularIntensityMapUv:N&&p(y.specularIntensityMap.channel),transmissionMapUv:ee&&p(y.transmissionMap.channel),thicknessMapUv:K&&p(y.thicknessMap.channel),alphaMapUv:le&&p(y.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(B||X),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!z.attributes.uv&&(Ve||le),fog:!!Y,useFog:y.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:u,skinning:k.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Be,morphTextureStride:Xe,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:Et,decodeVideoTexture:Ve&&y.map.isVideoTexture===!0&&dt.getTransfer(y.map.colorSpace)===bt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ui,flipSided:y.side===wn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:gt&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(gt&&y.extensions.multiDraw===!0||We)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return nt.vertexUv1s=c.has(1),nt.vertexUv2s=c.has(2),nt.vertexUv3s=c.has(3),c.clear(),nt}function v(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const P in y.defines)b.push(P),b.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(x(b,y),M(b,y),b.push(r.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function x(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function M(y,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),y.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reverseDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.alphaToCoverage&&o.enable(20),y.push(o.mask)}function A(y){const b=_[y.type];let P;if(b){const U=gi[b];P=_0.clone(U.uniforms)}else P=y.uniforms;return P}function T(y,b){let P;for(let U=0,k=h.length;U<k;U++){const Y=h[U];if(Y.cacheKey===b){P=Y,++P.usedTimes;break}}return P===void 0&&(P=new DS(r,b,y,s),h.push(P)),P}function S(y){if(--y.usedTimes===0){const b=h.indexOf(y);h[b]=h[h.length-1],h.pop(),y.destroy()}}function R(y){l.remove(y)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:v,getUniforms:A,acquireProgram:T,releaseProgram:S,releaseShaderCache:R,programs:h,dispose:I}}function OS(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function FS(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Xd(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Yd(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(f,u,d,g,_,p){let m=r[e];return m===void 0?(m={id:f.id,object:f,geometry:u,material:d,groupOrder:g,renderOrder:f.renderOrder,z:_,group:p},r[e]=m):(m.id=f.id,m.object=f,m.geometry=u,m.material=d,m.groupOrder=g,m.renderOrder=f.renderOrder,m.z=_,m.group=p),e++,m}function o(f,u,d,g,_,p){const m=a(f,u,d,g,_,p);d.transmission>0?n.push(m):d.transparent===!0?i.push(m):t.push(m)}function l(f,u,d,g,_,p){const m=a(f,u,d,g,_,p);d.transmission>0?n.unshift(m):d.transparent===!0?i.unshift(m):t.unshift(m)}function c(f,u){t.length>1&&t.sort(f||FS),n.length>1&&n.sort(u||Xd),i.length>1&&i.sort(u||Xd)}function h(){for(let f=e,u=r.length;f<u;f++){const d=r[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:h,sort:c}}function kS(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new Yd,r.set(n,[a])):i>=s.length?(a=new Yd,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function BS(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new q,color:new ct};break;case"SpotLight":t={position:new q,direction:new q,color:new ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new q,color:new ct,distance:0,decay:0};break;case"HemisphereLight":t={direction:new q,skyColor:new ct,groundColor:new ct};break;case"RectAreaLight":t={color:new ct,position:new q,halfWidth:new q,halfHeight:new q};break}return r[e.id]=t,t}}}function zS(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let HS=0;function GS(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function VS(r){const e=new BS,t=zS(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new q);const i=new q,s=new Lt,a=new Lt;function o(c){let h=0,f=0,u=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let d=0,g=0,_=0,p=0,m=0,v=0,x=0,M=0,A=0,T=0,S=0;c.sort(GS);for(let I=0,y=c.length;I<y;I++){const b=c[I],P=b.color,U=b.intensity,k=b.distance,Y=b.shadow&&b.shadow.map?b.shadow.map.texture:null;if(b.isAmbientLight)h+=P.r*U,f+=P.g*U,u+=P.b*U;else if(b.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(b.sh.coefficients[z],U);S++}else if(b.isDirectionalLight){const z=e.get(b);if(z.color.copy(b.color).multiplyScalar(b.intensity),b.castShadow){const G=b.shadow,W=t.get(b);W.shadowIntensity=G.intensity,W.shadowBias=G.bias,W.shadowNormalBias=G.normalBias,W.shadowRadius=G.radius,W.shadowMapSize=G.mapSize,n.directionalShadow[d]=W,n.directionalShadowMap[d]=Y,n.directionalShadowMatrix[d]=b.shadow.matrix,v++}n.directional[d]=z,d++}else if(b.isSpotLight){const z=e.get(b);z.position.setFromMatrixPosition(b.matrixWorld),z.color.copy(P).multiplyScalar(U),z.distance=k,z.coneCos=Math.cos(b.angle),z.penumbraCos=Math.cos(b.angle*(1-b.penumbra)),z.decay=b.decay,n.spot[_]=z;const G=b.shadow;if(b.map&&(n.spotLightMap[A]=b.map,A++,G.updateMatrices(b),b.castShadow&&T++),n.spotLightMatrix[_]=G.matrix,b.castShadow){const W=t.get(b);W.shadowIntensity=G.intensity,W.shadowBias=G.bias,W.shadowNormalBias=G.normalBias,W.shadowRadius=G.radius,W.shadowMapSize=G.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=Y,M++}_++}else if(b.isRectAreaLight){const z=e.get(b);z.color.copy(P).multiplyScalar(U),z.halfWidth.set(b.width*.5,0,0),z.halfHeight.set(0,b.height*.5,0),n.rectArea[p]=z,p++}else if(b.isPointLight){const z=e.get(b);if(z.color.copy(b.color).multiplyScalar(b.intensity),z.distance=b.distance,z.decay=b.decay,b.castShadow){const G=b.shadow,W=t.get(b);W.shadowIntensity=G.intensity,W.shadowBias=G.bias,W.shadowNormalBias=G.normalBias,W.shadowRadius=G.radius,W.shadowMapSize=G.mapSize,W.shadowCameraNear=G.camera.near,W.shadowCameraFar=G.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=b.shadow.matrix,x++}n.point[g]=z,g++}else if(b.isHemisphereLight){const z=e.get(b);z.skyColor.copy(b.color).multiplyScalar(U),z.groundColor.copy(b.groundColor).multiplyScalar(U),n.hemi[m]=z,m++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;const R=n.hash;(R.directionalLength!==d||R.pointLength!==g||R.spotLength!==_||R.rectAreaLength!==p||R.hemiLength!==m||R.numDirectionalShadows!==v||R.numPointShadows!==x||R.numSpotShadows!==M||R.numSpotMaps!==A||R.numLightProbes!==S)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=M+A-T,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=S,R.directionalLength=d,R.pointLength=g,R.spotLength=_,R.rectAreaLength=p,R.hemiLength=m,R.numDirectionalShadows=v,R.numPointShadows=x,R.numSpotShadows=M,R.numSpotMaps=A,R.numLightProbes=S,n.version=HS++)}function l(c,h){let f=0,u=0,d=0,g=0,_=0;const p=h.matrixWorldInverse;for(let m=0,v=c.length;m<v;m++){const x=c[m];if(x.isDirectionalLight){const M=n.directional[f];M.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(p),f++}else if(x.isSpotLight){const M=n.spot[d];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(p),d++}else if(x.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(p),a.identity(),s.copy(x.matrixWorld),s.premultiply(p),a.extractRotation(s),M.halfWidth.set(x.width*.5,0,0),M.halfHeight.set(0,x.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(x.isPointLight){const M=n.point[u];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(p),u++}else if(x.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(x.matrixWorld),M.direction.transformDirection(p),_++}}}return{setup:o,setupView:l,state:n}}function qd(r){const e=new VS(r),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function WS(r){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new qd(r),e.set(i,[o])):s>=a.length?(o=new qd(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class XS extends Ys{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=k_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class YS extends Ys{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const qS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$S=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function KS(r,e,t){let n=new Qp;const i=new yt,s=new yt,a=new Ft,o=new XS({depthPacking:B_}),l=new YS,c={},h=t.maxTextureSize,f={[gr]:wn,[wn]:gr,[Ui]:Ui},u=new _r({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new yt},radius:{value:4}},vertexShader:qS,fragmentShader:$S}),d=u.clone();d.defines.HORIZONTAL_PASS=1;const g=new ei;g.setAttribute("position",new ui(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Si(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cp;let m=this.type;this.render=function(T,S,R){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const I=r.getRenderTarget(),y=r.getActiveCubeFace(),b=r.getActiveMipmapLevel(),P=r.state;P.setBlending(cr),P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const U=m!==Ci&&this.type===Ci,k=m===Ci&&this.type!==Ci;for(let Y=0,z=T.length;Y<z;Y++){const G=T[Y],W=G.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const re=W.getFrameExtents();if(i.multiply(re),s.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/re.x),i.x=s.x*re.x,W.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/re.y),i.y=s.y*re.y,W.mapSize.y=s.y)),W.map===null||U===!0||k===!0){const oe=this.type!==Ci?{minFilter:Jn,magFilter:Jn}:{};W.map!==null&&W.map.dispose(),W.map=new Zr(i.x,i.y,oe),W.map.texture.name=G.name+".shadowMap",W.camera.updateProjectionMatrix()}r.setRenderTarget(W.map),r.clear();const D=W.getViewportCount();for(let oe=0;oe<D;oe++){const Be=W.getViewport(oe);a.set(s.x*Be.x,s.y*Be.y,s.x*Be.z,s.y*Be.w),P.viewport(a),W.updateMatrices(G,oe),n=W.getFrustum(),M(S,R,W.camera,G,this.type)}W.isPointLightShadow!==!0&&this.type===Ci&&v(W,R),W.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(I,y,b)};function v(T,S){const R=e.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Zr(i.x,i.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(S,null,R,u,_,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(S,null,R,d,_,null)}function x(T,S,R,I){let y=null;const b=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(b!==void 0)y=b;else if(y=R.isPointLight===!0?l:o,r.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0){const P=y.uuid,U=S.uuid;let k=c[P];k===void 0&&(k={},c[P]=k);let Y=k[U];Y===void 0&&(Y=y.clone(),k[U]=Y,S.addEventListener("dispose",A)),y=Y}if(y.visible=S.visible,y.wireframe=S.wireframe,I===Ci?y.side=S.shadowSide!==null?S.shadowSide:S.side:y.side=S.shadowSide!==null?S.shadowSide:f[S.side],y.alphaMap=S.alphaMap,y.alphaTest=S.alphaTest,y.map=S.map,y.clipShadows=S.clipShadows,y.clippingPlanes=S.clippingPlanes,y.clipIntersection=S.clipIntersection,y.displacementMap=S.displacementMap,y.displacementScale=S.displacementScale,y.displacementBias=S.displacementBias,y.wireframeLinewidth=S.wireframeLinewidth,y.linewidth=S.linewidth,R.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const P=r.properties.get(y);P.light=R}return y}function M(T,S,R,I,y){if(T.visible===!1)return;if(T.layers.test(S.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&y===Ci)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);const U=e.update(T),k=T.material;if(Array.isArray(k)){const Y=U.groups;for(let z=0,G=Y.length;z<G;z++){const W=Y[z],re=k[W.materialIndex];if(re&&re.visible){const D=x(T,re,I,y);T.onBeforeShadow(r,T,S,R,U,D,W),r.renderBufferDirect(R,null,U,D,T,W),T.onAfterShadow(r,T,S,R,U,D,W)}}}else if(k.visible){const Y=x(T,k,I,y);T.onBeforeShadow(r,T,S,R,U,Y,null),r.renderBufferDirect(R,null,U,Y,T,null),T.onAfterShadow(r,T,S,R,U,Y,null)}}const P=T.children;for(let U=0,k=P.length;U<k;U++)M(P[U],S,R,I,y)}function A(T){T.target.removeEventListener("dispose",A);for(const R in c){const I=c[R],y=T.target.uuid;y in I&&(I[y].dispose(),delete I[y])}}}const ZS={[zc]:Hc,[Gc]:Xc,[Vc]:Yc,[Bs]:Wc,[Hc]:zc,[Xc]:Gc,[Yc]:Vc,[Wc]:Bs};function jS(r){function e(){let N=!1;const ee=new Ft;let K=null;const J=new Ft(0,0,0,0);return{setMask:function(le){K!==le&&!N&&(r.colorMask(le,le,le,le),K=le)},setLocked:function(le){N=le},setClear:function(le,ce,qe,gt,Et){Et===!0&&(le*=gt,ce*=gt,qe*=gt),ee.set(le,ce,qe,gt),J.equals(ee)===!1&&(r.clearColor(le,ce,qe,gt),J.copy(ee))},reset:function(){N=!1,K=null,J.set(-1,0,0,0)}}}function t(){let N=!1,ee=!1,K=null,J=null,le=null;return{setReversed:function(ce){ee=ce},setTest:function(ce){ce?de(r.DEPTH_TEST):ae(r.DEPTH_TEST)},setMask:function(ce){K!==ce&&!N&&(r.depthMask(ce),K=ce)},setFunc:function(ce){if(ee&&(ce=ZS[ce]),J!==ce){switch(ce){case zc:r.depthFunc(r.NEVER);break;case Hc:r.depthFunc(r.ALWAYS);break;case Gc:r.depthFunc(r.LESS);break;case Bs:r.depthFunc(r.LEQUAL);break;case Vc:r.depthFunc(r.EQUAL);break;case Wc:r.depthFunc(r.GEQUAL);break;case Xc:r.depthFunc(r.GREATER);break;case Yc:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}J=ce}},setLocked:function(ce){N=ce},setClear:function(ce){le!==ce&&(r.clearDepth(ce),le=ce)},reset:function(){N=!1,K=null,J=null,le=null}}}function n(){let N=!1,ee=null,K=null,J=null,le=null,ce=null,qe=null,gt=null,Et=null;return{setTest:function(nt){N||(nt?de(r.STENCIL_TEST):ae(r.STENCIL_TEST))},setMask:function(nt){ee!==nt&&!N&&(r.stencilMask(nt),ee=nt)},setFunc:function(nt,Re,be){(K!==nt||J!==Re||le!==be)&&(r.stencilFunc(nt,Re,be),K=nt,J=Re,le=be)},setOp:function(nt,Re,be){(ce!==nt||qe!==Re||gt!==be)&&(r.stencilOp(nt,Re,be),ce=nt,qe=Re,gt=be)},setLocked:function(nt){N=nt},setClear:function(nt){Et!==nt&&(r.clearStencil(nt),Et=nt)},reset:function(){N=!1,ee=null,K=null,J=null,le=null,ce=null,qe=null,gt=null,Et=null}}}const i=new e,s=new t,a=new n,o=new WeakMap,l=new WeakMap;let c={},h={},f=new WeakMap,u=[],d=null,g=!1,_=null,p=null,m=null,v=null,x=null,M=null,A=null,T=new ct(0,0,0),S=0,R=!1,I=null,y=null,b=null,P=null,U=null;const k=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,z=0;const G=r.getParameter(r.VERSION);G.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(G)[1]),Y=z>=1):G.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),Y=z>=2);let W=null,re={};const D=r.getParameter(r.SCISSOR_BOX),oe=r.getParameter(r.VIEWPORT),Be=new Ft().fromArray(D),Xe=new Ft().fromArray(oe);function $(N,ee,K,J){const le=new Uint8Array(4),ce=r.createTexture();r.bindTexture(N,ce),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let qe=0;qe<K;qe++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(ee,0,r.RGBA,1,1,J,0,r.RGBA,r.UNSIGNED_BYTE,le):r.texImage2D(ee+qe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,le);return ce}const Q={};Q[r.TEXTURE_2D]=$(r.TEXTURE_2D,r.TEXTURE_2D,1),Q[r.TEXTURE_CUBE_MAP]=$(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[r.TEXTURE_2D_ARRAY]=$(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Q[r.TEXTURE_3D]=$(r.TEXTURE_3D,r.TEXTURE_3D,1,1),i.setClear(0,0,0,1),s.setClear(1),a.setClear(0),de(r.DEPTH_TEST),s.setFunc(Bs),Oe(!1),ze(td),de(r.CULL_FACE),L(cr);function de(N){c[N]!==!0&&(r.enable(N),c[N]=!0)}function ae(N){c[N]!==!1&&(r.disable(N),c[N]=!1)}function we(N,ee){return h[N]!==ee?(r.bindFramebuffer(N,ee),h[N]=ee,N===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=ee),N===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=ee),!0):!1}function Me(N,ee){let K=u,J=!1;if(N){K=f.get(ee),K===void 0&&(K=[],f.set(ee,K));const le=N.textures;if(K.length!==le.length||K[0]!==r.COLOR_ATTACHMENT0){for(let ce=0,qe=le.length;ce<qe;ce++)K[ce]=r.COLOR_ATTACHMENT0+ce;K.length=le.length,J=!0}}else K[0]!==r.BACK&&(K[0]=r.BACK,J=!0);J&&r.drawBuffers(K)}function We(N){return d!==N?(r.useProgram(N),d=N,!0):!1}const Ve={[Ir]:r.FUNC_ADD,[u_]:r.FUNC_SUBTRACT,[d_]:r.FUNC_REVERSE_SUBTRACT};Ve[f_]=r.MIN,Ve[p_]=r.MAX;const Ne={[m_]:r.ZERO,[g_]:r.ONE,[__]:r.SRC_COLOR,[kc]:r.SRC_ALPHA,[b_]:r.SRC_ALPHA_SATURATE,[S_]:r.DST_COLOR,[x_]:r.DST_ALPHA,[v_]:r.ONE_MINUS_SRC_COLOR,[Bc]:r.ONE_MINUS_SRC_ALPHA,[M_]:r.ONE_MINUS_DST_COLOR,[y_]:r.ONE_MINUS_DST_ALPHA,[E_]:r.CONSTANT_COLOR,[T_]:r.ONE_MINUS_CONSTANT_COLOR,[w_]:r.CONSTANT_ALPHA,[A_]:r.ONE_MINUS_CONSTANT_ALPHA};function L(N,ee,K,J,le,ce,qe,gt,Et,nt){if(N===cr){g===!0&&(ae(r.BLEND),g=!1);return}if(g===!1&&(de(r.BLEND),g=!0),N!==h_){if(N!==_||nt!==R){if((p!==Ir||x!==Ir)&&(r.blendEquation(r.FUNC_ADD),p=Ir,x=Ir),nt)switch(N){case Ps:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case nd:r.blendFunc(r.ONE,r.ONE);break;case id:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case rd:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Ps:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case nd:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case id:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case rd:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}m=null,v=null,M=null,A=null,T.set(0,0,0),S=0,_=N,R=nt}return}le=le||ee,ce=ce||K,qe=qe||J,(ee!==p||le!==x)&&(r.blendEquationSeparate(Ve[ee],Ve[le]),p=ee,x=le),(K!==m||J!==v||ce!==M||qe!==A)&&(r.blendFuncSeparate(Ne[K],Ne[J],Ne[ce],Ne[qe]),m=K,v=J,M=ce,A=qe),(gt.equals(T)===!1||Et!==S)&&(r.blendColor(gt.r,gt.g,gt.b,Et),T.copy(gt),S=Et),_=N,R=!1}function rt(N,ee){N.side===Ui?ae(r.CULL_FACE):de(r.CULL_FACE);let K=N.side===wn;ee&&(K=!K),Oe(K),N.blending===Ps&&N.transparent===!1?L(cr):L(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),s.setFunc(N.depthFunc),s.setTest(N.depthTest),s.setMask(N.depthWrite),i.setMask(N.colorWrite);const J=N.stencilWrite;a.setTest(J),J&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),je(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?de(r.SAMPLE_ALPHA_TO_COVERAGE):ae(r.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(N){I!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),I=N)}function ze(N){N!==o_?(de(r.CULL_FACE),N!==y&&(N===td?r.cullFace(r.BACK):N===l_?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ae(r.CULL_FACE),y=N}function B(N){N!==b&&(Y&&r.lineWidth(N),b=N)}function je(N,ee,K){N?(de(r.POLYGON_OFFSET_FILL),(P!==ee||U!==K)&&(r.polygonOffset(ee,K),P=ee,U=K)):ae(r.POLYGON_OFFSET_FILL)}function De(N){N?de(r.SCISSOR_TEST):ae(r.SCISSOR_TEST)}function C(N){N===void 0&&(N=r.TEXTURE0+k-1),W!==N&&(r.activeTexture(N),W=N)}function E(N,ee,K){K===void 0&&(W===null?K=r.TEXTURE0+k-1:K=W);let J=re[K];J===void 0&&(J={type:void 0,texture:void 0},re[K]=J),(J.type!==N||J.texture!==ee)&&(W!==K&&(r.activeTexture(K),W=K),r.bindTexture(N,ee||Q[N]),J.type=N,J.texture=ee)}function X(){const N=re[W];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function j(){try{r.compressedTexImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{r.compressedTexImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Z(){try{r.texSubImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ye(){try{r.texSubImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ie(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function fe(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ge(){try{r.texStorage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ne(){try{r.texStorage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ve(){try{r.texImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function xe(){try{r.texImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ie(N){Be.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),Be.copy(N))}function _e(N){Xe.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),Xe.copy(N))}function Ye(N,ee){let K=l.get(ee);K===void 0&&(K=new WeakMap,l.set(ee,K));let J=K.get(N);J===void 0&&(J=r.getUniformBlockIndex(ee,N.name),K.set(N,J))}function Fe(N,ee){const J=l.get(ee).get(N);o.get(ee)!==J&&(r.uniformBlockBinding(ee,J,N.__bindingPointIndex),o.set(ee,J))}function st(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),c={},W=null,re={},h={},f=new WeakMap,u=[],d=null,g=!1,_=null,p=null,m=null,v=null,x=null,M=null,A=null,T=new ct(0,0,0),S=0,R=!1,I=null,y=null,b=null,P=null,U=null,Be.set(0,0,r.canvas.width,r.canvas.height),Xe.set(0,0,r.canvas.width,r.canvas.height),i.reset(),s.reset(),a.reset()}return{buffers:{color:i,depth:s,stencil:a},enable:de,disable:ae,bindFramebuffer:we,drawBuffers:Me,useProgram:We,setBlending:L,setMaterial:rt,setFlipSided:Oe,setCullFace:ze,setLineWidth:B,setPolygonOffset:je,setScissorTest:De,activeTexture:C,bindTexture:E,unbindTexture:X,compressedTexImage2D:j,compressedTexImage3D:te,texImage2D:ve,texImage3D:xe,updateUBOMapping:Ye,uniformBlockBinding:Fe,texStorage2D:Ge,texStorage3D:ne,texSubImage2D:Z,texSubImage3D:ye,compressedTexSubImage2D:ie,compressedTexSubImage3D:fe,scissor:Ie,viewport:_e,reset:st}}function $d(r,e,t,n){const i=JS(n);switch(t){case Np:return r*e;case Fp:return r*e;case kp:return r*e*2;case Bp:return r*e/i.components*i.byteLength;case su:return r*e/i.components*i.byteLength;case zp:return r*e*2/i.components*i.byteLength;case au:return r*e*2/i.components*i.byteLength;case Op:return r*e*3/i.components*i.byteLength;case hi:return r*e*4/i.components*i.byteLength;case ou:return r*e*4/i.components*i.byteLength;case Fo:case ko:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Bo:case zo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Jc:case eh:return Math.max(r,16)*Math.max(e,8)/4;case jc:case Qc:return Math.max(r,8)*Math.max(e,8)/2;case th:case nh:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case ih:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case rh:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case sh:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case ah:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case oh:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case lh:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case ch:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case hh:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case uh:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case dh:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case fh:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case ph:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case mh:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case gh:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case _h:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Ho:case vh:case xh:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Hp:case yh:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Sh:case Mh:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function JS(r){switch(r){case Gi:case Lp:return{byteLength:1,components:1};case Ua:case Ip:case Oa:return{byteLength:2,components:1};case iu:case ru:return{byteLength:2,components:4};case Kr:case nu:case Fi:return{byteLength:4,components:1};case Up:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function QS(r,e,t,n,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new yt,h=new WeakMap;let f;const u=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,E){return d?new OffscreenCanvas(C,E):al("canvas")}function _(C,E,X){let j=1;const te=De(C);if((te.width>X||te.height>X)&&(j=X/Math.max(te.width,te.height)),j<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Z=Math.floor(j*te.width),ye=Math.floor(j*te.height);f===void 0&&(f=g(Z,ye));const ie=E?g(Z,ye):f;return ie.width=Z,ie.height=ye,ie.getContext("2d").drawImage(C,0,0,Z,ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+Z+"x"+ye+")."),ie}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),C;return C}function p(C){return C.generateMipmaps&&C.minFilter!==Jn&&C.minFilter!==oi}function m(C){r.generateMipmap(C)}function v(C,E,X,j,te=!1){if(C!==null){if(r[C]!==void 0)return r[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Z=E;if(E===r.RED&&(X===r.FLOAT&&(Z=r.R32F),X===r.HALF_FLOAT&&(Z=r.R16F),X===r.UNSIGNED_BYTE&&(Z=r.R8)),E===r.RED_INTEGER&&(X===r.UNSIGNED_BYTE&&(Z=r.R8UI),X===r.UNSIGNED_SHORT&&(Z=r.R16UI),X===r.UNSIGNED_INT&&(Z=r.R32UI),X===r.BYTE&&(Z=r.R8I),X===r.SHORT&&(Z=r.R16I),X===r.INT&&(Z=r.R32I)),E===r.RG&&(X===r.FLOAT&&(Z=r.RG32F),X===r.HALF_FLOAT&&(Z=r.RG16F),X===r.UNSIGNED_BYTE&&(Z=r.RG8)),E===r.RG_INTEGER&&(X===r.UNSIGNED_BYTE&&(Z=r.RG8UI),X===r.UNSIGNED_SHORT&&(Z=r.RG16UI),X===r.UNSIGNED_INT&&(Z=r.RG32UI),X===r.BYTE&&(Z=r.RG8I),X===r.SHORT&&(Z=r.RG16I),X===r.INT&&(Z=r.RG32I)),E===r.RGB_INTEGER&&(X===r.UNSIGNED_BYTE&&(Z=r.RGB8UI),X===r.UNSIGNED_SHORT&&(Z=r.RGB16UI),X===r.UNSIGNED_INT&&(Z=r.RGB32UI),X===r.BYTE&&(Z=r.RGB8I),X===r.SHORT&&(Z=r.RGB16I),X===r.INT&&(Z=r.RGB32I)),E===r.RGBA_INTEGER&&(X===r.UNSIGNED_BYTE&&(Z=r.RGBA8UI),X===r.UNSIGNED_SHORT&&(Z=r.RGBA16UI),X===r.UNSIGNED_INT&&(Z=r.RGBA32UI),X===r.BYTE&&(Z=r.RGBA8I),X===r.SHORT&&(Z=r.RGBA16I),X===r.INT&&(Z=r.RGBA32I)),E===r.RGB&&X===r.UNSIGNED_INT_5_9_9_9_REV&&(Z=r.RGB9_E5),E===r.RGBA){const ye=te?nl:dt.getTransfer(j);X===r.FLOAT&&(Z=r.RGBA32F),X===r.HALF_FLOAT&&(Z=r.RGBA16F),X===r.UNSIGNED_BYTE&&(Z=ye===bt?r.SRGB8_ALPHA8:r.RGBA8),X===r.UNSIGNED_SHORT_4_4_4_4&&(Z=r.RGBA4),X===r.UNSIGNED_SHORT_5_5_5_1&&(Z=r.RGB5_A1)}return(Z===r.R16F||Z===r.R32F||Z===r.RG16F||Z===r.RG32F||Z===r.RGBA16F||Z===r.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function x(C,E){let X;return C?E===null||E===Kr||E===Gs?X=r.DEPTH24_STENCIL8:E===Fi?X=r.DEPTH32F_STENCIL8:E===Ua&&(X=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Kr||E===Gs?X=r.DEPTH_COMPONENT24:E===Fi?X=r.DEPTH_COMPONENT32F:E===Ua&&(X=r.DEPTH_COMPONENT16),X}function M(C,E){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Jn&&C.minFilter!==oi?Math.log2(Math.max(E.width,E.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?E.mipmaps.length:1}function A(C){const E=C.target;E.removeEventListener("dispose",A),S(E),E.isVideoTexture&&h.delete(E)}function T(C){const E=C.target;E.removeEventListener("dispose",T),I(E)}function S(C){const E=n.get(C);if(E.__webglInit===void 0)return;const X=C.source,j=u.get(X);if(j){const te=j[E.__cacheKey];te.usedTimes--,te.usedTimes===0&&R(C),Object.keys(j).length===0&&u.delete(X)}n.remove(C)}function R(C){const E=n.get(C);r.deleteTexture(E.__webglTexture);const X=C.source,j=u.get(X);delete j[E.__cacheKey],a.memory.textures--}function I(C){const E=n.get(C);if(C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(E.__webglFramebuffer[j]))for(let te=0;te<E.__webglFramebuffer[j].length;te++)r.deleteFramebuffer(E.__webglFramebuffer[j][te]);else r.deleteFramebuffer(E.__webglFramebuffer[j]);E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer[j])}else{if(Array.isArray(E.__webglFramebuffer))for(let j=0;j<E.__webglFramebuffer.length;j++)r.deleteFramebuffer(E.__webglFramebuffer[j]);else r.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&r.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let j=0;j<E.__webglColorRenderbuffer.length;j++)E.__webglColorRenderbuffer[j]&&r.deleteRenderbuffer(E.__webglColorRenderbuffer[j]);E.__webglDepthRenderbuffer&&r.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const X=C.textures;for(let j=0,te=X.length;j<te;j++){const Z=n.get(X[j]);Z.__webglTexture&&(r.deleteTexture(Z.__webglTexture),a.memory.textures--),n.remove(X[j])}n.remove(C)}let y=0;function b(){y=0}function P(){const C=y;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),y+=1,C}function U(C){const E=[];return E.push(C.wrapS),E.push(C.wrapT),E.push(C.wrapR||0),E.push(C.magFilter),E.push(C.minFilter),E.push(C.anisotropy),E.push(C.internalFormat),E.push(C.format),E.push(C.type),E.push(C.generateMipmaps),E.push(C.premultiplyAlpha),E.push(C.flipY),E.push(C.unpackAlignment),E.push(C.colorSpace),E.join()}function k(C,E){const X=n.get(C);if(C.isVideoTexture&&B(C),C.isRenderTargetTexture===!1&&C.version>0&&X.__version!==C.version){const j=C.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Xe(X,C,E);return}}t.bindTexture(r.TEXTURE_2D,X.__webglTexture,r.TEXTURE0+E)}function Y(C,E){const X=n.get(C);if(C.version>0&&X.__version!==C.version){Xe(X,C,E);return}t.bindTexture(r.TEXTURE_2D_ARRAY,X.__webglTexture,r.TEXTURE0+E)}function z(C,E){const X=n.get(C);if(C.version>0&&X.__version!==C.version){Xe(X,C,E);return}t.bindTexture(r.TEXTURE_3D,X.__webglTexture,r.TEXTURE0+E)}function G(C,E){const X=n.get(C);if(C.version>0&&X.__version!==C.version){$(X,C,E);return}t.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture,r.TEXTURE0+E)}const W={[Kc]:r.REPEAT,[Fr]:r.CLAMP_TO_EDGE,[Zc]:r.MIRRORED_REPEAT},re={[Jn]:r.NEAREST,[F_]:r.NEAREST_MIPMAP_NEAREST,[to]:r.NEAREST_MIPMAP_LINEAR,[oi]:r.LINEAR,[Ol]:r.LINEAR_MIPMAP_NEAREST,[kr]:r.LINEAR_MIPMAP_LINEAR},D={[G_]:r.NEVER,[$_]:r.ALWAYS,[V_]:r.LESS,[Gp]:r.LEQUAL,[W_]:r.EQUAL,[q_]:r.GEQUAL,[X_]:r.GREATER,[Y_]:r.NOTEQUAL};function oe(C,E){if(E.type===Fi&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===oi||E.magFilter===Ol||E.magFilter===to||E.magFilter===kr||E.minFilter===oi||E.minFilter===Ol||E.minFilter===to||E.minFilter===kr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(C,r.TEXTURE_WRAP_S,W[E.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,W[E.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,W[E.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,re[E.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,re[E.minFilter]),E.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,D[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Jn||E.minFilter!==to&&E.minFilter!==kr||E.type===Fi&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");r.texParameterf(C,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Be(C,E){let X=!1;C.__webglInit===void 0&&(C.__webglInit=!0,E.addEventListener("dispose",A));const j=E.source;let te=u.get(j);te===void 0&&(te={},u.set(j,te));const Z=U(E);if(Z!==C.__cacheKey){te[Z]===void 0&&(te[Z]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,X=!0),te[Z].usedTimes++;const ye=te[C.__cacheKey];ye!==void 0&&(te[C.__cacheKey].usedTimes--,ye.usedTimes===0&&R(E)),C.__cacheKey=Z,C.__webglTexture=te[Z].texture}return X}function Xe(C,E,X){let j=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(j=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(j=r.TEXTURE_3D);const te=Be(C,E),Z=E.source;t.bindTexture(j,C.__webglTexture,r.TEXTURE0+X);const ye=n.get(Z);if(Z.version!==ye.__version||te===!0){t.activeTexture(r.TEXTURE0+X);const ie=dt.getPrimaries(dt.workingColorSpace),fe=E.colorSpace===Qi?null:dt.getPrimaries(E.colorSpace),Ge=E.colorSpace===Qi||ie===fe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ge);let ne=_(E.image,!1,i.maxTextureSize);ne=je(E,ne);const ve=s.convert(E.format,E.colorSpace),xe=s.convert(E.type);let Ie=v(E.internalFormat,ve,xe,E.colorSpace,E.isVideoTexture);oe(j,E);let _e;const Ye=E.mipmaps,Fe=E.isVideoTexture!==!0,st=ye.__version===void 0||te===!0,N=Z.dataReady,ee=M(E,ne);if(E.isDepthTexture)Ie=x(E.format===Vs,E.type),st&&(Fe?t.texStorage2D(r.TEXTURE_2D,1,Ie,ne.width,ne.height):t.texImage2D(r.TEXTURE_2D,0,Ie,ne.width,ne.height,0,ve,xe,null));else if(E.isDataTexture)if(Ye.length>0){Fe&&st&&t.texStorage2D(r.TEXTURE_2D,ee,Ie,Ye[0].width,Ye[0].height);for(let K=0,J=Ye.length;K<J;K++)_e=Ye[K],Fe?N&&t.texSubImage2D(r.TEXTURE_2D,K,0,0,_e.width,_e.height,ve,xe,_e.data):t.texImage2D(r.TEXTURE_2D,K,Ie,_e.width,_e.height,0,ve,xe,_e.data);E.generateMipmaps=!1}else Fe?(st&&t.texStorage2D(r.TEXTURE_2D,ee,Ie,ne.width,ne.height),N&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ne.width,ne.height,ve,xe,ne.data)):t.texImage2D(r.TEXTURE_2D,0,Ie,ne.width,ne.height,0,ve,xe,ne.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Fe&&st&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ee,Ie,Ye[0].width,Ye[0].height,ne.depth);for(let K=0,J=Ye.length;K<J;K++)if(_e=Ye[K],E.format!==hi)if(ve!==null)if(Fe){if(N)if(E.layerUpdates.size>0){const le=$d(_e.width,_e.height,E.format,E.type);for(const ce of E.layerUpdates){const qe=_e.data.subarray(ce*le/_e.data.BYTES_PER_ELEMENT,(ce+1)*le/_e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,K,0,0,ce,_e.width,_e.height,1,ve,qe,0,0)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,K,0,0,0,_e.width,_e.height,ne.depth,ve,_e.data,0,0)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,K,Ie,_e.width,_e.height,ne.depth,0,_e.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?N&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,K,0,0,0,_e.width,_e.height,ne.depth,ve,xe,_e.data):t.texImage3D(r.TEXTURE_2D_ARRAY,K,Ie,_e.width,_e.height,ne.depth,0,ve,xe,_e.data)}else{Fe&&st&&t.texStorage2D(r.TEXTURE_2D,ee,Ie,Ye[0].width,Ye[0].height);for(let K=0,J=Ye.length;K<J;K++)_e=Ye[K],E.format!==hi?ve!==null?Fe?N&&t.compressedTexSubImage2D(r.TEXTURE_2D,K,0,0,_e.width,_e.height,ve,_e.data):t.compressedTexImage2D(r.TEXTURE_2D,K,Ie,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?N&&t.texSubImage2D(r.TEXTURE_2D,K,0,0,_e.width,_e.height,ve,xe,_e.data):t.texImage2D(r.TEXTURE_2D,K,Ie,_e.width,_e.height,0,ve,xe,_e.data)}else if(E.isDataArrayTexture)if(Fe){if(st&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ee,Ie,ne.width,ne.height,ne.depth),N)if(E.layerUpdates.size>0){const K=$d(ne.width,ne.height,E.format,E.type);for(const J of E.layerUpdates){const le=ne.data.subarray(J*K/ne.data.BYTES_PER_ELEMENT,(J+1)*K/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,J,ne.width,ne.height,1,ve,xe,le)}E.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,ve,xe,ne.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ie,ne.width,ne.height,ne.depth,0,ve,xe,ne.data);else if(E.isData3DTexture)Fe?(st&&t.texStorage3D(r.TEXTURE_3D,ee,Ie,ne.width,ne.height,ne.depth),N&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,ve,xe,ne.data)):t.texImage3D(r.TEXTURE_3D,0,Ie,ne.width,ne.height,ne.depth,0,ve,xe,ne.data);else if(E.isFramebufferTexture){if(st)if(Fe)t.texStorage2D(r.TEXTURE_2D,ee,Ie,ne.width,ne.height);else{let K=ne.width,J=ne.height;for(let le=0;le<ee;le++)t.texImage2D(r.TEXTURE_2D,le,Ie,K,J,0,ve,xe,null),K>>=1,J>>=1}}else if(Ye.length>0){if(Fe&&st){const K=De(Ye[0]);t.texStorage2D(r.TEXTURE_2D,ee,Ie,K.width,K.height)}for(let K=0,J=Ye.length;K<J;K++)_e=Ye[K],Fe?N&&t.texSubImage2D(r.TEXTURE_2D,K,0,0,ve,xe,_e):t.texImage2D(r.TEXTURE_2D,K,Ie,ve,xe,_e);E.generateMipmaps=!1}else if(Fe){if(st){const K=De(ne);t.texStorage2D(r.TEXTURE_2D,ee,Ie,K.width,K.height)}N&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ve,xe,ne)}else t.texImage2D(r.TEXTURE_2D,0,Ie,ve,xe,ne);p(E)&&m(j),ye.__version=Z.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function $(C,E,X){if(E.image.length!==6)return;const j=Be(C,E),te=E.source;t.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+X);const Z=n.get(te);if(te.version!==Z.__version||j===!0){t.activeTexture(r.TEXTURE0+X);const ye=dt.getPrimaries(dt.workingColorSpace),ie=E.colorSpace===Qi?null:dt.getPrimaries(E.colorSpace),fe=E.colorSpace===Qi||ye===ie?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);const Ge=E.isCompressedTexture||E.image[0].isCompressedTexture,ne=E.image[0]&&E.image[0].isDataTexture,ve=[];for(let J=0;J<6;J++)!Ge&&!ne?ve[J]=_(E.image[J],!0,i.maxCubemapSize):ve[J]=ne?E.image[J].image:E.image[J],ve[J]=je(E,ve[J]);const xe=ve[0],Ie=s.convert(E.format,E.colorSpace),_e=s.convert(E.type),Ye=v(E.internalFormat,Ie,_e,E.colorSpace),Fe=E.isVideoTexture!==!0,st=Z.__version===void 0||j===!0,N=te.dataReady;let ee=M(E,xe);oe(r.TEXTURE_CUBE_MAP,E);let K;if(Ge){Fe&&st&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ee,Ye,xe.width,xe.height);for(let J=0;J<6;J++){K=ve[J].mipmaps;for(let le=0;le<K.length;le++){const ce=K[le];E.format!==hi?Ie!==null?Fe?N&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le,0,0,ce.width,ce.height,Ie,ce.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le,Ye,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le,0,0,ce.width,ce.height,Ie,_e,ce.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le,Ye,ce.width,ce.height,0,Ie,_e,ce.data)}}}else{if(K=E.mipmaps,Fe&&st){K.length>0&&ee++;const J=De(ve[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,ee,Ye,J.width,J.height)}for(let J=0;J<6;J++)if(ne){Fe?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ve[J].width,ve[J].height,Ie,_e,ve[J].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Ye,ve[J].width,ve[J].height,0,Ie,_e,ve[J].data);for(let le=0;le<K.length;le++){const qe=K[le].image[J].image;Fe?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le+1,0,0,qe.width,qe.height,Ie,_e,qe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le+1,Ye,qe.width,qe.height,0,Ie,_e,qe.data)}}else{Fe?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Ie,_e,ve[J]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Ye,Ie,_e,ve[J]);for(let le=0;le<K.length;le++){const ce=K[le];Fe?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le+1,0,0,Ie,_e,ce.image[J]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le+1,Ye,Ie,_e,ce.image[J])}}}p(E)&&m(r.TEXTURE_CUBE_MAP),Z.__version=te.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function Q(C,E,X,j,te,Z){const ye=s.convert(X.format,X.colorSpace),ie=s.convert(X.type),fe=v(X.internalFormat,ye,ie,X.colorSpace);if(!n.get(E).__hasExternalTextures){const ne=Math.max(1,E.width>>Z),ve=Math.max(1,E.height>>Z);te===r.TEXTURE_3D||te===r.TEXTURE_2D_ARRAY?t.texImage3D(te,Z,fe,ne,ve,E.depth,0,ye,ie,null):t.texImage2D(te,Z,fe,ne,ve,0,ye,ie,null)}t.bindFramebuffer(r.FRAMEBUFFER,C),ze(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,j,te,n.get(X).__webglTexture,0,Oe(E)):(te===r.TEXTURE_2D||te>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,j,te,n.get(X).__webglTexture,Z),t.bindFramebuffer(r.FRAMEBUFFER,null)}function de(C,E,X){if(r.bindRenderbuffer(r.RENDERBUFFER,C),E.depthBuffer){const j=E.depthTexture,te=j&&j.isDepthTexture?j.type:null,Z=x(E.stencilBuffer,te),ye=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ie=Oe(E);ze(E)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ie,Z,E.width,E.height):X?r.renderbufferStorageMultisample(r.RENDERBUFFER,ie,Z,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,Z,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,ye,r.RENDERBUFFER,C)}else{const j=E.textures;for(let te=0;te<j.length;te++){const Z=j[te],ye=s.convert(Z.format,Z.colorSpace),ie=s.convert(Z.type),fe=v(Z.internalFormat,ye,ie,Z.colorSpace),Ge=Oe(E);X&&ze(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ge,fe,E.width,E.height):ze(E)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ge,fe,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,fe,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ae(C,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,C),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),k(E.depthTexture,0);const j=n.get(E.depthTexture).__webglTexture,te=Oe(E);if(E.depthTexture.format===Ds)ze(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0,te):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0);else if(E.depthTexture.format===Vs)ze(E)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0,te):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function we(C){const E=n.get(C),X=C.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==C.depthTexture){const j=C.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),j){const te=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,j.removeEventListener("dispose",te)};j.addEventListener("dispose",te),E.__depthDisposeCallback=te}E.__boundDepthTexture=j}if(C.depthTexture&&!E.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");ae(E.__webglFramebuffer,C)}else if(X){E.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[j]),E.__webglDepthbuffer[j]===void 0)E.__webglDepthbuffer[j]=r.createRenderbuffer(),de(E.__webglDepthbuffer[j],C,!1);else{const te=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Z=E.__webglDepthbuffer[j];r.bindRenderbuffer(r.RENDERBUFFER,Z),r.framebufferRenderbuffer(r.FRAMEBUFFER,te,r.RENDERBUFFER,Z)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),de(E.__webglDepthbuffer,C,!1);else{const j=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,te=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,te),r.framebufferRenderbuffer(r.FRAMEBUFFER,j,r.RENDERBUFFER,te)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Me(C,E,X){const j=n.get(C);E!==void 0&&Q(j.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),X!==void 0&&we(C)}function We(C){const E=C.texture,X=n.get(C),j=n.get(E);C.addEventListener("dispose",T);const te=C.textures,Z=C.isWebGLCubeRenderTarget===!0,ye=te.length>1;if(ye||(j.__webglTexture===void 0&&(j.__webglTexture=r.createTexture()),j.__version=E.version,a.memory.textures++),Z){X.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(E.mipmaps&&E.mipmaps.length>0){X.__webglFramebuffer[ie]=[];for(let fe=0;fe<E.mipmaps.length;fe++)X.__webglFramebuffer[ie][fe]=r.createFramebuffer()}else X.__webglFramebuffer[ie]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){X.__webglFramebuffer=[];for(let ie=0;ie<E.mipmaps.length;ie++)X.__webglFramebuffer[ie]=r.createFramebuffer()}else X.__webglFramebuffer=r.createFramebuffer();if(ye)for(let ie=0,fe=te.length;ie<fe;ie++){const Ge=n.get(te[ie]);Ge.__webglTexture===void 0&&(Ge.__webglTexture=r.createTexture(),a.memory.textures++)}if(C.samples>0&&ze(C)===!1){X.__webglMultisampledFramebuffer=r.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let ie=0;ie<te.length;ie++){const fe=te[ie];X.__webglColorRenderbuffer[ie]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,X.__webglColorRenderbuffer[ie]);const Ge=s.convert(fe.format,fe.colorSpace),ne=s.convert(fe.type),ve=v(fe.internalFormat,Ge,ne,fe.colorSpace,C.isXRRenderTarget===!0),xe=Oe(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,xe,ve,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ie,r.RENDERBUFFER,X.__webglColorRenderbuffer[ie])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(X.__webglDepthRenderbuffer=r.createRenderbuffer(),de(X.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Z){t.bindTexture(r.TEXTURE_CUBE_MAP,j.__webglTexture),oe(r.TEXTURE_CUBE_MAP,E);for(let ie=0;ie<6;ie++)if(E.mipmaps&&E.mipmaps.length>0)for(let fe=0;fe<E.mipmaps.length;fe++)Q(X.__webglFramebuffer[ie][fe],C,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,fe);else Q(X.__webglFramebuffer[ie],C,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);p(E)&&m(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let ie=0,fe=te.length;ie<fe;ie++){const Ge=te[ie],ne=n.get(Ge);t.bindTexture(r.TEXTURE_2D,ne.__webglTexture),oe(r.TEXTURE_2D,Ge),Q(X.__webglFramebuffer,C,Ge,r.COLOR_ATTACHMENT0+ie,r.TEXTURE_2D,0),p(Ge)&&m(r.TEXTURE_2D)}t.unbindTexture()}else{let ie=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ie=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ie,j.__webglTexture),oe(ie,E),E.mipmaps&&E.mipmaps.length>0)for(let fe=0;fe<E.mipmaps.length;fe++)Q(X.__webglFramebuffer[fe],C,E,r.COLOR_ATTACHMENT0,ie,fe);else Q(X.__webglFramebuffer,C,E,r.COLOR_ATTACHMENT0,ie,0);p(E)&&m(ie),t.unbindTexture()}C.depthBuffer&&we(C)}function Ve(C){const E=C.textures;for(let X=0,j=E.length;X<j;X++){const te=E[X];if(p(te)){const Z=C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,ye=n.get(te).__webglTexture;t.bindTexture(Z,ye),m(Z),t.unbindTexture()}}}const Ne=[],L=[];function rt(C){if(C.samples>0){if(ze(C)===!1){const E=C.textures,X=C.width,j=C.height;let te=r.COLOR_BUFFER_BIT;const Z=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ye=n.get(C),ie=E.length>1;if(ie)for(let fe=0;fe<E.length;fe++)t.bindFramebuffer(r.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,ye.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let fe=0;fe<E.length;fe++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(te|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(te|=r.STENCIL_BUFFER_BIT)),ie){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ye.__webglColorRenderbuffer[fe]);const Ge=n.get(E[fe]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ge,0)}r.blitFramebuffer(0,0,X,j,0,0,X,j,te,r.NEAREST),l===!0&&(Ne.length=0,L.length=0,Ne.push(r.COLOR_ATTACHMENT0+fe),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Ne.push(Z),L.push(Z),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,L)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ne))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ie)for(let fe=0;fe<E.length;fe++){t.bindFramebuffer(r.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.RENDERBUFFER,ye.__webglColorRenderbuffer[fe]);const Ge=n.get(E[fe]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,ye.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.TEXTURE_2D,Ge,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const E=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}}function Oe(C){return Math.min(i.maxSamples,C.samples)}function ze(C){const E=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function B(C){const E=a.render.frame;h.get(C)!==E&&(h.set(C,E),C.update())}function je(C,E){const X=C.colorSpace,j=C.format,te=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||X!==xr&&X!==Qi&&(dt.getTransfer(X)===bt?(j!==hi||te!==Gi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),E}function De(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=P,this.resetTextureUnits=b,this.setTexture2D=k,this.setTexture2DArray=Y,this.setTexture3D=z,this.setTextureCube=G,this.rebindTextures=Me,this.setupRenderTarget=We,this.updateRenderTargetMipmap=Ve,this.updateMultisampleRenderTarget=rt,this.setupDepthRenderbuffer=we,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=ze}function eM(r,e){function t(n,i=Qi){let s;const a=dt.getTransfer(i);if(n===Gi)return r.UNSIGNED_BYTE;if(n===iu)return r.UNSIGNED_SHORT_4_4_4_4;if(n===ru)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Up)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Lp)return r.BYTE;if(n===Ip)return r.SHORT;if(n===Ua)return r.UNSIGNED_SHORT;if(n===nu)return r.INT;if(n===Kr)return r.UNSIGNED_INT;if(n===Fi)return r.FLOAT;if(n===Oa)return r.HALF_FLOAT;if(n===Np)return r.ALPHA;if(n===Op)return r.RGB;if(n===hi)return r.RGBA;if(n===Fp)return r.LUMINANCE;if(n===kp)return r.LUMINANCE_ALPHA;if(n===Ds)return r.DEPTH_COMPONENT;if(n===Vs)return r.DEPTH_STENCIL;if(n===Bp)return r.RED;if(n===su)return r.RED_INTEGER;if(n===zp)return r.RG;if(n===au)return r.RG_INTEGER;if(n===ou)return r.RGBA_INTEGER;if(n===Fo||n===ko||n===Bo||n===zo)if(a===bt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Fo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ko)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Bo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===zo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Fo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ko)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Bo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===zo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===jc||n===Jc||n===Qc||n===eh)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===jc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Jc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Qc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===eh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===th||n===nh||n===ih)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===th||n===nh)return a===bt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===ih)return a===bt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===rh||n===sh||n===ah||n===oh||n===lh||n===ch||n===hh||n===uh||n===dh||n===fh||n===ph||n===mh||n===gh||n===_h)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===rh)return a===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===sh)return a===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ah)return a===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===oh)return a===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===lh)return a===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ch)return a===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===hh)return a===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===uh)return a===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===dh)return a===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===fh)return a===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ph)return a===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===mh)return a===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===gh)return a===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===_h)return a===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ho||n===vh||n===xh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Ho)return a===bt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===vh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===xh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Hp||n===yh||n===Sh||n===Mh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Ho)return s.COMPRESSED_RED_RGTC1_EXT;if(n===yh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Sh)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Mh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Gs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}class tM extends Kn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class bo extends gn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const nM={type:"move"};class dc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bo,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bo,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bo,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),m=this._getHandJoint(c,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&u>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(nM)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new bo;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const iM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,rM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class sM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new An,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new _r({vertexShader:iM,fragmentShader:rM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Si(new gl(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class aM extends Xs{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,u=null,d=null,g=null;const _=new sM,p=t.getContextAttributes();let m=null,v=null;const x=[],M=[],A=new yt;let T=null;const S=new Kn;S.layers.enable(1),S.viewport=new Ft;const R=new Kn;R.layers.enable(2),R.viewport=new Ft;const I=[S,R],y=new tM;y.layers.enable(1),y.layers.enable(2);let b=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let Q=x[$];return Q===void 0&&(Q=new dc,x[$]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function($){let Q=x[$];return Q===void 0&&(Q=new dc,x[$]=Q),Q.getGripSpace()},this.getHand=function($){let Q=x[$];return Q===void 0&&(Q=new dc,x[$]=Q),Q.getHandSpace()};function U($){const Q=M.indexOf($.inputSource);if(Q===-1)return;const de=x[Q];de!==void 0&&(de.update($.inputSource,$.frame,c||a),de.dispatchEvent({type:$.type,data:$.inputSource}))}function k(){i.removeEventListener("select",U),i.removeEventListener("selectstart",U),i.removeEventListener("selectend",U),i.removeEventListener("squeeze",U),i.removeEventListener("squeezestart",U),i.removeEventListener("squeezeend",U),i.removeEventListener("end",k),i.removeEventListener("inputsourceschange",Y);for(let $=0;$<x.length;$++){const Q=M[$];Q!==null&&(M[$]=null,x[$].disconnect(Q))}b=null,P=null,_.reset(),e.setRenderTarget(m),d=null,u=null,f=null,i=null,v=null,Xe.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",U),i.addEventListener("selectstart",U),i.addEventListener("selectend",U),i.addEventListener("squeeze",U),i.addEventListener("squeezestart",U),i.addEventListener("squeezeend",U),i.addEventListener("end",k),i.addEventListener("inputsourceschange",Y),p.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(A),i.renderState.layers===void 0){const Q={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,t,Q),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new Zr(d.framebufferWidth,d.framebufferHeight,{format:hi,type:Gi,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let Q=null,de=null,ae=null;p.depth&&(ae=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Q=p.stencil?Vs:Ds,de=p.stencil?Gs:Kr);const we={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:s};f=new XRWebGLBinding(i,t),u=f.createProjectionLayer(we),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),v=new Zr(u.textureWidth,u.textureHeight,{format:hi,type:Gi,depthTexture:new tm(u.textureWidth,u.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Xe.setContext(i),Xe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Y($){for(let Q=0;Q<$.removed.length;Q++){const de=$.removed[Q],ae=M.indexOf(de);ae>=0&&(M[ae]=null,x[ae].disconnect(de))}for(let Q=0;Q<$.added.length;Q++){const de=$.added[Q];let ae=M.indexOf(de);if(ae===-1){for(let Me=0;Me<x.length;Me++)if(Me>=M.length){M.push(de),ae=Me;break}else if(M[Me]===null){M[Me]=de,ae=Me;break}if(ae===-1)break}const we=x[ae];we&&we.connect(de)}}const z=new q,G=new q;function W($,Q,de){z.setFromMatrixPosition(Q.matrixWorld),G.setFromMatrixPosition(de.matrixWorld);const ae=z.distanceTo(G),we=Q.projectionMatrix.elements,Me=de.projectionMatrix.elements,We=we[14]/(we[10]-1),Ve=we[14]/(we[10]+1),Ne=(we[9]+1)/we[5],L=(we[9]-1)/we[5],rt=(we[8]-1)/we[0],Oe=(Me[8]+1)/Me[0],ze=We*rt,B=We*Oe,je=ae/(-rt+Oe),De=je*-rt;if(Q.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(De),$.translateZ(je),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),we[10]===-1)$.projectionMatrix.copy(Q.projectionMatrix),$.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const C=We+je,E=Ve+je,X=ze-De,j=B+(ae-De),te=Ne*Ve/E*C,Z=L*Ve/E*C;$.projectionMatrix.makePerspective(X,j,te,Z,C,E),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function re($,Q){Q===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(Q.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let Q=$.near,de=$.far;_.texture!==null&&(_.depthNear>0&&(Q=_.depthNear),_.depthFar>0&&(de=_.depthFar)),y.near=R.near=S.near=Q,y.far=R.far=S.far=de,(b!==y.near||P!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),b=y.near,P=y.far);const ae=$.parent,we=y.cameras;re(y,ae);for(let Me=0;Me<we.length;Me++)re(we[Me],ae);we.length===2?W(y,S,R):y.projectionMatrix.copy(S.projectionMatrix),D($,y,ae)};function D($,Q,de){de===null?$.matrix.copy(Q.matrixWorld):($.matrix.copy(de.matrixWorld),$.matrix.invert(),$.matrix.multiply(Q.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(Q.projectionMatrix),$.projectionMatrixInverse.copy(Q.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=bh*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function($){l=$,u!==null&&(u.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let oe=null;function Be($,Q){if(h=Q.getViewerPose(c||a),g=Q,h!==null){const de=h.views;d!==null&&(e.setRenderTargetFramebuffer(v,d.framebuffer),e.setRenderTarget(v));let ae=!1;de.length!==y.cameras.length&&(y.cameras.length=0,ae=!0);for(let Me=0;Me<de.length;Me++){const We=de[Me];let Ve=null;if(d!==null)Ve=d.getViewport(We);else{const L=f.getViewSubImage(u,We);Ve=L.viewport,Me===0&&(e.setRenderTargetTextures(v,L.colorTexture,u.ignoreDepthValues?void 0:L.depthStencilTexture),e.setRenderTarget(v))}let Ne=I[Me];Ne===void 0&&(Ne=new Kn,Ne.layers.enable(Me),Ne.viewport=new Ft,I[Me]=Ne),Ne.matrix.fromArray(We.transform.matrix),Ne.matrix.decompose(Ne.position,Ne.quaternion,Ne.scale),Ne.projectionMatrix.fromArray(We.projectionMatrix),Ne.projectionMatrixInverse.copy(Ne.projectionMatrix).invert(),Ne.viewport.set(Ve.x,Ve.y,Ve.width,Ve.height),Me===0&&(y.matrix.copy(Ne.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ae===!0&&y.cameras.push(Ne)}const we=i.enabledFeatures;if(we&&we.includes("depth-sensing")){const Me=f.getDepthInformation(de[0]);Me&&Me.isValid&&Me.texture&&_.init(e,Me,i.renderState)}}for(let de=0;de<x.length;de++){const ae=M[de],we=x[de];ae!==null&&we!==void 0&&we.update(ae,Q,c||a)}oe&&oe($,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const Xe=new em;Xe.setAnimationLoop(Be),this.setAnimationLoop=function($){oe=$},this.dispose=function(){}}}const Ar=new Vi,oM=new Lt;function lM(r,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Zp(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,v,x,M){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),f(p,m)):m.isMeshPhongMaterial?(s(p,m),h(p,m)):m.isMeshStandardMaterial?(s(p,m),u(p,m),m.isMeshPhysicalMaterial&&d(p,m,M)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),_(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,v,x):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===wn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===wn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const v=e.get(m),x=v.envMap,M=v.envMapRotation;x&&(p.envMap.value=x,Ar.copy(M),Ar.x*=-1,Ar.y*=-1,Ar.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Ar.y*=-1,Ar.z*=-1),p.envMapRotation.value.setFromMatrix4(oM.makeRotationFromEuler(Ar)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,v,x){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*v,p.scale.value=x*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function f(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,v){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===wn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const v=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function cM(r,e,t,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,x){const M=x.program;n.uniformBlockBinding(v,M)}function c(v,x){let M=i[v.id];M===void 0&&(g(v),M=h(v),i[v.id]=M,v.addEventListener("dispose",p));const A=x.program;n.updateUBOMapping(v,A);const T=e.render.frame;s[v.id]!==T&&(u(v),s[v.id]=T)}function h(v){const x=f();v.__bindingPointIndex=x;const M=r.createBuffer(),A=v.__size,T=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,M),r.bufferData(r.UNIFORM_BUFFER,A,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,M),M}function f(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){const x=i[v.id],M=v.uniforms,A=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let T=0,S=M.length;T<S;T++){const R=Array.isArray(M[T])?M[T]:[M[T]];for(let I=0,y=R.length;I<y;I++){const b=R[I];if(d(b,T,I,A)===!0){const P=b.__offset,U=Array.isArray(b.value)?b.value:[b.value];let k=0;for(let Y=0;Y<U.length;Y++){const z=U[Y],G=_(z);typeof z=="number"||typeof z=="boolean"?(b.__data[0]=z,r.bufferSubData(r.UNIFORM_BUFFER,P+k,b.__data)):z.isMatrix3?(b.__data[0]=z.elements[0],b.__data[1]=z.elements[1],b.__data[2]=z.elements[2],b.__data[3]=0,b.__data[4]=z.elements[3],b.__data[5]=z.elements[4],b.__data[6]=z.elements[5],b.__data[7]=0,b.__data[8]=z.elements[6],b.__data[9]=z.elements[7],b.__data[10]=z.elements[8],b.__data[11]=0):(z.toArray(b.__data,k),k+=G.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,P,b.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(v,x,M,A){const T=v.value,S=x+"_"+M;if(A[S]===void 0)return typeof T=="number"||typeof T=="boolean"?A[S]=T:A[S]=T.clone(),!0;{const R=A[S];if(typeof T=="number"||typeof T=="boolean"){if(R!==T)return A[S]=T,!0}else if(R.equals(T)===!1)return R.copy(T),!0}return!1}function g(v){const x=v.uniforms;let M=0;const A=16;for(let S=0,R=x.length;S<R;S++){const I=Array.isArray(x[S])?x[S]:[x[S]];for(let y=0,b=I.length;y<b;y++){const P=I[y],U=Array.isArray(P.value)?P.value:[P.value];for(let k=0,Y=U.length;k<Y;k++){const z=U[k],G=_(z),W=M%A,re=W%G.boundary,D=W+re;M+=re,D!==0&&A-D<G.storage&&(M+=A-D),P.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=M,M+=G.storage}}}const T=M%A;return T>0&&(M+=A-T),v.__size=M,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function p(v){const x=v.target;x.removeEventListener("dispose",p);const M=a.indexOf(x.__bindingPointIndex);a.splice(M,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function m(){for(const v in i)r.deleteBuffer(i[v]);a=[],i={},s={}}return{bind:l,update:c,dispose:m}}class hM{constructor(e={}){const{canvas:t=Z_(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let u;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=n.getContextAttributes().alpha}else u=a;const d=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=mi,this.toneMapping=hr,this.toneMappingExposure=1;const x=this;let M=!1,A=0,T=0,S=null,R=-1,I=null;const y=new Ft,b=new Ft;let P=null;const U=new ct(0);let k=0,Y=t.width,z=t.height,G=1,W=null,re=null;const D=new Ft(0,0,Y,z),oe=new Ft(0,0,Y,z);let Be=!1;const Xe=new Qp;let $=!1,Q=!1;const de=new Lt,ae=new Lt,we=new q,Me=new Ft,We={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function Ne(){return S===null?G:1}let L=n;function rt(w,F){return t.getContext(w,F)}try{const w={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${tu}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",le,!1),t.addEventListener("webglcontextcreationerror",ce,!1),L===null){const F="webgl2";if(L=rt(F,w),L===null)throw rt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Oe,ze,B,je,De,C,E,X,j,te,Z,ye,ie,fe,Ge,ne,ve,xe,Ie,_e,Ye,Fe,st,N;function ee(){Oe=new my(L),Oe.init(),Fe=new eM(L,Oe),ze=new ly(L,Oe,e,Fe),B=new jS(L),ze.reverseDepthBuffer&&B.buffers.depth.setReversed(!0),je=new vy(L),De=new OS,C=new QS(L,Oe,B,De,ze,Fe,je),E=new hy(x),X=new py(x),j=new E0(L),st=new ay(L,j),te=new gy(L,j,je,st),Z=new yy(L,te,j,je),Ie=new xy(L,ze,C),ne=new cy(De),ye=new NS(x,E,X,Oe,ze,st,ne),ie=new lM(x,De),fe=new kS,Ge=new WS(Oe),xe=new sy(x,E,X,B,Z,u,l),ve=new KS(x,Z,ze),N=new cM(L,je,ze,B),_e=new oy(L,Oe,je),Ye=new _y(L,Oe,je),je.programs=ye.programs,x.capabilities=ze,x.extensions=Oe,x.properties=De,x.renderLists=fe,x.shadowMap=ve,x.state=B,x.info=je}ee();const K=new aM(x,L);this.xr=K,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const w=Oe.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Oe.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(w){w!==void 0&&(G=w,this.setSize(Y,z,!1))},this.getSize=function(w){return w.set(Y,z)},this.setSize=function(w,F,H=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=w,z=F,t.width=Math.floor(w*G),t.height=Math.floor(F*G),H===!0&&(t.style.width=w+"px",t.style.height=F+"px"),this.setViewport(0,0,w,F)},this.getDrawingBufferSize=function(w){return w.set(Y*G,z*G).floor()},this.setDrawingBufferSize=function(w,F,H){Y=w,z=F,G=H,t.width=Math.floor(w*H),t.height=Math.floor(F*H),this.setViewport(0,0,w,F)},this.getCurrentViewport=function(w){return w.copy(y)},this.getViewport=function(w){return w.copy(D)},this.setViewport=function(w,F,H,V){w.isVector4?D.set(w.x,w.y,w.z,w.w):D.set(w,F,H,V),B.viewport(y.copy(D).multiplyScalar(G).round())},this.getScissor=function(w){return w.copy(oe)},this.setScissor=function(w,F,H,V){w.isVector4?oe.set(w.x,w.y,w.z,w.w):oe.set(w,F,H,V),B.scissor(b.copy(oe).multiplyScalar(G).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(w){B.setScissorTest(Be=w)},this.setOpaqueSort=function(w){W=w},this.setTransparentSort=function(w){re=w},this.getClearColor=function(w){return w.copy(xe.getClearColor())},this.setClearColor=function(){xe.setClearColor.apply(xe,arguments)},this.getClearAlpha=function(){return xe.getClearAlpha()},this.setClearAlpha=function(){xe.setClearAlpha.apply(xe,arguments)},this.clear=function(w=!0,F=!0,H=!0){let V=0;if(w){let O=!1;if(S!==null){const se=S.texture.format;O=se===ou||se===au||se===su}if(O){const se=S.texture.type,ge=se===Gi||se===Kr||se===Ua||se===Gs||se===iu||se===ru,ue=xe.getClearColor(),he=xe.getClearAlpha(),Ae=ue.r,Ue=ue.g,Ee=ue.b;ge?(d[0]=Ae,d[1]=Ue,d[2]=Ee,d[3]=he,L.clearBufferuiv(L.COLOR,0,d)):(g[0]=Ae,g[1]=Ue,g[2]=Ee,g[3]=he,L.clearBufferiv(L.COLOR,0,g))}else V|=L.COLOR_BUFFER_BIT}F&&(V|=L.DEPTH_BUFFER_BIT,L.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),H&&(V|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",le,!1),t.removeEventListener("webglcontextcreationerror",ce,!1),fe.dispose(),Ge.dispose(),De.dispose(),E.dispose(),X.dispose(),Z.dispose(),st.dispose(),N.dispose(),ye.dispose(),K.dispose(),K.removeEventListener("sessionstart",lt),K.removeEventListener("sessionend",pe),Le.stop()};function J(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function le(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const w=je.autoReset,F=ve.enabled,H=ve.autoUpdate,V=ve.needsUpdate,O=ve.type;ee(),je.autoReset=w,ve.enabled=F,ve.autoUpdate=H,ve.needsUpdate=V,ve.type=O}function ce(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function qe(w){const F=w.target;F.removeEventListener("dispose",qe),gt(F)}function gt(w){Et(w),De.remove(w)}function Et(w){const F=De.get(w).programs;F!==void 0&&(F.forEach(function(H){ye.releaseProgram(H)}),w.isShaderMaterial&&ye.releaseShaderCache(w))}this.renderBufferDirect=function(w,F,H,V,O,se){F===null&&(F=We);const ge=O.isMesh&&O.matrixWorld.determinant()<0,ue=ft(w,F,H,V,O);B.setMaterial(V,ge);let he=H.index,Ae=1;if(V.wireframe===!0){if(he=te.getWireframeAttribute(H),he===void 0)return;Ae=2}const Ue=H.drawRange,Ee=H.attributes.position;let at=Ue.start*Ae,it=(Ue.start+Ue.count)*Ae;se!==null&&(at=Math.max(at,se.start*Ae),it=Math.min(it,(se.start+se.count)*Ae)),he!==null?(at=Math.max(at,0),it=Math.min(it,he.count)):Ee!=null&&(at=Math.max(at,0),it=Math.min(it,Ee.count));const mt=it-at;if(mt<0||mt===1/0)return;st.setup(O,V,ue,H,he);let Yt,Je=_e;if(he!==null&&(Yt=j.get(he),Je=Ye,Je.setIndex(Yt)),O.isMesh)V.wireframe===!0?(B.setLineWidth(V.wireframeLinewidth*Ne()),Je.setMode(L.LINES)):Je.setMode(L.TRIANGLES);else if(O.isLine){let Pe=V.linewidth;Pe===void 0&&(Pe=1),B.setLineWidth(Pe*Ne()),O.isLineSegments?Je.setMode(L.LINES):O.isLineLoop?Je.setMode(L.LINE_LOOP):Je.setMode(L.LINE_STRIP)}else O.isPoints?Je.setMode(L.POINTS):O.isSprite&&Je.setMode(L.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)Je.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Oe.get("WEBGL_multi_draw"))Je.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Pe=O._multiDrawStarts,jt=O._multiDrawCounts,ht=O._multiDrawCount,ti=he?j.get(he).bytesPerElement:1,Jr=De.get(V).currentProgram.getUniforms();for(let Pn=0;Pn<ht;Pn++)Jr.setValue(L,"_gl_DrawID",Pn),Je.render(Pe[Pn]/ti,jt[Pn])}else if(O.isInstancedMesh)Je.renderInstances(at,mt,O.count);else if(H.isInstancedBufferGeometry){const Pe=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,jt=Math.min(H.instanceCount,Pe);Je.renderInstances(at,mt,jt)}else Je.render(at,mt)};function nt(w,F,H){w.transparent===!0&&w.side===Ui&&w.forceSinglePass===!1?(w.side=wn,w.needsUpdate=!0,Ut(w,F,H),w.side=gr,w.needsUpdate=!0,Ut(w,F,H),w.side=Ui):Ut(w,F,H)}this.compile=function(w,F,H=null){H===null&&(H=w),p=Ge.get(H),p.init(F),v.push(p),H.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),w!==H&&w.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const V=new Set;return w.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const se=O.material;if(se)if(Array.isArray(se))for(let ge=0;ge<se.length;ge++){const ue=se[ge];nt(ue,H,O),V.add(ue)}else nt(se,H,O),V.add(se)}),v.pop(),p=null,V},this.compileAsync=function(w,F,H=null){const V=this.compile(w,F,H);return new Promise(O=>{function se(){if(V.forEach(function(ge){De.get(ge).currentProgram.isReady()&&V.delete(ge)}),V.size===0){O(w);return}setTimeout(se,10)}Oe.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let Re=null;function be(w){Re&&Re(w)}function lt(){Le.stop()}function pe(){Le.start()}const Le=new em;Le.setAnimationLoop(be),typeof self<"u"&&Le.setContext(self),this.setAnimationLoop=function(w){Re=w,K.setAnimationLoop(w),w===null?Le.stop():Le.start()},K.addEventListener("sessionstart",lt),K.addEventListener("sessionend",pe),this.render=function(w,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(F),F=K.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,F,S),p=Ge.get(w,v.length),p.init(F),v.push(p),ae.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Xe.setFromProjectionMatrix(ae),Q=this.localClippingEnabled,$=ne.init(this.clippingPlanes,Q),_=fe.get(w,m.length),_.init(),m.push(_),K.enabled===!0&&K.isPresenting===!0){const se=x.xr.getDepthSensingMesh();se!==null&&Ce(se,F,-1/0,x.sortObjects)}Ce(w,F,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(W,re),Ve=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,Ve&&xe.addToRenderList(_,w),this.info.render.frame++,$===!0&&ne.beginShadows();const H=p.state.shadowsArray;ve.render(H,w,F),$===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=_.opaque,O=_.transmissive;if(p.setupLights(),F.isArrayCamera){const se=F.cameras;if(O.length>0)for(let ge=0,ue=se.length;ge<ue;ge++){const he=se[ge];It(V,O,w,he)}Ve&&xe.render(w);for(let ge=0,ue=se.length;ge<ue;ge++){const he=se[ge];He(_,w,he,he.viewport)}}else O.length>0&&It(V,O,w,F),Ve&&xe.render(w),He(_,w,F);S!==null&&(C.updateMultisampleRenderTarget(S),C.updateRenderTargetMipmap(S)),w.isScene===!0&&w.onAfterRender(x,w,F),st.resetDefaultState(),R=-1,I=null,v.pop(),v.length>0?(p=v[v.length-1],$===!0&&ne.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function Ce(w,F,H,V){if(w.visible===!1)return;if(w.layers.test(F.layers)){if(w.isGroup)H=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(F);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Xe.intersectsSprite(w)){V&&Me.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ae);const ge=Z.update(w),ue=w.material;ue.visible&&_.push(w,ge,ue,H,Me.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Xe.intersectsObject(w))){const ge=Z.update(w),ue=w.material;if(V&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Me.copy(w.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),Me.copy(ge.boundingSphere.center)),Me.applyMatrix4(w.matrixWorld).applyMatrix4(ae)),Array.isArray(ue)){const he=ge.groups;for(let Ae=0,Ue=he.length;Ae<Ue;Ae++){const Ee=he[Ae],at=ue[Ee.materialIndex];at&&at.visible&&_.push(w,ge,at,H,Me.z,Ee)}}else ue.visible&&_.push(w,ge,ue,H,Me.z,null)}}const se=w.children;for(let ge=0,ue=se.length;ge<ue;ge++)Ce(se[ge],F,H,V)}function He(w,F,H,V){const O=w.opaque,se=w.transmissive,ge=w.transparent;p.setupLightsView(H),$===!0&&ne.setGlobalState(x.clippingPlanes,H),V&&B.viewport(y.copy(V)),O.length>0&&$e(O,F,H),se.length>0&&$e(se,F,H),ge.length>0&&$e(ge,F,H),B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function It(w,F,H,V){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[V.id]===void 0&&(p.state.transmissionRenderTarget[V.id]=new Zr(1,1,{generateMipmaps:!0,type:Oe.has("EXT_color_buffer_half_float")||Oe.has("EXT_color_buffer_float")?Oa:Gi,minFilter:kr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:dt.workingColorSpace}));const se=p.state.transmissionRenderTarget[V.id],ge=V.viewport||y;se.setSize(ge.z,ge.w);const ue=x.getRenderTarget();x.setRenderTarget(se),x.getClearColor(U),k=x.getClearAlpha(),k<1&&x.setClearColor(16777215,.5),x.clear(),Ve&&xe.render(H);const he=x.toneMapping;x.toneMapping=hr;const Ae=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),p.setupLightsView(V),$===!0&&ne.setGlobalState(x.clippingPlanes,V),$e(w,H,V),C.updateMultisampleRenderTarget(se),C.updateRenderTargetMipmap(se),Oe.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let Ee=0,at=F.length;Ee<at;Ee++){const it=F[Ee],mt=it.object,Yt=it.geometry,Je=it.material,Pe=it.group;if(Je.side===Ui&&mt.layers.test(V.layers)){const jt=Je.side;Je.side=wn,Je.needsUpdate=!0,Tt(mt,H,V,Yt,Je,Pe),Je.side=jt,Je.needsUpdate=!0,Ue=!0}}Ue===!0&&(C.updateMultisampleRenderTarget(se),C.updateRenderTargetMipmap(se))}x.setRenderTarget(ue),x.setClearColor(U,k),Ae!==void 0&&(V.viewport=Ae),x.toneMapping=he}function $e(w,F,H){const V=F.isScene===!0?F.overrideMaterial:null;for(let O=0,se=w.length;O<se;O++){const ge=w[O],ue=ge.object,he=ge.geometry,Ae=V===null?ge.material:V,Ue=ge.group;ue.layers.test(H.layers)&&Tt(ue,F,H,he,Ae,Ue)}}function Tt(w,F,H,V,O,se){w.onBeforeRender(x,F,H,V,O,se),w.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),O.onBeforeRender(x,F,H,V,w,se),O.transparent===!0&&O.side===Ui&&O.forceSinglePass===!1?(O.side=wn,O.needsUpdate=!0,x.renderBufferDirect(H,F,V,O,w,se),O.side=gr,O.needsUpdate=!0,x.renderBufferDirect(H,F,V,O,w,se),O.side=Ui):x.renderBufferDirect(H,F,V,O,w,se),w.onAfterRender(x,F,H,V,O,se)}function Ut(w,F,H){F.isScene!==!0&&(F=We);const V=De.get(w),O=p.state.lights,se=p.state.shadowsArray,ge=O.state.version,ue=ye.getParameters(w,O.state,se,F,H),he=ye.getProgramCacheKey(ue);let Ae=V.programs;V.environment=w.isMeshStandardMaterial?F.environment:null,V.fog=F.fog,V.envMap=(w.isMeshStandardMaterial?X:E).get(w.envMap||V.environment),V.envMapRotation=V.environment!==null&&w.envMap===null?F.environmentRotation:w.envMapRotation,Ae===void 0&&(w.addEventListener("dispose",qe),Ae=new Map,V.programs=Ae);let Ue=Ae.get(he);if(Ue!==void 0){if(V.currentProgram===Ue&&V.lightsStateVersion===ge)return _t(w,ue),Ue}else ue.uniforms=ye.getUniforms(w),w.onBeforeCompile(ue,x),Ue=ye.acquireProgram(ue,he),Ae.set(he,Ue),V.uniforms=ue.uniforms;const Ee=V.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ee.clippingPlanes=ne.uniform),_t(w,ue),V.needsLights=Mt(w),V.lightsStateVersion=ge,V.needsLights&&(Ee.ambientLightColor.value=O.state.ambient,Ee.lightProbe.value=O.state.probe,Ee.directionalLights.value=O.state.directional,Ee.directionalLightShadows.value=O.state.directionalShadow,Ee.spotLights.value=O.state.spot,Ee.spotLightShadows.value=O.state.spotShadow,Ee.rectAreaLights.value=O.state.rectArea,Ee.ltc_1.value=O.state.rectAreaLTC1,Ee.ltc_2.value=O.state.rectAreaLTC2,Ee.pointLights.value=O.state.point,Ee.pointLightShadows.value=O.state.pointShadow,Ee.hemisphereLights.value=O.state.hemi,Ee.directionalShadowMap.value=O.state.directionalShadowMap,Ee.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Ee.spotShadowMap.value=O.state.spotShadowMap,Ee.spotLightMatrix.value=O.state.spotLightMatrix,Ee.spotLightMap.value=O.state.spotLightMap,Ee.pointShadowMap.value=O.state.pointShadowMap,Ee.pointShadowMatrix.value=O.state.pointShadowMatrix),V.currentProgram=Ue,V.uniformsList=null,Ue}function St(w){if(w.uniformsList===null){const F=w.currentProgram.getUniforms();w.uniformsList=Vo.seqWithValue(F.seq,w.uniforms)}return w.uniformsList}function _t(w,F){const H=De.get(w);H.outputColorSpace=F.outputColorSpace,H.batching=F.batching,H.batchingColor=F.batchingColor,H.instancing=F.instancing,H.instancingColor=F.instancingColor,H.instancingMorph=F.instancingMorph,H.skinning=F.skinning,H.morphTargets=F.morphTargets,H.morphNormals=F.morphNormals,H.morphColors=F.morphColors,H.morphTargetsCount=F.morphTargetsCount,H.numClippingPlanes=F.numClippingPlanes,H.numIntersection=F.numClipIntersection,H.vertexAlphas=F.vertexAlphas,H.vertexTangents=F.vertexTangents,H.toneMapping=F.toneMapping}function ft(w,F,H,V,O){F.isScene!==!0&&(F=We),C.resetTextureUnits();const se=F.fog,ge=V.isMeshStandardMaterial?F.environment:null,ue=S===null?x.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:xr,he=(V.isMeshStandardMaterial?X:E).get(V.envMap||ge),Ae=V.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Ue=!!H.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ee=!!H.morphAttributes.position,at=!!H.morphAttributes.normal,it=!!H.morphAttributes.color;let mt=hr;V.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(mt=x.toneMapping);const Yt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Je=Yt!==void 0?Yt.length:0,Pe=De.get(V),jt=p.state.lights;if($===!0&&(Q===!0||w!==I)){const Wn=w===I&&V.id===R;ne.setState(V,w,Wn)}let ht=!1;V.version===Pe.__version?(Pe.needsLights&&Pe.lightsStateVersion!==jt.state.version||Pe.outputColorSpace!==ue||O.isBatchedMesh&&Pe.batching===!1||!O.isBatchedMesh&&Pe.batching===!0||O.isBatchedMesh&&Pe.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Pe.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Pe.instancing===!1||!O.isInstancedMesh&&Pe.instancing===!0||O.isSkinnedMesh&&Pe.skinning===!1||!O.isSkinnedMesh&&Pe.skinning===!0||O.isInstancedMesh&&Pe.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Pe.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Pe.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Pe.instancingMorph===!1&&O.morphTexture!==null||Pe.envMap!==he||V.fog===!0&&Pe.fog!==se||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==ne.numPlanes||Pe.numIntersection!==ne.numIntersection)||Pe.vertexAlphas!==Ae||Pe.vertexTangents!==Ue||Pe.morphTargets!==Ee||Pe.morphNormals!==at||Pe.morphColors!==it||Pe.toneMapping!==mt||Pe.morphTargetsCount!==Je)&&(ht=!0):(ht=!0,Pe.__version=V.version);let ti=Pe.currentProgram;ht===!0&&(ti=Ut(V,F,O));let Jr=!1,Pn=!1,xl=!1;const Nt=ti.getUniforms(),Wi=Pe.uniforms;if(B.useProgram(ti.program)&&(Jr=!0,Pn=!0,xl=!0),V.id!==R&&(R=V.id,Pn=!0),Jr||I!==w){ze.reverseDepthBuffer?(de.copy(w.projectionMatrix),J_(de),Q_(de),Nt.setValue(L,"projectionMatrix",de)):Nt.setValue(L,"projectionMatrix",w.projectionMatrix),Nt.setValue(L,"viewMatrix",w.matrixWorldInverse);const Wn=Nt.map.cameraPosition;Wn!==void 0&&Wn.setValue(L,we.setFromMatrixPosition(w.matrixWorld)),ze.logarithmicDepthBuffer&&Nt.setValue(L,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&Nt.setValue(L,"isOrthographic",w.isOrthographicCamera===!0),I!==w&&(I=w,Pn=!0,xl=!0)}if(O.isSkinnedMesh){Nt.setOptional(L,O,"bindMatrix"),Nt.setOptional(L,O,"bindMatrixInverse");const Wn=O.skeleton;Wn&&(Wn.boneTexture===null&&Wn.computeBoneTexture(),Nt.setValue(L,"boneTexture",Wn.boneTexture,C))}O.isBatchedMesh&&(Nt.setOptional(L,O,"batchingTexture"),Nt.setValue(L,"batchingTexture",O._matricesTexture,C),Nt.setOptional(L,O,"batchingIdTexture"),Nt.setValue(L,"batchingIdTexture",O._indirectTexture,C),Nt.setOptional(L,O,"batchingColorTexture"),O._colorsTexture!==null&&Nt.setValue(L,"batchingColorTexture",O._colorsTexture,C));const yl=H.morphAttributes;if((yl.position!==void 0||yl.normal!==void 0||yl.color!==void 0)&&Ie.update(O,H,ti),(Pn||Pe.receiveShadow!==O.receiveShadow)&&(Pe.receiveShadow=O.receiveShadow,Nt.setValue(L,"receiveShadow",O.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Wi.envMap.value=he,Wi.flipEnvMap.value=he.isCubeTexture&&he.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&F.environment!==null&&(Wi.envMapIntensity.value=F.environmentIntensity),Pn&&(Nt.setValue(L,"toneMappingExposure",x.toneMappingExposure),Pe.needsLights&&Cn(Wi,xl),se&&V.fog===!0&&ie.refreshFogUniforms(Wi,se),ie.refreshMaterialUniforms(Wi,V,G,z,p.state.transmissionRenderTarget[w.id]),Vo.upload(L,St(Pe),Wi,C)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Vo.upload(L,St(Pe),Wi,C),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&Nt.setValue(L,"center",O.center),Nt.setValue(L,"modelViewMatrix",O.modelViewMatrix),Nt.setValue(L,"normalMatrix",O.normalMatrix),Nt.setValue(L,"modelMatrix",O.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Wn=V.uniformsGroups;for(let Sl=0,um=Wn.length;Sl<um;Sl++){const mu=Wn[Sl];N.update(mu,ti),N.bind(mu,ti)}}return ti}function Cn(w,F){w.ambientLightColor.needsUpdate=F,w.lightProbe.needsUpdate=F,w.directionalLights.needsUpdate=F,w.directionalLightShadows.needsUpdate=F,w.pointLights.needsUpdate=F,w.pointLightShadows.needsUpdate=F,w.spotLights.needsUpdate=F,w.spotLightShadows.needsUpdate=F,w.rectAreaLights.needsUpdate=F,w.hemisphereLights.needsUpdate=F}function Mt(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(w,F,H){De.get(w.texture).__webglTexture=F,De.get(w.depthTexture).__webglTexture=H;const V=De.get(w);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=H===void 0,V.__autoAllocateDepthBuffer||Oe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,F){const H=De.get(w);H.__webglFramebuffer=F,H.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(w,F=0,H=0){S=w,A=F,T=H;let V=!0,O=null,se=!1,ge=!1;if(w){const he=De.get(w);if(he.__useDefaultFramebuffer!==void 0)B.bindFramebuffer(L.FRAMEBUFFER,null),V=!1;else if(he.__webglFramebuffer===void 0)C.setupRenderTarget(w);else if(he.__hasExternalTextures)C.rebindTextures(w,De.get(w.texture).__webglTexture,De.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Ee=w.depthTexture;if(he.__boundDepthTexture!==Ee){if(Ee!==null&&De.has(Ee)&&(w.width!==Ee.image.width||w.height!==Ee.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(w)}}const Ae=w.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(ge=!0);const Ue=De.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ue[F])?O=Ue[F][H]:O=Ue[F],se=!0):w.samples>0&&C.useMultisampledRTT(w)===!1?O=De.get(w).__webglMultisampledFramebuffer:Array.isArray(Ue)?O=Ue[H]:O=Ue,y.copy(w.viewport),b.copy(w.scissor),P=w.scissorTest}else y.copy(D).multiplyScalar(G).floor(),b.copy(oe).multiplyScalar(G).floor(),P=Be;if(B.bindFramebuffer(L.FRAMEBUFFER,O)&&V&&B.drawBuffers(w,O),B.viewport(y),B.scissor(b),B.setScissorTest(P),se){const he=De.get(w.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+F,he.__webglTexture,H)}else if(ge){const he=De.get(w.texture),Ae=F||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,he.__webglTexture,H||0,Ae)}R=-1},this.readRenderTargetPixels=function(w,F,H,V,O,se,ge){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=De.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ge!==void 0&&(ue=ue[ge]),ue){B.bindFramebuffer(L.FRAMEBUFFER,ue);try{const he=w.texture,Ae=he.format,Ue=he.type;if(!ze.textureFormatReadable(Ae)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ze.textureTypeReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=w.width-V&&H>=0&&H<=w.height-O&&L.readPixels(F,H,V,O,Fe.convert(Ae),Fe.convert(Ue),se)}finally{const he=S!==null?De.get(S).__webglFramebuffer:null;B.bindFramebuffer(L.FRAMEBUFFER,he)}}},this.readRenderTargetPixelsAsync=async function(w,F,H,V,O,se,ge){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=De.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ge!==void 0&&(ue=ue[ge]),ue){const he=w.texture,Ae=he.format,Ue=he.type;if(!ze.textureFormatReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ze.textureTypeReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=w.width-V&&H>=0&&H<=w.height-O){B.bindFramebuffer(L.FRAMEBUFFER,ue);const Ee=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ee),L.bufferData(L.PIXEL_PACK_BUFFER,se.byteLength,L.STREAM_READ),L.readPixels(F,H,V,O,Fe.convert(Ae),Fe.convert(Ue),0);const at=S!==null?De.get(S).__webglFramebuffer:null;B.bindFramebuffer(L.FRAMEBUFFER,at);const it=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await j_(L,it,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ee),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,se),L.deleteBuffer(Ee),L.deleteSync(it),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,F=null,H=0){w.isTexture!==!0&&(Go("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,w=arguments[1]);const V=Math.pow(2,-H),O=Math.floor(w.image.width*V),se=Math.floor(w.image.height*V),ge=F!==null?F.x:0,ue=F!==null?F.y:0;C.setTexture2D(w,0),L.copyTexSubImage2D(L.TEXTURE_2D,H,0,0,ge,ue,O,se),B.unbindTexture()},this.copyTextureToTexture=function(w,F,H=null,V=null,O=0){w.isTexture!==!0&&(Go("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,w=arguments[1],F=arguments[2],O=arguments[3]||0,H=null);let se,ge,ue,he,Ae,Ue;H!==null?(se=H.max.x-H.min.x,ge=H.max.y-H.min.y,ue=H.min.x,he=H.min.y):(se=w.image.width,ge=w.image.height,ue=0,he=0),V!==null?(Ae=V.x,Ue=V.y):(Ae=0,Ue=0);const Ee=Fe.convert(F.format),at=Fe.convert(F.type);C.setTexture2D(F,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,F.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,F.unpackAlignment);const it=L.getParameter(L.UNPACK_ROW_LENGTH),mt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Yt=L.getParameter(L.UNPACK_SKIP_PIXELS),Je=L.getParameter(L.UNPACK_SKIP_ROWS),Pe=L.getParameter(L.UNPACK_SKIP_IMAGES),jt=w.isCompressedTexture?w.mipmaps[O]:w.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,jt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,jt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ue),L.pixelStorei(L.UNPACK_SKIP_ROWS,he),w.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,O,Ae,Ue,se,ge,Ee,at,jt.data):w.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,O,Ae,Ue,jt.width,jt.height,Ee,jt.data):L.texSubImage2D(L.TEXTURE_2D,O,Ae,Ue,se,ge,Ee,at,jt),L.pixelStorei(L.UNPACK_ROW_LENGTH,it),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,mt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Yt),L.pixelStorei(L.UNPACK_SKIP_ROWS,Je),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Pe),O===0&&F.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),B.unbindTexture()},this.copyTextureToTexture3D=function(w,F,H=null,V=null,O=0){w.isTexture!==!0&&(Go("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,V=arguments[1]||null,w=arguments[2],F=arguments[3],O=arguments[4]||0);let se,ge,ue,he,Ae,Ue,Ee,at,it;const mt=w.isCompressedTexture?w.mipmaps[O]:w.image;H!==null?(se=H.max.x-H.min.x,ge=H.max.y-H.min.y,ue=H.max.z-H.min.z,he=H.min.x,Ae=H.min.y,Ue=H.min.z):(se=mt.width,ge=mt.height,ue=mt.depth,he=0,Ae=0,Ue=0),V!==null?(Ee=V.x,at=V.y,it=V.z):(Ee=0,at=0,it=0);const Yt=Fe.convert(F.format),Je=Fe.convert(F.type);let Pe;if(F.isData3DTexture)C.setTexture3D(F,0),Pe=L.TEXTURE_3D;else if(F.isDataArrayTexture||F.isCompressedArrayTexture)C.setTexture2DArray(F,0),Pe=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,F.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,F.unpackAlignment);const jt=L.getParameter(L.UNPACK_ROW_LENGTH),ht=L.getParameter(L.UNPACK_IMAGE_HEIGHT),ti=L.getParameter(L.UNPACK_SKIP_PIXELS),Jr=L.getParameter(L.UNPACK_SKIP_ROWS),Pn=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,mt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,mt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,he),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ae),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ue),w.isDataTexture||w.isData3DTexture?L.texSubImage3D(Pe,O,Ee,at,it,se,ge,ue,Yt,Je,mt.data):F.isCompressedArrayTexture?L.compressedTexSubImage3D(Pe,O,Ee,at,it,se,ge,ue,Yt,mt.data):L.texSubImage3D(Pe,O,Ee,at,it,se,ge,ue,Yt,Je,mt),L.pixelStorei(L.UNPACK_ROW_LENGTH,jt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ht),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ti),L.pixelStorei(L.UNPACK_SKIP_ROWS,Jr),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Pn),O===0&&F.generateMipmaps&&L.generateMipmap(Pe),B.unbindTexture()},this.initRenderTarget=function(w){De.get(w).__webglFramebuffer===void 0&&C.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?C.setTextureCube(w,0):w.isData3DTexture?C.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?C.setTexture2DArray(w,0):C.setTexture2D(w,0),B.unbindTexture()},this.resetState=function(){A=0,T=0,S=null,B.reset(),st.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ki}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===lu?"display-p3":"srgb",t.unpackColorSpace=dt.workingColorSpace===ml?"display-p3":"srgb"}}class du{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ct(e),this.density=t}clone(){return new du(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class uM extends gn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vi,this.environmentIntensity=1,this.environmentRotation=new Vi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class am extends Ys{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ct(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ol=new q,ll=new q,Kd=new Lt,ia=new cu,Eo=new za,fc=new q,Zd=new q;class dM extends gn{constructor(e=new ei,t=new am){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)ol.fromBufferAttribute(t,i-1),ll.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=ol.distanceTo(ll);e.setAttribute("lineDistance",new di(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Eo.copy(n.boundingSphere),Eo.applyMatrix4(i),Eo.radius+=s,e.ray.intersectsSphere(Eo)===!1)return;Kd.copy(i).invert(),ia.copy(e.ray).applyMatrix4(Kd);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=d,p=g-1;_<p;_+=c){const m=h.getX(_),v=h.getX(_+1),x=To(this,e,ia,l,m,v);x&&t.push(x)}if(this.isLineLoop){const _=h.getX(g-1),p=h.getX(d),m=To(this,e,ia,l,_,p);m&&t.push(m)}}else{const d=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=d,p=g-1;_<p;_+=c){const m=To(this,e,ia,l,_,_+1);m&&t.push(m)}if(this.isLineLoop){const _=To(this,e,ia,l,g-1,d);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function To(r,e,t,n,i,s){const a=r.geometry.attributes.position;if(ol.fromBufferAttribute(a,i),ll.fromBufferAttribute(a,s),t.distanceSqToSegment(ol,ll,fc,Zd)>n)return;fc.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(fc);if(!(l<e.near||l>e.far))return{distance:l,point:Zd.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}class om extends Ys{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ct(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const jd=new Lt,Th=new cu,wo=new za,Ao=new q;class fM extends gn{constructor(e=new ei,t=new om){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wo.copy(n.boundingSphere),wo.applyMatrix4(i),wo.radius+=s,e.ray.intersectsSphere(wo)===!1)return;jd.copy(i).invert(),Th.copy(e.ray).applyMatrix4(jd);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,f=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let g=u,_=d;g<_;g++){const p=c.getX(g);Ao.fromBufferAttribute(f,p),Jd(Ao,p,l,i,e,t,this)}}else{const u=Math.max(0,a.start),d=Math.min(f.count,a.start+a.count);for(let g=u,_=d;g<_;g++)Ao.fromBufferAttribute(f,g),Jd(Ao,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Jd(r,e,t,n,i,s,a){const o=Th.distanceSqToPoint(r);if(o<t){const l=new q;Th.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class fu extends ei{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],f=new q,u=new q,d=[],g=[],_=[],p=[];for(let m=0;m<=n;m++){const v=[],x=m/n;let M=0;m===0&&a===0?M=.5/t:m===n&&l===Math.PI&&(M=-.5/t);for(let A=0;A<=t;A++){const T=A/t;f.x=-e*Math.cos(i+T*s)*Math.sin(a+x*o),f.y=e*Math.cos(a+x*o),f.z=e*Math.sin(i+T*s)*Math.sin(a+x*o),g.push(f.x,f.y,f.z),u.copy(f).normalize(),_.push(u.x,u.y,u.z),p.push(T+M,1-x),v.push(c++)}h.push(v)}for(let m=0;m<n;m++)for(let v=0;v<t;v++){const x=h[m][v+1],M=h[m][v],A=h[m+1][v],T=h[m+1][v+1];(m!==0||a>0)&&d.push(x,M,T),(m!==n-1||l<Math.PI)&&d.push(M,A,T)}this.setIndex(d),this.setAttribute("position",new di(g,3)),this.setAttribute("normal",new di(_,3)),this.setAttribute("uv",new di(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fu(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class pM{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Qd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Qd();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Qd(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:tu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=tu);function mM(r){if(!r)return;const e=matchMedia("(prefers-reduced-motion: reduce)").matches,t=new hM({canvas:r,antialias:!0,alpha:!0});t.setPixelRatio(Math.min(devicePixelRatio,2));const n=new uM;n.fog=new du(461068,.055);const i=new Kn(60,1,.1,100);i.position.set(0,2.2,14);const s=1400,a=new Float32Array(s*3),o=42;for(let S=0;S<s;S++)a[S*3]=(Math.random()-.5)*o,a[S*3+1]=(Math.random()-.5)*16,a[S*3+2]=-Math.random()*46;const l=new ei;l.setAttribute("position",new ui(a,3));const c=new fM(l,new om({color:10465988,size:.06,transparent:!0,opacity:.5,depthWrite:!1}));n.add(c);const h=new q(0,-1.4,8),f=52;function u(S,R,I){const y=S*Math.PI/180,b=new q(Math.sin(y),.02,-Math.cos(y)).normalize(),P=[];for(let Y=0;Y<=1;Y+=.02)P.push(h.clone().add(b.clone().multiplyScalar(f*Y)));const U=new ei().setFromPoints(P),k=new am({color:R,transparent:!0,opacity:I});return new dM(U,k)}const d=u(0,15251531,.9),g=u(1,7312308,.42);n.add(d,g);const _=new Si(new fu(.12,16,16),new hu({color:15251531}));_.position.copy(h),n.add(_);const p={x:0,y:0},m={x:0,y:0};window.addEventListener("pointermove",S=>{p.x=S.clientX/innerWidth-.5,p.y=S.clientY/innerHeight-.5});function v(){const S=r.clientWidth||innerWidth,R=r.clientHeight||innerHeight;t.setSize(S,R,!1),i.aspect=S/R,i.updateProjectionMatrix()}v(),window.addEventListener("resize",v);let x;const M=new pM;function A(){const S=M.getElapsedTime();m.x+=(p.x-m.x)*.04,m.y+=(p.y-m.y)*.04,i.position.x=m.x*3,i.position.y=2.2-m.y*1.5,i.lookAt(0,.4,-6);const R=l.attributes.position.array;for(let I=0;I<s;I++)R[I*3+2]+=.02,R[I*3+2]>12&&(R[I*3+2]=-46);l.attributes.position.needsUpdate=!0,c.rotation.z=Math.sin(S*.05)*.03,_.scale.setScalar(1+Math.sin(S*2.4)*.25),t.render(n,i),x=requestAnimationFrame(A)}e?t.render(n,i):A(),e||Pt.fromTo(g.material,{opacity:0},{opacity:.42,duration:3,delay:1.2,ease:"power2.out"}),new IntersectionObserver(S=>{S.forEach(R=>{R.isIntersecting?!x&&!e&&A():x&&(cancelAnimationFrame(x),x=null)})},{threshold:.01}).observe(r)}function vl(r,e){const t=r.getContext("2d"),n={ctx:t,w:0,h:0,dpr:Math.min(devicePixelRatio||1,2)};function i(s){const a=r.parentElement.getBoundingClientRect();n.w=a.width,n.h=a.height,r.width=Math.round(a.width*n.dpr),r.height=Math.round(a.height*n.dpr),r.style.width=a.width+"px",r.style.height=a.height+"px",t.setTransform(n.dpr,0,0,n.dpr,0,0),!s&&e&&e(n)}return i(!0),window.addEventListener("resize",()=>i(!1)),n}function pu(r,e,t){ke.create({trigger:r,start:"top 78%",end:"bottom 40%",scrub:.6,onUpdate:n=>{const i=n.progress;if(t(i),e&&e.length){const s=Math.min(e.length-1,Math.floor(i*e.length));e.forEach((a,o)=>a.classList.toggle("is-active",o===s))}}})}const cl=(r,e,t)=>r+(e-r)*t,ur=(r,e,t)=>Math.max(e,Math.min(t,r));function Li(r,e,t){return ur((r-e)/(t-e),0,1)}function sr(r){return 1-Math.pow(1-r,3)}function gM(r){if(!r)return;const e=r.querySelector("#latency-canvas"),t=Array.from(r.querySelectorAll(".viz-step")),n="#e8b84b",i="#c8563f",s="#6f93b4",a="#a7a599",o="rgba(233,230,221,0.10)";let l,c=0;const h={east:[.86,.5],ardennes:[.54,.4],sedan:[.44,.52],coast:[.16,.26],belgium:[.74,.18],allied:[.3,.6],paris:[.46,.8]},f=v=>[v[0]*l.w,v[1]*l.h];function u(){const{ctx:v,w:x,h:M}=l;v.strokeStyle=o,v.lineWidth=1;for(let A=0;A<=x;A+=x/12)v.beginPath(),v.moveTo(A,0),v.lineTo(A,M),v.stroke();for(let A=0;A<=M;A+=M/9)v.beginPath(),v.moveTo(0,A),v.lineTo(x,A),v.stroke()}function d(v,x,M,A=3){const{ctx:T}=l,[S,R]=f(v);T.fillStyle=M,T.beginPath(),T.arc(S,R,A,0,7),T.fill(),x&&(T.fillStyle=a,T.font='9px "Space Mono", monospace',T.fillText(x,S+7,R+3))}function g(v,x,M,A,T){const{ctx:S}=l,R=v.map(f);let I=0;const y=[];for(let U=1;U<R.length;U++){const k=Math.hypot(R[U][0]-R[U-1][0],R[U][1]-R[U-1][1]);y.push(k),I+=k}let b=I*x;S.strokeStyle=M,S.lineWidth=A,S.lineCap="round",S.lineJoin="round",S.setLineDash([]),S.beginPath(),S.moveTo(R[0][0],R[0][1]);let P=R[0];for(let U=1;U<R.length&&!(b<=0);U++){const k=y[U-1];if(b>=k)S.lineTo(R[U][0],R[U][1]),P=R[U],b-=k;else{const Y=b/k,z=cl(R[U-1][0],R[U][0],Y),G=cl(R[U-1][1],R[U][1],Y);S.lineTo(z,G),P=[z,G],b=0}}return S.stroke(),S.setLineDash([]),P}function _(v,x,M,A=7){const{ctx:T}=l,S=Math.atan2(x[1],x[0]);T.fillStyle=M,T.beginPath(),T.moveTo(v[0],v[1]),T.lineTo(v[0]-A*Math.cos(S-.4),v[1]-A*Math.sin(S-.4)),T.lineTo(v[0]-A*Math.cos(S+.4),v[1]-A*Math.sin(S+.4)),T.closePath(),T.fill()}function p(v){const{ctx:x,w:M,h:A}=l;x.save(),x.globalAlpha=v;const T=M*.5,S=A*.3,R=M*.62,I=T-R/2;x.font='10px "Space Mono", monospace',[{y:S,label:"GERMAN LOOP · signal → action",frac:.22,color:n,ticks:1},{y:S+A*.24,label:"FRENCH LOOP · signal → authority → action",frac:1,color:s,ticks:5}].forEach(b=>{x.fillStyle=a,x.fillText(b.label,I,b.y-10),x.strokeStyle=o,x.lineWidth=8,x.lineCap="round",x.beginPath(),x.moveTo(I,b.y),x.lineTo(I+R,b.y),x.stroke(),x.strokeStyle=b.color,x.beginPath(),x.moveTo(I,b.y),x.lineTo(I+R*b.frac,b.y),x.stroke();for(let U=1;U<b.ticks;U++){const k=I+R*b.frac*(U/b.ticks);x.fillStyle="#07090c",x.beginPath(),x.arc(k,b.y,3,0,7),x.fill(),x.strokeStyle=b.color,x.lineWidth=1.5,x.beginPath(),x.arc(k,b.y,3,0,7),x.stroke(),x.lineWidth=8}const P=I+R*b.frac;x.fillStyle=b.color,x.beginPath(),x.arc(P,b.y,5,0,7),x.fill()}),x.fillStyle=n,x.font='italic 13px "Fraunces", serif',x.fillText("Strength arrives late.",I,S+A*.24+40),x.restore()}function m(){const{ctx:v,w:x,h:M}=l;v.clearRect(0,0,x,M);const A=1-Li(c,.74,.92)*.72;v.save(),v.globalAlpha=A,u();const T=sr(Li(c,.02,.22));if(T>0){v.save(),v.globalAlpha=A*T;const[b,P]=f(h.allied);v.strokeStyle=s,v.lineWidth=2,v.strokeRect(b-46,P+14,92,22),v.fillStyle=s,v.font='9px "Space Mono", monospace',v.fillText("CHAR B1 bis — 60mm armor",b-42,P+28),v.restore()}const S=Li(c,.24,.5);if(S>0){const b=g([h.allied,[.52,.34],h.belgium],sr(S),s,5);_(b,[1,-.6],s,8),d(h.belgium,"BELGIUM",s)}const R=Li(c,.3,.5);if(R>0){v.save(),v.globalAlpha=A*R;const[b,P]=f(h.ardennes);v.strokeStyle="rgba(200,86,63,0.5)",v.setLineDash([4,4]),v.lineWidth=1.5,v.beginPath(),v.arc(b,P,34,0,7),v.stroke(),v.setLineDash([]),v.fillStyle=i,v.font='9px "Space Mono", monospace',v.fillText('ARDENNES · "impassable"',b-30,P-40),v.restore()}const I=Li(c,.5,.74);if(I>0){const b=g([h.east,h.ardennes,h.sedan,h.coast],sr(I),n,3.5);_(b,[-1,-.7],n,8),d(h.sedan,"SEDAN",n),d(h.coast,"ABBEVILLE",n),d(h.east,"",n,4)}d(h.paris,"PARIS",a,2.5),v.restore();const y=Li(c,.74,1);y>0&&p(sr(y))}l=vl(e,m),m(),pu(r,t,v=>{c=v,m()})}function _M(r){if(!r)return;const e=r.querySelector("#yamato-canvas"),t=r.querySelector("#yamato-toggle"),n=Array.from(t.querySelectorAll(".toggle-opt")),i=Array.from(r.querySelectorAll(".viz-mode-copy")),s="#e8b84b",a="#6f93b4",o="#a7a599";let l;const c={m:0},h=matchMedia("(prefers-reduced-motion: reduce)").matches,f=[{k:"RADAR",sub:"sense",a:-Math.PI/2},{k:"FIRE CONTROL",sub:"compute",a:-Math.PI/2+2*Math.PI/5},{k:"CARRIER AIR",sub:"reach",a:-Math.PI/2+4*Math.PI/5},{k:"LOGISTICS",sub:"sustain",a:-Math.PI/2+6*Math.PI/5},{k:"COMMS",sub:"coordinate",a:-Math.PI/2+8*Math.PI/5}];function u(x,M,A,T){const{ctx:S}=l;S.save(),S.translate(x,M),S.scale(A,A),T>0&&(S.shadowColor=s,S.shadowBlur=26*T),S.fillStyle="#c9c4b6",S.beginPath(),S.moveTo(-58,0),S.quadraticCurveTo(-58,7,-40,8),S.lineTo(46,8),S.quadraticCurveTo(64,6,72,0),S.lineTo(46,-4),S.lineTo(-40,-4),S.quadraticCurveTo(-58,-4,-58,0),S.closePath(),S.fill(),S.fillStyle="#8f8a7d",S.fillRect(-6,-18,12,14),S.fillRect(-30,-9,12,6),S.fillRect(18,-9,12,6),S.fillStyle="#726d61",S.fillRect(-2,-30,4,14),S.restore()}let d=0,g=null,_=0;function p(){const{ctx:x,w:M,h:A}=l;d+=.016,x.clearRect(0,0,M,A);const T=M/2,S=A/2,R=c.m,I=1-ur(R*1.4,0,1);if(I>.001){x.save(),x.globalAlpha=I,x.strokeStyle="rgba(233,230,221,0.10)",x.setLineDash([5,8]),x.beginPath(),x.arc(T,S,Math.min(M,A)*.42,0,7),x.stroke(),x.setLineDash([]);const b=d*.5,P=x.createLinearGradient(T,S,T+Math.cos(b)*200,S+Math.sin(b)*200);P.addColorStop(0,"rgba(232,184,75,0.28)"),P.addColorStop(1,"rgba(232,184,75,0)"),x.strokeStyle=P,x.lineWidth=2,x.beginPath(),x.moveTo(T,S),x.lineTo(T+Math.cos(b)*Math.min(M,A)*.42,S+Math.sin(b)*Math.min(M,A)*.42),x.stroke(),_=.3+Math.sin(d*.4)*.3,x.globalAlpha=I*ur(_,0,.5),u(T+Math.min(M,A)*.4,S,.5,0),x.globalAlpha=I,x.fillStyle=o,x.font='italic 12px "Fraunces", serif',x.textAlign="center",x.fillText("Kantai Kessen — the decisive duel that never came",T,A-22),x.textAlign="left",x.restore()}const y=ur((R-.2)*1.4,0,1);if(y>.001){x.save(),x.globalAlpha=y;const b=Math.min(M,A)*.36;f.forEach((P,U)=>{const k=T+Math.cos(P.a)*b,Y=S+Math.sin(P.a)*b;if(x.strokeStyle="rgba(111,147,180,0.35)",x.lineWidth=1,x.beginPath(),x.moveTo(k,Y),x.lineTo(T,S),x.stroke(),!h){const z=(d*.5+U*.2)%1,G=cl(k,T,z),W=cl(Y,S,z);x.fillStyle=s,x.beginPath(),x.arc(G,W,2.2,0,7),x.fill()}x.fillStyle="#0e131b",x.strokeStyle=a,x.lineWidth=1.5,x.beginPath(),x.arc(k,Y,5,0,7),x.fill(),x.stroke(),x.fillStyle=o,x.font='9px "Space Mono", monospace',x.textAlign="center",x.fillText(P.k,k,Y-12),x.fillStyle="#6b6d6a",x.fillText(P.sub,k,Y+18),x.textAlign="left"}),x.restore()}u(T,S,.92,y),y>.3&&(x.save(),x.globalAlpha=y,x.fillStyle=s,x.font='9px "Space Mono", monospace',x.textAlign="center",x.fillText("ACTUATOR",T,S+34),x.textAlign="left",x.restore()),g=requestAnimationFrame(p)}function m(x){n.forEach(M=>M.classList.toggle("is-active",M.dataset.mode===x)),i.forEach(M=>M.classList.toggle("is-hidden",M.dataset.mode!==x)),Pt.to(c,{m:x==="adapt"?1:0,duration:1,ease:"power3.inOut"})}n.forEach(x=>x.addEventListener("click",()=>m(x.dataset.mode))),l=vl(e),e.style.cursor="pointer",e.title="Open the Yamato dossier",e.addEventListener("click",()=>{window.__openDossier&&window.__openDossier("yamato")}),new IntersectionObserver(x=>x.forEach(M=>{M.isIntersecting?g||p():g&&(cancelAnimationFrame(g),g=null)}),{threshold:.05}).observe(e)}function vM(r){if(!r)return;const e=r.querySelector("#scoreboard-canvas"),t=Array.from(r.querySelectorAll(".viz-step")),n="#e8b84b",i="#6f93b4",s="#c8563f",a="#a7a599",o="rgba(233,230,221,0.09)";let l,c=0;const h=1940.2,f=1943.6;function u(v){const x=h+v*(f-h);if(x<1943.3)return .18+.62*(1-Math.exp(-2.4*v))+.05*Math.sin(x*7);const M=(x-1943.3)/(f-1943.3);return(.18+.62*(1-Math.exp(-2.4*((1943.3-h)/(f-h))))+.02)*(1-sr(ur(M*1.2,0,1))*.86)}function d(v){const M=(h+v*(f-h)-1941.6)*1.4;return .06+.86/(1+Math.exp(-M))}function g(v,x,M,A,T){const{ctx:S}=l,R=_.l,I=l.w-_.r,y=_.t,b=l.h-_.b;S.strokeStyle=M,S.lineWidth=A,S.lineJoin="round",T?S.setLineDash(T):S.setLineDash([]),S.beginPath();for(let P=0;P<=200;P++){const U=P/200*x,k=v(U),Y=R+U*(I-R),z=b-k*(b-y);P===0?S.moveTo(Y,z):S.lineTo(Y,z)}S.stroke(),S.setLineDash([])}const _={l:46,r:20,t:28,b:34};function p(){let v=.5,x=9;for(let M=0;M<=200;M++){const A=M/200,T=Math.abs(d(A)-u(A));h+A*(f-h)<1943.3&&T<x&&(x=T,v=A)}return v}function m(){const{ctx:v,w:x,h:M}=l;v.clearRect(0,0,x,M);const A=_.l,T=x-_.r,S=_.t,R=M-_.b;v.strokeStyle=o,v.lineWidth=1,v.font='9px "Space Mono", monospace',v.fillStyle="#6b6d6a";for(let P=0;P<=4;P++){const U=R-P/4*(R-S);v.beginPath(),v.moveTo(A,U),v.lineTo(T,U),v.stroke()}[1940,1941,1942,1943].forEach(P=>{const U=(P+.2-h)/(f-h),k=A+U*(T-A);v.fillText("'"+String(P).slice(2),k-6,R+18)}),v.save(),v.translate(14,(S+R)/2),v.rotate(-Math.PI/2),v.fillText("INDEX",-18,0),v.restore();const I=sr(Li(c,0,.42)),y=sr(Li(c,.34,.66)),b=sr(Li(c,.5,.78));if(I>0){const P=c<.5?.86*I+.02:.88+.12*b;g(u,P,n,2.4,null),v.fillStyle=n,v.font='9px "Space Mono", monospace',v.fillText("TONNAGE SUNK",A+6,S+12)}if(y>0&&(v.save(),v.globalAlpha=y,g(d,.94,i,1.8,[5,5]),v.restore(),v.save(),v.globalAlpha=y,v.fillStyle=i,v.font='9px "Space Mono", monospace',v.fillText("OUTSIDE VARIABLES · HF/DF · 10cm RADAR · VLR AIR · CVEs",A+6,R-d(.94)*(R-S)-8),v.restore()),b>.15){const P=p(),U=A+P*(T-A),k=R-u(P)*(R-S);v.save(),v.globalAlpha=ur((b-.15)*1.5,0,1),v.strokeStyle="rgba(233,230,221,0.28)",v.setLineDash([3,4]),v.beginPath(),v.moveTo(U,S),v.lineTo(U,R),v.stroke(),v.setLineDash([]),v.fillStyle=a,v.beginPath(),v.arc(U,k,4,0,7),v.fill(),v.font='italic 11px "Fraunces", serif',v.fillStyle=a,v.fillText("the ocean had already crossed over",U-150,k-12),v.restore()}if(b>.4){const P=(1943.35-h)/(f-h),U=A+P*(T-A),k=R-u(P)*(R-S);v.save(),v.globalAlpha=ur((b-.4)*1.6,0,1),v.fillStyle=s,v.beginPath(),v.arc(U,k,5,0,7),v.fill(),v.strokeStyle=s,v.lineWidth=1,v.beginPath(),v.moveTo(U,k),v.lineTo(U-4,k+40),v.stroke(),v.font='10px "Space Mono", monospace',v.fillStyle=s,v.fillText("BLACK MAY 1943",U-96,k+54),v.font='9px "Space Mono", monospace',v.fillStyle=a,v.fillText("41 U-boats lost — a quarter of the fleet",U-118,k+68),v.restore()}}l=vl(e,m),m(),pu(r,t,v=>{c=v,m()})}function xM(r){if(!r)return;const e=r.querySelector("#midway-canvas"),t=Array.from(r.querySelectorAll(".viz-step")),n="#52a494",i="#e8b84b",s="#a7a599",a="rgba(233,230,221,0.10)";let o,l=0,c=0,h=null;const f=matchMedia("(prefers-reduced-motion: reduce)").matches,u=[{k:"SIGNAL",s:'HYPO · "AF"'},{k:"TEST",s:"AF is short of water"},{k:"PERMISSION",s:"Nimitz commits"},{k:"CAPACITY",s:"Yorktown · 72 hrs"},{k:"ACTION",s:"positioned NE"}];function d(v){const x=o.w/2,M=o.h/2+6,A=Math.min(o.w,o.h)*.33,T=-Math.PI/2+v/u.length*Math.PI*2;return[x+Math.cos(T)*A,M+Math.sin(T)*A,T]}function g(){const{ctx:v,w:x,h:M}=o;v.clearRect(0,0,x,M);const A=ur(Math.floor(l*u.length),0,u.length-1),T=x/2,S=M/2+6,R=Math.min(x,M)*.33;v.strokeStyle=a,v.lineWidth=1,v.beginPath(),v.arc(T,S,R,0,7),v.stroke();for(let I=0;I<u.length;I++){const[y,b]=d(I),[P,U]=d((I+1)%u.length),k=I<A||l>=.98;v.strokeStyle=k?"rgba(82,164,148,0.6)":a,v.lineWidth=k?2:1,v.beginPath(),v.moveTo(y,b),v.lineTo(P,U),v.stroke();const Y=(y+P)/2,z=(b+U)/2,G=Math.atan2(U-b,P-y);v.fillStyle=k?n:"#3a3d3a",v.beginPath(),v.moveTo(Y+6*Math.cos(G),z+6*Math.sin(G)),v.lineTo(Y-5*Math.cos(G-.5),z-5*Math.sin(G-.5)),v.lineTo(Y-5*Math.cos(G+.5),z-5*Math.sin(G+.5)),v.closePath(),v.fill()}if(!f){const I=c*.18%u.length,y=Math.floor(I),b=I-y,[P,U]=d(y),[k,Y]=d((y+1)%u.length),z=P+(k-P)*b,G=U+(Y-U)*b;v.fillStyle=i,v.shadowColor=i,v.shadowBlur=10,v.beginPath(),v.arc(z,G,3,0,7),v.fill(),v.shadowBlur=0}u.forEach((I,y)=>{const[b,P]=d(y),U=y<=A;(y===A?1:0)&&(v.shadowColor=n,v.shadowBlur=18),v.fillStyle=U?"#0e1a18":"#0e131b",v.strokeStyle=U?n:"#3a3d3a",v.lineWidth=2,v.beginPath(),v.arc(b,P,10,0,7),v.fill(),v.stroke(),v.shadowBlur=0,v.fillStyle=U?n:"#6b6d6a",v.font='bold 10px "Space Mono", monospace',v.textAlign="center",v.fillText(I.k,b,P+(P<S?-18:26)),v.fillStyle=U?s:"#4a4c49",v.font='9px "Space Mono", monospace',v.fillText(I.s,b,P+(P<S?-6:38)),v.textAlign="left"}),v.textAlign="center",v.fillStyle=s,v.font='italic 13px "Fraunces", serif',v.fillText("enough evidence,",T,S-4),v.fillText("in time",T,S+14),v.textAlign="left"}function _(){c+=.016,g(),h=requestAnimationFrame(_)}o=vl(e,g),g();const p=["station-hypo","af-water-ruse","nimitz","yorktown","spruance"];e.style.cursor="pointer",e.title="Click a node to open its dossier",e.addEventListener("click",v=>{const x=e.getBoundingClientRect(),M=v.clientX-x.left,A=v.clientY-x.top;let T=-1,S=1e9;for(let R=0;R<u.length;R++){const[I,y]=d(R),b=Math.hypot(I-M,y-A);b<S&&(S=b,T=R)}S<46&&window.__openDossier&&window.__openDossier(p[T])}),pu(r,t,v=>{l=v,f&&g()}),new IntersectionObserver(v=>v.forEach(x=>{x.isIntersecting&&!f?h||_():h&&(cancelAnimationFrame(h),h=null)}),{threshold:.05}).observe(e)}function yM(){MM(),EM(),wM()}const SM=[{n:"TEST I",name:"Latency",q:"How long between the first meaningful signal and legitimate action?",v:"var(--a-late)",d:"sedan-1940"},{n:"TEST II",name:"Aim",q:"What war is the system actually built to win?",v:"var(--a-aim)",d:"kantai-kessen"},{n:"TEST III",name:"Scoreboard",q:"Can the metric fail the doctrine that created it?",v:"var(--a-score)",d:"black-may"},{n:"TEST IV",name:"Evidence",q:"What evidence is enough to act before certainty arrives too late?",v:"var(--a-build)",d:"af-water-ruse"}];function MM(){const r=document.getElementById("tests-grid");r&&(r.innerHTML=SM.map(e=>`
    <button class="test-tile" style="--tt-accent:${e.v}" data-dossier="${e.d}">
      <div class="tt-num">${e.n}</div>
      <div><div class="tt-name">${e.name}</div><div class="tt-q">${e.q}</div><div class="tt-open">◇ open the case</div></div>
    </button>`).join(""),Pt.fromTo(r.children,{y:30,opacity:0},{y:0,opacity:1,duration:.8,stagger:.12,ease:"power3.out",scrollTrigger:{trigger:r,start:"top 80%"}}))}const bM=[{name:"Signal",desc:"events · anomalies · shifts"},{name:"Context",desc:"rules · history · intent"},{name:"Evidence",desc:"data interpreted against a question"},{name:"Reasoning",desc:"known → likely → follows"},{name:"Permission",desc:"thresholds · reversibility · authority",permission:!0},{name:"Action",desc:"what changes the world"},{name:"Proof",desc:"what actually happened"},{name:"Learning",desc:"updates the next decision"}];function EM(){const r=document.getElementById("stack-viz");if(!r)return;r.innerHTML=bM.map(t=>`
    <div class="stack-layer ${t.permission?"is-permission":""}">
      <span class="sl-pulse"></span>
      <span class="sl-name">${t.name}</span>
      <span class="sl-desc">${t.desc}</span>
    </div>`).join("");const e=Array.from(r.children);Pt.to(e,{opacity:1,x:0,duration:.7,stagger:.14,ease:"power3.out",scrollTrigger:{trigger:r,start:"top 75%"},onComplete(){TM(e)}})}function TM(r){const e=Pt.timeline({repeat:-1,repeatDelay:1.4});r.forEach(t=>{const n=t.querySelector(".sl-pulse");e.to(n,{opacity:1,duration:.18,ease:"none"},">").to(n,{opacity:0,duration:.5,ease:"power2.out"},">-0.02")})}const ef=["What signal matters most — and where does it first appear?","Who is trusted to interpret it before authority gathers?","What evidence is defined, in advance, as enough to act?","What test could prove the interpretation wrong in time?","What permission is designed before the signal arrives?","Which actions are reversible enough to move without ceremony?","What capacity must already be positioned when the answer arrives?","How does consequence rewrite the next decision?"];function wM(){const r=document.getElementById("board-quiz");if(!r)return;const e=new Array(ef.length).fill(0);r.innerHTML=ef.map((i,s)=>`
    <div class="board-q">
      <div class="board-q-text"><span class="board-q-num">Q${s+1}</span>${i}</div>
      <div class="board-scale" data-q="${s}">
        ${[1,2,3,4,5].map(a=>`<button data-v="${a}" title="${a===1?"ad hoc / undefined":a===5?"designed & fast":""}">${a}</button>`).join("")}
      </div>
    </div>`).join("")+`
    <div class="board-scalekey">1 = assembled ad hoc, authority gathers late &nbsp;·&nbsp; 5 = designed in advance, evidence moves</div>
    <div class="board-result" id="board-result"></div>`;const t=r.querySelector("#board-result");r.querySelectorAll(".board-scale").forEach(i=>{const s=parseInt(i.dataset.q,10);i.querySelectorAll("button").forEach(a=>{a.addEventListener("click",()=>{i.querySelectorAll("button").forEach(o=>o.classList.remove("is-sel")),a.classList.add("is-sel"),e[s]=parseInt(a.dataset.v,10),RM(t,e)})})});const n=r.querySelector(".board-scalekey");n&&(n.style.cssText="font-family:var(--mono);font-size:9.5px;letter-spacing:1px;color:var(--ink-faint);margin-top:18px;text-align:center;")}function AM(r){return r>=4.2?{label:"DECISION ARCHITECTURE",color:"var(--a-build)",text:"Signal, evidence, permission, action, and learning move together. The visible sign is subtraction — meetings and approvals that existed only because evidence could not be trusted in time have begun to disappear."}:r>=3.2?{label:"ADAPTING",color:"var(--signal)",text:"The loop is closing, but permission still lags the signal in places. Find the one recurring decision where authority gathers after the window has already closed."}:r>=2.2?{label:"ADOPTING, NOT ADAPTING",color:"var(--a-aim)",text:"You own intelligence. It has not yet changed how decisions move. This is the AI-Yamato risk: a larger gun mounted on the old doctrine."}:{label:"UNMANAGED DISTANCE",color:"var(--a-late)",text:"Strength arrives late, and the scoreboard may still look fine. This is 1940 France with better software: visibility without permission, reporting without authority."}}function RM(r,e){const t=e.filter(a=>a>0);if(t.length<3){r.classList.remove("is-live"),r.innerHTML='<div style="font-family:var(--mono);font-size:10px;letter-spacing:2px;color:var(--ink-faint)">ANSWER AT LEAST THREE TO READ YOUR DISTANCE</div>';return}const n=t.reduce((a,o)=>a+o,0)/t.length,i=Math.round((5-n)/4*100),s=AM(n);r.classList.remove("is-live"),r.offsetWidth,r.classList.add("is-live"),r.innerHTML=`
    <div class="board-gauge" style="color:${s.color}">${i}<span style="font-size:0.4em;color:var(--ink-faint)"> / 100</span></div>
    <div class="board-verdict" style="color:${s.color}">UNMANAGED DISTANCE INDEX · ${s.label}</div>
    <div class="board-readout">${s.text}</div>
    <div style="font-family:var(--mono);font-size:9px;letter-spacing:1px;color:var(--ink-faint);margin-top:14px">${t.length}/8 answered · lower distance = evidence becomes legitimate action before value decays</div>`}function CM(r){if(!r)return;const e=document.createElement("div");e.className="atom-clock",e.innerHTML=`
    <svg viewBox="0 0 240 240" class="dclock">
      <circle cx="120" cy="120" r="112" class="dc-face"/>
      <g class="dc-ticks"></g>
      <text x="120" y="30" text-anchor="middle" class="dc-mid">MIDNIGHT</text>
      <line x1="120" y1="120" x2="120" y2="34" class="dc-hand" id="dc-hand"/>
      <circle cx="120" cy="120" r="5" class="dc-hub"/>
    </svg>
    <div class="dc-readout">
      <div class="dc-count"><span id="dc-secs">180</span> <span class="dc-unit">SECONDS TO MIDNIGHT</span></div>
      <div class="dc-note">The Bulletin of the Atomic Scientists set its clock in 1947 at seven minutes to midnight. In January 2026 it stands at <strong>85 seconds</strong> — the closest ever — citing nuclear risk, climate, and, for the first time among its named drivers, <strong>artificial intelligence</strong>.</div>
    </div>`,r.insertBefore(e,r.firstChild);const t=e.querySelector(".dc-ticks");let n="";for(let u=0;u<60;u++){const d=u/60*Math.PI*2,g=u%5===0,_=112,p=g?100:106;n+=`<line x1="${120+_*Math.sin(d)}" y1="${120-_*Math.cos(d)}" x2="${120+p*Math.sin(d)}" y2="${120-p*Math.cos(d)}" class="dc-tick" opacity="${g?.5:.22}"/>`}t.innerHTML=n;const i=e.querySelector("#dc-hand"),s=e.querySelector("#dc-secs"),a=180,o=85,l=u=>-(u/60)*6;Pt.set(i,{rotation:l(a),transformOrigin:"120px 120px"}),ke.create({trigger:e,start:"top 72%",once:!0,onEnter(){Pt.to(i,{rotation:l(o),duration:2.6,ease:"power2.inOut"}),Pt.to({v:a},{v:o,duration:2.6,ease:"power2.inOut",onUpdate(){s.textContent=Math.round(this.targets()[0].v)}})}});const c=r.querySelector("#atom-timeline"),h=[{d:"JULY 16, 1945",t:"Trinity",b:"A device on a steel tower proves a small group can release the energy of the stars. The engineering is real. What is new is that the choice does not close when the light fades."},{d:"JULY 1945",t:"The Petition",b:"The Franck Report urges a demonstration, not a city. Szilárd’s petition — 70 scientists — asks Truman to state terms first. It never reaches him. A correct signal with no legitimate path to the authority that can act is inert."},{d:"1946",t:"International Control",b:"The Acheson–Lilienthal report and Baruch Plan propose an authority to own all fissile material on earth. It is rejected within the year. The architecture of restraint fails at the outset — and the choice stays open."},{d:"1947 → NOW",t:"The Clock",b:"The Bulletin sets a clock instead of a monument — because the decision is never made once. It has been reset some twenty-five times. A choice institutionalized as a recurring ritual."}];c.innerHTML=h.map(u=>`
    <div class="atom-tl-item">
      <div class="atom-tl-date">${u.d}</div>
      <div class="atom-tl-title">${u.t}</div>
      <div class="atom-tl-body">${u.b}</div>
    </div>`).join(""),Array.from(c.children).forEach((u,d)=>{ke.create({trigger:u,start:"top 85%",once:!0,onEnter(){u.classList.add("is-in"),Pt.fromTo(u,{y:24,opacity:0},{y:0,opacity:1,duration:.8,delay:d*.08,ease:"power3.out"})}})})}const ai={"char-b1-bis":{title:"Char B1 bis",kind:"Vessel",chapter:"Blitzkrieg",tagline:"A better tank, one at a time — outclassed by tanks that arrived together.",image:"s_b1bis",stats:[{k:"Armor",v:"up to 60 mm"},{k:"Guns",v:"75 mm hull + 47 mm turret"},{k:"Built",v:"~369"},{k:"Weakness",v:"one-man turret, ~180 km range"}],body:["Individually, the Char B1 bis outgunned and outarmored anything Germany fielded in 1940. Its frontal plate shrugged off the Panzer III’s 37 mm gun.","But the commander loaded, aimed, and fired the turret gun while also directing the tank. French doctrine scattered these machines across infantry formations. They fought as isolated strongpoints, refueled constantly, and were bypassed rather than beaten."],ai:"Capability at the unit level means nothing if the decision to concentrate it never gets made in time.",threads:["panzer-iii","guderian","sedan-1940","auftragstaktik"]},"panzer-iii":{title:"Panzer III",kind:"Vessel",chapter:"Blitzkrieg",tagline:"Thinner armor, smaller gun — and a radio in every turret.",image:"s_panzer3",stats:[{k:"Gun (1940)",v:"37 mm"},{k:"Armor",v:"~30 mm front"},{k:"Crew",v:"5 (dedicated commander)"},{k:"Edge",v:"radio-equipped, concentrated"}],body:["On paper the Panzer III was the weaker machine. In practice it carried the decisive feature: a radio, a five-man crew, and a commander freed to command rather than fight the gun.","Massed in panzer divisions and talking to each other and to aircraft, these tanks could shift weight, exploit a gap, and react to a broken line faster than the enemy could reorganize."],ai:"The advantage wasn’t the tank — it was the wiring that let hundreds of them act as one nervous system.",threads:["char-b1-bis","guderian","auftragstaktik","sedan-1940"]},guderian:{title:"Heinz Guderian",kind:"Person",chapter:"Blitzkrieg",tagline:"The armor evangelist who drove through the “impassable” forest to the sea.",image:"m_guderian",stats:[{k:"Command",v:"XIX Panzer Corps"},{k:"Doctrine",v:"concentrated armor + radio + air"},{k:"Sedan",v:"crossed Meuse 13–14 May 1940"},{k:"Book",v:"“Achtung – Panzer!” (1937)"}],body:["Guderian argued that tanks should not be parceled out to infantry but concentrated, radio-linked, and driven deep before the enemy could respond.","At Sedan he did exactly that, then ignored orders to halt and raced for the Channel. His famous shorthand — “Klotzen, nicht kleckern” (strike concentrated, not dispersed) — was a statement about decision speed, not firepower."],ai:"He collapsed the distance between seeing an opening and pouring force through it before permission could catch up.",threads:["manstein","auftragstaktik","ardennes","sedan-1940","panzer-iii"]},manstein:{title:"Erich von Manstein",kind:"Person",chapter:"Blitzkrieg",tagline:"Author of the sickle cut — the plan the German high command almost refused.",image:null,stats:[{k:"Plan",v:"Sichelschnitt (sickle cut)"},{k:"Axis",v:"main effort through the Ardennes"},{k:"Status 1940",v:"corps chief of staff, sidelined"},{k:"Rank later",v:"Field Marshal"}],body:["The original German plan was a cautious rerun of 1914. Manstein proposed the opposite: put the armored weight where the enemy least expected it, through the wooded Ardennes, and cut the Allied armies in half.","His superiors buried the idea until a chance meeting with Hitler surfaced it. The plan that won the campaign nearly died in the staff system that produced it."],ai:"The best signal is worthless until an organization builds a path for it to reach the person who can say yes.",threads:["guderian","ardennes","sedan-1940","auftragstaktik"]},auftragstaktik:{title:"Auftragstaktik",kind:"Concept",chapter:"Blitzkrieg",tagline:"Tell subordinates the intent, not the steps — then let them decide.",image:null,stats:[{k:"Translation",v:"mission-type tactics"},{k:"Delegates",v:"the “how,” not the “what”"},{k:"Requires",v:"trained judgment at the edge"},{k:"Modern name",v:"mission command"}],body:["German commanders issued objectives and constraints, then left the method to the officer on the spot. A lieutenant who saw an opening was expected to take it without asking.","This pushed decision authority down to where the information was freshest. It is the doctrinal heart of Blitzkrieg — and it rhymes, three years later, with Nimitz turning his carriers loose at Midway."],ai:"Legitimate authority pre-positioned at the edge is what lets a fresh signal become action without a round trip to the top.",threads:["guderian","manstein","panzer-iii","spruance","nimitz"]},ardennes:{title:"The Ardennes",kind:"Place",chapter:"Blitzkrieg",tagline:"The forest generals agreed tanks couldn’t cross — so nobody watched it.",image:null,stats:[{k:"Terrain",v:"dense forest, narrow roads"},{k:"Allied view",v:"unsuitable for armor"},{k:"German use",v:"main panzer thrust"},{k:"Result",v:"breakthrough at Sedan"}],body:["Allied planning treated the Ardennes as a natural barrier and screened it lightly, concentrating strength in Belgium where they expected the blow.","The Germans threaded three panzer corps through it in a colossal traffic jam. An assumption baked into doctrine became the seam the whole campaign was won through."],ai:"An unexamined assumption inside your doctrine is exactly the gap an opponent aims for.",threads:["manstein","guderian","sedan-1940"]},"sedan-1940":{title:"The Crossing at Sedan",kind:"Operation",chapter:"Blitzkrieg",tagline:"48 hours over the Meuse that unhinged the entire Allied front.",image:null,stats:[{k:"Dates",v:"13–14 May 1940"},{k:"River",v:"the Meuse"},{k:"Air support",v:"concentrated Stuka bombardment"},{k:"Then",v:"race to the Channel"}],body:["German infantry and engineers forced the Meuse under a rolling air assault while French artillery — organized for a slower, methodical battle — never massed its fire in time.","Once bridgeheads held, Guderian’s armor poured through and did not stop. The French decision cycle, built around deliberate set-piece defense, simply could not keep pace."],ai:"Two forces with similar strength; the one whose observe-decide-act loop was hours shorter won.",threads:["guderian","ardennes","panzer-iii","char-b1-bis"]},pervitin:{title:"Pervitin",kind:"Technology",chapter:"Blitzkrieg",tagline:"Methamphetamine that kept crews awake — a fuel, not the cause.",image:null,stats:[{k:"Substance",v:"methamphetamine"},{k:"Nickname",v:"“Panzerschokolade”"},{k:"Effect",v:"suppressed sleep and fatigue"},{k:"Issued",v:"millions of tablets, 1939–40"}],body:["Pervitin let tank and truck crews push for days with little rest, sustaining the relentless tempo the campaign demanded.","It is often overstated. The drug fueled the pace; it did not create the doctrine, the radios, or the decentralized command that made the pace worth having."],ai:"A stimulant can extend how long you execute a decision loop — it cannot design a better one.",threads:["guderian","sedan-1940"]},yamato:{title:"Yamato",kind:"Vessel",chapter:"Yamato",tagline:"The largest battleship ever built, sunk without her main guns ever hitting a ship.",image:"s_yamato",stats:[{k:"Displacement",v:"~72,000 t full load"},{k:"Main guns",v:"9 × 46 cm (18.1 in)"},{k:"Sunk",v:"7 April 1945"},{k:"Final hits",v:"~10 bombs, ~8 torpedoes"}],body:["Yamato was the physical peak of the battleship — heavier armor and bigger guns than anything afloat. She was built for a fleet duel that the war never delivered.","On her last sortie nearly 400 US carrier aircraft attacked in waves over roughly two hours. Her 46 cm guns never fired on an enemy warship; they fired only anti-aircraft shells at the planes killing her."],ai:"She was a flawless answer to a question the enemy had already stopped asking.",threads:["musashi","eighteen-inch-guns","operation-ten-go","kantai-kessen","iowa-class"]},musashi:{title:"Musashi",kind:"Vessel",chapter:"Yamato",tagline:"Yamato’s sister — proof of concept for how these ships would die.",image:null,stats:[{k:"Class",v:"Yamato-class"},{k:"Sunk",v:"24 October 1944, Sibuyan Sea"},{k:"Hits",v:"~17 bombs, ~19 torpedoes"},{k:"Attackers",v:"US carrier aircraft"}],body:["At the Battle of the Sibuyan Sea, US carrier planes swarmed Musashi for hours, absorbing punishment no gun line could have inflicted, until she rolled over and sank.","Her destruction was the rehearsal for Yamato six months later: the sea war was decided in the air, and the biggest guns in history had no target."],ai:"The same lesson delivered twice: the scoreboard had changed and the doctrine had not.",threads:["yamato","eighteen-inch-guns","kantai-kessen","battle-off-samar"]},"eighteen-inch-guns":{title:"46 cm Naval Guns",kind:"Technology",chapter:"Yamato",tagline:"The largest guns ever mounted at sea — kept secret, and largely unused.",image:null,stats:[{k:"Bore",v:"46 cm (18.1 in)"},{k:"Shell",v:"~1,460 kg AP"},{k:"Range",v:"~42 km"},{k:"Cover story",v:"officially called “40 cm”"}],body:["Each shell weighed as much as a small car and could be lobbed over forty kilometers. Japan disguised the true caliber to keep rivals building smaller ships.","The secrecy worked and the engineering was superb. It bought a decisive edge in a gunnery battle that carrier aviation ensured would almost never happen."],ai:"Optimizing hard against the wrong metric produces a masterpiece nobody needs.",threads:["yamato","musashi","iowa-class","radar-fire-control"]},"kantai-kessen":{title:"Kantai Kessen",kind:"Concept",chapter:"Yamato",tagline:"The “decisive battle” doctrine that shaped a navy for a fight that never came.",image:null,stats:[{k:"Meaning",v:"“decisive fleet battle”"},{k:"Model",v:"Tsushima, 1905"},{k:"Assumed",v:"one climactic gun engagement"},{k:"Reality",v:"attrition, air power, logistics"}],body:["Japanese naval doctrine anticipated luring the US fleet across the Pacific to a single annihilating clash decided by battleship gunnery. Yamato was that plan cast in steel.","The actual war was carrier strikes, submarine attrition, and industrial replacement. The decisive battle kept not arriving, and the fleet built for it aged into irrelevance."],ai:"A metric embedded inside doctrine becomes invisible — you keep scoring points in a game the world stopped playing.",threads:["yamato","operation-ten-go","eighteen-inch-guns","kido-butai","donitz"]},"operation-ten-go":{title:"Operation Ten-Go",kind:"Operation",chapter:"Yamato",tagline:"A one-way sortie to Okinawa with fuel enough to arrive, not return.",image:null,stats:[{k:"Date",v:"6–7 April 1945"},{k:"Objective",v:"beach and fight off Okinawa"},{k:"Fuel",v:"effectively one-way"},{k:"Outcome",v:"Yamato + most escorts sunk"}],body:["With Japanese air power gutted, Yamato was sent to run herself aground off Okinawa as an unsinkable gun battery — a suicide mission dressed as a sortie.","US carriers intercepted her in open water first. The plan spent the fleet’s crown jewel for symbolism, because doctrine had no other use left for her."],ai:"When the only remaining role for your prize asset is symbolic sacrifice, the strategy failed long before the ship did.",threads:["yamato","kantai-kessen","battle-off-samar"]},"battle-off-samar":{title:"Battle off Samar",kind:"Operation",chapter:"Yamato",tagline:"Yamato met her chance against thin-skinned carriers — and turned away.",image:null,stats:[{k:"Date",v:"25 October 1944"},{k:"US force",v:"“Taffy 3” escort carriers + tin cans"},{k:"Japanese",v:"Kurita’s Center Force"},{k:"Result",v:"Kurita withdrew"}],body:["For once the battleships got what doctrine promised: US escort carriers and destroyers in gun range, nearly defenseless. Yamato and her consorts opened fire.","A ferocious destroyer counterattack, air harassment, and confusion convinced Kurita he faced fleet carriers. He broke off. The decisive gun battle finally happened — and the doctrine flinched."],ai:"Even handed its dream scenario, a system tuned for the wrong war misread the evidence and retreated.",threads:["yamato","musashi","escort-carrier","kantai-kessen"]},"iowa-class":{title:"Iowa-class Battleship",kind:"Vessel",chapter:"Yamato",tagline:"Smaller guns, radar eyes, 33 knots — built to escort carriers, not replace them.",image:"s_iowa",stats:[{k:"Main guns",v:"9 × 16 in"},{k:"Speed",v:"~33 knots"},{k:"Fire control",v:"radar-directed"},{k:"Role",v:"fast carrier screen, AA, shore bombardment"}],body:["The Iowas carried lighter guns than Yamato but ran fast enough to keep station with aircraft carriers and saw in the dark with radar.","The US built its battleships to serve the carrier, not to seek a duel. That subordination — the battleship as one node in a sensor-and-strike network — is why they stayed useful."],ai:"The winning design didn’t maximize any single spec; it fit itself to the war actually being fought.",threads:["yamato","eighteen-inch-guns","radar-fire-control"]},"radar-fire-control":{title:"Radar Fire Control",kind:"Technology",chapter:"Yamato",tagline:"The moment gun size stopped mattering more than knowing where to shoot.",image:"s_firecontrol",stats:[{k:"Systems",v:"Mark 3/8 radar + Mark 37 director"},{k:"Enables",v:"accurate fire at night, in fog"},{k:"Proven",v:"Guadalcanal night actions, Surigao Strait"},{k:"Shift",v:"sensing over caliber"}],body:["Radar-directed gunnery let US ships hit targets they could not see, in darkness that once neutralized superior optics and bigger guns.","The advantage moved from the size of the barrel to the speed and quality of the target solution — the same shift, in a different medium, that centimetric radar forced on the U-boats."],ai:"The edge migrated from raw output to sensing and decision — from how hard you can hit to whether you know where to.",threads:["iowa-class","eighteen-inch-guns","centimetric-radar","yamato"]},donitz:{title:"Karl Dönitz",kind:"Person",chapter:"U-Boats",tagline:"He measured the war in tons sunk — and lost the war being counted differently.",image:"m_donitz",stats:[{k:"Role",v:"Commander, U-boat arm (BdU)"},{k:"Doctrine",v:"tonnage war"},{k:"Goal",v:"sink faster than Allies could build"},{k:"May 1943",v:"withdrew from North Atlantic"}],body:["Dönitz ran the Atlantic campaign as an arithmetic race: sink more Allied tonnage per month than the shipyards could replace, and Britain would starve.","The metric ignored what the enemy was optimizing — convoy escort, air cover, code-breaking, and industrial output. As those compounded, his tonnage curve inverted and his fleet was slaughtered."],ai:"A single, legible scoreboard is seductive precisely because it hides every variable the enemy is actually moving.",threads:["type-vii-uboat","wolfpack","black-may","blackett","kantai-kessen"]},"type-vii-uboat":{title:"Type VII U-boat",kind:"Vessel",chapter:"U-Boats",tagline:"The workhorse of the tonnage war — a surface raider that could duck underwater.",image:"s_uboat",stats:[{k:"Built",v:"700+ (most numerous type)"},{k:"Crew",v:"~44–52"},{k:"Attack mode",v:"often surfaced, at night"},{k:"Weakness",v:"slow submerged, short battery"}],body:["The Type VII was cheap, rugged, and produced in enormous numbers. It fought mostly on the surface, where it was faster and could coordinate by radio.","That surface habit was its doom. Once aircraft and centimetric radar owned the surface at night, the very mode that made the boat effective made it a target."],ai:"The behavior that maximized the old scoreboard became the exact signature the new tools hunted.",threads:["donitz","wolfpack","mid-atlantic-gap","centimetric-radar"]},wolfpack:{title:"Wolfpack Tactics",kind:"Tactic",chapter:"U-Boats",tagline:"Gather the boats by radio, overwhelm the convoy — and broadcast your position doing it.",image:null,stats:[{k:"German",v:"Rudeltaktik"},{k:"Coordination",v:"radio orders from BdU ashore"},{k:"Aim",v:"saturate a convoy’s escorts"},{k:"Cost",v:"constant transmissions"}],body:["A boat that spotted a convoy radioed home; headquarters vectored others to converge and attack en masse, swamping the escort screen.","The coordination ran on radio chatter. Every order and shadowing report was a signal the Allies could locate with HF/DF and read with Ultra — the tactic’s strength was wired straight to its vulnerability."],ai:"Centralized control needs constant signaling, and constant signaling is exactly what the other side learns to intercept.",threads:["donitz","type-vii-uboat","hf-df","ultra-enigma"]},"hf-df":{title:"HF/DF (“Huff-Duff”)",kind:"Technology",chapter:"U-Boats",tagline:"You can’t coordinate by radio without telling the enemy where you are.",image:null,stats:[{k:"Full name",v:"high-frequency direction finding"},{k:"Fix",v:"bearing to a transmitting U-boat"},{k:"Deployed",v:"shipborne, aboard escorts"},{k:"Use",v:"run down the bearing and attack"}],body:["Shipborne HF/DF took a bearing on a U-boat the instant it transmitted. Two escorts could triangulate a position; even one could charge down the line.","The Germans long assumed their brief transmissions were safe. They were feeding the escorts a live position report every time they spoke."],ai:"The act of coordinating leaks information; the winner turns the enemy’s own signals into targeting data.",threads:["wolfpack","donitz","centimetric-radar","black-may"]},"centimetric-radar":{title:"Centimetric Radar",kind:"Technology",chapter:"U-Boats",tagline:"A wavelength the U-boats couldn’t hear coming — the night stopped being safe.",image:null,stats:[{k:"Sets",v:"ASV Mk III / H2S (~10 cm)"},{k:"Enabler",v:"the cavity magnetron"},{k:"Blind spot",v:"German Metox couldn’t detect it"},{k:"Effect",v:"surfaced boats found at night"}],body:["Short-wavelength radar, powered by the cavity magnetron, let aircraft pick a surfaced U-boat out of a black ocean and attack before the crew knew a plane was near.","German receivers were tuned to older, longer wavelengths and heard nothing. For months the boats surfaced at night believing themselves invisible while planes bore in."],ai:"The decisive advantage was a sensing gap: seeing the enemy in a band where he assumed he was unseen.",threads:["hf-df","escort-carrier","black-may","mid-atlantic-gap","radar-fire-control"]},"escort-carrier":{title:"Escort Carrier (CVE)",kind:"Vessel",chapter:"U-Boats",tagline:"A “jeep carrier” that carried air cover into the middle of the ocean.",image:null,stats:[{k:"Nickname",v:"“jeep carrier”"},{k:"Built on",v:"merchant/tanker hulls"},{k:"Air group",v:"a handful of planes"},{k:"Job",v:"organic air cover for convoys"}],body:["Small, cheap flattops sailed with the convoys and their support groups, providing round-the-clock aircraft over the one stretch land-based planes couldn’t reach.","Individually modest, in numbers they closed the last gap in Allied air coverage — and the same humble ships later stood off Yamato’s guns at Samar."],ai:"Coverage over the whole board beat concentrated power over part of it.",threads:["mid-atlantic-gap","centimetric-radar","black-may","battle-off-samar"]},"mid-atlantic-gap":{title:"The Mid-Atlantic Gap",kind:"Place",chapter:"U-Boats",tagline:"The “Black Pit” beyond air cover — where the wolfpacks lived.",image:null,stats:[{k:"Nickname",v:"“the Black Pit”"},{k:"Cause",v:"beyond land-based aircraft range"},{k:"Closed by",v:"VLR Liberators + escort carriers"},{k:"Closed",v:"spring 1943"}],body:["For years a mid-ocean band lay beyond the reach of patrol aircraft. Convoys crossed it naked, and the U-boats hunted hardest there.","Very-long-range Liberators and escort carriers finally roofed the gap in early 1943. With no safe water left to surface in, the wolfpacks’ core tactic died."],ai:"A blind spot in the sensor map is where the enemy concentrates; closing it changes the whole game.",threads:["escort-carrier","centimetric-radar","type-vii-uboat","black-may"]},blackett:{title:"Patrick Blackett",kind:"Person",chapter:"U-Boats",tagline:"The physicist who won tonnage with arithmetic instead of steel.",image:"m_blackett",stats:[{k:"Field",v:"operational research"},{k:"Findings",v:"bigger convoys are safer"},{k:"Fix",v:"reset depth-charge fuzes"},{k:"Later",v:"Nobel Prize in Physics, 1948"}],body:["Blackett’s team studied the data instead of the doctrine. They found large convoys lost proportionally fewer ships, that depth charges were exploding too deep, and that aircraft should be painted white.","Small analytical corrections, applied fleet-wide, saved more shipping than new weapons did. It was decision-making treated as a science."],ai:"Sometimes the highest-leverage move is not more force but a better-calibrated decision applied everywhere.",threads:["donitz","mid-atlantic-gap","black-may","nimitz"]},"black-may":{title:"Black May",kind:"Operation",chapter:"U-Boats",tagline:"One month that broke the wolfpacks — a quarter of the fleet gone.",image:null,stats:[{k:"When",v:"May 1943"},{k:"U-boats lost",v:"41 at sea"},{k:"Share",v:"~a quarter of the operational fleet"},{k:"Result",v:"Dönitz pulled boats from the N. Atlantic"}],body:["Everything converged at once: centimetric radar, HF/DF, escort carriers, closed air gap, and Ultra rerouting convoys. In a few weeks U-boat losses became unsustainable.","Dönitz withdrew from the main convoy routes. The tonnage-war offensive never recovered. The scoreboard had flipped, and it flipped almost overnight."],ai:"When the enemy fixes the whole decision system at once, a slow decline becomes a sudden collapse.",threads:["donitz","centimetric-radar","escort-carrier","hf-df","ultra-enigma"]},"ultra-enigma":{title:"Ultra / Naval Enigma",kind:"Document",chapter:"U-Boats",tagline:"Reading the wolfpacks’ mail — and steering convoys around them.",image:null,stats:[{k:"Source",v:"broken naval Enigma traffic"},{k:"Center",v:"Bletchley Park"},{k:"Key break",v:"4-rotor Enigma, 1943"},{k:"Use",v:"reroute convoys, cue attacks"}],body:["When Bletchley Park could read U-boat signals, the Admiralty diverted convoys around patrol lines and vectored hunter groups onto known positions.","Guarded so tightly that action was often disguised to protect the source, Ultra turned the U-boats’ own coordination network into an Allied planning tool — the same SIGINT logic Station Hypo ran in the Pacific."],ai:"Owning the enemy’s signal turns his decisions into yours — the ultimate collapse of the signal-to-action distance.",threads:["wolfpack","black-may","donitz","jn-25","station-hypo"]},rochefort:{title:"Joseph Rochefort",kind:"Person",chapter:"Midway",tagline:"The cryptanalyst who bet his reputation that “AF” was Midway.",image:"m_blackett",stats:[{k:"Command",v:"Station Hypo, Pearl Harbor"},{k:"Habits",v:"bathrobe, slippers, days without sleep"},{k:"Read",v:"~15% of JN-25 — enough"},{k:"Vindicated",v:"the AF water ruse"}],body:["Rochefort’s team never read the whole code. Working from fragments, traffic patterns, and instinct, they concluded Japan’s next blow would fall on Midway.","Washington favored other targets. Rochefort staged a ruse to prove it and gave Nimitz a location and a date. He acted on partial evidence because partial was enough to decide."],ai:"Sufficient evidence, read early, beats complete evidence read too late.",threads:["station-hypo","jn-25","af-water-ruse","nimitz"]},"station-hypo":{title:"Station Hypo",kind:"Place",chapter:"Midway",tagline:"A windowless basement at Pearl that out-decided Washington.",image:"m_blackett",stats:[{k:"Location",v:"basement, Pearl Harbor"},{k:"Also called",v:"Combat Intelligence Unit"},{k:"Chief",v:"Joseph Rochefort"},{k:"Rival estimate",v:"OP-20-G, Washington"}],body:["Hypo combined cryptanalysis, traffic analysis, and direction-finding into running estimates of Japanese intentions, feeding them straight to the Pacific Fleet.","Its proximity to the decision-maker mattered as much as its skill: analysis and authority were close enough that a fresh read could become an order the same day."],ai:"Analysis wired directly to the person who can act is worth more than better analysis two echelons away.",threads:["rochefort","jn-25","af-water-ruse","nimitz"]},"jn-25":{title:"JN-25",kind:"Document",chapter:"Midway",tagline:"The Japanese naval code — never fully broken, and it didn’t need to be.",image:null,stats:[{k:"Type",v:"enciphered code book"},{k:"Readable",v:"partial, a fraction of groups"},{k:"Key clue",v:"the geographic tag “AF”"},{k:"Payoff",v:"Midway order of battle and timing"}],body:["JN-25 layered a code book under an additive cipher; the Allies recovered only part of it. Even fragments, cross-referenced against traffic, revealed the shape of the coming operation.","The recurring designator “AF” pointed at the target — but which base? Confirming it was the last gap between a good guess and an actionable decision."],ai:"You rarely decode the whole message; the discipline is acting on the fraction that already answers the question.",threads:["rochefort","station-hypo","af-water-ruse","ultra-enigma"]},"af-water-ruse":{title:"The “AF is Short of Water” Ruse",kind:"Tactic",chapter:"Midway",tagline:"A fake message about a broken still that confirmed the target.",image:null,stats:[{k:"Bait",v:"Midway radios (in clear) a water shortage"},{k:"Hook",v:"Japan reports “AF short of water”"},{k:"Proves",v:"AF = Midway"},{k:"Cost",v:"one clever transmission"}],body:["To settle the argument over what “AF” meant, Hypo had Midway broadcast a plain-language complaint that its desalination plant had failed. Days later, decrypts showed Japan reporting that AF was low on water.","It was a designed experiment: create a falsifiable prediction and let the enemy confirm or refute it. The enemy confirmed it."],ai:"When evidence is ambiguous, engineer a test the world will answer — don’t wait for certainty to arrive on its own.",threads:["rochefort","station-hypo","jn-25","nimitz"]},nimitz:{title:"Chester Nimitz",kind:"Person",chapter:"Midway",tagline:"He trusted the basement over Washington and staged an ambush at Point Luck.",image:null,stats:[{k:"Role",v:"CINCPAC"},{k:"Choice",v:"backed Hypo’s Midway estimate"},{k:"Move",v:"carriers to “Point Luck”"},{k:"Guidance",v:"“calculated risk”"}],body:["Nimitz weighed a contested intelligence estimate and committed his three available carriers to lie in wait northeast of Midway before the Japanese arrived.","His written order told his admirals to apply the principle of calculated risk — take the shot when the expected gain justified it. He decided on sufficient evidence and delegated the execution."],ai:"Leadership is deciding on incomplete information and pushing the acting authority to the commanders at the point of contact.",threads:["rochefort","yorktown","spruance","fletcher","af-water-ruse"]},yorktown:{title:"USS Yorktown",kind:"Vessel",chapter:"Midway",tagline:"“We must have this ship back in three days.” They took about seventy-two hours.",image:null,stats:[{k:"Damaged",v:"Battle of the Coral Sea"},{k:"Nimitz’s order",v:"back in three days"},{k:"Repaired",v:"in ~72 hours at Pearl"},{k:"Sortied",v:"30 May 1942"}],body:["Estimates put Yorktown’s repairs at months. Nimitz demanded three days. Fourteen hundred workers swarmed her around the clock and made her fightable.","She sortied on 30 May and her air group helped sink a Japanese carrier before she was lost. Without that third carrier, the arithmetic at Midway may not have worked."],ai:"A fast, decisive repair decision manufactured the very margin the battle turned on.",threads:["nimitz","fletcher","sbd-dauntless","kido-butai"]},"sbd-dauntless":{title:"SBD Dauntless",kind:"Aircraft",chapter:"Midway",tagline:"The dive bomber that sank four carriers in an afternoon.",image:"s_dauntless",stats:[{k:"Type",v:"carrier dive bomber"},{k:"Midway kills",v:"4 Japanese fleet carriers"},{k:"Decisive window",v:"minutes, ~10:20 am, 4 June"},{k:"Bomb",v:"up to 1,000 lb"}],body:["Dauntless squadrons arrived over Kido Butai just as its decks were crowded with fueled, armed aircraft mid-rearming. In a few minutes they turned three carriers into infernos; a fourth followed that evening.","The plane was unglamorous and sturdy. What made the moment decisive was timing — the strike hit while the enemy was caught between two decisions."],ai:"The blow landed in the seam of the enemy’s indecision — the interval when he had committed to nothing.",threads:["kido-butai","yorktown","spruance","fletcher"]},"kido-butai":{title:"Kido Butai",kind:"Operation",chapter:"Midway",tagline:"The world’s finest carrier force, undone by a rearming decision it couldn’t unmake.",image:null,stats:[{k:"Meaning",v:"“mobile force”"},{k:"Carriers at Midway",v:"4 (all sunk)"},{k:"Commander",v:"Vice Admiral Nagumo"},{k:"Fatal pause",v:"bombs → torpedoes → bombs"}],body:["Nagumo’s four carriers had rampaged from Pearl Harbor to the Indian Ocean unbeaten. At Midway a spotted American carrier forced a choice: keep the land-attack bombs or swap to anti-ship torpedoes.","He ordered a rearm, then reversed it, and the hangar decks filled with fuel and ordnance during the switch. The Dauntlesses arrived precisely in that vulnerable gap."],ai:"A reversible decision left half-made is the most dangerous state a system can occupy under attack.",threads:["sbd-dauntless","yorktown","kantai-kessen","spruance"]},spruance:{title:"Raymond Spruance",kind:"Person",chapter:"Midway",tagline:"A non-aviator who launched early, launched everything, and won.",image:null,stats:[{k:"Command",v:"Task Force 16"},{k:"Background",v:"cruiser officer, not a flier"},{k:"Call",v:"launch at maximum range, all at once"},{k:"Trait",v:"cold, calculating judgment"}],body:["Handed the carriers after Halsey fell ill, Spruance made the crucial timing call: launch his air groups at long range to catch the Japanese while their decks were full.","It was a gamble on tempo over tidiness, and it put the Dauntlesses over Kido Butai at the perfect moment. He then declined to chase overnight — knowing when to stop deciding, too."],ai:"He owned the tempo decision himself and let his aircrews own the execution — mission command in a cockpit.",threads:["nimitz","fletcher","kido-butai","sbd-dauntless","auftragstaktik"]},fletcher:{title:"Frank Jack Fletcher",kind:"Person",chapter:"Midway",tagline:"The senior commander who held tactical authority, then handed it off cleanly.",image:null,stats:[{k:"Command",v:"Task Force 17 (Yorktown)"},{k:"Role",v:"officer in tactical command at Midway"},{k:"Coral Sea",v:"fought days earlier"},{k:"Handoff",v:"passed control to Spruance"}],body:["Fletcher was the senior officer present and directed the battle’s opening. When Yorktown was crippled and his flagship lost its command facilities, he passed tactical control to Spruance without friction.","The clean transfer of authority under fire kept the American decision loop intact at the moment it mattered most."],ai:"Legitimacy that transfers cleanly under damage keeps the decision system alive when a single node fails.",threads:["nimitz","spruance","yorktown","kido-butai"]},trinity:{title:"Trinity",kind:"Operation",chapter:"Atom",tagline:"The first nuclear detonation — and the quiet line that no one could take back.",image:null,stats:[{k:"Date",v:"5:29 a.m., 16 July 1945"},{k:"Site",v:"Alamogordo, New Mexico"},{k:"Yield",v:"~21 kilotons"},{k:"Bainbridge",v:"“Now we are all sons of bitches.”"}],body:["The plutonium implosion device worked on the first try, lighting the desert brighter than noon. Test director Kenneth Bainbridge’s in-the-moment verdict was blunt: “Now we are all sons of bitches.”","Oppenheimer’s famous “Now I am become Death” was a reflection he offered publicly in 1965, not words spoken at the shot. Trinity crossed a line that could never be uncrossed."],ai:"Some decisions are not reversible experiments; once executed, the world they create is the only world there is.",threads:["oppenheimer","doomsday-clock","franck-report"]},oppenheimer:{title:"J. Robert Oppenheimer",kind:"Person",chapter:"Atom",tagline:"The director who built the thing, then spent his life arguing about the choice.",image:null,stats:[{k:"Role",v:"Scientific Director, Los Alamos"},{k:"Trinity quote",v:"a 1965 recollection, not spoken then"},{k:"After",v:"urged international control"},{k:"1954",v:"security clearance revoked"}],body:["Oppenheimer welded a fractious community of physicists into a weapon in under three years. He believed building it was necessary; he was far less certain about how it should be used or controlled.","Afterward he pressed for civilian and international oversight, warned against a hydrogen bomb, and was stripped of his clearance. The man who compressed the decision spent the rest of his life on its consequences."],ai:"Whoever can build the capability rarely holds the legitimate authority to decide how it is used.",threads:["trinity","szilard-petition","franck-report","acheson-lilienthal"]},"szilard-petition":{title:"The Szilárd Petition",kind:"Document",chapter:"Atom",tagline:"Seventy scientists asked to be consulted before the bomb was used. It never reached the President.",image:null,stats:[{k:"Author",v:"Leó Szilárd"},{k:"Date",v:"July 1945"},{k:"Signatories",v:"~70 Manhattan Project scientists"},{k:"Ask",v:"don’t use it on Japan without warning"}],body:["Szilárd, who had helped start the project, circulated a petition urging that the bomb not be dropped on cities without a demonstration and a chance to surrender.","It moved slowly up the chain and was overtaken by events; Truman is not known to have seen it before the decision. The people closest to the knowledge had no path to the choice."],ai:"A signal without a channel to legitimate authority is not a decision input — it is a document filed after the fact.",threads:["franck-report","oppenheimer","einstein-telegram","acheson-lilienthal"]},"franck-report":{title:"The Franck Report",kind:"Document",chapter:"Atom",tagline:"A warning, weeks before Trinity, that surprise use would start an arms race.",image:null,stats:[{k:"Chair",v:"James Franck"},{k:"Date",v:"June 1945"},{k:"Argument",v:"demonstrate, don’t surprise"},{k:"Foresaw",v:"a nuclear arms race"}],body:["A committee of Chicago scientists argued that a surprise atomic attack would win a battle but lose the peace, forfeiting the moral standing needed to control the weapon internationally.","They proposed a demonstration before observers instead. The report was considered and set aside. Its prediction of an arms race arrived on schedule."],ai:"The clearest foresight fails if it can’t reach the decision at the moment the choice is still open.",threads:["szilard-petition","oppenheimer","acheson-lilienthal"]},"acheson-lilienthal":{title:"The Acheson–Lilienthal Report",kind:"Document",chapter:"Atom",tagline:"A 1946 blueprint to put the atom under international control — before it was too late.",image:null,stats:[{k:"Year",v:"1946"},{k:"Proposed",v:"international atomic authority"},{k:"Became",v:"basis of the Baruch Plan"},{k:"Outcome",v:"rejected amid Cold War distrust"}],body:["The report proposed a global authority to own dangerous nuclear activities outright, making a covert weapons race structurally difficult rather than merely forbidden.","Reworked into the Baruch Plan and presented to the UN, it foundered on US–Soviet mistrust. The window for designing the system before the race began closed."],ai:"Designing legitimate governance ahead of a capability is far cheaper than trying to retrofit it after deployment.",threads:["franck-report","szilard-petition","doomsday-clock"]},"doomsday-clock":{title:"The Doomsday Clock",kind:"Concept",chapter:"Atom",tagline:"A metaphor turned into a metric for how close we’ve steered to catastrophe.",image:null,stats:[{k:"Created",v:"1947"},{k:"By",v:"Bulletin of the Atomic Scientists"},{k:"First setting",v:"7 minutes to midnight"},{k:"Jan 2026",v:"85 seconds — closest ever"}],body:["The scientists who built the bomb created a clock to hold the world’s attention on the choice they had opened. Midnight is catastrophe; the hands move with human decisions, not physics.","It endures because the underlying condition does: a capability now permanent, governed only by the quality of continuous decisions. The 2026 statement names artificial intelligence among its drivers for the first time."],ai:"When a capability can’t be un-invented, safety becomes an ongoing decision discipline, not a one-time fix.",threads:["acheson-lilienthal","franck-report","trinity"]},"einstein-telegram":{title:"The Einstein–Szilárd Letter",kind:"Document",chapter:"Atom",tagline:"The 1939 letter that put the choice on a President’s desk in the first place.",image:null,stats:[{k:"Date",v:"August 1939"},{k:"Drafted by",v:"Leó Szilárd"},{k:"Signed by",v:"Albert Einstein"},{k:"To",v:"President Franklin Roosevelt"}],body:["Szilárd drafted, and Einstein signed, a warning that Germany might build a nuclear weapon and that the US should begin its own research. It set in motion what became the Manhattan Project.","Both later regretted opening the door. The signal that started everything was sent by the very people who would spend the next decade trying to contain it."],ai:"The decision to begin is itself a choice — and the hardest one to see as reversible while you’re making it.",threads:["szilard-petition","oppenheimer","trinity"]}},PM="/midway/assets/img/dossier/";let xn,wh,Wo,lm,ci,Ni=[];function cm(){xn||(xn=document.createElement("div"),xn.id="codex",xn.innerHTML=`
    <div class="codex-scrim" data-codex-close></div>
    <aside class="codex-panel" role="dialog" aria-modal="true" aria-label="Dossier" tabindex="-1">
      <header class="codex-head">
        <nav class="codex-crumbs" id="codex-crumbs" aria-label="Trail"></nav>
        <button class="codex-close" data-codex-close aria-label="Close dossier">✕</button>
      </header>
      <div class="codex-scroll"><div class="codex-body" id="codex-body"></div></div>
      <div class="codex-depthbar"><span></span></div>
    </aside>`,document.body.appendChild(xn),wh=xn.querySelector(".codex-panel"),Wo=xn.querySelector("#codex-body"),lm=xn.querySelector("#codex-crumbs"),ci=document.createElement("div"),ci.id="codex-tip",ci.setAttribute("aria-hidden","true"),document.body.appendChild(ci))}function un(r){return String(r??"")}function hm(){const r=Ni[Ni.length-1],e=ai[r];if(!e){Wo.innerHTML=`<p class="codex-missing">No dossier for “${un(r)}”.</p>`;return}const t=e.stats&&e.stats.length?`<dl class="codex-stats">${e.stats.map(c=>`<div><dt>${un(c.k)}</dt><dd>${un(c.v)}</dd></div>`).join("")}</dl>`:"",n=e.image?`<div class="codex-figure" style="background-image:url('${PM}${un(e.image)}.png')"><span class="codex-figtag">${e.kind==="Person"||e.kind==="Concept"?"INTERPRETATION":"SCHEMATIC · illustrative"}</span></div>`:"",i=(e.body||[]).map(c=>`<p>${c}</p>`).join(""),s=e.ai?`<aside class="codex-ai"><span class="codex-ai-k">THE DISTANCE</span>${e.ai}</aside>`:"",a=(e.threads||[]).filter(c=>ai[c]),o=a.length?`<div class="codex-threads"><div class="codex-threads-h">PULL THE THREAD</div><div class="codex-thread-list">${a.map(c=>`<button class="codex-thread" data-dossier="${c}"><span class="ct-kind">${un(ai[c].kind)}</span><span class="ct-title">${un(ai[c].title)}</span><span class="ct-arrow">→</span></button>`).join("")}</div></div>`:"";Wo.innerHTML=`
    <article class="codex-article">
      <div class="codex-kind">${un(e.kind)} · ${un(e.chapter)}</div>
      <h2 class="codex-title">${un(e.title)}</h2>
      <p class="codex-tagline">${un(e.tagline)}</p>
      ${n}
      ${t}
      <div class="codex-prose">${i}</div>
      ${s}
      ${o}
    </article>`,Wo.parentElement.scrollTop=0,lm.innerHTML=Ni.map((c,h)=>{const f=ai[c]?ai[c].title:c,u=h>0?'<span class="codex-crumb-sep">›</span>':"",d=h===Ni.length-1?"codex-crumb is-current":"codex-crumb";return`${u}<button class="${d}" data-depth="${h}">${un(f)}</button>`}).join("");const l=xn.querySelector(".codex-depthbar span");l&&(l.style.width=Math.min(100,Ni.length*22)+"%")}function tf(r){ai[r]&&(cm(),Ni.push(r),hm(),xn.classList.add("is-open"),document.body.classList.add("codex-open"),window.__lenis&&window.__lenis.stop&&window.__lenis.stop(),Ah(),requestAnimationFrame(()=>wh&&wh.focus()))}function DM(r){Ni=Ni.slice(0,r+1),hm()}function nf(){xn&&(xn.classList.remove("is-open"),document.body.classList.remove("codex-open"),window.__lenis&&window.__lenis.start&&window.__lenis.start(),Ni=[])}function LM(r){const e=r.getAttribute("data-dossier"),t=ai[e];if(!t||xn.classList.contains("is-open"))return;ci.innerHTML=`<span class="tip-kind">${un(t.kind)}</span>${un(t.tagline)}<span class="tip-cue">click to open dossier</span>`;const n=r.getBoundingClientRect();ci.classList.add("is-on");const i=Math.min(300,innerWidth-24);ci.style.width=i+"px";let s=n.left+n.width/2-i/2;s=Math.max(12,Math.min(s,innerWidth-i-12)),ci.style.left=s+"px",ci.style.top=n.bottom+10+"px"}function Ah(){ci&&ci.classList.remove("is-on")}function IM(){document.querySelectorAll(".dig-row[data-dig]").forEach(r=>{const e=r.getAttribute("data-dig").split(",").map(t=>t.trim()).filter(t=>ai[t]);if(!e.length){r.style.display="none";return}r.innerHTML=`<div class="dig-row-h">DIG DEEPER — ${e.length} dossiers</div><div class="dig-chips">${e.map(t=>`<button class="dig-chip" data-dossier="${t}"><span class="dc-kind">${un(ai[t].kind)}</span>${un(ai[t].title)}</button>`).join("")}</div>`})}function UM(){cm(),IM(),document.addEventListener("click",e=>{const t=e.target.closest("[data-dossier]");if(t){e.preventDefault(),tf(t.getAttribute("data-dossier"));return}const n=e.target.closest("[data-depth]");if(n){DM(parseInt(n.getAttribute("data-depth"),10));return}if(e.target.closest("[data-codex-close]")){nf();return}}),document.addEventListener("keydown",e=>{e.key==="Escape"&&xn.classList.contains("is-open")&&nf()});let r=null;document.addEventListener("pointerover",e=>{const t=e.target.closest(".entity[data-dossier]");t&&t!==r&&(r=t,LM(t))}),document.addEventListener("pointerout",e=>{const t=e.target.closest(".entity[data-dossier]");t&&t===r&&(r=null,Ah())}),window.addEventListener("scroll",Ah,{passive:!0}),window.__openDossier=tf}Pt.registerPlugin(ke);const rf="/midway/assets/img/";function NM(){const r=document.getElementById("pre-needle"),e=document.getElementById("pre-bearing"),t=document.getElementById("pre-ticks");let n="";for(let a=0;a<72;a++){const o=a/72*Math.PI*2,l=a%9===0,c=92,h=l?80:86;n+=`<line class="pre-tick" x1="${100+c*Math.sin(o)}" y1="${100-c*Math.cos(o)}" x2="${100+h*Math.sin(o)}" y2="${100-h*Math.cos(o)}" opacity="${l?.6:.3}"/>`}t.innerHTML=n;const i=Pt.timeline();i.to(r,{rotation:47,transformOrigin:"100px 100px",duration:2,ease:"power3.inOut",onUpdate(){const a=Pt.getProperty(r,"rotation");e.textContent=String(Math.round((a%360+360)%360)).padStart(3,"0")}}),i.to("#preloader",{opacity:0,duration:.8,ease:"power2.inOut",delay:.15,onComplete:Rh})}function Rh(){const r=document.getElementById("preloader");!r||r.classList.contains("done")||(r.classList.add("done"),document.body.classList.remove("is-loading"),zM())}let vi;function OM(){if(matchMedia("(prefers-reduced-motion: reduce)").matches){ke.refresh();return}vi=new Mm({duration:1.15,smoothWheel:!0,wheelMultiplier:.9,touchMultiplier:1.4}),window.__lenis=vi,vi.on("scroll",ke.update),Pt.ticker.add(e=>vi.raf(e*1e3)),Pt.ticker.lagSmoothing(0),document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",t=>{const n=document.querySelector(e.getAttribute("href"));n&&(t.preventDefault(),vi.scrollTo(n,{offset:0,duration:1.4}))})})}function FM(r){vi?vi.scrollTo(r,{duration:1.4}):r.scrollIntoView({behavior:"smooth"})}function kM(){const r=document.querySelector(".hero");r&&(r.style.backgroundImage=`linear-gradient(180deg, rgba(7,9,12,0.55) 0%, rgba(7,9,12,0.35) 45%, rgba(7,9,12,0.9) 100%), url("${rf}hero.png")`),document.querySelectorAll(".scene-bg").forEach(e=>{const t=e.dataset.img,n=`${rf}${t}.png`,i=new Image;i.onload=()=>{e.style.backgroundImage=`url("${n}")`,Pt.to(e,{opacity:t==="atom"?.55:.62,duration:1.4,ease:"power2.out"})},i.onerror=()=>{e.style.background="linear-gradient(160deg,#0c1017,#07090c)",e.style.opacity=1},i.src=n;const s=parseFloat(e.dataset.speed||"0.85");Pt.fromTo(e,{yPercent:-8},{yPercent:8*s,ease:"none",scrollTrigger:{trigger:e.parentElement,start:"top bottom",end:"bottom top",scrub:!0}})})}function BM(){Pt.set(".hero-title .reveal-line",{yPercent:110}),Pt.utils.toArray(".reveal").forEach(r=>{Pt.fromTo(r,{y:34,opacity:0},{y:0,opacity:1,duration:1,ease:"power3.out",scrollTrigger:{trigger:r,start:"top 88%"}})})}function zM(){Pt.timeline({delay:.1}).to(".hero-title .reveal-line",{yPercent:0,duration:1.1,stagger:.12,ease:"power4.out"})}function HM(){const r=Pt.utils.toArray(".scene[data-chapter]"),e=document.getElementById("chapter-nav"),t=document.getElementById("hud-bearing-val"),n=document.getElementById("scroll-progress-bar"),i=document.documentElement.style,s=new Set;r.forEach(o=>{const l=o.dataset.chapter;if(s.has(l))return;s.add(l);const c=document.createElement("button");c.className="nav-dot",c.dataset.target=o.id,c.innerHTML=`<span class="nav-tip">${l}</span>`,c.addEventListener("click",()=>FM(o)),e.appendChild(c)});const a=Array.from(e.children);r.forEach(o=>{const l=parseFloat(o.dataset.bearing||"0"),c=o.dataset.accent;ke.create({trigger:o,start:"top 55%",end:"bottom 55%",onToggle:h=>{if(!h.isActive)return;Pt.to({v:parseFloat(t.textContent)||0},{v:l,duration:.9,ease:"power2.out",onUpdate(){t.textContent=String(Math.round(this.targets()[0].v%360)).padStart(3,"0")+"°"}});const f=o.dataset.chapter;a.forEach(u=>{const d=document.getElementById(u.dataset.target);u.classList.toggle("is-active",d&&d.dataset.chapter===f)}),c&&i.setProperty("--accent",getComputedStyle(o).getPropertyValue("--accent"))}})}),ke.create({start:0,end:"max",onUpdate:o=>{n.style.width=(o.progress*100).toFixed(2)+"%"}})}function GM(){let r=!1;requestAnimationFrame(()=>{r=!0}),setTimeout(()=>{if(!r){if(document.documentElement.classList.add("no-anim"),vi){try{vi.destroy()}catch{}vi=null}Rh(),ke.refresh()}},1600),document.addEventListener("visibilitychange",()=>{document.hidden||(Rh(),ke.refresh())})}function sf(){document.body.classList.add("is-loading"),GM(),OM(),kM(),BM(),HM();const r=(e,t)=>{try{t()}catch(n){console.error(`[viz:${e}]`,n)}};r("hero",()=>mM(document.getElementById("hero-canvas"))),r("latency",()=>gM(document.getElementById("viz-latency"))),r("yamato",()=>_M(document.getElementById("viz-yamato"))),r("scoreboard",()=>vM(document.getElementById("viz-scoreboard"))),r("midway",()=>xM(document.getElementById("viz-midway"))),r("capstone",()=>yM()),r("atom",()=>CM(document.getElementById("atom-stage"))),r("codex",()=>UM()),ke.refresh(),NM()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",sf):sf();window.addEventListener("load",()=>ke.refresh());
