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