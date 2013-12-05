"use strict";

function MemoryBoard(memoryID, rows, cols) {
    // To save the random array from random.js
    this.memoryCards = [];

    // Only method to be called from outside the object
    this.init = function () {
        // Generates a random array
        this.memoryCards = RandomGenerator.getPictureArray(rows, cols);

    };
}

window.onload = function () {
    new MemoryBoard("memoryBoard1", 2, 4).init();
};