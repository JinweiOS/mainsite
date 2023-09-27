# PNPM镜像安装

## 使用场景解释

pnpm是目前使用感受上最佳的一个Node.js包管理工具，它有很多中安装方式。你可以先安
装[Node.js](https://nodejs.org/en)，之后通过Node.js提供的npm命令安pnpm；
也可以使用Node.js提供的实验特性[corepack](https://nodejs.org/api/corepack.html)直接激活pnpm；还可以直接通过官方提供的[安装脚本](https://pnpm.io/installation#using-a-standalone-script)，直接安装pnpm的exe文件。

现在遇到的问题是，如果你网络条件欠佳，无法访问github，那官方安装命令无法正常执行。又因为，pnpm提供了[env命令](https://pnpm.io/cli/env)对Node.js的版本进行管理，所以得到一个Node.js使用的最佳实践：**在未安装Node.js情况下，直接安装pnpm，再使用pnpm对Node.js版本进行管理。** 这样，就不必再去折腾[nvm](https://github.com/nvm-sh/nvm)，[n](https://github.com/tj/n)等Node.js版本管理工具。

## 开始安装pnpm

综上，如果你的win上已经安装了Node.js，可以先在将其卸载，然后 **用管理员身份** 重新执行以下命令。

```shell
# windows上使用
iwr https://pnpm.beingthink.com/install.ps1 -useb | iex
# posix系统上使用
curl -fsSL https://pnpm.beingthink.com/install.sh | sh -
# 或者
wget -qO- https://pnpm.beingthink.com/install.sh | sh -
```

## 安装lts版本Node.js

使用pnpm的env命令安装最新Node.js的lts版本。

```shell
pnpm env use --global lts
```

之后验证node.js的安装即可。

