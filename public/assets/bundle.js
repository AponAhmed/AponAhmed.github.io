/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@aponahmed/dombuilder/script.js":
/*!******************************************************!*\
  !*** ./node_modules/@aponahmed/dombuilder/script.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Dombuilder: () => (/* binding */ Dombuilder),\n/* harmony export */   Obj2Dom: () => (/* binding */ Obj2Dom)\n/* harmony export */ });\nclass Obj2Dom {\r\n  constructor(object) {\r\n    this.dom = null;\r\n    this.object = object;\r\n    this.init();\r\n  }\r\n  init() {\r\n    this.dom = this.buildDom(this.object);\r\n  }\r\n  buildDom(obj) {\r\n    if (obj.hasOwnProperty(\"type\")) {\r\n      let elm = document.createElement(obj.type);\r\n\r\n      //Class\r\n      if (obj.hasOwnProperty(\"class\")) {\r\n        if (typeof obj.class === \"string\") {\r\n          elm.classList.add(obj.class); //Loop For Multiple class\r\n        } else {\r\n          obj.class.forEach((v) => {\r\n            elm.classList.add(v);\r\n          });\r\n        }\r\n      }\r\n      //Attribute\r\n      if (obj.hasOwnProperty(\"attributes\")) {\r\n        for (const AttName in obj.attributes) {\r\n          elm.setAttribute(AttName, obj.attributes[AttName]);\r\n        }\r\n      }\r\n      //Events\r\n      if (obj.hasOwnProperty(\"events\")) {\r\n        for (const eventName in obj.events) {\r\n          elm.addEventListener(eventName, obj.events[eventName]);\r\n        }\r\n      }\r\n      //Child Node or Inner Html\r\n      if (obj.hasOwnProperty(\"nodes\")) {\r\n        if (typeof obj.nodes === \"string\") {\r\n          elm.innerHTML = obj.nodes;\r\n        } else {\r\n          obj.nodes.forEach((node) => {\r\n            elm.appendChild(this.buildDom(node));\r\n          });\r\n        }\r\n      }\r\n      return elm;\r\n    }\r\n    return null;\r\n  }\r\n  render(domElement) {\r\n    domElement.appendChild(this.dom);\r\n  }\r\n}\r\n\r\nclass Dombuilder {\r\n  constructor(tag) {\r\n    this.element = document.createElement(tag);\r\n    return this;\r\n  }\r\n\r\n  attr(name, value) {\r\n    this.element.setAttribute(name, value);\r\n    return this;\r\n  }\r\n\r\n  class(classNames) {\r\n    this.element.classList.add(classNames);\r\n    return this;\r\n  }\r\n\r\n  classes(classNames) {\r\n    classNames.forEach(className => {\r\n      this.element.classList.add(className);\r\n    });\r\n    return this;\r\n  }\r\n\r\n  event(eventName, callback) {\r\n    this.element.addEventListener(eventName, callback);\r\n    return this;\r\n  }\r\n  append(dom) {\r\n    this.element.appendChild(dom);\r\n    return this;\r\n  }\r\n  renderTo(dom) {\r\n    dom.appendChild(this.element);\r\n    return this;\r\n  }\r\n  html(string) {\r\n    this.element.innerHTML = string;\r\n    return this;\r\n  }\r\n  appendHtml(string) {\r\n    this.element.innerHTML += string;\r\n    return this;\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://your-tailwind-project/./node_modules/@aponahmed/dombuilder/script.js?");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://your-tailwind-project/./src/styles.css?");

/***/ }),

/***/ "./src/app/App.js":
/*!************************!*\
  !*** ./src/app/App.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var _aponahmed_dombuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aponahmed/dombuilder */ \"./node_modules/@aponahmed/dombuilder/script.js\");\n/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Popup.js */ \"./src/app/Popup.js\");\n/* harmony import */ var _lightbox_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lightbox.js */ \"./src/app/lightbox.js\");\n\r\n\r\n\r\n\r\nclass App {\r\n  constructor() {\r\n    // Bind the methods to the class instance\r\n    this.back2Top = this.back2Top.bind(this);\r\n    this.nav = this.nav.bind(this);\r\n    this.headerPos = null;\r\n  }\r\n\r\n  handleButtonClick(event) {\r\n    const popupId = event.target.dataset.popup;\r\n    const newPopup = new _Popup_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](popupId);\r\n    newPopup.open();\r\n  }\r\n\r\n  popupInit() {\r\n    // Add click event listener to all buttons with class 'popup-button'\r\n    const popupButtons = document.querySelectorAll('.popup-button');\r\n    popupButtons.forEach(button => {\r\n      button.addEventListener('click', this.handleButtonClick);\r\n    });\r\n  }\r\n\r\n  back2Top() {\r\n    // Get the back to top button\r\n    const backToTopButton = document.getElementById('back-to-top-btn');\r\n\r\n    // Add click event listener to the back to top button\r\n    backToTopButton.addEventListener('click', () => {\r\n      // Scroll smoothly to the top of the page\r\n      window.scrollTo({\r\n        top: 0,\r\n        behavior: 'smooth'\r\n      });\r\n    });\r\n\r\n    // Add scroll event listener to show/hide back to top button\r\n    window.addEventListener('scroll', () => {\r\n      if (window.scrollY > 200) {\r\n        // If scrolled down, show the back to top button\r\n        backToTopButton.classList.remove('hidden');\r\n      } else {\r\n        // If at the top, hide the back to top button\r\n        backToTopButton.classList.add('hidden');\r\n      }\r\n    });\r\n  }\r\n\r\n  nav() {\r\n    // Get the mobile menu button and mobile menu\r\n    const mobileMenuButton = document.querySelector('[aria-controls=\"mobile-menu\"]');\r\n    const mobileMenu = document.getElementById('mobile-menu');\r\n    const header = document.querySelector('header');\r\n\r\n    const main = document.querySelector('main');\r\n\r\n    // Add click event listener to the mobile menu button\r\n    mobileMenuButton.addEventListener('click', () => {\r\n      // Toggle the visibility of the mobile menu\r\n      mobileMenu.classList.toggle('hidden');\r\n    });\r\n\r\n    // Get all links with the class 'scroll-link'\r\n    const scrollLinks = document.querySelectorAll('a[href^=\"#\"]');\r\n\r\n    // Add click event listener to each scroll link\r\n    scrollLinks.forEach(scrollLink => {\r\n      scrollLink.addEventListener('click', (e) => {\r\n        e.preventDefault();\r\n\r\n        const targetId = scrollLink.getAttribute('href').substring(1);\r\n        const targetElement = document.getElementById(targetId);\r\n\r\n        if (targetElement) {\r\n          // Scroll smoothly to the target element\r\n          window.scrollTo({\r\n            top: targetElement.offsetTop - header.offsetHeight,\r\n            behavior: 'smooth'\r\n          });\r\n\r\n          // Set the Tailwind CSS classes for the active and inactive links\r\n          scrollLinks.forEach(link => {\r\n            let lnkid = link.getAttribute('href').substring(1);\r\n            if (lnkid != \"home\") {\r\n              link.classList.remove('text-primary-color', 'active');\r\n              link.classList.add('text-gray-300', 'hover:text-primary-color');\r\n            }\r\n          });\r\n          if (targetId != \"home\") {\r\n            scrollLink.classList.add('text-primary-color', 'active');\r\n          }\r\n          // Hide the mobile menu after clicking a link (if it's visible)\r\n          mobileMenu.classList.add('hidden');\r\n        }\r\n      });\r\n    });\r\n\r\n    // Add scroll event listener to fix the header when scrolled out of view\r\n    window.addEventListener('scroll', () => {\r\n      if (!this.headerPos) {\r\n        this.headerPos = header.getBoundingClientRect();\r\n      }\r\n      if (window.scrollY > header.offsetHeight) {\r\n        header.classList.add('fixed', 'z-50', 'fixed-header');\r\n        //header.classList.remove('p-0');\r\n        header.style.left = `${this.headerPos.x}px`;\r\n        main.style.paddingTop = this.headerPos.height + \"px\";\r\n        header.style.top = `0px`;\r\n        header.style.width = `${this.headerPos.width}px`;\r\n      } else {\r\n        header.classList.remove('fixed', 'z-50', 'fixed-header');\r\n        main.style.paddingTop = 0;\r\n        //header.classList.add('fixed', 'py-4');\r\n      }\r\n    });\r\n  }\r\n\r\n  typeEffect() {\r\n    // Find all elements with data-typing attribute\r\n    var elements = document.querySelectorAll('[data-typing]');\r\n\r\n    elements.forEach(function (element) {\r\n      var texts = element.dataset.typing.split('|').map(function (text) {\r\n        element.removeAttribute('data-typing');\r\n        return text.trim();\r\n      });\r\n\r\n      var currentIndex = 0;\r\n      var currentText = '';\r\n      var isDeleting = false;\r\n\r\n      function type() {\r\n        var delay = 100; // Adjust the typing speed\r\n\r\n        if (isDeleting) {\r\n          currentText = texts[currentIndex].substring(0, currentText.length - 1);\r\n          delay = 50; // Faster deletion speed\r\n        } else {\r\n          currentText = texts[currentIndex].substring(0, currentText.length + 1);\r\n        }\r\n\r\n        element.innerHTML = currentText;\r\n\r\n        if (!isDeleting && currentText === texts[currentIndex]) {\r\n          isDeleting = true;\r\n          delay = 500; // Wait after typing\r\n        } else if (isDeleting && currentText === '') {\r\n          isDeleting = false;\r\n          currentIndex = (currentIndex + 1) % texts.length;\r\n          delay = 200; // Faster delay before starting to type next text\r\n        }\r\n\r\n        setTimeout(type, delay);\r\n      }\r\n\r\n      type(); // Start the typing effect\r\n    });\r\n\r\n  }\r\n\r\n  hilighter() {\r\n    // Get the element with the class \"highlight\"\r\n    var element = document.querySelector('.highlight');\r\n    // Get the text content of the element\r\n    var text = element.textContent;\r\n    // Create a new HTML content with each character wrapped in a span\r\n    var htmlContent = text.split('').map(function (char, index) {\r\n      // Calculate animation delay for each span\r\n      var animationDelay = (index + 1) * 0.1;\r\n      // Wrap each character in a span with animation-delay\r\n      return '<span style=\"animation-delay: ' + animationDelay.toFixed(1) + 's;\">' + char + '</span>';\r\n    }).join('');\r\n    // Set the new HTML content back to the element\r\n    element.innerHTML = htmlContent;\r\n  }\r\n\r\n  lightboxInit() {\r\n    const imageElements = document.querySelectorAll('.lightbox');\r\n    const lightbox = new _lightbox_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](Array.from(imageElements));\r\n  }\r\n\r\n\r\n  ntf(form, message, textColor, bgColor) {\r\n    // Create a new notification element\r\n    const notificationContainer = form;\r\n    const notification = document.createElement('div');\r\n    notification.classList.add('py-2', 'px-4', 'rounded', 'mb-2', 'text-sm', textColor, bgColor);\r\n    notification.innerText = message;\r\n\r\n    // Append the notification to the container\r\n    notificationContainer.appendChild(notification);\r\n\r\n    // Remove the notification after a few seconds (adjust as needed)\r\n    setTimeout(() => {\r\n      notification.remove();\r\n    }, 5000);\r\n  }\r\n\r\n  async submitForm(event) {\r\n    // Prevent the default form submission\r\n    event.preventDefault();\r\n    // Get the form element\r\n    const form = event.target;\r\n    // Fetch API to submit the form data\r\n    // Disable the submit button and show loading state\r\n    const submitButton = form.querySelector('button');\r\n    submitButton.innerText = 'Sending...';\r\n    submitButton.disabled = true;\r\n\r\n    try {\r\n      // Fetch API to submit the form data\r\n      const response = await fetch(form.action, {\r\n        method: 'POST',\r\n        body: new FormData(form),\r\n      });\r\n      const data = await response.json();\r\n      // Check if the submission was successful\r\n      if (data.success) {\r\n        // Show a success notification (you can replace this with your own notification logic)\r\n        this.ntf(form, 'Form submitted successfully!', 'text-green-700', 'bg-green-100');\r\n        form.reset();\r\n      } else {\r\n        // Handle errors or show an error notification\r\n        this.ntf(form, 'Form submission failed. Please try again.', 'text-red-700', 'bg-red-100');\r\n      }\r\n    } catch (error) {\r\n      // Handle network errors or other exceptions\r\n      console.error('Error submitting form:', error);\r\n      this.ntf(form, 'An error occurred. Please try again later.', 'text-red-700', 'bg-red-100');\r\n    } finally {\r\n      // Enable the submit button and restore its text\r\n      submitButton.innerText = 'Send';\r\n      submitButton.disabled = false;\r\n    }\r\n  }\r\n\r\n  init() {\r\n    document.addEventListener(\"DOMContentLoaded\", () => {\r\n      this.typeEffect();\r\n      this.hilighter();\r\n      this.nav();\r\n      this.back2Top();\r\n      this.popupInit();\r\n      this.lightboxInit()\r\n      const form = document.getElementById('contactForm');\r\n      form.addEventListener('submit', this.submitForm.bind(this));\r\n    });\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://your-tailwind-project/./src/app/App.js?");

/***/ }),

/***/ "./src/app/Popup.js":
/*!**************************!*\
  !*** ./src/app/Popup.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _aponahmed_dombuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aponahmed/dombuilder */ \"./node_modules/@aponahmed/dombuilder/script.js\");\n/* harmony import */ var _lightbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lightbox */ \"./src/app/lightbox.js\");\n\r\n\r\n// Popup class\r\n\r\nclass Popup {\r\n    constructor(popupId) {\r\n        this.popupId = popupId;\r\n\r\n        this.popupUi = new _aponahmed_dombuilder__WEBPACK_IMPORTED_MODULE_0__.Dombuilder('div').classes([\r\n            'fixed',\r\n            'left-0',\r\n            'top-0',\r\n            'w-full',\r\n            'h-full',\r\n            'bg-primary-dark-full',\r\n            'bg-opacity-40',\r\n            'zi-10'\r\n        ]);\r\n        this.popupInner = new _aponahmed_dombuilder__WEBPACK_IMPORTED_MODULE_0__.Dombuilder('div').classes([\r\n            'popup-content',\r\n            'm-10',\r\n            'p-10',\r\n            'h-full',\r\n            'border',\r\n            'border-slate-600',\r\n            'rounded-md',\r\n            'bg-custom-bg',\r\n            'max-h-full'\r\n\r\n        ]).element;\r\n        // Close button\r\n        const closeButton = new _aponahmed_dombuilder__WEBPACK_IMPORTED_MODULE_0__.Dombuilder('button')\r\n            .classes([\r\n                'absolute',\r\n                'top-0',\r\n                'right-0',\r\n                'm-2',\r\n                'cursor-pointer',\r\n                'text-5xl',\r\n                'font-light',\r\n                'leading-3'\r\n            ])\r\n            .html('&times;')\r\n            .event('click', () => this.close())\r\n            .element;\r\n        const header = new _aponahmed_dombuilder__WEBPACK_IMPORTED_MODULE_0__.Dombuilder('div');\r\n        header.append(closeButton);\r\n        // Append close button to popup\r\n        this.popupUi.append(header.element);\r\n        this.popupUi.append(this.popupInner)\r\n        this.outer = new _aponahmed_dombuilder__WEBPACK_IMPORTED_MODULE_0__.Dombuilder('div').classes(['absolute', 'left-0', 'top-0', 'w-full', 'h-full', 'z-[-1]']);\r\n        this.outer.event('click', (e) => {\r\n            this.close();\r\n        });\r\n        this.popupUi.append(this.outer.element)\r\n    }\r\n\r\n    open() {\r\n        return new Promise((resolve, reject) => {\r\n            this.loadContent()\r\n                .then(() => {\r\n                    this.renderToBody();\r\n                    resolve();\r\n                })\r\n                .catch(error => {\r\n                    console.error('Error loading content:', error);\r\n                    reject(error);\r\n                });\r\n        });\r\n    }\r\n\r\n    close() {\r\n        this.popupUi.element.remove();\r\n    }\r\n\r\n    loadContent() {\r\n        return new Promise((resolve, reject) => {\r\n            const xhr = new XMLHttpRequest();\r\n            xhr.onreadystatechange = () => {\r\n                if (xhr.readyState === 4) {\r\n                    if (xhr.status === 200) {\r\n                        this.popupInner.innerHTML = xhr.responseText;\r\n                        resolve();\r\n                    } else {\r\n                        reject(new Error(`Failed to load content. Status: ${xhr.status}`));\r\n                    }\r\n                }\r\n            };\r\n            xhr.open('GET', './popups/' + this.popupId + '.html', true);\r\n            xhr.send();\r\n        });\r\n    }\r\n\r\n    renderToBody() {\r\n        document.body.appendChild(this.popupUi.element);\r\n        const imageElements = this.popupUi.element.querySelectorAll('.lightbox');\r\n        const lightbox = new _lightbox__WEBPACK_IMPORTED_MODULE_1__[\"default\"](Array.from(imageElements));\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Popup);\n\n//# sourceURL=webpack://your-tailwind-project/./src/app/Popup.js?");

/***/ }),

/***/ "./src/app/lightbox.js":
/*!*****************************!*\
  !*** ./src/app/lightbox.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Lightbox)\n/* harmony export */ });\nclass Lightbox {\r\n    constructor(lightboxImages) {\r\n        this.lightboxImages = lightboxImages || [];\r\n        this.currentImageIndex = 0;\r\n\r\n        this.addClickEvent();\r\n    }\r\n\r\n    addClickEvent() {\r\n        this.lightboxImages.forEach((image, index) => {\r\n            image.addEventListener('click', () => this.openLightbox(index));\r\n        });\r\n\r\n        // Add event listener to close the lightbox when clicking outside the image\r\n        document.addEventListener('click', (event) => {\r\n            if (event.target.classList.contains('lightbox-overlay')) {\r\n                this.closeLightbox();\r\n            }\r\n        });\r\n\r\n        // Add event listener to navigate to the next image\r\n        document.addEventListener('keydown', (event) => {\r\n            if (event.key === 'ArrowRight') {\r\n                this.showNextImage();\r\n            }\r\n        });\r\n\r\n        // Add event listener to navigate to the previous image\r\n        document.addEventListener('keydown', (event) => {\r\n            if (event.key === 'ArrowLeft') {\r\n                this.showPreviousImage();\r\n            }\r\n        });\r\n    }\r\n\r\n    openLightbox(index) {\r\n        this.currentImageIndex = index;\r\n\r\n        const lightboxOverlay = document.createElement('div');\r\n        lightboxOverlay.classList.add('lightbox-overlay');\r\n        document.body.appendChild(lightboxOverlay);\r\n\r\n        const lightboxImage = document.createElement('img');\r\n        lightboxImage.src = this.lightboxImages[index].src;\r\n        lightboxImage.classList.add('lightbox-image');\r\n        lightboxOverlay.appendChild(lightboxImage);\r\n\r\n        // Add close button\r\n        const closeButton = document.createElement('button');\r\n        closeButton.innerHTML = '&times;';\r\n        closeButton.classList.add('lightbox-close');\r\n        closeButton.addEventListener('click', () => this.closeLightbox());\r\n        lightboxOverlay.appendChild(closeButton);\r\n\r\n        // Prevent scrolling when the lightbox is open\r\n        document.body.style.overflow = 'hidden';\r\n\r\n        // Add keyboard event listener to close the lightbox on 'Esc' key\r\n        document.addEventListener('keydown', (event) => {\r\n            if (event.key === 'Escape') {\r\n                this.closeLightbox();\r\n            }\r\n        });\r\n    }\r\n\r\n    closeLightbox() {\r\n        const lightboxOverlay = document.querySelector('.lightbox-overlay');\r\n        if (lightboxOverlay) {\r\n            lightboxOverlay.remove();\r\n        }\r\n\r\n        // Enable scrolling when the lightbox is closed\r\n        document.body.style.overflow = 'auto';\r\n    }\r\n\r\n    showNextImage() {\r\n        this.currentImageIndex = (this.currentImageIndex + 1) % this.lightboxImages.length;\r\n        this.updateLightboxImage();\r\n    }\r\n\r\n    showPreviousImage() {\r\n        this.currentImageIndex = (this.currentImageIndex - 1 + this.lightboxImages.length) % this.lightboxImages.length;\r\n        this.updateLightboxImage();\r\n    }\r\n\r\n    updateLightboxImage() {\r\n        const lightboxImage = document.querySelector('.lightbox-image');\r\n        if (lightboxImage) {\r\n            lightboxImage.src = this.lightboxImages[this.currentImageIndex].src;\r\n        }\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://your-tailwind-project/./src/app/lightbox.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n/* harmony import */ var _app_App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/App */ \"./src/app/App.js\");\n\r\n\r\n\r\nconst app = new _app_App__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n\r\napp.init();\n\n//# sourceURL=webpack://your-tailwind-project/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;