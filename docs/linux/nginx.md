## nginx

正则表达式：~ 开头， Perl 语言 PCRE 正则兼容。定义变量 `?\<name>`、`?'name'`、`?P\<name>`，使用 `$name`



```yaml
http {
      # 设置会话缓存，避免 ssl 多次握手产生 CPU 消耗。
      ssl_session_cache shared:SSL:10m;
      ssl_session_timeout 10m;

      upstream loadBalancing {
            # 默认负载均衡
            least_conn; # 最小连接数
            ip_hash; # 会话持久化，根据 ip 来保证连接的一致性
    
            # 尝试连接次数，和标记宕机时长s
            max_fails  5;
            fail_timeout  10;
    
            server 1.example.com weight=3; # 权重
            server 2.example.com;
      }
      server {
        listen				80 ssl; # 单个接口附加 SSL 证书
        listen				8080 default_server; # 找不到时默认，无则首个 service
        server_name			o.text.com *.text.com 
    					o.text.* ~^(?<user>.+); # 优先级 高 -> 低
        # ssl 配置
        ssl_certificate			www.example.com.crt;
        ssl_certificate_key		www.example.com.key;
        ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers         HIGH:!aNULL:!MD5;
        
        # 保持 ssl 会话
        keepalive_timeout 60;
      }
  
      server {
            listen 192.168.1.1:80;
            server_name
            
            # 重写条件，规则，简单重定向
            RewriteCond  %{HTTP_HOST}  !www.example.com
            RewriteRule  (.*)          http://www.example.com$1
            return 301 http://www.exmple.o$request_uri;
      }
      
      # WebSocket 代理，结合 Upgrade 和 CONNECT 来客户端传递到代理服务，Connection 值取决于 Upgrade
      map $http_upgrade $connection_upgrade {
      		default upgrade;
      		""		close;
      }
      server {
      		proxy_pass http://backend;
      		proxy_set_header Upgrade $http_upgrade;
      		proxy_set_header Connection $connection_upgrade;
      }
}
```

## 配置

```yaml
http {
	absolute_redirect: on | off; # 访问时代理，则重定向到目标端口，导致被拒，关闭则以当前路径为基准重定向。HSL
	error_page: 404 /404.html | 404 =200 /empty.gif | @fallback命名location; # 状态返回，或改写状态，或重新指向.HSLI
	etag: on | off; # 启用、禁用静态资源的 ETag. HSL
	if_modified_since: off | exact | before; # 如何比较请求头中的时间。忽略、==、<= HSL
	log_not_found: on| off; # 未找到文件 记录日志。HSL
	log_subrequest: on| off; # 子请求 记录日志。HSL
	port_in_redirect: on | off; # 指定 nginx 发出的绝对重定向中的端口。HSL
	underscores_inheaders: on | off; # 为 off 时禁用下划线请求。HS
	root: # root + path 组成新的路径 .HSL
	alias: # 不管路径，直接指向目录
	
	# 日志
	access_log  logs/access.log.gz combined  gzip=4 buffer=2m flush=30m;
    error_log logs/error.log error;
	
	# 提供最大请求时内保持活动。HSL
	keepalive_requests: 100;
	keepalive_timeout: 75s;
	keepalive_disable: none | browser [msie6|safari|none];
	
	# 打开文件描述，目录存在信息，查找文件错误等缓存。HSL
	open_file_cache: off | max=num最大数 [inactive=time时间内缓存];
	open_file_cache_valid:    30s;
	open_file_cache_min_uses: 2;
	open_file_cache_errors:   on;
	
	#扩展名映射响应的 MIME 类型，不区分大小写.HSL
	# conf/mime.types 完整示例
	default_type application/octet-stream # 默认全为一种类型
	types: {
		text/html html;
		image/gif gif;
		image/jpeg jpg;
	}
	
	# autoindex_module。以斜杠结尾的请求生产一个目标列表.HSL
	autoindex: on | off;
	autoindex_exact_size: on | off; # 输出确切的文件大小
	autoindex_format: html | xml | json | jsonp; # 默认或空为 json
	autoindex_localtime: on | off; # 时间是否使用本地时区或 UTC 输出
	
	# gunzip_module. 对于不支持 gzip编码的客户端解压缩 Content-Encoding:gzip 的响应。HSL
	# 需要配置 --with-http_gunzip_module 启用
	gunzip: on | off;
	gunzip_buffers: 32 4k|16 8k;
	# 支持 .gz 压缩文件，对其余 gzip 配置有影响.HSL
	# 需要配置 --with-http_gzip_static_module 启用
	gzip_static: on | off | always;
	# 自动对文件 gzip，会有服务器压力，内置变量 $gzip_ratio .HSL
	gzip: on | off; # HSLI
	gunzip_buffers: 32 4k|16 8k;
	gzip_comp_level: 1-9;
	gzip_disable: reg; # 禁止任何匹配 User-Agent 自动响应
	gzip_min_length: 20; # 压缩响应最小长度，由 Content-Length 确定
	gzip_proxied: off | expired | no-cache | no-store | private | no_last_midified | no_etag | auth |any; #是否压缩
	gzip_types: text/html; # 特殊值 *，对 text/html 响应始终压缩
	gzip_vary: on | off; # 指令 gzip、gzip_static、gunzip 处于激活，启用/禁用 插入 Vary:Accept-Encoding
	
	# headers_module，将 Expires 和 Cache-Control 字段以及任意字段添加到响应头中.HSLI
	add_header: -- | name value [always]; # 未定义时继承上级，always 时都添加
	add_trailer: --; # $status= 200、201、206、301、302、303、307 或 308 时，将制定的字段添加到响应的末尾
	expires: [modified] time | epoch 对于绝对时间 | max | off; #modified修改跟当前之和，默认time跟当前时间之和。 epoch 对于绝对时间，秒。max 将设置为 10年
	
	# image_filter_module 是 JPEG、GIF、PNG 和 WebP 格式图像的过滤器。HSL
	# 配置 --with-http_image_filter_module，使用了 libgd 库
	image_filter: off | test | size | rotate [90|180|270]; # 关闭、确认格式，415、图片信息。L
	# resize 一大一小，以小为基准等比例缩放
	image_filter: [resize|crop] width height; # 结合选择在 之后/之前 执行，可传一个按比例缩小。L
	image_filter_buffer: 1M; # 读取图片缓冲区的最大大小
	image_filter_interlace: on | off; # 启用逐行扫描。JPEG一直
	image_filter_jpeg_quality: 75; # 图片质量.需要变化之后才能压缩
	image_filter_webp_quality: 80;
	image_filter_transparency: on | off; # 调色板指定颜色转换 GIF | PNG 时 保留透明度
	
	# 限制速率。HSLI
	if($slow){
		set $limit_rate 4k;
	}
	
	map string $variable { # 根据string入参，创建新变量。H
		default 0;
		*.example.net 3;
		"~opera Mini" 1;
	}
	
	server { # 提供 server 配置
		try_files $url /imgs/default.gif =404; #  .SL
		stub_status; # 创建简单的网页，返回 nginx 服务器状态 .SL
		
		location ([ =精准 | ~正则 | ~*不区分大小写正则 | ^~不检查正则 ] url) | @name { # SL
			internal; # 只能内部请求，其余 404
			empty_gif; # 发送单像素透明 GIF
		}
	} 
}
```



## 流 Stream

```yaml
stream {
	# 定义变量，年月日。不能支持 buffer 参数的流使用变量
	map $time_iso8601 $logdate {
		default 'date-not-found';
		'~^(?<ymd>\d{4}-\d{2}-\d{2})' $ymd;
	}
	# 用于记录通过流式代理的链接和数据传输
	log_format basic [escape=default|json|none] '$remote_addr [$time_local] '
		'IP:$protocol $protocol $status $bytes_sent $bytes_received '
		'$session_time "$upstream_addr" '
		'"$upstream_bytes_sent" "$upstream_bytes_received" "$upstream_connect_time"';
	server {
		# HSLI
		access_log /spool/logs/nginx-access-$logdate.log.gz basic gzip=1-9 buffer=32k flush=5m if=$status = 200;
	}
}
```



## nginsScript：在 http 和 strem 中实现 location 和 变量处理，支持 ES6

- 不支持 let 和 const 声明
- args 数组，eval、JSON、Error 对象函数
- 各种定时器、进制写法

## 内置变量

```yaml
# 常用基础
$document_uri=$url: # 规范化的请求 url
$arg_(name): # ? 后面的参数，arg_name=arg_value 的 arg_name
$args=$query_string: # 请求中的参数值
$cookie_(name): # 对应名称的 cookie
$msec: # 当前时间，毫秒
$time_iso8601/$time_local: # 本地时间 ISO-8601标准/通用日志格式
# 请求
$request: # 完整原始请求行
$request_[id/method/time/url]: # 请求 id，16位/方法/处理时间/url
$remote_[addr|port|user]: # 客户端 地址/接口/用户名
$host: # 请求主机名 -> Host请求字段主机名 -> 请求匹配的服务器名
$hostname: # 主机名
# 响应
$server_[addr/name/port]: # 响应服务的 地址/名/接口
$status: # 响应状态

$connection[_requests]: # 请求 序列号/请求数量
$content_length/$content_type: # 请求头字段
$document_root: # 当前请求的文档根目录或别名
$http_(name): # 读取请求头字段, - 变成 _ ,大写变小写
$https: on | "" # 是否 SSL 模式运行
$is_args: ? | "" # 是否有参数
$limit_rate: # 设置可以响应速率限制
$realpath_root: # 绝对路径，解析完 root、alias
$scheme: # 请求模式，http/https

#1.08
$http_user_agent: # 客户端代理信息
$request_body_file: # 发往后端的本地文件名
$request_filename: # 请求的文件路径名
```

