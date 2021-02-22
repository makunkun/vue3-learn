/**
 * @description diff算法
 * @param {object} n1 oldVnode
 * @param {object} n2 newVnode
 */
export function diff(n1, n2) {
  
  // 1. tag
  if (n1.tag !== n2.tag) {
    n1.el.replaceWith(document.createElement(n2.tag));
  } else {
    const el = (n2.el = n1.el);
    // 2. props
    // new: {id: "foo", class: "bar", a}
    // old: {id: "foo", class: "bar1", a, b}
    const { props: newProps } = n2;
    const { props: oldProps } = n1;

    // 值不一样，则改之
    if (newProps && oldProps) {
      Object.keys(newProps).forEach((key) => {
        const newVal = newProps[key];
        const oldVal = oldProps[key];
        if (newVal !== oldVal) {
          el.setAttribute(key, newVal);
        }
      });
    }
    // 老的有新的没有，则删除之
    if (oldProps) {
      Object.keys(oldProps).forEach((key) => {
        if (!newProps[key]) {
          el.removeAttribute(key);
        }
      });
    }
    // 3. children -> (暴力的解法)
      // 1.newChildren -> string; (oldChildren -> string/array;)
      // 2.newChildren -> array; (oldChildren -> string/array;)
      const { children: newChildren } = n2;
      const { children: oldChildren } = n1;
      
      if (typeof newChildren === 'string') {
        if (typeof oldChildren === 'string') {
          if (newChildren !== oldChildren) {
            el.textContent = newChildren;
          }
        } else if (Array.isArray(oldChildren)) {
          el.textContent = newChildren;
        }
      } else if (Array.isArray(newChildren)) {
        if (typeof oldChildren === 'string') {
          el.innerText = '';
          mountElement(n2, el)
        } else if (Array.isArray(oldChildren)) {

          // (暴力的解法,有待优化)
          // new [a, b, c, d, f]; old [a,b,e]
          const length = Math.min(newChildren.length, oldChildren.length);
          for (let index = 0; index < length; index++) {
            const newVnode = newChildren[index];
            const oldVnode = oldChildren[index];
            diff(oldVnode, newVnode);
          }
          if (newChildren.length > oldChildren.length) {
            // 创建节点
            for (let index = length; index < newChildren.length; index++) {
              const newVnode = newChildren[index];
              mountElement(newVnode, el)
            }
          }
          if (oldChildren.length > length) {
            // 删除节点
            for (let index = length; index < oldChildren.length; index++) {
              const oldVnode = oldChildren[index];
              oldVnode.el.parent.removeChild(oldVnode.el);
            }
          }
        }
      }
      
  }
}

// vdom -> dom
export function mountElement (vnode,container) {
  const { tag, props, children } = vnode;
  // tag
  const el = (vnode.el = document.createElement(tag));
  // props
  if (props) {
    for (const key in props) {
      const val = props[key]
      el.setAttribute(key, val);
    }
  }

  // children
  if (typeof children === 'string') {
    // 1.它可以接收一个字符串类型；
    const textNode = document.createTextNode(children);
    el.append(textNode);
  } else if (Array.isArray(children)) {
    // 2.它可以接收一个数组；
    children.forEach((v) => {
      mountElement(v,el)
    })
  }

  // 插入
  container.append(el);
}