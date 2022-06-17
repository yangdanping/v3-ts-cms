<template>
  <div class="page-model">
    <el-dialog v-model="dialogVisible" :title="title" width="30%" center destroy-on-close>
      <MyForm v-bind="modalConfig" v-model="formData" />
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfrim">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import MyForm from '@/base-ui/form';
import type { IForm } from '@/base-ui/form';
import { useStore } from '@/store';

const props = withDefaults(
  defineProps<{
    title: string;
    modalConfig: IForm;
    defaultInfo: any;
    otherInfo?: any; //为了让PageModal能处理更多的数据,如el-tree,再增加一个属性用于和defaultInfo整合数据
    pageName: string;
  }>(),
  {
    defaultInfo: () => ({}),
    otherInfo: () => ({})
  }
);
const dialogVisible = ref(false);
defineExpose({ dialogVisible });
const formData = ref<any>({});

// watch监听defaultInfo的改变(点击编辑后)
watch(
  () => props.defaultInfo,
  (newV) => {
    // 拿到defaultInfo最新值放到formData中做formItem和数据初始化
    props.modalConfig.formItems.forEach((item) => (formData.value[item.field] = newV[item.field]));
    console.log('初始化formData', formData.value);
  }
);

const store = useStore();
const handleConfrim = () => {
  dialogVisible.value = false;
  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    store.dispatch('system/editPageDataAction', {
      pageName: props.pageName,
      // editData: { ...formData.value },
      editData: { ...formData.value, ...props.otherInfo },
      id: props.defaultInfo.id
    });
  } else {
    // 新建
    store.dispatch('system/createPageDataAction', {
      pageName: props.pageName,
      newData: { ...formData.value, ...props.otherInfo }
    });
  }
};
</script>

<style lang="scss" scoped></style>
