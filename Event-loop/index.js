// Synchronus Code 
console.log("A");
console.log("B");
console.log("C");

//  2. setTimeout (macrotask)

console.log("Start");

setTimeout(() => {
  console.log("Inside setTimeout");
}, 0);

console.log("End");

// Timeout is async. Callback goes to macrotask queue. Only runs after call stack is empty.

// 3. setInterval (repeats after delay)

setInterval(() => {
  console.log("Interval log");
}, 1000);

// Repeats every n ms by going into macrotask queue repeatedly.

// 4. Promise (microtask)

console.log("Start");

Promise.resolve().then(() => {
  console.log("Promise resolved");
});

console.log("End");

const orderPizza = new Promise((resolve, reject) => {
  
  setTimeout(() => {
    const pizzaReady = true;

    if (pizzaReady) {
      resolve("Pizza is ready!");
    } else {
      reject("Pizza was burned!");
    }
  }, 2000);
});

console.log("Customer: I want a pizza!");

orderPizza
  .then((message) => {
    console.log("Zomato:", message);
  })
  .catch((error) => {
    console.log("Zomato:", error);
  });

console.log("Customer: I’ll wait...");


// 5. async / await 

async function demo() {
  console.log("1");
  await Promise.resolve();
  console.log("2");
}

console.log("Start");
demo();
console.log("End");


// ----------------------------

console.log("1");

setTimeout(() => {
  console.log("2 - setTimeout");
}, 0);

setInterval(() => {
  console.log("3 - setInterval");  // will keep running
}, 1000);

Promise.resolve().then(() => {
  console.log("4 - promise");
});

async function func() {
  console.log("5 - inside async function");
  await null;
  console.log("6 - after await");
}

func();

console.log("7 - end");
