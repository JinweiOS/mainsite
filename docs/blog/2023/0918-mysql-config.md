# Ubuntu 20.04 安装 MySQL8.0

## 前置要求

- 配置好apt镜像源，提升安装速度
- 配置好OpenSSH，确保可以远程登录ubuntu账号

## 安装

在Ubuntu 20.04系统上，可直接通过APT包管理安装MySQL。并且，默认的镜像源中MySQL的版本为8.x。执行以下命令进行安装配置。


- 更新镜像源

```shell
sudo apt update
```

- 安装MySQL-server
```shell

sudo apt install MySQL-server
```

- 使用systemctl工具，启动MySQL
```shell
sudo systemctl start MySQL.service
```

## 配置

为了刷新MySQL的配置，一般推荐执行`mysql_secure_installation`脚本——能够改变一些安全相关配置例如远程登陆，示例用户等。

:::tip 注意
截至2022年7月，mysql_secure_installation 脚本运行会出现死循环，原因是脚本试图设置root账户的密码，但是ubuntu默认安装的MySQL root账户的登录方式是auth_socket，不支持设置密码。因此，在执行脚本前，需要先修改root验证方式为mysql_native_password。
:::

```shell
# 登录
sudo mysql

# 修改本地root用户验证方式
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';

# 退出mysql
exit
```

完成上述步骤之后，便可以执行脚本了

```shell
sudo mysql_secure_installation 
# 可以直接全部回车即可
```

运行完成脚本之后，将root用户的授权方式重新修改为auth_socket。

```shell
mysql -u root -p
# 密码是上面配置的123456
ALTER USER 'root'@'localhost' IDENTIFIED WITH auth_socket;
```

## 创建新用户并授权

```shell
# 登录数据库
sudo mysql

#创建新用户
CREATE USER 'tuchuang'@'%' IDENTIFIED WITH mysql_native_password BY '!QAZ2wsx';

# 授予所有权限给新用户
GRANT ALL PRIVILEGES ON *.* TO 'sammy'@'localhost' WITH GRANT OPTION;

# 刷新权限
FLUSH PRIVILEGES;

# 退出数据库
exit;
```

## 允许远程登录

修改MySQL服务的配置文件，让程序监听机器的所有网卡。

```shell
sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf

[mysqld]
#
# * Basic Settings
#
user            = mysql
# pid-file      = /var/run/mysqld/mysqld.pid
# socket        = /var/run/mysqld/mysqld.sock
# port          = 3306
# datadir       = /var/lib/mysql


# If MySQL is running as a replication slave, this should be
# changed. Ref https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_tmpdir
# tmpdir                = /tmp
#
# Instead of skip-networking the default is now to listen only on
# localhost which is more compatible and is not less secure.
bind-address            = 0.0.0.0 # 由127.0.0.1 改为 0.0.0.0
mysqlx-bind-address     = 127.0.0.1

# 重新启动数据库服务
sudo systemctl restart mysql.service
```

