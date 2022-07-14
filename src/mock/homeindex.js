let Mock = require("mockjs")
let moment =require("moment")

// /aaa 拦截
let arr = [
    {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
    },
    {
        date: "2016-05-04",
        name: "afhvni",
        address: "上海市普陀区金沙江路 1517 弄",
    },
    {
        date: "2016-05-01",
        name: "热播个人",
        address: "上海市普陀区金沙江路 1519 弄",
    },
    {
        date: "2016-05-03",
        name: "辅导班VS反对",
        address: "上海市普陀区金沙江路 1516 弄",
    },
]
//请求
Mock.mock(/\api\/all/, "get", (options) => {
    console.log(options);
    return {
        status:200,
        message:"success",
        tabledata:arr
    }
})
//增加数据
Mock.mock("/api/add", "post", (options) => {
    console.log('36', options);
    let body = JSON.parse(options.body)
    body.date = moment(body.date).format("YYYY-MM-DD");
    console.log(body,"60");
    // let {date,name,address} = body
    arr.push(body)
    return {
        status: 200,
        messagw: "success",
        data: arr
    }
})
//删除数据
Mock.mock(/\/api\/delete\?index=\d/, "delete", (options) => {
    console.log('10', options);
    let url = options.url;
    let index = url.split("=")[1]
    console.log(index);
    let newarr = arr.splice(index,1)
    return {
        status: 200,
        messagw: "删除成功",
        data: arr
    }
})
//修改数据
Mock.mock("/api/update", "put", (options) => {
    console.log('61', options);
    let body = JSON.parse(options.body)
    console.log(body,"60");
    let {date,name,address,index} = body.params
    arr[index].date = date
    arr[index].name = name
    arr[index].address = address
    return {
        status: 200,
        messagw: "success",
        data: arr
    }
})