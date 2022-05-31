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
    <el-table :data="data" v-bind="childrenProps" @selection-change="handleSelectionChange" border style="width: 100%">
      <el-table-column v-if="showSelectColumn" type="selection" min-width="80" align="center"></el-table-column>
      <el-table-column v-if="showIndexColumn" type="index" label="序号" min-width="150" align="center"></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <!-- 通过作用域插槽将scope.row传到上一层,那边通过slotProps.row得到 -->
            <slot :name="item.slotName" :row="scope.row">{{ scope.row[item.prop] }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div v-if="showFooter" class="footer">
      <slot name="footer">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          v-model:currentPage="page.currentPage"
          @current-change="handleCurrentChange"
          v-model:page-size="page.pageSize"
          @size-change="handleSizeChange"
          :page-sizes="[10, 20, 30]"
          :total="dataCount"
          small
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title?: string;
    data: any[] | undefined;
    dataCount: number;
    propList: any[];
    showIndexColumn?: boolean;
    showSelectColumn?: boolean;
    page: any; //分页
    childrenProps: any; //展开项
    showFooter: boolean;
  }>(),
  {
    showIndexColumn: false,
    showSelectColumn: false,
    page: () => ({ currentPage: 0, pageSize: 10 }),
    childrenProps: {},
    showFooter: true
  }
);

const emit = defineEmits(['selectionChange', 'update:page']);
const handleSelectionChange = (value: any) => {
  emit('selectionChange', value);
};

const handleSizeChange = (pageSize: any) => {
  console.log('handleSizeChange');
  emit('update:page', { ...props.page, pageSize }); //原值和新值
};
const handleCurrentChange = (currentPage: any) => {
  console.log('handleCurrentChange');
  emit('update:page', { ...props.page, currentPage });
};
</script>

<style lang="scss" scoped>
.table {
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
}
</style>
