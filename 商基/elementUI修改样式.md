##### 修改选择日期范围样式

```html
<div style="width:300px;" class="items">
	<el-date-picker
     type="daterange"
     range-separator="至"
     start-placeholder="开始日期"
     end-placeholder="结束日期"
     ></el-date-picker>
</div>
```

```js
.items{
  .el-date-editor--daterange.el-input__inner{
    width: 100%;
    /deep/span{
        /*解决文字 至 被遮挡问题*/
      padding: 0px !important;
    }
  }
}
```

##### [解决Dialog被蒙版遮罩](https://blog.csdn.net/solocoder/article/details/80936549)

```html
 :modal-append-to-body='false'或:append-to-body='true'
<el-dialog
    title="登录"
    :visible.sync="dialogVisible"
    top="20vh"
    width="30%"
    :append-to-body="true">
</el-dialog>
```

##### 修改table高度

```js
//需要将scoped作用域去掉
<style lang="scss">
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 40px;
}
.el-table__body tr,
.el-table__body td {
  padding: 0;
  height: 40px;
}
</style>
```

##### 修改table选中行高亮

```css
/deep/.el-table__body tr.current-row > td {
  background: #bdd2ef;
}
```

