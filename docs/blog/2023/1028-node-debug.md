# Node.js不错的Debug方式

前端项目在浏览器中单步调试，大家都轻车熟路。无论项目是基于webpack还是vite，只要能够配置好source-map生成的选项，在开发者工具中 **源代码/来源** 的选项中可以任意的打断点调试。

Node.js基础的web项目调试也是如此，在VSC中床垫对用的lanch.json文件，配置好入口文件就可以愉快的调试了。

但是当我们去调试一个依赖关系复杂的项目，例如编写一个webpack loader或者vite的plugin，对这些loader/plugin进行调试时，配置VSC的lanchu.json文件略显繁琐。我们可以采用node的--inspect配合chrome devtool进行调试。

首先在对应的启动脚本中加上--inspect参数，例如，webpack的启动脚本时这样的
```json
"scripts": {
  "build": "webpack --config webpack.config.js --env mode=prod",
  "dev": "webpack serve --config webpack.config.js --env mode=dev"
}
```
找出webpack这个命令的具体目录，不难发现它其实时node_modules中webapck目录下的启动文件，因此将webpack替换成`./node_modules/webpack/bin/webpack.js`，在加上inspect，便得到完整的debug命令
```shell
node --inspect-brk ./node_modules/webpack/bin/webpack.js --config ./webpack.config.js --env mode=prod
```
这条命令执行后，会启动一个debuger，并且生成一个ws的连接，类似如下的日志
```shell
$ node --inspect-brk ./node_modules/webpack/bin/webpack.js --config ./webpack.config.js 
Debugger listening on ws://127.0.0.1:9229/bafc98e4-173d-439c-b89d-1db6f61a546f       
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
Waiting for the debugger to disconnect...
```

此时打开chrome，输入连接 [chrome://inspect/](chrome://inspect/), 即可看到主页面中有 `Open dedicated DevTools for Node`，点击即可打开开发者工具。由于默认--inspect-brk是直接暂停在程序启动的第一行代码，因此不用担心我们还没有打断点程序便运行结束了。

紧接着，找到新打开的DevTool页面，找到工作区，导入源代码目录。之后就可以找到需要打断点的文件打上断点，直接跳转至断点即可。如果在工作区中修改了代码，`ctrl+s`保存之后，会自动同步到源代码目录。