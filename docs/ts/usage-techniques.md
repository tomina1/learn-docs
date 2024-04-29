```txt
类型声明，类似 as：extends number、& number

类型约束：infer U extends number，infer U extends Type |  Type\<infer U>

展示完整类型属性：类型 & 类型 可以包裹  type WalkProperty\<O\> = { [K in keyof O]: O[K] } 来强制遍历显示属性内容

数组常量转元组：as const，否则为 string[]

模板字符串 + 并集批量生成 联合类型(并集)：\`1 ${ 2 | 3 | 4 | 5 }`

数组成员转并集：A[number]

数组取出成员：A extends [infer O， ...infer L]，也可以 any string 等占位符校验

分布式：裸露的联合类型 extends 将会被分发，即 K extends K = (A extends K) | (B extends K) | (C extends K) 
			never 裸露在判断上会直接返回 never，需要 [never] 包装

取数组时如何保存当前取的下标：利用`收集容器数组的长度 A['length']`，去读取数组

any 判断：只有 any 包含 0。type IsAny\<T> = 0 extends T & 1 ? 1 : 2

K as 重命名为其他，但 K 还是原始值：{ [K in TupleKeys<T> as Capitalize<T[K]>]: N extends true ? K : T[K] }

keyof ClassA：只会获取到公共 key
```

字符串转数组：

```typescript
type toArray<S extends string | number, I extends string | number | null = null> = `${S}` extends `${infer A}${infer L}` ? [I extends null ? A : I, ...toArray<L, I>] : []
```

字符串长度 / 递归执行 n 次

```typescript
type StrLen<T extends string, A extends string[] = []> = T extends `${any}${infer L}` ? StrLen<L, [...A, 1]> : A['length']
```

完全比较：在未分布式时，会对正向对应位置比较，保持一致性

```typescript
type Equal<A, B> = (<P>() => P extends A ? 1 : 2) extends (<P>() => P extends B ? 1 : 2) ? true : false
```

增 / 删 - 可读/可选

````typescript
type ReadonlyOrOptional<T> = { -readonly [K in keyof T]-?: T[K] }
````

排除索引类型：P extends K  = false、 K extends P = true，即 K 为 P 子集

```typescript
type RemoveIdxSignature<T, P = PropertyKey> = { [K in keyof T as P extends K ? never : K extends P ? K : never]: T[K] };
```

查找下标

````typescript
type IndexOf<A extends any[], V, Len extends any[] = []> = A extends [infer O, ...infer L]
    ? O extends V ? Len['length'] : IndexOf<L, V, [...Len, 1]>
    : -1;
````

判断是否`存在` / `包含` / `去重`

```typescript
type Exclude<A extends any[], S extends string> = A extends [infer O, ...infer L]
? O extends S 
    ? Exclude<L, S>
    : [O, ...Exclude<L, S | O>]
: []
```

字面量获取基本类型：基本类型也为基本类型对象，获取值函数的返回类型

```typescript
type TypeOfLiteral<V> = V extends { valueOf: () => infer P } ? P : V
// 基本类型获取构造函数
type TypeConstructorToType<A> =  A extends (...args: any[]) => infer R ? R : never
```

联合类型改交叉类型：分发并 extends 函数表达式，使其对应位置上的 i 交叉

```typescript
type UnionToIntersection<U> = (U extends any ? (arg: U) => any : never) extends ((arg: infer I) => void)? I : never
```

加 / 减 / 填充字符串

```typescript
type TakeOneNum<N extends number | string> = NumToArr<ParseInt<N>> extends [any, ...infer L] ? L['length'] : 0
type AddOneNum<N extends number | string> = [...NumToArr<ParseInt<N>>, 1]['length']
type RepeatNum<N extends number | string, S extends string = ""> = `${N}` extends "1" ? S : `${S}${RepeatNum<TakeOneNum<N>, S>}`
```

