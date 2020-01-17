#### [mysql增删改查常用命令](https://www.shujukuba.com/mysql/99.html)

##### 查

SELECT 数据 FROM 表 WHERE 条件

```js
SELECT * FROM user_1127 where id="1" //查询该表中满足条件的数据
SELECT username,age from user_1127 //查询表中字段对应的所有数据
```

##### 删

DELETE FROM 表 WHERE 条件

```js
DELETE from user_1127 where username="小明" //删除满足条件的数据
DELETE from user_1127 //删除表中所有数据
```

##### 增

INSERT into 表 (指定字段) VALUES (指定数据)

```js
INSERT into user_1127(id,username,age,gender) VALUES(5,"小文",13,"女") //指定数据添加对应信息
```

##### 改

UPDATE 表 set 修改字段 = 新数据 WHERE 条件

```js
UPDATE user_1127 set age=age+10 //修改表中指定数据所有信息
UPDATE user_1127 set age=110,gender="男上加男" WHERE id=1
```

##### WHERE

where后面加需要操作数据的指定条件

##### 操作表

- ALTER TABLE 旧表 RENAME TO 新表

##### 操作列

- 查看列：desc 表

- 修改列：alter table  表 add column 列 数据类型
- 删除列：alter table  表 drop column 列
- 修改列名及类型：alter table 表 change column 旧 新 类型

##### AS的用法

`as可以对字段、表等取别名，例如英文字段取中文名称，使可读性更高`

```js
SELECT 旧 AS '新' from 表 //为表中返回的列字段取别名（不会影响表中的字段，别名加单引号以示规范）

```

##### 主键（primary key）

`指的是一个列或多个列的属性集合，其属性能唯一的标识一条记录，通过它可强制表的实体完整性`

- 主键是能确定一条记录的唯一标识，比如一条记录包括身份证号，姓名，年龄。但只有身份证号能确定你这个人，其他可能都是重复，所以身份证号时主键
- 外键用于与另一张表的关联。是能确定另一张表记录的字段，用于保持数据的一致性。比如在A表中的一个字段，是B表中的主键，那么它就可以作为A表的外键

| 主键                                 | 外键                                               | 索引                               |
| ------------------------------------ | -------------------------------------------------- | ---------------------------------- |
| 唯一标识一条记录，不允许重复或是为空 | 表的外键是另一张表的主键，外键可以有重复，可以为空 | 改字段没有重复值，但可以有一个空值 |
| 用来保证数据完整性                   | 用来和其他表建立联系                               | 用来提高查询排序的速度             |
| 主键只能有一个                       | 一个表可以有多个外键                               | 一个表可以有多个索引               |



##### [外键（foreign key）](https://www.cnblogs.com/blovedr/p/9211283.html)

