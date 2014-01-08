"use strict";

var SVANTE = window.SVANTE || {};
SVANTE.constructors = SVANTE.constructors || {};

SVANTE.constructors.Memory = function (memoryID, rows, cols, mother) {

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
            foundPairs = 0,
            img,
            anchor,
            td,
            tr,
            presDiv,
            p,
            startAgainBtn,
            clickEvent,
            table = document.createElement("table"),
            div = mother.windowHTML.children[2];

        // Generates a random array
        this.memoryCards = SVANTE.RandomGenerator.getPictureArray(rows, cols);

        // Creates the div for info
        presDiv = document.createElement("div");
        presDiv.setAttribute("id", memoryID + "Info");
        presDiv.setAttribute("class", "gameBoardInfo");
        p = document.createElement("p");
        presDiv.appendChild(p);

        // Creates the start again button
        startAgainBtn = document.createElement("button");
        startAgainBtn.setAttribute("type", "button");
        startAgainBtn.innerHTML = "Nytt spel";
        startAgainBtn.setAttribute("disabled", "disabled");
        startAgainBtn.setAttribute("class", "notInUse");

        // This is the event handler for the a-tags
        clickEvent = function (e) {
            if (picsUp > 2) {
                return;
            }
            e = e || window.event; // IE-fix
            var currentChoice = e.currentTarget.getAttribute("id");
            e.preventDefault();

            if (lastChoice === currentChoice) {
                // Empty!
            } else {
                if (picsUp < 2) {
                    that.turnUp(currentChoice);
                    picsUp += 1;
                    if (!lastChoice) {
                        lastChoice = currentChoice;
                    }
                }
                if (picsUp === 2) {
                    picsUp += 1;
                    if (that.compareSrc(currentChoice, lastChoice)) {
                        that.setEventToNull(currentChoice);
                        that.setEventToNull(lastChoice);
                        picsUp = 0;
                        lastChoice = null;
                        nbrOfGuesses += 1;
                        foundPairs += 1;
                        that.writeInfo("Antal par kvar att hitta: " +
                                (that.memoryCards.length / 2 - foundPairs) +
                                "<br />Antal gjorda gissningar: " + nbrOfGuesses);
                    } else {
                        setTimeout(function () {
                            that.turnDown(currentChoice);
                            that.turnDown(lastChoice);
                            picsUp = 0;
                            lastChoice = null;
                            nbrOfGuesses += 1;
                            that.writeInfo("Antal par kvar att hitta: " +
                                (that.memoryCards.length / 2 - foundPairs) +
                                "<br />Antal gjorda gissningar: " + nbrOfGuesses);
                        }, 1000);
                    }
                }
                // A test to se if the player has won the game.
                if (foundPairs >= that.memoryCards.length / 2) {
                    startAgainBtn.removeAttribute("disabled");
                    startAgainBtn.removeAttribute("class");
                    that.writeInfo("GRATTIS! Du behövde " + nbrOfGuesses +
                        " gissningar för att vinna!");
                }
            }
        };

        // Creates the board and the div for presentation.
        for (i = 1; i <= rows; i += 1) {
            tr = document.createElement("tr");
            for (j = 1; j <= cols; j += 1) {
                img = document.createElement("img");
                img.setAttribute("src", "img/memory-img/0.png");
                anchor = document.createElement("a");
                anchor.setAttribute("class", (this.memoryCards[k] + " clickable"));
                anchor.setAttribute("id", k + memoryID);
                anchor.setAttribute("href", "#");
                td = document.createElement("td");
                anchor.appendChild(img);
                td.appendChild(anchor);
                tr.appendChild(td);

                k += 1;
                anchor.onclick = clickEvent;
            }
            table.appendChild(tr);
        }

        div.appendChild(table);
        div.appendChild(presDiv);
        div.appendChild(startAgainBtn);
        this.writeInfo("Antal par kvar att hitta: " +
            (this.memoryCards.length / 2 - foundPairs) +
            "<br />Antal gjorda gissningar: " + nbrOfGuesses);
    };

    this.turnUp = function (nodeId) {
        var node = document.getElementById(nodeId),
            index = parseInt(node.getAttribute("class"), 10);
        node.firstChild.setAttribute("src", "img/memory-img/" + index + ".png");
    };

    this.turnDown = function (nodeId) {
        var node = document.getElementById(nodeId);
        node.firstChild.setAttribute("src", "img/memory-img/0.png");
    };

    this.compareSrc = function (nodeId1, nodeId2) {
        var src1 = document.getElementById(nodeId1).firstChild.getAttribute("src"),
            src2 = document.getElementById(nodeId2).firstChild.getAttribute("src");
        return (src1 === src2);
    };

    this.setEventToNull = function (nodeId) {
        var node = document.getElementById(nodeId);
        node.setAttribute("class", (node.getAttribute("class").replace("clickable",
                    "unclickable")));
        node.onclick = null;
    };

    this.writeInfo = function (text) {
        var node = mother.windowHTML.children[2].children[1];
        node.firstChild.innerHTML = text;
    };
};

SVANTE.RandomGenerator = {

    getPictureArray: function (rows, cols) {
        var numberOfImages = rows * cols,
            maxImageNumber = numberOfImages / 2,
            imgPlace = [],
            i,
            currentImageNumber,
            imageOneOK,
            imageTwoOK,
            randomOne,
            randomTwo;

        //Utplacering av bilder i Array
        for (i = 0; i < numberOfImages; i += 1) {
            imgPlace[i] = 0;
        }

        for (currentImageNumber = 1;
                currentImageNumber <= maxImageNumber; currentImageNumber += 1) {
            imageOneOK = false;
            imageTwoOK = false;

            do {
                if (imageOneOK === false) {
                    randomOne = Math.floor((Math.random() * (rows * cols)));

                    if (imgPlace[randomOne] === 0) {
                        imgPlace[randomOne] = currentImageNumber;
                        imageOneOK = true;
                    }
                }

                if (imageTwoOK === false) {
                    randomTwo = Math.floor((Math.random() * (rows * cols)));

                    if (imgPlace[randomTwo] === 0) {
                        imgPlace[randomTwo] = currentImageNumber;
                        imageTwoOK = true;
                    }
                }
            } while (imageOneOK === false || imageTwoOK === false);
        }

        return imgPlace;
    }
};
