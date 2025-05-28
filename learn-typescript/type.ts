//  Type Inference – TypeScript guesses the type based on the value


let name2 = "Aayush"; // inferred as string
let age2 = 24;        // inferred as number

 //Example
let counter = 0; // TypeScript knows: number
// counter = "hello"; // Error: string not assignable to number 
//Type Annotations – You explicitly say what the type is

let username1: string = "Pandey";
let score: number = 99;
let isLoggedIn: boolean = true;

/* Type Aliases 
A type alias is like giving a nickname to a type.
It’s a way to define custom names for any 
type: primitives, objects, unions, arrays, functions, you name it! */

// type Username = string;

// let user1: Username = "aayush_pandey";


// example 
// type User = {
//   name: string;
//   age: number;
// };

// const user: User = {
//   name: "Aayush",
//   age: 23,
// };


// Union types (we can’t do this with interface)
// type Status = "success" | "error" | "loading";

// let state: Status = "success"; // ✅
// state = "idle"; //  error

// Array type

type StringArray = string[];

const fruits: StringArray = ["apple", "banana"];

//  Function type
type AddFn = (a: number, b: number) => number;

const add: AddFn = (x, y) => x + y;

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