<template>
  <div id="app" :style="{'backgroundImage': 'url(' + imgs[mark-1] + ')'}">
    <div class="header">
      <h2 class="logo">上海市土壤报告评审技术要点表在线审查系统</h2>
    </div>
    <div class="login">
      <el-card>
        <img src="~@/assets/images/banner.png" width="200px" alt="上海市土壤报告评审技术要点表在线审查系统">
        <br>
        <br>
        <br>
        <el-form
          ref="loginForm"
          class="login-form"
          :rules="rules"
          :model="loginForm"
          @submit.native.prevent="Login"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="用户名"
              prefix-icon="fas fa-user"
              auto-complete="on"
              tabindex="1"
              @keyup.enter.native="handleLogin('loginForm')"
            >
              <em slot="prefix" class="el-icon-user" />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="密码"
              type="password"
              show-password
              auto-complete="on"
              tabindex="2"
              prefix-icon="fas fa-lock"
              @keyup.enter.native="handleLogin('loginForm')"
            >
              <em slot="prefix" class="el-icon-lock" />
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login-button"
              type="primary"
              native-type="submit"
              tabindex="3"
              block
              @click.native.prevent="handleLogin('loginForm')"
            >登录</el-button>
          </el-form-item>
          <!-- <a class="forgot-password" @click="handleRegister">供应商注册</a> -->
        </el-form>
      </el-card>
    </div>
    <div class="footer">
      <!-- <div class="links">
        <span>测试用户名：admin</span>
        <span>密码：admin</span>
      </div> -->
      <div class="version">Version 3.00</div>
    </div>
  </div>
</template>

<script>
import { designOpera } from '@/api/interface'
export default {
  name: 'Login',
  data() {
    return {
      mark: 1,
      imgs: [
        require('@/assets/images/background1.jpg'),
        require('@/assets/images/background2.jpg'),
        require('@/assets/images/background3.jpg')
      ],
      validCredentials: {
        username: 'lightscope',
        password: 'lightscope'
      },
      loginForm: {
        username: '', // 用户名
        password: '' // 密码
      },
      rules: {
        // 表单验证（用户名验证规则）
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { max: 20, message: '账号长度最长20位', trigger: 'blur' }
        ],
        // 表单验证（密码验证规则）
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      dialogSupplierRegister: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.mark = Math.floor(Math.random() * 3 + 1)
    for (const img of this.imgs) {
      const image = new Image()
      image.src = img
    }
    this.play()
  },
  methods: {
    autoPlay() {
      if (this.mark < this.imgs.length) {
        this.mark++
      } else {
        this.mark = 1
      }
    },
    play() {
      setInterval(this.autoPlay, 6000)
    },
    // 登录方法
    handleLogin(formName) {
      // 表单验证通过，可进行操作
      this.$refs[formName].validate((valid) => {
        if (valid) {
          designOpera({
            opera_type: 'login', // 操作类型
            username: this.loginForm.username, // 用户名
            password: this.$md5(this.loginForm.password) // 密码md5加密
          }).then(data => {
            if (data.code === 0) { // 登录成功，并提示
              this.$notify({ type: 'success', message: '欢迎你,' + this.loginForm.username + '!', duration: 3000 })
              this.$router.push({ path: this.redirect || '/' })
              // this.$router.push({ path: '/home' }) // 跳转到用户主页面
              sessionStorage.setItem('username', this.loginForm.username) // 将用户名存入session中
              sessionStorage.setItem('thirdparty', data.thirdparty) // 将第三方评审机构名存入session中
              this.$emit('state') // 将状态传到base页面
            } else {
              if (data.code === -5) { // 未注册,友好提示未注册
                this.$message({
                  type: 'error',
                  message: '您还未注册账户，请注册',
                  showClose: true
                })
              } else { // 账号或密码错误提示
                this.$message({
                  type: 'error',
                  message: '账号或密码错误',
                  showClose: true
                })
              }
            }
          })
        } else {
          return false // 表单验证错误返回false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #282828;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-repeat:no-repeat;
  background-size:cover;
  -moz-transition: all 2s ease 2s; -webkit-transition:all 2s ease 2s; transition:all 2s ease 2s; -o-transition:all 2s ease 2s;
}
body {
  margin: 0;
  padding: 0;
  background: #282828;
}

.footer,
.header {
  padding: 20px 20px;
  color: #f0f4f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1,
  h2,
  h3 {
    color: #f0f4f8;
    padding: 0;
    margin: 0;
  }
  .links {
    display: flex;
    font-family: "Open Sans";
    span {
      padding: 0 10px;
      font-size: 16px;
      border-right: 1px solid #9fb3c8;
      &:last-child {
        border-right: none;
      }
    }
  }
  .version {
    font-family: "Open Sans";
    padding: 0 10px;
    color: #9fb3c8;
    font-size: 12px;
    margin-top: 5px;
  }
}
.header {
  padding: 10px 20px;
  .logo {
    font-family: "Open Sans";
    font-size: 26px;
    font-weight: 100;
    letter-spacing: 2px;
    padding-top: 120px;
    padding-bottom: 30px;
  }
  .logo .part-2 {
    color: #d64545;
  }
}
</style>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}
.login-form {
  width: 290px;
}
.forgot-password {
  margin-top: 10px;
}
</style>
<style scoped lang='scss'>
$teal: rgb(0, 124, 137);
.el-button--primary {
  background: $teal;
  border-color: $teal;

  &:hover,
  &.active,
  &:focus {
    background: lighten($teal, 7);
    border-color: lighten($teal, 7);
  }
}
.login .el-input__inner:hover {
  border-color: $teal;
}
.login .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
  .el-input__icon {
    width: 30px;
  }
}
.login .el-input input {
  padding-left: 35px;
}
.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}
h2 {
  font-family: 'Open Sans';
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}
a {
  color: $teal;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: lighten($teal, 7);
  }
}
.login .el-card {
  width: 340px;
  display: flex;
  justify-content: center;
}
</style>
