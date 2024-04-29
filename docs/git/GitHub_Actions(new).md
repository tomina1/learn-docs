```yaml
name: CI
run-name: ${{ github.actor }} is update repo, start building...

# 运行触发器,指定事件、指定事件和分支
on: push | [push, pull_request, fork, issue]
on:
  issues:
  label:
  push: # push 推送
    branches: [ "master" ]
    branches-ignore:
       - 'releases/**-alpha'
    tags:
      - v1.*
    paths:
    paths-ignore:
      - '**.js'
  pull_request: # pr 合并提交
    branches: [ "master" ]
  workflow_call: # 定义重用工作流输入输出
  workflow_dispatch: # 循序您从操作选修卡手动运行此工作流
    inputs: # 手动输入的数据。通过 cli 执行 gh workflow run WORKFLOW 
  # 监视工作流，配置触发条件，来决定是否运行
  workflow_run:
  # 定时运行
  schedule:

# 全局环境变量值，或者 job/step 下，或者多个工作间变量 组织、存储库或环境级别定义
env:
  <name>:
  
permissions: # 操作权限(文件可以被读写修改的) w(write) | r(read) | n(none)
  actions: #  允许取消工作流(w)
  contents: # 列出提交(r)，创建发布(w)
  deployments: # 创建新部署(w)
  discussions: # 允许操作关闭或删除评论(w)
  id-token: # openId Connect(w)
  issues: # 允许操作向问题添加注释(w)
  packages: # 允许上传、发布包(w)
  pages: # page 读写. 允许GitHub Pages 生成(w)
  pull-requests: # 允许向拉取请求添加标签(w)
  repository-projects: # 允许操作向项目添加列(w)
  security-events: # 
  statuses: # 

defaults: # 定义通用基础配置
  run:
    shell: bash|pwsh|python(all)、bash(默认)|sh(Linux/macOS)、cmd|pwsh|powershell(Win)
    working-directory: # shell 工作路径

jobs:
  # 初始化缓存
  setup:
    name: # 名称
    if: matrix.platform == "ubuntu-latest"
    runs-on: ubuntu-latest
    defaults: # 步骤默认设置，类似工作流默认
    environment: # 环境变量
    permissions: # 操作权限
  		contents: write
    needs: setup # 前置作业, job | job[]
    uses: # 使用 action 库, ./.github/actions/hello-world-action
    with: # action 传参
    secrets: # 传递机密信息 k/v | inherit
    
    container: # 工作流使用 Docker 容器操作, GitHub 托管运行器，则 Ubuntu 运行器。自托管运行器，则 Linux 机器并安装 Docker
      image: node:18 # Docker Hub 映像名称或注册表名称
      env:
      ports: #要在容器上显示的多个端口
        - 80
      volumes: # 使用卷分享作业中服务或其他步骤之间的数据 <source>主机卷名:<destinationPath>容器中的绝对路径
       - my_docker_volume:/volume_mount
      options: --cpus 1
      credentials: # 凭证信息
      env:
      options: # 配置其他 Docker 容器资源选项
      
    services: # 作业托管服务容器, 用于创建数据库或缓存服务(如 Redis). 运行器自动创建 Docker 网络并管理服务容器的生命周期
      <service_id>:
        image/credentials/env/ports/volumes/options: # 如上 container 配置雷同
        
    strategy: # 多平台运行
      fail-fast: false # 防止多平台失败时退出
      platform: [ macos-latest, ubuntu-latest, windows-latest ]
      test-group: [] # 测试组，用于标识测试顺序
      matrix:
        os: [ubuntu-22.04, ubuntu-20.04]
        version: [10, 12, 14]
      include/exclude: # 扩展矩阵配置
      max-parallel: # 并行作业数最大化
      
    outputs: # setup 输出内容，build 等待并接收
      output1: ${{ steps.step1.outputs.test }}
      
    timeout-minutes: # 最大分钟数
    continue-on-error: # 失败也是否继续
    steps:
      - name: checout # 名称
      	id: ID # step id
        uses: actions/checkout@v3、./.github/actions/hello-world-action # 其他 GH-Actions
        if: condition == true # 执行条件
        shell: PowerShell | Bash Shell
        # cat $HOME/files.json 查看文件内容
        # | script/check-english-links.js > broken_links.md 通过管道输出内容到 .md 文件
        run: echo 'Hello, world!'
        with: # uses 传参
        	key: value
        env: # 运行环境变量
        	GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        continue-on-error: # 失败也是否继续
        timeout-minutes: # 最大分钟数
	 - name: step output map
	   id: step1
	   run: echo "test=ctx" >> "$GITHUB_OUTPUT"
	   
  build:
    runs-on: ubuntu-latest
    need: setup
    steps:
      - name: get need job output
        env:
          OUTPUT1: ${{needs.job1.outputs.output1}}
        run: echo "$OUTPUT1 $OUTPUT2"
    ...

```

## 上下文

```yaml
# 工作流运行的信息
github:
  action: 操作名称、步骤 ID # id | __run[_2] | actionscheckout2(actions/checkout)
  action_path: 操作所在的路径
  action_ref: 正在执行的动作的ref。不要在 run 关键字中使用
  action_repository: 这是操作的所有者和存储库名称。不要在 run 关键字中使用
  action_status: 复合动作的结果
  
  actor: 触发初始工作流用户名。重新运行与 github.trigging_actor 不同
  actor_id: 帐户 ID
  api_url: GitHub REST API
  base_ref: 拉请求的base_ref或目标分支。pull_request、pull_request_target 触发
  env: 工作流命令设置环境变量的文件的路径
  event:
  event_name: 触发事件名称
  event_path:
  graphql_url: GraphQL API
  head_ref: 拉取请求的 head_ref 或源分支运行。pull_request、pull_request_target 触发
  job: 当前 job id
  path: 设置系统 PATH 变量的文件的路径
  
  # 触发工作流的
  # 分支：refs/heads/<branch_name>。拉取：refs/pull/<pr_number>/merge。tag：refs/tags/<tag_name>
  ref: 分支或标记的完整格式引用. e.g. refs/heads/my_branch
  ref_name: 短引用名称。分支名、拉取 <pr_number>/merge
  ref_protected: 设置了分支保护和规则集，则为 true
  ref_type: 引用类型。branch | tag
  # 存储库
  repository: 名称。e.g. octocat/Hello-World
  repository_id: 存储库 ID
  repository_owner: 所有者
  repository_owner_id: 
  repositoryUrl: Git 地址
  retention_days: 保留工作流运行日志和工件的天数
  # 工作流每次
  run_id: 运行唯一编号。运行不会更改
  run_number: 运行唯一编号。每次运行累加，重新运行不会
  run_attempt: 重新运行唯一编号。累加
  secret_source: 机密来源。None | Actions | Codespaces | Dependabot
  server_url: GitHub server
  sha: 提交 SHA。ffac537e6cbbf934b08745a378932722df287a53
  token: 等同 GITHUB_TOKEN,
  triggering_actor: 触发用户名
  # 工作流的
  workflow: 名称 | 文件完整路径
  workflow_ref: ref path. e.g. octocat/hello-world/.github/workflows/my-workflow.yml@refs/heads/my_branch
  workflow_sha: 文件提交 SHA
  workspace: 步骤的 runner 上的默认工作目录，以及使用签出操作时存储库的默认位置
# 工作流、作业或步骤中设置的变量
env:
  [env_name]: 环境变量
# 存储库、组织或环境级别设置的变量。vars.var | $var
vars:
# 当前 job 信息
job:
  container:
  	id:
  	network: 网络的 ID。运行程序创建作业中所有容器使用的网络。
  	services:
  		<service_id>:
  		  id: 服务ID
           network: 父网络的 ID
  		  ports: 暴露端口
  status: success | failure | cancelled.

# 可重复使用工作流中作业的输出
jobs:
  <job_id>:
  	result: 工作流结果。 success | failure | cancelled | skipped
  	outputs: 作业的输出集
	  <output_name>: 特定输出的值

# 已在当前作业中运行的 step 信息
steps:
  <step_id>:
    outputs:
      <output_name>:
    # 当 continue-on-error step 失败 outcome 也失败，但 conclusion 会成功
    conclusion: success | failure | cancelled | skipped
    outcome: success | failure | cancelled | skipped

# 正在运行的当前作业 runner 信息
runner:
  name: 运行程序的名称
  os: Linux | Windows | macOS
  arch: X86 | X64 | ARM | ARM64
  temp: 管道上的临时目录的路径，结束时清空
  tool_cache: 预装工具的目录的路径。e.g. /home/runner/work/_temp
  debug: 启用调试日志记录并且始终具有值1时才设置此选项
  
# 可用 机密的名称和值
secrets:
  GITHUB_TOKEN: 为每个工作流运行自动创建令牌
  <secret_name>: 设置的特定秘密值
  
# 矩阵执行策略的信息
strategy:
  # 使用矩阵作业策略时
  fail-fast: 评估结果为 true，矩阵作业失败，则取消所有正在进行的作业
  job-index: 矩阵中当前作业的索引
  job-total: 矩阵中的作业总数
  max-parallel: 可以同时运行的最大作业数
# 包含工作流中定义的应用于当前作业的矩阵属性
matrix:
  # os:[ubuntu-latest, windows-latest] node:[14,16] 就会依次执行，matrix:{ os, node } 按序值
  <property_name>: os 和 node 矩阵。则包括os和nodes属性以及当前作业所使用的值
# 依赖项的所有作业的输出
needs:
  # 当前作业所依赖的作业的
  <job_id>:
    outputs:
      <output_name>: 特定输出的值
    result: 结果。success | failure | cancelled | skipped
# 可重复使用或手动触发的工作流的输入
inputs:
  # 可重复的，在 on => workflow_call 定义类型，从 job.with 输入。
  # 手动触发，在 workflow_dispatch 事件配置中定义
  <name>: string | number | boolean | choice
```

匹配器

```yml
# 分支
*: # 分支
**: # 所有子孙分支
feature/*: # 分支下子分支
feature/**: # 分支下所有子孙分支
v2*|*feature: # 所有 前/后 缀分支
v[12].[0-9].[0-9]: # v1|2 所有版本分支

# 文件
# 当前路径
*： # 所有文件
*.js: # 所有后缀文件 .js
*.jsx?: # 所有后缀文件 .js|.jsx
docs/*: # docs 下的文件
docs/**/*.md: # docs 下的所有 .md 文件

# 所有路径下
**: # 的文件
**.js: # 的 .js 文件
```



## 表达式

```yaml
# 字面量。bool nul num str

# 内置函数对值强制转换为：null -> "", bool -> "true" | "false", arr | obj 不转换为字符串
contains( search, item ): 搜索，支持字符串，数组。e.g. contains(github.event.issue.labels.*.name, 'bug')
startsWith|endsWith( searchString, searchValue ): 同 js
format( string, replaceValue0, rv1, ..., rv2): 占位符替换
join(arr, separator?): 同 js
toJSON|fromJSON: json 转换
hashFiles(path): 获取文件 sha

#status check fn
success: 所有前置 steps 成功
always: 始终执行
cancelled: 工作流已取消，则返回 true
failure: 任何前置 steop、依赖的 jobs 失败则返回 true

# * 语法来遍历对象，类似map。e.g. arr.*.val = val[]
```

## 打包发布静态页面

在两个 job 里，所以需要上传再下载，然后发布

```yaml
jobs:
  build:
  	# ...
  	- name: Uploading build artifacts ...
        uses: actions/upload-artifact@v2
        with:
          name: prod-files
          path: ./dist
  deploy:
  	runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Downloading artifacts ....
        uses: actions/download-artifact@v2
        with:
          name: prod-files
          path: ./dist

      # 部署
      - name: Deploy to Github Pages
        # uses: actions/deploy-pages@v2 #自动部署, 部署并创建 gh-pages 分支
        uses: peaceiris/actions-gh-pages@v3
        with:
          # token: ${{ secrets.GITHUB_TOKEN }}
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_BRANCH: gh-pages
          publish_dir: ./dist
```

## 执行脚本

```yaml
jobs:
  example-job:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./scripts
    steps:
      - name: Check out the repository to the runner
        uses: actions/checkout@v4  
        # 变成可执行
      - name: Make the script files executable
        run: chmod +x my-script.sh my-other-script.sh
      - name: Run the scripts
        run: |
          ./my-script.sh
          ./my-other-script.sh
```

## 缓存 Node_Modules

```yaml
name: Caching with npm
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      ...
      - name: Cache node modules
        id: cache-npm
        uses: actions/cache@v3
        env:
          cache-name: cache-node-modules
        with:
          # npm cache files are stored in `~/.npm` on Linux/macOS
          path: ~/.npm
          key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-build-${{ env.cache-name }}-
            ${{ runner.os }}-build-
            ${{ runner.os }}-

      - if: ${{ steps.cache-npm.outputs.cache-hit != 'true' }}
        name: List the state of node modules & Install dependencies
        continue-on-error: true
        run: |
        	npm list
        	npm install
      ...
```



## 内置变量(详见上下文 Github 内容)

```yml
GITHUB_ACTION、GITHUB_ACTION_PATH、GITHUB_ACTION_REPOSITORY、GITHUB_ACTIONS

GITHUB_ACTOR/GITHUB_ACTOR_ID、GITHUB_API_URL/GITHUB_GRAPHQL_URL、GITHUB_BASE_REF、GITHUB_ENV
GITHUB_EVENT_NAME/GITHUB_EVENT_PATH

GITHUB_JOB、GITHUB_OUTPUT:工作流输出文件路径，用于输出、GITHUB_PATH

GITHUB_REF、GITHUB_REF_NAME、GITHUB_REF_PROTECTED、GITHUB_REF_TYPE

GITHUB_REPOSITORY、GITHUB_REPOSITORY_ID、GITHUB_REPOSITORY_OWNER、GITHUB_REPOSITORY_OWNER_ID、GITHUB_RETENTION_DAYS

GITHUB_RUN_ATTEMPT、GITHUB_RUN_ID、GITHUB_RUN_NUMBER

GITHUB_SERVER_URL、GITHUB_SHA、GITHUB_STEP_SUMMARY、GITHUB_TRIGGERING_ACTOR

GITHUB_WORKFLOW、GITHUB_WORKFLOW_REF、GITHUB_WORKFLOW_SHA、GITHUB_WORKSPACE

RUNNER_ARCH、RUNNER_DEBUG、RUNNER_NAME、RUNNER_OS、RUNNER_TEMP、RUNNER_TOOL_CACHE
```

## 工作流命令

```yaml
# 设置调试信息
::debug::{message}
# 设置 通知|警告|错误 消息
::notice|warning|error file={name},line={line},endLine={endLine},title={title}::{message}
# 日志分组
::group::{title}
...
::endgroup::
```

