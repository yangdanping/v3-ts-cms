<template>
  <div class="role">
    <PageSearchForm :searchFormConfig="roleSearchFormConfig" @searchClick="handleSearchClick" @resetClick="handleResetClick" />
    <PageContentTable ref="pageContentRef" :contentTableConfig="roleContentTableConfig" pageName="role" @createClick="handleCreateClick" @editClick="handleEditClick" />
    <PageModal :otherInfo="otherInfo" ref="pageModalRef" pageName="role" :title="dialogTitle" :modalConfig="roleModalConfig" :defaultInfo="defaultInfo">
      <div class="menu-tree">
        <el-tree ref="elTreeRef" :data="menus" @check="handleCheckChange" :props="{ label: 'name', children: 'children' }" nodeKey="id" show-checkbox />
      </div>
    </PageModal>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue';
import { useStore } from '@/store';

import PageSearchForm from '@/components/page-search-form';
import PageContentTable from '@/components/page-content-table';
import PageModal from '@/components/page-modal';

import { roleSearchFormConfig } from './config/search.config';
import { roleContentTableConfig } from './config/content.config';
import { roleModalConfig } from './config/modal.config';

import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageModel } from '@/hooks/usePageModel';

import { menuMapLeafKeys } from '@/utils/mapMenus';
import { ElTree } from 'element-plus';

const { pageContentRef, handleSearchClick, handleResetClick } = usePageSearch();

// 1.pageModal相关的hook逻辑(页面单独的逻辑只放在这个页面中,公共的放在hook中)
const elTreeRef = ref<InstanceType<typeof ElTree>>();
const editCallback = (item: any) => {
  // 回显menuList,为了能达到最好效果,全部使用叶子节点
  const { menuList } = item;
  const leafKeys = menuMapLeafKeys(menuList);
  nextTick(() => {
    console.log('elTreeRef.value', elTreeRef.value);
    elTreeRef.value?.setCheckedKeys(leafKeys, false);
  });
  console.log('editCallback!!', leafKeys);
};

const { pageModalRef, dialogTitle, defaultInfo, handleCreateClick, handleEditClick } = usePageModel('角色', undefined, editCallback);

// 为了防止拿不到数据,放到computed中
const store = useStore();
const menus = computed(() => store.state.entireMenu);

const otherInfo = ref({});
// el-tree的相关处理逻辑
const handleCheckChange = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys;
  const halfCheckedKeys = data2.halfCheckedKeys;
  const menuList = [...checkedKeys, ...halfCheckedKeys];
  otherInfo.value = { menuList };
  console.log('menuList', menuList);
};
</script>

<style lang="scss" scoped>
.menu-tree {
  margin-left: 25px;
}
</style>
