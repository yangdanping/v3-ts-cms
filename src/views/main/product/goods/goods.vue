<template>
  <div class="goods">
    <PageContentTable :contentTableConfig="goodsContentTableConfig" pageName="goods">
      <template #image="slotProps">
        <el-image style="width: 60px; height: 60px" :src="slotProps.row.imgUrl" :previewSrcList="[slotProps.row.imgUrl]" preview-teleported />
      </template>
      <template #oldPrice="slotProps">{{ '￥ ' + slotProps.row.oldPrice }}</template>
      <template #newPrice="slotProps">{{ '￥ ' + slotProps.row.newPrice }}</template>
    </PageContentTable>
  </div>
</template>

<script lang="ts" setup>
import PageContentTable from '@/components/page-content-table/src/PageContentTable.vue';
import { goodsContentTableConfig } from './config/content.config';
</script>

<style lang="scss" scoped></style>
