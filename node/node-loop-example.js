console.log("start");
const interval = setInterval(() => {
  debugger;
  console.log("setInterval");
}, 0);

setTimeout(() => {
  debugger;
  console.log("setTimeout 1");
  Promise.resolve()
    .then(() => {
      debugger;
      console.log("promise 3");
    })
    .then(() => {
      debugger;
      console.log("promise 4");
    })
    .then(() => {
      setTimeout(() => {
        debugger;
        console.log("setTimeout 2");
        Promise.resolve()
          .then(() => {
            debugger;
            console.log("promise 5");
          })
          .then(() => {
            debugger;
            console.log("promise 6");
          })
          .then(() => {
            debugger;
            clearInterval(interval);
          });
      });
    });
});

Promise.resolve()
  .then(() => {
    debugger;
    console.log("promise 1");
  })
  .then(() => {
    debugger;
    console.log("promise 2");
  });

console.log("end");

//Quiz 1:

console.log("start");
const interval2 = setInterval(() => {
  console.log("setInterval 1");

  Promise.resolve()
    .then(() => {
      console.log("promise 1");
    })
    .then(() => {
      console.log("promise 2");
    })
    .then(() => {
      clearInterval(interval2);
    });
}, 0);
console.log("end");

//Quiz 2:

console.log("start");
const interval3 = setInterval(() => {
  console.log("setInterval 1");

  Promise.resolve()
    .then(() => {
      console.log("promise 1");
    })
    .then(() => {
      console.log("promise 2");
    })
    .then(() => {
      setImmediate(() => {
        console.log("setImmediate 1");
        Promise.resolve()
          .then(() => {
            console.log("promise 3");
          })
          .then(() => {
            console.log("promise 4");
            clearInterval(interval3);
          });
      });

      process.nextTick(() => {
        console.log("process.nextTick 1");
      });
    });
}, 0);
console.log("end");
