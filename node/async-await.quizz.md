# Question 1

Convert the promise version of the multi-file loader over to using async/await

```js
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

const files = ["./files/demofile.txt", "./files/demofile.other.txt"];

async function doAsync() {
  let promises = files.map(name => readFile(name, { encoding: "utf8" }));
  let values = await Promise.all(promises);
  values.forEach(value => {
    console.log(value);
  });
}
doAsync();

// let promises = files.map(name => readFile(name, { encoding: "utf8" }));
// Promise.all(promises).then(values => {
//   // <-- Uses .all
//   console.log(values);
// });
```

# Question 2

Again convert the promise version of the multi-file loader over to using async/await but using a custom async iterator with the following syntax

node --harmony-async-iteration <file.js>

```js
const fileIterator = files => ({
  [Symbol.asyncIterator]: () => ({
    x: 0,
    next() {
      if (this.x >= files.length) {
        return Promise.resolve({
          done: true,
          value: this.x
        });
      }

      let y = this.x;
      this.x += 1;

      return Promise.resolve({
        done: false,
        value: y
      });
    }
  })
});

(async () => {
  for await (let x of fileIterator([
    "./files/demofile.txt",
    "./files/demofile.other.txt"
  ])) {
    console.log(x);
  }
})();
```
