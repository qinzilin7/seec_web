<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <h3 class="title">东兴市智慧化管理平台</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
          <!-- <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon input-icon"
          /> -->
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <!-- <svg-icon
            slot="prefix"
            icon-class="password"
            class="el-input__icon input-icon"
          /> -->
        </el-input>
      </el-form-item>
      <el-checkbox
        v-model="loginForm.rememberMe"
        style="margin: 0px 0px 25px 0px"
        >记住密码</el-checkbox
      >
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: right" v-if="register">
          <router-link class="link-type" :to="'/register'"
            >立即注册</router-link
          >
        </div>
      </el-form-item>
    </el-form>
    <!-- <el-form :model="ruleform" :rules="rules">
      <el-form-item label="用户名" prop="user">
        <el-input v-model="ruleform.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleform.pass"></el-input>
      </el-form-item>
    </el-form> -->
    <!-- <form action=""></form> -->
  </div>
</template>

<script>
import instance from "@/api/api";
import debounce from "@/plugins/deblouce";
export default {
  name: "Login",
  data() {
    let validatorpass = (rule, value, callback) => {
      console.log(rule, value, callback);
    };
    return {
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" },
        ],
      },
      loading: false,
      // 注册开关
      register: false,
      redirect: undefined,
      debouncefn: null,
    };
  },
  methods: {
    async loginfn() {
      //业务函数
      let { username, password } = this.loginForm;
      let { data } = await instance.post("/login", { username, password });
      console.log("data", data);
      let message = data.message
      if (message ==="success") {
        // 登录成功
        let token = data.data.token;
        localStorage.setItem("token", token);
        this.$message({
          message: "登录成功",
          type: "success",
          duration:2000,
          onClose: () => {
            this.$router.push("home");
          },
        });
      } else {
        //登录不成功
        this.$message({
          message: "账号密码不对",
          type: "error",
          duration:2000
        });
      }
    },
    //键盘开启事件
    handleLogin() {
      // 用户行为
      // 把用户名和密码解构出来
      let { username, password } = this.loginForm;
      // console.log(username, password);
      // this.loginfn(username,password)
      this.debouncefn();
    },
  },
  created() {
    // 把请求这个业务函数给防抖封装s
    this.debouncefn = debounce(this.loginfn);
    // console.log(typeof null)  object
    // console.log(typeof [])object
    // console.log(typeof {})object
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
