// 响应式库

// 当前正在收集的依赖
let currentEffect;
class Dep {
  constructor(val) {
    this.effects = new Set();
    this._val = val;
  }

  get value() {
    this.depend();
    return this._val;
  }

  set value(newVal) {
    this._val = newVal;
    this.notice();
  }

  // 1. 收集依赖
  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect) 
    }
  }

  // 2. 触发依赖
  notice() {
    // 触发一下我们之前收集到的依赖
    this.effects.forEach((effect) => {
      effect();
    });
  }
  
}

// ref -> 很像了
const dep = new Dep(10);

function effectWatch(effect) {
  // 收集依赖
  currentEffect = effect;
  effect();
  currentEffect = null;
}

let b;

effectWatch(() => {
  b = dep.value + 10;
  console.log(b);
});

// 值发生变更
dep._val = 20;
