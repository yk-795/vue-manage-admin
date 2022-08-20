<template>
  <div class="login-container">
    <div class="left-pic-content"></div>
    <el-form
      class="login-form"
      ref="loginFromRef"
      :model="loginFrom"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <!-- username -->
      <el-form-item prop="username">
        <el-input
          placeholder="username"
          v-model="loginFrom.username"
          name="username"
          type="text"
        >
          <template #prepend>
            <svg-icon icon="user"></svg-icon>
          </template>
        </el-input>
      </el-form-item>
      <!-- password -->
      <el-form-item prop="password">
        <el-input
          placeholder="password"
          name="password"
          v-model="loginFrom.password"
          show-password
        >
          <template #prepend>
            <svg-icon icon="password"></svg-icon>
          </template>
        </el-input>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button
        type="primary"
        class="login-buttom"
        @click.prevent="handleLogin"
        :loading="loading"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { validatePassword } from './rules'
import { useStore } from 'vuex'
import router from '@/router'

// 数据源
const loginFrom = ref({
  username: 'super-admin',
  password: '123456'
})
// 验证规则
const loginRules = ref({
  username: [
    {
      required: true,
      message: '用户名为必填项',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})

// 处理登录
const loginFromRef = ref(null)
const loading = ref(false)
const store = useStore()
const handleLogin = () => {
  // 1.进行表单验证
  loginFromRef.value.validate((valid) => {
    if (!valid) return
    // 2.触发登录动作
    loading.value = true
    store
      .dispatch('user/login', loginFrom.value)
      .then(() => {
        // 3.进行登录后处理
        loading.value = false
        router.push('/')
      })
      .catch((err) => {
        console.log(err)
        loading.value = false
      })
  })
}
</script>

<style lang="scss" scoped>
$bg_url: url(@/assets/办公.svg);
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  position: relative;
  height: 100vh;
  width: 100%;
  // background-color: $bg;
  background-image: linear-gradient(300deg, #e4f6ff, #f9feff);
  overflow: hidden;

  .left-pic-content {
    background-image: $bg_url;
    width: 550px;
    left: 10%;
    top: 50%;
    position: absolute;
    height: 630px;
    margin-top: -315px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
  }

  .login-form {
    position: absolute;
    right: 12.667%;
    background: $cursor;
    border-radius: 32px;
    -webkit-box-shadow: 0 16px 32px 0 rgb(0 0 0 / 8%);
    box-shadow: 0 16px 32px 0 rgb(0 0 0 / 8%);
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    padding: 64px;
    width: 92%;
    max-width: 350px;
    margin: 0 auto;

    // 用深度选择器选择子组件的类名
    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      height: 47px;
      width: 100%;

      input {
        background: $cursor;
        // border: 0px;
        // border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: #353030;
        height: 4px;
        width: 100%;
        font-size: 16px;
      }
    }
    .login-buttom {
      margin-top: 20px;
      width: 100%;
      height: 45px;
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #353030;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
