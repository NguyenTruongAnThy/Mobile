// B. ASYNC / AWAIT

function simulateTask(time: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Task done");
    }, time);
  });
}

function failTask(): Promise<never> {
  return new Promise<never>((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Something went wrong"));
    }, 1000);
  });
}

// 11. Convert Exercise 1 into async/await.
//     Create a Promise that returns the string
//     "Hello Async" after 2 seconds.

async function question11(): Promise<void> {
  const start11 = Date.now();

  const promise1 = new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Hello Async");
    }, 2000);
  });

  const result = await promise1;
  const elapsed = Date.now() - start11;

  console.log("\n11.", result);
  console.log("Time:", elapsed, "ms");
}

// 12. Write an async function that calls
//     simulateTask(2000) and logs the result.

async function question12(): Promise<void> {
  const start12 = Date.now();

  const result = await simulateTask(2000);
  const elapsed = Date.now() - start12;

  console.log("\n12.", result);
  console.log("Time:", elapsed, "ms");
}

// 13. Handle errors using try/catch with async/await.

async function question13(): Promise<void> {
  const start13 = Date.now();

  try {
    await failTask();
  } catch (error) {
    const elapsed = Date.now() - start13;

    if (error instanceof Error) {
      console.log("\n13.", error.message);
    } else {
      console.log("\n13. Error:", error);
    }

    console.log("Time:", elapsed, "ms");
  }
}

// 14. Write an async function that takes a number,
//     waits 1 second, and returns the number × 3.

async function multiplyByThree(number: number): Promise<number> {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  return number * 3;
}

async function question14(): Promise<void> {
  const start14 = Date.now();

  const result = await multiplyByThree(5);
  const elapsed = Date.now() - start14;

  console.log("\n14.", result);
  console.log("Time:", elapsed, "ms");
}

// 15. Call multiple async functions sequentially using await.

async function question15(): Promise<void> {
  const start15 = Date.now();

  const result1 = await simulateTask(1000);
  console.log("\n15. Task 1:", result1);

  const result2 = await simulateTask(1000);
  console.log("15. Task 2:", result2);

  const result3 = await simulateTask(1000);
  console.log("15. Task 3:", result3);

  const elapsed = Date.now() - start15;
  console.log("Time:", elapsed, "ms");
}

// 16. Call multiple async functions in parallel
//     using Promise.all().

async function question16(): Promise<void> {
  const start16 = Date.now();

  const results = await Promise.all([
    simulateTask(1000),
    simulateTask(2000),
    simulateTask(1500),
  ]);

  const elapsed = Date.now() - start16;

  console.log("\n16.", results);
  console.log("Time:", elapsed, "ms");
}

// 17. Use for await...of to iterate over
//     an array of Promises.

async function question17(): Promise<void> {
  const start17 = Date.now();

  const promises = [simulateTask(1000), simulateTask(2000), simulateTask(1500)];

  let count = 1;

  for await (const result of promises) {
    console.log(`17. Task ${count}:`, result);
    count++;
  }

  const elapsed = Date.now() - start17;
  console.log("Time:", elapsed, "ms");
}

// 18. Write an async function fetchUser(id)
//     that simulates an API call
//     (resolves a user object after 1 second).

async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  return {
    id: id,
    name: `User ${id}`,
  };
}

async function question18(): Promise<void> {
  const start18 = Date.now();

  const user = await fetchUser(1);
  const elapsed = Date.now() - start18;

  console.log("\n18.", user);
  console.log("Time:", elapsed, "ms");
}

// 19. Create an async function fetchUsers(ids: number[])
//     that calls fetchUser for each ID.

async function fetchUsers(
  ids: number[],
): Promise<{ id: number; name: string }[]> {
  const users: { id: number; name: string }[] = [];

  for (const id of ids) {
    const user = await fetchUser(id);
    users.push(user);
  }

  return users;
}

async function question19(): Promise<void> {
  const start19 = Date.now();

  const users = await fetchUsers([1, 2, 3]);
  const elapsed = Date.now() - start19;

  console.log("\n19.", users);
  console.log("Time:", elapsed, "ms");
}

// 20. Add a timeout:
//     if the API call takes more than 2 seconds,
//     throw an error.

async function fetchUserWithTimeout(
  id: number,
): Promise<{ id: number; name: string }> {
  const apiCall = fetchUser(id);

  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error("API call timed out"));
    }, 2000);
  });

  return Promise.race([apiCall, timeout]);
}

async function question20(): Promise<void> {
  const start20 = Date.now();

  try {
    const user = await fetchUserWithTimeout(1);
    const elapsed = Date.now() - start20;

    console.log("\n20.", user);
    console.log("Time:", elapsed, "ms");
  } catch (error) {
    const elapsed = Date.now() - start20;

    if (error instanceof Error) {
      console.log("\n20. Error:", error.message);
    } else {
      console.log("\n20. Error:", error);
    }

    console.log("Time:", elapsed, "ms");
  }
}

// question11();
// question12();
// question13();
// question14();
// question15();
// question16();
question17();
// question18();
// question19();
// question20();
