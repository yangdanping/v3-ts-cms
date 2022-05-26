export interface ISystemState {
  usersList?: any[]; //对于userList这样过于复杂且不确定的类型就用any就行
  usersCount?: number;
  roleList?: any[]; //对于userList这样过于复杂且不确定的类型就用any就行
  roleCount?: number;
}
