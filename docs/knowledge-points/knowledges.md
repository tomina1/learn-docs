```txt
实例化挂载过程：
​	初始化工具方法、生命周期
​	挂载，执行 render 生成虚拟 DOM，并 update patch 虚拟变真实 DOM 结构，渲染到页面中

State 初始化顺序：inject -> props -> methods -> data -> computed -> watch -> provide

Created 和 Mounted 请求数据有啥区别：前者可能请求到了并渲染上。后者可能渲染后才请求到，触发了两次 patch

If 和 For 同时带来的问题：首先是受先后顺序影响，其次在满足条件时循环的情况下，会造成多余浪费，先循环后判断

首屏加载慢：
​	原因：延迟、资源大，渲染内容多
​	解决方法：分包、静态资源缓存、按需加载、图片压缩雪碧图整合、gzip、代码整理、ssr

新属性、数组下标赋值不触发响应式：$set、\$forcecUpdated()本身和插入插槽内容的子组件

组件和插件的区别：引入 / install安装、功能性封装 / 单例挂载到原型对象并提供 API

组件通信：Props、Emits、$parent、Attrs / Listeners、Provide / Inject、EventBus

$nextTick 顺序：Promise、MutationObserver、setImmediate、setTimeout

mixins 策略：
​	替换：props、methods、inject、computed
​	合并：data
​	队列：生命周期、watch
​	叠加(原型链)：component、directives、filters

key 作用：在复杂变动的时候根据它进行比较、强制刷新。没有则在同类型节点但内容不同时会多次操作 dom

是否缓存控制：判断 meta.keepAlive 来控制渲染在 keep-alive 里还是外面

自定义指令：防抖节流、图片懒加载

虚拟 Dom：HTML 转 AST 对象，业务处理，根据需求生成需要的代码
​	可跨端，定制化转换流程。
​	可以进行比较优化，减少 Dom 操作

vm 自身 Watcher：保存 vm._watchr = this。更改触发 render 并 patch
computed：
​	computed 是从 vm 拿的数据，computed / render  依赖数据
​	数据变 -> 通知 render，对依赖的 computed dirty = true，获取时重新计算

Diff：深度优先，同层比较
​	patch：没有新--销毁。没有旧--新建。同节点--patchVnode，否则销毁创建返回新 dom 元素
​	patchVnode：
​		不处理：新旧一样、异步占位符、静态节点(key, isCloned | isOnce)
​		节点：都有 childs，更新 childs。有新，则往旧 el 新增节点。有旧，删除所有 childs。都没有，清空文本内容
​		文本：不同则更改
​		hooks：prepatch -> update(backend 钩子 + 自身) -> postpatch。
​	updateChildren：
​		当前旧节点不存在：左右移动
​		新旧相同：patchVnode，并移动指针。前前、后后。前后、后前，并移动真实 dom 位置
​		复杂移动：生成 key Map，有就读取，没有就查找。找不到或不同就创建，继续 patchVnode，并清空旧 vnode移动到前面位置

为什么封装 axios：通用基础配置、规范返回格式，并对异常统一处理。拦截器顺序：请求：后 -- 前，响应：前 -- 后

取消请求：1.CancelToken.source() 作为 cancelToken 值传入，调用返回值取消。2. new CancelToken(cb) 回调接住方法

跨域：CORS、Proxy( proxy_pass )
404：location /  {    index  /data/dist/index.html;  }

Vue3 区别：composition api、组件 ( Teleport、Suspense )，响应处理、虚拟 Dom 实现、字面量事件缓存、ts

响应式
​	Vue2 ：新增/删除 属性、数组下标赋值、操作 不触发，还要递归访问代理，数据过大有性能问题
​	Vue3：对象基本都能代理，深对象采用懒转换

ES6

var、let、const 区别：变量提升、暂时性死区、块级作用域、重复声明、修改声明的变量

WeakMap：key 弱引用，value 会随着 key 销毁

迭代器：定义一个方法，返回带有 next 函数的对象，next 返回 value 和 done

Proxy：代理对象，进行拦截和自定义。Reflect：具有代理的所有方法，让方法调用结果变得合理，让对象操作变成函数行为

```