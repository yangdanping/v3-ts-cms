import type { IForm, IFormItem } from '@/base-ui/form';

export const formItems: IFormItem[] = [
  { field: 'name', type: 'input', label: '部门名', placeholder: '请输入部门名' },
  { field: 'parentId', type: 'input', label: '直属id', placeholder: '请输入直属id' },
  { field: 'leader', type: 'input', label: '负责人', placeholder: '请输入负责人' }
];

export const colLayout = {
  span: 24
};

export const departmentModalConfig: IForm = {
  formItems,
  colLayout,
  itemStyle: {}
};
