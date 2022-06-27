<template>
  <div class="department">
    <PageSearchForm :searchFormConfig="departmentSearchFormConfig" @searchClick="handleSearchClick" @resetClick="handleResetClick" />
    <PageContentTable ref="pageContentRef" :contentTableConfig="departmentContentTableConfig" pageName="department" @createClick="handleCreateClick" @editClick="handleEditClick" />
    <PageModal ref="pageModalRef" pageName="department" :title="dialogTitle" :modalConfig="departmentModalConfig" :defaultInfo="defaultInfo" />
  </div>
</template>

<script lang="ts" setup>
import PageSearchForm from '@/components/page-search-form';
import PageContentTable from '@/components/page-content-table/src/PageContentTable.vue';
import PageModal from '@/components/page-modal';

import { departmentSearchFormConfig } from './config/search.config';
import { departmentContentTableConfig } from './config/content.config';
import { departmentModalConfig } from './config/modal.config';

import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageModel } from '@/hooks/usePageModel';

const { pageContentRef, handleSearchClick, handleResetClick } = usePageSearch();

const { pageModalRef, dialogTitle, defaultInfo, handleCreateClick, handleEditClick } = usePageModel('部门');
</script>

<style lang="scss" scoped></style>
