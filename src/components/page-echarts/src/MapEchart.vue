<template>
  <div class="map-echart">
    <BaseEchart :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import BaseEchart from '@/base-ui/echart';
import type { EChartsOption } from 'echarts';
import type { IDataType } from '../types';
import { convertData } from '../utils/convert-data';

const props = withDefaults(
  defineProps<{
    title?: string;
    mapData: IDataType[];
  }>(),
  {
    title: ''
  }
);

// 为了使数据更新后能重新渲染,需要用computed
const options = computed<EChartsOption>(() => ({
  backgroundColor: '#fff',
  title: {
    text: '全国销量统计',
    left: 'center',
    textStyle: {
      color: '#fff'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter(params: any) {
      return params.name + ' : ' + params.value[2];
    }
  },
  visualMap: {
    min: 0,
    max: 60000,
    left: 20,
    bottom: 20,
    calculable: true,
    text: ['高', '低'],
    inRange: {
      color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
    },
    textStyle: {
      color: '#000'
    }
  },
  geo: {
    map: 'china',
    roam: true,
    emphasis: {
      areaColor: '#f4cccc',
      borderColor: 'rgb(9, 54, 95)',
      itemStyle: {
        areaColor: '#f4cccc'
      }
    }
  },
  series: [
    {
      name: '销量',
      type: 'scatter',
      coordinateSystem: 'geo',
      data: convertData(props.mapData),
      symbolSize: 12,
      emphasis: {
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        }
      }
    },
    {
      type: 'map',
      map: 'china',
      geoIndex: 0,
      aspectScale: 0.75,
      tooltip: {
        show: false
      }
    }
  ]
}));
</script>

<style lang="scss" scoped></style>
q
