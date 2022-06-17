<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <MyCard title="分类商品数量(饼图)">
          <PieEchart :pieData="categoryGoodsCount" />
        </MyCard>
      </el-col>
      <el-col :span="10">
        <MyCard title="不同城市商品销量">
          <!-- <PieEchart :pieData="categoryGoodsCount" /> -->
        </MyCard>
      </el-col>
      <el-col :span="7">
        <MyCard title="分类商品数量(玫瑰图)">
          <RoseEchart :roseData="categoryGoodsCount" />
        </MyCard>
      </el-col>
    </el-row>
    <!-- -- -->
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <MyCard title="分类商品的销量">
          <LineEchart v-bind="categoryGoodsSale" title="分类数据" />
        </MyCard>
      </el-col>
      <el-col :span="12">
        <MyCard title="分类商品的销量">
          <BarEchart v-bind="categoryGoodsFavor" />
        </MyCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '@/store';
import MyCard from '@/base-ui/card';
import { PieEchart, RoseEchart, LineEchart, BarEchart } from '@/components/page-echarts';
const store = useStore();
store.dispatch('dashboard/getDashboardDataAction');
const categoryGoodsCount = computed(() => {
  return store.state.dashboard.categoryGoodsCount.map((item: any) => ({ name: item.name, value: item.goodsCount }));
});

const categoryGoodsSale = computed(() => {
  const xLabels: string[] = [];
  const values: any[] = [];
  const categoryGoodsSale = store.state.dashboard.categoryGoodsSale;
  categoryGoodsSale.forEach((item: any) => {
    xLabels.push(item.name);
    values.push(item.goodsCount);
  });
  return { xLabels, values };
});

const categoryGoodsFavor = computed(() => {
  const xLabels: string[] = [];
  const values: any[] = [];
  const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor;
  categoryGoodsFavor.forEach((item: any) => {
    xLabels.push(item.name);
    values.push(item.goodsFavor);
  });
  return { xLabels, values };
});
</script>

<style lang="scss" scoped>
.content-row {
  margin-top: 20px;
}
</style>
