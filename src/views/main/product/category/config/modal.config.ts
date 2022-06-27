import type { IForm, IFormItem } from '@/base-ui/form';

export const formItems: IFormItem[] = [{ field: 'name', type: 'input', label: '分类名', placeholder: '请输入分类名' }];

export const colLayout = {
  span: 24
};

export const categoryModalConfig: IForm = {
  formItems,
  colLayout,
  itemStyle: {}
};
