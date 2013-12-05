"use strict";

function MemoryBoard(memoryID, rows, cols) {

    // To save the random array from random.js.
    this.memoryCards = [];

    this.init = function () {
        var i, 
            j,
            k = 0,
            that = this,
            picsUp = 0,
            lastChoice = null,
            nbrOfGuesses = 0,
            foundPairs = 0;

        var img, 
            anchor, 
            td, 
            tr, 
            presDiv, 
            p,
            table = document.createElement("table"),
            div = document.getElementById(memoryID);

        // Generates a random array
        this.memoryCards = RandomGenerator.getPictureArray(rows, cols);

        // Creates the div for info
        presDiv = document.createElement("div");
        presDiv.setAttribute("id", memoryID + "Info");
        p = document.createElement("p");
        presDiv.appendChild(p);

        // Creates the board and the div for presentation.
        for (i = 1; i <= rows; i += 1) {
            tr = document.createElement("tr");
            for (j = 1; j <= cols; j += 1) {

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
                            if (!lastChoice) {
                                lastChoice = currentChoice;
                            }
                        }

                        if (picsUp >= 2) {
                            if (that.compareSrc(currentChoice, lastChoice)) {
                                that.setEventToNull(currentChoice);
                                that.setEventToNull(lastChoice);
                                picsUp = 0;
                                lastChoice = null;
                                nbrOfGuesses += 1;
                                foundPairs += 1;
                                that.writeInfo(foundPairs, nbrOfGuesses);
                            } else {
                                setTimeout(function () {
                                    that.turnDown(currentChoice);
                                    that.turnDown(lastChoice);
                                    picsUp = 0;
                                    lastChoice = null;
                                    nbrOfGuesses += 1;
                                    that.writeInfo(foundPairs, nbrOfGuesses);
                                }, 1000);
                            }   
                        }
                    }
                };

                // The picture counter
                k += 1;
            }
            table.appendChild(tr);
        } // for-loop

        div.appendChild(table);
        div.appendChild(presDiv);

        this.writeInfo(foundPairs, nbrOfGuesses);
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

    this.compareSrc = function (nodeId1, nodeId2) {
        var src1 = document.getElementById(nodeId1).firstChild.getAttribute("src"),
            src2 = document.getElementById(nodeId2).firstChild.getAttribute("src");
        return (src1 === src2);
    }

    this.setEventToNull = function (nodeId) {
        var node = document.getElementById(nodeId);
        node.onclick = null;
    }

    this.writeInfo = function (foundPairs, nbrOfGuesses) {
        var node = document.getElementById(memoryID + "Info"),
            text = "Antal par kvar att hitta: " + (this.memoryCards.length / 2 - foundPairs) + "<br />Antal gjorda gissningar: " + nbrOfGuesses;
        node.firstChild.innerHTML = text;
    }
}

window.onload = function () {
    new MemoryBoard("memoryBoard1", 3, 4).init();
};