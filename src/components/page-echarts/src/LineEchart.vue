<template>
  <div class="line-echart">
    <BaseEchart :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import BaseEchart from '@/base-ui/echart';
import type { EChartsOption } from 'echarts';

const props = withDefaults(
  defineProps<{
    xLabels: string[];
    values: any[];
    title: string;
  }>(),
  {
    title: ''
  }
);
// 为了使数据更新后能重新渲染,需要用computed
const options = computed<EChartsOption>(() => ({
  title: {
    text: props.title
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {},
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      saveAsImage: { show: true }
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.xLabels
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '分别销量',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: props.values
    }
  ]
}));
</script>

<style lang="scss" scoped></style>
