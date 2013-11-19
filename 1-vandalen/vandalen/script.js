"use strict";

var makePerson = function(persArr){

    var minAge, maxAge, averageAge, allNames, stringWithNames;
    
    // Validering av argumentet. Argementet måste vara en array som innehåller objekt och
    // objekten måste ha egenskapen name och minst en av egenskaperna born och age. 
    if (!persArr instanceof Array) {
        throw new Error("FEL! Du måste skicka en array som argument!");
    }
    if (!persArr[0]) {
        throw new Error("FEL! Arrayen innehåller inga objekt!");
    }
    if (!persArr.every(
            function (person) { 
                if ('name' in person && typeof person.name === 'string') {
                    return true;
                } else {
                    return false;}
            })
        ) {
        throw new Error("FEL! Objekten i arrayen måste ha egenskapen name!");
    }
    if (!persArr.every(
            function (person) {
                if ('born' in person && typeof person.born === 'string') {
                    return true;
                } else if ('age' in person && typeof person.age === 'number') {
                    return true;
                } else {
                    return false;
                }
            })
        ) {
        throw new Error("FEL! Objekten i arrayen måste innehålla någon av egenskaperna born eller age!");  
    }

    // Tar fram den högsta och den minsta åldern samt medelåldern.
    persArr.sort(function(pers1, pers2) { return pers1.age - pers2.age; });
    minAge = persArr[0].age;
    maxAge = persArr[persArr.length - 1].age;
    averageAge = Math.round(persArr.map(function(person) { return person.age }).reduce( function (a, b) { return a + b }) / persArr.length);    

    // Tar ut alla namn, sorterar med och lägger den i en stäng.
    allNames = persArr.map(function(person) { return person.name }).sort(function(a, b) { return a.localeCompare(b); });
    stringWithNames = allNames.reduce(function (name1, name2) { return name1 + ", " + name2 });
    
    return { averageAge: averageAge, maxAge: maxAge, minAge: minAge, names: stringWithNames };
};

