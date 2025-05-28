interface User {
    name:string;
    email : string;
    password: string;
}

// interface Admin extends User {
//     admin : string
// }

let obj : User = {
    name :"aaush",
    email:"sss",
    password:"sdjjj"
}

// 1. number, string, boolean
let age: number = 25;
let username: string = "Aayush";
let isOnline: boolean = true;

// 2 . unknown – like any, but safer
let data: unknown = "could be anything";

if (typeof data === "string") {
  console.log(data.toUpperCase()); 
}

// 3.  void – no return value

function logMessage(message: string): void {
  console.log(message);
}

// 4. object

let person: { name: string; age: number } = {
  name: "Aayush",
  age: 22,
};

// 5.   Arrays

let scores: number[] = [90, 85, 88];
let names: Array<string> = ["Aayush", "Pandey"];

// 6. Tuples

let user: [string, number] = ["Aayush", 23]; // order matters (like fixed what we set)

// 7. Enums 

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let move: Direction = Direction.Left; // value = 2

// 8. Union Types

let value: string | number = "hello";
value = 42;

// 9.  Intersection Types

type Name = { name: string };
type Age = { age: number };

let userInfo: Name & Age = {
  name: "Aayush",
  age: 23,
};

