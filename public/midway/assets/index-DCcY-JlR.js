var Rm=Object.defineProperty;var Cm=(r,e,t)=>e in r?Rm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Te=(r,e,t)=>Cm(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var Ru="1.3.25";function yf(r,e,t){return Math.max(r,Math.min(e,t))}function Pm(r,e,t){return(1-t)*r+t*e}function Lm(r,e,t,n){return Pm(r,e,1-Math.exp(-t*n))}function Dm(r,e){return(r%e+e)%e}var km=class{constructor(){Te(this,"isRunning",!1);Te(this,"value",0);Te(this,"from",0);Te(this,"to",0);Te(this,"currentTime",0);Te(this,"lerp");Te(this,"duration");Te(this,"easing");Te(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=yf(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=Lm(this.value,this.to,this.lerp*60,r),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:a}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=a}};function Im(r,e){let t;return function(...n){clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(this,n)},e)}}var Um=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){Te(this,"width",0);Te(this,"height",0);Te(this,"scrollHeight",0);Te(this,"scrollWidth",0);Te(this,"debouncedResize");Te(this,"wrapperResizeObserver");Te(this,"contentResizeObserver");Te(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Te(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Te(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=Im(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},xf=class{constructor(){Te(this,"events",{})}emit(r,...e){var n;const t=this.events[r]||[];for(let i=0,s=t.length;i<s;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){return this.events[r]?this.events[r].push(e):this.events[r]=[e],()=>{var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}};const Nm=100/6,Yi={passive:!1};function Cu(r,e){return r===1?Nm:r===2?e:1}var Om=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){Te(this,"touchStart",{x:0,y:0});Te(this,"lastDelta",{x:0,y:0});Te(this,"window",{width:0,height:0});Te(this,"emitter",new xf);Te(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});Te(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});Te(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});Te(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=Cu(n,this.window.width),s=Cu(n,this.window.height);e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});Te(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Yi),this.element.addEventListener("touchstart",this.onTouchStart,Yi),this.element.addEventListener("touchmove",this.onTouchMove,Yi),this.element.addEventListener("touchend",this.onTouchEnd,Yi)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,Yi),this.element.removeEventListener("touchstart",this.onTouchStart,Yi),this.element.removeEventListener("touchmove",this.onTouchMove,Yi),this.element.removeEventListener("touchend",this.onTouchEnd,Yi)}};const Pu=r=>Math.min(1,1.001-2**(-10*r));var Fm=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaExponent:a=1.7,duration:o,easing:l,lerp:c=.1,infinite:h=!1,orientation:f="vertical",gestureOrientation:u=f==="horizontal"?"both":"vertical",touchMultiplier:d=1,wheelMultiplier:g=1,autoResize:_=!0,prevent:p,virtualScroll:m,overscroll:v=!0,autoRaf:y=!1,anchors:S=!1,autoToggle:A=!1,allowNestedScroll:T=!1,__experimental__naiveDimensions:b=!1,naiveDimensions:R=b,stopInertiaOnNavigate:k=!1}={}){Te(this,"_isScrolling",!1);Te(this,"_isStopped",!1);Te(this,"_isLocked",!1);Te(this,"_preventNextNativeScrollEvent",!1);Te(this,"_resetVelocityTimeout",null);Te(this,"_rafId",null);Te(this,"_isDraggingSelection",!1);Te(this,"isTouching");Te(this,"isIos");Te(this,"time",0);Te(this,"userData",{});Te(this,"lastVelocity",0);Te(this,"velocity",0);Te(this,"direction",0);Te(this,"options");Te(this,"targetScroll");Te(this,"animatedScroll");Te(this,"animate",new km);Te(this,"emitter",new xf);Te(this,"dimensions");Te(this,"virtualScroll");Te(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});Te(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Te(this,"onTransitionEnd",r=>{var e;(e=r.propertyName)!=null&&e.includes("overflow")&&r.target===this.rootElement&&this.checkOverflow()});Te(this,"onClick",r=>{const e=r.composedPath().filter(n=>n instanceof HTMLAnchorElement&&n.href).map(n=>new URL(n.href)),t=new URL(window.location.href);if(this.options.anchors){const n=e.find(i=>t.host===i.host&&t.pathname===i.pathname&&i.hash);if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,s=decodeURIComponent(n.hash);this.scrollTo(s,i);return}}if(this.options.stopInertiaOnNavigate&&e.some(n=>t.host===n.host&&t.pathname!==n.pathname)){this.reset();return}});Te(this,"onPointerDown",r=>{r.button===1&&this.reset()});Te(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");if(i&&this.isIos&&(n.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(n)),this._isDraggingSelection)){n.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=n.type==="touchstart"||n.type==="touchmove";const a=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&a&&!this.isStopped&&!this.isLocked){this.reset();return}const o=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(a||o)return;let l=n.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,h=Math.abs(e)>=Math.abs(t)?"horizontal":"vertical";if(l.find(g=>{var _,p,m,v,y;return g instanceof HTMLElement&&(typeof c=="function"&&(c==null?void 0:c(g))||((_=g.hasAttribute)==null?void 0:_.call(g,"data-lenis-prevent"))||h==="vertical"&&((p=g.hasAttribute)==null?void 0:p.call(g,"data-lenis-prevent-vertical"))||h==="horizontal"&&((m=g.hasAttribute)==null?void 0:m.call(g,"data-lenis-prevent-horizontal"))||i&&((v=g.hasAttribute)==null?void 0:v.call(g,"data-lenis-prevent-touch"))||s&&((y=g.hasAttribute)==null?void 0:y.call(g,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.hasNestedScroll(g,{deltaX:e,deltaY:t}))}))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=t;this.options.gestureOrientation==="both"?f=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(f=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();const u=i&&this.options.syncTouch,d=i&&n.type==="touchend";d&&(f=Math.sign(f)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+f,{programmatic:!1,...u?{lerp:d?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Te(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Te(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=Ru,window.lenis||(window.lenis={}),window.lenis.version=Ru,f==="horizontal"&&(window.lenis.horizontal=!0),i===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!r||r===document.documentElement)&&(r=window),typeof o=="number"&&typeof l!="function"?l=Pu:typeof l=="function"&&typeof o!="number"&&(o=1),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaExponent:a,duration:o,easing:l,lerp:c,infinite:h,gestureOrientation:u,orientation:f,touchMultiplier:d,wheelMultiplier:g,autoResize:_,prevent:p,virtualScroll:m,overscroll:v,autoRaf:y,anchors:S,autoToggle:A,allowNestedScroll:T,naiveDimensions:R,stopInertiaOnNavigate:k},this.dimensions=new Um(r,e,{autoResize:_}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new Om(t,{touchMultiplier:d,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}get overflow(){const r=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[r]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}isTouchOnSelectionHandle(r){const e=window.getSelection();if(!e||e.isCollapsed||e.rangeCount===0)return!1;const t=r.targetTouches[0]??r.changedTouches[0];if(!t)return!1;const n=e.getRangeAt(0).getClientRects();if(n.length===0)return!1;const i=n[0],s=n[n.length-1],a=40,o=Math.hypot(t.clientX-i.left,t.clientY-i.top)<=a,l=Math.hypot(t.clientX-s.right,t.clientY-s.bottom)<=a;return o||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,programmatic:i=!0,lerp:s=i?this.options.lerp:void 0,duration:a=i?this.options.duration:void 0,easing:o=i?this.options.easing:void 0,onStart:l,onComplete:c,force:h=!1,userData:f}={}){if((this.isStopped||this.isLocked)&&!h)return;let u=r,d=e;if(typeof u=="string"&&["top","left","start","#"].includes(u))u=0;else if(typeof u=="string"&&["bottom","right","end"].includes(u))u=this.limit;else{let g=null;if(typeof u=="string"?(g=u.startsWith("#")?document.getElementById(u.slice(1)):document.querySelector(u),g||(u==="#top"?u=0:console.warn("Lenis: Target not found",u))):u instanceof HTMLElement&&(u!=null&&u.nodeType)&&(g=u),g){if(this.options.wrapper!==window){const S=this.rootElement.getBoundingClientRect();d-=this.isHorizontal?S.left:S.top}const _=g.getBoundingClientRect(),p=getComputedStyle(g),m=this.isHorizontal?Number.parseFloat(p.scrollMarginLeft):Number.parseFloat(p.scrollMarginTop),v=getComputedStyle(this.rootElement),y=this.isHorizontal?Number.parseFloat(v.scrollPaddingLeft):Number.parseFloat(v.scrollPaddingTop);u=(this.isHorizontal?_.left:_.top)+this.animatedScroll-(Number.isNaN(m)?0:m)-(Number.isNaN(y)?0:y)}}if(typeof u=="number"){if(u+=d,this.options.infinite){if(i){this.targetScroll=this.animatedScroll=this.scroll;const g=u-this.animatedScroll;g>this.limit/2?u-=this.limit:g<-this.limit/2&&(u+=this.limit)}}else u=yf(0,u,this.limit);if(u===this.targetScroll){l==null||l(this),c==null||c(this);return}if(this.userData=f??{},t){this.animatedScroll=this.targetScroll=u,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}i||(this.targetScroll=u),typeof a=="number"&&typeof o!="function"?o=Pu:typeof o=="function"&&typeof a!="number"&&(a=1),this.animate.fromTo(this.animatedScroll,u,{duration:a,easing:o,lerp:s,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",l==null||l(this)},onUpdate:(g,_)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=g-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=g,this.setScroll(this.scroll),i&&(this.targetScroll=g),_||this.emit(),_&&(this.reset(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(r,{deltaX:e,deltaY:t}){const n=Date.now();r._lenis||(r._lenis={});const i=r._lenis;let s,a,o,l,c,h,f,u,d,g;if(n-(i.time??0)>2e3){i.time=Date.now();const T=window.getComputedStyle(r);if(i.computedStyle=T,s=["auto","overlay","scroll"].includes(T.overflowX),a=["auto","overlay","scroll"].includes(T.overflowY),c=["auto"].includes(T.overscrollBehaviorX),h=["auto"].includes(T.overscrollBehaviorY),i.hasOverflowX=s,i.hasOverflowY=a,!(s||a))return!1;f=r.scrollWidth,u=r.scrollHeight,d=r.clientWidth,g=r.clientHeight,o=f>d,l=u>g,i.isScrollableX=o,i.isScrollableY=l,i.scrollWidth=f,i.scrollHeight=u,i.clientWidth=d,i.clientHeight=g,i.hasOverscrollBehaviorX=c,i.hasOverscrollBehaviorY=h}else o=i.isScrollableX,l=i.isScrollableY,s=i.hasOverflowX,a=i.hasOverflowY,f=i.scrollWidth,u=i.scrollHeight,d=i.clientWidth,g=i.clientHeight,c=i.hasOverscrollBehaviorX,h=i.hasOverscrollBehaviorY;if(!(s&&o||a&&l))return!1;const _=Math.abs(e)>=Math.abs(t)?"horizontal":"vertical";let p,m,v,y,S,A;if(_==="horizontal")p=Math.round(r.scrollLeft),m=f-d,v=e,y=s,S=o,A=c;else if(_==="vertical")p=Math.round(r.scrollTop),m=u-g,v=t,y=a,S=l,A=h;else return!1;return!A&&(p>=m||p<=0)?!0:(v>0?p<m:p>0)&&y&&S}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?Dm(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(r=>{this.rootElement.classList.add(r)})}cleanUpClassName(){for(const r of Array.from(this.rootElement.classList))(r==="lenis"||r.startsWith("lenis-"))&&this.rootElement.classList.remove(r)}};function ki(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function bf(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Gn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ra={duration:.5,overwrite:!1,delay:0},Fh,en,Et,Zn=1e8,yt=1/Zn,Sc=Math.PI*2,Bm=Sc/4,zm=0,Sf=Math.sqrt,Hm=Math.cos,Gm=Math.sin,Zt=function(e){return typeof e=="string"},Dt=function(e){return typeof e=="function"},Gi=function(e){return typeof e=="number"},Bh=function(e){return typeof e>"u"},Ei=function(e){return typeof e=="object"},Sn=function(e){return e!==!1},zh=function(){return typeof window<"u"},Ya=function(e){return Dt(e)||Zt(e)},Mf=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},ln=Array.isArray,Vm=/random\([^)]+\)/g,Wm=/,\s*/g,Lu=/(?:-?\.?\d|\.)+/gi,wf=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ss=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Cl=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Tf=/[+-]=-?[.\d]+/,Xm=/[^,'"\[\]\s]+/gi,qm=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Rt,mi,Mc,Hh,Vn={},Zo={},Ef,Af=function(e){return(Zo=Ns(e,Vn))&&Rn},Gh=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Ca=function(e,t){return!t&&console.warn(e)},Rf=function(e,t){return e&&(Vn[e]=t)&&Zo&&(Zo[e]=t)||Vn},Pa=function(){return 0},Ym={suppressEvents:!0,isStart:!0,kill:!1},Io={suppressEvents:!0,kill:!1},$m={suppressEvents:!0},Vh={},cr=[],wc={},Cf,Un={},Pl={},Du=30,Uo=[],Wh="",Xh=function(e){var t=e[0],n,i;if(Ei(t)||Dt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=Uo.length;i--&&!Uo[i].targetTest(t););n=Uo[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new Zf(e[i],n)))||e.splice(i,1);return e},Gr=function(e){return e._gsap||Xh(Jn(e))[0]._gsap},Pf=function(e,t,n){return(n=e[t])&&Dt(n)?e[t]():Bh(n)&&e.getAttribute&&e.getAttribute(t)||n},Mn=function(e,t){return(e=e.split(",")).forEach(t)||e},Ot=function(e){return Math.round(e*1e5)/1e5||0},At=function(e){return Math.round(e*1e7)/1e7||0},Es=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},Km=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Jo=function(){var e=cr.length,t=cr.slice(0),n,i;for(wc={},cr.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},qh=function(e){return!!(e._initted||e._startAt||e.add)},Lf=function(e,t,n,i){cr.length&&!en&&Jo(),e.render(t,n,!!(en&&t<0&&qh(e))),cr.length&&!en&&Jo()},Df=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Xm).length<2?t:Zt(e)?e.trim():e},kf=function(e){return e},Wn=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},jm=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},Ns=function(e,t){for(var n in t)e[n]=t[n];return e},ku=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Ei(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Qo=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},ma=function(e){var t=e.parent||Rt,n=e.keyframes?jm(ln(e.keyframes)):Wn;if(Sn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},Zm=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},If=function(e,t,n,i,s){var a=e[i],o;if(s)for(o=t[s];a&&a[s]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=a,t.parent=t._dp=e,t},_l=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,a=t._next;s?s._next=a:e[n]===t&&(e[n]=a),a?a._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},mr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Vr=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Jm=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Tc=function(e,t,n,i){return e._startAt&&(en?e._startAt.revert(Io):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},Qm=function r(e){return!e||e._ts&&r(e.parent)},Iu=function(e){return e._repeat?Os(e._tTime,e=e.duration()+e._rDelay)*e:0},Os=function(e,t){var n=Math.floor(e=At(e/t));return e&&n===e?n-1:n},el=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},vl=function(e){return e._end=At(e._start+(e._tDur/Math.abs(e._ts||e._rts||yt)||0))},yl=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=At(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),vl(e),n._dirty||Vr(n,e)),e},Uf=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=el(e.rawTime(),t),(!t._dur||za(0,t.totalDuration(),n)-t._tTime>yt)&&t.render(n,!0)),Vr(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-yt}},yi=function(e,t,n,i){return t.parent&&mr(t),t._start=At((Gi(n)?n:n||e!==Rt?Yn(e,n,t):e._time)+t._delay),t._end=At(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),If(e,t,"_first","_last",e._sort?"_start":0),Ec(t)||(e._recent=t),i||Uf(e,t),e._ts<0&&yl(e,e._tTime),e},Nf=function(e,t){return(Vn.ScrollTrigger||Gh("scrollTrigger",t))&&Vn.ScrollTrigger.create(t,e)},Of=function(e,t,n,i,s){if($h(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!en&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Cf!==Fn.frame)return cr.push(e),e._lazy=[s,i],1},eg=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},Ec=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},tg=function(e,t,n,i){var s=e.ratio,a=t<0||!t&&(!e._start&&eg(e)&&!(!e._initted&&Ec(e))||(e._ts<0||e._dp._ts<0)&&!Ec(e))?0:1,o=e._rDelay,l=0,c,h,f;if(o&&e._repeat&&(l=za(0,e._tDur,t),h=Os(l,o),e._yoyo&&h&1&&(a=1-a),h!==Os(e._tTime,o)&&(s=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==s||en||i||e._zTime===yt||!t&&e._zTime){if(!e._initted&&Of(e,t,i,n,l))return;for(f=e._zTime,e._zTime=t||(n?yt:0),n||(n=t&&!f),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=l,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&Tc(e,t,n,!0),e._onUpdate&&!n&&zn(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&zn(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&mr(e,1),!n&&!en&&(zn(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},ng=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Fs=function(e,t,n,i){var s=e._repeat,a=At(t)||0,o=e._tTime/e._tDur;return o&&!i&&(e._time*=a/e._dur),e._dur=a,e._tDur=s?s<0?1e10:At(a*(s+1)+e._rDelay*s):a,o>0&&!i&&yl(e,e._tTime=e._tDur*o),e.parent&&vl(e),n||Vr(e.parent,e),e},Uu=function(e){return e instanceof bn?Vr(e):Fs(e,e._dur)},ig={_start:0,endTime:Pa,totalDuration:Pa},Yn=function r(e,t,n){var i=e.labels,s=e._recent||ig,a=e.duration()>=Zn?s.endTime(!1):e._dur,o,l,c;return Zt(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(t in i||(i[t]=a),i[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&n&&(l=l/100*(ln(n)?n[0]:n).totalDuration()),o>1?r(e,t.substr(0,o-1),n)+l:a+l)):t==null?a:+t},ga=function(e,t,n){var i=Gi(t[1]),s=(i?2:1)+(e<2?0:1),a=t[s],o,l;if(i&&(a.duration=t[1]),a.parent=n,e){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=Sn(l.vars.inherit)&&l.parent;a.immediateRender=Sn(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[s-1]}return new Gt(t[0],a,t[s+1])},br=function(e,t){return e||e===0?t(e):t},za=function(e,t,n){return n<e?e:n>t?t:n},an=function(e,t){return!Zt(e)||!(t=qm.exec(e))?"":t[1]},rg=function(e,t,n){return br(n,function(i){return za(e,t,i)})},Ac=[].slice,Ff=function(e,t){return e&&Ei(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Ei(e[0]))&&!e.nodeType&&e!==mi},sg=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return Zt(i)&&!t||Ff(i,1)?(s=n).push.apply(s,Jn(i)):n.push(i)})||n},Jn=function(e,t,n){return Et&&!t&&Et.selector?Et.selector(e):Zt(e)&&!n&&(Mc||!Bs())?Ac.call((t||Hh).querySelectorAll(e),0):ln(e)?sg(e,n):Ff(e)?Ac.call(e,0):e?[e]:[]},Rc=function(e){return e=Jn(e)[0]||Ca("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return Jn(t,n.querySelectorAll?n:n===e?Ca("Invalid scope")||Hh.createElement("div"):e)}},Bf=function(e){return e.sort(function(){return .5-Math.random()})},zf=function(e){if(Dt(e))return e;var t=Ei(e)?e:{each:e},n=Wr(t.ease),i=t.from||0,s=parseFloat(t.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=t.axis,h=i,f=i;return Zt(i)?h=f={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(h=i[0],f=i[1]),function(u,d,g){var _=(g||t).length,p=a[_],m,v,y,S,A,T,b,R,k;if(!p){if(k=t.grid==="auto"?0:(t.grid||[1,Zn])[1],!k){for(b=-Zn;b<(b=g[k++].getBoundingClientRect().left)&&k<_;);k<_&&k--}for(p=a[_]=[],m=l?Math.min(k,_)*h-.5:i%k,v=k===Zn?0:l?_*f/k-.5:i/k|0,b=0,R=Zn,T=0;T<_;T++)y=T%k-m,S=v-(T/k|0),p[T]=A=c?Math.abs(c==="y"?S:y):Sf(y*y+S*S),A>b&&(b=A),A<R&&(R=A);i==="random"&&Bf(p),p.max=b-R,p.min=R,p.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(k>_?_-1:c?c==="y"?_/k:k:Math.max(k,_/k))||0)*(i==="edges"?-1:1),p.b=_<0?s-_:s,p.u=an(t.amount||t.each)||0,n=n&&_<0?vg(n):n}return _=(p[u]-p.min)/p.max||0,At(p.b+(n?n(_):_)*p.v)+p.u}},Cc=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=At(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(Gi(n)?0:an(n))}},Hf=function(e,t){var n=ln(e),i,s;return!n&&Ei(e)&&(i=n=e.radius||Zn,e.values?(e=Jn(e.values),(s=!Gi(e[0]))&&(i*=i)):e=Cc(e.increment)),br(t,n?Dt(e)?function(a){return s=e(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=Zn,h=0,f=e.length,u,d;f--;)s?(u=e[f].x-o,d=e[f].y-l,u=u*u+d*d):u=Math.abs(e[f]-o),u<c&&(c=u,h=f);return h=!i||c<=i?e[h]:a,s||h===a||Gi(a)?h:h+an(a)}:Cc(e))},Gf=function(e,t,n,i){return br(ln(e)?!t:n===!0?!!(n=0):!i,function(){return ln(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},ag=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,a){return a(s)},i)}},og=function(e,t){return function(n){return e(parseFloat(n))+(t||an(n))}},lg=function(e,t,n){return Wf(e,t,0,1,n)},Vf=function(e,t,n){return br(n,function(i){return e[~~t(i)]})},cg=function r(e,t,n){var i=t-e;return ln(e)?Vf(e,r(0,e.length),t):br(n,function(s){return(i+(s-e)%i)%i+e})},hg=function r(e,t,n){var i=t-e,s=i*2;return ln(e)?Vf(e,r(0,e.length-1),t):br(n,function(a){return a=(s+(a-e)%s)%s||0,e+(a>i?s-a:a)})},La=function(e){return e.replace(Vm,function(t){var n=t.indexOf("[")+1,i=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(Wm);return Gf(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},Wf=function(e,t,n,i,s){var a=t-e,o=i-n;return br(s,function(l){return n+((l-e)/a*o||0)})},ug=function r(e,t,n,i){var s=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!s){var a=Zt(e),o={},l,c,h,f,u;if(n===!0&&(i=1)&&(n=null),a)e={p:e},t={p:t};else if(ln(e)&&!ln(t)){for(h=[],f=e.length,u=f-2,c=1;c<f;c++)h.push(r(e[c-1],e[c]));f--,s=function(g){g*=f;var _=Math.min(u,~~g);return h[_](g-_)},n=t}else i||(e=Ns(ln(e)?[]:{},e));if(!h){for(l in t)Yh.call(o,e,l,"get",t[l]);s=function(g){return Zh(g,o)||(a?e.p:e)}}}return br(n,s)},Nu=function(e,t,n){var i=e.labels,s=Zn,a,o,l;for(a in i)o=i[a]-t,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},zn=function(e,t,n){var i=e.vars,s=i[t],a=Et,o=e._ctx,l,c,h;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&cr.length&&Jo(),o&&(Et=o),h=l?s.apply(c,l):s.call(c),Et=a,h},oa=function(e){return mr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!en),e.progress()<1&&zn(e,"onInterrupt"),e},Ms,Xf=[],qf=function(e){if(e)if(e=!e.name&&e.default||e,zh()||e.headless){var t=e.name,n=Dt(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Pa,render:Zh,add:Yh,kill:Rg,modifier:Ag,rawVars:0},a={targetTest:0,get:0,getSetter:jh,aliases:{},register:0};if(Bs(),e!==i){if(Un[t])return;Wn(i,Wn(Qo(e,s),a)),Ns(i.prototype,Ns(s,Qo(e,a))),Un[i.prop=t]=i,e.targetTest&&(Uo.push(i),Vh[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Rf(t,i),e.register&&e.register(Rn,i,wn)}else Xf.push(e)},vt=255,la={aqua:[0,vt,vt],lime:[0,vt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,vt],navy:[0,0,128],white:[vt,vt,vt],olive:[128,128,0],yellow:[vt,vt,0],orange:[vt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[vt,0,0],pink:[vt,192,203],cyan:[0,vt,vt],transparent:[vt,vt,vt,0]},Ll=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*vt+.5|0},Yf=function(e,t,n){var i=e?Gi(e)?[e>>16,e>>8&vt,e&vt]:0:la.black,s,a,o,l,c,h,f,u,d,g;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),la[e])i=la[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+s+s+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&vt,i&vt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&vt,e&vt]}else if(e.substr(0,3)==="hsl"){if(i=g=e.match(Lu),!t)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,a=h<=.5?h*(c+1):h+c-h*c,s=h*2-a,i.length>3&&(i[3]*=1),i[0]=Ll(l+1/3,s,a),i[1]=Ll(l,s,a),i[2]=Ll(l-1/3,s,a);else if(~e.indexOf("="))return i=e.match(wf),n&&i.length<4&&(i[3]=1),i}else i=e.match(Lu)||la.transparent;i=i.map(Number)}return t&&!g&&(s=i[0]/vt,a=i[1]/vt,o=i[2]/vt,f=Math.max(s,a,o),u=Math.min(s,a,o),h=(f+u)/2,f===u?l=c=0:(d=f-u,c=h>.5?d/(2-f-u):d/(f+u),l=f===s?(a-o)/d+(a<o?6:0):f===a?(o-s)/d+2:(s-a)/d+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},$f=function(e){var t=[],n=[],i=-1;return e.split(hr).forEach(function(s){var a=s.match(Ss)||[];t.push.apply(t,a),n.push(i+=a.length+1)}),t.c=n,t},Ou=function(e,t,n){var i="",s=(e+i).match(hr),a=t?"hsla(":"rgba(",o=0,l,c,h,f;if(!s)return e;if(s=s.map(function(u){return(u=Yf(u,t,1))&&a+(t?u[0]+","+u[1]+"%,"+u[2]+"%,"+u[3]:u.join(","))+")"}),n&&(h=$f(e),l=n.c,l.join(i)!==h.c.join(i)))for(c=e.replace(hr,"1").split(Ss),f=c.length-1;o<f;o++)i+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(h.length?h:s.length?s:n).shift());if(!c)for(c=e.split(hr),f=c.length-1;o<f;o++)i+=c[o]+s[o];return i+c[f]},hr=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in la)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),dg=/hsl[a]?\(/,Kf=function(e){var t=e.join(" "),n;if(hr.lastIndex=0,hr.test(t))return n=dg.test(t),e[1]=Ou(e[1],n),e[0]=Ou(e[0],n,$f(e[1])),!0},Da,Fn=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,a=s,o=[],l,c,h,f,u,d,g=function _(p){var m=r()-i,v=p===!0,y,S,A,T;if((m>e||m<0)&&(n+=m-t),i+=m,A=i-n,y=A-a,(y>0||v)&&(T=++f.frame,u=A-f.time*1e3,f.time=A=A/1e3,a+=y+(y>=s?4:s-y),S=1),v||(l=c(_)),S)for(d=0;d<o.length;d++)o[d](A,u,T,p)};return f={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(p){return u/(1e3/(p||60))},wake:function(){Ef&&(!Mc&&zh()&&(mi=Mc=window,Hh=mi.document||{},Vn.gsap=Rn,(mi.gsapVersions||(mi.gsapVersions=[])).push(Rn.version),Af(Zo||mi.GreenSockGlobals||!mi.gsap&&mi||{}),Xf.forEach(qf)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=h||function(p){return setTimeout(p,a-f.time*1e3+1|0)},Da=1,g(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),Da=0,c=Pa},lagSmoothing:function(p,m){e=p||1/0,t=Math.min(m||33,e)},fps:function(p){s=1e3/(p||240),a=f.time*1e3+s},add:function(p,m,v){var y=m?function(S,A,T,b){p(S,A,T,b),f.remove(y)}:p;return f.remove(p),o[v?"unshift":"push"](y),Bs(),y},remove:function(p,m){~(m=o.indexOf(p))&&o.splice(m,1)&&d>=m&&d--},_listeners:o},f}(),Bs=function(){return!Da&&Fn.wake()},ot={},fg=/^[\d.\-M][\d.\-,\s]/,pg=/["']/g,mg=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),t[i]=isNaN(c)?c.replace(pg,"").trim():+c,i=l.substr(o+1).trim();return t},gg=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},_g=function(e){var t=(e+"").split("("),n=ot[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[mg(t[1])]:gg(e).split(",").map(Df)):ot._CE&&fg.test(e)?ot._CE("",e):n},vg=function(e){return function(t){return 1-e(1-t)}},Wr=function(e,t){return e&&(Dt(e)?e:ot[e]||_g(e))||t},es=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},a;return Mn(e,function(o){ot[o]=Vn[o]=s,ot[a=o.toLowerCase()]=n;for(var l in s)ot[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=ot[o+"."+l]=s[l]}),s},jf=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Dl=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),a=s/Sc*(Math.asin(1/i)||0),o=function(h){return h===1?1:i*Math.pow(2,-10*h)*Gm((h-a)*s)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:jf(o);return s=Sc/s,l.config=function(c,h){return r(e,c,h)},l},kl=function r(e,t){t===void 0&&(t=1.70158);var n=function(a){return a?--a*a*((t+1)*a+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:jf(n);return i.config=function(s){return r(e,s)},i};Mn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;es(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});ot.Linear.easeNone=ot.none=ot.Linear.easeIn;es("Elastic",Dl("in"),Dl("out"),Dl());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(o){return o<t?r*o*o:o<n?r*Math.pow(o-1.5/e,2)+.75:o<i?r*(o-=2.25/e)*o+.9375:r*Math.pow(o-2.625/e,2)+.984375};es("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);es("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});es("Circ",function(r){return-(Sf(1-r*r)-1)});es("Sine",function(r){return r===1?1:-Hm(r*Bm)+1});es("Back",kl("in"),kl("out"),kl());ot.SteppedEase=ot.steps=Vn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,a=1-yt;return function(o){return((i*za(0,a,o)|0)+s)*n}}};Ra.ease=ot["quad.out"];Mn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return Wh+=r+","+r+"Params,"});var Zf=function(e,t){this.id=zm++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Pf,this.set=t?t.getSetter:jh},ka=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Fs(this,+t.duration,1,1),this.data=t.data,Et&&(this._ctx=Et,Et.data.push(this)),Da||Fn.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Fs(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Bs(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(yl(this,n),!s._dp||s.parent||Uf(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&yi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===yt||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Lf(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Iu(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Iu(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Os(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-yt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?el(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-yt?0:this._rts,this.totalTime(za(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),vl(this),Jm(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Bs(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==yt&&(this._tTime-=yt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=At(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&yi(i,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Sn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?el(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=$m);var i=en;return en=n,qh(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),en=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Uu(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Uu(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(Yn(this,n),Sn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Sn(i)),this._dur||(this._zTime=-yt),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-yt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-yt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-yt)},e.eventCallback=function(n,i,s){var a=this.vars;return arguments.length>1?(i?(a[n]=i,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},e.then=function(n){var i=this,s=i._prom;return new Promise(function(a){var o=Dt(n)?n:kf,l=function(){var h=i.then;i.then=null,s&&s(),Dt(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=h),a(o),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},e.kill=function(){oa(this)},r}();Wn(ka.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-yt,_prom:0,_ps:!1,_rts:1});var bn=function(r){bf(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Sn(n.sortChildren),Rt&&yi(n.parent||Rt,ki(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Nf(ki(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,a){return ga(0,arguments,this),this},t.from=function(i,s,a){return ga(1,arguments,this),this},t.fromTo=function(i,s,a,o){return ga(2,arguments,this),this},t.set=function(i,s,a){return s.duration=0,s.parent=this,ma(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Gt(i,s,Yn(this,a),1),this},t.call=function(i,s,a){return yi(this,Gt.delayedCall(0,i,s),a)},t.staggerTo=function(i,s,a,o,l,c,h){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=h,a.parent=this,new Gt(i,a,Yn(this,l)),this},t.staggerFrom=function(i,s,a,o,l,c,h){return a.runBackwards=1,ma(a).immediateRender=Sn(a.immediateRender),this.staggerTo(i,s,a,o,l,c,h)},t.staggerFromTo=function(i,s,a,o,l,c,h,f){return o.startAt=a,ma(o).immediateRender=Sn(o.immediateRender),this.staggerTo(i,s,o,l,c,h,f)},t.render=function(i,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:At(i),f=this._zTime<0!=i<0&&(this._initted||!c),u,d,g,_,p,m,v,y,S,A,T,b;if(this!==Rt&&h>l&&i>=0&&(h=l),h!==this._tTime||a||f){if(o!==this._time&&c&&(h+=this._time-o,i+=this._time-o),u=h,S=this._start,y=this._ts,m=!y,f&&(c||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(T=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,s,a);if(u=At(h%p),h===l?(_=this._repeat,u=c):(A=At(h/p),_=~~A,_&&_===A&&(u=c,_--),u>c&&(u=c)),A=Os(this._tTime,p),!o&&this._tTime&&A!==_&&this._tTime-A*p-this._dur<=0&&(A=_),T&&_&1&&(u=c-u,b=1),_!==A&&!this._lock){var R=T&&A&1,k=R===(T&&_&1);if(_<A&&(R=!R),o=R?0:h%c?c:h,this._lock=1,this.render(o||(b?0:At(_*p)),s,!c)._lock=0,this._tTime=h,!s&&this.parent&&zn(this,"onRepeat"),this.vars.repeatRefresh&&!b&&(this.invalidate()._lock=1,A=_),o&&o!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,k&&(this._lock=2,o=R?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!b&&this.invalidate()),this._lock=0,!this._ts&&!m)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(v=ng(this,At(o),At(u)),v&&(h-=u-(u=v._start))),this._tTime=h,this._time=u,this._act=!!y,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&h&&c&&!s&&!A&&(zn(this,"onStart"),this._tTime!==h))return this;if(u>=o&&i>=0)for(d=this._first;d;){if(g=d._next,(d._act||u>=d._start)&&d._ts&&v!==d){if(d.parent!==this)return this.render(i,s,a);if(d.render(d._ts>0?(u-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(u-d._start)*d._ts,s,a),u!==this._time||!this._ts&&!m){v=0,g&&(h+=this._zTime=-yt);break}}d=g}else{d=this._last;for(var x=i<0?i:u;d;){if(g=d._prev,(d._act||x<=d._end)&&d._ts&&v!==d){if(d.parent!==this)return this.render(i,s,a);if(d.render(d._ts>0?(x-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(x-d._start)*d._ts,s,a||en&&qh(d)),u!==this._time||!this._ts&&!m){v=0,g&&(h+=this._zTime=x?-yt:yt);break}}d=g}}if(v&&!s&&(this.pause(),v.render(u>=o?0:-yt)._zTime=u>=o?1:-1,this._ts))return this._start=S,vl(this),this.render(i,s,a);this._onUpdate&&!s&&zn(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&o)&&(S===this._start||Math.abs(y)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&mr(this,1),!s&&!(i<0&&!o)&&(h||o||!l)&&(zn(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var a=this;if(Gi(s)||(s=Yn(this,s,i)),!(i instanceof ka)){if(ln(i))return i.forEach(function(o){return a.add(o,s)}),this;if(Zt(i))return this.addLabel(i,s);if(Dt(i))i=Gt.delayedCall(0,i);else return this}return this!==i?yi(this,i,s):this},t.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-Zn);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Gt?s&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},t.remove=function(i){return Zt(i)?this.removeLabel(i):Dt(i)?this.killTweensOf(i):(i.parent===this&&_l(this,i),i===this._recent&&(this._recent=this._last),Vr(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=At(Fn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=Yn(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,a){var o=Gt.delayedCall(0,s||Pa,a);return o.data="isPause",this._hasPause=1,yi(this,o,Yn(this,i))},t.removePause=function(i){var s=this._first;for(i=Yn(this,i);s;)s._start===i&&s.data==="isPause"&&mr(s),s=s._next},t.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)ir!==o[l]&&o[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var a=[],o=Jn(i),l=this._first,c=Gi(s),h;l;)l instanceof Gt?Km(l._targets,o)&&(c?(!ir||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(h=l.getTweensOf(o,s)).length&&a.push.apply(a,h),l=l._next;return a},t.tweenTo=function(i,s){s=s||{};var a=this,o=Yn(a,i),l=s,c=l.startAt,h=l.onStart,f=l.onStartParams,u=l.immediateRender,d,g=Gt.to(a,Wn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||yt,onStart:function(){if(a.pause(),!d){var p=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());g._dur!==p&&Fs(g,p,0,1).render(g._time,!0,!0),d=1}h&&h.apply(g,f||[])}},s));return u?g.render(0):g},t.tweenFromTo=function(i,s,a){return this.tweenTo(s,Wn({startAt:{time:Yn(this,i)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Nu(this,Yn(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Nu(this,Yn(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+yt)},t.shiftChildren=function(i,s,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(i=At(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=i);return Vr(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Vr(this)},t.totalDuration=function(i){var s=0,a=this,o=a._last,l=Zn,c,h,f;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(f=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,yi(a,o,h-o._delay,1)._lock=0):l=h,h<0&&o._ts&&(s-=h,(!f&&!a._dp||f&&f.smoothChildTiming)&&(a._start+=At(h/a._ts),a._time-=h,a._tTime-=h),a.shiftChildren(-h,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;Fs(a,a===Rt&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(i){if(Rt._ts&&(Lf(Rt,el(i,Rt)),Cf=Fn.frame),Fn.frame>=Du){Du+=Gn.autoSleep||120;var s=Rt._first;if((!s||!s._ts)&&Gn.autoSleep&&Fn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Fn.sleep()}}},e}(ka);Wn(bn.prototype,{_lock:0,_hasPause:0,_forcing:0});var yg=function(e,t,n,i,s,a,o){var l=new wn(this._pt,e,t,0,1,ip,null,s),c=0,h=0,f,u,d,g,_,p,m,v;for(l.b=n,l.e=i,n+="",i+="",(m=~i.indexOf("random("))&&(i=La(i)),a&&(v=[n,i],a(v,e,t),n=v[0],i=v[1]),u=n.match(Cl)||[];f=Cl.exec(i);)g=f[0],_=i.substring(c,f.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),g!==u[h++]&&(p=parseFloat(u[h-1])||0,l._pt={_next:l._pt,p:_||h===1?_:",",s:p,c:g.charAt(1)==="="?Es(p,g)-p:parseFloat(g)-p,m:d&&d<4?Math.round:0},c=Cl.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(Tf.test(i)||m)&&(l.e=0),this._pt=l,l},Yh=function(e,t,n,i,s,a,o,l,c,h){Dt(i)&&(i=i(s||0,e,a));var f=e[t],u=n!=="get"?n:Dt(f)?c?e[t.indexOf("set")||!Dt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():f,d=Dt(f)?c?wg:tp:Kh,g;if(Zt(i)&&(~i.indexOf("random(")&&(i=La(i)),i.charAt(1)==="="&&(g=Es(u,i)+(an(u)||0),(g||g===0)&&(i=g))),!h||u!==i||Pc)return!isNaN(u*i)&&i!==""?(g=new wn(this._pt,e,t,+u||0,i-(u||0),typeof f=="boolean"?Eg:np,0,d),c&&(g.fp=c),o&&g.modifier(o,this,e),this._pt=g):(!f&&!(t in e)&&Gh(t,i),yg.call(this,e,t,u,i,d,l||Gn.stringFilter,c))},xg=function(e,t,n,i,s){if(Dt(e)&&(e=_a(e,s,t,n,i)),!Ei(e)||e.style&&e.nodeType||ln(e)||Mf(e))return Zt(e)?_a(e,s,t,n,i):e;var a={},o;for(o in e)a[o]=_a(e[o],s,t,n,i);return a},Jf=function(e,t,n,i,s,a){var o,l,c,h;if(Un[e]&&(o=new Un[e]).init(s,o.rawVars?t[e]:xg(t[e],i,s,a,n),n,i,a)!==!1&&(n._pt=l=new wn(n._pt,s,e,0,1,o.render,o,0,o.priority),n!==Ms))for(c=n._ptLookup[n._targets.indexOf(s)],h=o._props.length;h--;)c[o._props[h]]=l;return o},ir,Pc,$h=function r(e,t,n){var i=e.vars,s=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,f=i.yoyoEase,u=i.keyframes,d=i.autoRevert,g=e._dur,_=e._startAt,p=e._targets,m=e.parent,v=m&&m.data==="nested"?m.vars.targets:p,y=e._overwrite==="auto"&&!Fh,S=e.timeline,A=i.easeReverse||f,T,b,R,k,x,M,P,I,F,q,z,G,W;if(S&&(!u||!s)&&(s="none"),e._ease=Wr(s,Ra.ease),e._rEase=A&&(Wr(A)||e._ease),e._from=!S&&!!i.runBackwards,e._from&&(e.ratio=1),!S||u&&!i.stagger){if(I=p[0]?Gr(p[0]).harness:0,G=I&&i[I.prop],T=Qo(i,Vh),_&&(_._zTime<0&&_.progress(1),t<0&&h&&o&&!d?_.render(-1,!0):_.revert(h&&g?Io:Ym),_._lazy=0),a){if(mr(e._startAt=Gt.set(p,Wn({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!_&&Sn(l),startAt:null,delay:0,onUpdate:c&&function(){return zn(e,"onUpdate")},stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(en||!o&&!d)&&e._startAt.revert(Io),o&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(h&&g&&!_){if(t&&(o=!1),R=Wn({overwrite:!1,data:"isFromStart",lazy:o&&!_&&Sn(l),immediateRender:o,stagger:0,parent:m},T),G&&(R[I.prop]=G),mr(e._startAt=Gt.set(p,R)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(en?e._startAt.revert(Io):e._startAt.render(-1,!0)),e._zTime=t,!o)r(e._startAt,yt,yt);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&Sn(l)||l&&!g,b=0;b<p.length;b++){if(x=p[b],P=x._gsap||Xh(p)[b]._gsap,e._ptLookup[b]=q={},wc[P.id]&&cr.length&&Jo(),z=v===p?b:v.indexOf(x),I&&(F=new I).init(x,G||T,e,z,v)!==!1&&(e._pt=k=new wn(e._pt,x,F.name,0,1,F.render,F,0,F.priority),F._props.forEach(function(re){q[re]=k}),F.priority&&(M=1)),!I||G)for(R in T)Un[R]&&(F=Jf(R,T,e,z,x,v))?F.priority&&(M=1):q[R]=k=Yh.call(e,x,R,"get",T[R],z,v,0,i.stringFilter);e._op&&e._op[b]&&e.kill(x,e._op[b]),y&&e._pt&&(ir=e,Rt.killTweensOf(x,q,e.globalTime(t)),W=!e.parent,ir=0),e._pt&&l&&(wc[P.id]=1)}M&&rp(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!W,u&&t<=0&&S.render(Zn,!0,!0)},bg=function(e,t,n,i,s,a,o,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],h,f,u,d;if(!c)for(c=e._ptCache[t]=[],u=e._ptLookup,d=e._targets.length;d--;){if(h=u[d][t],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==t&&h.fp!==t;)h=h._next;if(!h)return Pc=1,e.vars[t]="+=0",$h(e,o),Pc=0,l?Ca(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(d=c.length;d--;)f=c[d],h=f._pt||f,h.s=(i||i===0)&&!s?i:h.s+(i||0)+a*h.c,h.c=n-h.s,f.e&&(f.e=Ot(n)+an(f.e)),f.b&&(f.b=h.s+an(f.b))},Sg=function(e,t){var n=e[0]?Gr(e[0]).harness:0,i=n&&n.aliases,s,a,o,l;if(!i)return t;s=Ns({},t);for(a in i)if(a in s)for(l=i[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},Mg=function(e,t,n,i){var s=t.ease||i||"power1.inOut",a,o;if(ln(t))o=n[e]||(n[e]=[]),t.forEach(function(l,c){return o.push({t:c/(t.length-1)*100,v:l,e:s})});else for(a in t)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:s})},_a=function(e,t,n,i,s){return Dt(e)?e.call(t,n,i,s):Zt(e)&&~e.indexOf("random(")?La(e):e},Qf=Wh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",ep={};Mn(Qf+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return ep[r]=1});var Gt=function(r){bf(e,r);function e(n,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=r.call(this,a?i:ma(i))||this;var l=o.vars,c=l.duration,h=l.delay,f=l.immediateRender,u=l.stagger,d=l.overwrite,g=l.keyframes,_=l.defaults,p=l.scrollTrigger,m=i.parent||Rt,v=(ln(n)||Mf(n)?Gi(n[0]):"length"in i)?[n]:Jn(n),y,S,A,T,b,R,k,x;if(o._targets=v.length?Xh(v):Ca("GSAP target "+n+" not found. https://gsap.com",!Gn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=d,g||u||Ya(c)||Ya(h)){i=o.vars;var M=i.easeReverse||i.yoyoEase;if(y=o.timeline=new bn({data:"nested",defaults:_||{},targets:m&&m.data==="nested"?m.vars.targets:v}),y.kill(),y.parent=y._dp=ki(o),y._start=0,u||Ya(c)||Ya(h)){if(T=v.length,k=u&&zf(u),Ei(u))for(b in u)~Qf.indexOf(b)&&(x||(x={}),x[b]=u[b]);for(S=0;S<T;S++)A=Qo(i,ep),A.stagger=0,M&&(A.easeReverse=M),x&&Ns(A,x),R=v[S],A.duration=+_a(c,ki(o),S,R,v),A.delay=(+_a(h,ki(o),S,R,v)||0)-o._delay,!u&&T===1&&A.delay&&(o._delay=h=A.delay,o._start+=h,A.delay=0),y.to(R,A,k?k(S,R,v):0),y._ease=ot.none;y.duration()?c=h=0:o.timeline=0}else if(g){ma(Wn(y.vars.defaults,{ease:"none"})),y._ease=Wr(g.ease||i.ease||"none");var P=0,I,F,q;if(ln(g))g.forEach(function(z){return y.to(v,z,">")}),y.duration();else{A={};for(b in g)b==="ease"||b==="easeEach"||Mg(b,g[b],A,g.easeEach);for(b in A)for(I=A[b].sort(function(z,G){return z.t-G.t}),P=0,S=0;S<I.length;S++)F=I[S],q={ease:F.e,duration:(F.t-(S?I[S-1].t:0))/100*c},q[b]=F.v,y.to(v,q,P),P+=q.duration;y.duration()<c&&y.to({},{duration:c-y.duration()})}}c||o.duration(c=y.duration())}else o.timeline=0;return d===!0&&!Fh&&(ir=ki(o),Rt.killTweensOf(v),ir=0),yi(m,ki(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(f||!c&&!g&&o._start===At(m._time)&&Sn(f)&&Qm(ki(o))&&m.data!=="nested")&&(o._tTime=-yt,o.render(Math.max(0,-h)||0)),p&&Nf(ki(o),p),o}var t=e.prototype;return t.render=function(i,s,a){var o=this._time,l=this._tDur,c=this._dur,h=i<0,f=i>l-yt&&!h?l:i<yt?0:i,u,d,g,_,p,m,v,y;if(!c)tg(this,i,s,a);else if(f!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(u=f,y=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(_*100+i,s,a);if(u=At(f%_),f===l?(g=this._repeat,u=c):(p=At(f/_),g=~~p,g&&g===p?(u=c,g--):u>c&&(u=c)),m=this._yoyo&&g&1,m&&(u=c-u),p=Os(this._tTime,_),u===o&&!a&&this._initted&&g===p)return this._tTime=f,this;g!==p&&this.vars.repeatRefresh&&!m&&!this._lock&&u!==_&&this._initted&&(this._lock=a=1,this.render(At(_*g),!0).invalidate()._lock=0)}if(!this._initted){if(Of(this,h?i:u,a,s,f))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&g!==p))return this;if(c!==this._dur)return this.render(i,s,a)}if(this._rEase){var S=u<o;if(S!==this._inv){var A=S?o:c-o;this._inv=S,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=A?(S?-1:1)/A:0,this._invScale=S?-this.ratio:1-this.ratio,this._invEase=S?this._rEase:this._ease}this.ratio=v=this._invRatio+this._invScale*this._invEase((u-this._invTime)*this._invRecip)}else this.ratio=v=this._ease(u/c);if(this._from&&(this.ratio=v=1-v),this._tTime=f,this._time=u,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&f&&!s&&!p&&(zn(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(v,d.d),d=d._next;y&&y.render(i<0?i:y._dur*y._ease(u/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(h&&Tc(this,i,s,a),zn(this,"onUpdate")),this._repeat&&g!==p&&this.vars.onRepeat&&!s&&this.parent&&zn(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(h&&!this._onUpdate&&Tc(this,i,!0,!0),(i||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&mr(this,1),!s&&!(h&&!o)&&(f||o||m)&&(zn(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,a,o,l){Da||Fn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||$h(this,c),h=this._ease(c/this._dur),bg(this,i,s,a,o,h,c,l)?this.resetTo(i,s,a,o,1):(yl(this,0),this.parent||If(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?oa(this):this.scrollTrigger&&this.scrollTrigger.kill(!!en),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,ir&&ir.vars.overwrite!==!0)._first||oa(this),this.parent&&a!==this.timeline.totalDuration()&&Fs(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?Jn(i):o,c=this._ptLookup,h=this._pt,f,u,d,g,_,p,m;if((!s||s==="all")&&Zm(o,l))return s==="all"&&(this._pt=0),oa(this);for(f=this._op=this._op||[],s!=="all"&&(Zt(s)&&(_={},Mn(s,function(v){return _[v]=1}),s=_),s=Sg(o,s)),m=o.length;m--;)if(~l.indexOf(o[m])){u=c[m],s==="all"?(f[m]=s,g=u,d={}):(d=f[m]=f[m]||{},g=s);for(_ in g)p=u&&u[_],p&&((!("kill"in p.d)||p.d.kill(_)===!0)&&_l(this,p,"_pt"),delete u[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&h&&oa(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return ga(1,arguments)},e.delayedCall=function(i,s,a,o){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(i,s,a){return ga(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,a){return Rt.killTweensOf(i,s,a)},e}(ka);Wn(Gt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Mn("staggerTo,staggerFrom,staggerFromTo",function(r){Gt[r]=function(){var e=new bn,t=Ac.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var Kh=function(e,t,n){return e[t]=n},tp=function(e,t,n){return e[t](n)},wg=function(e,t,n,i){return e[t](i.fp,n)},Tg=function(e,t,n){return e.setAttribute(t,n)},jh=function(e,t){return Dt(e[t])?tp:Bh(e[t])&&e.setAttribute?Tg:Kh},np=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},Eg=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},ip=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},Zh=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},Ag=function(e,t,n,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(e,t,n),s=a},Rg=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?_l(this,t,"_pt"):t.dep||(n=1),t=i;return!n},Cg=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},rp=function(e){for(var t=e._pt,n,i,s,a;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:a)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:a=t,t=n}e._pt=s},wn=function(){function r(t,n,i,s,a,o,l,c,h){this.t=n,this.s=s,this.c=a,this.p=i,this.r=o||np,this.d=l||this,this.set=c||Kh,this.pr=h||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=Cg,this.m=n,this.mt=s,this.tween=i},r}();Mn(Wh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return Vh[r]=1});Vn.TweenMax=Vn.TweenLite=Gt;Vn.TimelineLite=Vn.TimelineMax=bn;Rt=new bn({sortChildren:!1,defaults:Ra,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Gn.stringFilter=Kf;var Xr=[],No={},Pg=[],Fu=0,Lg=0,Il=function(e){return(No[e]||Pg).map(function(t){return t()})},Lc=function(){var e=Date.now(),t=[];e-Fu>2&&(Il("matchMediaInit"),Xr.forEach(function(n){var i=n.queries,s=n.conditions,a,o,l,c;for(o in i)a=mi.matchMedia(i[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&t.push(n))}),Il("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Fu=e,Il("matchMedia"))},sp=function(){function r(t,n){this.selector=n&&Rc(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Lg++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){Dt(n)&&(s=i,i=n,n=Dt);var a=this,o=function(){var c=Et,h=a.selector,f;return c&&c!==a&&c.data.push(a),s&&(a.selector=Rc(s)),Et=a,f=i.apply(a,arguments),Dt(f)&&a._r.push(f),Et=c,a.selector=h,a.isReverted=!1,f};return a.last=o,n===Dt?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},e.ignore=function(n){var i=Et;Et=null,n(this),Et=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Gt&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return o.splice(o.indexOf(h),1)}));for(o.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,f){return f.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof bn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Gt)&&c.revert&&c.revert(n);s._r.forEach(function(h){return h(n,s)}),s.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var a=Xr.length;a--;)Xr[a].id===this.id&&Xr.splice(a,1)},e.revert=function(n){this.kill(n||{})},r}(),Dg=function(){function r(t){this.contexts=[],this.scope=t,Et&&Et.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){Ei(n)||(n={matches:n});var a=new sp(0,s||this.scope),o=a.conditions={},l,c,h;Et&&!a.selector&&(a.selector=Et.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?h=1:(l=mi.matchMedia(n[c]),l&&(Xr.indexOf(a)<0&&Xr.push(a),(o[c]=l.matches)&&(h=1),l.addListener?l.addListener(Lc):l.addEventListener("change",Lc)));return h&&i(a,function(f){return a.add(null,f)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),tl={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return qf(i)})},timeline:function(e){return new bn(e)},getTweensOf:function(e,t){return Rt.getTweensOf(e,t)},getProperty:function(e,t,n,i){Zt(e)&&(e=Jn(e)[0]);var s=Gr(e||{}).get,a=n?kf:Df;return n==="native"&&(n=""),e&&(t?a((Un[t]&&Un[t].get||s)(e,t,n,i)):function(o,l,c){return a((Un[o]&&Un[o].get||s)(e,o,l,c))})},quickSetter:function(e,t,n){if(e=Jn(e),e.length>1){var i=e.map(function(h){return Rn.quickSetter(h,t,n)}),s=i.length;return function(h){for(var f=s;f--;)i[f](h)}}e=e[0]||{};var a=Un[t],o=Gr(e),l=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(h){var f=new a;Ms._pt=0,f.init(e,n?h+n:h,Ms,0,[e]),f.render(1,f),Ms._pt&&Zh(1,Ms)}:o.set(e,l);return a?c:function(h){return c(e,l,n?h+n:h,o,1)}},quickTo:function(e,t,n){var i,s=Rn.to(e,Wn((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(l,c,h){return s.resetTo(t,l,c,h)};return a.tween=s,a},isTweening:function(e){return Rt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Wr(e.ease,Ra.ease)),ku(Ra,e||{})},config:function(e){return ku(Gn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,a=e.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!Un[o]&&!Vn[o]&&Ca(t+" effect requires "+o+" plugin.")}),Pl[t]=function(o,l,c){return n(Jn(o),Wn(l||{},s),c)},a&&(bn.prototype[t]=function(o,l,c){return this.add(Pl[t](o,Ei(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){ot[e]=Wr(t)},parseEase:function(e,t){return arguments.length?Wr(e,t):ot},getById:function(e){return Rt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new bn(e),i,s;for(n.smoothChildTiming=Sn(e.smoothChildTiming),Rt.remove(n),n._dp=0,n._time=n._tTime=Rt._time,i=Rt._first;i;)s=i._next,(t||!(!i._dur&&i instanceof Gt&&i.vars.onComplete===i._targets[0]))&&yi(n,i,i._start-i._delay),i=s;return yi(Rt,n,0),n},context:function(e,t){return e?new sp(e,t):Et},matchMedia:function(e){return new Dg(e)},matchMediaRefresh:function(){return Xr.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||Lc()},addEventListener:function(e,t){var n=No[e]||(No[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=No[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:cg,wrapYoyo:hg,distribute:zf,random:Gf,snap:Hf,normalize:lg,getUnit:an,clamp:rg,splitColor:Yf,toArray:Jn,selector:Rc,mapRange:Wf,pipe:ag,unitize:og,interpolate:ug,shuffle:Bf},install:Af,effects:Pl,ticker:Fn,updateRoot:bn.updateRoot,plugins:Un,globalTimeline:Rt,core:{PropTween:wn,globals:Rf,Tween:Gt,Timeline:bn,Animation:ka,getCache:Gr,_removeLinkedListItem:_l,reverting:function(){return en},context:function(e){return e&&Et&&(Et.data.push(e),e._ctx=Et),Et},suppressOverwrites:function(e){return Fh=e}}};Mn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return tl[r]=Gt[r]});Fn.add(bn.updateRoot);Ms=tl.to({},{duration:0});var kg=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},Ig=function(e,t){var n=e._targets,i,s,a;for(i in t)for(s=n.length;s--;)a=e._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=kg(a,i)),a&&a.modifier&&a.modifier(t[i],e,n[s],i))},Ul=function(e,t){return{name:e,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var l,c;if(Zt(s)&&(l={},Mn(s,function(h){return l[h]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}Ig(o,s)}}}},Rn=tl.registerPlugin({name:"attr",init:function(e,t,n,i,s){var a,o,l;this.tween=n;for(a in t)l=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(l||0)+"",t[a],i,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)en?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Ul("roundProps",Cc),Ul("modifiers"),Ul("snap",Hf))||tl;Gt.version=bn.version=Rn.version="3.15.0";Ef=1;zh()&&Bs();ot.Power0;ot.Power1;ot.Power2;ot.Power3;ot.Power4;ot.Linear;ot.Quad;ot.Cubic;ot.Quart;ot.Quint;ot.Strong;ot.Elastic;ot.Back;ot.SteppedEase;ot.Bounce;ot.Sine;ot.Expo;ot.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Bu,rr,As,Jh,Fr,zu,Qh,Ug=function(){return typeof window<"u"},Vi={},Lr=180/Math.PI,Rs=Math.PI/180,ns=Math.atan2,Hu=1e8,eu=/([A-Z])/g,Ng=/(left|right|width|margin|padding|x)/i,Og=/[\s,\(]\S/,Si={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Dc=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Fg=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Bg=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},zg=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Hg=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},ap=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},op=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},Gg=function(e,t,n){return e.style[t]=n},Vg=function(e,t,n){return e.style.setProperty(t,n)},Wg=function(e,t,n){return e._gsap[t]=n},Xg=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},qg=function(e,t,n,i,s){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},Yg=function(e,t,n,i,s){var a=e._gsap;a[t]=n,a.renderTransform(s,a)},Ct="transform",Tn=Ct+"Origin",$g=function r(e,t){var n=this,i=this.target,s=i.style,a=i._gsap;if(e in Vi&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Si[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return n.tfm[o]=Ii(i,o)}):this.tfm[e]=a.x?a[e]:Ii(i,e),e===Tn&&(this.tfm.zOrigin=a.zOrigin);else return Si.transform.split(",").forEach(function(o){return r.call(n,o,t)});if(this.props.indexOf(Ct)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Tn,t,"")),e=Ct}(s||t)&&this.props.push(e,t,s[e])},lp=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},Kg=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,a;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(eu,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Qh(),(!s||!s.isStart)&&!n[Ct]&&(lp(n),i.zOrigin&&n[Tn]&&(n[Tn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},cp=function(e,t){var n={target:e,props:[],revert:Kg,save:$g};return e._gsap||Rn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},hp,kc=function(e,t){var n=rr.createElementNS?rr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):rr.createElement(e);return n&&n.style?n:rr.createElement(e)},Hn=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(eu,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,zs(t)||t,1)||""},Gu="O,Moz,ms,Ms,Webkit".split(","),zs=function(e,t,n){var i=t||Fr,s=i.style,a=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!(Gu[a]+e in s););return a<0?null:(a===3?"ms":a>=0?Gu[a]:"")+e},Ic=function(){Ug()&&window.document&&(Bu=window,rr=Bu.document,As=rr.documentElement,Fr=kc("div")||{style:{}},kc("div"),Ct=zs(Ct),Tn=Ct+"Origin",Fr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",hp=!!zs("perspective"),Qh=Rn.core.reverting,Jh=1)},Vu=function(e){var t=e.ownerSVGElement,n=kc("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),As.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),As.removeChild(n),s},Wu=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},up=function(e){var t,n;try{t=e.getBBox()}catch{t=Vu(e),n=1}return t&&(t.width||t.height)||n||(t=Vu(e)),t&&!t.width&&!t.x&&!t.y?{x:+Wu(e,["x","cx","x1"])||0,y:+Wu(e,["y","cy","y1"])||0,width:0,height:0}:t},dp=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&up(e))},gr=function(e,t){if(t){var n=e.style,i;t in Vi&&t!==Tn&&(t=Ct),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(eu,"-$1").toLowerCase())):n.removeAttribute(t)}},sr=function(e,t,n,i,s,a){var o=new wn(e._pt,t,n,0,1,a?op:ap);return e._pt=o,o.b=i,o.e=s,e._props.push(n),o},Xu={deg:1,rad:1,turn:1},jg={grid:1,flex:1},_r=function r(e,t,n,i){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=Fr.style,l=Ng.test(t),c=e.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),f=100,u=i==="px",d=i==="%",g,_,p,m;if(i===a||!s||Xu[i]||Xu[a])return s;if(a!=="px"&&!u&&(s=r(e,t,n,"px")),m=e.getCTM&&dp(e),(d||a==="%")&&(Vi[t]||~t.indexOf("adius")))return g=m?e.getBBox()[l?"width":"height"]:e[h],Ot(d?s/g*f:s/100*g);if(o[l?"width":"height"]=f+(u?a:i),_=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,m&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===rr||!_.appendChild)&&(_=rr.body),p=_._gsap,p&&d&&p.width&&l&&p.time===Fn.time&&!p.uncache)return Ot(s/p.width*f);if(d&&(t==="height"||t==="width")){var v=e.style[t];e.style[t]=f+i,g=e[h],v?e.style[t]=v:gr(e,t)}else(d||a==="%")&&!jg[Hn(_,"display")]&&(o.position=Hn(e,"position")),_===e&&(o.position="static"),_.appendChild(Fr),g=Fr[h],_.removeChild(Fr),o.position="absolute";return l&&d&&(p=Gr(_),p.time=Fn.time,p.width=_[h]),Ot(u?g*s/f:g&&s?f/g*s:0)},Ii=function(e,t,n,i){var s;return Jh||Ic(),t in Si&&t!=="transform"&&(t=Si[t],~t.indexOf(",")&&(t=t.split(",")[0])),Vi[t]&&t!=="transform"?(s=Ua(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:il(Hn(e,Tn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=nl[t]&&nl[t](e,t,n)||Hn(e,t)||Pf(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?_r(e,t,s,n)+n:s},Zg=function(e,t,n,i){if(!n||n==="none"){var s=zs(t,e,1),a=s&&Hn(e,s,1);a&&a!==n?(t=s,n=a):t==="borderColor"&&(n=Hn(e,"borderTopColor"))}var o=new wn(this._pt,e.style,t,0,1,ip),l=0,c=0,h,f,u,d,g,_,p,m,v,y,S,A;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=Hn(e,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=e.style[t],e.style[t]=i,i=Hn(e,t)||i,_?e.style[t]=_:gr(e,t)),h=[n,i],Kf(h),n=h[0],i=h[1],u=n.match(Ss)||[],A=i.match(Ss)||[],A.length){for(;f=Ss.exec(i);)p=f[0],v=i.substring(l,f.index),g?g=(g+1)%5:(v.substr(-5)==="rgba("||v.substr(-5)==="hsla(")&&(g=1),p!==(_=u[c++]||"")&&(d=parseFloat(_)||0,S=_.substr((d+"").length),p.charAt(1)==="="&&(p=Es(d,p)+S),m=parseFloat(p),y=p.substr((m+"").length),l=Ss.lastIndex-y.length,y||(y=y||Gn.units[t]||S,l===i.length&&(i+=y,o.e+=y)),S!==y&&(d=_r(e,t,_,y)||0),o._pt={_next:o._pt,p:v||c===1?v:",",s:d,c:m-d,m:g&&g<4||t==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=t==="display"&&i==="none"?op:ap;return Tf.test(i)&&(o.e=0),this._pt=o,o},qu={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Jg=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=qu[n]||n,t[1]=qu[i]||i,t.join(" ")},Qg=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],Vi[o]&&(l=1,o=o==="transformOrigin"?Tn:Ct),gr(n,o);l&&(gr(n,Ct),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Ua(n,1),a.uncache=1,lp(i)))}},nl={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var a=e._pt=new wn(e._pt,t,n,0,0,Qg);return a.u=i,a.pr=-10,a.tween=s,e._props.push(n),1}}},Ia=[1,0,0,1,0,0],fp={},pp=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Yu=function(e){var t=Hn(e,Ct);return pp(t)?Ia:t.substr(7).match(wf).map(Ot)},tu=function(e,t){var n=e._gsap||Gr(e),i=e.style,s=Yu(e),a,o,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Ia:s):(s===Ia&&!e.offsetParent&&e!==As&&!n.svg&&(l=i.display,i.display="block",a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,As.appendChild(e)),s=Yu(e),l?i.display=l:gr(e,"display"),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):As.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Uc=function(e,t,n,i,s,a){var o=e._gsap,l=s||tu(e,!0),c=o.xOrigin||0,h=o.yOrigin||0,f=o.xOffset||0,u=o.yOffset||0,d=l[0],g=l[1],_=l[2],p=l[3],m=l[4],v=l[5],y=t.split(" "),S=parseFloat(y[0])||0,A=parseFloat(y[1])||0,T,b,R,k;n?l!==Ia&&(b=d*p-g*_)&&(R=S*(p/b)+A*(-_/b)+(_*v-p*m)/b,k=S*(-g/b)+A*(d/b)-(d*v-g*m)/b,S=R,A=k):(T=up(e),S=T.x+(~y[0].indexOf("%")?S/100*T.width:S),A=T.y+(~(y[1]||y[0]).indexOf("%")?A/100*T.height:A)),i||i!==!1&&o.smooth?(m=S-c,v=A-h,o.xOffset=f+(m*d+v*_)-m,o.yOffset=u+(m*g+v*p)-v):o.xOffset=o.yOffset=0,o.xOrigin=S,o.yOrigin=A,o.smooth=!!i,o.origin=t,o.originIsAbsolute=!!n,e.style[Tn]="0px 0px",a&&(sr(a,o,"xOrigin",c,S),sr(a,o,"yOrigin",h,A),sr(a,o,"xOffset",f,o.xOffset),sr(a,o,"yOffset",u,o.yOffset)),e.setAttribute("data-svg-origin",S+" "+A)},Ua=function(e,t){var n=e._gsap||new Zf(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(e),c=Hn(e,Tn)||"0",h,f,u,d,g,_,p,m,v,y,S,A,T,b,R,k,x,M,P,I,F,q,z,G,W,re,L,oe,Be,Xe,$,Q;return h=f=u=_=p=m=v=y=S=0,d=g=1,n.svg=!!(e.getCTM&&dp(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Ct]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ct]!=="none"?l[Ct]:"")),i.scale=i.rotate=i.translate="none"),b=tu(e,n.svg),n.svg&&(n.uncache?(W=e.getBBox(),c=n.xOrigin-W.x+"px "+(n.yOrigin-W.y)+"px",G=""):G=!t&&e.getAttribute("data-svg-origin"),Uc(e,G||c,!!G||n.originIsAbsolute,n.smooth!==!1,b)),A=n.xOrigin||0,T=n.yOrigin||0,b!==Ia&&(M=b[0],P=b[1],I=b[2],F=b[3],h=q=b[4],f=z=b[5],b.length===6?(d=Math.sqrt(M*M+P*P),g=Math.sqrt(F*F+I*I),_=M||P?ns(P,M)*Lr:0,v=I||F?ns(I,F)*Lr+_:0,v&&(g*=Math.abs(Math.cos(v*Rs))),n.svg&&(h-=A-(A*M+T*I),f-=T-(A*P+T*F))):(Q=b[6],Xe=b[7],L=b[8],oe=b[9],Be=b[10],$=b[11],h=b[12],f=b[13],u=b[14],R=ns(Q,Be),p=R*Lr,R&&(k=Math.cos(-R),x=Math.sin(-R),G=q*k+L*x,W=z*k+oe*x,re=Q*k+Be*x,L=q*-x+L*k,oe=z*-x+oe*k,Be=Q*-x+Be*k,$=Xe*-x+$*k,q=G,z=W,Q=re),R=ns(-I,Be),m=R*Lr,R&&(k=Math.cos(-R),x=Math.sin(-R),G=M*k-L*x,W=P*k-oe*x,re=I*k-Be*x,$=F*x+$*k,M=G,P=W,I=re),R=ns(P,M),_=R*Lr,R&&(k=Math.cos(R),x=Math.sin(R),G=M*k+P*x,W=q*k+z*x,P=P*k-M*x,z=z*k-q*x,M=G,q=W),p&&Math.abs(p)+Math.abs(_)>359.9&&(p=_=0,m=180-m),d=Ot(Math.sqrt(M*M+P*P+I*I)),g=Ot(Math.sqrt(z*z+Q*Q)),R=ns(q,z),v=Math.abs(R)>2e-4?R*Lr:0,S=$?1/($<0?-$:$):0),n.svg&&(G=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!pp(Hn(e,Ct)),G&&e.setAttribute("transform",G))),Math.abs(v)>90&&Math.abs(v)<270&&(s?(d*=-1,v+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,v+=v<=0?180:-180)),t=t||n.uncache,n.x=h-((n.xPercent=h&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-h)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=f-((n.yPercent=f&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=u+a,n.scaleX=Ot(d),n.scaleY=Ot(g),n.rotation=Ot(_)+o,n.rotationX=Ot(p)+o,n.rotationY=Ot(m)+o,n.skewX=v+o,n.skewY=y+o,n.transformPerspective=S+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[Tn]=il(c)),n.xOffset=n.yOffset=0,n.force3D=Gn.force3D,n.renderTransform=n.svg?t_:hp?mp:e_,n.uncache=0,n},il=function(e){return(e=e.split(" "))[0]+" "+e[1]},Nl=function(e,t,n){var i=an(t);return Ot(parseFloat(t)+parseFloat(_r(e,"x",n+"px",i)))+i},e_=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,mp(e,t)},Mr="0deg",Zs="0px",wr=") ",mp=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,h=n.rotationY,f=n.rotationX,u=n.skewX,d=n.skewY,g=n.scaleX,_=n.scaleY,p=n.transformPerspective,m=n.force3D,v=n.target,y=n.zOrigin,S="",A=m==="auto"&&e&&e!==1||m===!0;if(y&&(f!==Mr||h!==Mr)){var T=parseFloat(h)*Rs,b=Math.sin(T),R=Math.cos(T),k;T=parseFloat(f)*Rs,k=Math.cos(T),a=Nl(v,a,b*k*-y),o=Nl(v,o,-Math.sin(T)*-y),l=Nl(v,l,R*k*-y+y)}p!==Zs&&(S+="perspective("+p+wr),(i||s)&&(S+="translate("+i+"%, "+s+"%) "),(A||a!==Zs||o!==Zs||l!==Zs)&&(S+=l!==Zs||A?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+wr),c!==Mr&&(S+="rotate("+c+wr),h!==Mr&&(S+="rotateY("+h+wr),f!==Mr&&(S+="rotateX("+f+wr),(u!==Mr||d!==Mr)&&(S+="skew("+u+", "+d+wr),(g!==1||_!==1)&&(S+="scale("+g+", "+_+wr),v.style[Ct]=S||"translate(0, 0)"},t_=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,h=n.skewY,f=n.scaleX,u=n.scaleY,d=n.target,g=n.xOrigin,_=n.yOrigin,p=n.xOffset,m=n.yOffset,v=n.forceCSS,y=parseFloat(a),S=parseFloat(o),A,T,b,R,k;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=Rs,c*=Rs,A=Math.cos(l)*f,T=Math.sin(l)*f,b=Math.sin(l-c)*-u,R=Math.cos(l-c)*u,c&&(h*=Rs,k=Math.tan(c-h),k=Math.sqrt(1+k*k),b*=k,R*=k,h&&(k=Math.tan(h),k=Math.sqrt(1+k*k),A*=k,T*=k)),A=Ot(A),T=Ot(T),b=Ot(b),R=Ot(R)):(A=f,R=u,T=b=0),(y&&!~(a+"").indexOf("px")||S&&!~(o+"").indexOf("px"))&&(y=_r(d,"x",a,"px"),S=_r(d,"y",o,"px")),(g||_||p||m)&&(y=Ot(y+g-(g*A+_*b)+p),S=Ot(S+_-(g*T+_*R)+m)),(i||s)&&(k=d.getBBox(),y=Ot(y+i/100*k.width),S=Ot(S+s/100*k.height)),k="matrix("+A+","+T+","+b+","+R+","+y+","+S+")",d.setAttribute("transform",k),v&&(d.style[Ct]=k)},n_=function(e,t,n,i,s){var a=360,o=Zt(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?Lr:1),c=l-i,h=i+c+"deg",f,u;return o&&(f=s.split("_")[1],f==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),f==="cw"&&c<0?c=(c+a*Hu)%a-~~(c/a)*a:f==="ccw"&&c>0&&(c=(c-a*Hu)%a-~~(c/a)*a)),e._pt=u=new wn(e._pt,t,n,i,c,Fg),u.e=h,u.u="deg",e._props.push(n),u},$u=function(e,t){for(var n in t)e[n]=t[n];return e},i_=function(e,t,n){var i=$u({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,h,f,u,d,g;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[Ct]=t,o=Ua(n,1),gr(n,Ct),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Ct],a[Ct]=t,o=Ua(n,1),a[Ct]=c);for(l in Vi)c=i[l],h=o[l],c!==h&&s.indexOf(l)<0&&(d=an(c),g=an(h),f=d!==g?_r(n,l,c,g):parseFloat(c),u=parseFloat(h),e._pt=new wn(e._pt,o,l,f,u-f,Dc),e._pt.u=g||0,e._props.push(l));$u(o,i)};Mn("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",a=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(o){return e<2?r+o:"border"+o+r});nl[e>1?"border"+r:r]=function(o,l,c,h,f){var u,d;if(arguments.length<4)return u=a.map(function(g){return Ii(o,g,c)}),d=u.join(" "),d.split(u[0]).length===5?u[0]:d;u=(h+"").split(" "),d={},a.forEach(function(g,_){return d[g]=u[_]=u[_]||u[(_-1)/2|0]}),o.init(l,d,f)}});var gp={name:"css",register:Ic,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var a=this._props,o=e.style,l=n.vars.startAt,c,h,f,u,d,g,_,p,m,v,y,S,A,T,b,R,k;Jh||Ic(),this.styles=this.styles||cp(e),R=this.styles.props,this.tween=n;for(_ in t)if(_!=="autoRound"&&(h=t[_],!(Un[_]&&Jf(_,t,n,i,e,s)))){if(d=typeof h,g=nl[_],d==="function"&&(h=h.call(n,i,e,s),d=typeof h),d==="string"&&~h.indexOf("random(")&&(h=La(h)),g)g(this,e,_,h,n)&&(b=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(_)+"").trim(),h+="",hr.lastIndex=0,hr.test(c)||(p=an(c),m=an(h),m?p!==m&&(c=_r(e,_,c,m)+m):p&&(h+=p)),this.add(o,"setProperty",c,h,i,s,0,0,_),a.push(_),R.push(_,0,o[_]);else if(d!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,e,s):l[_],Zt(c)&&~c.indexOf("random(")&&(c=La(c)),an(c+"")||c==="auto"||(c+=Gn.units[_]||an(Ii(e,_))||""),(c+"").charAt(1)==="="&&(c=Ii(e,_))):c=Ii(e,_),u=parseFloat(c),v=d==="string"&&h.charAt(1)==="="&&h.substr(0,2),v&&(h=h.substr(2)),f=parseFloat(h),_ in Si&&(_==="autoAlpha"&&(u===1&&Ii(e,"visibility")==="hidden"&&f&&(u=0),R.push("visibility",0,o.visibility),sr(this,o,"visibility",u?"inherit":"hidden",f?"inherit":"hidden",!f)),_!=="scale"&&_!=="transform"&&(_=Si[_],~_.indexOf(",")&&(_=_.split(",")[0]))),y=_ in Vi,y){if(this.styles.save(_),k=h,d==="string"&&h.substring(0,6)==="var(--"){if(h=Hn(e,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var x=e.style.perspective;e.style.perspective=h,h=Hn(e,"perspective"),x?e.style.perspective=x:gr(e,"perspective")}f=parseFloat(h)}if(S||(A=e._gsap,A.renderTransform&&!t.parseTransform||Ua(e,t.parseTransform),T=t.smoothOrigin!==!1&&A.smooth,S=this._pt=new wn(this._pt,o,Ct,0,1,A.renderTransform,A,0,-1),S.dep=1),_==="scale")this._pt=new wn(this._pt,A,"scaleY",A.scaleY,(v?Es(A.scaleY,v+f):f)-A.scaleY||0,Dc),this._pt.u=0,a.push("scaleY",_),_+="X";else if(_==="transformOrigin"){R.push(Tn,0,o[Tn]),h=Jg(h),A.svg?Uc(e,h,0,T,0,this):(m=parseFloat(h.split(" ")[2])||0,m!==A.zOrigin&&sr(this,A,"zOrigin",A.zOrigin,m),sr(this,o,_,il(c),il(h)));continue}else if(_==="svgOrigin"){Uc(e,h,1,T,0,this);continue}else if(_ in fp){n_(this,A,_,u,v?Es(u,v+h):h);continue}else if(_==="smoothOrigin"){sr(this,A,"smooth",A.smooth,h);continue}else if(_==="force3D"){A[_]=h;continue}else if(_==="transform"){i_(this,h,e);continue}}else _ in o||(_=zs(_)||_);if(y||(f||f===0)&&(u||u===0)&&!Og.test(h)&&_ in o)p=(c+"").substr((u+"").length),f||(f=0),m=an(h)||(_ in Gn.units?Gn.units[_]:p),p!==m&&(u=_r(e,_,c,m)),this._pt=new wn(this._pt,y?A:o,_,u,(v?Es(u,v+f):f)-u,!y&&(m==="px"||_==="zIndex")&&t.autoRound!==!1?Hg:Dc),this._pt.u=m||0,y&&k!==h?(this._pt.b=c,this._pt.e=k,this._pt.r=zg):p!==m&&m!=="%"&&(this._pt.b=c,this._pt.r=Bg);else if(_ in o)Zg.call(this,e,_,c,v?v+h:h);else if(_ in e)this.add(e,_,c||e[_],v?v+h:h,i,s);else if(_!=="parseTransform"){Gh(_,h);continue}y||(_ in o?R.push(_,0,o[_]):typeof e[_]=="function"?R.push(_,2,e[_]()):R.push(_,1,c||e[_])),a.push(_)}}b&&rp(this)},render:function(e,t){if(t.tween._time||!Qh())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Ii,aliases:Si,getSetter:function(e,t,n){var i=Si[t];return i&&i.indexOf(",")<0&&(t=i),t in Vi&&t!==Tn&&(e._gsap.x||Ii(e,"x"))?n&&zu===n?t==="scale"?Xg:Wg:(zu=n||{})&&(t==="scale"?qg:Yg):e.style&&!Bh(e.style[t])?Gg:~t.indexOf("-")?Vg:jh(e,t)},core:{_removeProperty:gr,_getMatrix:tu}};Rn.utils.checkPrefix=zs;Rn.core.getStyleSaver=cp;(function(r,e,t,n){var i=Mn(r+","+e+","+t,function(s){Vi[s]=1});Mn(e,function(s){Gn.units[s]="deg",fp[s]=1}),Si[i[13]]=r+","+e,Mn(n,function(s){var a=s.split(":");Si[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Mn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Gn.units[r]="px"});Rn.registerPlugin(gp);var Pt=Rn.registerPlugin(gp)||Rn;Pt.core.Tween;function r_(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function s_(r,e,t){return e&&r_(r.prototype,e),r}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Qt,Oo,Bn,ar,or,Cs,_p,Dr,Ps,vp,Fi,oi,yp,xp=function(){return Qt||typeof window<"u"&&(Qt=window.gsap)&&Qt.registerPlugin&&Qt},bp=1,ws=[],tt=[],Ti=[],va=Date.now,Nc=function(e,t){return t},a_=function(){var e=Ps.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,tt),i.push.apply(i,Ti),tt=n,Ti=i,Nc=function(a,o){return t[a](o)}},ur=function(e,t){return~Ti.indexOf(e)&&Ti[Ti.indexOf(e)+1][t]},ya=function(e){return!!~vp.indexOf(e)},hn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},cn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},$a="scrollLeft",Ka="scrollTop",Oc=function(){return Fi&&Fi.isPressed||tt.cache++},rl=function(e,t){var n=function i(s){if(s||s===0){bp&&(Bn.history.scrollRestoration="manual");var a=Fi&&Fi.isPressed;s=i.v=Math.round(s)||(Fi&&Fi.iOS?1:0),e(s),i.cacheID=tt.cache,a&&Nc("ss",s)}else(t||tt.cache!==i.cacheID||Nc("ref"))&&(i.cacheID=tt.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},mn={s:$a,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:rl(function(r){return arguments.length?Bn.scrollTo(r,Wt.sc()):Bn.pageXOffset||ar[$a]||or[$a]||Cs[$a]||0})},Wt={s:Ka,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:mn,sc:rl(function(r){return arguments.length?Bn.scrollTo(mn.sc(),r):Bn.pageYOffset||ar[Ka]||or[Ka]||Cs[Ka]||0})},vn=function(e,t){return(t&&t._ctx&&t._ctx.selector||Qt.utils.toArray)(e)[0]||(typeof e=="string"&&Qt.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},o_=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},vr=function(e,t){var n=t.s,i=t.sc;ya(e)&&(e=ar.scrollingElement||or);var s=tt.indexOf(e),a=i===Wt.sc?1:2;!~s&&(s=tt.push(e)-1),tt[s+a]||hn(e,"scroll",Oc);var o=tt[s+a],l=o||(tt[s+a]=rl(ur(e,n),!0)||(ya(e)?i:rl(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,o||(l.smooth=Qt.getProperty(e,"scrollBehavior")==="smooth"),l},Fc=function(e,t,n){var i=e,s=e,a=va(),o=a,l=t||50,c=Math.max(500,l*3),h=function(g,_){var p=va();_||p-a>l?(s=i,i=g,o=a,a=p):n?i+=g:i=s+(g-s)/(p-o)*(a-o)},f=function(){s=i=n?0:i,o=a=0},u=function(g){var _=o,p=s,m=va();return(g||g===0)&&g!==i&&h(g),a===o||m-o>c?0:(i+(n?p:-p))/((n?m:a)-_)*1e3};return{update:h,reset:f,getVelocity:u}},Js=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Ku=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},Sp=function(){Ps=Qt.core.globals().ScrollTrigger,Ps&&Ps.core&&a_()},Mp=function(e){return Qt=e||xp(),!Oo&&Qt&&typeof document<"u"&&document.body&&(Bn=window,ar=document,or=ar.documentElement,Cs=ar.body,vp=[Bn,ar,or,Cs],Qt.utils.clamp,yp=Qt.core.context||function(){},Dr="onpointerenter"in Cs?"pointer":"mouse",_p=Bt.isTouch=Bn.matchMedia&&Bn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Bn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,oi=Bt.eventTypes=("ontouchstart"in or?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in or?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return bp=0},500),Oo=1),Ps||Sp(),Oo};mn.op=Wt;tt.cache=0;var Bt=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){Oo||Mp(Qt)||console.warn("Please gsap.registerPlugin(Observer)"),Ps||Sp();var i=n.tolerance,s=n.dragMinimum,a=n.type,o=n.target,l=n.lineHeight,c=n.debounce,h=n.preventDefault,f=n.onStop,u=n.onStopDelay,d=n.ignore,g=n.wheelSpeed,_=n.event,p=n.onDragStart,m=n.onDragEnd,v=n.onDrag,y=n.onPress,S=n.onRelease,A=n.onRight,T=n.onLeft,b=n.onUp,R=n.onDown,k=n.onChangeX,x=n.onChangeY,M=n.onChange,P=n.onToggleX,I=n.onToggleY,F=n.onHover,q=n.onHoverEnd,z=n.onMove,G=n.ignoreCheck,W=n.isNormalizer,re=n.onGestureStart,L=n.onGestureEnd,oe=n.onWheel,Be=n.onEnable,Xe=n.onDisable,$=n.onClick,Q=n.scrollSpeed,de=n.capture,ae=n.allowClicks,Ee=n.lockAxis,Se=n.onLockAxis;this.target=o=vn(o)||or,this.vars=n,d&&(d=Qt.utils.toArray(d)),i=i||1e-9,s=s||0,g=g||1,Q=Q||1,a=a||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Bn.getComputedStyle(Cs).lineHeight)||22);var We,Ve,Ue,D,rt,Ne,ze,B=this,Ze=0,Le=0,C=n.passive||!h&&n.passive!==!1,w=vr(o,mn),X=vr(o,Wt),Z=w(),te=X(),j=~a.indexOf("touch")&&!~a.indexOf("pointer")&&oi[0]==="pointerdown",xe=ya(o),ie=o.ownerDocument||ar,fe=[0,0,0],Ge=[0,0,0],ne=0,ve=function(){return ne=va()},ye=function(Me,lt){return(B.event=Me)&&d&&o_(Me.target,d)||lt&&j&&Me.pointerType!=="touch"||G&&G(Me,lt)},ke=function(){B._vx.reset(),B._vy.reset(),Ve.pause(),f&&f(B)},_e=function(){var Me=B.deltaX=Ku(fe),lt=B.deltaY=Ku(Ge),pe=Math.abs(Me)>=i,De=Math.abs(lt)>=i;M&&(pe||De)&&M(B,Me,lt,fe,Ge),pe&&(A&&B.deltaX>0&&A(B),T&&B.deltaX<0&&T(B),k&&k(B),P&&B.deltaX<0!=Ze<0&&P(B),Ze=B.deltaX,fe[0]=fe[1]=fe[2]=0),De&&(R&&B.deltaY>0&&R(B),b&&B.deltaY<0&&b(B),x&&x(B),I&&B.deltaY<0!=Le<0&&I(B),Le=B.deltaY,Ge[0]=Ge[1]=Ge[2]=0),(D||Ue)&&(z&&z(B),Ue&&(p&&Ue===1&&p(B),v&&v(B),Ue=0),D=!1),Ne&&!(Ne=!1)&&Se&&Se(B),rt&&(oe(B),rt=!1),We=0},qe=function(Me,lt,pe){fe[pe]+=Me,Ge[pe]+=lt,B._vx.update(Me),B._vy.update(lt),c?We||(We=requestAnimationFrame(_e)):_e()},Oe=function(Me,lt){Ee&&!ze&&(B.axis=ze=Math.abs(Me)>Math.abs(lt)?"x":"y",Ne=!0),ze!=="y"&&(fe[2]+=Me,B._vx.update(Me,!0)),ze!=="x"&&(Ge[2]+=lt,B._vy.update(lt,!0)),c?We||(We=requestAnimationFrame(_e)):_e()},st=function(Me){if(!ye(Me,1)){Me=Js(Me,h);var lt=Me.clientX,pe=Me.clientY,De=lt-B.x,Ce=pe-B.y,He=B.isDragging;B.x=lt,B.y=pe,(He||(De||Ce)&&(Math.abs(B.startX-lt)>=s||Math.abs(B.startY-pe)>=s))&&(Ue||(Ue=He?2:1),He||(B.isDragging=!0),Oe(De,Ce))}},U=B.onPress=function(Re){ye(Re,1)||Re&&Re.button||(B.axis=ze=null,Ve.pause(),B.isPressed=!0,Re=Js(Re),Ze=Le=0,B.startX=B.x=Re.clientX,B.startY=B.y=Re.clientY,B._vx.reset(),B._vy.reset(),hn(W?o:ie,oi[1],st,C,!0),B.deltaX=B.deltaY=0,y&&y(B))},ee=B.onRelease=function(Re){if(!ye(Re,1)){cn(W?o:ie,oi[1],st,!0);var Me=!isNaN(B.y-B.startY),lt=B.isDragging,pe=lt&&(Math.abs(B.x-B.startX)>3||Math.abs(B.y-B.startY)>3),De=Js(Re);!pe&&Me&&(B._vx.reset(),B._vy.reset(),h&&ae&&Qt.delayedCall(.08,function(){if(va()-ne>300&&!Re.defaultPrevented){if(Re.target.click)Re.target.click();else if(ie.createEvent){var Ce=ie.createEvent("MouseEvents");Ce.initMouseEvent("click",!0,!0,Bn,1,De.screenX,De.screenY,De.clientX,De.clientY,!1,!1,!1,!1,0,null),Re.target.dispatchEvent(Ce)}}})),B.isDragging=B.isGesturing=B.isPressed=!1,f&&lt&&!W&&Ve.restart(!0),Ue&&_e(),m&&lt&&m(B),S&&S(B,pe)}},K=function(Me){return Me.touches&&Me.touches.length>1&&(B.isGesturing=!0)&&re(Me,B.isDragging)},J=function(){return(B.isGesturing=!1)||L(B)},le=function(Me){if(!ye(Me)){var lt=w(),pe=X();qe((lt-Z)*Q,(pe-te)*Q,1),Z=lt,te=pe,f&&Ve.restart(!0)}},ce=function(Me){if(!ye(Me)){Me=Js(Me,h),oe&&(rt=!0);var lt=(Me.deltaMode===1?l:Me.deltaMode===2?Bn.innerHeight:1)*g;qe(Me.deltaX*lt,Me.deltaY*lt,0),f&&!W&&Ve.restart(!0)}},Ye=function(Me){if(!ye(Me)){var lt=Me.clientX,pe=Me.clientY,De=lt-B.x,Ce=pe-B.y;B.x=lt,B.y=pe,D=!0,f&&Ve.restart(!0),(De||Ce)&&Oe(De,Ce)}},gt=function(Me){B.event=Me,F(B)},wt=function(Me){B.event=Me,q(B)},nt=function(Me){return ye(Me)||Js(Me,h)&&$(B)};Ve=B._dc=Qt.delayedCall(u||.25,ke).pause(),B.deltaX=B.deltaY=0,B._vx=Fc(0,50,!0),B._vy=Fc(0,50,!0),B.scrollX=w,B.scrollY=X,B.isDragging=B.isGesturing=B.isPressed=!1,yp(this),B.enable=function(Re){return B.isEnabled||(hn(xe?ie:o,"scroll",Oc),a.indexOf("scroll")>=0&&hn(xe?ie:o,"scroll",le,C,de),a.indexOf("wheel")>=0&&hn(o,"wheel",ce,C,de),(a.indexOf("touch")>=0&&_p||a.indexOf("pointer")>=0)&&(hn(o,oi[0],U,C,de),hn(ie,oi[2],ee),hn(ie,oi[3],ee),ae&&hn(o,"click",ve,!0,!0),$&&hn(o,"click",nt),re&&hn(ie,"gesturestart",K),L&&hn(ie,"gestureend",J),F&&hn(o,Dr+"enter",gt),q&&hn(o,Dr+"leave",wt),z&&hn(o,Dr+"move",Ye)),B.isEnabled=!0,B.isDragging=B.isGesturing=B.isPressed=D=Ue=!1,B._vx.reset(),B._vy.reset(),Z=w(),te=X(),Re&&Re.type&&U(Re),Be&&Be(B)),B},B.disable=function(){B.isEnabled&&(ws.filter(function(Re){return Re!==B&&ya(Re.target)}).length||cn(xe?ie:o,"scroll",Oc),B.isPressed&&(B._vx.reset(),B._vy.reset(),cn(W?o:ie,oi[1],st,!0)),cn(xe?ie:o,"scroll",le,de),cn(o,"wheel",ce,de),cn(o,oi[0],U,de),cn(ie,oi[2],ee),cn(ie,oi[3],ee),cn(o,"click",ve,!0),cn(o,"click",nt),cn(ie,"gesturestart",K),cn(ie,"gestureend",J),cn(o,Dr+"enter",gt),cn(o,Dr+"leave",wt),cn(o,Dr+"move",Ye),B.isEnabled=B.isPressed=B.isDragging=!1,Xe&&Xe(B))},B.kill=B.revert=function(){B.disable();var Re=ws.indexOf(B);Re>=0&&ws.splice(Re,1),Fi===B&&(Fi=0)},ws.push(B),W&&ya(o)&&(Fi=B),B.enable(_)},s_(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();Bt.version="3.15.0";Bt.create=function(r){return new Bt(r)};Bt.register=Mp;Bt.getAll=function(){return ws.slice()};Bt.getById=function(r){return ws.filter(function(e){return e.vars.id===r})[0]};xp()&&Qt.registerPlugin(Bt);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var be,xs,et,pt,On,ut,nu,sl,Na,xa,ca,ja,rn,xl,Bc,fn,ju,Zu,bs,wp,Ol,Tp,dn,zc,Ep,Ap,er,Hc,iu,Ls,ru,ba,Gc,Fl,Za=1,sn=Date.now,Bl=sn(),ei=0,ha=0,Ju=function(e,t,n){var i=In(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},Qu=function(e,t){return t&&(!In(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},l_=function r(){return ha&&requestAnimationFrame(r)},ed=function(){return xl=1},td=function(){return xl=0},gi=function(e){return e},ua=function(e){return Math.round(e*1e5)/1e5||0},Rp=function(){return typeof window<"u"},Cp=function(){return be||Rp()&&(be=window.gsap)&&be.registerPlugin&&be},Kr=function(e){return!!~nu.indexOf(e)},Pp=function(e){return(e==="Height"?ru:et["inner"+e])||On["client"+e]||ut["client"+e]},Lp=function(e){return ur(e,"getBoundingClientRect")||(Kr(e)?function(){return Go.width=et.innerWidth,Go.height=ru,Go}:function(){return Ni(e)})},c_=function(e,t,n){var i=n.d,s=n.d2,a=n.a;return(a=ur(e,"getBoundingClientRect"))?function(){return a()[i]}:function(){return(t?Pp(s):e["client"+s])||0}},h_=function(e,t){return!t||~Ti.indexOf(e)?Lp(e):function(){return Go}},Mi=function(e,t){var n=t.s,i=t.d2,s=t.d,a=t.a;return Math.max(0,(n="scroll"+i)&&(a=ur(e,n))?a()-Lp(e)()[s]:Kr(e)?(On[n]||ut[n])-Pp(i):e[n]-e["offset"+i])},Ja=function(e,t){for(var n=0;n<bs.length;n+=3)(!t||~t.indexOf(bs[n+1]))&&e(bs[n],bs[n+1],bs[n+2])},In=function(e){return typeof e=="string"},on=function(e){return typeof e=="function"},da=function(e){return typeof e=="number"},kr=function(e){return typeof e=="object"},Qs=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},is=function(e,t,n){if(e.enabled){var i=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);i&&i.totalTime&&(e.callbackAnimation=i)}},rs=Math.abs,Dp="left",kp="top",su="right",au="bottom",qr="width",Yr="height",Sa="Right",Ma="Left",wa="Top",Ta="Bottom",Ht="padding",$n="margin",Hs="Width",ou="Height",Vt="px",Kn=function(e){return et.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},u_=function(e){var t=Kn(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},nd=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Ni=function(e,t){var n=t&&Kn(e)[Bc]!=="matrix(1, 0, 0, 1, 0, 0)"&&be.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),i},al=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},Ip=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},d_=function(e){return function(t){return be.utils.snap(Ip(e),t)}},lu=function(e){var t=be.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,a){a===void 0&&(a=.001);var o;if(!s)return t(i);if(s>0){for(i-=a,o=0;o<n.length;o++)if(n[o]>=i)return n[o];return n[o-1]}else for(o=n.length,i+=a;o--;)if(n[o]<=i)return n[o];return n[0]}:function(i,s,a){a===void 0&&(a=.001);var o=t(i);return!s||Math.abs(o-i)<a||o-i<0==s<0?o:t(s<0?i-e:i+e)}},f_=function(e){return function(t,n){return lu(Ip(e))(t,n.direction)}},Qa=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},jt=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},Kt=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},eo=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},id={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},to={toggleActions:"play",anticipatePin:0},ol={top:0,left:0,center:.5,bottom:1,right:1},Fo=function(e,t){if(In(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in ol?ol[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},no=function(e,t,n,i,s,a,o,l){var c=s.startColor,h=s.endColor,f=s.fontSize,u=s.indent,d=s.fontWeight,g=pt.createElement("div"),_=Kr(n)||ur(n,"pinType")==="fixed",p=e.indexOf("scroller")!==-1,m=_?ut:n.tagName==="IFRAME"?n.contentDocument.body:n,v=e.indexOf("start")!==-1,y=v?c:h,S="border-color:"+y+";font-size:"+f+";color:"+y+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return S+="position:"+((p||l)&&_?"fixed;":"absolute;"),(p||l||!_)&&(S+=(i===Wt?su:au)+":"+(a+parseFloat(u))+"px;"),o&&(S+="box-sizing:border-box;text-align:left;width:"+o.offsetWidth+"px;"),g._isStart=v,g.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),g.style.cssText=S,g.innerText=t||t===0?e+"-"+t:e,m.children[0]?m.insertBefore(g,m.children[0]):m.appendChild(g),g._offset=g["offset"+i.op.d2],Bo(g,0,i,v),g},Bo=function(e,t,n,i){var s={display:"block"},a=n[i?"os2":"p2"],o=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+a+Hs]=1,s["border"+o+Hs]=0,s[n.p]=t+"px",be.set(e,s)},Qe=[],Vc={},Oa,rd=function(){return sn()-ei>34&&(Oa||(Oa=requestAnimationFrame(Hi)))},ss=function(){(!dn||!dn.isPressed||dn.startX>ut.clientWidth)&&(tt.cache++,dn?Oa||(Oa=requestAnimationFrame(Hi)):Hi(),ei||Zr("scrollStart"),ei=sn())},zl=function(){Ap=et.innerWidth,Ep=et.innerHeight},fa=function(e){tt.cache++,(e===!0||!rn&&!Tp&&!pt.fullscreenElement&&!pt.webkitFullscreenElement&&(!zc||Ap!==et.innerWidth||Math.abs(et.innerHeight-Ep)>et.innerHeight*.25))&&sl.restart(!0)},jr={},p_=[],Up=function r(){return Kt(Fe,"scrollEnd",r)||Br(!0)},Zr=function(e){return jr[e]&&jr[e].map(function(t){return t()})||p_},kn=[],Np=function(e){for(var t=0;t<kn.length;t+=5)(!e||kn[t+4]&&kn[t+4].query===e)&&(kn[t].style.cssText=kn[t+1],kn[t].getBBox&&kn[t].setAttribute("transform",kn[t+2]||""),kn[t+3].uncache=1)},Op=function(){return tt.forEach(function(e){return on(e)&&++e.cacheID&&(e.rec=e())})},cu=function(e,t){var n;for(fn=0;fn<Qe.length;fn++)n=Qe[fn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));ba=!0,t&&Np(t),t||Zr("revert")},Fp=function(e,t){tt.cache++,(t||!pn)&&tt.forEach(function(n){return on(n)&&n.cacheID++&&(n.rec=0)}),In(e)&&(et.history.scrollRestoration=iu=e)},pn,$r=0,sd,m_=function(){if(sd!==$r){var e=sd=$r;requestAnimationFrame(function(){return e===$r&&Br(!0)})}},Bp=function(){ut.appendChild(Ls),ru=!dn&&Ls.offsetHeight||et.innerHeight,ut.removeChild(Ls)},ad=function(e){return Na(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Br=function(e,t){if(On=pt.documentElement,ut=pt.body,nu=[et,pt,On,ut],ei&&!e&&!ba){jt(Fe,"scrollEnd",Up);return}Bp(),pn=Fe.isRefreshing=!0,ba||Op();var n=Zr("refreshInit");wp&&Fe.sort(),t||cu(),tt.forEach(function(i){on(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),Qe.slice(0).forEach(function(i){return i.refresh()}),ba=!1,Qe.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",a=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-a),i.refresh()}}),Gc=1,ad(!0),Qe.forEach(function(i){var s=Mi(i.scroller,i._dir),a=i.vars.end==="max"||i._endClamp&&i.end>s,o=i._startClamp&&i.start>=s;(a||o)&&i.setPositions(o?s-1:i.start,a?Math.max(o?s:i.start+1,s):i.end,!0)}),ad(!1),Gc=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),tt.forEach(function(i){on(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),Fp(iu,1),sl.pause(),$r++,pn=2,Hi(2),Qe.forEach(function(i){return on(i.vars.onRefresh)&&i.vars.onRefresh(i)}),pn=Fe.isRefreshing=!1,Zr("refresh")},Wc=0,zo=1,Ea,Hi=function(e){if(e===2||!pn&&!ba){Fe.isUpdating=!0,Ea&&Ea.update(0);var t=Qe.length,n=sn(),i=n-Bl>=50,s=t&&Qe[0].scroll();if(zo=Wc>s?-1:1,pn||(Wc=s),i&&(ei&&!xl&&n-ei>200&&(ei=0,Zr("scrollEnd")),ca=Bl,Bl=n),zo<0){for(fn=t;fn-- >0;)Qe[fn]&&Qe[fn].update(0,i);zo=1}else for(fn=0;fn<t;fn++)Qe[fn]&&Qe[fn].update(0,i);Fe.isUpdating=!1}Oa=0},Xc=[Dp,kp,au,su,$n+Ta,$n+Sa,$n+wa,$n+Ma,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Ho=Xc.concat([qr,Yr,"boxSizing","max"+Hs,"max"+ou,"position",$n,Ht,Ht+wa,Ht+Sa,Ht+Ta,Ht+Ma]),g_=function(e,t,n){Ds(n);var i=e._gsap;if(i.spacerIsNative)Ds(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},Hl=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=Xc.length,a=t.style,o=e.style,l;s--;)l=Xc[s],a[l]=n[l];a.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(a.display="inline-block"),o[au]=o[su]="auto",a.flexBasis=n.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[qr]=al(e,mn)+Vt,a[Yr]=al(e,Wt)+Vt,a[Ht]=o[$n]=o[kp]=o[Dp]="0",Ds(i),o[qr]=o["max"+Hs]=n[qr],o[Yr]=o["max"+ou]=n[Yr],o[Ht]=n[Ht],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},__=/([A-Z])/g,Ds=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,a;for((e.t._gsap||be.core.getCache(e.t)).uncache=1;i<n;i+=2)a=e[i+1],s=e[i],a?t[s]=a:t[s]&&t.removeProperty(s.replace(__,"-$1").toLowerCase())}},io=function(e){for(var t=Ho.length,n=e.style,i=[],s=0;s<t;s++)i.push(Ho[s],n[Ho[s]]);return i.t=e,i},v_=function(e,t,n){for(var i=[],s=e.length,a=n?8:0,o;a<s;a+=2)o=e[a],i.push(o,o in t?t[o]:e[a+1]);return i.t=e.t,i},Go={left:0,top:0},od=function(e,t,n,i,s,a,o,l,c,h,f,u,d,g){on(e)&&(e=e(l)),In(e)&&e.substr(0,3)==="max"&&(e=u+(e.charAt(4)==="="?Fo("0"+e.substr(3),n):0));var _=d?d.time():0,p,m,v;if(d&&d.seek(0),isNaN(e)||(e=+e),da(e))d&&(e=be.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,u,e)),o&&Bo(o,n,i,!0);else{on(t)&&(t=t(l));var y=(e||"0").split(" "),S,A,T,b;v=vn(t,l)||ut,S=Ni(v)||{},(!S||!S.left&&!S.top)&&Kn(v).display==="none"&&(b=v.style.display,v.style.display="block",S=Ni(v),b?v.style.display=b:v.style.removeProperty("display")),A=Fo(y[0],S[i.d]),T=Fo(y[1]||"0",n),e=S[i.p]-c[i.p]-h+A+s-T,o&&Bo(o,T,i,n-T<20||o._isStart&&T>20),n-=n-T}if(g&&(l[g]=e||-.001,e<0&&(e=0)),a){var R=e+n,k=a._isStart;p="scroll"+i.d2,Bo(a,R,i,k&&R>20||!k&&(f?Math.max(ut[p],On[p]):a.parentNode[p])<=R+1),f&&(c=Ni(o),f&&(a.style[i.op.p]=c[i.op.p]-i.op.m-a._offset+Vt))}return d&&v&&(p=Ni(v),d.seek(u),m=Ni(v),d._caScrollDist=p[i.p]-m[i.p],e=e/d._caScrollDist*u),d&&d.seek(_),d?e:Math.round(e)},y_=/(webkit|moz|length|cssText|inset)/i,ld=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,a,o;if(t===ut){e._stOrig=s.cssText,o=Kn(e);for(a in o)!+a&&!y_.test(a)&&o[a]&&typeof s[a]=="string"&&a!=="0"&&(s[a]=o[a]);s.top=n,s.left=i}else s.cssText=e._stOrig;be.core.getCache(e).uncache=1,t.appendChild(e)}},zp=function(e,t,n){var i=t,s=i;return function(a){var o=Math.round(e());return o!==i&&o!==s&&Math.abs(o-i)>3&&Math.abs(o-s)>3&&(a=o,n&&n()),s=i,i=Math.round(a),i}},ro=function(e,t,n){var i={};i[t.p]="+="+n,be.set(e,i)},cd=function(e,t){var n=vr(e,t),i="_scroll"+t.p2,s=function a(o,l,c,h,f){var u=a.tween,d=l.onComplete,g={};c=c||n();var _=zp(n,c,function(){u.kill(),a.tween=0});return f=h&&f||0,h=h||o-c,u&&u.kill(),l[i]=o,l.inherit=!1,l.modifiers=g,g[i]=function(){return _(c+h*u.ratio+f*u.ratio*u.ratio)},l.onUpdate=function(){tt.cache++,a.tween&&Hi()},l.onComplete=function(){a.tween=0,d&&d.call(u)},u=a.tween=be.to(e,l),u};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},jt(e,"wheel",n.wheelHandler),Fe.isTouch&&jt(e,"touchmove",n.wheelHandler),s},Fe=function(){function r(t,n){xs||r.register(be)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Hc(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!ha){this.update=this.refresh=this.kill=gi;return}n=nd(In(n)||da(n)||n.nodeType?{trigger:n}:n,to);var s=n,a=s.onUpdate,o=s.toggleClass,l=s.id,c=s.onToggle,h=s.onRefresh,f=s.scrub,u=s.trigger,d=s.pin,g=s.pinSpacing,_=s.invalidateOnRefresh,p=s.anticipatePin,m=s.onScrubComplete,v=s.onSnapComplete,y=s.once,S=s.snap,A=s.pinReparent,T=s.pinSpacer,b=s.containerAnimation,R=s.fastScrollEnd,k=s.preventOverlaps,x=n.horizontal||n.containerAnimation&&n.horizontal!==!1?mn:Wt,M=!f&&f!==0,P=vn(n.scroller||et),I=be.core.getCache(P),F=Kr(P),q=("pinType"in n?n.pinType:ur(P,"pinType")||F&&"fixed")==="fixed",z=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],G=M&&n.toggleActions.split(" "),W="markers"in n?n.markers:to.markers,re=F?0:parseFloat(Kn(P)["border"+x.p2+Hs])||0,L=this,oe=n.onRefreshInit&&function(){return n.onRefreshInit(L)},Be=c_(P,F,x),Xe=h_(P,F),$=0,Q=0,de=0,ae=vr(P,x),Ee,Se,We,Ve,Ue,D,rt,Ne,ze,B,Ze,Le,C,w,X,Z,te,j,xe,ie,fe,Ge,ne,ve,ye,ke,_e,qe,Oe,st,U,ee,K,J,le,ce,Ye,gt,wt;if(L._startClamp=L._endClamp=!1,L._dir=x,p*=45,L.scroller=P,L.scroll=b?b.time.bind(b):ae,Ve=ae(),L.vars=n,i=i||n.animation,"refreshPriority"in n&&(wp=1,n.refreshPriority===-9999&&(Ea=L)),I.tweenScroll=I.tweenScroll||{top:cd(P,Wt),left:cd(P,mn)},L.tweenTo=Ee=I.tweenScroll[x.p],L.scrubDuration=function(pe){K=da(pe)&&pe,K?ee?ee.duration(pe):ee=be.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:K,paused:!0,onComplete:function(){return m&&m(L)}}):(ee&&ee.progress(1).kill(),ee=0)},i&&(i.vars.lazy=!1,i._initted&&!L.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),L.animation=i.pause(),i.scrollTrigger=L,L.scrubDuration(f),st=0,l||(l=i.vars.id)),S&&((!kr(S)||S.push)&&(S={snapTo:S}),"scrollBehavior"in ut.style&&be.set(F?[ut,On]:P,{scrollBehavior:"auto"}),tt.forEach(function(pe){return on(pe)&&pe.target===(F?pt.scrollingElement||On:P)&&(pe.smooth=!1)}),We=on(S.snapTo)?S.snapTo:S.snapTo==="labels"?d_(i):S.snapTo==="labelsDirectional"?f_(i):S.directional!==!1?function(pe,De){return lu(S.snapTo)(pe,sn()-Q<500?0:De.direction)}:be.utils.snap(S.snapTo),J=S.duration||{min:.1,max:2},J=kr(J)?xa(J.min,J.max):xa(J,J),le=be.delayedCall(S.delay||K/2||.1,function(){var pe=ae(),De=sn()-Q<500,Ce=Ee.tween;if((De||Math.abs(L.getVelocity())<10)&&!Ce&&!xl&&$!==pe){var He=(pe-D)/w,It=i&&!M?i.totalProgress():He,$e=De?0:(It-U)/(sn()-ca)*1e3||0,Tt=be.utils.clamp(-He,1-He,rs($e/2)*$e/.185),Ut=He+(S.inertia===!1?0:Tt),bt,_t,ft=S,Cn=ft.onStart,St=ft.onInterrupt,E=ft.onComplete;if(bt=We(Ut,L),da(bt)||(bt=Ut),_t=Math.max(0,Math.round(D+bt*w)),pe<=rt&&pe>=D&&_t!==pe){if(Ce&&!Ce._initted&&Ce.data<=rs(_t-pe))return;S.inertia===!1&&(Tt=bt-He),Ee(_t,{duration:J(rs(Math.max(rs(Ut-It),rs(bt-It))*.185/$e/.05||0)),ease:S.ease||"power3",data:rs(_t-pe),onInterrupt:function(){return le.restart(!0)&&St&&is(L,St)},onComplete:function(){L.update(),$=ae(),i&&!M&&(ee?ee.resetTo("totalProgress",bt,i._tTime/i._tDur):i.progress(bt)),st=U=i&&!M?i.totalProgress():L.progress,v&&v(L),E&&is(L,E)}},pe,Tt*w,_t-pe-Tt*w),Cn&&is(L,Cn,Ee.tween)}}else L.isActive&&$!==pe&&le.restart(!0)}).pause()),l&&(Vc[l]=L),u=L.trigger=vn(u||d!==!0&&d),wt=u&&u._gsap&&u._gsap.stRevert,wt&&(wt=wt(L)),d=d===!0?u:vn(d),In(o)&&(o={targets:u,className:o}),d&&(g===!1||g===$n||(g=!g&&d.parentNode&&d.parentNode.style&&Kn(d.parentNode).display==="flex"?!1:Ht),L.pin=d,Se=be.core.getCache(d),Se.spacer?X=Se.pinState:(T&&(T=vn(T),T&&!T.nodeType&&(T=T.current||T.nativeElement),Se.spacerIsNative=!!T,T&&(Se.spacerState=io(T))),Se.spacer=j=T||pt.createElement("div"),j.classList.add("pin-spacer"),l&&j.classList.add("pin-spacer-"+l),Se.pinState=X=io(d)),n.force3D!==!1&&be.set(d,{force3D:!0}),L.spacer=j=Se.spacer,Oe=Kn(d),ve=Oe[g+x.os2],ie=be.getProperty(d),fe=be.quickSetter(d,x.a,Vt),Hl(d,j,Oe),te=io(d)),W){Le=kr(W)?nd(W,id):id,B=no("scroller-start",l,P,x,Le,0),Ze=no("scroller-end",l,P,x,Le,0,B),xe=B["offset"+x.op.d2];var nt=vn(ur(P,"content")||P);Ne=this.markerStart=no("start",l,nt,x,Le,xe,0,b),ze=this.markerEnd=no("end",l,nt,x,Le,xe,0,b),b&&(gt=be.quickSetter([Ne,ze],x.a,Vt)),!q&&!(Ti.length&&ur(P,"fixedMarkers")===!0)&&(u_(F?ut:P),be.set([B,Ze],{force3D:!0}),ke=be.quickSetter(B,x.a,Vt),qe=be.quickSetter(Ze,x.a,Vt))}if(b){var Re=b.vars.onUpdate,Me=b.vars.onUpdateParams;b.eventCallback("onUpdate",function(){L.update(0,0,1),Re&&Re.apply(b,Me||[])})}if(L.previous=function(){return Qe[Qe.indexOf(L)-1]},L.next=function(){return Qe[Qe.indexOf(L)+1]},L.revert=function(pe,De){if(!De)return L.kill(!0);var Ce=pe!==!1||!L.enabled,He=rn;Ce!==L.isReverted&&(Ce&&(ce=Math.max(ae(),L.scroll.rec||0),de=L.progress,Ye=i&&i.progress()),Ne&&[Ne,ze,B,Ze].forEach(function(It){return It.style.display=Ce?"none":"block"}),Ce&&(rn=L,L.update(Ce)),d&&(!A||!L.isActive)&&(Ce?g_(d,j,X):Hl(d,j,Kn(d),ye)),Ce||L.update(Ce),rn=He,L.isReverted=Ce)},L.refresh=function(pe,De,Ce,He){if(!((rn||!L.enabled)&&!De)){if(d&&pe&&ei){jt(r,"scrollEnd",Up);return}!pn&&oe&&oe(L),rn=L,Ee.tween&&!Ce&&(Ee.tween.kill(),Ee.tween=0),ee&&ee.pause(),_&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(Je){return Je.vars.immediateRender&&Je.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),L.isReverted||L.revert(!0,!0),L._subPinOffset=!1;var It=Be(),$e=Xe(),Tt=b?b.duration():Mi(P,x),Ut=w<=.01||!w,bt=0,_t=He||0,ft=kr(Ce)?Ce.end:n.end,Cn=n.endTrigger||u,St=kr(Ce)?Ce.start:n.start||(n.start===0||!u?0:d?"0 0":"0 100%"),E=L.pinnedContainer=n.pinnedContainer&&vn(n.pinnedContainer,L),O=u&&Math.max(0,Qe.indexOf(L))||0,H=O,V,N,se,ge,ue,he,Ae,Ie,we,at,it,mt,Yt;for(W&&kr(Ce)&&(mt=be.getProperty(B,x.p),Yt=be.getProperty(Ze,x.p));H-- >0;)he=Qe[H],he.end||he.refresh(0,1)||(rn=L),Ae=he.pin,Ae&&(Ae===u||Ae===d||Ae===E)&&!he.isReverted&&(at||(at=[]),at.unshift(he),he.revert(!0,!0)),he!==Qe[H]&&(O--,H--);for(on(St)&&(St=St(L)),St=Ju(St,"start",L),D=od(St,u,It,x,ae(),Ne,B,L,$e,re,q,Tt,b,L._startClamp&&"_startClamp")||(d?-.001:0),on(ft)&&(ft=ft(L)),In(ft)&&!ft.indexOf("+=")&&(~ft.indexOf(" ")?ft=(In(St)?St.split(" ")[0]:"")+ft:(bt=Fo(ft.substr(2),It),ft=In(St)?St:(b?be.utils.mapRange(0,b.duration(),b.scrollTrigger.start,b.scrollTrigger.end,D):D)+bt,Cn=u)),ft=Ju(ft,"end",L),rt=Math.max(D,od(ft||(Cn?"100% 0":Tt),Cn,It,x,ae()+bt,ze,Ze,L,$e,re,q,Tt,b,L._endClamp&&"_endClamp"))||-.001,bt=0,H=O;H--;)he=Qe[H]||{},Ae=he.pin,Ae&&he.start-he._pinPush<=D&&!b&&he.end>0&&(V=he.end-(L._startClamp?Math.max(0,he.start):he.start),(Ae===u&&he.start-he._pinPush<D||Ae===E)&&isNaN(St)&&(bt+=V*(1-he.progress)),Ae===d&&(_t+=V));if(D+=bt,rt+=bt,L._startClamp&&(L._startClamp+=bt),L._endClamp&&!pn&&(L._endClamp=rt||-.001,rt=Math.min(rt,Mi(P,x))),w=rt-D||(D-=.01)&&.001,Ut&&(de=be.utils.clamp(0,1,be.utils.normalize(D,rt,ce))),L._pinPush=_t,Ne&&bt&&(V={},V[x.a]="+="+bt,E&&(V[x.p]="-="+ae()),be.set([Ne,ze],V)),d&&!(Gc&&L.end>=Mi(P,x)))V=Kn(d),ge=x===Wt,se=ae(),Ge=parseFloat(ie(x.a))+_t,!Tt&&rt>1&&(it=(F?pt.scrollingElement||On:P).style,it={style:it,value:it["overflow"+x.a.toUpperCase()]},F&&Kn(ut)["overflow"+x.a.toUpperCase()]!=="scroll"&&(it.style["overflow"+x.a.toUpperCase()]="scroll")),Hl(d,j,V),te=io(d),N=Ni(d,!0),Ie=q&&vr(P,ge?mn:Wt)(),g?(ye=[g+x.os2,w+_t+Vt],ye.t=j,H=g===Ht?al(d,x)+w+_t:0,H&&(ye.push(x.d,H+Vt),j.style.flexBasis!=="auto"&&(j.style.flexBasis=H+Vt)),Ds(ye),E&&Qe.forEach(function(Je){Je.pin===E&&Je.vars.pinSpacing!==!1&&(Je._subPinOffset=!0)}),q&&ae(ce)):(H=al(d,x),H&&j.style.flexBasis!=="auto"&&(j.style.flexBasis=H+Vt)),q&&(ue={top:N.top+(ge?se-D:Ie)+Vt,left:N.left+(ge?Ie:se-D)+Vt,boxSizing:"border-box",position:"fixed"},ue[qr]=ue["max"+Hs]=Math.ceil(N.width)+Vt,ue[Yr]=ue["max"+ou]=Math.ceil(N.height)+Vt,ue[$n]=ue[$n+wa]=ue[$n+Sa]=ue[$n+Ta]=ue[$n+Ma]="0",ue[Ht]=V[Ht],ue[Ht+wa]=V[Ht+wa],ue[Ht+Sa]=V[Ht+Sa],ue[Ht+Ta]=V[Ht+Ta],ue[Ht+Ma]=V[Ht+Ma],Z=v_(X,ue,A),pn&&ae(0)),i?(we=i._initted,Ol(1),i.render(i.duration(),!0,!0),ne=ie(x.a)-Ge+w+_t,_e=Math.abs(w-ne)>1,q&&_e&&Z.splice(Z.length-2,2),i.render(0,!0,!0),we||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Ol(0)):ne=w,it&&(it.value?it.style["overflow"+x.a.toUpperCase()]=it.value:it.style.removeProperty("overflow-"+x.a));else if(u&&ae()&&!b)for(N=u.parentNode;N&&N!==ut;)N._pinOffset&&(D-=N._pinOffset,rt-=N._pinOffset),N=N.parentNode;at&&at.forEach(function(Je){return Je.revert(!1,!0)}),L.start=D,L.end=rt,Ve=Ue=pn?ce:ae(),!b&&!pn&&(Ve<ce&&ae(ce),L.scroll.rec=0),L.revert(!1,!0),Q=sn(),le&&($=-1,le.restart(!0)),rn=0,i&&M&&(i._initted||Ye)&&i.progress()!==Ye&&i.progress(Ye||0,!0).render(i.time(),!0,!0),(Ut||de!==L.progress||b||_||i&&!i._initted)&&(i&&!M&&(i._initted||de||i.vars.immediateRender!==!1)&&i.totalProgress(b&&D<-.001&&!de?be.utils.normalize(D,rt,0):de,!0),L.progress=Ut||(Ve-D)/w===de?0:de),d&&g&&(j._pinOffset=Math.round(L.progress*ne)),ee&&ee.invalidate(),isNaN(mt)||(mt-=be.getProperty(B,x.p),Yt-=be.getProperty(Ze,x.p),ro(B,x,mt),ro(Ne,x,mt-(He||0)),ro(Ze,x,Yt),ro(ze,x,Yt-(He||0))),Ut&&!pn&&L.update(),h&&!pn&&!C&&(C=!0,h(L),C=!1)}},L.getVelocity=function(){return(ae()-Ue)/(sn()-ca)*1e3||0},L.endAnimation=function(){Qs(L.callbackAnimation),i&&(ee?ee.progress(1):i.paused()?M||Qs(i,L.direction<0,1):Qs(i,i.reversed()))},L.labelToScroll=function(pe){return i&&i.labels&&(D||L.refresh()||D)+i.labels[pe]/i.duration()*w||0},L.getTrailing=function(pe){var De=Qe.indexOf(L),Ce=L.direction>0?Qe.slice(0,De).reverse():Qe.slice(De+1);return(In(pe)?Ce.filter(function(He){return He.vars.preventOverlaps===pe}):Ce).filter(function(He){return L.direction>0?He.end<=D:He.start>=rt})},L.update=function(pe,De,Ce){if(!(b&&!Ce&&!pe)){var He=pn===!0?ce:L.scroll(),It=pe?0:(He-D)/w,$e=It<0?0:It>1?1:It||0,Tt=L.progress,Ut,bt,_t,ft,Cn,St,E,O;if(De&&(Ue=Ve,Ve=b?ae():He,S&&(U=st,st=i&&!M?i.totalProgress():$e)),p&&d&&!rn&&!Za&&ei&&(!$e&&D<He+(He-Ue)/(sn()-ca)*p?$e=1e-4:$e===1&&rt>He+(He-Ue)/(sn()-ca)*p&&($e=.9999)),$e!==Tt&&L.enabled){if(Ut=L.isActive=!!$e&&$e<1,bt=!!Tt&&Tt<1,St=Ut!==bt,Cn=St||!!$e!=!!Tt,L.direction=$e>Tt?1:-1,L.progress=$e,Cn&&!rn&&(_t=$e&&!Tt?0:$e===1?1:Tt===1?2:3,M&&(ft=!St&&G[_t+1]!=="none"&&G[_t+1]||G[_t],O=i&&(ft==="complete"||ft==="reset"||ft in i))),k&&(St||O)&&(O||f||!i)&&(on(k)?k(L):L.getTrailing(k).forEach(function(se){return se.endAnimation()})),M||(ee&&!rn&&!Za?(ee._dp._time-ee._start!==ee._time&&ee.render(ee._dp._time-ee._start),ee.resetTo?ee.resetTo("totalProgress",$e,i._tTime/i._tDur):(ee.vars.totalProgress=$e,ee.invalidate().restart())):i&&i.totalProgress($e,!!(rn&&(Q||pe)))),d){if(pe&&g&&(j.style[g+x.os2]=ve),!q)fe(ua(Ge+ne*$e));else if(Cn){if(E=!pe&&$e>Tt&&rt+1>He&&He+1>=Mi(P,x),A)if(!pe&&(Ut||E)){var H=Ni(d,!0),V=He-D;ld(d,ut,H.top+(x===Wt?V:0)+Vt,H.left+(x===Wt?0:V)+Vt)}else ld(d,j);Ds(Ut||E?Z:te),_e&&$e<1&&Ut||fe(Ge+($e===1&&!E?ne:0))}}S&&!Ee.tween&&!rn&&!Za&&le.restart(!0),o&&(St||y&&$e&&($e<1||!Fl))&&Na(o.targets).forEach(function(se){return se.classList[Ut||y?"add":"remove"](o.className)}),a&&!M&&!pe&&a(L),Cn&&!rn?(M&&(O&&(ft==="complete"?i.pause().totalProgress(1):ft==="reset"?i.restart(!0).pause():ft==="restart"?i.restart(!0):i[ft]()),a&&a(L)),(St||!Fl)&&(c&&St&&is(L,c),z[_t]&&is(L,z[_t]),y&&($e===1?L.kill(!1,1):z[_t]=0),St||(_t=$e===1?1:3,z[_t]&&is(L,z[_t]))),R&&!Ut&&Math.abs(L.getVelocity())>(da(R)?R:2500)&&(Qs(L.callbackAnimation),ee?ee.progress(1):Qs(i,ft==="reverse"?1:!$e,1))):M&&a&&!rn&&a(L)}if(qe){var N=b?He/b.duration()*(b._caScrollDist||0):He;ke(N+(B._isFlipped?1:0)),qe(N)}gt&&gt(-He/b.duration()*(b._caScrollDist||0))}},L.enable=function(pe,De){L.enabled||(L.enabled=!0,jt(P,"resize",fa),F||jt(P,"scroll",ss),oe&&jt(r,"refreshInit",oe),pe!==!1&&(L.progress=de=0,Ve=Ue=$=ae()),De!==!1&&L.refresh())},L.getTween=function(pe){return pe&&Ee?Ee.tween:ee},L.setPositions=function(pe,De,Ce,He){if(b){var It=b.scrollTrigger,$e=b.duration(),Tt=It.end-It.start;pe=It.start+Tt*pe/$e,De=It.start+Tt*De/$e}L.refresh(!1,!1,{start:Qu(pe,Ce&&!!L._startClamp),end:Qu(De,Ce&&!!L._endClamp)},He),L.update()},L.adjustPinSpacing=function(pe){if(ye&&pe){var De=ye.indexOf(x.d)+1;ye[De]=parseFloat(ye[De])+pe+Vt,ye[1]=parseFloat(ye[1])+pe+Vt,Ds(ye)}},L.disable=function(pe,De){if(pe!==!1&&L.revert(!0,!0),L.enabled&&(L.enabled=L.isActive=!1,De||ee&&ee.pause(),ce=0,Se&&(Se.uncache=1),oe&&Kt(r,"refreshInit",oe),le&&(le.pause(),Ee.tween&&Ee.tween.kill()&&(Ee.tween=0)),!F)){for(var Ce=Qe.length;Ce--;)if(Qe[Ce].scroller===P&&Qe[Ce]!==L)return;Kt(P,"resize",fa),F||Kt(P,"scroll",ss)}},L.kill=function(pe,De){L.disable(pe,De),ee&&!De&&ee.kill(),l&&delete Vc[l];var Ce=Qe.indexOf(L);Ce>=0&&Qe.splice(Ce,1),Ce===fn&&zo>0&&fn--,Ce=0,Qe.forEach(function(He){return He.scroller===L.scroller&&(Ce=1)}),Ce||pn||(L.scroll.rec=0),i&&(i.scrollTrigger=null,pe&&i.revert({kill:!1}),De||i.kill()),Ne&&[Ne,ze,B,Ze].forEach(function(He){return He.parentNode&&He.parentNode.removeChild(He)}),Ea===L&&(Ea=0),d&&(Se&&(Se.uncache=1),Ce=0,Qe.forEach(function(He){return He.pin===d&&Ce++}),Ce||(Se.spacer=0)),n.onKill&&n.onKill(L)},Qe.push(L),L.enable(!1,!1),wt&&wt(L),i&&i.add&&!w){var lt=L.update;L.update=function(){L.update=lt,tt.cache++,D||rt||L.refresh()},be.delayedCall(.01,L.update),w=.01,D=rt=0}else L.refresh();d&&m_()},r.register=function(n){return xs||(be=n||Cp(),Rp()&&window.document&&r.enable(),xs=ha),xs},r.defaults=function(n){if(n)for(var i in n)to[i]=n[i];return to},r.disable=function(n,i){ha=0,Qe.forEach(function(a){return a[i?"kill":"disable"](n)}),Kt(et,"wheel",ss),Kt(pt,"scroll",ss),clearInterval(ja),Kt(pt,"touchcancel",gi),Kt(ut,"touchstart",gi),Qa(Kt,pt,"pointerdown,touchstart,mousedown",ed),Qa(Kt,pt,"pointerup,touchend,mouseup",td),sl.kill(),Ja(Kt);for(var s=0;s<tt.length;s+=3)eo(Kt,tt[s],tt[s+1]),eo(Kt,tt[s],tt[s+2])},r.enable=function(){if(et=window,pt=document,On=pt.documentElement,ut=pt.body,be){if(Na=be.utils.toArray,xa=be.utils.clamp,Hc=be.core.context||gi,Ol=be.core.suppressOverwrites||gi,iu=et.history.scrollRestoration||"auto",Wc=et.pageYOffset||0,be.core.globals("ScrollTrigger",r),ut){ha=1,Ls=document.createElement("div"),Ls.style.height="100vh",Ls.style.position="absolute",Bp(),l_(),Bt.register(be),r.isTouch=Bt.isTouch,er=Bt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),zc=Bt.isTouch===1,jt(et,"wheel",ss),nu=[et,pt,On,ut],be.matchMedia?(r.matchMedia=function(h){var f=be.matchMedia(),u;for(u in h)f.add(u,h[u]);return f},be.addEventListener("matchMediaInit",function(){Op(),cu()}),be.addEventListener("matchMediaRevert",function(){return Np()}),be.addEventListener("matchMedia",function(){Br(0,1),Zr("matchMedia")}),be.matchMedia().add("(orientation: portrait)",function(){return zl(),zl})):console.warn("Requires GSAP 3.11.0 or later"),zl(),jt(pt,"scroll",ss);var n=ut.hasAttribute("style"),i=ut.style,s=i.borderTopStyle,a=be.core.Animation.prototype,o,l;for(a.revert||Object.defineProperty(a,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",o=Ni(ut),Wt.m=Math.round(o.top+Wt.sc())||0,mn.m=Math.round(o.left+mn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(ut.setAttribute("style",""),ut.removeAttribute("style")),ja=setInterval(rd,250),be.delayedCall(.5,function(){return Za=0}),jt(pt,"touchcancel",gi),jt(ut,"touchstart",gi),Qa(jt,pt,"pointerdown,touchstart,mousedown",ed),Qa(jt,pt,"pointerup,touchend,mouseup",td),Bc=be.utils.checkPrefix("transform"),Ho.push(Bc),xs=sn(),sl=be.delayedCall(.2,Br).pause(),bs=[pt,"visibilitychange",function(){var h=et.innerWidth,f=et.innerHeight;pt.hidden?(ju=h,Zu=f):(ju!==h||Zu!==f)&&fa()},pt,"DOMContentLoaded",Br,et,"load",Br,et,"resize",fa],Ja(jt),Qe.forEach(function(h){return h.enable(0,1)}),l=0;l<tt.length;l+=3)eo(Kt,tt[l],tt[l+1]),eo(Kt,tt[l],tt[l+2])}else if(pt){var c=function h(){r.enable(),pt.removeEventListener("DOMContentLoaded",h)};pt.addEventListener("DOMContentLoaded",c)}}},r.config=function(n){"limitCallbacks"in n&&(Fl=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(ja)||(ja=i)&&setInterval(rd,i),"ignoreMobileResize"in n&&(zc=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Ja(Kt)||Ja(jt,n.autoRefreshEvents||"none"),Tp=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=vn(n),a=tt.indexOf(s),o=Kr(s);~a&&tt.splice(a,o?6:2),i&&(o?Ti.unshift(et,i,ut,i,On,i):Ti.unshift(s,i))},r.clearMatchMedia=function(n){Qe.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var a=(In(n)?vn(n):n).getBoundingClientRect(),o=a[s?qr:Yr]*i||0;return s?a.right-o>0&&a.left+o<et.innerWidth:a.bottom-o>0&&a.top+o<et.innerHeight},r.positionInViewport=function(n,i,s){In(n)&&(n=vn(n));var a=n.getBoundingClientRect(),o=a[s?qr:Yr],l=i==null?o/2:i in ol?ol[i]*o:~i.indexOf("%")?parseFloat(i)*o/100:parseFloat(i)||0;return s?(a.left+l)/et.innerWidth:(a.top+l)/et.innerHeight},r.killAll=function(n){if(Qe.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=jr.killAll||[];jr={},i.forEach(function(s){return s()})}},r}();Fe.version="3.15.0";Fe.saveStyles=function(r){return r?Na(r).forEach(function(e){if(e&&e.style){var t=kn.indexOf(e);t>=0&&kn.splice(t,5),kn.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),be.core.getCache(e),Hc())}}):kn};Fe.revert=function(r,e){return cu(!r,e)};Fe.create=function(r,e){return new Fe(r,e)};Fe.refresh=function(r){return r?fa(!0):(xs||Fe.register())&&Br(!0)};Fe.update=function(r){return++tt.cache&&Hi(r===!0?2:0)};Fe.clearScrollMemory=Fp;Fe.maxScroll=function(r,e){return Mi(r,e?mn:Wt)};Fe.getScrollFunc=function(r,e){return vr(vn(r),e?mn:Wt)};Fe.getById=function(r){return Vc[r]};Fe.getAll=function(){return Qe.filter(function(r){return r.vars.id!=="ScrollSmoother"})};Fe.isScrolling=function(){return!!ei};Fe.snapDirectional=lu;Fe.addEventListener=function(r,e){var t=jr[r]||(jr[r]=[]);~t.indexOf(e)||t.push(e)};Fe.removeEventListener=function(r,e){var t=jr[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};Fe.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,a=function(c,h){var f=[],u=[],d=be.delayedCall(i,function(){h(f,u),f=[],u=[]}).pause();return function(g){f.length||d.restart(!0),f.push(g.trigger),u.push(g),s<=f.length&&d.progress(1)}},o;for(o in e)n[o]=o.substr(0,2)==="on"&&on(e[o])&&o!=="onRefreshInit"?a(o,e[o]):e[o];return on(s)&&(s=s(),jt(Fe,"refresh",function(){return s=e.batchMax()})),Na(r).forEach(function(l){var c={};for(o in n)c[o]=n[o];c.trigger=l,t.push(Fe.create(c))}),t};var hd=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},Gl=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Bt.isTouch?" pinch-zoom":""):"none",e===On&&r(ut,t)},so={auto:1,scroll:1},x_=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,a=s._gsap||be.core.getCache(s),o=sn(),l;if(!a._isScrollT||o-a._isScrollT>2e3){for(;s&&s!==ut&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(so[(l=Kn(s)).overflowY]||so[l.overflowX]));)s=s.parentNode;a._isScroll=s&&s!==n&&!Kr(s)&&(so[(l=Kn(s)).overflowY]||so[l.overflowX]),a._isScrollT=o}(a._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},Hp=function(e,t,n,i){return Bt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&x_,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&jt(pt,Bt.eventTypes[0],dd,!1,!0)},onDisable:function(){return Kt(pt,Bt.eventTypes[0],dd,!0)}})},b_=/(input|label|select|textarea)/i,ud,dd=function(e){var t=b_.test(e.target.tagName);(t||ud)&&(e._gsapAllow=!0,ud=t)},S_=function(e){kr(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,a=t.onRelease,o,l,c=vn(e.target)||On,h=be.core.globals().ScrollSmoother,f=h&&h.get(),u=er&&(e.content&&vn(e.content)||f&&e.content!==!1&&!f.smooth()&&f.content()),d=vr(c,Wt),g=vr(c,mn),_=1,p=(Bt.isTouch&&et.visualViewport?et.visualViewport.scale*et.visualViewport.width:et.outerWidth)/et.innerWidth,m=0,v=on(i)?function(){return i(o)}:function(){return i||2.8},y,S,A=Hp(c,e.type,!0,s),T=function(){return S=!1},b=gi,R=gi,k=function(){l=Mi(c,Wt),R=xa(er?1:0,l),n&&(b=xa(0,Mi(c,mn))),y=$r},x=function(){u._gsap.y=ua(parseFloat(u._gsap.y)+d.offset)+"px",u.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(u._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},M=function(){if(S){requestAnimationFrame(T);var W=ua(o.deltaY/2),re=R(d.v-W);if(u&&re!==d.v+d.offset){d.offset=re-d.v;var L=ua((parseFloat(u&&u._gsap.y)||0)-d.offset);u.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+L+", 0, 1)",u._gsap.y=L+"px",d.cacheID=tt.cache,Hi()}return!0}d.offset&&x(),S=!0},P,I,F,q,z=function(){k(),P.isActive()&&P.vars.scrollY>l&&(d()>l?P.progress(1)&&d(l):P.resetTo("scrollY",l))};return u&&be.set(u,{y:"+=0"}),e.ignoreCheck=function(G){return er&&G.type==="touchmove"&&M()||_>1.05&&G.type!=="touchstart"||o.isGesturing||G.touches&&G.touches.length>1},e.onPress=function(){S=!1;var G=_;_=ua((et.visualViewport&&et.visualViewport.scale||1)/p),P.pause(),G!==_&&Gl(c,_>1.01?!0:n?!1:"x"),I=g(),F=d(),k(),y=$r},e.onRelease=e.onGestureStart=function(G,W){if(d.offset&&x(),!W)q.restart(!0);else{tt.cache++;var re=v(),L,oe;n&&(L=g(),oe=L+re*.05*-G.velocityX/.227,re*=hd(g,L,oe,Mi(c,mn)),P.vars.scrollX=b(oe)),L=d(),oe=L+re*.05*-G.velocityY/.227,re*=hd(d,L,oe,Mi(c,Wt)),P.vars.scrollY=R(oe),P.invalidate().duration(re).play(.01),(er&&P.vars.scrollY>=l||L>=l-1)&&be.to({},{onUpdate:z,duration:re})}a&&a(G)},e.onWheel=function(){P._ts&&P.pause(),sn()-m>1e3&&(y=0,m=sn())},e.onChange=function(G,W,re,L,oe){if($r!==y&&k(),W&&n&&g(b(L[2]===W?I+(G.startX-G.x):g()+W-L[1])),re){d.offset&&x();var Be=oe[2]===re,Xe=Be?F+G.startY-G.y:d()+re-oe[1],$=R(Xe);Be&&Xe!==$&&(F+=$-Xe),d($)}(re||W)&&Hi()},e.onEnable=function(){Gl(c,n?!1:"x"),Fe.addEventListener("refresh",z),jt(et,"resize",z),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=g.smooth=!1),A.enable()},e.onDisable=function(){Gl(c,!0),Kt(et,"resize",z),Fe.removeEventListener("refresh",z),A.kill()},e.lockAxis=e.lockAxis!==!1,o=new Bt(e),o.iOS=er,er&&!d()&&d(1),er&&be.ticker.add(gi),q=o._dc,P=be.to(o,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:zp(d,d(),function(){return P.pause()})},onUpdate:Hi,onComplete:q.vars.onComplete}),o};Fe.sort=function(r){if(on(r))return Qe.sort(r);var e=et.pageYOffset||0;return Fe.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+et.innerHeight}),Qe.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Fe.observe=function(r){return new Bt(r)};Fe.normalizeScroll=function(r){if(typeof r>"u")return dn;if(r===!0&&dn)return dn.enable();if(r===!1){dn&&dn.kill(),dn=r;return}var e=r instanceof Bt?r:S_(r);return dn&&dn.target===e.target&&dn.kill(),Kr(e.target)&&(dn=e),e};Fe.core={_getVelocityProp:Fc,_inputObserver:Hp,_scrollers:tt,_proxies:Ti,bridge:{ss:function(){ei||Zr("scrollStart"),ei=sn()},ref:function(){return rn}}};Cp()&&be.registerPlugin(Fe);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const hu="169",M_=0,fd=1,w_=2,Gp=1,T_=2,Di=3,yr=0,En=1,Oi=2,dr=0,ks=1,pd=2,md=3,gd=4,E_=5,Nr=100,A_=101,R_=102,C_=103,P_=104,L_=200,D_=201,k_=202,I_=203,qc=204,Yc=205,U_=206,N_=207,O_=208,F_=209,B_=210,z_=211,H_=212,G_=213,V_=214,$c=0,Kc=1,jc=2,Gs=3,Zc=4,Jc=5,Qc=6,eh=7,Vp=0,W_=1,X_=2,fr=0,q_=1,Y_=2,$_=3,K_=4,j_=5,Z_=6,J_=7,Wp=300,Vs=301,Ws=302,th=303,nh=304,bl=306,ih=1e3,zr=1001,rh=1002,Qn=1003,Q_=1004,ao=1005,li=1006,Vl=1007,Hr=1008,Wi=1009,Xp=1010,qp=1011,Fa=1012,uu=1013,Jr=1014,Bi=1015,Ha=1016,du=1017,fu=1018,Xs=1020,Yp=35902,$p=1021,Kp=1022,ui=1023,jp=1024,Zp=1025,Is=1026,qs=1027,Jp=1028,pu=1029,Qp=1030,mu=1031,gu=1033,Vo=33776,Wo=33777,Xo=33778,qo=33779,sh=35840,ah=35841,oh=35842,lh=35843,ch=36196,hh=37492,uh=37496,dh=37808,fh=37809,ph=37810,mh=37811,gh=37812,_h=37813,vh=37814,yh=37815,xh=37816,bh=37817,Sh=37818,Mh=37819,wh=37820,Th=37821,Yo=36492,Eh=36494,Ah=36495,em=36283,Rh=36284,Ch=36285,Ph=36286,ev=3200,tv=3201,nv=0,iv=1,tr="",_i="srgb",Sr="srgb-linear",_u="display-p3",Sl="display-p3-linear",ll="linear",Mt="srgb",cl="rec709",hl="p3",as=7680,_d=519,rv=512,sv=513,av=514,tm=515,ov=516,lv=517,cv=518,hv=519,vd=35044,yd="300 es",zi=2e3,ul=2001;class $s{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wl=Math.PI/180,Lh=180/Math.PI;function Ga(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(tn[r&255]+tn[r>>8&255]+tn[r>>16&255]+tn[r>>24&255]+"-"+tn[e&255]+tn[e>>8&255]+"-"+tn[e>>16&15|64]+tn[e>>24&255]+"-"+tn[t&63|128]+tn[t>>8&255]+"-"+tn[t>>16&255]+tn[t>>24&255]+tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]).toLowerCase()}function xn(r,e,t){return Math.max(e,Math.min(t,r))}function uv(r,e){return(r%e+e)%e}function Xl(r,e,t){return(1-t)*r+t*e}function ea(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function _n(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class xt{constructor(e=0,t=0){xt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(xn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class je{constructor(e,t,n,i,s,a,o,l,c){je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],f=n[7],u=n[2],d=n[5],g=n[8],_=i[0],p=i[3],m=i[6],v=i[1],y=i[4],S=i[7],A=i[2],T=i[5],b=i[8];return s[0]=a*_+o*v+l*A,s[3]=a*p+o*y+l*T,s[6]=a*m+o*S+l*b,s[1]=c*_+h*v+f*A,s[4]=c*p+h*y+f*T,s[7]=c*m+h*S+f*b,s[2]=u*_+d*v+g*A,s[5]=u*p+d*y+g*T,s[8]=u*m+d*S+g*b,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=h*a-o*c,u=o*l-h*s,d=c*s-a*l,g=t*f+n*u+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(i*c-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=u*_,e[4]=(h*t-i*l)*_,e[5]=(i*s-o*t)*_,e[6]=d*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ql.makeScale(e,t)),this}rotate(e){return this.premultiply(ql.makeRotation(-e)),this}translate(e,t){return this.premultiply(ql.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ql=new je;function nm(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function dl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function dv(){const r=dl("canvas");return r.style.display="block",r}const xd={};function $o(r){r in xd||(xd[r]=!0,console.warn(r))}function fv(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function pv(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function mv(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const bd=new je().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Sd=new je().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ta={[Sr]:{transfer:ll,primaries:cl,luminanceCoefficients:[.2126,.7152,.0722],toReference:r=>r,fromReference:r=>r},[_i]:{transfer:Mt,primaries:cl,luminanceCoefficients:[.2126,.7152,.0722],toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Sl]:{transfer:ll,primaries:hl,luminanceCoefficients:[.2289,.6917,.0793],toReference:r=>r.applyMatrix3(Sd),fromReference:r=>r.applyMatrix3(bd)},[_u]:{transfer:Mt,primaries:hl,luminanceCoefficients:[.2289,.6917,.0793],toReference:r=>r.convertSRGBToLinear().applyMatrix3(Sd),fromReference:r=>r.applyMatrix3(bd).convertLinearToSRGB()}},gv=new Set([Sr,Sl]),dt={enabled:!0,_workingColorSpace:Sr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!gv.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=ta[e].toReference,i=ta[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return ta[r].primaries},getTransfer:function(r){return r===tr?ll:ta[r].transfer},getLuminanceCoefficients:function(r,e=this._workingColorSpace){return r.fromArray(ta[e].luminanceCoefficients)}};function Us(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Yl(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let os;class _v{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{os===void 0&&(os=dl("canvas")),os.width=e.width,os.height=e.height;const n=os.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=os}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=dl("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Us(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Us(t[n]/255)*255):t[n]=Us(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let vv=0;class im{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vv++}),this.uuid=Ga(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push($l(i[a].image)):s.push($l(i[a]))}else s=$l(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function $l(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?_v.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let yv=0;class An extends $s{constructor(e=An.DEFAULT_IMAGE,t=An.DEFAULT_MAPPING,n=zr,i=zr,s=li,a=Hr,o=ui,l=Wi,c=An.DEFAULT_ANISOTROPY,h=tr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:yv++}),this.uuid=Ga(),this.name="",this.source=new im(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new xt(0,0),this.repeat=new xt(1,1),this.center=new xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Wp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ih:e.x=e.x-Math.floor(e.x);break;case zr:e.x=e.x<0?0:1;break;case rh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ih:e.y=e.y-Math.floor(e.y);break;case zr:e.y=e.y<0?0:1;break;case rh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}An.DEFAULT_IMAGE=null;An.DEFAULT_MAPPING=Wp;An.DEFAULT_ANISOTROPY=1;class Ft{constructor(e=0,t=0,n=0,i=1){Ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],h=l[4],f=l[8],u=l[1],d=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,S=(d+1)/2,A=(m+1)/2,T=(h+u)/4,b=(f+_)/4,R=(g+p)/4;return y>S&&y>A?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=T/n,s=b/n):S>A?S<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(S),n=T/i,s=R/i):A<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(A),n=b/s,i=R/s),this.set(n,i,s,t),this}let v=Math.sqrt((p-g)*(p-g)+(f-_)*(f-_)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(p-g)/v,this.y=(f-_)/v,this.z=(u-h)/v,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xv extends $s{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ft(0,0,e,t),this.scissorTest=!1,this.viewport=new Ft(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:li,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new An(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new im(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Qr extends xv{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class rm extends An{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Qn,this.minFilter=Qn,this.wrapR=zr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class bv extends An{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Qn,this.minFilter=Qn,this.wrapR=zr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Va{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],f=n[i+3];const u=s[a+0],d=s[a+1],g=s[a+2],_=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=f;return}if(o===1){e[t+0]=u,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(f!==_||l!==u||c!==d||h!==g){let p=1-o;const m=l*u+c*d+h*g+f*_,v=m>=0?1:-1,y=1-m*m;if(y>Number.EPSILON){const A=Math.sqrt(y),T=Math.atan2(A,m*v);p=Math.sin(p*T)/A,o=Math.sin(o*T)/A}const S=o*v;if(l=l*p+u*S,c=c*p+d*S,h=h*p+g*S,f=f*p+_*S,p===1-o){const A=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=A,c*=A,h*=A,f*=A}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],f=s[a],u=s[a+1],d=s[a+2],g=s[a+3];return e[t]=o*g+h*f+l*d-c*u,e[t+1]=l*g+h*u+c*f-o*d,e[t+2]=c*g+h*d+o*u-l*f,e[t+3]=h*g-o*f-l*u-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),f=o(s/2),u=l(n/2),d=l(i/2),g=l(s/2);switch(a){case"XYZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"YXZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"ZXY":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"ZYX":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"YZX":this._x=u*h*f+c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f-u*d*g;break;case"XZY":this._x=u*h*f-c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f+u*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],f=t[10],u=n+o+f;if(u>0){const d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(s-c)*d,this._z=(a-i)*d}else if(n>o&&n>f){const d=2*Math.sqrt(1+n-o-f);this._w=(h-l)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(s+c)/d}else if(o>f){const d=2*Math.sqrt(1+o-n-f);this._w=(s-c)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+f-n-o);this._w=(a-i)/d,this._x=(s+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(xn(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const d=1-t;return this._w=d*a+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),f=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=a*f+this._w*u,this._x=n*f+this._x*u,this._y=i*f+this._y*u,this._z=s*f+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Y{constructor(e=0,t=0,n=0){Y.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Md.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Md.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-s*i),f=2*(s*n-a*t);return this.x=t+l*c+a*f-o*h,this.y=n+l*h+o*c-s*f,this.z=i+l*f+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Kl.copy(this).projectOnVector(e),this.sub(Kl)}reflect(e){return this.sub(Kl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(xn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Kl=new Y,Md=new Va;class Wa{constructor(e=new Y(1/0,1/0,1/0),t=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ri.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ri.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=ri.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ri):ri.fromBufferAttribute(s,a),ri.applyMatrix4(e.matrixWorld),this.expandByPoint(ri);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),oo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),oo.copy(n.boundingBox)),oo.applyMatrix4(e.matrixWorld),this.union(oo)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ri),ri.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(na),lo.subVectors(this.max,na),ls.subVectors(e.a,na),cs.subVectors(e.b,na),hs.subVectors(e.c,na),$i.subVectors(cs,ls),Ki.subVectors(hs,cs),Tr.subVectors(ls,hs);let t=[0,-$i.z,$i.y,0,-Ki.z,Ki.y,0,-Tr.z,Tr.y,$i.z,0,-$i.x,Ki.z,0,-Ki.x,Tr.z,0,-Tr.x,-$i.y,$i.x,0,-Ki.y,Ki.x,0,-Tr.y,Tr.x,0];return!jl(t,ls,cs,hs,lo)||(t=[1,0,0,0,1,0,0,0,1],!jl(t,ls,cs,hs,lo))?!1:(co.crossVectors($i,Ki),t=[co.x,co.y,co.z],jl(t,ls,cs,hs,lo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ri).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ri).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ai[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ai[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ai[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ai[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ai[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ai[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ai[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ai[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ai),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ai=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],ri=new Y,oo=new Wa,ls=new Y,cs=new Y,hs=new Y,$i=new Y,Ki=new Y,Tr=new Y,na=new Y,lo=new Y,co=new Y,Er=new Y;function jl(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Er.fromArray(r,s);const o=i.x*Math.abs(Er.x)+i.y*Math.abs(Er.y)+i.z*Math.abs(Er.z),l=e.dot(Er),c=t.dot(Er),h=n.dot(Er);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Sv=new Wa,ia=new Y,Zl=new Y;class Xa{constructor(e=new Y,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Sv.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ia.subVectors(e,this.center);const t=ia.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ia,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ia.copy(e.center).add(Zl)),this.expandByPoint(ia.copy(e.center).sub(Zl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ri=new Y,Jl=new Y,ho=new Y,ji=new Y,Ql=new Y,uo=new Y,ec=new Y;class vu{constructor(e=new Y,t=new Y(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ri)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ri.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ri.copy(this.origin).addScaledVector(this.direction,t),Ri.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Jl.copy(e).add(t).multiplyScalar(.5),ho.copy(t).sub(e).normalize(),ji.copy(this.origin).sub(Jl);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ho),o=ji.dot(this.direction),l=-ji.dot(ho),c=ji.lengthSq(),h=Math.abs(1-a*a);let f,u,d,g;if(h>0)if(f=a*l-o,u=a*o-l,g=s*h,f>=0)if(u>=-g)if(u<=g){const _=1/h;f*=_,u*=_,d=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=s,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u=-s,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u<=-g?(f=Math.max(0,-(-a*s+o)),u=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+u*(u+2*l)+c):u<=g?(f=0,u=Math.min(Math.max(-s,-l),s),d=u*(u+2*l)+c):(f=Math.max(0,-(a*s+o)),u=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+u*(u+2*l)+c);else u=a>0?-s:s,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(Jl).addScaledVector(ho,u),d}intersectSphere(e,t){Ri.subVectors(e.center,this.origin);const n=Ri.dot(this.direction),i=Ri.dot(Ri)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),f>=0?(o=(e.min.z-u.z)*f,l=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,l=(e.min.z-u.z)*f),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Ri)!==null}intersectTriangle(e,t,n,i,s){Ql.subVectors(t,e),uo.subVectors(n,e),ec.crossVectors(Ql,uo);let a=this.direction.dot(ec),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ji.subVectors(this.origin,e);const l=o*this.direction.dot(uo.crossVectors(ji,uo));if(l<0)return null;const c=o*this.direction.dot(Ql.cross(ji));if(c<0||l+c>a)return null;const h=-o*ji.dot(ec);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class kt{constructor(e,t,n,i,s,a,o,l,c,h,f,u,d,g,_,p){kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,h,f,u,d,g,_,p)}set(e,t,n,i,s,a,o,l,c,h,f,u,d,g,_,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=f,m[14]=u,m[3]=d,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new kt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/us.setFromMatrixColumn(e,0).length(),s=1/us.setFromMatrixColumn(e,1).length(),a=1/us.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const u=a*h,d=a*f,g=o*h,_=o*f;t[0]=l*h,t[4]=-l*f,t[8]=c,t[1]=d+g*c,t[5]=u-_*c,t[9]=-o*l,t[2]=_-u*c,t[6]=g+d*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,d=l*f,g=c*h,_=c*f;t[0]=u+_*o,t[4]=g*o-d,t[8]=a*c,t[1]=a*f,t[5]=a*h,t[9]=-o,t[2]=d*o-g,t[6]=_+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,d=l*f,g=c*h,_=c*f;t[0]=u-_*o,t[4]=-a*f,t[8]=g+d*o,t[1]=d+g*o,t[5]=a*h,t[9]=_-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,d=a*f,g=o*h,_=o*f;t[0]=l*h,t[4]=g*c-d,t[8]=u*c+_,t[1]=l*f,t[5]=_*c+u,t[9]=d*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,d=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=_-u*f,t[8]=g*f+d,t[1]=f,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=d*f+g,t[10]=u-_*f}else if(e.order==="XZY"){const u=a*l,d=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=-f,t[8]=c*h,t[1]=u*f+_,t[5]=a*h,t[9]=d*f-g,t[2]=g*f-d,t[6]=o*h,t[10]=_*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Mv,e,wv)}lookAt(e,t,n){const i=this.elements;return Ln.subVectors(e,t),Ln.lengthSq()===0&&(Ln.z=1),Ln.normalize(),Zi.crossVectors(n,Ln),Zi.lengthSq()===0&&(Math.abs(n.z)===1?Ln.x+=1e-4:Ln.z+=1e-4,Ln.normalize(),Zi.crossVectors(n,Ln)),Zi.normalize(),fo.crossVectors(Ln,Zi),i[0]=Zi.x,i[4]=fo.x,i[8]=Ln.x,i[1]=Zi.y,i[5]=fo.y,i[9]=Ln.y,i[2]=Zi.z,i[6]=fo.z,i[10]=Ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],f=n[5],u=n[9],d=n[13],g=n[2],_=n[6],p=n[10],m=n[14],v=n[3],y=n[7],S=n[11],A=n[15],T=i[0],b=i[4],R=i[8],k=i[12],x=i[1],M=i[5],P=i[9],I=i[13],F=i[2],q=i[6],z=i[10],G=i[14],W=i[3],re=i[7],L=i[11],oe=i[15];return s[0]=a*T+o*x+l*F+c*W,s[4]=a*b+o*M+l*q+c*re,s[8]=a*R+o*P+l*z+c*L,s[12]=a*k+o*I+l*G+c*oe,s[1]=h*T+f*x+u*F+d*W,s[5]=h*b+f*M+u*q+d*re,s[9]=h*R+f*P+u*z+d*L,s[13]=h*k+f*I+u*G+d*oe,s[2]=g*T+_*x+p*F+m*W,s[6]=g*b+_*M+p*q+m*re,s[10]=g*R+_*P+p*z+m*L,s[14]=g*k+_*I+p*G+m*oe,s[3]=v*T+y*x+S*F+A*W,s[7]=v*b+y*M+S*q+A*re,s[11]=v*R+y*P+S*z+A*L,s[15]=v*k+y*I+S*G+A*oe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],f=e[6],u=e[10],d=e[14],g=e[3],_=e[7],p=e[11],m=e[15];return g*(+s*l*f-i*c*f-s*o*u+n*c*u+i*o*d-n*l*d)+_*(+t*l*d-t*c*u+s*a*u-i*a*d+i*c*h-s*l*h)+p*(+t*c*f-t*o*d-s*a*f+n*a*d+s*o*h-n*c*h)+m*(-i*o*h-t*l*f+t*o*u+i*a*f-n*a*u+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=e[9],u=e[10],d=e[11],g=e[12],_=e[13],p=e[14],m=e[15],v=f*p*c-_*u*c+_*l*d-o*p*d-f*l*m+o*u*m,y=g*u*c-h*p*c-g*l*d+a*p*d+h*l*m-a*u*m,S=h*_*c-g*f*c+g*o*d-a*_*d-h*o*m+a*f*m,A=g*f*l-h*_*l-g*o*u+a*_*u+h*o*p-a*f*p,T=t*v+n*y+i*S+s*A;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/T;return e[0]=v*b,e[1]=(_*u*s-f*p*s-_*i*d+n*p*d+f*i*m-n*u*m)*b,e[2]=(o*p*s-_*l*s+_*i*c-n*p*c-o*i*m+n*l*m)*b,e[3]=(f*l*s-o*u*s-f*i*c+n*u*c+o*i*d-n*l*d)*b,e[4]=y*b,e[5]=(h*p*s-g*u*s+g*i*d-t*p*d-h*i*m+t*u*m)*b,e[6]=(g*l*s-a*p*s-g*i*c+t*p*c+a*i*m-t*l*m)*b,e[7]=(a*u*s-h*l*s+h*i*c-t*u*c-a*i*d+t*l*d)*b,e[8]=S*b,e[9]=(g*f*s-h*_*s-g*n*d+t*_*d+h*n*m-t*f*m)*b,e[10]=(a*_*s-g*o*s+g*n*c-t*_*c-a*n*m+t*o*m)*b,e[11]=(h*o*s-a*f*s-h*n*c+t*f*c+a*n*d-t*o*d)*b,e[12]=A*b,e[13]=(h*_*i-g*f*i+g*n*u-t*_*u-h*n*p+t*f*p)*b,e[14]=(g*o*i-a*_*i-g*n*l+t*_*l+a*n*p-t*o*p)*b,e[15]=(a*f*i-h*o*i+h*n*l-t*f*l-a*n*u+t*o*u)*b,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,f=o+o,u=s*c,d=s*h,g=s*f,_=a*h,p=a*f,m=o*f,v=l*c,y=l*h,S=l*f,A=n.x,T=n.y,b=n.z;return i[0]=(1-(_+m))*A,i[1]=(d+S)*A,i[2]=(g-y)*A,i[3]=0,i[4]=(d-S)*T,i[5]=(1-(u+m))*T,i[6]=(p+v)*T,i[7]=0,i[8]=(g+y)*b,i[9]=(p-v)*b,i[10]=(1-(u+_))*b,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=us.set(i[0],i[1],i[2]).length();const a=us.set(i[4],i[5],i[6]).length(),o=us.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],si.copy(this);const c=1/s,h=1/a,f=1/o;return si.elements[0]*=c,si.elements[1]*=c,si.elements[2]*=c,si.elements[4]*=h,si.elements[5]*=h,si.elements[6]*=h,si.elements[8]*=f,si.elements[9]*=f,si.elements[10]*=f,t.setFromRotationMatrix(si),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=zi){const l=this.elements,c=2*s/(t-e),h=2*s/(n-i),f=(t+e)/(t-e),u=(n+i)/(n-i);let d,g;if(o===zi)d=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===ul)d=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=zi){const l=this.elements,c=1/(t-e),h=1/(n-i),f=1/(a-s),u=(t+e)*c,d=(n+i)*h;let g,_;if(o===zi)g=(a+s)*f,_=-2*f;else if(o===ul)g=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const us=new Y,si=new kt,Mv=new Y(0,0,0),wv=new Y(1,1,1),Zi=new Y,fo=new Y,Ln=new Y,wd=new kt,Td=new Va;class Xi{constructor(e=0,t=0,n=0,i=Xi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],f=i[2],u=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(xn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-xn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(xn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-xn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(xn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-xn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return wd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Td.setFromEuler(this),this.setFromQuaternion(Td,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Xi.DEFAULT_ORDER="XYZ";class sm{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Tv=0;const Ed=new Y,ds=new Va,Ci=new kt,po=new Y,ra=new Y,Ev=new Y,Av=new Va,Ad=new Y(1,0,0),Rd=new Y(0,1,0),Cd=new Y(0,0,1),Pd={type:"added"},Rv={type:"removed"},fs={type:"childadded",child:null},tc={type:"childremoved",child:null};class gn extends $s{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Tv++}),this.uuid=Ga(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gn.DEFAULT_UP.clone();const e=new Y,t=new Xi,n=new Va,i=new Y(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new kt},normalMatrix:{value:new je}}),this.matrix=new kt,this.matrixWorld=new kt,this.matrixAutoUpdate=gn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ds.setFromAxisAngle(e,t),this.quaternion.multiply(ds),this}rotateOnWorldAxis(e,t){return ds.setFromAxisAngle(e,t),this.quaternion.premultiply(ds),this}rotateX(e){return this.rotateOnAxis(Ad,e)}rotateY(e){return this.rotateOnAxis(Rd,e)}rotateZ(e){return this.rotateOnAxis(Cd,e)}translateOnAxis(e,t){return Ed.copy(e).applyQuaternion(this.quaternion),this.position.add(Ed.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ad,e)}translateY(e){return this.translateOnAxis(Rd,e)}translateZ(e){return this.translateOnAxis(Cd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ci.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?po.copy(e):po.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ra.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ci.lookAt(ra,po,this.up):Ci.lookAt(po,ra,this.up),this.quaternion.setFromRotationMatrix(Ci),i&&(Ci.extractRotation(i.matrixWorld),ds.setFromRotationMatrix(Ci),this.quaternion.premultiply(ds.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Pd),fs.child=e,this.dispatchEvent(fs),fs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Rv),tc.child=e,this.dispatchEvent(tc),tc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ci.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ci.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ci),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Pd),fs.child=e,this.dispatchEvent(fs),fs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ra,e,Ev),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ra,Av,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),f=a(e.shapes),u=a(e.skeletons),d=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}gn.DEFAULT_UP=new Y(0,1,0);gn.DEFAULT_MATRIX_AUTO_UPDATE=!0;gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ai=new Y,Pi=new Y,nc=new Y,Li=new Y,ps=new Y,ms=new Y,Ld=new Y,ic=new Y,rc=new Y,sc=new Y,ac=new Ft,oc=new Ft,lc=new Ft;class ci{constructor(e=new Y,t=new Y,n=new Y){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),ai.subVectors(e,t),i.cross(ai);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){ai.subVectors(i,t),Pi.subVectors(n,t),nc.subVectors(e,t);const a=ai.dot(ai),o=ai.dot(Pi),l=ai.dot(nc),c=Pi.dot(Pi),h=Pi.dot(nc),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const u=1/f,d=(c*l-o*h)*u,g=(a*h-o*l)*u;return s.set(1-d-g,g,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Li)===null?!1:Li.x>=0&&Li.y>=0&&Li.x+Li.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,Li)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Li.x),l.addScaledVector(a,Li.y),l.addScaledVector(o,Li.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return ac.setScalar(0),oc.setScalar(0),lc.setScalar(0),ac.fromBufferAttribute(e,t),oc.fromBufferAttribute(e,n),lc.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(ac,s.x),a.addScaledVector(oc,s.y),a.addScaledVector(lc,s.z),a}static isFrontFacing(e,t,n,i){return ai.subVectors(n,t),Pi.subVectors(e,t),ai.cross(Pi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ai.subVectors(this.c,this.b),Pi.subVectors(this.a,this.b),ai.cross(Pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ci.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ci.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return ci.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return ci.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ci.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;ps.subVectors(i,n),ms.subVectors(s,n),ic.subVectors(e,n);const l=ps.dot(ic),c=ms.dot(ic);if(l<=0&&c<=0)return t.copy(n);rc.subVectors(e,i);const h=ps.dot(rc),f=ms.dot(rc);if(h>=0&&f<=h)return t.copy(i);const u=l*f-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(ps,a);sc.subVectors(e,s);const d=ps.dot(sc),g=ms.dot(sc);if(g>=0&&d<=g)return t.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(ms,o);const p=h*g-d*f;if(p<=0&&f-h>=0&&d-g>=0)return Ld.subVectors(s,i),o=(f-h)/(f-h+(d-g)),t.copy(i).addScaledVector(Ld,o);const m=1/(p+_+u);return a=_*m,o=u*m,t.copy(n).addScaledVector(ps,a).addScaledVector(ms,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const am={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ji={h:0,s:0,l:0},mo={h:0,s:0,l:0};function cc(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class ct{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=_i){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,dt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=dt.workingColorSpace){if(e=uv(e,1),t=xn(t,0,1),n=xn(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=cc(a,s,e+1/3),this.g=cc(a,s,e),this.b=cc(a,s,e-1/3)}return dt.toWorkingColorSpace(this,i),this}setStyle(e,t=_i){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=_i){const n=am[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Us(e.r),this.g=Us(e.g),this.b=Us(e.b),this}copyLinearToSRGB(e){return this.r=Yl(e.r),this.g=Yl(e.g),this.b=Yl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=_i){return dt.fromWorkingColorSpace(nn.copy(this),e),Math.round(xn(nn.r*255,0,255))*65536+Math.round(xn(nn.g*255,0,255))*256+Math.round(xn(nn.b*255,0,255))}getHexString(e=_i){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.fromWorkingColorSpace(nn.copy(this),t);const n=nn.r,i=nn.g,s=nn.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case n:l=(i-s)/f+(i<s?6:0);break;case i:l=(s-n)/f+2;break;case s:l=(n-i)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=dt.workingColorSpace){return dt.fromWorkingColorSpace(nn.copy(this),t),e.r=nn.r,e.g=nn.g,e.b=nn.b,e}getStyle(e=_i){dt.fromWorkingColorSpace(nn.copy(this),e);const t=nn.r,n=nn.g,i=nn.b;return e!==_i?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Ji),this.setHSL(Ji.h+e,Ji.s+t,Ji.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ji),e.getHSL(mo);const n=Xl(Ji.h,mo.h,t),i=Xl(Ji.s,mo.s,t),s=Xl(Ji.l,mo.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const nn=new ct;ct.NAMES=am;let Cv=0;class Ks extends $s{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cv++}),this.uuid=Ga(),this.name="",this.type="Material",this.blending=ks,this.side=yr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qc,this.blendDst=Yc,this.blendEquation=Nr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ct(0,0,0),this.blendAlpha=0,this.depthFunc=Gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_d,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=as,this.stencilZFail=as,this.stencilZPass=as,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ks&&(n.blending=this.blending),this.side!==yr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==qc&&(n.blendSrc=this.blendSrc),this.blendDst!==Yc&&(n.blendDst=this.blendDst),this.blendEquation!==Nr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Gs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_d&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==as&&(n.stencilFail=this.stencilFail),this.stencilZFail!==as&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==as&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class yu extends Ks{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xi,this.combine=Vp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const zt=new Y,go=new xt;class fi{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=vd,this.updateRanges=[],this.gpuType=Bi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)go.fromBufferAttribute(this,t),go.applyMatrix3(e),this.setXY(t,go.x,go.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix3(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix4(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyNormalMatrix(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.transformDirection(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ea(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_n(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ea(t,this.array)),t}setX(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ea(t,this.array)),t}setY(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ea(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ea(t,this.array)),t}setW(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),n=_n(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),n=_n(n,this.array),i=_n(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),n=_n(n,this.array),i=_n(i,this.array),s=_n(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==vd&&(e.usage=this.usage),e}}class om extends fi{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class lm extends fi{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class pi extends fi{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Pv=0;const qn=new kt,hc=new gn,gs=new Y,Dn=new Wa,sa=new Wa,$t=new Y;class ni extends $s{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Pv++}),this.uuid=Ga(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(nm(e)?lm:om)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new je().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return qn.makeRotationFromQuaternion(e),this.applyMatrix4(qn),this}rotateX(e){return qn.makeRotationX(e),this.applyMatrix4(qn),this}rotateY(e){return qn.makeRotationY(e),this.applyMatrix4(qn),this}rotateZ(e){return qn.makeRotationZ(e),this.applyMatrix4(qn),this}translate(e,t,n){return qn.makeTranslation(e,t,n),this.applyMatrix4(qn),this}scale(e,t,n){return qn.makeScale(e,t,n),this.applyMatrix4(qn),this}lookAt(e){return hc.lookAt(e),hc.updateMatrix(),this.applyMatrix4(hc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gs).negate(),this.translate(gs.x,gs.y,gs.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new pi(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Dn.setFromBufferAttribute(s),this.morphTargetsRelative?($t.addVectors(this.boundingBox.min,Dn.min),this.boundingBox.expandByPoint($t),$t.addVectors(this.boundingBox.max,Dn.max),this.boundingBox.expandByPoint($t)):(this.boundingBox.expandByPoint(Dn.min),this.boundingBox.expandByPoint(Dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Y,1/0);return}if(e){const n=this.boundingSphere.center;if(Dn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];sa.setFromBufferAttribute(o),this.morphTargetsRelative?($t.addVectors(Dn.min,sa.min),Dn.expandByPoint($t),$t.addVectors(Dn.max,sa.max),Dn.expandByPoint($t)):(Dn.expandByPoint(sa.min),Dn.expandByPoint(sa.max))}Dn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)$t.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared($t));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)$t.fromBufferAttribute(o,c),l&&(gs.fromBufferAttribute(e,c),$t.add(gs)),i=Math.max(i,n.distanceToSquared($t))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new fi(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<n.count;R++)o[R]=new Y,l[R]=new Y;const c=new Y,h=new Y,f=new Y,u=new xt,d=new xt,g=new xt,_=new Y,p=new Y;function m(R,k,x){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,k),f.fromBufferAttribute(n,x),u.fromBufferAttribute(s,R),d.fromBufferAttribute(s,k),g.fromBufferAttribute(s,x),h.sub(c),f.sub(c),d.sub(u),g.sub(u);const M=1/(d.x*g.y-g.x*d.y);isFinite(M)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(M),p.copy(f).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(M),o[R].add(_),o[k].add(_),o[x].add(_),l[R].add(p),l[k].add(p),l[x].add(p))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let R=0,k=v.length;R<k;++R){const x=v[R],M=x.start,P=x.count;for(let I=M,F=M+P;I<F;I+=3)m(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const y=new Y,S=new Y,A=new Y,T=new Y;function b(R){A.fromBufferAttribute(i,R),T.copy(A);const k=o[R];y.copy(k),y.sub(A.multiplyScalar(A.dot(k))).normalize(),S.crossVectors(T,k);const M=S.dot(l[R])<0?-1:1;a.setXYZW(R,y.x,y.y,y.z,M)}for(let R=0,k=v.length;R<k;++R){const x=v[R],M=x.start,P=x.count;for(let I=M,F=M+P;I<F;I+=3)b(e.getX(I+0)),b(e.getX(I+1)),b(e.getX(I+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new fi(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);const i=new Y,s=new Y,a=new Y,o=new Y,l=new Y,c=new Y,h=new Y,f=new Y;if(e)for(let u=0,d=e.count;u<d;u+=3){const g=e.getX(u+0),_=e.getX(u+1),p=e.getX(u+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),h.subVectors(a,s),f.subVectors(i,s),h.cross(f),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,d=t.count;u<d;u+=3)i.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),f.subVectors(i,s),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)$t.fromBufferAttribute(e,t),$t.normalize(),e.setXYZ(t,$t.x,$t.y,$t.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,f=o.normalized,u=new c.constructor(l.length*h);let d=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?d=l[_]*o.data.stride+o.offset:d=l[_]*h;for(let m=0;m<h;m++)u[g++]=c[d++]}return new fi(u,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ni,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,f=c.length;h<f;h++){const u=c[h],d=e(u,n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){const d=c[f];h.push(d.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],f=s[c];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Dd=new kt,Ar=new vu,_o=new Xa,kd=new Y,vo=new Y,yo=new Y,xo=new Y,uc=new Y,bo=new Y,Id=new Y,So=new Y;class wi extends gn{constructor(e=new ni,t=new yu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){bo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],f=s[l];h!==0&&(uc.fromBufferAttribute(f,e),a?bo.addScaledVector(uc,h):bo.addScaledVector(uc.sub(t),h))}t.add(bo)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),_o.copy(n.boundingSphere),_o.applyMatrix4(s),Ar.copy(e.ray).recast(e.near),!(_o.containsPoint(Ar.origin)===!1&&(Ar.intersectSphere(_o,kd)===null||Ar.origin.distanceToSquared(kd)>(e.far-e.near)**2))&&(Dd.copy(s).invert(),Ar.copy(e.ray).applyMatrix4(Dd),!(n.boundingBox!==null&&Ar.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ar)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,f=s.attributes.normal,u=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const p=u[g],m=a[p.materialIndex],v=Math.max(p.start,d.start),y=Math.min(o.count,Math.min(p.start+p.count,d.start+d.count));for(let S=v,A=y;S<A;S+=3){const T=o.getX(S),b=o.getX(S+1),R=o.getX(S+2);i=Mo(this,m,e,n,c,h,f,T,b,R),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const v=o.getX(p),y=o.getX(p+1),S=o.getX(p+2);i=Mo(this,a,e,n,c,h,f,v,y,S),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const p=u[g],m=a[p.materialIndex],v=Math.max(p.start,d.start),y=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let S=v,A=y;S<A;S+=3){const T=S,b=S+1,R=S+2;i=Mo(this,m,e,n,c,h,f,T,b,R),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const v=p,y=p+1,S=p+2;i=Mo(this,a,e,n,c,h,f,v,y,S),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function Lv(r,e,t,n,i,s,a,o){let l;if(e.side===En?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===yr,o),l===null)return null;So.copy(o),So.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(So);return c<t.near||c>t.far?null:{distance:c,point:So.clone(),object:r}}function Mo(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,vo),r.getVertexPosition(l,yo),r.getVertexPosition(c,xo);const h=Lv(r,e,t,n,vo,yo,xo,Id);if(h){const f=new Y;ci.getBarycoord(Id,vo,yo,xo,f),i&&(h.uv=ci.getInterpolatedAttribute(i,o,l,c,f,new xt)),s&&(h.uv1=ci.getInterpolatedAttribute(s,o,l,c,f,new xt)),a&&(h.normal=ci.getInterpolatedAttribute(a,o,l,c,f,new Y),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new Y,materialIndex:0};ci.getNormal(vo,yo,xo,u.normal),h.face=u,h.barycoord=f}return h}class qa extends ni{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],f=[];let u=0,d=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new pi(c,3)),this.setAttribute("normal",new pi(h,3)),this.setAttribute("uv",new pi(f,2));function g(_,p,m,v,y,S,A,T,b,R,k){const x=S/b,M=A/R,P=S/2,I=A/2,F=T/2,q=b+1,z=R+1;let G=0,W=0;const re=new Y;for(let L=0;L<z;L++){const oe=L*M-I;for(let Be=0;Be<q;Be++){const Xe=Be*x-P;re[_]=Xe*v,re[p]=oe*y,re[m]=F,c.push(re.x,re.y,re.z),re[_]=0,re[p]=0,re[m]=T>0?1:-1,h.push(re.x,re.y,re.z),f.push(Be/b),f.push(1-L/R),G+=1}}for(let L=0;L<R;L++)for(let oe=0;oe<b;oe++){const Be=u+oe+q*L,Xe=u+oe+q*(L+1),$=u+(oe+1)+q*(L+1),Q=u+(oe+1)+q*L;l.push(Be,Xe,Q),l.push(Xe,$,Q),W+=6}o.addGroup(d,W,k),d+=W,u+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qa(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ys(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function un(r){const e={};for(let t=0;t<r.length;t++){const n=Ys(r[t]);for(const i in n)e[i]=n[i]}return e}function Dv(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function cm(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:dt.workingColorSpace}const kv={clone:Ys,merge:un};var Iv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Uv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xr extends Ks{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Iv,this.fragmentShader=Uv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ys(e.uniforms),this.uniformsGroups=Dv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class hm extends gn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new kt,this.projectionMatrix=new kt,this.projectionMatrixInverse=new kt,this.coordinateSystem=zi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Qi=new Y,Ud=new xt,Nd=new xt;class jn extends hm{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Lh*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Wl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Lh*2*Math.atan(Math.tan(Wl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z),Qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z)}getViewSize(e,t){return this.getViewBounds(e,Ud,Nd),t.subVectors(Nd,Ud)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Wl*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const _s=-90,vs=1;class Nv extends gn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new jn(_s,vs,e,t);i.layers=this.layers,this.add(i);const s=new jn(_s,vs,e,t);s.layers=this.layers,this.add(s);const a=new jn(_s,vs,e,t);a.layers=this.layers,this.add(a);const o=new jn(_s,vs,e,t);o.layers=this.layers,this.add(o);const l=new jn(_s,vs,e,t);l.layers=this.layers,this.add(l);const c=new jn(_s,vs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===zi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ul)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(f,u,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class um extends An{constructor(e,t,n,i,s,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Vs,super(e,t,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ov extends Qr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new um(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:li}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new qa(5,5,5),s=new xr({name:"CubemapFromEquirect",uniforms:Ys(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:En,blending:dr});s.uniforms.tEquirect.value=t;const a=new wi(i,s),o=t.minFilter;return t.minFilter===Hr&&(t.minFilter=li),new Nv(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}const dc=new Y,Fv=new Y,Bv=new je;class Ir{constructor(e=new Y(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=dc.subVectors(n,t).cross(Fv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(dc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Bv.getNormalMatrix(e),i=this.coplanarPoint(dc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Rr=new Xa,wo=new Y;class dm{constructor(e=new Ir,t=new Ir,n=new Ir,i=new Ir,s=new Ir,a=new Ir){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=zi){const n=this.planes,i=e.elements,s=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],f=i[6],u=i[7],d=i[8],g=i[9],_=i[10],p=i[11],m=i[12],v=i[13],y=i[14],S=i[15];if(n[0].setComponents(l-s,u-c,p-d,S-m).normalize(),n[1].setComponents(l+s,u+c,p+d,S+m).normalize(),n[2].setComponents(l+a,u+h,p+g,S+v).normalize(),n[3].setComponents(l-a,u-h,p-g,S-v).normalize(),n[4].setComponents(l-o,u-f,p-_,S-y).normalize(),t===zi)n[5].setComponents(l+o,u+f,p+_,S+y).normalize();else if(t===ul)n[5].setComponents(o,f,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Rr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Rr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Rr)}intersectsSprite(e){return Rr.center.set(0,0,0),Rr.radius=.7071067811865476,Rr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Rr)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(wo.x=i.normal.x>0?e.max.x:e.min.x,wo.y=i.normal.y>0?e.max.y:e.min.y,wo.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(wo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function fm(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function zv(r){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,f=c.byteLength,u=r.createBuffer();r.bindBuffer(l,u),r.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=r.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=r.SHORT;else if(c instanceof Uint32Array)d=r.UNSIGNED_INT;else if(c instanceof Int32Array)d=r.INT;else if(c instanceof Int8Array)d=r.BYTE;else if(c instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){const h=l.array,f=l.updateRanges;if(r.bindBuffer(c,o),f.length===0)r.bufferSubData(c,0,h);else{f.sort((d,g)=>d.start-g.start);let u=0;for(let d=1;d<f.length;d++){const g=f[u],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,f[u]=_)}f.length=u+1;for(let d=0,g=f.length;d<g;d++){const _=f[d];r.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}class Ml extends ni{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,f=e/o,u=t/l,d=[],g=[],_=[],p=[];for(let m=0;m<h;m++){const v=m*u-a;for(let y=0;y<c;y++){const S=y*f-s;g.push(S,-v,0),_.push(0,0,1),p.push(y/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let v=0;v<o;v++){const y=v+c*m,S=v+c*(m+1),A=v+1+c*(m+1),T=v+1+c*m;d.push(y,S,T),d.push(S,A,T)}this.setIndex(d),this.setAttribute("position",new pi(g,3)),this.setAttribute("normal",new pi(_,3)),this.setAttribute("uv",new pi(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ml(e.width,e.height,e.widthSegments,e.heightSegments)}}var Hv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gv=`#ifdef USE_ALPHAHASH
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
#endif`,Vv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,qv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yv=`#ifdef USE_AOMAP
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
#endif`,$v=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Kv=`#ifdef USE_BATCHING
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
#endif`,jv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Zv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,e0=`#ifdef USE_IRIDESCENCE
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
#endif`,t0=`#ifdef USE_BUMPMAP
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
#endif`,n0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,i0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,r0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,s0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,a0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,o0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,l0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,c0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,h0=`#define PI 3.141592653589793
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
} // validated`,u0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,d0=`vec3 transformedNormal = objectNormal;
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
#endif`,f0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,p0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,m0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,g0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_0="gl_FragColor = linearToOutputTexel( gl_FragColor );",v0=`
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
}`,y0=`#ifdef USE_ENVMAP
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
#endif`,x0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,b0=`#ifdef USE_ENVMAP
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
#endif`,S0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,M0=`#ifdef USE_ENVMAP
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
#endif`,w0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,T0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,E0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,A0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,R0=`#ifdef USE_GRADIENTMAP
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
}`,C0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,P0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,L0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,D0=`uniform bool receiveShadow;
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
#endif`,k0=`#ifdef USE_ENVMAP
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
#endif`,I0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,U0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,N0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,O0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,F0=`PhysicalMaterial material;
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
#endif`,B0=`struct PhysicalMaterial {
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
}`,z0=`
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
#endif`,H0=`#if defined( RE_IndirectDiffuse )
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
#endif`,G0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,V0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,W0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,X0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,q0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Y0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,K0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,j0=`#if defined( USE_POINTS_UV )
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
#endif`,Z0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,J0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Q0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ey=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ty=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ny=`#ifdef USE_MORPHTARGETS
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
#endif`,iy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ry=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,sy=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ay=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,oy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ly=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,cy=`#ifdef USE_NORMALMAP
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
#endif`,hy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,uy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,dy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,py=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,my=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,gy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_y=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,by=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,My=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,wy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ty=`float getShadowMask() {
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
}`,Ey=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ay=`#ifdef USE_SKINNING
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
#endif`,Ry=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Cy=`#ifdef USE_SKINNING
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
#endif`,Py=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ly=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Dy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ky=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Iy=`#ifdef USE_TRANSMISSION
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
#endif`,Uy=`#ifdef USE_TRANSMISSION
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
#endif`,Ny=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Oy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,By=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const zy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Hy=`uniform sampler2D t2D;
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
}`,Gy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Wy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qy=`#include <common>
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
}`,Yy=`#if DEPTH_PACKING == 3200
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
}`,$y=`#define DISTANCE
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
}`,Ky=`#define DISTANCE
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
}`,jy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jy=`uniform float scale;
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
}`,Qy=`uniform vec3 diffuse;
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
}`,ex=`#include <common>
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
}`,tx=`uniform vec3 diffuse;
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
}`,nx=`#define LAMBERT
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
}`,ix=`#define LAMBERT
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
}`,rx=`#define MATCAP
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
}`,sx=`#define MATCAP
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
}`,ax=`#define NORMAL
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
}`,ox=`#define NORMAL
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
}`,lx=`#define PHONG
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
}`,cx=`#define PHONG
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
}`,hx=`#define STANDARD
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
}`,ux=`#define STANDARD
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
}`,dx=`#define TOON
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
}`,fx=`#define TOON
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
}`,px=`uniform float size;
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
}`,mx=`uniform vec3 diffuse;
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
}`,gx=`#include <common>
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
}`,_x=`uniform vec3 color;
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
}`,vx=`uniform float rotation;
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
}`,yx=`uniform vec3 diffuse;
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
}`,Ke={alphahash_fragment:Hv,alphahash_pars_fragment:Gv,alphamap_fragment:Vv,alphamap_pars_fragment:Wv,alphatest_fragment:Xv,alphatest_pars_fragment:qv,aomap_fragment:Yv,aomap_pars_fragment:$v,batching_pars_vertex:Kv,batching_vertex:jv,begin_vertex:Zv,beginnormal_vertex:Jv,bsdfs:Qv,iridescence_fragment:e0,bumpmap_pars_fragment:t0,clipping_planes_fragment:n0,clipping_planes_pars_fragment:i0,clipping_planes_pars_vertex:r0,clipping_planes_vertex:s0,color_fragment:a0,color_pars_fragment:o0,color_pars_vertex:l0,color_vertex:c0,common:h0,cube_uv_reflection_fragment:u0,defaultnormal_vertex:d0,displacementmap_pars_vertex:f0,displacementmap_vertex:p0,emissivemap_fragment:m0,emissivemap_pars_fragment:g0,colorspace_fragment:_0,colorspace_pars_fragment:v0,envmap_fragment:y0,envmap_common_pars_fragment:x0,envmap_pars_fragment:b0,envmap_pars_vertex:S0,envmap_physical_pars_fragment:k0,envmap_vertex:M0,fog_vertex:w0,fog_pars_vertex:T0,fog_fragment:E0,fog_pars_fragment:A0,gradientmap_pars_fragment:R0,lightmap_pars_fragment:C0,lights_lambert_fragment:P0,lights_lambert_pars_fragment:L0,lights_pars_begin:D0,lights_toon_fragment:I0,lights_toon_pars_fragment:U0,lights_phong_fragment:N0,lights_phong_pars_fragment:O0,lights_physical_fragment:F0,lights_physical_pars_fragment:B0,lights_fragment_begin:z0,lights_fragment_maps:H0,lights_fragment_end:G0,logdepthbuf_fragment:V0,logdepthbuf_pars_fragment:W0,logdepthbuf_pars_vertex:X0,logdepthbuf_vertex:q0,map_fragment:Y0,map_pars_fragment:$0,map_particle_fragment:K0,map_particle_pars_fragment:j0,metalnessmap_fragment:Z0,metalnessmap_pars_fragment:J0,morphinstance_vertex:Q0,morphcolor_vertex:ey,morphnormal_vertex:ty,morphtarget_pars_vertex:ny,morphtarget_vertex:iy,normal_fragment_begin:ry,normal_fragment_maps:sy,normal_pars_fragment:ay,normal_pars_vertex:oy,normal_vertex:ly,normalmap_pars_fragment:cy,clearcoat_normal_fragment_begin:hy,clearcoat_normal_fragment_maps:uy,clearcoat_pars_fragment:dy,iridescence_pars_fragment:fy,opaque_fragment:py,packing:my,premultiplied_alpha_fragment:gy,project_vertex:_y,dithering_fragment:vy,dithering_pars_fragment:yy,roughnessmap_fragment:xy,roughnessmap_pars_fragment:by,shadowmap_pars_fragment:Sy,shadowmap_pars_vertex:My,shadowmap_vertex:wy,shadowmask_pars_fragment:Ty,skinbase_vertex:Ey,skinning_pars_vertex:Ay,skinning_vertex:Ry,skinnormal_vertex:Cy,specularmap_fragment:Py,specularmap_pars_fragment:Ly,tonemapping_fragment:Dy,tonemapping_pars_fragment:ky,transmission_fragment:Iy,transmission_pars_fragment:Uy,uv_pars_fragment:Ny,uv_pars_vertex:Oy,uv_vertex:Fy,worldpos_vertex:By,background_vert:zy,background_frag:Hy,backgroundCube_vert:Gy,backgroundCube_frag:Vy,cube_vert:Wy,cube_frag:Xy,depth_vert:qy,depth_frag:Yy,distanceRGBA_vert:$y,distanceRGBA_frag:Ky,equirect_vert:jy,equirect_frag:Zy,linedashed_vert:Jy,linedashed_frag:Qy,meshbasic_vert:ex,meshbasic_frag:tx,meshlambert_vert:nx,meshlambert_frag:ix,meshmatcap_vert:rx,meshmatcap_frag:sx,meshnormal_vert:ax,meshnormal_frag:ox,meshphong_vert:lx,meshphong_frag:cx,meshphysical_vert:hx,meshphysical_frag:ux,meshtoon_vert:dx,meshtoon_frag:fx,points_vert:px,points_frag:mx,shadow_vert:gx,shadow_frag:_x,sprite_vert:vx,sprite_frag:yx},me={common:{diffuse:{value:new ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new ct(16777215)},opacity:{value:1},center:{value:new xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},vi={basic:{uniforms:un([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:un([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new ct(0)}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:un([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new ct(0)},specular:{value:new ct(1118481)},shininess:{value:30}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:un([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:un([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new ct(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:un([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:un([me.points,me.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:un([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:un([me.common,me.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:un([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:un([me.sprite,me.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distanceRGBA:{uniforms:un([me.common,me.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distanceRGBA_vert,fragmentShader:Ke.distanceRGBA_frag},shadow:{uniforms:un([me.lights,me.fog,{color:{value:new ct(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};vi.physical={uniforms:un([vi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new ct(0)},specularColor:{value:new ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const To={r:0,b:0,g:0},Cr=new Xi,xx=new kt;function bx(r,e,t,n,i,s,a){const o=new ct(0);let l=s===!0?0:1,c,h,f=null,u=0,d=null;function g(v){let y=v.isScene===!0?v.background:null;return y&&y.isTexture&&(y=(v.backgroundBlurriness>0?t:e).get(y)),y}function _(v){let y=!1;const S=g(v);S===null?m(o,l):S&&S.isColor&&(m(S,1),y=!0);const A=r.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function p(v,y){const S=g(y);S&&(S.isCubeTexture||S.mapping===bl)?(h===void 0&&(h=new wi(new qa(1,1,1),new xr({name:"BackgroundCubeMaterial",uniforms:Ys(vi.backgroundCube.uniforms),vertexShader:vi.backgroundCube.vertexShader,fragmentShader:vi.backgroundCube.fragmentShader,side:En,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,T,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Cr.copy(y.backgroundRotation),Cr.x*=-1,Cr.y*=-1,Cr.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Cr.y*=-1,Cr.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(xx.makeRotationFromEuler(Cr)),h.material.toneMapped=dt.getTransfer(S.colorSpace)!==Mt,(f!==S||u!==S.version||d!==r.toneMapping)&&(h.material.needsUpdate=!0,f=S,u=S.version,d=r.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new wi(new Ml(2,2),new xr({name:"BackgroundMaterial",uniforms:Ys(vi.background.uniforms),vertexShader:vi.background.vertexShader,fragmentShader:vi.background.fragmentShader,side:yr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=dt.getTransfer(S.colorSpace)!==Mt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(f!==S||u!==S.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,f=S,u=S.version,d=r.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function m(v,y){v.getRGB(To,cm(r)),n.buffers.color.setClear(To.r,To.g,To.b,y,a)}return{getClearColor:function(){return o},setClearColor:function(v,y=1){o.set(v),l=y,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,m(o,l)},render:_,addToRenderList:p}}function Sx(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=u(null);let s=i,a=!1;function o(x,M,P,I,F){let q=!1;const z=f(I,P,M);s!==z&&(s=z,c(s.object)),q=d(x,I,P,F),q&&g(x,I,P,F),F!==null&&e.update(F,r.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,S(x,M,P,I),F!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return r.createVertexArray()}function c(x){return r.bindVertexArray(x)}function h(x){return r.deleteVertexArray(x)}function f(x,M,P){const I=P.wireframe===!0;let F=n[x.id];F===void 0&&(F={},n[x.id]=F);let q=F[M.id];q===void 0&&(q={},F[M.id]=q);let z=q[I];return z===void 0&&(z=u(l()),q[I]=z),z}function u(x){const M=[],P=[],I=[];for(let F=0;F<t;F++)M[F]=0,P[F]=0,I[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:M,enabledAttributes:P,attributeDivisors:I,object:x,attributes:{},index:null}}function d(x,M,P,I){const F=s.attributes,q=M.attributes;let z=0;const G=P.getAttributes();for(const W in G)if(G[W].location>=0){const L=F[W];let oe=q[W];if(oe===void 0&&(W==="instanceMatrix"&&x.instanceMatrix&&(oe=x.instanceMatrix),W==="instanceColor"&&x.instanceColor&&(oe=x.instanceColor)),L===void 0||L.attribute!==oe||oe&&L.data!==oe.data)return!0;z++}return s.attributesNum!==z||s.index!==I}function g(x,M,P,I){const F={},q=M.attributes;let z=0;const G=P.getAttributes();for(const W in G)if(G[W].location>=0){let L=q[W];L===void 0&&(W==="instanceMatrix"&&x.instanceMatrix&&(L=x.instanceMatrix),W==="instanceColor"&&x.instanceColor&&(L=x.instanceColor));const oe={};oe.attribute=L,L&&L.data&&(oe.data=L.data),F[W]=oe,z++}s.attributes=F,s.attributesNum=z,s.index=I}function _(){const x=s.newAttributes;for(let M=0,P=x.length;M<P;M++)x[M]=0}function p(x){m(x,0)}function m(x,M){const P=s.newAttributes,I=s.enabledAttributes,F=s.attributeDivisors;P[x]=1,I[x]===0&&(r.enableVertexAttribArray(x),I[x]=1),F[x]!==M&&(r.vertexAttribDivisor(x,M),F[x]=M)}function v(){const x=s.newAttributes,M=s.enabledAttributes;for(let P=0,I=M.length;P<I;P++)M[P]!==x[P]&&(r.disableVertexAttribArray(P),M[P]=0)}function y(x,M,P,I,F,q,z){z===!0?r.vertexAttribIPointer(x,M,P,F,q):r.vertexAttribPointer(x,M,P,I,F,q)}function S(x,M,P,I){_();const F=I.attributes,q=P.getAttributes(),z=M.defaultAttributeValues;for(const G in q){const W=q[G];if(W.location>=0){let re=F[G];if(re===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(re=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(re=x.instanceColor)),re!==void 0){const L=re.normalized,oe=re.itemSize,Be=e.get(re);if(Be===void 0)continue;const Xe=Be.buffer,$=Be.type,Q=Be.bytesPerElement,de=$===r.INT||$===r.UNSIGNED_INT||re.gpuType===uu;if(re.isInterleavedBufferAttribute){const ae=re.data,Ee=ae.stride,Se=re.offset;if(ae.isInstancedInterleavedBuffer){for(let We=0;We<W.locationSize;We++)m(W.location+We,ae.meshPerAttribute);x.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let We=0;We<W.locationSize;We++)p(W.location+We);r.bindBuffer(r.ARRAY_BUFFER,Xe);for(let We=0;We<W.locationSize;We++)y(W.location+We,oe/W.locationSize,$,L,Ee*Q,(Se+oe/W.locationSize*We)*Q,de)}else{if(re.isInstancedBufferAttribute){for(let ae=0;ae<W.locationSize;ae++)m(W.location+ae,re.meshPerAttribute);x.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ae=0;ae<W.locationSize;ae++)p(W.location+ae);r.bindBuffer(r.ARRAY_BUFFER,Xe);for(let ae=0;ae<W.locationSize;ae++)y(W.location+ae,oe/W.locationSize,$,L,oe*Q,oe/W.locationSize*ae*Q,de)}}else if(z!==void 0){const L=z[G];if(L!==void 0)switch(L.length){case 2:r.vertexAttrib2fv(W.location,L);break;case 3:r.vertexAttrib3fv(W.location,L);break;case 4:r.vertexAttrib4fv(W.location,L);break;default:r.vertexAttrib1fv(W.location,L)}}}}v()}function A(){R();for(const x in n){const M=n[x];for(const P in M){const I=M[P];for(const F in I)h(I[F].object),delete I[F];delete M[P]}delete n[x]}}function T(x){if(n[x.id]===void 0)return;const M=n[x.id];for(const P in M){const I=M[P];for(const F in I)h(I[F].object),delete I[F];delete M[P]}delete n[x.id]}function b(x){for(const M in n){const P=n[M];if(P[x.id]===void 0)continue;const I=P[x.id];for(const F in I)h(I[F].object),delete I[F];delete P[x.id]}}function R(){k(),a=!0,s!==i&&(s=i,c(s.object))}function k(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:R,resetDefaultState:k,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfProgram:b,initAttributes:_,enableAttribute:p,disableUnusedAttributes:v}}function Mx(r,e,t){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,f){f!==0&&(r.drawArraysInstanced(n,c,h,f),t.update(h,n,f))}function o(c,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,f);let d=0;for(let g=0;g<f;g++)d+=h[g];t.update(d,n,1)}function l(c,h,f,u){if(f===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)a(c[g],h[g],u[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,f);let g=0;for(let _=0;_<f;_++)g+=h[_];for(let _=0;_<u.length;_++)t.update(g,n,u[_])}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function wx(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const b=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(b){return!(b!==ui&&n.convert(b)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(b){const R=b===Ha&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(b!==Wi&&n.convert(b)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==Bi&&!R)}function l(b){if(b==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const f=t.logarithmicDepthBuffer===!0,u=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(u===!0){const b=e.get("EXT_clip_control");b.clipControlEXT(b.LOWER_LEFT_EXT,b.ZERO_TO_ONE_EXT)}const d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),p=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),v=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),y=r.getParameter(r.MAX_VARYING_VECTORS),S=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,T=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:u,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:S,vertexTextures:A,maxSamples:T}}function Tx(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new Ir,o=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const d=f.length!==0||u||n!==0||i;return i=u,n=f.length,d},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,d){const g=f.clippingPlanes,_=f.clipIntersection,p=f.clipShadows,m=r.get(f);if(!i||g===null||g.length===0||s&&!p)s?h(null):c();else{const v=s?0:n,y=v*4;let S=m.clippingState||null;l.value=S,S=h(g,u,y,d);for(let A=0;A!==y;++A)S[A]=t[A];m.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,u,d,g){const _=f!==null?f.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const m=d+_*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(p===null||p.length<m)&&(p=new Float32Array(m));for(let y=0,S=d;y!==_;++y,S+=4)a.copy(f[y]).applyMatrix4(v,o),a.normal.toArray(p,S),p[S+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function Ex(r){let e=new WeakMap;function t(a,o){return o===th?a.mapping=Vs:o===nh&&(a.mapping=Ws),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===th||o===nh)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Ov(l.height);return c.fromEquirectangularTexture(r,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Ax extends hm{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ts=4,Od=[.125,.215,.35,.446,.526,.582],Or=20,fc=new Ax,Fd=new ct;let pc=null,mc=0,gc=0,_c=!1;const Ur=(1+Math.sqrt(5))/2,ys=1/Ur,Bd=[new Y(-Ur,ys,0),new Y(Ur,ys,0),new Y(-ys,0,Ur),new Y(ys,0,Ur),new Y(0,Ur,-ys),new Y(0,Ur,ys),new Y(-1,1,-1),new Y(1,1,-1),new Y(-1,1,1),new Y(1,1,1)];class zd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){pc=this._renderer.getRenderTarget(),mc=this._renderer.getActiveCubeFace(),gc=this._renderer.getActiveMipmapLevel(),_c=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Gd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(pc,mc,gc),this._renderer.xr.enabled=_c,e.scissorTest=!1,Eo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Vs||e.mapping===Ws?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),pc=this._renderer.getRenderTarget(),mc=this._renderer.getActiveCubeFace(),gc=this._renderer.getActiveMipmapLevel(),_c=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:li,minFilter:li,generateMipmaps:!1,type:Ha,format:ui,colorSpace:Sr,depthBuffer:!1},i=Hd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Hd(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Rx(s)),this._blurMaterial=Cx(s,e,t)}return i}_compileMaterial(e){const t=new wi(this._lodPlanes[0],e);this._renderer.compile(t,fc)}_sceneToCubeUV(e,t,n,i){const o=new jn(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,u=h.toneMapping;h.getClearColor(Fd),h.toneMapping=fr,h.autoClear=!1;const d=new yu({name:"PMREM.Background",side:En,depthWrite:!1,depthTest:!1}),g=new wi(new qa,d);let _=!1;const p=e.background;p?p.isColor&&(d.color.copy(p),e.background=null,_=!0):(d.color.copy(Fd),_=!0);for(let m=0;m<6;m++){const v=m%3;v===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):v===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));const y=this._cubeSize;Eo(i,v*y,m>2?y:0,y,y),h.setRenderTarget(i),_&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=f,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Vs||e.mapping===Ws;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Gd());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new wi(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Eo(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,fc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Bd[(i-s-1)%Bd.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new wi(this._lodPlanes[i],c),u=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Or-1),_=s/g,p=isFinite(s)?1+Math.floor(h*_):Or;p>Or&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Or}`);const m=[];let v=0;for(let b=0;b<Or;++b){const R=b/_,k=Math.exp(-R*R/2);m.push(k),b===0?v+=k:b<p&&(v+=2*k)}for(let b=0;b<m.length;b++)m[b]=m[b]/v;u.envMap.value=e.texture,u.samples.value=p,u.weights.value=m,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:y}=this;u.dTheta.value=g,u.mipInt.value=y-n;const S=this._sizeLods[i],A=3*S*(i>y-Ts?i-y+Ts:0),T=4*(this._cubeSize-S);Eo(t,A,T,3*S,2*S),l.setRenderTarget(t),l.render(f,fc)}}function Rx(r){const e=[],t=[],n=[];let i=r;const s=r-Ts+1+Od.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);t.push(o);let l=1/o;a>r-Ts?l=Od[a-r+Ts-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,f=1+c,u=[h,h,f,h,f,f,h,h,f,f,h,f],d=6,g=6,_=3,p=2,m=1,v=new Float32Array(_*g*d),y=new Float32Array(p*g*d),S=new Float32Array(m*g*d);for(let T=0;T<d;T++){const b=T%3*2/3-1,R=T>2?0:-1,k=[b,R,0,b+2/3,R,0,b+2/3,R+1,0,b,R,0,b+2/3,R+1,0,b,R+1,0];v.set(k,_*g*T),y.set(u,p*g*T);const x=[T,T,T,T,T,T];S.set(x,m*g*T)}const A=new ni;A.setAttribute("position",new fi(v,_)),A.setAttribute("uv",new fi(y,p)),A.setAttribute("faceIndex",new fi(S,m)),e.push(A),i>Ts&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Hd(r,e,t){const n=new Qr(r,e,t);return n.texture.mapping=bl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Eo(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Cx(r,e,t){const n=new Float32Array(Or),i=new Y(0,1,0);return new xr({name:"SphericalGaussianBlur",defines:{n:Or,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:xu(),fragmentShader:`

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
		`,blending:dr,depthTest:!1,depthWrite:!1})}function Gd(){return new xr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xu(),fragmentShader:`

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
		`,blending:dr,depthTest:!1,depthWrite:!1})}function Vd(){return new xr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:dr,depthTest:!1,depthWrite:!1})}function xu(){return`

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
	`}function Px(r){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===th||l===nh,h=l===Vs||l===Ws;if(c||h){let f=e.get(o);const u=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new zd(r)),f=c?t.fromEquirectangular(o,f):t.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),f.texture;if(f!==void 0)return f.texture;{const d=o.image;return c&&d&&d.height>0||h&&d&&i(d)?(t===null&&(t=new zd(r)),f=c?t.fromEquirectangular(o):t.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),o.addEventListener("dispose",s),f.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Lx(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&$o("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Dx(r,e,t,n){const i={},s=new WeakMap;function a(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);for(const g in u.morphAttributes){const _=u.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)e.remove(_[p])}u.removeEventListener("dispose",a),delete i[u.id];const d=s.get(u);d&&(e.remove(d),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,t.memory.geometries++),u}function l(f){const u=f.attributes;for(const g in u)e.update(u[g],r.ARRAY_BUFFER);const d=f.morphAttributes;for(const g in d){const _=d[g];for(let p=0,m=_.length;p<m;p++)e.update(_[p],r.ARRAY_BUFFER)}}function c(f){const u=[],d=f.index,g=f.attributes.position;let _=0;if(d!==null){const v=d.array;_=d.version;for(let y=0,S=v.length;y<S;y+=3){const A=v[y+0],T=v[y+1],b=v[y+2];u.push(A,T,T,b,b,A)}}else if(g!==void 0){const v=g.array;_=g.version;for(let y=0,S=v.length/3-1;y<S;y+=3){const A=y+0,T=y+1,b=y+2;u.push(A,T,T,b,b,A)}}else return;const p=new(nm(u)?lm:om)(u,1);p.version=_;const m=s.get(f);m&&e.remove(m),s.set(f,p)}function h(f){const u=s.get(f);if(u){const d=f.index;d!==null&&u.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:h}}function kx(r,e,t){let n;function i(u){n=u}let s,a;function o(u){s=u.type,a=u.bytesPerElement}function l(u,d){r.drawElements(n,d,s,u*a),t.update(d,n,1)}function c(u,d,g){g!==0&&(r.drawElementsInstanced(n,d,s,u*a,g),t.update(d,n,g))}function h(u,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,u,0,g);let p=0;for(let m=0;m<g;m++)p+=d[m];t.update(p,n,1)}function f(u,d,g,_){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<u.length;m++)c(u[m]/a,d[m],_[m]);else{p.multiDrawElementsInstancedWEBGL(n,d,0,s,u,0,_,0,g);let m=0;for(let v=0;v<g;v++)m+=d[v];for(let v=0;v<_.length;v++)t.update(m,n,_[v])}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function Ix(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Ux(r,e,t){const n=new WeakMap,i=new Ft;function s(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==f){let x=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",x)};var d=x;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let S=0;g===!0&&(S=1),_===!0&&(S=2),p===!0&&(S=3);let A=o.attributes.position.count*S,T=1;A>e.maxTextureSize&&(T=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const b=new Float32Array(A*T*4*f),R=new rm(b,A,T,f);R.type=Bi,R.needsUpdate=!0;const k=S*4;for(let M=0;M<f;M++){const P=m[M],I=v[M],F=y[M],q=A*T*4*M;for(let z=0;z<P.count;z++){const G=z*k;g===!0&&(i.fromBufferAttribute(P,z),b[q+G+0]=i.x,b[q+G+1]=i.y,b[q+G+2]=i.z,b[q+G+3]=0),_===!0&&(i.fromBufferAttribute(I,z),b[q+G+4]=i.x,b[q+G+5]=i.y,b[q+G+6]=i.z,b[q+G+7]=0),p===!0&&(i.fromBufferAttribute(F,z),b[q+G+8]=i.x,b[q+G+9]=i.y,b[q+G+10]=i.z,b[q+G+11]=F.itemSize===4?i.w:1)}}u={count:f,texture:R,size:new xt(A,T)},n.set(o,u),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const _=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(r,"morphTargetBaseInfluence",_),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}return{update:s}}function Nx(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,f=e.get(l,h);if(i.get(f)!==c&&(e.update(f),i.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return f}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class pm extends An{constructor(e,t,n,i,s,a,o,l,c,h=Is){if(h!==Is&&h!==qs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Is&&(n=Jr),n===void 0&&h===qs&&(n=Xs),super(null,i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Qn,this.minFilter=l!==void 0?l:Qn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const mm=new An,Wd=new pm(1,1),gm=new rm,_m=new bv,vm=new um,Xd=[],qd=[],Yd=new Float32Array(16),$d=new Float32Array(9),Kd=new Float32Array(4);function js(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Xd[i];if(s===void 0&&(s=new Float32Array(i),Xd[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Xt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function qt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function wl(r,e){let t=qd[e];t===void 0&&(t=new Int32Array(e),qd[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Ox(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Fx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;r.uniform2fv(this.addr,e),qt(t,e)}}function Bx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Xt(t,e))return;r.uniform3fv(this.addr,e),qt(t,e)}}function zx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;r.uniform4fv(this.addr,e),qt(t,e)}}function Hx(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,n))return;Kd.set(n),r.uniformMatrix2fv(this.addr,!1,Kd),qt(t,n)}}function Gx(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,n))return;$d.set(n),r.uniformMatrix3fv(this.addr,!1,$d),qt(t,n)}}function Vx(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,n))return;Yd.set(n),r.uniformMatrix4fv(this.addr,!1,Yd),qt(t,n)}}function Wx(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Xx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;r.uniform2iv(this.addr,e),qt(t,e)}}function qx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;r.uniform3iv(this.addr,e),qt(t,e)}}function Yx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;r.uniform4iv(this.addr,e),qt(t,e)}}function $x(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Kx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;r.uniform2uiv(this.addr,e),qt(t,e)}}function jx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;r.uniform3uiv(this.addr,e),qt(t,e)}}function Zx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;r.uniform4uiv(this.addr,e),qt(t,e)}}function Jx(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Wd.compareFunction=tm,s=Wd):s=mm,t.setTexture2D(e||s,i)}function Qx(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||_m,i)}function eb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||vm,i)}function tb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||gm,i)}function nb(r){switch(r){case 5126:return Ox;case 35664:return Fx;case 35665:return Bx;case 35666:return zx;case 35674:return Hx;case 35675:return Gx;case 35676:return Vx;case 5124:case 35670:return Wx;case 35667:case 35671:return Xx;case 35668:case 35672:return qx;case 35669:case 35673:return Yx;case 5125:return $x;case 36294:return Kx;case 36295:return jx;case 36296:return Zx;case 35678:case 36198:case 36298:case 36306:case 35682:return Jx;case 35679:case 36299:case 36307:return Qx;case 35680:case 36300:case 36308:case 36293:return eb;case 36289:case 36303:case 36311:case 36292:return tb}}function ib(r,e){r.uniform1fv(this.addr,e)}function rb(r,e){const t=js(e,this.size,2);r.uniform2fv(this.addr,t)}function sb(r,e){const t=js(e,this.size,3);r.uniform3fv(this.addr,t)}function ab(r,e){const t=js(e,this.size,4);r.uniform4fv(this.addr,t)}function ob(r,e){const t=js(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function lb(r,e){const t=js(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function cb(r,e){const t=js(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function hb(r,e){r.uniform1iv(this.addr,e)}function ub(r,e){r.uniform2iv(this.addr,e)}function db(r,e){r.uniform3iv(this.addr,e)}function fb(r,e){r.uniform4iv(this.addr,e)}function pb(r,e){r.uniform1uiv(this.addr,e)}function mb(r,e){r.uniform2uiv(this.addr,e)}function gb(r,e){r.uniform3uiv(this.addr,e)}function _b(r,e){r.uniform4uiv(this.addr,e)}function vb(r,e,t){const n=this.cache,i=e.length,s=wl(t,i);Xt(n,s)||(r.uniform1iv(this.addr,s),qt(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||mm,s[a])}function yb(r,e,t){const n=this.cache,i=e.length,s=wl(t,i);Xt(n,s)||(r.uniform1iv(this.addr,s),qt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||_m,s[a])}function xb(r,e,t){const n=this.cache,i=e.length,s=wl(t,i);Xt(n,s)||(r.uniform1iv(this.addr,s),qt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||vm,s[a])}function bb(r,e,t){const n=this.cache,i=e.length,s=wl(t,i);Xt(n,s)||(r.uniform1iv(this.addr,s),qt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||gm,s[a])}function Sb(r){switch(r){case 5126:return ib;case 35664:return rb;case 35665:return sb;case 35666:return ab;case 35674:return ob;case 35675:return lb;case 35676:return cb;case 5124:case 35670:return hb;case 35667:case 35671:return ub;case 35668:case 35672:return db;case 35669:case 35673:return fb;case 5125:return pb;case 36294:return mb;case 36295:return gb;case 36296:return _b;case 35678:case 36198:case 36298:case 36306:case 35682:return vb;case 35679:case 36299:case 36307:return yb;case 35680:case 36300:case 36308:case 36293:return xb;case 36289:case 36303:case 36311:case 36292:return bb}}class Mb{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=nb(t.type)}}class wb{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Sb(t.type)}}class Tb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const vc=/(\w+)(\])?(\[|\.)?/g;function jd(r,e){r.seq.push(e),r.map[e.id]=e}function Eb(r,e,t){const n=r.name,i=n.length;for(vc.lastIndex=0;;){const s=vc.exec(n),a=vc.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){jd(t,c===void 0?new Mb(o,r,e):new wb(o,r,e));break}else{let f=t.map[o];f===void 0&&(f=new Tb(o),jd(t,f)),t=f}}}class Ko{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),a=e.getUniformLocation(t,s.name);Eb(s,a,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Zd(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const Ab=37297;let Rb=0;function Cb(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Pb(r){const e=dt.getPrimaries(dt.workingColorSpace),t=dt.getPrimaries(r);let n;switch(e===t?n="":e===hl&&t===cl?n="LinearDisplayP3ToLinearSRGB":e===cl&&t===hl&&(n="LinearSRGBToLinearDisplayP3"),r){case Sr:case Sl:return[n,"LinearTransferOETF"];case _i:case _u:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Jd(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+Cb(r.getShaderSource(e),a)}else return i}function Lb(r,e){const t=Pb(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Db(r,e){let t;switch(e){case q_:t="Linear";break;case Y_:t="Reinhard";break;case $_:t="Cineon";break;case K_:t="ACESFilmic";break;case Z_:t="AgX";break;case J_:t="Neutral";break;case j_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ao=new Y;function kb(){dt.getLuminanceCoefficients(Ao);const r=Ao.x.toFixed(4),e=Ao.y.toFixed(4),t=Ao.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ib(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(pa).join(`
`)}function Ub(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Nb(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function pa(r){return r!==""}function Qd(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ef(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ob=/^[ \t]*#include +<([\w\d./]+)>/gm;function Dh(r){return r.replace(Ob,Bb)}const Fb=new Map;function Bb(r,e){let t=Ke[e];if(t===void 0){const n=Fb.get(e);if(n!==void 0)t=Ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Dh(t)}const zb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tf(r){return r.replace(zb,Hb)}function Hb(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function nf(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function Gb(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Gp?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===T_?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Di&&(e="SHADOWMAP_TYPE_VSM"),e}function Vb(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Vs:case Ws:e="ENVMAP_TYPE_CUBE";break;case bl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Wb(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Ws:e="ENVMAP_MODE_REFRACTION";break}return e}function Xb(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Vp:e="ENVMAP_BLENDING_MULTIPLY";break;case W_:e="ENVMAP_BLENDING_MIX";break;case X_:e="ENVMAP_BLENDING_ADD";break}return e}function qb(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Yb(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Gb(t),c=Vb(t),h=Wb(t),f=Xb(t),u=qb(t),d=Ib(t),g=Ub(s),_=i.createProgram();let p,m,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(pa).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(pa).join(`
`),m.length>0&&(m+=`
`)):(p=[nf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pa).join(`
`),m=[nf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==fr?"#define TONE_MAPPING":"",t.toneMapping!==fr?Ke.tonemapping_pars_fragment:"",t.toneMapping!==fr?Db("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,Lb("linearToOutputTexel",t.outputColorSpace),kb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(pa).join(`
`)),a=Dh(a),a=Qd(a,t),a=ef(a,t),o=Dh(o),o=Qd(o,t),o=ef(o,t),a=tf(a),o=tf(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===yd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===yd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const y=v+p+a,S=v+m+o,A=Zd(i,i.VERTEX_SHADER,y),T=Zd(i,i.FRAGMENT_SHADER,S);i.attachShader(_,A),i.attachShader(_,T),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function b(M){if(r.debug.checkShaderErrors){const P=i.getProgramInfoLog(_).trim(),I=i.getShaderInfoLog(A).trim(),F=i.getShaderInfoLog(T).trim();let q=!0,z=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,A,T);else{const G=Jd(i,A,"vertex"),W=Jd(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+M.name+`
Material Type: `+M.type+`

Program Info Log: `+P+`
`+G+`
`+W)}else P!==""?console.warn("THREE.WebGLProgram: Program Info Log:",P):(I===""||F==="")&&(z=!1);z&&(M.diagnostics={runnable:q,programLog:P,vertexShader:{log:I,prefix:p},fragmentShader:{log:F,prefix:m}})}i.deleteShader(A),i.deleteShader(T),R=new Ko(i,_),k=Nb(i,_)}let R;this.getUniforms=function(){return R===void 0&&b(this),R};let k;this.getAttributes=function(){return k===void 0&&b(this),k};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=i.getProgramParameter(_,Ab)),x},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Rb++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=T,this}let $b=0;class Kb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new jb(e),t.set(e,n)),n}}class jb{constructor(e){this.id=$b++,this.code=e,this.usedTimes=0}}function Zb(r,e,t,n,i,s,a){const o=new sm,l=new Kb,c=new Set,h=[],f=i.logarithmicDepthBuffer,u=i.reverseDepthBuffer,d=i.vertexTextures;let g=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return c.add(x),x===0?"uv":`uv${x}`}function m(x,M,P,I,F){const q=I.fog,z=F.geometry,G=x.isMeshStandardMaterial?I.environment:null,W=(x.isMeshStandardMaterial?t:e).get(x.envMap||G),re=W&&W.mapping===bl?W.image.height:null,L=_[x.type];x.precision!==null&&(g=i.getMaxPrecision(x.precision),g!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",g,"instead."));const oe=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Be=oe!==void 0?oe.length:0;let Xe=0;z.morphAttributes.position!==void 0&&(Xe=1),z.morphAttributes.normal!==void 0&&(Xe=2),z.morphAttributes.color!==void 0&&(Xe=3);let $,Q,de,ae;if(L){const Re=vi[L];$=Re.vertexShader,Q=Re.fragmentShader}else $=x.vertexShader,Q=x.fragmentShader,l.update(x),de=l.getVertexShaderID(x),ae=l.getFragmentShaderID(x);const Ee=r.getRenderTarget(),Se=F.isInstancedMesh===!0,We=F.isBatchedMesh===!0,Ve=!!x.map,Ue=!!x.matcap,D=!!W,rt=!!x.aoMap,Ne=!!x.lightMap,ze=!!x.bumpMap,B=!!x.normalMap,Ze=!!x.displacementMap,Le=!!x.emissiveMap,C=!!x.metalnessMap,w=!!x.roughnessMap,X=x.anisotropy>0,Z=x.clearcoat>0,te=x.dispersion>0,j=x.iridescence>0,xe=x.sheen>0,ie=x.transmission>0,fe=X&&!!x.anisotropyMap,Ge=Z&&!!x.clearcoatMap,ne=Z&&!!x.clearcoatNormalMap,ve=Z&&!!x.clearcoatRoughnessMap,ye=j&&!!x.iridescenceMap,ke=j&&!!x.iridescenceThicknessMap,_e=xe&&!!x.sheenColorMap,qe=xe&&!!x.sheenRoughnessMap,Oe=!!x.specularMap,st=!!x.specularColorMap,U=!!x.specularIntensityMap,ee=ie&&!!x.transmissionMap,K=ie&&!!x.thicknessMap,J=!!x.gradientMap,le=!!x.alphaMap,ce=x.alphaTest>0,Ye=!!x.alphaHash,gt=!!x.extensions;let wt=fr;x.toneMapped&&(Ee===null||Ee.isXRRenderTarget===!0)&&(wt=r.toneMapping);const nt={shaderID:L,shaderType:x.type,shaderName:x.name,vertexShader:$,fragmentShader:Q,defines:x.defines,customVertexShaderID:de,customFragmentShaderID:ae,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:g,batching:We,batchingColor:We&&F._colorsTexture!==null,instancing:Se,instancingColor:Se&&F.instanceColor!==null,instancingMorph:Se&&F.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Ee===null?r.outputColorSpace:Ee.isXRRenderTarget===!0?Ee.texture.colorSpace:Sr,alphaToCoverage:!!x.alphaToCoverage,map:Ve,matcap:Ue,envMap:D,envMapMode:D&&W.mapping,envMapCubeUVHeight:re,aoMap:rt,lightMap:Ne,bumpMap:ze,normalMap:B,displacementMap:d&&Ze,emissiveMap:Le,normalMapObjectSpace:B&&x.normalMapType===iv,normalMapTangentSpace:B&&x.normalMapType===nv,metalnessMap:C,roughnessMap:w,anisotropy:X,anisotropyMap:fe,clearcoat:Z,clearcoatMap:Ge,clearcoatNormalMap:ne,clearcoatRoughnessMap:ve,dispersion:te,iridescence:j,iridescenceMap:ye,iridescenceThicknessMap:ke,sheen:xe,sheenColorMap:_e,sheenRoughnessMap:qe,specularMap:Oe,specularColorMap:st,specularIntensityMap:U,transmission:ie,transmissionMap:ee,thicknessMap:K,gradientMap:J,opaque:x.transparent===!1&&x.blending===ks&&x.alphaToCoverage===!1,alphaMap:le,alphaTest:ce,alphaHash:Ye,combine:x.combine,mapUv:Ve&&p(x.map.channel),aoMapUv:rt&&p(x.aoMap.channel),lightMapUv:Ne&&p(x.lightMap.channel),bumpMapUv:ze&&p(x.bumpMap.channel),normalMapUv:B&&p(x.normalMap.channel),displacementMapUv:Ze&&p(x.displacementMap.channel),emissiveMapUv:Le&&p(x.emissiveMap.channel),metalnessMapUv:C&&p(x.metalnessMap.channel),roughnessMapUv:w&&p(x.roughnessMap.channel),anisotropyMapUv:fe&&p(x.anisotropyMap.channel),clearcoatMapUv:Ge&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:ne&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:ke&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:qe&&p(x.sheenRoughnessMap.channel),specularMapUv:Oe&&p(x.specularMap.channel),specularColorMapUv:st&&p(x.specularColorMap.channel),specularIntensityMapUv:U&&p(x.specularIntensityMap.channel),transmissionMapUv:ee&&p(x.transmissionMap.channel),thicknessMapUv:K&&p(x.thicknessMap.channel),alphaMapUv:le&&p(x.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(B||X),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!z.attributes.uv&&(Ve||le),fog:!!q,useFog:x.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:u,skinning:F.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Be,morphTextureStride:Xe,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:wt,decodeVideoTexture:Ve&&x.map.isVideoTexture===!0&&dt.getTransfer(x.map.colorSpace)===Mt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Oi,flipSided:x.side===En,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:gt&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(gt&&x.extensions.multiDraw===!0||We)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return nt.vertexUv1s=c.has(1),nt.vertexUv2s=c.has(2),nt.vertexUv3s=c.has(3),c.clear(),nt}function v(x){const M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(const P in x.defines)M.push(P),M.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(y(M,x),S(M,x),M.push(r.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function y(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapCubeUVHeight),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.morphAttributeCount),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function S(x,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),x.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.alphaToCoverage&&o.enable(20),x.push(o.mask)}function A(x){const M=_[x.type];let P;if(M){const I=vi[M];P=kv.clone(I.uniforms)}else P=x.uniforms;return P}function T(x,M){let P;for(let I=0,F=h.length;I<F;I++){const q=h[I];if(q.cacheKey===M){P=q,++P.usedTimes;break}}return P===void 0&&(P=new Yb(r,M,x,s),h.push(P)),P}function b(x){if(--x.usedTimes===0){const M=h.indexOf(x);h[M]=h[h.length-1],h.pop(),x.destroy()}}function R(x){l.remove(x)}function k(){l.dispose()}return{getParameters:m,getProgramCacheKey:v,getUniforms:A,acquireProgram:T,releaseProgram:b,releaseShaderCache:R,programs:h,dispose:k}}function Jb(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function Qb(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function rf(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function sf(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(f,u,d,g,_,p){let m=r[e];return m===void 0?(m={id:f.id,object:f,geometry:u,material:d,groupOrder:g,renderOrder:f.renderOrder,z:_,group:p},r[e]=m):(m.id=f.id,m.object=f,m.geometry=u,m.material=d,m.groupOrder=g,m.renderOrder=f.renderOrder,m.z=_,m.group=p),e++,m}function o(f,u,d,g,_,p){const m=a(f,u,d,g,_,p);d.transmission>0?n.push(m):d.transparent===!0?i.push(m):t.push(m)}function l(f,u,d,g,_,p){const m=a(f,u,d,g,_,p);d.transmission>0?n.unshift(m):d.transparent===!0?i.unshift(m):t.unshift(m)}function c(f,u){t.length>1&&t.sort(f||Qb),n.length>1&&n.sort(u||rf),i.length>1&&i.sort(u||rf)}function h(){for(let f=e,u=r.length;f<u;f++){const d=r[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:h,sort:c}}function eS(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new sf,r.set(n,[a])):i>=s.length?(a=new sf,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function tS(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Y,color:new ct};break;case"SpotLight":t={position:new Y,direction:new Y,color:new ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Y,color:new ct,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Y,skyColor:new ct,groundColor:new ct};break;case"RectAreaLight":t={color:new ct,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return r[e.id]=t,t}}}function nS(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let iS=0;function rS(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function sS(r){const e=new tS,t=nS(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new Y);const i=new Y,s=new kt,a=new kt;function o(c){let h=0,f=0,u=0;for(let k=0;k<9;k++)n.probe[k].set(0,0,0);let d=0,g=0,_=0,p=0,m=0,v=0,y=0,S=0,A=0,T=0,b=0;c.sort(rS);for(let k=0,x=c.length;k<x;k++){const M=c[k],P=M.color,I=M.intensity,F=M.distance,q=M.shadow&&M.shadow.map?M.shadow.map.texture:null;if(M.isAmbientLight)h+=P.r*I,f+=P.g*I,u+=P.b*I;else if(M.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(M.sh.coefficients[z],I);b++}else if(M.isDirectionalLight){const z=e.get(M);if(z.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){const G=M.shadow,W=t.get(M);W.shadowIntensity=G.intensity,W.shadowBias=G.bias,W.shadowNormalBias=G.normalBias,W.shadowRadius=G.radius,W.shadowMapSize=G.mapSize,n.directionalShadow[d]=W,n.directionalShadowMap[d]=q,n.directionalShadowMatrix[d]=M.shadow.matrix,v++}n.directional[d]=z,d++}else if(M.isSpotLight){const z=e.get(M);z.position.setFromMatrixPosition(M.matrixWorld),z.color.copy(P).multiplyScalar(I),z.distance=F,z.coneCos=Math.cos(M.angle),z.penumbraCos=Math.cos(M.angle*(1-M.penumbra)),z.decay=M.decay,n.spot[_]=z;const G=M.shadow;if(M.map&&(n.spotLightMap[A]=M.map,A++,G.updateMatrices(M),M.castShadow&&T++),n.spotLightMatrix[_]=G.matrix,M.castShadow){const W=t.get(M);W.shadowIntensity=G.intensity,W.shadowBias=G.bias,W.shadowNormalBias=G.normalBias,W.shadowRadius=G.radius,W.shadowMapSize=G.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=q,S++}_++}else if(M.isRectAreaLight){const z=e.get(M);z.color.copy(P).multiplyScalar(I),z.halfWidth.set(M.width*.5,0,0),z.halfHeight.set(0,M.height*.5,0),n.rectArea[p]=z,p++}else if(M.isPointLight){const z=e.get(M);if(z.color.copy(M.color).multiplyScalar(M.intensity),z.distance=M.distance,z.decay=M.decay,M.castShadow){const G=M.shadow,W=t.get(M);W.shadowIntensity=G.intensity,W.shadowBias=G.bias,W.shadowNormalBias=G.normalBias,W.shadowRadius=G.radius,W.shadowMapSize=G.mapSize,W.shadowCameraNear=G.camera.near,W.shadowCameraFar=G.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=q,n.pointShadowMatrix[g]=M.shadow.matrix,y++}n.point[g]=z,g++}else if(M.isHemisphereLight){const z=e.get(M);z.skyColor.copy(M.color).multiplyScalar(I),z.groundColor.copy(M.groundColor).multiplyScalar(I),n.hemi[m]=z,m++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;const R=n.hash;(R.directionalLength!==d||R.pointLength!==g||R.spotLength!==_||R.rectAreaLength!==p||R.hemiLength!==m||R.numDirectionalShadows!==v||R.numPointShadows!==y||R.numSpotShadows!==S||R.numSpotMaps!==A||R.numLightProbes!==b)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=S+A-T,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=b,R.directionalLength=d,R.pointLength=g,R.spotLength=_,R.rectAreaLength=p,R.hemiLength=m,R.numDirectionalShadows=v,R.numPointShadows=y,R.numSpotShadows=S,R.numSpotMaps=A,R.numLightProbes=b,n.version=iS++)}function l(c,h){let f=0,u=0,d=0,g=0,_=0;const p=h.matrixWorldInverse;for(let m=0,v=c.length;m<v;m++){const y=c[m];if(y.isDirectionalLight){const S=n.directional[f];S.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(p),f++}else if(y.isSpotLight){const S=n.spot[d];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(p),d++}else if(y.isRectAreaLight){const S=n.rectArea[g];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(p),a.identity(),s.copy(y.matrixWorld),s.premultiply(p),a.extractRotation(s),S.halfWidth.set(y.width*.5,0,0),S.halfHeight.set(0,y.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),g++}else if(y.isPointLight){const S=n.point[u];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(p),u++}else if(y.isHemisphereLight){const S=n.hemi[_];S.direction.setFromMatrixPosition(y.matrixWorld),S.direction.transformDirection(p),_++}}}return{setup:o,setupView:l,state:n}}function af(r){const e=new sS(r),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function aS(r){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new af(r),e.set(i,[o])):s>=a.length?(o=new af(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class oS extends Ks{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ev,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class lS extends Ks{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const cS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hS=`uniform sampler2D shadow_pass;
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
}`;function uS(r,e,t){let n=new dm;const i=new xt,s=new xt,a=new Ft,o=new oS({depthPacking:tv}),l=new lS,c={},h=t.maxTextureSize,f={[yr]:En,[En]:yr,[Oi]:Oi},u=new xr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xt},radius:{value:4}},vertexShader:cS,fragmentShader:hS}),d=u.clone();d.defines.HORIZONTAL_PASS=1;const g=new ni;g.setAttribute("position",new fi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new wi(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gp;let m=this.type;this.render=function(T,b,R){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const k=r.getRenderTarget(),x=r.getActiveCubeFace(),M=r.getActiveMipmapLevel(),P=r.state;P.setBlending(dr),P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const I=m!==Di&&this.type===Di,F=m===Di&&this.type!==Di;for(let q=0,z=T.length;q<z;q++){const G=T[q],W=G.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const re=W.getFrameExtents();if(i.multiply(re),s.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/re.x),i.x=s.x*re.x,W.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/re.y),i.y=s.y*re.y,W.mapSize.y=s.y)),W.map===null||I===!0||F===!0){const oe=this.type!==Di?{minFilter:Qn,magFilter:Qn}:{};W.map!==null&&W.map.dispose(),W.map=new Qr(i.x,i.y,oe),W.map.texture.name=G.name+".shadowMap",W.camera.updateProjectionMatrix()}r.setRenderTarget(W.map),r.clear();const L=W.getViewportCount();for(let oe=0;oe<L;oe++){const Be=W.getViewport(oe);a.set(s.x*Be.x,s.y*Be.y,s.x*Be.z,s.y*Be.w),P.viewport(a),W.updateMatrices(G,oe),n=W.getFrustum(),S(b,R,W.camera,G,this.type)}W.isPointLightShadow!==!0&&this.type===Di&&v(W,R),W.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(k,x,M)};function v(T,b){const R=e.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Qr(i.x,i.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(b,null,R,u,_,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(b,null,R,d,_,null)}function y(T,b,R,k){let x=null;const M=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(M!==void 0)x=M;else if(x=R.isPointLight===!0?l:o,r.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const P=x.uuid,I=b.uuid;let F=c[P];F===void 0&&(F={},c[P]=F);let q=F[I];q===void 0&&(q=x.clone(),F[I]=q,b.addEventListener("dispose",A)),x=q}if(x.visible=b.visible,x.wireframe=b.wireframe,k===Di?x.side=b.shadowSide!==null?b.shadowSide:b.side:x.side=b.shadowSide!==null?b.shadowSide:f[b.side],x.alphaMap=b.alphaMap,x.alphaTest=b.alphaTest,x.map=b.map,x.clipShadows=b.clipShadows,x.clippingPlanes=b.clippingPlanes,x.clipIntersection=b.clipIntersection,x.displacementMap=b.displacementMap,x.displacementScale=b.displacementScale,x.displacementBias=b.displacementBias,x.wireframeLinewidth=b.wireframeLinewidth,x.linewidth=b.linewidth,R.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const P=r.properties.get(x);P.light=R}return x}function S(T,b,R,k,x){if(T.visible===!1)return;if(T.layers.test(b.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&x===Di)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);const I=e.update(T),F=T.material;if(Array.isArray(F)){const q=I.groups;for(let z=0,G=q.length;z<G;z++){const W=q[z],re=F[W.materialIndex];if(re&&re.visible){const L=y(T,re,k,x);T.onBeforeShadow(r,T,b,R,I,L,W),r.renderBufferDirect(R,null,I,L,T,W),T.onAfterShadow(r,T,b,R,I,L,W)}}}else if(F.visible){const q=y(T,F,k,x);T.onBeforeShadow(r,T,b,R,I,q,null),r.renderBufferDirect(R,null,I,q,T,null),T.onAfterShadow(r,T,b,R,I,q,null)}}const P=T.children;for(let I=0,F=P.length;I<F;I++)S(P[I],b,R,k,x)}function A(T){T.target.removeEventListener("dispose",A);for(const R in c){const k=c[R],x=T.target.uuid;x in k&&(k[x].dispose(),delete k[x])}}}const dS={[$c]:Kc,[jc]:Qc,[Zc]:eh,[Gs]:Jc,[Kc]:$c,[Qc]:jc,[eh]:Zc,[Jc]:Gs};function fS(r){function e(){let U=!1;const ee=new Ft;let K=null;const J=new Ft(0,0,0,0);return{setMask:function(le){K!==le&&!U&&(r.colorMask(le,le,le,le),K=le)},setLocked:function(le){U=le},setClear:function(le,ce,Ye,gt,wt){wt===!0&&(le*=gt,ce*=gt,Ye*=gt),ee.set(le,ce,Ye,gt),J.equals(ee)===!1&&(r.clearColor(le,ce,Ye,gt),J.copy(ee))},reset:function(){U=!1,K=null,J.set(-1,0,0,0)}}}function t(){let U=!1,ee=!1,K=null,J=null,le=null;return{setReversed:function(ce){ee=ce},setTest:function(ce){ce?de(r.DEPTH_TEST):ae(r.DEPTH_TEST)},setMask:function(ce){K!==ce&&!U&&(r.depthMask(ce),K=ce)},setFunc:function(ce){if(ee&&(ce=dS[ce]),J!==ce){switch(ce){case $c:r.depthFunc(r.NEVER);break;case Kc:r.depthFunc(r.ALWAYS);break;case jc:r.depthFunc(r.LESS);break;case Gs:r.depthFunc(r.LEQUAL);break;case Zc:r.depthFunc(r.EQUAL);break;case Jc:r.depthFunc(r.GEQUAL);break;case Qc:r.depthFunc(r.GREATER);break;case eh:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}J=ce}},setLocked:function(ce){U=ce},setClear:function(ce){le!==ce&&(r.clearDepth(ce),le=ce)},reset:function(){U=!1,K=null,J=null,le=null}}}function n(){let U=!1,ee=null,K=null,J=null,le=null,ce=null,Ye=null,gt=null,wt=null;return{setTest:function(nt){U||(nt?de(r.STENCIL_TEST):ae(r.STENCIL_TEST))},setMask:function(nt){ee!==nt&&!U&&(r.stencilMask(nt),ee=nt)},setFunc:function(nt,Re,Me){(K!==nt||J!==Re||le!==Me)&&(r.stencilFunc(nt,Re,Me),K=nt,J=Re,le=Me)},setOp:function(nt,Re,Me){(ce!==nt||Ye!==Re||gt!==Me)&&(r.stencilOp(nt,Re,Me),ce=nt,Ye=Re,gt=Me)},setLocked:function(nt){U=nt},setClear:function(nt){wt!==nt&&(r.clearStencil(nt),wt=nt)},reset:function(){U=!1,ee=null,K=null,J=null,le=null,ce=null,Ye=null,gt=null,wt=null}}}const i=new e,s=new t,a=new n,o=new WeakMap,l=new WeakMap;let c={},h={},f=new WeakMap,u=[],d=null,g=!1,_=null,p=null,m=null,v=null,y=null,S=null,A=null,T=new ct(0,0,0),b=0,R=!1,k=null,x=null,M=null,P=null,I=null;const F=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,z=0;const G=r.getParameter(r.VERSION);G.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(G)[1]),q=z>=1):G.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),q=z>=2);let W=null,re={};const L=r.getParameter(r.SCISSOR_BOX),oe=r.getParameter(r.VIEWPORT),Be=new Ft().fromArray(L),Xe=new Ft().fromArray(oe);function $(U,ee,K,J){const le=new Uint8Array(4),ce=r.createTexture();r.bindTexture(U,ce),r.texParameteri(U,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(U,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ye=0;Ye<K;Ye++)U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY?r.texImage3D(ee,0,r.RGBA,1,1,J,0,r.RGBA,r.UNSIGNED_BYTE,le):r.texImage2D(ee+Ye,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,le);return ce}const Q={};Q[r.TEXTURE_2D]=$(r.TEXTURE_2D,r.TEXTURE_2D,1),Q[r.TEXTURE_CUBE_MAP]=$(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[r.TEXTURE_2D_ARRAY]=$(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Q[r.TEXTURE_3D]=$(r.TEXTURE_3D,r.TEXTURE_3D,1,1),i.setClear(0,0,0,1),s.setClear(1),a.setClear(0),de(r.DEPTH_TEST),s.setFunc(Gs),Ne(!1),ze(fd),de(r.CULL_FACE),D(dr);function de(U){c[U]!==!0&&(r.enable(U),c[U]=!0)}function ae(U){c[U]!==!1&&(r.disable(U),c[U]=!1)}function Ee(U,ee){return h[U]!==ee?(r.bindFramebuffer(U,ee),h[U]=ee,U===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=ee),U===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=ee),!0):!1}function Se(U,ee){let K=u,J=!1;if(U){K=f.get(ee),K===void 0&&(K=[],f.set(ee,K));const le=U.textures;if(K.length!==le.length||K[0]!==r.COLOR_ATTACHMENT0){for(let ce=0,Ye=le.length;ce<Ye;ce++)K[ce]=r.COLOR_ATTACHMENT0+ce;K.length=le.length,J=!0}}else K[0]!==r.BACK&&(K[0]=r.BACK,J=!0);J&&r.drawBuffers(K)}function We(U){return d!==U?(r.useProgram(U),d=U,!0):!1}const Ve={[Nr]:r.FUNC_ADD,[A_]:r.FUNC_SUBTRACT,[R_]:r.FUNC_REVERSE_SUBTRACT};Ve[C_]=r.MIN,Ve[P_]=r.MAX;const Ue={[L_]:r.ZERO,[D_]:r.ONE,[k_]:r.SRC_COLOR,[qc]:r.SRC_ALPHA,[B_]:r.SRC_ALPHA_SATURATE,[O_]:r.DST_COLOR,[U_]:r.DST_ALPHA,[I_]:r.ONE_MINUS_SRC_COLOR,[Yc]:r.ONE_MINUS_SRC_ALPHA,[F_]:r.ONE_MINUS_DST_COLOR,[N_]:r.ONE_MINUS_DST_ALPHA,[z_]:r.CONSTANT_COLOR,[H_]:r.ONE_MINUS_CONSTANT_COLOR,[G_]:r.CONSTANT_ALPHA,[V_]:r.ONE_MINUS_CONSTANT_ALPHA};function D(U,ee,K,J,le,ce,Ye,gt,wt,nt){if(U===dr){g===!0&&(ae(r.BLEND),g=!1);return}if(g===!1&&(de(r.BLEND),g=!0),U!==E_){if(U!==_||nt!==R){if((p!==Nr||y!==Nr)&&(r.blendEquation(r.FUNC_ADD),p=Nr,y=Nr),nt)switch(U){case ks:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case pd:r.blendFunc(r.ONE,r.ONE);break;case md:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case gd:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case ks:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case pd:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case md:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case gd:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}m=null,v=null,S=null,A=null,T.set(0,0,0),b=0,_=U,R=nt}return}le=le||ee,ce=ce||K,Ye=Ye||J,(ee!==p||le!==y)&&(r.blendEquationSeparate(Ve[ee],Ve[le]),p=ee,y=le),(K!==m||J!==v||ce!==S||Ye!==A)&&(r.blendFuncSeparate(Ue[K],Ue[J],Ue[ce],Ue[Ye]),m=K,v=J,S=ce,A=Ye),(gt.equals(T)===!1||wt!==b)&&(r.blendColor(gt.r,gt.g,gt.b,wt),T.copy(gt),b=wt),_=U,R=!1}function rt(U,ee){U.side===Oi?ae(r.CULL_FACE):de(r.CULL_FACE);let K=U.side===En;ee&&(K=!K),Ne(K),U.blending===ks&&U.transparent===!1?D(dr):D(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),s.setFunc(U.depthFunc),s.setTest(U.depthTest),s.setMask(U.depthWrite),i.setMask(U.colorWrite);const J=U.stencilWrite;a.setTest(J),J&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ze(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?de(r.SAMPLE_ALPHA_TO_COVERAGE):ae(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(U){k!==U&&(U?r.frontFace(r.CW):r.frontFace(r.CCW),k=U)}function ze(U){U!==M_?(de(r.CULL_FACE),U!==x&&(U===fd?r.cullFace(r.BACK):U===w_?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ae(r.CULL_FACE),x=U}function B(U){U!==M&&(q&&r.lineWidth(U),M=U)}function Ze(U,ee,K){U?(de(r.POLYGON_OFFSET_FILL),(P!==ee||I!==K)&&(r.polygonOffset(ee,K),P=ee,I=K)):ae(r.POLYGON_OFFSET_FILL)}function Le(U){U?de(r.SCISSOR_TEST):ae(r.SCISSOR_TEST)}function C(U){U===void 0&&(U=r.TEXTURE0+F-1),W!==U&&(r.activeTexture(U),W=U)}function w(U,ee,K){K===void 0&&(W===null?K=r.TEXTURE0+F-1:K=W);let J=re[K];J===void 0&&(J={type:void 0,texture:void 0},re[K]=J),(J.type!==U||J.texture!==ee)&&(W!==K&&(r.activeTexture(K),W=K),r.bindTexture(U,ee||Q[U]),J.type=U,J.texture=ee)}function X(){const U=re[W];U!==void 0&&U.type!==void 0&&(r.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Z(){try{r.compressedTexImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function te(){try{r.compressedTexImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function j(){try{r.texSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function xe(){try{r.texSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ie(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function fe(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ge(){try{r.texStorage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ne(){try{r.texStorage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ve(){try{r.texImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ye(){try{r.texImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ke(U){Be.equals(U)===!1&&(r.scissor(U.x,U.y,U.z,U.w),Be.copy(U))}function _e(U){Xe.equals(U)===!1&&(r.viewport(U.x,U.y,U.z,U.w),Xe.copy(U))}function qe(U,ee){let K=l.get(ee);K===void 0&&(K=new WeakMap,l.set(ee,K));let J=K.get(U);J===void 0&&(J=r.getUniformBlockIndex(ee,U.name),K.set(U,J))}function Oe(U,ee){const J=l.get(ee).get(U);o.get(ee)!==J&&(r.uniformBlockBinding(ee,J,U.__bindingPointIndex),o.set(ee,J))}function st(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),c={},W=null,re={},h={},f=new WeakMap,u=[],d=null,g=!1,_=null,p=null,m=null,v=null,y=null,S=null,A=null,T=new ct(0,0,0),b=0,R=!1,k=null,x=null,M=null,P=null,I=null,Be.set(0,0,r.canvas.width,r.canvas.height),Xe.set(0,0,r.canvas.width,r.canvas.height),i.reset(),s.reset(),a.reset()}return{buffers:{color:i,depth:s,stencil:a},enable:de,disable:ae,bindFramebuffer:Ee,drawBuffers:Se,useProgram:We,setBlending:D,setMaterial:rt,setFlipSided:Ne,setCullFace:ze,setLineWidth:B,setPolygonOffset:Ze,setScissorTest:Le,activeTexture:C,bindTexture:w,unbindTexture:X,compressedTexImage2D:Z,compressedTexImage3D:te,texImage2D:ve,texImage3D:ye,updateUBOMapping:qe,uniformBlockBinding:Oe,texStorage2D:Ge,texStorage3D:ne,texSubImage2D:j,texSubImage3D:xe,compressedTexSubImage2D:ie,compressedTexSubImage3D:fe,scissor:ke,viewport:_e,reset:st}}function of(r,e,t,n){const i=pS(n);switch(t){case $p:return r*e;case jp:return r*e;case Zp:return r*e*2;case Jp:return r*e/i.components*i.byteLength;case pu:return r*e/i.components*i.byteLength;case Qp:return r*e*2/i.components*i.byteLength;case mu:return r*e*2/i.components*i.byteLength;case Kp:return r*e*3/i.components*i.byteLength;case ui:return r*e*4/i.components*i.byteLength;case gu:return r*e*4/i.components*i.byteLength;case Vo:case Wo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Xo:case qo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case ah:case lh:return Math.max(r,16)*Math.max(e,8)/4;case sh:case oh:return Math.max(r,8)*Math.max(e,8)/2;case ch:case hh:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case uh:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case dh:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case fh:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case ph:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case mh:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case gh:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case _h:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case vh:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case yh:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case xh:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case bh:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Sh:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Mh:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case wh:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Th:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Yo:case Eh:case Ah:return Math.ceil(r/4)*Math.ceil(e/4)*16;case em:case Rh:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Ch:case Ph:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function pS(r){switch(r){case Wi:case Xp:return{byteLength:1,components:1};case Fa:case qp:case Ha:return{byteLength:2,components:1};case du:case fu:return{byteLength:2,components:4};case Jr:case uu:case Bi:return{byteLength:4,components:1};case Yp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function mS(r,e,t,n,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new xt,h=new WeakMap;let f;const u=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,w){return d?new OffscreenCanvas(C,w):dl("canvas")}function _(C,w,X){let Z=1;const te=Le(C);if((te.width>X||te.height>X)&&(Z=X/Math.max(te.width,te.height)),Z<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const j=Math.floor(Z*te.width),xe=Math.floor(Z*te.height);f===void 0&&(f=g(j,xe));const ie=w?g(j,xe):f;return ie.width=j,ie.height=xe,ie.getContext("2d").drawImage(C,0,0,j,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+j+"x"+xe+")."),ie}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),C;return C}function p(C){return C.generateMipmaps&&C.minFilter!==Qn&&C.minFilter!==li}function m(C){r.generateMipmap(C)}function v(C,w,X,Z,te=!1){if(C!==null){if(r[C]!==void 0)return r[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let j=w;if(w===r.RED&&(X===r.FLOAT&&(j=r.R32F),X===r.HALF_FLOAT&&(j=r.R16F),X===r.UNSIGNED_BYTE&&(j=r.R8)),w===r.RED_INTEGER&&(X===r.UNSIGNED_BYTE&&(j=r.R8UI),X===r.UNSIGNED_SHORT&&(j=r.R16UI),X===r.UNSIGNED_INT&&(j=r.R32UI),X===r.BYTE&&(j=r.R8I),X===r.SHORT&&(j=r.R16I),X===r.INT&&(j=r.R32I)),w===r.RG&&(X===r.FLOAT&&(j=r.RG32F),X===r.HALF_FLOAT&&(j=r.RG16F),X===r.UNSIGNED_BYTE&&(j=r.RG8)),w===r.RG_INTEGER&&(X===r.UNSIGNED_BYTE&&(j=r.RG8UI),X===r.UNSIGNED_SHORT&&(j=r.RG16UI),X===r.UNSIGNED_INT&&(j=r.RG32UI),X===r.BYTE&&(j=r.RG8I),X===r.SHORT&&(j=r.RG16I),X===r.INT&&(j=r.RG32I)),w===r.RGB_INTEGER&&(X===r.UNSIGNED_BYTE&&(j=r.RGB8UI),X===r.UNSIGNED_SHORT&&(j=r.RGB16UI),X===r.UNSIGNED_INT&&(j=r.RGB32UI),X===r.BYTE&&(j=r.RGB8I),X===r.SHORT&&(j=r.RGB16I),X===r.INT&&(j=r.RGB32I)),w===r.RGBA_INTEGER&&(X===r.UNSIGNED_BYTE&&(j=r.RGBA8UI),X===r.UNSIGNED_SHORT&&(j=r.RGBA16UI),X===r.UNSIGNED_INT&&(j=r.RGBA32UI),X===r.BYTE&&(j=r.RGBA8I),X===r.SHORT&&(j=r.RGBA16I),X===r.INT&&(j=r.RGBA32I)),w===r.RGB&&X===r.UNSIGNED_INT_5_9_9_9_REV&&(j=r.RGB9_E5),w===r.RGBA){const xe=te?ll:dt.getTransfer(Z);X===r.FLOAT&&(j=r.RGBA32F),X===r.HALF_FLOAT&&(j=r.RGBA16F),X===r.UNSIGNED_BYTE&&(j=xe===Mt?r.SRGB8_ALPHA8:r.RGBA8),X===r.UNSIGNED_SHORT_4_4_4_4&&(j=r.RGBA4),X===r.UNSIGNED_SHORT_5_5_5_1&&(j=r.RGB5_A1)}return(j===r.R16F||j===r.R32F||j===r.RG16F||j===r.RG32F||j===r.RGBA16F||j===r.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function y(C,w){let X;return C?w===null||w===Jr||w===Xs?X=r.DEPTH24_STENCIL8:w===Bi?X=r.DEPTH32F_STENCIL8:w===Fa&&(X=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Jr||w===Xs?X=r.DEPTH_COMPONENT24:w===Bi?X=r.DEPTH_COMPONENT32F:w===Fa&&(X=r.DEPTH_COMPONENT16),X}function S(C,w){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Qn&&C.minFilter!==li?Math.log2(Math.max(w.width,w.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?w.mipmaps.length:1}function A(C){const w=C.target;w.removeEventListener("dispose",A),b(w),w.isVideoTexture&&h.delete(w)}function T(C){const w=C.target;w.removeEventListener("dispose",T),k(w)}function b(C){const w=n.get(C);if(w.__webglInit===void 0)return;const X=C.source,Z=u.get(X);if(Z){const te=Z[w.__cacheKey];te.usedTimes--,te.usedTimes===0&&R(C),Object.keys(Z).length===0&&u.delete(X)}n.remove(C)}function R(C){const w=n.get(C);r.deleteTexture(w.__webglTexture);const X=C.source,Z=u.get(X);delete Z[w.__cacheKey],a.memory.textures--}function k(C){const w=n.get(C);if(C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(w.__webglFramebuffer[Z]))for(let te=0;te<w.__webglFramebuffer[Z].length;te++)r.deleteFramebuffer(w.__webglFramebuffer[Z][te]);else r.deleteFramebuffer(w.__webglFramebuffer[Z]);w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer[Z])}else{if(Array.isArray(w.__webglFramebuffer))for(let Z=0;Z<w.__webglFramebuffer.length;Z++)r.deleteFramebuffer(w.__webglFramebuffer[Z]);else r.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&r.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let Z=0;Z<w.__webglColorRenderbuffer.length;Z++)w.__webglColorRenderbuffer[Z]&&r.deleteRenderbuffer(w.__webglColorRenderbuffer[Z]);w.__webglDepthRenderbuffer&&r.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const X=C.textures;for(let Z=0,te=X.length;Z<te;Z++){const j=n.get(X[Z]);j.__webglTexture&&(r.deleteTexture(j.__webglTexture),a.memory.textures--),n.remove(X[Z])}n.remove(C)}let x=0;function M(){x=0}function P(){const C=x;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),x+=1,C}function I(C){const w=[];return w.push(C.wrapS),w.push(C.wrapT),w.push(C.wrapR||0),w.push(C.magFilter),w.push(C.minFilter),w.push(C.anisotropy),w.push(C.internalFormat),w.push(C.format),w.push(C.type),w.push(C.generateMipmaps),w.push(C.premultiplyAlpha),w.push(C.flipY),w.push(C.unpackAlignment),w.push(C.colorSpace),w.join()}function F(C,w){const X=n.get(C);if(C.isVideoTexture&&B(C),C.isRenderTargetTexture===!1&&C.version>0&&X.__version!==C.version){const Z=C.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Xe(X,C,w);return}}t.bindTexture(r.TEXTURE_2D,X.__webglTexture,r.TEXTURE0+w)}function q(C,w){const X=n.get(C);if(C.version>0&&X.__version!==C.version){Xe(X,C,w);return}t.bindTexture(r.TEXTURE_2D_ARRAY,X.__webglTexture,r.TEXTURE0+w)}function z(C,w){const X=n.get(C);if(C.version>0&&X.__version!==C.version){Xe(X,C,w);return}t.bindTexture(r.TEXTURE_3D,X.__webglTexture,r.TEXTURE0+w)}function G(C,w){const X=n.get(C);if(C.version>0&&X.__version!==C.version){$(X,C,w);return}t.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture,r.TEXTURE0+w)}const W={[ih]:r.REPEAT,[zr]:r.CLAMP_TO_EDGE,[rh]:r.MIRRORED_REPEAT},re={[Qn]:r.NEAREST,[Q_]:r.NEAREST_MIPMAP_NEAREST,[ao]:r.NEAREST_MIPMAP_LINEAR,[li]:r.LINEAR,[Vl]:r.LINEAR_MIPMAP_NEAREST,[Hr]:r.LINEAR_MIPMAP_LINEAR},L={[rv]:r.NEVER,[hv]:r.ALWAYS,[sv]:r.LESS,[tm]:r.LEQUAL,[av]:r.EQUAL,[cv]:r.GEQUAL,[ov]:r.GREATER,[lv]:r.NOTEQUAL};function oe(C,w){if(w.type===Bi&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===li||w.magFilter===Vl||w.magFilter===ao||w.magFilter===Hr||w.minFilter===li||w.minFilter===Vl||w.minFilter===ao||w.minFilter===Hr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(C,r.TEXTURE_WRAP_S,W[w.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,W[w.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,W[w.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,re[w.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,re[w.minFilter]),w.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,L[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Qn||w.minFilter!==ao&&w.minFilter!==Hr||w.type===Bi&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");r.texParameterf(C,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Be(C,w){let X=!1;C.__webglInit===void 0&&(C.__webglInit=!0,w.addEventListener("dispose",A));const Z=w.source;let te=u.get(Z);te===void 0&&(te={},u.set(Z,te));const j=I(w);if(j!==C.__cacheKey){te[j]===void 0&&(te[j]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,X=!0),te[j].usedTimes++;const xe=te[C.__cacheKey];xe!==void 0&&(te[C.__cacheKey].usedTimes--,xe.usedTimes===0&&R(w)),C.__cacheKey=j,C.__webglTexture=te[j].texture}return X}function Xe(C,w,X){let Z=r.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(Z=r.TEXTURE_2D_ARRAY),w.isData3DTexture&&(Z=r.TEXTURE_3D);const te=Be(C,w),j=w.source;t.bindTexture(Z,C.__webglTexture,r.TEXTURE0+X);const xe=n.get(j);if(j.version!==xe.__version||te===!0){t.activeTexture(r.TEXTURE0+X);const ie=dt.getPrimaries(dt.workingColorSpace),fe=w.colorSpace===tr?null:dt.getPrimaries(w.colorSpace),Ge=w.colorSpace===tr||ie===fe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ge);let ne=_(w.image,!1,i.maxTextureSize);ne=Ze(w,ne);const ve=s.convert(w.format,w.colorSpace),ye=s.convert(w.type);let ke=v(w.internalFormat,ve,ye,w.colorSpace,w.isVideoTexture);oe(Z,w);let _e;const qe=w.mipmaps,Oe=w.isVideoTexture!==!0,st=xe.__version===void 0||te===!0,U=j.dataReady,ee=S(w,ne);if(w.isDepthTexture)ke=y(w.format===qs,w.type),st&&(Oe?t.texStorage2D(r.TEXTURE_2D,1,ke,ne.width,ne.height):t.texImage2D(r.TEXTURE_2D,0,ke,ne.width,ne.height,0,ve,ye,null));else if(w.isDataTexture)if(qe.length>0){Oe&&st&&t.texStorage2D(r.TEXTURE_2D,ee,ke,qe[0].width,qe[0].height);for(let K=0,J=qe.length;K<J;K++)_e=qe[K],Oe?U&&t.texSubImage2D(r.TEXTURE_2D,K,0,0,_e.width,_e.height,ve,ye,_e.data):t.texImage2D(r.TEXTURE_2D,K,ke,_e.width,_e.height,0,ve,ye,_e.data);w.generateMipmaps=!1}else Oe?(st&&t.texStorage2D(r.TEXTURE_2D,ee,ke,ne.width,ne.height),U&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ne.width,ne.height,ve,ye,ne.data)):t.texImage2D(r.TEXTURE_2D,0,ke,ne.width,ne.height,0,ve,ye,ne.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Oe&&st&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ee,ke,qe[0].width,qe[0].height,ne.depth);for(let K=0,J=qe.length;K<J;K++)if(_e=qe[K],w.format!==ui)if(ve!==null)if(Oe){if(U)if(w.layerUpdates.size>0){const le=of(_e.width,_e.height,w.format,w.type);for(const ce of w.layerUpdates){const Ye=_e.data.subarray(ce*le/_e.data.BYTES_PER_ELEMENT,(ce+1)*le/_e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,K,0,0,ce,_e.width,_e.height,1,ve,Ye,0,0)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,K,0,0,0,_e.width,_e.height,ne.depth,ve,_e.data,0,0)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,K,ke,_e.width,_e.height,ne.depth,0,_e.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?U&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,K,0,0,0,_e.width,_e.height,ne.depth,ve,ye,_e.data):t.texImage3D(r.TEXTURE_2D_ARRAY,K,ke,_e.width,_e.height,ne.depth,0,ve,ye,_e.data)}else{Oe&&st&&t.texStorage2D(r.TEXTURE_2D,ee,ke,qe[0].width,qe[0].height);for(let K=0,J=qe.length;K<J;K++)_e=qe[K],w.format!==ui?ve!==null?Oe?U&&t.compressedTexSubImage2D(r.TEXTURE_2D,K,0,0,_e.width,_e.height,ve,_e.data):t.compressedTexImage2D(r.TEXTURE_2D,K,ke,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?U&&t.texSubImage2D(r.TEXTURE_2D,K,0,0,_e.width,_e.height,ve,ye,_e.data):t.texImage2D(r.TEXTURE_2D,K,ke,_e.width,_e.height,0,ve,ye,_e.data)}else if(w.isDataArrayTexture)if(Oe){if(st&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ee,ke,ne.width,ne.height,ne.depth),U)if(w.layerUpdates.size>0){const K=of(ne.width,ne.height,w.format,w.type);for(const J of w.layerUpdates){const le=ne.data.subarray(J*K/ne.data.BYTES_PER_ELEMENT,(J+1)*K/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,J,ne.width,ne.height,1,ve,ye,le)}w.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,ve,ye,ne.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,ke,ne.width,ne.height,ne.depth,0,ve,ye,ne.data);else if(w.isData3DTexture)Oe?(st&&t.texStorage3D(r.TEXTURE_3D,ee,ke,ne.width,ne.height,ne.depth),U&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,ve,ye,ne.data)):t.texImage3D(r.TEXTURE_3D,0,ke,ne.width,ne.height,ne.depth,0,ve,ye,ne.data);else if(w.isFramebufferTexture){if(st)if(Oe)t.texStorage2D(r.TEXTURE_2D,ee,ke,ne.width,ne.height);else{let K=ne.width,J=ne.height;for(let le=0;le<ee;le++)t.texImage2D(r.TEXTURE_2D,le,ke,K,J,0,ve,ye,null),K>>=1,J>>=1}}else if(qe.length>0){if(Oe&&st){const K=Le(qe[0]);t.texStorage2D(r.TEXTURE_2D,ee,ke,K.width,K.height)}for(let K=0,J=qe.length;K<J;K++)_e=qe[K],Oe?U&&t.texSubImage2D(r.TEXTURE_2D,K,0,0,ve,ye,_e):t.texImage2D(r.TEXTURE_2D,K,ke,ve,ye,_e);w.generateMipmaps=!1}else if(Oe){if(st){const K=Le(ne);t.texStorage2D(r.TEXTURE_2D,ee,ke,K.width,K.height)}U&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ve,ye,ne)}else t.texImage2D(r.TEXTURE_2D,0,ke,ve,ye,ne);p(w)&&m(Z),xe.__version=j.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function $(C,w,X){if(w.image.length!==6)return;const Z=Be(C,w),te=w.source;t.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+X);const j=n.get(te);if(te.version!==j.__version||Z===!0){t.activeTexture(r.TEXTURE0+X);const xe=dt.getPrimaries(dt.workingColorSpace),ie=w.colorSpace===tr?null:dt.getPrimaries(w.colorSpace),fe=w.colorSpace===tr||xe===ie?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);const Ge=w.isCompressedTexture||w.image[0].isCompressedTexture,ne=w.image[0]&&w.image[0].isDataTexture,ve=[];for(let J=0;J<6;J++)!Ge&&!ne?ve[J]=_(w.image[J],!0,i.maxCubemapSize):ve[J]=ne?w.image[J].image:w.image[J],ve[J]=Ze(w,ve[J]);const ye=ve[0],ke=s.convert(w.format,w.colorSpace),_e=s.convert(w.type),qe=v(w.internalFormat,ke,_e,w.colorSpace),Oe=w.isVideoTexture!==!0,st=j.__version===void 0||Z===!0,U=te.dataReady;let ee=S(w,ye);oe(r.TEXTURE_CUBE_MAP,w);let K;if(Ge){Oe&&st&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ee,qe,ye.width,ye.height);for(let J=0;J<6;J++){K=ve[J].mipmaps;for(let le=0;le<K.length;le++){const ce=K[le];w.format!==ui?ke!==null?Oe?U&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le,0,0,ce.width,ce.height,ke,ce.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le,qe,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Oe?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le,0,0,ce.width,ce.height,ke,_e,ce.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le,qe,ce.width,ce.height,0,ke,_e,ce.data)}}}else{if(K=w.mipmaps,Oe&&st){K.length>0&&ee++;const J=Le(ve[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,ee,qe,J.width,J.height)}for(let J=0;J<6;J++)if(ne){Oe?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ve[J].width,ve[J].height,ke,_e,ve[J].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,qe,ve[J].width,ve[J].height,0,ke,_e,ve[J].data);for(let le=0;le<K.length;le++){const Ye=K[le].image[J].image;Oe?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le+1,0,0,Ye.width,Ye.height,ke,_e,Ye.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le+1,qe,Ye.width,Ye.height,0,ke,_e,Ye.data)}}else{Oe?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ke,_e,ve[J]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,qe,ke,_e,ve[J]);for(let le=0;le<K.length;le++){const ce=K[le];Oe?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le+1,0,0,ke,_e,ce.image[J]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,le+1,qe,ke,_e,ce.image[J])}}}p(w)&&m(r.TEXTURE_CUBE_MAP),j.__version=te.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function Q(C,w,X,Z,te,j){const xe=s.convert(X.format,X.colorSpace),ie=s.convert(X.type),fe=v(X.internalFormat,xe,ie,X.colorSpace);if(!n.get(w).__hasExternalTextures){const ne=Math.max(1,w.width>>j),ve=Math.max(1,w.height>>j);te===r.TEXTURE_3D||te===r.TEXTURE_2D_ARRAY?t.texImage3D(te,j,fe,ne,ve,w.depth,0,xe,ie,null):t.texImage2D(te,j,fe,ne,ve,0,xe,ie,null)}t.bindFramebuffer(r.FRAMEBUFFER,C),ze(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Z,te,n.get(X).__webglTexture,0,Ne(w)):(te===r.TEXTURE_2D||te>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Z,te,n.get(X).__webglTexture,j),t.bindFramebuffer(r.FRAMEBUFFER,null)}function de(C,w,X){if(r.bindRenderbuffer(r.RENDERBUFFER,C),w.depthBuffer){const Z=w.depthTexture,te=Z&&Z.isDepthTexture?Z.type:null,j=y(w.stencilBuffer,te),xe=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ie=Ne(w);ze(w)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ie,j,w.width,w.height):X?r.renderbufferStorageMultisample(r.RENDERBUFFER,ie,j,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,j,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,xe,r.RENDERBUFFER,C)}else{const Z=w.textures;for(let te=0;te<Z.length;te++){const j=Z[te],xe=s.convert(j.format,j.colorSpace),ie=s.convert(j.type),fe=v(j.internalFormat,xe,ie,j.colorSpace),Ge=Ne(w);X&&ze(w)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ge,fe,w.width,w.height):ze(w)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ge,fe,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,fe,w.width,w.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ae(C,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,C),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),F(w.depthTexture,0);const Z=n.get(w.depthTexture).__webglTexture,te=Ne(w);if(w.depthTexture.format===Is)ze(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Z,0,te):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Z,0);else if(w.depthTexture.format===qs)ze(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Z,0,te):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Ee(C){const w=n.get(C),X=C.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==C.depthTexture){const Z=C.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),Z){const te=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,Z.removeEventListener("dispose",te)};Z.addEventListener("dispose",te),w.__depthDisposeCallback=te}w.__boundDepthTexture=Z}if(C.depthTexture&&!w.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");ae(w.__webglFramebuffer,C)}else if(X){w.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[Z]),w.__webglDepthbuffer[Z]===void 0)w.__webglDepthbuffer[Z]=r.createRenderbuffer(),de(w.__webglDepthbuffer[Z],C,!1);else{const te=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=w.__webglDepthbuffer[Z];r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,te,r.RENDERBUFFER,j)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=r.createRenderbuffer(),de(w.__webglDepthbuffer,C,!1);else{const Z=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,te=w.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,te),r.framebufferRenderbuffer(r.FRAMEBUFFER,Z,r.RENDERBUFFER,te)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Se(C,w,X){const Z=n.get(C);w!==void 0&&Q(Z.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),X!==void 0&&Ee(C)}function We(C){const w=C.texture,X=n.get(C),Z=n.get(w);C.addEventListener("dispose",T);const te=C.textures,j=C.isWebGLCubeRenderTarget===!0,xe=te.length>1;if(xe||(Z.__webglTexture===void 0&&(Z.__webglTexture=r.createTexture()),Z.__version=w.version,a.memory.textures++),j){X.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(w.mipmaps&&w.mipmaps.length>0){X.__webglFramebuffer[ie]=[];for(let fe=0;fe<w.mipmaps.length;fe++)X.__webglFramebuffer[ie][fe]=r.createFramebuffer()}else X.__webglFramebuffer[ie]=r.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){X.__webglFramebuffer=[];for(let ie=0;ie<w.mipmaps.length;ie++)X.__webglFramebuffer[ie]=r.createFramebuffer()}else X.__webglFramebuffer=r.createFramebuffer();if(xe)for(let ie=0,fe=te.length;ie<fe;ie++){const Ge=n.get(te[ie]);Ge.__webglTexture===void 0&&(Ge.__webglTexture=r.createTexture(),a.memory.textures++)}if(C.samples>0&&ze(C)===!1){X.__webglMultisampledFramebuffer=r.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let ie=0;ie<te.length;ie++){const fe=te[ie];X.__webglColorRenderbuffer[ie]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,X.__webglColorRenderbuffer[ie]);const Ge=s.convert(fe.format,fe.colorSpace),ne=s.convert(fe.type),ve=v(fe.internalFormat,Ge,ne,fe.colorSpace,C.isXRRenderTarget===!0),ye=Ne(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,ye,ve,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ie,r.RENDERBUFFER,X.__webglColorRenderbuffer[ie])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(X.__webglDepthRenderbuffer=r.createRenderbuffer(),de(X.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(j){t.bindTexture(r.TEXTURE_CUBE_MAP,Z.__webglTexture),oe(r.TEXTURE_CUBE_MAP,w);for(let ie=0;ie<6;ie++)if(w.mipmaps&&w.mipmaps.length>0)for(let fe=0;fe<w.mipmaps.length;fe++)Q(X.__webglFramebuffer[ie][fe],C,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,fe);else Q(X.__webglFramebuffer[ie],C,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);p(w)&&m(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){for(let ie=0,fe=te.length;ie<fe;ie++){const Ge=te[ie],ne=n.get(Ge);t.bindTexture(r.TEXTURE_2D,ne.__webglTexture),oe(r.TEXTURE_2D,Ge),Q(X.__webglFramebuffer,C,Ge,r.COLOR_ATTACHMENT0+ie,r.TEXTURE_2D,0),p(Ge)&&m(r.TEXTURE_2D)}t.unbindTexture()}else{let ie=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ie=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ie,Z.__webglTexture),oe(ie,w),w.mipmaps&&w.mipmaps.length>0)for(let fe=0;fe<w.mipmaps.length;fe++)Q(X.__webglFramebuffer[fe],C,w,r.COLOR_ATTACHMENT0,ie,fe);else Q(X.__webglFramebuffer,C,w,r.COLOR_ATTACHMENT0,ie,0);p(w)&&m(ie),t.unbindTexture()}C.depthBuffer&&Ee(C)}function Ve(C){const w=C.textures;for(let X=0,Z=w.length;X<Z;X++){const te=w[X];if(p(te)){const j=C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,xe=n.get(te).__webglTexture;t.bindTexture(j,xe),m(j),t.unbindTexture()}}}const Ue=[],D=[];function rt(C){if(C.samples>0){if(ze(C)===!1){const w=C.textures,X=C.width,Z=C.height;let te=r.COLOR_BUFFER_BIT;const j=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,xe=n.get(C),ie=w.length>1;if(ie)for(let fe=0;fe<w.length;fe++)t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let fe=0;fe<w.length;fe++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(te|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(te|=r.STENCIL_BUFFER_BIT)),ie){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,xe.__webglColorRenderbuffer[fe]);const Ge=n.get(w[fe]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ge,0)}r.blitFramebuffer(0,0,X,Z,0,0,X,Z,te,r.NEAREST),l===!0&&(Ue.length=0,D.length=0,Ue.push(r.COLOR_ATTACHMENT0+fe),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Ue.push(j),D.push(j),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,D)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ue))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ie)for(let fe=0;fe<w.length;fe++){t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.RENDERBUFFER,xe.__webglColorRenderbuffer[fe]);const Ge=n.get(w[fe]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.TEXTURE_2D,Ge,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const w=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[w])}}}function Ne(C){return Math.min(i.maxSamples,C.samples)}function ze(C){const w=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function B(C){const w=a.render.frame;h.get(C)!==w&&(h.set(C,w),C.update())}function Ze(C,w){const X=C.colorSpace,Z=C.format,te=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||X!==Sr&&X!==tr&&(dt.getTransfer(X)===Mt?(Z!==ui||te!==Wi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),w}function Le(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=P,this.resetTextureUnits=M,this.setTexture2D=F,this.setTexture2DArray=q,this.setTexture3D=z,this.setTextureCube=G,this.rebindTextures=Se,this.setupRenderTarget=We,this.updateRenderTargetMipmap=Ve,this.updateMultisampleRenderTarget=rt,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=ze}function gS(r,e){function t(n,i=tr){let s;const a=dt.getTransfer(i);if(n===Wi)return r.UNSIGNED_BYTE;if(n===du)return r.UNSIGNED_SHORT_4_4_4_4;if(n===fu)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Yp)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Xp)return r.BYTE;if(n===qp)return r.SHORT;if(n===Fa)return r.UNSIGNED_SHORT;if(n===uu)return r.INT;if(n===Jr)return r.UNSIGNED_INT;if(n===Bi)return r.FLOAT;if(n===Ha)return r.HALF_FLOAT;if(n===$p)return r.ALPHA;if(n===Kp)return r.RGB;if(n===ui)return r.RGBA;if(n===jp)return r.LUMINANCE;if(n===Zp)return r.LUMINANCE_ALPHA;if(n===Is)return r.DEPTH_COMPONENT;if(n===qs)return r.DEPTH_STENCIL;if(n===Jp)return r.RED;if(n===pu)return r.RED_INTEGER;if(n===Qp)return r.RG;if(n===mu)return r.RG_INTEGER;if(n===gu)return r.RGBA_INTEGER;if(n===Vo||n===Wo||n===Xo||n===qo)if(a===Mt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Vo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Wo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Xo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===qo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Vo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Wo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Xo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===qo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===sh||n===ah||n===oh||n===lh)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===sh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ah)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===oh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===lh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ch||n===hh||n===uh)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===ch||n===hh)return a===Mt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===uh)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===dh||n===fh||n===ph||n===mh||n===gh||n===_h||n===vh||n===yh||n===xh||n===bh||n===Sh||n===Mh||n===wh||n===Th)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===dh)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===fh)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ph)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===mh)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===gh)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===_h)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===vh)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===yh)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===xh)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===bh)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Sh)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Mh)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===wh)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Th)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Yo||n===Eh||n===Ah)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Yo)return a===Mt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Eh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ah)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===em||n===Rh||n===Ch||n===Ph)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Yo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Rh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ch)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ph)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Xs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}class _S extends jn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ro extends gn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const vS={type:"move"};class yc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ro,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ro,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ro,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),m=this._getHandJoint(c,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&u>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vS)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ro;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const yS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,xS=`
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

}`;class bS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new An,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new xr({vertexShader:yS,fragmentShader:xS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new wi(new Ml(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class SS extends $s{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,u=null,d=null,g=null;const _=new bS,p=t.getContextAttributes();let m=null,v=null;const y=[],S=[],A=new xt;let T=null;const b=new jn;b.layers.enable(1),b.viewport=new Ft;const R=new jn;R.layers.enable(2),R.viewport=new Ft;const k=[b,R],x=new _S;x.layers.enable(1),x.layers.enable(2);let M=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let Q=y[$];return Q===void 0&&(Q=new yc,y[$]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function($){let Q=y[$];return Q===void 0&&(Q=new yc,y[$]=Q),Q.getGripSpace()},this.getHand=function($){let Q=y[$];return Q===void 0&&(Q=new yc,y[$]=Q),Q.getHandSpace()};function I($){const Q=S.indexOf($.inputSource);if(Q===-1)return;const de=y[Q];de!==void 0&&(de.update($.inputSource,$.frame,c||a),de.dispatchEvent({type:$.type,data:$.inputSource}))}function F(){i.removeEventListener("select",I),i.removeEventListener("selectstart",I),i.removeEventListener("selectend",I),i.removeEventListener("squeeze",I),i.removeEventListener("squeezestart",I),i.removeEventListener("squeezeend",I),i.removeEventListener("end",F),i.removeEventListener("inputsourceschange",q);for(let $=0;$<y.length;$++){const Q=S[$];Q!==null&&(S[$]=null,y[$].disconnect(Q))}M=null,P=null,_.reset(),e.setRenderTarget(m),d=null,u=null,f=null,i=null,v=null,Xe.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",I),i.addEventListener("selectstart",I),i.addEventListener("selectend",I),i.addEventListener("squeeze",I),i.addEventListener("squeezestart",I),i.addEventListener("squeezeend",I),i.addEventListener("end",F),i.addEventListener("inputsourceschange",q),p.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(A),i.renderState.layers===void 0){const Q={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,t,Q),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new Qr(d.framebufferWidth,d.framebufferHeight,{format:ui,type:Wi,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let Q=null,de=null,ae=null;p.depth&&(ae=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Q=p.stencil?qs:Is,de=p.stencil?Xs:Jr);const Ee={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:s};f=new XRWebGLBinding(i,t),u=f.createProjectionLayer(Ee),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),v=new Qr(u.textureWidth,u.textureHeight,{format:ui,type:Wi,depthTexture:new pm(u.textureWidth,u.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Xe.setContext(i),Xe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function q($){for(let Q=0;Q<$.removed.length;Q++){const de=$.removed[Q],ae=S.indexOf(de);ae>=0&&(S[ae]=null,y[ae].disconnect(de))}for(let Q=0;Q<$.added.length;Q++){const de=$.added[Q];let ae=S.indexOf(de);if(ae===-1){for(let Se=0;Se<y.length;Se++)if(Se>=S.length){S.push(de),ae=Se;break}else if(S[Se]===null){S[Se]=de,ae=Se;break}if(ae===-1)break}const Ee=y[ae];Ee&&Ee.connect(de)}}const z=new Y,G=new Y;function W($,Q,de){z.setFromMatrixPosition(Q.matrixWorld),G.setFromMatrixPosition(de.matrixWorld);const ae=z.distanceTo(G),Ee=Q.projectionMatrix.elements,Se=de.projectionMatrix.elements,We=Ee[14]/(Ee[10]-1),Ve=Ee[14]/(Ee[10]+1),Ue=(Ee[9]+1)/Ee[5],D=(Ee[9]-1)/Ee[5],rt=(Ee[8]-1)/Ee[0],Ne=(Se[8]+1)/Se[0],ze=We*rt,B=We*Ne,Ze=ae/(-rt+Ne),Le=Ze*-rt;if(Q.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Le),$.translateZ(Ze),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ee[10]===-1)$.projectionMatrix.copy(Q.projectionMatrix),$.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const C=We+Ze,w=Ve+Ze,X=ze-Le,Z=B+(ae-Le),te=Ue*Ve/w*C,j=D*Ve/w*C;$.projectionMatrix.makePerspective(X,Z,te,j,C,w),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function re($,Q){Q===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(Q.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let Q=$.near,de=$.far;_.texture!==null&&(_.depthNear>0&&(Q=_.depthNear),_.depthFar>0&&(de=_.depthFar)),x.near=R.near=b.near=Q,x.far=R.far=b.far=de,(M!==x.near||P!==x.far)&&(i.updateRenderState({depthNear:x.near,depthFar:x.far}),M=x.near,P=x.far);const ae=$.parent,Ee=x.cameras;re(x,ae);for(let Se=0;Se<Ee.length;Se++)re(Ee[Se],ae);Ee.length===2?W(x,b,R):x.projectionMatrix.copy(b.projectionMatrix),L($,x,ae)};function L($,Q,de){de===null?$.matrix.copy(Q.matrixWorld):($.matrix.copy(de.matrixWorld),$.matrix.invert(),$.matrix.multiply(Q.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(Q.projectionMatrix),$.projectionMatrixInverse.copy(Q.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Lh*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function($){l=$,u!==null&&(u.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let oe=null;function Be($,Q){if(h=Q.getViewerPose(c||a),g=Q,h!==null){const de=h.views;d!==null&&(e.setRenderTargetFramebuffer(v,d.framebuffer),e.setRenderTarget(v));let ae=!1;de.length!==x.cameras.length&&(x.cameras.length=0,ae=!0);for(let Se=0;Se<de.length;Se++){const We=de[Se];let Ve=null;if(d!==null)Ve=d.getViewport(We);else{const D=f.getViewSubImage(u,We);Ve=D.viewport,Se===0&&(e.setRenderTargetTextures(v,D.colorTexture,u.ignoreDepthValues?void 0:D.depthStencilTexture),e.setRenderTarget(v))}let Ue=k[Se];Ue===void 0&&(Ue=new jn,Ue.layers.enable(Se),Ue.viewport=new Ft,k[Se]=Ue),Ue.matrix.fromArray(We.transform.matrix),Ue.matrix.decompose(Ue.position,Ue.quaternion,Ue.scale),Ue.projectionMatrix.fromArray(We.projectionMatrix),Ue.projectionMatrixInverse.copy(Ue.projectionMatrix).invert(),Ue.viewport.set(Ve.x,Ve.y,Ve.width,Ve.height),Se===0&&(x.matrix.copy(Ue.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ae===!0&&x.cameras.push(Ue)}const Ee=i.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")){const Se=f.getDepthInformation(de[0]);Se&&Se.isValid&&Se.texture&&_.init(e,Se,i.renderState)}}for(let de=0;de<y.length;de++){const ae=S[de],Ee=y[de];ae!==null&&Ee!==void 0&&Ee.update(ae,Q,c||a)}oe&&oe($,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const Xe=new fm;Xe.setAnimationLoop(Be),this.setAnimationLoop=function($){oe=$},this.dispose=function(){}}}const Pr=new Xi,MS=new kt;function wS(r,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,cm(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,v,y,S){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),f(p,m)):m.isMeshPhongMaterial?(s(p,m),h(p,m)):m.isMeshStandardMaterial?(s(p,m),u(p,m),m.isMeshPhysicalMaterial&&d(p,m,S)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),_(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,v,y):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===En&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===En&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const v=e.get(m),y=v.envMap,S=v.envMapRotation;y&&(p.envMap.value=y,Pr.copy(S),Pr.x*=-1,Pr.y*=-1,Pr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Pr.y*=-1,Pr.z*=-1),p.envMapRotation.value.setFromMatrix4(MS.makeRotationFromEuler(Pr)),p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,v,y){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*v,p.scale.value=y*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function f(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,v){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===En&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const v=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function TS(r,e,t,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,y){const S=y.program;n.uniformBlockBinding(v,S)}function c(v,y){let S=i[v.id];S===void 0&&(g(v),S=h(v),i[v.id]=S,v.addEventListener("dispose",p));const A=y.program;n.updateUBOMapping(v,A);const T=e.render.frame;s[v.id]!==T&&(u(v),s[v.id]=T)}function h(v){const y=f();v.__bindingPointIndex=y;const S=r.createBuffer(),A=v.__size,T=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,S),r.bufferData(r.UNIFORM_BUFFER,A,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,y,S),S}function f(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){const y=i[v.id],S=v.uniforms,A=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,y);for(let T=0,b=S.length;T<b;T++){const R=Array.isArray(S[T])?S[T]:[S[T]];for(let k=0,x=R.length;k<x;k++){const M=R[k];if(d(M,T,k,A)===!0){const P=M.__offset,I=Array.isArray(M.value)?M.value:[M.value];let F=0;for(let q=0;q<I.length;q++){const z=I[q],G=_(z);typeof z=="number"||typeof z=="boolean"?(M.__data[0]=z,r.bufferSubData(r.UNIFORM_BUFFER,P+F,M.__data)):z.isMatrix3?(M.__data[0]=z.elements[0],M.__data[1]=z.elements[1],M.__data[2]=z.elements[2],M.__data[3]=0,M.__data[4]=z.elements[3],M.__data[5]=z.elements[4],M.__data[6]=z.elements[5],M.__data[7]=0,M.__data[8]=z.elements[6],M.__data[9]=z.elements[7],M.__data[10]=z.elements[8],M.__data[11]=0):(z.toArray(M.__data,F),F+=G.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,P,M.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(v,y,S,A){const T=v.value,b=y+"_"+S;if(A[b]===void 0)return typeof T=="number"||typeof T=="boolean"?A[b]=T:A[b]=T.clone(),!0;{const R=A[b];if(typeof T=="number"||typeof T=="boolean"){if(R!==T)return A[b]=T,!0}else if(R.equals(T)===!1)return R.copy(T),!0}return!1}function g(v){const y=v.uniforms;let S=0;const A=16;for(let b=0,R=y.length;b<R;b++){const k=Array.isArray(y[b])?y[b]:[y[b]];for(let x=0,M=k.length;x<M;x++){const P=k[x],I=Array.isArray(P.value)?P.value:[P.value];for(let F=0,q=I.length;F<q;F++){const z=I[F],G=_(z),W=S%A,re=W%G.boundary,L=W+re;S+=re,L!==0&&A-L<G.storage&&(S+=A-L),P.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=S,S+=G.storage}}}const T=S%A;return T>0&&(S+=A-T),v.__size=S,v.__cache={},this}function _(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function p(v){const y=v.target;y.removeEventListener("dispose",p);const S=a.indexOf(y.__bindingPointIndex);a.splice(S,1),r.deleteBuffer(i[y.id]),delete i[y.id],delete s[y.id]}function m(){for(const v in i)r.deleteBuffer(i[v]);a=[],i={},s={}}return{bind:l,update:c,dispose:m}}class ES{constructor(e={}){const{canvas:t=dv(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let u;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=n.getContextAttributes().alpha}else u=a;const d=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=_i,this.toneMapping=fr,this.toneMappingExposure=1;const y=this;let S=!1,A=0,T=0,b=null,R=-1,k=null;const x=new Ft,M=new Ft;let P=null;const I=new ct(0);let F=0,q=t.width,z=t.height,G=1,W=null,re=null;const L=new Ft(0,0,q,z),oe=new Ft(0,0,q,z);let Be=!1;const Xe=new dm;let $=!1,Q=!1;const de=new kt,ae=new kt,Ee=new Y,Se=new Ft,We={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function Ue(){return b===null?G:1}let D=n;function rt(E,O){return t.getContext(E,O)}try{const E={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${hu}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",le,!1),t.addEventListener("webglcontextcreationerror",ce,!1),D===null){const O="webgl2";if(D=rt(O,E),D===null)throw rt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Ne,ze,B,Ze,Le,C,w,X,Z,te,j,xe,ie,fe,Ge,ne,ve,ye,ke,_e,qe,Oe,st,U;function ee(){Ne=new Lx(D),Ne.init(),Oe=new gS(D,Ne),ze=new wx(D,Ne,e,Oe),B=new fS(D),ze.reverseDepthBuffer&&B.buffers.depth.setReversed(!0),Ze=new Ix(D),Le=new Jb,C=new mS(D,Ne,B,Le,ze,Oe,Ze),w=new Ex(y),X=new Px(y),Z=new zv(D),st=new Sx(D,Z),te=new Dx(D,Z,Ze,st),j=new Nx(D,te,Z,Ze),ke=new Ux(D,ze,C),ne=new Tx(Le),xe=new Zb(y,w,X,Ne,ze,st,ne),ie=new wS(y,Le),fe=new eS,Ge=new aS(Ne),ye=new bx(y,w,X,B,j,u,l),ve=new uS(y,j,ze),U=new TS(D,Ze,ze,B),_e=new Mx(D,Ne,Ze),qe=new kx(D,Ne,Ze),Ze.programs=xe.programs,y.capabilities=ze,y.extensions=Ne,y.properties=Le,y.renderLists=fe,y.shadowMap=ve,y.state=B,y.info=Ze}ee();const K=new SS(y,D);this.xr=K,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const E=Ne.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ne.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(E){E!==void 0&&(G=E,this.setSize(q,z,!1))},this.getSize=function(E){return E.set(q,z)},this.setSize=function(E,O,H=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=E,z=O,t.width=Math.floor(E*G),t.height=Math.floor(O*G),H===!0&&(t.style.width=E+"px",t.style.height=O+"px"),this.setViewport(0,0,E,O)},this.getDrawingBufferSize=function(E){return E.set(q*G,z*G).floor()},this.setDrawingBufferSize=function(E,O,H){q=E,z=O,G=H,t.width=Math.floor(E*H),t.height=Math.floor(O*H),this.setViewport(0,0,E,O)},this.getCurrentViewport=function(E){return E.copy(x)},this.getViewport=function(E){return E.copy(L)},this.setViewport=function(E,O,H,V){E.isVector4?L.set(E.x,E.y,E.z,E.w):L.set(E,O,H,V),B.viewport(x.copy(L).multiplyScalar(G).round())},this.getScissor=function(E){return E.copy(oe)},this.setScissor=function(E,O,H,V){E.isVector4?oe.set(E.x,E.y,E.z,E.w):oe.set(E,O,H,V),B.scissor(M.copy(oe).multiplyScalar(G).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(E){B.setScissorTest(Be=E)},this.setOpaqueSort=function(E){W=E},this.setTransparentSort=function(E){re=E},this.getClearColor=function(E){return E.copy(ye.getClearColor())},this.setClearColor=function(){ye.setClearColor.apply(ye,arguments)},this.getClearAlpha=function(){return ye.getClearAlpha()},this.setClearAlpha=function(){ye.setClearAlpha.apply(ye,arguments)},this.clear=function(E=!0,O=!0,H=!0){let V=0;if(E){let N=!1;if(b!==null){const se=b.texture.format;N=se===gu||se===mu||se===pu}if(N){const se=b.texture.type,ge=se===Wi||se===Jr||se===Fa||se===Xs||se===du||se===fu,ue=ye.getClearColor(),he=ye.getClearAlpha(),Ae=ue.r,Ie=ue.g,we=ue.b;ge?(d[0]=Ae,d[1]=Ie,d[2]=we,d[3]=he,D.clearBufferuiv(D.COLOR,0,d)):(g[0]=Ae,g[1]=Ie,g[2]=we,g[3]=he,D.clearBufferiv(D.COLOR,0,g))}else V|=D.COLOR_BUFFER_BIT}O&&(V|=D.DEPTH_BUFFER_BIT,D.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),H&&(V|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",le,!1),t.removeEventListener("webglcontextcreationerror",ce,!1),fe.dispose(),Ge.dispose(),Le.dispose(),w.dispose(),X.dispose(),j.dispose(),st.dispose(),U.dispose(),xe.dispose(),K.dispose(),K.removeEventListener("sessionstart",lt),K.removeEventListener("sessionend",pe),De.stop()};function J(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function le(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const E=Ze.autoReset,O=ve.enabled,H=ve.autoUpdate,V=ve.needsUpdate,N=ve.type;ee(),Ze.autoReset=E,ve.enabled=O,ve.autoUpdate=H,ve.needsUpdate=V,ve.type=N}function ce(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Ye(E){const O=E.target;O.removeEventListener("dispose",Ye),gt(O)}function gt(E){wt(E),Le.remove(E)}function wt(E){const O=Le.get(E).programs;O!==void 0&&(O.forEach(function(H){xe.releaseProgram(H)}),E.isShaderMaterial&&xe.releaseShaderCache(E))}this.renderBufferDirect=function(E,O,H,V,N,se){O===null&&(O=We);const ge=N.isMesh&&N.matrixWorld.determinant()<0,ue=ft(E,O,H,V,N);B.setMaterial(V,ge);let he=H.index,Ae=1;if(V.wireframe===!0){if(he=te.getWireframeAttribute(H),he===void 0)return;Ae=2}const Ie=H.drawRange,we=H.attributes.position;let at=Ie.start*Ae,it=(Ie.start+Ie.count)*Ae;se!==null&&(at=Math.max(at,se.start*Ae),it=Math.min(it,(se.start+se.count)*Ae)),he!==null?(at=Math.max(at,0),it=Math.min(it,he.count)):we!=null&&(at=Math.max(at,0),it=Math.min(it,we.count));const mt=it-at;if(mt<0||mt===1/0)return;st.setup(N,V,ue,H,he);let Yt,Je=_e;if(he!==null&&(Yt=Z.get(he),Je=qe,Je.setIndex(Yt)),N.isMesh)V.wireframe===!0?(B.setLineWidth(V.wireframeLinewidth*Ue()),Je.setMode(D.LINES)):Je.setMode(D.TRIANGLES);else if(N.isLine){let Pe=V.linewidth;Pe===void 0&&(Pe=1),B.setLineWidth(Pe*Ue()),N.isLineSegments?Je.setMode(D.LINES):N.isLineLoop?Je.setMode(D.LINE_LOOP):Je.setMode(D.LINE_STRIP)}else N.isPoints?Je.setMode(D.POINTS):N.isSprite&&Je.setMode(D.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Je.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Ne.get("WEBGL_multi_draw"))Je.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Pe=N._multiDrawStarts,Jt=N._multiDrawCounts,ht=N._multiDrawCount,ii=he?Z.get(he).bytesPerElement:1,ts=Le.get(V).currentProgram.getUniforms();for(let Pn=0;Pn<ht;Pn++)ts.setValue(D,"_gl_DrawID",Pn),Je.render(Pe[Pn]/ii,Jt[Pn])}else if(N.isInstancedMesh)Je.renderInstances(at,mt,N.count);else if(H.isInstancedBufferGeometry){const Pe=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Jt=Math.min(H.instanceCount,Pe);Je.renderInstances(at,mt,Jt)}else Je.render(at,mt)};function nt(E,O,H){E.transparent===!0&&E.side===Oi&&E.forceSinglePass===!1?(E.side=En,E.needsUpdate=!0,Ut(E,O,H),E.side=yr,E.needsUpdate=!0,Ut(E,O,H),E.side=Oi):Ut(E,O,H)}this.compile=function(E,O,H=null){H===null&&(H=E),p=Ge.get(H),p.init(O),v.push(p),H.traverseVisible(function(N){N.isLight&&N.layers.test(O.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),E!==H&&E.traverseVisible(function(N){N.isLight&&N.layers.test(O.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const V=new Set;return E.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const se=N.material;if(se)if(Array.isArray(se))for(let ge=0;ge<se.length;ge++){const ue=se[ge];nt(ue,H,N),V.add(ue)}else nt(se,H,N),V.add(se)}),v.pop(),p=null,V},this.compileAsync=function(E,O,H=null){const V=this.compile(E,O,H);return new Promise(N=>{function se(){if(V.forEach(function(ge){Le.get(ge).currentProgram.isReady()&&V.delete(ge)}),V.size===0){N(E);return}setTimeout(se,10)}Ne.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let Re=null;function Me(E){Re&&Re(E)}function lt(){De.stop()}function pe(){De.start()}const De=new fm;De.setAnimationLoop(Me),typeof self<"u"&&De.setContext(self),this.setAnimationLoop=function(E){Re=E,K.setAnimationLoop(E),E===null?De.stop():De.start()},K.addEventListener("sessionstart",lt),K.addEventListener("sessionend",pe),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(O),O=K.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,O,b),p=Ge.get(E,v.length),p.init(O),v.push(p),ae.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Xe.setFromProjectionMatrix(ae),Q=this.localClippingEnabled,$=ne.init(this.clippingPlanes,Q),_=fe.get(E,m.length),_.init(),m.push(_),K.enabled===!0&&K.isPresenting===!0){const se=y.xr.getDepthSensingMesh();se!==null&&Ce(se,O,-1/0,y.sortObjects)}Ce(E,O,0,y.sortObjects),_.finish(),y.sortObjects===!0&&_.sort(W,re),Ve=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,Ve&&ye.addToRenderList(_,E),this.info.render.frame++,$===!0&&ne.beginShadows();const H=p.state.shadowsArray;ve.render(H,E,O),$===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=_.opaque,N=_.transmissive;if(p.setupLights(),O.isArrayCamera){const se=O.cameras;if(N.length>0)for(let ge=0,ue=se.length;ge<ue;ge++){const he=se[ge];It(V,N,E,he)}Ve&&ye.render(E);for(let ge=0,ue=se.length;ge<ue;ge++){const he=se[ge];He(_,E,he,he.viewport)}}else N.length>0&&It(V,N,E,O),Ve&&ye.render(E),He(_,E,O);b!==null&&(C.updateMultisampleRenderTarget(b),C.updateRenderTargetMipmap(b)),E.isScene===!0&&E.onAfterRender(y,E,O),st.resetDefaultState(),R=-1,k=null,v.pop(),v.length>0?(p=v[v.length-1],$===!0&&ne.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function Ce(E,O,H,V){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)H=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Xe.intersectsSprite(E)){V&&Se.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ae);const ge=j.update(E),ue=E.material;ue.visible&&_.push(E,ge,ue,H,Se.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Xe.intersectsObject(E))){const ge=j.update(E),ue=E.material;if(V&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Se.copy(E.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),Se.copy(ge.boundingSphere.center)),Se.applyMatrix4(E.matrixWorld).applyMatrix4(ae)),Array.isArray(ue)){const he=ge.groups;for(let Ae=0,Ie=he.length;Ae<Ie;Ae++){const we=he[Ae],at=ue[we.materialIndex];at&&at.visible&&_.push(E,ge,at,H,Se.z,we)}}else ue.visible&&_.push(E,ge,ue,H,Se.z,null)}}const se=E.children;for(let ge=0,ue=se.length;ge<ue;ge++)Ce(se[ge],O,H,V)}function He(E,O,H,V){const N=E.opaque,se=E.transmissive,ge=E.transparent;p.setupLightsView(H),$===!0&&ne.setGlobalState(y.clippingPlanes,H),V&&B.viewport(x.copy(V)),N.length>0&&$e(N,O,H),se.length>0&&$e(se,O,H),ge.length>0&&$e(ge,O,H),B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function It(E,O,H,V){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[V.id]===void 0&&(p.state.transmissionRenderTarget[V.id]=new Qr(1,1,{generateMipmaps:!0,type:Ne.has("EXT_color_buffer_half_float")||Ne.has("EXT_color_buffer_float")?Ha:Wi,minFilter:Hr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:dt.workingColorSpace}));const se=p.state.transmissionRenderTarget[V.id],ge=V.viewport||x;se.setSize(ge.z,ge.w);const ue=y.getRenderTarget();y.setRenderTarget(se),y.getClearColor(I),F=y.getClearAlpha(),F<1&&y.setClearColor(16777215,.5),y.clear(),Ve&&ye.render(H);const he=y.toneMapping;y.toneMapping=fr;const Ae=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),p.setupLightsView(V),$===!0&&ne.setGlobalState(y.clippingPlanes,V),$e(E,H,V),C.updateMultisampleRenderTarget(se),C.updateRenderTargetMipmap(se),Ne.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let we=0,at=O.length;we<at;we++){const it=O[we],mt=it.object,Yt=it.geometry,Je=it.material,Pe=it.group;if(Je.side===Oi&&mt.layers.test(V.layers)){const Jt=Je.side;Je.side=En,Je.needsUpdate=!0,Tt(mt,H,V,Yt,Je,Pe),Je.side=Jt,Je.needsUpdate=!0,Ie=!0}}Ie===!0&&(C.updateMultisampleRenderTarget(se),C.updateRenderTargetMipmap(se))}y.setRenderTarget(ue),y.setClearColor(I,F),Ae!==void 0&&(V.viewport=Ae),y.toneMapping=he}function $e(E,O,H){const V=O.isScene===!0?O.overrideMaterial:null;for(let N=0,se=E.length;N<se;N++){const ge=E[N],ue=ge.object,he=ge.geometry,Ae=V===null?ge.material:V,Ie=ge.group;ue.layers.test(H.layers)&&Tt(ue,O,H,he,Ae,Ie)}}function Tt(E,O,H,V,N,se){E.onBeforeRender(y,O,H,V,N,se),E.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),N.onBeforeRender(y,O,H,V,E,se),N.transparent===!0&&N.side===Oi&&N.forceSinglePass===!1?(N.side=En,N.needsUpdate=!0,y.renderBufferDirect(H,O,V,N,E,se),N.side=yr,N.needsUpdate=!0,y.renderBufferDirect(H,O,V,N,E,se),N.side=Oi):y.renderBufferDirect(H,O,V,N,E,se),E.onAfterRender(y,O,H,V,N,se)}function Ut(E,O,H){O.isScene!==!0&&(O=We);const V=Le.get(E),N=p.state.lights,se=p.state.shadowsArray,ge=N.state.version,ue=xe.getParameters(E,N.state,se,O,H),he=xe.getProgramCacheKey(ue);let Ae=V.programs;V.environment=E.isMeshStandardMaterial?O.environment:null,V.fog=O.fog,V.envMap=(E.isMeshStandardMaterial?X:w).get(E.envMap||V.environment),V.envMapRotation=V.environment!==null&&E.envMap===null?O.environmentRotation:E.envMapRotation,Ae===void 0&&(E.addEventListener("dispose",Ye),Ae=new Map,V.programs=Ae);let Ie=Ae.get(he);if(Ie!==void 0){if(V.currentProgram===Ie&&V.lightsStateVersion===ge)return _t(E,ue),Ie}else ue.uniforms=xe.getUniforms(E),E.onBeforeCompile(ue,y),Ie=xe.acquireProgram(ue,he),Ae.set(he,Ie),V.uniforms=ue.uniforms;const we=V.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(we.clippingPlanes=ne.uniform),_t(E,ue),V.needsLights=St(E),V.lightsStateVersion=ge,V.needsLights&&(we.ambientLightColor.value=N.state.ambient,we.lightProbe.value=N.state.probe,we.directionalLights.value=N.state.directional,we.directionalLightShadows.value=N.state.directionalShadow,we.spotLights.value=N.state.spot,we.spotLightShadows.value=N.state.spotShadow,we.rectAreaLights.value=N.state.rectArea,we.ltc_1.value=N.state.rectAreaLTC1,we.ltc_2.value=N.state.rectAreaLTC2,we.pointLights.value=N.state.point,we.pointLightShadows.value=N.state.pointShadow,we.hemisphereLights.value=N.state.hemi,we.directionalShadowMap.value=N.state.directionalShadowMap,we.directionalShadowMatrix.value=N.state.directionalShadowMatrix,we.spotShadowMap.value=N.state.spotShadowMap,we.spotLightMatrix.value=N.state.spotLightMatrix,we.spotLightMap.value=N.state.spotLightMap,we.pointShadowMap.value=N.state.pointShadowMap,we.pointShadowMatrix.value=N.state.pointShadowMatrix),V.currentProgram=Ie,V.uniformsList=null,Ie}function bt(E){if(E.uniformsList===null){const O=E.currentProgram.getUniforms();E.uniformsList=Ko.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function _t(E,O){const H=Le.get(E);H.outputColorSpace=O.outputColorSpace,H.batching=O.batching,H.batchingColor=O.batchingColor,H.instancing=O.instancing,H.instancingColor=O.instancingColor,H.instancingMorph=O.instancingMorph,H.skinning=O.skinning,H.morphTargets=O.morphTargets,H.morphNormals=O.morphNormals,H.morphColors=O.morphColors,H.morphTargetsCount=O.morphTargetsCount,H.numClippingPlanes=O.numClippingPlanes,H.numIntersection=O.numClipIntersection,H.vertexAlphas=O.vertexAlphas,H.vertexTangents=O.vertexTangents,H.toneMapping=O.toneMapping}function ft(E,O,H,V,N){O.isScene!==!0&&(O=We),C.resetTextureUnits();const se=O.fog,ge=V.isMeshStandardMaterial?O.environment:null,ue=b===null?y.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:Sr,he=(V.isMeshStandardMaterial?X:w).get(V.envMap||ge),Ae=V.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Ie=!!H.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),we=!!H.morphAttributes.position,at=!!H.morphAttributes.normal,it=!!H.morphAttributes.color;let mt=fr;V.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(mt=y.toneMapping);const Yt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Je=Yt!==void 0?Yt.length:0,Pe=Le.get(V),Jt=p.state.lights;if($===!0&&(Q===!0||E!==k)){const Xn=E===k&&V.id===R;ne.setState(V,E,Xn)}let ht=!1;V.version===Pe.__version?(Pe.needsLights&&Pe.lightsStateVersion!==Jt.state.version||Pe.outputColorSpace!==ue||N.isBatchedMesh&&Pe.batching===!1||!N.isBatchedMesh&&Pe.batching===!0||N.isBatchedMesh&&Pe.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Pe.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Pe.instancing===!1||!N.isInstancedMesh&&Pe.instancing===!0||N.isSkinnedMesh&&Pe.skinning===!1||!N.isSkinnedMesh&&Pe.skinning===!0||N.isInstancedMesh&&Pe.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Pe.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Pe.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Pe.instancingMorph===!1&&N.morphTexture!==null||Pe.envMap!==he||V.fog===!0&&Pe.fog!==se||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==ne.numPlanes||Pe.numIntersection!==ne.numIntersection)||Pe.vertexAlphas!==Ae||Pe.vertexTangents!==Ie||Pe.morphTargets!==we||Pe.morphNormals!==at||Pe.morphColors!==it||Pe.toneMapping!==mt||Pe.morphTargetsCount!==Je)&&(ht=!0):(ht=!0,Pe.__version=V.version);let ii=Pe.currentProgram;ht===!0&&(ii=Ut(V,O,N));let ts=!1,Pn=!1,El=!1;const Nt=ii.getUniforms(),qi=Pe.uniforms;if(B.useProgram(ii.program)&&(ts=!0,Pn=!0,El=!0),V.id!==R&&(R=V.id,Pn=!0),ts||k!==E){ze.reverseDepthBuffer?(de.copy(E.projectionMatrix),pv(de),mv(de),Nt.setValue(D,"projectionMatrix",de)):Nt.setValue(D,"projectionMatrix",E.projectionMatrix),Nt.setValue(D,"viewMatrix",E.matrixWorldInverse);const Xn=Nt.map.cameraPosition;Xn!==void 0&&Xn.setValue(D,Ee.setFromMatrixPosition(E.matrixWorld)),ze.logarithmicDepthBuffer&&Nt.setValue(D,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&Nt.setValue(D,"isOrthographic",E.isOrthographicCamera===!0),k!==E&&(k=E,Pn=!0,El=!0)}if(N.isSkinnedMesh){Nt.setOptional(D,N,"bindMatrix"),Nt.setOptional(D,N,"bindMatrixInverse");const Xn=N.skeleton;Xn&&(Xn.boneTexture===null&&Xn.computeBoneTexture(),Nt.setValue(D,"boneTexture",Xn.boneTexture,C))}N.isBatchedMesh&&(Nt.setOptional(D,N,"batchingTexture"),Nt.setValue(D,"batchingTexture",N._matricesTexture,C),Nt.setOptional(D,N,"batchingIdTexture"),Nt.setValue(D,"batchingIdTexture",N._indirectTexture,C),Nt.setOptional(D,N,"batchingColorTexture"),N._colorsTexture!==null&&Nt.setValue(D,"batchingColorTexture",N._colorsTexture,C));const Al=H.morphAttributes;if((Al.position!==void 0||Al.normal!==void 0||Al.color!==void 0)&&ke.update(N,H,ii),(Pn||Pe.receiveShadow!==N.receiveShadow)&&(Pe.receiveShadow=N.receiveShadow,Nt.setValue(D,"receiveShadow",N.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(qi.envMap.value=he,qi.flipEnvMap.value=he.isCubeTexture&&he.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&O.environment!==null&&(qi.envMapIntensity.value=O.environmentIntensity),Pn&&(Nt.setValue(D,"toneMappingExposure",y.toneMappingExposure),Pe.needsLights&&Cn(qi,El),se&&V.fog===!0&&ie.refreshFogUniforms(qi,se),ie.refreshMaterialUniforms(qi,V,G,z,p.state.transmissionRenderTarget[E.id]),Ko.upload(D,bt(Pe),qi,C)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Ko.upload(D,bt(Pe),qi,C),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&Nt.setValue(D,"center",N.center),Nt.setValue(D,"modelViewMatrix",N.modelViewMatrix),Nt.setValue(D,"normalMatrix",N.normalMatrix),Nt.setValue(D,"modelMatrix",N.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Xn=V.uniformsGroups;for(let Rl=0,Am=Xn.length;Rl<Am;Rl++){const Au=Xn[Rl];U.update(Au,ii),U.bind(Au,ii)}}return ii}function Cn(E,O){E.ambientLightColor.needsUpdate=O,E.lightProbe.needsUpdate=O,E.directionalLights.needsUpdate=O,E.directionalLightShadows.needsUpdate=O,E.pointLights.needsUpdate=O,E.pointLightShadows.needsUpdate=O,E.spotLights.needsUpdate=O,E.spotLightShadows.needsUpdate=O,E.rectAreaLights.needsUpdate=O,E.hemisphereLights.needsUpdate=O}function St(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(E,O,H){Le.get(E.texture).__webglTexture=O,Le.get(E.depthTexture).__webglTexture=H;const V=Le.get(E);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=H===void 0,V.__autoAllocateDepthBuffer||Ne.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,O){const H=Le.get(E);H.__webglFramebuffer=O,H.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(E,O=0,H=0){b=E,A=O,T=H;let V=!0,N=null,se=!1,ge=!1;if(E){const he=Le.get(E);if(he.__useDefaultFramebuffer!==void 0)B.bindFramebuffer(D.FRAMEBUFFER,null),V=!1;else if(he.__webglFramebuffer===void 0)C.setupRenderTarget(E);else if(he.__hasExternalTextures)C.rebindTextures(E,Le.get(E.texture).__webglTexture,Le.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const we=E.depthTexture;if(he.__boundDepthTexture!==we){if(we!==null&&Le.has(we)&&(E.width!==we.image.width||E.height!==we.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(E)}}const Ae=E.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(ge=!0);const Ie=Le.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ie[O])?N=Ie[O][H]:N=Ie[O],se=!0):E.samples>0&&C.useMultisampledRTT(E)===!1?N=Le.get(E).__webglMultisampledFramebuffer:Array.isArray(Ie)?N=Ie[H]:N=Ie,x.copy(E.viewport),M.copy(E.scissor),P=E.scissorTest}else x.copy(L).multiplyScalar(G).floor(),M.copy(oe).multiplyScalar(G).floor(),P=Be;if(B.bindFramebuffer(D.FRAMEBUFFER,N)&&V&&B.drawBuffers(E,N),B.viewport(x),B.scissor(M),B.setScissorTest(P),se){const he=Le.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+O,he.__webglTexture,H)}else if(ge){const he=Le.get(E.texture),Ae=O||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,he.__webglTexture,H||0,Ae)}R=-1},this.readRenderTargetPixels=function(E,O,H,V,N,se,ge){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=Le.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ge!==void 0&&(ue=ue[ge]),ue){B.bindFramebuffer(D.FRAMEBUFFER,ue);try{const he=E.texture,Ae=he.format,Ie=he.type;if(!ze.textureFormatReadable(Ae)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ze.textureTypeReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=E.width-V&&H>=0&&H<=E.height-N&&D.readPixels(O,H,V,N,Oe.convert(Ae),Oe.convert(Ie),se)}finally{const he=b!==null?Le.get(b).__webglFramebuffer:null;B.bindFramebuffer(D.FRAMEBUFFER,he)}}},this.readRenderTargetPixelsAsync=async function(E,O,H,V,N,se,ge){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=Le.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ge!==void 0&&(ue=ue[ge]),ue){const he=E.texture,Ae=he.format,Ie=he.type;if(!ze.textureFormatReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ze.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=E.width-V&&H>=0&&H<=E.height-N){B.bindFramebuffer(D.FRAMEBUFFER,ue);const we=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,we),D.bufferData(D.PIXEL_PACK_BUFFER,se.byteLength,D.STREAM_READ),D.readPixels(O,H,V,N,Oe.convert(Ae),Oe.convert(Ie),0);const at=b!==null?Le.get(b).__webglFramebuffer:null;B.bindFramebuffer(D.FRAMEBUFFER,at);const it=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await fv(D,it,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,we),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,se),D.deleteBuffer(we),D.deleteSync(it),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,O=null,H=0){E.isTexture!==!0&&($o("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,E=arguments[1]);const V=Math.pow(2,-H),N=Math.floor(E.image.width*V),se=Math.floor(E.image.height*V),ge=O!==null?O.x:0,ue=O!==null?O.y:0;C.setTexture2D(E,0),D.copyTexSubImage2D(D.TEXTURE_2D,H,0,0,ge,ue,N,se),B.unbindTexture()},this.copyTextureToTexture=function(E,O,H=null,V=null,N=0){E.isTexture!==!0&&($o("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,E=arguments[1],O=arguments[2],N=arguments[3]||0,H=null);let se,ge,ue,he,Ae,Ie;H!==null?(se=H.max.x-H.min.x,ge=H.max.y-H.min.y,ue=H.min.x,he=H.min.y):(se=E.image.width,ge=E.image.height,ue=0,he=0),V!==null?(Ae=V.x,Ie=V.y):(Ae=0,Ie=0);const we=Oe.convert(O.format),at=Oe.convert(O.type);C.setTexture2D(O,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,O.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,O.unpackAlignment);const it=D.getParameter(D.UNPACK_ROW_LENGTH),mt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Yt=D.getParameter(D.UNPACK_SKIP_PIXELS),Je=D.getParameter(D.UNPACK_SKIP_ROWS),Pe=D.getParameter(D.UNPACK_SKIP_IMAGES),Jt=E.isCompressedTexture?E.mipmaps[N]:E.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,Jt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Jt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,ue),D.pixelStorei(D.UNPACK_SKIP_ROWS,he),E.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,N,Ae,Ie,se,ge,we,at,Jt.data):E.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,N,Ae,Ie,Jt.width,Jt.height,we,Jt.data):D.texSubImage2D(D.TEXTURE_2D,N,Ae,Ie,se,ge,we,at,Jt),D.pixelStorei(D.UNPACK_ROW_LENGTH,it),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,mt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Yt),D.pixelStorei(D.UNPACK_SKIP_ROWS,Je),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Pe),N===0&&O.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),B.unbindTexture()},this.copyTextureToTexture3D=function(E,O,H=null,V=null,N=0){E.isTexture!==!0&&($o("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,V=arguments[1]||null,E=arguments[2],O=arguments[3],N=arguments[4]||0);let se,ge,ue,he,Ae,Ie,we,at,it;const mt=E.isCompressedTexture?E.mipmaps[N]:E.image;H!==null?(se=H.max.x-H.min.x,ge=H.max.y-H.min.y,ue=H.max.z-H.min.z,he=H.min.x,Ae=H.min.y,Ie=H.min.z):(se=mt.width,ge=mt.height,ue=mt.depth,he=0,Ae=0,Ie=0),V!==null?(we=V.x,at=V.y,it=V.z):(we=0,at=0,it=0);const Yt=Oe.convert(O.format),Je=Oe.convert(O.type);let Pe;if(O.isData3DTexture)C.setTexture3D(O,0),Pe=D.TEXTURE_3D;else if(O.isDataArrayTexture||O.isCompressedArrayTexture)C.setTexture2DArray(O,0),Pe=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,O.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,O.unpackAlignment);const Jt=D.getParameter(D.UNPACK_ROW_LENGTH),ht=D.getParameter(D.UNPACK_IMAGE_HEIGHT),ii=D.getParameter(D.UNPACK_SKIP_PIXELS),ts=D.getParameter(D.UNPACK_SKIP_ROWS),Pn=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,mt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,mt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,he),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ae),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ie),E.isDataTexture||E.isData3DTexture?D.texSubImage3D(Pe,N,we,at,it,se,ge,ue,Yt,Je,mt.data):O.isCompressedArrayTexture?D.compressedTexSubImage3D(Pe,N,we,at,it,se,ge,ue,Yt,mt.data):D.texSubImage3D(Pe,N,we,at,it,se,ge,ue,Yt,Je,mt),D.pixelStorei(D.UNPACK_ROW_LENGTH,Jt),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ht),D.pixelStorei(D.UNPACK_SKIP_PIXELS,ii),D.pixelStorei(D.UNPACK_SKIP_ROWS,ts),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Pn),N===0&&O.generateMipmaps&&D.generateMipmap(Pe),B.unbindTexture()},this.initRenderTarget=function(E){Le.get(E).__webglFramebuffer===void 0&&C.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?C.setTextureCube(E,0):E.isData3DTexture?C.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?C.setTexture2DArray(E,0):C.setTexture2D(E,0),B.unbindTexture()},this.resetState=function(){A=0,T=0,b=null,B.reset(),st.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===_u?"display-p3":"srgb",t.unpackColorSpace=dt.workingColorSpace===Sl?"display-p3":"srgb"}}class bu{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ct(e),this.density=t}clone(){return new bu(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class AS extends gn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xi,this.environmentIntensity=1,this.environmentRotation=new Xi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class ym extends Ks{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ct(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const fl=new Y,pl=new Y,lf=new kt,aa=new vu,Co=new Xa,xc=new Y,cf=new Y;class RS extends gn{constructor(e=new ni,t=new ym){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)fl.fromBufferAttribute(t,i-1),pl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=fl.distanceTo(pl);e.setAttribute("lineDistance",new pi(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Co.copy(n.boundingSphere),Co.applyMatrix4(i),Co.radius+=s,e.ray.intersectsSphere(Co)===!1)return;lf.copy(i).invert(),aa.copy(e.ray).applyMatrix4(lf);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=d,p=g-1;_<p;_+=c){const m=h.getX(_),v=h.getX(_+1),y=Po(this,e,aa,l,m,v);y&&t.push(y)}if(this.isLineLoop){const _=h.getX(g-1),p=h.getX(d),m=Po(this,e,aa,l,_,p);m&&t.push(m)}}else{const d=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=d,p=g-1;_<p;_+=c){const m=Po(this,e,aa,l,_,_+1);m&&t.push(m)}if(this.isLineLoop){const _=Po(this,e,aa,l,g-1,d);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Po(r,e,t,n,i,s){const a=r.geometry.attributes.position;if(fl.fromBufferAttribute(a,i),pl.fromBufferAttribute(a,s),t.distanceSqToSegment(fl,pl,xc,cf)>n)return;xc.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(xc);if(!(l<e.near||l>e.far))return{distance:l,point:cf.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}class xm extends Ks{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ct(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const hf=new kt,kh=new vu,Lo=new Xa,Do=new Y;class CS extends gn{constructor(e=new ni,t=new xm){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Lo.copy(n.boundingSphere),Lo.applyMatrix4(i),Lo.radius+=s,e.ray.intersectsSphere(Lo)===!1)return;hf.copy(i).invert(),kh.copy(e.ray).applyMatrix4(hf);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,f=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let g=u,_=d;g<_;g++){const p=c.getX(g);Do.fromBufferAttribute(f,p),uf(Do,p,l,i,e,t,this)}}else{const u=Math.max(0,a.start),d=Math.min(f.count,a.start+a.count);for(let g=u,_=d;g<_;g++)Do.fromBufferAttribute(f,g),uf(Do,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function uf(r,e,t,n,i,s,a){const o=kh.distanceSqToPoint(r);if(o<t){const l=new Y;kh.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Su extends ni{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],f=new Y,u=new Y,d=[],g=[],_=[],p=[];for(let m=0;m<=n;m++){const v=[],y=m/n;let S=0;m===0&&a===0?S=.5/t:m===n&&l===Math.PI&&(S=-.5/t);for(let A=0;A<=t;A++){const T=A/t;f.x=-e*Math.cos(i+T*s)*Math.sin(a+y*o),f.y=e*Math.cos(a+y*o),f.z=e*Math.sin(i+T*s)*Math.sin(a+y*o),g.push(f.x,f.y,f.z),u.copy(f).normalize(),_.push(u.x,u.y,u.z),p.push(T+S,1-y),v.push(c++)}h.push(v)}for(let m=0;m<n;m++)for(let v=0;v<t;v++){const y=h[m][v+1],S=h[m][v],A=h[m+1][v],T=h[m+1][v+1];(m!==0||a>0)&&d.push(y,S,T),(m!==n-1||l<Math.PI)&&d.push(S,A,T)}this.setIndex(d),this.setAttribute("position",new pi(g,3)),this.setAttribute("normal",new pi(_,3)),this.setAttribute("uv",new pi(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Su(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class PS{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=df(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=df();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function df(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:hu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=hu);function LS(r){if(!r)return;const e=matchMedia("(prefers-reduced-motion: reduce)").matches,t=new ES({canvas:r,antialias:!0,alpha:!0});t.setPixelRatio(Math.min(devicePixelRatio,2));const n=new AS;n.fog=new bu(461068,.055);const i=new jn(60,1,.1,100);i.position.set(0,2.2,14);const s=1400,a=new Float32Array(s*3),o=42;for(let b=0;b<s;b++)a[b*3]=(Math.random()-.5)*o,a[b*3+1]=(Math.random()-.5)*16,a[b*3+2]=-Math.random()*46;const l=new ni;l.setAttribute("position",new fi(a,3));const c=new CS(l,new xm({color:10465988,size:.06,transparent:!0,opacity:.5,depthWrite:!1}));n.add(c);const h=new Y(0,-1.4,8),f=52;function u(b,R,k){const x=b*Math.PI/180,M=new Y(Math.sin(x),.02,-Math.cos(x)).normalize(),P=[];for(let q=0;q<=1;q+=.02)P.push(h.clone().add(M.clone().multiplyScalar(f*q)));const I=new ni().setFromPoints(P),F=new ym({color:R,transparent:!0,opacity:k});return new RS(I,F)}const d=u(0,15251531,.9),g=u(1,7312308,.42);n.add(d,g);const _=new wi(new Su(.12,16,16),new yu({color:15251531}));_.position.copy(h),n.add(_);const p={x:0,y:0},m={x:0,y:0};window.addEventListener("pointermove",b=>{p.x=b.clientX/innerWidth-.5,p.y=b.clientY/innerHeight-.5});function v(){const b=r.clientWidth||innerWidth,R=r.clientHeight||innerHeight;t.setSize(b,R,!1),i.aspect=b/R,i.updateProjectionMatrix()}v(),window.addEventListener("resize",v);let y;const S=new PS;function A(){const b=S.getElapsedTime();m.x+=(p.x-m.x)*.04,m.y+=(p.y-m.y)*.04,i.position.x=m.x*3,i.position.y=2.2-m.y*1.5,i.lookAt(0,.4,-6);const R=l.attributes.position.array;for(let k=0;k<s;k++)R[k*3+2]+=.02,R[k*3+2]>12&&(R[k*3+2]=-46);l.attributes.position.needsUpdate=!0,c.rotation.z=Math.sin(b*.05)*.03,_.scale.setScalar(1+Math.sin(b*2.4)*.25),t.render(n,i),y=requestAnimationFrame(A)}e?t.render(n,i):A(),e||Pt.fromTo(g.material,{opacity:0},{opacity:.42,duration:3,delay:1.2,ease:"power2.out"}),new IntersectionObserver(b=>{b.forEach(R=>{R.isIntersecting?!y&&!e&&A():y&&(cancelAnimationFrame(y),y=null)})},{threshold:.01}).observe(r)}function Tl(r,e){const t=r.getContext("2d"),n={ctx:t,w:0,h:0,dpr:Math.min(devicePixelRatio||1,2)};function i(s){const a=r.parentElement.getBoundingClientRect();n.w=a.width,n.h=a.height,r.width=Math.round(a.width*n.dpr),r.height=Math.round(a.height*n.dpr),r.style.width=a.width+"px",r.style.height=a.height+"px",t.setTransform(n.dpr,0,0,n.dpr,0,0),!s&&e&&e(n)}return i(!0),window.addEventListener("resize",()=>i(!1)),n}function Mu(r,e,t){Fe.create({trigger:r,start:"top 78%",end:"bottom 40%",scrub:.6,onUpdate:n=>{const i=n.progress;if(t(i),e&&e.length){const s=Math.min(e.length-1,Math.floor(i*e.length));e.forEach((a,o)=>a.classList.toggle("is-active",o===s))}}})}const ml=(r,e,t)=>r+(e-r)*t,pr=(r,e,t)=>Math.max(e,Math.min(t,r));function Ui(r,e,t){return pr((r-e)/(t-e),0,1)}function lr(r){return 1-Math.pow(1-r,3)}function DS(r){if(!r)return;const e=r.querySelector("#latency-canvas"),t=Array.from(r.querySelectorAll(".viz-step")),n="#e8b84b",i="#c8563f",s="#6f93b4",a="#a7a599",o="rgba(233,230,221,0.10)";let l,c=0;const h={east:[.86,.5],ardennes:[.54,.4],sedan:[.44,.52],coast:[.16,.26],belgium:[.74,.18],allied:[.3,.6],paris:[.46,.8]},f=v=>[v[0]*l.w,v[1]*l.h];function u(){const{ctx:v,w:y,h:S}=l;v.strokeStyle=o,v.lineWidth=1;for(let A=0;A<=y;A+=y/12)v.beginPath(),v.moveTo(A,0),v.lineTo(A,S),v.stroke();for(let A=0;A<=S;A+=S/9)v.beginPath(),v.moveTo(0,A),v.lineTo(y,A),v.stroke()}function d(v,y,S,A=3){const{ctx:T}=l,[b,R]=f(v);T.fillStyle=S,T.beginPath(),T.arc(b,R,A,0,7),T.fill(),y&&(T.fillStyle=a,T.font='9px "Space Mono", monospace',T.fillText(y,b+7,R+3))}function g(v,y,S,A,T){const{ctx:b}=l,R=v.map(f);let k=0;const x=[];for(let I=1;I<R.length;I++){const F=Math.hypot(R[I][0]-R[I-1][0],R[I][1]-R[I-1][1]);x.push(F),k+=F}let M=k*y;b.strokeStyle=S,b.lineWidth=A,b.lineCap="round",b.lineJoin="round",b.setLineDash([]),b.beginPath(),b.moveTo(R[0][0],R[0][1]);let P=R[0];for(let I=1;I<R.length&&!(M<=0);I++){const F=x[I-1];if(M>=F)b.lineTo(R[I][0],R[I][1]),P=R[I],M-=F;else{const q=M/F,z=ml(R[I-1][0],R[I][0],q),G=ml(R[I-1][1],R[I][1],q);b.lineTo(z,G),P=[z,G],M=0}}return b.stroke(),b.setLineDash([]),P}function _(v,y,S,A=7){const{ctx:T}=l,b=Math.atan2(y[1],y[0]);T.fillStyle=S,T.beginPath(),T.moveTo(v[0],v[1]),T.lineTo(v[0]-A*Math.cos(b-.4),v[1]-A*Math.sin(b-.4)),T.lineTo(v[0]-A*Math.cos(b+.4),v[1]-A*Math.sin(b+.4)),T.closePath(),T.fill()}function p(v){const{ctx:y,w:S,h:A}=l;y.save(),y.globalAlpha=v;const T=S*.5,b=A*.3,R=S*.62,k=T-R/2;y.font='10px "Space Mono", monospace',[{y:b,label:"GERMAN LOOP · signal → action",frac:.22,color:n,ticks:1},{y:b+A*.24,label:"FRENCH LOOP · signal → authority → action",frac:1,color:s,ticks:5}].forEach(M=>{y.fillStyle=a,y.fillText(M.label,k,M.y-10),y.strokeStyle=o,y.lineWidth=8,y.lineCap="round",y.beginPath(),y.moveTo(k,M.y),y.lineTo(k+R,M.y),y.stroke(),y.strokeStyle=M.color,y.beginPath(),y.moveTo(k,M.y),y.lineTo(k+R*M.frac,M.y),y.stroke();for(let I=1;I<M.ticks;I++){const F=k+R*M.frac*(I/M.ticks);y.fillStyle="#07090c",y.beginPath(),y.arc(F,M.y,3,0,7),y.fill(),y.strokeStyle=M.color,y.lineWidth=1.5,y.beginPath(),y.arc(F,M.y,3,0,7),y.stroke(),y.lineWidth=8}const P=k+R*M.frac;y.fillStyle=M.color,y.beginPath(),y.arc(P,M.y,5,0,7),y.fill()}),y.fillStyle=n,y.font='italic 13px "Fraunces", serif',y.fillText("Strength arrives late.",k,b+A*.24+40),y.restore()}function m(){const{ctx:v,w:y,h:S}=l;v.clearRect(0,0,y,S);const A=1-Ui(c,.74,.92)*.72;v.save(),v.globalAlpha=A,u();const T=lr(Ui(c,.02,.22));if(T>0){v.save(),v.globalAlpha=A*T;const[M,P]=f(h.allied);v.strokeStyle=s,v.lineWidth=2,v.strokeRect(M-46,P+14,92,22),v.fillStyle=s,v.font='9px "Space Mono", monospace',v.fillText("CHAR B1 bis — 60mm armor",M-42,P+28),v.restore()}const b=Ui(c,.24,.5);if(b>0){const M=g([h.allied,[.52,.34],h.belgium],lr(b),s,5);_(M,[1,-.6],s,8),d(h.belgium,"BELGIUM",s)}const R=Ui(c,.3,.5);if(R>0){v.save(),v.globalAlpha=A*R;const[M,P]=f(h.ardennes);v.strokeStyle="rgba(200,86,63,0.5)",v.setLineDash([4,4]),v.lineWidth=1.5,v.beginPath(),v.arc(M,P,34,0,7),v.stroke(),v.setLineDash([]),v.fillStyle=i,v.font='9px "Space Mono", monospace',v.fillText('ARDENNES · "impassable"',M-30,P-40),v.restore()}const k=Ui(c,.5,.74);if(k>0){const M=g([h.east,h.ardennes,h.sedan,h.coast],lr(k),n,3.5);_(M,[-1,-.7],n,8),d(h.sedan,"SEDAN",n),d(h.coast,"ABBEVILLE",n),d(h.east,"",n,4)}d(h.paris,"PARIS",a,2.5),v.restore();const x=Ui(c,.74,1);x>0&&p(lr(x))}l=Tl(e,m),m(),Mu(r,t,v=>{c=v,m()})}function kS(r){if(!r)return;const e=r.querySelector("#yamato-canvas"),t=r.querySelector("#yamato-toggle"),n=Array.from(t.querySelectorAll(".toggle-opt")),i=Array.from(r.querySelectorAll(".viz-mode-copy")),s="#e8b84b",a="#6f93b4",o="#a7a599";let l;const c={m:0},h=matchMedia("(prefers-reduced-motion: reduce)").matches,f=[{k:"RADAR",sub:"sense",a:-Math.PI/2},{k:"FIRE CONTROL",sub:"compute",a:-Math.PI/2+2*Math.PI/5},{k:"CARRIER AIR",sub:"reach",a:-Math.PI/2+4*Math.PI/5},{k:"LOGISTICS",sub:"sustain",a:-Math.PI/2+6*Math.PI/5},{k:"COMMS",sub:"coordinate",a:-Math.PI/2+8*Math.PI/5}];function u(y,S,A,T){const{ctx:b}=l;b.save(),b.translate(y,S),b.scale(A,A),T>0&&(b.shadowColor=s,b.shadowBlur=26*T),b.fillStyle="#c9c4b6",b.beginPath(),b.moveTo(-58,0),b.quadraticCurveTo(-58,7,-40,8),b.lineTo(46,8),b.quadraticCurveTo(64,6,72,0),b.lineTo(46,-4),b.lineTo(-40,-4),b.quadraticCurveTo(-58,-4,-58,0),b.closePath(),b.fill(),b.fillStyle="#8f8a7d",b.fillRect(-6,-18,12,14),b.fillRect(-30,-9,12,6),b.fillRect(18,-9,12,6),b.fillStyle="#726d61",b.fillRect(-2,-30,4,14),b.restore()}let d=0,g=null,_=0;function p(){const{ctx:y,w:S,h:A}=l;d+=.016,y.clearRect(0,0,S,A);const T=S/2,b=A/2,R=c.m,k=1-pr(R*1.4,0,1);if(k>.001){y.save(),y.globalAlpha=k,y.strokeStyle="rgba(233,230,221,0.10)",y.setLineDash([5,8]),y.beginPath(),y.arc(T,b,Math.min(S,A)*.42,0,7),y.stroke(),y.setLineDash([]);const M=d*.5,P=y.createLinearGradient(T,b,T+Math.cos(M)*200,b+Math.sin(M)*200);P.addColorStop(0,"rgba(232,184,75,0.28)"),P.addColorStop(1,"rgba(232,184,75,0)"),y.strokeStyle=P,y.lineWidth=2,y.beginPath(),y.moveTo(T,b),y.lineTo(T+Math.cos(M)*Math.min(S,A)*.42,b+Math.sin(M)*Math.min(S,A)*.42),y.stroke(),_=.3+Math.sin(d*.4)*.3,y.globalAlpha=k*pr(_,0,.5),u(T+Math.min(S,A)*.4,b,.5,0),y.globalAlpha=k,y.fillStyle=o,y.font='italic 12px "Fraunces", serif',y.textAlign="center",y.fillText("Kantai Kessen — the decisive duel that never came",T,A-22),y.textAlign="left",y.restore()}const x=pr((R-.2)*1.4,0,1);if(x>.001){y.save(),y.globalAlpha=x;const M=Math.min(S,A)*.36;f.forEach((P,I)=>{const F=T+Math.cos(P.a)*M,q=b+Math.sin(P.a)*M;if(y.strokeStyle="rgba(111,147,180,0.35)",y.lineWidth=1,y.beginPath(),y.moveTo(F,q),y.lineTo(T,b),y.stroke(),!h){const z=(d*.5+I*.2)%1,G=ml(F,T,z),W=ml(q,b,z);y.fillStyle=s,y.beginPath(),y.arc(G,W,2.2,0,7),y.fill()}y.fillStyle="#0e131b",y.strokeStyle=a,y.lineWidth=1.5,y.beginPath(),y.arc(F,q,5,0,7),y.fill(),y.stroke(),y.fillStyle=o,y.font='9px "Space Mono", monospace',y.textAlign="center",y.fillText(P.k,F,q-12),y.fillStyle="#6b6d6a",y.fillText(P.sub,F,q+18),y.textAlign="left"}),y.restore()}u(T,b,.92,x),x>.3&&(y.save(),y.globalAlpha=x,y.fillStyle=s,y.font='9px "Space Mono", monospace',y.textAlign="center",y.fillText("ACTUATOR",T,b+34),y.textAlign="left",y.restore()),g=requestAnimationFrame(p)}function m(y){n.forEach(S=>S.classList.toggle("is-active",S.dataset.mode===y)),i.forEach(S=>S.classList.toggle("is-hidden",S.dataset.mode!==y)),Pt.to(c,{m:y==="adapt"?1:0,duration:1,ease:"power3.inOut"})}n.forEach(y=>y.addEventListener("click",()=>m(y.dataset.mode))),l=Tl(e),e.style.cursor="pointer",e.title="Open the Yamato dossier",e.addEventListener("click",()=>{window.__openDossier&&window.__openDossier("yamato")}),new IntersectionObserver(y=>y.forEach(S=>{S.isIntersecting?g||p():g&&(cancelAnimationFrame(g),g=null)}),{threshold:.05}).observe(e)}function IS(r){if(!r)return;const e=r.querySelector("#scoreboard-canvas"),t=Array.from(r.querySelectorAll(".viz-step")),n="#e8b84b",i="#6f93b4",s="#c8563f",a="#a7a599",o="rgba(233,230,221,0.09)";let l,c=0;const h=1940.2,f=1943.6;function u(v){const y=h+v*(f-h);if(y<1943.3)return .18+.62*(1-Math.exp(-2.4*v))+.05*Math.sin(y*7);const S=(y-1943.3)/(f-1943.3);return(.18+.62*(1-Math.exp(-2.4*((1943.3-h)/(f-h))))+.02)*(1-lr(pr(S*1.2,0,1))*.86)}function d(v){const S=(h+v*(f-h)-1941.6)*1.4;return .06+.86/(1+Math.exp(-S))}function g(v,y,S,A,T){const{ctx:b}=l,R=_.l,k=l.w-_.r,x=_.t,M=l.h-_.b;b.strokeStyle=S,b.lineWidth=A,b.lineJoin="round",T?b.setLineDash(T):b.setLineDash([]),b.beginPath();for(let P=0;P<=200;P++){const I=P/200*y,F=v(I),q=R+I*(k-R),z=M-F*(M-x);P===0?b.moveTo(q,z):b.lineTo(q,z)}b.stroke(),b.setLineDash([])}const _={l:46,r:20,t:28,b:34};function p(){let v=.5,y=9;for(let S=0;S<=200;S++){const A=S/200,T=Math.abs(d(A)-u(A));h+A*(f-h)<1943.3&&T<y&&(y=T,v=A)}return v}function m(){const{ctx:v,w:y,h:S}=l;v.clearRect(0,0,y,S);const A=_.l,T=y-_.r,b=_.t,R=S-_.b;v.strokeStyle=o,v.lineWidth=1,v.font='9px "Space Mono", monospace',v.fillStyle="#6b6d6a";for(let P=0;P<=4;P++){const I=R-P/4*(R-b);v.beginPath(),v.moveTo(A,I),v.lineTo(T,I),v.stroke()}[1940,1941,1942,1943].forEach(P=>{const I=(P+.2-h)/(f-h),F=A+I*(T-A);v.fillText("'"+String(P).slice(2),F-6,R+18)}),v.save(),v.translate(14,(b+R)/2),v.rotate(-Math.PI/2),v.fillText("INDEX",-18,0),v.restore();const k=lr(Ui(c,0,.42)),x=lr(Ui(c,.34,.66)),M=lr(Ui(c,.5,.78));if(k>0){const P=c<.5?.86*k+.02:.88+.12*M;g(u,P,n,2.4,null),v.fillStyle=n,v.font='9px "Space Mono", monospace',v.fillText("TONNAGE SUNK",A+6,b+12)}if(x>0&&(v.save(),v.globalAlpha=x,g(d,.94,i,1.8,[5,5]),v.restore(),v.save(),v.globalAlpha=x,v.fillStyle=i,v.font='9px "Space Mono", monospace',v.fillText("OUTSIDE VARIABLES · HF/DF · 10cm RADAR · VLR AIR · CVEs",A+6,R-d(.94)*(R-b)-8),v.restore()),M>.15){const P=p(),I=A+P*(T-A),F=R-u(P)*(R-b);v.save(),v.globalAlpha=pr((M-.15)*1.5,0,1),v.strokeStyle="rgba(233,230,221,0.28)",v.setLineDash([3,4]),v.beginPath(),v.moveTo(I,b),v.lineTo(I,R),v.stroke(),v.setLineDash([]),v.fillStyle=a,v.beginPath(),v.arc(I,F,4,0,7),v.fill(),v.font='italic 11px "Fraunces", serif',v.fillStyle=a,v.fillText("the ocean had already crossed over",I-150,F-12),v.restore()}if(M>.4){const P=(1943.35-h)/(f-h),I=A+P*(T-A),F=R-u(P)*(R-b);v.save(),v.globalAlpha=pr((M-.4)*1.6,0,1),v.fillStyle=s,v.beginPath(),v.arc(I,F,5,0,7),v.fill(),v.strokeStyle=s,v.lineWidth=1,v.beginPath(),v.moveTo(I,F),v.lineTo(I-4,F+40),v.stroke(),v.font='10px "Space Mono", monospace',v.fillStyle=s,v.fillText("BLACK MAY 1943",I-96,F+54),v.font='9px "Space Mono", monospace',v.fillStyle=a,v.fillText("41 U-boats lost — a quarter of the fleet",I-118,F+68),v.restore()}}l=Tl(e,m),m(),Mu(r,t,v=>{c=v,m()})}function US(r){if(!r)return;const e=r.querySelector("#midway-canvas"),t=Array.from(r.querySelectorAll(".viz-step")),n="#52a494",i="#e8b84b",s="#a7a599",a="rgba(233,230,221,0.10)";let o,l=0,c=0,h=null;const f=matchMedia("(prefers-reduced-motion: reduce)").matches,u=[{k:"SIGNAL",s:'HYPO · "AF"'},{k:"TEST",s:"AF is short of water"},{k:"PERMISSION",s:"Nimitz commits"},{k:"CAPACITY",s:"Yorktown · 72 hrs"},{k:"ACTION",s:"positioned NE"}];function d(v){const y=o.w/2,S=o.h/2+6,A=Math.min(o.w,o.h)*.33,T=-Math.PI/2+v/u.length*Math.PI*2;return[y+Math.cos(T)*A,S+Math.sin(T)*A,T]}function g(){const{ctx:v,w:y,h:S}=o;v.clearRect(0,0,y,S);const A=pr(Math.floor(l*u.length),0,u.length-1),T=y/2,b=S/2+6,R=Math.min(y,S)*.33;v.strokeStyle=a,v.lineWidth=1,v.beginPath(),v.arc(T,b,R,0,7),v.stroke();for(let k=0;k<u.length;k++){const[x,M]=d(k),[P,I]=d((k+1)%u.length),F=k<A||l>=.98;v.strokeStyle=F?"rgba(82,164,148,0.6)":a,v.lineWidth=F?2:1,v.beginPath(),v.moveTo(x,M),v.lineTo(P,I),v.stroke();const q=(x+P)/2,z=(M+I)/2,G=Math.atan2(I-M,P-x);v.fillStyle=F?n:"#3a3d3a",v.beginPath(),v.moveTo(q+6*Math.cos(G),z+6*Math.sin(G)),v.lineTo(q-5*Math.cos(G-.5),z-5*Math.sin(G-.5)),v.lineTo(q-5*Math.cos(G+.5),z-5*Math.sin(G+.5)),v.closePath(),v.fill()}if(!f){const k=c*.18%u.length,x=Math.floor(k),M=k-x,[P,I]=d(x),[F,q]=d((x+1)%u.length),z=P+(F-P)*M,G=I+(q-I)*M;v.fillStyle=i,v.shadowColor=i,v.shadowBlur=10,v.beginPath(),v.arc(z,G,3,0,7),v.fill(),v.shadowBlur=0}u.forEach((k,x)=>{const[M,P]=d(x),I=x<=A;(x===A?1:0)&&(v.shadowColor=n,v.shadowBlur=18),v.fillStyle=I?"#0e1a18":"#0e131b",v.strokeStyle=I?n:"#3a3d3a",v.lineWidth=2,v.beginPath(),v.arc(M,P,10,0,7),v.fill(),v.stroke(),v.shadowBlur=0,v.fillStyle=I?n:"#6b6d6a",v.font='bold 10px "Space Mono", monospace',v.textAlign="center",v.fillText(k.k,M,P+(P<b?-18:26)),v.fillStyle=I?s:"#4a4c49",v.font='9px "Space Mono", monospace',v.fillText(k.s,M,P+(P<b?-6:38)),v.textAlign="left"}),v.textAlign="center",v.fillStyle=s,v.font='italic 13px "Fraunces", serif',v.fillText("enough evidence,",T,b-4),v.fillText("in time",T,b+14),v.textAlign="left"}function _(){c+=.016,g(),h=requestAnimationFrame(_)}o=Tl(e,g),g();const p=["station-hypo","af-water-ruse","nimitz","yorktown","spruance"];e.style.cursor="pointer",e.title="Click a node to open its dossier",e.addEventListener("click",v=>{const y=e.getBoundingClientRect(),S=v.clientX-y.left,A=v.clientY-y.top;let T=-1,b=1e9;for(let R=0;R<u.length;R++){const[k,x]=d(R),M=Math.hypot(k-S,x-A);M<b&&(b=M,T=R)}b<46&&window.__openDossier&&window.__openDossier(p[T])}),Mu(r,t,v=>{l=v,f&&g()}),new IntersectionObserver(v=>v.forEach(y=>{y.isIntersecting&&!f?h||_():h&&(cancelAnimationFrame(h),h=null)}),{threshold:.05}).observe(e)}function NS(){FS(),zS(),GS()}const OS=[{n:"TEST I",name:"Latency",q:"How long between the first meaningful signal and legitimate action?",v:"var(--a-late)",d:"sedan-1940"},{n:"TEST II",name:"Aim",q:"What problem is the system actually built to solve?",v:"var(--a-aim)",d:"kantai-kessen"},{n:"TEST III",name:"Scoreboard",q:"Can the metric expose the failure of the doctrine that created it?",v:"var(--a-score)",d:"black-may"},{n:"TEST IV",name:"Evidence",q:"What is enough to act before certainty arrives too late?",v:"var(--a-build)",d:"af-water-ruse"},{n:"TEST V",name:"Intent",q:"What outcome is this authorized to make true — and who can stop it once it performs?",v:"var(--a-atom)",d:"oppenheimer"}];function FS(){const r=document.getElementById("tests-grid");r&&(r.innerHTML=OS.map(e=>`
    <button class="test-tile" style="--tt-accent:${e.v}" data-dossier="${e.d}">
      <div class="tt-num">${e.n}</div>
      <div><div class="tt-name">${e.name}</div><div class="tt-q">${e.q}</div><div class="tt-open">◇ open the case</div></div>
    </button>`).join(""),Pt.fromTo(r.children,{y:30,opacity:0},{y:0,opacity:1,duration:.8,stagger:.12,ease:"power3.out",scrollTrigger:{trigger:r,start:"top 80%"}}))}const BS=[{name:"Positioned Capacity",desc:"people · capital · options, before need"},{name:"Signal",desc:"events · anomalies · shifts"},{name:"Context",desc:"rules · history · relationships"},{name:"Evidence",desc:"data interpreted against a question"},{name:"Reasoning",desc:"known → likely → follows"},{name:"Intent",desc:"outcome · who bears it · what must stay true",key:!0},{name:"Permission",desc:"thresholds · reversibility · authority",key:!0},{name:"Action",desc:"what changes the world"},{name:"Proof",desc:"what actually happened"},{name:"Learning",desc:"reopens intent — not just execution"}];function zS(){const r=document.getElementById("stack-viz");if(!r)return;r.innerHTML=BS.map(t=>`
    <div class="stack-layer ${t.key?"is-permission":""}">
      <span class="sl-pulse"></span>
      <span class="sl-name">${t.name}</span>
      <span class="sl-desc">${t.desc}</span>
    </div>`).join("");const e=Array.from(r.children);Pt.to(e,{opacity:1,x:0,duration:.7,stagger:.14,ease:"power3.out",scrollTrigger:{trigger:r,start:"top 75%"},onComplete(){HS(e)}})}function HS(r){const e=Pt.timeline({repeat:-1,repeatDelay:1.4});r.forEach(t=>{const n=t.querySelector(".sl-pulse");e.to(n,{opacity:1,duration:.18,ease:"none"},">").to(n,{opacity:0,duration:.5,ease:"power2.out"},">-0.02")})}const ff=["What outcome are we trying to make true — and where does the material change first appear?","What must remain true while the system acts?","What evidence is enough to justify the next move before certainty becomes late?","Who is trusted to interpret the evidence?","Who benefits, who bears the risk, and who owns the consequence?","What permission can be designed before the signal arrives?","Which actions are reversible — and which create obligations that cannot be undone?","What capacity must already be positioned before need?","What can stop the system after it begins to perform?","What result is strong enough to rewrite the next decision — or invalidate the mandate?"];function GS(){const r=document.getElementById("board-quiz");if(!r)return;const e=new Array(ff.length).fill(0);r.innerHTML=ff.map((i,s)=>`
    <div class="board-q">
      <div class="board-q-text"><span class="board-q-num">Q${s+1}</span>${i}</div>
      <div class="board-scale" data-q="${s}">
        ${[1,2,3,4,5].map(a=>`<button data-v="${a}" title="${a===1?"ad hoc / undefined":a===5?"designed & fast":""}">${a}</button>`).join("")}
      </div>
    </div>`).join("")+`
    <div class="board-scalekey">1 = assembled ad hoc, authority gathers late &nbsp;·&nbsp; 5 = designed in advance, evidence moves</div>
    <div class="board-result" id="board-result"></div>`;const t=r.querySelector("#board-result");r.querySelectorAll(".board-scale").forEach(i=>{const s=parseInt(i.dataset.q,10);i.querySelectorAll("button").forEach(a=>{a.addEventListener("click",()=>{i.querySelectorAll("button").forEach(o=>o.classList.remove("is-sel")),a.classList.add("is-sel"),e[s]=parseInt(a.dataset.v,10),WS(t,e)})})});const n=r.querySelector(".board-scalekey");n&&(n.style.cssText="font-family:var(--mono);font-size:9.5px;letter-spacing:1px;color:var(--ink-faint);margin-top:18px;text-align:center;")}function VS(r){return r>=4.2?{label:"DECISION ARCHITECTURE",color:"var(--a-build)",text:"Signal, evidence, permission, action, and learning move together. The visible sign is subtraction — meetings and approvals that existed only because evidence could not be trusted in time have begun to disappear."}:r>=3.2?{label:"ADAPTING",color:"var(--signal)",text:"The loop is closing, but permission still lags the signal in places. Find the one recurring decision where authority gathers after the window has already closed."}:r>=2.2?{label:"ADOPTING, NOT ADAPTING",color:"var(--a-aim)",text:"You own intelligence. It has not yet changed how decisions move. This is the AI-Yamato risk: a larger gun mounted on the old doctrine."}:{label:"UNMANAGED DISTANCE",color:"var(--a-late)",text:"Strength arrives late, and the scoreboard may still look fine. This is 1940 France with better software: visibility without permission, reporting without authority."}}function WS(r,e){const t=e.filter(a=>a>0);if(t.length<3){r.classList.remove("is-live"),r.innerHTML='<div style="font-family:var(--mono);font-size:10px;letter-spacing:2px;color:var(--ink-faint)">ANSWER AT LEAST THREE TO READ YOUR DISTANCE</div>';return}const n=t.reduce((a,o)=>a+o,0)/t.length,i=Math.round((5-n)/4*100),s=VS(n);r.classList.remove("is-live"),r.offsetWidth,r.classList.add("is-live"),r.innerHTML=`
    <div class="board-gauge" style="color:${s.color}">${i}<span style="font-size:0.4em;color:var(--ink-faint)"> / 100</span></div>
    <div class="board-verdict" style="color:${s.color}">UNMANAGED DISTANCE INDEX · ${s.label}</div>
    <div class="board-readout">${s.text}</div>
    <div style="font-family:var(--mono);font-size:9px;letter-spacing:1px;color:var(--ink-faint);margin-top:14px">${t.length}/10 answered · lower distance = evidence becomes legitimate action before value decays</div>`}function XS(r){if(!r)return;const e=document.createElement("div");e.className="atom-clock",e.innerHTML=`
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
    </div>`,r.insertBefore(e,r.firstChild);const t=e.querySelector(".dc-ticks");let n="";for(let u=0;u<60;u++){const d=u/60*Math.PI*2,g=u%5===0,_=112,p=g?100:106;n+=`<line x1="${120+_*Math.sin(d)}" y1="${120-_*Math.cos(d)}" x2="${120+p*Math.sin(d)}" y2="${120-p*Math.cos(d)}" class="dc-tick" opacity="${g?.5:.22}"/>`}t.innerHTML=n;const i=e.querySelector("#dc-hand"),s=e.querySelector("#dc-secs"),a=180,o=85,l=u=>-(u/60)*6;Pt.set(i,{rotation:l(a),transformOrigin:"120px 120px"}),Fe.create({trigger:e,start:"top 72%",once:!0,onEnter(){Pt.to(i,{rotation:l(o),duration:2.6,ease:"power2.inOut"}),Pt.to({v:a},{v:o,duration:2.6,ease:"power2.inOut",onUpdate(){s.textContent=Math.round(this.targets()[0].v)}})}});const c=r.querySelector("#atom-timeline"),h=[{d:"DEC 1938",t:"The Fact",b:"Meitner and Frisch, working with pencil and paper in the snow, follow the missing mass into energy. The nucleus has split. A physical fact enters the world — no bomb in the arithmetic. Institutions will decide what it becomes."},{d:"AUG 1939",t:"The Intent",b:"The Einstein–Szilárd letter reaches Roosevelt, who authorizes not a bomb but attention. A scientific possibility crosses into political intent — before anyone knows the weapon can be built."},{d:"DEC 1942",t:"Capacity Before Certainty",b:"Fermi’s pile goes critical under a Chicago grandstand. Oak Ridge, Hanford, and Los Alamos rise while the science is still unsettled — a portfolio of bounded commitments. Midway at industrial scale."},{d:"MAY–JUL 1945",t:"Purpose Drift",b:"Germany surrenders in May; the threat that justified the architecture is gone. Trinity fires in July. The machinery kept gathering speed after the intent that built it had expired — momentum experienced as prudence."}];c.innerHTML=h.map(u=>`
    <div class="atom-tl-item">
      <div class="atom-tl-date">${u.d}</div>
      <div class="atom-tl-title">${u.t}</div>
      <div class="atom-tl-body">${u.b}</div>
    </div>`).join(""),Array.from(c.children).forEach((u,d)=>{Fe.create({trigger:u,start:"top 85%",once:!0,onEnter(){u.classList.add("is-in"),Pt.fromTo(u,{y:24,opacity:0},{y:0,opacity:1,duration:.8,delay:d*.08,ease:"power3.out"})}})})}const ti={"char-b1-bis":{title:"Char B1 bis",kind:"Vessel",chapter:"Blitzkrieg",tagline:"A better tank, one at a time — outclassed by tanks that arrived together.",image:null,stats:[{k:"Armor",v:"up to 60 mm"},{k:"Guns",v:"75 mm hull + 47 mm turret"},{k:"Built",v:"~369"},{k:"Weakness",v:"one-man turret, ~180 km range"}],body:["Individually, the Char B1 bis outgunned and outarmored anything Germany fielded in 1940. Its frontal plate shrugged off the Panzer III’s 37 mm gun.","But the commander loaded, aimed, and fired the turret gun while also directing the tank. French doctrine scattered these machines across infantry formations. They fought as isolated strongpoints, refueled constantly, and were bypassed rather than beaten."],ai:"Capability at the unit level means nothing if the decision to concentrate it never gets made in time.",threads:["panzer-iii","guderian","sedan-1940","auftragstaktik"]},"panzer-iii":{title:"Panzer III",kind:"Vessel",chapter:"Blitzkrieg",tagline:"Thinner armor, smaller gun — and a radio in every turret.",image:null,stats:[{k:"Gun (1940)",v:"37 mm"},{k:"Armor",v:"~30 mm front"},{k:"Crew",v:"5 (dedicated commander)"},{k:"Edge",v:"radio-equipped, concentrated"}],body:["On paper the Panzer III was the weaker machine. In practice it carried the decisive feature: a radio, a five-man crew, and a commander freed to command rather than fight the gun.","Massed in panzer divisions and talking to each other and to aircraft, these tanks could shift weight, exploit a gap, and react to a broken line faster than the enemy could reorganize."],ai:"The advantage wasn’t the tank — it was the wiring that let hundreds of them act as one nervous system.",threads:["char-b1-bis","guderian","auftragstaktik","sedan-1940"]},guderian:{title:"Heinz Guderian",kind:"Person",chapter:"Blitzkrieg",tagline:"The armor evangelist who drove through the “impassable” forest to the sea.",image:null,stats:[{k:"Command",v:"XIX Panzer Corps"},{k:"Doctrine",v:"concentrated armor + radio + air"},{k:"Sedan",v:"crossed Meuse 13–14 May 1940"},{k:"Book",v:"“Achtung – Panzer!” (1937)"}],body:["Guderian argued that tanks should not be parceled out to infantry but concentrated, radio-linked, and driven deep before the enemy could respond.","At Sedan he did exactly that, then ignored orders to halt and raced for the Channel. His famous shorthand — “Klotzen, nicht kleckern” (strike concentrated, not dispersed) — was a statement about decision speed, not firepower."],ai:"He collapsed the distance between seeing an opening and pouring force through it before permission could catch up.",threads:["manstein","auftragstaktik","ardennes","sedan-1940","panzer-iii"]},manstein:{title:"Erich von Manstein",kind:"Person",chapter:"Blitzkrieg",tagline:"Author of the sickle cut — the plan the German high command almost refused.",image:null,stats:[{k:"Plan",v:"Sichelschnitt (sickle cut)"},{k:"Axis",v:"main effort through the Ardennes"},{k:"Status 1940",v:"corps chief of staff, sidelined"},{k:"Rank later",v:"Field Marshal"}],body:["The original German plan was a cautious rerun of 1914. Manstein proposed the opposite: put the armored weight where the enemy least expected it, through the wooded Ardennes, and cut the Allied armies in half.","His superiors buried the idea until a chance meeting with Hitler surfaced it. The plan that won the campaign nearly died in the staff system that produced it."],ai:"The best signal is worthless until an organization builds a path for it to reach the person who can say yes.",threads:["guderian","ardennes","sedan-1940","auftragstaktik"]},auftragstaktik:{title:"Auftragstaktik",kind:"Concept",chapter:"Blitzkrieg",tagline:"Tell subordinates the intent, not the steps — then let them decide.",image:null,stats:[{k:"Translation",v:"mission-type tactics"},{k:"Delegates",v:"the “how,” not the “what”"},{k:"Requires",v:"trained judgment at the edge"},{k:"Modern name",v:"mission command"}],body:["German commanders issued objectives and constraints, then left the method to the officer on the spot. A lieutenant who saw an opening was expected to take it without asking.","This pushed decision authority down to where the information was freshest. It is the doctrinal heart of Blitzkrieg — and it rhymes, three years later, with Nimitz turning his carriers loose at Midway."],ai:"Legitimate authority pre-positioned at the edge is what lets a fresh signal become action without a round trip to the top.",threads:["guderian","manstein","panzer-iii","spruance","nimitz"]},ardennes:{title:"The Ardennes",kind:"Place",chapter:"Blitzkrieg",tagline:"The forest generals agreed tanks couldn’t cross — so nobody watched it.",image:null,stats:[{k:"Terrain",v:"dense forest, narrow roads"},{k:"Allied view",v:"unsuitable for armor"},{k:"German use",v:"main panzer thrust"},{k:"Result",v:"breakthrough at Sedan"}],body:["Allied planning treated the Ardennes as a natural barrier and screened it lightly, concentrating strength in Belgium where they expected the blow.","The Germans threaded three panzer corps through it in a colossal traffic jam. An assumption baked into doctrine became the seam the whole campaign was won through."],ai:"An unexamined assumption inside your doctrine is exactly the gap an opponent aims for.",threads:["manstein","guderian","sedan-1940"]},"sedan-1940":{title:"The Crossing at Sedan",kind:"Operation",chapter:"Blitzkrieg",tagline:"48 hours over the Meuse that unhinged the entire Allied front.",image:null,stats:[{k:"Dates",v:"13–14 May 1940"},{k:"River",v:"the Meuse"},{k:"Air support",v:"concentrated Stuka bombardment"},{k:"Then",v:"race to the Channel"}],body:["German infantry and engineers forced the Meuse under a rolling air assault while French artillery — organized for a slower, methodical battle — never massed its fire in time.","Once bridgeheads held, Guderian’s armor poured through and did not stop. The French decision cycle, built around deliberate set-piece defense, simply could not keep pace."],ai:"Two forces with similar strength; the one whose observe-decide-act loop was hours shorter won.",threads:["guderian","ardennes","panzer-iii","char-b1-bis"]},pervitin:{title:"Pervitin",kind:"Technology",chapter:"Blitzkrieg",tagline:"Methamphetamine that kept crews awake — a fuel, not the cause.",image:null,stats:[{k:"Substance",v:"methamphetamine"},{k:"Nickname",v:"“Panzerschokolade”"},{k:"Effect",v:"suppressed sleep and fatigue"},{k:"Issued",v:"millions of tablets, 1939–40"}],body:["Pervitin let tank and truck crews push for days with little rest, sustaining the relentless tempo the campaign demanded.","It is often overstated. The drug fueled the pace; it did not create the doctrine, the radios, or the decentralized command that made the pace worth having."],ai:"A stimulant can extend how long you execute a decision loop — it cannot design a better one.",threads:["guderian","sedan-1940"]},yamato:{title:"Yamato",kind:"Vessel",chapter:"Yamato",tagline:"The largest battleship ever built, sunk without her main guns ever hitting a ship.",image:null,stats:[{k:"Displacement",v:"~72,000 t full load"},{k:"Main guns",v:"9 × 46 cm (18.1 in)"},{k:"Sunk",v:"7 April 1945"},{k:"Final hits",v:"~10 bombs, ~8 torpedoes"}],body:["Yamato was the physical peak of the battleship — heavier armor and bigger guns than anything afloat. She was built for a fleet duel that the war never delivered.","On her last sortie nearly 400 US carrier aircraft attacked in waves over roughly two hours. Her 46 cm guns never fired on an enemy warship; they fired only anti-aircraft shells at the planes killing her."],ai:"She was a flawless answer to a question the enemy had already stopped asking.",threads:["musashi","eighteen-inch-guns","operation-ten-go","kantai-kessen","iowa-class"]},musashi:{title:"Musashi",kind:"Vessel",chapter:"Yamato",tagline:"Yamato’s sister — proof of concept for how these ships would die.",image:null,stats:[{k:"Class",v:"Yamato-class"},{k:"Sunk",v:"24 October 1944, Sibuyan Sea"},{k:"Hits",v:"~17 bombs, ~19 torpedoes"},{k:"Attackers",v:"US carrier aircraft"}],body:["At the Battle of the Sibuyan Sea, US carrier planes swarmed Musashi for hours, absorbing punishment no gun line could have inflicted, until she rolled over and sank.","Her destruction was the rehearsal for Yamato six months later: the sea war was decided in the air, and the biggest guns in history had no target."],ai:"The same lesson delivered twice: the scoreboard had changed and the doctrine had not.",threads:["yamato","eighteen-inch-guns","kantai-kessen","battle-off-samar"]},"eighteen-inch-guns":{title:"46 cm Naval Guns",kind:"Technology",chapter:"Yamato",tagline:"The largest guns ever mounted at sea — kept secret, and largely unused.",image:null,stats:[{k:"Bore",v:"46 cm (18.1 in)"},{k:"Shell",v:"~1,460 kg AP"},{k:"Range",v:"~42 km"},{k:"Cover story",v:"officially called “40 cm”"}],body:["Each shell weighed as much as a small car and could be lobbed over forty kilometers. Japan disguised the true caliber to keep rivals building smaller ships.","The secrecy worked and the engineering was superb. It bought a decisive edge in a gunnery battle that carrier aviation ensured would almost never happen."],ai:"Optimizing hard against the wrong metric produces a masterpiece nobody needs.",threads:["yamato","musashi","iowa-class","radar-fire-control"]},"kantai-kessen":{title:"Kantai Kessen",kind:"Concept",chapter:"Yamato",tagline:"The “decisive battle” doctrine that shaped a navy for a fight that never came.",image:null,stats:[{k:"Meaning",v:"“decisive fleet battle”"},{k:"Model",v:"Tsushima, 1905"},{k:"Assumed",v:"one climactic gun engagement"},{k:"Reality",v:"attrition, air power, logistics"}],body:["Japanese naval doctrine anticipated luring the US fleet across the Pacific to a single annihilating clash decided by battleship gunnery. Yamato was that plan cast in steel.","The actual war was carrier strikes, submarine attrition, and industrial replacement. The decisive battle kept not arriving, and the fleet built for it aged into irrelevance."],ai:"A metric embedded inside doctrine becomes invisible — you keep scoring points in a game the world stopped playing.",threads:["yamato","operation-ten-go","eighteen-inch-guns","kido-butai","donitz"]},"operation-ten-go":{title:"Operation Ten-Go",kind:"Operation",chapter:"Yamato",tagline:"A one-way sortie to Okinawa with fuel enough to arrive, not return.",image:null,stats:[{k:"Date",v:"6–7 April 1945"},{k:"Objective",v:"beach and fight off Okinawa"},{k:"Fuel",v:"effectively one-way"},{k:"Outcome",v:"Yamato + most escorts sunk"}],body:["With Japanese air power gutted, Yamato was sent to run herself aground off Okinawa as an unsinkable gun battery — a suicide mission dressed as a sortie.","US carriers intercepted her in open water first. The plan spent the fleet’s crown jewel for symbolism, because doctrine had no other use left for her."],ai:"When the only remaining role for your prize asset is symbolic sacrifice, the strategy failed long before the ship did.",threads:["yamato","kantai-kessen","battle-off-samar"]},"battle-off-samar":{title:"Battle off Samar",kind:"Operation",chapter:"Yamato",tagline:"Yamato met her chance against thin-skinned carriers — and turned away.",image:null,stats:[{k:"Date",v:"25 October 1944"},{k:"US force",v:"“Taffy 3” escort carriers + tin cans"},{k:"Japanese",v:"Kurita’s Center Force"},{k:"Result",v:"Kurita withdrew"}],body:["For once the battleships got what doctrine promised: US escort carriers and destroyers in gun range, nearly defenseless. Yamato and her consorts opened fire.","A ferocious destroyer counterattack, air harassment, and confusion convinced Kurita he faced fleet carriers. He broke off. The decisive gun battle finally happened — and the doctrine flinched."],ai:"Even handed its dream scenario, a system tuned for the wrong war misread the evidence and retreated.",threads:["yamato","musashi","escort-carrier","kantai-kessen"]},"iowa-class":{title:"Iowa-class Battleship",kind:"Vessel",chapter:"Yamato",tagline:"Smaller guns, radar eyes, 33 knots — built to escort carriers, not replace them.",image:null,stats:[{k:"Main guns",v:"9 × 16 in"},{k:"Speed",v:"~33 knots"},{k:"Fire control",v:"radar-directed"},{k:"Role",v:"fast carrier screen, AA, shore bombardment"}],body:["The Iowas carried lighter guns than Yamato but ran fast enough to keep station with aircraft carriers and saw in the dark with radar.","The US built its battleships to serve the carrier, not to seek a duel. That subordination — the battleship as one node in a sensor-and-strike network — is why they stayed useful."],ai:"The winning design didn’t maximize any single spec; it fit itself to the war actually being fought.",threads:["yamato","eighteen-inch-guns","radar-fire-control"]},"radar-fire-control":{title:"Radar Fire Control",kind:"Technology",chapter:"Yamato",tagline:"The moment gun size stopped mattering more than knowing where to shoot.",image:null,stats:[{k:"Systems",v:"Mark 3/8 radar + Mark 37 director"},{k:"Enables",v:"accurate fire at night, in fog"},{k:"Proven",v:"Guadalcanal night actions, Surigao Strait"},{k:"Shift",v:"sensing over caliber"}],body:["Radar-directed gunnery let US ships hit targets they could not see, in darkness that once neutralized superior optics and bigger guns.","The advantage moved from the size of the barrel to the speed and quality of the target solution — the same shift, in a different medium, that centimetric radar forced on the U-boats."],ai:"The edge migrated from raw output to sensing and decision — from how hard you can hit to whether you know where to.",threads:["iowa-class","eighteen-inch-guns","centimetric-radar","yamato"]},donitz:{title:"Karl Dönitz",kind:"Person",chapter:"U-Boats",tagline:"He measured the war in tons sunk — and lost the war being counted differently.",image:null,stats:[{k:"Role",v:"Commander, U-boat arm (BdU)"},{k:"Doctrine",v:"tonnage war"},{k:"Goal",v:"sink faster than Allies could build"},{k:"May 1943",v:"withdrew from North Atlantic"}],body:["Dönitz ran the Atlantic campaign as an arithmetic race: sink more Allied tonnage per month than the shipyards could replace, and Britain would starve.","The metric ignored what the enemy was optimizing — convoy escort, air cover, code-breaking, and industrial output. As those compounded, his tonnage curve inverted and his fleet was slaughtered."],ai:"A single, legible scoreboard is seductive precisely because it hides every variable the enemy is actually moving.",threads:["type-vii-uboat","wolfpack","black-may","blackett","kantai-kessen"]},"type-vii-uboat":{title:"Type VII U-boat",kind:"Vessel",chapter:"U-Boats",tagline:"The workhorse of the tonnage war — a surface raider that could duck underwater.",image:null,stats:[{k:"Built",v:"700+ (most numerous type)"},{k:"Crew",v:"~44–52"},{k:"Attack mode",v:"often surfaced, at night"},{k:"Weakness",v:"slow submerged, short battery"}],body:["The Type VII was cheap, rugged, and produced in enormous numbers. It fought mostly on the surface, where it was faster and could coordinate by radio.","That surface habit was its doom. Once aircraft and centimetric radar owned the surface at night, the very mode that made the boat effective made it a target."],ai:"The behavior that maximized the old scoreboard became the exact signature the new tools hunted.",threads:["donitz","wolfpack","mid-atlantic-gap","centimetric-radar"]},wolfpack:{title:"Wolfpack Tactics",kind:"Tactic",chapter:"U-Boats",tagline:"Gather the boats by radio, overwhelm the convoy — and broadcast your position doing it.",image:null,stats:[{k:"German",v:"Rudeltaktik"},{k:"Coordination",v:"radio orders from BdU ashore"},{k:"Aim",v:"saturate a convoy’s escorts"},{k:"Cost",v:"constant transmissions"}],body:["A boat that spotted a convoy radioed home; headquarters vectored others to converge and attack en masse, swamping the escort screen.","The coordination ran on radio chatter. Every order and shadowing report was a signal the Allies could locate with HF/DF and read with Ultra — the tactic’s strength was wired straight to its vulnerability."],ai:"Centralized control needs constant signaling, and constant signaling is exactly what the other side learns to intercept.",threads:["donitz","type-vii-uboat","hf-df","ultra-enigma"]},"hf-df":{title:"HF/DF (“Huff-Duff”)",kind:"Technology",chapter:"U-Boats",tagline:"You can’t coordinate by radio without telling the enemy where you are.",image:null,stats:[{k:"Full name",v:"high-frequency direction finding"},{k:"Fix",v:"bearing to a transmitting U-boat"},{k:"Deployed",v:"shipborne, aboard escorts"},{k:"Use",v:"run down the bearing and attack"}],body:["Shipborne HF/DF took a bearing on a U-boat the instant it transmitted. Two escorts could triangulate a position; even one could charge down the line.","The Germans long assumed their brief transmissions were safe. They were feeding the escorts a live position report every time they spoke."],ai:"The act of coordinating leaks information; the winner turns the enemy’s own signals into targeting data.",threads:["wolfpack","donitz","centimetric-radar","black-may"]},"centimetric-radar":{title:"Centimetric Radar",kind:"Technology",chapter:"U-Boats",tagline:"A wavelength the U-boats couldn’t hear coming — the night stopped being safe.",image:null,stats:[{k:"Sets",v:"ASV Mk III / H2S (~10 cm)"},{k:"Enabler",v:"the cavity magnetron"},{k:"Blind spot",v:"German Metox couldn’t detect it"},{k:"Effect",v:"surfaced boats found at night"}],body:["Short-wavelength radar, powered by the cavity magnetron, let aircraft pick a surfaced U-boat out of a black ocean and attack before the crew knew a plane was near.","German receivers were tuned to older, longer wavelengths and heard nothing. For months the boats surfaced at night believing themselves invisible while planes bore in."],ai:"The decisive advantage was a sensing gap: seeing the enemy in a band where he assumed he was unseen.",threads:["hf-df","escort-carrier","black-may","mid-atlantic-gap","radar-fire-control"]},"escort-carrier":{title:"Escort Carrier (CVE)",kind:"Vessel",chapter:"U-Boats",tagline:"A “jeep carrier” that carried air cover into the middle of the ocean.",image:null,stats:[{k:"Nickname",v:"“jeep carrier”"},{k:"Built on",v:"merchant/tanker hulls"},{k:"Air group",v:"a handful of planes"},{k:"Job",v:"organic air cover for convoys"}],body:["Small, cheap flattops sailed with the convoys and their support groups, providing round-the-clock aircraft over the one stretch land-based planes couldn’t reach.","Individually modest, in numbers they closed the last gap in Allied air coverage — and the same humble ships later stood off Yamato’s guns at Samar."],ai:"Coverage over the whole board beat concentrated power over part of it.",threads:["mid-atlantic-gap","centimetric-radar","black-may","battle-off-samar"]},"mid-atlantic-gap":{title:"The Mid-Atlantic Gap",kind:"Place",chapter:"U-Boats",tagline:"The “Black Pit” beyond air cover — where the wolfpacks lived.",image:null,stats:[{k:"Nickname",v:"“the Black Pit”"},{k:"Cause",v:"beyond land-based aircraft range"},{k:"Closed by",v:"VLR Liberators + escort carriers"},{k:"Closed",v:"spring 1943"}],body:["For years a mid-ocean band lay beyond the reach of patrol aircraft. Convoys crossed it naked, and the U-boats hunted hardest there.","Very-long-range Liberators and escort carriers finally roofed the gap in early 1943. With no safe water left to surface in, the wolfpacks’ core tactic died."],ai:"A blind spot in the sensor map is where the enemy concentrates; closing it changes the whole game.",threads:["escort-carrier","centimetric-radar","type-vii-uboat","black-may"]},blackett:{title:"Patrick Blackett",kind:"Person",chapter:"U-Boats",tagline:"The physicist who won tonnage with arithmetic instead of steel.",image:null,stats:[{k:"Field",v:"operational research"},{k:"Findings",v:"bigger convoys are safer"},{k:"Fix",v:"reset depth-charge fuzes"},{k:"Later",v:"Nobel Prize in Physics, 1948"}],body:["Blackett’s team studied the data instead of the doctrine. They found large convoys lost proportionally fewer ships, that depth charges were exploding too deep, and that aircraft should be painted white.","Small analytical corrections, applied fleet-wide, saved more shipping than new weapons did. It was decision-making treated as a science."],ai:"Sometimes the highest-leverage move is not more force but a better-calibrated decision applied everywhere.",threads:["donitz","mid-atlantic-gap","black-may","nimitz"]},"black-may":{title:"Black May",kind:"Operation",chapter:"U-Boats",tagline:"One month that broke the wolfpacks — a quarter of the fleet gone.",image:null,stats:[{k:"When",v:"May 1943"},{k:"U-boats lost",v:"41 at sea"},{k:"Share",v:"~a quarter of the operational fleet"},{k:"Result",v:"Dönitz pulled boats from the N. Atlantic"}],body:["Everything converged at once: centimetric radar, HF/DF, escort carriers, closed air gap, and Ultra rerouting convoys. In a few weeks U-boat losses became unsustainable.","Dönitz withdrew from the main convoy routes. The tonnage-war offensive never recovered. The scoreboard had flipped, and it flipped almost overnight."],ai:"When the enemy fixes the whole decision system at once, a slow decline becomes a sudden collapse.",threads:["donitz","centimetric-radar","escort-carrier","hf-df","ultra-enigma"]},"ultra-enigma":{title:"Ultra / Naval Enigma",kind:"Document",chapter:"U-Boats",tagline:"Reading the wolfpacks’ mail — and steering convoys around them.",image:null,stats:[{k:"Source",v:"broken naval Enigma traffic"},{k:"Center",v:"Bletchley Park"},{k:"Key break",v:"4-rotor Enigma, 1943"},{k:"Use",v:"reroute convoys, cue attacks"}],body:["When Bletchley Park could read U-boat signals, the Admiralty diverted convoys around patrol lines and vectored hunter groups onto known positions.","Guarded so tightly that action was often disguised to protect the source, Ultra turned the U-boats’ own coordination network into an Allied planning tool — the same SIGINT logic Station Hypo ran in the Pacific."],ai:"Owning the enemy’s signal turns his decisions into yours — the ultimate collapse of the signal-to-action distance.",threads:["wolfpack","black-may","donitz","jn-25","station-hypo"]},rochefort:{title:"Joseph Rochefort",kind:"Person",chapter:"Midway",tagline:"The cryptanalyst who bet his reputation that “AF” was Midway.",image:null,stats:[{k:"Command",v:"Station Hypo, Pearl Harbor"},{k:"Habits",v:"bathrobe, slippers, days without sleep"},{k:"Read",v:"~15% of JN-25 — enough"},{k:"Vindicated",v:"the AF water ruse"}],body:["Rochefort’s team never read the whole code. Working from fragments, traffic patterns, and instinct, they concluded Japan’s next blow would fall on Midway.","Washington favored other targets. Rochefort staged a ruse to prove it and gave Nimitz a location and a date. He acted on partial evidence because partial was enough to decide."],ai:"Sufficient evidence, read early, beats complete evidence read too late.",threads:["station-hypo","jn-25","af-water-ruse","nimitz"]},"station-hypo":{title:"Station Hypo",kind:"Place",chapter:"Midway",tagline:"A windowless basement at Pearl that out-decided Washington.",image:null,stats:[{k:"Location",v:"basement, Pearl Harbor"},{k:"Also called",v:"Combat Intelligence Unit"},{k:"Chief",v:"Joseph Rochefort"},{k:"Rival estimate",v:"OP-20-G, Washington"}],body:["Hypo combined cryptanalysis, traffic analysis, and direction-finding into running estimates of Japanese intentions, feeding them straight to the Pacific Fleet.","Its proximity to the decision-maker mattered as much as its skill: analysis and authority were close enough that a fresh read could become an order the same day."],ai:"Analysis wired directly to the person who can act is worth more than better analysis two echelons away.",threads:["rochefort","jn-25","af-water-ruse","nimitz"]},"jn-25":{title:"JN-25",kind:"Document",chapter:"Midway",tagline:"The Japanese naval code — never fully broken, and it didn’t need to be.",image:null,stats:[{k:"Type",v:"enciphered code book"},{k:"Readable",v:"partial, a fraction of groups"},{k:"Key clue",v:"the geographic tag “AF”"},{k:"Payoff",v:"Midway order of battle and timing"}],body:["JN-25 layered a code book under an additive cipher; the Allies recovered only part of it. Even fragments, cross-referenced against traffic, revealed the shape of the coming operation.","The recurring designator “AF” pointed at the target — but which base? Confirming it was the last gap between a good guess and an actionable decision."],ai:"You rarely decode the whole message; the discipline is acting on the fraction that already answers the question.",threads:["rochefort","station-hypo","af-water-ruse","ultra-enigma"]},"af-water-ruse":{title:"The “AF is Short of Water” Ruse",kind:"Tactic",chapter:"Midway",tagline:"A fake message about a broken still that confirmed the target.",image:null,stats:[{k:"Bait",v:"Midway radios (in clear) a water shortage"},{k:"Hook",v:"Japan reports “AF short of water”"},{k:"Proves",v:"AF = Midway"},{k:"Cost",v:"one clever transmission"}],body:["To settle the argument over what “AF” meant, Hypo had Midway broadcast a plain-language complaint that its desalination plant had failed. Days later, decrypts showed Japan reporting that AF was low on water.","It was a designed experiment: create a falsifiable prediction and let the enemy confirm or refute it. The enemy confirmed it."],ai:"When evidence is ambiguous, engineer a test the world will answer — don’t wait for certainty to arrive on its own.",threads:["rochefort","station-hypo","jn-25","nimitz"]},nimitz:{title:"Chester Nimitz",kind:"Person",chapter:"Midway",tagline:"He trusted the basement over Washington and staged an ambush at Point Luck.",image:null,stats:[{k:"Role",v:"CINCPAC"},{k:"Choice",v:"backed Hypo’s Midway estimate"},{k:"Move",v:"carriers to “Point Luck”"},{k:"Guidance",v:"“calculated risk”"}],body:["Nimitz weighed a contested intelligence estimate and committed his three available carriers to lie in wait northeast of Midway before the Japanese arrived.","His written order told his admirals to apply the principle of calculated risk — take the shot when the expected gain justified it. He decided on sufficient evidence and delegated the execution."],ai:"Leadership is deciding on incomplete information and pushing the acting authority to the commanders at the point of contact.",threads:["rochefort","yorktown","spruance","fletcher","af-water-ruse"]},yorktown:{title:"USS Yorktown",kind:"Vessel",chapter:"Midway",tagline:"“We must have this ship back in three days.” They took about seventy-two hours.",image:null,stats:[{k:"Damaged",v:"Battle of the Coral Sea"},{k:"Nimitz’s order",v:"back in three days"},{k:"Repaired",v:"in ~72 hours at Pearl"},{k:"Sortied",v:"30 May 1942"}],body:["Estimates put Yorktown’s repairs at months. Nimitz demanded three days. Fourteen hundred workers swarmed her around the clock and made her fightable.","She sortied on 30 May and her air group helped sink a Japanese carrier before she was lost. Without that third carrier, the arithmetic at Midway may not have worked."],ai:"A fast, decisive repair decision manufactured the very margin the battle turned on.",threads:["nimitz","fletcher","sbd-dauntless","kido-butai"]},"sbd-dauntless":{title:"SBD Dauntless",kind:"Aircraft",chapter:"Midway",tagline:"The dive bomber that sank four carriers in an afternoon.",image:null,stats:[{k:"Type",v:"carrier dive bomber"},{k:"Midway kills",v:"4 Japanese fleet carriers"},{k:"Decisive window",v:"minutes, ~10:20 am, 4 June"},{k:"Bomb",v:"up to 1,000 lb"}],body:["Dauntless squadrons arrived over Kido Butai just as its decks were crowded with fueled, armed aircraft mid-rearming. In a few minutes they turned three carriers into infernos; a fourth followed that evening.","The plane was unglamorous and sturdy. What made the moment decisive was timing — the strike hit while the enemy was caught between two decisions."],ai:"The blow landed in the seam of the enemy’s indecision — the interval when he had committed to nothing.",threads:["kido-butai","yorktown","spruance","fletcher"]},"kido-butai":{title:"Kido Butai",kind:"Operation",chapter:"Midway",tagline:"The world’s finest carrier force, undone by a rearming decision it couldn’t unmake.",image:null,stats:[{k:"Meaning",v:"“mobile force”"},{k:"Carriers at Midway",v:"4 (all sunk)"},{k:"Commander",v:"Vice Admiral Nagumo"},{k:"Fatal pause",v:"bombs → torpedoes → bombs"}],body:["Nagumo’s four carriers had rampaged from Pearl Harbor to the Indian Ocean unbeaten. At Midway a spotted American carrier forced a choice: keep the land-attack bombs or swap to anti-ship torpedoes.","He ordered a rearm, then reversed it, and the hangar decks filled with fuel and ordnance during the switch. The Dauntlesses arrived precisely in that vulnerable gap."],ai:"A reversible decision left half-made is the most dangerous state a system can occupy under attack.",threads:["sbd-dauntless","yorktown","kantai-kessen","spruance"]},spruance:{title:"Raymond Spruance",kind:"Person",chapter:"Midway",tagline:"A non-aviator who launched early, launched everything, and won.",image:null,stats:[{k:"Command",v:"Task Force 16"},{k:"Background",v:"cruiser officer, not a flier"},{k:"Call",v:"launch at maximum range, all at once"},{k:"Trait",v:"cold, calculating judgment"}],body:["Handed the carriers after Halsey fell ill, Spruance made the crucial timing call: launch his air groups at long range to catch the Japanese while their decks were full.","It was a gamble on tempo over tidiness, and it put the Dauntlesses over Kido Butai at the perfect moment. He then declined to chase overnight — knowing when to stop deciding, too."],ai:"He owned the tempo decision himself and let his aircrews own the execution — mission command in a cockpit.",threads:["nimitz","fletcher","kido-butai","sbd-dauntless","auftragstaktik"]},fletcher:{title:"Frank Jack Fletcher",kind:"Person",chapter:"Midway",tagline:"The senior commander who held tactical authority, then handed it off cleanly.",image:null,stats:[{k:"Command",v:"Task Force 17 (Yorktown)"},{k:"Role",v:"officer in tactical command at Midway"},{k:"Coral Sea",v:"fought days earlier"},{k:"Handoff",v:"passed control to Spruance"}],body:["Fletcher was the senior officer present and directed the battle’s opening. When Yorktown was crippled and his flagship lost its command facilities, he passed tactical control to Spruance without friction.","The clean transfer of authority under fire kept the American decision loop intact at the moment it mattered most."],ai:"Legitimacy that transfers cleanly under damage keeps the decision system alive when a single node fails.",threads:["nimitz","spruance","yorktown","kido-butai"]},trinity:{title:"Trinity",kind:"Operation",chapter:"Atom",tagline:"The first nuclear detonation — and the quiet line that no one could take back.",image:null,stats:[{k:"Date",v:"5:29 a.m., 16 July 1945"},{k:"Site",v:"Alamogordo, New Mexico"},{k:"Yield",v:"~21 kilotons"},{k:"Bainbridge",v:"“Now we are all sons of bitches.”"}],body:["The plutonium implosion device worked on the first try, lighting the desert brighter than noon. Test director Kenneth Bainbridge’s in-the-moment verdict was blunt: “Now we are all sons of bitches.”","Oppenheimer’s famous “Now I am become Death” was a reflection he offered publicly in 1965, not words spoken at the shot. Trinity crossed a line that could never be uncrossed."],ai:"Some decisions are not reversible experiments; once executed, the world they create is the only world there is.",threads:["oppenheimer","doomsday-clock","franck-report"]},oppenheimer:{title:"J. Robert Oppenheimer",kind:"Person",chapter:"Atom",tagline:"The director who built the thing, then spent his life arguing about the choice.",image:null,stats:[{k:"Role",v:"Scientific Director, Los Alamos"},{k:"Trinity quote",v:"a 1965 recollection, not spoken then"},{k:"After",v:"urged international control"},{k:"1954",v:"security clearance revoked"}],body:["Oppenheimer welded a fractious community of physicists into a weapon in under three years. He believed building it was necessary; he was far less certain about how it should be used or controlled.","Afterward he pressed for civilian and international oversight, warned against a hydrogen bomb, and was stripped of his clearance. The man who compressed the decision spent the rest of his life on its consequences."],ai:"Whoever can build the capability rarely holds the legitimate authority to decide how it is used.",threads:["trinity","szilard-petition","franck-report","acheson-lilienthal"]},"szilard-petition":{title:"The Szilárd Petition",kind:"Document",chapter:"Atom",tagline:"Seventy scientists asked to be consulted before the bomb was used. It never reached the President.",image:null,stats:[{k:"Author",v:"Leó Szilárd"},{k:"Date",v:"July 1945"},{k:"Signatories",v:"~70 Manhattan Project scientists"},{k:"Ask",v:"don’t use it on Japan without warning"}],body:["Szilárd, who had helped start the project, circulated a petition urging that the bomb not be dropped on cities without a demonstration and a chance to surrender.","It moved slowly up the chain and was overtaken by events; Truman is not known to have seen it before the decision. The people closest to the knowledge had no path to the choice."],ai:"A signal without a channel to legitimate authority is not a decision input — it is a document filed after the fact.",threads:["franck-report","oppenheimer","einstein-telegram","acheson-lilienthal"]},"franck-report":{title:"The Franck Report",kind:"Document",chapter:"Atom",tagline:"A warning, weeks before Trinity, that surprise use would start an arms race.",image:null,stats:[{k:"Chair",v:"James Franck"},{k:"Date",v:"June 1945"},{k:"Argument",v:"demonstrate, don’t surprise"},{k:"Foresaw",v:"a nuclear arms race"}],body:["A committee of Chicago scientists argued that a surprise atomic attack would win a battle but lose the peace, forfeiting the moral standing needed to control the weapon internationally.","They proposed a demonstration before observers instead. The report was considered and set aside. Its prediction of an arms race arrived on schedule."],ai:"The clearest foresight fails if it can’t reach the decision at the moment the choice is still open.",threads:["szilard-petition","oppenheimer","acheson-lilienthal"]},"acheson-lilienthal":{title:"The Acheson–Lilienthal Report",kind:"Document",chapter:"Atom",tagline:"A 1946 blueprint to put the atom under international control — before it was too late.",image:null,stats:[{k:"Year",v:"1946"},{k:"Proposed",v:"international atomic authority"},{k:"Became",v:"basis of the Baruch Plan"},{k:"Outcome",v:"rejected amid Cold War distrust"}],body:["The report proposed a global authority to own dangerous nuclear activities outright, making a covert weapons race structurally difficult rather than merely forbidden.","Reworked into the Baruch Plan and presented to the UN, it foundered on US–Soviet mistrust. The window for designing the system before the race began closed."],ai:"Designing legitimate governance ahead of a capability is far cheaper than trying to retrofit it after deployment.",threads:["franck-report","szilard-petition","doomsday-clock"]},"doomsday-clock":{title:"The Doomsday Clock",kind:"Concept",chapter:"Atom",tagline:"A metaphor turned into a metric for how close we’ve steered to catastrophe.",image:null,stats:[{k:"Created",v:"1947"},{k:"By",v:"Bulletin of the Atomic Scientists"},{k:"First setting",v:"7 minutes to midnight"},{k:"Jan 2026",v:"85 seconds — closest ever"}],body:["The scientists who built the bomb created a clock to hold the world’s attention on the choice they had opened. Midnight is catastrophe; the hands move with human decisions, not physics.","It endures because the underlying condition does: a capability now permanent, governed only by the quality of continuous decisions. The 2026 statement names artificial intelligence among its drivers for the first time."],ai:"When a capability can’t be un-invented, safety becomes an ongoing decision discipline, not a one-time fix.",threads:["acheson-lilienthal","franck-report","trinity"]},"einstein-telegram":{title:"The Einstein–Szilárd Letter",kind:"Document",chapter:"Atom",tagline:"The 1939 letter that put the choice on a President’s desk in the first place.",image:null,stats:[{k:"Date",v:"August 1939"},{k:"Drafted by",v:"Leó Szilárd"},{k:"Signed by",v:"Albert Einstein"},{k:"To",v:"President Franklin Roosevelt"}],body:["Szilárd drafted, and Einstein signed, a warning that Germany might build a nuclear weapon and that the US should begin its own research. It set in motion what became the Manhattan Project.","Both later regretted opening the door. The signal that started everything was sent by the very people who would spend the next decade trying to contain it."],ai:"The decision to begin is itself a choice — and the hardest one to see as reversible while you’re making it.",threads:["szilard-petition","oppenheimer","trinity"]}},wu={"char-b1-bis":{lens:"A single node with excellent compute and armor, but catastrophic internal I/O: one man in the turret had to spot, aim, load, and fire while also commanding the vehicle. Raw specs beat the German tanks; the serialized single-thread choked under its own workload.",primitives:[{k:"Cohesion",v:"high (everything in one node)"},{k:"Concurrency",v:"none — one operator, four jobs"},{k:"Latency",v:"internal, self-inflicted"},{k:"Bottleneck",v:"the commander thread"},{k:"Throughput",v:"low despite high capacity"}],flow:["Spot","Command","Aim/Load","Fire"],break:1,breakLabel:"one thread doing everything — commander is the bottleneck",architect:"In your stack this is the powerful monolith where a single request handler also does auth, business logic, serialization, and I/O on one thread: benchmarks great in isolation, collapses the moment concurrent work arrives. Capacity is not throughput."},"panzer-iii":{lens:"Individually weaker than its French counterparts, but every tank carried a radio and the turret split work across three crew. The advantage was not the node — it was the message bus and role separation that let modest nodes act as one coordinated fleet.",primitives:[{k:"Coupling",v:"loose, radio-networked"},{k:"Cohesion",v:"clean role split in the turret"},{k:"Observability",v:"every node reports and receives"},{k:"Latency",v:"low decision-to-action"},{k:"Scaling",v:"horizontal — the fleet, not the unit"}],flow:["Spot","Radio net","Coordinate","Fire"],break:-1,breakLabel:"healthy — throughput came from the comms layer, not the specs",architect:"Commodity nodes on a real event bus with separated concerns beat one over-specced box every time. You are buying coordination and observability, not per-unit horsepower — the classic argument for many small services over one heroic instance."},guderian:{lens:"The platform architect who insisted the fighting units be networked before they were up-gunned. He designed concentration + radio + combined arms as a system spec, refusing to treat tanks as faster infantry support.",primitives:[{k:"Design authority",v:"system-level, not component"},{k:"Interface",v:"radio as the mandated contract"},{k:"Coupling",v:"combined arms, loosely orchestrated"},{k:"Failure mode designed out",v:"dispersion / dilution"}],flow:["Doctrine","Comms layer","Concentrate force","Breakthrough"],break:-1,breakLabel:"healthy — the architect who made the bus a requirement, not an add-on",architect:"The lead who wins the fight by mandating the messaging contract and concentration pattern up front, rather than letting each team optimize its own component. Architecture is deciding what everyone must share before anyone builds."},manstein:{lens:"The strategist who moved the attack axis off the fortified front and onto the unguarded seam between two French army groups. He did not out-build the defense; he found the interface nobody had hardened.",primitives:[{k:"Attack surface",v:"the boundary between two commands"},{k:"Coupling (enemy)",v:"organizational seam, weakly owned"},{k:"Blast radius",v:"total — one seam, whole line"},{k:"Assumption exploited",v:'"this path is safe"'}],flow:["Find the seam","Mass at Ardennes","Cross at Sedan","Exploit"],break:0,breakLabel:"the unhardened boundary nobody owned",architect:"In your stack this is the unowned integration boundary between two teams’ services — each assumed the other secured it. Conway’s law drew the org seam; the attacker targeted exactly that seam because defense-in-depth stopped at the org chart."},auftragstaktik:{lens:"Authority pushed to the edge: the center publishes intent as a stable contract and delegates execution to autonomous units. Decisions happen where the signal arrives, not after a round trip to headquarters.",primitives:[{k:"Coupling",v:"loose"},{k:"Authority placement",v:"edge"},{k:"Contract",v:"commander’s intent (stable)"},{k:"Latency",v:"near-zero at the point of action"},{k:"Feedback loop",v:"local, immediate"}],flow:["Signal at edge","Interpret vs. intent","Act locally","Consequence"],break:-1,breakLabel:"healthy — permission was pre-granted by the published intent",architect:"Intent as a stable contract plus autonomous services acting within it — the opposite of a synchronous approval RPC to a central orchestrator on every request. You remove the round trip by pre-authorizing the decision space, not by making the center faster."},ardennes:{lens:'A code path the French declared unreachable ("impassable to armor"), therefore never hardened and barely monitored. The assumption was load-bearing and untested — the definition of the attack surface you did not threat-model.',primitives:[{k:"Assumption",v:"unreachable path, never verified"},{k:"Observability",v:"minimal — nobody watched it"},{k:"Defense",v:"deprioritized on the assumption"},{k:"Failure mode",v:"silent until breached"}],flow:["Assess terrain","Assume impassable","Deprioritize defense","Breach"],break:1,breakLabel:"the assumption that was never tested",architect:"Every incident review has one: the path assumed dead-code or unreachable, so it skipped hardening and monitoring. Untested assumptions are not safe — they are just unobserved. Threat-model the paths you believe can’t happen."},"sedan-1940":{lens:"The single crossing where the breach became a rupture. A failure at one boundary node propagated laterally along the whole front because there was no bulkhead to contain it.",primitives:[{k:"Single point of failure",v:"the river crossing"},{k:"Blast radius",v:"uncontained — raced to the coast"},{k:"Bulkheads",v:"absent"},{k:"Back-pressure",v:"none — collapse cascaded"}],flow:["Cross river","Rupture the line","Cascade laterally","Race to coast"],break:1,breakLabel:"no bulkhead — one breach became total collapse",architect:"A local failure with no compartmentalization: no circuit breaker, no bulkhead, no blast-radius limit, so a single boundary breach cascades system-wide. Design for containment, not just prevention — assume the breach and cap what it can reach."},pervitin:{lens:"Overclocking the operators to compress operational tempo — methamphetamine kept crews awake so the whole system ran hotter and faster than sustainable. It bought latency reduction against accruing debt with no cooldown loop.",primitives:[{k:"Tempo",v:"overclocked"},{k:"Back-pressure",v:"suppressed, not absent"},{k:"Sustainability",v:"short-window only"},{k:"Failure mode",v:"deferred crash"}],flow:["Push tempo","Suppress rest","Sustain the burst","Crash"],break:1,breakLabel:"back-pressure disabled — debt accrues silently",architect:"Turning off back-pressure to hit a latency target: the queue keeps accepting, throughput looks great, and the accrued load lands as a cliff later. Fast because you disabled the safety, not because you got faster."},yamato:{lens:"A maximally optimized subsystem for a workload that no longer existed. Superb internal cohesion and armor, engineered for a battleship gun duel while the traffic pattern had already shifted to carrier air power.",primitives:[{k:"Cohesion",v:"high internally"},{k:"Fit-to-environment",v:"obsolete"},{k:"Reversibility",v:"none — sunk-cost lock-in"},{k:"Optimization",v:"local, of the wrong metric"}],flow:["Detect fleet","Close range","Fire main guns","Decide battle"],break:2,breakLabel:"the capability optimized for a workload that vanished",architect:"Local optimization of a legacy component while the traffic pattern the whole system serves has changed — the platform nobody will question because too much status and budget are sunk into it. Optimizing the wrong metric to perfection."},musashi:{lens:"The redundant replica of an already-obsolete design — high availability for a service the environment had stopped calling. Sunk by air attack at Leyte having barely fired her main guns at another ship.",primitives:[{k:"Redundancy",v:"HA for a dead workload"},{k:"Fit-to-environment",v:"obsolete (doubled)"},{k:"Defense-in-depth",v:"none vs. the actual threat (air)"},{k:"Sunk cost",v:"doubled the wrong bet"}],flow:["Deploy","Air attack inbound","No answer to it","Sunk"],break:2,breakLabel:"HA replica of an obsolete design, undefended against the real threat",architect:"Standing up a hot replica of a service nobody calls, while the actual load — air attack — hits a dimension you never provisioned for. Redundancy of the wrong thing is cost, not resilience."},"eighteen-inch-guns":{lens:"The largest naval guns ever mounted, provisioned for a peak-load event — a capital-ship gun duel — that never arrived. Enormous capability spent against a use case that failed to materialize.",primitives:[{k:"Capacity",v:'maximal (18.1")'},{k:"Utilization",v:"near-zero against intended target"},{k:"Provisioning",v:"for a peak that never came"},{k:"Reversibility",v:"none — cast into the hull"}],flow:["Range enemy fleet","Aim",'Fire 18.1"',"Decide"],break:2,breakLabel:"over-provisioned for a peak load that never arrived",architect:"Sizing your most expensive capability to a peak-traffic scenario the market never delivers, and hard-wiring it so it can’t be repurposed. Premature optimization at the scale of a national budget."},"kantai-kessen":{lens:"A doctrine that designed the entire fleet around one anticipated decisive engagement — the wrong success model. The system waited for a batch event the environment never scheduled, and starved of relevance in the meantime.",primitives:[{k:"Success model",v:"single anticipated event"},{k:"Feedback loop",v:'deferred until "the battle"'},{k:"Coupling",v:"whole fleet to one scenario"},{k:"Failure mode",v:"the event never fires"}],flow:["Wait","Mass the fleet","Decisive battle","Win war"],break:0,breakLabel:"waiting for the event the environment never delivers",architect:"Architecting the whole system around a single anticipated trigger — the big-bang cutover, the one decisive release — while the real world runs continuously. Design for the steady stream, not the batch job you keep waiting to run."},"operation-ten-go":{lens:"Deploying an irreplaceable asset into a known-fatal environment with no protection, to justify sunk cost. Yamato’s one-way sortie to Okinawa without air cover — an aircraft-controlled zone — ended exactly as the telemetry predicted.",primitives:[{k:"Blast radius",v:"total loss of the asset"},{k:"Observability",v:"outcome was fully foreseeable"},{k:"Reversibility",v:"none — one-way by design"},{k:"Decision driver",v:"sunk cost, not evidence"}],flow:["Order sortie","Transit exposed","No air cover","Sunk"],break:2,breakLabel:"irreplaceable asset pushed into a known-fatal environment",architect:"Pushing your last irreplaceable instance into a region you already know is hostile, because retiring it would admit the investment was wrong. The sunk-cost fallacy encoded as a deployment."},"battle-off-samar":{lens:"Cheap, numerous edge nodes — escort carriers and destroyers — used aggression and deception to repel a heavy centralized force including Yamato. The monolith’s commander then misread his own telemetry and withdrew with the win in hand.",primitives:[{k:"Topology",v:"swarm of cheap nodes vs. one heavy asset"},{k:"Tactics",v:"aggressive, high fan-out"},{k:"Observability (Kurita)",v:"misread — saw a bigger force than present"},{k:"Failure mode",v:"monolith aborts on bad reads"}],flow:["Contact","Swarm resists","Kurita reads scope","Retreat"],break:2,breakLabel:"the monolith misread its telemetry and aborted a won engagement",architect:"A swarm of commodity nodes with aggressive behavior overwhelms one over-specced asset — and the heavy system’s operator, working from noisy observability, backs off a fight he was winning. Bad dashboards make strong systems retreat."},"iowa-class":{lens:"A general-purpose platform that stayed relevant by being reconfigurable — repurposed as carrier escort, anti-air battery, and shore bombardment as the mission changed. The anti-Yamato: designed for adaptation, not a single workload.",primitives:[{k:"Fit-to-environment",v:"maintained by reconfiguration"},{k:"Coupling",v:"loose to any one mission"},{k:"Reversibility",v:"high — re-roleable"},{k:"Longevity",v:"decades, across eras"}],flow:["New mission","Reconfigure role","Execute","Stay relevant"],break:-1,breakLabel:"healthy — a general-purpose platform that outlived its original workload",architect:"The general-purpose service with clean, re-roleable interfaces that survives three platform migrations because it never over-committed to one traffic pattern. Adaptability is a hedge against your roadmap being wrong."},"radar-fire-control":{lens:"An observability layer that rewrote the engagement contract — radar-directed gunnery let ships fight at night and beyond visual range, moving the aiming decision out of the human eye and into instrumentation.",primitives:[{k:"Observability",v:"sensing beyond the human loop"},{k:"Interface change",v:'redefined what "range" means'},{k:"Latency",v:"solution computed continuously"},{k:"Advantage",v:"the older aiming method obsoleted"}],flow:["Radar contact","Compute solution","Fire","Hit in the dark"],break:-1,breakLabel:"healthy — instrumentation that changed the rules of engagement",architect:"The telemetry upgrade that doesn’t just report the world but changes the contract of the game — like tracing that lets you act on requests you previously couldn’t even see. Observability isn’t monitoring; sometimes it’s the weapon."},donitz:{lens:"An operations leader who ran the campaign on a proxy metric — tonnage sunk — while the real metric, the exchange rate of boats-for-ships, silently inverted. A control plane addicted to a number that stopped tracking the outcome.",primitives:[{k:"Feedback loop",v:"wrong referee (tonnage, not attrition)"},{k:"Control point",v:"centralized, metric-driven"},{k:"Metric",v:"proxy diverged from goal"},{k:"Observability",v:"measured the flattering number"}],flow:["Sink a ship","Count tonnage","Report up","Judge winning"],break:1,breakLabel:"optimizing the proxy metric while the real loop inverted",architect:"The org steering on a vanity KPI — requests served, tonnage sunk — while the ratio that actually decides survival (cost per outcome, boats lost per ship) turns against it unwatched. Pick the referee before you optimize, or you’ll win the wrong scoreboard."},"type-vii-uboat":{lens:"A node with a fundamental design constraint: it had to surface to charge and transit, and had to phone home by radio. Its strength was concealment, but its architecture forced it to periodically expose itself on an observable channel.",primitives:[{k:"Design constraint",v:"must surface = must expose"},{k:"Side channel",v:"radio + surfaced silhouette"},{k:"Coupling",v:"dependent on central command"},{k:"Failure mode",v:"caught during exposure window"}],flow:["Submerged patrol","Surface to charge","Radio home","Attack"],break:1,breakLabel:"the design forces periodic exposure on an observable channel",architect:'The "offline" component that must periodically call home over a channel the adversary can watch — its confidentiality is broken not by a flaw but by its required reporting behavior. If it has to phone home, that call is your attack surface.'},wolfpack:{lens:"A centralized coordinator (BdU) fanned out orders over a broadcast channel; coordinating the pack required constant chatter. The coordination traffic itself became the leak.",primitives:[{k:"Coupling",v:"tight, hub-and-spoke"},{k:"Fan-out",v:"broadcast to the pack"},{k:"Side channel",v:"radio emissions = position"},{k:"Observability",v:"leaks to the adversary"}],flow:["Sight convoy","Radio BdU","Coordinate pack","Attack"],break:2,breakLabel:"a chatty control plane broadcasting on an observable channel",architect:"A chatty control plane that broadcasts on an observable channel — your coordination traffic is itself a side-channel the adversary triangulates (HF/DF). The more your nodes must talk to stay in sync, the more you leak about where they are."},"hf-df":{lens:"The adversary’s tracing infrastructure: high-frequency direction finding turned every U-boat transmission into a fix. It weaponized the enemy’s own coordination traffic — distributed tracing run by the other side.",primitives:[{k:"Observability (theirs)",v:"your traffic, their map"},{k:"Input",v:"the enemy’s required emissions"},{k:"Feedback loop",v:"transmit → fix → vector escorts"},{k:"Exploit",v:"coordination as a locator"}],flow:["U-boat transmits","Triangulate the fix","Vector escorts","Kill"],break:-1,breakLabel:"healthy (for the Allies) — the enemy’s chatter became the enemy’s map",architect:"When your adversary builds tracing on the emissions your own protocol requires, their observability is your liability. Assume any channel your system must use to coordinate is being correlated by someone who wants to find your nodes."},"centimetric-radar":{lens:"A sensing upgrade that operated outside the band the adversary was monitoring — short-wave radar (cavity magnetron) the Germans’ Metox receiver couldn’t detect. The defenders were watching the wrong frequency and went blind to a side channel they didn’t know existed.",primitives:[{k:"Detection surface",v:"outside adversary’s monitored band"},{k:"Observability asymmetry",v:"we see, they can’t hear us looking"},{k:"Blind spot (theirs)",v:"wrong frequency watched"},{k:"Advantage window",v:"until they discovered the band"}],flow:["Sub surfaces","Detect on new band","Attack undetected","Kill"],break:-1,breakLabel:"healthy — sensing on a band the adversary never thought to monitor",architect:"You can be fully instrumented against the threats you modeled and completely blind to a channel outside your monitored spectrum. The Germans monitored one band and trusted the silence; the signal was simply somewhere they weren’t looking."},"escort-carrier":{lens:"Cheap, mass-produced carriers deployed to close a coverage gap in the topology. Not elite assets — commodity capacity, scaled horizontally to put air cover everywhere the map had a hole.",primitives:[{k:"Scaling",v:"horizontal, commodity units"},{k:"Cost",v:"low per node"},{k:"Coverage",v:"fills the topology gap"},{k:"Redundancy",v:"many, expendable"}],flow:["Gap in coverage","Deploy cheap carriers","Close the gap","Air cover everywhere"],break:-1,breakLabel:"healthy — commodity horizontal capacity plugging a coverage hole",architect:"Solving a coverage gap with cheap, numerous, expendable nodes rather than a few gold-plated ones — the case for scaling out with commodity instances to cover the whole request surface instead of over-investing in a handful."},"mid-atlantic-gap":{lens:'The "black pit" — the region beyond land-based air cover where the observability and defense map had a hole, and where losses therefore concentrated. Failures cluster wherever monitoring stops.',primitives:[{k:"Coverage gap",v:"no air = no monitoring"},{k:"Blind spot",v:"the map’s dead zone"},{k:"Failure concentration",v:"losses cluster here"},{k:"Root cause",v:"range limit, not tactics"}],flow:["Convoy enters gap","No air cover","Wolfpack strikes","Losses"],break:1,breakLabel:"the unmonitored region where failures concentrate",architect:"Every system has a black pit: the code path, region, or time window your monitoring and defenses don’t reach. Incidents don’t distribute evenly — they pool exactly where coverage ends. Map your gaps before the adversary maps them for you."},blackett:{lens:"The operational-research lead who fixed the system by measuring the real loop instead of trusting intuition — resizing convoys, retuning depth charges, repainting aircraft, all driven by data on what actually changed the kill rate. The SRE who corrected the scoreboard.",primitives:[{k:"Feedback loop",v:"rebuilt around the true metric"},{k:"Method",v:"measure, don’t assume"},{k:"Tuning",v:"evidence-driven parameter changes"},{k:"Outcome",v:"exchange rate inverted in the Allies’ favor"}],flow:["Measure the real loop","Find the true metric","Retune parameters","Kill rate up"],break:-1,breakLabel:"healthy — instrument the real objective, then tune to it",architect:"The data engineer who ignores folklore, instruments the actual objective function, and tunes the knobs that move it — larger convoys, deeper charge settings. This is how you replace a wrong scoreboard: measure the outcome, not the proxy."},"black-may":{lens:"The moment the delayed feedback finally arrived — May 1943, U-boat losses spiked and Dönitz withdrew. The real cost had been accruing invisibly; the loop closed all at once and forced the retreat.",primitives:[{k:"Feedback latency",v:"long — truth arrived late"},{k:"Metric correction",v:"proxy caught up with reality"},{k:"Tipping point",v:"losses crossed the threshold"},{k:"Response",v:"withdraw — the loop finally acted"}],flow:["Losses spike","True cost surfaces","Threshold crossed","Withdraw"],break:-1,breakLabel:"the correction — the lagging feedback finally closed the loop",architect:"What a lagging feedback loop looks like when it finally fires: months of accruing cost invisible to the dashboard, then a single reporting period where reality lands as a cliff. Shorten your feedback latency or your corrections will always arrive as crises."},"ultra-enigma":{lens:"A pipeline that read the adversary’s own event stream — decrypting enemy traffic into actionable intelligence. The upstream source that turned an opponent’s internal messaging into your telemetry.",primitives:[{k:"Observability",v:"adversary’s traffic as your feed"},{k:"Pipeline",v:"intercept → decrypt → interpret"},{k:"Contract",v:"their message format, reverse-engineered"},{k:"Discipline required",v:"act without revealing the source"}],flow:["Intercept","Decrypt","Interpret","Act quietly"],break:-1,breakLabel:"healthy — reading the opponent’s stream and acting without exposing it",architect:"Consuming an adversary’s internal event stream as intelligence — and the hard part isn’t decryption, it’s acting on it without leaking that you can, the same discipline as using a data source you’re not supposed to reveal you have."},rochefort:{lens:'The senior analyst trusted to interpret ambiguous telemetry and commit to a reading — the human at the analysis node who staked his credibility on "AF is Midway" when the decode was incomplete.',primitives:[{k:"Authority placement",v:"at the analysis node"},{k:"Signal quality",v:"partial, ambiguous"},{k:"Decision",v:"commit to an interpretation"},{k:"Trust",v:"earned autonomy to call it"}],flow:["Ambiguous decode","Interpret","Commit to a call","Command acts"],break:-1,breakLabel:"healthy — trusted judgment committing on partial evidence",architect:"The senior engineer who is trusted to read noisy signals and make the call without escalating every ambiguity upward. Sufficient-evidence decision-making requires pre-granted authority to interpret; otherwise the analysis stalls waiting for certainty that never comes."},"station-hypo":{lens:"The decode service that turned intercepted ciphertext into intelligence — a specialized analytics pipeline with the skill and context to extract signal from a partially-broken source.",primitives:[{k:"Cohesion",v:"specialized, expert team"},{k:"Pipeline",v:"ciphertext → fragments → meaning"},{k:"Throughput",v:"enough signal, fast enough"},{k:"Coupling",v:"fed the decision-maker directly"}],flow:["Intercept","Partial decode","Assemble picture","Feed command"],break:-1,breakLabel:"healthy — the analytics service that made the ambiguous actionable",architect:"The dedicated analytics service that sits between raw feeds and decision-makers, staffed by people with the domain context to make partial data mean something. The value is in the interpretation layer, not the raw ingest."},"jn-25":{lens:"The adversary’s message format — only partially parseable, yet the fragments were sufficient. A broken-but-readable contract from which enough structure could be recovered to act.",primitives:[{k:"Interface",v:"partially reverse-engineered"},{k:"Signal",v:"incomplete but sufficient"},{k:"Sufficiency",v:"fragments → confident decision"},{k:"Failure mode (theirs)",v:"reused code, slow rotation"}],flow:["Encrypted traffic","Partial parse","Recover fragments","Sufficient signal"],break:-1,breakLabel:"healthy — a partly-parsed contract that still yielded enough",architect:"Proof that you don’t need to fully parse a message to extract decisive value — recovering enough of an undocumented format to act. Sufficiency beats completeness; the enemy’s failure was slow key rotation, the reused-secret anti-pattern."},"af-water-ruse":{lens:'An active probe injected to disambiguate the data — a fake "Midway is short of water" message sent in the clear, so that the enemy’s intercepted report of it would confirm the hypothesis that AF meant Midway. A falsification test run against a live adversary.',primitives:[{k:"Falsification test",v:"a controlled probe"},{k:"Canary",v:"inject a known, watch the echo"},{k:"Idempotency",v:"safe, reversible probe"},{k:"Confirmation",v:"hypothesis moved to certainty"}],flow:["Hypothesis: AF=Midway","Inject probe","Observe the echo","Confirm"],break:-1,breakLabel:"healthy — a designed probe that turned a guess into a confirmed fact",architect:"The textbook move: you have a hypothesis and ambiguous data, so you inject a controlled, harmless probe and watch which path lights up. A canary request built specifically to falsify or confirm a belief — evidence engineered, not just gathered."},nimitz:{lens:"The decision-maker who pre-positioned force based on sufficient evidence — moving carriers to Point Luck to ambush, committing authority and resources ahead of the event rather than reacting to it. The healthy pipeline: signal to pre-committed consequence.",primitives:[{k:"Authority",v:"pre-committed on evidence"},{k:"Latency",v:"zero at the event — already positioned"},{k:"Feedback loop",v:"signal → decision → ambush"},{k:"Risk posture",v:"act on sufficient, not certain"}],flow:["Sufficient intel","Pre-position force","Enemy arrives","Ambush"],break:-1,breakLabel:"healthy — authority and force pre-committed ahead of the signal",architect:"The whole architecture working: a signal deemed sufficient triggers pre-positioning, so when the event fires the response latency is zero because the decision was already made. Pre-authorize and pre-stage on good evidence instead of scrambling reactively."},yorktown:{lens:"A damaged carrier repaired in 72 hours against an estimate of months — right-sizing the fix to the mission deadline instead of the maintenance manual. Known technical debt accepted deliberately to hit the deployment window.",primitives:[{k:"Reversibility",v:"debt carried, not eliminated"},{k:"Latency",v:"72h vs. months — a decision, not a calendar"},{k:"SLA fit",v:"repair scoped to the mission window"},{k:"Risk",v:"accepted, known, bounded"}],flow:["Damage assessed","Scope to the window","Patch, not perfect","Deploy on time"],break:-1,breakLabel:"healthy — accepted known debt to hit the deployment window",architect:"Right-sizing the repair to the mission SLA instead of the maintenance runbook — accept known technical debt to hit the deployment window. The discipline is deciding what not to fix, on purpose, and knowing the debt you’re carrying."},"sbd-dauntless":{lens:"The effector at the end of the pipeline — a cheap, precise dive bomber that delivered the actual consequence in a few decisive minutes. All the intelligence upstream meant nothing without the actuator that converted signal into outcome.",primitives:[{k:"Role",v:"the effector / actuator"},{k:"Precision",v:"high, at the decisive moment"},{k:"Cost",v:"low per unit"},{k:"Coupling",v:"terminal node of the whole chain"}],flow:["Intel delivered","Vector to target","Dive","Consequence"],break:-1,breakLabel:"healthy — the actuator that turned signal into outcome",architect:"The cheap, precise effector at the terminus of the pipeline: every upstream service — intercept, decode, positioning — is worthless if the final actuator can’t deliver consequence at the right moment. Never under-invest in the node that actually acts."},"kido-butai":{lens:"A tightly-coupled, high-value cluster caught in an inconsistent state — the Japanese carrier force with decks full of rearming aircraft when the attack landed. A race condition on the flight deck: caught mid-transaction, all four eggs in one blast radius, no defense-in-depth.",primitives:[{k:"Coupling",v:"tight — four carriers, one formation"},{k:"Consistency",v:"caught mid-transaction (rearming)"},{k:"Blast radius",v:"total — one strike, whole cluster"},{k:"Defense-in-depth",v:"none at the vulnerable moment"}],flow:["Launch strike","Rearm on deck","Caught inconsistent","Destroyed"],break:2,breakLabel:"caught mid-transaction — a race condition on the flight deck",architect:"A tightly-coupled high-value cluster hit during a non-atomic state change — decks loaded with fuel and ordnance mid-swap. It’s a race condition with a planetary blast radius: no isolation, no atomicity, everything critical exposed in the same window."},spruance:{lens:"The operator who committed at the right window and then knew when to stop — launched at the decisive moment, then withdrew rather than press a night engagement he couldn’t control. Disciplined blast-radius management.",primitives:[{k:"Timing",v:"committed at the optimal window"},{k:"Blast radius",v:"controlled — didn’t overreach"},{k:"Risk posture",v:"take the win, cap the downside"},{k:"Restraint",v:"stopped while ahead"}],flow:["Read the window","Commit the strike","Take the win","Withdraw"],break:-1,breakLabel:"healthy — committed decisively, then capped the downside",architect:"The operator who ships at the right moment and then resists the temptation to push further into conditions he can’t observe or control. Knowing when to stop is blast-radius discipline — the win is banked, the tail risk is declined."},fletcher:{lens:"The senior commander who delegated tactical control to Spruance at the decisive moment — authority placed at the edge where the real-time decisions had to happen. Loose coupling of command under fire.",primitives:[{k:"Authority placement",v:"delegated to the edge"},{k:"Coupling",v:"loose — no bottleneck through the top"},{k:"Latency",v:"decisions made where the action was"},{k:"Trust",v:"edge autonomy, pre-granted"}],flow:["Overall command","Delegate to edge","Edge decides","Act in real time"],break:-1,breakLabel:"healthy — authority delegated to the edge at the decisive moment",architect:"The senior who removes himself as a bottleneck by delegating decision authority to the node closest to the action. The opposite of routing every tactical call through the top — command that scales because it doesn’t centralize the decisions that must be fast."},trinity:{lens:"A deploy to production with no rollback path — a one-way state transition tested exactly once, with a blast radius that was planetary and permanent. The first commit that could never be reverted.",primitives:[{k:"Reversibility",v:"none — no rollback"},{k:"Blast radius",v:"unbounded"},{k:"Testing",v:"single shot, live"},{k:"Idempotency",v:"irrelevant — one-way"}],flow:["Assemble","Arm","Detonate","Permanent state"],break:2,breakLabel:"the irreversible commit — no rollback exists past this node",architect:"The migration with no down-script and no staging environment — you run it once, in prod, and whatever happens is now the permanent state of the world. Where reversibility is impossible, the entire discipline must move upstream into governance before the action."},oppenheimer:{lens:"The architect who shipped an irreversible capability and only afterward tried to build the governance around it. Capability outran control — the gate was proposed after the deploy that made it necessary.",primitives:[{k:"Sequencing",v:"capability before governance"},{k:"Control point",v:"proposed too late"},{k:"Reversibility",v:"none — the capability persists"},{k:"Failure mode",v:"governance retrofit on a live system"}],flow:["Build capability","Ship it","Confront governance","Too late"],break:1,breakLabel:"no governance gate before the irreversible ship",architect:"Shipping a powerful, irreversible capability first and reaching for the control plane afterward. For anything with no rollback, governance is not a follow-up ticket — the gate must exist before the merge, because you cannot retrofit control onto a capability already loose in the world."},"szilard-petition":{lens:"An internal dissent — an RFC — attempting to insert a governance gate before the irreversible action: scientists petitioning against using the bomb on cities without warning. The gate was raised and then bypassed.",primitives:[{k:"Control point",v:"proposed governance gate"},{k:"Dissent channel",v:"formal, from inside"},{k:"Outcome",v:"gate bypassed"},{k:"Reversibility",v:"the decision it opposed had none"}],flow:["Raise objection","Petition upward","Gate ignored","Irreversible use"],break:2,breakLabel:"the governance gate was raised, then bypassed",architect:"The internal RFC that tries to insert an approval gate ahead of an irreversible action — and gets overridden. The lesson isn’t that dissent existed; it’s that a governance gate with no enforcement authority is just a comment thread on a merged PR."},"franck-report":{lens:"A design review proposing a reversible, observable alternative — a demonstration blast rather than surprise military use — before the irreversible path was chosen. The reversible option was reviewed and rejected.",primitives:[{k:"Alternative",v:"a reversible / observable option"},{k:"Review",v:"formal, pre-decision"},{k:"Outcome",v:"reversible path rejected"},{k:"Trade-off",v:"demonstration vs. surprise"}],flow:["Propose demonstration","Review","Rejected","Irreversible use"],break:2,breakLabel:"the reversible alternative was rejected for the irreversible one",architect:"A design review that surfaced a reversible, observable option — a demo you could learn from before committing — and it lost. When a reversible path exists for a no-rollback action, rejecting it should require an extraordinarily high bar; here it didn’t clear it."},"acheson-lilienthal":{lens:"A proposal to build the missing control plane after the capability already existed — international governance over atomic energy. The attempt to install an authority layer over a dangerous capability, negotiated too late and never adopted.",primitives:[{k:"Control plane",v:"proposed, post-hoc"},{k:"Authority placement",v:"central, international"},{k:"Timing",v:"after the capability was loose"},{k:"Outcome",v:"never adopted"}],flow:["Capability exists","Propose control plane","Negotiate","Fails to land"],break:3,breakLabel:"the control plane, proposed too late, never adopted",architect:"The attempt to stand up a governance control plane over a capability that already escaped — and the reason it usually fails: once every actor holds the capability, none will cede control to a central authority. Build the control plane before you distribute the power, or you won’t get to."},"doomsday-clock":{lens:"An observability dashboard for an irreversible-risk system — a single continuously-maintained indicator of how close the no-rollback condition is. Not a control, a monitor: the SLO gauge for civilizational blast radius.",primitives:[{k:"Observability",v:"continuous risk indicator"},{k:"Scope",v:"a no-rollback condition"},{k:"Feedback loop",v:"expert-adjusted, published"},{k:"Actuation",v:"none — it only warns"}],flow:["Assess risk","Set the clock","Publish","Warn"],break:-1,breakLabel:"healthy (as a monitor) — a dashboard for an irreversible-risk system",architect:"A single published gauge tracking proximity to an irreversible failure — an SLO dashboard for a no-rollback system. Useful, but note its limit: it observes and warns without actuating. A monitor with no attached control plane can only tell you how close you are."},"einstein-telegram":{lens:"The initiating signal that started the whole pipeline — the Einstein–Szilard letter to Roosevelt. Once emitted, the event could not be un-emitted; it triggered a chain that had no rollback to its own beginning.",primitives:[{k:"Trigger",v:"the first emit"},{k:"Reversibility",v:"none — the chain, once started"},{k:"Fan-out",v:"launched an entire program"},{k:"Idempotency",v:"irrelevant — a single decisive event"}],flow:["Perceive the risk","Send the telegram","Program launches","Irreversible path"],break:2,breakLabel:"the emit that could not be un-emitted",architect:"The one message that, once sent, sets an irreversible chain in motion — the event you can’t retract because everything downstream has already consumed it. Some emits are commits: before you fire the trigger, be sure you can live with every consequence it fans out to."}},Aa={yamato:{file:"authentic/yamato.jpg",credit:"Battleship Yamato, Sukumo Bay trials, 30 Oct 1941 · Imperial Japanese Navy / US Navy NHHC 80-G-704702 · public domain"},b1bis:{file:"authentic/b1bis.jpg",credit:"Char B1 bis “Ouragan”, 1940 · US National Archives / Conseil Régional de Basse-Normandie · free license"},uboat:{file:"authentic/uboat.jpg",credit:"Type VIIC U-boat U-660 surfaced, 12 Nov 1942 · Royal Navy / IWM AX 70A · public domain"},carrier:{file:"authentic/carrier.jpg",credit:"USS Yorktown (CV-5) underway, 1937 · US Navy 19-N-17424 (NARA) · public domain"},gadget:{file:"authentic/gadget.jpg",credit:"The Trinity “Gadget” being readied, July 1945 · US Dept of Energy / Los Alamos · public domain"},trinity:{file:"authentic/trinity.jpg",credit:"Trinity detonation, 16 ms, 16 July 1945 · Berlyn Brixner / Los Alamos (PA-98-0520) · public domain"},carrier_drawing:{file:"authentic/carrier_drawing.png",credit:"Yorktown-class cutaway · US Navy Bureau of Ships (NHHC) · public domain"},uboat_drawing:{file:"authentic/uboat_drawing.png",credit:"Type VIIC general arrangement · US Navy, David W. Taylor Model Basin (from U-570) · public domain"},guderian:{file:"authentic/guderian.jpg",credit:"Heinz Guderian, 1941 · Bundesarchiv Bild 101I-139-1112-17 / Knobloch · CC-BY-SA 3.0"},manstein:{file:"authentic/manstein.jpg",credit:"Erich von Manstein, 1938 · Bundesarchiv Bild 183-H01757 · CC-BY-SA 3.0"},donitz:{file:"authentic/donitz.jpg",credit:"Karl Dönitz, 1943 · Bundesarchiv Bild 146-1976-127-06A / Hoffmann · CC-BY-SA 3.0"},blackett:{file:"authentic/blackett.jpg",credit:"Patrick Blackett, 1963 · GFHund (F. Hund estate) · CC-BY 3.0"},rochefort:{file:"authentic/rochefort.jpg",credit:"Joseph Rochefort · US Navy / NSA · public domain"},nimitz:{file:"authentic/nimitz.jpg",credit:"Chester Nimitz, c.1942 · US Navy 80-G-466244 (NHHC) · public domain"},spruance:{file:"authentic/spruance.jpg",credit:"Raymond Spruance, 1944 · US Navy 80-G-225341 (NHHC) · public domain"},fletcher:{file:"authentic/fletcher.jpg",credit:"Frank Jack Fletcher, 1942 · US Naval Historical Center · public domain"},oppenheimer:{file:"authentic/oppenheimer.jpg",credit:"J. Robert Oppenheimer, c.1944 · US DOE / Los Alamos · public domain"},einstein:{file:"authentic/einstein.jpg",credit:"Albert Einstein, 1947 · Orren Jack Turner / US Library of Congress · public domain"}},pf={"char-b1-bis":"b1bis",yamato:"yamato","type-vii-uboat":"uboat",yorktown:"carrier",guderian:"guderian",manstein:"manstein",donitz:"donitz",blackett:"blackett",rochefort:"rochefort",nimitz:"nimitz",spruance:"spruance",fletcher:"fletcher",oppenheimer:"oppenheimer","einstein-telegram":"einstein",trinity:"trinity"},qS="/midway/assets/img/";let yn,Ih,Uh,bm,hi,xi=[];function Sm(){yn||(yn=document.createElement("div"),yn.id="codex",yn.innerHTML=`
    <div class="codex-scrim" data-codex-close></div>
    <aside class="codex-panel" role="dialog" aria-modal="true" aria-label="Dossier" tabindex="-1">
      <header class="codex-head">
        <nav class="codex-crumbs" id="codex-crumbs" aria-label="Trail"></nav>
        <button class="codex-close" data-codex-close aria-label="Close dossier">✕</button>
      </header>
      <div class="codex-scroll"><div class="codex-body" id="codex-body"></div></div>
      <div class="codex-depthbar"><span></span></div>
    </aside>`,document.body.appendChild(yn),Ih=yn.querySelector(".codex-panel"),Uh=yn.querySelector("#codex-body"),bm=yn.querySelector("#codex-crumbs"),hi=document.createElement("div"),hi.id="codex-tip",hi.setAttribute("aria-hidden","true"),document.body.appendChild(hi))}function Lt(r){return String(r??"")}function Mm(r){const e=(r||[]).filter(t=>ti[t]);return e.length?`<div class="codex-threads"><div class="codex-threads-h">PULL THE THREAD</div><div class="codex-thread-list">${e.map(t=>`<button class="codex-thread" data-dossier="${t}"><span class="ct-kind">${Lt(ti[t].kind)}</span><span class="ct-title">${Lt(ti[t].title)}</span><span class="ct-arrow">→</span></button>`).join("")}</div></div>`:""}function YS(r,e,t){const n=r.length,i=96,s=46,a=34,o=10,l=16,c=t?40:12,h=o*2+n*i+(n-1)*a,f=l+s+c,u=e===-1;let d="";for(let g=0;g<n;g++){const _=o+g*(i+a),p=l,m=g===e,v=m?"var(--a-late)":u?"var(--a-build)":"var(--steel)";if(g<n-1){const y=_+i,S=_+i+a,A=p+s/2;d+=`<line x1="${y}" y1="${A}" x2="${S-6}" y2="${A}" stroke="var(--line)" stroke-width="1.5"/>`,d+=`<path d="M${S-6},${A-4} L${S},${A} L${S-6},${A+4} Z" fill="var(--ink-faint)"/>`}d+=`<rect x="${_}" y="${p}" width="${i}" height="${s}" rx="4" fill="#0a0e15" stroke="${v}" stroke-width="${m?2.5:1.2}"/>`,d+=`<text x="${_+i/2}" y="${p+s/2+4}" text-anchor="middle" class="flow-t">${Lt(r[g])}</text>`,m&&t&&(d+=`<text x="${_+i/2}" y="${p+s+22}" text-anchor="middle" class="flow-brk">▲ ${Lt(t)}</text>`)}return u&&(d+=`<text x="${h-o}" y="${f-4}" text-anchor="end" class="flow-ok">✓ moved before the window closed</text>`),`<svg class="codex-flow" viewBox="0 0 ${h} ${f}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="signal to consequence pipeline">${d}</svg>`}function wm(r){const e=ti[r];if(!e)return`<p class="codex-missing">No dossier for “${Lt(r)}”.</p>`;const t=e.stats&&e.stats.length?`<dl class="codex-stats">${e.stats.map(l=>`<div><dt>${Lt(l.k)}</dt><dd>${Lt(l.v)}</dd></div>`).join("")}</dl>`:"",n=pf[r]&&Aa[pf[r]],i=n?`<figure class="codex-figure-wrap"><div class="codex-figure" style="background-image:url('${qS}${n.file}')"></div><figcaption class="codex-figcredit">${Lt(n.credit)}</figcaption></figure>`:"",s=(e.body||[]).map(l=>`<p>${l}</p>`).join(""),a=e.ai?`<aside class="codex-ai"><span class="codex-ai-k">THE DISTANCE</span>${e.ai}</aside>`:"",o=wu[r]?`<button class="codex-deeper" data-deep="${r}"><span class="cd-k">SYSTEMS VIEW</span><span class="cd-t">See it as an architecture</span><span class="cd-a">↓ one layer deeper</span></button>`:"";return`
    <article class="codex-article">
      <div class="codex-kind">${Lt(e.kind)} · ${Lt(e.chapter)}</div>
      <h2 class="codex-title">${Lt(e.title)}</h2>
      <p class="codex-tagline">${Lt(e.tagline)}</p>
      ${i}${t}
      <div class="codex-prose">${s}</div>
      ${a}${o}${Mm(e.threads)}
    </article>`}function $S(r){const e=ti[r],t=wu[r];if(!t)return wm(r);const n=t.primitives&&t.primitives.length?`<dl class="codex-prims">${t.primitives.map(a=>`<div><dt>${Lt(a.k)}</dt><dd>${Lt(a.v)}</dd></div>`).join("")}</dl>`:"",i=t.flow&&t.flow.length?`<div class="codex-diagram"><div class="codex-diagram-h">SIGNAL → CONSEQUENCE</div>${YS(t.flow,t.break==null?-1:t.break,t.breakLabel)}</div>`:"",s=t.architect?`<aside class="codex-arch"><span class="codex-arch-k">IN YOUR STACK</span>${t.architect}</aside>`:"";return`
    <article class="codex-article codex-article--deep">
      <div class="codex-kind">SYSTEMS VIEW · ${Lt(e.kind)}</div>
      <h2 class="codex-title">${Lt(e.title)}</h2>
      <p class="codex-tagline">${Lt(t.lens||"")}</p>
      ${i}${n}${s}
      ${Mm(e.threads)}
    </article>`}function Tu(){const r=xi[xi.length-1];Uh.innerHTML=r.deep?$S(r.id):wm(r.id),Uh.parentElement.scrollTop=0,bm.innerHTML=xi.map((t,n)=>{const i=t.deep?"Systems View":ti[t.id]?ti[t.id].title:t.id,s=n>0?'<span class="codex-crumb-sep">›</span>':"",a=n===xi.length-1?"codex-crumb is-current":"codex-crumb";return`${s}<button class="${a}" data-depth="${n}">${Lt(i)}</button>`}).join("");const e=yn.querySelector(".codex-depthbar span");e&&(e.style.width=Math.min(100,xi.length*20)+"%")}function KS(){yn.classList.add("is-open"),document.body.classList.add("codex-open"),window.__lenis&&window.__lenis.stop&&window.__lenis.stop(),Nh(),requestAnimationFrame(()=>Ih&&Ih.focus())}function mf(r){ti[r]&&(Sm(),xi.push({id:r,deep:!1}),Tu(),KS())}function jS(r){wu[r]&&(xi.push({id:r,deep:!0}),Tu())}function ZS(r){xi=xi.slice(0,r+1),Tu()}function gf(){yn&&(yn.classList.remove("is-open"),document.body.classList.remove("codex-open"),window.__lenis&&window.__lenis.start&&window.__lenis.start(),xi=[],window.dispatchEvent(new CustomEvent("codex:closed")))}function JS(r){const e=ti[r.getAttribute("data-dossier")];if(!e||yn.classList.contains("is-open"))return;hi.innerHTML=`<span class="tip-kind">${Lt(e.kind)}</span>${Lt(e.tagline)}<span class="tip-cue">click to open dossier</span>`;const t=r.getBoundingClientRect();hi.classList.add("is-on");const n=Math.min(300,innerWidth-24);hi.style.width=n+"px";let i=t.left+t.width/2-n/2;i=Math.max(12,Math.min(i,innerWidth-n-12)),hi.style.left=i+"px",hi.style.top=t.bottom+10+"px"}function Nh(){hi&&hi.classList.remove("is-on")}function QS(){document.querySelectorAll(".dig-row[data-dig]").forEach(r=>{const e=r.getAttribute("data-dig").split(",").map(t=>t.trim()).filter(t=>ti[t]);if(!e.length){r.style.display="none";return}r.innerHTML=`<div class="dig-row-h">DIG DEEPER — ${e.length} dossiers</div><div class="dig-chips">${e.map(t=>`<button class="dig-chip" data-dossier="${t}"><span class="dc-kind">${Lt(ti[t].kind)}</span>${Lt(ti[t].title)}</button>`).join("")}</div>`})}function eM(){Sm(),QS(),document.addEventListener("click",e=>{const t=e.target.closest("[data-deep]");if(t){e.preventDefault(),jS(t.getAttribute("data-deep"));return}const n=e.target.closest("[data-dossier]");if(n){e.preventDefault(),mf(n.getAttribute("data-dossier"));return}const i=e.target.closest("[data-depth]");if(i){ZS(parseInt(i.getAttribute("data-depth"),10));return}if(e.target.closest("[data-codex-close]")){gf();return}}),document.addEventListener("keydown",e=>{e.key==="Escape"&&yn.classList.contains("is-open")&&gf()});let r=null;document.addEventListener("pointerover",e=>{const t=e.target.closest(".entity[data-dossier]");t&&t!==r&&(r=t,JS(t))}),document.addEventListener("pointerout",e=>{const t=e.target.closest(".entity[data-dossier]");t&&t===r&&(r=null,Nh())}),window.addEventListener("scroll",Nh,{passive:!0}),window.__openDossier=mf}const Tm="/midway/assets/audio/",_f={file:"bg.mp3",vol:.06},Em={blitzkrieg:{file:"blitzkrieg.mp3",vol:.16,credit:"“Slow Ticking Clock” · FreePD · CC0 — the time strength no longer had",loop:!0},yamato:{file:"yamato.mp3",vol:.15,credit:"“Umi Yukaba”, IJN elegy · Internet Archive · public domain",loop:!0},uboats:{file:"uboats.mp3",vol:.15,credit:"Submarine dive alarm · U.S. DoD · public domain",loop:!1},midway:{file:"midway.mp3",vol:.13,credit:"MBS radio, Battle of Midway, 4 Jun 1942 · Internet Archive · public domain",loop:!0},atom:{file:"atom.mp3",vol:.14,credit:"BBC, Hiroshima report, 6 Aug 1945 · Internet Archive · public domain",loop:!0}};let nr=!1,di=null;const jo={};let Nn=null;function Ba(r,e,t){r&&(r._fade&&clearInterval(r._fade),r._fade=setInterval(()=>{const n=e-r.volume;Math.abs(n)<.015?(r.volume=Math.max(0,Math.min(1,e)),clearInterval(r._fade),r._fade=null,t&&t()):r.volume=Math.max(0,Math.min(1,r.volume+Math.sign(n)*.03))},45))}function tM(r){if(jo[r])return jo[r];const e=Em[r];if(!e)return null;const t=new Audio(Tm+e.file);return t.loop=e.loop!==!1,t.preload="none",t.volume=0,t.addEventListener("ended",()=>{di===r&&(di=null,nr&&Eu())}),jo[r]=t,t}function Eu(){if(!di){Nn||(Nn=new Audio(Tm+_f.file),Nn.loop=!0,Nn.preload="none",Nn.volume=0);try{Nn.play().then(()=>Ba(Nn,_f.vol)).catch(()=>{})}catch{}}}function nM(r){if(!nr)return;const e=tM(r);if(e&&di!==r){di&&gl(di),di=r,Nn&&Ba(Nn,0,()=>{try{Nn.pause()}catch{}});try{e.play().then(()=>Ba(e,Em[r].vol)).catch(()=>{})}catch{}}}function gl(r){const e=jo[r];e&&Ba(e,0,()=>{try{e.pause()}catch{}}),di===r&&(di=null,nr&&Eu())}function iM(){const r=document.getElementById("hud");if(!r)return;const e=document.createElement("button");e.id="sound-toggle",e.setAttribute("aria-pressed","false"),e.setAttribute("aria-label","Toggle ambient sound"),e.innerHTML='<span class="st-ico" aria-hidden="true"><i></i><i></i><i></i></span><span class="st-label">SOUND</span>',r.appendChild(e),e.addEventListener("click",()=>{nr=!nr,e.classList.toggle("is-on",nr),e.setAttribute("aria-pressed",String(nr)),nr?Eu():(di&&gl(di),Nn&&Ba(Nn,0,()=>{try{Nn.pause()}catch{}}))})}const rM="/midway/assets/img/",sM={late:"#c8563f",aim:"#b98a3e",score:"#4f86a8",build:"#52a494",atom:"#cf8a5c"},aM=[{section:"blitzkrieg",accent:"late",title:"THE TANK",mode:"photo",photo:"b1bis",dossier:"char-b1-bis",cue:"click to open the dossier"},{section:"yamato",accent:"aim",title:"THE BATTLESHIP",mode:"tilt3d",photo:"yamato",dossier:"yamato",cue:"move to turn · click to open the dossier"},{section:"uboats",accent:"score",title:"THE U-BOAT",mode:"xray",photo:"uboat",drawing:"uboat_drawing",dossier:"type-vii-uboat",cue:"move to X-ray the plans · click to open"},{section:"midway",accent:"build",title:"THE CARRIER",mode:"dissolve",photo:"carrier",drawing:"carrier_drawing",dossier:"yorktown",cue:"photograph ⇄ the plans · click to open"},{section:"atom",accent:"atom",title:"THE DEVICE",mode:"detonate",photo:"gadget",alt:"trinity",dossier:"trinity",cue:"click to detonate"}];function ko(r,e){const t=Aa[e];return t?`<div class="${r}" style="background-image:url('${rM}${t.file}')"></div>`:""}function oM(r){const e=document.getElementById(r.section);if(!e)return null;const t=Aa[r.photo];if(!t)return null;const n=r.drawing?Aa[r.drawing]:null,i=r.alt?Aa[r.alt]:null,s=document.createElement("div");s.className=`specimen-stage mode-${r.mode}`,s.style.setProperty("--acc",sM[r.accent]);let a=ko("spec-photo",r.photo);r.mode==="xray"&&(a+=ko("spec-blueprint",r.drawing)+'<div class="spec-lens"><span class="spec-lens-tag">THE PLANS</span></div>'),r.mode==="dissolve"&&(a+=ko("spec-blueprint spec-blueprint--auto",r.drawing)+'<div class="spec-mode-tag">RECOGNITION DRAWING</div>'),r.mode==="detonate"&&(a+=ko("spec-alt",r.alt)+'<div class="spec-flash"></div>'),a+=`<div class="spec-vignette"></div><div class="spec-frame-label"><span class="sfl-title">${r.title}</span></div>`;const o=t.credit+(n?"  ·  plans: "+n.credit:"")+(i?"  ·  "+i.credit:"");return s.innerHTML=`
    <div class="spec-perspective">
      <div class="spec-frame" role="button" tabindex="0" aria-label="Open the ${r.title.toLowerCase()} dossier">${a}</div>
    </div>
    <div class="spec-foot"><span class="spec-credit">${o}</span><span class="spec-cue">${r.cue} &rarr;</span></div>`,e.querySelector(".chapter-head").after(s),s}function lM(r,e){const t=r.querySelector(".spec-frame"),n=r.querySelector(".spec-blueprint"),i=r.querySelector(".spec-lens"),s=r.querySelector(".spec-vignette");function a(h){const f=t.getBoundingClientRect(),u=Math.max(0,Math.min(1,(h.clientX-f.left)/f.width)),d=Math.max(0,Math.min(1,(h.clientY-f.top)/f.height));e.mode==="tilt3d"&&(t.style.setProperty("--ry",(u-.5)*16+"deg"),t.style.setProperty("--rx",-(d-.5)*10+"deg"));const g=(u-.5)*-18,_=(d-.5)*-12;t.style.setProperty("--tx",g+"px"),t.style.setProperty("--ty",_+"px"),s&&(s.style.transform=`translate(${-g*1.3}px, ${-_*1.3}px)`),e.mode==="xray"&&n&&(n.style.clipPath=`circle(13% at ${u*100}% ${d*100}%)`,i.style.left=u*100+"%",i.style.top=d*100+"%",i.style.opacity="1")}let o=!1;function l(){t.style.setProperty("--ry","0deg"),t.style.setProperty("--rx","0deg"),t.style.setProperty("--tx","0px"),t.style.setProperty("--ty","0px"),i&&(i.style.opacity="0"),o||gl(e.section)}r.addEventListener("pointermove",a),r.addEventListener("pointerenter",()=>nM(e.section)),r.addEventListener("pointerleave",l);function c(){o||(o=!0,e.mode==="detonate"?(t.classList.add("is-detonated"),setTimeout(()=>{window.__openDossier&&window.__openDossier(e.dossier)},900)):(t.classList.add("is-diving"),i&&(i.style.opacity="0"),setTimeout(()=>{window.__openDossier&&window.__openDossier(e.dossier)},520)))}t.addEventListener("click",c),t.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),c())}),window.addEventListener("codex:closed",()=>{o&&(o=!1,t.classList.remove("is-diving","is-detonated"),gl(e.section))})}function cM(){aM.forEach(r=>{try{const e=oM(r);e&&lM(e,r)}catch(e){console.error("[specimen]",r.section,e)}})}Pt.registerPlugin(Fe);const bc="/midway/assets/img/";function hM(){const r=document.getElementById("pre-needle"),e=document.getElementById("pre-bearing"),t=document.getElementById("pre-ticks");let n="";for(let a=0;a<72;a++){const o=a/72*Math.PI*2,l=a%9===0,c=92,h=l?80:86;n+=`<line class="pre-tick" x1="${100+c*Math.sin(o)}" y1="${100-c*Math.cos(o)}" x2="${100+h*Math.sin(o)}" y2="${100-h*Math.cos(o)}" opacity="${l?.6:.3}"/>`}t.innerHTML=n;const i=Pt.timeline();i.to(r,{rotation:47,transformOrigin:"100px 100px",duration:2,ease:"power3.inOut",onUpdate(){const a=Pt.getProperty(r,"rotation");e.textContent=String(Math.round((a%360+360)%360)).padStart(3,"0")}}),i.to("#preloader",{opacity:0,duration:.8,ease:"power2.inOut",delay:.15,onComplete:Oh})}function Oh(){const r=document.getElementById("preloader");!r||r.classList.contains("done")||(r.classList.add("done"),document.body.classList.remove("is-loading"),mM())}let bi;function uM(){if(matchMedia("(prefers-reduced-motion: reduce)").matches){Fe.refresh();return}bi=new Fm({duration:1.15,smoothWheel:!0,wheelMultiplier:.9,touchMultiplier:1.4}),window.__lenis=bi,bi.on("scroll",Fe.update),Pt.ticker.add(e=>bi.raf(e*1e3)),Pt.ticker.lagSmoothing(0),document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",t=>{const n=document.querySelector(e.getAttribute("href"));n&&(t.preventDefault(),bi.scrollTo(n,{offset:0,duration:1.4}))})})}function dM(r){bi?bi.scrollTo(r,{duration:1.4}):r.scrollIntoView({behavior:"smooth"})}function fM(){const r=document.querySelector(".hero");r&&(r.style.backgroundImage=`linear-gradient(180deg, rgba(7,9,12,0.55) 0%, rgba(7,9,12,0.35) 45%, rgba(7,9,12,0.9) 100%), url("${bc}hero.png")`),document.querySelectorAll(".scene-bg").forEach(e=>{const t=e.dataset.img;if(!t)return;const n=t.includes(".")?`${bc}${t}`:`${bc}${t}.png`,i=new Image;i.onload=()=>{e.style.backgroundImage=`url("${n}")`,Pt.to(e,{opacity:t==="atom"?.55:.62,duration:1.4,ease:"power2.out"})},i.onerror=()=>{e.style.background="linear-gradient(160deg,#0c1017,#07090c)",e.style.opacity=1},i.src=n;const s=parseFloat(e.dataset.speed||"0.85");Pt.fromTo(e,{yPercent:-8},{yPercent:8*s,ease:"none",scrollTrigger:{trigger:e.parentElement,start:"top bottom",end:"bottom top",scrub:!0}})})}function pM(){Pt.set(".hero-title .reveal-line",{yPercent:110}),Pt.utils.toArray(".reveal").forEach(r=>{Pt.fromTo(r,{y:34,opacity:0},{y:0,opacity:1,duration:1,ease:"power3.out",scrollTrigger:{trigger:r,start:"top 88%"}})})}function mM(){Pt.timeline({delay:.1}).to(".hero-title .reveal-line",{yPercent:0,duration:1.1,stagger:.12,ease:"power4.out"})}function gM(){const r=Pt.utils.toArray(".scene[data-chapter]"),e=document.getElementById("chapter-nav"),t=document.getElementById("hud-bearing-val"),n=document.getElementById("scroll-progress-bar"),i=document.documentElement.style,s=new Set;r.forEach(o=>{const l=o.dataset.chapter;if(s.has(l))return;s.add(l);const c=document.createElement("button");c.className="nav-dot",c.dataset.target=o.id,c.innerHTML=`<span class="nav-tip">${l}</span>`,c.addEventListener("click",()=>dM(o)),e.appendChild(c)});const a=Array.from(e.children);r.forEach(o=>{const l=parseFloat(o.dataset.bearing||"0"),c=o.dataset.accent;Fe.create({trigger:o,start:"top 55%",end:"bottom 55%",onToggle:h=>{if(!h.isActive)return;Pt.to({v:parseFloat(t.textContent)||0},{v:l,duration:.9,ease:"power2.out",onUpdate(){t.textContent=String(Math.round(this.targets()[0].v%360)).padStart(3,"0")+"°"}});const f=o.dataset.chapter;a.forEach(u=>{const d=document.getElementById(u.dataset.target);u.classList.toggle("is-active",d&&d.dataset.chapter===f)}),c&&i.setProperty("--accent",getComputedStyle(o).getPropertyValue("--accent"))}})}),Fe.create({start:0,end:"max",onUpdate:o=>{n.style.width=(o.progress*100).toFixed(2)+"%"}})}function _M(){let r=!1;requestAnimationFrame(()=>{r=!0}),setTimeout(()=>{if(!r){if(document.documentElement.classList.add("no-anim"),bi){try{bi.destroy()}catch{}bi=null}Oh(),Fe.refresh()}},1600),document.addEventListener("visibilitychange",()=>{document.hidden||(Oh(),Fe.refresh())})}function vM(){const r="/midway/";document.querySelectorAll("#coda-reads a[data-read]").forEach(e=>{e.setAttribute("href",`${r}read/${e.getAttribute("data-read")}.html`)})}function vf(){document.body.classList.add("is-loading"),_M(),vM(),iM(),uM(),fM(),pM(),gM();const r=(e,t)=>{try{t()}catch(n){console.error(`[viz:${e}]`,n)}};r("codex",()=>eM()),r("specimens",()=>cM()),r("hero",()=>LS(document.getElementById("hero-canvas"))),r("latency",()=>DS(document.getElementById("viz-latency"))),r("yamato",()=>kS(document.getElementById("viz-yamato"))),r("scoreboard",()=>IS(document.getElementById("viz-scoreboard"))),r("midway",()=>US(document.getElementById("viz-midway"))),r("capstone",()=>NS()),r("atom",()=>XS(document.getElementById("atom-stage"))),Fe.refresh(),hM()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",vf):vf();window.addEventListener("load",()=>Fe.refresh());
