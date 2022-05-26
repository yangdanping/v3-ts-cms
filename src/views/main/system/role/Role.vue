<template>
  <div class="role">
    <PageSearchForm :searchFormConfig="roleSearchFormConfig" />
    <PageContentTable :contentTableConfig="roleContentTableConfig" pageName="role" />
  </div>
</template>

<script lang="ts" setup>
import PageSearchForm from '@/components/page-search-form/src/PageSearchForm.vue';
import PageContentTable from '@/components/page-content-table';
import { roleSearchFormConfig } from './config/search.config';
import { roleContentTableConfig } from './config/content.config';
</script>

<style lang="scss" scoped></style>
