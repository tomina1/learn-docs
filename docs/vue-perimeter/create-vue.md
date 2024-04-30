大概流程

1. 解析命令参数，获取语言环境
2. 利用 prompts 交互工具，让用户选择需要的配置
3. 清空创建目录，生成基本 package.json
4. 根据配置访问对应目录，并把代码复制/合并到项目下，.data.js 则收集里面的内容暂存
5. 再遍历到 ejs 则注入暂存内容生成对应的文件
6. 根据是否 ts 批量转换后缀，并生成 readme。打印指令

npm create-vue@latest = npm init vue@latest = npx create-vue@latest

npx：先验证本地是否按照了该软件包，按照了则直接使用。没有则远程库读取并缓存 npm-cache
		执行项目下 package.json 里的 bin 属性，生成对应可执行文件。及 outfile.cjs( 打包出来的文件，缓存在 git.cache 里 )

npm init 利用 package.json 里的 bin 属性生成执行文件并执行代码( 全局按照后会生成 bin 来执行属性 bin 的值 )
node 包含有 .bin 文件夹，也是首先查找目标



