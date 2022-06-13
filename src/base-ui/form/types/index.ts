type FormType = 'input' | 'password' | 'select' | 'datepicker';

export interface IFormItem {
  field: string;
  type: FormType;
  // IFormItem如何定义具体要看element-plus官网,看你要的那个表单组件具体有什么属性
  label: string;
  rules?: any[];
  placeholder?: any;
  options?: any[]; // 针对select中的options
  otherOptions?: any; // 针对其他el属性的属性,最好每个都有,因为每个el组件都可能有其他属性(可设为对象,里面放一个个属性,然后v-bind:"item.otherOptions"绑定到el组件上)
  isHidden?: boolean; // 控制是否隐藏
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  colLayout?: any; //对象类型注意用any来定义
  itemStyle?: any;
}
