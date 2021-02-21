// vdom -> dom
export function mountElement (vnode,container) {
  const { tag, props, children } = vnode;
  // tag
  const el = document.createElement(tag);
  // props
  if (props) {
    for (const key in props) {
      const val = props[key]
      el.setAttribute(key, val);
    }
  }

  // children
  // 1.它可以接收一个字符串类型；
  if (typeof children === 'string') {
    const textNode = document.createTextNode(children);
    el.append(textNode);
  } else if (Array.isArray(children)) {
    children.forEach((v) => {
      mountElement(v,el)
    })
  }
  // 2.它可以接收一个数组；

  // 插入
  container.append(el);
}