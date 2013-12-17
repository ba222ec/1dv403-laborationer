// Client validation of user input
(function () {
    "use strict";

    var form = document.getElementById("form1"),
        controlInput,
        controlInputs,
        createModalPopup,
        removeModalPopup,
        addError,
        removeError,
        setDisabledAllFields;

    // Creates an error message for the given input node.
    addError = function (node, text) {
        var label = document.getElementById(node.getAttribute("name")),
            explanation = document.createElement("small"),
            explanationText = document.createTextNode(text);

        explanation.setAttribute("class", "error");
        explanation.appendChild(explanationText);

        label.setAttribute("class", "error");
        node.setAttribute("class", node.getAttribute("class") + " error");
        node.parentNode.insertBefore(explanation, node.nextSibling);
    };

    // If the node has an errormessage, this method removes it.
    removeError = function (node) {
        var label = document.getElementById(node.getAttribute("name")),
            explanation;

        if (node.getAttribute("class") === "name error" ||
                node.getAttribute("class") === "email error" ||
                node.getAttribute("class") === "postalCode error") {
            explanation = node.nextSibling;
            label.removeAttribute("class");
            node.setAttribute("class", node.getAttribute("class").replace(" error", ""));
            node.parentNode.removeChild(explanation);
        }
    };

    // The control-functions returns true if the user input is valid.
    controlInput = function (regex, input) {
        return regex.test(input);
    };

    // Returns true if all inputs are valid.
    controlInputs = function () {
        var allValid = true,
            i;

        for (i = 1; i <= form.elements.length - 3; i += 1) {
            // Control name fields.
            if (form.elements[i].getAttribute("class").indexOf("name") !== -1) {
                if (!controlInput(/^.{1,255}$/, form.elements[i].value)) {
                    allValid = false;
                    addError(form.elements[i], "Fältet får ej lämnas blankt.");
                }
            // Control postal code fields.
            } else if (form.elements[i].getAttribute("class").indexOf("postalCode") !== -1) {
                if (!controlInput(/^(SE)?[\ ]?[\d]{3}(-|\ )?[\d]{2}$/, form.elements[i].value)) {
                    allValid = false;
                    addError(form.elements[i], "Fyll i ett korrekt postnummer");
                } else {
                    form.elements[i].value = form.elements[i].value.replace(/(SE|\ |-)/g, "");
                }
            // Control email fields.
            } else if (form.elements[i].getAttribute("class").indexOf("email") !== -1) {
                if (!controlInput(/^([\w\.\+]+)@([\w]+)\.([a-zA-Z]{2,6})$/, form.elements[i].value)) {
                    allValid = false;
                    addError(form.elements[i], "Fyll i en korrekt e-postadress.");
                }
            }
        }

        return allValid;
    };

    // Creates and adds a modal popup with the data from the form elements.
    createModalPopup = function () {
        var div0 = document.createElement("div"),
            div1 = document.createElement("div"),
            div2 = document.createElement("div"),
            header = document.createElement("header"),
            h2 = document.createElement("h2"),
            div3 = document.createElement("div"),
            a = document.createElement("a"),
            img = document.createElement("img"),
            headerText = document.createTextNode("Vänligen bekräfta ditt köp"),
            div4 = document.createElement("div"),
            div5 = document.createElement("div"),
            button1 = document.createElement("button"),
            button2 = document.createElement("button"),
            button1Text = document.createTextNode("Bekräfta köp"),
            button2Text = document.createTextNode("Avbryt"),
            p,
            text,
            i;

        div0.setAttribute("id", "overlay");
        div1.setAttribute("id", "modalDiv");
        div2.setAttribute("class", "row");
        header.setAttribute("class", "small-10 columns");
        div3.setAttribute("id", "closeDiv");
        div3.setAttribute("class", "small-2 columns");
        a.setAttribute("href", "#");
        img.setAttribute("src", "img/close-icon.png");
        div4.setAttribute("class", "row");

        // Reads the data from the form elements.
        for (i = 1; i <= form.elements.length - 2; i += 1) {
            p = document.createElement("p");
            p.setAttribute("class", "small-3 columns field");
            text = document.createTextNode(document.getElementById(form.elements[i].name)
                .textContent);
            p.appendChild(text);
            div4.appendChild(p);
            p = document.createElement("p");
            p.setAttribute("class", "small-9 columns");
            text = document.createTextNode(form.elements[i].value);
            p.appendChild(text);
            div4.appendChild(p);
        }

        div5.setAttribute("id", "buttonRow");
        div5.setAttribute("class", "row");
        button1.setAttribute("type", "button");
        button1.setAttribute("class", "button tiny radius success");
        button2.setAttribute("type", "button");
        button2.setAttribute("class", "button tiny radius alert");

        a.addEventListener("click", function () {
            removeModalPopup();
            setDisabledAllFields(false);
        }, false);
        // This is the only way to submit the form...
        button1.addEventListener("click", function () {
            removeModalPopup();
            setDisabledAllFields(false);
            form.submit();
            form.reset();
        }, false);
        button2.addEventListener("click", function () {
            removeModalPopup();
            setDisabledAllFields(false);
        }, false);

        a.appendChild(img);
        div3.appendChild(a);
        h2.appendChild(headerText);
        header.appendChild(h2);
        div2.appendChild(header);
        div2.appendChild(div3);
        button1.appendChild(button1Text);
        button2.appendChild(button2Text);
        div5.appendChild(button1);
        div5.appendChild(button2);
        div1.appendChild(div2);
        div1.appendChild(div4);
        div1.appendChild(div5);
        document.body.appendChild(div0);
        document.body.appendChild(div1);
    };

    // Removes the modal Popup.
    removeModalPopup = function () {
        var div0 = document.getElementById("overlay"),
            div1 = document.getElementById("modalDiv");

        document.body.removeChild(div0);
        document.body.removeChild(div1);
    };

    // Disables och undisables all the form elements.
    setDisabledAllFields = function (bool) {
        var i;
        for (i = 1; i <= form.elements.length - 1; i += 1) {
            form.elements[i].disabled = bool;
        }
    };

    form.addEventListener("submit", function (e) {
        e = e || window.event;
        // The real submit-button is in the modal popup...
        e.preventDefault();

        removeError(form.elements[1]);
        removeError(form.elements[2]);
        removeError(form.elements[3]);
        removeError(form.elements[4]);

        form.elements[1].value = form.elements[1].value.trim();
        form.elements[2].value = form.elements[2].value.trim();
        form.elements[3].value = form.elements[3].value.trim();
        form.elements[4].value = form.elements[4].value.trim();

        if (controlInputs()) {
            setDisabledAllFields(true);
            createModalPopup();
        } else {
            // Empty!
        }
    }, false);
}());