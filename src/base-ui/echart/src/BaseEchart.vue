<template>
  <div class="">
    <div class="divRef" ref="echartDivRef" :style="{ width, height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect } from 'vue';
import type { EChartsOption } from 'echarts';
import useEchart from '../hooks/useEchart';
const props = withDefaults(
  defineProps<{
    options: EChartsOption;
    width?: string;
    height?: string;
  }>(),
  {
    width: '100%', // echart宽度一般都是100%
    height: '360px'
  }
);

const echartDivRef = ref<HTMLElement>();
// 由于执行setup时,元素还未绑定,所以echartDivRef.value为undefined,所以执行逻辑放到onMounted中
onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!);
  watchEffect(() => setOptions(props.options));
});
</script>

<style lang="scss" scoped></style>
