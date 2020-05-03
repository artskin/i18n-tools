function deepClone(data) {
  let t = type(data), o, i, ni;
  if(t === 'array') {
    o = [];
  }else if( t === 'object') {
    o = {};
  }else {
    return data;
  }
  
  if(t === 'array') {
    for (i = 0, ni = data.length; i < ni; i++) {
      o.push(deepClone(data[i]));
    }
    return o;
  }else if( t === 'object') {
    for( i in data) {
      o[i] = deepClone(data[i]);
    }
    return o;
  }
}

// 返回顶部动画特效
setTimeout(function animation() {
  //if ($this.scrollTop > 0) {
    setTimeout(() => {

      // 步进速度
      window.scrollTop = window.scrollTop-30
      //$this.scrollTop = $this.scrollTop - 30;

      // 返回顶部
      // if(document.documentElement.scrollTop > 0) {
      //   document.documentElement.scrollTop = $this.scrollTop - 30;
      // } else if (window.pageYOffset > 0) {
      //   window.pageYOffset = $this.scrollTop - 30;
      // } else if (document.body.scrollTop > 0) {
      //   document.body.scrollTop = $this.scrollTop - 30;
      // } else if (document.querySelector($this.el).scrollTop) {
      //   document.querySelector($this.el).scrollTop = $this.scrollTop - 30;
      // }

      animation();
    }, 1);
  //}
}, 1);


  //将后台的json转成jsonTree格式
function jsonTree(data,config) {
  //1.声明了变量，拿到传参过来的值，注意这里拿到的是string类型，不是对应的值
  var id = config.id || 'id',
      pid = config.pid || 'pid',
      children = config.children || 'children';
      var idMap = [],
      newIdMap = [],
      jsonTree = [];
  /*2.v[id]==v[“id”]==v.id
    idMap数组的下标对应着id为下标的相应json数据
    a[1]对应着id为1的json数据，以此类推*/
  data.forEach(function(v){
    idMap[v[id]] = v;
  });
  //3拿到当前遍历的父元素id
  /*根据父元素id，判断数组里是否存在这样一条数据
  存在，就判断父元素是否有子元素数组，若没有就添加一个children数组（传参过来的） 
  把当前元素添加父元素的children数组里
  不存在，就直接添加到jsonTree里*/
  data.forEach(function(v){
    var parent = idMap[v[pid]];
    //定义一个newIdMap
    delete v.parent;//删除{v}的parent和id
    //delete v.id;
    if(parent) {
      !parent[children] && (parent[children] = []);
      parent[children].push(v);
    } else {
      jsonTree.push(v);
    }
  });
  return jsonTree;
};
export { jsonTree };
