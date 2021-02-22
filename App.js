// 引入vue3的reactivity包
import  { effectWatch, reactive } from './core/reactivity/index.js';
import { h } from './core/h.js';

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
effectWatch(() => {
  b = a.value + 10;
  console.log(b);
})

a.value = 30;

// vue3

export default {
  // template -> render
  render(context) {
    // 构建view = b

      // view -> 每次都需要重新创建
      // 要计算出最小的更新点 -> vdom
      // js -> diff;

      // reset
      // 创建一个dom节点所需要的 数据:
      // tag、 props、children
      // const div = document.createElement('div');
      // div.innerText = context.state.count;
      // return div;
      return h(context.state.tagName,
      {
        id: 'app-' + context.state.count,
        class: 'show-time',
      },
      // String(context.state.count),
      [h('p',null, String(context.state.count)), h('p',null, 'haha')]
      );
  },

  setup() {
    // a = 响应式数据
    const state = reactive({
      count: 0,
      tagName: 'div'
    });
    window.state = state;
    return {
      state
    };
  }
};
