# Magix Doc

[Magix](http://github.com/thx/magix)项目的开发文档

## 开发
```bash
npm install
```
也可以用cnpm tnpm等。

安装完依赖后运行
```bash
gulp combine
```
则把tmpl目录下的文件合并处理到src目录下

如果需要实时合并处理，则运行

```bash
gulp watch
```
这样修改tmpl目录下的文件时，就会实时被合并处理到src目录下

