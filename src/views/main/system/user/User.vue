<template>
  <div class="user">
    <MyForm v-bind="formConfig" />
    <div class="content"></div>
  </div>
</template>

<script lang="ts" setup>
import MyForm from '@/base-ui/form';
import { formConfig } from './config/search.config';
</script>

<style lang="scss" scoped></style>
