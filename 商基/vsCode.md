##### 代码折叠

```js
ctrl + k + 1、2、3....... 按照层级折叠代码
```

```js
/**
     * @fn setLocal_arr:存储数据到本地
     * @fn getLocal_arr:获取本地存储数据
     * @param {String} name 存储数据的名称
     * @param {Array} Arr 进行本地储存的数组
     * @return: Arr 返回解析完毕的数组
     */
    setLocalArr(name,Arr){
      localStorage.setItem(name,JSON.stringify(Arr))
    },
    getLocalArr(name){
      return JSON.parse(localStorage.getItem(name))
    },
```

