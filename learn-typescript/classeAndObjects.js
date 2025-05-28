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
const p1 = {
    name: "Phone",
    price: 30000,
    inStock: false,
};
//-----OR---------------
// interface Product {
//   name: string;
//   price: number;
//   inStock: boolean;
// }
/*
type User = {
  name: string;
  email?: string; // optional
};

const u1: User = { name: "Aayush" }; // valid

*/ 
