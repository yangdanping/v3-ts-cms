<template>
  <div class="table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table :data="data" @selection-change="handleSelectionChange" border style="width: 100%">
      <el-table-column v-if="showSelectColumn" type="selection" min-width="80" align="center"></el-table-column>
      <el-table-column v-if="showIndexColumn" type="index" label="序号" min-width="150" align="center">1</el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center">
          <template #default="scope">
            <!-- 通过作用域插槽将scope.row传到上一层,那边通过slotProps.row得到 -->
            <slot :name="item.slotName" :row="scope.row">{{ scope.row[item.prop] }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
  <div class="footer">
    <slot name="footer">
      <!-- <el-pagination
        v-model:currentPage="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[100, 200, 300, 400]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      /> -->
    </slot>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    data: any[] | undefined;
    propList: any[];
    title?: string;
    showIndexColumn?: boolean;
    showSelectColumn?: boolean;
  }>(),
  {
    showIndexColumn: false,
    showSelectColumn: false
  }
);
const emit = defineEmits(['selectionChange']);
const handleSelectionChange = (value: any) => {
  emit('selectionChange', value);
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  height: 45px;
  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .handler {
    align-items: center;
  }
}

.footer {
  display: flex;
  justify-content: right;
  align-items: center;
  padding-top: 10px;
}
</style>
