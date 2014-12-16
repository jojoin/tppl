
function tppl(tpl, data){
  var fn = function (d) {
    //console.log(fn);
    return fn.$.apply(d);
  };
  if(!fn.$){
    var $ = 'var $="";';
    var tpls = tpl.replace(/[\r\t\n]/g, " ").split('[:')
      , l = tpls.length
      , i = 0
    while(i<l){
      var p = tpls[i];
      if(i){
        var x = p.indexOf(':]');
        $ += p.substr(0, x);
        p = p.substr(x+2)
      }
      $ += "$+='"+p.replace(/\[\=\:(.*?)\:\]/g, "'+$1+'")+"';";
      i++;
    }
    $ += "return $";
    fn.$ = new Function($);
  }

  return data ? fn(data) : fn;
}