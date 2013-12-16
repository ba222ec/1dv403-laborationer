// Client validation of user input
(function () {
    "use strict";

    var form = document.getElementById("form1"),
        controlInput,
        controlInputs,
        createModalPopup,
        addError,
        removeError,
        setDisableAllFields;

    // Creates an error message for the given input node.
    addError = function (node, text) {
        var label = document.getElementById(node.getAttribute("name")),
            explanation = document.createElement("small"),
            explanationText = document.createTextNode(text);

        explanation.setAttribute("class", "error");
        explanation.appendChild(explanationText);

        label.setAttribute("class", "error");
        node.setAttribute("class", "error");
        node.parentNode.insertBefore(explanation, node.nextSibling);
    };

    // If the node has an errormessage, this method removes it.
    removeError = function (node) {
        var label = document.getElementById(node.getAttribute("name")),
            explanation;

        if (node.getAttribute("class") === "error") {
            explanation = node.nextSibling;
            label.removeAttribute("class");
            node.removeAttribute("class");
            node.parentNode.removeChild(explanation);
        }
    };

    // The control-functions returns true if the user input is valid.
    controlInput = function (regex, input) {
        return regex.test(input);
    };

    controlInputs = function () {
        var allValid = true;

        if (!controlInput(/^.{1,255}$/, form.elements[1].value)) {
            allValid = false;
            addError(form.elements[1], "Fältet får ej lämnas blankt.");
        }
        if (!controlInput(/^.{1,255}$/, form.elements[2].value)) {
            allValid = false;
            addError(form.elements[2], "Fältet får ej lämnas blankt.");
        }
        if (!controlInput(/^(SE)?[\ ]?[\d]{3}(-|\ )?[\d]{2}$/, form.elements[3].value)) {
            allValid = false;
            addError(form.elements[3], "Fyll i ett korrekt postnummer");
        } else {
            form.elements[3].value = form.elements[3].value.replace(/(SE|\ |-)/g, "");
        }
        if (!controlInput(/^([\w\.\+]+)@([\w]+)\.([a-zA-Z]{2,6})$/,
                form.elements[4].value)) {
            allValid = false;
            addError(form.elements[4], "Fyll i en korrekt e-postadress.");
        }

        return allValid;
    };

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

    setDisabledAllFields = function (bool) {
        var i;
        for (i = 1; i <= form.elements.length - 1; i += 1) {
            form.elements[i].disabled = bool;
        }
    };

    form.addEventListener("submit", function (e) {
        e = e || window.event; // IE-fix

        removeError(form.elements[1]);
        removeError(form.elements[2]);
        removeError(form.elements[3]);
        removeError(form.elements[4]);

        form.elements[1].value = form.elements[1].value.trim();
        form.elements[2].value = form.elements[2].value.trim();
        form.elements[3].value = form.elements[3].value.trim();
        form.elements[4].value = form.elements[4].value.trim();

        if (controlInputs()) {
            setDisableAllFields(true);
            createModalPopup();
            /* Tillfälligt */
            e.preventDefault();
        } else {
            e.preventDefault();
        }

    }, false);

}());