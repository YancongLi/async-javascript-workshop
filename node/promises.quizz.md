# Question 1 - (10min)

Create a promise version of the async readFile function

```js
const fs = require("fs");

function readFile(filename, encoding) {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
  return promise;
}
readFile("./files/demofile111.txt", "utf-8").then(
  res => console.log("File read: ", res),
  err => console.log("Read failed: ", err)
);
```

# Question 2

Load a file from disk using readFile and then compress it using the async zlib node library, use a promise chain to process this work.

```js
const fs = require("fs");
const zlib = require("zlib");

function zlibPromise(data) {
  return new Promise((resolve, reject) => {
    zlib.gzip(data, (error, result) => {
      if (error) {
        console.error(error);
        return reject(error);
      }
      resolve(result);
    });
  });
}

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

readFile("./files/demofile.txt", "utf-8") // --> Load it then zip it and then print it to screen
  .then(data => {
    return zlibPromise(data);
  })
  .then(zipRes => {
    console.log(zipRes);
  })
  .catch(err => {
    console.error("Error ->", err);
  });
```

# Question 3

Convert the previous code so that it now chains the promise as well.

<!-- see Q2 -->

# Question 4

Convert the previous code so that it now handles errors using the catch handler

<!-- see Q2 -->

# Question 5

Create some code that tries to read from disk a file and times out if it takes longer than 1 seconds, use `Promise.race`

```js
function readFileFake(sleep) {
  if (sleep < 1000) {
    return new Promise((resolve, reject) => {
      setTimeout(reject, sleep, "timeout");
    });
  }
  return new Promise(resolve => setTimeout(resolve, sleep));
}

let promiseList = [readFileFake(900), readFileFake(2000), readFileFake(3000)];

Promise.race(promiseList)
  .then(res => console.log(res))
  .catch(err => console.error("Error is: ", err));

//readFileFake(5000);
// This resolves a promise after 5 seconds, pretend it's a large file being read from disk
```

# Question 6

Create a process flow which publishes a file from a server, then realises the user needs to login, then makes a login request, the whole chain should error out if it takes longer than 1 seconds. Use `catch` to handle errors and timeouts.

```js
function authenticate() {
  console.log("Authenticating");
  return new Promise(resolve => setTimeout(resolve, 2000, { status: 200 }));
}

function publish() {
  console.log("Publishing");
  return new Promise(resolve => setTimeout(resolve, 2000, { status: 403 }));
}

function timeout(sleep) {
  return new Promise((resolve, reject) => setTimeout(reject, sleep, "timeout"));
}

function safePublish() {
  return publish().then(res => {
    if (res.status === 403) {
      return authenticate();
    }
  });
}

Promise.race([safePublish(), timeout(3000)])
  .then(res => {
    if (res.status === 200) {
      console.log("Access granted, published");
    }
  })
  .catch(err => {
    if (err === "timeout") {
      console.log("Timeout Error: " + err);
    } else {
      console.error("Other error: " + err);
    }
  });
```
