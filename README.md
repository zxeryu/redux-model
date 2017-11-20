# redux-model
项目是使用create-react-app创建，将reducer封装成model；提供一套更简单的处理数据redux数据流的框架。

## Model
一般的reducer只包含state和更新state的纯方法。Model在包含这两部分的基础上还增加了异步任务的部分。
```js
export default {
    namespace:'Demo',//该model最终在store对象中的名字（key）
    state:{
        ...//该模块state设计同reducer中的defaultState
    },
    reducers:{
        ...//更新state的纯方法（更新state只能通过这部分代码）
    },
    asyncTasks:{
        ...//异步任务
    }
}
```

## Action
项目中的action中type由namespace和方法名称组成，即：'namespace/methodName'。意思为通知model管理对象要调用
'namespace'model中的'methodName'方法。
```js
return {
    type:'namespace/methodName',
    payload:{}
}
```

## 项目模块介绍
model：存放model类，可根据自己的写法加入action等操作；
screen：存放纯界面，即所有的参数都从父props传入；
route：为screen传递redux state和dispatch数据；
service：网络方法，或异步任务调用类；

## 核心
项目的核心就是App.js文件，包含了对所有model中的state、reducer的合并，也包含了处理所有异步任务的中间件。

## 使用方法
在index.js文件中引入Model，调用app的use方法即可，如：
```js
import app from './App';

import Demo from './model/Demo';

app.use(Demo);

app.start();
```
