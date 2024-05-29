编译器：`/usr/bin/sh`、`/bin/sh`、`/bin/bash`(#!用来指定编译器)

执行脚本

```shell
chmod +x ./test.sh #使脚本具有执行权限
./test.sh #执行脚本

/bin/sh test.sh #直接指定并执行
```

传参、占位符：./test.sh 1 2 3 -- $1 $2 $3
		其他特殊参数：

```shell
$#: (参数个数)
$\*: 所有参数字符串
$$: ID
$!: 最后进程ID
$@: 类似 $ 但以 "$1""$2"...输出数组
$-: 显示shell使用的当前选项
$?: 显示最后命令的退出状态，0表示无错
```



数组：
		定义 arr = [1 2 3]、赋值 arr[0] = 1、取值 ${arr[0]}
bash 支持关联数据(类似枚举)：
		定义 declare -A arr = (["google"] = "www.google\.com" ...)、赋值取值类似
获取所有及其长度
		所有元素 arr[ `*` | `@` ]、长度 !arr[ `*` | `@` ]

运算符：

```shell
关系运算: -eq (==)、-ne (!=)、-gt (>)、-lt (<)、-ge (>=)、-le (<=)
布尔运算: ! ( 非 )、-o ( | )、-a ( & )
逻辑运算: &&、||
字符串运算: =、!=、-z (长度0)、-n (长度非0)、$ (为空)
文件测试运算符: -(f|d)文件、目录 | -(r|w)读写 | -s 空 | -x 可执行 | -e 存在  file
```



test：检查运算符是否成立、$[ 基本运算 ]，常用于 if

echo 命令：-c 开启转义
		`$var \n\c 换不换行`：变量、转义
		\`date`：显示当前日期

printf：类似 C，超出的重用打印

流程控制：If、For、While、Until、Case

```shell
if test bool | [bool] | (()); then elif [bool] else fi #if条件语句，(())作为判断可以使用 >< 符号
for a in arr; do cmd1;cmd2... done;
while(( $i < 5 )) do let "i++" done # let 为 bash 命令，执行 n 个表达式不用 $
until(( bool )) do done # 为 true 时结束
case $a in
	1) cmd
	...
	;;
# 跳出循环 break 和 continue
```

函数

```shell
fn(){} #定义，return 只能返回 0-255，其他则走 echo 输出
fn 1 2 3 4 #传参，第 9 个以上的参数 只能 ${10} 取参
```

输入 / 输出：0 输入，1 输出，2 错误，运行时会生产这三个文件流

```shell
[n] >|>> # 输出 | 追加 到文件内
[n] <|<< # 输入 到文件内
>&|<& # 将 输出、输入 文件合并
<< tag # 将 开始 tab 和结束 tag 之间的内作为输入
cmd1 < infile > outfile：指定 输入、输出内容 的文件
cmd << delimiter
	document
delimiter # 之间的内容传递给 cmd
cmd > /dev/null 2>&1 # 禁止输出，实则丢入类似 null 文件丢弃，无法读取
```

文件引入：. ./xx.sh(两个点中间包含一个空格)

<details class="details custom-block">
	<summary>异步的动态配置</summary>
	这是内容.........
</details>

