// 1创建一个构造函数
function Mvvm(options = {}){
    // 2将所用属性挂载到$options身上
    this.$options = options
    // 3模仿data的语法,将data也挂载在实例上
    let data = this._data = this.$options.data
    // 4数据劫持
    observe(data)
}

// 1创建一个Observ构造函数
// 这里写数据劫持的主要逻辑
function Observe(data){
    // 数据劫持的目的是给对象新增get、set
    // 2遍历对象，把data里面属性通过defineProperty的方式定义
    for (let key in data){
        let val = data[key]
        // 3使用递归往下找，实现深度劫持
        observe(val)
        Object.defineProperty(data,key,{
            configurable:true,
            // enumerable:true,
            get(){
                return val
            },
            set(newVal){
                // 4如果修改的新值和旧值一样 不处理
                if(val === newVal) {
                    return
                }
                // 5之后再通过get获取val的时候会得到newVal
                val = newVal
                // 6当设置成新值后，也需要把新值再去定义成属性???
                observe(newVal)
            }
        })
    }
}

// 递归调用的函数
function observe(data){
    // 参数不是对象的话直接return掉 防止递归溢出
    if(!data || typeof data !== 'object' ){ return }
    return new Observe(data)
}