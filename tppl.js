/**
 * tppl.js 极致性能的 JS 模板引擎
 * Github：https://github.com/yangjiePro/tppl
 * 作者：杨捷  
 * 邮箱：yangjie@jojoin.com
 *
 * @param tpl {String}    模板字符串
 * @param data {Object}   模板数据（不传或为null时返回渲染方法）
 * @param fast {Boolen}   是否为快速模式
 *
 * @return  {String}    渲染结果
 * @return  {Function}  渲染方法
 *
 */

function tppl(tpl, data, fast){
  var fn =  function (d, f) {
    if(f||fast){
        fn.$$ = fn.$$ || new Function(fn.$);
        return fn.$$.apply(d);
    }else{
      var i, k = [], v = [];
      for (i in d) {
          k.push(i);
          v.push(d[i]);
      };
      return (new Function(k, fn.$)).apply(d, v);
    }
  };
  if(!fn.$){
    fn.$ = 'var $="";';
    var tpls = tpl.replace(/[\r\t\n]/g, " ").replace(/\'/g,"\\'").split('[:')
      , i = 0
    while(i<tpls.length){
      var p = tpls[i];
      if(i){
        var x = p.indexOf(':]');
        fn.$ += p.substr(0, x);
        p = p.substr(x+2)
      }


      fn.$ += "$+=('"+p.replace(/\[\=\:(.*?)\:\]/g,function(str,$1){
        var f = $1.split("|")[1];
        var v = $1.split("|")[0].trim();
        if(f&&f.indexOf("|")==-1){
            var h = f.split(":")[0]&&f.split(":")[0].trim();
            var pa = f.split(":")[1]&&f.split(":")[1].trim();
            return "'+tppl.helpers[\'"+h+"\']("+v+","+pa.replace(/\\'/g,"'")+")+'";
        }else{
          return "'+"+$1+"+'"
        }
      })+"');\n";

      i++;
    }
    fn.$ += "return $";
  }

  return data ? fn(data) : fn;
}

/**
 * 模板helper，让模板具有更加强大的功能。
 * 作者：Moejser
 * 邮箱：i@moejser.com
 * 在渲染模板之前调用tppl.helper方法注册helper
 * @param name {String} helper名是不可重复的，重复定义会被覆盖。
 * @param handler {Function} 对传入的数据进行处理的函数，这个函数会接受到两个参数：1.被处理的值，2.格式化标志位
 *
 * Usage:
 *  tppl.helper("say",function(title,format){
 *    return title+format;
 *  })
 *
 * @return  {String}  处理后的字符串
 */

tppl.helpers = {};
tppl.helper = function(name, handler){
  if(name&&hanler){
    tppl.helpers[name] = handler;
  }
}