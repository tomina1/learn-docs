# minimatch
**最小匹配实用程序。npm内部匹配库，将 glob 表达式转为 JSReg 对象**

- (path, pattern, options)：测试路径格式
- filter(pattern, options)：根据配置返回过滤函数
- escape(pattern, options = {})：转义glob模式中的所有魔法字符，使其只匹配文字字符串。windowsPathsNoEscape 用 [] 进行转义
- unescape(pattern, options = {})：取消对可能包含一些转义字符的glob字符串的转义。windowsPathsNoEscape 删除 []，不删除反斜杠转义
- match(list, pattern, options)：fnmatch、glob 模式对文件列表进行匹配。没有匹配并设置 options.nonull，则返回包含模式本身列表
- makeRe(pattern, options)：根据模式生成一个正则表达式对象

## OPTIONS

- debug：将大量内容转储到stderr
- nobrace：不要展开｛a，b｝和｛1..3｝大括号集
- noglobstar：禁用针对多个文件夹名称的**匹配
- dot：允许模式匹配以句点开头的文件名
- noext：禁用“extglob”样式的模式，如+（a|b）
- nocase：执行不区分大小写的匹配
- nocaseMagicOnly：不区分大小写的正则表达式，但保留字符串匹配部分不变。同上一起使用
- nonull：设置返回包含模式本身列表。无则空列表
- magicalBraces：没有其他魔法字符 hasMagic 返回 false，设置则返回 true
- matchBase：如果路径的基名称包含斜杠，则不带斜杠的模式将与该基名称匹配
- nocomment：抑制将模式开头的#视为注释的行为
- nonegate：抑制对待领导的行为！否定的性质
- flipNegate：从求反表达式返回的值与未求反的值相同
- partial：开头吻合则视为匹配
- windowsPathsNoEscape：\\作为路径，设置则替换为 /
- windowsNoMagicRoot：
- preserveMultipleSlashes：多个 //  视为单个。设置则抑制
- optimizationLevel：相邻的多个 ** 是为单个 
- platform：当设置为win32时，这将触发所有特定于windows的行为

