tppl.js
=======

**全球最快的 js 模板引擎**

##	特性

1.  代码精简，就一个函数，方便嵌入任何位置
2.	性能卓越，为目前最快的模板引擎（[性能测试](http://yangjiepro.github.io/tppl/test/test.htm)）
3.	编译缓存，一次编译重复渲染使用
4.	无模板语法，使用原生js
5.	兼容Node.js及所有流行的浏览器

JS模板引擎效率测试：

![效率测试](test/all.jpg)

“第一梯队”效率测试：

![效率测试](test/some.jpg)

tppl 的编译渲染速度是著名的 jQuery 作者 John Resig 开发的 tmpl 的 **43** 倍！与第二名 artTemplate 也有一倍的差距。 查看 [性能测试](http://yangjiepro.github.io/tppl/test/test.htm) ，单次结果不一定准确，请多测几次。


## 快速上手

### 编写模板

使用一个``type="text/html"``的``script``标签存放模板：
	
	<script id="test" type="text/html">
	[: if (admin){ :]
		[: for (var i=0;i<list.length;i++) { :]
			<div>[=:i:]. [=:list[i].user:]</div>
		[:}:]
		[=:this.name||"name is not found !":]
	[:}:]
	</script>

### 渲染模板
	
	var data = {
		title: '标签',
		list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
	};
	var html = tppl(document.getElementById('test').innerHTML, data);


##	下载

* [tppl.js](https://github.com/yangjiePro/tppl/blob/gh-pages/tppl.js) *(原生语法, 1.19kb)* 

## 方法

###	tppl(tpl, data, fast)

返回渲染好的模板内容。参数`fast`表示是否采用[快速模式](#快速模式)

更改引擎的默认配置。

字段 | 类型 | 默认值| 说明
------------ | ------------- | ------------ | ------------
openTag | String | ``'[:'`` | 逻辑语法开始标签
closeTag | String | ``":]"`` | 逻辑语法结束标签
valueTag | String | ``'[=:'`` | 输出变量开始标签
valueTag | String | ``':]'`` | 输出变量结束标签
	
## 授权协议

Released under the MIT, BSD, and GPL Licenses

============

© yangjie@jojoin.com
