```yaml
# 操作名称，默认文件名
name: learn-github-actions
# 允许中显示
run-name: ${{ github.actor }} is learning GitHub Actions
# 监听事件。push(推送)
on: [push]
# 操作组
jobs:
# 定义 check-bats-version 的作业
check-bats-version:
	# 判断来是否允许脚本
	if: exp
	# 运行平台
	runs-on: ubuntu-latest
	# 操作步骤，都是单独的 shell 脚本操作
	steps:
		# 回退到运行器
		- uses: actions/checkout@v4
		# 操作来按照指定版本 Node.js。将 Node 和 npm 命令都放在 PATH 中
		- uses: actions/setup-node@v3
        	with:
          		node-version: '14'
		# 全局安装脚本并执行
		- run: npm install -g bats
     	 - run: bats -v
     	 # 设置默认 dir
     	 defaults:
      		run:
        		working-directory: ./scripts
     	 # 环境变量 Demo
     	 - name: Connect to PostgreSQL
        	run: node client.js
        	# ${{ env.var }} 变量使用
        	env:
          		POSTGRES_HOST: postgres
          		POSTGRES_PORT: 5432
		# 添加脚本 Demo：回退到运行器，再执行存储库中的脚本
		- name: Run a script
			run: ./my-script.sh
```

查找操作

```yaml
# Docker Hub 容器
- uses: docker://alpine:3.8
# 指定版本或 HSA
- uses: actions/javascript-action@[v1.0.1 | HSA]
# 使用分支
- uses: actions/javascript-action@main
```

输入输出

```yaml
inputs:
# 文件名、描述、必填、默认值
  file-path:
    description: "Path to test script"
    required: true
    default: "test-file.js"
outputs:
# 文件名、描述、必填、默认值
  results-file:
    description: "Path to results file"
```

函数

```js
// 包含查找。读取obj下任何属性的 name 值
contains( search | obj.*.name, item )
startsWith、endsWith
// 格式化
format('Hello {0} {1} {2}', 'Mona', 'the', 'Octocat')
join( array, optionalSeparator )
toJSON(value)、fromJSON(value)
// 匹配文件
hashFiles(path, path2)
always()、success()、cancelled()、failure()
```

