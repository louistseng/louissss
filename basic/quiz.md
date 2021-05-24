

(1) 請問下列程式執行後的結果為何？為什麼？
console.log("start");

(function () {
    console.log("IIFE");
    setTimeout(function () {
    console.log("Timeout");
  }, 1000);
})();

console.log("end");
start
IIFE
end 
timeout (timeout設定了一秒，因此會先被放進 webapis -> event loop -> task queue 再被執行)

(2) 請問下列程式執行的結果為何？為什麼？
console.log("start");

(function () {
    console.log("IIFE");
    setTimeout(function () {
    console.log("Timeout");
  }, 0);
})();

console.log("end");
start
IIFE 
end 
timeout (有設定timeout，會先被放進 webapis -> event loop -> task queue 再被執行)

(3) 請問下列程式執行的結果為何？為什麼？
const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
  console.log("foo");
  bar();
  baz();
};

foo();
會先顯示foo，才會顯示bar、baz

(4) 請問下列程式執行的結果為何？為什麼？

const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
  console.log("foo");
  setTimeout(bar, 0);
  baz();
};

foo();
foo
bar
baz