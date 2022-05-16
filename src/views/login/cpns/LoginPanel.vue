<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs class="tabs" v-model="currentTab" stretch type="border-card">
      <el-tab-pane name="account">
        <template #label> <Icon name="user" label="账号登录" /></template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label><Icon name="iphone" label="手机登录" /> </template>
        <LoginPhone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button @click="handleLoginClick" type="primary" size="large" class="login-btn">登录</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Icon from '@/components/Icon.vue';
import LoginAccount from './LoginAccount.vue';
import LoginPhone from './LoginPhone.vue';

const currentTab = ref('account');
const isKeepPassword = ref(false);
/* 如何获取LoginAccount组件实例的类型???技巧如下-------------------------------------
现在在TS环境下ref()可接收一个泛型类型(不写则默认为any)
InstanceType<typeof LoginAccount> --> 获取到LoginAccount组件实例的类型,即能.value使用它内部的属性/方法了 */
const accountRef = ref<InstanceType<typeof LoginAccount>>();
const phoneRef = ref<InstanceType<typeof LoginPhone>>();

const handleLoginClick = () => {
  if (currentTab.value === 'account') {
    // 账号登录,调用LoginAccount组件的loginAction
    accountRef.value?.loginAction(isKeepPassword.value); //.value.loginAction直接使用它内部的属性/方法,注意!现在ref对象也是有泛型的!一开始推导出value是个null类型,不能调用loginAction,经过上面处理并改成可选链,当前面值为undefined时后面根本不会执行,即可完美解决所有问题
  } else {
    // 手机登录,调用LoginPhone组件的loginAction
    console.log('手机登录,调用LoginPhone组件的loginAction');
  }
};
</script>

<style lang="scss" scoped>
.login-panel {
  width: 320px;
  margin-bottom: 120px;
  .title {
    text-align: center;
  }
  .tabs {
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    overflow: hidden;
  }

  .account-control {
    margin-top: 8px;
    padding: 0 8px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    margin-top: 8px;
    width: 100%;
  }
}
</style>
