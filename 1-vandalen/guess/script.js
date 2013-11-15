"use strict";

window.onload = function(){
	
	var secret = Math.floor(Math.random() * 100)+1;
	var count = 0;
	
	// I denna funktion ska du skriva koden för att hantera "spelet"
	var guess = function(number) {
		console.log("Gissning: " + number);
		console.log("Hemligt tal: " + secret);

        // Ej godkända gissningar
        if ( isNaN(+number) ) {
            return [false, "FEL! Du måste gissa på ett <strong>heltal</strong> inom intervallet 1 - 100."];
        }
        else if ( +number % 1 !== 0 ) {
            return [false, "FEL! Du måste gissa på ett <strong>heltal</strong> inom intervallet 1 - 100."];
        }
        else if ( +number < 1 || +number > 100 ) {
            return [false, "FEL! Du måste gissa på ett heltal inom intervallet <strong>1 - 100</strong>."];
        }
        // Godkända gissningar.
        else if ( +number < secret ) {
            count += 1;
            return [false, "Du gissade för lågt!"];
        }
        else if ( +number > secret ) {
            count += 1;
            return [false, "Du gissade för högt!"];
        }
        else {
            count += 1;
            return [true, "Grattis! Du gissade rätt! Det hemliga talet var " + secret + " och du behövde " + count + " gissningar för att hitta det."];
        }
	};
	
	// ------------------------------------------------------------------------------



	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#number");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		var answer = guess(input.value) // Läser in talet från textrutan och skickar till funktionen "guess"
                p.innerHTML = answer[1];                // Skriver ut texten från arrayen som skapats i funktionen.        

                if(answer[0] === true){                                // Om spelet är slut, avaktivera knappen.
                        submit.disabled = true;
                }
        
        });
};