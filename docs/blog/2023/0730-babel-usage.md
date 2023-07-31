# Babel最佳实践

## Babel 是什么
Babel 是一个可以将 **使用ES2015+语法的代码** 编译成 **向后兼容** 的代码的工具。当我们使用 EcmaScript 较高版本的 Javascript 语法特性的时候，将所写代码转换成兼容 ES5 的代码，目的支持尽可能多的平台。对于转换的规则，主要有分为以下两类：

- Sytanx类型。例如箭头函数、const/let 等语法特性，babel 可以通过[各种插件](https://babeljs.io/docs/en/plugins)实现兼容。
- 运行时api。例如数组的静态方法Array.from()、实例方法 arr.includes() 等，需要引入 corejs 作为 polyfill（垫片），从而能够在运行时提供支持。
## 功能模块构成

- 核心库——@babel/core

@babel/core 模块是一个可以完成代码字符串分析的库，把 js 代码转换成 ast，方便各个插件分析语法并进行相应的处理，如下是官方给的使用示例：
```javascript
const babel = require("@babel/core");

babel.transform("code", optionsObject);
```

- 命令行工具——@babel/cli

当我们使用核心库的时候，一般不直接再代码中调用@babel/core提供的api，而是使用bable提供的命令行工具来进行源代码的转换。一般我们在使用的时候，将其作为 package.json 文件的一个 scripts 脚本进行配置，用于对指定文件夹的 js 语言做转换。例如以下示例，当我们运行  npm run babel，即可将根目录的 src 目录下所有的 js 文件进行转换，完成后放置于根目录 dist 下。
```json
  "scripts": {
    "babel": "babel src --out-dir dist"
  },
```

- 实际担任代码转化的角色——[形形色色的 Plugin](https://babeljs.io/docs/en/plugins)

babel 的语法转换功能依赖于各种插件。比如当我们使用箭头函数转换的插件  @babel/plugin-transform-arrow-functions ，当我们配置此插件后，源代码中的箭头函数将会被转换成普通的 Javascript 函数。
```javascript
// 源代码
const print = (a) => console.log(a)

// 目标代码
var print = function print(a) {
  return console.log(a);
};
```

- 插件集合——Presets

顾名思义，preset(预装置)就是多个插件的集合。例如，当我们的开发场景中需要使用箭头函数和可选操作符，那么我们可以将  @babel/plugin-transform-arrow-functions 和 @babel/plugin-proposal-optional-chaining 进行组合形成一个preset，当我们再次遇到需要使用箭头函数和可选操作符的转换场景的时候，直接使用此 preset，不必要在单个配置 Plugin。
官方提供了[四个Presets](https://babeljs.io/docs/en/presets)，其中 @babel/preset-env 是我们常用的 preset，它提供了最新的 Javascript 语法转换，使用它，可以做到 Makes your life easier！

- 配置文件——推荐以 js 的形式

上文的介绍中，有很多的具体配置，那我们在什么地方进行 Plugin/Presets 的配置呢？官方给了多个文件类型和多个不同的文件，此处推荐使用 babel.config.js——即在根目录下创建 babel.config.js 并在其中导出 presets 和 plugins 对象。
当我们使用 Javascript 进行配置的时候，拥有更多的控制能力。可以以代码的方式控制在不同目标环境下应用不同的语法转换规则。
```javascript
// 根目录下的 babel.config.js 文件中的内容

const plugins = [
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-proposal-optional-chaining'
]

const presets = [
    ['@babel/env', {
        useBuiltIns: 'usage',
        corejs: 3
    }]
]

module.exports = { plugins, presets }
```
## Babel 的具体配置规则
在使用 babel 之前，我们首先安装 @babel/core, @babel/cli，命令如下：
```javascript
npm install --save-dev @babel/cli @babel/core
```
在你项目的编译脚本中，添加如下脚本配置：
```javascript
  "scripts": {
    "babel": "babel src --out-dir dist"
  },
```
### 1. 仅做 Syntax 转换
当我们仅仅只想尝试某一个新的 Javascript 语法特性的时候，可以直接安装对应语法特性的 Plugin，例如当我们使用可选操作符 ( ?. ) 的时候，我们就可以安装 @babel/plugin-proposal-optional-chaining。
```javascript
npm install --save-dev @babel/plugin-proposal-optional-chaining
```
之后，再更目录下创建 .babel.js 文件，写入此 Plugin 的配置并导出。
```javascript
const plugins = [
    '@babel/plugin-transform-arrow-functions',
]

module.exports = { plugins }
```
那么，我们尝试使用会发现，转换成功了。
```javascript
// 源代码
const baz = obj?.foo?.bar?.baz;

// 转换后
var baz = obj === null || obj === void 0 ? void 0 : (_obj$foo = obj.foo) === null || _obj$foo === void 0 ? void 0 : (_obj$foo$bar = _obj$foo.bar) === null || _obj$foo$bar === void 0 ? void 0 : _obj$foo$bar.baz;
```
### 2. 推荐用法(非工具库)

为了尽量少的关心插件，我们可以使用官方提供的 @babel/preset-env。当我们配置此 Preset 时，让 babel 同时支持 Syntax 层面和 built-ins 层面的转化。为了支持 built-ins 转换，我们需要添加 useBuiltIns 的配置，具体步骤如下：
```javascript
// 安装 @babel/preset-env
npm install --save-dev @babel/preset-env
// 安装 @core-js@3
// 由于 built-in 是运行时环境的依赖，所以要使用 --save
npm install --save core-js@3

// .babel.js 配置
const presets = [
    ['@babel/env', {
        // 此配置项的值可以配置为 entry/usage
        // entry: 注入目标环境不支持的所有 built-in 类型语法
        // usage: 注入目标环境不支持的所有被用到的 built-in 类型语法
        useBuiltIns: 'usage',
		// built-in 需要 corejs 的支持。corejs3 支持对象的实例方法
        corejs: 3
    }]
]

module.exports = { presets }
```

### 3. 推荐用法(工具库)——@babel/plugin-transform-runtime
使用此插件的原因主要有两个：

- 默认情况下，babel 在做 built-in 类型的转换时，会在源代码每个文件里面引入 core-js 的 helper 函数，有时这是没有必要的。当使用 @babel/plugin-transform-runtime 时，所有的 helpers 都只会引 @babel/runtime。
- 此插件可以提供一个运行的沙箱环境。如果直接使用 core-js，那对于 Promise、Set 等对象，都会污染全局作用域。如果你现在开发的是一个工具包，你使用了 core-js 提供了 Promise、Set 的语法转换。当别人在他的项目里引入了你的工具包，恰恰他的项目中已经实现了 Promise、Set 等函数，这就会导致复杂的冲突问题。

配置如下所示：
```javascript
// 安装 @babel/plugin-transform-runtime
npm install --save-dev @babel/plugin-transform-runtime

// 安装生产环境依赖
// 此处和是否使用 core-js 及 core-js 版本有关
// corejs: false
npm install --save @babel/runtime
// corejs: 3 以下配置示例中的 corejs 版本
npm install --save @babel/runtime-corejs3
// corejs: 2
npm install --save @babel/runtime-corejs2

// .babel.js 配置详情
// 这是在 nodejs 配置中推荐的使用方式
const plugins = [
    ['@babel/plugin-transform-runtime', {
        corejs: 3
    }]
]

// 此处需要注意，当我们使用了 @babel/runtime-corejs2，原先的 corejs@3 便不需要使用了
const presets = [
    ['@babel/env']
]

module.exports = { plugins, presets }
```

### 4. 备注

那具体配置规则中，第 2 点和第 3 点到底有何区别呢？我们以数组原型方法 includes 举例。我们使用以下源代码做测试。

```javascript
const pets = ['cat', 'dog', 'bat']
pets.includes('cat')
```

当我们使用 [2.推荐用法(非工具库)](#heading-4) 的配置时，转换之后的代码如下所示：
```javascript
// 转换之后的代码
"use strict";

require("core-js/modules/es.array.includes");

var pets = ['cat', 'dog', 'bat'];
pets.includes('cat');
```
我们可以看到，babel 为我们引入了 corejs 中实现的 includes 方法。其实从转换结果，仅仅多了一句 require，我们就基本可以推断，能让后面 pets.includes 可以无感知的调用是因为 includes 方法被挂载到当前运行平台 Array 对象的原型上。以下是 es.array.includes 中的代码(代码有删减)，其中有这样一个调用:
```javascript
...
// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: !USES_TO_LENGTH }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});
```

$ 针对 Array 做了 includes 方法的挂载。也就是说，此配置方式可能会干扰运行环境的全局对象及其原型方法，如果我们用此 babel 配置进行工具库代码的转换，别人引入之后可能会对其项目产生不良影响。

下面我们对比 [3.推荐用法(工具库)](#heading-5) 里面的转换结果：

```javascript
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var pets = ['cat', 'dog', 'bat'];
(0, _includes["default"])(pets).call(pets, 'cat');
```
此配置方法转换的结果，includes 方法直接被转换成 _includes 局部函数并通过立即调用函数表达式进行执行。这样对全局方法完全没有影响。因此当我们使用此方法开发工具库，别人引入后，我们也就不会有全局对象冲突的问题。