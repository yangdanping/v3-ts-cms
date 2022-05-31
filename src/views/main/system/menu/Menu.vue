<template>
  <div class="menu">
    <PageContentTable :contentTableConfig="menuContentTableConfig" pageName="menu">
      <template #menuIcon="slotProps">
        <Icon :name="slotProps.row.icon" />
      </template>
    </PageContentTable>
  </div>
</template>

<script lang="ts" setup>
import PageContentTable from '@/components/page-content-table/src/PageContentTable.vue';
import { menuContentTableConfig } from './config/content.config';
import Icon from '@/components/Icon.vue';
</script>

<style lang="scss" scoped></style>
