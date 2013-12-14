// Client validaton of user input
(function () {
    "use strict";

    var form = document.getElementById("form1"),
        firstName = form.elements[1],
        lastName = form.elements[2],
        postalCode = form.elements[3],
        emailAddress = form.elements[4],
        controlFirstName,
        controlLastName,
        controlPostalCode,
        controlEmailAddress,
        addError,
        removeError;

    // Creats an error message for the given input node.
    addError = function (node, text) {
        var label = document.getElementById(node.getAttribute("name")),
            warning = document.createElement("small"),
            warningText = document.createTextNode(text);

        warning.setAttribute("class", "error");
        warning.appendChild(warningText);

        label.setAttribute("class", "error");
        node.setAttribute("class", "error");
        node.parentNode.insertBefore(warning, node.nextSibling);
    };

    // If the node has an errormessage, this method removes it.
    removeError = function (node) {
        var label = document.getElementById(node.getAttribute("name")),
            warning;

        if (node.getAttribute("class") === "error") {
            warning = node.nextSibling;
            label.removeAttribute("class");
            node.removeAttribute("class");
            node.parentNode.removeChild(warning);
        }
    }

    // The control-functions returns true if the user input is valid.
    controlFirstName = function () {
        var regex = /^.{1,255}$/;
        return regex.test(firstName.value.trim());
    };
    controlLastName = function () {
        var regex = /^.{1,255}$/;
        return regex.test(lastName.value.trim());
    };
    controlPostalCode = function () {
        var regex = /^[\d]{5}$/;
        return regex.test(postalCode.value.trim());
    };
    controlEmailAddress = function () {
        var regex = /^([\w\.\+]+)@([\w]+)\.([a-zA-Z]{2,6})$/;
        return regex.test(emailAddress.value.trim());
    };

    form.addEventListener("submit", function (e) {
        e = e || window.event; // IE-fix

        removeError(firstName);
        removeError(lastName);
        removeError(postalCode);
        removeError(emailAddress);

        if (!controlFirstName()) {
            e.preventDefault();
            addError(firstName, "Fyll i ditt namn.");
        }
        if (!controlLastName()) {
            e.preventDefault();
            addError(lastName, "Fyll i ditt namn.");
        }
        if (!controlPostalCode()) {
            e.preventDefault();
            addError(postalCode, "Fyll i postnumret med fem(5) siffor utan bindestreck.");
        }
        if (!controlEmailAddress()) {
            e.preventDefault();
            addError(emailAddress, "Fyll i en e-postadress.");
        }
    }, false);

}());