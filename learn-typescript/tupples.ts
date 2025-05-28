// Tuples
// we use arrays in JS freely, but tuples in TypeScript are like fixed-size, ordered arrays with specific types for each index. Super useful for tightly-coupled data!

let user1: [string, number] = ["Aayush", 24];

/* user[0] must be a string.

user[1] must be a number.

Order matters.can't flip the values.*/

type User1= [name: string, age: number];

const user2: User1 = ["Pandey", 22];

// Cons or pitfalls of tupples that Push still works that means we can push another type also 

let tuple: [string, number] = ["hello", 42];
tuple.push(100); // 🤯 No compile error!
console.log(tuple); // ["hello", 42, 100]

//TypeScript allows it because tuples are technically arrays underneath.

// But tuple[2] will throw a type error if accessed. 
//console.log(tuple[2]); // Error: Tuple type '[string, number]' of length '2' has no element at index '2'.