"use strict";
var displayInfo = function (_a) {
    var name = _a.name, age = _a.age, pet = _a.pet;
    console.log("Name: ".concat(name, ", \nAge: ").concat(age, ", \nPet: ").concat(pet, "\n"));
};
displayInfo({ name: 'Slava', age: 23, pet: 'dog' });
var displayInfo1 = function (obj) {
    var name = obj.name, age = obj.age, pet = obj.pet;
    console.log("Name: ".concat(name, ", \nAge: ").concat(age, ", \nPet: ").concat(pet));
};
displayInfo1({ name: 'Yaroslava', age: 28, pet: 'cat' });
