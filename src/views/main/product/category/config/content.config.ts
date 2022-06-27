const title = '商品分类';

const propList = [
  { prop: 'id', label: '分类编号', minWidth: '120' },
  { prop: 'name', label: '分类名', minWidth: '120' },
  { prop: 'createAt', label: '创建时间', minWidth: '150' },
  { prop: 'updateAt', label: '更新时间', minWidth: '150' },
  { label: '操作', minWidth: '120', slotName: 'handler' }
];

export const categoryContentTableConfig = {
  title,
  propList,
  showIndexColumn: true, //是否显示索引列
  showSelectColumn: true //是否显示多选列
};
