<template>
  <div class="form">
    <!-- el-col的span属性决定的是栅格占据的列数,不传就是 24/24=1,一行只显示一个,若:span="8"则24/8=3,一行只显示三个,这里我们先传8,后期不写死通过配置传 -->
    <el-form :label-width="labelWidth">
      <el-row>
        <!-- 里面的内容由传进来的IFormItem类型的formItems数组决定(事先定义好配置,然后v-for出来)
        特别提示:v-bind="item.otherOptions"是为了传入其他属性 v-bind直接绑定对象会将对象的所有属性加到上面
        若formItems的对象中有配置otherOptions则这里的v-bind="item.otherOptions"就会生效 -->
        <template v-for="item in formItems" :key="item.label">
          <el-col :span="8" v-bind="colLayout">
            <el-form-item :label="item.label" :style="itemStyle">
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input v-model="inputValue" clearable :placeholder="item.placeholder" :show-password="item.type === 'password' ? true : false" v-bind="item.otherOptions" />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select :placeholder="item.placeholder" v-bind="item.otherOptions">
                  <el-option v-for="option in item.options" :value="option.value" :key="option.value">{{ option.title }}</el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker v-bind="item.otherOptions" />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue';
import type { IFormItem } from '../types';
// 所有这些表单的 组件/label宽度/表单组件样式/表单布局都可由外!界!决定!!!!!!右使用者User决定
defineProps({
  formItems: {
    type: Array as PropType<IFormItem[]>, //利用PropType让Array明确为IFormItem[]类型
    default: () => []
  },
  labelWidth: {
    type: String,
    default: '100px'
  },
  itemStyle: {
    type: Object,
    default: () => ({ padding: '10px 40px' })
  },
  colLayout: {
    type: Object,
    // User那边已经写死span:8(栅格占据的列数)只是做演示,让你看到这样做的好处
    default: () => ({
      // v-bind绑定把所有属性绑定到el-col,在以下不同尺寸的屏幕下使用不同的值
      xl: 6, // 大于等于1920px的屏幕显示 24(默认栅格占据的列数) / 6(栅格占据的列数) = 4个
      lg: 8, // 大于等于1200px的屏幕显示 24/8=3
      md: 12, // 大于等于992px的屏幕显示 24/12=2
      sm: 24, // 大于等于768px的屏幕显示 24/24=1
      xs: 24 // 小于768px的屏幕显示 24/24=1
    })
  }
});
const inputValue = ref('');
</script>

<style lang="scss" scoped>
.form {
  padding-top: 20px;
  // .el-form-item {
  //   padding: 10px 40px; //覆盖掉el-form-item原本的间距,这里注视掉直接定义props让外界决定
  // }
}
.el-select {
  width: 100% !important;
}
</style>
