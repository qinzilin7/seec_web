let Mock = require("mockjs")
Mock.mock("/api/login", 'post', (config) => {
    console.log(config); //string
    let body = JSON.parse(config.body)
    if (body.username === 'abc' && body.password === "123") {
        return {
            status: 200,
            message: "success",
            data: { username: body.username, password: body.password, token: "111wwwssswww" }
        }
    } else {
        return {
            status: 501,
            message: "fail",
        }
    }

})