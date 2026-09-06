// 1. Create a Promise that returns the string
//    "Hello Async" after 2 seconds.

const start1 = Date.now();

const promise1 = new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve("Hello Async");
  }, 2000);
});

promise1.then((result) => {
  const elapsed = Date.now() - start1;

  console.log("\n1.", result);
  console.log("Time:", elapsed, "ms");
});

// 2. Write a function that returns a Promise
//    resolving with the number 10 after 1 second.

const start2 = Date.now();

function getNumber(): Promise<number> {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(10);
    }, 1000);
  });
}

getNumber().then((result) => {
  const elapsed = Date.now() - start2;

  console.log("\n2.", result);
  console.log("Time:", elapsed, "ms");
});

// 3. Write a function that rejects a Promise
//    with the error "Something went wrong" after 1 second.

const start3 = Date.now();

function failTask(): Promise<never> {
  return new Promise<never>((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Something went wrong"));
    }, 1000);
  });
}

failTask().catch((error) => {
  const elapsed = Date.now() - start3;

  console.log("\n3.", error.message);
  console.log("Time:", elapsed, "ms");
});

// 4. Use .then() and .catch() to handle
//    a Promise that returns a random number.

const start4 = Date.now();

function getRandomNumber(): Promise<number> {
  return new Promise<number>((resolve) => {
    const randomNumber = Math.random();
    resolve(randomNumber);
  });
}

getRandomNumber()
  .then((result) => {
    const elapsed = Date.now() - start4;

    console.log("\n4. Random number:", result);
    console.log("Time:", elapsed, "ms");
  })
  .catch((error) => {
    const elapsed = Date.now() - start4;

    console.log("\n4. Error:", error);
    console.log("Time:", elapsed, "ms");
  });

// 5. Create a function simulateTask(time)
//    that returns a Promise resolving with "Task done" after time ms.

const start5 = Date.now();

function simulateTask(time: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Task done");
    }, time);
  });
}

simulateTask(2000).then((result) => {
  const elapsed = Date.now() - start5;

  console.log("\n5.", result);
  console.log("Time:", elapsed, "ms");
});

// 6. Use Promise.all() to run 3 simulated
//    Promises in parallel and print the result.

const start6 = Date.now();

const task1 = simulateTask(1000);
const task2 = simulateTask(2000);
const task3 = simulateTask(1500);

Promise.all([task1, task2, task3]).then((results) => {
  const elapsed = Date.now() - start6;

  console.log("\n6.", results);
  console.log("Time:", elapsed, "ms");
});

// 7. Use Promise.race() to return whichever
//    Promise resolves first.

const start7 = Date.now();

const raceTask1 = simulateTask(3000);
const raceTask2 = simulateTask(1000);
const raceTask3 = simulateTask(2000);

Promise.race([raceTask1, raceTask2, raceTask3]).then((result) => {
  const elapsed = Date.now() - start7;

  console.log("\n7.", result);
  console.log("Time:", elapsed, "ms");
});

// 8. Create a Promise chain:
//    square the number 2,
//    then double it,
//    then add 5.

const start8 = Date.now();

Promise.resolve(2)
  .then((number) => {
    return number * number;
  })
  .then((number) => {
    return number * 2;
  })
  .then((number) => {
    return number + 5;
  })
  .then((result) => {
    const elapsed = Date.now() - start8;

    console.log("\n8.", result);
    console.log("Time:", elapsed, "ms");
  });

// 9. Write a Promise that reads an array
//    after 1 second and filters even numbers.

const start9 = Date.now();

function getEvenNumbers(): Promise<number[]> {
  return new Promise<number[]>((resolve) => {
    setTimeout(() => {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

      const evenNumbers = numbers.filter((number) => {
        return number % 2 === 0;
      });

      resolve(evenNumbers);
    }, 1000);
  });
}

getEvenNumbers().then((result) => {
  const elapsed = Date.now() - start9;

  console.log("\n9.", result);
  console.log("Time:", elapsed, "ms");
});

// 10. Use .finally() to log "Done" when
//     a Promise finishes (success or failure).

const start10 = Date.now();

const finalTask = new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve("Task completed");
  }, 1000);
});

finalTask
  .then((result) => {
    const elapsed = Date.now() - start10;

    console.log("\n10.", result);
    console.log("Time:", elapsed, "ms");
  })
  .catch((error) => {
    const elapsed = Date.now() - start10;

    console.log("\n10. Error:", error);
    console.log("Time:", elapsed, "ms");
  })
  .finally(() => {
    console.log("\nDone");
  });
