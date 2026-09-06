// C. Fetch API & Simulated I/O

// 21. Use fetch to get data from a public API (e.g.,
// https://jsonplaceholder.typicode.com/todos/1).

async function question21(): Promise<void> {
  const start21 = Date.now();

  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  const data = await response.json();

  const elapsed = Date.now() - start21;

  console.log("\n21.", data);
  console.log("Time:", elapsed, "ms");
}

// 22. Call the API multiple times and log the results.

async function question22(): Promise<void> {
  const start22 = Date.now();

  const responses = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/todos/1"),
    fetch("https://jsonplaceholder.typicode.com/todos/2"),
    fetch("https://jsonplaceholder.typicode.com/todos/3"),
  ]);

  const data = await Promise.all(responses.map((response) => response.json()));

  const elapsed = Date.now() - start22;

  console.log("\n22.", data);
  console.log("Time:", elapsed, "ms");
}

// 23. Write an async function that fetches a list of todos and filters out those that are not completed.

async function question23(): Promise<void> {
  const start23 = Date.now();

  const response = await fetch("https://jsonplaceholder.typicode.com/todos");

  const todos = await response.json();

  const completedTodos = todos.filter(
    (todo: { completed: boolean }) => todo.completed === true,
  );

  const elapsed = Date.now() - start23;

  console.log("\n23. Completed todos:");
  console.log(completedTodos);
  console.log("Time:", elapsed, "ms");
}

// 24. Write an async function postData() that sends a POST request to a test API.

async function postData(): Promise<void> {
  const start24 = Date.now();

  const data = {
    title: "Hello",
    body: "This is a test post",
    userId: 1,
  };

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  const elapsed = Date.now() - start24;

  console.log("\n24.", result);
  console.log("Time:", elapsed, "ms");
}

// 25. Create a function downloadFile that simulates downloading a file in 3 seconds and logs when done.

async function downloadFile(): Promise<void> {
  const start25 = Date.now();

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });

  const elapsed = Date.now() - start25;

  console.log("\n25. File downloaded successfully!");
  console.log("Time:", elapsed, "ms");
}

// 26. Use async/await with setTimeout to simulate a 5-second wait.

async function question26(): Promise<void> {
  const start26 = Date.now();

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });

  const elapsed = Date.now() - start26;

  console.log("\n26. 5-second wait completed!");
  console.log("Time:", elapsed, "ms");
}

// 27. Write a function fetchWithRetry(url, retries) that retries up to retries times if the API call fails.

async function fetchWithRetry(url: string, retries: number): Promise<unknown> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log(`Attempt ${attempt} failed.`);

      if (attempt === retries) {
        throw error;
      }
    }
  }

  throw new Error("Fetch failed");
}

async function question27(): Promise<void> {
  const start27 = Date.now();

  try {
    const data = await fetchWithRetry(
      "https://jsonplaceholder.typicode.com/todos/1",
      3,
    );

    const elapsed = Date.now() - start27;

    console.log("\n27.", data);
    console.log("Time:", elapsed, "ms");
  } catch (error) {
    const elapsed = Date.now() - start27;

    if (error instanceof Error) {
      console.log("\n27. Error:", error.message);
    } else {
      console.log("\n27. Error:", error);
    }

    console.log("Time:", elapsed, "ms");
  }
}

// 28. Write an async function batchProcess() that processes 5 async tasks at once (use Promise.all).

async function batchProcess(): Promise<void> {
  const start28 = Date.now();

  const tasks = [
    new Promise<string>((resolve) => {
      setTimeout(() => resolve("Task 1 done"), 1000);
    }),

    new Promise<string>((resolve) => {
      setTimeout(() => resolve("Task 2 done"), 1000);
    }),

    new Promise<string>((resolve) => {
      setTimeout(() => resolve("Task 3 done"), 1000);
    }),

    new Promise<string>((resolve) => {
      setTimeout(() => resolve("Task 4 done"), 1000);
    }),

    new Promise<string>((resolve) => {
      setTimeout(() => resolve("Task 5 done"), 1000);
    }),
  ];

  const results = await Promise.all(tasks);

  const elapsed = Date.now() - start28;

  console.log("\n28.", results);
  console.log("Time:", elapsed, "ms");
}

// 29. Write an async function queueProcess() that processes tasks sequentially in a queue.

async function queueProcess(): Promise<void> {
  const start29 = Date.now();

  const tasks = [1000, 1000, 1000, 1000, 1000];

  for (let i = 0; i < tasks.length; i++) {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, tasks[i]);
    });

    console.log(`29. Task ${i + 1} done`);
  }

  const elapsed = Date.now() - start29;

  console.log("Time:", elapsed, "ms");
}

// 30. Use async/await + Promise.allSettled() to handle multiple API calls and display their success/failure status.

async function question30(): Promise<void> {
  const start30 = Date.now();

  const urls = [
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/2",
    "https://invalid-url-example.com/test",
  ];

  const results = await Promise.allSettled(
    urls.map(async (url) => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      return await response.json();
    }),
  );

  const elapsed = Date.now() - start30;

  console.log("\n30. Results:");

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`API ${index + 1}: SUCCESS`, result.value);
    } else {
      console.log(`API ${index + 1}: FAILED`, result.reason);
    }
  });

  console.log("Time:", elapsed, "ms");
}

// question21();
// question22();
// question23();
// postData();
// downloadFile();
// question26();
// question27();
// batchProcess();
// queueProcess();
question30();
