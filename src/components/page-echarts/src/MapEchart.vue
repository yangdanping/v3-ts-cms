<template>
  <div class="rose-echart">
    <BaseEchart :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import BaseEchart from '@/base-ui/echart';
import type { EChartsOption } from 'echarts';
import type { IDataType } from '../types';

const props = defineProps<{
  roseData: IDataType[];
}>();
// 为了使数据更新后能重新渲染,需要用computed
const options = computed<EChartsOption>(() => ({
  // legend: {
  //   top: 'bottom'
  // },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },

      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: '类别数据',
      type: 'pie',
      radius: [10, 80],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: props.roseData
    }
  ]
}));
</script>

<style lang="scss" scoped></style>
q
