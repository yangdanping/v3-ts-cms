<template>
  <div class="category">
    <PageSearchForm :searchFormConfig="categorySearchFormConfig" @searchClick="handleSearchClick" @resetClick="handleResetClick" />
    <PageContentTable ref="pageContentRef" :pageName="pageName" :contentTableConfig="categoryContentTableConfig" @createClick="handleCreateClick" @editClick="handleEditClick" />
    <PageModal ref="pageModalRef" :pageName="pageName" :title="dialogTitle" :modalConfig="categoryModalConfig" :defaultInfo="defaultInfo"> </PageModal>
  </div>
</template>

<script lang="ts" setup>
import PageSearchForm from '@/components/page-search-form';
import PageContentTable from '@/components/page-content-table/src/PageContentTable.vue';
import PageModal from '@/components/page-modal';

import { categorySearchFormConfig } from './config/search.config';
import { categoryContentTableConfig } from './config/content.config';
import { categoryModalConfig } from './config/modal.config';

import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageModel } from '@/hooks/usePageModel';

const pageName = 'category';

const { pageContentRef, handleSearchClick, handleResetClick } = usePageSearch();

const { pageModalRef, dialogTitle, defaultInfo, handleCreateClick, handleEditClick } = usePageModel('类别');
</script>

<style lang="scss" scoped></style>
