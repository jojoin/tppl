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
        var tpls = tpl.replace(/[\r\t\n]/g, " ").split('[:')
            , i = 0
        while(i<tpls.length){
            var p = tpls[i];
            if(i){
                var x = p.indexOf(':]');
                fn.$ += p.substr(0, x);
                p = p.substr(x+2)
            }
            fn.$ += "$+='"+p.replace(/\'/g,"\\'").replace(/\[\=\:(.*?)\:\]/g, "'+$1+'")+"';";
            i++;
        }
        fn.$ += "return $";
    }

    return data ? fn(data) : fn;
}
