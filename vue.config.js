const { defineConfig } = require("@vue/cli-service");
let API = process.env.VUE_APP_API
module.exports = defineConfig({
  transpileDependencies: true,
  "lintOnSave":false,
  "devServer":{
    proxy:{
      "/api":{
        changeOrigin:true,
        target:API,
        pathWrite:{
          "/api":""
        }
      }
    }
  }
});
