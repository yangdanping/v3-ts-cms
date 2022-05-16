<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const toLogin = () => router.push({ path: '/login' });
const toMain = () => router.push({ path: '/main' });
</script>

<style lang="scss">
.app {
  height: 100%;
}
</style>
