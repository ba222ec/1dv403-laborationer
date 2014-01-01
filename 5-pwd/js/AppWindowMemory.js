"use strict";

var SVANTE = window.SVANTE || {};
SVANTE.constructors = SVANTE.constructors || {};

SVANTE.constructors.AppWindowMemory = function (sStatus, iWidth, iHeight, iX, iY, iNumberOfMemorys) {
	SVANTE.constructors.AppWindow.call(this, "AppWindowMemory", sStatus,
        iWidth, iHeight, iX, iY);

	this.init = function () {
	    var eContentDiv = this.windowHTML.children[1];
	    eContentDiv.id = "memoryBoard" + iNumberOfMemorys;
	    new SVANTE.constructors.Memory(eContentDiv.id, 3, 4, this).init();
	}
};

SVANTE.constructors.AppWindowMemory.prototype = Object.create(SVANTE.constructors.AppWindow.prototype);
SVANTE.constructors.AppWindowMemory.prototype.constructor = SVANTE.constructors.AppWindowMemory;