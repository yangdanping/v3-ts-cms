export interface IProductState {
  goodsList?: any[]; //对于userList这样过于复杂且不确定的类型就用any就行
  goodsCount?: number;
  categoryList?: any[]; //对于userList这样过于复杂且不确定的类型就用any就行
  categoryCount?: number;
}
