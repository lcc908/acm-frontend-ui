# Ant Design Pro

这个项目是用Ant Design Pro初始化的。以下是如何使用的快速指南

## 环境准备

安装node_modules：

```bash
npm install
```

or

```bash
yarn
```

### 启动项目

```bash
npm start
```

### 构建项目

```bash
npm run build
```

### 检查代码样式

```bash
npm run lint
```

还可以使用脚本自动修复一些 lint 错误：:

```bash
npm run lint:fix
```

### 测试代码

```bash
npm test
```

## 问题
创建和初始化项目的时候报错：Can't resolve 'btoa' in 'D:\myapp\node_modules\swagger-ui-react'
解决方法：
```bash
yarn add swagger-ui-react
yarn start
```
