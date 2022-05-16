<template>
  <span :class="iconLabel">
    <el-icon :size="size" :color="color">
      <user v-if="name === 'user'" />
      <iphone v-else-if="name === 'iphone'" />
    </el-icon>
    <span v-if="label" class="span">{{ label }}</span>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { User, Iphone } from '@element-plus/icons-vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  }
});

// 若外界有传msg,则使flex布局生效
const iconLabel = computed(() => ({ iconLabel: !!props.label ?? false }));
</script>

<style lang="scss" scoped>
.iconLabel {
  display: flex;
  align-items: center;
  justify-content: center;
}

.span {
  margin-left: 4px;
}
</style>
