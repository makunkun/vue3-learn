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

// recative
// dep —> number string
// object -> key  -> dep

// 1.这个对象什么时候改变的
// object.a -> get
// object.a = 2 -> set

// vue2 defineproperty
// vue3 proxy

const targetMap = new Map();

function reactive(raw) {
  return new Proxy(raw, {
    get(target,key) {
      console.log(target, key);
      // key -> dep
      // dep 我们存储在哪里

      let depsMap = targetMap.get(target);
      if (!depsMap) {
        despMap = new Map();
        targetMap.set(target, depsMap)
      }
      let dep = depsMap.get(key);
      if (!dep) {
        dep = new Dep();
        despMap.set(key, dep);
      }
      dep.depend();
      // return target[key];
      return Reflect.get(target, key);
    },
    
  })
}

const user = reactive({
  age: 19,
})

user.age;
