import type { IFormItem, IForm } from '@/base-ui/form';

//  定义el-form-item(其v-model属性应当与formItems一一对应,所以增加field字段)
export const formItems: IFormItem[] = [
  { field: 'name', type: 'input', label: '部门名', placeholder: '请输入部门名' },
  { field: 'parentId', type: 'input', label: '直属id', placeholder: '请输入直属id' },
  { field: 'leader', type: 'input', label: '负责人', placeholder: '请输入负责人' },
  {
    field: 'createAt',
    type: 'datepicker',
    label: '创建时间',
    // 专属于datepicker的其他配置
    otherOptions: {
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      type: 'daterange'
    }
  }
];
// 定义el-form-item的style
export const itemStyle = {
  padding: '10px 40px'
};
// 定义el-form-item每行显示几个

export const departmentSearchFormConfig: IForm = {
  formItems,
  itemStyle
};
