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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CountDown\": () => (/* binding */ CountDown)\n/* harmony export */ });\nconst html = `\r\n<section>\r\n    <div><span class=\"ja\">活動限界まで</span><span class=\"en\">ACTIVE TIME REMAINING:</span></div>\r\n    <div><span class=\"prefix\">あと</span><span class=\"time\">01:00:00</span></div>\r\n</section>\r\n`;\r\nconst css = `\r\n* {\r\n    box-sizing: border-box;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\nsection {\r\n    width: 30rem;\r\n    height: 9rem;\r\n    padding: 0.3rem 0.6rem;\r\n    color: #ffe96e;\r\n    background-color: #000000;\r\n    text-shadow: 0 0 1rem rgba(255, 233, 110, 0.7);\r\n    text-align: left;\r\n    border-radius: 2px;\r\n    box-shadow: 0 0 4px 2px rgba(255, 233, 110, 0.7), inset 0 0 4px 2px rgba(255, 233, 110, 0.7);\r\n}\r\n\r\nspan {\r\n    display: inline-block;\r\n}\r\n\r\n.ja,\r\n.prefix {\r\n    font-weight: 900;\r\n    font-size: 1.5rem;\r\n    font-family: 'Noto Serif JP', serif;\r\n}\r\n.en {\r\n    font-weight: 900;\r\n    font-size: 1rem;\r\n    font-family: 'Noto Sans JP', sans-serif;\r\n}\r\n\r\n.prefix {\r\n    font-size: 1rem;\r\n}\r\n\r\n.time {\r\n    position: absolute;\r\n    z-index: 0;\r\n    font-family: 'DSEG7Classic';\r\n    font-size: 5rem;\r\n}\r\n.time:before {\r\n    position: absolute;\r\n    z-index: -1;\r\n    content: '00:00:00';\r\n    color: rgba(255, 233, 110, 0.25);\r\n    text-shadow: none;\r\n}\r\n`;\r\nconst template = `<style>${css}</style>${html}`;\r\nclass CountDown extends HTMLElement {\r\n    constructor() {\r\n        super();\r\n        this.attachShadow({ mode: 'open' });\r\n        this.shadowRoot.innerHTML = template;\r\n    }\r\n}\r\ncustomElements.define('count-down', CountDown);\r\n\n\n//# sourceURL=webpack://algocracy-elevator/./src/components/countDown.ts?");

/***/ }),

/***/ "./src/components/header.ts":
/*!**********************************!*\
  !*** ./src/components/header.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createFooter\": () => (/* binding */ createFooter),\n/* harmony export */   \"createHeader\": () => (/* binding */ createHeader)\n/* harmony export */ });\nconst createHeader = () => {\r\n    const container = document.createElement('div');\r\n    container.classList.add('container');\r\n    container.insertAdjacentHTML('beforeend', `<span class=\"appIcon\"></span>`);\r\n    container.insertAdjacentHTML('beforeend', `<span class=\"title\">Algocracy - Elevator</span>`);\r\n    container.insertAdjacentHTML('beforeend', `<span class=\"divider\"></span>`);\r\n    container.appendChild(createButton({ label: 'Document' }));\r\n    container.appendChild(createButton({ label: 'Ranking' }));\r\n    container.appendChild(createButton({ label: 'Wiki' }));\r\n    const header = document.querySelector('header');\r\n    header.appendChild(container);\r\n};\r\nconst createFooter = () => {\r\n    const container = document.createElement('div');\r\n    container.classList.add('container');\r\n    container.insertAdjacentHTML('beforeend', `<span>Copyright © Algocracy 2022.</span>`);\r\n    const footer = document.querySelector('footer');\r\n    footer.appendChild(container);\r\n};\r\nfunction createButton(option) {\r\n    const button = document.createElement('button');\r\n    button.classList.add('btn');\r\n    button.textContent = option.label;\r\n    button.addEventListener('click', e => {\r\n        const el = e.currentTarget;\r\n        const ripple = document.createElement('span');\r\n        const wh = Math.max(el.clientWidth, el.clientHeight);\r\n        const half = wh / 2;\r\n        const box = el.getBoundingClientRect();\r\n        const x = e.clientX - box.left;\r\n        const y = e.clientY - box.top;\r\n        // @ts-ignore\r\n        ripple.style = `width:${wh}px;height:${wh}px;left:${x - half}px;top:${y - half}px`;\r\n        ripple.classList.add('ripple');\r\n        el.appendChild(ripple);\r\n        ripple.addEventListener('animationend', e => {\r\n            ripple.remove();\r\n        });\r\n        console.log(el);\r\n    });\r\n    return button;\r\n}\r\n\n\n//# sourceURL=webpack://algocracy-elevator/./src/components/header.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_countDown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/countDown */ \"./src/components/countDown.ts\");\n/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/header */ \"./src/components/header.ts\");\n/* harmony import */ var _models_gameManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/gameManager */ \"./src/models/gameManager.ts\");\n\r\n\r\n\r\nfunction initialize() {\r\n    (0,_components_header__WEBPACK_IMPORTED_MODULE_1__.createHeader)();\r\n    (0,_components_header__WEBPACK_IMPORTED_MODULE_1__.createFooter)();\r\n    const gameScreen = document.querySelector('.gameScreen');\r\n    const codeEditor = document.querySelector('.codeEditor');\r\n    const countDown = new _components_countDown__WEBPACK_IMPORTED_MODULE_0__.CountDown();\r\n    gameScreen.appendChild(countDown);\r\n    const defaultSetting = {\r\n        seed: 0,\r\n        floorCount: 3,\r\n        elevatorCount: 1,\r\n        elevatorCapacity: 4,\r\n        spawnRate: 0,\r\n    };\r\n    _models_gameManager__WEBPACK_IMPORTED_MODULE_2__.gameManager.createWorld(defaultSetting);\r\n}\r\ninitialize();\r\n\n\n//# sourceURL=webpack://algocracy-elevator/./src/index.ts?");

/***/ }),

/***/ "./src/models/elevator.ts":
/*!********************************!*\
  !*** ./src/models/elevator.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Elevator\": () => (/* binding */ Elevator)\n/* harmony export */ });\n/* harmony import */ var _eventHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventHandler */ \"./src/models/eventHandler.ts\");\n\r\nclass Elevator extends _eventHandler__WEBPACK_IMPORTED_MODULE_0__.EventHandler {\r\n    index = 0;\r\n    floorCount = 0;\r\n    capacity = 4;\r\n    currentFloor = 0;\r\n    buttonState;\r\n    isMoving = false;\r\n    state = {\r\n        up: false,\r\n        down: false,\r\n    };\r\n    constructor(index, floorCount, capacity) {\r\n        super();\r\n        this.index = index;\r\n        this.floorCount = floorCount;\r\n        this.capacity = capacity || 4;\r\n        this.buttonState = new Array(floorCount).fill(false);\r\n    }\r\n    getTargetFloors() {\r\n        const floors = [];\r\n        this.buttonState.forEach((state, i) => {\r\n            if (state) {\r\n                floors.push(i);\r\n            }\r\n        });\r\n        return floors;\r\n    }\r\n    goTo(floorIndex) {\r\n        this.isMoving = true;\r\n    }\r\n    loadUser() {\r\n        //\r\n    }\r\n    unloadUser() {\r\n        //\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://algocracy-elevator/./src/models/elevator.ts?");

/***/ }),

/***/ "./src/models/eventHandler.ts":
/*!************************************!*\
  !*** ./src/models/eventHandler.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EventHandler\": () => (/* binding */ EventHandler)\n/* harmony export */ });\nclass EventHandler {\r\n    listeners = [];\r\n    on(event, callback) {\r\n        const listener = this.getListener(event);\r\n        if (listener === undefined) {\r\n            this.listeners.push({ event, callbacks: [callback] });\r\n        }\r\n        else {\r\n            listener.callbacks.push(callback);\r\n        }\r\n    }\r\n    off(event, callback) {\r\n        const listener = this.getListener(event);\r\n        if (listener === undefined) {\r\n            return;\r\n        }\r\n        const index = listener.callbacks.indexOf(callback);\r\n        if (index === -1) {\r\n            return;\r\n        }\r\n        listener.callbacks.splice(index, 1);\r\n    }\r\n    trigger(event, ...params) {\r\n        const listener = this.getListener(event);\r\n        if (listener === undefined) {\r\n            return;\r\n        }\r\n        listener.callbacks.forEach(callback => callback(params));\r\n    }\r\n    getListener(event) {\r\n        return this.listeners.find(listener => listener.event === event);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://algocracy-elevator/./src/models/eventHandler.ts?");

/***/ }),

/***/ "./src/models/events.ts":
/*!******************************!*\
  !*** ./src/models/events.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AppEvent\": () => (/* binding */ AppEvent),\n/* harmony export */   \"triggerEvent\": () => (/* binding */ triggerEvent)\n/* harmony export */ });\nconst AppEvent = {\r\n    floorStateChanged: 'floorStateChanged',\r\n};\r\nconst triggerEvent = (event, element) => {\r\n    const evt = new Event(event, { bubbles: true, cancelable: true });\r\n    return element.dispatchEvent(evt);\r\n};\r\n\n\n//# sourceURL=webpack://algocracy-elevator/./src/models/events.ts?");

/***/ }),

/***/ "./src/models/floor.ts":
/*!*****************************!*\
  !*** ./src/models/floor.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Floor\": () => (/* binding */ Floor)\n/* harmony export */ });\n/* harmony import */ var _eventHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventHandler */ \"./src/models/eventHandler.ts\");\n/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events */ \"./src/models/events.ts\");\n\r\n\r\nclass Floor extends _eventHandler__WEBPACK_IMPORTED_MODULE_0__.EventHandler {\r\n    index = 0;\r\n    state = {\r\n        up: false,\r\n        down: false,\r\n    };\r\n    constructor(index) {\r\n        super();\r\n        this.index = index;\r\n    }\r\n    up() {\r\n        if (this.state.up === true) {\r\n            return; // do nothing\r\n        }\r\n        this.state.up = true;\r\n        this.trigger(_events__WEBPACK_IMPORTED_MODULE_1__.AppEvent.floorStateChanged, this.index);\r\n    }\r\n    down() {\r\n        if (this.state.down === true) {\r\n            return; // do nothing\r\n        }\r\n        this.state.up = true;\r\n        this.trigger(_events__WEBPACK_IMPORTED_MODULE_1__.AppEvent.floorStateChanged, this.index, this.state);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://algocracy-elevator/./src/models/floor.ts?");

/***/ }),

/***/ "./src/models/gameManager.ts":
/*!***********************************!*\
  !*** ./src/models/gameManager.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"gameManager\": () => (/* binding */ gameManager)\n/* harmony export */ });\n/* harmony import */ var _gameRenderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameRenderer */ \"./src/models/gameRenderer.ts\");\n/* harmony import */ var _world__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./world */ \"./src/models/world.ts\");\n/* harmony import */ var _worldController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./worldController */ \"./src/models/worldController.ts\");\n\r\n\r\n\r\nconst gameManager = (() => {\r\n    const worldController = new _worldController__WEBPACK_IMPORTED_MODULE_2__.WorldController();\r\n    let world;\r\n    run();\r\n    function run() {\r\n        world = createWorld({\r\n            seed: 0,\r\n            floorCount: 3,\r\n            elevatorCount: 1,\r\n            elevatorCapacity: 4,\r\n            spawnRate: 0,\r\n        });\r\n        worldController.start(world, {\r\n            initialize: (elevators, floors) => { },\r\n            update: (dt, elevators, floors) => { },\r\n        }, window.requestAnimationFrame, false);\r\n    }\r\n    function createWorld(option) {\r\n        const world = new _world__WEBPACK_IMPORTED_MODULE_1__.World(option);\r\n        _gameRenderer__WEBPACK_IMPORTED_MODULE_0__.gameRenderer.createWorld(world);\r\n        return world;\r\n    }\r\n    function toggle() {\r\n        worldController.togglePlayingState();\r\n    }\r\n    return {\r\n        createWorld,\r\n        initialize: _gameRenderer__WEBPACK_IMPORTED_MODULE_0__.gameRenderer.initialize,\r\n        toggle,\r\n        get worldSetting() {\r\n            return world.setting;\r\n        },\r\n    };\r\n})();\r\n\n\n//# sourceURL=webpack://algocracy-elevator/./src/models/gameManager.ts?");

/***/ }),

/***/ "./src/models/gameRenderer.ts":
/*!************************************!*\
  !*** ./src/models/gameRenderer.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"gameRenderer\": () => (/* binding */ gameRenderer)\n/* harmony export */ });\nconst gameRenderer = (() => {\r\n    const screen = document.querySelector('.gameScreen');\r\n    let setGameObjects;\r\n    let setGameResult;\r\n    function createWorld(world) {\r\n        // return world;\r\n    }\r\n    function update(elapsedTime) {\r\n        setGameObjects({\r\n            time: '',\r\n        });\r\n        setGameResult({\r\n            isPlaying: false,\r\n            time: convertTime(elapsedTime),\r\n            unit: '5',\r\n            unitPerSec: '0.0',\r\n            waitingTimeAvg: '00:00',\r\n            waitingTimeMax: '00:00',\r\n        });\r\n    }\r\n    return {\r\n        update,\r\n        createWorld,\r\n        initialize: (_setGameObjects, _setGameResult) => {\r\n            setGameObjects = _setGameObjects;\r\n            setGameResult = _setGameResult;\r\n        },\r\n    };\r\n})();\r\nfunction convertTime(timeSec) {\r\n    const min = Math.floor(timeSec / 60)\r\n        .toString()\r\n        .padStart(2, '0');\r\n    const sec = Math.floor(timeSec % 60)\r\n        .toString()\r\n        .padStart(2, '0');\r\n    return `${min}:${sec}`; // '00:00';\r\n}\r\n\n\n//# sourceURL=webpack://algocracy-elevator/./src/models/gameRenderer.ts?");

/***/ }),

/***/ "./src/models/random.ts":
/*!******************************!*\
  !*** ./src/models/random.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Random\": () => (/* binding */ Random)\n/* harmony export */ });\nclass Random {\r\n    x = 123456789;\r\n    y = 362436069;\r\n    z = 521288629;\r\n    w = 88675123;\r\n    constructor(seed = 88675123) {\r\n        this.w = seed;\r\n    }\r\n    // XorShift\r\n    next() {\r\n        const t = this.x ^ (this.x << 11);\r\n        this.x = this.y;\r\n        this.y = this.z;\r\n        this.z = this.w;\r\n        return (this.w = this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8)));\r\n    }\r\n    // min以上max以下の乱数を生成する\r\n    nextInt(min, max) {\r\n        const r = Math.abs(this.next());\r\n        return min + (r % (max + 1 - min));\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://algocracy-elevator/./src/models/random.ts?");

/***/ }),

/***/ "./src/models/world.ts":
/*!*****************************!*\
  !*** ./src/models/world.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"World\": () => (/* binding */ World)\n/* harmony export */ });\n/* harmony import */ var _elevator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elevator */ \"./src/models/elevator.ts\");\n/* harmony import */ var _floor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./floor */ \"./src/models/floor.ts\");\n/* harmony import */ var _random__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./random */ \"./src/models/random.ts\");\n\r\n\r\n\r\nclass World {\r\n    random;\r\n    floors;\r\n    elevators;\r\n    users;\r\n    isEnded = false;\r\n    unitCount = 0;\r\n    elapsedTime = 0.0;\r\n    waitingTimeMax = 0.0;\r\n    waitingTimeTotal = 0.0;\r\n    worldSetting;\r\n    constructor(option) {\r\n        this.random = new _random__WEBPACK_IMPORTED_MODULE_2__.Random(option.seed);\r\n        this.floors = this.createFloor(option.floorCount);\r\n        this.elevators = this.createElevator(option.elevatorCount, option.floorCount, option.elevatorCapacity);\r\n        this.users = [];\r\n        this.worldSetting = {\r\n            floorCount: option.floorCount,\r\n            elevatorCount: option.elevatorCount,\r\n            elevatorCapacity: option.elevatorCapacity,\r\n        };\r\n    }\r\n    createFloor = (count) => {\r\n        const floors = [];\r\n        for (let i = 0; i < count; i++) {\r\n            floors.push(new _floor__WEBPACK_IMPORTED_MODULE_1__.Floor(i));\r\n        }\r\n        return floors;\r\n    };\r\n    createElevator = (count, floorCount, capacity) => {\r\n        const elevators = [];\r\n        for (let i = 0; i < count; i++) {\r\n            elevators.push(new _elevator__WEBPACK_IMPORTED_MODULE_0__.Elevator(i, floorCount, capacity));\r\n        }\r\n        return elevators;\r\n    };\r\n    createUser = (count) => {\r\n        //\r\n    };\r\n    update = (deltaTime) => {\r\n        this.elapsedTime += deltaTime;\r\n    };\r\n    get setting() {\r\n        return this.worldSetting;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://algocracy-elevator/./src/models/world.ts?");

/***/ }),

/***/ "./src/models/worldController.ts":
/*!***************************************!*\
  !*** ./src/models/worldController.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"WorldController\": () => (/* binding */ WorldController)\n/* harmony export */ });\n/* harmony import */ var _gameRenderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameRenderer */ \"./src/models/gameRenderer.ts\");\n\r\nclass WorldController {\r\n    frame = 60;\r\n    frameSec = 1 / this.frame;\r\n    timeScale = 1.0;\r\n    isPlaying = false;\r\n    start = (world, userCode, requestAnimationFrame, autoStart = false) => {\r\n        this.isPlaying = autoStart;\r\n        let lastUpdatedTime = null;\r\n        let firstUpdate = true;\r\n        // world.on('usercode_error', controller.handleUserCodeError);\r\n        let updater = (time) => {\r\n            if (this.isPlaying && !world.isEnded && lastUpdatedTime !== null) {\r\n                if (firstUpdate) {\r\n                    firstUpdate = false;\r\n                    // This logic prevents infite loops in usercode from breaking the page permanently - don't evaluate user code until game is unpaused.\r\n                    try {\r\n                        userCode.initialize(world.elevators, world.floors);\r\n                        // world.init();\r\n                    }\r\n                    catch (e) {\r\n                        this.handleError(e);\r\n                    }\r\n                }\r\n                const deltaTime = time - lastUpdatedTime;\r\n                let scaledDt = deltaTime * 0.001 * this.timeScale;\r\n                scaledDt = Math.min(scaledDt, this.frameSec * 3 * this.timeScale); // Limit to prevent unhealthy substepping\r\n                try {\r\n                    userCode.update(scaledDt, world.elevators, world.floors);\r\n                }\r\n                catch (e) {\r\n                    this.handleError(e);\r\n                }\r\n                while (scaledDt > 0.0 && !world.isEnded) {\r\n                    const thisDt = Math.min(this.frameSec, scaledDt);\r\n                    world.update(thisDt);\r\n                    scaledDt -= this.frameSec;\r\n                }\r\n                _gameRenderer__WEBPACK_IMPORTED_MODULE_0__.gameRenderer.update(world.elapsedTime);\r\n                // world.updateDisplayPositions();\r\n                // world.trigger('stats_display_changed'); // TODO: Trigger less often for performance reasons etc\r\n            }\r\n            lastUpdatedTime = time;\r\n            if (!world.isEnded) {\r\n                requestAnimationFrame(updater);\r\n            }\r\n        };\r\n        requestAnimationFrame(updater);\r\n    };\r\n    changePlayingState = (isPlaying) => {\r\n        this.isPlaying = isPlaying;\r\n        // controller.trigger('timescale_changed');\r\n    };\r\n    togglePlayingState = () => {\r\n        this.isPlaying = !this.isPlaying;\r\n        // controller.trigger('timescale_changed');\r\n    };\r\n    changeTimeScale = (timeScale) => {\r\n        this.timeScale = timeScale;\r\n        // controller.trigger('timescale_changed');\r\n    };\r\n    handleError = (e) => {\r\n        this.changePlayingState(false);\r\n        console.log('User Code Error!');\r\n        console.log(e);\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack://algocracy-elevator/./src/models/worldController.ts?");

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