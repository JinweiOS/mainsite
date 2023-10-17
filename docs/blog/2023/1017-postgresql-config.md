# ubuntu 20.04 安装PostgreSQL

## 说明

ubuntu内置了PostgreSQL安装包，因此安装步骤简介明了

```shell
sudo apt update
sudo apt install postgresql postgresql-contrib
```

安装完成后，查看PostgreSQL的状态是否正常，如果未启动，手动将其启动

```shell
sudo systemctl status postgresql.service

# 启动postgresql
sudo systemctl start postgresql.service
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
psql -d test
```

