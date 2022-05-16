<template>
  <div class="login-account">
    <el-form ref="loginForm" :model="account" :rules="rules">
      <el-form-item label="账号" prop="name">
        <el-input v-model.trim="account.name" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.trim="account.password" show-password clearable />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ElForm } from 'element-plus';
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';

import { LocalCache } from '@/utils';
import { rules } from '../config';
// 1.在Composition API中,必须先调用useStore获取store
const store = useStore();
//相关配置文件抽取到config中
const account = reactive({
  name: LocalCache.getCache('name') ?? '',
  password: LocalCache.getCache('password') ?? ''
});
const loginForm = ref<InstanceType<typeof ElForm>>(); //获取组件进行验证

// loginAction通过defineExpose暴露给父组件并在父组件LoginPanel中调用
// 以保证登录逻辑在LoginAccount中
const loginAction = (isKeepPassword: boolean) => {
  loginForm.value?.validate((valid) => {
    if (valid) {
      // 若验证通过即可判断一下逻辑
      // 1.是否需要记住密码(记住则本地缓存)
      LocalCache.setCache('name', account.name);
      isKeepPassword ? LocalCache.setCache('password', account.password) : LocalCache.removeCache('password');
      // 2.开始进行登录验证,因为获取到的userInfo和token在许多地方都要用到,所以将登录逻辑移到vuex中
      store.dispatch('login/accountLoginAction', { ...account }); //注意!将默认是响应式对象的account解构为普通对象
    } else {
      console.log('登录失败');
    }
  });
};
defineExpose({ loginAction });
</script>

<style lang="scss" scoped></style>
