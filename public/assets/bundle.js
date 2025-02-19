(()=>{"use strict";class t{constructor(t){return this.element=document.createElement(t),this}attr(t,e){return this.element.setAttribute(t,e),this}class(t){return this.element.classList.add(t),this}classes(t){return t.forEach((t=>{this.element.classList.add(t)})),this}event(t,e){return this.element.addEventListener(t,e),this}append(t){return this.element.appendChild(t),this}renderTo(t){return t.appendChild(this.element),this}html(t){return this.element.innerHTML=t,this}appendHtml(t){return this.element.innerHTML+=t,this}}class e{constructor(t){this.lightboxImages=t||[],this.currentImageIndex=0,this.addClickEvent()}addClickEvent(){this.lightboxImages.forEach(((t,e)=>{t.addEventListener("click",(()=>this.openLightbox(e)))})),document.addEventListener("click",(t=>{t.target.classList.contains("lightbox-overlay")&&this.closeLightbox()})),document.addEventListener("keydown",(t=>{"ArrowRight"===t.key&&this.showNextImage()})),document.addEventListener("keydown",(t=>{"ArrowLeft"===t.key&&this.showPreviousImage()}))}openLightbox(t){this.currentImageIndex=t;const e=document.createElement("div");e.classList.add("lightbox-overlay"),document.body.appendChild(e);const s=document.createElement("img");s.src=this.lightboxImages[t].src,s.classList.add("lightbox-image"),e.appendChild(s);const i=document.createElement("button");i.innerHTML="&times;",i.classList.add("lightbox-close"),i.addEventListener("click",(()=>this.closeLightbox())),e.appendChild(i),document.body.style.overflow="hidden",document.addEventListener("keydown",(t=>{"Escape"===t.key&&this.closeLightbox()}))}closeLightbox(){const t=document.querySelector(".lightbox-overlay");t&&t.remove(),document.body.style.overflow="auto"}showNextImage(){this.currentImageIndex=(this.currentImageIndex+1)%this.lightboxImages.length,this.updateLightboxImage()}showPreviousImage(){this.currentImageIndex=(this.currentImageIndex-1+this.lightboxImages.length)%this.lightboxImages.length,this.updateLightboxImage()}updateLightboxImage(){const t=document.querySelector(".lightbox-image");t&&(t.src=this.lightboxImages[this.currentImageIndex].src)}}const s=class{constructor(e){this.popupId=e,this.popupUi=new t("div").classes(["fixed","left-0","top-0","w-full","h-full","bg-primary-dark-full","bg-opacity-40","zi-10"]),this.popupInner=new t("div").classes(["popup-content","m-10","p-10","h-full","border","border-slate-600","rounded-md","bg-custom-bg","max-h-full"]).element;const s=new t("button").classes(["absolute","top-0","right-0","m-2","cursor-pointer","text-5xl","font-light","leading-3"]).html("&times;").event("click",(()=>this.close())).element,i=new t("div");i.append(s),this.popupUi.append(i.element),this.popupUi.append(this.popupInner),this.outer=new t("div").classes(["absolute","left-0","top-0","w-full","h-full","z-[-1]"]),this.outer.event("click",(t=>{this.close()})),this.popupUi.append(this.outer.element)}open(){return new Promise(((t,e)=>{this.loadContent().then((()=>{this.renderToBody(),t()})).catch((t=>{console.error("Error loading content:",t),e(t)}))}))}close(){this.popupUi.element.remove()}loadContent(){return new Promise(((t,e)=>{const s=new XMLHttpRequest;s.onreadystatechange=()=>{4===s.readyState&&(200===s.status?(this.popupInner.innerHTML=s.responseText,t()):e(new Error(`Failed to load content. Status: ${s.status}`)))},s.open("GET","./popups/"+this.popupId+".html",!0),s.send()}))}renderToBody(){document.body.appendChild(this.popupUi.element);const t=this.popupUi.element.querySelectorAll(".lightbox");new e(Array.from(t))}};class i{constructor(t,e,s,i,n,o,h){this.size=t,this.x=e,this.y=s,this.vx=i,this.vy=n,this.minDistance=o,this.opacity=.6,this.smoothingFactor=h,this.color=`hsl(${this.rnd(170,190)},${this.rnd(70,100)}%,${this.rnd(40,100)}%,${this.opacity})`}static clearFlockNearMouse(t,e,s,i){for(const n of i)Math.sqrt((n.x-t)**2+(n.y-e)**2)<s&&i.splice(i.indexOf(n),1)}rnd(t,e){return Math.floor(Math.random()*(e-t+1))+t}update(t,e){const s=.95,{x:i,y:n,minDistance:o,smoothingFactor:h}=this,r=t.filter((t=>t!==this&&Math.abs(t.x-i)<50&&Math.abs(t.y-n)<50));if(r.length>0){let t=0;for(const e of r)t+=Math.atan2(e.vy,e.vx);t/=r.length,this.vx+=(.1*Math.cos(t)-this.vx)*h,this.vy+=(.1*Math.sin(t)-this.vy)*h;const e=Math.sqrt(this.vx**2+this.vy**2);this.vx=(this.vx/e||1)*s,this.vy=(this.vy/e||1)*s}const a={x:0,y:0};for(const t of r)a.x+=t.x,a.y+=t.y;if(r.length>0){a.x/=r.length,a.y/=r.length,this.vx+=(.05*(a.x-i)-this.vx)*h,this.vy+=(.05*(a.y-n)-this.vy)*h;const t=Math.sqrt(this.vx**2+this.vy**2);this.vx=(this.vx/t||1)*s,this.vy=(this.vy/t||1)*s}const d={x:0,y:0};for(const t of r)Math.sqrt((t.x-i)**2+(t.y-n)**2)<20&&(d.x+=i-t.x,d.y+=n-t.y);this.vx+=(.1*d.x-this.vx)*h,this.vy+=(.1*d.y-this.vy)*h;const l=Math.sqrt(this.vx**2+this.vy**2);this.vx=(this.vx/l||1)*s,this.vy=(this.vy/l||1)*s,this.x+=this.vx,this.y+=this.vy,this.x=(this.x+e.width)%e.width,this.y=(this.y+e.height)%e.height}draw(t){t.beginPath(),t.arc(this.x,this.y,this.size,0,2*Math.PI),t.fillStyle=this.color,t.fill()}}class n{constructor(t){this.bb8=t,this.antennas=this.bb8.querySelector(".antennas"),this.head=this.bb8.querySelector(".head"),this.eyes=this.bb8.querySelector(".eyes"),this.ball=this.bb8.querySelector(".ball"),this.droidX=0,this.mouseX=150,this.speed=2,this.accelMod=1,this.toTheRight=!0,this.init()}init(){this.bb8.classList.add("show-message"),console.log(this.bb8.classList),setTimeout((()=>{this.bb8.classList.remove("show-message")}),1e4),document.addEventListener("mousemove",(t=>{this.mouseX=t.pageX})),this.startMovement(),this.head.addEventListener("click",(t=>{this.toggleChatbotWindow()})),this.ball.addEventListener("mousedown",(t=>{this.toggleChatbotWindow()}))}toggleChatbotWindow(){this.chatbotWindow=document.getElementById("chatbot-window"),"none"===this.chatbotWindow.style.display||""===this.chatbotWindow.style.display?this.chatbotWindow.style.display="flex":this.chatbotWindow.style.display="none"}movement(){let t=this.mouseX-this.droidX,e=Math.abs(t*this.accelMod)/100;this.droidX<this.mouseX?(this.droidX+=this.speed*e,this.toTheRight=!0):(this.droidX-=this.speed*e,this.toTheRight=!1),this.bb8.style.transform=`translateX(${this.droidX}px)`;let s=(this.mouseX-this.droidX)/25,i=(this.mouseX-this.droidX)/80;this.antennas.style.transform=`translateX(${s}px) rotateZ(${i}deg)`;let n=(this.mouseX-this.droidX)/25,o=(this.mouseX-this.droidX)/35;this.head.style.transform=`translateX(${n}px) rotateZ(${o}deg)`,this.toTheRight?(this.antennas.classList.add("right"),this.eyes.classList.add("right")):(this.antennas.classList.remove("right"),this.eyes.classList.remove("right")),this.ball.style.transform=`rotateZ(${1.2*this.droidX}deg)`}startMovement(){setInterval((()=>this.movement()),10)}}(new class{constructor(){this.back2Top=this.back2Top.bind(this),this.nav=this.nav.bind(this),this.headerPos=null}handleButtonClick(t){const e=t.target.dataset.popup;new s(e).open()}popupInit(){document.querySelectorAll(".popup-button").forEach((t=>{t.addEventListener("click",this.handleButtonClick)}))}back2Top(){const t=document.getElementById("back-to-top-btn");t.addEventListener("click",(()=>{window.scrollTo({top:0,behavior:"smooth"})})),window.addEventListener("scroll",(()=>{window.scrollY>200?t.classList.remove("hidden"):t.classList.add("hidden")}))}nav(){const t=document.querySelector('[aria-controls="mobile-menu"]'),e=document.getElementById("mobile-menu"),s=document.querySelector("header"),i=document.querySelector("main");t.addEventListener("click",(()=>{e.classList.toggle("hidden")}));const n=document.querySelectorAll('a[href^="#"]');n.forEach((t=>{t.addEventListener("click",(i=>{i.preventDefault();const o=t.getAttribute("href").substring(1),h=document.getElementById(o);h&&(window.scrollTo({top:h.offsetTop-s.offsetHeight,behavior:"smooth"}),n.forEach((t=>{"home"!=t.getAttribute("href").substring(1)&&(t.classList.remove("text-primary-color","active"),t.classList.add("text-gray-300","hover:text-primary-color"))})),"home"!=o&&t.classList.add("text-primary-color","active"),e.classList.add("hidden"))}))})),window.addEventListener("scroll",(()=>{this.headerPos||(this.headerPos=s.getBoundingClientRect()),window.scrollY>s.offsetHeight?(s.classList.add("fixed","z-50","fixed-header"),s.style.left=`${this.headerPos.x}px`,i.style.paddingTop=this.headerPos.height+"px",s.style.top="0px",s.style.width=`${this.headerPos.width}px`):(s.classList.remove("fixed","z-50","fixed-header"),i.style.paddingTop=0)}))}typeEffect(){document.querySelectorAll("[data-typing]").forEach((function(t){var e=t.dataset.typing.split("|").map((function(e){return t.removeAttribute("data-typing"),e.trim()})),s=0,i="",n=!1;!function o(){var h=100;n?(i=e[s].substring(0,i.length-1),h=50):i=e[s].substring(0,i.length+1),t.innerHTML=i,n||i!==e[s]?n&&""===i&&(n=!1,s=(s+1)%e.length,h=200):(n=!0,h=500),setTimeout(o,h)}()}))}hilighter(){var t=document.querySelector(".highlight"),e=t.textContent.split("").map((function(t,e){return'<span style="animation-delay: '+(.1*(e+1)).toFixed(1)+'s;">'+t+"</span>"})).join("");t.innerHTML=e}lightboxInit(){const t=document.querySelectorAll(".lightbox");new e(Array.from(t))}ntf(t,e,s,i){const n=t,o=document.createElement("div");o.classList.add("py-2","px-4","rounded","mb-2","text-sm",s,i),o.innerText=e,n.appendChild(o),setTimeout((()=>{o.remove()}),5e3)}async submitForm(t){t.preventDefault();const e=t.target,s=e.querySelector("button");s.innerText="Sending...",s.disabled=!0;try{const t=await fetch(e.action,{method:"POST",body:new FormData(e)});(await t.json()).success?(this.ntf(e,"Form submitted successfully!","text-green-700","bg-green-100"),e.reset()):this.ntf(e,"Form submission failed. Please try again.","text-red-700","bg-red-100")}catch(t){console.error("Error submitting form:",t),this.ntf(e,"An error occurred. Please try again later.","text-red-700","bg-red-100")}finally{s.innerText="Send",s.disabled=!1}}birdsFlocking(){const t=document.createElement("canvas");t.style.cssText="position: fixed;\n    left: 0px;\n    top: 0px;\n    width: 100%;\n    height: 100%;pointer-events: none;",document.body.appendChild(t);const e=t.getContext("2d");t.width=window.innerWidth,t.height=window.innerHeight;const s=[];window.addEventListener("resize",(e=>{t.width=window.innerWidth,t.height=window.innerHeight}));for(let e=0;e<150;e++)s.push(new i(.6,Math.random()*t.width,Math.random()*t.height,2*Math.random()-1,2*Math.random()-1,30*Math.random()+20,.1));!function i(){!function(){for(const e of s)e.update(s,t)}(),function(){e.clearRect(0,0,t.width,t.height);for(const t of s)t.draw(e)}(),requestAnimationFrame(i)}()}robot(){const t=document.getElementById("bb8");window.innerWidth>640?new n(t):t.style.display="none"}init(){document.addEventListener("DOMContentLoaded",(()=>{this.typeEffect(),this.hilighter(),this.nav(),this.back2Top(),this.popupInit(),this.lightboxInit(),document.getElementById("contactForm").addEventListener("submit",this.submitForm.bind(this)),this.birdsFlocking()}))}}).init()})();