function Selfvue(options={}){
    // 将所用属性挂载到$options上
   this.$options = options;
    // 将data也挂载在实例上    
   var data = this._data = this.$options.data;
   observe(data)
};
// 观察对象给对象增加object.defineProperty()
function Observe(data){
    // 在这里面写我们的主要逻辑
    for(let key in data){
    // 把data里面的属性通过Object.defineProperty的方式进行定义
        // 获取data里面的属性值
        let val = data[key]
        // observe(val)
        Object.defineProperty(data,key,{
            configurable:true,
            enumerable:true,
            get(){
                return val
            },
            set(newVal){
                if(newVal === val){
                    // 设置的值和以前的值一样的话
                    return
                }{
                    val = newVal
                }
            }
        })
    }
};
function observe(data){
    if(typeof data)
    return new Observe(data)
}