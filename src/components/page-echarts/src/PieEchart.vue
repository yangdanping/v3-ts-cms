<template>
  <div class="pie-echart">
    <BaseEchart :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import BaseEchart from '@/base-ui/echart';
import type { EChartsOption } from 'echarts';
import type { IDataType } from '../types';

const props = defineProps<{
  pieData: IDataType[];
}>();
// 为了使数据更新后能重新渲染,需要用computed
const options = computed<EChartsOption>(() => ({
  // title: {
  //   text: '用户访问来源',
  //   subtext: 'Fake Data',
  //   left: 'center'
  // },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'horizontal',
    left: 'left'
  },
  series: [
    {
      name: '分类数据',
      type: 'pie',
      radius: '50%',
      data: props.pieData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}));
</script>

<style lang="scss" scoped></style>
