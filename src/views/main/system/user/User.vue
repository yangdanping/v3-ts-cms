<template>
  <div class="user">
    <PageSearchForm :searchFormConfig="userSearchFormConfig" />
    <PageContentTable :contentTableConfig="userContentTableConfig" pageName="users"></PageContentTable>
  </div>
</template>

<script lang="ts" setup>
import PageSearchForm from '@/components/page-search-form'; //重命名为UserForm
import PageContentTable from '@/components/page-content-table'; //重命名为UserForm
import { userSearchFormConfig } from './config/search.config';
import { userContentTableConfig } from './config/content.config';
</script>

<style lang="scss" scoped></style>
