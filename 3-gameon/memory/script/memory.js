"use strict";

function MemoryBoard(memoryID, rows, cols) {

    // To save the random array from random.js.
    this.memoryCards = [];

    this.init = function () {
        var i, p,
            k = 0,
            that = this,
            picsUp = 0,
            lastChoice = null;

        var img, anchor, td, tr,
            table = document.createElement("table"),
            div = document.getElementById(memoryID);

        // Generates a random array
        this.memoryCards = RandomGenerator.getPictureArray(rows, cols);

        console.log(this.memoryCards.toString());

        // Creates the table that contains the memory game.
        for (i = 1; i <= rows; i += 1) {
            tr = document.createElement("tr");
            for (p = 1; p <= cols; p += 1) {

                img = document.createElement("img");
                img.setAttribute("src", "pics/0.png");
                anchor = document.createElement("a");
                anchor.setAttribute("class", this.memoryCards[k])
                anchor.setAttribute("id", k + memoryID);
                anchor.setAttribute("href", "#");
                td = document.createElement("td");
                anchor.appendChild(img);
                td.appendChild(anchor);
                tr.appendChild(td);

                anchor.onclick = function (e) {
                    var e = e || window.event; // IE-fix
                    var currentChoice = e.currentTarget.getAttribute("id");
                    e.preventDefault();

                    if (lastChoice === currentChoice) {
                        return;
                    } else {
                        if (picsUp < 2) {
                            that.turnUp(currentChoice);
                            picsUp += 1;
                        }
                        if (!lastChoice) {
                            lastChoice = currentChoice;
                        }
                        if (picsUp >= 2) {
                            setTimeout(function () {
                                that.turnDown(currentChoice);
                                that.turnDown(lastChoice);
                                picsUp = 0;
                                lastChoice = null;
                            }, 1000);
                        }
                    }
                };

                // The picture counter
                k += 1;
            }
            table.appendChild(tr);
        } // for-loop

        div.appendChild(table);


    };

    this.turnUp = function (nodeId) {
        var node = document.getElementById(nodeId),
            index = node.getAttribute("class");
        node.firstChild.setAttribute("src", "pics/" + index + ".png");
    }

    this.turnDown = function (nodeId) {
        var node = document.getElementById(nodeId);
        node.firstChild.setAttribute("src", "pics/0.png");
    }
}

window.onload = function () {
    new MemoryBoard("memoryBoard1", 2, 5).init();
};