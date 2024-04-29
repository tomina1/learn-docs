# fs-extra
**厌倦 mkdirp、rimraf 和 ncp 每次都出现在项目里**

创建目录、删除目录文件 和复制内容

- copy(src, dest[ , opts]\[ , cb])

  src：复制目录内容，而非目录

  dest：src 为文件时则该属性不能为目录

  opts：

  ​	overwrite：是否覆盖，false 则静默方式失败

  ​	errorOnExist：true 时静默失败将抛错

  ​	dereference：取消引用符号

  ​	preserveTimestamps：true 时将设置原始源文件最后修改访问时间

  ​	filter：fn => PromiseLike\<bool> 是否可复制

- emptyDir(dir[ ,cb ])：创建、置空目录

- ensureDir(dir, [ ,opts ]\[ , cb])：确保存在目录，没有则创建

- ensureFile(file, [ ,cb ])：确保存在文件，路径不存在则创建目录

- ensureLink(srcPath, destPath [ , cb ])：确保链接存在。不存在则创建。软`(保存地址)`硬`(指向对象)`链接

- ensureSymlink(srcPath, destPath[ , type]\[ , cb])：确定符号链接存在。路径不存在则创建

- read、write、writev(fd, buffer, offset, length, position)：文件、缓冲区、写入位置、读取长度、读取位置

- move(src, dest [, opts ]\[ , cb])：src 和 dest 类型一致，opts.overwrite：是否覆盖

- outputFile(file, data[ , opts ]\[ , cb ])：几乎同 writeFile。文件路径、数据

- outputJson(file, obj[ , opts]\[, cb])：同 writeJson。路径不存在创建。支持 fs.writeFile 选项

  spaces：要缩进的空个数。或缩进字符 \t

  EOL：默认 \n

  replacer：JSON replacer

- pathExists(file [ , cb ])：判断路径是否存在

- readJson(file [ , opts ]\[, cb])：读取并转换 JSON。支持 jsonFile.readFile opts

- remove(path[ , cb])：删除目录、文件。不存在则静默

- writeJson(file, obj[ , opts]\[, cb])：同 outputJson

