// An interface is like a contract for objects — it defines the shape (structure)
//  that an object must follow.

interface _User {
  name: string;
  age: number;
  isAdmin: boolean;
}

// create a User type object 
const aayush: _User = {
  name: "Aayush",
  age: 23,
  isAdmin: true,
};

// Optional Properties 

interface User2 {
  name: string;
  age?: number; // optional
}

const u1: User2 = { name: "Pandey" }; // valid

// Readonly Properties

interface Settings {
  readonly version: string;
  darkMode: boolean;
}

const config: Settings = {
  version: "1.0.0",
  darkMode: true,
};

// config.version = "2.0.0"; // Error: Cannot assign to 'version'

//  Extending Interfaces

interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: number;
}

const e1: Employee = {
  name: "Aayush",
  employeeId: 101,
};