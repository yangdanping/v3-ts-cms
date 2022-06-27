const title = '部门列表';

const propList = [
  { prop: 'name', label: '部门名', minWidth: '100' },
  { prop: 'parentId', label: '直属id', minWidth: '60' },
  { prop: 'leader', label: '负责人', minWidth: '100' },
  { prop: 'createAt', label: '创建时间', minWidth: '150' },
  { prop: 'updateAt', label: '更新时间', minWidth: '150' },
  { label: '操作', minWidth: '120', slotName: 'handler' }
];

export const departmentContentTableConfig = {
  title,
  propList
};
