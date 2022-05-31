const title = '角色列表';

const propList = [
  { prop: 'name', label: '角色名', minWidth: '100' },
  { prop: 'intro', label: '权限介绍', minWidth: '100' },
  { prop: 'createAt', label: '创建时间', minWidth: '150' },
  { prop: 'updateAt', label: '更新时间', minWidth: '150' },
  { label: '操作', minWidth: '120', slotName: 'handler' }
];

export const roleContentTableConfig = {
  title,
  propList,
  showIndexColumn: true, //是否显示索引列
  showSelectColumn: true //是否显示多选列
};
