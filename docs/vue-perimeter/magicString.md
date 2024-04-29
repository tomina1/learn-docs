# MagicString
**为了规避替换代码用重量级 AST，提出的轻量级方案**

- addsourcemaplocation：如果hires为false，将指定的字符索引（相对于原始字符串）添加到源映射
- append / prepend：追加内容、前缀
- appendLeft / appendRight(idx, ctx)：按照索引位置追加内容
- clone：拷贝内容
- generateDecodeMap：生成含有数组形式的 map
- generateMap({
  		file: 编写源映射中的文件名,
  		source: 包含原始源文件的文件名,
  		includeContent: 是否包含原始内容,
  		hires：是否精确到列，默认行 }) .toString / toUrl：生成 stringify map、包含源映射的DataURI
- hasChanged()/.isEmpty()：是否更改/空
- indent(prefix, [{ exclude: [star, end]}])：每一行前面加前缀
- move(star, end idx)：范围内容移动到索引
- rependLeft / rependRight(idx, ctx)：与追加相同，但内容会插入之前追加、前置的前面
- replace/.replaceAll( regexpOrString, substitution: 替换 )：改变了魔术字符串的状态（使用.clone（）使其不可变）
- remove：删除范围内容，重复、重叠内容删除会出错
- slice：获取范围切片，索引用于已删除字符，则引发错误
- snip：返回范围外的克隆内容
- trim/.trimStart/.trimEnd/.trimLines：删除空白、空行
- overwrite(star, end, ctx[ ,{ storeName: 存储原始名称, contentOnly: 是否只覆盖内容 }])：范围内容覆盖
- update(star, end, ctx[ ,{ storeName: 存储原始名称, overwrite：附加内容是否与原始内容一起覆盖 }])：s.update(s,e,ctx) 等效 s.overwrite(s,e,ctx,{contentOnly:true})

