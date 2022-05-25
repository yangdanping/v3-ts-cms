import type { IFormItem, IForm } from '@/base-ui/form';

//  定义el-form-item(其v-model属性应当与formItems一一对应,所以增加field字段)
export const formItems: IFormItem[] = [
  {
    field: 'id',
    type: 'input',
    label: 'id',
    placeholder: '请输入用户id'
  },
  { field: 'name', type: 'input', label: '用户名', placeholder: '请输入用户名' },
  { field: 'password', type: 'password', label: '密码', placeholder: '请输入密码' },
  {
    field: 'sport',
    type: 'select',
    label: '喜欢的运动',
    placeholder: '请选择喜欢的运动',
    options: [
      { title: '篮球', value: 'basketball' },
      { title: '足球', value: 'football' }
    ]
  },
  {
    field: 'createdTime',
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
