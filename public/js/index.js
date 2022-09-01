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

/***/ "./src/components/countDown.ts":
/*!*************************************!*\
  !*** ./src/components/countDown.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CountDown\": () => (/* binding */ CountDown)\n/* harmony export */ });\nconst html = `\r\n<section>\r\n    <div><span class=\"ja\">活動限界まで</span><span class=\"en\">ACTIVE TIME REMAINING:</span></div>\r\n    <div><span class=\"prefix\">あと</span><span class=\"time\">01:00:00</span></div>\r\n</section>\r\n`;\r\nconst css = `\r\n* {\r\n    box-sizing: border-box;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\nsection {\r\n    width: 30rem;\r\n    height: 9rem;\r\n    padding: 0.3rem 0.6rem;\r\n    color: #ffe96e;\r\n    background-color: #000000;\r\n    text-shadow: 0 0 1rem rgba(255, 233, 110, 0.7);\r\n    border-radius: 2px;\r\n    box-shadow: 0 0 4px 2px rgba(255, 233, 110, 0.7), inset 0 0 4px 2px rgba(255, 233, 110, 0.7);\r\n}\r\n\r\nspan {\r\n    display: inline-block;\r\n}\r\n\r\n.ja,\r\n.prefix {\r\n    font-weight: 900;\r\n    font-size: 1.5rem;\r\n    font-family: 'Noto Serif JP', serif;\r\n}\r\n.en {\r\n    font-weight: 900;\r\n    font-size: 1rem;\r\n    font-family: 'Noto Sans JP', sans-serif;\r\n}\r\n\r\n.prefix {\r\n    font-size: 1rem;\r\n}\r\n\r\n.time {\r\n    position: absolute;\r\n    z-index: 0;\r\n    font-family: 'DSEG7Classic';\r\n    font-size: 5rem;\r\n}\r\n.time:before {\r\n    position: absolute;\r\n    z-index: -1;\r\n    content: '00:00:00';\r\n    color: rgba(255, 233, 110, 0.25);\r\n    text-shadow: none;\r\n}\r\n`;\r\nconst template = `<style>${css}</style>${html}`;\r\nclass CountDown extends HTMLElement {\r\n    constructor() {\r\n        super();\r\n        this.attachShadow({ mode: 'open' });\r\n        this.shadowRoot.innerHTML = template;\r\n    }\r\n}\r\ncustomElements.define('count-down', CountDown);\r\n\n\n//# sourceURL=webpack://algocracy-elevator/./src/components/countDown.ts?");

/***/ }),

/***/ "./src/components/header.ts":
/*!**********************************!*\
  !*** ./src/components/header.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createHeader\": () => (/* binding */ createHeader)\n/* harmony export */ });\nconst createHeader = () => {\r\n    const root = document.getElementById('root');\r\n    const header = document.createElement('header');\r\n    header.insertAdjacentHTML('beforeend', `<span class=\"appIcon\"></span>`);\r\n    header.insertAdjacentHTML('beforeend', `<span class=\"title\">Algocracy - Elevator</span>`);\r\n    header.insertAdjacentHTML('beforeend', `<span class=\"divider\"></span>`);\r\n    header.appendChild(createButton({ label: 'Document' }));\r\n    header.appendChild(createButton({ label: 'Ranking' }));\r\n    header.appendChild(createButton({ label: 'Wiki' }));\r\n    root.appendChild(header);\r\n};\r\nfunction createButton(option) {\r\n    const button = document.createElement('button');\r\n    button.classList.add('btn');\r\n    button.textContent = option.label;\r\n    button.addEventListener('click', e => {\r\n        const el = e.currentTarget;\r\n        const ripple = document.createElement('span');\r\n        const wh = Math.max(el.clientWidth, el.clientHeight);\r\n        const half = wh / 2;\r\n        const box = el.getBoundingClientRect();\r\n        const x = e.clientX - box.left;\r\n        const y = e.clientY - box.top;\r\n        // @ts-ignore\r\n        ripple.style = `width:${wh}px;height:${wh}px;left:${x - half}px;top:${y - half}px`;\r\n        ripple.classList.add('ripple');\r\n        el.appendChild(ripple);\r\n        ripple.addEventListener('animationend', e => {\r\n            ripple.remove();\r\n        });\r\n        console.log(el);\r\n    });\r\n    return button;\r\n}\r\n\n\n//# sourceURL=webpack://algocracy-elevator/./src/components/header.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_countDown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/countDown */ \"./src/components/countDown.ts\");\n/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/header */ \"./src/components/header.ts\");\n\r\n\r\nconst root = document.getElementById('root');\r\nconst countDown = new _components_countDown__WEBPACK_IMPORTED_MODULE_0__.CountDown();\r\n(0,_components_header__WEBPACK_IMPORTED_MODULE_1__.createHeader)();\r\nroot.appendChild(countDown);\r\n\n\n//# sourceURL=webpack://algocracy-elevator/./src/index.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;