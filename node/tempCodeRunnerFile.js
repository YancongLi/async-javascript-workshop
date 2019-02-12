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