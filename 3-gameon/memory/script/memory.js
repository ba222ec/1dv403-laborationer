"use strict";

function MemoryBoard(memoryID, rows, cols) {

    // To save the random array from random.js.
    this.memoryCards = [];

    this.init = function () {

        // Counters and that
        var i, p,
            k = 0;

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
                img.setAttribute("src", "pics/0.png");
                anchor = document.createElement("a");
                anchor.setAttribute("class", this.memoryCards[k])
                anchor.setAttribute("href", "#");
                td = document.createElement("td");
                anchor.appendChild(img);
                td.appendChild(anchor);
                tr.appendChild(td);
                
                anchor.addEventListener("click", function (e) {
                    e = e || window.event; // IE-fix
                    e.preventDefault();
                    e.currentTarget.firstChild.setAttribute("src", "pics/" + e.currentTarget.getAttribute("class") + ".png");
                }, false);

                // The picture counter
                k += 1;
            }
            table.appendChild(tr);
        } // for-loop

        div.appendChild(table);


    };
}

window.onload = function () {
    new MemoryBoard("memoryBoard1", 3, 4).init();
};