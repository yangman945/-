#### 关于this、apply、call、bind

`在es5中，this永远指向最后调用它的那个对象，在定时器的回调函数中，this指向window对象，在es6的箭头函数中，this永远指向它的上一级,new处理的构造函数的this指向它的实例对象`

**bind:**`bind()方法创建一个新的函数，在bind（）被调用时，这个新函数的this被bind的第一个参数指定，其余的参数作为新函数的参数供用`

```js
   var obj = {
       name1:'yang',
       fn:function(a,b,c){   
            console.log(a,b,c)
           return this.name1
       }
   }
   var obj1 = {name1:'杨标泓'}
   var fn1 = obj.fn //function(){return this.name1}
   console.log(fn1()) //undefind window上并没有name1这个属性

   var fn2 = fn1.bind(obj1,11,22,33) //将函数的this指定为obj1,刚好obj1有name1这个属性
   console.log(fn2()) //'yang'
```

**apply：**`call和apply方法都是使用一个指定的this值和对应的参数前提下调用某个函数或方法`

```js
// 关于apply
function Person(name,age){
    this.name = name
    this.age = age
}
function Student(name,age,gender){
    Person.apply(this,arguments)
    this.gender = gender
} 
//现在只是一个普通的函数 this指向的是window
// arguments 参数数组['杨标泓',23,'男']
var yang = new Student('杨标泓',23,'男')
//通过new操作符来生成一个实例对象 this指向该实例 function Person(){yang.name = name,...} 
console.log(yang)
```

**call：**`call和apply方法都是使用一个指定的this值和对应的参数前提下调用某个函数或方法`

```js
// 关于call
function Person(name,age){
    this.name = name
    this.age = age
}
function Student(name,age,gender){
    Person.call(this,name,age)
    this.gender = gender
} 
//现在只是一个普通的函数 this指向的是window
// arguments 参数数组['杨标泓',23,'男']
var yang = new Student('杨标泓',23,'男')
//通过new操作符来生成一个实例对象 this指向该实例 function Person(){yang.name = name,...} 
console.log(yang)
```

**三者区别：**`bind、call、apply方法都是使用指定的this值和对应的参数来调用某个函数或方法；bind方法是创建出一个新的函数，call、apply是会直接将函数调用；bind、call是以参数列表的形式传参，apply是以数组的方式传参`

------


