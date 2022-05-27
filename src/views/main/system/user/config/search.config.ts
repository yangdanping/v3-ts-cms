import type { IFormItem, IForm } from '@/base-ui/form';

//  定义el-form-item(其v-model属性应当与formItems一一对应,所以增加field字段)
export const formItems: IFormItem[] = [
  { field: 'id', type: 'input', label: 'id', placeholder: '请输入id' },
  { field: 'name', type: 'input', label: '用户名', placeholder: '请输入用户名' },
  { field: 'realname', type: 'input', label: '真实姓名', placeholder: '请输入真实姓名' },
  { field: 'cellphone', type: 'input', label: '电话号码', placeholder: '请输入电话号码' },
  {
    field: 'enable',
    type: 'select',
    label: '用户状态',
    placeholder: '请选择用户状态',
    options: [
      { title: '启用', value: 1 },
      { title: '禁用', value: 0 }
    ]
  },
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
export const colLayout = {
  span: 8
};

export const userSearchFormConfig: IForm = {
  formItems,
  itemStyle,
  colLayout
};
