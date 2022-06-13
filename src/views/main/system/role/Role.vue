<template>
  <div class="role">
    <PageSearchForm :searchFormConfig="roleSearchFormConfig" @searchClick="handleSearchClick" @resetClick="handleResetClick" />
    <PageContentTable ref="pageContentRef" :contentTableConfig="roleContentTableConfig" pageName="role" @createClick="handleCreateClick" @editClick="handleEditClick" />
    <PageModal ref="pageModalRef" pageName="role" :title="dialogTitle" :modalConfig="roleModalConfig" :defaultInfo="defaultInfo" />
  </div>
</template>

<script lang="ts" setup>
import PageSearchForm from '@/components/page-search-form';
import PageContentTable from '@/components/page-content-table';
import PageModal from '@/components/page-modal';

import { roleSearchFormConfig } from './config/search.config';
import { roleContentTableConfig } from './config/content.config';
import { roleModalConfig } from './config/modal.config';

import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageModel } from '@/hooks/usePageModel';

const { pageContentRef, handleSearchClick, handleResetClick } = usePageSearch();

// pageModal相关的hook逻辑(页面单独的逻辑只放在这个页面中,公共的放在hook中)
const { pageModalRef, dialogTitle, defaultInfo, handleCreateClick, handleEditClick } = usePageModel('角色');
</script>

<style lang="scss" scoped></style>
