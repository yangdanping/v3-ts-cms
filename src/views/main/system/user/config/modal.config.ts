import type { IForm, IFormItem } from '@/base-ui/form';

export const formItems: IFormItem[] = [
  { field: 'name', type: 'input', label: '用户名', placeholder: '请输入用户名' },
  { field: 'realname', type: 'input', label: '真实姓名', placeholder: '请输入真实姓名' },
  { field: 'password', type: 'password', label: '用户密码', placeholder: '请输入用户密码' },
  { field: 'cellphone', type: 'input', label: '电话号码', placeholder: '请输入电话号码' },
  // 下面是需要网络请求的
  { field: 'departmentId', type: 'select', label: '选择部门', placeholder: '请选择部门', options: [] },
  { field: 'roleId', type: 'select', label: '选择角色', placeholder: '请选择角色', options: [] }
];

export const colLayout = {
  span: 24
};

export const userModalConfig: IForm = {
  formItems,
  colLayout,
  itemStyle: {}
};
