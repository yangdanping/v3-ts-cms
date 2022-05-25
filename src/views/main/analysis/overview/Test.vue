<template>
  <div class="">
    <el-input v-model="formData.name"></el-input>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const formData = ref({ name: '' });

// const props = defineProps({
//   modelValue: {
//     type: Object,
//     required: true
//   }
// });
// const formData = ref({ ...props.modelValue });
// const emit = defineEmits(['update:modelValue']);
// watch(formData, (newValue) => emit('update:modelValue', newValue), { deep: true });
</script>

<style lang="scss" scoped></style>
