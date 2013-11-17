"use strict";

window.onload = function(){

	
	var birthday = function(date){
        var birthday;
        var presentDay;
        var timeDifferent;
		var regex = /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
		
		if (!regex.test(date)) {
            throw new Error("FEL! Ange ett existerande datum i formatet \"ÅÅÅÅ-MM-DD\"");
		}
		
		birthday = Date.parse(date);
		
        if(isNaN(birthday)) {
            throw new Error("FEL! Det här datumet finns inte!");
		}
		else {
            birthday = new Date(date);
            presentDay = new Date();
            
            if (presentDay.getTime() - birthday.getTime() < 0) {
                throw new Error("FEL! Du kan inte vara född i framtiden!");
            }
        }
		
		birthday.setFullYear(presentDay.getFullYear());
		if (birthday.getTime() - presentDay.getTime() < 0) {
            // Om födelsedagen är idag.
            if (birthday.getDate() === presentDay.getDate() ){
                return 0;
            }
            else {
                birthday.setFullYear(presentDay.getFullYear() + 1);
            }
		}
		
		// Räknar ut antalet dagar till nästa födelsedag.
		return Math.floor(birthday.getTime() - presentDay.getTime() / (1000 * 60 * 60 * 24) + 1);
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
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};