import type { IFormItem, IForm } from '@/base-ui/form';

//  定义el-form-item
export const formItems: IFormItem[] = [
  {
    type: 'input',
    label: 'id',
    placeholder: '请输入用户id'
  },
  {
    type: 'input',
    label: '用户名',
    placeholder: '请输入用户名'
  },
  {
    type: 'password',
    label: '密码',
    placeholder: '请输入密码'
  },
  {
    type: 'select',
    label: '喜欢的运动',
    placeholder: '请选择喜欢的运动',
    options: [
      { title: '篮球', value: 'basketball' },
      { title: '足球', value: 'football' }
    ]
  },
  {
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

export const formConfig: IForm = {
  formItems,
  itemStyle,
  colLayout
};
