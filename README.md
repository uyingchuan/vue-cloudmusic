# vue-cloudmusic
网页版音乐播放器

后端API见 [官方文档](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi)

项目目录结构

``` 
├── public 
|   ├── favicon.ico ·····网站图标
|   └── index.html ······模板HTML文件
├── src
|   ├── assets ··········静态资源
|   ├── components
|   |   ├── base ········基础组件
|   |   |   └── icon.vue ···········Icon组件，圆形图标
|   |   └── layout ······页面级组件
|   |       └── header.vue ·········网页头部Header组件
|   ├── plugin ··············组件注册（基础组件和Element组件）
|   ├── router ··············路由 
|   ├── store ···············vuex
|   ├── style
|   |   ├── themes ··········切换主题的样式文件
|   |   |   └── variable-white.js ······页面白色主题的样式表
|   |   ├── mixin.scss ·················Mixins模块
|   |   └── variables.scss ·············SCSS变量表
|   └── utils ···············js工具集
|       ├── index.js ···················工具集入口文件
|       └── rem.js ·····················尺寸计算工具
├── App.vue ·············vue页面入口文件
└── main.js ·············vue程序入口文件 
```