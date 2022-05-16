<template>
  <div class="login-phone">
    <el-form>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.trim="phone.number" clearable />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model.trim="phone.code" maxlength="4" clearable />
          <el-button type="primary" :size="'small'">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
const phone = reactive({
  number: '',
  code: ''
});
</script>

<style lang="scss" scoped>
.get-code {
  display: flex;
  align-items: center;
  .el-button {
    margin-left: 10px;
  }
}
</style>
