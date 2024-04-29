全局变量( stubGlobal )：IntersectionObserver、window.IntersectionObserver 访问

```javascript
vi.stubGlobal('IntersectionObserver', vi.fn(() =>({ var: 1 })))
```

自动模拟算法(Auto mock)

- 数组-清空
- 基础类型、集合 保持不变
- 对象、实例及其原型 将被深度克隆

虚拟模块( Virtual Modules )：插件形式

```javascript
export default {
  plugins: [
    {
      name: 'virtual-modules',
      resolveId(id) {
        if (id === '$app/forms')
          return 'virtual:$app/forms'
      }
    }
  ]
}
```

模拟请求( [Mock Service Worker](https://mswjs.io/) )

```javascript
import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { HttpResponse, graphql, http } from 'msw'

const data = []
export const restHandlers = () =>
  http.get('https://rest-endpoint.example/path/to/posts', () => HttpResponse.json(posts)),

const graphqlHandlers = () =>
  graphql.query('ListPosts', () => HttpResponse.json( { data, }))

const server = setupServer(restHandlers, graphqlHandlers)

// server 执行流程
// 在所有测试之前启动服务器
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
// 所有测试后关闭服务器
afterAll(() => server.close())
// 每次测试后重置处理程序 `对测试隔离很重要`
afterEach(() => server.resetHandlers())
```

类型测试：通过 tsc 或 vue-tsc

```javascript
// 不支持 动态测试名称和 test.each、test.runIf、test.skipIf、test.each、test.concurrent
import { assertType, expectTypeOf } from 'vitest'
import { mount } from './mount.js'

test('my types work properly', () => {
  expectTypeOf(mount).parameter(0).toMatchTypeOf<{ name: string }>() // 断言对应位置的参数类型
  assertType<T>(mount({ name: 42 })) // 判断类型
})
```

扩展测试上下文( test.extend )

```javascript
// 1.导入即自动完成扩展
export const myTest = test.extend({
  todos: ...,
  archive: ...,
})
import { myTest } from './my-test.js'

// 2. 直接在文件中通过 范类T 声明
const myTest = test.extend<MyFixtures>({ ... })
                                        
// 3. 全局声明
declare module 'vitest' {
  export interface TestContext {
    foo?: string
  }
}
```

配置测试环境：// @vitest-environment node | jsdom | happy-dom | edge-runtime

API Reference

```
mock Fn
dynamicImportSettled：等待所有导入模块
stubEnv / unstubAllEnvs ：更改/还原 环境变量
stubGlobal / unstubAllGlobals ：更改/还原 全局变量

utils
waitFor：等待回调直到成功、超时，如果出错、返回拒绝
waitUntil ：直到回调返回、超时，如果出错、返回拒绝
setConfig / resetConfig：更改、还原 当前测试文件配置

expect
toSatisfy：是否满足，及函数返回 true
unreachable：埋点报错

expectTypeOf
toEqualTypeOf：属性类型完全判断
toMatchTypeOf：判断子集管理，类似 toMatchObject
extract/exclude：提取/排除 一个类似的类型
returns/parameters/constructorParameters/instance：抹除函数类型，返回 返回值/参数类型/构造参数/实例类型
items：逐项类型判断
resolves：抹除异步
guards：提取保护值
asserts：提取断言值
toHaveProperty(Key)：是否存在属性，并返回对应类型

assertType<T>(val: T)：轻松对 T 和 val 进行断言
```

替换导入模块的实现，即拦截导入并替换实现

```javascript
mock(path: string, factory?: (importOriginal: () => unknown) => unknown) => void
unmock/doUnmock(path)：置顶/原位置 解除 mock 操作
spyOn<T, K extends keyof T>(object: T, method: K, accessType?: 'get' | 'set') => MockInstance

resetModules：重置缓存，重新评估导入。仅动态导入，顶层无法重新评估
```

