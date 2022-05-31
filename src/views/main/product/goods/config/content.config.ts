const title = '商品列表';

const propList = [
  { prop: 'name', label: '商品名', minWidth: '120' },
  { prop: 'oldPrice', label: '原价格', minWidth: '80', slotName: 'oldPrice' },
  { prop: 'newPrice', label: '现价格', minWidth: '80', slotName: 'newPrice' },
  { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'image' },
  { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
  { prop: 'createAt', label: '创建时间', minWidth: '150' },
  { prop: 'updateAt', label: '更新时间', minWidth: '150' },
  { label: '操作', minWidth: '120', slotName: 'handler' }
];

export const goodsContentTableConfig = {
  title,
  propList,
  showIndexColumn: true, //是否显示索引列
  showSelectColumn: true //是否显示多选列
};
