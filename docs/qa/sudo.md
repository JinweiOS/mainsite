# sudo 子命令找不到

sudo有时候会出现找不到命令，而明明PATH路径下包含该命令，让人疑惑。其实出现这种情况的原因，主要是因为当 sudo以管理权限执行命令的时候，linux将PATH环境变量进行了重置，当然这主要是因为系统安全的考虑，但却使得sudo搜索的路径不是我们想要的PATH变量的路径，当然就找不到我们想要的命令了。

## 解决办法

打开sudo的配置文件:

```shell
sudo vim /etc/sudoers
```

将Defaults env_reset改成Defaults !env_reset取消掉对PATH变量的重置，然后在.bashrc或/etch/profile中最后添加: 
```shell
alias sudo='sudo env PATH=$PATH'
```

这样sudo执行命令时所搜寻的路径就是系统的PATH变量中的路径，如想添加其他变量也是类似。