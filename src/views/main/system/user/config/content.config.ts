const title = '用户列表';

const propList = [
  { prop: 'name', label: '用户名', minWidth: '100' },
  { prop: 'realname', label: '真实姓名', minWidth: '100' },
  { prop: 'cellphone', label: '手机号码', minWidth: '100' },
  { prop: 'enable', label: '状态', minWidth: '50', slotName: 'status' }, //slotName用于动态配置插槽名
  { prop: 'createAt', label: '创建时间', minWidth: '150', slotName: 'createAt' },
  { prop: 'updateAt', label: '更新时间', minWidth: '150', slotName: 'updateAt' },
  { label: '操作', minWidth: '120', slotName: 'handler' }
];
// 写一个针对userList的配置文件
export const userContentTableConfig = {
  title,
  propList,
  showIndexColumn: true, //是否显示索引列
  showSelectColumn: true //是否显示多选列
};
