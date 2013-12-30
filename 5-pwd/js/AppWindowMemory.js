"use strict";

var SVANTE = window.SVANTE || {};
SVANTE.constructors = SVANTE.constructors || {};

SVANTE.constructors.AppWindowMemory = function (sStatus, iWidth, iHeight, iX, iY, iNumberOfMemorys) {
	SVANTE.constructors.AppWindow.call(this, "AppWindowMemory", sStatus,
        iWidth, iHeight, iX, iY);

	this.init = function () {
		var div = document.createElement("div");
		div.id = "memoryBoard" + iNumberOfMemorys;
		this.windowHTML.children[1].appendChild(div);
		new SVANTE.constructors.Memory(div.id, 3, 4, this).init();
	}
};

SVANTE.constructors.AppWindowMemory.prototype = Object.create(SVANTE.constructors.AppWindow.prototype);
SVANTE.constructors.AppWindowMemory.prototype.constructor = SVANTE.constructors.AppWindowMemory;