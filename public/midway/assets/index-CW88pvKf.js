var Vm=Object.defineProperty;var Wm=(r,e,t)=>e in r?Vm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Te=(r,e,t)=>Wm(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var Fu="1.3.25";function kf(r,e,t){return Math.max(r,Math.min(e,t))}function Xm(r,e,t){return(1-t)*r+t*e}function Ym(r,e,t,n){return Xm(r,e,1-Math.exp(-t*n))}function qm(r,e){return(r%e+e)%e}var $m=class{constructor(){Te(this,"isRunning",!1);Te(this,"value",0);Te(this,"from",0);Te(this,"to",0);Te(this,"currentTime",0);Te(this,"lerp");Te(this,"duration");Te(this,"easing");Te(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=kf(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=Ym(this.value,this.to,this.lerp*60,r),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:a}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=a}};function Km(r,e){let t;return function(...n){clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(this,n)},e)}}var jm=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){Te(this,"width",0);Te(this,"height",0);Te(this,"scrollHeight",0);Te(this,"scrollWidth",0);Te(this,"debouncedResize");Te(this,"wrapperResizeObserver");Te(this,"contentResizeObserver");Te(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Te(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Te(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=Km(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},If=class{constructor(){Te(this,"events",{})}emit(r,...e){var n;const t=this.events[r]||[];for(let i=0,s=t.length;i<s;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){return this.events[r]?this.events[r].push(e):this.events[r]=[e],()=>{var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}};const Zm=100/6,Zi={passive:!1};function Bu(r,e){return r===1?Zm:r===2?e:1}var Jm=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){Te(this,"touchStart",{x:0,y:0});Te(this,"lastDelta",{x:0,y:0});Te(this,"window",{width:0,height:0});Te(this,"emitter",new If);Te(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});Te(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});Te(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});Te(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=Bu(n,this.window.width),s=Bu(n,this.window.height);e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});Te(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Zi),this.element.addEventListener("touchstart",this.onTouchStart,Zi),this.element.addEventListener("touchmove",this.onTouchMove,Zi),this.element.addEventListener("touchend",this.onTouchEnd,Zi)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,Zi),this.element.removeEventListener("touchstart",this.onTouchStart,Zi),this.element.removeEventListener("touchmove",this.onTouchMove,Zi),this.element.removeEventListener("touchend",this.onTouchEnd,Zi)}};const zu=r=>Math.min(1,1.001-2**(-10*r));var Qm=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaExponent:a=1.7,duration:o,easing:l,lerp:c=.1,infinite:h=!1,orientation:d="vertical",gestureOrientation:u=d==="horizontal"?"both":"vertical",touchMultiplier:f=1,wheelMultiplier:_=1,autoResize:v=!0,prevent:p,virtualScroll:m,overscroll:g=!0,autoRaf:y=!1,anchors:S=!1,autoToggle:E=!1,allowNestedScroll:w=!1,__experimental__naiveDimensions:b=!1,naiveDimensions:A=b,stopInertiaOnNavigate:C=!1}={}){Te(this,"_isScrolling",!1);Te(this,"_isStopped",!1);Te(this,"_isLocked",!1);Te(this,"_preventNextNativeScrollEvent",!1);Te(this,"_resetVelocityTimeout",null);Te(this,"_rafId",null);Te(this,"_isDraggingSelection",!1);Te(this,"isTouching");Te(this,"isIos");Te(this,"time",0);Te(this,"userData",{});Te(this,"lastVelocity",0);Te(this,"velocity",0);Te(this,"direction",0);Te(this,"options");Te(this,"targetScroll");Te(this,"animatedScroll");Te(this,"animate",new $m);Te(this,"emitter",new If);Te(this,"dimensions");Te(this,"virtualScroll");Te(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});Te(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Te(this,"onTransitionEnd",r=>{var e;(e=r.propertyName)!=null&&e.includes("overflow")&&r.target===this.rootElement&&this.checkOverflow()});Te(this,"onClick",r=>{const e=r.composedPath().filter(n=>n instanceof HTMLAnchorElement&&n.href).map(n=>new URL(n.href)),t=new URL(window.location.href);if(this.options.anchors){const n=e.find(i=>t.host===i.host&&t.pathname===i.pathname&&i.hash);if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,s=decodeURIComponent(n.hash);this.scrollTo(s,i);return}}if(this.options.stopInertiaOnNavigate&&e.some(n=>t.host===n.host&&t.pathname!==n.pathname)){this.reset();return}});Te(this,"onPointerDown",r=>{r.button===1&&this.reset()});Te(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");if(i&&this.isIos&&(n.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(n)),this._isDraggingSelection)){n.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=n.type==="touchstart"||n.type==="touchmove";const a=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&a&&!this.isStopped&&!this.isLocked){this.reset();return}const o=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(a||o)return;let l=n.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,h=Math.abs(e)>=Math.abs(t)?"horizontal":"vertical";if(l.find(_=>{var v,p,m,g,y;return _ instanceof HTMLElement&&(typeof c=="function"&&(c==null?void 0:c(_))||((v=_.hasAttribute)==null?void 0:v.call(_,"data-lenis-prevent"))||h==="vertical"&&((p=_.hasAttribute)==null?void 0:p.call(_,"data-lenis-prevent-vertical"))||h==="horizontal"&&((m=_.hasAttribute)==null?void 0:m.call(_,"data-lenis-prevent-horizontal"))||i&&((g=_.hasAttribute)==null?void 0:g.call(_,"data-lenis-prevent-touch"))||s&&((y=_.hasAttribute)==null?void 0:y.call(_,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.hasNestedScroll(_,{deltaX:e,deltaY:t}))}))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let d=t;this.options.gestureOrientation==="both"?d=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(d=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();const u=i&&this.options.syncTouch,f=i&&n.type==="touchend";f&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...u?{lerp:f?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Te(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Te(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=Fu,window.lenis||(window.lenis={}),window.lenis.version=Fu,d==="horizontal"&&(window.lenis.horizontal=!0),i===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!r||r===document.documentElement)&&(r=window),typeof o=="number"&&typeof l!="function"?l=zu:typeof l=="function"&&typeof o!="number"&&(o=1),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaExponent:a,duration:o,easing:l,lerp:c,infinite:h,gestureOrientation:u,orientation:d,touchMultiplier:f,wheelMultiplier:_,autoResize:v,prevent:p,virtualScroll:m,overscroll:g,autoRaf:y,anchors:S,autoToggle:E,allowNestedScroll:w,naiveDimensions:A,stopInertiaOnNavigate:C},this.dimensions=new jm(r,e,{autoResize:v}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new Jm(t,{touchMultiplier:f,wheelMultiplier:_}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}get overflow(){const r=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[r]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}isTouchOnSelectionHandle(r){const e=window.getSelection();if(!e||e.isCollapsed||e.rangeCount===0)return!1;const t=r.targetTouches[0]??r.changedTouches[0];if(!t)return!1;const n=e.getRangeAt(0).getClientRects();if(n.length===0)return!1;const i=n[0],s=n[n.length-1],a=40,o=Math.hypot(t.clientX-i.left,t.clientY-i.top)<=a,l=Math.hypot(t.clientX-s.right,t.clientY-s.bottom)<=a;return o||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,programmatic:i=!0,lerp:s=i?this.options.lerp:void 0,duration:a=i?this.options.duration:void 0,easing:o=i?this.options.easing:void 0,onStart:l,onComplete:c,force:h=!1,userData:d}={}){if((this.isStopped||this.isLocked)&&!h)return;let u=r,f=e;if(typeof u=="string"&&["top","left","start","#"].includes(u))u=0;else if(typeof u=="string"&&["bottom","right","end"].includes(u))u=this.limit;else{let _=null;if(typeof u=="string"?(_=u.startsWith("#")?document.getElementById(u.slice(1)):document.querySelector(u),_||(u==="#top"?u=0:console.warn("Lenis: Target not found",u))):u instanceof HTMLElement&&(u!=null&&u.nodeType)&&(_=u),_){if(this.options.wrapper!==window){const S=this.rootElement.getBoundingClientRect();f-=this.isHorizontal?S.left:S.top}const v=_.getBoundingClientRect(),p=getComputedStyle(_),m=this.isHorizontal?Number.parseFloat(p.scrollMarginLeft):Number.parseFloat(p.scrollMarginTop),g=getComputedStyle(this.rootElement),y=this.isHorizontal?Number.parseFloat(g.scrollPaddingLeft):Number.parseFloat(g.scrollPaddingTop);u=(this.isHorizontal?v.left:v.top)+this.animatedScroll-(Number.isNaN(m)?0:m)-(Number.isNaN(y)?0:y)}}if(typeof u=="number"){if(u+=f,this.options.infinite){if(i){this.targetScroll=this.animatedScroll=this.scroll;const _=u-this.animatedScroll;_>this.limit/2?u-=this.limit:_<-this.limit/2&&(u+=this.limit)}}else u=kf(0,u,this.limit);if(u===this.targetScroll){l==null||l(this),c==null||c(this);return}if(this.userData=d??{},t){this.animatedScroll=this.targetScroll=u,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}i||(this.targetScroll=u),typeof a=="number"&&typeof o!="function"?o=zu:typeof o=="function"&&typeof a!="number"&&(a=1),this.animate.fromTo(this.animatedScroll,u,{duration:a,easing:o,lerp:s,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",l==null||l(this)},onUpdate:(_,v)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=_-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=_,this.setScroll(this.scroll),i&&(this.targetScroll=_),v||this.emit(),v&&(this.reset(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(r,{deltaX:e,deltaY:t}){const n=Date.now();r._lenis||(r._lenis={});const i=r._lenis;let s,a,o,l,c,h,d,u,f,_;if(n-(i.time??0)>2e3){i.time=Date.now();const w=window.getComputedStyle(r);if(i.computedStyle=w,s=["auto","overlay","scroll"].includes(w.overflowX),a=["auto","overlay","scroll"].includes(w.overflowY),c=["auto"].includes(w.overscrollBehaviorX),h=["auto"].includes(w.overscrollBehaviorY),i.hasOverflowX=s,i.hasOverflowY=a,!(s||a))return!1;d=r.scrollWidth,u=r.scrollHeight,f=r.clientWidth,_=r.clientHeight,o=d>f,l=u>_,i.isScrollableX=o,i.isScrollableY=l,i.scrollWidth=d,i.scrollHeight=u,i.clientWidth=f,i.clientHeight=_,i.hasOverscrollBehaviorX=c,i.hasOverscrollBehaviorY=h}else o=i.isScrollableX,l=i.isScrollableY,s=i.hasOverflowX,a=i.hasOverflowY,d=i.scrollWidth,u=i.scrollHeight,f=i.clientWidth,_=i.clientHeight,c=i.hasOverscrollBehaviorX,h=i.hasOverscrollBehaviorY;if(!(s&&o||a&&l))return!1;const v=Math.abs(e)>=Math.abs(t)?"horizontal":"vertical";let p,m,g,y,S,E;if(v==="horizontal")p=Math.round(r.scrollLeft),m=d-f,g=e,y=s,S=o,E=c;else if(v==="vertical")p=Math.round(r.scrollTop),m=u-_,g=t,y=a,S=l,E=h;else return!1;return!E&&(p>=m||p<=0)?!0:(g>0?p<m:p>0)&&y&&S}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?qm(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(r=>{this.rootElement.classList.add(r)})}cleanUpClassName(){for(const r of Array.from(this.rootElement.classList))(r==="lenis"||r.startsWith("lenis-"))&&this.rootElement.classList.remove(r)}};function Oi(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Uf(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Kn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ua={duration:.5,overwrite:!1,delay:0},qh,rn,Rt,ri=1e8,bt=1/ri,Dc=Math.PI*2,eg=Dc/4,tg=0,Nf=Math.sqrt,ng=Math.cos,ig=Math.sin,en=function(e){return typeof e=="string"},kt=function(e){return typeof e=="function"},Yi=function(e){return typeof e=="number"},$h=function(e){return typeof e>"u"},Pi=function(e){return typeof e=="object"},Cn=function(e){return e!==!1},Kh=function(){return typeof window<"u"},Ja=function(e){return kt(e)||en(e)},Of=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},un=Array.isArray,rg=/random\([^)]+\)/g,sg=/,\s*/g,Hu=/(?:-?\.?\d|\.)+/gi,Ff=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,As=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Fl=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Bf=/[+-]=-?[.\d]+/,ag=/[^,'"\[\]\s]+/gi,og=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Pt,yi,Lc,jh,jn={},il={},zf,Hf=function(e){return(il=Vs(e,jn))&&Un},Zh=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Na=function(e,t){return!t&&console.warn(e)},Gf=function(e,t){return e&&(jn[e]=t)&&il&&(il[e]=t)||jn},Oa=function(){return 0},lg={suppressEvents:!0,isStart:!0,kill:!1},Ho={suppressEvents:!0,kill:!1},cg={suppressEvents:!0},Jh={},fr=[],kc={},Vf,Gn={},Bl={},Gu=30,Go=[],Qh="",eu=function(e){var t=e[0],n,i;if(Pi(t)||kt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=Go.length;i--&&!Go[i].targetTest(t););n=Go[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new up(e[i],n)))||e.splice(i,1);return e},Xr=function(e){return e._gsap||eu(si(e))[0]._gsap},Wf=function(e,t,n){return(n=e[t])&&kt(n)?e[t]():$h(n)&&e.getAttribute&&e.getAttribute(t)||n},Pn=function(e,t){return(e=e.split(",")).forEach(t)||e},Bt=function(e){return Math.round(e*1e5)/1e5||0},Ct=function(e){return Math.round(e*1e7)/1e7||0},Ls=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},hg=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},rl=function(){var e=fr.length,t=fr.slice(0),n,i;for(kc={},fr.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},tu=function(e){return!!(e._initted||e._startAt||e.add)},Xf=function(e,t,n,i){fr.length&&!rn&&rl(),e.render(t,n,!!(rn&&t<0&&tu(e))),fr.length&&!rn&&rl()},Yf=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(ag).length<2?t:en(e)?e.trim():e},qf=function(e){return e},Zn=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},ug=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},Vs=function(e,t){for(var n in t)e[n]=t[n];return e},Vu=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Pi(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},sl=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Sa=function(e){var t=e.parent||Pt,n=e.keyframes?ug(un(e.keyframes)):Zn;if(Cn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},dg=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},$f=function(e,t,n,i,s){var a=e[i],o;if(s)for(o=t[s];a&&a[s]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=a,t.parent=t._dp=e,t},Ml=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,a=t._next;s?s._next=a:e[n]===t&&(e[n]=a),a?a._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},yr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Yr=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},fg=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Ic=function(e,t,n,i){return e._startAt&&(rn?e._startAt.revert(Ho):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},pg=function r(e){return!e||e._ts&&r(e.parent)},Wu=function(e){return e._repeat?Ws(e._tTime,e=e.duration()+e._rDelay)*e:0},Ws=function(e,t){var n=Math.floor(e=Ct(e/t));return e&&n===e?n-1:n},al=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},wl=function(e){return e._end=Ct(e._start+(e._tDur/Math.abs(e._ts||e._rts||bt)||0))},Tl=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Ct(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),wl(e),n._dirty||Yr(n,e)),e},Kf=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=al(e.rawTime(),t),(!t._dur||qa(0,t.totalDuration(),n)-t._tTime>bt)&&t.render(n,!0)),Yr(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-bt}},Mi=function(e,t,n,i){return t.parent&&yr(t),t._start=Ct((Yi(n)?n:n||e!==Pt?ei(e,n,t):e._time)+t._delay),t._end=Ct(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),$f(e,t,"_first","_last",e._sort?"_start":0),Uc(t)||(e._recent=t),i||Kf(e,t),e._ts<0&&Tl(e,e._tTime),e},jf=function(e,t){return(jn.ScrollTrigger||Zh("scrollTrigger",t))&&jn.ScrollTrigger.create(t,e)},Zf=function(e,t,n,i,s){if(iu(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!rn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Vf!==Xn.frame)return fr.push(e),e._lazy=[s,i],1},mg=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},Uc=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},gg=function(e,t,n,i){var s=e.ratio,a=t<0||!t&&(!e._start&&mg(e)&&!(!e._initted&&Uc(e))||(e._ts<0||e._dp._ts<0)&&!Uc(e))?0:1,o=e._rDelay,l=0,c,h,d;if(o&&e._repeat&&(l=qa(0,e._tDur,t),h=Ws(l,o),e._yoyo&&h&1&&(a=1-a),h!==Ws(e._tTime,o)&&(s=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==s||rn||i||e._zTime===bt||!t&&e._zTime){if(!e._initted&&Zf(e,t,i,n,l))return;for(d=e._zTime,e._zTime=t||(n?bt:0),n||(n=t&&!d),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=l,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&Ic(e,t,n,!0),e._onUpdate&&!n&&qn(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&qn(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&yr(e,1),!n&&!rn&&(qn(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},_g=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Xs=function(e,t,n,i){var s=e._repeat,a=Ct(t)||0,o=e._tTime/e._tDur;return o&&!i&&(e._time*=a/e._dur),e._dur=a,e._tDur=s?s<0?1e10:Ct(a*(s+1)+e._rDelay*s):a,o>0&&!i&&Tl(e,e._tTime=e._tDur*o),e.parent&&wl(e),n||Yr(e.parent,e),e},Xu=function(e){return e instanceof Rn?Yr(e):Xs(e,e._dur)},vg={_start:0,endTime:Oa,totalDuration:Oa},ei=function r(e,t,n){var i=e.labels,s=e._recent||vg,a=e.duration()>=ri?s.endTime(!1):e._dur,o,l,c;return en(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(t in i||(i[t]=a),i[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&n&&(l=l/100*(un(n)?n[0]:n).totalDuration()),o>1?r(e,t.substr(0,o-1),n)+l:a+l)):t==null?a:+t},Ma=function(e,t,n){var i=Yi(t[1]),s=(i?2:1)+(e<2?0:1),a=t[s],o,l;if(i&&(a.duration=t[1]),a.parent=n,e){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=Cn(l.vars.inherit)&&l.parent;a.immediateRender=Cn(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[s-1]}return new Wt(t[0],a,t[s+1])},Tr=function(e,t){return e||e===0?t(e):t},qa=function(e,t,n){return n<e?e:n>t?t:n},cn=function(e,t){return!en(e)||!(t=og.exec(e))?"":t[1]},yg=function(e,t,n){return Tr(n,function(i){return qa(e,t,i)})},Nc=[].slice,Jf=function(e,t){return e&&Pi(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Pi(e[0]))&&!e.nodeType&&e!==yi},xg=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return en(i)&&!t||Jf(i,1)?(s=n).push.apply(s,si(i)):n.push(i)})||n},si=function(e,t,n){return Rt&&!t&&Rt.selector?Rt.selector(e):en(e)&&!n&&(Lc||!Ys())?Nc.call((t||jh).querySelectorAll(e),0):un(e)?xg(e,n):Jf(e)?Nc.call(e,0):e?[e]:[]},Oc=function(e){return e=si(e)[0]||Na("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return si(t,n.querySelectorAll?n:n===e?Na("Invalid scope")||jh.createElement("div"):e)}},Qf=function(e){return e.sort(function(){return .5-Math.random()})},ep=function(e){if(kt(e))return e;var t=Pi(e)?e:{each:e},n=qr(t.ease),i=t.from||0,s=parseFloat(t.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=t.axis,h=i,d=i;return en(i)?h=d={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(h=i[0],d=i[1]),function(u,f,_){var v=(_||t).length,p=a[v],m,g,y,S,E,w,b,A,C;if(!p){if(C=t.grid==="auto"?0:(t.grid||[1,ri])[1],!C){for(b=-ri;b<(b=_[C++].getBoundingClientRect().left)&&C<v;);C<v&&C--}for(p=a[v]=[],m=l?Math.min(C,v)*h-.5:i%C,g=C===ri?0:l?v*d/C-.5:i/C|0,b=0,A=ri,w=0;w<v;w++)y=w%C-m,S=g-(w/C|0),p[w]=E=c?Math.abs(c==="y"?S:y):Nf(y*y+S*S),E>b&&(b=E),E<A&&(A=E);i==="random"&&Qf(p),p.max=b-A,p.min=A,p.v=v=(parseFloat(t.amount)||parseFloat(t.each)*(C>v?v-1:c?c==="y"?v/C:C:Math.max(C,v/C))||0)*(i==="edges"?-1:1),p.b=v<0?s-v:s,p.u=cn(t.amount||t.each)||0,n=n&&v<0?kg(n):n}return v=(p[u]-p.min)/p.max||0,Ct(p.b+(n?n(v):v)*p.v)+p.u}},Fc=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=Ct(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(Yi(n)?0:cn(n))}},tp=function(e,t){var n=un(e),i,s;return!n&&Pi(e)&&(i=n=e.radius||ri,e.values?(e=si(e.values),(s=!Yi(e[0]))&&(i*=i)):e=Fc(e.increment)),Tr(t,n?kt(e)?function(a){return s=e(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=ri,h=0,d=e.length,u,f;d--;)s?(u=e[d].x-o,f=e[d].y-l,u=u*u+f*f):u=Math.abs(e[d]-o),u<c&&(c=u,h=d);return h=!i||c<=i?e[h]:a,s||h===a||Yi(a)?h:h+cn(a)}:Fc(e))},np=function(e,t,n,i){return Tr(un(e)?!t:n===!0?!!(n=0):!i,function(){return un(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},bg=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,a){return a(s)},i)}},Sg=function(e,t){return function(n){return e(parseFloat(n))+(t||cn(n))}},Mg=function(e,t,n){return rp(e,t,0,1,n)},ip=function(e,t,n){return Tr(n,function(i){return e[~~t(i)]})},wg=function r(e,t,n){var i=t-e;return un(e)?ip(e,r(0,e.length),t):Tr(n,function(s){return(i+(s-e)%i)%i+e})},Tg=function r(e,t,n){var i=t-e,s=i*2;return un(e)?ip(e,r(0,e.length-1),t):Tr(n,function(a){return a=(s+(a-e)%s)%s||0,e+(a>i?s-a:a)})},Fa=function(e){return e.replace(rg,function(t){var n=t.indexOf("[")+1,i=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(sg);return np(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},rp=function(e,t,n,i,s){var a=t-e,o=i-n;return Tr(s,function(l){return n+((l-e)/a*o||0)})},Eg=function r(e,t,n,i){var s=isNaN(e+t)?0:function(f){return(1-f)*e+f*t};if(!s){var a=en(e),o={},l,c,h,d,u;if(n===!0&&(i=1)&&(n=null),a)e={p:e},t={p:t};else if(un(e)&&!un(t)){for(h=[],d=e.length,u=d-2,c=1;c<d;c++)h.push(r(e[c-1],e[c]));d--,s=function(_){_*=d;var v=Math.min(u,~~_);return h[v](_-v)},n=t}else i||(e=Vs(un(e)?[]:{},e));if(!h){for(l in t)nu.call(o,e,l,"get",t[l]);s=function(_){return au(_,o)||(a?e.p:e)}}}return Tr(n,s)},Yu=function(e,t,n){var i=e.labels,s=ri,a,o,l;for(a in i)o=i[a]-t,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},qn=function(e,t,n){var i=e.vars,s=i[t],a=Rt,o=e._ctx,l,c,h;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&fr.length&&rl(),o&&(Rt=o),h=l?s.apply(c,l):s.call(c),Rt=a,h},pa=function(e){return yr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!rn),e.progress()<1&&qn(e,"onInterrupt"),e},Rs,sp=[],ap=function(e){if(e)if(e=!e.name&&e.default||e,Kh()||e.headless){var t=e.name,n=kt(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Oa,render:au,add:nu,kill:Vg,modifier:Gg,rawVars:0},a={targetTest:0,get:0,getSetter:su,aliases:{},register:0};if(Ys(),e!==i){if(Gn[t])return;Zn(i,Zn(sl(e,s),a)),Vs(i.prototype,Vs(s,sl(e,a))),Gn[i.prop=t]=i,e.targetTest&&(Go.push(i),Jh[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Gf(t,i),e.register&&e.register(Un,i,Dn)}else sp.push(e)},xt=255,ma={aqua:[0,xt,xt],lime:[0,xt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,xt],navy:[0,0,128],white:[xt,xt,xt],olive:[128,128,0],yellow:[xt,xt,0],orange:[xt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[xt,0,0],pink:[xt,192,203],cyan:[0,xt,xt],transparent:[xt,xt,xt,0]},zl=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*xt+.5|0},op=function(e,t,n){var i=e?Yi(e)?[e>>16,e>>8&xt,e&xt]:0:ma.black,s,a,o,l,c,h,d,u,f,_;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),ma[e])i=ma[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+s+s+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&xt,i&xt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&xt,e&xt]}else if(e.substr(0,3)==="hsl"){if(i=_=e.match(Hu),!t)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,a=h<=.5?h*(c+1):h+c-h*c,s=h*2-a,i.length>3&&(i[3]*=1),i[0]=zl(l+1/3,s,a),i[1]=zl(l,s,a),i[2]=zl(l-1/3,s,a);else if(~e.indexOf("="))return i=e.match(Ff),n&&i.length<4&&(i[3]=1),i}else i=e.match(Hu)||ma.transparent;i=i.map(Number)}return t&&!_&&(s=i[0]/xt,a=i[1]/xt,o=i[2]/xt,d=Math.max(s,a,o),u=Math.min(s,a,o),h=(d+u)/2,d===u?l=c=0:(f=d-u,c=h>.5?f/(2-d-u):f/(d+u),l=d===s?(a-o)/f+(a<o?6:0):d===a?(o-s)/f+2:(s-a)/f+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},lp=function(e){var t=[],n=[],i=-1;return e.split(pr).forEach(function(s){var a=s.match(As)||[];t.push.apply(t,a),n.push(i+=a.length+1)}),t.c=n,t},qu=function(e,t,n){var i="",s=(e+i).match(pr),a=t?"hsla(":"rgba(",o=0,l,c,h,d;if(!s)return e;if(s=s.map(function(u){return(u=op(u,t,1))&&a+(t?u[0]+","+u[1]+"%,"+u[2]+"%,"+u[3]:u.join(","))+")"}),n&&(h=lp(e),l=n.c,l.join(i)!==h.c.join(i)))for(c=e.replace(pr,"1").split(As),d=c.length-1;o<d;o++)i+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(h.length?h:s.length?s:n).shift());if(!c)for(c=e.split(pr),d=c.length-1;o<d;o++)i+=c[o]+s[o];return i+c[d]},pr=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in ma)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),Ag=/hsl[a]?\(/,cp=function(e){var t=e.join(" "),n;if(pr.lastIndex=0,pr.test(t))return n=Ag.test(t),e[1]=qu(e[1],n),e[0]=qu(e[0],n,lp(e[1])),!0},Ba,Xn=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,a=s,o=[],l,c,h,d,u,f,_=function v(p){var m=r()-i,g=p===!0,y,S,E,w;if((m>e||m<0)&&(n+=m-t),i+=m,E=i-n,y=E-a,(y>0||g)&&(w=++d.frame,u=E-d.time*1e3,d.time=E=E/1e3,a+=y+(y>=s?4:s-y),S=1),g||(l=c(v)),S)for(f=0;f<o.length;f++)o[f](E,u,w,p)};return d={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(p){return u/(1e3/(p||60))},wake:function(){zf&&(!Lc&&Kh()&&(yi=Lc=window,jh=yi.document||{},jn.gsap=Un,(yi.gsapVersions||(yi.gsapVersions=[])).push(Un.version),Hf(il||yi.GreenSockGlobals||!yi.gsap&&yi||{}),sp.forEach(ap)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=h||function(p){return setTimeout(p,a-d.time*1e3+1|0)},Ba=1,_(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),Ba=0,c=Oa},lagSmoothing:function(p,m){e=p||1/0,t=Math.min(m||33,e)},fps:function(p){s=1e3/(p||240),a=d.time*1e3+s},add:function(p,m,g){var y=m?function(S,E,w,b){p(S,E,w,b),d.remove(y)}:p;return d.remove(p),o[g?"unshift":"push"](y),Ys(),y},remove:function(p,m){~(m=o.indexOf(p))&&o.splice(m,1)&&f>=m&&f--},_listeners:o},d}(),Ys=function(){return!Ba&&Xn.wake()},lt={},Rg=/^[\d.\-M][\d.\-,\s]/,Cg=/["']/g,Pg=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),t[i]=isNaN(c)?c.replace(Cg,"").trim():+c,i=l.substr(o+1).trim();return t},Dg=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},Lg=function(e){var t=(e+"").split("("),n=lt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[Pg(t[1])]:Dg(e).split(",").map(Yf)):lt._CE&&Rg.test(e)?lt._CE("",e):n},kg=function(e){return function(t){return 1-e(1-t)}},qr=function(e,t){return e&&(kt(e)?e:lt[e]||Lg(e))||t},rs=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},a;return Pn(e,function(o){lt[o]=jn[o]=s,lt[a=o.toLowerCase()]=n;for(var l in s)lt[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=lt[o+"."+l]=s[l]}),s},hp=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Hl=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),a=s/Dc*(Math.asin(1/i)||0),o=function(h){return h===1?1:i*Math.pow(2,-10*h)*ig((h-a)*s)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:hp(o);return s=Dc/s,l.config=function(c,h){return r(e,c,h)},l},Gl=function r(e,t){t===void 0&&(t=1.70158);var n=function(a){return a?--a*a*((t+1)*a+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:hp(n);return i.config=function(s){return r(e,s)},i};Pn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;rs(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});lt.Linear.easeNone=lt.none=lt.Linear.easeIn;rs("Elastic",Hl("in"),Hl("out"),Hl());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(o){return o<t?r*o*o:o<n?r*Math.pow(o-1.5/e,2)+.75:o<i?r*(o-=2.25/e)*o+.9375:r*Math.pow(o-2.625/e,2)+.984375};rs("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);rs("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});rs("Circ",function(r){return-(Nf(1-r*r)-1)});rs("Sine",function(r){return r===1?1:-ng(r*eg)+1});rs("Back",Gl("in"),Gl("out"),Gl());lt.SteppedEase=lt.steps=jn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,a=1-bt;return function(o){return((i*qa(0,a,o)|0)+s)*n}}};Ua.ease=lt["quad.out"];Pn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return Qh+=r+","+r+"Params,"});var up=function(e,t){this.id=tg++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Wf,this.set=t?t.getSetter:su},za=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Xs(this,+t.duration,1,1),this.data=t.data,Rt&&(this._ctx=Rt,Rt.data.push(this)),Ba||Xn.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Xs(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Ys(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Tl(this,n),!s._dp||s.parent||Kf(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Mi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===bt||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Xf(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Wu(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Wu(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Ws(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-bt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?al(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-bt?0:this._rts,this.totalTime(qa(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),wl(this),fg(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ys(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==bt&&(this._tTime-=bt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=Ct(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Mi(i,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Cn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?al(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=cg);var i=rn;return rn=n,tu(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),rn=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Xu(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Xu(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(ei(this,n),Cn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Cn(i)),this._dur||(this._zTime=-bt),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-bt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-bt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-bt)},e.eventCallback=function(n,i,s){var a=this.vars;return arguments.length>1?(i?(a[n]=i,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},e.then=function(n){var i=this,s=i._prom;return new Promise(function(a){var o=kt(n)?n:qf,l=function(){var h=i.then;i.then=null,s&&s(),kt(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=h),a(o),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},e.kill=function(){pa(this)},r}();Zn(za.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-bt,_prom:0,_ps:!1,_rts:1});var Rn=function(r){Uf(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Cn(n.sortChildren),Pt&&Mi(n.parent||Pt,Oi(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&jf(Oi(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,a){return Ma(0,arguments,this),this},t.from=function(i,s,a){return Ma(1,arguments,this),this},t.fromTo=function(i,s,a,o){return Ma(2,arguments,this),this},t.set=function(i,s,a){return s.duration=0,s.parent=this,Sa(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Wt(i,s,ei(this,a),1),this},t.call=function(i,s,a){return Mi(this,Wt.delayedCall(0,i,s),a)},t.staggerTo=function(i,s,a,o,l,c,h){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=h,a.parent=this,new Wt(i,a,ei(this,l)),this},t.staggerFrom=function(i,s,a,o,l,c,h){return a.runBackwards=1,Sa(a).immediateRender=Cn(a.immediateRender),this.staggerTo(i,s,a,o,l,c,h)},t.staggerFromTo=function(i,s,a,o,l,c,h,d){return o.startAt=a,Sa(o).immediateRender=Cn(o.immediateRender),this.staggerTo(i,s,o,l,c,h,d)},t.render=function(i,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:Ct(i),d=this._zTime<0!=i<0&&(this._initted||!c),u,f,_,v,p,m,g,y,S,E,w,b;if(this!==Pt&&h>l&&i>=0&&(h=l),h!==this._tTime||a||d){if(o!==this._time&&c&&(h+=this._time-o,i+=this._time-o),u=h,S=this._start,y=this._ts,m=!y,d&&(c||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(w=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,s,a);if(u=Ct(h%p),h===l?(v=this._repeat,u=c):(E=Ct(h/p),v=~~E,v&&v===E&&(u=c,v--),u>c&&(u=c)),E=Ws(this._tTime,p),!o&&this._tTime&&E!==v&&this._tTime-E*p-this._dur<=0&&(E=v),w&&v&1&&(u=c-u,b=1),v!==E&&!this._lock){var A=w&&E&1,C=A===(w&&v&1);if(v<E&&(A=!A),o=A?0:h%c?c:h,this._lock=1,this.render(o||(b?0:Ct(v*p)),s,!c)._lock=0,this._tTime=h,!s&&this.parent&&qn(this,"onRepeat"),this.vars.repeatRefresh&&!b&&(this.invalidate()._lock=1,E=v),o&&o!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,C&&(this._lock=2,o=A?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!b&&this.invalidate()),this._lock=0,!this._ts&&!m)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(g=_g(this,Ct(o),Ct(u)),g&&(h-=u-(u=g._start))),this._tTime=h,this._time=u,this._act=!!y,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&h&&c&&!s&&!E&&(qn(this,"onStart"),this._tTime!==h))return this;if(u>=o&&i>=0)for(f=this._first;f;){if(_=f._next,(f._act||u>=f._start)&&f._ts&&g!==f){if(f.parent!==this)return this.render(i,s,a);if(f.render(f._ts>0?(u-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(u-f._start)*f._ts,s,a),u!==this._time||!this._ts&&!m){g=0,_&&(h+=this._zTime=-bt);break}}f=_}else{f=this._last;for(var x=i<0?i:u;f;){if(_=f._prev,(f._act||x<=f._end)&&f._ts&&g!==f){if(f.parent!==this)return this.render(i,s,a);if(f.render(f._ts>0?(x-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(x-f._start)*f._ts,s,a||rn&&tu(f)),u!==this._time||!this._ts&&!m){g=0,_&&(h+=this._zTime=x?-bt:bt);break}}f=_}}if(g&&!s&&(this.pause(),g.render(u>=o?0:-bt)._zTime=u>=o?1:-1,this._ts))return this._start=S,wl(this),this.render(i,s,a);this._onUpdate&&!s&&qn(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&o)&&(S===this._start||Math.abs(y)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&yr(this,1),!s&&!(i<0&&!o)&&(h||o||!l)&&(qn(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var a=this;if(Yi(s)||(s=ei(this,s,i)),!(i instanceof za)){if(un(i))return i.forEach(function(o){return a.add(o,s)}),this;if(en(i))return this.addLabel(i,s);if(kt(i))i=Wt.delayedCall(0,i);else return this}return this!==i?Mi(this,i,s):this},t.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-ri);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Wt?s&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},t.remove=function(i){return en(i)?this.removeLabel(i):kt(i)?this.killTweensOf(i):(i.parent===this&&Ml(this,i),i===this._recent&&(this._recent=this._last),Yr(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ct(Xn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=ei(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,a){var o=Wt.delayedCall(0,s||Oa,a);return o.data="isPause",this._hasPause=1,Mi(this,o,ei(this,i))},t.removePause=function(i){var s=this._first;for(i=ei(this,i);s;)s._start===i&&s.data==="isPause"&&yr(s),s=s._next},t.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)or!==o[l]&&o[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var a=[],o=si(i),l=this._first,c=Yi(s),h;l;)l instanceof Wt?hg(l._targets,o)&&(c?(!or||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(h=l.getTweensOf(o,s)).length&&a.push.apply(a,h),l=l._next;return a},t.tweenTo=function(i,s){s=s||{};var a=this,o=ei(a,i),l=s,c=l.startAt,h=l.onStart,d=l.onStartParams,u=l.immediateRender,f,_=Wt.to(a,Zn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||bt,onStart:function(){if(a.pause(),!f){var p=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());_._dur!==p&&Xs(_,p,0,1).render(_._time,!0,!0),f=1}h&&h.apply(_,d||[])}},s));return u?_.render(0):_},t.tweenFromTo=function(i,s,a){return this.tweenTo(s,Zn({startAt:{time:ei(this,i)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Yu(this,ei(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Yu(this,ei(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+bt)},t.shiftChildren=function(i,s,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(i=Ct(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=i);return Yr(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Yr(this)},t.totalDuration=function(i){var s=0,a=this,o=a._last,l=ri,c,h,d;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(d=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,Mi(a,o,h-o._delay,1)._lock=0):l=h,h<0&&o._ts&&(s-=h,(!d&&!a._dp||d&&d.smoothChildTiming)&&(a._start+=Ct(h/a._ts),a._time-=h,a._tTime-=h),a.shiftChildren(-h,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;Xs(a,a===Pt&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(i){if(Pt._ts&&(Xf(Pt,al(i,Pt)),Vf=Xn.frame),Xn.frame>=Gu){Gu+=Kn.autoSleep||120;var s=Pt._first;if((!s||!s._ts)&&Kn.autoSleep&&Xn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Xn.sleep()}}},e}(za);Zn(Rn.prototype,{_lock:0,_hasPause:0,_forcing:0});var Ig=function(e,t,n,i,s,a,o){var l=new Dn(this._pt,e,t,0,1,_p,null,s),c=0,h=0,d,u,f,_,v,p,m,g;for(l.b=n,l.e=i,n+="",i+="",(m=~i.indexOf("random("))&&(i=Fa(i)),a&&(g=[n,i],a(g,e,t),n=g[0],i=g[1]),u=n.match(Fl)||[];d=Fl.exec(i);)_=d[0],v=i.substring(c,d.index),f?f=(f+1)%5:v.substr(-5)==="rgba("&&(f=1),_!==u[h++]&&(p=parseFloat(u[h-1])||0,l._pt={_next:l._pt,p:v||h===1?v:",",s:p,c:_.charAt(1)==="="?Ls(p,_)-p:parseFloat(_)-p,m:f&&f<4?Math.round:0},c=Fl.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(Bf.test(i)||m)&&(l.e=0),this._pt=l,l},nu=function(e,t,n,i,s,a,o,l,c,h){kt(i)&&(i=i(s||0,e,a));var d=e[t],u=n!=="get"?n:kt(d)?c?e[t.indexOf("set")||!kt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,f=kt(d)?c?Bg:mp:ru,_;if(en(i)&&(~i.indexOf("random(")&&(i=Fa(i)),i.charAt(1)==="="&&(_=Ls(u,i)+(cn(u)||0),(_||_===0)&&(i=_))),!h||u!==i||Bc)return!isNaN(u*i)&&i!==""?(_=new Dn(this._pt,e,t,+u||0,i-(u||0),typeof d=="boolean"?Hg:gp,0,f),c&&(_.fp=c),o&&_.modifier(o,this,e),this._pt=_):(!d&&!(t in e)&&Zh(t,i),Ig.call(this,e,t,u,i,f,l||Kn.stringFilter,c))},Ug=function(e,t,n,i,s){if(kt(e)&&(e=wa(e,s,t,n,i)),!Pi(e)||e.style&&e.nodeType||un(e)||Of(e))return en(e)?wa(e,s,t,n,i):e;var a={},o;for(o in e)a[o]=wa(e[o],s,t,n,i);return a},dp=function(e,t,n,i,s,a){var o,l,c,h;if(Gn[e]&&(o=new Gn[e]).init(s,o.rawVars?t[e]:Ug(t[e],i,s,a,n),n,i,a)!==!1&&(n._pt=l=new Dn(n._pt,s,e,0,1,o.render,o,0,o.priority),n!==Rs))for(c=n._ptLookup[n._targets.indexOf(s)],h=o._props.length;h--;)c[o._props[h]]=l;return o},or,Bc,iu=function r(e,t,n){var i=e.vars,s=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,d=i.yoyoEase,u=i.keyframes,f=i.autoRevert,_=e._dur,v=e._startAt,p=e._targets,m=e.parent,g=m&&m.data==="nested"?m.vars.targets:p,y=e._overwrite==="auto"&&!qh,S=e.timeline,E=i.easeReverse||d,w,b,A,C,x,M,P,L,U,X,B,G,Y;if(S&&(!u||!s)&&(s="none"),e._ease=qr(s,Ua.ease),e._rEase=E&&(qr(E)||e._ease),e._from=!S&&!!i.runBackwards,e._from&&(e.ratio=1),!S||u&&!i.stagger){if(L=p[0]?Xr(p[0]).harness:0,G=L&&i[L.prop],w=sl(i,Jh),v&&(v._zTime<0&&v.progress(1),t<0&&h&&o&&!f?v.render(-1,!0):v.revert(h&&_?Ho:lg),v._lazy=0),a){if(yr(e._startAt=Wt.set(p,Zn({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!v&&Cn(l),startAt:null,delay:0,onUpdate:c&&function(){return qn(e,"onUpdate")},stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(rn||!o&&!f)&&e._startAt.revert(Ho),o&&_&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(h&&_&&!v){if(t&&(o=!1),A=Zn({overwrite:!1,data:"isFromStart",lazy:o&&!v&&Cn(l),immediateRender:o,stagger:0,parent:m},w),G&&(A[L.prop]=G),yr(e._startAt=Wt.set(p,A)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(rn?e._startAt.revert(Ho):e._startAt.render(-1,!0)),e._zTime=t,!o)r(e._startAt,bt,bt);else if(!t)return}for(e._pt=e._ptCache=0,l=_&&Cn(l)||l&&!_,b=0;b<p.length;b++){if(x=p[b],P=x._gsap||eu(p)[b]._gsap,e._ptLookup[b]=X={},kc[P.id]&&fr.length&&rl(),B=g===p?b:g.indexOf(x),L&&(U=new L).init(x,G||w,e,B,g)!==!1&&(e._pt=C=new Dn(e._pt,x,U.name,0,1,U.render,U,0,U.priority),U._props.forEach(function(re){X[re]=C}),U.priority&&(M=1)),!L||G)for(A in w)Gn[A]&&(U=dp(A,w,e,B,x,g))?U.priority&&(M=1):X[A]=C=nu.call(e,x,A,"get",w[A],B,g,0,i.stringFilter);e._op&&e._op[b]&&e.kill(x,e._op[b]),y&&e._pt&&(or=e,Pt.killTweensOf(x,X,e.globalTime(t)),Y=!e.parent,or=0),e._pt&&l&&(kc[P.id]=1)}M&&vp(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!Y,u&&t<=0&&S.render(ri,!0,!0)},Ng=function(e,t,n,i,s,a,o,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],h,d,u,f;if(!c)for(c=e._ptCache[t]=[],u=e._ptLookup,f=e._targets.length;f--;){if(h=u[f][t],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==t&&h.fp!==t;)h=h._next;if(!h)return Bc=1,e.vars[t]="+=0",iu(e,o),Bc=0,l?Na(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(f=c.length;f--;)d=c[f],h=d._pt||d,h.s=(i||i===0)&&!s?i:h.s+(i||0)+a*h.c,h.c=n-h.s,d.e&&(d.e=Bt(n)+cn(d.e)),d.b&&(d.b=h.s+cn(d.b))},Og=function(e,t){var n=e[0]?Xr(e[0]).harness:0,i=n&&n.aliases,s,a,o,l;if(!i)return t;s=Vs({},t);for(a in i)if(a in s)for(l=i[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},Fg=function(e,t,n,i){var s=t.ease||i||"power1.inOut",a,o;if(un(t))o=n[e]||(n[e]=[]),t.forEach(function(l,c){return o.push({t:c/(t.length-1)*100,v:l,e:s})});else for(a in t)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:s})},wa=function(e,t,n,i,s){return kt(e)?e.call(t,n,i,s):en(e)&&~e.indexOf("random(")?Fa(e):e},fp=Qh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",pp={};Pn(fp+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return pp[r]=1});var Wt=function(r){Uf(e,r);function e(n,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=r.call(this,a?i:Sa(i))||this;var l=o.vars,c=l.duration,h=l.delay,d=l.immediateRender,u=l.stagger,f=l.overwrite,_=l.keyframes,v=l.defaults,p=l.scrollTrigger,m=i.parent||Pt,g=(un(n)||Of(n)?Yi(n[0]):"length"in i)?[n]:si(n),y,S,E,w,b,A,C,x;if(o._targets=g.length?eu(g):Na("GSAP target "+n+" not found. https://gsap.com",!Kn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=f,_||u||Ja(c)||Ja(h)){i=o.vars;var M=i.easeReverse||i.yoyoEase;if(y=o.timeline=new Rn({data:"nested",defaults:v||{},targets:m&&m.data==="nested"?m.vars.targets:g}),y.kill(),y.parent=y._dp=Oi(o),y._start=0,u||Ja(c)||Ja(h)){if(w=g.length,C=u&&ep(u),Pi(u))for(b in u)~fp.indexOf(b)&&(x||(x={}),x[b]=u[b]);for(S=0;S<w;S++)E=sl(i,pp),E.stagger=0,M&&(E.easeReverse=M),x&&Vs(E,x),A=g[S],E.duration=+wa(c,Oi(o),S,A,g),E.delay=(+wa(h,Oi(o),S,A,g)||0)-o._delay,!u&&w===1&&E.delay&&(o._delay=h=E.delay,o._start+=h,E.delay=0),y.to(A,E,C?C(S,A,g):0),y._ease=lt.none;y.duration()?c=h=0:o.timeline=0}else if(_){Sa(Zn(y.vars.defaults,{ease:"none"})),y._ease=qr(_.ease||i.ease||"none");var P=0,L,U,X;if(un(_))_.forEach(function(B){return y.to(g,B,">")}),y.duration();else{E={};for(b in _)b==="ease"||b==="easeEach"||Fg(b,_[b],E,_.easeEach);for(b in E)for(L=E[b].sort(function(B,G){return B.t-G.t}),P=0,S=0;S<L.length;S++)U=L[S],X={ease:U.e,duration:(U.t-(S?L[S-1].t:0))/100*c},X[b]=U.v,y.to(g,X,P),P+=X.duration;y.duration()<c&&y.to({},{duration:c-y.duration()})}}c||o.duration(c=y.duration())}else o.timeline=0;return f===!0&&!qh&&(or=Oi(o),Pt.killTweensOf(g),or=0),Mi(m,Oi(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(d||!c&&!_&&o._start===Ct(m._time)&&Cn(d)&&pg(Oi(o))&&m.data!=="nested")&&(o._tTime=-bt,o.render(Math.max(0,-h)||0)),p&&jf(Oi(o),p),o}var t=e.prototype;return t.render=function(i,s,a){var o=this._time,l=this._tDur,c=this._dur,h=i<0,d=i>l-bt&&!h?l:i<bt?0:i,u,f,_,v,p,m,g,y;if(!c)gg(this,i,s,a);else if(d!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(u=d,y=this.timeline,this._repeat){if(v=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(v*100+i,s,a);if(u=Ct(d%v),d===l?(_=this._repeat,u=c):(p=Ct(d/v),_=~~p,_&&_===p?(u=c,_--):u>c&&(u=c)),m=this._yoyo&&_&1,m&&(u=c-u),p=Ws(this._tTime,v),u===o&&!a&&this._initted&&_===p)return this._tTime=d,this;_!==p&&this.vars.repeatRefresh&&!m&&!this._lock&&u!==v&&this._initted&&(this._lock=a=1,this.render(Ct(v*_),!0).invalidate()._lock=0)}if(!this._initted){if(Zf(this,h?i:u,a,s,d))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&_!==p))return this;if(c!==this._dur)return this.render(i,s,a)}if(this._rEase){var S=u<o;if(S!==this._inv){var E=S?o:c-o;this._inv=S,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=E?(S?-1:1)/E:0,this._invScale=S?-this.ratio:1-this.ratio,this._invEase=S?this._rEase:this._ease}this.ratio=g=this._invRatio+this._invScale*this._invEase((u-this._invTime)*this._invRecip)}else this.ratio=g=this._ease(u/c);if(this._from&&(this.ratio=g=1-g),this._tTime=d,this._time=u,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&d&&!s&&!p&&(qn(this,"onStart"),this._tTime!==d))return this;for(f=this._pt;f;)f.r(g,f.d),f=f._next;y&&y.render(i<0?i:y._dur*y._ease(u/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(h&&Ic(this,i,s,a),qn(this,"onUpdate")),this._repeat&&_!==p&&this.vars.onRepeat&&!s&&this.parent&&qn(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(h&&!this._onUpdate&&Ic(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&yr(this,1),!s&&!(h&&!o)&&(d||o||m)&&(qn(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,a,o,l){Ba||Xn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||iu(this,c),h=this._ease(c/this._dur),Ng(this,i,s,a,o,h,c,l)?this.resetTo(i,s,a,o,1):(Tl(this,0),this.parent||$f(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?pa(this):this.scrollTrigger&&this.scrollTrigger.kill(!!rn),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,or&&or.vars.overwrite!==!0)._first||pa(this),this.parent&&a!==this.timeline.totalDuration()&&Xs(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?si(i):o,c=this._ptLookup,h=this._pt,d,u,f,_,v,p,m;if((!s||s==="all")&&dg(o,l))return s==="all"&&(this._pt=0),pa(this);for(d=this._op=this._op||[],s!=="all"&&(en(s)&&(v={},Pn(s,function(g){return v[g]=1}),s=v),s=Og(o,s)),m=o.length;m--;)if(~l.indexOf(o[m])){u=c[m],s==="all"?(d[m]=s,_=u,f={}):(f=d[m]=d[m]||{},_=s);for(v in _)p=u&&u[v],p&&((!("kill"in p.d)||p.d.kill(v)===!0)&&Ml(this,p,"_pt"),delete u[v]),f!=="all"&&(f[v]=1)}return this._initted&&!this._pt&&h&&pa(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return Ma(1,arguments)},e.delayedCall=function(i,s,a,o){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(i,s,a){return Ma(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,a){return Pt.killTweensOf(i,s,a)},e}(za);Zn(Wt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Pn("staggerTo,staggerFrom,staggerFromTo",function(r){Wt[r]=function(){var e=new Rn,t=Nc.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var ru=function(e,t,n){return e[t]=n},mp=function(e,t,n){return e[t](n)},Bg=function(e,t,n,i){return e[t](i.fp,n)},zg=function(e,t,n){return e.setAttribute(t,n)},su=function(e,t){return kt(e[t])?mp:$h(e[t])&&e.setAttribute?zg:ru},gp=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},Hg=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},_p=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},au=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},Gg=function(e,t,n,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(e,t,n),s=a},Vg=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?Ml(this,t,"_pt"):t.dep||(n=1),t=i;return!n},Wg=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},vp=function(e){for(var t=e._pt,n,i,s,a;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:a)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:a=t,t=n}e._pt=s},Dn=function(){function r(t,n,i,s,a,o,l,c,h){this.t=n,this.s=s,this.c=a,this.p=i,this.r=o||gp,this.d=l||this,this.set=c||ru,this.pr=h||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=Wg,this.m=n,this.mt=s,this.tween=i},r}();Pn(Qh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return Jh[r]=1});jn.TweenMax=jn.TweenLite=Wt;jn.TimelineLite=jn.TimelineMax=Rn;Pt=new Rn({sortChildren:!1,defaults:Ua,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Kn.stringFilter=cp;var $r=[],Vo={},Xg=[],$u=0,Yg=0,Vl=function(e){return(Vo[e]||Xg).map(function(t){return t()})},zc=function(){var e=Date.now(),t=[];e-$u>2&&(Vl("matchMediaInit"),$r.forEach(function(n){var i=n.queries,s=n.conditions,a,o,l,c;for(o in i)a=yi.matchMedia(i[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&t.push(n))}),Vl("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),$u=e,Vl("matchMedia"))},yp=function(){function r(t,n){this.selector=n&&Oc(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Yg++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){kt(n)&&(s=i,i=n,n=kt);var a=this,o=function(){var c=Rt,h=a.selector,d;return c&&c!==a&&c.data.push(a),s&&(a.selector=Oc(s)),Rt=a,d=i.apply(a,arguments),kt(d)&&a._r.push(d),Rt=c,a.selector=h,a.isReverted=!1,d};return a.last=o,n===kt?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},e.ignore=function(n){var i=Rt;Rt=null,n(this),Rt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Wt&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return o.splice(o.indexOf(h),1)}));for(o.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,d){return d.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Rn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Wt)&&c.revert&&c.revert(n);s._r.forEach(function(h){return h(n,s)}),s.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var a=$r.length;a--;)$r[a].id===this.id&&$r.splice(a,1)},e.revert=function(n){this.kill(n||{})},r}(),qg=function(){function r(t){this.contexts=[],this.scope=t,Rt&&Rt.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){Pi(n)||(n={matches:n});var a=new yp(0,s||this.scope),o=a.conditions={},l,c,h;Rt&&!a.selector&&(a.selector=Rt.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?h=1:(l=yi.matchMedia(n[c]),l&&($r.indexOf(a)<0&&$r.push(a),(o[c]=l.matches)&&(h=1),l.addListener?l.addListener(zc):l.addEventListener("change",zc)));return h&&i(a,function(d){return a.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),ol={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return ap(i)})},timeline:function(e){return new Rn(e)},getTweensOf:function(e,t){return Pt.getTweensOf(e,t)},getProperty:function(e,t,n,i){en(e)&&(e=si(e)[0]);var s=Xr(e||{}).get,a=n?qf:Yf;return n==="native"&&(n=""),e&&(t?a((Gn[t]&&Gn[t].get||s)(e,t,n,i)):function(o,l,c){return a((Gn[o]&&Gn[o].get||s)(e,o,l,c))})},quickSetter:function(e,t,n){if(e=si(e),e.length>1){var i=e.map(function(h){return Un.quickSetter(h,t,n)}),s=i.length;return function(h){for(var d=s;d--;)i[d](h)}}e=e[0]||{};var a=Gn[t],o=Xr(e),l=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(h){var d=new a;Rs._pt=0,d.init(e,n?h+n:h,Rs,0,[e]),d.render(1,d),Rs._pt&&au(1,Rs)}:o.set(e,l);return a?c:function(h){return c(e,l,n?h+n:h,o,1)}},quickTo:function(e,t,n){var i,s=Un.to(e,Zn((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(l,c,h){return s.resetTo(t,l,c,h)};return a.tween=s,a},isTweening:function(e){return Pt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=qr(e.ease,Ua.ease)),Vu(Ua,e||{})},config:function(e){return Vu(Kn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,a=e.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!Gn[o]&&!jn[o]&&Na(t+" effect requires "+o+" plugin.")}),Bl[t]=function(o,l,c){return n(si(o),Zn(l||{},s),c)},a&&(Rn.prototype[t]=function(o,l,c){return this.add(Bl[t](o,Pi(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){lt[e]=qr(t)},parseEase:function(e,t){return arguments.length?qr(e,t):lt},getById:function(e){return Pt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Rn(e),i,s;for(n.smoothChildTiming=Cn(e.smoothChildTiming),Pt.remove(n),n._dp=0,n._time=n._tTime=Pt._time,i=Pt._first;i;)s=i._next,(t||!(!i._dur&&i instanceof Wt&&i.vars.onComplete===i._targets[0]))&&Mi(n,i,i._start-i._delay),i=s;return Mi(Pt,n,0),n},context:function(e,t){return e?new yp(e,t):Rt},matchMedia:function(e){return new qg(e)},matchMediaRefresh:function(){return $r.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||zc()},addEventListener:function(e,t){var n=Vo[e]||(Vo[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Vo[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:wg,wrapYoyo:Tg,distribute:ep,random:np,snap:tp,normalize:Mg,getUnit:cn,clamp:yg,splitColor:op,toArray:si,selector:Oc,mapRange:rp,pipe:bg,unitize:Sg,interpolate:Eg,shuffle:Qf},install:Hf,effects:Bl,ticker:Xn,updateRoot:Rn.updateRoot,plugins:Gn,globalTimeline:Pt,core:{PropTween:Dn,globals:Gf,Tween:Wt,Timeline:Rn,Animation:za,getCache:Xr,_removeLinkedListItem:Ml,reverting:function(){return rn},context:function(e){return e&&Rt&&(Rt.data.push(e),e._ctx=Rt),Rt},suppressOverwrites:function(e){return qh=e}}};Pn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return ol[r]=Wt[r]});Xn.add(Rn.updateRoot);Rs=ol.to({},{duration:0});var $g=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},Kg=function(e,t){var n=e._targets,i,s,a;for(i in t)for(s=n.length;s--;)a=e._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=$g(a,i)),a&&a.modifier&&a.modifier(t[i],e,n[s],i))},Wl=function(e,t){return{name:e,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var l,c;if(en(s)&&(l={},Pn(s,function(h){return l[h]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}Kg(o,s)}}}},Un=ol.registerPlugin({name:"attr",init:function(e,t,n,i,s){var a,o,l;this.tween=n;for(a in t)l=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(l||0)+"",t[a],i,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)rn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Wl("roundProps",Fc),Wl("modifiers"),Wl("snap",tp))||ol;Wt.version=Rn.version=Un.version="3.15.0";zf=1;Kh()&&Ys();lt.Power0;lt.Power1;lt.Power2;lt.Power3;lt.Power4;lt.Linear;lt.Quad;lt.Cubic;lt.Quart;lt.Quint;lt.Strong;lt.Elastic;lt.Back;lt.SteppedEase;lt.Bounce;lt.Sine;lt.Expo;lt.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Ku,lr,ks,ou,Hr,ju,lu,jg=function(){return typeof window<"u"},qi={},Ur=180/Math.PI,Is=Math.PI/180,os=Math.atan2,Zu=1e8,cu=/([A-Z])/g,Zg=/(left|right|width|margin|padding|x)/i,Jg=/[\s,\(]\S/,Ai={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Hc=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Qg=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},e_=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},t_=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},n_=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},xp=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},bp=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},i_=function(e,t,n){return e.style[t]=n},r_=function(e,t,n){return e.style.setProperty(t,n)},s_=function(e,t,n){return e._gsap[t]=n},a_=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},o_=function(e,t,n,i,s){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},l_=function(e,t,n,i,s){var a=e._gsap;a[t]=n,a.renderTransform(s,a)},Dt="transform",Ln=Dt+"Origin",c_=function r(e,t){var n=this,i=this.target,s=i.style,a=i._gsap;if(e in qi&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Ai[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return n.tfm[o]=Fi(i,o)}):this.tfm[e]=a.x?a[e]:Fi(i,e),e===Ln&&(this.tfm.zOrigin=a.zOrigin);else return Ai.transform.split(",").forEach(function(o){return r.call(n,o,t)});if(this.props.indexOf(Dt)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Ln,t,"")),e=Dt}(s||t)&&this.props.push(e,t,s[e])},Sp=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},h_=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,a;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(cu,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=lu(),(!s||!s.isStart)&&!n[Dt]&&(Sp(n),i.zOrigin&&n[Ln]&&(n[Ln]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Mp=function(e,t){var n={target:e,props:[],revert:h_,save:c_};return e._gsap||Un.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},wp,Gc=function(e,t){var n=lr.createElementNS?lr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):lr.createElement(e);return n&&n.style?n:lr.createElement(e)},$n=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(cu,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,qs(t)||t,1)||""},Ju="O,Moz,ms,Ms,Webkit".split(","),qs=function(e,t,n){var i=t||Hr,s=i.style,a=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!(Ju[a]+e in s););return a<0?null:(a===3?"ms":a>=0?Ju[a]:"")+e},Vc=function(){jg()&&window.document&&(Ku=window,lr=Ku.document,ks=lr.documentElement,Hr=Gc("div")||{style:{}},Gc("div"),Dt=qs(Dt),Ln=Dt+"Origin",Hr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",wp=!!qs("perspective"),lu=Un.core.reverting,ou=1)},Qu=function(e){var t=e.ownerSVGElement,n=Gc("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),ks.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),ks.removeChild(n),s},ed=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Tp=function(e){var t,n;try{t=e.getBBox()}catch{t=Qu(e),n=1}return t&&(t.width||t.height)||n||(t=Qu(e)),t&&!t.width&&!t.x&&!t.y?{x:+ed(e,["x","cx","x1"])||0,y:+ed(e,["y","cy","y1"])||0,width:0,height:0}:t},Ep=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Tp(e))},xr=function(e,t){if(t){var n=e.style,i;t in qi&&t!==Ln&&(t=Dt),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(cu,"-$1").toLowerCase())):n.removeAttribute(t)}},cr=function(e,t,n,i,s,a){var o=new Dn(e._pt,t,n,0,1,a?bp:xp);return e._pt=o,o.b=i,o.e=s,e._props.push(n),o},td={deg:1,rad:1,turn:1},u_={grid:1,flex:1},br=function r(e,t,n,i){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=Hr.style,l=Zg.test(t),c=e.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),d=100,u=i==="px",f=i==="%",_,v,p,m;if(i===a||!s||td[i]||td[a])return s;if(a!=="px"&&!u&&(s=r(e,t,n,"px")),m=e.getCTM&&Ep(e),(f||a==="%")&&(qi[t]||~t.indexOf("adius")))return _=m?e.getBBox()[l?"width":"height"]:e[h],Bt(f?s/_*d:s/100*_);if(o[l?"width":"height"]=d+(u?a:i),v=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,m&&(v=(e.ownerSVGElement||{}).parentNode),(!v||v===lr||!v.appendChild)&&(v=lr.body),p=v._gsap,p&&f&&p.width&&l&&p.time===Xn.time&&!p.uncache)return Bt(s/p.width*d);if(f&&(t==="height"||t==="width")){var g=e.style[t];e.style[t]=d+i,_=e[h],g?e.style[t]=g:xr(e,t)}else(f||a==="%")&&!u_[$n(v,"display")]&&(o.position=$n(e,"position")),v===e&&(o.position="static"),v.appendChild(Hr),_=Hr[h],v.removeChild(Hr),o.position="absolute";return l&&f&&(p=Xr(v),p.time=Xn.time,p.width=v[h]),Bt(u?_*s/d:_&&s?d/_*s:0)},Fi=function(e,t,n,i){var s;return ou||Vc(),t in Ai&&t!=="transform"&&(t=Ai[t],~t.indexOf(",")&&(t=t.split(",")[0])),qi[t]&&t!=="transform"?(s=Ga(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:cl($n(e,Ln))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=ll[t]&&ll[t](e,t,n)||$n(e,t)||Wf(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?br(e,t,s,n)+n:s},d_=function(e,t,n,i){if(!n||n==="none"){var s=qs(t,e,1),a=s&&$n(e,s,1);a&&a!==n?(t=s,n=a):t==="borderColor"&&(n=$n(e,"borderTopColor"))}var o=new Dn(this._pt,e.style,t,0,1,_p),l=0,c=0,h,d,u,f,_,v,p,m,g,y,S,E;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=$n(e,i.substring(4,i.indexOf(")")))),i==="auto"&&(v=e.style[t],e.style[t]=i,i=$n(e,t)||i,v?e.style[t]=v:xr(e,t)),h=[n,i],cp(h),n=h[0],i=h[1],u=n.match(As)||[],E=i.match(As)||[],E.length){for(;d=As.exec(i);)p=d[0],g=i.substring(l,d.index),_?_=(_+1)%5:(g.substr(-5)==="rgba("||g.substr(-5)==="hsla(")&&(_=1),p!==(v=u[c++]||"")&&(f=parseFloat(v)||0,S=v.substr((f+"").length),p.charAt(1)==="="&&(p=Ls(f,p)+S),m=parseFloat(p),y=p.substr((m+"").length),l=As.lastIndex-y.length,y||(y=y||Kn.units[t]||S,l===i.length&&(i+=y,o.e+=y)),S!==y&&(f=br(e,t,v,y)||0),o._pt={_next:o._pt,p:g||c===1?g:",",s:f,c:m-f,m:_&&_<4||t==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=t==="display"&&i==="none"?bp:xp;return Bf.test(i)&&(o.e=0),this._pt=o,o},nd={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},f_=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=nd[n]||n,t[1]=nd[i]||i,t.join(" ")},p_=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],qi[o]&&(l=1,o=o==="transformOrigin"?Ln:Dt),xr(n,o);l&&(xr(n,Dt),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Ga(n,1),a.uncache=1,Sp(i)))}},ll={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var a=e._pt=new Dn(e._pt,t,n,0,0,p_);return a.u=i,a.pr=-10,a.tween=s,e._props.push(n),1}}},Ha=[1,0,0,1,0,0],Ap={},Rp=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},id=function(e){var t=$n(e,Dt);return Rp(t)?Ha:t.substr(7).match(Ff).map(Bt)},hu=function(e,t){var n=e._gsap||Xr(e),i=e.style,s=id(e),a,o,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Ha:s):(s===Ha&&!e.offsetParent&&e!==ks&&!n.svg&&(l=i.display,i.display="block",a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,ks.appendChild(e)),s=id(e),l?i.display=l:xr(e,"display"),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):ks.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Wc=function(e,t,n,i,s,a){var o=e._gsap,l=s||hu(e,!0),c=o.xOrigin||0,h=o.yOrigin||0,d=o.xOffset||0,u=o.yOffset||0,f=l[0],_=l[1],v=l[2],p=l[3],m=l[4],g=l[5],y=t.split(" "),S=parseFloat(y[0])||0,E=parseFloat(y[1])||0,w,b,A,C;n?l!==Ha&&(b=f*p-_*v)&&(A=S*(p/b)+E*(-v/b)+(v*g-p*m)/b,C=S*(-_/b)+E*(f/b)-(f*g-_*m)/b,S=A,E=C):(w=Tp(e),S=w.x+(~y[0].indexOf("%")?S/100*w.width:S),E=w.y+(~(y[1]||y[0]).indexOf("%")?E/100*w.height:E)),i||i!==!1&&o.smooth?(m=S-c,g=E-h,o.xOffset=d+(m*f+g*v)-m,o.yOffset=u+(m*_+g*p)-g):o.xOffset=o.yOffset=0,o.xOrigin=S,o.yOrigin=E,o.smooth=!!i,o.origin=t,o.originIsAbsolute=!!n,e.style[Ln]="0px 0px",a&&(cr(a,o,"xOrigin",c,S),cr(a,o,"yOrigin",h,E),cr(a,o,"xOffset",d,o.xOffset),cr(a,o,"yOffset",u,o.yOffset)),e.setAttribute("data-svg-origin",S+" "+E)},Ga=function(e,t){var n=e._gsap||new up(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(e),c=$n(e,Ln)||"0",h,d,u,f,_,v,p,m,g,y,S,E,w,b,A,C,x,M,P,L,U,X,B,G,Y,re,k,oe,Be,Ye,$,Q;return h=d=u=v=p=m=g=y=S=0,f=_=1,n.svg=!!(e.getCTM&&Ep(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Dt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Dt]!=="none"?l[Dt]:"")),i.scale=i.rotate=i.translate="none"),b=hu(e,n.svg),n.svg&&(n.uncache?(Y=e.getBBox(),c=n.xOrigin-Y.x+"px "+(n.yOrigin-Y.y)+"px",G=""):G=!t&&e.getAttribute("data-svg-origin"),Wc(e,G||c,!!G||n.originIsAbsolute,n.smooth!==!1,b)),E=n.xOrigin||0,w=n.yOrigin||0,b!==Ha&&(M=b[0],P=b[1],L=b[2],U=b[3],h=X=b[4],d=B=b[5],b.length===6?(f=Math.sqrt(M*M+P*P),_=Math.sqrt(U*U+L*L),v=M||P?os(P,M)*Ur:0,g=L||U?os(L,U)*Ur+v:0,g&&(_*=Math.abs(Math.cos(g*Is))),n.svg&&(h-=E-(E*M+w*L),d-=w-(E*P+w*U))):(Q=b[6],Ye=b[7],k=b[8],oe=b[9],Be=b[10],$=b[11],h=b[12],d=b[13],u=b[14],A=os(Q,Be),p=A*Ur,A&&(C=Math.cos(-A),x=Math.sin(-A),G=X*C+k*x,Y=B*C+oe*x,re=Q*C+Be*x,k=X*-x+k*C,oe=B*-x+oe*C,Be=Q*-x+Be*C,$=Ye*-x+$*C,X=G,B=Y,Q=re),A=os(-L,Be),m=A*Ur,A&&(C=Math.cos(-A),x=Math.sin(-A),G=M*C-k*x,Y=P*C-oe*x,re=L*C-Be*x,$=U*x+$*C,M=G,P=Y,L=re),A=os(P,M),v=A*Ur,A&&(C=Math.cos(A),x=Math.sin(A),G=M*C+P*x,Y=X*C+B*x,P=P*C-M*x,B=B*C-X*x,M=G,X=Y),p&&Math.abs(p)+Math.abs(v)>359.9&&(p=v=0,m=180-m),f=Bt(Math.sqrt(M*M+P*P+L*L)),_=Bt(Math.sqrt(B*B+Q*Q)),A=os(X,B),g=Math.abs(A)>2e-4?A*Ur:0,S=$?1/($<0?-$:$):0),n.svg&&(G=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!Rp($n(e,Dt)),G&&e.setAttribute("transform",G))),Math.abs(g)>90&&Math.abs(g)<270&&(s?(f*=-1,g+=v<=0?180:-180,v+=v<=0?180:-180):(_*=-1,g+=g<=0?180:-180)),t=t||n.uncache,n.x=h-((n.xPercent=h&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-h)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=u+a,n.scaleX=Bt(f),n.scaleY=Bt(_),n.rotation=Bt(v)+o,n.rotationX=Bt(p)+o,n.rotationY=Bt(m)+o,n.skewX=g+o,n.skewY=y+o,n.transformPerspective=S+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[Ln]=cl(c)),n.xOffset=n.yOffset=0,n.force3D=Kn.force3D,n.renderTransform=n.svg?g_:wp?Cp:m_,n.uncache=0,n},cl=function(e){return(e=e.split(" "))[0]+" "+e[1]},Xl=function(e,t,n){var i=cn(t);return Bt(parseFloat(t)+parseFloat(br(e,"x",n+"px",i)))+i},m_=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Cp(e,t)},Ar="0deg",ra="0px",Rr=") ",Cp=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,h=n.rotationY,d=n.rotationX,u=n.skewX,f=n.skewY,_=n.scaleX,v=n.scaleY,p=n.transformPerspective,m=n.force3D,g=n.target,y=n.zOrigin,S="",E=m==="auto"&&e&&e!==1||m===!0;if(y&&(d!==Ar||h!==Ar)){var w=parseFloat(h)*Is,b=Math.sin(w),A=Math.cos(w),C;w=parseFloat(d)*Is,C=Math.cos(w),a=Xl(g,a,b*C*-y),o=Xl(g,o,-Math.sin(w)*-y),l=Xl(g,l,A*C*-y+y)}p!==ra&&(S+="perspective("+p+Rr),(i||s)&&(S+="translate("+i+"%, "+s+"%) "),(E||a!==ra||o!==ra||l!==ra)&&(S+=l!==ra||E?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+Rr),c!==Ar&&(S+="rotate("+c+Rr),h!==Ar&&(S+="rotateY("+h+Rr),d!==Ar&&(S+="rotateX("+d+Rr),(u!==Ar||f!==Ar)&&(S+="skew("+u+", "+f+Rr),(_!==1||v!==1)&&(S+="scale("+_+", "+v+Rr),g.style[Dt]=S||"translate(0, 0)"},g_=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,h=n.skewY,d=n.scaleX,u=n.scaleY,f=n.target,_=n.xOrigin,v=n.yOrigin,p=n.xOffset,m=n.yOffset,g=n.forceCSS,y=parseFloat(a),S=parseFloat(o),E,w,b,A,C;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=Is,c*=Is,E=Math.cos(l)*d,w=Math.sin(l)*d,b=Math.sin(l-c)*-u,A=Math.cos(l-c)*u,c&&(h*=Is,C=Math.tan(c-h),C=Math.sqrt(1+C*C),b*=C,A*=C,h&&(C=Math.tan(h),C=Math.sqrt(1+C*C),E*=C,w*=C)),E=Bt(E),w=Bt(w),b=Bt(b),A=Bt(A)):(E=d,A=u,w=b=0),(y&&!~(a+"").indexOf("px")||S&&!~(o+"").indexOf("px"))&&(y=br(f,"x",a,"px"),S=br(f,"y",o,"px")),(_||v||p||m)&&(y=Bt(y+_-(_*E+v*b)+p),S=Bt(S+v-(_*w+v*A)+m)),(i||s)&&(C=f.getBBox(),y=Bt(y+i/100*C.width),S=Bt(S+s/100*C.height)),C="matrix("+E+","+w+","+b+","+A+","+y+","+S+")",f.setAttribute("transform",C),g&&(f.style[Dt]=C)},__=function(e,t,n,i,s){var a=360,o=en(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?Ur:1),c=l-i,h=i+c+"deg",d,u;return o&&(d=s.split("_")[1],d==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),d==="cw"&&c<0?c=(c+a*Zu)%a-~~(c/a)*a:d==="ccw"&&c>0&&(c=(c-a*Zu)%a-~~(c/a)*a)),e._pt=u=new Dn(e._pt,t,n,i,c,Qg),u.e=h,u.u="deg",e._props.push(n),u},rd=function(e,t){for(var n in t)e[n]=t[n];return e},v_=function(e,t,n){var i=rd({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,h,d,u,f,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[Dt]=t,o=Ga(n,1),xr(n,Dt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Dt],a[Dt]=t,o=Ga(n,1),a[Dt]=c);for(l in qi)c=i[l],h=o[l],c!==h&&s.indexOf(l)<0&&(f=cn(c),_=cn(h),d=f!==_?br(n,l,c,_):parseFloat(c),u=parseFloat(h),e._pt=new Dn(e._pt,o,l,d,u-d,Hc),e._pt.u=_||0,e._props.push(l));rd(o,i)};Pn("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",a=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(o){return e<2?r+o:"border"+o+r});ll[e>1?"border"+r:r]=function(o,l,c,h,d){var u,f;if(arguments.length<4)return u=a.map(function(_){return Fi(o,_,c)}),f=u.join(" "),f.split(u[0]).length===5?u[0]:f;u=(h+"").split(" "),f={},a.forEach(function(_,v){return f[_]=u[v]=u[v]||u[(v-1)/2|0]}),o.init(l,f,d)}});var Pp={name:"css",register:Vc,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var a=this._props,o=e.style,l=n.vars.startAt,c,h,d,u,f,_,v,p,m,g,y,S,E,w,b,A,C;ou||Vc(),this.styles=this.styles||Mp(e),A=this.styles.props,this.tween=n;for(v in t)if(v!=="autoRound"&&(h=t[v],!(Gn[v]&&dp(v,t,n,i,e,s)))){if(f=typeof h,_=ll[v],f==="function"&&(h=h.call(n,i,e,s),f=typeof h),f==="string"&&~h.indexOf("random(")&&(h=Fa(h)),_)_(this,e,v,h,n)&&(b=1);else if(v.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(v)+"").trim(),h+="",pr.lastIndex=0,pr.test(c)||(p=cn(c),m=cn(h),m?p!==m&&(c=br(e,v,c,m)+m):p&&(h+=p)),this.add(o,"setProperty",c,h,i,s,0,0,v),a.push(v),A.push(v,0,o[v]);else if(f!=="undefined"){if(l&&v in l?(c=typeof l[v]=="function"?l[v].call(n,i,e,s):l[v],en(c)&&~c.indexOf("random(")&&(c=Fa(c)),cn(c+"")||c==="auto"||(c+=Kn.units[v]||cn(Fi(e,v))||""),(c+"").charAt(1)==="="&&(c=Fi(e,v))):c=Fi(e,v),u=parseFloat(c),g=f==="string"&&h.charAt(1)==="="&&h.substr(0,2),g&&(h=h.substr(2)),d=parseFloat(h),v in Ai&&(v==="autoAlpha"&&(u===1&&Fi(e,"visibility")==="hidden"&&d&&(u=0),A.push("visibility",0,o.visibility),cr(this,o,"visibility",u?"inherit":"hidden",d?"inherit":"hidden",!d)),v!=="scale"&&v!=="transform"&&(v=Ai[v],~v.indexOf(",")&&(v=v.split(",")[0]))),y=v in qi,y){if(this.styles.save(v),C=h,f==="string"&&h.substring(0,6)==="var(--"){if(h=$n(e,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var x=e.style.perspective;e.style.perspective=h,h=$n(e,"perspective"),x?e.style.perspective=x:xr(e,"perspective")}d=parseFloat(h)}if(S||(E=e._gsap,E.renderTransform&&!t.parseTransform||Ga(e,t.parseTransform),w=t.smoothOrigin!==!1&&E.smooth,S=this._pt=new Dn(this._pt,o,Dt,0,1,E.renderTransform,E,0,-1),S.dep=1),v==="scale")this._pt=new Dn(this._pt,E,"scaleY",E.scaleY,(g?Ls(E.scaleY,g+d):d)-E.scaleY||0,Hc),this._pt.u=0,a.push("scaleY",v),v+="X";else if(v==="transformOrigin"){A.push(Ln,0,o[Ln]),h=f_(h),E.svg?Wc(e,h,0,w,0,this):(m=parseFloat(h.split(" ")[2])||0,m!==E.zOrigin&&cr(this,E,"zOrigin",E.zOrigin,m),cr(this,o,v,cl(c),cl(h)));continue}else if(v==="svgOrigin"){Wc(e,h,1,w,0,this);continue}else if(v in Ap){__(this,E,v,u,g?Ls(u,g+h):h);continue}else if(v==="smoothOrigin"){cr(this,E,"smooth",E.smooth,h);continue}else if(v==="force3D"){E[v]=h;continue}else if(v==="transform"){v_(this,h,e);continue}}else v in o||(v=qs(v)||v);if(y||(d||d===0)&&(u||u===0)&&!Jg.test(h)&&v in o)p=(c+"").substr((u+"").length),d||(d=0),m=cn(h)||(v in Kn.units?Kn.units[v]:p),p!==m&&(u=br(e,v,c,m)),this._pt=new Dn(this._pt,y?E:o,v,u,(g?Ls(u,g+d):d)-u,!y&&(m==="px"||v==="zIndex")&&t.autoRound!==!1?n_:Hc),this._pt.u=m||0,y&&C!==h?(this._pt.b=c,this._pt.e=C,this._pt.r=t_):p!==m&&m!=="%"&&(this._pt.b=c,this._pt.r=e_);else if(v in o)d_.call(this,e,v,c,g?g+h:h);else if(v in e)this.add(e,v,c||e[v],g?g+h:h,i,s);else if(v!=="parseTransform"){Zh(v,h);continue}y||(v in o?A.push(v,0,o[v]):typeof e[v]=="function"?A.push(v,2,e[v]()):A.push(v,1,c||e[v])),a.push(v)}}b&&vp(this)},render:function(e,t){if(t.tween._time||!lu())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Fi,aliases:Ai,getSetter:function(e,t,n){var i=Ai[t];return i&&i.indexOf(",")<0&&(t=i),t in qi&&t!==Ln&&(e._gsap.x||Fi(e,"x"))?n&&ju===n?t==="scale"?a_:s_:(ju=n||{})&&(t==="scale"?o_:l_):e.style&&!$h(e.style[t])?i_:~t.indexOf("-")?r_:su(e,t)},core:{_removeProperty:xr,_getMatrix:hu}};Un.utils.checkPrefix=qs;Un.core.getStyleSaver=Mp;(function(r,e,t,n){var i=Pn(r+","+e+","+t,function(s){qi[s]=1});Pn(e,function(s){Kn.units[s]="deg",Ap[s]=1}),Ai[i[13]]=r+","+e,Pn(n,function(s){var a=s.split(":");Ai[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Pn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Kn.units[r]="px"});Un.registerPlugin(Pp);var St=Un.registerPlugin(Pp)||Un;St.core.Tween;function y_(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function x_(r,e,t){return e&&y_(r.prototype,e),r}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var nn,Wo,Yn,hr,ur,Us,Dp,Nr,Ns,Lp,Gi,fi,kp,Ip=function(){return nn||typeof window<"u"&&(nn=window.gsap)&&nn.registerPlugin&&nn},Up=1,Cs=[],nt=[],Ci=[],Ta=Date.now,Xc=function(e,t){return t},b_=function(){var e=Ns.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,nt),i.push.apply(i,Ci),nt=n,Ci=i,Xc=function(a,o){return t[a](o)}},mr=function(e,t){return~Ci.indexOf(e)&&Ci[Ci.indexOf(e)+1][t]},Ea=function(e){return!!~Lp.indexOf(e)},pn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},fn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Qa="scrollLeft",eo="scrollTop",Yc=function(){return Gi&&Gi.isPressed||nt.cache++},hl=function(e,t){var n=function i(s){if(s||s===0){Up&&(Yn.history.scrollRestoration="manual");var a=Gi&&Gi.isPressed;s=i.v=Math.round(s)||(Gi&&Gi.iOS?1:0),e(s),i.cacheID=nt.cache,a&&Xc("ss",s)}else(t||nt.cache!==i.cacheID||Xc("ref"))&&(i.cacheID=nt.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},xn={s:Qa,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:hl(function(r){return arguments.length?Yn.scrollTo(r,qt.sc()):Yn.pageXOffset||hr[Qa]||ur[Qa]||Us[Qa]||0})},qt={s:eo,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:xn,sc:hl(function(r){return arguments.length?Yn.scrollTo(xn.sc(),r):Yn.pageYOffset||hr[eo]||ur[eo]||Us[eo]||0})},En=function(e,t){return(t&&t._ctx&&t._ctx.selector||nn.utils.toArray)(e)[0]||(typeof e=="string"&&nn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},S_=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},Sr=function(e,t){var n=t.s,i=t.sc;Ea(e)&&(e=hr.scrollingElement||ur);var s=nt.indexOf(e),a=i===qt.sc?1:2;!~s&&(s=nt.push(e)-1),nt[s+a]||pn(e,"scroll",Yc);var o=nt[s+a],l=o||(nt[s+a]=hl(mr(e,n),!0)||(Ea(e)?i:hl(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,o||(l.smooth=nn.getProperty(e,"scrollBehavior")==="smooth"),l},qc=function(e,t,n){var i=e,s=e,a=Ta(),o=a,l=t||50,c=Math.max(500,l*3),h=function(_,v){var p=Ta();v||p-a>l?(s=i,i=_,o=a,a=p):n?i+=_:i=s+(_-s)/(p-o)*(a-o)},d=function(){s=i=n?0:i,o=a=0},u=function(_){var v=o,p=s,m=Ta();return(_||_===0)&&_!==i&&h(_),a===o||m-o>c?0:(i+(n?p:-p))/((n?m:a)-v)*1e3};return{update:h,reset:d,getVelocity:u}},sa=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},sd=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},Np=function(){Ns=nn.core.globals().ScrollTrigger,Ns&&Ns.core&&b_()},Op=function(e){return nn=e||Ip(),!Wo&&nn&&typeof document<"u"&&document.body&&(Yn=window,hr=document,ur=hr.documentElement,Us=hr.body,Lp=[Yn,hr,ur,Us],nn.utils.clamp,kp=nn.core.context||function(){},Nr="onpointerenter"in Us?"pointer":"mouse",Dp=Ht.isTouch=Yn.matchMedia&&Yn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Yn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,fi=Ht.eventTypes=("ontouchstart"in ur?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in ur?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Up=0},500),Wo=1),Ns||Np(),Wo};xn.op=qt;nt.cache=0;var Ht=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){Wo||Op(nn)||console.warn("Please gsap.registerPlugin(Observer)"),Ns||Np();var i=n.tolerance,s=n.dragMinimum,a=n.type,o=n.target,l=n.lineHeight,c=n.debounce,h=n.preventDefault,d=n.onStop,u=n.onStopDelay,f=n.ignore,_=n.wheelSpeed,v=n.event,p=n.onDragStart,m=n.onDragEnd,g=n.onDrag,y=n.onPress,S=n.onRelease,E=n.onRight,w=n.onLeft,b=n.onUp,A=n.onDown,C=n.onChangeX,x=n.onChangeY,M=n.onChange,P=n.onToggleX,L=n.onToggleY,U=n.onHover,X=n.onHoverEnd,B=n.onMove,G=n.ignoreCheck,Y=n.isNormalizer,re=n.onGestureStart,k=n.onGestureEnd,oe=n.onWheel,Be=n.onEnable,Ye=n.onDisable,$=n.onClick,Q=n.scrollSpeed,de=n.capture,ae=n.allowClicks,Ee=n.lockAxis,Se=n.onLockAxis;this.target=o=En(o)||ur,this.vars=n,f&&(f=nn.utils.toArray(f)),i=i||1e-9,s=s||0,_=_||1,Q=Q||1,a=a||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Yn.getComputedStyle(Us).lineHeight)||22);var We,Ve,Ue,I,st,Ne,ze,H=this,Je=0,De=0,D=n.passive||!h&&n.passive!==!1,T=Sr(o,xn),q=Sr(o,qt),Z=T(),te=q(),j=~a.indexOf("touch")&&!~a.indexOf("pointer")&&fi[0]==="pointerdown",xe=Ea(o),ie=o.ownerDocument||hr,fe=[0,0,0],Ge=[0,0,0],ne=0,ve=function(){return ne=Ta()},ye=function(Me,ct){return(H.event=Me)&&f&&S_(Me.target,f)||ct&&j&&Me.pointerType!=="touch"||G&&G(Me,ct)},ke=function(){H._vx.reset(),H._vy.reset(),Ve.pause(),d&&d(H)},_e=function(){var Me=H.deltaX=sd(fe),ct=H.deltaY=sd(Ge),pe=Math.abs(Me)>=i,Le=Math.abs(ct)>=i;M&&(pe||Le)&&M(H,Me,ct,fe,Ge),pe&&(E&&H.deltaX>0&&E(H),w&&H.deltaX<0&&w(H),C&&C(H),P&&H.deltaX<0!=Je<0&&P(H),Je=H.deltaX,fe[0]=fe[1]=fe[2]=0),Le&&(A&&H.deltaY>0&&A(H),b&&H.deltaY<0&&b(H),x&&x(H),L&&H.deltaY<0!=De<0&&L(H),De=H.deltaY,Ge[0]=Ge[1]=Ge[2]=0),(I||Ue)&&(B&&B(H),Ue&&(p&&Ue===1&&p(H),g&&g(H),Ue=0),I=!1),Ne&&!(Ne=!1)&&Se&&Se(H),st&&(oe(H),st=!1),We=0},qe=function(Me,ct,pe){fe[pe]+=Me,Ge[pe]+=ct,H._vx.update(Me),H._vy.update(ct),c?We||(We=requestAnimationFrame(_e)):_e()},Oe=function(Me,ct){Ee&&!ze&&(H.axis=ze=Math.abs(Me)>Math.abs(ct)?"x":"y",Ne=!0),ze!=="y"&&(fe[2]+=Me,H._vx.update(Me,!0)),ze!=="x"&&(Ge[2]+=ct,H._vy.update(ct,!0)),c?We||(We=requestAnimationFrame(_e)):_e()},at=function(Me){if(!ye(Me,1)){Me=sa(Me,h);var ct=Me.clientX,pe=Me.clientY,Le=ct-H.x,Ce=pe-H.y,He=H.isDragging;H.x=ct,H.y=pe,(He||(Le||Ce)&&(Math.abs(H.startX-ct)>=s||Math.abs(H.startY-pe)>=s))&&(Ue||(Ue=He?2:1),He||(H.isDragging=!0),Oe(Le,Ce))}},N=H.onPress=function(Re){ye(Re,1)||Re&&Re.button||(H.axis=ze=null,Ve.pause(),H.isPressed=!0,Re=sa(Re),Je=De=0,H.startX=H.x=Re.clientX,H.startY=H.y=Re.clientY,H._vx.reset(),H._vy.reset(),pn(Y?o:ie,fi[1],at,D,!0),H.deltaX=H.deltaY=0,y&&y(H))},ee=H.onRelease=function(Re){if(!ye(Re,1)){fn(Y?o:ie,fi[1],at,!0);var Me=!isNaN(H.y-H.startY),ct=H.isDragging,pe=ct&&(Math.abs(H.x-H.startX)>3||Math.abs(H.y-H.startY)>3),Le=sa(Re);!pe&&Me&&(H._vx.reset(),H._vy.reset(),h&&ae&&nn.delayedCall(.08,function(){if(Ta()-ne>300&&!Re.defaultPrevented){if(Re.target.click)Re.target.click();else if(ie.createEvent){var Ce=ie.createEvent("MouseEvents");Ce.initMouseEvent("click",!0,!0,Yn,1,Le.screenX,Le.screenY,Le.clientX,Le.clientY,!1,!1,!1,!1,0,null),Re.target.dispatchEvent(Ce)}}})),H.isDragging=H.isGesturing=H.isPressed=!1,d&&ct&&!Y&&Ve.restart(!0),Ue&&_e(),m&&ct&&m(H),S&&S(H,pe)}},K=function(Me){return Me.touches&&Me.touches.length>1&&(H.isGesturing=!0)&&re(Me,H.isDragging)},J=function(){return(H.isGesturing=!1)||k(H)},le=function(Me){if(!ye(Me)){var ct=T(),pe=q();qe((ct-Z)*Q,(pe-te)*Q,1),Z=ct,te=pe,d&&Ve.restart(!0)}},ce=function(Me){if(!ye(Me)){Me=sa(Me,h),oe&&(st=!0);var ct=(Me.deltaMode===1?l:Me.deltaMode===2?Yn.innerHeight:1)*_;qe(Me.deltaX*ct,Me.deltaY*ct,0),d&&!Y&&Ve.restart(!0)}},$e=function(Me){if(!ye(Me)){var ct=Me.clientX,pe=Me.clientY,Le=ct-H.x,Ce=pe-H.y;H.x=ct,H.y=pe,I=!0,d&&Ve.restart(!0),(Le||Ce)&&Oe(Le,Ce)}},vt=function(Me){H.event=Me,U(H)},Et=function(Me){H.event=Me,X(H)},it=function(Me){return ye(Me)||sa(Me,h)&&$(H)};Ve=H._dc=nn.delayedCall(u||.25,ke).pause(),H.deltaX=H.deltaY=0,H._vx=qc(0,50,!0),H._vy=qc(0,50,!0),H.scrollX=T,H.scrollY=q,H.isDragging=H.isGesturing=H.isPressed=!1,kp(this),H.enable=function(Re){return H.isEnabled||(pn(xe?ie:o,"scroll",Yc),a.indexOf("scroll")>=0&&pn(xe?ie:o,"scroll",le,D,de),a.indexOf("wheel")>=0&&pn(o,"wheel",ce,D,de),(a.indexOf("touch")>=0&&Dp||a.indexOf("pointer")>=0)&&(pn(o,fi[0],N,D,de),pn(ie,fi[2],ee),pn(ie,fi[3],ee),ae&&pn(o,"click",ve,!0,!0),$&&pn(o,"click",it),re&&pn(ie,"gesturestart",K),k&&pn(ie,"gestureend",J),U&&pn(o,Nr+"enter",vt),X&&pn(o,Nr+"leave",Et),B&&pn(o,Nr+"move",$e)),H.isEnabled=!0,H.isDragging=H.isGesturing=H.isPressed=I=Ue=!1,H._vx.reset(),H._vy.reset(),Z=T(),te=q(),Re&&Re.type&&N(Re),Be&&Be(H)),H},H.disable=function(){H.isEnabled&&(Cs.filter(function(Re){return Re!==H&&Ea(Re.target)}).length||fn(xe?ie:o,"scroll",Yc),H.isPressed&&(H._vx.reset(),H._vy.reset(),fn(Y?o:ie,fi[1],at,!0)),fn(xe?ie:o,"scroll",le,de),fn(o,"wheel",ce,de),fn(o,fi[0],N,de),fn(ie,fi[2],ee),fn(ie,fi[3],ee),fn(o,"click",ve,!0),fn(o,"click",it),fn(ie,"gesturestart",K),fn(ie,"gestureend",J),fn(o,Nr+"enter",vt),fn(o,Nr+"leave",Et),fn(o,Nr+"move",$e),H.isEnabled=H.isPressed=H.isDragging=!1,Ye&&Ye(H))},H.kill=H.revert=function(){H.disable();var Re=Cs.indexOf(H);Re>=0&&Cs.splice(Re,1),Gi===H&&(Gi=0)},Cs.push(H),Y&&Ea(o)&&(Gi=H),H.enable(v)},x_(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();Ht.version="3.15.0";Ht.create=function(r){return new Ht(r)};Ht.register=Op;Ht.getAll=function(){return Cs.slice()};Ht.getById=function(r){return Cs.filter(function(e){return e.vars.id===r})[0]};Ip()&&nn.registerPlugin(Ht);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var be,Ts,tt,mt,Vn,dt,uu,ul,Va,Aa,ga,to,on,El,$c,_n,ad,od,Es,Fp,Yl,Bp,gn,Kc,zp,Hp,rr,jc,du,Os,fu,Ra,Zc,ql,no=1,ln=Date.now,$l=ln(),oi=0,_a=0,ld=function(e,t,n){var i=Hn(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},cd=function(e,t){return t&&(!Hn(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},M_=function r(){return _a&&requestAnimationFrame(r)},hd=function(){return El=1},ud=function(){return El=0},xi=function(e){return e},va=function(e){return Math.round(e*1e5)/1e5||0},Gp=function(){return typeof window<"u"},Vp=function(){return be||Gp()&&(be=window.gsap)&&be.registerPlugin&&be},Jr=function(e){return!!~uu.indexOf(e)},Wp=function(e){return(e==="Height"?fu:tt["inner"+e])||Vn["client"+e]||dt["client"+e]},Xp=function(e){return mr(e,"getBoundingClientRect")||(Jr(e)?function(){return Ko.width=tt.innerWidth,Ko.height=fu,Ko}:function(){return zi(e)})},w_=function(e,t,n){var i=n.d,s=n.d2,a=n.a;return(a=mr(e,"getBoundingClientRect"))?function(){return a()[i]}:function(){return(t?Wp(s):e["client"+s])||0}},T_=function(e,t){return!t||~Ci.indexOf(e)?Xp(e):function(){return Ko}},Ri=function(e,t){var n=t.s,i=t.d2,s=t.d,a=t.a;return Math.max(0,(n="scroll"+i)&&(a=mr(e,n))?a()-Xp(e)()[s]:Jr(e)?(Vn[n]||dt[n])-Wp(i):e[n]-e["offset"+i])},io=function(e,t){for(var n=0;n<Es.length;n+=3)(!t||~t.indexOf(Es[n+1]))&&e(Es[n],Es[n+1],Es[n+2])},Hn=function(e){return typeof e=="string"},hn=function(e){return typeof e=="function"},ya=function(e){return typeof e=="number"},Or=function(e){return typeof e=="object"},aa=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},ls=function(e,t,n){if(e.enabled){var i=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);i&&i.totalTime&&(e.callbackAnimation=i)}},cs=Math.abs,Yp="left",qp="top",pu="right",mu="bottom",Kr="width",jr="height",Ca="Right",Pa="Left",Da="Top",La="Bottom",Vt="padding",ti="margin",$s="Width",gu="Height",Yt="px",ni=function(e){return tt.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},E_=function(e){var t=ni(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},dd=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},zi=function(e,t){var n=t&&ni(e)[$c]!=="matrix(1, 0, 0, 1, 0, 0)"&&be.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),i},dl=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},$p=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},A_=function(e){return function(t){return be.utils.snap($p(e),t)}},_u=function(e){var t=be.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,a){a===void 0&&(a=.001);var o;if(!s)return t(i);if(s>0){for(i-=a,o=0;o<n.length;o++)if(n[o]>=i)return n[o];return n[o-1]}else for(o=n.length,i+=a;o--;)if(n[o]<=i)return n[o];return n[0]}:function(i,s,a){a===void 0&&(a=.001);var o=t(i);return!s||Math.abs(o-i)<a||o-i<0==s<0?o:t(s<0?i-e:i+e)}},R_=function(e){return function(t,n){return _u($p(e))(t,n.direction)}},ro=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},Qt=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},Jt=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},so=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},fd={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},ao={toggleActions:"play",anticipatePin:0},fl={top:0,left:0,center:.5,bottom:1,right:1},Xo=function(e,t){if(Hn(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in fl?fl[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},oo=function(e,t,n,i,s,a,o,l){var c=s.startColor,h=s.endColor,d=s.fontSize,u=s.indent,f=s.fontWeight,_=mt.createElement("div"),v=Jr(n)||mr(n,"pinType")==="fixed",p=e.indexOf("scroller")!==-1,m=v?dt:n.tagName==="IFRAME"?n.contentDocument.body:n,g=e.indexOf("start")!==-1,y=g?c:h,S="border-color:"+y+";font-size:"+d+";color:"+y+";font-weight:"+f+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return S+="position:"+((p||l)&&v?"fixed;":"absolute;"),(p||l||!v)&&(S+=(i===qt?pu:mu)+":"+(a+parseFloat(u))+"px;"),o&&(S+="box-sizing:border-box;text-align:left;width:"+o.offsetWidth+"px;"),_._isStart=g,_.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),_.style.cssText=S,_.innerText=t||t===0?e+"-"+t:e,m.children[0]?m.insertBefore(_,m.children[0]):m.appendChild(_),_._offset=_["offset"+i.op.d2],Yo(_,0,i,g),_},Yo=function(e,t,n,i){var s={display:"block"},a=n[i?"os2":"p2"],o=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+a+$s]=1,s["border"+o+$s]=0,s[n.p]=t+"px",be.set(e,s)},et=[],Jc={},Wa,pd=function(){return ln()-oi>34&&(Wa||(Wa=requestAnimationFrame(Xi)))},hs=function(){(!gn||!gn.isPressed||gn.startX>dt.clientWidth)&&(nt.cache++,gn?Wa||(Wa=requestAnimationFrame(Xi)):Xi(),oi||es("scrollStart"),oi=ln())},Kl=function(){Hp=tt.innerWidth,zp=tt.innerHeight},xa=function(e){nt.cache++,(e===!0||!on&&!Bp&&!mt.fullscreenElement&&!mt.webkitFullscreenElement&&(!Kc||Hp!==tt.innerWidth||Math.abs(tt.innerHeight-zp)>tt.innerHeight*.25))&&ul.restart(!0)},Qr={},C_=[],Kp=function r(){return Jt(Fe,"scrollEnd",r)||Gr(!0)},es=function(e){return Qr[e]&&Qr[e].map(function(t){return t()})||C_},zn=[],jp=function(e){for(var t=0;t<zn.length;t+=5)(!e||zn[t+4]&&zn[t+4].query===e)&&(zn[t].style.cssText=zn[t+1],zn[t].getBBox&&zn[t].setAttribute("transform",zn[t+2]||""),zn[t+3].uncache=1)},Zp=function(){return nt.forEach(function(e){return hn(e)&&++e.cacheID&&(e.rec=e())})},vu=function(e,t){var n;for(_n=0;_n<et.length;_n++)n=et[_n],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Ra=!0,t&&jp(t),t||es("revert")},Jp=function(e,t){nt.cache++,(t||!vn)&&nt.forEach(function(n){return hn(n)&&n.cacheID++&&(n.rec=0)}),Hn(e)&&(tt.history.scrollRestoration=du=e)},vn,Zr=0,md,P_=function(){if(md!==Zr){var e=md=Zr;requestAnimationFrame(function(){return e===Zr&&Gr(!0)})}},Qp=function(){dt.appendChild(Os),fu=!gn&&Os.offsetHeight||tt.innerHeight,dt.removeChild(Os)},gd=function(e){return Va(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Gr=function(e,t){if(Vn=mt.documentElement,dt=mt.body,uu=[tt,mt,Vn,dt],oi&&!e&&!Ra){Qt(Fe,"scrollEnd",Kp);return}Qp(),vn=Fe.isRefreshing=!0,Ra||Zp();var n=es("refreshInit");Fp&&Fe.sort(),t||vu(),nt.forEach(function(i){hn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),et.slice(0).forEach(function(i){return i.refresh()}),Ra=!1,et.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",a=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-a),i.refresh()}}),Zc=1,gd(!0),et.forEach(function(i){var s=Ri(i.scroller,i._dir),a=i.vars.end==="max"||i._endClamp&&i.end>s,o=i._startClamp&&i.start>=s;(a||o)&&i.setPositions(o?s-1:i.start,a?Math.max(o?s:i.start+1,s):i.end,!0)}),gd(!1),Zc=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),nt.forEach(function(i){hn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),Jp(du,1),ul.pause(),Zr++,vn=2,Xi(2),et.forEach(function(i){return hn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),vn=Fe.isRefreshing=!1,es("refresh")},Qc=0,qo=1,ka,Xi=function(e){if(e===2||!vn&&!Ra){Fe.isUpdating=!0,ka&&ka.update(0);var t=et.length,n=ln(),i=n-$l>=50,s=t&&et[0].scroll();if(qo=Qc>s?-1:1,vn||(Qc=s),i&&(oi&&!El&&n-oi>200&&(oi=0,es("scrollEnd")),ga=$l,$l=n),qo<0){for(_n=t;_n-- >0;)et[_n]&&et[_n].update(0,i);qo=1}else for(_n=0;_n<t;_n++)et[_n]&&et[_n].update(0,i);Fe.isUpdating=!1}Wa=0},eh=[Yp,qp,mu,pu,ti+La,ti+Ca,ti+Da,ti+Pa,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],$o=eh.concat([Kr,jr,"boxSizing","max"+$s,"max"+gu,"position",ti,Vt,Vt+Da,Vt+Ca,Vt+La,Vt+Pa]),D_=function(e,t,n){Fs(n);var i=e._gsap;if(i.spacerIsNative)Fs(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},jl=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=eh.length,a=t.style,o=e.style,l;s--;)l=eh[s],a[l]=n[l];a.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(a.display="inline-block"),o[mu]=o[pu]="auto",a.flexBasis=n.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[Kr]=dl(e,xn)+Yt,a[jr]=dl(e,qt)+Yt,a[Vt]=o[ti]=o[qp]=o[Yp]="0",Fs(i),o[Kr]=o["max"+$s]=n[Kr],o[jr]=o["max"+gu]=n[jr],o[Vt]=n[Vt],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},L_=/([A-Z])/g,Fs=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,a;for((e.t._gsap||be.core.getCache(e.t)).uncache=1;i<n;i+=2)a=e[i+1],s=e[i],a?t[s]=a:t[s]&&t.removeProperty(s.replace(L_,"-$1").toLowerCase())}},lo=function(e){for(var t=$o.length,n=e.style,i=[],s=0;s<t;s++)i.push($o[s],n[$o[s]]);return i.t=e,i},k_=function(e,t,n){for(var i=[],s=e.length,a=n?8:0,o;a<s;a+=2)o=e[a],i.push(o,o in t?t[o]:e[a+1]);return i.t=e.t,i},Ko={left:0,top:0},_d=function(e,t,n,i,s,a,o,l,c,h,d,u,f,_){hn(e)&&(e=e(l)),Hn(e)&&e.substr(0,3)==="max"&&(e=u+(e.charAt(4)==="="?Xo("0"+e.substr(3),n):0));var v=f?f.time():0,p,m,g;if(f&&f.seek(0),isNaN(e)||(e=+e),ya(e))f&&(e=be.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,u,e)),o&&Yo(o,n,i,!0);else{hn(t)&&(t=t(l));var y=(e||"0").split(" "),S,E,w,b;g=En(t,l)||dt,S=zi(g)||{},(!S||!S.left&&!S.top)&&ni(g).display==="none"&&(b=g.style.display,g.style.display="block",S=zi(g),b?g.style.display=b:g.style.removeProperty("display")),E=Xo(y[0],S[i.d]),w=Xo(y[1]||"0",n),e=S[i.p]-c[i.p]-h+E+s-w,o&&Yo(o,w,i,n-w<20||o._isStart&&w>20),n-=n-w}if(_&&(l[_]=e||-.001,e<0&&(e=0)),a){var A=e+n,C=a._isStart;p="scroll"+i.d2,Yo(a,A,i,C&&A>20||!C&&(d?Math.max(dt[p],Vn[p]):a.parentNode[p])<=A+1),d&&(c=zi(o),d&&(a.style[i.op.p]=c[i.op.p]-i.op.m-a._offset+Yt))}return f&&g&&(p=zi(g),f.seek(u),m=zi(g),f._caScrollDist=p[i.p]-m[i.p],e=e/f._caScrollDist*u),f&&f.seek(v),f?e:Math.round(e)},I_=/(webkit|moz|length|cssText|inset)/i,vd=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,a,o;if(t===dt){e._stOrig=s.cssText,o=ni(e);for(a in o)!+a&&!I_.test(a)&&o[a]&&typeof s[a]=="string"&&a!=="0"&&(s[a]=o[a]);s.top=n,s.left=i}else s.cssText=e._stOrig;be.core.getCache(e).uncache=1,t.appendChild(e)}},em=function(e,t,n){var i=t,s=i;return function(a){var o=Math.round(e());return o!==i&&o!==s&&Math.abs(o-i)>3&&Math.abs(o-s)>3&&(a=o,n&&n()),s=i,i=Math.round(a),i}},co=function(e,t,n){var i={};i[t.p]="+="+n,be.set(e,i)},yd=function(e,t){var n=Sr(e,t),i="_scroll"+t.p2,s=function a(o,l,c,h,d){var u=a.tween,f=l.onComplete,_={};c=c||n();var v=em(n,c,function(){u.kill(),a.tween=0});return d=h&&d||0,h=h||o-c,u&&u.kill(),l[i]=o,l.inherit=!1,l.modifiers=_,_[i]=function(){return v(c+h*u.ratio+d*u.ratio*u.ratio)},l.onUpdate=function(){nt.cache++,a.tween&&Xi()},l.onComplete=function(){a.tween=0,f&&f.call(u)},u=a.tween=be.to(e,l),u};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Qt(e,"wheel",n.wheelHandler),Fe.isTouch&&Qt(e,"touchmove",n.wheelHandler),s},Fe=function(){function r(t,n){Ts||r.register(be)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),jc(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!_a){this.update=this.refresh=this.kill=xi;return}n=dd(Hn(n)||ya(n)||n.nodeType?{trigger:n}:n,ao);var s=n,a=s.onUpdate,o=s.toggleClass,l=s.id,c=s.onToggle,h=s.onRefresh,d=s.scrub,u=s.trigger,f=s.pin,_=s.pinSpacing,v=s.invalidateOnRefresh,p=s.anticipatePin,m=s.onScrubComplete,g=s.onSnapComplete,y=s.once,S=s.snap,E=s.pinReparent,w=s.pinSpacer,b=s.containerAnimation,A=s.fastScrollEnd,C=s.preventOverlaps,x=n.horizontal||n.containerAnimation&&n.horizontal!==!1?xn:qt,M=!d&&d!==0,P=En(n.scroller||tt),L=be.core.getCache(P),U=Jr(P),X=("pinType"in n?n.pinType:mr(P,"pinType")||U&&"fixed")==="fixed",B=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],G=M&&n.toggleActions.split(" "),Y="markers"in n?n.markers:ao.markers,re=U?0:parseFloat(ni(P)["border"+x.p2+$s])||0,k=this,oe=n.onRefreshInit&&function(){return n.onRefreshInit(k)},Be=w_(P,U,x),Ye=T_(P,U),$=0,Q=0,de=0,ae=Sr(P,x),Ee,Se,We,Ve,Ue,I,st,Ne,ze,H,Je,De,D,T,q,Z,te,j,xe,ie,fe,Ge,ne,ve,ye,ke,_e,qe,Oe,at,N,ee,K,J,le,ce,$e,vt,Et;if(k._startClamp=k._endClamp=!1,k._dir=x,p*=45,k.scroller=P,k.scroll=b?b.time.bind(b):ae,Ve=ae(),k.vars=n,i=i||n.animation,"refreshPriority"in n&&(Fp=1,n.refreshPriority===-9999&&(ka=k)),L.tweenScroll=L.tweenScroll||{top:yd(P,qt),left:yd(P,xn)},k.tweenTo=Ee=L.tweenScroll[x.p],k.scrubDuration=function(pe){K=ya(pe)&&pe,K?ee?ee.duration(pe):ee=be.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:K,paused:!0,onComplete:function(){return m&&m(k)}}):(ee&&ee.progress(1).kill(),ee=0)},i&&(i.vars.lazy=!1,i._initted&&!k.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),k.animation=i.pause(),i.scrollTrigger=k,k.scrubDuration(d),at=0,l||(l=i.vars.id)),S&&((!Or(S)||S.push)&&(S={snapTo:S}),"scrollBehavior"in dt.style&&be.set(U?[dt,Vn]:P,{scrollBehavior:"auto"}),nt.forEach(function(pe){return hn(pe)&&pe.target===(U?mt.scrollingElement||Vn:P)&&(pe.smooth=!1)}),We=hn(S.snapTo)?S.snapTo:S.snapTo==="labels"?A_(i):S.snapTo==="labelsDirectional"?R_(i):S.directional!==!1?function(pe,Le){return _u(S.snapTo)(pe,ln()-Q<500?0:Le.direction)}:be.utils.snap(S.snapTo),J=S.duration||{min:.1,max:2},J=Or(J)?Aa(J.min,J.max):Aa(J,J),le=be.delayedCall(S.delay||K/2||.1,function(){var pe=ae(),Le=ln()-Q<500,Ce=Ee.tween;if((Le||Math.abs(k.getVelocity())<10)&&!Ce&&!El&&$!==pe){var He=(pe-I)/T,Nt=i&&!M?i.totalProgress():He,Ke=Le?0:(Nt-N)/(ln()-ga)*1e3||0,At=be.utils.clamp(-He,1-He,cs(Ke/2)*Ke/.185),Ot=He+(S.inertia===!1?0:At),Mt,yt,pt=S,Nn=pt.onStart,wt=pt.onInterrupt,R=pt.onComplete;if(Mt=We(Ot,k),ya(Mt)||(Mt=Ot),yt=Math.max(0,Math.round(I+Mt*T)),pe<=st&&pe>=I&&yt!==pe){if(Ce&&!Ce._initted&&Ce.data<=cs(yt-pe))return;S.inertia===!1&&(At=Mt-He),Ee(yt,{duration:J(cs(Math.max(cs(Ot-Nt),cs(Mt-Nt))*.185/Ke/.05||0)),ease:S.ease||"power3",data:cs(yt-pe),onInterrupt:function(){return le.restart(!0)&&wt&&ls(k,wt)},onComplete:function(){k.update(),$=ae(),i&&!M&&(ee?ee.resetTo("totalProgress",Mt,i._tTime/i._tDur):i.progress(Mt)),at=N=i&&!M?i.totalProgress():k.progress,g&&g(k),R&&ls(k,R)}},pe,At*T,yt-pe-At*T),Nn&&ls(k,Nn,Ee.tween)}}else k.isActive&&$!==pe&&le.restart(!0)}).pause()),l&&(Jc[l]=k),u=k.trigger=En(u||f!==!0&&f),Et=u&&u._gsap&&u._gsap.stRevert,Et&&(Et=Et(k)),f=f===!0?u:En(f),Hn(o)&&(o={targets:u,className:o}),f&&(_===!1||_===ti||(_=!_&&f.parentNode&&f.parentNode.style&&ni(f.parentNode).display==="flex"?!1:Vt),k.pin=f,Se=be.core.getCache(f),Se.spacer?q=Se.pinState:(w&&(w=En(w),w&&!w.nodeType&&(w=w.current||w.nativeElement),Se.spacerIsNative=!!w,w&&(Se.spacerState=lo(w))),Se.spacer=j=w||mt.createElement("div"),j.classList.add("pin-spacer"),l&&j.classList.add("pin-spacer-"+l),Se.pinState=q=lo(f)),n.force3D!==!1&&be.set(f,{force3D:!0}),k.spacer=j=Se.spacer,Oe=ni(f),ve=Oe[_+x.os2],ie=be.getProperty(f),fe=be.quickSetter(f,x.a,Yt),jl(f,j,Oe),te=lo(f)),Y){De=Or(Y)?dd(Y,fd):fd,H=oo("scroller-start",l,P,x,De,0),Je=oo("scroller-end",l,P,x,De,0,H),xe=H["offset"+x.op.d2];var it=En(mr(P,"content")||P);Ne=this.markerStart=oo("start",l,it,x,De,xe,0,b),ze=this.markerEnd=oo("end",l,it,x,De,xe,0,b),b&&(vt=be.quickSetter([Ne,ze],x.a,Yt)),!X&&!(Ci.length&&mr(P,"fixedMarkers")===!0)&&(E_(U?dt:P),be.set([H,Je],{force3D:!0}),ke=be.quickSetter(H,x.a,Yt),qe=be.quickSetter(Je,x.a,Yt))}if(b){var Re=b.vars.onUpdate,Me=b.vars.onUpdateParams;b.eventCallback("onUpdate",function(){k.update(0,0,1),Re&&Re.apply(b,Me||[])})}if(k.previous=function(){return et[et.indexOf(k)-1]},k.next=function(){return et[et.indexOf(k)+1]},k.revert=function(pe,Le){if(!Le)return k.kill(!0);var Ce=pe!==!1||!k.enabled,He=on;Ce!==k.isReverted&&(Ce&&(ce=Math.max(ae(),k.scroll.rec||0),de=k.progress,$e=i&&i.progress()),Ne&&[Ne,ze,H,Je].forEach(function(Nt){return Nt.style.display=Ce?"none":"block"}),Ce&&(on=k,k.update(Ce)),f&&(!E||!k.isActive)&&(Ce?D_(f,j,q):jl(f,j,ni(f),ye)),Ce||k.update(Ce),on=He,k.isReverted=Ce)},k.refresh=function(pe,Le,Ce,He){if(!((on||!k.enabled)&&!Le)){if(f&&pe&&oi){Qt(r,"scrollEnd",Kp);return}!vn&&oe&&oe(k),on=k,Ee.tween&&!Ce&&(Ee.tween.kill(),Ee.tween=0),ee&&ee.pause(),v&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(Qe){return Qe.vars.immediateRender&&Qe.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),k.isReverted||k.revert(!0,!0),k._subPinOffset=!1;var Nt=Be(),Ke=Ye(),At=b?b.duration():Ri(P,x),Ot=T<=.01||!T,Mt=0,yt=He||0,pt=Or(Ce)?Ce.end:n.end,Nn=n.endTrigger||u,wt=Or(Ce)?Ce.start:n.start||(n.start===0||!u?0:f?"0 0":"0 100%"),R=k.pinnedContainer=n.pinnedContainer&&En(n.pinnedContainer,k),F=u&&Math.max(0,et.indexOf(k))||0,V=F,W,O,se,ge,ue,he,Ae,Ie,we,ot,rt,gt,jt;for(Y&&Or(Ce)&&(gt=be.getProperty(H,x.p),jt=be.getProperty(Je,x.p));V-- >0;)he=et[V],he.end||he.refresh(0,1)||(on=k),Ae=he.pin,Ae&&(Ae===u||Ae===f||Ae===R)&&!he.isReverted&&(ot||(ot=[]),ot.unshift(he),he.revert(!0,!0)),he!==et[V]&&(F--,V--);for(hn(wt)&&(wt=wt(k)),wt=ld(wt,"start",k),I=_d(wt,u,Nt,x,ae(),Ne,H,k,Ke,re,X,At,b,k._startClamp&&"_startClamp")||(f?-.001:0),hn(pt)&&(pt=pt(k)),Hn(pt)&&!pt.indexOf("+=")&&(~pt.indexOf(" ")?pt=(Hn(wt)?wt.split(" ")[0]:"")+pt:(Mt=Xo(pt.substr(2),Nt),pt=Hn(wt)?wt:(b?be.utils.mapRange(0,b.duration(),b.scrollTrigger.start,b.scrollTrigger.end,I):I)+Mt,Nn=u)),pt=ld(pt,"end",k),st=Math.max(I,_d(pt||(Nn?"100% 0":At),Nn,Nt,x,ae()+Mt,ze,Je,k,Ke,re,X,At,b,k._endClamp&&"_endClamp"))||-.001,Mt=0,V=F;V--;)he=et[V]||{},Ae=he.pin,Ae&&he.start-he._pinPush<=I&&!b&&he.end>0&&(W=he.end-(k._startClamp?Math.max(0,he.start):he.start),(Ae===u&&he.start-he._pinPush<I||Ae===R)&&isNaN(wt)&&(Mt+=W*(1-he.progress)),Ae===f&&(yt+=W));if(I+=Mt,st+=Mt,k._startClamp&&(k._startClamp+=Mt),k._endClamp&&!vn&&(k._endClamp=st||-.001,st=Math.min(st,Ri(P,x))),T=st-I||(I-=.01)&&.001,Ot&&(de=be.utils.clamp(0,1,be.utils.normalize(I,st,ce))),k._pinPush=yt,Ne&&Mt&&(W={},W[x.a]="+="+Mt,R&&(W[x.p]="-="+ae()),be.set([Ne,ze],W)),f&&!(Zc&&k.end>=Ri(P,x)))W=ni(f),ge=x===qt,se=ae(),Ge=parseFloat(ie(x.a))+yt,!At&&st>1&&(rt=(U?mt.scrollingElement||Vn:P).style,rt={style:rt,value:rt["overflow"+x.a.toUpperCase()]},U&&ni(dt)["overflow"+x.a.toUpperCase()]!=="scroll"&&(rt.style["overflow"+x.a.toUpperCase()]="scroll")),jl(f,j,W),te=lo(f),O=zi(f,!0),Ie=X&&Sr(P,ge?xn:qt)(),_?(ye=[_+x.os2,T+yt+Yt],ye.t=j,V=_===Vt?dl(f,x)+T+yt:0,V&&(ye.push(x.d,V+Yt),j.style.flexBasis!=="auto"&&(j.style.flexBasis=V+Yt)),Fs(ye),R&&et.forEach(function(Qe){Qe.pin===R&&Qe.vars.pinSpacing!==!1&&(Qe._subPinOffset=!0)}),X&&ae(ce)):(V=dl(f,x),V&&j.style.flexBasis!=="auto"&&(j.style.flexBasis=V+Yt)),X&&(ue={top:O.top+(ge?se-I:Ie)+Yt,left:O.left+(ge?Ie:se-I)+Yt,boxSizing:"border-box",position:"fixed"},ue[Kr]=ue["max"+$s]=Math.ceil(O.width)+Yt,ue[jr]=ue["max"+gu]=Math.ceil(O.height)+Yt,ue[ti]=ue[ti+Da]=ue[ti+Ca]=ue[ti+La]=ue[ti+Pa]="0",ue[Vt]=W[Vt],ue[Vt+Da]=W[Vt+Da],ue[Vt+Ca]=W[Vt+Ca],ue[Vt+La]=W[Vt+La],ue[Vt+Pa]=W[Vt+Pa],Z=k_(q,ue,E),vn&&ae(0)),i?(we=i._initted,Yl(1),i.render(i.duration(),!0,!0),ne=ie(x.a)-Ge+T+yt,_e=Math.abs(T-ne)>1,X&&_e&&Z.splice(Z.length-2,2),i.render(0,!0,!0),we||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Yl(0)):ne=T,rt&&(rt.value?rt.style["overflow"+x.a.toUpperCase()]=rt.value:rt.style.removeProperty("overflow-"+x.a));else if(u&&ae()&&!b)for(O=u.parentNode;O&&O!==dt;)O._pinOffset&&(I-=O._pinOffset,st-=O._pinOffset),O=O.parentNode;ot&&ot.forEach(function(Qe){return Qe.revert(!1,!0)}),k.start=I,k.end=st,Ve=Ue=vn?ce:ae(),!b&&!vn&&(Ve<ce&&ae(ce),k.scroll.rec=0),k.revert(!1,!0),Q=ln(),le&&($=-1,le.restart(!0)),on=0,i&&M&&(i._initted||$e)&&i.progress()!==$e&&i.progress($e||0,!0).render(i.time(),!0,!0),(Ot||de!==k.progress||b||v||i&&!i._initted)&&(i&&!M&&(i._initted||de||i.vars.immediateRender!==!1)&&i.totalProgress(b&&I<-.001&&!de?be.utils.normalize(I,st,0):de,!0),k.progress=Ot||(Ve-I)/T===de?0:de),f&&_&&(j._pinOffset=Math.round(k.progress*ne)),ee&&ee.invalidate(),isNaN(gt)||(gt-=be.getProperty(H,x.p),jt-=be.getProperty(Je,x.p),co(H,x,gt),co(Ne,x,gt-(He||0)),co(Je,x,jt),co(ze,x,jt-(He||0))),Ot&&!vn&&k.update(),h&&!vn&&!D&&(D=!0,h(k),D=!1)}},k.getVelocity=function(){return(ae()-Ue)/(ln()-ga)*1e3||0},k.endAnimation=function(){aa(k.callbackAnimation),i&&(ee?ee.progress(1):i.paused()?M||aa(i,k.direction<0,1):aa(i,i.reversed()))},k.labelToScroll=function(pe){return i&&i.labels&&(I||k.refresh()||I)+i.labels[pe]/i.duration()*T||0},k.getTrailing=function(pe){var Le=et.indexOf(k),Ce=k.direction>0?et.slice(0,Le).reverse():et.slice(Le+1);return(Hn(pe)?Ce.filter(function(He){return He.vars.preventOverlaps===pe}):Ce).filter(function(He){return k.direction>0?He.end<=I:He.start>=st})},k.update=function(pe,Le,Ce){if(!(b&&!Ce&&!pe)){var He=vn===!0?ce:k.scroll(),Nt=pe?0:(He-I)/T,Ke=Nt<0?0:Nt>1?1:Nt||0,At=k.progress,Ot,Mt,yt,pt,Nn,wt,R,F;if(Le&&(Ue=Ve,Ve=b?ae():He,S&&(N=at,at=i&&!M?i.totalProgress():Ke)),p&&f&&!on&&!no&&oi&&(!Ke&&I<He+(He-Ue)/(ln()-ga)*p?Ke=1e-4:Ke===1&&st>He+(He-Ue)/(ln()-ga)*p&&(Ke=.9999)),Ke!==At&&k.enabled){if(Ot=k.isActive=!!Ke&&Ke<1,Mt=!!At&&At<1,wt=Ot!==Mt,Nn=wt||!!Ke!=!!At,k.direction=Ke>At?1:-1,k.progress=Ke,Nn&&!on&&(yt=Ke&&!At?0:Ke===1?1:At===1?2:3,M&&(pt=!wt&&G[yt+1]!=="none"&&G[yt+1]||G[yt],F=i&&(pt==="complete"||pt==="reset"||pt in i))),C&&(wt||F)&&(F||d||!i)&&(hn(C)?C(k):k.getTrailing(C).forEach(function(se){return se.endAnimation()})),M||(ee&&!on&&!no?(ee._dp._time-ee._start!==ee._time&&ee.render(ee._dp._time-ee._start),ee.resetTo?ee.resetTo("totalProgress",Ke,i._tTime/i._tDur):(ee.vars.totalProgress=Ke,ee.invalidate().restart())):i&&i.totalProgress(Ke,!!(on&&(Q||pe)))),f){if(pe&&_&&(j.style[_+x.os2]=ve),!X)fe(va(Ge+ne*Ke));else if(Nn){if(R=!pe&&Ke>At&&st+1>He&&He+1>=Ri(P,x),E)if(!pe&&(Ot||R)){var V=zi(f,!0),W=He-I;vd(f,dt,V.top+(x===qt?W:0)+Yt,V.left+(x===qt?0:W)+Yt)}else vd(f,j);Fs(Ot||R?Z:te),_e&&Ke<1&&Ot||fe(Ge+(Ke===1&&!R?ne:0))}}S&&!Ee.tween&&!on&&!no&&le.restart(!0),o&&(wt||y&&Ke&&(Ke<1||!ql))&&Va(o.targets).forEach(function(se){return se.classList[Ot||y?"add":"remove"](o.className)}),a&&!M&&!pe&&a(k),Nn&&!on?(M&&(F&&(pt==="complete"?i.pause().totalProgress(1):pt==="reset"?i.restart(!0).pause():pt==="restart"?i.restart(!0):i[pt]()),a&&a(k)),(wt||!ql)&&(c&&wt&&ls(k,c),B[yt]&&ls(k,B[yt]),y&&(Ke===1?k.kill(!1,1):B[yt]=0),wt||(yt=Ke===1?1:3,B[yt]&&ls(k,B[yt]))),A&&!Ot&&Math.abs(k.getVelocity())>(ya(A)?A:2500)&&(aa(k.callbackAnimation),ee?ee.progress(1):aa(i,pt==="reverse"?1:!Ke,1))):M&&a&&!on&&a(k)}if(qe){var O=b?He/b.duration()*(b._caScrollDist||0):He;ke(O+(H._isFlipped?1:0)),qe(O)}vt&&vt(-He/b.duration()*(b._caScrollDist||0))}},k.enable=function(pe,Le){k.enabled||(k.enabled=!0,Qt(P,"resize",xa),U||Qt(P,"scroll",hs),oe&&Qt(r,"refreshInit",oe),pe!==!1&&(k.progress=de=0,Ve=Ue=$=ae()),Le!==!1&&k.refresh())},k.getTween=function(pe){return pe&&Ee?Ee.tween:ee},k.setPositions=function(pe,Le,Ce,He){if(b){var Nt=b.scrollTrigger,Ke=b.duration(),At=Nt.end-Nt.start;pe=Nt.start+At*pe/Ke,Le=Nt.start+At*Le/Ke}k.refresh(!1,!1,{start:cd(pe,Ce&&!!k._startClamp),end:cd(Le,Ce&&!!k._endClamp)},He),k.update()},k.adjustPinSpacing=function(pe){if(ye&&pe){var Le=ye.indexOf(x.d)+1;ye[Le]=parseFloat(ye[Le])+pe+Yt,ye[1]=parseFloat(ye[1])+pe+Yt,Fs(ye)}},k.disable=function(pe,Le){if(pe!==!1&&k.revert(!0,!0),k.enabled&&(k.enabled=k.isActive=!1,Le||ee&&ee.pause(),ce=0,Se&&(Se.uncache=1),oe&&Jt(r,"refreshInit",oe),le&&(le.pause(),Ee.tween&&Ee.tween.kill()&&(Ee.tween=0)),!U)){for(var Ce=et.length;Ce--;)if(et[Ce].scroller===P&&et[Ce]!==k)return;Jt(P,"resize",xa),U||Jt(P,"scroll",hs)}},k.kill=function(pe,Le){k.disable(pe,Le),ee&&!Le&&ee.kill(),l&&delete Jc[l];var Ce=et.indexOf(k);Ce>=0&&et.splice(Ce,1),Ce===_n&&qo>0&&_n--,Ce=0,et.forEach(function(He){return He.scroller===k.scroller&&(Ce=1)}),Ce||vn||(k.scroll.rec=0),i&&(i.scrollTrigger=null,pe&&i.revert({kill:!1}),Le||i.kill()),Ne&&[Ne,ze,H,Je].forEach(function(He){return He.parentNode&&He.parentNode.removeChild(He)}),ka===k&&(ka=0),f&&(Se&&(Se.uncache=1),Ce=0,et.forEach(function(He){return He.pin===f&&Ce++}),Ce||(Se.spacer=0)),n.onKill&&n.onKill(k)},et.push(k),k.enable(!1,!1),Et&&Et(k),i&&i.add&&!T){var ct=k.update;k.update=function(){k.update=ct,nt.cache++,I||st||k.refresh()},be.delayedCall(.01,k.update),T=.01,I=st=0}else k.refresh();f&&P_()},r.register=function(n){return Ts||(be=n||Vp(),Gp()&&window.document&&r.enable(),Ts=_a),Ts},r.defaults=function(n){if(n)for(var i in n)ao[i]=n[i];return ao},r.disable=function(n,i){_a=0,et.forEach(function(a){return a[i?"kill":"disable"](n)}),Jt(tt,"wheel",hs),Jt(mt,"scroll",hs),clearInterval(to),Jt(mt,"touchcancel",xi),Jt(dt,"touchstart",xi),ro(Jt,mt,"pointerdown,touchstart,mousedown",hd),ro(Jt,mt,"pointerup,touchend,mouseup",ud),ul.kill(),io(Jt);for(var s=0;s<nt.length;s+=3)so(Jt,nt[s],nt[s+1]),so(Jt,nt[s],nt[s+2])},r.enable=function(){if(tt=window,mt=document,Vn=mt.documentElement,dt=mt.body,be){if(Va=be.utils.toArray,Aa=be.utils.clamp,jc=be.core.context||xi,Yl=be.core.suppressOverwrites||xi,du=tt.history.scrollRestoration||"auto",Qc=tt.pageYOffset||0,be.core.globals("ScrollTrigger",r),dt){_a=1,Os=document.createElement("div"),Os.style.height="100vh",Os.style.position="absolute",Qp(),M_(),Ht.register(be),r.isTouch=Ht.isTouch,rr=Ht.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Kc=Ht.isTouch===1,Qt(tt,"wheel",hs),uu=[tt,mt,Vn,dt],be.matchMedia?(r.matchMedia=function(h){var d=be.matchMedia(),u;for(u in h)d.add(u,h[u]);return d},be.addEventListener("matchMediaInit",function(){Zp(),vu()}),be.addEventListener("matchMediaRevert",function(){return jp()}),be.addEventListener("matchMedia",function(){Gr(0,1),es("matchMedia")}),be.matchMedia().add("(orientation: portrait)",function(){return Kl(),Kl})):console.warn("Requires GSAP 3.11.0 or later"),Kl(),Qt(mt,"scroll",hs);var n=dt.hasAttribute("style"),i=dt.style,s=i.borderTopStyle,a=be.core.Animation.prototype,o,l;for(a.revert||Object.defineProperty(a,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",o=zi(dt),qt.m=Math.round(o.top+qt.sc())||0,xn.m=Math.round(o.left+xn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(dt.setAttribute("style",""),dt.removeAttribute("style")),to=setInterval(pd,250),be.delayedCall(.5,function(){return no=0}),Qt(mt,"touchcancel",xi),Qt(dt,"touchstart",xi),ro(Qt,mt,"pointerdown,touchstart,mousedown",hd),ro(Qt,mt,"pointerup,touchend,mouseup",ud),$c=be.utils.checkPrefix("transform"),$o.push($c),Ts=ln(),ul=be.delayedCall(.2,Gr).pause(),Es=[mt,"visibilitychange",function(){var h=tt.innerWidth,d=tt.innerHeight;mt.hidden?(ad=h,od=d):(ad!==h||od!==d)&&xa()},mt,"DOMContentLoaded",Gr,tt,"load",Gr,tt,"resize",xa],io(Qt),et.forEach(function(h){return h.enable(0,1)}),l=0;l<nt.length;l+=3)so(Jt,nt[l],nt[l+1]),so(Jt,nt[l],nt[l+2])}else if(mt){var c=function h(){r.enable(),mt.removeEventListener("DOMContentLoaded",h)};mt.addEventListener("DOMContentLoaded",c)}}},r.config=function(n){"limitCallbacks"in n&&(ql=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(to)||(to=i)&&setInterval(pd,i),"ignoreMobileResize"in n&&(Kc=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(io(Jt)||io(Qt,n.autoRefreshEvents||"none"),Bp=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=En(n),a=nt.indexOf(s),o=Jr(s);~a&&nt.splice(a,o?6:2),i&&(o?Ci.unshift(tt,i,dt,i,Vn,i):Ci.unshift(s,i))},r.clearMatchMedia=function(n){et.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var a=(Hn(n)?En(n):n).getBoundingClientRect(),o=a[s?Kr:jr]*i||0;return s?a.right-o>0&&a.left+o<tt.innerWidth:a.bottom-o>0&&a.top+o<tt.innerHeight},r.positionInViewport=function(n,i,s){Hn(n)&&(n=En(n));var a=n.getBoundingClientRect(),o=a[s?Kr:jr],l=i==null?o/2:i in fl?fl[i]*o:~i.indexOf("%")?parseFloat(i)*o/100:parseFloat(i)||0;return s?(a.left+l)/tt.innerWidth:(a.top+l)/tt.innerHeight},r.killAll=function(n){if(et.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Qr.killAll||[];Qr={},i.forEach(function(s){return s()})}},r}();Fe.version="3.15.0";Fe.saveStyles=function(r){return r?Va(r).forEach(function(e){if(e&&e.style){var t=zn.indexOf(e);t>=0&&zn.splice(t,5),zn.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),be.core.getCache(e),jc())}}):zn};Fe.revert=function(r,e){return vu(!r,e)};Fe.create=function(r,e){return new Fe(r,e)};Fe.refresh=function(r){return r?xa(!0):(Ts||Fe.register())&&Gr(!0)};Fe.update=function(r){return++nt.cache&&Xi(r===!0?2:0)};Fe.clearScrollMemory=Jp;Fe.maxScroll=function(r,e){return Ri(r,e?xn:qt)};Fe.getScrollFunc=function(r,e){return Sr(En(r),e?xn:qt)};Fe.getById=function(r){return Jc[r]};Fe.getAll=function(){return et.filter(function(r){return r.vars.id!=="ScrollSmoother"})};Fe.isScrolling=function(){return!!oi};Fe.snapDirectional=_u;Fe.addEventListener=function(r,e){var t=Qr[r]||(Qr[r]=[]);~t.indexOf(e)||t.push(e)};Fe.removeEventListener=function(r,e){var t=Qr[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};Fe.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,a=function(c,h){var d=[],u=[],f=be.delayedCall(i,function(){h(d,u),d=[],u=[]}).pause();return function(_){d.length||f.restart(!0),d.push(_.trigger),u.push(_),s<=d.length&&f.progress(1)}},o;for(o in e)n[o]=o.substr(0,2)==="on"&&hn(e[o])&&o!=="onRefreshInit"?a(o,e[o]):e[o];return hn(s)&&(s=s(),Qt(Fe,"refresh",function(){return s=e.batchMax()})),Va(r).forEach(function(l){var c={};for(o in n)c[o]=n[o];c.trigger=l,t.push(Fe.create(c))}),t};var xd=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},Zl=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Ht.isTouch?" pinch-zoom":""):"none",e===Vn&&r(dt,t)},ho={auto:1,scroll:1},U_=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,a=s._gsap||be.core.getCache(s),o=ln(),l;if(!a._isScrollT||o-a._isScrollT>2e3){for(;s&&s!==dt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(ho[(l=ni(s)).overflowY]||ho[l.overflowX]));)s=s.parentNode;a._isScroll=s&&s!==n&&!Jr(s)&&(ho[(l=ni(s)).overflowY]||ho[l.overflowX]),a._isScrollT=o}(a._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},tm=function(e,t,n,i){return Ht.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&U_,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&Qt(mt,Ht.eventTypes[0],Sd,!1,!0)},onDisable:function(){return Jt(mt,Ht.eventTypes[0],Sd,!0)}})},N_=/(input|label|select|textarea)/i,bd,Sd=function(e){var t=N_.test(e.target.tagName);(t||bd)&&(e._gsapAllow=!0,bd=t)},O_=function(e){Or(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,a=t.onRelease,o,l,c=En(e.target)||Vn,h=be.core.globals().ScrollSmoother,d=h&&h.get(),u=rr&&(e.content&&En(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),f=Sr(c,qt),_=Sr(c,xn),v=1,p=(Ht.isTouch&&tt.visualViewport?tt.visualViewport.scale*tt.visualViewport.width:tt.outerWidth)/tt.innerWidth,m=0,g=hn(i)?function(){return i(o)}:function(){return i||2.8},y,S,E=tm(c,e.type,!0,s),w=function(){return S=!1},b=xi,A=xi,C=function(){l=Ri(c,qt),A=Aa(rr?1:0,l),n&&(b=Aa(0,Ri(c,xn))),y=Zr},x=function(){u._gsap.y=va(parseFloat(u._gsap.y)+f.offset)+"px",u.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(u._gsap.y)+", 0, 1)",f.offset=f.cacheID=0},M=function(){if(S){requestAnimationFrame(w);var Y=va(o.deltaY/2),re=A(f.v-Y);if(u&&re!==f.v+f.offset){f.offset=re-f.v;var k=va((parseFloat(u&&u._gsap.y)||0)-f.offset);u.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+k+", 0, 1)",u._gsap.y=k+"px",f.cacheID=nt.cache,Xi()}return!0}f.offset&&x(),S=!0},P,L,U,X,B=function(){C(),P.isActive()&&P.vars.scrollY>l&&(f()>l?P.progress(1)&&f(l):P.resetTo("scrollY",l))};return u&&be.set(u,{y:"+=0"}),e.ignoreCheck=function(G){return rr&&G.type==="touchmove"&&M()||v>1.05&&G.type!=="touchstart"||o.isGesturing||G.touches&&G.touches.length>1},e.onPress=function(){S=!1;var G=v;v=va((tt.visualViewport&&tt.visualViewport.scale||1)/p),P.pause(),G!==v&&Zl(c,v>1.01?!0:n?!1:"x"),L=_(),U=f(),C(),y=Zr},e.onRelease=e.onGestureStart=function(G,Y){if(f.offset&&x(),!Y)X.restart(!0);else{nt.cache++;var re=g(),k,oe;n&&(k=_(),oe=k+re*.05*-G.velocityX/.227,re*=xd(_,k,oe,Ri(c,xn)),P.vars.scrollX=b(oe)),k=f(),oe=k+re*.05*-G.velocityY/.227,re*=xd(f,k,oe,Ri(c,qt)),P.vars.scrollY=A(oe),P.invalidate().duration(re).play(.01),(rr&&P.vars.scrollY>=l||k>=l-1)&&be.to({},{onUpdate:B,duration:re})}a&&a(G)},e.onWheel=function(){P._ts&&P.pause(),ln()-m>1e3&&(y=0,m=ln())},e.onChange=function(G,Y,re,k,oe){if(Zr!==y&&C(),Y&&n&&_(b(k[2]===Y?L+(G.startX-G.x):_()+Y-k[1])),re){f.offset&&x();var Be=oe[2]===re,Ye=Be?U+G.startY-G.y:f()+re-oe[1],$=A(Ye);Be&&Ye!==$&&(U+=$-Ye),f($)}(re||Y)&&Xi()},e.onEnable=function(){Zl(c,n?!1:"x"),Fe.addEventListener("refresh",B),Qt(tt,"resize",B),f.smooth&&(f.target.style.scrollBehavior="auto",f.smooth=_.smooth=!1),E.enable()},e.onDisable=function(){Zl(c,!0),Jt(tt,"resize",B),Fe.removeEventListener("refresh",B),E.kill()},e.lockAxis=e.lockAxis!==!1,o=new Ht(e),o.iOS=rr,rr&&!f()&&f(1),rr&&be.ticker.add(xi),X=o._dc,P=be.to(o,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:em(f,f(),function(){return P.pause()})},onUpdate:Xi,onComplete:X.vars.onComplete}),o};Fe.sort=function(r){if(hn(r))return et.sort(r);var e=tt.pageYOffset||0;return Fe.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+tt.innerHeight}),et.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Fe.observe=function(r){return new Ht(r)};Fe.normalizeScroll=function(r){if(typeof r>"u")return gn;if(r===!0&&gn)return gn.enable();if(r===!1){gn&&gn.kill(),gn=r;return}var e=r instanceof Ht?r:O_(r);return gn&&gn.target===e.target&&gn.kill(),Jr(e.target)&&(gn=e),e};Fe.core={_getVelocityProp:qc,_inputObserver:tm,_scrollers:nt,_proxies:Ci,bridge:{ss:function(){oi||es("scrollStart"),oi=ln()},ref:function(){return on}}};Vp()&&be.registerPlugin(Fe);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const yu="169",Bs={ROTATE:0,DOLLY:1,PAN:2},Ps={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},F_=0,Md=1,B_=2,nm=1,z_=2,Ni=3,Mr=0,kn=1,Hi=2,gr=0,zs=1,wd=2,Td=3,Ed=4,H_=5,Br=100,G_=101,V_=102,W_=103,X_=104,Y_=200,q_=201,$_=202,K_=203,th=204,nh=205,j_=206,Z_=207,J_=208,Q_=209,ev=210,tv=211,nv=212,iv=213,rv=214,ih=0,rh=1,sh=2,Ks=3,ah=4,oh=5,lh=6,ch=7,im=0,sv=1,av=2,_r=0,ov=1,lv=2,cv=3,hv=4,uv=5,dv=6,fv=7,rm=300,js=301,Zs=302,hh=303,uh=304,Al=306,dh=1e3,Vr=1001,fh=1002,ai=1003,pv=1004,uo=1005,pi=1006,Jl=1007,Wr=1008,$i=1009,sm=1010,am=1011,Xa=1012,xu=1013,ts=1014,Vi=1015,$a=1016,bu=1017,Su=1018,Js=1020,om=35902,lm=1021,cm=1022,gi=1023,hm=1024,um=1025,Hs=1026,Qs=1027,dm=1028,Mu=1029,fm=1030,wu=1031,Tu=1033,jo=33776,Zo=33777,Jo=33778,Qo=33779,ph=35840,mh=35841,gh=35842,_h=35843,vh=36196,yh=37492,xh=37496,bh=37808,Sh=37809,Mh=37810,wh=37811,Th=37812,Eh=37813,Ah=37814,Rh=37815,Ch=37816,Ph=37817,Dh=37818,Lh=37819,kh=37820,Ih=37821,el=36492,Uh=36494,Nh=36495,pm=36283,Oh=36284,Fh=36285,Bh=36286,mv=3200,gv=3201,_v=0,vv=1,ar="",bi="srgb",Er="srgb-linear",Eu="display-p3",Rl="display-p3-linear",pl="linear",Tt="srgb",ml="rec709",gl="p3",us=7680,Ad=519,yv=512,xv=513,bv=514,mm=515,Sv=516,Mv=517,wv=518,Tv=519,Rd=35044,Cd="300 es",Wi=2e3,_l=2001;class ss{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ia=Math.PI/180,zh=180/Math.PI;function Ka(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(sn[r&255]+sn[r>>8&255]+sn[r>>16&255]+sn[r>>24&255]+"-"+sn[e&255]+sn[e>>8&255]+"-"+sn[e>>16&15|64]+sn[e>>24&255]+"-"+sn[t&63|128]+sn[t>>8&255]+"-"+sn[t>>16&255]+sn[t>>24&255]+sn[n&255]+sn[n>>8&255]+sn[n>>16&255]+sn[n>>24&255]).toLowerCase()}function yn(r,e,t){return Math.max(e,Math.min(t,r))}function Ev(r,e){return(r%e+e)%e}function Ql(r,e,t){return(1-t)*r+t*e}function oa(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Sn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Av={DEG2RAD:Ia};class Xe{constructor(e=0,t=0){Xe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(yn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ze{constructor(e,t,n,i,s,a,o,l,c){Ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],_=n[8],v=i[0],p=i[3],m=i[6],g=i[1],y=i[4],S=i[7],E=i[2],w=i[5],b=i[8];return s[0]=a*v+o*g+l*E,s[3]=a*p+o*y+l*w,s[6]=a*m+o*S+l*b,s[1]=c*v+h*g+d*E,s[4]=c*p+h*y+d*w,s[7]=c*m+h*S+d*b,s[2]=u*v+f*g+_*E,s[5]=u*p+f*y+_*w,s[8]=u*m+f*S+_*b,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*s,f=c*s-a*l,_=t*d+n*u+i*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return e[0]=d*v,e[1]=(i*c-h*n)*v,e[2]=(o*n-i*a)*v,e[3]=u*v,e[4]=(h*t-i*l)*v,e[5]=(i*s-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ec.makeScale(e,t)),this}rotate(e){return this.premultiply(ec.makeRotation(-e)),this}translate(e,t){return this.premultiply(ec.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ec=new Ze;function gm(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function vl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Rv(){const r=vl("canvas");return r.style.display="block",r}const Pd={};function tl(r){r in Pd||(Pd[r]=!0,console.warn(r))}function Cv(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function Pv(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Dv(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Dd=new Ze().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ld=new Ze().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),la={[Er]:{transfer:pl,primaries:ml,luminanceCoefficients:[.2126,.7152,.0722],toReference:r=>r,fromReference:r=>r},[bi]:{transfer:Tt,primaries:ml,luminanceCoefficients:[.2126,.7152,.0722],toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Rl]:{transfer:pl,primaries:gl,luminanceCoefficients:[.2289,.6917,.0793],toReference:r=>r.applyMatrix3(Ld),fromReference:r=>r.applyMatrix3(Dd)},[Eu]:{transfer:Tt,primaries:gl,luminanceCoefficients:[.2289,.6917,.0793],toReference:r=>r.convertSRGBToLinear().applyMatrix3(Ld),fromReference:r=>r.applyMatrix3(Dd).convertLinearToSRGB()}},Lv=new Set([Er,Rl]),ft={enabled:!0,_workingColorSpace:Er,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Lv.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=la[e].toReference,i=la[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return la[r].primaries},getTransfer:function(r){return r===ar?pl:la[r].transfer},getLuminanceCoefficients:function(r,e=this._workingColorSpace){return r.fromArray(la[e].luminanceCoefficients)}};function Gs(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function tc(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let ds;class kv{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ds===void 0&&(ds=vl("canvas")),ds.width=e.width,ds.height=e.height;const n=ds.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ds}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=vl("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Gs(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Gs(t[n]/255)*255):t[n]=Gs(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Iv=0;class _m{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Iv++}),this.uuid=Ka(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(nc(i[a].image)):s.push(nc(i[a]))}else s=nc(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function nc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?kv.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Uv=0;class In extends ss{constructor(e=In.DEFAULT_IMAGE,t=In.DEFAULT_MAPPING,n=Vr,i=Vr,s=pi,a=Wr,o=gi,l=$i,c=In.DEFAULT_ANISOTROPY,h=ar){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Uv++}),this.uuid=Ka(),this.name="",this.source=new _m(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Xe(0,0),this.repeat=new Xe(1,1),this.center=new Xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==rm)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case dh:e.x=e.x-Math.floor(e.x);break;case Vr:e.x=e.x<0?0:1;break;case fh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case dh:e.y=e.y-Math.floor(e.y);break;case Vr:e.y=e.y<0?0:1;break;case fh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}In.DEFAULT_IMAGE=null;In.DEFAULT_MAPPING=rm;In.DEFAULT_ANISOTROPY=1;class zt{constructor(e=0,t=0,n=0,i=1){zt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],_=l[9],v=l[2],p=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(_-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(_+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,S=(f+1)/2,E=(m+1)/2,w=(h+u)/4,b=(d+v)/4,A=(_+p)/4;return y>S&&y>E?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=w/n,s=b/n):S>E?S<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(S),n=w/i,s=A/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=b/s,i=A/s),this.set(n,i,s,t),this}let g=Math.sqrt((p-_)*(p-_)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(g)<.001&&(g=1),this.x=(p-_)/g,this.y=(d-v)/g,this.z=(u-h)/g,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Nv extends ss{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new zt(0,0,e,t),this.scissorTest=!1,this.viewport=new zt(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:pi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new In(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new _m(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ns extends Nv{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class vm extends In{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ai,this.minFilter=ai,this.wrapR=Vr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ov extends In{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ai,this.minFilter=ai,this.wrapR=Vr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class is{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3];const u=s[a+0],f=s[a+1],_=s[a+2],v=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=u,e[t+1]=f,e[t+2]=_,e[t+3]=v;return}if(d!==v||l!==u||c!==f||h!==_){let p=1-o;const m=l*u+c*f+h*_+d*v,g=m>=0?1:-1,y=1-m*m;if(y>Number.EPSILON){const E=Math.sqrt(y),w=Math.atan2(E,m*g);p=Math.sin(p*w)/E,o=Math.sin(o*w)/E}const S=o*g;if(l=l*p+u*S,c=c*p+f*S,h=h*p+_*S,d=d*p+v*S,p===1-o){const E=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=E,c*=E,h*=E,d*=E}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=s[a],u=s[a+1],f=s[a+2],_=s[a+3];return e[t]=o*_+h*d+l*f-c*u,e[t+1]=l*_+h*u+c*d-o*f,e[t+2]=c*_+h*f+o*u-l*d,e[t+3]=h*_-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),d=o(s/2),u=l(n/2),f=l(i/2),_=l(s/2);switch(a){case"XYZ":this._x=u*h*d+c*f*_,this._y=c*f*d-u*h*_,this._z=c*h*_+u*f*d,this._w=c*h*d-u*f*_;break;case"YXZ":this._x=u*h*d+c*f*_,this._y=c*f*d-u*h*_,this._z=c*h*_-u*f*d,this._w=c*h*d+u*f*_;break;case"ZXY":this._x=u*h*d-c*f*_,this._y=c*f*d+u*h*_,this._z=c*h*_+u*f*d,this._w=c*h*d-u*f*_;break;case"ZYX":this._x=u*h*d-c*f*_,this._y=c*f*d+u*h*_,this._z=c*h*_-u*f*d,this._w=c*h*d+u*f*_;break;case"YZX":this._x=u*h*d+c*f*_,this._y=c*f*d+u*h*_,this._z=c*h*_-u*f*d,this._w=c*h*d-u*f*_;break;case"XZY":this._x=u*h*d-c*f*_,this._y=c*f*d-u*h*_,this._z=c*h*_+u*f*d,this._w=c*h*d+u*f*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(yn(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=s*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(e=0,t=0,n=0){z.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(kd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(kd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-s*i),d=2*(s*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-s*d,this.z=i+l*d+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ic.copy(this).projectOnVector(e),this.sub(ic)}reflect(e){return this.sub(ic.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(yn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ic=new z,kd=new is;class ja{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(hi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(hi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=hi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,hi):hi.fromBufferAttribute(s,a),hi.applyMatrix4(e.matrixWorld),this.expandByPoint(hi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),fo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),fo.copy(n.boundingBox)),fo.applyMatrix4(e.matrixWorld),this.union(fo)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,hi),hi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ca),po.subVectors(this.max,ca),fs.subVectors(e.a,ca),ps.subVectors(e.b,ca),ms.subVectors(e.c,ca),Ji.subVectors(ps,fs),Qi.subVectors(ms,ps),Cr.subVectors(fs,ms);let t=[0,-Ji.z,Ji.y,0,-Qi.z,Qi.y,0,-Cr.z,Cr.y,Ji.z,0,-Ji.x,Qi.z,0,-Qi.x,Cr.z,0,-Cr.x,-Ji.y,Ji.x,0,-Qi.y,Qi.x,0,-Cr.y,Cr.x,0];return!rc(t,fs,ps,ms,po)||(t=[1,0,0,0,1,0,0,0,1],!rc(t,fs,ps,ms,po))?!1:(mo.crossVectors(Ji,Qi),t=[mo.x,mo.y,mo.z],rc(t,fs,ps,ms,po))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(hi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Di),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Di=[new z,new z,new z,new z,new z,new z,new z,new z],hi=new z,fo=new ja,fs=new z,ps=new z,ms=new z,Ji=new z,Qi=new z,Cr=new z,ca=new z,po=new z,mo=new z,Pr=new z;function rc(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Pr.fromArray(r,s);const o=i.x*Math.abs(Pr.x)+i.y*Math.abs(Pr.y)+i.z*Math.abs(Pr.z),l=e.dot(Pr),c=t.dot(Pr),h=n.dot(Pr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Fv=new ja,ha=new z,sc=new z;class Za{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Fv.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ha.subVectors(e,this.center);const t=ha.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ha,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(sc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ha.copy(e.center).add(sc)),this.expandByPoint(ha.copy(e.center).sub(sc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Li=new z,ac=new z,go=new z,er=new z,oc=new z,_o=new z,lc=new z;class Cl{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Li)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Li.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Li.copy(this.origin).addScaledVector(this.direction,t),Li.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ac.copy(e).add(t).multiplyScalar(.5),go.copy(t).sub(e).normalize(),er.copy(this.origin).sub(ac);const s=e.distanceTo(t)*.5,a=-this.direction.dot(go),o=er.dot(this.direction),l=-er.dot(go),c=er.lengthSq(),h=Math.abs(1-a*a);let d,u,f,_;if(h>0)if(d=a*l-o,u=a*o-l,_=s*h,d>=0)if(u>=-_)if(u<=_){const v=1/h;d*=v,u*=v,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-_?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c):u<=_?(d=0,u=Math.min(Math.max(-s,-l),s),f=u*(u+2*l)+c):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(ac).addScaledVector(go,u),f}intersectSphere(e,t){Li.subVectors(e.center,this.origin);const n=Li.dot(this.direction),i=Li.dot(Li)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Li)!==null}intersectTriangle(e,t,n,i,s){oc.subVectors(t,e),_o.subVectors(n,e),lc.crossVectors(oc,_o);let a=this.direction.dot(lc),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;er.subVectors(this.origin,e);const l=o*this.direction.dot(_o.crossVectors(er,_o));if(l<0)return null;const c=o*this.direction.dot(oc.cross(er));if(c<0||l+c>a)return null;const h=-o*er.dot(lc);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class It{constructor(e,t,n,i,s,a,o,l,c,h,d,u,f,_,v,p){It.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,h,d,u,f,_,v,p)}set(e,t,n,i,s,a,o,l,c,h,d,u,f,_,v,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=_,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new It().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/gs.setFromMatrixColumn(e,0).length(),s=1/gs.setFromMatrixColumn(e,1).length(),a=1/gs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const u=a*h,f=a*d,_=o*h,v=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+_*c,t[5]=u-v*c,t[9]=-o*l,t[2]=v-u*c,t[6]=_+f*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,f=l*d,_=c*h,v=c*d;t[0]=u+v*o,t[4]=_*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-_,t[6]=v+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,f=l*d,_=c*h,v=c*d;t[0]=u-v*o,t[4]=-a*d,t[8]=_+f*o,t[1]=f+_*o,t[5]=a*h,t[9]=v-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,f=a*d,_=o*h,v=o*d;t[0]=l*h,t[4]=_*c-f,t[8]=u*c+v,t[1]=l*d,t[5]=v*c+u,t[9]=f*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,f=a*c,_=o*l,v=o*c;t[0]=l*h,t[4]=v-u*d,t[8]=_*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+_,t[10]=u-v*d}else if(e.order==="XZY"){const u=a*l,f=a*c,_=o*l,v=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+v,t[5]=a*h,t[9]=f*d-_,t[2]=_*d-f,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Bv,e,zv)}lookAt(e,t,n){const i=this.elements;return Fn.subVectors(e,t),Fn.lengthSq()===0&&(Fn.z=1),Fn.normalize(),tr.crossVectors(n,Fn),tr.lengthSq()===0&&(Math.abs(n.z)===1?Fn.x+=1e-4:Fn.z+=1e-4,Fn.normalize(),tr.crossVectors(n,Fn)),tr.normalize(),vo.crossVectors(Fn,tr),i[0]=tr.x,i[4]=vo.x,i[8]=Fn.x,i[1]=tr.y,i[5]=vo.y,i[9]=Fn.y,i[2]=tr.z,i[6]=vo.z,i[10]=Fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],_=n[2],v=n[6],p=n[10],m=n[14],g=n[3],y=n[7],S=n[11],E=n[15],w=i[0],b=i[4],A=i[8],C=i[12],x=i[1],M=i[5],P=i[9],L=i[13],U=i[2],X=i[6],B=i[10],G=i[14],Y=i[3],re=i[7],k=i[11],oe=i[15];return s[0]=a*w+o*x+l*U+c*Y,s[4]=a*b+o*M+l*X+c*re,s[8]=a*A+o*P+l*B+c*k,s[12]=a*C+o*L+l*G+c*oe,s[1]=h*w+d*x+u*U+f*Y,s[5]=h*b+d*M+u*X+f*re,s[9]=h*A+d*P+u*B+f*k,s[13]=h*C+d*L+u*G+f*oe,s[2]=_*w+v*x+p*U+m*Y,s[6]=_*b+v*M+p*X+m*re,s[10]=_*A+v*P+p*B+m*k,s[14]=_*C+v*L+p*G+m*oe,s[3]=g*w+y*x+S*U+E*Y,s[7]=g*b+y*M+S*X+E*re,s[11]=g*A+y*P+S*B+E*k,s[15]=g*C+y*L+S*G+E*oe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],_=e[3],v=e[7],p=e[11],m=e[15];return _*(+s*l*d-i*c*d-s*o*u+n*c*u+i*o*f-n*l*f)+v*(+t*l*f-t*c*u+s*a*u-i*a*f+i*c*h-s*l*h)+p*(+t*c*d-t*o*f-s*a*d+n*a*f+s*o*h-n*c*h)+m*(-i*o*h-t*l*d+t*o*u+i*a*d-n*a*u+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],_=e[12],v=e[13],p=e[14],m=e[15],g=d*p*c-v*u*c+v*l*f-o*p*f-d*l*m+o*u*m,y=_*u*c-h*p*c-_*l*f+a*p*f+h*l*m-a*u*m,S=h*v*c-_*d*c+_*o*f-a*v*f-h*o*m+a*d*m,E=_*d*l-h*v*l-_*o*u+a*v*u+h*o*p-a*d*p,w=t*g+n*y+i*S+s*E;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/w;return e[0]=g*b,e[1]=(v*u*s-d*p*s-v*i*f+n*p*f+d*i*m-n*u*m)*b,e[2]=(o*p*s-v*l*s+v*i*c-n*p*c-o*i*m+n*l*m)*b,e[3]=(d*l*s-o*u*s-d*i*c+n*u*c+o*i*f-n*l*f)*b,e[4]=y*b,e[5]=(h*p*s-_*u*s+_*i*f-t*p*f-h*i*m+t*u*m)*b,e[6]=(_*l*s-a*p*s-_*i*c+t*p*c+a*i*m-t*l*m)*b,e[7]=(a*u*s-h*l*s+h*i*c-t*u*c-a*i*f+t*l*f)*b,e[8]=S*b,e[9]=(_*d*s-h*v*s-_*n*f+t*v*f+h*n*m-t*d*m)*b,e[10]=(a*v*s-_*o*s+_*n*c-t*v*c-a*n*m+t*o*m)*b,e[11]=(h*o*s-a*d*s-h*n*c+t*d*c+a*n*f-t*o*f)*b,e[12]=E*b,e[13]=(h*v*i-_*d*i+_*n*u-t*v*u-h*n*p+t*d*p)*b,e[14]=(_*o*i-a*v*i-_*n*l+t*v*l+a*n*p-t*o*p)*b,e[15]=(a*d*i-h*o*i+h*n*l-t*d*l-a*n*u+t*o*u)*b,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,d=o+o,u=s*c,f=s*h,_=s*d,v=a*h,p=a*d,m=o*d,g=l*c,y=l*h,S=l*d,E=n.x,w=n.y,b=n.z;return i[0]=(1-(v+m))*E,i[1]=(f+S)*E,i[2]=(_-y)*E,i[3]=0,i[4]=(f-S)*w,i[5]=(1-(u+m))*w,i[6]=(p+g)*w,i[7]=0,i[8]=(_+y)*b,i[9]=(p-g)*b,i[10]=(1-(u+v))*b,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=gs.set(i[0],i[1],i[2]).length();const a=gs.set(i[4],i[5],i[6]).length(),o=gs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],ui.copy(this);const c=1/s,h=1/a,d=1/o;return ui.elements[0]*=c,ui.elements[1]*=c,ui.elements[2]*=c,ui.elements[4]*=h,ui.elements[5]*=h,ui.elements[6]*=h,ui.elements[8]*=d,ui.elements[9]*=d,ui.elements[10]*=d,t.setFromRotationMatrix(ui),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=Wi){const l=this.elements,c=2*s/(t-e),h=2*s/(n-i),d=(t+e)/(t-e),u=(n+i)/(n-i);let f,_;if(o===Wi)f=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===_l)f=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=Wi){const l=this.elements,c=1/(t-e),h=1/(n-i),d=1/(a-s),u=(t+e)*c,f=(n+i)*h;let _,v;if(o===Wi)_=(a+s)*d,v=-2*d;else if(o===_l)_=s*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const gs=new z,ui=new It,Bv=new z(0,0,0),zv=new z(1,1,1),tr=new z,vo=new z,Fn=new z,Id=new It,Ud=new is;class Ki{constructor(e=0,t=0,n=0,i=Ki.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(yn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-yn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(yn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-yn(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(yn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-yn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Id.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Id,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ud.setFromEuler(this),this.setFromQuaternion(Ud,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ki.DEFAULT_ORDER="XYZ";class ym{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Hv=0;const Nd=new z,_s=new is,ki=new It,yo=new z,ua=new z,Gv=new z,Vv=new is,Od=new z(1,0,0),Fd=new z(0,1,0),Bd=new z(0,0,1),zd={type:"added"},Wv={type:"removed"},vs={type:"childadded",child:null},cc={type:"childremoved",child:null};class bn extends ss{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hv++}),this.uuid=Ka(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=bn.DEFAULT_UP.clone();const e=new z,t=new Ki,n=new is,i=new z(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new It},normalMatrix:{value:new Ze}}),this.matrix=new It,this.matrixWorld=new It,this.matrixAutoUpdate=bn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=bn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ym,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _s.setFromAxisAngle(e,t),this.quaternion.multiply(_s),this}rotateOnWorldAxis(e,t){return _s.setFromAxisAngle(e,t),this.quaternion.premultiply(_s),this}rotateX(e){return this.rotateOnAxis(Od,e)}rotateY(e){return this.rotateOnAxis(Fd,e)}rotateZ(e){return this.rotateOnAxis(Bd,e)}translateOnAxis(e,t){return Nd.copy(e).applyQuaternion(this.quaternion),this.position.add(Nd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Od,e)}translateY(e){return this.translateOnAxis(Fd,e)}translateZ(e){return this.translateOnAxis(Bd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ki.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?yo.copy(e):yo.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ua.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ki.lookAt(ua,yo,this.up):ki.lookAt(yo,ua,this.up),this.quaternion.setFromRotationMatrix(ki),i&&(ki.extractRotation(i.matrixWorld),_s.setFromRotationMatrix(ki),this.quaternion.premultiply(_s.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zd),vs.child=e,this.dispatchEvent(vs),vs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Wv),cc.child=e,this.dispatchEvent(cc),cc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ki.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ki.multiply(e.parent.matrixWorld)),e.applyMatrix4(ki),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zd),vs.child=e,this.dispatchEvent(vs),vs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ua,e,Gv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ua,Vv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),_.length>0&&(n.nodes=_)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}bn.DEFAULT_UP=new z(0,1,0);bn.DEFAULT_MATRIX_AUTO_UPDATE=!0;bn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const di=new z,Ii=new z,hc=new z,Ui=new z,ys=new z,xs=new z,Hd=new z,uc=new z,dc=new z,fc=new z,pc=new zt,mc=new zt,gc=new zt;class ii{constructor(e=new z,t=new z,n=new z){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),di.subVectors(e,t),i.cross(di);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){di.subVectors(i,t),Ii.subVectors(n,t),hc.subVectors(e,t);const a=di.dot(di),o=di.dot(Ii),l=di.dot(hc),c=Ii.dot(Ii),h=Ii.dot(hc),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const u=1/d,f=(c*l-o*h)*u,_=(a*h-o*l)*u;return s.set(1-f-_,_,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Ui)===null?!1:Ui.x>=0&&Ui.y>=0&&Ui.x+Ui.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,Ui)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ui.x),l.addScaledVector(a,Ui.y),l.addScaledVector(o,Ui.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return pc.setScalar(0),mc.setScalar(0),gc.setScalar(0),pc.fromBufferAttribute(e,t),mc.fromBufferAttribute(e,n),gc.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(pc,s.x),a.addScaledVector(mc,s.y),a.addScaledVector(gc,s.z),a}static isFrontFacing(e,t,n,i){return di.subVectors(n,t),Ii.subVectors(e,t),di.cross(Ii).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return di.subVectors(this.c,this.b),Ii.subVectors(this.a,this.b),di.cross(Ii).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ii.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ii.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return ii.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return ii.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ii.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;ys.subVectors(i,n),xs.subVectors(s,n),uc.subVectors(e,n);const l=ys.dot(uc),c=xs.dot(uc);if(l<=0&&c<=0)return t.copy(n);dc.subVectors(e,i);const h=ys.dot(dc),d=xs.dot(dc);if(h>=0&&d<=h)return t.copy(i);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(ys,a);fc.subVectors(e,s);const f=ys.dot(fc),_=xs.dot(fc);if(_>=0&&f<=_)return t.copy(s);const v=f*c-l*_;if(v<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(n).addScaledVector(xs,o);const p=h*_-f*d;if(p<=0&&d-h>=0&&f-_>=0)return Hd.subVectors(s,i),o=(d-h)/(d-h+(f-_)),t.copy(i).addScaledVector(Hd,o);const m=1/(p+v+u);return a=v*m,o=u*m,t.copy(n).addScaledVector(ys,a).addScaledVector(xs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const xm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},nr={h:0,s:0,l:0},xo={h:0,s:0,l:0};function _c(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class ht{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=bi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ft.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=ft.workingColorSpace){return this.r=e,this.g=t,this.b=n,ft.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=ft.workingColorSpace){if(e=Ev(e,1),t=yn(t,0,1),n=yn(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=_c(a,s,e+1/3),this.g=_c(a,s,e),this.b=_c(a,s,e-1/3)}return ft.toWorkingColorSpace(this,i),this}setStyle(e,t=bi){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=bi){const n=xm[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Gs(e.r),this.g=Gs(e.g),this.b=Gs(e.b),this}copyLinearToSRGB(e){return this.r=tc(e.r),this.g=tc(e.g),this.b=tc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bi){return ft.fromWorkingColorSpace(an.copy(this),e),Math.round(yn(an.r*255,0,255))*65536+Math.round(yn(an.g*255,0,255))*256+Math.round(yn(an.b*255,0,255))}getHexString(e=bi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ft.workingColorSpace){ft.fromWorkingColorSpace(an.copy(this),t);const n=an.r,i=an.g,s=an.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=ft.workingColorSpace){return ft.fromWorkingColorSpace(an.copy(this),t),e.r=an.r,e.g=an.g,e.b=an.b,e}getStyle(e=bi){ft.fromWorkingColorSpace(an.copy(this),e);const t=an.r,n=an.g,i=an.b;return e!==bi?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(nr),this.setHSL(nr.h+e,nr.s+t,nr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(nr),e.getHSL(xo);const n=Ql(nr.h,xo.h,t),i=Ql(nr.s,xo.s,t),s=Ql(nr.l,xo.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const an=new ht;ht.NAMES=xm;let Xv=0;class ta extends ss{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xv++}),this.uuid=Ka(),this.name="",this.type="Material",this.blending=zs,this.side=Mr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=th,this.blendDst=nh,this.blendEquation=Br,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ht(0,0,0),this.blendAlpha=0,this.depthFunc=Ks,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ad,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=us,this.stencilZFail=us,this.stencilZPass=us,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==zs&&(n.blending=this.blending),this.side!==Mr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==th&&(n.blendSrc=this.blendSrc),this.blendDst!==nh&&(n.blendDst=this.blendDst),this.blendEquation!==Br&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ks&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ad&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==us&&(n.stencilFail=this.stencilFail),this.stencilZFail!==us&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==us&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Pl extends ta{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ki,this.combine=im,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Gt=new z,bo=new Xe;class vi{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Rd,this.updateRanges=[],this.gpuType=Vi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)bo.fromBufferAttribute(this,t),bo.applyMatrix3(e),this.setXY(t,bo.x,bo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix3(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=oa(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Sn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=oa(t,this.array)),t}setX(e,t){return this.normalized&&(t=Sn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=oa(t,this.array)),t}setY(e,t){return this.normalized&&(t=Sn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=oa(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Sn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=oa(t,this.array)),t}setW(e,t){return this.normalized&&(t=Sn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Sn(t,this.array),n=Sn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Sn(t,this.array),n=Sn(n,this.array),i=Sn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Sn(t,this.array),n=Sn(n,this.array),i=Sn(i,this.array),s=Sn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Rd&&(e.usage=this.usage),e}}class bm extends vi{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Sm extends vi{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ut extends vi{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Yv=0;const Qn=new It,vc=new bn,bs=new z,Bn=new ja,da=new ja,Zt=new z;class dn extends ss{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yv++}),this.uuid=Ka(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(gm(e)?Sm:bm)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ze().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Qn.makeRotationFromQuaternion(e),this.applyMatrix4(Qn),this}rotateX(e){return Qn.makeRotationX(e),this.applyMatrix4(Qn),this}rotateY(e){return Qn.makeRotationY(e),this.applyMatrix4(Qn),this}rotateZ(e){return Qn.makeRotationZ(e),this.applyMatrix4(Qn),this}translate(e,t,n){return Qn.makeTranslation(e,t,n),this.applyMatrix4(Qn),this}scale(e,t,n){return Qn.makeScale(e,t,n),this.applyMatrix4(Qn),this}lookAt(e){return vc.lookAt(e),vc.updateMatrix(),this.applyMatrix4(vc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bs).negate(),this.translate(bs.x,bs.y,bs.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Ut(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ja);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Bn.setFromBufferAttribute(s),this.morphTargetsRelative?(Zt.addVectors(this.boundingBox.min,Bn.min),this.boundingBox.expandByPoint(Zt),Zt.addVectors(this.boundingBox.max,Bn.max),this.boundingBox.expandByPoint(Zt)):(this.boundingBox.expandByPoint(Bn.min),this.boundingBox.expandByPoint(Bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Za);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){const n=this.boundingSphere.center;if(Bn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];da.setFromBufferAttribute(o),this.morphTargetsRelative?(Zt.addVectors(Bn.min,da.min),Bn.expandByPoint(Zt),Zt.addVectors(Bn.max,da.max),Bn.expandByPoint(Zt)):(Bn.expandByPoint(da.min),Bn.expandByPoint(da.max))}Bn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Zt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Zt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Zt.fromBufferAttribute(o,c),l&&(bs.fromBufferAttribute(e,c),Zt.add(bs)),i=Math.max(i,n.distanceToSquared(Zt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new vi(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let A=0;A<n.count;A++)o[A]=new z,l[A]=new z;const c=new z,h=new z,d=new z,u=new Xe,f=new Xe,_=new Xe,v=new z,p=new z;function m(A,C,x){c.fromBufferAttribute(n,A),h.fromBufferAttribute(n,C),d.fromBufferAttribute(n,x),u.fromBufferAttribute(s,A),f.fromBufferAttribute(s,C),_.fromBufferAttribute(s,x),h.sub(c),d.sub(c),f.sub(u),_.sub(u);const M=1/(f.x*_.y-_.x*f.y);isFinite(M)&&(v.copy(h).multiplyScalar(_.y).addScaledVector(d,-f.y).multiplyScalar(M),p.copy(d).multiplyScalar(f.x).addScaledVector(h,-_.x).multiplyScalar(M),o[A].add(v),o[C].add(v),o[x].add(v),l[A].add(p),l[C].add(p),l[x].add(p))}let g=this.groups;g.length===0&&(g=[{start:0,count:e.count}]);for(let A=0,C=g.length;A<C;++A){const x=g[A],M=x.start,P=x.count;for(let L=M,U=M+P;L<U;L+=3)m(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const y=new z,S=new z,E=new z,w=new z;function b(A){E.fromBufferAttribute(i,A),w.copy(E);const C=o[A];y.copy(C),y.sub(E.multiplyScalar(E.dot(C))).normalize(),S.crossVectors(w,C);const M=S.dot(l[A])<0?-1:1;a.setXYZW(A,y.x,y.y,y.z,M)}for(let A=0,C=g.length;A<C;++A){const x=g[A],M=x.start,P=x.count;for(let L=M,U=M+P;L<U;L+=3)b(e.getX(L+0)),b(e.getX(L+1)),b(e.getX(L+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new vi(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new z,s=new z,a=new z,o=new z,l=new z,c=new z,h=new z,d=new z;if(e)for(let u=0,f=e.count;u<f;u+=3){const _=e.getX(u+0),v=e.getX(u+1),p=e.getX(u+2);i.fromBufferAttribute(t,_),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,p),h.subVectors(a,s),d.subVectors(i,s),h.cross(d),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)i.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),d.subVectors(i,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Zt.fromBufferAttribute(e,t),Zt.normalize(),e.setXYZ(t,Zt.x,Zt.y,Zt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,_=0;for(let v=0,p=l.length;v<p;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let m=0;m<h;m++)u[_++]=c[f++]}return new vi(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new dn,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],d=s[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Gd=new It,Dr=new Cl,So=new Za,Vd=new z,Mo=new z,wo=new z,To=new z,yc=new z,Eo=new z,Wd=new z,Ao=new z;class _i extends bn{constructor(e=new dn,t=new Pl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){Eo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],d=s[l];h!==0&&(yc.fromBufferAttribute(d,e),a?Eo.addScaledVector(yc,h):Eo.addScaledVector(yc.sub(t),h))}t.add(Eo)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),So.copy(n.boundingSphere),So.applyMatrix4(s),Dr.copy(e.ray).recast(e.near),!(So.containsPoint(Dr.origin)===!1&&(Dr.intersectSphere(So,Vd)===null||Dr.origin.distanceToSquared(Vd)>(e.far-e.near)**2))&&(Gd.copy(s).invert(),Dr.copy(e.ray).applyMatrix4(Gd),!(n.boundingBox!==null&&Dr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Dr)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,v=u.length;_<v;_++){const p=u[_],m=a[p.materialIndex],g=Math.max(p.start,f.start),y=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let S=g,E=y;S<E;S+=3){const w=o.getX(S),b=o.getX(S+1),A=o.getX(S+2);i=Ro(this,m,e,n,c,h,d,w,b,A),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const _=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let p=_,m=v;p<m;p+=3){const g=o.getX(p),y=o.getX(p+1),S=o.getX(p+2);i=Ro(this,a,e,n,c,h,d,g,y,S),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,v=u.length;_<v;_++){const p=u[_],m=a[p.materialIndex],g=Math.max(p.start,f.start),y=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let S=g,E=y;S<E;S+=3){const w=S,b=S+1,A=S+2;i=Ro(this,m,e,n,c,h,d,w,b,A),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const _=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let p=_,m=v;p<m;p+=3){const g=p,y=p+1,S=p+2;i=Ro(this,a,e,n,c,h,d,g,y,S),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function qv(r,e,t,n,i,s,a,o){let l;if(e.side===kn?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===Mr,o),l===null)return null;Ao.copy(o),Ao.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Ao);return c<t.near||c>t.far?null:{distance:c,point:Ao.clone(),object:r}}function Ro(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,Mo),r.getVertexPosition(l,wo),r.getVertexPosition(c,To);const h=qv(r,e,t,n,Mo,wo,To,Wd);if(h){const d=new z;ii.getBarycoord(Wd,Mo,wo,To,d),i&&(h.uv=ii.getInterpolatedAttribute(i,o,l,c,d,new Xe)),s&&(h.uv1=ii.getInterpolatedAttribute(s,o,l,c,d,new Xe)),a&&(h.normal=ii.getInterpolatedAttribute(a,o,l,c,d,new z),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new z,materialIndex:0};ii.getNormal(Mo,wo,To,u.normal),h.face=u,h.barycoord=d}return h}class na extends dn{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;_("z","y","x",-1,-1,n,t,e,a,s,0),_("z","y","x",1,-1,n,t,-e,a,s,1),_("x","z","y",1,1,e,n,t,i,a,2),_("x","z","y",1,-1,e,n,-t,i,a,3),_("x","y","z",1,-1,e,t,n,i,s,4),_("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ut(c,3)),this.setAttribute("normal",new Ut(h,3)),this.setAttribute("uv",new Ut(d,2));function _(v,p,m,g,y,S,E,w,b,A,C){const x=S/b,M=E/A,P=S/2,L=E/2,U=w/2,X=b+1,B=A+1;let G=0,Y=0;const re=new z;for(let k=0;k<B;k++){const oe=k*M-L;for(let Be=0;Be<X;Be++){const Ye=Be*x-P;re[v]=Ye*g,re[p]=oe*y,re[m]=U,c.push(re.x,re.y,re.z),re[v]=0,re[p]=0,re[m]=w>0?1:-1,h.push(re.x,re.y,re.z),d.push(Be/b),d.push(1-k/A),G+=1}}for(let k=0;k<A;k++)for(let oe=0;oe<b;oe++){const Be=u+oe+X*k,Ye=u+oe+X*(k+1),$=u+(oe+1)+X*(k+1),Q=u+(oe+1)+X*k;l.push(Be,Ye,Q),l.push(Ye,$,Q),Y+=6}o.addGroup(f,Y,C),f+=Y,u+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new na(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ea(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function mn(r){const e={};for(let t=0;t<r.length;t++){const n=ea(r[t]);for(const i in n)e[i]=n[i]}return e}function $v(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Mm(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ft.workingColorSpace}const Kv={clone:ea,merge:mn};var jv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wr extends ta{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jv,this.fragmentShader=Zv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ea(e.uniforms),this.uniformsGroups=$v(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class wm extends bn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new It,this.projectionMatrix=new It,this.projectionMatrixInverse=new It,this.coordinateSystem=Wi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ir=new z,Xd=new Xe,Yd=new Xe;class Wn extends wm{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=zh*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ia*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zh*2*Math.atan(Math.tan(Ia*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ir.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ir.x,ir.y).multiplyScalar(-e/ir.z),ir.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ir.x,ir.y).multiplyScalar(-e/ir.z)}getViewSize(e,t){return this.getViewBounds(e,Xd,Yd),t.subVectors(Yd,Xd)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ia*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ss=-90,Ms=1;class Jv extends bn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Wn(Ss,Ms,e,t);i.layers=this.layers,this.add(i);const s=new Wn(Ss,Ms,e,t);s.layers=this.layers,this.add(s);const a=new Wn(Ss,Ms,e,t);a.layers=this.layers,this.add(a);const o=new Wn(Ss,Ms,e,t);o.layers=this.layers,this.add(o);const l=new Wn(Ss,Ms,e,t);l.layers=this.layers,this.add(l);const c=new Wn(Ss,Ms,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Wi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===_l)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Tm extends In{constructor(e,t,n,i,s,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:js,super(e,t,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Qv extends ns{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Tm(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:pi}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new na(5,5,5),s=new wr({name:"CubemapFromEquirect",uniforms:ea(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:kn,blending:gr});s.uniforms.tEquirect.value=t;const a=new _i(i,s),o=t.minFilter;return t.minFilter===Wr&&(t.minFilter=pi),new Jv(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}const xc=new z,e0=new z,t0=new Ze;class sr{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=xc.subVectors(n,t).cross(e0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(xc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||t0.getNormalMatrix(e),i=this.coplanarPoint(xc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Lr=new Za,Co=new z;class Em{constructor(e=new sr,t=new sr,n=new sr,i=new sr,s=new sr,a=new sr){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Wi){const n=this.planes,i=e.elements,s=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],d=i[6],u=i[7],f=i[8],_=i[9],v=i[10],p=i[11],m=i[12],g=i[13],y=i[14],S=i[15];if(n[0].setComponents(l-s,u-c,p-f,S-m).normalize(),n[1].setComponents(l+s,u+c,p+f,S+m).normalize(),n[2].setComponents(l+a,u+h,p+_,S+g).normalize(),n[3].setComponents(l-a,u-h,p-_,S-g).normalize(),n[4].setComponents(l-o,u-d,p-v,S-y).normalize(),t===Wi)n[5].setComponents(l+o,u+d,p+v,S+y).normalize();else if(t===_l)n[5].setComponents(o,d,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Lr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Lr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Lr)}intersectsSprite(e){return Lr.center.set(0,0,0),Lr.radius=.7071067811865476,Lr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Lr)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Co.x=i.normal.x>0?e.max.x:e.min.x,Co.y=i.normal.y>0?e.max.y:e.min.y,Co.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Co)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Am(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function n0(r){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=r.createBuffer();r.bindBuffer(l,u),r.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(r.bindBuffer(c,o),d.length===0)r.bufferSubData(c,0,h);else{d.sort((f,_)=>f.start-_.start);let u=0;for(let f=1;f<d.length;f++){const _=d[u],v=d[f];v.start<=_.start+_.count+1?_.count=Math.max(_.count,v.start+v.count-_.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,_=d.length;f<_;f++){const v=d[f];r.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}class Dl extends dn{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,d=e/o,u=t/l,f=[],_=[],v=[],p=[];for(let m=0;m<h;m++){const g=m*u-a;for(let y=0;y<c;y++){const S=y*d-s;_.push(S,-g,0),v.push(0,0,1),p.push(y/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let g=0;g<o;g++){const y=g+c*m,S=g+c*(m+1),E=g+1+c*(m+1),w=g+1+c*m;f.push(y,S,w),f.push(S,E,w)}this.setIndex(f),this.setAttribute("position",new Ut(_,3)),this.setAttribute("normal",new Ut(v,3)),this.setAttribute("uv",new Ut(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dl(e.width,e.height,e.widthSegments,e.heightSegments)}}var i0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,r0=`#ifdef USE_ALPHAHASH
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
#endif`,s0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,a0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,o0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,l0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,c0=`#ifdef USE_AOMAP
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
#endif`,h0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,u0=`#ifdef USE_BATCHING
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
#endif`,d0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,f0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,p0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,m0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,g0=`#ifdef USE_IRIDESCENCE
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
#endif`,_0=`#ifdef USE_BUMPMAP
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
#endif`,v0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,y0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,x0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,b0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,S0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,M0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,w0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,T0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,E0=`#define PI 3.141592653589793
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
} // validated`,A0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,R0=`vec3 transformedNormal = objectNormal;
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
#endif`,C0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,P0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,D0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,L0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,k0="gl_FragColor = linearToOutputTexel( gl_FragColor );",I0=`
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
}`,U0=`#ifdef USE_ENVMAP
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
#endif`,N0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,O0=`#ifdef USE_ENVMAP
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
#endif`,F0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,B0=`#ifdef USE_ENVMAP
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
#endif`,z0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,H0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,G0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,V0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,W0=`#ifdef USE_GRADIENTMAP
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
}`,X0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Y0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,q0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$0=`uniform bool receiveShadow;
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
#endif`,K0=`#ifdef USE_ENVMAP
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
#endif`,j0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Z0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,J0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Q0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ey=`PhysicalMaterial material;
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
#endif`,ty=`struct PhysicalMaterial {
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
}`,ny=`
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
#endif`,iy=`#if defined( RE_IndirectDiffuse )
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
#endif`,ry=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sy=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ay=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,oy=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ly=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,uy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,dy=`#if defined( USE_POINTS_UV )
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
#endif`,fy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,py=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,my=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_y=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vy=`#ifdef USE_MORPHTARGETS
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
#endif`,yy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,by=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Sy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,My=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ty=`#ifdef USE_NORMALMAP
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
#endif`,Ey=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ay=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ry=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Py=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Dy=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ly=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ky=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Iy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Uy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ny=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Oy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,By=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Hy=`float getShadowMask() {
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
}`,Gy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vy=`#ifdef USE_SKINNING
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
#endif`,Wy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xy=`#ifdef USE_SKINNING
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
#endif`,Yy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$y=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ky=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,jy=`#ifdef USE_TRANSMISSION
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
#endif`,Zy=`#ifdef USE_TRANSMISSION
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
#endif`,Jy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ex=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const nx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ix=`uniform sampler2D t2D;
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
}`,rx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ax=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ox=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lx=`#include <common>
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
}`,cx=`#if DEPTH_PACKING == 3200
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
}`,hx=`#define DISTANCE
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
}`,ux=`#define DISTANCE
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
}`,dx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,px=`uniform float scale;
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
}`,mx=`uniform vec3 diffuse;
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
}`,gx=`#include <common>
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
}`,_x=`uniform vec3 diffuse;
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
}`,vx=`#define LAMBERT
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
}`,yx=`#define LAMBERT
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
}`,xx=`#define MATCAP
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
}`,bx=`#define MATCAP
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
}`,Sx=`#define NORMAL
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
}`,Mx=`#define NORMAL
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
}`,wx=`#define PHONG
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
}`,Tx=`#define PHONG
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
}`,Ex=`#define STANDARD
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
}`,Ax=`#define STANDARD
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
}`,Rx=`#define TOON
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
}`,Cx=`#define TOON
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
}`,Px=`uniform float size;
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
}`,Dx=`uniform vec3 diffuse;
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
}`,Lx=`#include <common>
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
}`,kx=`uniform vec3 color;
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
}`,Ix=`uniform float rotation;
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
}`,Ux=`uniform vec3 diffuse;
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
}`,je={alphahash_fragment:i0,alphahash_pars_fragment:r0,alphamap_fragment:s0,alphamap_pars_fragment:a0,alphatest_fragment:o0,alphatest_pars_fragment:l0,aomap_fragment:c0,aomap_pars_fragment:h0,batching_pars_vertex:u0,batching_vertex:d0,begin_vertex:f0,beginnormal_vertex:p0,bsdfs:m0,iridescence_fragment:g0,bumpmap_pars_fragment:_0,clipping_planes_fragment:v0,clipping_planes_pars_fragment:y0,clipping_planes_pars_vertex:x0,clipping_planes_vertex:b0,color_fragment:S0,color_pars_fragment:M0,color_pars_vertex:w0,color_vertex:T0,common:E0,cube_uv_reflection_fragment:A0,defaultnormal_vertex:R0,displacementmap_pars_vertex:C0,displacementmap_vertex:P0,emissivemap_fragment:D0,emissivemap_pars_fragment:L0,colorspace_fragment:k0,colorspace_pars_fragment:I0,envmap_fragment:U0,envmap_common_pars_fragment:N0,envmap_pars_fragment:O0,envmap_pars_vertex:F0,envmap_physical_pars_fragment:K0,envmap_vertex:B0,fog_vertex:z0,fog_pars_vertex:H0,fog_fragment:G0,fog_pars_fragment:V0,gradientmap_pars_fragment:W0,lightmap_pars_fragment:X0,lights_lambert_fragment:Y0,lights_lambert_pars_fragment:q0,lights_pars_begin:$0,lights_toon_fragment:j0,lights_toon_pars_fragment:Z0,lights_phong_fragment:J0,lights_phong_pars_fragment:Q0,lights_physical_fragment:ey,lights_physical_pars_fragment:ty,lights_fragment_begin:ny,lights_fragment_maps:iy,lights_fragment_end:ry,logdepthbuf_fragment:sy,logdepthbuf_pars_fragment:ay,logdepthbuf_pars_vertex:oy,logdepthbuf_vertex:ly,map_fragment:cy,map_pars_fragment:hy,map_particle_fragment:uy,map_particle_pars_fragment:dy,metalnessmap_fragment:fy,metalnessmap_pars_fragment:py,morphinstance_vertex:my,morphcolor_vertex:gy,morphnormal_vertex:_y,morphtarget_pars_vertex:vy,morphtarget_vertex:yy,normal_fragment_begin:xy,normal_fragment_maps:by,normal_pars_fragment:Sy,normal_pars_vertex:My,normal_vertex:wy,normalmap_pars_fragment:Ty,clearcoat_normal_fragment_begin:Ey,clearcoat_normal_fragment_maps:Ay,clearcoat_pars_fragment:Ry,iridescence_pars_fragment:Cy,opaque_fragment:Py,packing:Dy,premultiplied_alpha_fragment:Ly,project_vertex:ky,dithering_fragment:Iy,dithering_pars_fragment:Uy,roughnessmap_fragment:Ny,roughnessmap_pars_fragment:Oy,shadowmap_pars_fragment:Fy,shadowmap_pars_vertex:By,shadowmap_vertex:zy,shadowmask_pars_fragment:Hy,skinbase_vertex:Gy,skinning_pars_vertex:Vy,skinning_vertex:Wy,skinnormal_vertex:Xy,specularmap_fragment:Yy,specularmap_pars_fragment:qy,tonemapping_fragment:$y,tonemapping_pars_fragment:Ky,transmission_fragment:jy,transmission_pars_fragment:Zy,uv_pars_fragment:Jy,uv_pars_vertex:Qy,uv_vertex:ex,worldpos_vertex:tx,background_vert:nx,background_frag:ix,backgroundCube_vert:rx,backgroundCube_frag:sx,cube_vert:ax,cube_frag:ox,depth_vert:lx,depth_frag:cx,distanceRGBA_vert:hx,distanceRGBA_frag:ux,equirect_vert:dx,equirect_frag:fx,linedashed_vert:px,linedashed_frag:mx,meshbasic_vert:gx,meshbasic_frag:_x,meshlambert_vert:vx,meshlambert_frag:yx,meshmatcap_vert:xx,meshmatcap_frag:bx,meshnormal_vert:Sx,meshnormal_frag:Mx,meshphong_vert:wx,meshphong_frag:Tx,meshphysical_vert:Ex,meshphysical_frag:Ax,meshtoon_vert:Rx,meshtoon_frag:Cx,points_vert:Px,points_frag:Dx,shadow_vert:Lx,shadow_frag:kx,sprite_vert:Ix,sprite_frag:Ux},me={common:{diffuse:{value:new ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new Xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new ht(16777215)},opacity:{value:1},center:{value:new Xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},Si={basic:{uniforms:mn([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:mn([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new ht(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:mn([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new ht(0)},specular:{value:new ht(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:mn([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:mn([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new ht(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:mn([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:mn([me.points,me.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:mn([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:mn([me.common,me.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:mn([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:mn([me.sprite,me.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:mn([me.common,me.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:mn([me.lights,me.fog,{color:{value:new ht(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};Si.physical={uniforms:mn([Si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new Xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new Xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new ht(0)},specularColor:{value:new ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new Xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const Po={r:0,b:0,g:0},kr=new Ki,Nx=new It;function Ox(r,e,t,n,i,s,a){const o=new ht(0);let l=s===!0?0:1,c,h,d=null,u=0,f=null;function _(g){let y=g.isScene===!0?g.background:null;return y&&y.isTexture&&(y=(g.backgroundBlurriness>0?t:e).get(y)),y}function v(g){let y=!1;const S=_(g);S===null?m(o,l):S&&S.isColor&&(m(S,1),y=!0);const E=r.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function p(g,y){const S=_(y);S&&(S.isCubeTexture||S.mapping===Al)?(h===void 0&&(h=new _i(new na(1,1,1),new wr({name:"BackgroundCubeMaterial",uniforms:ea(Si.backgroundCube.uniforms),vertexShader:Si.backgroundCube.vertexShader,fragmentShader:Si.backgroundCube.fragmentShader,side:kn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,w,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),kr.copy(y.backgroundRotation),kr.x*=-1,kr.y*=-1,kr.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(kr.y*=-1,kr.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Nx.makeRotationFromEuler(kr)),h.material.toneMapped=ft.getTransfer(S.colorSpace)!==Tt,(d!==S||u!==S.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,d=S,u=S.version,f=r.toneMapping),h.layers.enableAll(),g.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new _i(new Dl(2,2),new wr({name:"BackgroundMaterial",uniforms:ea(Si.background.uniforms),vertexShader:Si.background.vertexShader,fragmentShader:Si.background.fragmentShader,side:Mr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=ft.getTransfer(S.colorSpace)!==Tt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||u!==S.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,d=S,u=S.version,f=r.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null))}function m(g,y){g.getRGB(Po,Mm(r)),n.buffers.color.setClear(Po.r,Po.g,Po.b,y,a)}return{getClearColor:function(){return o},setClearColor:function(g,y=1){o.set(g),l=y,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(g){l=g,m(o,l)},render:v,addToRenderList:p}}function Fx(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=u(null);let s=i,a=!1;function o(x,M,P,L,U){let X=!1;const B=d(L,P,M);s!==B&&(s=B,c(s.object)),X=f(x,L,P,U),X&&_(x,L,P,U),U!==null&&e.update(U,r.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,S(x,M,P,L),U!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return r.createVertexArray()}function c(x){return r.bindVertexArray(x)}function h(x){return r.deleteVertexArray(x)}function d(x,M,P){const L=P.wireframe===!0;let U=n[x.id];U===void 0&&(U={},n[x.id]=U);let X=U[M.id];X===void 0&&(X={},U[M.id]=X);let B=X[L];return B===void 0&&(B=u(l()),X[L]=B),B}function u(x){const M=[],P=[],L=[];for(let U=0;U<t;U++)M[U]=0,P[U]=0,L[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:M,enabledAttributes:P,attributeDivisors:L,object:x,attributes:{},index:null}}function f(x,M,P,L){const U=s.attributes,X=M.attributes;let B=0;const G=P.getAttributes();for(const Y in G)if(G[Y].location>=0){const k=U[Y];let oe=X[Y];if(oe===void 0&&(Y==="instanceMatrix"&&x.instanceMatrix&&(oe=x.instanceMatrix),Y==="instanceColor"&&x.instanceColor&&(oe=x.instanceColor)),k===void 0||k.attribute!==oe||oe&&k.data!==oe.data)return!0;B++}return s.attributesNum!==B||s.index!==L}function _(x,M,P,L){const U={},X=M.attributes;let B=0;const G=P.getAttributes();for(const Y in G)if(G[Y].location>=0){let k=X[Y];k===void 0&&(Y==="instanceMatrix"&&x.instanceMatrix&&(k=x.instanceMatrix),Y==="instanceColor"&&x.instanceColor&&(k=x.instanceColor));const oe={};oe.attribute=k,k&&k.data&&(oe.data=k.data),U[Y]=oe,B++}s.attributes=U,s.attributesNum=B,s.index=L}function v(){const x=s.newAttributes;for(let M=0,P=x.length;M<P;M++)x[M]=0}function p(x){m(x,0)}function m(x,M){const P=s.newAttributes,L=s.enabledAttributes,U=s.attributeDivisors;P[x]=1,L[x]===0&&(r.enableVertexAttribArray(x),L[x]=1),U[x]!==M&&(r.vertexAttribDivisor(x,M),U[x]=M)}function g(){const x=s.newAttributes,M=s.enabledAttributes;for(let P=0,L=M.length;P<L;P++)M[P]!==x[P]&&(r.disableVertexAttribArray(P),M[P]=0)}function y(x,M,P,L,U,X,B){B===!0?r.vertexAttribIPointer(x,M,P,U,X):r.vertexAttribPointer(x,M,P,L,U,X)}function S(x,M,P,L){v();const U=L.attributes,X=P.getAttributes(),B=M.defaultAttributeValues;for(const G in X){const Y=X[G];if(Y.location>=0){let re=U[G];if(re===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(re=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(re=x.instanceColor)),re!==void 0){const k=re.normalized,oe=re.itemSize,Be=e.get(re);if(Be===void 0)continue;const Ye=Be.buffer,$=Be.type,Q=Be.bytesPerElement,de=$===r.INT||$===r.UNSIGNED_INT||re.gpuType===xu;if(re.isInterleavedBufferAttribute){const ae=re.data,Ee=ae.stride,Se=re.offset;if(ae.isInstancedInterleavedBuffer){for(let We=0;We<Y.locationSize;We++)m(Y.location+We,ae.meshPerAttribute);x.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let We=0;We<Y.locationSize;We++)p(Y.location+We);r.bindBuffer(r.ARRAY_BUFFER,Ye);for(let We=0;We<Y.locationSize;We++)y(Y.location+We,oe/Y.locationSize,$,k,Ee*Q,(Se+oe/Y.locationSize*We)*Q,de)}else{if(re.isInstancedBufferAttribute){for(let ae=0;ae<Y.locationSize;ae++)m(Y.location+ae,re.meshPerAttribute);x.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ae=0;ae<Y.locationSize;ae++)p(Y.location+ae);r.bindBuffer(r.ARRAY_BUFFER,Ye);for(let ae=0;ae<Y.locationSize;ae++)y(Y.location+ae,oe/Y.locationSize,$,k,oe*Q,oe/Y.locationSize*ae*Q,de)}}else if(B!==void 0){const k=B[G];if(k!==void 0)switch(k.length){case 2:r.vertexAttrib2fv(Y.location,k);break;case 3:r.vertexAttrib3fv(Y.location,k);break;case 4:r.vertexAttrib4fv(Y.location,k);break;default:r.vertexAttrib1fv(Y.location,k)}}}}g()}function E(){A();for(const x in n){const M=n[x];for(const P in M){const L=M[P];for(const U in L)h(L[U].object),delete L[U];delete M[P]}delete n[x]}}function w(x){if(n[x.id]===void 0)return;const M=n[x.id];for(const P in M){const L=M[P];for(const U in L)h(L[U].object),delete L[U];delete M[P]}delete n[x.id]}function b(x){for(const M in n){const P=n[M];if(P[x.id]===void 0)continue;const L=P[x.id];for(const U in L)h(L[U].object),delete L[U];delete P[x.id]}}function A(){C(),a=!0,s!==i&&(s=i,c(s.object))}function C(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:A,resetDefaultState:C,dispose:E,releaseStatesOfGeometry:w,releaseStatesOfProgram:b,initAttributes:v,enableAttribute:p,disableUnusedAttributes:g}}function Bx(r,e,t){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,d){d!==0&&(r.drawArraysInstanced(n,c,h,d),t.update(h,n,d))}function o(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let _=0;_<d;_++)f+=h[_];t.update(f,n,1)}function l(c,h,d,u){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<c.length;_++)a(c[_],h[_],u[_]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let _=0;for(let v=0;v<d;v++)_+=h[v];for(let v=0;v<u.length;v++)t.update(_,n,u[v])}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function zx(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const b=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(b){return!(b!==gi&&n.convert(b)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(b){const A=b===$a&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(b!==$i&&n.convert(b)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==Vi&&!A)}function l(b){if(b==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,u=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(u===!0){const b=e.get("EXT_clip_control");b.clipControlEXT(b.LOWER_LEFT_EXT,b.ZERO_TO_ONE_EXT)}const f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=r.getParameter(r.MAX_TEXTURE_SIZE),p=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),g=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),y=r.getParameter(r.MAX_VARYING_VECTORS),S=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),E=_>0,w=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:_,maxTextureSize:v,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:g,maxVaryings:y,maxFragmentUniforms:S,vertexTextures:E,maxSamples:w}}function Hx(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new sr,o=new Ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const _=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,m=r.get(d);if(!i||_===null||_.length===0||s&&!p)s?h(null):c();else{const g=s?0:n,y=g*4;let S=m.clippingState||null;l.value=S,S=h(_,u,y,f);for(let E=0;E!==y;++E)S[E]=t[E];m.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=g}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,_){const v=d!==null?d.length:0;let p=null;if(v!==0){if(p=l.value,_!==!0||p===null){const m=f+v*4,g=u.matrixWorldInverse;o.getNormalMatrix(g),(p===null||p.length<m)&&(p=new Float32Array(m));for(let y=0,S=f;y!==v;++y,S+=4)a.copy(d[y]).applyMatrix4(g,o),a.normal.toArray(p,S),p[S+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}function Gx(r){let e=new WeakMap;function t(a,o){return o===hh?a.mapping=js:o===uh&&(a.mapping=Zs),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===hh||o===uh)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Qv(l.height);return c.fromEquirectangularTexture(r,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Vx extends wm{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ds=4,qd=[.125,.215,.35,.446,.526,.582],zr=20,bc=new Vx,$d=new ht;let Sc=null,Mc=0,wc=0,Tc=!1;const Fr=(1+Math.sqrt(5))/2,ws=1/Fr,Kd=[new z(-Fr,ws,0),new z(Fr,ws,0),new z(-ws,0,Fr),new z(ws,0,Fr),new z(0,Fr,-ws),new z(0,Fr,ws),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)];class jd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Sc=this._renderer.getRenderTarget(),Mc=this._renderer.getActiveCubeFace(),wc=this._renderer.getActiveMipmapLevel(),Tc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Jd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Sc,Mc,wc),this._renderer.xr.enabled=Tc,e.scissorTest=!1,Do(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===js||e.mapping===Zs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Sc=this._renderer.getRenderTarget(),Mc=this._renderer.getActiveCubeFace(),wc=this._renderer.getActiveMipmapLevel(),Tc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:pi,minFilter:pi,generateMipmaps:!1,type:$a,format:gi,colorSpace:Er,depthBuffer:!1},i=Zd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zd(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Wx(s)),this._blurMaterial=Xx(s,e,t)}return i}_compileMaterial(e){const t=new _i(this._lodPlanes[0],e);this._renderer.compile(t,bc)}_sceneToCubeUV(e,t,n,i){const o=new Wn(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor($d),h.toneMapping=_r,h.autoClear=!1;const f=new Pl({name:"PMREM.Background",side:kn,depthWrite:!1,depthTest:!1}),_=new _i(new na,f);let v=!1;const p=e.background;p?p.isColor&&(f.color.copy(p),e.background=null,v=!0):(f.color.copy($d),v=!0);for(let m=0;m<6;m++){const g=m%3;g===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):g===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));const y=this._cubeSize;Do(i,g*y,m>2?y:0,y,y),h.setRenderTarget(i),v&&h.render(_,o),h.render(e,o)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=u,h.autoClear=d,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===js||e.mapping===Zs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Jd());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new _i(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Do(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,bc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Kd[(i-s-1)%Kd.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new _i(this._lodPlanes[i],c),u=c.uniforms,f=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*zr-1),v=s/_,p=isFinite(s)?1+Math.floor(h*v):zr;p>zr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${zr}`);const m=[];let g=0;for(let b=0;b<zr;++b){const A=b/v,C=Math.exp(-A*A/2);m.push(C),b===0?g+=C:b<p&&(g+=2*C)}for(let b=0;b<m.length;b++)m[b]=m[b]/g;u.envMap.value=e.texture,u.samples.value=p,u.weights.value=m,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:y}=this;u.dTheta.value=_,u.mipInt.value=y-n;const S=this._sizeLods[i],E=3*S*(i>y-Ds?i-y+Ds:0),w=4*(this._cubeSize-S);Do(t,E,w,3*S,2*S),l.setRenderTarget(t),l.render(d,bc)}}function Wx(r){const e=[],t=[],n=[];let i=r;const s=r-Ds+1+qd.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);t.push(o);let l=1/o;a>r-Ds?l=qd[a-r+Ds-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,_=6,v=3,p=2,m=1,g=new Float32Array(v*_*f),y=new Float32Array(p*_*f),S=new Float32Array(m*_*f);for(let w=0;w<f;w++){const b=w%3*2/3-1,A=w>2?0:-1,C=[b,A,0,b+2/3,A,0,b+2/3,A+1,0,b,A,0,b+2/3,A+1,0,b,A+1,0];g.set(C,v*_*w),y.set(u,p*_*w);const x=[w,w,w,w,w,w];S.set(x,m*_*w)}const E=new dn;E.setAttribute("position",new vi(g,v)),E.setAttribute("uv",new vi(y,p)),E.setAttribute("faceIndex",new vi(S,m)),e.push(E),i>Ds&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Zd(r,e,t){const n=new ns(r,e,t);return n.texture.mapping=Al,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Do(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Xx(r,e,t){const n=new Float32Array(zr),i=new z(0,1,0);return new wr({name:"SphericalGaussianBlur",defines:{n:zr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Au(),fragmentShader:`

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
		`,blending:gr,depthTest:!1,depthWrite:!1})}function Jd(){return new wr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Au(),fragmentShader:`

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
		`,blending:gr,depthTest:!1,depthWrite:!1})}function Qd(){return new wr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Au(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gr,depthTest:!1,depthWrite:!1})}function Au(){return`

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
	`}function Yx(r){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===hh||l===uh,h=l===js||l===Zs;if(c||h){let d=e.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new jd(r)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new jd(r)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function qx(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&tl("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function $x(r,e,t,n){const i={},s=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const _ in u.attributes)e.remove(u.attributes[_]);for(const _ in u.morphAttributes){const v=u.morphAttributes[_];for(let p=0,m=v.length;p<m;p++)e.remove(v[p])}u.removeEventListener("dispose",a),delete i[u.id];const f=s.get(u);f&&(e.remove(f),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const _ in u)e.update(u[_],r.ARRAY_BUFFER);const f=d.morphAttributes;for(const _ in f){const v=f[_];for(let p=0,m=v.length;p<m;p++)e.update(v[p],r.ARRAY_BUFFER)}}function c(d){const u=[],f=d.index,_=d.attributes.position;let v=0;if(f!==null){const g=f.array;v=f.version;for(let y=0,S=g.length;y<S;y+=3){const E=g[y+0],w=g[y+1],b=g[y+2];u.push(E,w,w,b,b,E)}}else if(_!==void 0){const g=_.array;v=_.version;for(let y=0,S=g.length/3-1;y<S;y+=3){const E=y+0,w=y+1,b=y+2;u.push(E,w,w,b,b,E)}}else return;const p=new(gm(u)?Sm:bm)(u,1);p.version=v;const m=s.get(d);m&&e.remove(m),s.set(d,p)}function h(d){const u=s.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Kx(r,e,t){let n;function i(u){n=u}let s,a;function o(u){s=u.type,a=u.bytesPerElement}function l(u,f){r.drawElements(n,f,s,u*a),t.update(f,n,1)}function c(u,f,_){_!==0&&(r.drawElementsInstanced(n,f,s,u*a,_),t.update(f,n,_))}function h(u,f,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,u,0,_);let p=0;for(let m=0;m<_;m++)p+=f[m];t.update(p,n,1)}function d(u,f,_,v){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<u.length;m++)c(u[m]/a,f[m],v[m]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,s,u,0,v,0,_);let m=0;for(let g=0;g<_;g++)m+=f[g];for(let g=0;g<v.length;g++)t.update(m,n,v[g])}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function jx(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Zx(r,e,t){const n=new WeakMap,i=new zt;function s(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let x=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",x)};var f=x;u!==void 0&&u.texture.dispose();const _=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let S=0;_===!0&&(S=1),v===!0&&(S=2),p===!0&&(S=3);let E=o.attributes.position.count*S,w=1;E>e.maxTextureSize&&(w=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const b=new Float32Array(E*w*4*d),A=new vm(b,E,w,d);A.type=Vi,A.needsUpdate=!0;const C=S*4;for(let M=0;M<d;M++){const P=m[M],L=g[M],U=y[M],X=E*w*4*M;for(let B=0;B<P.count;B++){const G=B*C;_===!0&&(i.fromBufferAttribute(P,B),b[X+G+0]=i.x,b[X+G+1]=i.y,b[X+G+2]=i.z,b[X+G+3]=0),v===!0&&(i.fromBufferAttribute(L,B),b[X+G+4]=i.x,b[X+G+5]=i.y,b[X+G+6]=i.z,b[X+G+7]=0),p===!0&&(i.fromBufferAttribute(U,B),b[X+G+8]=i.x,b[X+G+9]=i.y,b[X+G+10]=i.z,b[X+G+11]=U.itemSize===4?i.w:1)}}u={count:d,texture:A,size:new Xe(E,w)},n.set(o,u),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let _=0;for(let p=0;p<c.length;p++)_+=c[p];const v=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",v),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}return{update:s}}function Jx(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,d=e.get(l,h);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return d}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class Rm extends In{constructor(e,t,n,i,s,a,o,l,c,h=Hs){if(h!==Hs&&h!==Qs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Hs&&(n=ts),n===void 0&&h===Qs&&(n=Js),super(null,i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:ai,this.minFilter=l!==void 0?l:ai,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Cm=new In,ef=new Rm(1,1),Pm=new vm,Dm=new Ov,Lm=new Tm,tf=[],nf=[],rf=new Float32Array(16),sf=new Float32Array(9),af=new Float32Array(4);function ia(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=tf[i];if(s===void 0&&(s=new Float32Array(i),tf[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function $t(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Kt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Ll(r,e){let t=nf[e];t===void 0&&(t=new Int32Array(e),nf[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Qx(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function eb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;r.uniform2fv(this.addr,e),Kt(t,e)}}function tb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if($t(t,e))return;r.uniform3fv(this.addr,e),Kt(t,e)}}function nb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;r.uniform4fv(this.addr,e),Kt(t,e)}}function ib(r,e){const t=this.cache,n=e.elements;if(n===void 0){if($t(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Kt(t,e)}else{if($t(t,n))return;af.set(n),r.uniformMatrix2fv(this.addr,!1,af),Kt(t,n)}}function rb(r,e){const t=this.cache,n=e.elements;if(n===void 0){if($t(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Kt(t,e)}else{if($t(t,n))return;sf.set(n),r.uniformMatrix3fv(this.addr,!1,sf),Kt(t,n)}}function sb(r,e){const t=this.cache,n=e.elements;if(n===void 0){if($t(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Kt(t,e)}else{if($t(t,n))return;rf.set(n),r.uniformMatrix4fv(this.addr,!1,rf),Kt(t,n)}}function ab(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function ob(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;r.uniform2iv(this.addr,e),Kt(t,e)}}function lb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if($t(t,e))return;r.uniform3iv(this.addr,e),Kt(t,e)}}function cb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;r.uniform4iv(this.addr,e),Kt(t,e)}}function hb(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function ub(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;r.uniform2uiv(this.addr,e),Kt(t,e)}}function db(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if($t(t,e))return;r.uniform3uiv(this.addr,e),Kt(t,e)}}function fb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;r.uniform4uiv(this.addr,e),Kt(t,e)}}function pb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(ef.compareFunction=mm,s=ef):s=Cm,t.setTexture2D(e||s,i)}function mb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Dm,i)}function gb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Lm,i)}function _b(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Pm,i)}function vb(r){switch(r){case 5126:return Qx;case 35664:return eb;case 35665:return tb;case 35666:return nb;case 35674:return ib;case 35675:return rb;case 35676:return sb;case 5124:case 35670:return ab;case 35667:case 35671:return ob;case 35668:case 35672:return lb;case 35669:case 35673:return cb;case 5125:return hb;case 36294:return ub;case 36295:return db;case 36296:return fb;case 35678:case 36198:case 36298:case 36306:case 35682:return pb;case 35679:case 36299:case 36307:return mb;case 35680:case 36300:case 36308:case 36293:return gb;case 36289:case 36303:case 36311:case 36292:return _b}}function yb(r,e){r.uniform1fv(this.addr,e)}function xb(r,e){const t=ia(e,this.size,2);r.uniform2fv(this.addr,t)}function bb(r,e){const t=ia(e,this.size,3);r.uniform3fv(this.addr,t)}function Sb(r,e){const t=ia(e,this.size,4);r.uniform4fv(this.addr,t)}function Mb(r,e){const t=ia(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function wb(r,e){const t=ia(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Tb(r,e){const t=ia(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Eb(r,e){r.uniform1iv(this.addr,e)}function Ab(r,e){r.uniform2iv(this.addr,e)}function Rb(r,e){r.uniform3iv(this.addr,e)}function Cb(r,e){r.uniform4iv(this.addr,e)}function Pb(r,e){r.uniform1uiv(this.addr,e)}function Db(r,e){r.uniform2uiv(this.addr,e)}function Lb(r,e){r.uniform3uiv(this.addr,e)}function kb(r,e){r.uniform4uiv(this.addr,e)}function Ib(r,e,t){const n=this.cache,i=e.length,s=Ll(t,i);$t(n,s)||(r.uniform1iv(this.addr,s),Kt(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Cm,s[a])}function Ub(r,e,t){const n=this.cache,i=e.length,s=Ll(t,i);$t(n,s)||(r.uniform1iv(this.addr,s),Kt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Dm,s[a])}function Nb(r,e,t){const n=this.cache,i=e.length,s=Ll(t,i);$t(n,s)||(r.uniform1iv(this.addr,s),Kt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Lm,s[a])}function Ob(r,e,t){const n=this.cache,i=e.length,s=Ll(t,i);$t(n,s)||(r.uniform1iv(this.addr,s),Kt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Pm,s[a])}function Fb(r){switch(r){case 5126:return yb;case 35664:return xb;case 35665:return bb;case 35666:return Sb;case 35674:return Mb;case 35675:return wb;case 35676:return Tb;case 5124:case 35670:return Eb;case 35667:case 35671:return Ab;case 35668:case 35672:return Rb;case 35669:case 35673:return Cb;case 5125:return Pb;case 36294:return Db;case 36295:return Lb;case 36296:return kb;case 35678:case 36198:case 36298:case 36306:case 35682:return Ib;case 35679:case 36299:case 36307:return Ub;case 35680:case 36300:case 36308:case 36293:return Nb;case 36289:case 36303:case 36311:case 36292:return Ob}}class Bb{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=vb(t.type)}}class zb{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Fb(t.type)}}class Hb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const Ec=/(\w+)(\])?(\[|\.)?/g;function of(r,e){r.seq.push(e),r.map[e.id]=e}function Gb(r,e,t){const n=r.name,i=n.length;for(Ec.lastIndex=0;;){const s=Ec.exec(n),a=Ec.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){of(t,c===void 0?new Bb(o,r,e):new zb(o,r,e));break}else{let d=t.map[o];d===void 0&&(d=new Hb(o),of(t,d)),t=d}}}class nl{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),a=e.getUniformLocation(t,s.name);Gb(s,a,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function lf(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const Vb=37297;let Wb=0;function Xb(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Yb(r){const e=ft.getPrimaries(ft.workingColorSpace),t=ft.getPrimaries(r);let n;switch(e===t?n="":e===gl&&t===ml?n="LinearDisplayP3ToLinearSRGB":e===ml&&t===gl&&(n="LinearSRGBToLinearDisplayP3"),r){case Er:case Rl:return[n,"LinearTransferOETF"];case bi:case Eu:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function cf(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+Xb(r.getShaderSource(e),a)}else return i}function qb(r,e){const t=Yb(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function $b(r,e){let t;switch(e){case ov:t="Linear";break;case lv:t="Reinhard";break;case cv:t="Cineon";break;case hv:t="ACESFilmic";break;case dv:t="AgX";break;case fv:t="Neutral";break;case uv:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Lo=new z;function Kb(){ft.getLuminanceCoefficients(Lo);const r=Lo.x.toFixed(4),e=Lo.y.toFixed(4),t=Lo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jb(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ba).join(`
`)}function Zb(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Jb(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function ba(r){return r!==""}function hf(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function uf(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Qb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Hh(r){return r.replace(Qb,tS)}const eS=new Map;function tS(r,e){let t=je[e];if(t===void 0){const n=eS.get(e);if(n!==void 0)t=je[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Hh(t)}const nS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function df(r){return r.replace(nS,iS)}function iS(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function ff(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function rS(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===nm?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===z_?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Ni&&(e="SHADOWMAP_TYPE_VSM"),e}function sS(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case js:case Zs:e="ENVMAP_TYPE_CUBE";break;case Al:e="ENVMAP_TYPE_CUBE_UV";break}return e}function aS(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Zs:e="ENVMAP_MODE_REFRACTION";break}return e}function oS(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case im:e="ENVMAP_BLENDING_MULTIPLY";break;case sv:e="ENVMAP_BLENDING_MIX";break;case av:e="ENVMAP_BLENDING_ADD";break}return e}function lS(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function cS(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=rS(t),c=sS(t),h=aS(t),d=oS(t),u=lS(t),f=jb(t),_=Zb(s),v=i.createProgram();let p,m,g=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ba).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ba).join(`
`),m.length>0&&(m+=`
`)):(p=[ff(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ba).join(`
`),m=[ff(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==_r?"#define TONE_MAPPING":"",t.toneMapping!==_r?je.tonemapping_pars_fragment:"",t.toneMapping!==_r?$b("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,qb("linearToOutputTexel",t.outputColorSpace),Kb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ba).join(`
`)),a=Hh(a),a=hf(a,t),a=uf(a,t),o=Hh(o),o=hf(o,t),o=uf(o,t),a=df(a),o=df(o),t.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Cd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Cd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const y=g+p+a,S=g+m+o,E=lf(i,i.VERTEX_SHADER,y),w=lf(i,i.FRAGMENT_SHADER,S);i.attachShader(v,E),i.attachShader(v,w),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function b(M){if(r.debug.checkShaderErrors){const P=i.getProgramInfoLog(v).trim(),L=i.getShaderInfoLog(E).trim(),U=i.getShaderInfoLog(w).trim();let X=!0,B=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(X=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,v,E,w);else{const G=cf(i,E,"vertex"),Y=cf(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+M.name+`
Material Type: `+M.type+`

Program Info Log: `+P+`
`+G+`
`+Y)}else P!==""?console.warn("THREE.WebGLProgram: Program Info Log:",P):(L===""||U==="")&&(B=!1);B&&(M.diagnostics={runnable:X,programLog:P,vertexShader:{log:L,prefix:p},fragmentShader:{log:U,prefix:m}})}i.deleteShader(E),i.deleteShader(w),A=new nl(i,v),C=Jb(i,v)}let A;this.getUniforms=function(){return A===void 0&&b(this),A};let C;this.getAttributes=function(){return C===void 0&&b(this),C};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=i.getProgramParameter(v,Vb)),x},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Wb++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=E,this.fragmentShader=w,this}let hS=0;class uS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new dS(e),t.set(e,n)),n}}class dS{constructor(e){this.id=hS++,this.code=e,this.usedTimes=0}}function fS(r,e,t,n,i,s,a){const o=new ym,l=new uS,c=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.reverseDepthBuffer,f=i.vertexTextures;let _=i.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return c.add(x),x===0?"uv":`uv${x}`}function m(x,M,P,L,U){const X=L.fog,B=U.geometry,G=x.isMeshStandardMaterial?L.environment:null,Y=(x.isMeshStandardMaterial?t:e).get(x.envMap||G),re=Y&&Y.mapping===Al?Y.image.height:null,k=v[x.type];x.precision!==null&&(_=i.getMaxPrecision(x.precision),_!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",_,"instead."));const oe=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Be=oe!==void 0?oe.length:0;let Ye=0;B.morphAttributes.position!==void 0&&(Ye=1),B.morphAttributes.normal!==void 0&&(Ye=2),B.morphAttributes.color!==void 0&&(Ye=3);let $,Q,de,ae;if(k){const Re=Si[k];$=Re.vertexShader,Q=Re.fragmentShader}else $=x.vertexShader,Q=x.fragmentShader,l.update(x),de=l.getVertexShaderID(x),ae=l.getFragmentShaderID(x);const Ee=r.getRenderTarget(),Se=U.isInstancedMesh===!0,We=U.isBatchedMesh===!0,Ve=!!x.map,Ue=!!x.matcap,I=!!Y,st=!!x.aoMap,Ne=!!x.lightMap,ze=!!x.bumpMap,H=!!x.normalMap,Je=!!x.displacementMap,De=!!x.emissiveMap,D=!!x.metalnessMap,T=!!x.roughnessMap,q=x.anisotropy>0,Z=x.clearcoat>0,te=x.dispersion>0,j=x.iridescence>0,xe=x.sheen>0,ie=x.transmission>0,fe=q&&!!x.anisotropyMap,Ge=Z&&!!x.clearcoatMap,ne=Z&&!!x.clearcoatNormalMap,ve=Z&&!!x.clearcoatRoughnessMap,ye=j&&!!x.iridescenceMap,ke=j&&!!x.iridescenceThicknessMap,_e=xe&&!!x.sheenColorMap,qe=xe&&!!x.sheenRoughnessMap,Oe=!!x.specularMap,at=!!x.specularColorMap,N=!!x.specularIntensityMap,ee=ie&&!!x.transmissionMap,K=ie&&!!x.thicknessMap,J=!!x.gradientMap,le=!!x.alphaMap,ce=x.alphaTest>0,$e=!!x.alphaHash,vt=!!x.extensions;let Et=_r;x.toneMapped&&(Ee===null||Ee.isXRRenderTarget===!0)&&(Et=r.toneMapping);const it={shaderID:k,shaderType:x.type,shaderName:x.name,vertexShader:$,fragmentShader:Q,defines:x.defines,customVertexShaderID:de,customFragmentShaderID:ae,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:_,batching:We,batchingColor:We&&U._colorsTexture!==null,instancing:Se,instancingColor:Se&&U.instanceColor!==null,instancingMorph:Se&&U.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Ee===null?r.outputColorSpace:Ee.isXRRenderTarget===!0?Ee.texture.colorSpace:Er,alphaToCoverage:!!x.alphaToCoverage,map:Ve,matcap:Ue,envMap:I,envMapMode:I&&Y.mapping,envMapCubeUVHeight:re,aoMap:st,lightMap:Ne,bumpMap:ze,normalMap:H,displacementMap:f&&Je,emissiveMap:De,normalMapObjectSpace:H&&x.normalMapType===vv,normalMapTangentSpace:H&&x.normalMapType===_v,metalnessMap:D,roughnessMap:T,anisotropy:q,anisotropyMap:fe,clearcoat:Z,clearcoatMap:Ge,clearcoatNormalMap:ne,clearcoatRoughnessMap:ve,dispersion:te,iridescence:j,iridescenceMap:ye,iridescenceThicknessMap:ke,sheen:xe,sheenColorMap:_e,sheenRoughnessMap:qe,specularMap:Oe,specularColorMap:at,specularIntensityMap:N,transmission:ie,transmissionMap:ee,thicknessMap:K,gradientMap:J,opaque:x.transparent===!1&&x.blending===zs&&x.alphaToCoverage===!1,alphaMap:le,alphaTest:ce,alphaHash:$e,combine:x.combine,mapUv:Ve&&p(x.map.channel),aoMapUv:st&&p(x.aoMap.channel),lightMapUv:Ne&&p(x.lightMap.channel),bumpMapUv:ze&&p(x.bumpMap.channel),normalMapUv:H&&p(x.normalMap.channel),displacementMapUv:Je&&p(x.displacementMap.channel),emissiveMapUv:De&&p(x.emissiveMap.channel),metalnessMapUv:D&&p(x.metalnessMap.channel),roughnessMapUv:T&&p(x.roughnessMap.channel),anisotropyMapUv:fe&&p(x.anisotropyMap.channel),clearcoatMapUv:Ge&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:ne&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:ke&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:qe&&p(x.sheenRoughnessMap.channel),specularMapUv:Oe&&p(x.specularMap.channel),specularColorMapUv:at&&p(x.specularColorMap.channel),specularIntensityMapUv:N&&p(x.specularIntensityMap.channel),transmissionMapUv:ee&&p(x.transmissionMap.channel),thicknessMapUv:K&&p(x.thicknessMap.channel),alphaMapUv:le&&p(x.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(H||q),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!B.attributes.uv&&(Ve||le),fog:!!X,useFog:x.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:u,skinning:U.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Be,morphTextureStride:Ye,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:Et,decodeVideoTexture:Ve&&x.map.isVideoTexture===!0&&ft.getTransfer(x.map.colorSpace)===Tt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Hi,flipSided:x.side===kn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:vt&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(vt&&x.extensions.multiDraw===!0||We)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return it.vertexUv1s=c.has(1),it.vertexUv2s=c.has(2),it.vertexUv3s=c.has(3),c.clear(),it}function g(x){const M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(const P in x.defines)M.push(P),M.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(y(M,x),S(M,x),M.push(r.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function y(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapCubeUVHeight),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.morphAttributeCount),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function S(x,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),x.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.alphaToCoverage&&o.enable(20),x.push(o.mask)}function E(x){const M=v[x.type];let P;if(M){const L=Si[M];P=Kv.clone(L.uniforms)}else P=x.uniforms;return P}function w(x,M){let P;for(let L=0,U=h.length;L<U;L++){const X=h[L];if(X.cacheKey===M){P=X,++P.usedTimes;break}}return P===void 0&&(P=new cS(r,M,x,s),h.push(P)),P}function b(x){if(--x.usedTimes===0){const M=h.indexOf(x);h[M]=h[h.length-1],h.pop(),x.destroy()}}function A(x){l.remove(x)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:g,getUniforms:E,acquireProgram:w,releaseProgram:b,releaseShaderCache:A,programs:h,dispose:C}}function pS(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function mS(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function pf(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function mf(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(d,u,f,_,v,p){let m=r[e];return m===void 0?(m={id:d.id,object:d,geometry:u,material:f,groupOrder:_,renderOrder:d.renderOrder,z:v,group:p},r[e]=m):(m.id=d.id,m.object=d,m.geometry=u,m.material=f,m.groupOrder=_,m.renderOrder=d.renderOrder,m.z=v,m.group=p),e++,m}function o(d,u,f,_,v,p){const m=a(d,u,f,_,v,p);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):t.push(m)}function l(d,u,f,_,v,p){const m=a(d,u,f,_,v,p);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):t.unshift(m)}function c(d,u){t.length>1&&t.sort(d||mS),n.length>1&&n.sort(u||pf),i.length>1&&i.sort(u||pf)}function h(){for(let d=e,u=r.length;d<u;d++){const f=r[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:h,sort:c}}function gS(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new mf,r.set(n,[a])):i>=s.length?(a=new mf,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function _S(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new z,color:new ht};break;case"SpotLight":t={position:new z,direction:new z,color:new ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new ht,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new ht,groundColor:new ht};break;case"RectAreaLight":t={color:new ht,position:new z,halfWidth:new z,halfHeight:new z};break}return r[e.id]=t,t}}}function vS(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let yS=0;function xS(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function bS(r){const e=new _S,t=vS(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new z);const i=new z,s=new It,a=new It;function o(c){let h=0,d=0,u=0;for(let C=0;C<9;C++)n.probe[C].set(0,0,0);let f=0,_=0,v=0,p=0,m=0,g=0,y=0,S=0,E=0,w=0,b=0;c.sort(xS);for(let C=0,x=c.length;C<x;C++){const M=c[C],P=M.color,L=M.intensity,U=M.distance,X=M.shadow&&M.shadow.map?M.shadow.map.texture:null;if(M.isAmbientLight)h+=P.r*L,d+=P.g*L,u+=P.b*L;else if(M.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(M.sh.coefficients[B],L);b++}else if(M.isDirectionalLight){const B=e.get(M);if(B.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){const G=M.shadow,Y=t.get(M);Y.shadowIntensity=G.intensity,Y.shadowBias=G.bias,Y.shadowNormalBias=G.normalBias,Y.shadowRadius=G.radius,Y.shadowMapSize=G.mapSize,n.directionalShadow[f]=Y,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=M.shadow.matrix,g++}n.directional[f]=B,f++}else if(M.isSpotLight){const B=e.get(M);B.position.setFromMatrixPosition(M.matrixWorld),B.color.copy(P).multiplyScalar(L),B.distance=U,B.coneCos=Math.cos(M.angle),B.penumbraCos=Math.cos(M.angle*(1-M.penumbra)),B.decay=M.decay,n.spot[v]=B;const G=M.shadow;if(M.map&&(n.spotLightMap[E]=M.map,E++,G.updateMatrices(M),M.castShadow&&w++),n.spotLightMatrix[v]=G.matrix,M.castShadow){const Y=t.get(M);Y.shadowIntensity=G.intensity,Y.shadowBias=G.bias,Y.shadowNormalBias=G.normalBias,Y.shadowRadius=G.radius,Y.shadowMapSize=G.mapSize,n.spotShadow[v]=Y,n.spotShadowMap[v]=X,S++}v++}else if(M.isRectAreaLight){const B=e.get(M);B.color.copy(P).multiplyScalar(L),B.halfWidth.set(M.width*.5,0,0),B.halfHeight.set(0,M.height*.5,0),n.rectArea[p]=B,p++}else if(M.isPointLight){const B=e.get(M);if(B.color.copy(M.color).multiplyScalar(M.intensity),B.distance=M.distance,B.decay=M.decay,M.castShadow){const G=M.shadow,Y=t.get(M);Y.shadowIntensity=G.intensity,Y.shadowBias=G.bias,Y.shadowNormalBias=G.normalBias,Y.shadowRadius=G.radius,Y.shadowMapSize=G.mapSize,Y.shadowCameraNear=G.camera.near,Y.shadowCameraFar=G.camera.far,n.pointShadow[_]=Y,n.pointShadowMap[_]=X,n.pointShadowMatrix[_]=M.shadow.matrix,y++}n.point[_]=B,_++}else if(M.isHemisphereLight){const B=e.get(M);B.skyColor.copy(M.color).multiplyScalar(L),B.groundColor.copy(M.groundColor).multiplyScalar(L),n.hemi[m]=B,m++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const A=n.hash;(A.directionalLength!==f||A.pointLength!==_||A.spotLength!==v||A.rectAreaLength!==p||A.hemiLength!==m||A.numDirectionalShadows!==g||A.numPointShadows!==y||A.numSpotShadows!==S||A.numSpotMaps!==E||A.numLightProbes!==b)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=p,n.point.length=_,n.hemi.length=m,n.directionalShadow.length=g,n.directionalShadowMap.length=g,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=g,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=S+E-w,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=b,A.directionalLength=f,A.pointLength=_,A.spotLength=v,A.rectAreaLength=p,A.hemiLength=m,A.numDirectionalShadows=g,A.numPointShadows=y,A.numSpotShadows=S,A.numSpotMaps=E,A.numLightProbes=b,n.version=yS++)}function l(c,h){let d=0,u=0,f=0,_=0,v=0;const p=h.matrixWorldInverse;for(let m=0,g=c.length;m<g;m++){const y=c[m];if(y.isDirectionalLight){const S=n.directional[d];S.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(p),d++}else if(y.isSpotLight){const S=n.spot[f];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(p),f++}else if(y.isRectAreaLight){const S=n.rectArea[_];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(p),a.identity(),s.copy(y.matrixWorld),s.premultiply(p),a.extractRotation(s),S.halfWidth.set(y.width*.5,0,0),S.halfHeight.set(0,y.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),_++}else if(y.isPointLight){const S=n.point[u];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(p),u++}else if(y.isHemisphereLight){const S=n.hemi[v];S.direction.setFromMatrixPosition(y.matrixWorld),S.direction.transformDirection(p),v++}}}return{setup:o,setupView:l,state:n}}function gf(r){const e=new bS(r),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function SS(r){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new gf(r),e.set(i,[o])):s>=a.length?(o=new gf(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class MS extends ta{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=mv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class wS extends ta{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const TS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ES=`uniform sampler2D shadow_pass;
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
}`;function AS(r,e,t){let n=new Em;const i=new Xe,s=new Xe,a=new zt,o=new MS({depthPacking:gv}),l=new wS,c={},h=t.maxTextureSize,d={[Mr]:kn,[kn]:Mr,[Hi]:Hi},u=new wr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xe},radius:{value:4}},vertexShader:TS,fragmentShader:ES}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const _=new dn;_.setAttribute("position",new vi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new _i(_,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nm;let m=this.type;this.render=function(w,b,A){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const C=r.getRenderTarget(),x=r.getActiveCubeFace(),M=r.getActiveMipmapLevel(),P=r.state;P.setBlending(gr),P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const L=m!==Ni&&this.type===Ni,U=m===Ni&&this.type!==Ni;for(let X=0,B=w.length;X<B;X++){const G=w[X],Y=G.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;i.copy(Y.mapSize);const re=Y.getFrameExtents();if(i.multiply(re),s.copy(Y.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/re.x),i.x=s.x*re.x,Y.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/re.y),i.y=s.y*re.y,Y.mapSize.y=s.y)),Y.map===null||L===!0||U===!0){const oe=this.type!==Ni?{minFilter:ai,magFilter:ai}:{};Y.map!==null&&Y.map.dispose(),Y.map=new ns(i.x,i.y,oe),Y.map.texture.name=G.name+".shadowMap",Y.camera.updateProjectionMatrix()}r.setRenderTarget(Y.map),r.clear();const k=Y.getViewportCount();for(let oe=0;oe<k;oe++){const Be=Y.getViewport(oe);a.set(s.x*Be.x,s.y*Be.y,s.x*Be.z,s.y*Be.w),P.viewport(a),Y.updateMatrices(G,oe),n=Y.getFrustum(),S(b,A,Y.camera,G,this.type)}Y.isPointLightShadow!==!0&&this.type===Ni&&g(Y,A),Y.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(C,x,M)};function g(w,b){const A=e.update(v);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ns(i.x,i.y)),u.uniforms.shadow_pass.value=w.map.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(b,null,A,u,v,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(b,null,A,f,v,null)}function y(w,b,A,C){let x=null;const M=A.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(M!==void 0)x=M;else if(x=A.isPointLight===!0?l:o,r.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const P=x.uuid,L=b.uuid;let U=c[P];U===void 0&&(U={},c[P]=U);let X=U[L];X===void 0&&(X=x.clone(),U[L]=X,b.addEventListener("dispose",E)),x=X}if(x.visible=b.visible,x.wireframe=b.wireframe,C===Ni?x.side=b.shadowSide!==null?b.shadowSide:b.side:x.side=b.shadowSide!==null?b.shadowSide:d[b.side],x.alphaMap=b.alphaMap,x.alphaTest=b.alphaTest,x.map=b.map,x.clipShadows=b.clipShadows,x.clippingPlanes=b.clippingPlanes,x.clipIntersection=b.clipIntersection,x.displacementMap=b.displacementMap,x.displacementScale=b.displacementScale,x.displacementBias=b.displacementBias,x.wireframeLinewidth=b.wireframeLinewidth,x.linewidth=b.linewidth,A.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const P=r.properties.get(x);P.light=A}return x}function S(w,b,A,C,x){if(w.visible===!1)return;if(w.layers.test(b.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&x===Ni)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,w.matrixWorld);const L=e.update(w),U=w.material;if(Array.isArray(U)){const X=L.groups;for(let B=0,G=X.length;B<G;B++){const Y=X[B],re=U[Y.materialIndex];if(re&&re.visible){const k=y(w,re,C,x);w.onBeforeShadow(r,w,b,A,L,k,Y),r.renderBufferDirect(A,null,L,k,w,Y),w.onAfterShadow(r,w,b,A,L,k,Y)}}}else if(U.visible){const X=y(w,U,C,x);w.onBeforeShadow(r,w,b,A,L,X,null),r.renderBufferDirect(A,null,L,X,w,null),w.onAfterShadow(r,w,b,A,L,X,null)}}const P=w.children;for(let L=0,U=P.length;L<U;L++)S(P[L],b,A,C,x)}function E(w){w.target.removeEventListener("dispose",E);for(const A in c){const C=c[A],x=w.target.uuid;x in C&&(C[x].dispose(),delete C[x])}}}const RS={[ih]:rh,[sh]:lh,[ah]:ch,[Ks]:oh,[rh]:ih,[lh]:sh,[ch]:ah,[oh]:Ks};function CS(r){function e(){let N=!1;const ee=new zt;let K=null;const J=new zt(0,0,0,0);return{setMask:function(le){K!==le&&!N&&(r.colorMask(le,le,le,le),K=le)},setLocked:function(le){N=le},setClear:function(le,ce,$e,vt,Et){Et===!0&&(le*=vt,ce*=vt,$e*=vt),ee.set(le,ce,$e,vt),J.equals(ee)===!1&&(r.clearColor(le,ce,$e,vt),J.copy(ee))},reset:function(){N=!1,K=null,J.set(-1,0,0,0)}}}function t(){let N=!1,ee=!1,K=null,J=null,le=null;return{setReversed:function(ce){ee=ce},setTest:function(ce){ce?de(r.DEPTH_TEST):ae(r.DEPTH_TEST)},setMask:function(ce){K!==ce&&!N&&(r.depthMask(ce),K=ce)},setFunc:function(ce){if(ee&&(ce=RS[ce]),J!==ce){switch(ce){case ih:r.depthFunc(r.NEVER);break;case rh:r.depthFunc(r.ALWAYS);break;case sh:r.depthFunc(r.LESS);break;case Ks:r.depthFunc(r.LEQUAL);break;case ah:r.depthFunc(r.EQUAL);break;case oh:r.depthFunc(r.GEQUAL);break;case lh:r.depthFunc(r.GREATER);break;case ch:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}J=ce}},setLocked:function(ce){N=ce},setClear:function(ce){le!==ce&&(r.clearDepth(ce),le=ce)},reset:function(){N=!1,K=null,J=null,le=null}}}function n(){let N=!1,ee=null,K=null,J=null,le=null,ce=null,$e=null,vt=null,Et=null;return{setTest:function(it){N||(it?de(r.STENCIL_TEST):ae(r.STENCIL_TEST))},setMask:function(it){ee!==it&&!N&&(r.stencilMask(it),ee=it)},setFunc:function(it,Re,Me){(K!==it||J!==Re||le!==Me)&&(r.stencilFunc(it,Re,Me),K=it,J=Re,le=Me)},setOp:function(it,Re,Me){(ce!==it||$e!==Re||vt!==Me)&&(r.stencilOp(it,Re,Me),ce=it,$e=Re,vt=Me)},setLocked:function(it){N=it},setClear:function(it){Et!==it&&(r.clearStencil(it),Et=it)},reset:function(){N=!1,ee=null,K=null,J=null,le=null,ce=null,$e=null,vt=null,Et=null}}}const i=new e,s=new t,a=new n,o=new WeakMap,l=new WeakMap;let c={},h={},d=new WeakMap,u=[],f=null,_=!1,v=null,p=null,m=null,g=null,y=null,S=null,E=null,w=new ht(0,0,0),b=0,A=!1,C=null,x=null,M=null,P=null,L=null;const U=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,B=0;const G=r.getParameter(r.VERSION);G.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(G)[1]),X=B>=1):G.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),X=B>=2);let Y=null,re={};const k=r.getParameter(r.SCISSOR_BOX),oe=r.getParameter(r.VIEWPORT),Be=new zt().fromArray(k),Ye=new zt().fromArray(oe);function $(N,ee,K,J){const le=new Uint8Array(4),ce=r.createTexture();r.bindTexture(N,ce),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let $e=0;$e<K;$e++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(ee,0,r.RGBA,1,1,J,0,r.RGBA,r.UNSIGNED_BYTE,le):r.texImage2D(ee+$e,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,le);return ce}const Q={};Q[r.TEXTURE_2D]=$(r.TEXTURE_2D,r.TEXTURE_2D,1),Q[r.TEXTURE_CUBE_MAP]=$(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[r.TEXTURE_2D_ARRAY]=$(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Q[r.TEXTURE_3D]=$(r.TEXTURE_3D,r.TEXTURE_3D,1,1),i.setClear(0,0,0,1),s.setClear(1),a.setClear(0),de(r.DEPTH_TEST),s.setFunc(Ks),Ne(!1),ze(Md),de(r.CULL_FACE),I(gr);function de(N){c[N]!==!0&&(r.enable(N),c[N]=!0)}function ae(N){c[N]!==!1&&(r.disable(N),c[N]=!1)}function Ee(N,ee){return h[N]!==ee?(r.bindFramebuffer(N,ee),h[N]=ee,N===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=ee),N===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=ee),!0):!1}function Se(N,ee){let K=u,J=!1;if(N){K=d.get(ee),K===void 0&&(K=[],d.set(ee,K));const le=N.textures;if(K.length!==le.length||K[0]!==r.COLOR_ATTACHMENT0){for(let ce=0,$e=le.length;ce<$e;ce++)K[ce]=r.COLOR_ATTACHMENT0+ce;K.length=le.length,J=!0}}else K[0]!==r.BACK&&(K[0]=r.BACK,J=!0);J&&r.drawBuffers(K)}function We(N){return f!==N?(r.useProgram(N),f=N,!0):!1}const Ve={[Br]:r.FUNC_ADD,[G_]:r.FUNC_SUBTRACT,[V_]:r.FUNC_REVERSE_SUBTRACT};Ve[W_]=r.MIN,Ve[X_]=r.MAX;const Ue={[Y_]:r.ZERO,[q_]:r.ONE,[$_]:r.SRC_COLOR,[th]:r.SRC_ALPHA,[ev]:r.SRC_ALPHA_SATURATE,[J_]:r.DST_COLOR,[j_]:r.DST_ALPHA,[K_]:r.ONE_MINUS_SRC_COLOR,[nh]:r.ONE_MINUS_SRC_ALPHA,[Q_]:r.ONE_MINUS_DST_COLOR,[Z_]:r.ONE_MINUS_DST_ALPHA,[tv]:r.CONSTANT_COLOR,[nv]:r.ONE_MINUS_CONSTANT_COLOR,[iv]:r.CONSTANT_ALPHA,[rv]:r.ONE_MINUS_CONSTANT_ALPHA};function I(N,ee,K,J,le,ce,$e,vt,Et,it){if(N===gr){_===!0&&(ae(r.BLEND),_=!1);return}if(_===!1&&(de(r.BLEND),_=!0),N!==H_){if(N!==v||it!==A){if((p!==Br||y!==Br)&&(r.blendEquation(r.FUNC_ADD),p=Br,y=Br),it)switch(N){case zs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case wd:r.blendFunc(r.ONE,r.ONE);break;case Td:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ed:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case zs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case wd:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Td:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ed:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}m=null,g=null,S=null,E=null,w.set(0,0,0),b=0,v=N,A=it}return}le=le||ee,ce=ce||K,$e=$e||J,(ee!==p||le!==y)&&(r.blendEquationSeparate(Ve[ee],Ve[le]),p=ee,y=le),(K!==m||J!==g||ce!==S||$e!==E)&&(r.blendFuncSeparate(Ue[K],Ue[J],Ue[ce],Ue[$e]),m=K,g=J,S=ce,E=$e),(vt.equals(w)===!1||Et!==b)&&(r.blendColor(vt.r,vt.g,vt.b,Et),w.copy(vt),b=Et),v=N,A=!1}function st(N,ee){N.side===Hi?ae(r.CULL_FACE):de(r.CULL_FACE);let K=N.side===kn;ee&&(K=!K),Ne(K),N.blending===zs&&N.transparent===!1?I(gr):I(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),s.setFunc(N.depthFunc),s.setTest(N.depthTest),s.setMask(N.depthWrite),i.setMask(N.colorWrite);const J=N.stencilWrite;a.setTest(J),J&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Je(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?de(r.SAMPLE_ALPHA_TO_COVERAGE):ae(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(N){C!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),C=N)}function ze(N){N!==F_?(de(r.CULL_FACE),N!==x&&(N===Md?r.cullFace(r.BACK):N===B_?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ae(r.CULL_FACE),x=N}function H(N){N!==M&&(X&&r.lineWidth(N),M=N)}function Je(N,ee,K){N?(de(r.POLYGON_OFFSET_FILL),(P!==ee||L!==K)&&(r.polygonOffset(ee,K),P=ee,L=K)):ae(r.POLYGON_OFFSET_FILL)}function De(N){N?de(r.SCISSOR_TEST):ae(r.SCISSOR_TEST)}function D(N){N===void 0&&(N=r.TEXTURE0+U-1),Y!==N&&(r.activeTexture(N),Y=N)}function T(N,ee,K){K===void 0&&(Y===null?K=r.TEXTURE0+U-1:K=Y);let J=re[K];J===void 0&&(J={type:void 0,texture:void 0},re[K]=J),(J.type!==N||J.texture!==ee)&&(Y!==K&&(r.activeTexture(K),Y=K),r.bindTexture(N,ee||Q[N]),J.type=N,J.texture=ee)}function q(){const N=re[Y];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Z(){try{r.compressedTexImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{r.compressedTexImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function j(){try{r.texSubImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function xe(){try{r.texSubImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ie(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function fe(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ge(){try{r.texStorage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ne(){try{r.texStorage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ve(){try{r.texImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ye(){try{r.texImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ke(N){Be.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),Be.copy(N))}function _e(N){Ye.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),Ye.copy(N))}function qe(N,ee){let K=l.get(ee);K===void 0&&(K=new WeakMap,l.set(ee,K));let J=K.get(N);J===void 0&&(J=r.getUniformBlockIndex(ee,N.name),K.set(N,J))}function Oe(N,ee){const J=l.get(ee).get(N);o.get(ee)!==J&&(r.uniformBlockBinding(ee,J,N.__bindingPointIndex),o.set(ee,J))}function at(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),c={},Y=null,re={},h={},d=new WeakMap,u=[],f=null,_=!1,v=null,p=null,m=null,g=null,y=null,S=null,E=null,w=new ht(0,0,0),b=0,A=!1,C=null,x=null,M=null,P=null,L=null,Be.set(0,0,r.canvas.width,r.canvas.height),Ye.set(0,0,r.canvas.width,r.canvas.height),i.reset(),s.reset(),a.reset()}return{buffers:{color:i,depth:s,stencil:a},enable:de,disable:ae,bindFramebuffer:Ee,drawBuffers:Se,useProgram:We,setBlending:I,setMaterial:st,setFlipSided:Ne,setCullFace:ze,setLineWidth:H,setPolygonOffset:Je,setScissorTest:De,activeTexture:D,bindTexture:T,unbindTexture:q,compressedTexImage2D:Z,compressedTexImage3D:te,texImage2D:ve,texImage3D:ye,updateUBOMapping:qe,uniformBlockBinding:Oe,texStorage2D:Ge,texStorage3D:ne,texSubImage2D:j,texSubImage3D:xe,compressedTexSubImage2D:ie,compressedTexSubImage3D:fe,scissor:ke,viewport:_e,reset:at}}function _f(r,e,t,n){const i=PS(n);switch(t){case lm:return r*e;case hm:return r*e;case um:return r*e*2;case dm:return r*e/i.components*i.byteLength;case Mu:return r*e/i.components*i.byteLength;case fm:return r*e*2/i.components*i.byteLength;case wu:return r*e*2/i.components*i.byteLength;case cm:return r*e*3/i.components*i.byteLength;case gi:return r*e*4/i.components*i.byteLength;case Tu:return r*e*4/i.components*i.byteLength;case jo:case Zo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Jo:case Qo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case mh:case _h:return Math.max(r,16)*Math.max(e,8)/4;case ph:case gh:return Math.max(r,8)*Math.max(e,8)/2;case vh:case yh:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case xh:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case bh:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Sh:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Mh:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case wh:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Th:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Eh:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Ah:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Rh:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Ch:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Ph:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Dh:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Lh:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case kh:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Ih:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case el:case Uh:case Nh:return Math.ceil(r/4)*Math.ceil(e/4)*16;case pm:case Oh:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Fh:case Bh:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function PS(r){switch(r){case $i:case sm:return{byteLength:1,components:1};case Xa:case am:case $a:return{byteLength:2,components:1};case bu:case Su:return{byteLength:2,components:4};case ts:case xu:case Vi:return{byteLength:4,components:1};case om:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function DS(r,e,t,n,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Xe,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(D,T){return f?new OffscreenCanvas(D,T):vl("canvas")}function v(D,T,q){let Z=1;const te=De(D);if((te.width>q||te.height>q)&&(Z=q/Math.max(te.width,te.height)),Z<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const j=Math.floor(Z*te.width),xe=Math.floor(Z*te.height);d===void 0&&(d=_(j,xe));const ie=T?_(j,xe):d;return ie.width=j,ie.height=xe,ie.getContext("2d").drawImage(D,0,0,j,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+j+"x"+xe+")."),ie}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),D;return D}function p(D){return D.generateMipmaps&&D.minFilter!==ai&&D.minFilter!==pi}function m(D){r.generateMipmap(D)}function g(D,T,q,Z,te=!1){if(D!==null){if(r[D]!==void 0)return r[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let j=T;if(T===r.RED&&(q===r.FLOAT&&(j=r.R32F),q===r.HALF_FLOAT&&(j=r.R16F),q===r.UNSIGNED_BYTE&&(j=r.R8)),T===r.RED_INTEGER&&(q===r.UNSIGNED_BYTE&&(j=r.R8UI),q===r.UNSIGNED_SHORT&&(j=r.R16UI),q===r.UNSIGNED_INT&&(j=r.R32UI),q===r.BYTE&&(j=r.R8I),q===r.SHORT&&(j=r.R16I),q===r.INT&&(j=r.R32I)),T===r.RG&&(q===r.FLOAT&&(j=r.RG32F),q===r.HALF_FLOAT&&(j=r.RG16F),q===r.UNSIGNED_BYTE&&(j=r.RG8)),T===r.RG_INTEGER&&(q===r.UNSIGNED_BYTE&&(j=r.RG8UI),q===r.UNSIGNED_SHORT&&(j=r.RG16UI),q===r.UNSIGNED_INT&&(j=r.RG32UI),q===r.BYTE&&(j=r.RG8I),q===r.SHORT&&(j=r.RG16I),q===r.INT&&(j=r.RG32I)),T===r.RGB_INTEGER&&(q===r.UNSIGNED_BYTE&&(j=r.RGB8UI),q===r.UNSIGNED_SHORT&&(j=r.RGB16UI),q===r.UNSIGNED_INT&&(j=r.RGB32UI),q===r.BYTE&&(j=r.RGB8I),q===r.SHORT&&(j=r.RGB16I),q===r.INT&&(j=r.RGB32I)),T===r.RGBA_INTEGER&&(q===r.UNSIGNED_BYTE&&(j=r.RGBA8UI),q===r.UNSIGNED_SHORT&&(j=r.RGBA16UI),q===r.UNSIGNED_INT&&(j=r.RGBA32UI),q===r.BYTE&&(j=r.RGBA8I),q===r.SHORT&&(j=r.RGBA16I),q===r.INT&&(j=r.RGBA32I)),T===r.RGB&&q===r.UNSIGNED_INT_5_9_9_9_REV&&(j=r.RGB9_E5),T===r.RGBA){const xe=te?pl:ft.getTransfer(Z);q===r.FLOAT&&(j=r.RGBA32F),q===r.HALF_FLOAT&&(j=r.RGBA16F),q===r.UNSIGNED_BYTE&&(j=xe===Tt?r.SRGB8_ALPHA8:r.RGBA8),q===r.UNSIGNED_SHORT_4_4_4_4&&(j=r.RGBA4),q===r.UNSIGNED_SHORT_5_5_5_1&&(j=r.RGB5_A1)}return(j===r.R16F||j===r.R32F||j===r.RG16F||j===r.RG32F||j===r.RGBA16F||j===r.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function y(D,T){let q;return D?T===null||T===ts||T===Js?q=r.DEPTH24_STENCIL8:T===Vi?q=r.DEPTH32F_STENCIL8:T===Xa&&(q=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===ts||T===Js?q=r.DEPTH_COMPONENT24:T===Vi?q=r.DEPTH_COMPONENT32F:T===Xa&&(q=r.DEPTH_COMPONENT16),q}function S(D,T){return p(D)===!0||D.isFramebufferTexture&&D.minFilter!==ai&&D.minFilter!==pi?Math.log2(Math.max(T.width,T.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?T.mipmaps.length:1}function E(D){const T=D.target;T.removeEventListener("dispose",E),b(T),T.isVideoTexture&&h.delete(T)}function w(D){const T=D.target;T.removeEventListener("dispose",w),C(T)}function b(D){const T=n.get(D);if(T.__webglInit===void 0)return;const q=D.source,Z=u.get(q);if(Z){const te=Z[T.__cacheKey];te.usedTimes--,te.usedTimes===0&&A(D),Object.keys(Z).length===0&&u.delete(q)}n.remove(D)}function A(D){const T=n.get(D);r.deleteTexture(T.__webglTexture);const q=D.source,Z=u.get(q);delete Z[T.__cacheKey],a.memory.textures--}function C(D){const T=n.get(D);if(D.depthTexture&&D.depthTexture.dispose(),D.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(T.__webglFramebuffer[Z]))for(let te=0;te<T.__webglFramebuffer[Z].length;te++)r.deleteFramebuffer(T.__webglFramebuffer[Z][te]);else r.deleteFramebuffer(T.__webglFramebuffer[Z]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[Z])}else{if(Array.isArray(T.__webglFramebuffer))for(let Z=0;Z<T.__webglFramebuffer.length;Z++)r.deleteFramebuffer(T.__webglFramebuffer[Z]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let Z=0;Z<T.__webglColorRenderbuffer.length;Z++)T.__webglColorRenderbuffer[Z]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[Z]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const q=D.textures;for(let Z=0,te=q.length;Z<te;Z++){const j=n.get(q[Z]);j.__webglTexture&&(r.deleteTexture(j.__webglTexture),a.memory.textures--),n.remove(q[Z])}n.remove(D)}let x=0;function M(){x=0}function P(){const D=x;return D>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+i.maxTextures),x+=1,D}function L(D){const T=[];return T.push(D.wrapS),T.push(D.wrapT),T.push(D.wrapR||0),T.push(D.magFilter),T.push(D.minFilter),T.push(D.anisotropy),T.push(D.internalFormat),T.push(D.format),T.push(D.type),T.push(D.generateMipmaps),T.push(D.premultiplyAlpha),T.push(D.flipY),T.push(D.unpackAlignment),T.push(D.colorSpace),T.join()}function U(D,T){const q=n.get(D);if(D.isVideoTexture&&H(D),D.isRenderTargetTexture===!1&&D.version>0&&q.__version!==D.version){const Z=D.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ye(q,D,T);return}}t.bindTexture(r.TEXTURE_2D,q.__webglTexture,r.TEXTURE0+T)}function X(D,T){const q=n.get(D);if(D.version>0&&q.__version!==D.version){Ye(q,D,T);return}t.bindTexture(r.TEXTURE_2D_ARRAY,q.__webglTexture,r.TEXTURE0+T)}function B(D,T){const q=n.get(D);if(D.version>0&&q.__version!==D.version){Ye(q,D,T);return}t.bindTexture(r.TEXTURE_3D,q.__webglTexture,r.TEXTURE0+T)}function G(D,T){const q=n.get(D);if(D.version>0&&q.__version!==D.version){$(q,D,T);return}t.bindTexture(r.TEXTURE_CUBE_MAP,q.__webglTexture,r.TEXTURE0+T)}const Y={[dh]:r.REPEAT,[Vr]:r.CLAMP_TO_EDGE,[fh]:r.MIRRORED_REPEAT},re={[ai]:r.NEAREST,[pv]:r.NEAREST_MIPMAP_NEAREST,[uo]:r.NEAREST_MIPMAP_LINEAR,[pi]:r.LINEAR,[Jl]:r.LINEAR_MIPMAP_NEAREST,[Wr]:r.LINEAR_MIPMAP_LINEAR},k={[yv]:r.NEVER,[Tv]:r.ALWAYS,[xv]:r.LESS,[mm]:r.LEQUAL,[bv]:r.EQUAL,[wv]:r.GEQUAL,[Sv]:r.GREATER,[Mv]:r.NOTEQUAL};function oe(D,T){if(T.type===Vi&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===pi||T.magFilter===Jl||T.magFilter===uo||T.magFilter===Wr||T.minFilter===pi||T.minFilter===Jl||T.minFilter===uo||T.minFilter===Wr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(D,r.TEXTURE_WRAP_S,Y[T.wrapS]),r.texParameteri(D,r.TEXTURE_WRAP_T,Y[T.wrapT]),(D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY)&&r.texParameteri(D,r.TEXTURE_WRAP_R,Y[T.wrapR]),r.texParameteri(D,r.TEXTURE_MAG_FILTER,re[T.magFilter]),r.texParameteri(D,r.TEXTURE_MIN_FILTER,re[T.minFilter]),T.compareFunction&&(r.texParameteri(D,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(D,r.TEXTURE_COMPARE_FUNC,k[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===ai||T.minFilter!==uo&&T.minFilter!==Wr||T.type===Vi&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const q=e.get("EXT_texture_filter_anisotropic");r.texParameterf(D,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,i.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function Be(D,T){let q=!1;D.__webglInit===void 0&&(D.__webglInit=!0,T.addEventListener("dispose",E));const Z=T.source;let te=u.get(Z);te===void 0&&(te={},u.set(Z,te));const j=L(T);if(j!==D.__cacheKey){te[j]===void 0&&(te[j]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,q=!0),te[j].usedTimes++;const xe=te[D.__cacheKey];xe!==void 0&&(te[D.__cacheKey].usedTimes--,xe.usedTimes===0&&A(T)),D.__cacheKey=j,D.__webglTexture=te[j].texture}return q}function Ye(D,T,q){let Z=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(Z=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(Z=r.TEXTURE_3D);const te=Be(D,T),j=T.source;t.bindTexture(Z,D.__webglTexture,r.TEXTURE0+q);const xe=n.get(j);if(j.version!==xe.__version||te===!0){t.activeTexture(r.TEXTURE0+q);const ie=ft.getPrimaries(ft.workingColorSpace),fe=T.colorSpace===ar?null:ft.getPrimaries(T.colorSpace),Ge=T.colorSpace===ar||ie===fe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ge);let ne=v(T.image,!1,i.maxTextureSize);ne=Je(T,ne);const ve=s.convert(T.format,T.colorSpace),ye=s.convert(T.type);let ke=g(T.internalFormat,ve,ye,T.colorSpace,T.isVideoTexture);oe(Z,T);let _e;const qe=T.mipmaps,Oe=T.isVideoTexture!==!0,at=xe.__version===void 0||te===!0,N=j.dataReady,ee=S(T,ne);if(T.isDepthTexture)ke=y(T.format===Qs,T.type),at&&(Oe?t.texStorage2D(r.TEXTURE_2D,1,ke,ne.width,ne.height):t.texImage2D(r.TEXTURE_2D,0,ke,ne.width,ne.height,0,ve,ye,null));else if(T.isDataTexture)if(qe.length>0){Oe&&at&&t.texStorage2D(r.TEXTURE_2D,ee,ke,qe[0].width,qe[0].height);for(let K=0,J=qe.length;K<J;K++)_e=qe[K],Oe?N&&t.texSubImage2D(r.TEXTURE_2D,K,0,0,_e.width,_e.height,ve,ye,_e.data):t.texImage2D(r.TEXTURE_2D,K,ke,_e.width,_e.height,0,ve,ye,_e.data);T.generateMipmaps=!1}else Oe?(at&&t.texStorage2D(r.TEXTURE_2D,ee,ke,ne.width,ne.height),N&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ne.width,ne.height,ve,ye,ne.data)):t.texImage2D(r.TEXTURE_2D,0,ke,ne.width,ne.height,0,ve,ye,ne.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Oe&&at&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ee,ke,qe[0].width,qe[0].height,ne.depth);for(let K=0,J=qe.length;K<J;K++)if(_e=qe[K],T.format!==gi)if(ve!==null)if(Oe){if(N)if(T.layerUpdates.size>0){const le=_f(_e.width,_e.height,T.format,T.type);for(const ce of T.layerUpdates){const $e=_e.data.subarray(ce*le/_e.data.BYTES_PER_ELEMENT,(ce+1)*le/_e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,K,0,0,ce,_e.width,_e.height,1,ve,$e,0,0)}T.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,K,0,0,0,_e.width,_e.height,ne.depth,ve,_e.data,0,0)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,K,ke,_e.width,_e.height,ne.depth,0,_e.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?N&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,K,0,0,0,_e.width,_e.height,ne.depth,ve,ye,_e.data):t.texImage3D(r.TEXTURE_2D_ARRAY,K,ke,_e.width,_e.height,ne.depth,0,ve,ye,_e.data)}else{Oe&&at&&t.texStorage2D(r.TEXTURE_2D,ee,ke,qe[0].width,qe[0].height);for(let K=0,J=qe.length;K<J;K++)_e=qe[K],T.format!==gi?ve!==null?Oe?N&&t.compressedTexSubImage2D(r.TEXTURE_2D,K,0,0,_e.width,_e.height,ve,_e.data):t.compressedTexImage2D(r.TEXTURE_2D,K,ke,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?N&&t.texSubImage2D(r.TEXTURE_2D,K,0,0,_e.width,_e.height,ve,ye,_e.data):t.texImage2D(r.TEXTURE_2D,K,ke,_e.width,_e.height,0,ve,ye,_e.data)}else if(T.isDataArrayTexture)if(Oe){if(at&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ee,ke,ne.width,ne.height,ne.depth),N)if(T.layerUpdates.size>0){const K=_f(ne.width,ne.height,T.format,T.type);for(const J of T.layerUpdates){const le=ne.data.subarray(J*K/ne.data.BYTES_PER_ELEMENT,(J+1)*K/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,J,ne.width,ne.height,1,ve,ye,le)}T.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,ve,ye,ne.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,ke,ne.width,ne.height,ne.depth,0,ve,ye,ne.data);else if(T.isData3DTexture)Oe?(at&&t.texStorage3D(r.TEXTURE_3D,ee,ke,ne.width,ne.height,ne.depth),N&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,ve,ye,ne.data)):t.texImage3D(r.TEXTURE_3D,0,ke,ne.width,ne.height,ne.depth,0,ve,ye,ne.data);else if(T.isFramebufferTexture){if(at)if(Oe)t.texStorage2D(r.TEXTURE_2D,ee,ke,ne.width,ne.height);else{let K=ne.width,J=ne.height;for(let le=0;le<ee;le++)t.texImage2D(r.TEXTURE_2D,le,ke,K,J,0,ve,ye,null),K>>=1,J>>=1}}else if(qe.length>0){if(Oe&&at){const K=De(qe[0]);t.texStorage2D(r.TEXTURE_2D,ee,ke,K.width,K.height)}for(let K=0,J=qe.length;K<J;K++)_e=qe[K],Oe?N&&t.texSubImage2D(r.TEXTURE_2D,K,0,0,ve,ye,_e):t.texImage2D(r.TEXTURE_2D,K,ke,ve,ye,_e);T.generateMipmaps=!1}else if(Oe){if(at){const K=De(ne);t.texStorage2D(r.TEXTURE_2D,ee,ke,K.width,K.height)}N&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ve,ye,ne)}else t.texImage2D(r.TEXTURE_2D,0,ke,ve,ye,ne);p(T)&&m(Z),xe.__version=j.version,T.onUpdate&&T.onUpdate(T)}D.__version=T.version}function $(D,T,q){if(T.image.length!==6)return;const Z=Be(D,T),te=T.source;t.bindTexture(r.TEXTURE_CUBE_MAP,D.__webglTexture,r.TEXTURE0+q);const j=n.get(te);if(te.version!==j.__version||Z===!0){t.activeTexture(r.TEXTURE0+q);const xe=ft.getPrimaries(ft.workingColorSpace),ie=T.colorSpace===ar?null:ft.getPrimaries(T.colorSpace),fe=T.colorSpace===ar||xe===ie?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);const Ge=T.isCompressedTexture||T.image[0].isCompressedTexture,ne=T.image[0]&&T.image[0].isDataTexture,ve=[];for(let J=0;J<6;J++)!Ge&&!ne?ve[J]=v(T.image[J],!0,i.maxCubemapSize):ve[J]=ne?T.image[J].image:T.image[J],ve[J]=Je(T,ve[J]);const ye=ve[0],ke=s.convert(T.format,T.colorSpace),_e=s.convert(T.type),qe=g(T.internalFormat,ke,_e,T.colorSpace),Oe=T.isVideoTexture!==!0,at=j.__version===void 0||Z===!0,N=te.dataReady;let ee=S(T,ye);oe(r.TEXTURE_CUBE_MAP,T);let K;if(Ge){Oe&&at&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ee,qe,ye.width,ye.height);for(let J=0;J<6;J++){K=ve[J].mipmaps;for(let le=0;le<K.length;le++){const ce=K[le];T.format!==gi?ke!==null?Oe?N&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le,0,0,ce.width,ce.height,ke,ce.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le,qe,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Oe?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le,0,0,ce.width,ce.height,ke,_e,ce.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le,qe,ce.width,ce.height,0,ke,_e,ce.data)}}}else{if(K=T.mipmaps,Oe&&at){K.length>0&&ee++;const J=De(ve[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,ee,qe,J.width,J.height)}for(let J=0;J<6;J++)if(ne){Oe?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ve[J].width,ve[J].height,ke,_e,ve[J].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,qe,ve[J].width,ve[J].height,0,ke,_e,ve[J].data);for(let le=0;le<K.length;le++){const $e=K[le].image[J].image;Oe?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le+1,0,0,$e.width,$e.height,ke,_e,$e.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le+1,qe,$e.width,$e.height,0,ke,_e,$e.data)}}else{Oe?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ke,_e,ve[J]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,qe,ke,_e,ve[J]);for(let le=0;le<K.length;le++){const ce=K[le];Oe?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le+1,0,0,ke,_e,ce.image[J]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le+1,qe,ke,_e,ce.image[J])}}}p(T)&&m(r.TEXTURE_CUBE_MAP),j.__version=te.version,T.onUpdate&&T.onUpdate(T)}D.__version=T.version}function Q(D,T,q,Z,te,j){const xe=s.convert(q.format,q.colorSpace),ie=s.convert(q.type),fe=g(q.internalFormat,xe,ie,q.colorSpace);if(!n.get(T).__hasExternalTextures){const ne=Math.max(1,T.width>>j),ve=Math.max(1,T.height>>j);te===r.TEXTURE_3D||te===r.TEXTURE_2D_ARRAY?t.texImage3D(te,j,fe,ne,ve,T.depth,0,xe,ie,null):t.texImage2D(te,j,fe,ne,ve,0,xe,ie,null)}t.bindFramebuffer(r.FRAMEBUFFER,D),ze(T)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Z,te,n.get(q).__webglTexture,0,Ne(T)):(te===r.TEXTURE_2D||te>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Z,te,n.get(q).__webglTexture,j),t.bindFramebuffer(r.FRAMEBUFFER,null)}function de(D,T,q){if(r.bindRenderbuffer(r.RENDERBUFFER,D),T.depthBuffer){const Z=T.depthTexture,te=Z&&Z.isDepthTexture?Z.type:null,j=y(T.stencilBuffer,te),xe=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ie=Ne(T);ze(T)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ie,j,T.width,T.height):q?r.renderbufferStorageMultisample(r.RENDERBUFFER,ie,j,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,j,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,xe,r.RENDERBUFFER,D)}else{const Z=T.textures;for(let te=0;te<Z.length;te++){const j=Z[te],xe=s.convert(j.format,j.colorSpace),ie=s.convert(j.type),fe=g(j.internalFormat,xe,ie,j.colorSpace),Ge=Ne(T);q&&ze(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ge,fe,T.width,T.height):ze(T)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ge,fe,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,fe,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ae(D,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,D),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),U(T.depthTexture,0);const Z=n.get(T.depthTexture).__webglTexture,te=Ne(T);if(T.depthTexture.format===Hs)ze(T)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Z,0,te):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Z,0);else if(T.depthTexture.format===Qs)ze(T)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Z,0,te):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Ee(D){const T=n.get(D),q=D.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==D.depthTexture){const Z=D.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),Z){const te=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,Z.removeEventListener("dispose",te)};Z.addEventListener("dispose",te),T.__depthDisposeCallback=te}T.__boundDepthTexture=Z}if(D.depthTexture&&!T.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");ae(T.__webglFramebuffer,D)}else if(q){T.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[Z]),T.__webglDepthbuffer[Z]===void 0)T.__webglDepthbuffer[Z]=r.createRenderbuffer(),de(T.__webglDepthbuffer[Z],D,!1);else{const te=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=T.__webglDepthbuffer[Z];r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,te,r.RENDERBUFFER,j)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),de(T.__webglDepthbuffer,D,!1);else{const Z=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,te=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,te),r.framebufferRenderbuffer(r.FRAMEBUFFER,Z,r.RENDERBUFFER,te)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Se(D,T,q){const Z=n.get(D);T!==void 0&&Q(Z.__webglFramebuffer,D,D.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),q!==void 0&&Ee(D)}function We(D){const T=D.texture,q=n.get(D),Z=n.get(T);D.addEventListener("dispose",w);const te=D.textures,j=D.isWebGLCubeRenderTarget===!0,xe=te.length>1;if(xe||(Z.__webglTexture===void 0&&(Z.__webglTexture=r.createTexture()),Z.__version=T.version,a.memory.textures++),j){q.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(T.mipmaps&&T.mipmaps.length>0){q.__webglFramebuffer[ie]=[];for(let fe=0;fe<T.mipmaps.length;fe++)q.__webglFramebuffer[ie][fe]=r.createFramebuffer()}else q.__webglFramebuffer[ie]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){q.__webglFramebuffer=[];for(let ie=0;ie<T.mipmaps.length;ie++)q.__webglFramebuffer[ie]=r.createFramebuffer()}else q.__webglFramebuffer=r.createFramebuffer();if(xe)for(let ie=0,fe=te.length;ie<fe;ie++){const Ge=n.get(te[ie]);Ge.__webglTexture===void 0&&(Ge.__webglTexture=r.createTexture(),a.memory.textures++)}if(D.samples>0&&ze(D)===!1){q.__webglMultisampledFramebuffer=r.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let ie=0;ie<te.length;ie++){const fe=te[ie];q.__webglColorRenderbuffer[ie]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,q.__webglColorRenderbuffer[ie]);const Ge=s.convert(fe.format,fe.colorSpace),ne=s.convert(fe.type),ve=g(fe.internalFormat,Ge,ne,fe.colorSpace,D.isXRRenderTarget===!0),ye=Ne(D);r.renderbufferStorageMultisample(r.RENDERBUFFER,ye,ve,D.width,D.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ie,r.RENDERBUFFER,q.__webglColorRenderbuffer[ie])}r.bindRenderbuffer(r.RENDERBUFFER,null),D.depthBuffer&&(q.__webglDepthRenderbuffer=r.createRenderbuffer(),de(q.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(j){t.bindTexture(r.TEXTURE_CUBE_MAP,Z.__webglTexture),oe(r.TEXTURE_CUBE_MAP,T);for(let ie=0;ie<6;ie++)if(T.mipmaps&&T.mipmaps.length>0)for(let fe=0;fe<T.mipmaps.length;fe++)Q(q.__webglFramebuffer[ie][fe],D,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,fe);else Q(q.__webglFramebuffer[ie],D,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);p(T)&&m(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){for(let ie=0,fe=te.length;ie<fe;ie++){const Ge=te[ie],ne=n.get(Ge);t.bindTexture(r.TEXTURE_2D,ne.__webglTexture),oe(r.TEXTURE_2D,Ge),Q(q.__webglFramebuffer,D,Ge,r.COLOR_ATTACHMENT0+ie,r.TEXTURE_2D,0),p(Ge)&&m(r.TEXTURE_2D)}t.unbindTexture()}else{let ie=r.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ie=D.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ie,Z.__webglTexture),oe(ie,T),T.mipmaps&&T.mipmaps.length>0)for(let fe=0;fe<T.mipmaps.length;fe++)Q(q.__webglFramebuffer[fe],D,T,r.COLOR_ATTACHMENT0,ie,fe);else Q(q.__webglFramebuffer,D,T,r.COLOR_ATTACHMENT0,ie,0);p(T)&&m(ie),t.unbindTexture()}D.depthBuffer&&Ee(D)}function Ve(D){const T=D.textures;for(let q=0,Z=T.length;q<Z;q++){const te=T[q];if(p(te)){const j=D.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,xe=n.get(te).__webglTexture;t.bindTexture(j,xe),m(j),t.unbindTexture()}}}const Ue=[],I=[];function st(D){if(D.samples>0){if(ze(D)===!1){const T=D.textures,q=D.width,Z=D.height;let te=r.COLOR_BUFFER_BIT;const j=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,xe=n.get(D),ie=T.length>1;if(ie)for(let fe=0;fe<T.length;fe++)t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let fe=0;fe<T.length;fe++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(te|=r.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(te|=r.STENCIL_BUFFER_BIT)),ie){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,xe.__webglColorRenderbuffer[fe]);const Ge=n.get(T[fe]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ge,0)}r.blitFramebuffer(0,0,q,Z,0,0,q,Z,te,r.NEAREST),l===!0&&(Ue.length=0,I.length=0,Ue.push(r.COLOR_ATTACHMENT0+fe),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Ue.push(j),I.push(j),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,I)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ue))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ie)for(let fe=0;fe<T.length;fe++){t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.RENDERBUFFER,xe.__webglColorRenderbuffer[fe]);const Ge=n.get(T[fe]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.TEXTURE_2D,Ge,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const T=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function Ne(D){return Math.min(i.maxSamples,D.samples)}function ze(D){const T=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function H(D){const T=a.render.frame;h.get(D)!==T&&(h.set(D,T),D.update())}function Je(D,T){const q=D.colorSpace,Z=D.format,te=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||q!==Er&&q!==ar&&(ft.getTransfer(q)===Tt?(Z!==gi||te!==$i)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),T}function De(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=P,this.resetTextureUnits=M,this.setTexture2D=U,this.setTexture2DArray=X,this.setTexture3D=B,this.setTextureCube=G,this.rebindTextures=Se,this.setupRenderTarget=We,this.updateRenderTargetMipmap=Ve,this.updateMultisampleRenderTarget=st,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=ze}function LS(r,e){function t(n,i=ar){let s;const a=ft.getTransfer(i);if(n===$i)return r.UNSIGNED_BYTE;if(n===bu)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Su)return r.UNSIGNED_SHORT_5_5_5_1;if(n===om)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===sm)return r.BYTE;if(n===am)return r.SHORT;if(n===Xa)return r.UNSIGNED_SHORT;if(n===xu)return r.INT;if(n===ts)return r.UNSIGNED_INT;if(n===Vi)return r.FLOAT;if(n===$a)return r.HALF_FLOAT;if(n===lm)return r.ALPHA;if(n===cm)return r.RGB;if(n===gi)return r.RGBA;if(n===hm)return r.LUMINANCE;if(n===um)return r.LUMINANCE_ALPHA;if(n===Hs)return r.DEPTH_COMPONENT;if(n===Qs)return r.DEPTH_STENCIL;if(n===dm)return r.RED;if(n===Mu)return r.RED_INTEGER;if(n===fm)return r.RG;if(n===wu)return r.RG_INTEGER;if(n===Tu)return r.RGBA_INTEGER;if(n===jo||n===Zo||n===Jo||n===Qo)if(a===Tt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===jo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Zo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Jo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Qo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===jo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Zo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Jo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Qo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ph||n===mh||n===gh||n===_h)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ph)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===mh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===gh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===_h)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===vh||n===yh||n===xh)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===vh||n===yh)return a===Tt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===xh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===bh||n===Sh||n===Mh||n===wh||n===Th||n===Eh||n===Ah||n===Rh||n===Ch||n===Ph||n===Dh||n===Lh||n===kh||n===Ih)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===bh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Sh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Mh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Th)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Eh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ah)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Rh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ch)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ph)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Dh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Lh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===kh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ih)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===el||n===Uh||n===Nh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===el)return a===Tt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Uh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Nh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===pm||n===Oh||n===Fh||n===Bh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===el)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Oh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Fh)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Bh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Js?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}class kS extends Wn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class wi extends bn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const IS={type:"move"};class Ac{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const p=t.getJointPose(v,n),m=this._getHandJoint(c,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,_=.005;c.inputState.pinching&&u>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(IS)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new wi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const US=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,NS=`
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

}`;class OS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new In,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new wr({vertexShader:US,fragmentShader:NS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new _i(new Dl(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class FS extends ss{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,_=null;const v=new OS,p=t.getContextAttributes();let m=null,g=null;const y=[],S=[],E=new Xe;let w=null;const b=new Wn;b.layers.enable(1),b.viewport=new zt;const A=new Wn;A.layers.enable(2),A.viewport=new zt;const C=[b,A],x=new kS;x.layers.enable(1),x.layers.enable(2);let M=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let Q=y[$];return Q===void 0&&(Q=new Ac,y[$]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function($){let Q=y[$];return Q===void 0&&(Q=new Ac,y[$]=Q),Q.getGripSpace()},this.getHand=function($){let Q=y[$];return Q===void 0&&(Q=new Ac,y[$]=Q),Q.getHandSpace()};function L($){const Q=S.indexOf($.inputSource);if(Q===-1)return;const de=y[Q];de!==void 0&&(de.update($.inputSource,$.frame,c||a),de.dispatchEvent({type:$.type,data:$.inputSource}))}function U(){i.removeEventListener("select",L),i.removeEventListener("selectstart",L),i.removeEventListener("selectend",L),i.removeEventListener("squeeze",L),i.removeEventListener("squeezestart",L),i.removeEventListener("squeezeend",L),i.removeEventListener("end",U),i.removeEventListener("inputsourceschange",X);for(let $=0;$<y.length;$++){const Q=S[$];Q!==null&&(S[$]=null,y[$].disconnect(Q))}M=null,P=null,v.reset(),e.setRenderTarget(m),f=null,u=null,d=null,i=null,g=null,Ye.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",L),i.addEventListener("selectstart",L),i.addEventListener("selectend",L),i.addEventListener("squeeze",L),i.addEventListener("squeezestart",L),i.addEventListener("squeezeend",L),i.addEventListener("end",U),i.addEventListener("inputsourceschange",X),p.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(E),i.renderState.layers===void 0){const Q={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,Q),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),g=new ns(f.framebufferWidth,f.framebufferHeight,{format:gi,type:$i,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let Q=null,de=null,ae=null;p.depth&&(ae=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Q=p.stencil?Qs:Hs,de=p.stencil?Js:ts);const Ee={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:s};d=new XRWebGLBinding(i,t),u=d.createProjectionLayer(Ee),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),g=new ns(u.textureWidth,u.textureHeight,{format:gi,type:$i,depthTexture:new Rm(u.textureWidth,u.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}g.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Ye.setContext(i),Ye.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function X($){for(let Q=0;Q<$.removed.length;Q++){const de=$.removed[Q],ae=S.indexOf(de);ae>=0&&(S[ae]=null,y[ae].disconnect(de))}for(let Q=0;Q<$.added.length;Q++){const de=$.added[Q];let ae=S.indexOf(de);if(ae===-1){for(let Se=0;Se<y.length;Se++)if(Se>=S.length){S.push(de),ae=Se;break}else if(S[Se]===null){S[Se]=de,ae=Se;break}if(ae===-1)break}const Ee=y[ae];Ee&&Ee.connect(de)}}const B=new z,G=new z;function Y($,Q,de){B.setFromMatrixPosition(Q.matrixWorld),G.setFromMatrixPosition(de.matrixWorld);const ae=B.distanceTo(G),Ee=Q.projectionMatrix.elements,Se=de.projectionMatrix.elements,We=Ee[14]/(Ee[10]-1),Ve=Ee[14]/(Ee[10]+1),Ue=(Ee[9]+1)/Ee[5],I=(Ee[9]-1)/Ee[5],st=(Ee[8]-1)/Ee[0],Ne=(Se[8]+1)/Se[0],ze=We*st,H=We*Ne,Je=ae/(-st+Ne),De=Je*-st;if(Q.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(De),$.translateZ(Je),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ee[10]===-1)$.projectionMatrix.copy(Q.projectionMatrix),$.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const D=We+Je,T=Ve+Je,q=ze-De,Z=H+(ae-De),te=Ue*Ve/T*D,j=I*Ve/T*D;$.projectionMatrix.makePerspective(q,Z,te,j,D,T),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function re($,Q){Q===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(Q.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let Q=$.near,de=$.far;v.texture!==null&&(v.depthNear>0&&(Q=v.depthNear),v.depthFar>0&&(de=v.depthFar)),x.near=A.near=b.near=Q,x.far=A.far=b.far=de,(M!==x.near||P!==x.far)&&(i.updateRenderState({depthNear:x.near,depthFar:x.far}),M=x.near,P=x.far);const ae=$.parent,Ee=x.cameras;re(x,ae);for(let Se=0;Se<Ee.length;Se++)re(Ee[Se],ae);Ee.length===2?Y(x,b,A):x.projectionMatrix.copy(b.projectionMatrix),k($,x,ae)};function k($,Q,de){de===null?$.matrix.copy(Q.matrixWorld):($.matrix.copy(de.matrixWorld),$.matrix.invert(),$.matrix.multiply(Q.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(Q.projectionMatrix),$.projectionMatrixInverse.copy(Q.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=zh*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function($){l=$,u!==null&&(u.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(x)};let oe=null;function Be($,Q){if(h=Q.getViewerPose(c||a),_=Q,h!==null){const de=h.views;f!==null&&(e.setRenderTargetFramebuffer(g,f.framebuffer),e.setRenderTarget(g));let ae=!1;de.length!==x.cameras.length&&(x.cameras.length=0,ae=!0);for(let Se=0;Se<de.length;Se++){const We=de[Se];let Ve=null;if(f!==null)Ve=f.getViewport(We);else{const I=d.getViewSubImage(u,We);Ve=I.viewport,Se===0&&(e.setRenderTargetTextures(g,I.colorTexture,u.ignoreDepthValues?void 0:I.depthStencilTexture),e.setRenderTarget(g))}let Ue=C[Se];Ue===void 0&&(Ue=new Wn,Ue.layers.enable(Se),Ue.viewport=new zt,C[Se]=Ue),Ue.matrix.fromArray(We.transform.matrix),Ue.matrix.decompose(Ue.position,Ue.quaternion,Ue.scale),Ue.projectionMatrix.fromArray(We.projectionMatrix),Ue.projectionMatrixInverse.copy(Ue.projectionMatrix).invert(),Ue.viewport.set(Ve.x,Ve.y,Ve.width,Ve.height),Se===0&&(x.matrix.copy(Ue.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ae===!0&&x.cameras.push(Ue)}const Ee=i.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")){const Se=d.getDepthInformation(de[0]);Se&&Se.isValid&&Se.texture&&v.init(e,Se,i.renderState)}}for(let de=0;de<y.length;de++){const ae=S[de],Ee=y[de];ae!==null&&Ee!==void 0&&Ee.update(ae,Q,c||a)}oe&&oe($,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),_=null}const Ye=new Am;Ye.setAnimationLoop(Be),this.setAnimationLoop=function($){oe=$},this.dispose=function(){}}}const Ir=new Ki,BS=new It;function zS(r,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Mm(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,g,y,S){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),d(p,m)):m.isMeshPhongMaterial?(s(p,m),h(p,m)):m.isMeshStandardMaterial?(s(p,m),u(p,m),m.isMeshPhysicalMaterial&&f(p,m,S)):m.isMeshMatcapMaterial?(s(p,m),_(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),v(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,g,y):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===kn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===kn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const g=e.get(m),y=g.envMap,S=g.envMapRotation;y&&(p.envMap.value=y,Ir.copy(S),Ir.x*=-1,Ir.y*=-1,Ir.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ir.y*=-1,Ir.z*=-1),p.envMapRotation.value.setFromMatrix4(BS.makeRotationFromEuler(Ir)),p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,g,y){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*g,p.scale.value=y*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,g){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===kn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=g.texture,p.transmissionSamplerSize.value.set(g.width,g.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){const g=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(g.matrixWorld),p.nearDistance.value=g.shadow.camera.near,p.farDistance.value=g.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function HS(r,e,t,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(g,y){const S=y.program;n.uniformBlockBinding(g,S)}function c(g,y){let S=i[g.id];S===void 0&&(_(g),S=h(g),i[g.id]=S,g.addEventListener("dispose",p));const E=y.program;n.updateUBOMapping(g,E);const w=e.render.frame;s[g.id]!==w&&(u(g),s[g.id]=w)}function h(g){const y=d();g.__bindingPointIndex=y;const S=r.createBuffer(),E=g.__size,w=g.usage;return r.bindBuffer(r.UNIFORM_BUFFER,S),r.bufferData(r.UNIFORM_BUFFER,E,w),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,y,S),S}function d(){for(let g=0;g<o;g++)if(a.indexOf(g)===-1)return a.push(g),g;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(g){const y=i[g.id],S=g.uniforms,E=g.__cache;r.bindBuffer(r.UNIFORM_BUFFER,y);for(let w=0,b=S.length;w<b;w++){const A=Array.isArray(S[w])?S[w]:[S[w]];for(let C=0,x=A.length;C<x;C++){const M=A[C];if(f(M,w,C,E)===!0){const P=M.__offset,L=Array.isArray(M.value)?M.value:[M.value];let U=0;for(let X=0;X<L.length;X++){const B=L[X],G=v(B);typeof B=="number"||typeof B=="boolean"?(M.__data[0]=B,r.bufferSubData(r.UNIFORM_BUFFER,P+U,M.__data)):B.isMatrix3?(M.__data[0]=B.elements[0],M.__data[1]=B.elements[1],M.__data[2]=B.elements[2],M.__data[3]=0,M.__data[4]=B.elements[3],M.__data[5]=B.elements[4],M.__data[6]=B.elements[5],M.__data[7]=0,M.__data[8]=B.elements[6],M.__data[9]=B.elements[7],M.__data[10]=B.elements[8],M.__data[11]=0):(B.toArray(M.__data,U),U+=G.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,P,M.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(g,y,S,E){const w=g.value,b=y+"_"+S;if(E[b]===void 0)return typeof w=="number"||typeof w=="boolean"?E[b]=w:E[b]=w.clone(),!0;{const A=E[b];if(typeof w=="number"||typeof w=="boolean"){if(A!==w)return E[b]=w,!0}else if(A.equals(w)===!1)return A.copy(w),!0}return!1}function _(g){const y=g.uniforms;let S=0;const E=16;for(let b=0,A=y.length;b<A;b++){const C=Array.isArray(y[b])?y[b]:[y[b]];for(let x=0,M=C.length;x<M;x++){const P=C[x],L=Array.isArray(P.value)?P.value:[P.value];for(let U=0,X=L.length;U<X;U++){const B=L[U],G=v(B),Y=S%E,re=Y%G.boundary,k=Y+re;S+=re,k!==0&&E-k<G.storage&&(S+=E-k),P.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=S,S+=G.storage}}}const w=S%E;return w>0&&(S+=E-w),g.__size=S,g.__cache={},this}function v(g){const y={boundary:0,storage:0};return typeof g=="number"||typeof g=="boolean"?(y.boundary=4,y.storage=4):g.isVector2?(y.boundary=8,y.storage=8):g.isVector3||g.isColor?(y.boundary=16,y.storage=12):g.isVector4?(y.boundary=16,y.storage=16):g.isMatrix3?(y.boundary=48,y.storage=48):g.isMatrix4?(y.boundary=64,y.storage=64):g.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",g),y}function p(g){const y=g.target;y.removeEventListener("dispose",p);const S=a.indexOf(y.__bindingPointIndex);a.splice(S,1),r.deleteBuffer(i[y.id]),delete i[y.id],delete s[y.id]}function m(){for(const g in i)r.deleteBuffer(i[g]);a=[],i={},s={}}return{bind:l,update:c,dispose:m}}class km{constructor(e={}){const{canvas:t=Rv(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let u;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=n.getContextAttributes().alpha}else u=a;const f=new Uint32Array(4),_=new Int32Array(4);let v=null,p=null;const m=[],g=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=bi,this.toneMapping=_r,this.toneMappingExposure=1;const y=this;let S=!1,E=0,w=0,b=null,A=-1,C=null;const x=new zt,M=new zt;let P=null;const L=new ht(0);let U=0,X=t.width,B=t.height,G=1,Y=null,re=null;const k=new zt(0,0,X,B),oe=new zt(0,0,X,B);let Be=!1;const Ye=new Em;let $=!1,Q=!1;const de=new It,ae=new It,Ee=new z,Se=new zt,We={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function Ue(){return b===null?G:1}let I=n;function st(R,F){return t.getContext(R,F)}try{const R={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${yu}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",le,!1),t.addEventListener("webglcontextcreationerror",ce,!1),I===null){const F="webgl2";if(I=st(F,R),I===null)throw st(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Ne,ze,H,Je,De,D,T,q,Z,te,j,xe,ie,fe,Ge,ne,ve,ye,ke,_e,qe,Oe,at,N;function ee(){Ne=new qx(I),Ne.init(),Oe=new LS(I,Ne),ze=new zx(I,Ne,e,Oe),H=new CS(I),ze.reverseDepthBuffer&&H.buffers.depth.setReversed(!0),Je=new jx(I),De=new pS,D=new DS(I,Ne,H,De,ze,Oe,Je),T=new Gx(y),q=new Yx(y),Z=new n0(I),at=new Fx(I,Z),te=new $x(I,Z,Je,at),j=new Jx(I,te,Z,Je),ke=new Zx(I,ze,D),ne=new Hx(De),xe=new fS(y,T,q,Ne,ze,at,ne),ie=new zS(y,De),fe=new gS,Ge=new SS(Ne),ye=new Ox(y,T,q,H,j,u,l),ve=new AS(y,j,ze),N=new HS(I,Je,ze,H),_e=new Bx(I,Ne,Je),qe=new Kx(I,Ne,Je),Je.programs=xe.programs,y.capabilities=ze,y.extensions=Ne,y.properties=De,y.renderLists=fe,y.shadowMap=ve,y.state=H,y.info=Je}ee();const K=new FS(y,I);this.xr=K,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const R=Ne.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Ne.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(R){R!==void 0&&(G=R,this.setSize(X,B,!1))},this.getSize=function(R){return R.set(X,B)},this.setSize=function(R,F,V=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=R,B=F,t.width=Math.floor(R*G),t.height=Math.floor(F*G),V===!0&&(t.style.width=R+"px",t.style.height=F+"px"),this.setViewport(0,0,R,F)},this.getDrawingBufferSize=function(R){return R.set(X*G,B*G).floor()},this.setDrawingBufferSize=function(R,F,V){X=R,B=F,G=V,t.width=Math.floor(R*V),t.height=Math.floor(F*V),this.setViewport(0,0,R,F)},this.getCurrentViewport=function(R){return R.copy(x)},this.getViewport=function(R){return R.copy(k)},this.setViewport=function(R,F,V,W){R.isVector4?k.set(R.x,R.y,R.z,R.w):k.set(R,F,V,W),H.viewport(x.copy(k).multiplyScalar(G).round())},this.getScissor=function(R){return R.copy(oe)},this.setScissor=function(R,F,V,W){R.isVector4?oe.set(R.x,R.y,R.z,R.w):oe.set(R,F,V,W),H.scissor(M.copy(oe).multiplyScalar(G).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(R){H.setScissorTest(Be=R)},this.setOpaqueSort=function(R){Y=R},this.setTransparentSort=function(R){re=R},this.getClearColor=function(R){return R.copy(ye.getClearColor())},this.setClearColor=function(){ye.setClearColor.apply(ye,arguments)},this.getClearAlpha=function(){return ye.getClearAlpha()},this.setClearAlpha=function(){ye.setClearAlpha.apply(ye,arguments)},this.clear=function(R=!0,F=!0,V=!0){let W=0;if(R){let O=!1;if(b!==null){const se=b.texture.format;O=se===Tu||se===wu||se===Mu}if(O){const se=b.texture.type,ge=se===$i||se===ts||se===Xa||se===Js||se===bu||se===Su,ue=ye.getClearColor(),he=ye.getClearAlpha(),Ae=ue.r,Ie=ue.g,we=ue.b;ge?(f[0]=Ae,f[1]=Ie,f[2]=we,f[3]=he,I.clearBufferuiv(I.COLOR,0,f)):(_[0]=Ae,_[1]=Ie,_[2]=we,_[3]=he,I.clearBufferiv(I.COLOR,0,_))}else W|=I.COLOR_BUFFER_BIT}F&&(W|=I.DEPTH_BUFFER_BIT,I.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),V&&(W|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",le,!1),t.removeEventListener("webglcontextcreationerror",ce,!1),fe.dispose(),Ge.dispose(),De.dispose(),T.dispose(),q.dispose(),j.dispose(),at.dispose(),N.dispose(),xe.dispose(),K.dispose(),K.removeEventListener("sessionstart",ct),K.removeEventListener("sessionend",pe),Le.stop()};function J(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function le(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const R=Je.autoReset,F=ve.enabled,V=ve.autoUpdate,W=ve.needsUpdate,O=ve.type;ee(),Je.autoReset=R,ve.enabled=F,ve.autoUpdate=V,ve.needsUpdate=W,ve.type=O}function ce(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function $e(R){const F=R.target;F.removeEventListener("dispose",$e),vt(F)}function vt(R){Et(R),De.remove(R)}function Et(R){const F=De.get(R).programs;F!==void 0&&(F.forEach(function(V){xe.releaseProgram(V)}),R.isShaderMaterial&&xe.releaseShaderCache(R))}this.renderBufferDirect=function(R,F,V,W,O,se){F===null&&(F=We);const ge=O.isMesh&&O.matrixWorld.determinant()<0,ue=pt(R,F,V,W,O);H.setMaterial(W,ge);let he=V.index,Ae=1;if(W.wireframe===!0){if(he=te.getWireframeAttribute(V),he===void 0)return;Ae=2}const Ie=V.drawRange,we=V.attributes.position;let ot=Ie.start*Ae,rt=(Ie.start+Ie.count)*Ae;se!==null&&(ot=Math.max(ot,se.start*Ae),rt=Math.min(rt,(se.start+se.count)*Ae)),he!==null?(ot=Math.max(ot,0),rt=Math.min(rt,he.count)):we!=null&&(ot=Math.max(ot,0),rt=Math.min(rt,we.count));const gt=rt-ot;if(gt<0||gt===1/0)return;at.setup(O,W,ue,V,he);let jt,Qe=_e;if(he!==null&&(jt=Z.get(he),Qe=qe,Qe.setIndex(jt)),O.isMesh)W.wireframe===!0?(H.setLineWidth(W.wireframeLinewidth*Ue()),Qe.setMode(I.LINES)):Qe.setMode(I.TRIANGLES);else if(O.isLine){let Pe=W.linewidth;Pe===void 0&&(Pe=1),H.setLineWidth(Pe*Ue()),O.isLineSegments?Qe.setMode(I.LINES):O.isLineLoop?Qe.setMode(I.LINE_LOOP):Qe.setMode(I.LINE_STRIP)}else O.isPoints?Qe.setMode(I.POINTS):O.isSprite&&Qe.setMode(I.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)Qe.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Ne.get("WEBGL_multi_draw"))Qe.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Pe=O._multiDrawStarts,tn=O._multiDrawCounts,ut=O._multiDrawCount,ci=he?Z.get(he).bytesPerElement:1,as=De.get(W).currentProgram.getUniforms();for(let On=0;On<ut;On++)as.setValue(I,"_gl_DrawID",On),Qe.render(Pe[On]/ci,tn[On])}else if(O.isInstancedMesh)Qe.renderInstances(ot,gt,O.count);else if(V.isInstancedBufferGeometry){const Pe=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,tn=Math.min(V.instanceCount,Pe);Qe.renderInstances(ot,gt,tn)}else Qe.render(ot,gt)};function it(R,F,V){R.transparent===!0&&R.side===Hi&&R.forceSinglePass===!1?(R.side=kn,R.needsUpdate=!0,Ot(R,F,V),R.side=Mr,R.needsUpdate=!0,Ot(R,F,V),R.side=Hi):Ot(R,F,V)}this.compile=function(R,F,V=null){V===null&&(V=R),p=Ge.get(V),p.init(F),g.push(p),V.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),R!==V&&R.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const W=new Set;return R.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const se=O.material;if(se)if(Array.isArray(se))for(let ge=0;ge<se.length;ge++){const ue=se[ge];it(ue,V,O),W.add(ue)}else it(se,V,O),W.add(se)}),g.pop(),p=null,W},this.compileAsync=function(R,F,V=null){const W=this.compile(R,F,V);return new Promise(O=>{function se(){if(W.forEach(function(ge){De.get(ge).currentProgram.isReady()&&W.delete(ge)}),W.size===0){O(R);return}setTimeout(se,10)}Ne.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let Re=null;function Me(R){Re&&Re(R)}function ct(){Le.stop()}function pe(){Le.start()}const Le=new Am;Le.setAnimationLoop(Me),typeof self<"u"&&Le.setContext(self),this.setAnimationLoop=function(R){Re=R,K.setAnimationLoop(R),R===null?Le.stop():Le.start()},K.addEventListener("sessionstart",ct),K.addEventListener("sessionend",pe),this.render=function(R,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(F),F=K.getCamera()),R.isScene===!0&&R.onBeforeRender(y,R,F,b),p=Ge.get(R,g.length),p.init(F),g.push(p),ae.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Ye.setFromProjectionMatrix(ae),Q=this.localClippingEnabled,$=ne.init(this.clippingPlanes,Q),v=fe.get(R,m.length),v.init(),m.push(v),K.enabled===!0&&K.isPresenting===!0){const se=y.xr.getDepthSensingMesh();se!==null&&Ce(se,F,-1/0,y.sortObjects)}Ce(R,F,0,y.sortObjects),v.finish(),y.sortObjects===!0&&v.sort(Y,re),Ve=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,Ve&&ye.addToRenderList(v,R),this.info.render.frame++,$===!0&&ne.beginShadows();const V=p.state.shadowsArray;ve.render(V,R,F),$===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=v.opaque,O=v.transmissive;if(p.setupLights(),F.isArrayCamera){const se=F.cameras;if(O.length>0)for(let ge=0,ue=se.length;ge<ue;ge++){const he=se[ge];Nt(W,O,R,he)}Ve&&ye.render(R);for(let ge=0,ue=se.length;ge<ue;ge++){const he=se[ge];He(v,R,he,he.viewport)}}else O.length>0&&Nt(W,O,R,F),Ve&&ye.render(R),He(v,R,F);b!==null&&(D.updateMultisampleRenderTarget(b),D.updateRenderTargetMipmap(b)),R.isScene===!0&&R.onAfterRender(y,R,F),at.resetDefaultState(),A=-1,C=null,g.pop(),g.length>0?(p=g[g.length-1],$===!0&&ne.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?v=m[m.length-1]:v=null};function Ce(R,F,V,W){if(R.visible===!1)return;if(R.layers.test(F.layers)){if(R.isGroup)V=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(F);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Ye.intersectsSprite(R)){W&&Se.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ae);const ge=j.update(R),ue=R.material;ue.visible&&v.push(R,ge,ue,V,Se.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Ye.intersectsObject(R))){const ge=j.update(R),ue=R.material;if(W&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Se.copy(R.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),Se.copy(ge.boundingSphere.center)),Se.applyMatrix4(R.matrixWorld).applyMatrix4(ae)),Array.isArray(ue)){const he=ge.groups;for(let Ae=0,Ie=he.length;Ae<Ie;Ae++){const we=he[Ae],ot=ue[we.materialIndex];ot&&ot.visible&&v.push(R,ge,ot,V,Se.z,we)}}else ue.visible&&v.push(R,ge,ue,V,Se.z,null)}}const se=R.children;for(let ge=0,ue=se.length;ge<ue;ge++)Ce(se[ge],F,V,W)}function He(R,F,V,W){const O=R.opaque,se=R.transmissive,ge=R.transparent;p.setupLightsView(V),$===!0&&ne.setGlobalState(y.clippingPlanes,V),W&&H.viewport(x.copy(W)),O.length>0&&Ke(O,F,V),se.length>0&&Ke(se,F,V),ge.length>0&&Ke(ge,F,V),H.buffers.depth.setTest(!0),H.buffers.depth.setMask(!0),H.buffers.color.setMask(!0),H.setPolygonOffset(!1)}function Nt(R,F,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new ns(1,1,{generateMipmaps:!0,type:Ne.has("EXT_color_buffer_half_float")||Ne.has("EXT_color_buffer_float")?$a:$i,minFilter:Wr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ft.workingColorSpace}));const se=p.state.transmissionRenderTarget[W.id],ge=W.viewport||x;se.setSize(ge.z,ge.w);const ue=y.getRenderTarget();y.setRenderTarget(se),y.getClearColor(L),U=y.getClearAlpha(),U<1&&y.setClearColor(16777215,.5),y.clear(),Ve&&ye.render(V);const he=y.toneMapping;y.toneMapping=_r;const Ae=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),$===!0&&ne.setGlobalState(y.clippingPlanes,W),Ke(R,V,W),D.updateMultisampleRenderTarget(se),D.updateRenderTargetMipmap(se),Ne.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let we=0,ot=F.length;we<ot;we++){const rt=F[we],gt=rt.object,jt=rt.geometry,Qe=rt.material,Pe=rt.group;if(Qe.side===Hi&&gt.layers.test(W.layers)){const tn=Qe.side;Qe.side=kn,Qe.needsUpdate=!0,At(gt,V,W,jt,Qe,Pe),Qe.side=tn,Qe.needsUpdate=!0,Ie=!0}}Ie===!0&&(D.updateMultisampleRenderTarget(se),D.updateRenderTargetMipmap(se))}y.setRenderTarget(ue),y.setClearColor(L,U),Ae!==void 0&&(W.viewport=Ae),y.toneMapping=he}function Ke(R,F,V){const W=F.isScene===!0?F.overrideMaterial:null;for(let O=0,se=R.length;O<se;O++){const ge=R[O],ue=ge.object,he=ge.geometry,Ae=W===null?ge.material:W,Ie=ge.group;ue.layers.test(V.layers)&&At(ue,F,V,he,Ae,Ie)}}function At(R,F,V,W,O,se){R.onBeforeRender(y,F,V,W,O,se),R.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),O.onBeforeRender(y,F,V,W,R,se),O.transparent===!0&&O.side===Hi&&O.forceSinglePass===!1?(O.side=kn,O.needsUpdate=!0,y.renderBufferDirect(V,F,W,O,R,se),O.side=Mr,O.needsUpdate=!0,y.renderBufferDirect(V,F,W,O,R,se),O.side=Hi):y.renderBufferDirect(V,F,W,O,R,se),R.onAfterRender(y,F,V,W,O,se)}function Ot(R,F,V){F.isScene!==!0&&(F=We);const W=De.get(R),O=p.state.lights,se=p.state.shadowsArray,ge=O.state.version,ue=xe.getParameters(R,O.state,se,F,V),he=xe.getProgramCacheKey(ue);let Ae=W.programs;W.environment=R.isMeshStandardMaterial?F.environment:null,W.fog=F.fog,W.envMap=(R.isMeshStandardMaterial?q:T).get(R.envMap||W.environment),W.envMapRotation=W.environment!==null&&R.envMap===null?F.environmentRotation:R.envMapRotation,Ae===void 0&&(R.addEventListener("dispose",$e),Ae=new Map,W.programs=Ae);let Ie=Ae.get(he);if(Ie!==void 0){if(W.currentProgram===Ie&&W.lightsStateVersion===ge)return yt(R,ue),Ie}else ue.uniforms=xe.getUniforms(R),R.onBeforeCompile(ue,y),Ie=xe.acquireProgram(ue,he),Ae.set(he,Ie),W.uniforms=ue.uniforms;const we=W.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(we.clippingPlanes=ne.uniform),yt(R,ue),W.needsLights=wt(R),W.lightsStateVersion=ge,W.needsLights&&(we.ambientLightColor.value=O.state.ambient,we.lightProbe.value=O.state.probe,we.directionalLights.value=O.state.directional,we.directionalLightShadows.value=O.state.directionalShadow,we.spotLights.value=O.state.spot,we.spotLightShadows.value=O.state.spotShadow,we.rectAreaLights.value=O.state.rectArea,we.ltc_1.value=O.state.rectAreaLTC1,we.ltc_2.value=O.state.rectAreaLTC2,we.pointLights.value=O.state.point,we.pointLightShadows.value=O.state.pointShadow,we.hemisphereLights.value=O.state.hemi,we.directionalShadowMap.value=O.state.directionalShadowMap,we.directionalShadowMatrix.value=O.state.directionalShadowMatrix,we.spotShadowMap.value=O.state.spotShadowMap,we.spotLightMatrix.value=O.state.spotLightMatrix,we.spotLightMap.value=O.state.spotLightMap,we.pointShadowMap.value=O.state.pointShadowMap,we.pointShadowMatrix.value=O.state.pointShadowMatrix),W.currentProgram=Ie,W.uniformsList=null,Ie}function Mt(R){if(R.uniformsList===null){const F=R.currentProgram.getUniforms();R.uniformsList=nl.seqWithValue(F.seq,R.uniforms)}return R.uniformsList}function yt(R,F){const V=De.get(R);V.outputColorSpace=F.outputColorSpace,V.batching=F.batching,V.batchingColor=F.batchingColor,V.instancing=F.instancing,V.instancingColor=F.instancingColor,V.instancingMorph=F.instancingMorph,V.skinning=F.skinning,V.morphTargets=F.morphTargets,V.morphNormals=F.morphNormals,V.morphColors=F.morphColors,V.morphTargetsCount=F.morphTargetsCount,V.numClippingPlanes=F.numClippingPlanes,V.numIntersection=F.numClipIntersection,V.vertexAlphas=F.vertexAlphas,V.vertexTangents=F.vertexTangents,V.toneMapping=F.toneMapping}function pt(R,F,V,W,O){F.isScene!==!0&&(F=We),D.resetTextureUnits();const se=F.fog,ge=W.isMeshStandardMaterial?F.environment:null,ue=b===null?y.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:Er,he=(W.isMeshStandardMaterial?q:T).get(W.envMap||ge),Ae=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Ie=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),we=!!V.morphAttributes.position,ot=!!V.morphAttributes.normal,rt=!!V.morphAttributes.color;let gt=_r;W.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(gt=y.toneMapping);const jt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Qe=jt!==void 0?jt.length:0,Pe=De.get(W),tn=p.state.lights;if($===!0&&(Q===!0||R!==C)){const Jn=R===C&&W.id===A;ne.setState(W,R,Jn)}let ut=!1;W.version===Pe.__version?(Pe.needsLights&&Pe.lightsStateVersion!==tn.state.version||Pe.outputColorSpace!==ue||O.isBatchedMesh&&Pe.batching===!1||!O.isBatchedMesh&&Pe.batching===!0||O.isBatchedMesh&&Pe.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Pe.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Pe.instancing===!1||!O.isInstancedMesh&&Pe.instancing===!0||O.isSkinnedMesh&&Pe.skinning===!1||!O.isSkinnedMesh&&Pe.skinning===!0||O.isInstancedMesh&&Pe.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Pe.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Pe.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Pe.instancingMorph===!1&&O.morphTexture!==null||Pe.envMap!==he||W.fog===!0&&Pe.fog!==se||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==ne.numPlanes||Pe.numIntersection!==ne.numIntersection)||Pe.vertexAlphas!==Ae||Pe.vertexTangents!==Ie||Pe.morphTargets!==we||Pe.morphNormals!==ot||Pe.morphColors!==rt||Pe.toneMapping!==gt||Pe.morphTargetsCount!==Qe)&&(ut=!0):(ut=!0,Pe.__version=W.version);let ci=Pe.currentProgram;ut===!0&&(ci=Ot(W,F,O));let as=!1,On=!1,Ul=!1;const Ft=ci.getUniforms(),ji=Pe.uniforms;if(H.useProgram(ci.program)&&(as=!0,On=!0,Ul=!0),W.id!==A&&(A=W.id,On=!0),as||C!==R){ze.reverseDepthBuffer?(de.copy(R.projectionMatrix),Pv(de),Dv(de),Ft.setValue(I,"projectionMatrix",de)):Ft.setValue(I,"projectionMatrix",R.projectionMatrix),Ft.setValue(I,"viewMatrix",R.matrixWorldInverse);const Jn=Ft.map.cameraPosition;Jn!==void 0&&Jn.setValue(I,Ee.setFromMatrixPosition(R.matrixWorld)),ze.logarithmicDepthBuffer&&Ft.setValue(I,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Ft.setValue(I,"isOrthographic",R.isOrthographicCamera===!0),C!==R&&(C=R,On=!0,Ul=!0)}if(O.isSkinnedMesh){Ft.setOptional(I,O,"bindMatrix"),Ft.setOptional(I,O,"bindMatrixInverse");const Jn=O.skeleton;Jn&&(Jn.boneTexture===null&&Jn.computeBoneTexture(),Ft.setValue(I,"boneTexture",Jn.boneTexture,D))}O.isBatchedMesh&&(Ft.setOptional(I,O,"batchingTexture"),Ft.setValue(I,"batchingTexture",O._matricesTexture,D),Ft.setOptional(I,O,"batchingIdTexture"),Ft.setValue(I,"batchingIdTexture",O._indirectTexture,D),Ft.setOptional(I,O,"batchingColorTexture"),O._colorsTexture!==null&&Ft.setValue(I,"batchingColorTexture",O._colorsTexture,D));const Nl=V.morphAttributes;if((Nl.position!==void 0||Nl.normal!==void 0||Nl.color!==void 0)&&ke.update(O,V,ci),(On||Pe.receiveShadow!==O.receiveShadow)&&(Pe.receiveShadow=O.receiveShadow,Ft.setValue(I,"receiveShadow",O.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(ji.envMap.value=he,ji.flipEnvMap.value=he.isCubeTexture&&he.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&F.environment!==null&&(ji.envMapIntensity.value=F.environmentIntensity),On&&(Ft.setValue(I,"toneMappingExposure",y.toneMappingExposure),Pe.needsLights&&Nn(ji,Ul),se&&W.fog===!0&&ie.refreshFogUniforms(ji,se),ie.refreshMaterialUniforms(ji,W,G,B,p.state.transmissionRenderTarget[R.id]),nl.upload(I,Mt(Pe),ji,D)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(nl.upload(I,Mt(Pe),ji,D),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Ft.setValue(I,"center",O.center),Ft.setValue(I,"modelViewMatrix",O.modelViewMatrix),Ft.setValue(I,"normalMatrix",O.normalMatrix),Ft.setValue(I,"modelMatrix",O.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Jn=W.uniformsGroups;for(let Ol=0,Gm=Jn.length;Ol<Gm;Ol++){const Ou=Jn[Ol];N.update(Ou,ci),N.bind(Ou,ci)}}return ci}function Nn(R,F){R.ambientLightColor.needsUpdate=F,R.lightProbe.needsUpdate=F,R.directionalLights.needsUpdate=F,R.directionalLightShadows.needsUpdate=F,R.pointLights.needsUpdate=F,R.pointLightShadows.needsUpdate=F,R.spotLights.needsUpdate=F,R.spotLightShadows.needsUpdate=F,R.rectAreaLights.needsUpdate=F,R.hemisphereLights.needsUpdate=F}function wt(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(R,F,V){De.get(R.texture).__webglTexture=F,De.get(R.depthTexture).__webglTexture=V;const W=De.get(R);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||Ne.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,F){const V=De.get(R);V.__webglFramebuffer=F,V.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(R,F=0,V=0){b=R,E=F,w=V;let W=!0,O=null,se=!1,ge=!1;if(R){const he=De.get(R);if(he.__useDefaultFramebuffer!==void 0)H.bindFramebuffer(I.FRAMEBUFFER,null),W=!1;else if(he.__webglFramebuffer===void 0)D.setupRenderTarget(R);else if(he.__hasExternalTextures)D.rebindTextures(R,De.get(R.texture).__webglTexture,De.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const we=R.depthTexture;if(he.__boundDepthTexture!==we){if(we!==null&&De.has(we)&&(R.width!==we.image.width||R.height!==we.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(R)}}const Ae=R.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(ge=!0);const Ie=De.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Ie[F])?O=Ie[F][V]:O=Ie[F],se=!0):R.samples>0&&D.useMultisampledRTT(R)===!1?O=De.get(R).__webglMultisampledFramebuffer:Array.isArray(Ie)?O=Ie[V]:O=Ie,x.copy(R.viewport),M.copy(R.scissor),P=R.scissorTest}else x.copy(k).multiplyScalar(G).floor(),M.copy(oe).multiplyScalar(G).floor(),P=Be;if(H.bindFramebuffer(I.FRAMEBUFFER,O)&&W&&H.drawBuffers(R,O),H.viewport(x),H.scissor(M),H.setScissorTest(P),se){const he=De.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+F,he.__webglTexture,V)}else if(ge){const he=De.get(R.texture),Ae=F||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,he.__webglTexture,V||0,Ae)}A=-1},this.readRenderTargetPixels=function(R,F,V,W,O,se,ge){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=De.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ge!==void 0&&(ue=ue[ge]),ue){H.bindFramebuffer(I.FRAMEBUFFER,ue);try{const he=R.texture,Ae=he.format,Ie=he.type;if(!ze.textureFormatReadable(Ae)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ze.textureTypeReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=R.width-W&&V>=0&&V<=R.height-O&&I.readPixels(F,V,W,O,Oe.convert(Ae),Oe.convert(Ie),se)}finally{const he=b!==null?De.get(b).__webglFramebuffer:null;H.bindFramebuffer(I.FRAMEBUFFER,he)}}},this.readRenderTargetPixelsAsync=async function(R,F,V,W,O,se,ge){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=De.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ge!==void 0&&(ue=ue[ge]),ue){const he=R.texture,Ae=he.format,Ie=he.type;if(!ze.textureFormatReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ze.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=R.width-W&&V>=0&&V<=R.height-O){H.bindFramebuffer(I.FRAMEBUFFER,ue);const we=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,we),I.bufferData(I.PIXEL_PACK_BUFFER,se.byteLength,I.STREAM_READ),I.readPixels(F,V,W,O,Oe.convert(Ae),Oe.convert(Ie),0);const ot=b!==null?De.get(b).__webglFramebuffer:null;H.bindFramebuffer(I.FRAMEBUFFER,ot);const rt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Cv(I,rt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,we),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,se),I.deleteBuffer(we),I.deleteSync(rt),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,F=null,V=0){R.isTexture!==!0&&(tl("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,R=arguments[1]);const W=Math.pow(2,-V),O=Math.floor(R.image.width*W),se=Math.floor(R.image.height*W),ge=F!==null?F.x:0,ue=F!==null?F.y:0;D.setTexture2D(R,0),I.copyTexSubImage2D(I.TEXTURE_2D,V,0,0,ge,ue,O,se),H.unbindTexture()},this.copyTextureToTexture=function(R,F,V=null,W=null,O=0){R.isTexture!==!0&&(tl("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,R=arguments[1],F=arguments[2],O=arguments[3]||0,V=null);let se,ge,ue,he,Ae,Ie;V!==null?(se=V.max.x-V.min.x,ge=V.max.y-V.min.y,ue=V.min.x,he=V.min.y):(se=R.image.width,ge=R.image.height,ue=0,he=0),W!==null?(Ae=W.x,Ie=W.y):(Ae=0,Ie=0);const we=Oe.convert(F.format),ot=Oe.convert(F.type);D.setTexture2D(F,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,F.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,F.unpackAlignment);const rt=I.getParameter(I.UNPACK_ROW_LENGTH),gt=I.getParameter(I.UNPACK_IMAGE_HEIGHT),jt=I.getParameter(I.UNPACK_SKIP_PIXELS),Qe=I.getParameter(I.UNPACK_SKIP_ROWS),Pe=I.getParameter(I.UNPACK_SKIP_IMAGES),tn=R.isCompressedTexture?R.mipmaps[O]:R.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,tn.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,tn.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,ue),I.pixelStorei(I.UNPACK_SKIP_ROWS,he),R.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,O,Ae,Ie,se,ge,we,ot,tn.data):R.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,O,Ae,Ie,tn.width,tn.height,we,tn.data):I.texSubImage2D(I.TEXTURE_2D,O,Ae,Ie,se,ge,we,ot,tn),I.pixelStorei(I.UNPACK_ROW_LENGTH,rt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,gt),I.pixelStorei(I.UNPACK_SKIP_PIXELS,jt),I.pixelStorei(I.UNPACK_SKIP_ROWS,Qe),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Pe),O===0&&F.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),H.unbindTexture()},this.copyTextureToTexture3D=function(R,F,V=null,W=null,O=0){R.isTexture!==!0&&(tl("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,W=arguments[1]||null,R=arguments[2],F=arguments[3],O=arguments[4]||0);let se,ge,ue,he,Ae,Ie,we,ot,rt;const gt=R.isCompressedTexture?R.mipmaps[O]:R.image;V!==null?(se=V.max.x-V.min.x,ge=V.max.y-V.min.y,ue=V.max.z-V.min.z,he=V.min.x,Ae=V.min.y,Ie=V.min.z):(se=gt.width,ge=gt.height,ue=gt.depth,he=0,Ae=0,Ie=0),W!==null?(we=W.x,ot=W.y,rt=W.z):(we=0,ot=0,rt=0);const jt=Oe.convert(F.format),Qe=Oe.convert(F.type);let Pe;if(F.isData3DTexture)D.setTexture3D(F,0),Pe=I.TEXTURE_3D;else if(F.isDataArrayTexture||F.isCompressedArrayTexture)D.setTexture2DArray(F,0),Pe=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,F.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,F.unpackAlignment);const tn=I.getParameter(I.UNPACK_ROW_LENGTH),ut=I.getParameter(I.UNPACK_IMAGE_HEIGHT),ci=I.getParameter(I.UNPACK_SKIP_PIXELS),as=I.getParameter(I.UNPACK_SKIP_ROWS),On=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,gt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,gt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,he),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ae),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ie),R.isDataTexture||R.isData3DTexture?I.texSubImage3D(Pe,O,we,ot,rt,se,ge,ue,jt,Qe,gt.data):F.isCompressedArrayTexture?I.compressedTexSubImage3D(Pe,O,we,ot,rt,se,ge,ue,jt,gt.data):I.texSubImage3D(Pe,O,we,ot,rt,se,ge,ue,jt,Qe,gt),I.pixelStorei(I.UNPACK_ROW_LENGTH,tn),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ut),I.pixelStorei(I.UNPACK_SKIP_PIXELS,ci),I.pixelStorei(I.UNPACK_SKIP_ROWS,as),I.pixelStorei(I.UNPACK_SKIP_IMAGES,On),O===0&&F.generateMipmaps&&I.generateMipmap(Pe),H.unbindTexture()},this.initRenderTarget=function(R){De.get(R).__webglFramebuffer===void 0&&D.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?D.setTextureCube(R,0):R.isData3DTexture?D.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?D.setTexture2DArray(R,0):D.setTexture2D(R,0),H.unbindTexture()},this.resetState=function(){E=0,w=0,b=null,H.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Eu?"display-p3":"srgb",t.unpackColorSpace=ft.workingColorSpace===Rl?"display-p3":"srgb"}}class kl{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ht(e),this.density=t}clone(){return new kl(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Im extends bn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ki,this.environmentIntensity=1,this.environmentRotation=new Ki,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Ru extends ta{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const yl=new z,xl=new z,vf=new It,fa=new Cl,ko=new Za,Rc=new z,yf=new z;class Um extends bn{constructor(e=new dn,t=new Ru){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)yl.fromBufferAttribute(t,i-1),xl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=yl.distanceTo(xl);e.setAttribute("lineDistance",new Ut(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ko.copy(n.boundingSphere),ko.applyMatrix4(i),ko.radius+=s,e.ray.intersectsSphere(ko)===!1)return;vf.copy(i).invert(),fa.copy(e.ray).applyMatrix4(vf);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let v=f,p=_-1;v<p;v+=c){const m=h.getX(v),g=h.getX(v+1),y=Io(this,e,fa,l,m,g);y&&t.push(y)}if(this.isLineLoop){const v=h.getX(_-1),p=h.getX(f),m=Io(this,e,fa,l,v,p);m&&t.push(m)}}else{const f=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let v=f,p=_-1;v<p;v+=c){const m=Io(this,e,fa,l,v,v+1);m&&t.push(m)}if(this.isLineLoop){const v=Io(this,e,fa,l,_-1,f);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Io(r,e,t,n,i,s){const a=r.geometry.attributes.position;if(yl.fromBufferAttribute(a,i),xl.fromBufferAttribute(a,s),t.distanceSqToSegment(yl,xl,Rc,yf)>n)return;Rc.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(Rc);if(!(l<e.near||l>e.far))return{distance:l,point:yf.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}const xf=new z,bf=new z;class GS extends Um{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)xf.fromBufferAttribute(t,i),bf.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+xf.distanceTo(bf);e.setAttribute("lineDistance",new Ut(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Nm extends ta{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ht(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Sf=new It,Gh=new Cl,Uo=new Za,No=new z;class VS extends bn{constructor(e=new dn,t=new Nm){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Uo.copy(n.boundingSphere),Uo.applyMatrix4(i),Uo.radius+=s,e.ray.intersectsSphere(Uo)===!1)return;Sf.copy(i).invert(),Gh.copy(e.ray).applyMatrix4(Sf);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let _=u,v=f;_<v;_++){const p=c.getX(_);No.fromBufferAttribute(d,p),Mf(No,p,l,i,e,t,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let _=u,v=f;_<v;_++)No.fromBufferAttribute(d,_),Mf(No,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Mf(r,e,t,n,i,s,a){const o=Gh.distanceSqToPoint(r);if(o<t){const l=new z;Gh.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Cu extends dn{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],d=[],u=[],f=[];let _=0;const v=[],p=n/2;let m=0;g(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Ut(d,3)),this.setAttribute("normal",new Ut(u,3)),this.setAttribute("uv",new Ut(f,2));function g(){const S=new z,E=new z;let w=0;const b=(t-e)/n;for(let A=0;A<=s;A++){const C=[],x=A/s,M=x*(t-e)+e;for(let P=0;P<=i;P++){const L=P/i,U=L*l+o,X=Math.sin(U),B=Math.cos(U);E.x=M*X,E.y=-x*n+p,E.z=M*B,d.push(E.x,E.y,E.z),S.set(X,b,B).normalize(),u.push(S.x,S.y,S.z),f.push(L,1-x),C.push(_++)}v.push(C)}for(let A=0;A<i;A++)for(let C=0;C<s;C++){const x=v[C][A],M=v[C+1][A],P=v[C+1][A+1],L=v[C][A+1];e>0&&(h.push(x,M,L),w+=3),t>0&&(h.push(M,P,L),w+=3)}c.addGroup(m,w,0),m+=w}function y(S){const E=_,w=new Xe,b=new z;let A=0;const C=S===!0?e:t,x=S===!0?1:-1;for(let P=1;P<=i;P++)d.push(0,p*x,0),u.push(0,x,0),f.push(.5,.5),_++;const M=_;for(let P=0;P<=i;P++){const U=P/i*l+o,X=Math.cos(U),B=Math.sin(U);b.x=C*B,b.y=p*x,b.z=C*X,d.push(b.x,b.y,b.z),u.push(0,x,0),w.x=X*.5+.5,w.y=B*.5*x+.5,f.push(w.x,w.y),_++}for(let P=0;P<i;P++){const L=E+P,U=M+P;S===!0?h.push(U,U+1,L):h.push(U+1,U,L),A+=3}c.addGroup(m,A,S===!0?1:2),m+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cu(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Pu extends dn{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],a=[];o(i),c(n),h(),this.setAttribute("position",new Ut(s,3)),this.setAttribute("normal",new Ut(s.slice(),3)),this.setAttribute("uv",new Ut(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(g){const y=new z,S=new z,E=new z;for(let w=0;w<t.length;w+=3)f(t[w+0],y),f(t[w+1],S),f(t[w+2],E),l(y,S,E,g)}function l(g,y,S,E){const w=E+1,b=[];for(let A=0;A<=w;A++){b[A]=[];const C=g.clone().lerp(S,A/w),x=y.clone().lerp(S,A/w),M=w-A;for(let P=0;P<=M;P++)P===0&&A===w?b[A][P]=C:b[A][P]=C.clone().lerp(x,P/M)}for(let A=0;A<w;A++)for(let C=0;C<2*(w-A)-1;C++){const x=Math.floor(C/2);C%2===0?(u(b[A][x+1]),u(b[A+1][x]),u(b[A][x])):(u(b[A][x+1]),u(b[A+1][x+1]),u(b[A+1][x]))}}function c(g){const y=new z;for(let S=0;S<s.length;S+=3)y.x=s[S+0],y.y=s[S+1],y.z=s[S+2],y.normalize().multiplyScalar(g),s[S+0]=y.x,s[S+1]=y.y,s[S+2]=y.z}function h(){const g=new z;for(let y=0;y<s.length;y+=3){g.x=s[y+0],g.y=s[y+1],g.z=s[y+2];const S=p(g)/2/Math.PI+.5,E=m(g)/Math.PI+.5;a.push(S,1-E)}_(),d()}function d(){for(let g=0;g<a.length;g+=6){const y=a[g+0],S=a[g+2],E=a[g+4],w=Math.max(y,S,E),b=Math.min(y,S,E);w>.9&&b<.1&&(y<.2&&(a[g+0]+=1),S<.2&&(a[g+2]+=1),E<.2&&(a[g+4]+=1))}}function u(g){s.push(g.x,g.y,g.z)}function f(g,y){const S=g*3;y.x=e[S+0],y.y=e[S+1],y.z=e[S+2]}function _(){const g=new z,y=new z,S=new z,E=new z,w=new Xe,b=new Xe,A=new Xe;for(let C=0,x=0;C<s.length;C+=9,x+=6){g.set(s[C+0],s[C+1],s[C+2]),y.set(s[C+3],s[C+4],s[C+5]),S.set(s[C+6],s[C+7],s[C+8]),w.set(a[x+0],a[x+1]),b.set(a[x+2],a[x+3]),A.set(a[x+4],a[x+5]),E.copy(g).add(y).add(S).divideScalar(3);const M=p(E);v(w,x+0,g,M),v(b,x+2,y,M),v(A,x+4,S,M)}}function v(g,y,S,E){E<0&&g.x===1&&(a[y]=g.x-1),S.x===0&&S.z===0&&(a[y]=E/2/Math.PI+.5)}function p(g){return Math.atan2(g.z,-g.x)}function m(g){return Math.atan2(-g.y,Math.sqrt(g.x*g.x+g.z*g.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pu(e.vertices,e.indices,e.radius,e.details)}}const Oo=new z,Fo=new z,Cc=new z,Bo=new ii;class WS extends dn{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),s=Math.cos(Ia*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let _=0;_<l;_+=3){a?(c[0]=a.getX(_),c[1]=a.getX(_+1),c[2]=a.getX(_+2)):(c[0]=_,c[1]=_+1,c[2]=_+2);const{a:v,b:p,c:m}=Bo;if(v.fromBufferAttribute(o,c[0]),p.fromBufferAttribute(o,c[1]),m.fromBufferAttribute(o,c[2]),Bo.getNormal(Cc),d[0]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,d[1]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,d[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let g=0;g<3;g++){const y=(g+1)%3,S=d[g],E=d[y],w=Bo[h[g]],b=Bo[h[y]],A=`${S}_${E}`,C=`${E}_${S}`;C in u&&u[C]?(Cc.dot(u[C].normal)<=s&&(f.push(w.x,w.y,w.z),f.push(b.x,b.y,b.z)),u[C]=null):A in u||(u[A]={index0:c[g],index1:c[y],normal:Cc.clone()})}}for(const _ in u)if(u[_]){const{index0:v,index1:p}=u[_];Oo.fromBufferAttribute(o,v),Fo.fromBufferAttribute(o,p),f.push(Oo.x,Oo.y,Oo.z),f.push(Fo.x,Fo.y,Fo.z)}this.setAttribute("position",new Ut(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Du extends Pu{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Du(e.radius,e.detail)}}class Lu extends dn{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new z,u=new z,f=[],_=[],v=[],p=[];for(let m=0;m<=n;m++){const g=[],y=m/n;let S=0;m===0&&a===0?S=.5/t:m===n&&l===Math.PI&&(S=-.5/t);for(let E=0;E<=t;E++){const w=E/t;d.x=-e*Math.cos(i+w*s)*Math.sin(a+y*o),d.y=e*Math.cos(a+y*o),d.z=e*Math.sin(i+w*s)*Math.sin(a+y*o),_.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),p.push(w+S,1-y),g.push(c++)}h.push(g)}for(let m=0;m<n;m++)for(let g=0;g<t;g++){const y=h[m][g+1],S=h[m][g],E=h[m+1][g],w=h[m+1][g+1];(m!==0||a>0)&&f.push(y,S,w),(m!==n-1||l<Math.PI)&&f.push(S,E,w)}this.setIndex(f),this.setAttribute("position",new Ut(_,3)),this.setAttribute("normal",new Ut(v,3)),this.setAttribute("uv",new Ut(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lu(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class bl extends dn{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],c=[],h=new z,d=new z,u=new z;for(let f=0;f<=n;f++)for(let _=0;_<=i;_++){const v=_/i*s,p=f/n*Math.PI*2;d.x=(e+t*Math.cos(p))*Math.cos(v),d.y=(e+t*Math.cos(p))*Math.sin(v),d.z=t*Math.sin(p),o.push(d.x,d.y,d.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(_/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let _=1;_<=i;_++){const v=(i+1)*f+_-1,p=(i+1)*(f-1)+_-1,m=(i+1)*(f-1)+_,g=(i+1)*f+_;a.push(v,p,g),a.push(p,m,g)}this.setIndex(a),this.setAttribute("position",new Ut(o,3)),this.setAttribute("normal",new Ut(l,3)),this.setAttribute("uv",new Ut(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bl(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class XS{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=wf(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=wf();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function wf(){return performance.now()}class Tf{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(yn(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class YS extends ss{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:yu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=yu);function qS(r){if(!r)return;const e=matchMedia("(prefers-reduced-motion: reduce)").matches,t=new km({canvas:r,antialias:!0,alpha:!0});t.setPixelRatio(Math.min(devicePixelRatio,2));const n=new Im;n.fog=new kl(461068,.055);const i=new Wn(60,1,.1,100);i.position.set(0,2.2,14);const s=1400,a=new Float32Array(s*3),o=42;for(let b=0;b<s;b++)a[b*3]=(Math.random()-.5)*o,a[b*3+1]=(Math.random()-.5)*16,a[b*3+2]=-Math.random()*46;const l=new dn;l.setAttribute("position",new vi(a,3));const c=new VS(l,new Nm({color:10465988,size:.06,transparent:!0,opacity:.5,depthWrite:!1}));n.add(c);const h=new z(0,-1.4,8),d=52;function u(b,A,C){const x=b*Math.PI/180,M=new z(Math.sin(x),.02,-Math.cos(x)).normalize(),P=[];for(let X=0;X<=1;X+=.02)P.push(h.clone().add(M.clone().multiplyScalar(d*X)));const L=new dn().setFromPoints(P),U=new Ru({color:A,transparent:!0,opacity:C});return new Um(L,U)}const f=u(0,15251531,.9),_=u(1,7312308,.42);n.add(f,_);const v=new _i(new Lu(.12,16,16),new Pl({color:15251531}));v.position.copy(h),n.add(v);const p={x:0,y:0},m={x:0,y:0};window.addEventListener("pointermove",b=>{p.x=b.clientX/innerWidth-.5,p.y=b.clientY/innerHeight-.5});function g(){const b=r.clientWidth||innerWidth,A=r.clientHeight||innerHeight;t.setSize(b,A,!1),i.aspect=b/A,i.updateProjectionMatrix()}g(),window.addEventListener("resize",g);let y;const S=new XS;function E(){const b=S.getElapsedTime();m.x+=(p.x-m.x)*.04,m.y+=(p.y-m.y)*.04,i.position.x=m.x*3,i.position.y=2.2-m.y*1.5,i.lookAt(0,.4,-6);const A=l.attributes.position.array;for(let C=0;C<s;C++)A[C*3+2]+=.02,A[C*3+2]>12&&(A[C*3+2]=-46);l.attributes.position.needsUpdate=!0,c.rotation.z=Math.sin(b*.05)*.03,v.scale.setScalar(1+Math.sin(b*2.4)*.25),t.render(n,i),y=requestAnimationFrame(E)}e?t.render(n,i):E(),e||St.fromTo(_.material,{opacity:0},{opacity:.42,duration:3,delay:1.2,ease:"power2.out"}),new IntersectionObserver(b=>{b.forEach(A=>{A.isIntersecting?!y&&!e&&E():y&&(cancelAnimationFrame(y),y=null)})},{threshold:.01}).observe(r)}function Il(r,e){const t=r.getContext("2d"),n={ctx:t,w:0,h:0,dpr:Math.min(devicePixelRatio||1,2)};function i(s){const a=r.parentElement.getBoundingClientRect();n.w=a.width,n.h=a.height,r.width=Math.round(a.width*n.dpr),r.height=Math.round(a.height*n.dpr),r.style.width=a.width+"px",r.style.height=a.height+"px",t.setTransform(n.dpr,0,0,n.dpr,0,0),!s&&e&&e(n)}return i(!0),window.addEventListener("resize",()=>i(!1)),n}function ku(r,e,t){Fe.create({trigger:r,start:"top 78%",end:"bottom 40%",scrub:.6,onUpdate:n=>{const i=n.progress;if(t(i),e&&e.length){const s=Math.min(e.length-1,Math.floor(i*e.length));e.forEach((a,o)=>a.classList.toggle("is-active",o===s))}}})}const Sl=(r,e,t)=>r+(e-r)*t,vr=(r,e,t)=>Math.max(e,Math.min(t,r));function Bi(r,e,t){return vr((r-e)/(t-e),0,1)}function dr(r){return 1-Math.pow(1-r,3)}function $S(r){if(!r)return;const e=r.querySelector("#latency-canvas"),t=Array.from(r.querySelectorAll(".viz-step")),n="#e8b84b",i="#c8563f",s="#6f93b4",a="#a7a599",o="rgba(233,230,221,0.10)";let l,c=0;const h={east:[.86,.5],ardennes:[.54,.4],sedan:[.44,.52],coast:[.16,.26],belgium:[.74,.18],allied:[.3,.6],paris:[.46,.8]},d=g=>[g[0]*l.w,g[1]*l.h];function u(){const{ctx:g,w:y,h:S}=l;g.strokeStyle=o,g.lineWidth=1;for(let E=0;E<=y;E+=y/12)g.beginPath(),g.moveTo(E,0),g.lineTo(E,S),g.stroke();for(let E=0;E<=S;E+=S/9)g.beginPath(),g.moveTo(0,E),g.lineTo(y,E),g.stroke()}function f(g,y,S,E=3){const{ctx:w}=l,[b,A]=d(g);w.fillStyle=S,w.beginPath(),w.arc(b,A,E,0,7),w.fill(),y&&(w.fillStyle=a,w.font='9px "Space Mono", monospace',w.fillText(y,b+7,A+3))}function _(g,y,S,E,w){const{ctx:b}=l,A=g.map(d);let C=0;const x=[];for(let L=1;L<A.length;L++){const U=Math.hypot(A[L][0]-A[L-1][0],A[L][1]-A[L-1][1]);x.push(U),C+=U}let M=C*y;b.strokeStyle=S,b.lineWidth=E,b.lineCap="round",b.lineJoin="round",b.setLineDash([]),b.beginPath(),b.moveTo(A[0][0],A[0][1]);let P=A[0];for(let L=1;L<A.length&&!(M<=0);L++){const U=x[L-1];if(M>=U)b.lineTo(A[L][0],A[L][1]),P=A[L],M-=U;else{const X=M/U,B=Sl(A[L-1][0],A[L][0],X),G=Sl(A[L-1][1],A[L][1],X);b.lineTo(B,G),P=[B,G],M=0}}return b.stroke(),b.setLineDash([]),P}function v(g,y,S,E=7){const{ctx:w}=l,b=Math.atan2(y[1],y[0]);w.fillStyle=S,w.beginPath(),w.moveTo(g[0],g[1]),w.lineTo(g[0]-E*Math.cos(b-.4),g[1]-E*Math.sin(b-.4)),w.lineTo(g[0]-E*Math.cos(b+.4),g[1]-E*Math.sin(b+.4)),w.closePath(),w.fill()}function p(g){const{ctx:y,w:S,h:E}=l;y.save(),y.globalAlpha=g;const w=S*.5,b=E*.3,A=S*.62,C=w-A/2;y.font='10px "Space Mono", monospace',[{y:b,label:"GERMAN LOOP · signal → action",frac:.22,color:n,ticks:1},{y:b+E*.24,label:"FRENCH LOOP · signal → authority → action",frac:1,color:s,ticks:5}].forEach(M=>{y.fillStyle=a,y.fillText(M.label,C,M.y-10),y.strokeStyle=o,y.lineWidth=8,y.lineCap="round",y.beginPath(),y.moveTo(C,M.y),y.lineTo(C+A,M.y),y.stroke(),y.strokeStyle=M.color,y.beginPath(),y.moveTo(C,M.y),y.lineTo(C+A*M.frac,M.y),y.stroke();for(let L=1;L<M.ticks;L++){const U=C+A*M.frac*(L/M.ticks);y.fillStyle="#07090c",y.beginPath(),y.arc(U,M.y,3,0,7),y.fill(),y.strokeStyle=M.color,y.lineWidth=1.5,y.beginPath(),y.arc(U,M.y,3,0,7),y.stroke(),y.lineWidth=8}const P=C+A*M.frac;y.fillStyle=M.color,y.beginPath(),y.arc(P,M.y,5,0,7),y.fill()}),y.fillStyle=n,y.font='italic 13px "Fraunces", serif',y.fillText("Strength arrives late.",C,b+E*.24+40),y.restore()}function m(){const{ctx:g,w:y,h:S}=l;g.clearRect(0,0,y,S);const E=1-Bi(c,.74,.92)*.72;g.save(),g.globalAlpha=E,u();const w=dr(Bi(c,.02,.22));if(w>0){g.save(),g.globalAlpha=E*w;const[M,P]=d(h.allied);g.strokeStyle=s,g.lineWidth=2,g.strokeRect(M-46,P+14,92,22),g.fillStyle=s,g.font='9px "Space Mono", monospace',g.fillText("CHAR B1 bis — 60mm armor",M-42,P+28),g.restore()}const b=Bi(c,.24,.5);if(b>0){const M=_([h.allied,[.52,.34],h.belgium],dr(b),s,5);v(M,[1,-.6],s,8),f(h.belgium,"BELGIUM",s)}const A=Bi(c,.3,.5);if(A>0){g.save(),g.globalAlpha=E*A;const[M,P]=d(h.ardennes);g.strokeStyle="rgba(200,86,63,0.5)",g.setLineDash([4,4]),g.lineWidth=1.5,g.beginPath(),g.arc(M,P,34,0,7),g.stroke(),g.setLineDash([]),g.fillStyle=i,g.font='9px "Space Mono", monospace',g.fillText('ARDENNES · "impassable"',M-30,P-40),g.restore()}const C=Bi(c,.5,.74);if(C>0){const M=_([h.east,h.ardennes,h.sedan,h.coast],dr(C),n,3.5);v(M,[-1,-.7],n,8),f(h.sedan,"SEDAN",n),f(h.coast,"ABBEVILLE",n),f(h.east,"",n,4)}f(h.paris,"PARIS",a,2.5),g.restore();const x=Bi(c,.74,1);x>0&&p(dr(x))}l=Il(e,m),m(),ku(r,t,g=>{c=g,m()})}function KS(r){if(!r)return;const e=r.querySelector("#yamato-canvas"),t=r.querySelector("#yamato-toggle"),n=Array.from(t.querySelectorAll(".toggle-opt")),i=Array.from(r.querySelectorAll(".viz-mode-copy")),s="#e8b84b",a="#6f93b4",o="#a7a599";let l;const c={m:0},h=matchMedia("(prefers-reduced-motion: reduce)").matches,d=[{k:"RADAR",sub:"sense",a:-Math.PI/2},{k:"FIRE CONTROL",sub:"compute",a:-Math.PI/2+2*Math.PI/5},{k:"CARRIER AIR",sub:"reach",a:-Math.PI/2+4*Math.PI/5},{k:"LOGISTICS",sub:"sustain",a:-Math.PI/2+6*Math.PI/5},{k:"COMMS",sub:"coordinate",a:-Math.PI/2+8*Math.PI/5}];function u(y,S,E,w){const{ctx:b}=l;b.save(),b.translate(y,S),b.scale(E,E),w>0&&(b.shadowColor=s,b.shadowBlur=26*w),b.fillStyle="#c9c4b6",b.beginPath(),b.moveTo(-58,0),b.quadraticCurveTo(-58,7,-40,8),b.lineTo(46,8),b.quadraticCurveTo(64,6,72,0),b.lineTo(46,-4),b.lineTo(-40,-4),b.quadraticCurveTo(-58,-4,-58,0),b.closePath(),b.fill(),b.fillStyle="#8f8a7d",b.fillRect(-6,-18,12,14),b.fillRect(-30,-9,12,6),b.fillRect(18,-9,12,6),b.fillStyle="#726d61",b.fillRect(-2,-30,4,14),b.restore()}let f=0,_=null,v=0;function p(){const{ctx:y,w:S,h:E}=l;f+=.016,y.clearRect(0,0,S,E);const w=S/2,b=E/2,A=c.m,C=1-vr(A*1.4,0,1);if(C>.001){y.save(),y.globalAlpha=C,y.strokeStyle="rgba(233,230,221,0.10)",y.setLineDash([5,8]),y.beginPath(),y.arc(w,b,Math.min(S,E)*.42,0,7),y.stroke(),y.setLineDash([]);const M=f*.5,P=y.createLinearGradient(w,b,w+Math.cos(M)*200,b+Math.sin(M)*200);P.addColorStop(0,"rgba(232,184,75,0.28)"),P.addColorStop(1,"rgba(232,184,75,0)"),y.strokeStyle=P,y.lineWidth=2,y.beginPath(),y.moveTo(w,b),y.lineTo(w+Math.cos(M)*Math.min(S,E)*.42,b+Math.sin(M)*Math.min(S,E)*.42),y.stroke(),v=.3+Math.sin(f*.4)*.3,y.globalAlpha=C*vr(v,0,.5),u(w+Math.min(S,E)*.4,b,.5,0),y.globalAlpha=C,y.fillStyle=o,y.font='italic 12px "Fraunces", serif',y.textAlign="center",y.fillText("Kantai Kessen — the decisive duel that never came",w,E-22),y.textAlign="left",y.restore()}const x=vr((A-.2)*1.4,0,1);if(x>.001){y.save(),y.globalAlpha=x;const M=Math.min(S,E)*.36;d.forEach((P,L)=>{const U=w+Math.cos(P.a)*M,X=b+Math.sin(P.a)*M;if(y.strokeStyle="rgba(111,147,180,0.35)",y.lineWidth=1,y.beginPath(),y.moveTo(U,X),y.lineTo(w,b),y.stroke(),!h){const B=(f*.5+L*.2)%1,G=Sl(U,w,B),Y=Sl(X,b,B);y.fillStyle=s,y.beginPath(),y.arc(G,Y,2.2,0,7),y.fill()}y.fillStyle="#0e131b",y.strokeStyle=a,y.lineWidth=1.5,y.beginPath(),y.arc(U,X,5,0,7),y.fill(),y.stroke(),y.fillStyle=o,y.font='9px "Space Mono", monospace',y.textAlign="center",y.fillText(P.k,U,X-12),y.fillStyle="#6b6d6a",y.fillText(P.sub,U,X+18),y.textAlign="left"}),y.restore()}u(w,b,.92,x),x>.3&&(y.save(),y.globalAlpha=x,y.fillStyle=s,y.font='9px "Space Mono", monospace',y.textAlign="center",y.fillText("ACTUATOR",w,b+34),y.textAlign="left",y.restore()),_=requestAnimationFrame(p)}function m(y){n.forEach(S=>S.classList.toggle("is-active",S.dataset.mode===y)),i.forEach(S=>S.classList.toggle("is-hidden",S.dataset.mode!==y)),St.to(c,{m:y==="adapt"?1:0,duration:1,ease:"power3.inOut"})}n.forEach(y=>y.addEventListener("click",()=>m(y.dataset.mode))),l=Il(e),e.style.cursor="pointer",e.title="Open the Yamato dossier",e.addEventListener("click",()=>{window.__openDossier&&window.__openDossier("yamato")}),new IntersectionObserver(y=>y.forEach(S=>{S.isIntersecting?_||p():_&&(cancelAnimationFrame(_),_=null)}),{threshold:.05}).observe(e)}function jS(r){if(!r)return;const e=r.querySelector("#scoreboard-canvas"),t=Array.from(r.querySelectorAll(".viz-step")),n="#e8b84b",i="#6f93b4",s="#c8563f",a="#a7a599",o="rgba(233,230,221,0.09)";let l,c=0;const h=1940.2,d=1943.6;function u(g){const y=h+g*(d-h);if(y<1943.3)return .18+.62*(1-Math.exp(-2.4*g))+.05*Math.sin(y*7);const S=(y-1943.3)/(d-1943.3);return(.18+.62*(1-Math.exp(-2.4*((1943.3-h)/(d-h))))+.02)*(1-dr(vr(S*1.2,0,1))*.86)}function f(g){const S=(h+g*(d-h)-1941.6)*1.4;return .06+.86/(1+Math.exp(-S))}function _(g,y,S,E,w){const{ctx:b}=l,A=v.l,C=l.w-v.r,x=v.t,M=l.h-v.b;b.strokeStyle=S,b.lineWidth=E,b.lineJoin="round",w?b.setLineDash(w):b.setLineDash([]),b.beginPath();for(let P=0;P<=200;P++){const L=P/200*y,U=g(L),X=A+L*(C-A),B=M-U*(M-x);P===0?b.moveTo(X,B):b.lineTo(X,B)}b.stroke(),b.setLineDash([])}const v={l:46,r:20,t:28,b:34};function p(){let g=.5,y=9;for(let S=0;S<=200;S++){const E=S/200,w=Math.abs(f(E)-u(E));h+E*(d-h)<1943.3&&w<y&&(y=w,g=E)}return g}function m(){const{ctx:g,w:y,h:S}=l;g.clearRect(0,0,y,S);const E=v.l,w=y-v.r,b=v.t,A=S-v.b;g.strokeStyle=o,g.lineWidth=1,g.font='9px "Space Mono", monospace',g.fillStyle="#6b6d6a";for(let P=0;P<=4;P++){const L=A-P/4*(A-b);g.beginPath(),g.moveTo(E,L),g.lineTo(w,L),g.stroke()}[1940,1941,1942,1943].forEach(P=>{const L=(P+.2-h)/(d-h),U=E+L*(w-E);g.fillText("'"+String(P).slice(2),U-6,A+18)}),g.save(),g.translate(14,(b+A)/2),g.rotate(-Math.PI/2),g.fillText("INDEX",-18,0),g.restore();const C=dr(Bi(c,0,.42)),x=dr(Bi(c,.34,.66)),M=dr(Bi(c,.5,.78));if(C>0){const P=c<.5?.86*C+.02:.88+.12*M;_(u,P,n,2.4,null),g.fillStyle=n,g.font='9px "Space Mono", monospace',g.fillText("TONNAGE SUNK",E+6,b+12)}if(x>0&&(g.save(),g.globalAlpha=x,_(f,.94,i,1.8,[5,5]),g.restore(),g.save(),g.globalAlpha=x,g.fillStyle=i,g.font='9px "Space Mono", monospace',g.fillText("OUTSIDE VARIABLES · HF/DF · 10cm RADAR · VLR AIR · CVEs",E+6,A-f(.94)*(A-b)-8),g.restore()),M>.15){const P=p(),L=E+P*(w-E),U=A-u(P)*(A-b);g.save(),g.globalAlpha=vr((M-.15)*1.5,0,1),g.strokeStyle="rgba(233,230,221,0.28)",g.setLineDash([3,4]),g.beginPath(),g.moveTo(L,b),g.lineTo(L,A),g.stroke(),g.setLineDash([]),g.fillStyle=a,g.beginPath(),g.arc(L,U,4,0,7),g.fill(),g.font='italic 11px "Fraunces", serif',g.fillStyle=a,g.fillText("the ocean had already crossed over",L-150,U-12),g.restore()}if(M>.4){const P=(1943.35-h)/(d-h),L=E+P*(w-E),U=A-u(P)*(A-b);g.save(),g.globalAlpha=vr((M-.4)*1.6,0,1),g.fillStyle=s,g.beginPath(),g.arc(L,U,5,0,7),g.fill(),g.strokeStyle=s,g.lineWidth=1,g.beginPath(),g.moveTo(L,U),g.lineTo(L-4,U+40),g.stroke(),g.font='10px "Space Mono", monospace',g.fillStyle=s,g.fillText("BLACK MAY 1943",L-96,U+54),g.font='9px "Space Mono", monospace',g.fillStyle=a,g.fillText("41 U-boats lost — a quarter of the fleet",L-118,U+68),g.restore()}}l=Il(e,m),m(),ku(r,t,g=>{c=g,m()})}function ZS(r){if(!r)return;const e=r.querySelector("#midway-canvas"),t=Array.from(r.querySelectorAll(".viz-step")),n="#52a494",i="#e8b84b",s="#a7a599",a="rgba(233,230,221,0.10)";let o,l=0,c=0,h=null;const d=matchMedia("(prefers-reduced-motion: reduce)").matches,u=[{k:"SIGNAL",s:'HYPO · "AF"'},{k:"TEST",s:"AF is short of water"},{k:"PERMISSION",s:"Nimitz commits"},{k:"CAPACITY",s:"Yorktown · 72 hrs"},{k:"ACTION",s:"positioned NE"}];function f(g){const y=o.w/2,S=o.h/2+6,E=Math.min(o.w,o.h)*.33,w=-Math.PI/2+g/u.length*Math.PI*2;return[y+Math.cos(w)*E,S+Math.sin(w)*E,w]}function _(){const{ctx:g,w:y,h:S}=o;g.clearRect(0,0,y,S);const E=vr(Math.floor(l*u.length),0,u.length-1),w=y/2,b=S/2+6,A=Math.min(y,S)*.33;g.strokeStyle=a,g.lineWidth=1,g.beginPath(),g.arc(w,b,A,0,7),g.stroke();for(let C=0;C<u.length;C++){const[x,M]=f(C),[P,L]=f((C+1)%u.length),U=C<E||l>=.98;g.strokeStyle=U?"rgba(82,164,148,0.6)":a,g.lineWidth=U?2:1,g.beginPath(),g.moveTo(x,M),g.lineTo(P,L),g.stroke();const X=(x+P)/2,B=(M+L)/2,G=Math.atan2(L-M,P-x);g.fillStyle=U?n:"#3a3d3a",g.beginPath(),g.moveTo(X+6*Math.cos(G),B+6*Math.sin(G)),g.lineTo(X-5*Math.cos(G-.5),B-5*Math.sin(G-.5)),g.lineTo(X-5*Math.cos(G+.5),B-5*Math.sin(G+.5)),g.closePath(),g.fill()}if(!d){const C=c*.18%u.length,x=Math.floor(C),M=C-x,[P,L]=f(x),[U,X]=f((x+1)%u.length),B=P+(U-P)*M,G=L+(X-L)*M;g.fillStyle=i,g.shadowColor=i,g.shadowBlur=10,g.beginPath(),g.arc(B,G,3,0,7),g.fill(),g.shadowBlur=0}u.forEach((C,x)=>{const[M,P]=f(x),L=x<=E;(x===E?1:0)&&(g.shadowColor=n,g.shadowBlur=18),g.fillStyle=L?"#0e1a18":"#0e131b",g.strokeStyle=L?n:"#3a3d3a",g.lineWidth=2,g.beginPath(),g.arc(M,P,10,0,7),g.fill(),g.stroke(),g.shadowBlur=0,g.fillStyle=L?n:"#6b6d6a",g.font='bold 10px "Space Mono", monospace',g.textAlign="center",g.fillText(C.k,M,P+(P<b?-18:26)),g.fillStyle=L?s:"#4a4c49",g.font='9px "Space Mono", monospace',g.fillText(C.s,M,P+(P<b?-6:38)),g.textAlign="left"}),g.textAlign="center",g.fillStyle=s,g.font='italic 13px "Fraunces", serif',g.fillText("enough evidence,",w,b-4),g.fillText("in time",w,b+14),g.textAlign="left"}function v(){c+=.016,_(),h=requestAnimationFrame(v)}o=Il(e,_),_();const p=["station-hypo","af-water-ruse","nimitz","yorktown","spruance"];e.style.cursor="pointer",e.title="Click a node to open its dossier",e.addEventListener("click",g=>{const y=e.getBoundingClientRect(),S=g.clientX-y.left,E=g.clientY-y.top;let w=-1,b=1e9;for(let A=0;A<u.length;A++){const[C,x]=f(A),M=Math.hypot(C-S,x-E);M<b&&(b=M,w=A)}b<46&&window.__openDossier&&window.__openDossier(p[w])}),ku(r,t,g=>{l=g,d&&_()}),new IntersectionObserver(g=>g.forEach(y=>{y.isIntersecting&&!d?h||v():h&&(cancelAnimationFrame(h),h=null)}),{threshold:.05}).observe(e)}function JS(){eM(),nM(),rM()}const QS=[{n:"TEST I",name:"Latency",q:"How long between the first meaningful signal and legitimate action?",v:"var(--a-late)",d:"sedan-1940"},{n:"TEST II",name:"Aim",q:"What problem is the system actually built to solve?",v:"var(--a-aim)",d:"kantai-kessen"},{n:"TEST III",name:"Scoreboard",q:"Can the metric expose the failure of the doctrine that created it?",v:"var(--a-score)",d:"black-may"},{n:"TEST IV",name:"Evidence",q:"What is enough to act before certainty arrives too late?",v:"var(--a-build)",d:"af-water-ruse"},{n:"TEST V",name:"Intent",q:"What outcome is this authorized to make true — and who can stop it once it performs?",v:"var(--a-atom)",d:"oppenheimer"}];function eM(){const r=document.getElementById("tests-grid");r&&(r.innerHTML=QS.map(e=>`
    <button class="test-tile" style="--tt-accent:${e.v}" data-dossier="${e.d}">
      <div class="tt-num">${e.n}</div>
      <div><div class="tt-name">${e.name}</div><div class="tt-q">${e.q}</div><div class="tt-open">◇ open the case</div></div>
    </button>`).join(""),St.fromTo(r.children,{y:30,opacity:0},{y:0,opacity:1,duration:.8,stagger:.12,ease:"power3.out",scrollTrigger:{trigger:r,start:"top 80%"}}))}const tM=[{name:"Positioned Capacity",desc:"people · capital · options, before need"},{name:"Signal",desc:"events · anomalies · shifts"},{name:"Context",desc:"rules · history · relationships"},{name:"Evidence",desc:"data interpreted against a question"},{name:"Reasoning",desc:"known → likely → follows"},{name:"Intent",desc:"outcome · who bears it · what must stay true",key:!0},{name:"Permission",desc:"thresholds · reversibility · authority",key:!0},{name:"Action",desc:"what changes the world"},{name:"Proof",desc:"what actually happened"},{name:"Learning",desc:"reopens intent — not just execution"}];function nM(){const r=document.getElementById("stack-viz");if(!r)return;r.innerHTML=tM.map(t=>`
    <div class="stack-layer ${t.key?"is-permission":""}">
      <span class="sl-pulse"></span>
      <span class="sl-name">${t.name}</span>
      <span class="sl-desc">${t.desc}</span>
    </div>`).join("");const e=Array.from(r.children);St.to(e,{opacity:1,x:0,duration:.7,stagger:.14,ease:"power3.out",scrollTrigger:{trigger:r,start:"top 75%"},onComplete(){iM(e)}})}function iM(r){const e=St.timeline({repeat:-1,repeatDelay:1.4});r.forEach(t=>{const n=t.querySelector(".sl-pulse");e.to(n,{opacity:1,duration:.18,ease:"none"},">").to(n,{opacity:0,duration:.5,ease:"power2.out"},">-0.02")})}const Ef=["What outcome are we trying to make true — and where does the material change first appear?","What must remain true while the system acts?","What evidence is enough to justify the next move before certainty becomes late?","Who is trusted to interpret the evidence?","Who benefits, who bears the risk, and who owns the consequence?","What permission can be designed before the signal arrives?","Which actions are reversible — and which create obligations that cannot be undone?","What capacity must already be positioned before need?","What can stop the system after it begins to perform?","What result is strong enough to rewrite the next decision — or invalidate the mandate?"];function rM(){const r=document.getElementById("board-quiz");if(!r)return;const e=new Array(Ef.length).fill(0);r.innerHTML=Ef.map((i,s)=>`
    <div class="board-q">
      <div class="board-q-text"><span class="board-q-num">Q${s+1}</span>${i}</div>
      <div class="board-scale" data-q="${s}">
        ${[1,2,3,4,5].map(a=>`<button data-v="${a}" title="${a===1?"ad hoc / undefined":a===5?"designed & fast":""}">${a}</button>`).join("")}
      </div>
    </div>`).join("")+`
    <div class="board-scalekey">1 = assembled ad hoc, authority gathers late &nbsp;·&nbsp; 5 = designed in advance, evidence moves</div>
    <div class="board-result" id="board-result"></div>`;const t=r.querySelector("#board-result");r.querySelectorAll(".board-scale").forEach(i=>{const s=parseInt(i.dataset.q,10);i.querySelectorAll("button").forEach(a=>{a.addEventListener("click",()=>{i.querySelectorAll("button").forEach(o=>o.classList.remove("is-sel")),a.classList.add("is-sel"),e[s]=parseInt(a.dataset.v,10),aM(t,e)})})});const n=r.querySelector(".board-scalekey");n&&(n.style.cssText="font-family:var(--mono);font-size:9.5px;letter-spacing:1px;color:var(--ink-faint);margin-top:18px;text-align:center;")}function sM(r){return r>=4.2?{label:"DECISION ARCHITECTURE",color:"var(--a-build)",text:"Signal, evidence, permission, action, and learning move together. The visible sign is subtraction — meetings and approvals that existed only because evidence could not be trusted in time have begun to disappear."}:r>=3.2?{label:"ADAPTING",color:"var(--signal)",text:"The loop is closing, but permission still lags the signal in places. Find the one recurring decision where authority gathers after the window has already closed."}:r>=2.2?{label:"ADOPTING, NOT ADAPTING",color:"var(--a-aim)",text:"You own intelligence. It has not yet changed how decisions move. This is the AI-Yamato risk: a larger gun mounted on the old doctrine."}:{label:"UNMANAGED DISTANCE",color:"var(--a-late)",text:"Strength arrives late, and the scoreboard may still look fine. This is 1940 France with better software: visibility without permission, reporting without authority."}}function aM(r,e){const t=e.filter(a=>a>0);if(t.length<3){r.classList.remove("is-live"),r.innerHTML='<div style="font-family:var(--mono);font-size:10px;letter-spacing:2px;color:var(--ink-faint)">ANSWER AT LEAST THREE TO READ YOUR DISTANCE</div>';return}const n=t.reduce((a,o)=>a+o,0)/t.length,i=Math.round((5-n)/4*100),s=sM(n);r.classList.remove("is-live"),r.offsetWidth,r.classList.add("is-live"),r.innerHTML=`
    <div class="board-gauge" style="color:${s.color}">${i}<span style="font-size:0.4em;color:var(--ink-faint)"> / 100</span></div>
    <div class="board-verdict" style="color:${s.color}">UNMANAGED DISTANCE INDEX · ${s.label}</div>
    <div class="board-readout">${s.text}</div>
    <div style="font-family:var(--mono);font-size:9px;letter-spacing:1px;color:var(--ink-faint);margin-top:14px">${t.length}/10 answered · lower distance = evidence becomes legitimate action before value decays</div>`}function oM(r){if(!r)return;const e=document.createElement("div");e.className="atom-clock",e.innerHTML=`
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
    </div>`,r.insertBefore(e,r.firstChild);const t=e.querySelector(".dc-ticks");let n="";for(let u=0;u<60;u++){const f=u/60*Math.PI*2,_=u%5===0,v=112,p=_?100:106;n+=`<line x1="${120+v*Math.sin(f)}" y1="${120-v*Math.cos(f)}" x2="${120+p*Math.sin(f)}" y2="${120-p*Math.cos(f)}" class="dc-tick" opacity="${_?.5:.22}"/>`}t.innerHTML=n;const i=e.querySelector("#dc-hand"),s=e.querySelector("#dc-secs"),a=180,o=85,l=u=>-(u/60)*6;St.set(i,{rotation:l(a),transformOrigin:"120px 120px"}),Fe.create({trigger:e,start:"top 72%",once:!0,onEnter(){St.to(i,{rotation:l(o),duration:2.6,ease:"power2.inOut"}),St.to({v:a},{v:o,duration:2.6,ease:"power2.inOut",onUpdate(){s.textContent=Math.round(this.targets()[0].v)}})}});const c=r.querySelector("#atom-timeline"),h=[{d:"DEC 1938",t:"The Fact",b:"Meitner and Frisch, working with pencil and paper in the snow, follow the missing mass into energy. The nucleus has split. A physical fact enters the world — no bomb in the arithmetic. Institutions will decide what it becomes."},{d:"AUG 1939",t:"The Intent",b:"The Einstein–Szilárd letter reaches Roosevelt, who authorizes not a bomb but attention. A scientific possibility crosses into political intent — before anyone knows the weapon can be built."},{d:"DEC 1942",t:"Capacity Before Certainty",b:"Fermi’s pile goes critical under a Chicago grandstand. Oak Ridge, Hanford, and Los Alamos rise while the science is still unsettled — a portfolio of bounded commitments. Midway at industrial scale."},{d:"MAY–JUL 1945",t:"Purpose Drift",b:"Germany surrenders in May; the threat that justified the architecture is gone. Trinity fires in July. The machinery kept gathering speed after the intent that built it had expired — momentum experienced as prudence."}];c.innerHTML=h.map(u=>`
    <div class="atom-tl-item">
      <div class="atom-tl-date">${u.d}</div>
      <div class="atom-tl-title">${u.t}</div>
      <div class="atom-tl-body">${u.b}</div>
    </div>`).join(""),Array.from(c.children).forEach((u,f)=>{Fe.create({trigger:u,start:"top 85%",once:!0,onEnter(){u.classList.add("is-in"),St.fromTo(u,{y:24,opacity:0},{y:0,opacity:1,duration:.8,delay:f*.08,ease:"power3.out"})}})})}const li={"char-b1-bis":{title:"Char B1 bis",kind:"Vessel",chapter:"Blitzkrieg",tagline:"A better tank, one at a time — outclassed by tanks that arrived together.",image:"s_b1bis",stats:[{k:"Armor",v:"up to 60 mm"},{k:"Guns",v:"75 mm hull + 47 mm turret"},{k:"Built",v:"~369"},{k:"Weakness",v:"one-man turret, ~180 km range"}],body:["Individually, the Char B1 bis outgunned and outarmored anything Germany fielded in 1940. Its frontal plate shrugged off the Panzer III’s 37 mm gun.","But the commander loaded, aimed, and fired the turret gun while also directing the tank. French doctrine scattered these machines across infantry formations. They fought as isolated strongpoints, refueled constantly, and were bypassed rather than beaten."],ai:"Capability at the unit level means nothing if the decision to concentrate it never gets made in time.",threads:["panzer-iii","guderian","sedan-1940","auftragstaktik"]},"panzer-iii":{title:"Panzer III",kind:"Vessel",chapter:"Blitzkrieg",tagline:"Thinner armor, smaller gun — and a radio in every turret.",image:"s_panzer3",stats:[{k:"Gun (1940)",v:"37 mm"},{k:"Armor",v:"~30 mm front"},{k:"Crew",v:"5 (dedicated commander)"},{k:"Edge",v:"radio-equipped, concentrated"}],body:["On paper the Panzer III was the weaker machine. In practice it carried the decisive feature: a radio, a five-man crew, and a commander freed to command rather than fight the gun.","Massed in panzer divisions and talking to each other and to aircraft, these tanks could shift weight, exploit a gap, and react to a broken line faster than the enemy could reorganize."],ai:"The advantage wasn’t the tank — it was the wiring that let hundreds of them act as one nervous system.",threads:["char-b1-bis","guderian","auftragstaktik","sedan-1940"]},guderian:{title:"Heinz Guderian",kind:"Person",chapter:"Blitzkrieg",tagline:"The armor evangelist who drove through the “impassable” forest to the sea.",image:"m_guderian",stats:[{k:"Command",v:"XIX Panzer Corps"},{k:"Doctrine",v:"concentrated armor + radio + air"},{k:"Sedan",v:"crossed Meuse 13–14 May 1940"},{k:"Book",v:"“Achtung – Panzer!” (1937)"}],body:["Guderian argued that tanks should not be parceled out to infantry but concentrated, radio-linked, and driven deep before the enemy could respond.","At Sedan he did exactly that, then ignored orders to halt and raced for the Channel. His famous shorthand — “Klotzen, nicht kleckern” (strike concentrated, not dispersed) — was a statement about decision speed, not firepower."],ai:"He collapsed the distance between seeing an opening and pouring force through it before permission could catch up.",threads:["manstein","auftragstaktik","ardennes","sedan-1940","panzer-iii"]},manstein:{title:"Erich von Manstein",kind:"Person",chapter:"Blitzkrieg",tagline:"Author of the sickle cut — the plan the German high command almost refused.",image:null,stats:[{k:"Plan",v:"Sichelschnitt (sickle cut)"},{k:"Axis",v:"main effort through the Ardennes"},{k:"Status 1940",v:"corps chief of staff, sidelined"},{k:"Rank later",v:"Field Marshal"}],body:["The original German plan was a cautious rerun of 1914. Manstein proposed the opposite: put the armored weight where the enemy least expected it, through the wooded Ardennes, and cut the Allied armies in half.","His superiors buried the idea until a chance meeting with Hitler surfaced it. The plan that won the campaign nearly died in the staff system that produced it."],ai:"The best signal is worthless until an organization builds a path for it to reach the person who can say yes.",threads:["guderian","ardennes","sedan-1940","auftragstaktik"]},auftragstaktik:{title:"Auftragstaktik",kind:"Concept",chapter:"Blitzkrieg",tagline:"Tell subordinates the intent, not the steps — then let them decide.",image:null,stats:[{k:"Translation",v:"mission-type tactics"},{k:"Delegates",v:"the “how,” not the “what”"},{k:"Requires",v:"trained judgment at the edge"},{k:"Modern name",v:"mission command"}],body:["German commanders issued objectives and constraints, then left the method to the officer on the spot. A lieutenant who saw an opening was expected to take it without asking.","This pushed decision authority down to where the information was freshest. It is the doctrinal heart of Blitzkrieg — and it rhymes, three years later, with Nimitz turning his carriers loose at Midway."],ai:"Legitimate authority pre-positioned at the edge is what lets a fresh signal become action without a round trip to the top.",threads:["guderian","manstein","panzer-iii","spruance","nimitz"]},ardennes:{title:"The Ardennes",kind:"Place",chapter:"Blitzkrieg",tagline:"The forest generals agreed tanks couldn’t cross — so nobody watched it.",image:null,stats:[{k:"Terrain",v:"dense forest, narrow roads"},{k:"Allied view",v:"unsuitable for armor"},{k:"German use",v:"main panzer thrust"},{k:"Result",v:"breakthrough at Sedan"}],body:["Allied planning treated the Ardennes as a natural barrier and screened it lightly, concentrating strength in Belgium where they expected the blow.","The Germans threaded three panzer corps through it in a colossal traffic jam. An assumption baked into doctrine became the seam the whole campaign was won through."],ai:"An unexamined assumption inside your doctrine is exactly the gap an opponent aims for.",threads:["manstein","guderian","sedan-1940"]},"sedan-1940":{title:"The Crossing at Sedan",kind:"Operation",chapter:"Blitzkrieg",tagline:"48 hours over the Meuse that unhinged the entire Allied front.",image:null,stats:[{k:"Dates",v:"13–14 May 1940"},{k:"River",v:"the Meuse"},{k:"Air support",v:"concentrated Stuka bombardment"},{k:"Then",v:"race to the Channel"}],body:["German infantry and engineers forced the Meuse under a rolling air assault while French artillery — organized for a slower, methodical battle — never massed its fire in time.","Once bridgeheads held, Guderian’s armor poured through and did not stop. The French decision cycle, built around deliberate set-piece defense, simply could not keep pace."],ai:"Two forces with similar strength; the one whose observe-decide-act loop was hours shorter won.",threads:["guderian","ardennes","panzer-iii","char-b1-bis"]},pervitin:{title:"Pervitin",kind:"Technology",chapter:"Blitzkrieg",tagline:"Methamphetamine that kept crews awake — a fuel, not the cause.",image:null,stats:[{k:"Substance",v:"methamphetamine"},{k:"Nickname",v:"“Panzerschokolade”"},{k:"Effect",v:"suppressed sleep and fatigue"},{k:"Issued",v:"millions of tablets, 1939–40"}],body:["Pervitin let tank and truck crews push for days with little rest, sustaining the relentless tempo the campaign demanded.","It is often overstated. The drug fueled the pace; it did not create the doctrine, the radios, or the decentralized command that made the pace worth having."],ai:"A stimulant can extend how long you execute a decision loop — it cannot design a better one.",threads:["guderian","sedan-1940"]},yamato:{title:"Yamato",kind:"Vessel",chapter:"Yamato",tagline:"The largest battleship ever built, sunk without her main guns ever hitting a ship.",image:"s_yamato",stats:[{k:"Displacement",v:"~72,000 t full load"},{k:"Main guns",v:"9 × 46 cm (18.1 in)"},{k:"Sunk",v:"7 April 1945"},{k:"Final hits",v:"~10 bombs, ~8 torpedoes"}],body:["Yamato was the physical peak of the battleship — heavier armor and bigger guns than anything afloat. She was built for a fleet duel that the war never delivered.","On her last sortie nearly 400 US carrier aircraft attacked in waves over roughly two hours. Her 46 cm guns never fired on an enemy warship; they fired only anti-aircraft shells at the planes killing her."],ai:"She was a flawless answer to a question the enemy had already stopped asking.",threads:["musashi","eighteen-inch-guns","operation-ten-go","kantai-kessen","iowa-class"]},musashi:{title:"Musashi",kind:"Vessel",chapter:"Yamato",tagline:"Yamato’s sister — proof of concept for how these ships would die.",image:null,stats:[{k:"Class",v:"Yamato-class"},{k:"Sunk",v:"24 October 1944, Sibuyan Sea"},{k:"Hits",v:"~17 bombs, ~19 torpedoes"},{k:"Attackers",v:"US carrier aircraft"}],body:["At the Battle of the Sibuyan Sea, US carrier planes swarmed Musashi for hours, absorbing punishment no gun line could have inflicted, until she rolled over and sank.","Her destruction was the rehearsal for Yamato six months later: the sea war was decided in the air, and the biggest guns in history had no target."],ai:"The same lesson delivered twice: the scoreboard had changed and the doctrine had not.",threads:["yamato","eighteen-inch-guns","kantai-kessen","battle-off-samar"]},"eighteen-inch-guns":{title:"46 cm Naval Guns",kind:"Technology",chapter:"Yamato",tagline:"The largest guns ever mounted at sea — kept secret, and largely unused.",image:null,stats:[{k:"Bore",v:"46 cm (18.1 in)"},{k:"Shell",v:"~1,460 kg AP"},{k:"Range",v:"~42 km"},{k:"Cover story",v:"officially called “40 cm”"}],body:["Each shell weighed as much as a small car and could be lobbed over forty kilometers. Japan disguised the true caliber to keep rivals building smaller ships.","The secrecy worked and the engineering was superb. It bought a decisive edge in a gunnery battle that carrier aviation ensured would almost never happen."],ai:"Optimizing hard against the wrong metric produces a masterpiece nobody needs.",threads:["yamato","musashi","iowa-class","radar-fire-control"]},"kantai-kessen":{title:"Kantai Kessen",kind:"Concept",chapter:"Yamato",tagline:"The “decisive battle” doctrine that shaped a navy for a fight that never came.",image:null,stats:[{k:"Meaning",v:"“decisive fleet battle”"},{k:"Model",v:"Tsushima, 1905"},{k:"Assumed",v:"one climactic gun engagement"},{k:"Reality",v:"attrition, air power, logistics"}],body:["Japanese naval doctrine anticipated luring the US fleet across the Pacific to a single annihilating clash decided by battleship gunnery. Yamato was that plan cast in steel.","The actual war was carrier strikes, submarine attrition, and industrial replacement. The decisive battle kept not arriving, and the fleet built for it aged into irrelevance."],ai:"A metric embedded inside doctrine becomes invisible — you keep scoring points in a game the world stopped playing.",threads:["yamato","operation-ten-go","eighteen-inch-guns","kido-butai","donitz"]},"operation-ten-go":{title:"Operation Ten-Go",kind:"Operation",chapter:"Yamato",tagline:"A one-way sortie to Okinawa with fuel enough to arrive, not return.",image:null,stats:[{k:"Date",v:"6–7 April 1945"},{k:"Objective",v:"beach and fight off Okinawa"},{k:"Fuel",v:"effectively one-way"},{k:"Outcome",v:"Yamato + most escorts sunk"}],body:["With Japanese air power gutted, Yamato was sent to run herself aground off Okinawa as an unsinkable gun battery — a suicide mission dressed as a sortie.","US carriers intercepted her in open water first. The plan spent the fleet’s crown jewel for symbolism, because doctrine had no other use left for her."],ai:"When the only remaining role for your prize asset is symbolic sacrifice, the strategy failed long before the ship did.",threads:["yamato","kantai-kessen","battle-off-samar"]},"battle-off-samar":{title:"Battle off Samar",kind:"Operation",chapter:"Yamato",tagline:"Yamato met her chance against thin-skinned carriers — and turned away.",image:null,stats:[{k:"Date",v:"25 October 1944"},{k:"US force",v:"“Taffy 3” escort carriers + tin cans"},{k:"Japanese",v:"Kurita’s Center Force"},{k:"Result",v:"Kurita withdrew"}],body:["For once the battleships got what doctrine promised: US escort carriers and destroyers in gun range, nearly defenseless. Yamato and her consorts opened fire.","A ferocious destroyer counterattack, air harassment, and confusion convinced Kurita he faced fleet carriers. He broke off. The decisive gun battle finally happened — and the doctrine flinched."],ai:"Even handed its dream scenario, a system tuned for the wrong war misread the evidence and retreated.",threads:["yamato","musashi","escort-carrier","kantai-kessen"]},"iowa-class":{title:"Iowa-class Battleship",kind:"Vessel",chapter:"Yamato",tagline:"Smaller guns, radar eyes, 33 knots — built to escort carriers, not replace them.",image:"s_iowa",stats:[{k:"Main guns",v:"9 × 16 in"},{k:"Speed",v:"~33 knots"},{k:"Fire control",v:"radar-directed"},{k:"Role",v:"fast carrier screen, AA, shore bombardment"}],body:["The Iowas carried lighter guns than Yamato but ran fast enough to keep station with aircraft carriers and saw in the dark with radar.","The US built its battleships to serve the carrier, not to seek a duel. That subordination — the battleship as one node in a sensor-and-strike network — is why they stayed useful."],ai:"The winning design didn’t maximize any single spec; it fit itself to the war actually being fought.",threads:["yamato","eighteen-inch-guns","radar-fire-control"]},"radar-fire-control":{title:"Radar Fire Control",kind:"Technology",chapter:"Yamato",tagline:"The moment gun size stopped mattering more than knowing where to shoot.",image:"s_firecontrol",stats:[{k:"Systems",v:"Mark 3/8 radar + Mark 37 director"},{k:"Enables",v:"accurate fire at night, in fog"},{k:"Proven",v:"Guadalcanal night actions, Surigao Strait"},{k:"Shift",v:"sensing over caliber"}],body:["Radar-directed gunnery let US ships hit targets they could not see, in darkness that once neutralized superior optics and bigger guns.","The advantage moved from the size of the barrel to the speed and quality of the target solution — the same shift, in a different medium, that centimetric radar forced on the U-boats."],ai:"The edge migrated from raw output to sensing and decision — from how hard you can hit to whether you know where to.",threads:["iowa-class","eighteen-inch-guns","centimetric-radar","yamato"]},donitz:{title:"Karl Dönitz",kind:"Person",chapter:"U-Boats",tagline:"He measured the war in tons sunk — and lost the war being counted differently.",image:"m_donitz",stats:[{k:"Role",v:"Commander, U-boat arm (BdU)"},{k:"Doctrine",v:"tonnage war"},{k:"Goal",v:"sink faster than Allies could build"},{k:"May 1943",v:"withdrew from North Atlantic"}],body:["Dönitz ran the Atlantic campaign as an arithmetic race: sink more Allied tonnage per month than the shipyards could replace, and Britain would starve.","The metric ignored what the enemy was optimizing — convoy escort, air cover, code-breaking, and industrial output. As those compounded, his tonnage curve inverted and his fleet was slaughtered."],ai:"A single, legible scoreboard is seductive precisely because it hides every variable the enemy is actually moving.",threads:["type-vii-uboat","wolfpack","black-may","blackett","kantai-kessen"]},"type-vii-uboat":{title:"Type VII U-boat",kind:"Vessel",chapter:"U-Boats",tagline:"The workhorse of the tonnage war — a surface raider that could duck underwater.",image:"s_uboat",stats:[{k:"Built",v:"700+ (most numerous type)"},{k:"Crew",v:"~44–52"},{k:"Attack mode",v:"often surfaced, at night"},{k:"Weakness",v:"slow submerged, short battery"}],body:["The Type VII was cheap, rugged, and produced in enormous numbers. It fought mostly on the surface, where it was faster and could coordinate by radio.","That surface habit was its doom. Once aircraft and centimetric radar owned the surface at night, the very mode that made the boat effective made it a target."],ai:"The behavior that maximized the old scoreboard became the exact signature the new tools hunted.",threads:["donitz","wolfpack","mid-atlantic-gap","centimetric-radar"]},wolfpack:{title:"Wolfpack Tactics",kind:"Tactic",chapter:"U-Boats",tagline:"Gather the boats by radio, overwhelm the convoy — and broadcast your position doing it.",image:null,stats:[{k:"German",v:"Rudeltaktik"},{k:"Coordination",v:"radio orders from BdU ashore"},{k:"Aim",v:"saturate a convoy’s escorts"},{k:"Cost",v:"constant transmissions"}],body:["A boat that spotted a convoy radioed home; headquarters vectored others to converge and attack en masse, swamping the escort screen.","The coordination ran on radio chatter. Every order and shadowing report was a signal the Allies could locate with HF/DF and read with Ultra — the tactic’s strength was wired straight to its vulnerability."],ai:"Centralized control needs constant signaling, and constant signaling is exactly what the other side learns to intercept.",threads:["donitz","type-vii-uboat","hf-df","ultra-enigma"]},"hf-df":{title:"HF/DF (“Huff-Duff”)",kind:"Technology",chapter:"U-Boats",tagline:"You can’t coordinate by radio without telling the enemy where you are.",image:null,stats:[{k:"Full name",v:"high-frequency direction finding"},{k:"Fix",v:"bearing to a transmitting U-boat"},{k:"Deployed",v:"shipborne, aboard escorts"},{k:"Use",v:"run down the bearing and attack"}],body:["Shipborne HF/DF took a bearing on a U-boat the instant it transmitted. Two escorts could triangulate a position; even one could charge down the line.","The Germans long assumed their brief transmissions were safe. They were feeding the escorts a live position report every time they spoke."],ai:"The act of coordinating leaks information; the winner turns the enemy’s own signals into targeting data.",threads:["wolfpack","donitz","centimetric-radar","black-may"]},"centimetric-radar":{title:"Centimetric Radar",kind:"Technology",chapter:"U-Boats",tagline:"A wavelength the U-boats couldn’t hear coming — the night stopped being safe.",image:null,stats:[{k:"Sets",v:"ASV Mk III / H2S (~10 cm)"},{k:"Enabler",v:"the cavity magnetron"},{k:"Blind spot",v:"German Metox couldn’t detect it"},{k:"Effect",v:"surfaced boats found at night"}],body:["Short-wavelength radar, powered by the cavity magnetron, let aircraft pick a surfaced U-boat out of a black ocean and attack before the crew knew a plane was near.","German receivers were tuned to older, longer wavelengths and heard nothing. For months the boats surfaced at night believing themselves invisible while planes bore in."],ai:"The decisive advantage was a sensing gap: seeing the enemy in a band where he assumed he was unseen.",threads:["hf-df","escort-carrier","black-may","mid-atlantic-gap","radar-fire-control"]},"escort-carrier":{title:"Escort Carrier (CVE)",kind:"Vessel",chapter:"U-Boats",tagline:"A “jeep carrier” that carried air cover into the middle of the ocean.",image:null,stats:[{k:"Nickname",v:"“jeep carrier”"},{k:"Built on",v:"merchant/tanker hulls"},{k:"Air group",v:"a handful of planes"},{k:"Job",v:"organic air cover for convoys"}],body:["Small, cheap flattops sailed with the convoys and their support groups, providing round-the-clock aircraft over the one stretch land-based planes couldn’t reach.","Individually modest, in numbers they closed the last gap in Allied air coverage — and the same humble ships later stood off Yamato’s guns at Samar."],ai:"Coverage over the whole board beat concentrated power over part of it.",threads:["mid-atlantic-gap","centimetric-radar","black-may","battle-off-samar"]},"mid-atlantic-gap":{title:"The Mid-Atlantic Gap",kind:"Place",chapter:"U-Boats",tagline:"The “Black Pit” beyond air cover — where the wolfpacks lived.",image:null,stats:[{k:"Nickname",v:"“the Black Pit”"},{k:"Cause",v:"beyond land-based aircraft range"},{k:"Closed by",v:"VLR Liberators + escort carriers"},{k:"Closed",v:"spring 1943"}],body:["For years a mid-ocean band lay beyond the reach of patrol aircraft. Convoys crossed it naked, and the U-boats hunted hardest there.","Very-long-range Liberators and escort carriers finally roofed the gap in early 1943. With no safe water left to surface in, the wolfpacks’ core tactic died."],ai:"A blind spot in the sensor map is where the enemy concentrates; closing it changes the whole game.",threads:["escort-carrier","centimetric-radar","type-vii-uboat","black-may"]},blackett:{title:"Patrick Blackett",kind:"Person",chapter:"U-Boats",tagline:"The physicist who won tonnage with arithmetic instead of steel.",image:"m_blackett",stats:[{k:"Field",v:"operational research"},{k:"Findings",v:"bigger convoys are safer"},{k:"Fix",v:"reset depth-charge fuzes"},{k:"Later",v:"Nobel Prize in Physics, 1948"}],body:["Blackett’s team studied the data instead of the doctrine. They found large convoys lost proportionally fewer ships, that depth charges were exploding too deep, and that aircraft should be painted white.","Small analytical corrections, applied fleet-wide, saved more shipping than new weapons did. It was decision-making treated as a science."],ai:"Sometimes the highest-leverage move is not more force but a better-calibrated decision applied everywhere.",threads:["donitz","mid-atlantic-gap","black-may","nimitz"]},"black-may":{title:"Black May",kind:"Operation",chapter:"U-Boats",tagline:"One month that broke the wolfpacks — a quarter of the fleet gone.",image:null,stats:[{k:"When",v:"May 1943"},{k:"U-boats lost",v:"41 at sea"},{k:"Share",v:"~a quarter of the operational fleet"},{k:"Result",v:"Dönitz pulled boats from the N. Atlantic"}],body:["Everything converged at once: centimetric radar, HF/DF, escort carriers, closed air gap, and Ultra rerouting convoys. In a few weeks U-boat losses became unsustainable.","Dönitz withdrew from the main convoy routes. The tonnage-war offensive never recovered. The scoreboard had flipped, and it flipped almost overnight."],ai:"When the enemy fixes the whole decision system at once, a slow decline becomes a sudden collapse.",threads:["donitz","centimetric-radar","escort-carrier","hf-df","ultra-enigma"]},"ultra-enigma":{title:"Ultra / Naval Enigma",kind:"Document",chapter:"U-Boats",tagline:"Reading the wolfpacks’ mail — and steering convoys around them.",image:null,stats:[{k:"Source",v:"broken naval Enigma traffic"},{k:"Center",v:"Bletchley Park"},{k:"Key break",v:"4-rotor Enigma, 1943"},{k:"Use",v:"reroute convoys, cue attacks"}],body:["When Bletchley Park could read U-boat signals, the Admiralty diverted convoys around patrol lines and vectored hunter groups onto known positions.","Guarded so tightly that action was often disguised to protect the source, Ultra turned the U-boats’ own coordination network into an Allied planning tool — the same SIGINT logic Station Hypo ran in the Pacific."],ai:"Owning the enemy’s signal turns his decisions into yours — the ultimate collapse of the signal-to-action distance.",threads:["wolfpack","black-may","donitz","jn-25","station-hypo"]},rochefort:{title:"Joseph Rochefort",kind:"Person",chapter:"Midway",tagline:"The cryptanalyst who bet his reputation that “AF” was Midway.",image:"m_blackett",stats:[{k:"Command",v:"Station Hypo, Pearl Harbor"},{k:"Habits",v:"bathrobe, slippers, days without sleep"},{k:"Read",v:"~15% of JN-25 — enough"},{k:"Vindicated",v:"the AF water ruse"}],body:["Rochefort’s team never read the whole code. Working from fragments, traffic patterns, and instinct, they concluded Japan’s next blow would fall on Midway.","Washington favored other targets. Rochefort staged a ruse to prove it and gave Nimitz a location and a date. He acted on partial evidence because partial was enough to decide."],ai:"Sufficient evidence, read early, beats complete evidence read too late.",threads:["station-hypo","jn-25","af-water-ruse","nimitz"]},"station-hypo":{title:"Station Hypo",kind:"Place",chapter:"Midway",tagline:"A windowless basement at Pearl that out-decided Washington.",image:"m_blackett",stats:[{k:"Location",v:"basement, Pearl Harbor"},{k:"Also called",v:"Combat Intelligence Unit"},{k:"Chief",v:"Joseph Rochefort"},{k:"Rival estimate",v:"OP-20-G, Washington"}],body:["Hypo combined cryptanalysis, traffic analysis, and direction-finding into running estimates of Japanese intentions, feeding them straight to the Pacific Fleet.","Its proximity to the decision-maker mattered as much as its skill: analysis and authority were close enough that a fresh read could become an order the same day."],ai:"Analysis wired directly to the person who can act is worth more than better analysis two echelons away.",threads:["rochefort","jn-25","af-water-ruse","nimitz"]},"jn-25":{title:"JN-25",kind:"Document",chapter:"Midway",tagline:"The Japanese naval code — never fully broken, and it didn’t need to be.",image:null,stats:[{k:"Type",v:"enciphered code book"},{k:"Readable",v:"partial, a fraction of groups"},{k:"Key clue",v:"the geographic tag “AF”"},{k:"Payoff",v:"Midway order of battle and timing"}],body:["JN-25 layered a code book under an additive cipher; the Allies recovered only part of it. Even fragments, cross-referenced against traffic, revealed the shape of the coming operation.","The recurring designator “AF” pointed at the target — but which base? Confirming it was the last gap between a good guess and an actionable decision."],ai:"You rarely decode the whole message; the discipline is acting on the fraction that already answers the question.",threads:["rochefort","station-hypo","af-water-ruse","ultra-enigma"]},"af-water-ruse":{title:"The “AF is Short of Water” Ruse",kind:"Tactic",chapter:"Midway",tagline:"A fake message about a broken still that confirmed the target.",image:null,stats:[{k:"Bait",v:"Midway radios (in clear) a water shortage"},{k:"Hook",v:"Japan reports “AF short of water”"},{k:"Proves",v:"AF = Midway"},{k:"Cost",v:"one clever transmission"}],body:["To settle the argument over what “AF” meant, Hypo had Midway broadcast a plain-language complaint that its desalination plant had failed. Days later, decrypts showed Japan reporting that AF was low on water.","It was a designed experiment: create a falsifiable prediction and let the enemy confirm or refute it. The enemy confirmed it."],ai:"When evidence is ambiguous, engineer a test the world will answer — don’t wait for certainty to arrive on its own.",threads:["rochefort","station-hypo","jn-25","nimitz"]},nimitz:{title:"Chester Nimitz",kind:"Person",chapter:"Midway",tagline:"He trusted the basement over Washington and staged an ambush at Point Luck.",image:null,stats:[{k:"Role",v:"CINCPAC"},{k:"Choice",v:"backed Hypo’s Midway estimate"},{k:"Move",v:"carriers to “Point Luck”"},{k:"Guidance",v:"“calculated risk”"}],body:["Nimitz weighed a contested intelligence estimate and committed his three available carriers to lie in wait northeast of Midway before the Japanese arrived.","His written order told his admirals to apply the principle of calculated risk — take the shot when the expected gain justified it. He decided on sufficient evidence and delegated the execution."],ai:"Leadership is deciding on incomplete information and pushing the acting authority to the commanders at the point of contact.",threads:["rochefort","yorktown","spruance","fletcher","af-water-ruse"]},yorktown:{title:"USS Yorktown",kind:"Vessel",chapter:"Midway",tagline:"“We must have this ship back in three days.” They took about seventy-two hours.",image:null,stats:[{k:"Damaged",v:"Battle of the Coral Sea"},{k:"Nimitz’s order",v:"back in three days"},{k:"Repaired",v:"in ~72 hours at Pearl"},{k:"Sortied",v:"30 May 1942"}],body:["Estimates put Yorktown’s repairs at months. Nimitz demanded three days. Fourteen hundred workers swarmed her around the clock and made her fightable.","She sortied on 30 May and her air group helped sink a Japanese carrier before she was lost. Without that third carrier, the arithmetic at Midway may not have worked."],ai:"A fast, decisive repair decision manufactured the very margin the battle turned on.",threads:["nimitz","fletcher","sbd-dauntless","kido-butai"]},"sbd-dauntless":{title:"SBD Dauntless",kind:"Aircraft",chapter:"Midway",tagline:"The dive bomber that sank four carriers in an afternoon.",image:"s_dauntless",stats:[{k:"Type",v:"carrier dive bomber"},{k:"Midway kills",v:"4 Japanese fleet carriers"},{k:"Decisive window",v:"minutes, ~10:20 am, 4 June"},{k:"Bomb",v:"up to 1,000 lb"}],body:["Dauntless squadrons arrived over Kido Butai just as its decks were crowded with fueled, armed aircraft mid-rearming. In a few minutes they turned three carriers into infernos; a fourth followed that evening.","The plane was unglamorous and sturdy. What made the moment decisive was timing — the strike hit while the enemy was caught between two decisions."],ai:"The blow landed in the seam of the enemy’s indecision — the interval when he had committed to nothing.",threads:["kido-butai","yorktown","spruance","fletcher"]},"kido-butai":{title:"Kido Butai",kind:"Operation",chapter:"Midway",tagline:"The world’s finest carrier force, undone by a rearming decision it couldn’t unmake.",image:null,stats:[{k:"Meaning",v:"“mobile force”"},{k:"Carriers at Midway",v:"4 (all sunk)"},{k:"Commander",v:"Vice Admiral Nagumo"},{k:"Fatal pause",v:"bombs → torpedoes → bombs"}],body:["Nagumo’s four carriers had rampaged from Pearl Harbor to the Indian Ocean unbeaten. At Midway a spotted American carrier forced a choice: keep the land-attack bombs or swap to anti-ship torpedoes.","He ordered a rearm, then reversed it, and the hangar decks filled with fuel and ordnance during the switch. The Dauntlesses arrived precisely in that vulnerable gap."],ai:"A reversible decision left half-made is the most dangerous state a system can occupy under attack.",threads:["sbd-dauntless","yorktown","kantai-kessen","spruance"]},spruance:{title:"Raymond Spruance",kind:"Person",chapter:"Midway",tagline:"A non-aviator who launched early, launched everything, and won.",image:null,stats:[{k:"Command",v:"Task Force 16"},{k:"Background",v:"cruiser officer, not a flier"},{k:"Call",v:"launch at maximum range, all at once"},{k:"Trait",v:"cold, calculating judgment"}],body:["Handed the carriers after Halsey fell ill, Spruance made the crucial timing call: launch his air groups at long range to catch the Japanese while their decks were full.","It was a gamble on tempo over tidiness, and it put the Dauntlesses over Kido Butai at the perfect moment. He then declined to chase overnight — knowing when to stop deciding, too."],ai:"He owned the tempo decision himself and let his aircrews own the execution — mission command in a cockpit.",threads:["nimitz","fletcher","kido-butai","sbd-dauntless","auftragstaktik"]},fletcher:{title:"Frank Jack Fletcher",kind:"Person",chapter:"Midway",tagline:"The senior commander who held tactical authority, then handed it off cleanly.",image:null,stats:[{k:"Command",v:"Task Force 17 (Yorktown)"},{k:"Role",v:"officer in tactical command at Midway"},{k:"Coral Sea",v:"fought days earlier"},{k:"Handoff",v:"passed control to Spruance"}],body:["Fletcher was the senior officer present and directed the battle’s opening. When Yorktown was crippled and his flagship lost its command facilities, he passed tactical control to Spruance without friction.","The clean transfer of authority under fire kept the American decision loop intact at the moment it mattered most."],ai:"Legitimacy that transfers cleanly under damage keeps the decision system alive when a single node fails.",threads:["nimitz","spruance","yorktown","kido-butai"]},trinity:{title:"Trinity",kind:"Operation",chapter:"Atom",tagline:"The first nuclear detonation — and the quiet line that no one could take back.",image:null,stats:[{k:"Date",v:"5:29 a.m., 16 July 1945"},{k:"Site",v:"Alamogordo, New Mexico"},{k:"Yield",v:"~21 kilotons"},{k:"Bainbridge",v:"“Now we are all sons of bitches.”"}],body:["The plutonium implosion device worked on the first try, lighting the desert brighter than noon. Test director Kenneth Bainbridge’s in-the-moment verdict was blunt: “Now we are all sons of bitches.”","Oppenheimer’s famous “Now I am become Death” was a reflection he offered publicly in 1965, not words spoken at the shot. Trinity crossed a line that could never be uncrossed."],ai:"Some decisions are not reversible experiments; once executed, the world they create is the only world there is.",threads:["oppenheimer","doomsday-clock","franck-report"]},oppenheimer:{title:"J. Robert Oppenheimer",kind:"Person",chapter:"Atom",tagline:"The director who built the thing, then spent his life arguing about the choice.",image:null,stats:[{k:"Role",v:"Scientific Director, Los Alamos"},{k:"Trinity quote",v:"a 1965 recollection, not spoken then"},{k:"After",v:"urged international control"},{k:"1954",v:"security clearance revoked"}],body:["Oppenheimer welded a fractious community of physicists into a weapon in under three years. He believed building it was necessary; he was far less certain about how it should be used or controlled.","Afterward he pressed for civilian and international oversight, warned against a hydrogen bomb, and was stripped of his clearance. The man who compressed the decision spent the rest of his life on its consequences."],ai:"Whoever can build the capability rarely holds the legitimate authority to decide how it is used.",threads:["trinity","szilard-petition","franck-report","acheson-lilienthal"]},"szilard-petition":{title:"The Szilárd Petition",kind:"Document",chapter:"Atom",tagline:"Seventy scientists asked to be consulted before the bomb was used. It never reached the President.",image:null,stats:[{k:"Author",v:"Leó Szilárd"},{k:"Date",v:"July 1945"},{k:"Signatories",v:"~70 Manhattan Project scientists"},{k:"Ask",v:"don’t use it on Japan without warning"}],body:["Szilárd, who had helped start the project, circulated a petition urging that the bomb not be dropped on cities without a demonstration and a chance to surrender.","It moved slowly up the chain and was overtaken by events; Truman is not known to have seen it before the decision. The people closest to the knowledge had no path to the choice."],ai:"A signal without a channel to legitimate authority is not a decision input — it is a document filed after the fact.",threads:["franck-report","oppenheimer","einstein-telegram","acheson-lilienthal"]},"franck-report":{title:"The Franck Report",kind:"Document",chapter:"Atom",tagline:"A warning, weeks before Trinity, that surprise use would start an arms race.",image:null,stats:[{k:"Chair",v:"James Franck"},{k:"Date",v:"June 1945"},{k:"Argument",v:"demonstrate, don’t surprise"},{k:"Foresaw",v:"a nuclear arms race"}],body:["A committee of Chicago scientists argued that a surprise atomic attack would win a battle but lose the peace, forfeiting the moral standing needed to control the weapon internationally.","They proposed a demonstration before observers instead. The report was considered and set aside. Its prediction of an arms race arrived on schedule."],ai:"The clearest foresight fails if it can’t reach the decision at the moment the choice is still open.",threads:["szilard-petition","oppenheimer","acheson-lilienthal"]},"acheson-lilienthal":{title:"The Acheson–Lilienthal Report",kind:"Document",chapter:"Atom",tagline:"A 1946 blueprint to put the atom under international control — before it was too late.",image:null,stats:[{k:"Year",v:"1946"},{k:"Proposed",v:"international atomic authority"},{k:"Became",v:"basis of the Baruch Plan"},{k:"Outcome",v:"rejected amid Cold War distrust"}],body:["The report proposed a global authority to own dangerous nuclear activities outright, making a covert weapons race structurally difficult rather than merely forbidden.","Reworked into the Baruch Plan and presented to the UN, it foundered on US–Soviet mistrust. The window for designing the system before the race began closed."],ai:"Designing legitimate governance ahead of a capability is far cheaper than trying to retrofit it after deployment.",threads:["franck-report","szilard-petition","doomsday-clock"]},"doomsday-clock":{title:"The Doomsday Clock",kind:"Concept",chapter:"Atom",tagline:"A metaphor turned into a metric for how close we’ve steered to catastrophe.",image:null,stats:[{k:"Created",v:"1947"},{k:"By",v:"Bulletin of the Atomic Scientists"},{k:"First setting",v:"7 minutes to midnight"},{k:"Jan 2026",v:"85 seconds — closest ever"}],body:["The scientists who built the bomb created a clock to hold the world’s attention on the choice they had opened. Midnight is catastrophe; the hands move with human decisions, not physics.","It endures because the underlying condition does: a capability now permanent, governed only by the quality of continuous decisions. The 2026 statement names artificial intelligence among its drivers for the first time."],ai:"When a capability can’t be un-invented, safety becomes an ongoing decision discipline, not a one-time fix.",threads:["acheson-lilienthal","franck-report","trinity"]},"einstein-telegram":{title:"The Einstein–Szilárd Letter",kind:"Document",chapter:"Atom",tagline:"The 1939 letter that put the choice on a President’s desk in the first place.",image:null,stats:[{k:"Date",v:"August 1939"},{k:"Drafted by",v:"Leó Szilárd"},{k:"Signed by",v:"Albert Einstein"},{k:"To",v:"President Franklin Roosevelt"}],body:["Szilárd drafted, and Einstein signed, a warning that Germany might build a nuclear weapon and that the US should begin its own research. It set in motion what became the Manhattan Project.","Both later regretted opening the door. The signal that started everything was sent by the very people who would spend the next decade trying to contain it."],ai:"The decision to begin is itself a choice — and the hardest one to see as reversible while you’re making it.",threads:["szilard-petition","oppenheimer","trinity"]}},Iu={"char-b1-bis":{lens:"A single node with excellent compute and armor, but catastrophic internal I/O: one man in the turret had to spot, aim, load, and fire while also commanding the vehicle. Raw specs beat the German tanks; the serialized single-thread choked under its own workload.",primitives:[{k:"Cohesion",v:"high (everything in one node)"},{k:"Concurrency",v:"none — one operator, four jobs"},{k:"Latency",v:"internal, self-inflicted"},{k:"Bottleneck",v:"the commander thread"},{k:"Throughput",v:"low despite high capacity"}],flow:["Spot","Command","Aim/Load","Fire"],break:1,breakLabel:"one thread doing everything — commander is the bottleneck",architect:"In your stack this is the powerful monolith where a single request handler also does auth, business logic, serialization, and I/O on one thread: benchmarks great in isolation, collapses the moment concurrent work arrives. Capacity is not throughput."},"panzer-iii":{lens:"Individually weaker than its French counterparts, but every tank carried a radio and the turret split work across three crew. The advantage was not the node — it was the message bus and role separation that let modest nodes act as one coordinated fleet.",primitives:[{k:"Coupling",v:"loose, radio-networked"},{k:"Cohesion",v:"clean role split in the turret"},{k:"Observability",v:"every node reports and receives"},{k:"Latency",v:"low decision-to-action"},{k:"Scaling",v:"horizontal — the fleet, not the unit"}],flow:["Spot","Radio net","Coordinate","Fire"],break:-1,breakLabel:"healthy — throughput came from the comms layer, not the specs",architect:"Commodity nodes on a real event bus with separated concerns beat one over-specced box every time. You are buying coordination and observability, not per-unit horsepower — the classic argument for many small services over one heroic instance."},guderian:{lens:"The platform architect who insisted the fighting units be networked before they were up-gunned. He designed concentration + radio + combined arms as a system spec, refusing to treat tanks as faster infantry support.",primitives:[{k:"Design authority",v:"system-level, not component"},{k:"Interface",v:"radio as the mandated contract"},{k:"Coupling",v:"combined arms, loosely orchestrated"},{k:"Failure mode designed out",v:"dispersion / dilution"}],flow:["Doctrine","Comms layer","Concentrate force","Breakthrough"],break:-1,breakLabel:"healthy — the architect who made the bus a requirement, not an add-on",architect:"The lead who wins the fight by mandating the messaging contract and concentration pattern up front, rather than letting each team optimize its own component. Architecture is deciding what everyone must share before anyone builds."},manstein:{lens:"The strategist who moved the attack axis off the fortified front and onto the unguarded seam between two French army groups. He did not out-build the defense; he found the interface nobody had hardened.",primitives:[{k:"Attack surface",v:"the boundary between two commands"},{k:"Coupling (enemy)",v:"organizational seam, weakly owned"},{k:"Blast radius",v:"total — one seam, whole line"},{k:"Assumption exploited",v:'"this path is safe"'}],flow:["Find the seam","Mass at Ardennes","Cross at Sedan","Exploit"],break:0,breakLabel:"the unhardened boundary nobody owned",architect:"In your stack this is the unowned integration boundary between two teams’ services — each assumed the other secured it. Conway’s law drew the org seam; the attacker targeted exactly that seam because defense-in-depth stopped at the org chart."},auftragstaktik:{lens:"Authority pushed to the edge: the center publishes intent as a stable contract and delegates execution to autonomous units. Decisions happen where the signal arrives, not after a round trip to headquarters.",primitives:[{k:"Coupling",v:"loose"},{k:"Authority placement",v:"edge"},{k:"Contract",v:"commander’s intent (stable)"},{k:"Latency",v:"near-zero at the point of action"},{k:"Feedback loop",v:"local, immediate"}],flow:["Signal at edge","Interpret vs. intent","Act locally","Consequence"],break:-1,breakLabel:"healthy — permission was pre-granted by the published intent",architect:"Intent as a stable contract plus autonomous services acting within it — the opposite of a synchronous approval RPC to a central orchestrator on every request. You remove the round trip by pre-authorizing the decision space, not by making the center faster."},ardennes:{lens:'A code path the French declared unreachable ("impassable to armor"), therefore never hardened and barely monitored. The assumption was load-bearing and untested — the definition of the attack surface you did not threat-model.',primitives:[{k:"Assumption",v:"unreachable path, never verified"},{k:"Observability",v:"minimal — nobody watched it"},{k:"Defense",v:"deprioritized on the assumption"},{k:"Failure mode",v:"silent until breached"}],flow:["Assess terrain","Assume impassable","Deprioritize defense","Breach"],break:1,breakLabel:"the assumption that was never tested",architect:"Every incident review has one: the path assumed dead-code or unreachable, so it skipped hardening and monitoring. Untested assumptions are not safe — they are just unobserved. Threat-model the paths you believe can’t happen."},"sedan-1940":{lens:"The single crossing where the breach became a rupture. A failure at one boundary node propagated laterally along the whole front because there was no bulkhead to contain it.",primitives:[{k:"Single point of failure",v:"the river crossing"},{k:"Blast radius",v:"uncontained — raced to the coast"},{k:"Bulkheads",v:"absent"},{k:"Back-pressure",v:"none — collapse cascaded"}],flow:["Cross river","Rupture the line","Cascade laterally","Race to coast"],break:1,breakLabel:"no bulkhead — one breach became total collapse",architect:"A local failure with no compartmentalization: no circuit breaker, no bulkhead, no blast-radius limit, so a single boundary breach cascades system-wide. Design for containment, not just prevention — assume the breach and cap what it can reach."},pervitin:{lens:"Overclocking the operators to compress operational tempo — methamphetamine kept crews awake so the whole system ran hotter and faster than sustainable. It bought latency reduction against accruing debt with no cooldown loop.",primitives:[{k:"Tempo",v:"overclocked"},{k:"Back-pressure",v:"suppressed, not absent"},{k:"Sustainability",v:"short-window only"},{k:"Failure mode",v:"deferred crash"}],flow:["Push tempo","Suppress rest","Sustain the burst","Crash"],break:1,breakLabel:"back-pressure disabled — debt accrues silently",architect:"Turning off back-pressure to hit a latency target: the queue keeps accepting, throughput looks great, and the accrued load lands as a cliff later. Fast because you disabled the safety, not because you got faster."},yamato:{lens:"A maximally optimized subsystem for a workload that no longer existed. Superb internal cohesion and armor, engineered for a battleship gun duel while the traffic pattern had already shifted to carrier air power.",primitives:[{k:"Cohesion",v:"high internally"},{k:"Fit-to-environment",v:"obsolete"},{k:"Reversibility",v:"none — sunk-cost lock-in"},{k:"Optimization",v:"local, of the wrong metric"}],flow:["Detect fleet","Close range","Fire main guns","Decide battle"],break:2,breakLabel:"the capability optimized for a workload that vanished",architect:"Local optimization of a legacy component while the traffic pattern the whole system serves has changed — the platform nobody will question because too much status and budget are sunk into it. Optimizing the wrong metric to perfection."},musashi:{lens:"The redundant replica of an already-obsolete design — high availability for a service the environment had stopped calling. Sunk by air attack at Leyte having barely fired her main guns at another ship.",primitives:[{k:"Redundancy",v:"HA for a dead workload"},{k:"Fit-to-environment",v:"obsolete (doubled)"},{k:"Defense-in-depth",v:"none vs. the actual threat (air)"},{k:"Sunk cost",v:"doubled the wrong bet"}],flow:["Deploy","Air attack inbound","No answer to it","Sunk"],break:2,breakLabel:"HA replica of an obsolete design, undefended against the real threat",architect:"Standing up a hot replica of a service nobody calls, while the actual load — air attack — hits a dimension you never provisioned for. Redundancy of the wrong thing is cost, not resilience."},"eighteen-inch-guns":{lens:"The largest naval guns ever mounted, provisioned for a peak-load event — a capital-ship gun duel — that never arrived. Enormous capability spent against a use case that failed to materialize.",primitives:[{k:"Capacity",v:'maximal (18.1")'},{k:"Utilization",v:"near-zero against intended target"},{k:"Provisioning",v:"for a peak that never came"},{k:"Reversibility",v:"none — cast into the hull"}],flow:["Range enemy fleet","Aim",'Fire 18.1"',"Decide"],break:2,breakLabel:"over-provisioned for a peak load that never arrived",architect:"Sizing your most expensive capability to a peak-traffic scenario the market never delivers, and hard-wiring it so it can’t be repurposed. Premature optimization at the scale of a national budget."},"kantai-kessen":{lens:"A doctrine that designed the entire fleet around one anticipated decisive engagement — the wrong success model. The system waited for a batch event the environment never scheduled, and starved of relevance in the meantime.",primitives:[{k:"Success model",v:"single anticipated event"},{k:"Feedback loop",v:'deferred until "the battle"'},{k:"Coupling",v:"whole fleet to one scenario"},{k:"Failure mode",v:"the event never fires"}],flow:["Wait","Mass the fleet","Decisive battle","Win war"],break:0,breakLabel:"waiting for the event the environment never delivers",architect:"Architecting the whole system around a single anticipated trigger — the big-bang cutover, the one decisive release — while the real world runs continuously. Design for the steady stream, not the batch job you keep waiting to run."},"operation-ten-go":{lens:"Deploying an irreplaceable asset into a known-fatal environment with no protection, to justify sunk cost. Yamato’s one-way sortie to Okinawa without air cover — an aircraft-controlled zone — ended exactly as the telemetry predicted.",primitives:[{k:"Blast radius",v:"total loss of the asset"},{k:"Observability",v:"outcome was fully foreseeable"},{k:"Reversibility",v:"none — one-way by design"},{k:"Decision driver",v:"sunk cost, not evidence"}],flow:["Order sortie","Transit exposed","No air cover","Sunk"],break:2,breakLabel:"irreplaceable asset pushed into a known-fatal environment",architect:"Pushing your last irreplaceable instance into a region you already know is hostile, because retiring it would admit the investment was wrong. The sunk-cost fallacy encoded as a deployment."},"battle-off-samar":{lens:"Cheap, numerous edge nodes — escort carriers and destroyers — used aggression and deception to repel a heavy centralized force including Yamato. The monolith’s commander then misread his own telemetry and withdrew with the win in hand.",primitives:[{k:"Topology",v:"swarm of cheap nodes vs. one heavy asset"},{k:"Tactics",v:"aggressive, high fan-out"},{k:"Observability (Kurita)",v:"misread — saw a bigger force than present"},{k:"Failure mode",v:"monolith aborts on bad reads"}],flow:["Contact","Swarm resists","Kurita reads scope","Retreat"],break:2,breakLabel:"the monolith misread its telemetry and aborted a won engagement",architect:"A swarm of commodity nodes with aggressive behavior overwhelms one over-specced asset — and the heavy system’s operator, working from noisy observability, backs off a fight he was winning. Bad dashboards make strong systems retreat."},"iowa-class":{lens:"A general-purpose platform that stayed relevant by being reconfigurable — repurposed as carrier escort, anti-air battery, and shore bombardment as the mission changed. The anti-Yamato: designed for adaptation, not a single workload.",primitives:[{k:"Fit-to-environment",v:"maintained by reconfiguration"},{k:"Coupling",v:"loose to any one mission"},{k:"Reversibility",v:"high — re-roleable"},{k:"Longevity",v:"decades, across eras"}],flow:["New mission","Reconfigure role","Execute","Stay relevant"],break:-1,breakLabel:"healthy — a general-purpose platform that outlived its original workload",architect:"The general-purpose service with clean, re-roleable interfaces that survives three platform migrations because it never over-committed to one traffic pattern. Adaptability is a hedge against your roadmap being wrong."},"radar-fire-control":{lens:"An observability layer that rewrote the engagement contract — radar-directed gunnery let ships fight at night and beyond visual range, moving the aiming decision out of the human eye and into instrumentation.",primitives:[{k:"Observability",v:"sensing beyond the human loop"},{k:"Interface change",v:'redefined what "range" means'},{k:"Latency",v:"solution computed continuously"},{k:"Advantage",v:"the older aiming method obsoleted"}],flow:["Radar contact","Compute solution","Fire","Hit in the dark"],break:-1,breakLabel:"healthy — instrumentation that changed the rules of engagement",architect:"The telemetry upgrade that doesn’t just report the world but changes the contract of the game — like tracing that lets you act on requests you previously couldn’t even see. Observability isn’t monitoring; sometimes it’s the weapon."},donitz:{lens:"An operations leader who ran the campaign on a proxy metric — tonnage sunk — while the real metric, the exchange rate of boats-for-ships, silently inverted. A control plane addicted to a number that stopped tracking the outcome.",primitives:[{k:"Feedback loop",v:"wrong referee (tonnage, not attrition)"},{k:"Control point",v:"centralized, metric-driven"},{k:"Metric",v:"proxy diverged from goal"},{k:"Observability",v:"measured the flattering number"}],flow:["Sink a ship","Count tonnage","Report up","Judge winning"],break:1,breakLabel:"optimizing the proxy metric while the real loop inverted",architect:"The org steering on a vanity KPI — requests served, tonnage sunk — while the ratio that actually decides survival (cost per outcome, boats lost per ship) turns against it unwatched. Pick the referee before you optimize, or you’ll win the wrong scoreboard."},"type-vii-uboat":{lens:"A node with a fundamental design constraint: it had to surface to charge and transit, and had to phone home by radio. Its strength was concealment, but its architecture forced it to periodically expose itself on an observable channel.",primitives:[{k:"Design constraint",v:"must surface = must expose"},{k:"Side channel",v:"radio + surfaced silhouette"},{k:"Coupling",v:"dependent on central command"},{k:"Failure mode",v:"caught during exposure window"}],flow:["Submerged patrol","Surface to charge","Radio home","Attack"],break:1,breakLabel:"the design forces periodic exposure on an observable channel",architect:'The "offline" component that must periodically call home over a channel the adversary can watch — its confidentiality is broken not by a flaw but by its required reporting behavior. If it has to phone home, that call is your attack surface.'},wolfpack:{lens:"A centralized coordinator (BdU) fanned out orders over a broadcast channel; coordinating the pack required constant chatter. The coordination traffic itself became the leak.",primitives:[{k:"Coupling",v:"tight, hub-and-spoke"},{k:"Fan-out",v:"broadcast to the pack"},{k:"Side channel",v:"radio emissions = position"},{k:"Observability",v:"leaks to the adversary"}],flow:["Sight convoy","Radio BdU","Coordinate pack","Attack"],break:2,breakLabel:"a chatty control plane broadcasting on an observable channel",architect:"A chatty control plane that broadcasts on an observable channel — your coordination traffic is itself a side-channel the adversary triangulates (HF/DF). The more your nodes must talk to stay in sync, the more you leak about where they are."},"hf-df":{lens:"The adversary’s tracing infrastructure: high-frequency direction finding turned every U-boat transmission into a fix. It weaponized the enemy’s own coordination traffic — distributed tracing run by the other side.",primitives:[{k:"Observability (theirs)",v:"your traffic, their map"},{k:"Input",v:"the enemy’s required emissions"},{k:"Feedback loop",v:"transmit → fix → vector escorts"},{k:"Exploit",v:"coordination as a locator"}],flow:["U-boat transmits","Triangulate the fix","Vector escorts","Kill"],break:-1,breakLabel:"healthy (for the Allies) — the enemy’s chatter became the enemy’s map",architect:"When your adversary builds tracing on the emissions your own protocol requires, their observability is your liability. Assume any channel your system must use to coordinate is being correlated by someone who wants to find your nodes."},"centimetric-radar":{lens:"A sensing upgrade that operated outside the band the adversary was monitoring — short-wave radar (cavity magnetron) the Germans’ Metox receiver couldn’t detect. The defenders were watching the wrong frequency and went blind to a side channel they didn’t know existed.",primitives:[{k:"Detection surface",v:"outside adversary’s monitored band"},{k:"Observability asymmetry",v:"we see, they can’t hear us looking"},{k:"Blind spot (theirs)",v:"wrong frequency watched"},{k:"Advantage window",v:"until they discovered the band"}],flow:["Sub surfaces","Detect on new band","Attack undetected","Kill"],break:-1,breakLabel:"healthy — sensing on a band the adversary never thought to monitor",architect:"You can be fully instrumented against the threats you modeled and completely blind to a channel outside your monitored spectrum. The Germans monitored one band and trusted the silence; the signal was simply somewhere they weren’t looking."},"escort-carrier":{lens:"Cheap, mass-produced carriers deployed to close a coverage gap in the topology. Not elite assets — commodity capacity, scaled horizontally to put air cover everywhere the map had a hole.",primitives:[{k:"Scaling",v:"horizontal, commodity units"},{k:"Cost",v:"low per node"},{k:"Coverage",v:"fills the topology gap"},{k:"Redundancy",v:"many, expendable"}],flow:["Gap in coverage","Deploy cheap carriers","Close the gap","Air cover everywhere"],break:-1,breakLabel:"healthy — commodity horizontal capacity plugging a coverage hole",architect:"Solving a coverage gap with cheap, numerous, expendable nodes rather than a few gold-plated ones — the case for scaling out with commodity instances to cover the whole request surface instead of over-investing in a handful."},"mid-atlantic-gap":{lens:'The "black pit" — the region beyond land-based air cover where the observability and defense map had a hole, and where losses therefore concentrated. Failures cluster wherever monitoring stops.',primitives:[{k:"Coverage gap",v:"no air = no monitoring"},{k:"Blind spot",v:"the map’s dead zone"},{k:"Failure concentration",v:"losses cluster here"},{k:"Root cause",v:"range limit, not tactics"}],flow:["Convoy enters gap","No air cover","Wolfpack strikes","Losses"],break:1,breakLabel:"the unmonitored region where failures concentrate",architect:"Every system has a black pit: the code path, region, or time window your monitoring and defenses don’t reach. Incidents don’t distribute evenly — they pool exactly where coverage ends. Map your gaps before the adversary maps them for you."},blackett:{lens:"The operational-research lead who fixed the system by measuring the real loop instead of trusting intuition — resizing convoys, retuning depth charges, repainting aircraft, all driven by data on what actually changed the kill rate. The SRE who corrected the scoreboard.",primitives:[{k:"Feedback loop",v:"rebuilt around the true metric"},{k:"Method",v:"measure, don’t assume"},{k:"Tuning",v:"evidence-driven parameter changes"},{k:"Outcome",v:"exchange rate inverted in the Allies’ favor"}],flow:["Measure the real loop","Find the true metric","Retune parameters","Kill rate up"],break:-1,breakLabel:"healthy — instrument the real objective, then tune to it",architect:"The data engineer who ignores folklore, instruments the actual objective function, and tunes the knobs that move it — larger convoys, deeper charge settings. This is how you replace a wrong scoreboard: measure the outcome, not the proxy."},"black-may":{lens:"The moment the delayed feedback finally arrived — May 1943, U-boat losses spiked and Dönitz withdrew. The real cost had been accruing invisibly; the loop closed all at once and forced the retreat.",primitives:[{k:"Feedback latency",v:"long — truth arrived late"},{k:"Metric correction",v:"proxy caught up with reality"},{k:"Tipping point",v:"losses crossed the threshold"},{k:"Response",v:"withdraw — the loop finally acted"}],flow:["Losses spike","True cost surfaces","Threshold crossed","Withdraw"],break:-1,breakLabel:"the correction — the lagging feedback finally closed the loop",architect:"What a lagging feedback loop looks like when it finally fires: months of accruing cost invisible to the dashboard, then a single reporting period where reality lands as a cliff. Shorten your feedback latency or your corrections will always arrive as crises."},"ultra-enigma":{lens:"A pipeline that read the adversary’s own event stream — decrypting enemy traffic into actionable intelligence. The upstream source that turned an opponent’s internal messaging into your telemetry.",primitives:[{k:"Observability",v:"adversary’s traffic as your feed"},{k:"Pipeline",v:"intercept → decrypt → interpret"},{k:"Contract",v:"their message format, reverse-engineered"},{k:"Discipline required",v:"act without revealing the source"}],flow:["Intercept","Decrypt","Interpret","Act quietly"],break:-1,breakLabel:"healthy — reading the opponent’s stream and acting without exposing it",architect:"Consuming an adversary’s internal event stream as intelligence — and the hard part isn’t decryption, it’s acting on it without leaking that you can, the same discipline as using a data source you’re not supposed to reveal you have."},rochefort:{lens:'The senior analyst trusted to interpret ambiguous telemetry and commit to a reading — the human at the analysis node who staked his credibility on "AF is Midway" when the decode was incomplete.',primitives:[{k:"Authority placement",v:"at the analysis node"},{k:"Signal quality",v:"partial, ambiguous"},{k:"Decision",v:"commit to an interpretation"},{k:"Trust",v:"earned autonomy to call it"}],flow:["Ambiguous decode","Interpret","Commit to a call","Command acts"],break:-1,breakLabel:"healthy — trusted judgment committing on partial evidence",architect:"The senior engineer who is trusted to read noisy signals and make the call without escalating every ambiguity upward. Sufficient-evidence decision-making requires pre-granted authority to interpret; otherwise the analysis stalls waiting for certainty that never comes."},"station-hypo":{lens:"The decode service that turned intercepted ciphertext into intelligence — a specialized analytics pipeline with the skill and context to extract signal from a partially-broken source.",primitives:[{k:"Cohesion",v:"specialized, expert team"},{k:"Pipeline",v:"ciphertext → fragments → meaning"},{k:"Throughput",v:"enough signal, fast enough"},{k:"Coupling",v:"fed the decision-maker directly"}],flow:["Intercept","Partial decode","Assemble picture","Feed command"],break:-1,breakLabel:"healthy — the analytics service that made the ambiguous actionable",architect:"The dedicated analytics service that sits between raw feeds and decision-makers, staffed by people with the domain context to make partial data mean something. The value is in the interpretation layer, not the raw ingest."},"jn-25":{lens:"The adversary’s message format — only partially parseable, yet the fragments were sufficient. A broken-but-readable contract from which enough structure could be recovered to act.",primitives:[{k:"Interface",v:"partially reverse-engineered"},{k:"Signal",v:"incomplete but sufficient"},{k:"Sufficiency",v:"fragments → confident decision"},{k:"Failure mode (theirs)",v:"reused code, slow rotation"}],flow:["Encrypted traffic","Partial parse","Recover fragments","Sufficient signal"],break:-1,breakLabel:"healthy — a partly-parsed contract that still yielded enough",architect:"Proof that you don’t need to fully parse a message to extract decisive value — recovering enough of an undocumented format to act. Sufficiency beats completeness; the enemy’s failure was slow key rotation, the reused-secret anti-pattern."},"af-water-ruse":{lens:'An active probe injected to disambiguate the data — a fake "Midway is short of water" message sent in the clear, so that the enemy’s intercepted report of it would confirm the hypothesis that AF meant Midway. A falsification test run against a live adversary.',primitives:[{k:"Falsification test",v:"a controlled probe"},{k:"Canary",v:"inject a known, watch the echo"},{k:"Idempotency",v:"safe, reversible probe"},{k:"Confirmation",v:"hypothesis moved to certainty"}],flow:["Hypothesis: AF=Midway","Inject probe","Observe the echo","Confirm"],break:-1,breakLabel:"healthy — a designed probe that turned a guess into a confirmed fact",architect:"The textbook move: you have a hypothesis and ambiguous data, so you inject a controlled, harmless probe and watch which path lights up. A canary request built specifically to falsify or confirm a belief — evidence engineered, not just gathered."},nimitz:{lens:"The decision-maker who pre-positioned force based on sufficient evidence — moving carriers to Point Luck to ambush, committing authority and resources ahead of the event rather than reacting to it. The healthy pipeline: signal to pre-committed consequence.",primitives:[{k:"Authority",v:"pre-committed on evidence"},{k:"Latency",v:"zero at the event — already positioned"},{k:"Feedback loop",v:"signal → decision → ambush"},{k:"Risk posture",v:"act on sufficient, not certain"}],flow:["Sufficient intel","Pre-position force","Enemy arrives","Ambush"],break:-1,breakLabel:"healthy — authority and force pre-committed ahead of the signal",architect:"The whole architecture working: a signal deemed sufficient triggers pre-positioning, so when the event fires the response latency is zero because the decision was already made. Pre-authorize and pre-stage on good evidence instead of scrambling reactively."},yorktown:{lens:"A damaged carrier repaired in 72 hours against an estimate of months — right-sizing the fix to the mission deadline instead of the maintenance manual. Known technical debt accepted deliberately to hit the deployment window.",primitives:[{k:"Reversibility",v:"debt carried, not eliminated"},{k:"Latency",v:"72h vs. months — a decision, not a calendar"},{k:"SLA fit",v:"repair scoped to the mission window"},{k:"Risk",v:"accepted, known, bounded"}],flow:["Damage assessed","Scope to the window","Patch, not perfect","Deploy on time"],break:-1,breakLabel:"healthy — accepted known debt to hit the deployment window",architect:"Right-sizing the repair to the mission SLA instead of the maintenance runbook — accept known technical debt to hit the deployment window. The discipline is deciding what not to fix, on purpose, and knowing the debt you’re carrying."},"sbd-dauntless":{lens:"The effector at the end of the pipeline — a cheap, precise dive bomber that delivered the actual consequence in a few decisive minutes. All the intelligence upstream meant nothing without the actuator that converted signal into outcome.",primitives:[{k:"Role",v:"the effector / actuator"},{k:"Precision",v:"high, at the decisive moment"},{k:"Cost",v:"low per unit"},{k:"Coupling",v:"terminal node of the whole chain"}],flow:["Intel delivered","Vector to target","Dive","Consequence"],break:-1,breakLabel:"healthy — the actuator that turned signal into outcome",architect:"The cheap, precise effector at the terminus of the pipeline: every upstream service — intercept, decode, positioning — is worthless if the final actuator can’t deliver consequence at the right moment. Never under-invest in the node that actually acts."},"kido-butai":{lens:"A tightly-coupled, high-value cluster caught in an inconsistent state — the Japanese carrier force with decks full of rearming aircraft when the attack landed. A race condition on the flight deck: caught mid-transaction, all four eggs in one blast radius, no defense-in-depth.",primitives:[{k:"Coupling",v:"tight — four carriers, one formation"},{k:"Consistency",v:"caught mid-transaction (rearming)"},{k:"Blast radius",v:"total — one strike, whole cluster"},{k:"Defense-in-depth",v:"none at the vulnerable moment"}],flow:["Launch strike","Rearm on deck","Caught inconsistent","Destroyed"],break:2,breakLabel:"caught mid-transaction — a race condition on the flight deck",architect:"A tightly-coupled high-value cluster hit during a non-atomic state change — decks loaded with fuel and ordnance mid-swap. It’s a race condition with a planetary blast radius: no isolation, no atomicity, everything critical exposed in the same window."},spruance:{lens:"The operator who committed at the right window and then knew when to stop — launched at the decisive moment, then withdrew rather than press a night engagement he couldn’t control. Disciplined blast-radius management.",primitives:[{k:"Timing",v:"committed at the optimal window"},{k:"Blast radius",v:"controlled — didn’t overreach"},{k:"Risk posture",v:"take the win, cap the downside"},{k:"Restraint",v:"stopped while ahead"}],flow:["Read the window","Commit the strike","Take the win","Withdraw"],break:-1,breakLabel:"healthy — committed decisively, then capped the downside",architect:"The operator who ships at the right moment and then resists the temptation to push further into conditions he can’t observe or control. Knowing when to stop is blast-radius discipline — the win is banked, the tail risk is declined."},fletcher:{lens:"The senior commander who delegated tactical control to Spruance at the decisive moment — authority placed at the edge where the real-time decisions had to happen. Loose coupling of command under fire.",primitives:[{k:"Authority placement",v:"delegated to the edge"},{k:"Coupling",v:"loose — no bottleneck through the top"},{k:"Latency",v:"decisions made where the action was"},{k:"Trust",v:"edge autonomy, pre-granted"}],flow:["Overall command","Delegate to edge","Edge decides","Act in real time"],break:-1,breakLabel:"healthy — authority delegated to the edge at the decisive moment",architect:"The senior who removes himself as a bottleneck by delegating decision authority to the node closest to the action. The opposite of routing every tactical call through the top — command that scales because it doesn’t centralize the decisions that must be fast."},trinity:{lens:"A deploy to production with no rollback path — a one-way state transition tested exactly once, with a blast radius that was planetary and permanent. The first commit that could never be reverted.",primitives:[{k:"Reversibility",v:"none — no rollback"},{k:"Blast radius",v:"unbounded"},{k:"Testing",v:"single shot, live"},{k:"Idempotency",v:"irrelevant — one-way"}],flow:["Assemble","Arm","Detonate","Permanent state"],break:2,breakLabel:"the irreversible commit — no rollback exists past this node",architect:"The migration with no down-script and no staging environment — you run it once, in prod, and whatever happens is now the permanent state of the world. Where reversibility is impossible, the entire discipline must move upstream into governance before the action."},oppenheimer:{lens:"The architect who shipped an irreversible capability and only afterward tried to build the governance around it. Capability outran control — the gate was proposed after the deploy that made it necessary.",primitives:[{k:"Sequencing",v:"capability before governance"},{k:"Control point",v:"proposed too late"},{k:"Reversibility",v:"none — the capability persists"},{k:"Failure mode",v:"governance retrofit on a live system"}],flow:["Build capability","Ship it","Confront governance","Too late"],break:1,breakLabel:"no governance gate before the irreversible ship",architect:"Shipping a powerful, irreversible capability first and reaching for the control plane afterward. For anything with no rollback, governance is not a follow-up ticket — the gate must exist before the merge, because you cannot retrofit control onto a capability already loose in the world."},"szilard-petition":{lens:"An internal dissent — an RFC — attempting to insert a governance gate before the irreversible action: scientists petitioning against using the bomb on cities without warning. The gate was raised and then bypassed.",primitives:[{k:"Control point",v:"proposed governance gate"},{k:"Dissent channel",v:"formal, from inside"},{k:"Outcome",v:"gate bypassed"},{k:"Reversibility",v:"the decision it opposed had none"}],flow:["Raise objection","Petition upward","Gate ignored","Irreversible use"],break:2,breakLabel:"the governance gate was raised, then bypassed",architect:"The internal RFC that tries to insert an approval gate ahead of an irreversible action — and gets overridden. The lesson isn’t that dissent existed; it’s that a governance gate with no enforcement authority is just a comment thread on a merged PR."},"franck-report":{lens:"A design review proposing a reversible, observable alternative — a demonstration blast rather than surprise military use — before the irreversible path was chosen. The reversible option was reviewed and rejected.",primitives:[{k:"Alternative",v:"a reversible / observable option"},{k:"Review",v:"formal, pre-decision"},{k:"Outcome",v:"reversible path rejected"},{k:"Trade-off",v:"demonstration vs. surprise"}],flow:["Propose demonstration","Review","Rejected","Irreversible use"],break:2,breakLabel:"the reversible alternative was rejected for the irreversible one",architect:"A design review that surfaced a reversible, observable option — a demo you could learn from before committing — and it lost. When a reversible path exists for a no-rollback action, rejecting it should require an extraordinarily high bar; here it didn’t clear it."},"acheson-lilienthal":{lens:"A proposal to build the missing control plane after the capability already existed — international governance over atomic energy. The attempt to install an authority layer over a dangerous capability, negotiated too late and never adopted.",primitives:[{k:"Control plane",v:"proposed, post-hoc"},{k:"Authority placement",v:"central, international"},{k:"Timing",v:"after the capability was loose"},{k:"Outcome",v:"never adopted"}],flow:["Capability exists","Propose control plane","Negotiate","Fails to land"],break:3,breakLabel:"the control plane, proposed too late, never adopted",architect:"The attempt to stand up a governance control plane over a capability that already escaped — and the reason it usually fails: once every actor holds the capability, none will cede control to a central authority. Build the control plane before you distribute the power, or you won’t get to."},"doomsday-clock":{lens:"An observability dashboard for an irreversible-risk system — a single continuously-maintained indicator of how close the no-rollback condition is. Not a control, a monitor: the SLO gauge for civilizational blast radius.",primitives:[{k:"Observability",v:"continuous risk indicator"},{k:"Scope",v:"a no-rollback condition"},{k:"Feedback loop",v:"expert-adjusted, published"},{k:"Actuation",v:"none — it only warns"}],flow:["Assess risk","Set the clock","Publish","Warn"],break:-1,breakLabel:"healthy (as a monitor) — a dashboard for an irreversible-risk system",architect:"A single published gauge tracking proximity to an irreversible failure — an SLO dashboard for a no-rollback system. Useful, but note its limit: it observes and warns without actuating. A monitor with no attached control plane can only tell you how close you are."},"einstein-telegram":{lens:"The initiating signal that started the whole pipeline — the Einstein–Szilard letter to Roosevelt. Once emitted, the event could not be un-emitted; it triggered a chain that had no rollback to its own beginning.",primitives:[{k:"Trigger",v:"the first emit"},{k:"Reversibility",v:"none — the chain, once started"},{k:"Fan-out",v:"launched an entire program"},{k:"Idempotency",v:"irrelevant — a single decisive event"}],flow:["Perceive the risk","Send the telegram","Program launches","Irreversible path"],break:2,breakLabel:"the emit that could not be un-emitted",architect:"The one message that, once sent, sets an irreversible chain in motion — the event you can’t retract because everything downstream has already consumed it. Some emits are commits: before you fire the trigger, be sure you can live with every consequence it fans out to."}},lM="/midway/assets/img/dossier/";let An,Vh,Wh,Om,mi,Ti=[];function Fm(){An||(An=document.createElement("div"),An.id="codex",An.innerHTML=`
    <div class="codex-scrim" data-codex-close></div>
    <aside class="codex-panel" role="dialog" aria-modal="true" aria-label="Dossier" tabindex="-1">
      <header class="codex-head">
        <nav class="codex-crumbs" id="codex-crumbs" aria-label="Trail"></nav>
        <button class="codex-close" data-codex-close aria-label="Close dossier">✕</button>
      </header>
      <div class="codex-scroll"><div class="codex-body" id="codex-body"></div></div>
      <div class="codex-depthbar"><span></span></div>
    </aside>`,document.body.appendChild(An),Vh=An.querySelector(".codex-panel"),Wh=An.querySelector("#codex-body"),Om=An.querySelector("#codex-crumbs"),mi=document.createElement("div"),mi.id="codex-tip",mi.setAttribute("aria-hidden","true"),document.body.appendChild(mi))}function Lt(r){return String(r??"")}function Bm(r){const e=(r||[]).filter(t=>li[t]);return e.length?`<div class="codex-threads"><div class="codex-threads-h">PULL THE THREAD</div><div class="codex-thread-list">${e.map(t=>`<button class="codex-thread" data-dossier="${t}"><span class="ct-kind">${Lt(li[t].kind)}</span><span class="ct-title">${Lt(li[t].title)}</span><span class="ct-arrow">→</span></button>`).join("")}</div></div>`:""}function cM(r,e,t){const n=r.length,i=96,s=46,a=34,o=10,l=16,c=t?40:12,h=o*2+n*i+(n-1)*a,d=l+s+c,u=e===-1;let f="";for(let _=0;_<n;_++){const v=o+_*(i+a),p=l,m=_===e,g=m?"var(--a-late)":u?"var(--a-build)":"var(--steel)";if(_<n-1){const y=v+i,S=v+i+a,E=p+s/2;f+=`<line x1="${y}" y1="${E}" x2="${S-6}" y2="${E}" stroke="var(--line)" stroke-width="1.5"/>`,f+=`<path d="M${S-6},${E-4} L${S},${E} L${S-6},${E+4} Z" fill="var(--ink-faint)"/>`}f+=`<rect x="${v}" y="${p}" width="${i}" height="${s}" rx="4" fill="#0a0e15" stroke="${g}" stroke-width="${m?2.5:1.2}"/>`,f+=`<text x="${v+i/2}" y="${p+s/2+4}" text-anchor="middle" class="flow-t">${Lt(r[_])}</text>`,m&&t&&(f+=`<text x="${v+i/2}" y="${p+s+22}" text-anchor="middle" class="flow-brk">▲ ${Lt(t)}</text>`)}return u&&(f+=`<text x="${h-o}" y="${d-4}" text-anchor="end" class="flow-ok">✓ moved before the window closed</text>`),`<svg class="codex-flow" viewBox="0 0 ${h} ${d}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="signal to consequence pipeline">${f}</svg>`}function zm(r){const e=li[r];if(!e)return`<p class="codex-missing">No dossier for “${Lt(r)}”.</p>`;const t=e.stats&&e.stats.length?`<dl class="codex-stats">${e.stats.map(o=>`<div><dt>${Lt(o.k)}</dt><dd>${Lt(o.v)}</dd></div>`).join("")}</dl>`:"",n=e.image?`<div class="codex-figure" style="background-image:url('${lM}${Lt(e.image)}.png')"><span class="codex-figtag">${e.kind==="Person"||e.kind==="Concept"||e.kind==="Place"?"INTERPRETATION":"SCHEMATIC · illustrative"}</span></div>`:"",i=(e.body||[]).map(o=>`<p>${o}</p>`).join(""),s=e.ai?`<aside class="codex-ai"><span class="codex-ai-k">THE DISTANCE</span>${e.ai}</aside>`:"",a=Iu[r]?`<button class="codex-deeper" data-deep="${r}"><span class="cd-k">SYSTEMS VIEW</span><span class="cd-t">See it as an architecture</span><span class="cd-a">↓ one layer deeper</span></button>`:"";return`
    <article class="codex-article">
      <div class="codex-kind">${Lt(e.kind)} · ${Lt(e.chapter)}</div>
      <h2 class="codex-title">${Lt(e.title)}</h2>
      <p class="codex-tagline">${Lt(e.tagline)}</p>
      ${n}${t}
      <div class="codex-prose">${i}</div>
      ${s}${a}${Bm(e.threads)}
    </article>`}function hM(r){const e=li[r],t=Iu[r];if(!t)return zm(r);const n=t.primitives&&t.primitives.length?`<dl class="codex-prims">${t.primitives.map(a=>`<div><dt>${Lt(a.k)}</dt><dd>${Lt(a.v)}</dd></div>`).join("")}</dl>`:"",i=t.flow&&t.flow.length?`<div class="codex-diagram"><div class="codex-diagram-h">SIGNAL → CONSEQUENCE</div>${cM(t.flow,t.break==null?-1:t.break,t.breakLabel)}</div>`:"",s=t.architect?`<aside class="codex-arch"><span class="codex-arch-k">IN YOUR STACK</span>${t.architect}</aside>`:"";return`
    <article class="codex-article codex-article--deep">
      <div class="codex-kind">SYSTEMS VIEW · ${Lt(e.kind)}</div>
      <h2 class="codex-title">${Lt(e.title)}</h2>
      <p class="codex-tagline">${Lt(t.lens||"")}</p>
      ${i}${n}${s}
      ${Bm(e.threads)}
    </article>`}function Uu(){const r=Ti[Ti.length-1];Wh.innerHTML=r.deep?hM(r.id):zm(r.id),Wh.parentElement.scrollTop=0,Om.innerHTML=Ti.map((t,n)=>{const i=t.deep?"Systems View":li[t.id]?li[t.id].title:t.id,s=n>0?'<span class="codex-crumb-sep">›</span>':"",a=n===Ti.length-1?"codex-crumb is-current":"codex-crumb";return`${s}<button class="${a}" data-depth="${n}">${Lt(i)}</button>`}).join("");const e=An.querySelector(".codex-depthbar span");e&&(e.style.width=Math.min(100,Ti.length*20)+"%")}function uM(){An.classList.add("is-open"),document.body.classList.add("codex-open"),window.__lenis&&window.__lenis.stop&&window.__lenis.stop(),Xh(),requestAnimationFrame(()=>Vh&&Vh.focus())}function Af(r){li[r]&&(Fm(),Ti.push({id:r,deep:!1}),Uu(),uM())}function dM(r){Iu[r]&&(Ti.push({id:r,deep:!0}),Uu())}function fM(r){Ti=Ti.slice(0,r+1),Uu()}function Rf(){An&&(An.classList.remove("is-open"),document.body.classList.remove("codex-open"),window.__lenis&&window.__lenis.start&&window.__lenis.start(),Ti=[],window.dispatchEvent(new CustomEvent("codex:closed")))}function pM(r){const e=li[r.getAttribute("data-dossier")];if(!e||An.classList.contains("is-open"))return;mi.innerHTML=`<span class="tip-kind">${Lt(e.kind)}</span>${Lt(e.tagline)}<span class="tip-cue">click to open dossier</span>`;const t=r.getBoundingClientRect();mi.classList.add("is-on");const n=Math.min(300,innerWidth-24);mi.style.width=n+"px";let i=t.left+t.width/2-n/2;i=Math.max(12,Math.min(i,innerWidth-n-12)),mi.style.left=i+"px",mi.style.top=t.bottom+10+"px"}function Xh(){mi&&mi.classList.remove("is-on")}function mM(){document.querySelectorAll(".dig-row[data-dig]").forEach(r=>{const e=r.getAttribute("data-dig").split(",").map(t=>t.trim()).filter(t=>li[t]);if(!e.length){r.style.display="none";return}r.innerHTML=`<div class="dig-row-h">DIG DEEPER — ${e.length} dossiers</div><div class="dig-chips">${e.map(t=>`<button class="dig-chip" data-dossier="${t}"><span class="dc-kind">${Lt(li[t].kind)}</span>${Lt(li[t].title)}</button>`).join("")}</div>`})}function gM(){Fm(),mM(),document.addEventListener("click",e=>{const t=e.target.closest("[data-deep]");if(t){e.preventDefault(),dM(t.getAttribute("data-deep"));return}const n=e.target.closest("[data-dossier]");if(n){e.preventDefault(),Af(n.getAttribute("data-dossier"));return}const i=e.target.closest("[data-depth]");if(i){fM(parseInt(i.getAttribute("data-depth"),10));return}if(e.target.closest("[data-codex-close]")){Rf();return}}),document.addEventListener("keydown",e=>{e.key==="Escape"&&An.classList.contains("is-open")&&Rf()});let r=null;document.addEventListener("pointerover",e=>{const t=e.target.closest(".entity[data-dossier]");t&&t!==r&&(r=t,pM(t))}),document.addEventListener("pointerout",e=>{const t=e.target.closest(".entity[data-dossier]");t&&t===r&&(r=null,Xh())}),window.addEventListener("scroll",Xh,{passive:!0}),window.__openDossier=Af}const Cf={type:"change"},Nu={type:"start"},Hm={type:"end"},zo=new Cl,Pf=new sr,_M=Math.cos(70*Av.DEG2RAD),Xt=new z,Mn=2*Math.PI,_t={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Pc=1e-6;class vM extends YS{constructor(e,t=null){super(e,t),this.state=_t.NONE,this.enabled=!0,this.target=new z,this.cursor=new z,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Bs.ROTATE,MIDDLE:Bs.DOLLY,RIGHT:Bs.PAN},this.touches={ONE:Ps.ROTATE,TWO:Ps.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new z,this._lastQuaternion=new is,this._lastTargetPosition=new z,this._quat=new is().setFromUnitVectors(e.up,new z(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Tf,this._sphericalDelta=new Tf,this._scale=1,this._panOffset=new z,this._rotateStart=new Xe,this._rotateEnd=new Xe,this._rotateDelta=new Xe,this._panStart=new Xe,this._panEnd=new Xe,this._panDelta=new Xe,this._dollyStart=new Xe,this._dollyEnd=new Xe,this._dollyDelta=new Xe,this._dollyDirection=new z,this._mouse=new Xe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=xM.bind(this),this._onPointerDown=yM.bind(this),this._onPointerUp=bM.bind(this),this._onContextMenu=RM.bind(this),this._onMouseWheel=wM.bind(this),this._onKeyDown=TM.bind(this),this._onTouchStart=EM.bind(this),this._onTouchMove=AM.bind(this),this._onMouseDown=SM.bind(this),this._onMouseMove=MM.bind(this),this._interceptControlDown=CM.bind(this),this._interceptControlUp=PM.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Cf),this.update(),this.state=_t.NONE}update(e=null){const t=this.object.position;Xt.copy(t).sub(this.target),Xt.applyQuaternion(this._quat),this._spherical.setFromVector3(Xt),this.autoRotate&&this.state===_t.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=Mn:n>Math.PI&&(n-=Mn),i<-Math.PI?i+=Mn:i>Math.PI&&(i-=Mn),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(Xt.setFromSpherical(this._spherical),Xt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Xt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Xt.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new z(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new z(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Xt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(zo.origin.copy(this.object.position),zo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(zo.direction))<_M?this.object.lookAt(this.target):(Pf.setFromNormalAndCoplanarPoint(this.object.up,this.target),zo.intersectPlane(Pf,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Pc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Pc||this._lastTargetPosition.distanceToSquared(this.target)>Pc?(this.dispatchEvent(Cf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Mn/60*this.autoRotateSpeed*e:Mn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Xt.setFromMatrixColumn(t,0),Xt.multiplyScalar(-e),this._panOffset.add(Xt)}_panUp(e,t){this.screenSpacePanning===!0?Xt.setFromMatrixColumn(t,1):(Xt.setFromMatrixColumn(t,0),Xt.crossVectors(this.object.up,Xt)),Xt.multiplyScalar(e),this._panOffset.add(Xt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;Xt.copy(i).sub(this.target);let s=Xt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/n.clientHeight,this.object.matrix),this._panUp(2*t*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),i=e-n.left,s=t-n.top,a=n.width,o=n.height;this._mouse.x=i/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Mn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Mn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(Mn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-Mn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(Mn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-Mn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,s=Math.sqrt(n*n+i*i);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),s=.5*(e.pageY+n.y);this._rotateEnd.set(i,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Mn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Mn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,s=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Xe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function yM(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r)))}function xM(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function bM(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Hm),this.state=_t.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function SM(r){let e;switch(r.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Bs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=_t.DOLLY;break;case Bs.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=_t.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=_t.ROTATE}break;case Bs.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=_t.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=_t.PAN}break;default:this.state=_t.NONE}this.state!==_t.NONE&&this.dispatchEvent(Nu)}function MM(r){switch(this.state){case _t.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case _t.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case _t.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function wM(r){this.enabled===!1||this.enableZoom===!1||this.state!==_t.NONE||(r.preventDefault(),this.dispatchEvent(Nu),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(Hm))}function TM(r){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(r)}function EM(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case Ps.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=_t.TOUCH_ROTATE;break;case Ps.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=_t.TOUCH_PAN;break;default:this.state=_t.NONE}break;case 2:switch(this.touches.TWO){case Ps.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=_t.TOUCH_DOLLY_PAN;break;case Ps.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=_t.TOUCH_DOLLY_ROTATE;break;default:this.state=_t.NONE}break;default:this.state=_t.NONE}this.state!==_t.NONE&&this.dispatchEvent(Nu)}function AM(r){switch(this._trackPointer(r),this.state){case _t.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case _t.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case _t.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case _t.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=_t.NONE}}function RM(r){this.enabled!==!1&&r.preventDefault()}function CM(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function PM(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const DM={late:13129279,aim:12159550,score:5211816,build:5416084,atom:13601372,signal:15251531};function Ya(r,e,t=.05){const n=new wi,i=new _i(r,new Pl({color:e,transparent:!0,opacity:t,depthWrite:!1})),s=new GS(new WS(r,18),new Ru({color:e,transparent:!0,opacity:.85}));return n.add(i,s),n}function wn(r,e,t,n,i=0,s=0,a=0){const o=Ya(new na(r,e,t),n);return o.position.set(i,s,a),o}function Tn(r,e,t,n,i=0,s=0,a=0,o){const l=Ya(new Cu(r,e,t,16),n);return l.position.set(i,s,a),o&&l.rotation.set(o[0],o[1],o[2]),l}function LM(r,e,t=1){return Ya(new Du(r,t),e)}const kM={battleship(r){const e=new wi;return e.add(wn(6.4,.55,1.1,r,0,0,0)),e.add(Tn(.55,.02,1,r,3.5,0,0,[0,0,Math.PI/2])),e.add(wn(6,.09,1,r,0,.32,0)),e.add(wn(.9,1.1,.7,r,-.1,.9,0)),e.add(wn(.4,.9,.4,r,-.1,1.9,0)),e.add(Tn(.22,.22,.7,r,.7,.9,0)),[1.9,1.1,-2.1].forEach((t,n)=>{e.add(Tn(.32,.32,.24,r,t,.45,0));const i=t<0?-1:1;e.add(Tn(.06,.06,1.1,r,t+i*.6,.5,.18,[0,0,Math.PI/2])),e.add(Tn(.06,.06,1.1,r,t+i*.6,.5,-.18,[0,0,Math.PI/2]))}),{group:e,dist:11,hotspots:[{p:[1.9,.9,0],id:"eighteen-inch-guns",label:"46 cm guns"},{p:[-.1,2.1,0],id:"radar-fire-control",label:"fire control"},{p:[0,0,.62],id:"yamato",label:"the hull"},{p:[-2.1,.9,0],id:"operation-ten-go",label:"the last sortie"}]}},tank(r){const e=new wi;return e.add(wn(2.8,.7,1.5,r,0,.5,0)),e.add(wn(3,.5,.3,r,0,.32,.72)),e.add(wn(3,.5,.3,r,0,.32,-.72)),e.add(wn(1.3,.55,1.05,r,-.1,1.05,0)),e.add(Tn(.08,.08,1.7,r,1.1,1.02,0,[0,0,Math.PI/2])),e.add(Tn(.012,.012,1.1,r,-.5,1.85,.3)),{group:e,dist:6.2,hotspots:[{p:[-.1,1.3,0],id:"char-b1-bis",label:"the one-man turret"},{p:[-.5,2.35,.3],id:"panzer-iii",label:"the radio net"},{p:[1.6,1.02,0],id:"guderian",label:"concentrate & drive"},{p:[0,.32,.72],id:"auftragstaktik",label:"act on intent"}]}},submarine(r){const e=new wi;return e.add(Tn(.5,.5,4.6,r,0,0,0,[0,0,Math.PI/2])),e.add(Tn(.5,.02,.9,r,2.7,0,0,[0,0,Math.PI/2])),e.add(Tn(.5,.02,.9,r,-2.7,0,0,[0,0,-Math.PI/2])),e.add(wn(.9,.6,.5,r,-.1,.55,0)),e.add(Tn(.02,.02,1.2,r,-.1,1.35,0)),{group:e,dist:7.5,hotspots:[{p:[-.1,.85,0],id:"wolfpack",label:"the radio pack"},{p:[-.1,1.9,0],id:"hf-df",label:"the transmission"},{p:[0,0,.55],id:"type-vii-uboat",label:"the hull"},{p:[2.4,0,0],id:"black-may",label:"the reckoning"}]}},carrier(r){const e=new wi;return e.add(wn(6,.14,1.8,r,0,.3,0)),e.add(wn(5.4,.7,1.3,r,0,-.15,0)),e.add(wn(.5,.8,.42,r,1.5,.75,.62)),e.add(Tn(.012,.012,.9,r,1.5,1.3,.62)),[-1.6,-.4,.8].forEach(t=>{e.add(wn(.5,.06,.5,r,t,.4,-.3)),e.add(wn(.06,.06,.7,r,t,.42,-.3))}),{group:e,dist:10,hotspots:[{p:[-.4,.5,-.3],id:"sbd-dauntless",label:"the dive bombers"},{p:[1.5,1,.62],id:"nimitz",label:"the command island"},{p:[-1.6,.5,-.3],id:"kido-butai",label:"the crowded deck"},{p:[0,-.15,.66],id:"yorktown",label:"the 72-hour hull"}]}},gadget(r){const e=new wi;e.add(LM(1.35,r,1));const t=Ya(new bl(1.5,.03,8,40),r);e.add(t);const n=Ya(new bl(1.5,.03,8,40),r);n.rotation.x=Math.PI/2,e.add(n),e.add(Tn(.18,.18,.5,r,0,1.5,0));for(let i=0;i<6;i++){const s=i/6*Math.PI*2;e.add(Tn(.015,.015,.6,r,Math.cos(s)*1.35,.9,Math.sin(s)*1.35))}return{group:e,dist:6.5,hotspots:[{p:[0,0,1.4],id:"trinity",label:"the core"},{p:[0,1.75,0],id:"oppenheimer",label:"the architect"},{p:[1.5,0,0],id:"doomsday-clock",label:"the clock"},{p:[-1.1,.9,.6],id:"einstein-telegram",label:"the first signal"}]}}},IM=[{section:"blitzkrieg",model:"tank",accent:"late",title:"THE TANK"},{section:"yamato",model:"battleship",accent:"aim",title:"THE BATTLESHIP"},{section:"uboats",model:"submarine",accent:"score",title:"THE U-BOAT"},{section:"midway",model:"carrier",accent:"build",title:"THE CARRIER"},{section:"atom",model:"gadget",accent:"atom",title:"THE DEVICE"}];function UM(r){const e=document.getElementById(r.section);if(!e)return null;const t=e.querySelector(".chapter-head"),n=document.createElement("div");return n.className="artifact-stage",n.innerHTML=`
    <canvas class="artifact-canvas"></canvas>
    <div class="artifact-hotspots"></div>
    <div class="artifact-hint"><span class="ah-title">${r.title}</span><span class="ah-cue">drag to turn · scroll to zoom · click a node to enter</span></div>`,t.after(n),n}function NM(){const r=matchMedia("(prefers-reduced-motion: reduce)").matches;IM.forEach(e=>{const t=UM(e);if(t)try{OM(t,e,r)}catch(n){console.error("[artifact]",e.section,n),t.style.display="none"}})}function OM(r,e,t){const n=r.querySelector(".artifact-canvas"),i=r.querySelector(".artifact-hotspots"),s=DM[e.accent],a=new km({canvas:n,antialias:!0,alpha:!0,preserveDrawingBuffer:!0});a.setPixelRatio(Math.min(devicePixelRatio,2));const o=new Im;o.fog=new kl(461068,.03);const l=new Wn(42,1,.1,100),c=kM[e.model](s);o.add(c.group);const h={r:c.dist,theta:Math.PI*.15,phi:Math.PI*.42};l.position.setFromSphericalCoords(h.r,h.phi,h.theta);const d=new vM(l,n);d.enableDamping=!0,d.dampingFactor=.08,d.enablePan=!1,d.minDistance=c.dist*.45,d.maxDistance=c.dist*1.7,d.autoRotate=!0,d.autoRotateSpeed=.7,d.target.set(0,.4,0),d.rotateSpeed=.7;let u;d.addEventListener("start",()=>{d.autoRotate=!1,clearTimeout(u),r.classList.add("is-grabbing")}),d.addEventListener("end",()=>{r.classList.remove("is-grabbing"),clearTimeout(u),u=setTimeout(()=>{d.autoRotate=!0},3500)});const f=c.hotspots.map(A=>{const C=document.createElement("button");return C.className="artifact-hot",C.innerHTML=`<span class="hot-dot"></span><span class="hot-label">${A.label}</span>`,C.style.setProperty("--hot","#"+s.toString(16).padStart(6,"0")),C.addEventListener("click",x=>{x.stopPropagation(),p(A)}),i.appendChild(C),{el:C,world:new z(A.p[0],A.p[1],A.p[2]),h:A}});function _(){const A=r.clientWidth,C=r.clientHeight,x=new z;l.getWorldDirection(x),f.forEach(M=>{const P=M.world.clone().project(l),L=(P.x*.5+.5)*A,U=(-P.y*.5+.5)*C,B=M.world.clone().sub(l.position).dot(x),G=P.z<1&&B>0;M.el.style.transform=`translate(-50%,-50%) translate(${L}px,${U}px)`,M.el.style.opacity=G?"1":"0",M.el.style.pointerEvents=G?"auto":"none"})}let v=!1;function p(A){d.autoRotate=!1;const C=new z(A.p[0],A.p[1],A.p[2]),M=l.position.clone().clone().sub(C).normalize(),P=C.clone().add(M.multiplyScalar(c.dist*.5));St.to(l.position,{x:P.x,y:P.y,z:P.z,duration:1,ease:"power3.inOut"}),St.to(d.target,{x:C.x,y:C.y,z:C.z,duration:1,ease:"power3.inOut",onComplete:()=>{window.__openDossier&&window.__openDossier(A.id)}})}function m(){if(v)return;v=!0;const A=new z().setFromSphericalCoords(h.r,h.phi,h.theta);St.to(l.position,{x:A.x,y:A.y,z:A.z,duration:1.1,ease:"power3.inOut"}),St.to(d.target,{x:0,y:.4,z:0,duration:1.1,ease:"power3.inOut",onComplete:()=>{v=!1,clearTimeout(u),u=setTimeout(()=>{d.autoRotate=!0},1500)}})}window.addEventListener("codex:closed",m);function g(){const A=r.clientWidth,C=r.clientHeight;a.setSize(A,C,!1),l.aspect=A/C,l.updateProjectionMatrix(),_()}g(),window.addEventListener("resize",g);let y=null;function S(){d.update(),a.render(o,l),_(),y=requestAnimationFrame(S)}function E(){y||S()}function w(){y&&(cancelAnimationFrame(y),y=null)}d.update(),a.render(o,l),_(),new IntersectionObserver(A=>A.forEach(C=>{C.isIntersecting&&!t?E():w()}),{threshold:.05}).observe(n)}St.registerPlugin(Fe);const Df="/midway/assets/img/";function FM(){const r=document.getElementById("pre-needle"),e=document.getElementById("pre-bearing"),t=document.getElementById("pre-ticks");let n="";for(let a=0;a<72;a++){const o=a/72*Math.PI*2,l=a%9===0,c=92,h=l?80:86;n+=`<line class="pre-tick" x1="${100+c*Math.sin(o)}" y1="${100-c*Math.cos(o)}" x2="${100+h*Math.sin(o)}" y2="${100-h*Math.cos(o)}" opacity="${l?.6:.3}"/>`}t.innerHTML=n;const i=St.timeline();i.to(r,{rotation:47,transformOrigin:"100px 100px",duration:2,ease:"power3.inOut",onUpdate(){const a=St.getProperty(r,"rotation");e.textContent=String(Math.round((a%360+360)%360)).padStart(3,"0")}}),i.to("#preloader",{opacity:0,duration:.8,ease:"power2.inOut",delay:.15,onComplete:Yh})}function Yh(){const r=document.getElementById("preloader");!r||r.classList.contains("done")||(r.classList.add("done"),document.body.classList.remove("is-loading"),VM())}let Ei;function BM(){if(matchMedia("(prefers-reduced-motion: reduce)").matches){Fe.refresh();return}Ei=new Qm({duration:1.15,smoothWheel:!0,wheelMultiplier:.9,touchMultiplier:1.4}),window.__lenis=Ei,Ei.on("scroll",Fe.update),St.ticker.add(e=>Ei.raf(e*1e3)),St.ticker.lagSmoothing(0),document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",t=>{const n=document.querySelector(e.getAttribute("href"));n&&(t.preventDefault(),Ei.scrollTo(n,{offset:0,duration:1.4}))})})}function zM(r){Ei?Ei.scrollTo(r,{duration:1.4}):r.scrollIntoView({behavior:"smooth"})}function HM(){const r=document.querySelector(".hero");r&&(r.style.backgroundImage=`linear-gradient(180deg, rgba(7,9,12,0.55) 0%, rgba(7,9,12,0.35) 45%, rgba(7,9,12,0.9) 100%), url("${Df}hero.png")`),document.querySelectorAll(".scene-bg").forEach(e=>{const t=e.dataset.img,n=`${Df}${t}.png`,i=new Image;i.onload=()=>{e.style.backgroundImage=`url("${n}")`,St.to(e,{opacity:t==="atom"?.55:.62,duration:1.4,ease:"power2.out"})},i.onerror=()=>{e.style.background="linear-gradient(160deg,#0c1017,#07090c)",e.style.opacity=1},i.src=n;const s=parseFloat(e.dataset.speed||"0.85");St.fromTo(e,{yPercent:-8},{yPercent:8*s,ease:"none",scrollTrigger:{trigger:e.parentElement,start:"top bottom",end:"bottom top",scrub:!0}})})}function GM(){St.set(".hero-title .reveal-line",{yPercent:110}),St.utils.toArray(".reveal").forEach(r=>{St.fromTo(r,{y:34,opacity:0},{y:0,opacity:1,duration:1,ease:"power3.out",scrollTrigger:{trigger:r,start:"top 88%"}})})}function VM(){St.timeline({delay:.1}).to(".hero-title .reveal-line",{yPercent:0,duration:1.1,stagger:.12,ease:"power4.out"})}function WM(){const r=St.utils.toArray(".scene[data-chapter]"),e=document.getElementById("chapter-nav"),t=document.getElementById("hud-bearing-val"),n=document.getElementById("scroll-progress-bar"),i=document.documentElement.style,s=new Set;r.forEach(o=>{const l=o.dataset.chapter;if(s.has(l))return;s.add(l);const c=document.createElement("button");c.className="nav-dot",c.dataset.target=o.id,c.innerHTML=`<span class="nav-tip">${l}</span>`,c.addEventListener("click",()=>zM(o)),e.appendChild(c)});const a=Array.from(e.children);r.forEach(o=>{const l=parseFloat(o.dataset.bearing||"0"),c=o.dataset.accent;Fe.create({trigger:o,start:"top 55%",end:"bottom 55%",onToggle:h=>{if(!h.isActive)return;St.to({v:parseFloat(t.textContent)||0},{v:l,duration:.9,ease:"power2.out",onUpdate(){t.textContent=String(Math.round(this.targets()[0].v%360)).padStart(3,"0")+"°"}});const d=o.dataset.chapter;a.forEach(u=>{const f=document.getElementById(u.dataset.target);u.classList.toggle("is-active",f&&f.dataset.chapter===d)}),c&&i.setProperty("--accent",getComputedStyle(o).getPropertyValue("--accent"))}})}),Fe.create({start:0,end:"max",onUpdate:o=>{n.style.width=(o.progress*100).toFixed(2)+"%"}})}function XM(){let r=!1;requestAnimationFrame(()=>{r=!0}),setTimeout(()=>{if(!r){if(document.documentElement.classList.add("no-anim"),Ei){try{Ei.destroy()}catch{}Ei=null}Yh(),Fe.refresh()}},1600),document.addEventListener("visibilitychange",()=>{document.hidden||(Yh(),Fe.refresh())})}function YM(){const r="/midway/";document.querySelectorAll("#coda-reads a[data-read]").forEach(e=>{e.setAttribute("href",`${r}read/${e.getAttribute("data-read")}.html`)})}function Lf(){document.body.classList.add("is-loading"),XM(),YM(),BM(),HM(),GM(),WM();const r=(e,t)=>{try{t()}catch(n){console.error(`[viz:${e}]`,n)}};r("codex",()=>gM()),r("artifacts",()=>NM()),r("hero",()=>qS(document.getElementById("hero-canvas"))),r("latency",()=>$S(document.getElementById("viz-latency"))),r("yamato",()=>KS(document.getElementById("viz-yamato"))),r("scoreboard",()=>jS(document.getElementById("viz-scoreboard"))),r("midway",()=>ZS(document.getElementById("viz-midway"))),r("capstone",()=>JS()),r("atom",()=>oM(document.getElementById("atom-stage"))),Fe.refresh(),FM()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Lf):Lf();window.addEventListener("load",()=>Fe.refresh());
