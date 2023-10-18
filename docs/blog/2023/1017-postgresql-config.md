# ubuntu 20.04 安装PostgreSQL

## 说明

由于在国内，因此使用镜像源安装，配置中科大源

```shell
# 添加中科大deb 仓库地址配置
sudo sh -c 'echo "deb http://mirrors.ustc.edu.cn/postgresql/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

# 导入中科大签名key:
wget --quiet -O - http://mirrors.ustc.edu.cn/postgresql/repos/apt/ACCC4CF8.asc | sudo apt-key add -

# 更新软件包列表:
sudo apt-get update

# 安装最新 PostgreSQL 版本.
# 安装指定版本如  'postgresql-12' 替换 'postgresql':
sudo apt-get -y install postgresql
sudo apt-get -y install postgresql-10
sudo apt-get -y install postgresql-11
sudo apt-get -y install postgresql-12
```

安装完成后，查看PostgreSQL的状态是否正常，如果未启动，手动将其启动

```shell
sudo systemctl status postgresql@15-main

# 启动postgresql
sudo systemctl start postgresql@15.service
```

## 登录数据库

PostgreSQL使用`roles`概念管理用户，默认会创建一个uinx/linux系统上同名的用户——postgres，
因此初次登录的一种方式是，直接将linxu的用户却幻之postgres，在直接用psql登录数据库

```shell
# 切换用户
sudo -i -u postgres

# 登录至postgresql cli
psql

# 离开
postgres=# \q
```

保持用户名为postgres，可以创建一个新用户，例如，笔者的ubuntu系统中默认用户名为ubuntu，因此可以执行如下命令，创建新用户

```shell
postgres@server:~$ createuser --interactive
```

用户创建完之后，如果直接进行登录，会提示没有名为ubuntu的数据库。因为PostgreSQL的默认逻辑是，如果用新创建的用户名登录数据库，默认登录的数据库名称和当前用户名同名，所以在创建完新用户后，还需要创建同名的数据库

```shell
postgres@server:~$ createdb ubuntu
```

如果当前用户有多个数据库，登录时可以使用`-d`参数进行指定

```shell
# 在当前用户下，进入test数据库
psql -d test -p 5432
```

## 远程连接

### 配置用户密码

远程登录需要使用密码，先给用户设置密码，登录进入sql命令行，执行如下sql

```sql
ubuntu=# alter user ubuntu with password '123456';
ALTER ROLE
```

### 配置PostgreSQL允许远程访问

1. 配置postgresql.conf，允许service运行在真实网口上

```shell
 sudo vim /etc/postgresql/15/main/postgresql.conf

 #------------------------------------------------------------------------------
# CONNECTIONS AND AUTHENTICATION
#------------------------------------------------------------------------------

# - Connection Settings -
listen_addresses = '*' # 增加此行
#listen_addresses = 'localhost'         # what IP address(es) to listen on;
                                        # comma-separated list of addresses;
                                        # defaults to 'localhost'; use '*' for all
                                        # (change requires restart)
port = 5432                             # (change requires restart)
max_connections = 100                   # (change requires restart)
```

2. 配置pg_hba.conf

修改用户网段配置，允许所有客户端通过密码验证方式登录

```shell
 sudo vim /etc/postgresql/15/main/pg_hba.conf

# IPv4 local connections:
#host    all             all             127.0.0.1/32            scram-sha-256
host    all             all             0.0.0.0/0            scram-sha-256 # 增加此行
```

之后重启服务即可

```shell
sudo systemctl restart postgresql
```

至此，即可通过Navicat等终端工具连接PostgreSQL了。

## 向量扩展安装

pgvecto.rs扩展是针对PostgreSQL-15开发的，因此，前置应该安装15版本的数据库。安装方式具体可见[pgvecto.rs](https://github.com/tensorchord/pgvecto.rs/blob/main/docs/install.md)官方地址。

:::tip 注意
sudo apt install ./vectors-pg15-*.deb 此条命令的执行，需要加上路径，官方文档没有提醒
:::

