
function tppl(tpl, data){
  var fn =  function (d) {
      fn.$$ = fn.$$ || new Function(fn.$);
      return fn.$$.apply(d);
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
      i++;
    }
    fn.$ += "return $";
  }

  return data ? fn(data) : fn;
}