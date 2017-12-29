# EssayWebpackUpload
### 介绍
支持http请求的webpack的上传插件

### 安装
你可以通过NPM来安装
```
npm install EssayWebpackUpload -g;//来安装全局
npm install EssayWebpackUpload --save-dev; //安装项目内
```

### 使用方法

```
new EssayWebpackUpload({
    host: 'userhost',
    port: 'userport',
    source: 'dist',
    cdnDir: 'userserverpath',
    previewDir: 'userPreviewPath'
})
```

### 参数介绍
|Attributes|forma|describe
|---|---|---|
|host| string| 服务端host,必填
|port| integer| 端口号, 默认3000
|source| string| 需要上传路径，默认dist
|cdnDir| string| 上传文件中js,css,图片等静态资源上传的服务器地址
|previewDir| string| 上传文件中html等展示文件上传的服务器地址

### 例子
如：
```
new JDWebpackUpload({
    host: 'userhost',
    port: 'userport',
    source: 'dist',
    cdnDir: 'cdn.test.com',
    previewDir: 'preview.test.com'
})
```
dist目录结构
dist/js/index.js;
上传路径为：cdn.test.com/js/index.js