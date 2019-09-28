#### vue双向数据绑定的原理

[Object.defineProperty(obj, prop, descriptor)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

`该方法会在对象上定义一个新属性，或者修改一个对象的现有属性，并返回该对象,接收三个参数`

- obj：要在其身上定义属性的对象
- prop：要定义或修改的属性名称
- descriptor：将被定义或修改的属性描述符对象
  - value：该属性的值（value、writable或get、set同时只能有一对存在于描述符中）
  - writable：是否允许修改属性的值，默认false 不允许
  - configurable：是否允许delete将属性删除，默认为false 不允许
  - enumerable：属性是否可被枚举，默认为 false（即不可以通过for ...in 循环返回）
  - get：访问属性时执行的方法，默认undefined，
  - set：修改属性时执行的方法，默认undefined，该函数接收唯一参数，即为属性的新值

**什么是数据劫持**

`通过Object.defineProperty()来劫持各个属性的set、get，在数据变动时发布消息给订阅者，触发相应的监听回调`





#### 计算属性（computed）和侦听器（watch）

`计算属性`

- 实现计算。模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护
- 所以，对于任何复杂逻辑，你都应当使用**计算属性**
- 如何定义计算属性
  - 它是独立的成员
  - 它是一个对象：computed:{}
- 计算属性的特性
  - 计算属性中定义的是函数
  - 计算属性的函数一般有返回值
  - 你定义的虽然是函数，但是调用的时候要以属性的方式来调用
  - 如果以函数的方式调用，则会报错：*** is not a function
- 计算属性的调用
  - 像属性一样进行调用
- 计算属性有一个非常重要的作用，它可以实现对数据的监听
  - 数据是指计算属性中的依赖项，所谓依赖项就是指在计算属性中使用到的data中声明的成员 
  - 只要依赖项发生了变化，就会触发计算属性

`侦听器`

- 为什么需要侦听器(监听器)

  - 计算属性不能响应异步操作的数据变化

    ```js
    computed: {
        getresult(){
            console.log('123')
            setTimeout(() => {
                return this.first.toUpperCase() +"-" + this.second.toUpperCase()
            },0)
        }
    }
    ```

  - 如果想侦听异步操作时的数据变化，就可以使用侦听器

- 如何定义侦听器，跟计算属性大致相同

  ```js
  watch:{
  	// 里面的方法的名称不能随意，必须和你想侦听的属性名称完全一致：你想侦听那个属性就添加与这个属性名称相同的方法    
  }
  ---------------------------------
      watch: {
          // 方法的名字就是你想侦听的属性的名字
          // 这个函数有两个默认的参数：newvalue,oldvalue
          first(newvalue,oldvalue){
              console.log(newvalue,oldvalue)
          }
      }
  ```

- 特性：

  - 可以侦听指定依赖项的数据变化

  - 没有返回值，因为不是我们自主进行调用的

    

`computed和watch的区别`

- 从属性名上看，computed是计算属性，也就是依赖其它的属性计算所得出最后的值，通常用来帮助模板进行较为繁琐的取值运算，watch是去监听一个值的变化，然后执行相对应的函数，做一些特定的操作，当监听的值产生变化时，都会执行定义函数体，一般用于数据变化时执行异步操作或开销比较大的操作。
- 从实现上，computed的值在getter执行后是会缓存的，只有在它依赖的属性值改变之后，下一次获取computed的值时才会重新调用对应的getter来计算；watch在每次监听的值变化时，都会执行回调。
- computed会产生新的属性，新属性的用法和功能与data中的属性一样,watch不会产生新的属性
- computed可以一次监听多个属性，因为一个新属性的产生可能依赖于多个属性（多=>1）,watch每次只可以监听一个属性，而这个属性值的变化可能引起一系列属性值的变化（1=>多）
- computed会在vue实例化过程中执行一次，watch在vue初始化时,不会执行。
- watch可以实现深度监听

```js
// 侦听obj中的成员的变化
watch: {
    // 修改了对象的属性值，并不会造成对象的引用地址的变化，所以如下的侦听没有效果
    // obj(){
    //     console.log(123)
    // }
    // 我们现在要侦听是这个对象的属性值的变化，而不是对象的引用地址的变化
    // obj:{
    //     // 深度侦听会自动的触发handler函数
    //     handler(n,o){
    //         console.log(n,o)
    //     },
    //     // 设置深度侦听
    //     deep:true
    // }
    // 缺点：1.代码体量多  2.对每个成员的变化都会响应 3.只能侦听到返回的新值

    // 侦听指定的成员值的变化
    'obj.name'(n,o){
        console.log(n,o)
    }
}
```



#### 组件传值方式

​	`父传子，通过props`  

```html
<!-- 1 件中通过使用的组件，动态绑定一个传递数据的属性，为该属性赋予要传递的值 -->
<template id="father">
    <div>
    	<son :data="父组件传递的值"></son>
        </div>
</template>
```

```js
//2 子组件通过props接收父组件的值，并且可以对该值进行类型校验
props:{
	data:{
		type:值的类型,//接收的值的类型跟props中定义的类型不同的话你，会报错
		default:为data设置默认值
	}
}
//props:['data'] 这种接收方式不推荐
```



`子传父，通过this.$emit`

```js
//1 子组件中通过this.$emit("自定义事件名称",传递的数据)
this.$emit("getmyname",this.sname)
//如需传递多个数据以逗号分隔
```

```html
<!-- 2 子组件的标签上绑定 @自定义事件名称="回调函数" -->
<template id="father">
    <div>
        <son @getmyname="sonName"></son>
    </div>
</template>
```

```js
//父组件通过子组件标签上的回调函数的默认参数接收到子组件传递的数据
methods: {
        sonName(data){
            console.log(data),
            this.mysonName = data
        }
 },
```



`兄弟传值，通过中央通信`

```js
// 1 创建一个新的vue实例作为中央通信
    var bus = new Vue();
```

```js
 methods: {
// 2 在想要传递数据的组件的methods中，通过this.$emit发射一个自定义事件，传递相应的数据
	lala(){
		bus.$emit('getgname',this.gname)
	}
}
```

```html
<template id="gid">
	<!-- 3 对负责事件处理函数进行调用 -->
	<div> <button @click="lala">点击发送事件</button> s</div>
</template>
```

```js
 // 4 在想要得到数据的组件中利用钩子函数，通过$on监听别人发射的自定义事件，默认参数就是传递的数据
 mounted () {
bus.$on('getgname',(data)=>{
	this.sister = data
	})
}
```



#### 路由

​	`路由指根据用户请求实现对应组件内容的展示`

