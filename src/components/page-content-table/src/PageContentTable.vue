<template>
  <div class="page-content-table">
    <!-- 组件的v-model可重新起名,如v-model:page="pageInfo" => 属性page 事件update:page,不然默认v-model绑定的属性是modelValue,执行的方法是update:modelValue -->
    <PageTable v-model:page="pageInfo" :data="dataList" :dataCount="dataCount" @selectionChange="selectionChange" v-bind="contentTableConfig">
      <!-- 使用作用域插槽(名随便取,一般叫slotProps,然后取到我们插槽上设置的:row) -->
      <!-- 1.header中的公共插槽headerHandler -->
      <template #headerHandler>
        <el-button size="small" type="primary" :icon="CirclePlus">新建用户</el-button>
        <el-button size="small" :icon="Refresh">刷新</el-button>
      </template>

      <!-- 2.列中的公共插槽 -->
      <template #status="slotProps">
        <Icon v-bind="status(slotProps.row)" size="23px" />
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button size="small" text :icon="Edit">编辑</el-button>
          <el-button type="danger" size="small" text :icon="Delete">删除</el-button>
        </div>
      </template>

      <!-- 3.在PageContentTable中动态插入剩余的插槽 -->
      <template v-for="item in otherPropSlots" #[item.slotName]="scope" :key="item.prop">
        <!-- 通过作用域插槽将scope.row传到上一层,那边通过slotProps.row得到 -->
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </PageTable>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useStore } from '@/store';
import PageTable from '@/base-ui/table';
import Icon from '@/components/Icon.vue';
import { CirclePlus, Refresh, Edit, Delete } from '@element-plus/icons-vue';
const store = useStore();
const props = defineProps<{
  contentTableConfig: any;
  pageName: string;
}>();

let moduleName = 'system';
if (props.pageName === 'goods') {
  moduleName = 'product';
}
// 1.双向绑定pageInfo
const pageInfo = ref({ currentPage: 1, pageSize: 10 });
watch(pageInfo, () => getPageData()); //监听分页数据变化

// 2.发送网络请求
const getPageData = (queryInfo: any = {}) => {
  const offset = (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize;
  const size = pageInfo.value.pageSize;
  store.dispatch(`${moduleName}/getPageListAction`, {
    pageName: props.pageName,
    queryInfo: { offset, size, ...queryInfo } //queryInfo会根据传入字段进行模糊查询,后端已完成
  });
};
getPageData();
defineExpose({ getPageData });

const dataList = computed(() => store.getters[`${moduleName}/pageListData`](props.pageName));
const dataCount = computed(() => store.getters[`${moduleName}/pageListCount`](props.pageName));
const status = computed(() => {
  return (row: any) => {
    const key = ['enable', 'status'];
    const isTrue = row[key[0]] === 1 || row[key[1]] === 1;
    return {
      name: isTrue ? 'circle-check-filled' : 'remove-filled',
      color: isTrue ? '#88ce88' : '#fd9e9e'
    };
  };
});
const selectionChange = (value: any) => {
  console.log('handleSelectionChange in User', value);
};

// 3.获取其他的动态插槽名称
const otherPropSlots = props.contentTableConfig.propList.filter((item: any) => {
  if (item.slotName) {
    if (item.slotName === 'status') return false; //公共插槽过滤掉
    if (item.slotName === 'handler') return false;
    return true;
  }
});
console.log('otherPropSlots', otherPropSlots);
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