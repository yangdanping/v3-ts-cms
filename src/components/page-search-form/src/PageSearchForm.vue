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
import { ref } from 'vue';
import { Search, RefreshLeft } from '@element-plus/icons-vue';
import MyForm from '@/base-ui/form';
import type { IForm } from '@/base-ui/form';

const props = defineProps<{
  searchFormConfig: IForm;
}>();
// 双向绑定的属性应该是由配置文件的field来决定
// 优化一:formData中的属性应当动态来决定
const formItems = props.searchFormConfig.formItems;
const formOriginData: any = {};
formItems.forEach((item) => (formOriginData[item.field] = ''));
// 此时formOriginData等价于下面,但做到了数据统一
const formData = ref(formOriginData);
// const formData = ref({
//   id: '',
//   name: '',
//   password: '',
//   createdTime: ''
// });
const emits = defineEmits(['searchClick', 'resetClick']);
// 事件发送至 User(它俩的父组件) --> 在User中调用PageContentTable中的getPageData方法
const search = () => {
  emits('searchClick', formData.value);
};
const reset = () => {
  for (const key in formOriginData) {
    formData.value[`${key}`] = formOriginData[key]; //直接修改对象中的属性,而非直接对对象赋值
  }
  emits('resetClick');
};
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: right;
  padding: 0 50px 20px 0;
}
</style>
