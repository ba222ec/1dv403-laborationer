// Client validaton of user input
(function () {
    "use strict";

    var form = document.getElementById("form1"),
        firstName = form.elements[1],
        lastName = form.elements[2],
        postalCode = form.elements[3],
        emailAddress = form.elements[4],
        firstNameValue,
        lastNameValue,
        postalCodeValue,
        emailAddressValue,
        controlInput,
        rewriteInput,
        addError,
        removeError;

    // Creats an error message for the given input node.
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
    }

    // The control-functions returns true if the user input is valid.
    controlInput = function (regex, input) {
        return regex.test(input);
    };

    rewriteInput = function (regex, input) {
        return input.replace(regex, "");
    };

    form.addEventListener("submit", function (e) {
        e = e || window.event; // IE-fix

        removeError(firstName);
        removeError(lastName);
        removeError(postalCode);
        removeError(emailAddress);

        firstNameValue = firstName.value.trim();
        lastNameValue = lastName.value.trim();
        postalCodeValue = postalCode.value.trim();
        emailAddressValue = emailAddress.value.trim();

        if (!controlInput(/^.{1,255}$/, firstNameValue)) {
            e.preventDefault();
            addError(firstName, "Fältet får ej lämnas blankt.");
        }
        if (!controlInput(/^.{1,255}$/, lastNameValue)) {
            e.preventDefault();
            addError(lastName, "Fältet får ej lämnas blankt.");
        }
        if (!controlInput(/^(SE)?[\ ]?[\d]{3}(-|\ )?[\d]{2}$/, postalCodeValue)) {
            e.preventDefault();
            addError(postalCode, "Fyll i ett korrekt postnummer");
        } else {
            postalCode.value = rewriteInput(/(SE|\ |-)/g, postalCodeValue);
        }
        if (!controlInput(/^([\w\.\+]+)@([\w]+)\.([a-zA-Z]{2,6})$/, emailAddressValue)) {
            e.preventDefault();
            addError(emailAddress, "Fyll i en korrekt e-postadress.");
        }
    }, false);

}());