let Mock = require("mockjs")
// /aaa 拦截
let arr = ["11111","22222","3333","ddd4444"]
// Mock.mock("/api/aa","get",(options)=>{
//     console.log(options); //{url:"/api/aa",type:"get",body:null}
//     return arr
// })
// 正则 /api/aa
Mock.mock(/\api\/acd/,"get",(options)=>{
    console.log(options); //{url:"/api/aa",type:"get",body:null}
    return arr
})
Mock.mock("/api/asb","post",(options)=>{
    console.log('10',options);
    return {
        status:200,
        messagw:"success",
        data:arr
    }
})