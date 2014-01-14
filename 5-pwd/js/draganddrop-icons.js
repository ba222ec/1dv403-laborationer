// Make it possible to move around the icons in iconbar...

(function () {
	"use strict";
	var doc = document,
		iconGallery = doc.getElementById("open-gallery"),
		iconMemory = doc.getElementById("open-memory"),
		iconRSS = doc.getElementById("open-rssfeed"),
		iconChat = doc.getElementById("open-chat"),
		iconbar = doc.getElementById("iconbar");

	function dragStart(e) {
		e.dataTransfer.effectAllowed = "move";
		if (e.target.src) {
			e.dataTransfer.setData("Text", e.target.parentNode.getAttribute('id'));
		} else {
			e.dataTransfer.setData("Text", e.target.getAttribute('id'));
		}
		e.dataTransfer.setDragImage(e.target, 0, 0);
		return true;
	}

	iconGallery.addEventListener("dragstart", function (e) {
		return dragStart(e);
	}, false);

	iconMemory.addEventListener("dragstart", function (e) {
		return dragStart(e);
	}, false);

	iconRSS.addEventListener("dragstart", function(e) {
		return dragStart(e);
	}, false);

	iconChat.addEventListener("dragstart", function (e) {
		return dragStart(e);
	}, false);

	iconbar.addEventListener("dragenter", function (e) {
		e.preventDefault();

		var hit = e.target;
		if (hit.src) {
			// First Icon
			if (iconbar.children[0].children[0] === hit.parentNode.parentNode) {
				hit.className += " dragenter-first";
				// Other Icons
			} else {
				hit.className += " dragenter";
			}
		}

	}, false);

	iconbar.addEventListener("dragover", function (e) {
		e.preventDefault();
	}, false);

	iconbar.addEventListener("dragleave", function (e) {
		e.preventDefault();
		var hit = e.target;

		if (hit.src) {
			// First Icon
			if (iconbar.children[0].children[0] === hit.parentNode.parentNode) {
				hit.className = hit.className.replace(/dragenter-first/g, "");
				// Other Icons
			} else {
				hit.className = hit.className.replace(/dragenter/g, "");
			}
		}

	}, false);

	iconbar.addEventListener("drop", function (e) {
		var id = e.dataTransfer.getData("Text"),
			hit = e.target,
			nbrOfIcons = iconbar.getElementsByTagName("li").length;

		if (hit.src) {
			// Last icon.
			if (iconbar.children[0].children[nbrOfIcons - 1] === hit.parentNode.parentNode) {
				iconbar.children[0].appendChild(doc.getElementById(id).parentNode);
				hit.className = hit.className.replace(/dragenter/g, "");
			// First icon.
			} else if (iconbar.children[0].children[0] === hit.parentNode.parentNode) {
					iconbar.children[0].insertBefore(doc.getElementById(id).parentNode, iconbar.children[0].children[0]);
				hit.className = hit.className.replace(/dragenter-first/g, "");
			// All other icons.
			} else {
					iconbar.children[0].insertBefore(doc.getElementById(id).parentNode, hit.parentNode.parentNode.nextSibling);
				hit.className = hit.className.replace(/dragenter/g, "");
			}
		// drop on iconbar
		} else if (hit.id === "iconbar") {
			iconbar.children[0].appendChild(doc.getElementById(id).parentNode);
		}

		e.stopPropagation();
		e.preventDefault();

	}, false);

}());