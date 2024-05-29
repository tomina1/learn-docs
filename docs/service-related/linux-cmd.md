软硬链接：
	软链接为路径形式，类似win快捷方式，跨系统不存在的文件名、目录链接
	硬链接为文件副本，目录不行，同一系统才能创建
	符号链接为文件或目录的快捷方式

启动过程：内核引导 boot  >> 运行 init >> 系统初始化( /etc/init.d ) >> 建立终端 >> 用户登录系统
		init：配置文件 /etc/inittab

管道符号：| 输出内容流转，&& 单行多指令按需运行

# vi / vim：`本文 / 代码` 编辑器

- i / Esc --- `进入 / 退出 `输入模式
- yy / dd --- `复制 / 裁剪`  当前
- p / P --- 粘贴内容到下 / 上` 方
- u / Ctrl + r --- ` 撤销 / 重做` 上次操作

# 目录结构：

```yaml
src:
	home: # 用户的主目录，账号命名 --------------------------- 主目录
	usr: # 存放 应用程序和文件，类似 Win Program Files ------- 用户 应用程序(web)和文件 目录
		bin: # 用户 应用程序
		local:
		sbin:
		tmp:
	opt: # 软件安装目录 ------------------------------------ 全局软件目录
	srv: # 服务启动后提取的数据。----------------------------- 配置
	var: # 经常修改的类似日志文件。--------------------------- 日志
	tmp: # 临时文件
	run: # 临时文件系统，启动时清空
	etc:  # 系统管理的配置文件和子目录
	
	bin:  # 经常使用的命令
	boot: # 启动 Linux 核心文件，连接、镜像文件
	dev:  # 外部设备
	media: # 自动识别设备，e.g. U盘等
	mmt: # 临时挂载的文件系统
	proc: # 内存映射的虚拟文件系统
	lost+found: # 非法关机存放的文件
	lib: # 动态连接共享库，应用程序使用
	root: # 系统管理员目录
	sys: # 内核设备树
	sbin: # 系统管理员使用系统管理程序
	selinux: # 安全机制
```

常用命令

```yaml
ll / ls -l: # 查看文件属性及所属用户
# 第一个字符代表文件是 目录、文件、链接文件。目录：d，文件：-，链接文件：l
# 写入 r 、读取 w 、可执行 x
chown [–R] 所有者 文件名: # -R 是深度递归
chown [-R] 所有者:属组名 文件名

chmod: 更改文件属性  # owner/group/others(拥有者/组/其他) r4 w2 x1 = 111 共三组
chmod 777 .bashrc: # 身份7+7+7 = 7=4+2+1权限
chmod u=rwx,g=rx,o=r .bashrc: 修改文件权限

```
# 文件/文件夹操作

- man：e.g. man cp 查看使用文档

- ls (list files)：列出目录及文件夹

  ls -ald：`a` 全部文件，`l` 列出文件属性权限，`d` 仅列出目录本身

- cd (change directory)：切换目录

  cd ~：回到 home 目录

- pwd (print work directory)：显示当前目录

  pwd -P：显示出确实路径 (非链接路径)

- mkdir (make directory)：创建空目录

  mkdir [-mp]：-m 配置文件权限，-p 按照目录递归创建文件夹

- rmdir (remove directory)：删除空目录

  rmdir -p：从下到上，逐级删除空目录

- cp (copy)：复制文件或目录

  cp [ -adfilprsu ] source target：

  常用：`-a`类似pdr，`-i`存在则询问动作，`-p`复制连带文件属性，`-r`递归持续复制，`-s` 复制成为符号链接，

  不常用：`-d`来源为链接则复制链接，`-f`强制复制，`-l`硬式链接，`-u`目标比源旧才升级

- rm (remove)：删除文件或目录

  rm [-fir]：`-f` 忽略不存在文件，`-i` 互动模式，删除询问，`-r` 递归删除

- mv (move)：移动文件或目录

  mv [-fiu]：`-f` 强制，存在直接覆盖，`-i` 存在询问是否覆盖，`-u` 存在且有更新则升级

# 文件内容查看

- cat / tac：第一行/最后一行(倒叙) 开始显示

  cat [-AbEnTv]：`-A`整合 -vET，`-b`列出行号，`-E`断行字节` $ `显示出来，`-n`列出行号(含空白)，-T将`tab`键以`^|`显示，-v：列出看不出来的特殊字符

- nl：显示的时候，自导行号

  nl [-bnw]：-b a|t：空行行号是否列出，-n ln|rn|rz：行号`左对齐`/`右对齐`/`右对齐填充0前缀`

- more：翻页显示文件内容

  `Space/Enter`：下翻页/行，`b`：回翻页，`/str`：向下搜索内容，`:f`：显示文档名行号，

- less：比 more 更好，可以往前翻页

  `空格键 ⬆⬇`：翻动页面，`/str、?str`：向下/上搜索，`n/N`：正反向重复前个搜索，`q`：离开

- head / tail：只看 头/尾 几行

  `-n`：显示几行，`-f`：持续侦测后面所接文档名

# Linux apt 命令：系统软件包管理

- update <pkg_name>：列出 更新/指定更新
- upgrade/full-upgrade：升级/卸载再升级
- install <pkg_name>：安装
- remove <pkg_name>：删除
- show <pkg_name>：显示包信息
- autoremove：清理不再使用的依赖和库文件
- purge：移除软件包及配置
- search <key_word>：查找包命令

# 文件管理

## file：识别文件类型

- file [-bcLvz]\[-f <文件名>]：-b不包含文件名，-f<文件名>，-L直接显示符号连接所指类别

## find：查找文件

- find [路径] [匹配条件] [动作]
- 路径：目录文件名，多个路径空格分隔，默认当前
- 匹配条件：-name支持通配符 * 和 ?，-type文件`f`、目录`d`、符号`l`
- 动作：-m[min|time] n查找`n分钟` | `n*24小时`内被修改过的文件，-a[min|time] n查找被访问的文件。n负数几天内，正数几天外
- e.g. `find . type f 当前目录及子目录的文件`，`find path -name "pattern" -exec rm {} \; 执行命令，空对象被文件名替换，\结束`

## cut：内容切割

- -f：`-f 1,3 显示 1 和 3 字段内容`，`-f -4|4 显示 1-4|4 字段内容`。--complement 取反，--output-delimiter='_'显示格式
- -d：自定义分隔符，默认制表符。结合-f 分隔再挑选显示

## ln 命令

- e.g. `ln [-s] source target为源创建硬|软链接`;

## which 命令

- which 文件：会在 `$PATH` 设置的目录里查找符合条件的文件，`-n<文件名长度>`>=长度，`-p<文件名长度>`包含路径

## read：从标准输入读取数据，读取键盘输入

- -p：允许在命令行中指定提示。e.g. `read -p "请输入网站名" website`
- -t：设置等待时间，超出返回非零退出状态。e.g. `if read -t 5 -p "请输入网站名" website then ... else ... fi`

- -n\<num>：设置接收字符长度
- -s：使内容不显示在终端上(实际显示，字体为背景色)
- 读取文件，`cat 文件 | while read line 读取文件并逐行执行`

# 文档编辑

## grep：查找文件里符合条件的字符串或正则表达式

- 常用：`-i`忽略大小写，`-v`反向查找，`-n`显示匹配行号，`-r`递归查找。`-l`只打印匹配文件名，`-c`只打印匹配行数，`-v`不匹配文本
- e.g. `echo "hello world" | grep -c world`，`grep -r update /etc/acpi 指定路径下的匹配文件`，`grep -n '2019-10-24' *.log 日志`

## sort 文本排序

- -b忽略行前空格
- -d排序时，处理字母、数字及空格外，忽略其他
- -f小写视为大写
- -o<输出文件>

## uniq 命令：文本去重

- -c/--count 统计重复行列次数
- -u/--unique 仅显示出一次的行列
- -d/--repeated 仅出现重复行列

# 网络通信

## dnsconf 命令

- --set<主机><I_P> 新增主机记录，--unset <主机> 删除，--setns<域><主机> 指定域 DNS 服务器

## netstat 命令：

- netstat \[-acCeFghilMnNoprstuvVwx]\[-A<网络类型>][--ip]
- -a/--all 显示所有连线中 Socket
- -c/--continuous 持续列出网络状态
- -C/--cache 显示路由器配置快照
- -F/--fib 路由缓存
- -l/--listening 显示监控中的服务器 Socket
- -r/--route 显示路由表

## ping 检测连接

- ping [-dfnqrRv]
- -c \<times> 设置要求回应次数，-f 极限检测，-i \<间隔秒数> 收发信息间隔时间
- -r 忽略路由表直连
- -R 记录路由过程
- -w \<deadline> 在毫秒后退出
- -W \<tiemout> 在等待毫秒后开始执行

# 系统管理

## date：`date +"%Y-%m-%d %H:%M.%S"` 显示当前日期

## exit：0 成功，其他代表失败

## kill：终止运行进程

- -l：列出所有可用的信号。常用 SIGKILL(立即结束)、SIGTERM(正常结束)、SIGSTOP/SIGCONT(暂停/开始进程)、SIGINT( CTRL+C 信号)
- -<信号>：发送信号给进程
- e.g. `kill 1234`、`kill -9 1234`、`kill -s SIGSTOP 1234`、`kill -9 $(ps -ef | grep hnlinux)`

## ps：显示当前进程状态，类似 win 任务管理器

- [ -Aw au(x)]：`-A` 所有进程，`-w` 显示加宽，`-au`详细信息，`-aux` 包含所有者进程
- 输出格式：`%CPU`，`%MEM`内存，`VSZ`虚拟记忆体大小，`TTY`装置号码，`TIME`执行时间，`COMMAND`执行指令
- e.g. `ps -ef | grep <keyword>： 查找指定进程格式`

## top：动态、交互式的实时视图

- `-i`：隐藏闲置进程，`-b`：批处理运行并输出到文件，`-d second`：刷新间隔(秒)，`-n times`：n次后退出，`-p ID`：仅显示指定 ID 信息，

## sudo 命令：以系统管理者的身份执行指令

## logrotate：日志分割备份

- e.g. `/var/log/wtmp{ ...cfgs }`

- ```sh
  compress/nocompress: # 是否 gzip 压缩转储以后的日志
  copytruncate/nocopytruncate: # 打开中的日志，备份并截断
  create mode owner group/nocreate: # 轮转时指定创建新文件的属性。create 0777 nobody nobody
  delaycompress/nodelaycompress: # 结合compress，转储日志文件到下次时才压缩。同时转储压缩
  missingok: # 日志丢失，不报错继续滚动下一个日志
  errors address: # 转储时，错误信息发送到指定 Email 地址
  ifempty/notifempty: # 为空时，是否轮转
  mail address/nomail: # 转储日志发送到指定 Email 地址
  olddir directory: # 转储后日志放入指定目录，必须同一文件
  noolddir: # 放同目录下
  sharedscripts: # 运行postrotate 脚本，所有日志轮转后同一执行一次，没有配置则每个日志轮转后都执行
  prerotate/postrotate: # 转储前/后后执行指令
  daily/weekly/monthly: # 轮转周期
  rotate count: # 轮转次数后删除，0指没有，5指保留5个
  dateext: # 使用当前日志作为命名格式
  dateformat %s / %Y / %m / %d: # 配合 dateext，出现在下一行，定义文件切割后的文件名。
  size/minsize [=] 5|5k|5M: # 指定的大小时才转储
  ```

## skill：传递讯号给正在执行的程序

- 一般参数：`-f` 快速模式，`-i` 互动模式，`-v` 详细输出，`-w` 智能警告讯息，`-n` 没有动作
- `-t` 终端机代号(tty/pty)，`-u` 使用者名称，`-p` 程序代号(pid)，`-c` 命令名称可使用讯号

## free：查看实际内存、交换内存、共享内存、核心缓存区等

- -b/k/m：以 B/KB/MB为单位显示内存使用情况
- -h：自动计算单位值
- -o 不显示缓冲区调节列
- -s<间隔秒数>：持续观察内存
- -t：内存总和列

# 系统设置

## time：路径`/usr/bin/time`，`%e`运行时间，`%P`处理器占用率，`%M / %t`执行占用内存最大值/平均值，`%Z`内存大小，`%I%O`读入写入字节，`%r / %s`网络连接 接收/写入，`%x` 返回值

# 备份压缩

## tar 命令

- 创建压缩：`tar -cvf archive.tar  ...files`
- 解压：`tar -xvf archive.tar`
- 压缩归档文件：`-c`创建新归档文件，`-z`使用gzip压缩，`-f`指定名称，`-v`详细信息输出
- 查看文档内容：`-t`列出内容，`-v`详细输出，`-f`列出归档文件名称
- 追加文件：`-r`追加文件，`-v`详细输出，`-f`列出归档文件名称
- gzip 压缩文件：`-z`使用 gzip 压缩，`-c`创建新文件，-v，-f，e.g. tar -czvf archive.tar.gz directory
- 解压 gzip：`-z`使用文件，`-x`进行解压，-v，-f，e.g. tar -xzvf example.tar.gz
- 不同的压缩格式解压参数：`-z`gzip，`-j`bzip2压缩，`-J`xz压缩

## zip 命令

- zip [-AcdDfFghjJKlLmoqrSTuvVwXyz$] \[-b <工作目录>]\[-ll]\[-n <字尾字符串>]\[-t <日期时间>]\[-<压缩效率>]\[压缩文件]\[文件...]\[-i <范本样式>]\[-x <范本样式>]
- `-d`删除指定成员，`-g`将文件压缩后附加在既有压缩文件之后非新建，`-f`更新现有文件
- `-v` 显示执行过程，-<1-9压缩效率>

## unzip：解压 zip 文件

- `-l`显示压缩包内容，`-n/-o`压缩时不覆盖/覆盖原有文件，`-v`查看压缩文件信息，`-d`<目录>指定解压目录，`-P`<密码>密码选项
- [.zip] 指定压缩文件，[文件]指定处理其中哪些文件

ar：简历或修改备存文件，或提取，保存原有属性及权限

- [ -dmpqrtx ]：`-d`删除文件成员，`-m`变更成员次序，`-p`显示成员文件内容，`-q`追加文件，`-r`插入文件，`-t`显示所有文件，`-x`提取文件
- [ cfosSuvV ]：`-c`建立备份，`-f`防止文件名过长，`-o`保留文件日期，`-s`文件包含对象模式则建立符号表，`-S`不建立符号表，`-u`日期教新插入备份中，`-v`执行显示详细信息，`-V`显示版本号
- a/i | b<成员文件>：将文件插入备份文件中指定文件之`后 / 前`
- e.g. `ar rv two.bak *.c：打包以 .c 结尾的文件`、`ar t two.bak：显示打包文件内容`