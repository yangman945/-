##### 获取URL中的参数

```javascript
// new URLSearchParams(location.search).get('要查询的参数名')
var urlParams = new URLSearchParams('?name="yang"')
console.log(urlParams.get('name')) //"yang"
```

##### 浅拷贝和深拷贝

```js
// 赋值和浅拷贝
    var obj = {name:'佩奇',type:'猪',family:{bother:'乔治',father:'猪爸爸'}}
    var obj1 = obj
    var obj2 = {...obj} //浅拷贝只会复制一份对象中的基本类型，如果存在引用类型，也只是复制其引用地址
    obj1.name = '乔治'
    obj2.type = '狗'
    obj1.family.bother = '苏西'
    obj2.family.father = '猪妈妈'
    console.log(obj)
    console.log(obj1)
    console.log(obj2)

//简易处理深拷贝 利用JSON.stringify 将js对象序列化（JSON字符串），再使用JSON.parse来反序列化(还原)js对象
//局限性较大 拷贝的对象中出现正则、函数、undefined等值 就会出错
    var obj = {name:'杨',sex:'男'}
    function deepClone(){
      return JSON.parse(JSON.stringify(obj))
    }
    obj1 = deepClone()
    obj1.name = 'yang'
    console.log(obj.name) //杨
    console.log(obj1.name) //yang

//利用递归处理
// 思路 对于简单类型直接复制，对于引用类型，递归复制他的每一个属性
        // 定义检测数据类型的功能函数
    function checkedType(obj){
        return Object.prototype.toString.call(obj).slice(8,-1)
    };
    function deepCopy(target){
        // 判断拷贝的数据类型
        // 初始化变量result 成为最终克隆的数据
        let targetType = checkedType(target);
        let result ;
        if(targetType === 'Object'){
            result = {}
        }else if(targetType === 'Array'){
            result = []
        }else {
            return target
        };
        // 遍历目标数据
        for(let key in target){
            // 遍历获取数据结构的每一项值
            let value = target[key]
            let targetType2 = checkedType(value)
            // 判断目标结构里的每一项值是否存在对象、数组
            if(targetType2 === 'Object' || targetType2 === 'Array'){
                // 继续遍历获取到value
                result[key] = deepCopy(value)
            }else{
                result[key] = value
            }
        }
        return result
    }
    var obj = {name:'佩奇',type:'猪',family:{bother:'乔治',father:'猪爸爸'}}
    var obj1 = deepCopy(obj)
    obj1.name = '乔治',
    obj1.family.bother = '恐龙'
    console.log(obj) 
    console.log(obj1)
```

##### 防抖和节流

**防抖：**`当持续触发事件时，如果触发的时间在小于设定的时间，就延续时长不触发事件，直到触发的时间大于设定的时间，才允许事件的执行`

```js

```

**节流:**`当事件持续触发时，我们只允许在规定的时间段内执行一次事件`

```js

```

##### 数组去重

```js
 var arr = [1,2,3,4,4,5,5]
    var arr2 = []
    arr.forEach(element => {
        if(arr2.indexOf(element) === -1){
            arr2.push(element)
        }
    });
    console.log(arr2)
    console.log([...new Set(arr)])
```

