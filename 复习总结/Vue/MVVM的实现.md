##### Object.defineProperty()

`该方法会直接在一个对象上定义一个新的属性，或者修改一个对象的现有属性，并返回该对象`

**Object.defineproperty(obj,prop,descriptor)方法的三个参数**

- obj：要在其身上定义属性的对象
- prop：要定义或修改的属性名称
- descriptor：将被定义或修改的属性描述符对象
  - value：该属性的值（value、writable或get、set同时只能有一对存在于描述符中）
  - writable：是否允许修改属性的值，默认false 不允许
  - configurable：是否允许delete将属性删除，默认为false 不允许
  - enumerable：属性是否可被枚举，默认为 false（即不可以通过for ...in 循环返回）
  - get：访问属性时执行的方法，默认undefined，
  - set：修改属性时执行的方法，默认undefined，该函数接收唯一参数，即为属性的新值

```js
var pig = {}
Object.defineProperty(pig,'type',{
    // 是否允许删除该对象
    configurable:true,
    // 是否允许枚举该对象的属性
    enumerable:true,
    // 获取对象属性type时调用的方法
    get(){
        console.log('执行的get方法')
        return result
    },
    // 修改该对象属性时调用的方法,将修改的值赋值给type
    set(newVal){
        result = newVal
        console.log('执行了set方法')
    }
})
pig.name = '佩奇', //set()
pig.type = '野猪', //set()
pig.type //get()
console.log(pig)
for(let key in pig){
    console.log(key)
    console.log(pig[key])
}
```

##### 打造MVVM

```js
// 11创建一个构造函数
function Mvvm(options = {}){
    // 12将所用属性挂载到$options身上
    this.$options = options
    // 13模仿data的语法,将data也挂载在实例上
    let data = this._data = this.$options.data
    // 14数据劫持
    observe(data)
}
```

##### 数据劫持

为什么要数据劫持

- 观察对象，给对象增加Object.defineProperty
- vue特点是不能新增不存在的属性 不存在的属性没有get和set
- 深度响应 因为每次赋予一个新对象时会给这个新对象增加defineProperty(数据劫持)

```js
// 21创建一个Observ构造函数
// 这里写数据劫持的主要逻辑
function Observe(data){
    // 数据劫持的目的是给对象新增get、set
    // 22遍历对象，把data里面属性通过defineProperty的方式定义
    for (let key in data){
        let val = data[key]
        // 23使用递归往下找，实现深度劫持
        observe(val)
        Object.defineProperty(data,key,{
            configurable:true,
            // enumerable:true,
            get(){
                return val
            },
            set(newVal){
                // 24如果修改的新值和旧值一样 不处理
                if(val === newVal) {
                    return
                }
                // 25之后再通过get获取val的时候会得到newVal
                val = newVal
                // 26当设置成新值后，也需要把新值再去定义成属性???
                observe(newVal)
            }
        })
    }
}

// 递归调用的函数
function observe(data){
    // 参数不是对象的话直接return掉 防止递归溢出
    if(!data && typeof data !== 'object' ){ return }
    return new Observe(data)
}
```

##### 数据代理

`数据代理就是让我们每次拿data里的数据时，不用每次都写一长串，如mvvm._data.a.b这种，我们其实可以直接写成mvvm.a.b这种显而易见的方式`

```js
  // 31 数据代理 使用this代理this_data
    for(let key in data){
        Object.defineProperty(this,key,{
            configurable:true,
            get(){
                return this._data[key]
            },
            set(newVal){
                this._data[key] = newVal
            }
        })
    }
```

##### 数据编译

将{{}}插值表达式里面的内容编译出来

