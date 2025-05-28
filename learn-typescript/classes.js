"use strict";
// A class is a blueprint to create objects with properties and methods.
class User4 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}
const ur1 = new User4("Aayush", 23);
ur1.greet(); // Hello, my name is Aayush
/*
Access Modifiers
public = accessible anywhere (default)
private = accessible only within class
protected = accessible within class and subclasses
*/ 
