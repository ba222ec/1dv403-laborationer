"use strict";

function MemoryBoard(memoryID, rows, cols) {

    // To save the random array from random.js.
    this.memoryCards = [];

    // The only method to be called from outside the object.
    this.init = function () {
        // Counters
        var i, p, k = 0;
        // DOM-nodes
        var img, anchor, td, tr,
            table = document.createElement("table"),
            div = document.querySelector("div#" + memoryID);

        // Generates a random array
        this.memoryCards = RandomGenerator.getPictureArray(rows, cols);

        // Creates the table that contains the memory game.
        for (i = 1; i <= rows; i += 1) {
            tr = document.createElement("tr");
            for (p = 1; p <= cols; p += 1) {
                img = document.createElement("img");
                img.setAttribute("src", "pics/" + this.memoryCards[k] + ".png");
                anchor = document.createElement("a");
                td = document.createElement("td");
                anchor.appendChild(img);
                td.appendChild(anchor);
                tr.appendChild(td);
                // The picture counter
                k += 1;
            }
            table.appendChild(tr);
        }
        div.appendChild(table);
    };
}

window.onload = function () {
    new MemoryBoard("memoryBoard1", 1, 6).init();
};