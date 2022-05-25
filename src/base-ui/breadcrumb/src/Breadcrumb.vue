<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path ?? '' }">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import type { IBreadcrumb } from '@/base-ui/breadcrumb';

defineProps({
  breadcrumbs: {
    type: Array as PropType<IBreadcrumb[]>,
    default: () => []
  }
});
</script>

<style lang="scss" scoped>
.nav-breadcrumb {
  :deep(.el-breadcrumb__inner) {
    color: #fff;

    &:hover {
      color: #fff;
      text-shadow: 0 0 20px #fff;
    }
  }
}
</style>
