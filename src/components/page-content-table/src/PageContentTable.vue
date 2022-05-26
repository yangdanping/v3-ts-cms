<template>
  <div class="page-content-table">
    <PageTable :data="dataList" @selectionChange="selectionChange" v-bind="contentTableConfig">
      <!-- 使用作用域插槽(名随便取,一般叫slotProps,然后取到我们插槽上设置的:row) -->
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button size="small" type="primary" :icon="CirclePlus">新建用户</el-button>
        <el-button size="small" :icon="Refresh">刷新</el-button>
      </template>
      <!-- 2.列中的插槽(定制某些列的样式) -->
      <template #status="slotProps">
        <Icon v-bind="status(slotProps.row)" size="23px" />
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button size="small" text :icon="Edit">编辑</el-button>
          <el-button type="danger" size="small" text :icon="Delete">删除</el-button>
        </div>
      </template>
    </PageTable>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '@/store';
import PageTable from '@/base-ui/table';
import Icon from '@/components/Icon.vue';
import { CirclePlus, Refresh, Edit, Delete } from '@element-plus/icons-vue';
const store = useStore();
const props = defineProps<{
  contentTableConfig: any;
  pageName: string;
}>();

store.dispatch('system/getPageListAction', {
  pageName: props.pageName,
  queryInfo: {
    offset: 0,
    size: 10
  }
});
const dataList = computed(() => store.getters[`system/pageListData`](props.pageName));
// const userCount = computed(() => store.state.system.userCount);

const status = computed(() => {
  return (row: any) => ({
    name: row.enable === 1 ? 'circle-check-filled' : 'remove-filled',
    color: row.enable === 1 ? '#88ce88' : '#fd9e9e'
  });
});

const selectionChange = (value: any) => {
  console.log('handleSelectionChange in User', value);
};
</script>

<style lang="scss" scoped>
.page-content-table {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
  .handle-btns {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
  }
}
</style>
