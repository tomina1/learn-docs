全局设定

```
beforeAll / beforeEach / afterEach / afterAll (fn, timeout)：所有前后/开始前后钩子、超时时间 = default 5s
describe(name, fn)：测试分类，可嵌套
describe.each(tableData)(name, fn, timeout)：绑定二维数据源，依次遍历调用测试

describe.only(name, fn)：运行指定 describe 块，其他会跳过
describe.only.each(table)(name, fn)

describe.skip(name, fn)：注释代码，不会执行
describe.skip.each(table)(name, fn)

// 测试单例
test(name, fn, timeout)：单个测试
alias：it(name, fn, timeout)
test.each(table)(name, fn, timeout)：批量数据进行测试
alias：it.each(table)(name, fn) 和 it.each`table`(name, fn)

test.failing(name, fn, timeout)：失败测试，反向的
alias：it.failing(name, fn, timeout)
test.failing.each(name, fn, timeout)
alias：it.failing.each(table)(name, fn) and it.failing.each`table`(name, fn)

test.only.failing(name, fn, timeout)
test.skip.failing(name, fn, timeout)
test.only(name, fn, timeout)
test.only.each(table)(name, fn)
test.skip(name, fn)
test.skip.each(table)(name, fn)
test.todo(name)：将要计划写的测试用例说明
```

断言

```
expect(val)：配合匹配器函数来断言某个值

not：取反方向
resolves：包裹处理 promise，拒绝则失败。该判断为异步，结合 async/await 使用
rejects：包裹异常 promise，成功则失败。也为异步

toBe(val)：检查 元值、对象实例地址值 是否相等
toHaveBeenCalled：检查是否被 调用
toBeCalled
toHaveBeenCalledTimes：检查 调用次数
toBeCalledTimes
toHaveBeenCalledWith/toHaveBeenLastCalledWith：检查 调用/最后调用 参数一致性
toBeCalledWith/lastCalledWith
toHaveBeenNthCalledWith(nCall, arg1, ...)：检查第 n 次调用的参数
nthCalledWith

toHaveReturned：有返回值，且不抛错
toReturn
toHaveReturnedTimes(num)：返回次数
toReturnTimes
toHaveReturnedWith(val)：检查返回值
toReturnWith
toHaveLastReturnedWith(val)：最后一次返回值
lastReturnedWith
toHaveNthReturnedWith(nCall, val)：检查第 n 次返回值
nthReturnedWith
toHaveLength(number)：检查 arr | str 长度大小
toHaveProperty(keyPath: str | str[], val?)：判断是否有属性、值比较，支持点深度写法
toBeCloseTo(num, numDigits)：数字以 n 精度判断
toBeDefined：检查返回值为 not undefined
toBeFalsy：检查是否为假值，null | undefined | "" | false | 0 | NaN
toBeTruthy：检查是否为真值
toBeGreaterThan/toBeGreaterThanOrEqual/toBeLessThan/toBeLessThanOrEqual(num | bigInt)：>、>=、<、<= 值
toBeInstanceOf(Class)：类似 instanceof
toBeNull：类似 toBe(null)，更加友好
toBeUndefined：类似 toBe(undefined)
toBeNaN：类似 toBe(NaN)
toContain(item | str)：是否包含 数组项/字符
toContainEqual(item)：是否包含特定结构和值的项，item 描述结构
toEqual(val)：递归比较其所有属性是否相等。忽略 未定义属性、数组项/数组稀疏性/对象类型不匹配的对象键
toStrictEqual：严格比较 { a:undefined } != {}
toMatch(reg | str)：对字符串内容进行匹配
toMatchObject(obj | obj[])：对象属性匹配、在数组对应位置上的对象属性匹配
toMatchSnapshot(propertyMatchers?, hint?)
toMatchInlineSnapshot(propertyMatchers?, inlineSnapshot)
toThrow(error?)：抛出的错误，reg | str | err 匹配 err msg 内容是否包含，err class 则判断是否同一类型
toThrowErrorMatchingSnapshot(hint?)
toThrowErrorMatchingInlineSnapshot(inlineSnapshot)
```

不对称 - 匹配器

```
toEqual / toBeCalledWith 里使用
expect.anything()：表示任何非 null / undefined 的值
expect.any(constructor)：匹配任何由构造器创建的对象，包括原始值类型
expect.arrayContaining(expectedArr)：匹配任何预期 数组 的子集，及包含预期所有 内容
expect.not.arrayContaining(expectedArr)
expect.stringMatching(string | regexp)：创建匹配器，匹配字符串。arrayContaining(stringMatcher[]) 匹配对应位置
expect.not.stringMatching(string | regexp)

expect.closeTo(number, numDigits?)：创建数字用于精度丢失比较，仅比较数值时用 toBeCloseTo
expect.objectContaining(object)：匹配任何预期 对象 的子集，及包含预期所有 属性
expect.not.objectContaining(object)
expect.stringContaining(string)：是否包含所需的字符串
expect.not.stringContaining(string)
```

断言次数

```
expect.assertions(number)：检查是否断言了 n 次
expect.hasAssertions()：断言 >= 1 次以上
```

模拟函数：`mockFn`

```
getMockName：返回通过调用 mockName 设置的模拟名称字符串
mock.calls(arr[][])：多次调用的参数集合
mock.results：多次调用返回的集合 { type: "return" | "throw", value: Result | Error }[]
mock.instances：实例化对象集合
mock.contexts：调用的 thisCtx 集合
mock.lastCall：最后一次调用
mockClear：清空 mock.calls/results/instances/contexts，并重置、替换原有 mockFn.mock
mockReset：执行 mockClear，并替换 mock 为 NOOP
mockRestore：执行 mockReset，并还原 ( 非 mock ) 实现
mockImplementation(fn)：用作 mock 实现函数，但自身还会记录等逻辑
mockImplementationOnce(fn)：注册单次不同实现，并在执行后跳过
mockName(name)：用来在错误时标记出错位置名
mockReturnThis：类似 jest.fn(function () { return this; });
mockReturnValue(val)：设置返回值，在调用时返回。类似 jest.fn().mockImplementation(() => value)
mockReturnValueOnce(val)
mockResolvedValue(val)：设置异步返回值。类似 jest.fn().mockImplementation(() => Promise.resolve(value))
mockResolvedValueOnce(val)
mockRejectedValue(val)
mockRejectedValueOnce(val)
withImplementation(fn, cb)：临时捆绑回调时的 mock 和 cb

spyOn()
Spied<Source>
```

Jest 对象

```
方法
disableAutomock/enableAutomock：关闭/开启 自动模拟模块请求并 mock，返回真实版本
createMockFromModule(url)：导入模块 mock datas。函数：NOOP、class：模仿、对象：深度克隆并 mock、数组：[]、值：相同值
mock(moduleName, factory?, options?：{ virtual： "创建虚拟模块"， shallow: true })：url，自动 mock 为 NOOP 函数。实则拦截代理模块导入的内容为实现。先替换后导入
factory 自定义 imp 实现
Mock<T>：fn 的实现类型
mocked(source, options?)
Mocked<T>、MockedClass<T>、MockedFunction<T>、MockedObject<T>：包裹对象后的 mock 类型
unmock(moduleName)：不会返回一个 mocked 的版本模块
dontMock(moduleName)：避免置顶
deepUnmock(moduleName)：不返回被 mocked 的版本及其依赖项
doMock(moduleName, factory, options)：避免 mock 调用置顶。用 import 必须声明 __esModule： true，使用 import() 不会置顶
setMock(moduleName, moduleExports)：手动 mock，已适合当前所讨论的模块
requireActual(moduleName)：导入真实 module，结合 mock 实现代理和扩展
requireMock(moduleName)：返回 mock module
resetModules：重置模块注册表-所有必需模块的缓存。返回一个新模块而非命中缓存
isolateModules(fn)：为 fn 的调用提供沙箱隔离，比 resetModules 更直接
isolateModulesAsync(fn)：为 async fn 的调用提供沙箱隔离

模拟函数
fn<T>(implementation?)：传入实现推导，或定义实现类型。创建新的 mock 函数
isMockFunction(fn)：是否为 mock fn
replaceProperty(object, propertyKey, value)：替换存在属性并返回新值，可以在 afterEach 中使用 restoreAllMocks 重置
Replaced<T>：调用 replaceProperty 后返回的实体类型
spyOn(object, methodName, accessType?：'get' | 'set' )：监视方法，返回一个 mock fn 并替换实现。即在其他文件依赖时替换
Replaced<Source>
clearAllMocks：相当于对于每个 mock fn 调用 mockClear
resetAllMocks：相当于对于每个 mock fn 调用 mockReset
restoreAllMocks：对每个函数 mockRestore，属性 restore。适用于 spyOn、replaceProperty 操作

假的定时器
useFakeTimers(fakeTimersConfig?)：假的定时器。代替 Date、per.now、queueMicrotask、setImmediate、clearImmediate setInterval、clearInterval、setTimeout、clearTimeout
useRealTimers
runAllTicks：耗尽队列中及其中产生的微任务
runAllTimers：耗尽队列中及其中产生的宏任务
runAllTimersAsync新/runAllImmediates旧：假定时器可用
advanceTimersByTime/advanceTimersByTimeAsync新(msToRun)：所有计时器都提取 msToRun 毫秒
runOnlyPendingTimers：清空宏任务等待队列，不包含额外产生
runOnlyPendingTimersAsync新：promise 队列，类似上个
advanceTimersToNextTimer(steps)：计时器提前所需的毫秒，以便只运行下一个超时/间隔
advanceTimersToNextTimerAsync(steps)新：如上，promise
clearAllTimers：清空队列所有挂起的计时器
getTimerCount：返回假计时器数量
now
setSystemTime(now?: number | Date)新：设置系统时间
getRealSystemTime新：真实事件

Misc
getSeed：获取种子值。及类似随机数
isEnvironmentTornDown：测试环境被破坏，则 false
retryTimes(numRetries, options?：{logErrorsBeforeRetry: true})：执行 n 次失败测试，直到结束、n 次
setTimeout(timeout)：设置所有 测试、挂钩 的超时时间
```

