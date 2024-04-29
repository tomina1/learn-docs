## 语法

````
#：1-6 级标题
>：竖线前缀，引用文本
-、*、+：无序列表
数字.：有序
---：分割线
` `：标注句子和内容(CTRL + E)
** **、__ __：加粗(CTRL + B)
* *、_ _：斜体(CTRL + I)
~~ ~~：删除线
<sub></sub>、<sup></sup>：下、上标
[ctx](url)：创建链接文本

** ** & _ _：粗体内含斜体
*** ***：全部粗体和斜体

- [x]：任务列表。含有 x 则完成。悬浮右侧按钮则可以转为问题
[^1]：脚注。文本边上声明，底部声明：文本描述
@github/support、@organization/team-name：提及项目人员、团队及所有成员
#：调出建议的议题和拉去请求的列表
:emoji-code: ：这个格式添加表情符号
<!-- ctx -->：注释

这样表示提示文本
> [!NOTE | TIP | IMPORTANT | WARNING | CAUTION]
> ctx

这样实现折叠面板
<details open>
	<summary>title</summary>
	ctx
</details>

议题、拉取请求
[# | GH- | Username/Repository# | Organization_name/Repository#] + id
使用关键字：closes、fixes、fixed、resolve、resolves、resolved、修复、已关闭、关闭 + #id

提交 SHA，自动转为短链接
URL、SHA、User@SHA、Username/Repository@SHA
````

支持颜色模块：`HEX`、`RGB`、`HSL`
支持章节链接、相对链接( ./、../ 当前路径链接到其他 `*.md`)
支持图片`![ctx](url)`：图片和替换文字。主题切换：`media="prefers-color-scheme:dark|light"`

## 表格格式

```
| 和 - 组合而成。- 上面一层为表头。
内部可使用 链接、内联代码块和文本样式
:---、:---:、---:：左中右对齐

| Command | Description |
| --- | --- |
| git status | List all new or modified files |
```

## 关系图

```
​```mermaid
    graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
​```
地图
​```geojson
	{ type: "FeatureCollection" }
​```
```

