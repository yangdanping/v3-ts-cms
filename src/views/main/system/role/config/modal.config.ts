import type { IForm, IFormItem } from '@/base-ui/form';

export const formItems: IFormItem[] = [
  { field: 'name', type: 'input', label: '角色名', placeholder: '请输入角色名' },
  { field: 'intro', type: 'input', label: '权限介绍', placeholder: '请输入权限介绍' }
];

export const colLayout = {
  span: 24
};

export const roleModalConfig: IForm = {
  formItems,
  colLayout,
  itemStyle: {}
};
