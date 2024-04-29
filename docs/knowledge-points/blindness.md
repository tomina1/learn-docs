```txt
双向绑定原理
代理 set / get 方法 - render 时收集依赖 - Watcher 实例化时往属性 dep 里放入自身，变化时触发并 notice

字符串处理
padStart / padEnd：指定最大长度并填充字符串

闭包
创建私有变量，延长声明周期。获取只有   返回变量、返回访问函数

权限管理
token - 通过识别用户对应的角色拿到过滤后的 菜单、权限标识，动态添加路由

css 水平垂直居中的方法
绝对定位 + top / left 50% + transform translate(-50%, -50%)
绝对定位 + top / left 50% + margin-top/left：盒子一半宽高
绝对定位 + 上下左右0 + margin：auto
flex + align / justify：center
grid + align / justify：center

options 预请求，非主动。是否允许该跨域请求。支持哪些请求方式
非简单请求。get / post / application / x-www-form-urlencoded / form-data 以外

max-age 和 expires
支持 max-age 则忽略 expires，IE 只支持 expires

强缓存：Cache-Control  比 Expires 优先级高，有效期直接走缓存
协商缓存：Etag / If-None-Match、Last-Modified / If-Modified-Since 请求后内容不变，返回 304 走浏览器缓存

this
	window
	指向被调用的对象
	显示改变
	new 时指向当前实例
	箭头函数定义时的 this

箭头函数：没有自己的 this，不能改变、没有 arguments、没有 prototype、不能 new

输入 URL 到页面加载显示完成：

	1. IP 地址查询：浏览器缓存 -> 系统缓存 -> 路由缓存 -> DNS 缓存 -> 域名服务器
 	2. 浏览器的三次握手，建立连接
 	3. 请求并处理，返回一个 HTTP 响应
 	4. 构建DOM 树，并解析其中的引用资源，发起请求
 	5. 显示完成，发送异步请求

脚本加载：
async：异步并立即执行。无序
defer：异步解析完后执行。按序

找下标：indexOf(val) | lastIndexOf(val)
插入某个位置：splice(i, 0, val)
模板字符串插入多个变量时：\`${[ val1, val2, val3 ]}`
```