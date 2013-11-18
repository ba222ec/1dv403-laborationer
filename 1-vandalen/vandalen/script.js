"use strict";

var makePerson = function(persArr){
/*    
    console.log(persArr);

    if (!persArr instanceof Array) {
        throw new Error("FEL! Du måste skicka en array som argument!");
    }
    if (!persArr[0]) {
        throw new Error("FEL! Arrayen innehåller inga objekt!");
    }
    if (!persArr.every(function (person, index, array) {
        if ('name' in person) {
            return true;
        } else {
            return false;
        } }) ) {
        throw new Error("FEL! Alla objekt i arrayen måste ha egenskaperna name!");
    }
    if (!persArr.every(function (person, index, array) { if ('age' in person) {return true;} else {return false;} }) ) {
        throw new Error("FEL! Alla objekt i arrayen måste ha egenskaperna age!");
    }
*/
    var allAges = persArr.map(function(person) {return person.age}).sort(function(a, b) { return a - b; });
    var minAge = allAges[0];
    var maxAge = allAges[allAges.length - 1];
    var averageAge = Math.round(allAges.reduce(function (a, b) {return a + b}) / persArr.length);

    var allNames = persArr.map(function(person) {return person.name}).sort(function(a, b) { return a.localeCompare(b); });
    var stringWithNames = allNames.reduce(function (name1, name2) {return name1 + ", " + name2});
    

    return {averageAge: averageAge, maxAge: maxAge, minAge: minAge, names: stringWithNames};
};