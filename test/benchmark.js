

/**
 * javascript模版引擎-tmpl的bug修复与性能优化
 * http://yiheng.iteye.com/blog/1577360
 */

var tmpl = (function (cache, $) {
    return function (str, data) {
        var fn = function (data) {
            var i, variable = [$], value = [[]];
            for (i in data) {
                variable.push(i);
                value.push(data[i]);
            };
            return (new Function(variable, fn.$))
                .apply(data, value).join("");
        };

        fn.$ = fn.$ || $ + ".push('"
            + str.replace(/\\/g, "\\\\")
                .replace(/[\r\t\n]/g, " ")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join($ + ".push('")
                .split("\r").join("\\'")
            + "');return " + $;

        return data ? fn(data) : fn;
    }})({}, '$' + (+ new Date));




/**
 * tppl js 极致性能模板引擎
 * github: https://github.com/yangjiePro/tppl
 */

function tppl(tpl, data, fast){
  var fn =  function (d) {
    if(fast){
        fn.$$ = fn.$$ || new Function(fn.$);
        return fn.$$.apply(d);
    }
    var i, k = [], v = [];
    for (i in d) {
        k.push(i);
        v.push(d[i]);
    };
    return (new Function(k, fn.$)).apply(d, v);
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
      fn.$ += "$+='"+p.replace(/\[\=\:(.*?)\:\]/g, "'+$1+'")+"';";
      //log(p);
      i++;
    }
    fn.$ += "return $";
  }

  return data ? fn(data) : fn;
}




/*******  开始测试  *******/



function log(obj){
    console.log(obj);
}
log('');log('');


var data = {tar: 123, get: "abc"};
//var tm = "<br><img src=\"\" /><div id=\"123\"><p><a>  <%=get%>   </a>    </p></div>"
//var tp = "<br><img src=\"\" /><div id=\"123\"><p><a>  [=:get:]   </a>    </p></div>"
var tm = '<%=tar%><br><%=tar%><br><%=get%><br><% if(this.tar=="123"){ %> <%=get%> <%}%>'
var tp = '[=:tar:]<br>[=:tar:]<br>[=:get:]<br>[: if(this.tar=="123"){ :] [=:get:] [:}:]'

for(var i=0;i<10;i++){
    //tm += tm;
    //tp += tp;
}


//tppl(tp)
//tppl(tp, data)
//log( tppl(tp) )
//process.exit(1);


var num = 100000;

var tmpl_func =  tmpl(tm);
//log(tmpl_func)

console.time('tmpl');
for(var i=0; i<num; i++){
    //tmpl(tm)
    //tmpl(tm, data)
    tmpl_func(data)
}
console.timeEnd('tmpl');

var tppl_func =  tppl(tp);
//log(tppl_func)

console.time('tppl');
for(var i=0; i<num; i++){
    //tppl(tp)
    //tppl(tp, data)
    tppl_func(data)
}
console.timeEnd('tppl');



//log( tpl );
//log( tmpl_func );
log( tmpl(tm, data) )
log( tppl(tp, data) )



log('');log('');


process.exit(1);
