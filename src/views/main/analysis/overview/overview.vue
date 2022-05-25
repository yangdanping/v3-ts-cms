<template>
  <div class="overview">
    <h2>overview</h2>
    <Test v-model="inputValue" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Test from './Test.vue';
const inputValue = ref({
  name: ''
});
</script>

<style lang="scss" scoped></style>
