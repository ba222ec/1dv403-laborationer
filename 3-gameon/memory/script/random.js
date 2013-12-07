"use strict";

var RandomGenerator = {

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
