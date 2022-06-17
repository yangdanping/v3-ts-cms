import { ref } from 'vue';
import PageModal from '@/components/page-modal';
type cbFn = (item?: any) => void; // 增加传参,使其回显时能拿到数据
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
    createCallback && createCallback(); //点击后调用外界传来的逻辑(专属于那个页面的逻辑)
  };

  const handleEditClick = (row: any) => {
    dialogTitle.value = `编辑${title}`;
    defaultInfo.value = { ...row }; //若担心在其他地方有影响的话,做浅拷贝
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    editCallback && editCallback(row); //点击后调用外界传来的逻辑,并且把相关值传入(专属于那个页面的逻辑)
  };

  return { pageModalRef, dialogTitle, defaultInfo, handleCreateClick, handleEditClick };
}
