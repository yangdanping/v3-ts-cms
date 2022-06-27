import type { IFormItem, IForm } from '@/base-ui/form';

//  定义el-form-item(其v-model属性应当与formItems一一对应,所以增加field字段)
export const formItems: IFormItem[] = [{ field: 'name', type: 'input', label: '分类名', placeholder: '请输入分类名' }];
// 定义el-form-item的style
export const itemStyle = {
  padding: '10px 40px'
};
// 定义el-form-item每行显示几个
export const categorySearchFormConfig: IForm = {
  formItems,
  itemStyle,
  colLayout: { span: 24 }
};
