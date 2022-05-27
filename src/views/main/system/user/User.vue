<template>
  <div class="user">
    <PageSearchForm :searchFormConfig="userSearchFormConfig" @searchClick="handleSearchClick" @resetClick="handleResetClick" />
    <PageContentTable ref="pageContentRef" :contentTableConfig="userContentTableConfig" pageName="users"></PageContentTable>
  </div>
</template>

<script lang="ts" setup>
import PageSearchForm from '@/components/page-search-form'; //重命名为UserForm
import PageContentTable from '@/components/page-content-table'; //重命名为UserForm
import { userSearchFormConfig } from './config/search.config';
import { userContentTableConfig } from './config/content.config';
import { usePageSearch } from '@/hooks/usePageSearch';

const { pageContentRef, handleSearchClick, handleResetClick } = usePageSearch();
</script>

<style lang="scss" scoped></style>
