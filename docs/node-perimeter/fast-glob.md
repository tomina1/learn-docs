# fast-glob
**是更快的 fast-glob 替代方案**

异步
fg(str[]).then()
fs.async(str[]).then()

同步
fg.sync(str[]).then()

流
stream = fg.stream(str[])
stream.on('data' | 'error' | 'end', fn)

根据提供的模式，返回一组任务
fg.generateTasks(patterns, {
	base: 基础路径
	dynamic：包含动、静模式
	patterns: str[] 所有内容
	positive: str[] 肯定内容
	negative：不含 ! 的否定内容
})

## OPTIONS

- cwd：process.cwd()
- deep: num | bool
- ignore: string[]
- dot: false 是否允许点开头的文件
- stats: false 附加路径和深度，不是统计
- onlyFiles/onlyDirectories: true 仅文件/目录
- unique: 防止重复结果
- markDirectories: 在目录条目中添加 /
- absolute: false 绝对路径
- case、nocase：不区分大小写
- matchBase：允许不带斜线的glob模式根据其基名称匹配文件路径
- transform： fn 允许在接收前进行转换