// A class is a blueprint to create objects with properties and methods.

class User4 {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): void {
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

/*
What is an Object?
An object is a key-value pair structure that groups related data and functions (called methods).
It’s literally everywhere in JS/TS — configs, API responses, props, state, classes, you name it.
*/
type Product = {
  name: string;
  price: number;
  inStock: boolean;
};

const p1: Product = {
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