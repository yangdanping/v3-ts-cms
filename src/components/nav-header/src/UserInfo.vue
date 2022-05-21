<template>
  <div class="user-info">
    <el-dropdown>
      <div class="info">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="30" />
        <span>{{ name }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
          <el-dropdown-item @click="logOut" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useStore } from '@/store';
import router from '@/router';
import { LocalCache } from '@/utils';

const store = useStore();
const name = computed(() => store.state.login.userInfo.name);

const logOut = () => {
  LocalCache.clearCache();
  router.push('/login');
};
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  .info {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #fff;
    .el-avatar {
      margin-right: 10px;
    }
  }
}
</style>
