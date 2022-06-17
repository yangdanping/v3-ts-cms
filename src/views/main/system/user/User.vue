<template>
  <div class="user">
    <PageSearchForm :searchFormConfig="userSearchFormConfig" @searchClick="handleSearchClick" @resetClick="handleResetClick" />
    <PageContentTable
      ref="pageContentRef"
      :contentTableConfig="userContentTableConfig"
      pageName="users"
      @createClick="handleCreateClick"
      @editClick="handleEditClick"
    ></PageContentTable>
    <PageModal ref="pageModalRef" pageName="users" :title="dialogTitle" :modalConfig="userModalConfigRef" :defaultInfo="defaultInfo"> </PageModal>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import PageSearchForm from '@/components/page-search-form';
import PageContentTable from '@/components/page-content-table';
import PageModal from '@/components/page-modal';

import { userSearchFormConfig } from './config/search.config';
import { userContentTableConfig } from './config/content.config';
import { userModalConfig } from './config/modal.config';

import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageModel } from '@/hooks/usePageModel';
import { useStore } from '@/store';

const { pageContentRef, handleSearchClick, handleResetClick } = usePageSearch();
// pageModal相关的hook逻辑(页面单独的逻辑只放在这个页面中,公共的放在hook中)
const createCallback = () => {
  const passwordItem = userModalConfig.formItems.find((item) => item.field === 'password');
  passwordItem!.isHidden = false; //确定有值时可用非空断言
};
const editCallback = () => {
  const passwordItem = userModalConfig.formItems.find((item) => item.field === 'password');
  passwordItem!.isHidden = true;
};
const { pageModalRef, dialogTitle, defaultInfo, handleCreateClick, handleEditClick } = usePageModel('用户', createCallback, editCallback);

// 3.动态添加部门和角色列表(逻辑放到computed中,解决数据还没过来配置就已写死的情况)
const store = useStore();
const userModalConfigRef = computed(() => {
  const departmentItem = userModalConfig.formItems.find((item) => item.field === 'departmentId');
  departmentItem!.options = store.state.entireDepartment.map((item) => ({ label: item.name, value: item.id }));
  const roleItem = userModalConfig.formItems.find((item) => item.field === 'roleId');
  roleItem!.options = store.state.entireRole.map((item) => ({ label: item.name, value: item.id }));

  return userModalConfig;
});
</script>

<style lang="scss" scoped></style>
