(function () {
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
                div = document.getElementById(memoryID);

            // Generates a random array
            this.memoryCards = RandomGenerator.getPictureArray(rows, cols);

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
            startAgainBtn.onclick = function () {
                div.removeChild(table);
                div.removeChild(presDiv);
                div.removeChild(startAgainBtn);
                that.init();
            };
            
            // This is the event handler for the a-tags
            clickEvent = function (e) {
                if (picsUp > 2) {
                        // Empty!
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
                    img.setAttribute("src", "pics/0.png");
                    anchor = document.createElement("a");
                    anchor.setAttribute("class", (this.memoryCards[k] + " clickable") );
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
            node.firstChild.setAttribute("src", "pics/" + index + ".png");
        };

        this.turnDown = function (nodeId) {
            var node = document.getElementById(nodeId);
            node.firstChild.setAttribute("src", "pics/0.png");
        };

        this.compareSrc = function (nodeId1, nodeId2) {
            var src1 = document.getElementById(nodeId1).firstChild.getAttribute("src"),
                src2 = document.getElementById(nodeId2).firstChild.getAttribute("src");
            return (src1 === src2);
        };

        this.setEventToNull = function (nodeId) {
            var node = document.getElementById(nodeId);
            node.setAttribute("class", (node.getAttribute("class").replace("clickable",
                        "unclickable")) );
            node.onclick = null;
        };

        this.writeInfo = function (text) {
            var node = document.getElementById(memoryID + "Info");
            node.firstChild.innerHTML = text;
        };
    }


    // On window.onload
    new MemoryBoard("memoryBoard1", 3, 4).init();
    new MemoryBoard("memoryBoard2", 2, 4).init();
}());