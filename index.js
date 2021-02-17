// 引入vue3的reactivity包
const  { effect, reactive } = require('@vue/reactivity');

// v1

// let a = 10;
// let b = a + 10;
// console.log(b);

// a = 20;
// b = a + 10;
// console.log(b);

// v2

// let a = 10;
// let b;
// function update() {
//   b = a + 10;
// }

// a = 20;
// update();

// v3
// a发生变更了，我想让b自动更新

// 声明一个响应式对象
let a = reactive({
  value: 1,
});
let b;
effect(() => {
  b = a.value + 10;
  console.log(b);
})

a.value = 30;

// 执行node index.js 打印出了 11/40；