let Mock = require("mockjs")
// /aaa 拦截
let arr = ["aaa","bbb","ccc","ddd","eee","fff"]
// Mock.mock("/api/aa","get",(options)=>{
//     console.log(options); //{url:"/api/aa",type:"get",body:null}
//     return arr
// })
// 正则 /api/aa
Mock.mock(/\/api\/aa/,"get",(options)=>{
    console.log(options); //{url:"/api/aa",type:"get",body:null}
    return arr
})
Mock.mock("/api/ab","post",(options)=>{
    console.log('10',options);
    return {
        status:200,
        messagw:"success",
        data:arr
    }
})