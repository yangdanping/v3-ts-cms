<template>
  <div class="user">
    <PageSearchForm :searchFormConfig="userSearchFormConfig" />
    <div class="content">
      <PageTable :data="userList" :propList="propList">
        <!-- 使用作用域插槽(名随便取,一般叫slotProps,然后取到我们插槽上设置的:row) -->
        <template #status="slotProps">
          <Icon v-bind="iconStyle(slotProps.row)" size="23px" />
        </template>
        <template #createAt="slotProps">
          <strong>{{ slotProps.row.createAt }}</strong>
        </template>
      </PageTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '@/store';

import { userSearchFormConfig } from './config/search.config';
import PageSearchForm from '@/components/page-search-form'; //重命名为UserForm
import PageTable from '@/base-ui/table';
import Icon from '../../../../components/Icon.vue'; //重命名为UserForm
const store = useStore();
store.dispatch('system/getPageListAction', {
  pageUrl: 'users/list',
  queryInfo: {
    offset: 0,
    size: 10
  }
});
const userList = computed(() => store.state.system.userList);
const userCount = computed(() => store.state.system.userCount);
// 写一个针对userList的配置文件(slotName用于动态配置插槽名)
const propList = [
  { prop: 'name', label: '用户名', minWidth: '100' },
  { prop: 'realname', label: '真实姓名', minWidth: '100' },
  { prop: 'cellphone', label: '手机号码', minWidth: '100' },
  { prop: 'enable', label: '状态', minWidth: '50', slotName: 'status' },
  { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'createAt' },
  { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'updateAt' }
];
const iconStyle = computed(() => {
  return (row: any) => ({
    name: row.enable === 1 ? 'circle-check-filled' : 'remove-filled',
    color: row.enable === 1 ? '#43bf88' : '#fd9e9e'
  });
});
</script>

<style lang="scss" scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
