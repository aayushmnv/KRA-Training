"use strict";
//  Type Inference – TypeScript guesses the type based on the value
let name2 = "Aayush"; // inferred as string
let age2 = 24; // inferred as number
//Example
let counter = 0; // TypeScript knows: number
// counter = "hello"; // Error: string not assignable to number 
//Type Annotations – You explicitly say what the type is
let username1 = "Pandey";
let score = 99;
let isLoggedIn = true;
const fruits = ["apple", "banana"];
const add = (x, y) => x + y;
// Intersection types (combine multiple types)
// type Person = {
//   name: string;
// };
// type Developer = {
//   skills: string[];
// };
// type DevPerson = Person & Developer;
// const dev: DevPerson = {
//   name: "Aayush",
//   skills: ["TypeScript", "React"],
// };
