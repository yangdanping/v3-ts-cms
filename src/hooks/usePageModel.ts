import { ref } from 'vue';
import PageModal from '@/components/page-modal';
type cbFn = () => void;
export function usePageModel(title: string, createCallback?: cbFn, editCallback?: cbFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>();
  const dialogTitle = ref('');
  const defaultInfo = ref({});

  const handleCreateClick = () => {
    dialogTitle.value = `新建${title}`;
    defaultInfo.value = {};
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    createCallback && createCallback();
  };

  const handleEditClick = (row: any) => {
    dialogTitle.value = `编辑${title}`;
    defaultInfo.value = { ...row }; //若担心在其他地方有影响的话,做浅拷贝
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    editCallback && editCallback();
  };

  return { pageModalRef, dialogTitle, defaultInfo, handleCreateClick, handleEditClick };
}
