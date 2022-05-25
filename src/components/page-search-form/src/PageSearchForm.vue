<template>
  <MyForm v-bind="searchFormConfig" v-model="formData">
    <template #header>
      <h1>高级检索</h1>
    </template>
    <template #footer>
      <div class="btn">
        <el-button @click="search" type="primary" :icon="Search">搜索</el-button>
        <el-button @click="reset" :icon="RefreshLeft">重置</el-button>
      </div>
    </template>
  </MyForm>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue';
import { Search, RefreshLeft } from '@element-plus/icons-vue';
import MyForm from '@/base-ui/form';
import type { IForm } from '@/base-ui/form';
defineProps({
  searchFormConfig: {
    type: Object as PropType<IForm>,
    required: true
  }
});
// formData先暂时写死,后面还要配置
const formData = ref({
  id: '',
  name: '',
  password: '',
  sport: '',
  createdTime: ''
});
const search = () => {
  console.log('search');
};
const reset = () => {
  console.log('reset');
};
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: right;
  padding: 0 50px 20px 0;
}
</style>
