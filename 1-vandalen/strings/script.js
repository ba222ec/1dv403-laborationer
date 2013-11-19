"use strict";

window.onload = function(){

	var convertString = function(str){
        
        console.log(str);
        
        // Vid "" som inmatning, kasta ett undantag med ett meddelande till användaren.
        if (!str) {
            throw new Error('FEL! Du måste ange en text!');
        }
        
        // Funktion för att analysera och förändra tecknen i texten.
        function analyzeChar(char) {
            if (char === 'a' || char === 'A') {
                return '#';
            }
            else if (char === char.toUpperCase()) {
                return char.toLowerCase();
            }
            else if (char === char.toLowerCase()) {
                return char.toUpperCase();
            }
            else {
                return char;
            }
        };
        
        var newString = "";
        for (var i = 0; i < str.length; i += 1) {
            newString += analyzeChar(str.charAt(i));
        }
        
        return newString;
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};