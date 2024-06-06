## wsl ubuntu  安装

```shell
wsl --list --online
wsl --install -d Ubuntu-24.04 --web-download
```



```sh
installing(){
	cd /opt
	if [ ! -f "./nginx-1.26.1.tar.gz" ]
	then
		echo "下载中..."
		wget https://nginx.org/download/nginx-1.26.1.tar.gz
	fi
	echo "解压中..."
	tar -zxf nginx-1.26.1.tar.gz
	echo "开始配置..."
	cd ./nginx-1.26.1
	./configure --with-http_ssl_module \
	--prefix=/opt/nginx \
	--with-pcre=../pcre-8.45 \
	--with-zlib=../zlib-1.3.1 \
	--with-openssl=../openssl-3.3.0 \
	# 设置 location.gunzip=on，识别并兼容 gzip。注释去掉，标识合并成一行
	--with-http_gunzip_module \
	# 设置 location.gzip_static=on，开启静态文件 .gz 
	--with-http_gzip_static_module \
	# 支持图片压缩等操作
	--with-http_image_filter_module \
	# 设置 location.stub_status 获取各种连接数，请求数，控线连接数等
	--with-http_stub_status_module
	echo "开始构建安装..."
	make & make install
	
	if read -t 10 -p "是否要删除压缩包[y/n]" isRemove
	then
		if (( $isRemove = "y" ))
		then
			cd /opt
			echo "移除压缩包中..."
			rm nginx-1.26.1.tar.gz
		fi
	fi
}

installDeps(){
	cd /opt
	echo "开始安装依赖..."
	gccUrl=`which gcc`
	if [ -z $gccUrl ]
	then
		echo "安装编译器..."
		# 包含 make 工具、gcc/g++ C编译器、libc6-dev C头文件和开发库
		apt-get install build-essential
		# 包装扩展了 gcc 的库
		apt-get install libtool
		# 安装 libgd 图片工具库
		apt-get install libgd-dev
	fi
	
	if [ ! -d "./pcre-8.45" ]
	then
		echo "安装 PCRE 库..."
		wget http://downloads.sourceforge.net/project/pcre/pcre/8.45/pcre-8.45.tar.gz
		tar -zxvf pcre-8.45.tar.gz
		cd ./pcre-8.45
		./configure
		make & make install
		cd /opt
		rm pcre-8.45.tar.gz
	fi
	
	if [ ! -d "./zlib-1.3.1" ]
	then
		echo "安装 zlib 库..."
		wget http://zlib.net/zlib-1.3.1.tar.gz
		tar -zxvf zlib-1.3.1.tar.gz
		cd ./zlib-1.3.1
		./configure
		make & make install
		cd /opt
		rm zlib-1.3.1.tar.gz
	fi
	
	if [ ! -d "./openssl-3.3.0" ]
	then
		echo "安装 openssl 库..."
		wget http://www.openssl.org/source/openssl-3.3.0.tar.gz
		tar -zxvf openssl-3.3.0.tar.gz
		# cd ./openssl-3.3.0
		# ./config --prefix=/opt/openssl
		# make & make install
		# cd /opt
		rm openssl-3.3.0.tar.gz
	fi
}

testPort(){
	port=`netstat -ano|grep 80`
	if [$port]
	then
		echo "端口被占用";
		exit 0;
	else
		echo "开始安装中...";
		installDeps
		installing
	fi
}

hasNginx=$(which nginx);
if [ $hasNginx2 ]
then
	echo "已经安装nginx";
	exit 0;
else
	testPort;
	
fi
```

## 安装 [mongdb](https://www.itshangxp.com/mongodb/win10-wsl2-install-mongodb/)

```sh
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu2204-6.0.15.tgz

sudo tar -zxvf mongodb-linux-x86_64-4.0.18.gz
sudo mv /opt/mongodb-linux-x86_64-4.0.18 /opt/mongodb

rm mongodb-linux-x86_64-4.0.18.gz

cd ./mongodb
mkdir data etc log

vim /opt/mongodb/etc/mongod.conf # 内容如下

ln -n /opt/mongodb/bin/mongod /usr/bin/mongod

mongod -f /opt/mongodb/etc/mongod.conf
```

## 配置

```yaml
# mongod.conf 
# for documentation of all options, see: 
# http://docs.mongodb.org/manual/reference/configuration-options/ 
storage: 
  dbPath: /opt/mongodb/data 
  journal: 
  enabled: true 
  directoryPerDB: true 
systemLog: 
  destination: file 
  logAppend: true 
  path: /opt/mongodb/log/mongod.log 
net: 
  port: 27017 
  bindIp: 127.0.0.1 
processManagement:
  fork: false # true 时 wsl 环境下 systemctl 自启动会 48 错误
  timeZoneInfo: /usr/share/zoneinfo 
security: 
  authorization: disabled
```



## 自启动

```sh
sudo nano /etc/systemd/system/nginx.service

Description=nginx - high performance web server\n
After=network.target remote-fs.target nsslookup.target
[Service]
Type=forking
ExecStart=/opt/nginx/sbin/nginx -c /opt/nginx/conf/nginx.conf
# ExecReload=/usr/local/nginx/sbin/nginx -s reload
# ExecStop=/usr/local/nginx/sbin/nginx -s stop
[Install]
WantedBy=multi-user.target

# 启动、停止、自启动、重启
systemctl start/stop/enable/restart nginx.service
```

```sh
sudo nano /etc/systemd/system/mongodb.service

[Unit]
Description=High-performance, schema-free document-oriented database
Documentation=https://docs.mongodb.org/manual

[Service]
User=root
Group=root
ExecStart=/usr/bin/mongod --config /opt/mongodb/etc/mongod.conf

[Install]
WantedBy=multi-user.target

# 启动、停止、自启动、重启
systemctl start/stop/enable/restart mongodb.service

```

## 日志自动分割

```sh
vim auto_cut_nginx.log.sh

#! /bin/bash
#Automatic Cutting of Nginx logs

nginx = (
	[0]=access.log 
	[1]=/opt/nginx 
	[2]=access_`%Y%m%d`.log 
	[3]=error.log 
	[4]=error_`%Y%m%d`.log
	[5]=`ps -ef |grep nginx|awk '/master/ {print $2}'`
)

# 分割日志
mv ${nginx[1]}/logs/${nginx[0]} ${nginx[1]}/logs/${nginx[2]}
mv ${nginx[1]}/logs/${nginx[3]} ${nginx[1]}/logs/${nginx[4]}

kill -USR1 ${nginx[5]}
if [ $? -eq 0 ]
then
echo -e "\033[32m The ${nginx[2]} Cutting Successfully \033[0m"
echo -e "\033[32m The ${nginx[4]} Cutting Successfully \033[0m"
fi

# 凌晨定时任务
crontab -e
0 0 * * * /bin/sh /data/scripts/auto_cut_nginx.log.sh
```

```sh
vim /etc/logrotate.d/nginx

/opt/nginx/logs/error.log {
  su root root
  daily
  rotate 7
  ifempty
  dateext
  dateformat .%Y-%m-%d(%s)
}

/opt/nginx/logs/access.log {
  su root root
  daily
  rotate 7
  ifempty
  dateext
  dateformat .%Y-%m-%d(%s)
  postrotate
    kill -USR1 `cat /opt/nginx/logs/nginx.pid`
  endscript
}

# -d 测试配置
./logrotate -f /etc/logrotate.d/nginx
```

