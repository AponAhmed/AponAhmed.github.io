(()=>{"use strict";class t{constructor(t){return this.element=document.createElement(t),this}attr(t,e){return this.element.setAttribute(t,e),this}class(t){return this.element.classList.add(t),this}classes(t){return t.forEach((t=>{this.element.classList.add(t)})),this}event(t,e){return this.element.addEventListener(t,e),this}append(t){return this.element.appendChild(t),this}renderTo(t){return t.appendChild(this.element),this}html(t){return this.element.innerHTML=t,this}appendHtml(t){return this.element.innerHTML+=t,this}}class e{constructor(t){this.lightboxImages=t||[],this.currentImageIndex=0,this.addClickEvent()}addClickEvent(){this.lightboxImages.forEach(((t,e)=>{t.addEventListener("click",(()=>this.openLightbox(e)))})),document.addEventListener("click",(t=>{t.target.classList.contains("lightbox-overlay")&&this.closeLightbox()})),document.addEventListener("keydown",(t=>{"ArrowRight"===t.key&&this.showNextImage()})),document.addEventListener("keydown",(t=>{"ArrowLeft"===t.key&&this.showPreviousImage()}))}openLightbox(t){this.currentImageIndex=t;const e=document.createElement("div");e.classList.add("lightbox-overlay"),document.body.appendChild(e);const i=document.createElement("img");i.src=this.lightboxImages[t].src,i.classList.add("lightbox-image"),e.appendChild(i);const s=document.createElement("button");s.innerHTML="&times;",s.classList.add("lightbox-close"),s.addEventListener("click",(()=>this.closeLightbox())),e.appendChild(s),document.body.style.overflow="hidden",document.addEventListener("keydown",(t=>{"Escape"===t.key&&this.closeLightbox()}))}closeLightbox(){const t=document.querySelector(".lightbox-overlay");t&&t.remove(),document.body.style.overflow="auto"}showNextImage(){this.currentImageIndex=(this.currentImageIndex+1)%this.lightboxImages.length,this.updateLightboxImage()}showPreviousImage(){this.currentImageIndex=(this.currentImageIndex-1+this.lightboxImages.length)%this.lightboxImages.length,this.updateLightboxImage()}updateLightboxImage(){const t=document.querySelector(".lightbox-image");t&&(t.src=this.lightboxImages[this.currentImageIndex].src)}}const i=class{constructor(e){this.popupId=e,this.popupUi=new t("div").classes(["fixed","left-0","top-0","w-full","h-full","bg-primary-dark-full","bg-opacity-40","zi-10"]),this.popupInner=new t("div").classes(["popup-content","m-10","p-10","h-full","border","border-slate-600","rounded-md","bg-custom-bg","max-h-full"]).element;const i=new t("button").classes(["absolute","top-0","right-0","m-2","cursor-pointer","text-5xl","font-light","leading-3"]).html("&times;").event("click",(()=>this.close())).element,s=new t("div");s.append(i),this.popupUi.append(s.element),this.popupUi.append(this.popupInner),this.outer=new t("div").classes(["absolute","left-0","top-0","w-full","h-full","z-[-1]"]),this.outer.event("click",(t=>{this.close()})),this.popupUi.append(this.outer.element)}open(){return new Promise(((t,e)=>{this.loadContent().then((()=>{this.renderToBody(),t()})).catch((t=>{console.error("Error loading content:",t),e(t)}))}))}close(){this.popupUi.element.remove()}loadContent(){return new Promise(((t,e)=>{const i=new XMLHttpRequest;i.onreadystatechange=()=>{4===i.readyState&&(200===i.status?(this.popupInner.innerHTML=i.responseText,t()):e(new Error(`Failed to load content. Status: ${i.status}`)))},i.open("GET","./popups/"+this.popupId+".html",!0),i.send()}))}renderToBody(){document.body.appendChild(this.popupUi.element);const t=this.popupUi.element.querySelectorAll(".lightbox");new e(Array.from(t))}};class s{constructor(t,e,i,s,n,o,r){this.size=t,this.x=e,this.y=i,this.vx=s,this.vy=n,this.minDistance=o,this.opacity=.6,this.smoothingFactor=r,this.color=`hsl(${this.rnd(170,190)},${this.rnd(70,100)}%,${this.rnd(40,100)}%,${this.opacity})`}static clearFlockNearMouse(t,e,i,s){for(const n of s)Math.sqrt((n.x-t)**2+(n.y-e)**2)<i&&s.splice(s.indexOf(n),1)}rnd(t,e){return Math.floor(Math.random()*(e-t+1))+t}update(t,e){const i=.95,{x:s,y:n,minDistance:o,smoothingFactor:r}=this,h=t.filter((t=>t!==this&&Math.abs(t.x-s)<50&&Math.abs(t.y-n)<50));if(h.length>0){let t=0;for(const e of h)t+=Math.atan2(e.vy,e.vx);t/=h.length,this.vx+=(.1*Math.cos(t)-this.vx)*r,this.vy+=(.1*Math.sin(t)-this.vy)*r;const e=Math.sqrt(this.vx**2+this.vy**2);this.vx=(this.vx/e||1)*i,this.vy=(this.vy/e||1)*i}const a={x:0,y:0};for(const t of h)a.x+=t.x,a.y+=t.y;if(h.length>0){a.x/=h.length,a.y/=h.length,this.vx+=(.05*(a.x-s)-this.vx)*r,this.vy+=(.05*(a.y-n)-this.vy)*r;const t=Math.sqrt(this.vx**2+this.vy**2);this.vx=(this.vx/t||1)*i,this.vy=(this.vy/t||1)*i}const d={x:0,y:0};for(const t of h)Math.sqrt((t.x-s)**2+(t.y-n)**2)<20&&(d.x+=s-t.x,d.y+=n-t.y);this.vx+=(.1*d.x-this.vx)*r,this.vy+=(.1*d.y-this.vy)*r;const l=Math.sqrt(this.vx**2+this.vy**2);this.vx=(this.vx/l||1)*i,this.vy=(this.vy/l||1)*i,this.x+=this.vx,this.y+=this.vy,this.x=(this.x+e.width)%e.width,this.y=(this.y+e.height)%e.height}draw(t){t.beginPath(),t.arc(this.x,this.y,this.size,0,2*Math.PI),t.fillStyle=this.color,t.fill()}}(new class{constructor(){this.back2Top=this.back2Top.bind(this),this.nav=this.nav.bind(this),this.headerPos=null}handleButtonClick(t){const e=t.target.dataset.popup;new i(e).open()}popupInit(){document.querySelectorAll(".popup-button").forEach((t=>{t.addEventListener("click",this.handleButtonClick)}))}back2Top(){const t=document.getElementById("back-to-top-btn");t.addEventListener("click",(()=>{window.scrollTo({top:0,behavior:"smooth"})})),window.addEventListener("scroll",(()=>{window.scrollY>200?t.classList.remove("hidden"):t.classList.add("hidden")}))}nav(){const t=document.querySelector('[aria-controls="mobile-menu"]'),e=document.getElementById("mobile-menu"),i=document.querySelector("header"),s=document.querySelector("main");t.addEventListener("click",(()=>{e.classList.toggle("hidden")}));const n=document.querySelectorAll('a[href^="#"]');n.forEach((t=>{t.addEventListener("click",(s=>{s.preventDefault();const o=t.getAttribute("href").substring(1),r=document.getElementById(o);r&&(window.scrollTo({top:r.offsetTop-i.offsetHeight,behavior:"smooth"}),n.forEach((t=>{"home"!=t.getAttribute("href").substring(1)&&(t.classList.remove("text-primary-color","active"),t.classList.add("text-gray-300","hover:text-primary-color"))})),"home"!=o&&t.classList.add("text-primary-color","active"),e.classList.add("hidden"))}))})),window.addEventListener("scroll",(()=>{this.headerPos||(this.headerPos=i.getBoundingClientRect()),window.scrollY>i.offsetHeight?(i.classList.add("fixed","z-50","fixed-header"),i.style.left=`${this.headerPos.x}px`,s.style.paddingTop=this.headerPos.height+"px",i.style.top="0px",i.style.width=`${this.headerPos.width}px`):(i.classList.remove("fixed","z-50","fixed-header"),s.style.paddingTop=0)}))}typeEffect(){document.querySelectorAll("[data-typing]").forEach((function(t){var e=t.dataset.typing.split("|").map((function(e){return t.removeAttribute("data-typing"),e.trim()})),i=0,s="",n=!1;!function o(){var r=100;n?(s=e[i].substring(0,s.length-1),r=50):s=e[i].substring(0,s.length+1),t.innerHTML=s,n||s!==e[i]?n&&""===s&&(n=!1,i=(i+1)%e.length,r=200):(n=!0,r=500),setTimeout(o,r)}()}))}hilighter(){var t=document.querySelector(".highlight"),e=t.textContent.split("").map((function(t,e){return'<span style="animation-delay: '+(.1*(e+1)).toFixed(1)+'s;">'+t+"</span>"})).join("");t.innerHTML=e}lightboxInit(){const t=document.querySelectorAll(".lightbox");new e(Array.from(t))}ntf(t,e,i,s){const n=t,o=document.createElement("div");o.classList.add("py-2","px-4","rounded","mb-2","text-sm",i,s),o.innerText=e,n.appendChild(o),setTimeout((()=>{o.remove()}),5e3)}async submitForm(t){t.preventDefault();const e=t.target,i=e.querySelector("button");i.innerText="Sending...",i.disabled=!0;try{const t=await fetch(e.action,{method:"POST",body:new FormData(e)});(await t.json()).success?(this.ntf(e,"Form submitted successfully!","text-green-700","bg-green-100"),e.reset()):this.ntf(e,"Form submission failed. Please try again.","text-red-700","bg-red-100")}catch(t){console.error("Error submitting form:",t),this.ntf(e,"An error occurred. Please try again later.","text-red-700","bg-red-100")}finally{i.innerText="Send",i.disabled=!1}}birdsFlocking(){const t=document.createElement("canvas");t.style.cssText="position: fixed;\n    left: 0px;\n    top: 0px;\n    width: 100%;\n    height: 100%;pointer-events: none;",document.body.appendChild(t);const e=t.getContext("2d");t.width=window.innerWidth,t.height=window.innerHeight;const i=[];window.addEventListener("resize",(e=>{t.width=window.innerWidth,t.height=window.innerHeight}));for(let e=0;e<150;e++)i.push(new s(.6,Math.random()*t.width,Math.random()*t.height,2*Math.random()-1,2*Math.random()-1,30*Math.random()+20,.1));!function s(){!function(){for(const e of i)e.update(i,t)}(),function(){e.clearRect(0,0,t.width,t.height);for(const t of i)t.draw(e)}(),requestAnimationFrame(s)}()}init(){document.addEventListener("DOMContentLoaded",(()=>{this.typeEffect(),this.hilighter(),this.nav(),this.back2Top(),this.popupInit(),this.lightboxInit(),document.getElementById("contactForm").addEventListener("submit",this.submitForm.bind(this)),this.birdsFlocking()}))}}).init()})();