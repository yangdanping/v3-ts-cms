const title = '菜单列表';

const propList = [
  { prop: 'name', label: '菜单名称', minWidth: '100' },
  { prop: 'type', label: '类型', minWidth: '60' },
  { prop: 'url', label: '菜单url', minWidth: '100' },
  { prop: 'icon', label: '菜单icon', minWidth: '60', slotName: 'menuIcon' },
  { prop: 'permission', label: '按钮权限', minWidth: '100' },
  { prop: 'createAt', label: '创建时间', minWidth: '150' },
  { prop: 'updateAt', label: '更新时间', minWidth: '150' },
  { label: '操作', minWidth: '120', slotName: 'handler' }
];

export const menuContentTableConfig = {
  title,
  propList,
  // 读写个属性,专门针对需要展开的表格
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  }
};
