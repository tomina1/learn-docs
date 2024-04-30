# ESTree
**AST 结构树(2015-2020 未完成)类型集合**

## 脚本( 程序 )

```typescript
interface Program { 
    sourceType: "script" | "module";
    body: (Statement | ImportOrExportDeclaration)[];
}
```

## 函数

```typescript
interface Funtion {
    generator: boolean;
    // 异步标识
    async: boolean;
}
```

## ForOf 声明表达式

```typescript
interface ForOfStatement {
    type: "ForOfStatement";
    await: boolean;
}
```

## 声明

```typescript
interface VariableDeclaration {
    kind: "var" | "let" | "const";
}
```

## 表达式

```typescript
interface Super <: Node {
    type: "Super";
}
// 调用表达式
interface CallExpression { 
    callee: Expression | Super;
    arguments: [ Expression | SpreadElement ];
}
// e.g., [head, ...iter, tail], f(head, ...iter, ...tail)
interface SpreadElement <: Node { 
    type: "SpreadElement";
    argument: Expression;
}
// 对象 e.g., {a: 1, ...obj, b: 2}
interface ObjectExpression {
    properties: [ Property | SpreadElement ];
}
// 数组
interface ArrayExpression { 
    elements: [ Expression | SpreadElement | null ];
}
// new
interface NewExpression { 
    arguments: [ Expression | SpreadElement ];
}
// 赋值表达式
interface AssignmentExpression { 
    left: Pattern;
}
// 对象属性
interface Property { 
    key: Expression;
    method: boolean;
    shorthand: boolean;
    computed: boolean;
}
// 箭头表达式
interface ArrowFunctionExpression <: Function, Expression { 
    type: "ArrowFunctionExpression";
    body: FunctionBody | Expression;
    expression: boolean;
    generator: false;
}
// yield* 表达式
interface YieldExpression <: Expression { 
    type: "YieldExpression";
    argument: Expression | null;
    delegate: boolean;
}
```

## 模板文字

```typescript
// 模板字面量
interface TemplateLiteral <: Expression {
    type: "TemplateLiteral";
    quasis: [ TemplateElement ];
    expressions: [ Expression ];
}
// 标记的模板表达式
interface TaggedTemplateExpression <: Expression {
    type: "TaggedTemplateExpression";
    tag: Expression;
    quasi: TemplateLiteral;
}
// 模板元素
interface TemplateElement <: Node {
    type: "TemplateElement";
    tail: boolean;
    value: {
        cooked: string | null; // 如果模板文本被标记，并且文本的转义无效，则可能为 null
        raw: string;
    };
}
```

## 模式。解构分配

```typescript
// 属性分配
interface AssignmentProperty <: Property {
    type: "Property"; // inherited
    value: Pattern;
    kind: "init";
    method: false;
}
// 对象
interface ObjectPattern <: Pattern {
    type: "ObjectPattern";
    properties: [ AssignmentProperty | RestElement ];
}
// 数组
interface ArrayPattern <: Pattern {
    type: "ArrayPattern";
    elements: [ Pattern | null ];
}
// 剩余
interface RestElement <: Pattern {
    type: "RestElement";
    argument: Pattern;
}
// 分配模式
interface AssignmentPattern <: Pattern {
    type: "AssignmentPattern";
    left: Pattern;
    right: Expression;
}
```

## Class

```typescript
// 类
interface Class <: Node {
    id: Identifier | null;
    superClass: Expression | null;
    body: ClassBody;
}
// 私有标识符. e.g. #a, name = a
interface PrivateIdentifier <: Node {
    type: "PrivateIdentifier";
    name: string;
}
// 用 in 判断私有变量可以是 #
extend interface BinaryExpression <: Expression {
    left: Expression | PrivateIdentifier;
}
// 类内容
interface ClassBody <: Node {
    type: "ClassBody";
    body: [ MethodDefinition | PropertyDefinition | StaticBlock ];
}
// 类属性
interface PropertyDefinition <: Node {
    type: "PropertyDefinition";
    key: Expression | PrivateIdentifier; // key = PrivateIdentifier,则 computed = false
    value: Expression | null;
    computed: boolean;
    static: boolean;
}
// 类方法
interface MethodDefinition <: Node {
    type: "MethodDefinition";
    key: Expression | PrivateIdentifier; // key = PrivateIdentifier,则 computed = false, kind != constructor
    value: FunctionExpression;
    kind: "constructor" | "method" | "get" | "set";
    computed: boolean;
    static: boolean;
}
// 类型声明
interface ClassDeclaration <: Class, Declaration {
    type: "ClassDeclaration";
    id: Identifier;
}
// 类表达式
interface ClassExpression <: Class, Expression {
    type: "ClassExpression";
}
// new.target 元数据. 也表示 import.meta
interface MetaProperty <: Expression {
    type: "MetaProperty";
    meta: Identifier;
    property: Identifier;
}
```

## 模块

```typescript
// 导入、导出 声明
interface ImportOrExportDeclaration <: Node { }
// 导入、导出 的标识符
interface ModuleSpecifier <: Node {
    local: Identifier; // 当前作用域名。导入名、导入别名
}
```

## 导入

```typescript
// 导入声明
interface ImportDeclaration <: ImportOrExportDeclaration {
    type: "ImportDeclaration";
    specifiers: [ ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier ];
    source: Literal;
}
// 变量导入标识符。import { A } from "B"
interface ImportSpecifier <: ModuleSpecifier {
    type: "ImportSpecifier";
    imported: Identifier | Literal; // 导入名
}
// 默认标识符。 import A from "B"
interface ImportDefaultSpecifier <: ModuleSpecifier {
    type: "ImportDefaultSpecifier";
}
// 命名空间标识符。 import * as A from "B"
interface ImportNamespaceSpecifier <: ModuleSpecifier {
    type: "ImportNamespaceSpecifier";
}
// 动态导入. import(source)
interface ImportExpression <: Expression {
  type: "ImportExpression";
  source: Expression;
}
```

## 导出

```typescript
// 命名导出
interface ExportNamedDeclaration <: ImportOrExportDeclaration {
    type: "ExportNamedDeclaration";
    declaration: Declaration | null;
    specifiers: [ ExportSpecifier ];
    source: Literal | null;
}
// 导出标识符。export｛bar as foo｝= exported = foo, local = bar
interface ExportSpecifier <: ModuleSpecifier {
    type: "ExportSpecifier";
    local: Identifier | Literal; // 父节点 source 不为 null，则 local = Literal
    exported: Identifier | Literal;
}

// 默认导出
interface ExportDefaultDeclaration <: ImportOrExportDeclaration {
    type: "ExportDefaultDeclaration";
    declaration: AnonymousDefaultExportedFunctionDeclaration | FunctionDeclaration | AnonymousDefaultExportedClassDeclaration | ClassDeclaration | Expression;
}
// 默认匿名导出 fn
interface AnonymousDefaultExportedFunctionDeclaration <: Function {
    type: "FunctionDeclaration";
    id: null;
}
// 默认匿名导出 class
interface AnonymousDefaultExportedClassDeclaration <: Class {
    type: "ClassDeclaration";
    id: null;
}

// 导出所有
interface ExportAllDeclaration <: ImportOrExportDeclaration {
    type: "ExportAllDeclaration";
    source: Literal;
    exported: Identifier | Literal | null; // e.g., export * as foo from "mod";
}
```

## async/await

```typescript
interface Function {
    // 异步标识
    async: boolean;
}
interface AwaitExpression <: Expression {
    type: "AwaitExpression";
    argument: Expression;
}
```

CatchClause

```typescript
interface CatchClause {
    param: Pattern | null; // 无 catch 子句则为 null
}
```

字面量

```typescript
interface Literal <: Expression {
    type: "Literal";
    value: string | boolean | null | number | RegExp | bigint;
}
interface BigIntLiteral <: Literal {
  bigint: string;
}
```

链式表达式：c.b?.a

```typescript
// 从后往前读取构建树，括号里的除外，同一层有 ? 就是 ChainExpression
interface ChainExpression <: Expression {
  type: "ChainExpression";
  expression: ChainElement;
}
interface ChainElement <: Node {
  optional: boolean;
}
extend interface CallExpression <: ChainElement {}
extend interface MemberExpression <: ChainElement {
    // PrivateIdentifier：computed = false 。 object = super，property!=PrivateIdentifier
	property: Expression | PrivateIdentifier; 
}
```

静态块

```typescript
interface StaticBlock <: BlockStatement {
    type: "StaticBlock";
}
```

