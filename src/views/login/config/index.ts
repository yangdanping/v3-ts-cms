import { reactive } from 'vue';
import type { FormRules } from 'element-plus';

export const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入账号名', trigger: 'blur' },
    { pattern: /^[a-z0-9]{5,10}$/, message: '用户名必须是5~10个字母或数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '密码必须是3位以上字母或数字', trigger: 'blur' }
  ]
});
