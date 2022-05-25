<template>
  <div class="">
    <el-table :data="data" border style="width: 100%">
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center">
          <template #default="scope">
            <!-- 通过作用域插槽将scope.row传到上一层 -->
            <slot :name="item.slotName" :row="scope.row">{{ scope.row[item.prop] }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
interface ListData {
  data: any[] | undefined;
  propList: any[];
}
defineProps<ListData>();
</script>

<style lang="scss" scoped></style>
