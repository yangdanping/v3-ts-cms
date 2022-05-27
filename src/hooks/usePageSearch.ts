import { ref } from 'vue';
import PageContentTable from '@/components/page-content-table';

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContentTable>>();
  const handleSearchClick = (queryInfo: any) => pageContentRef.value?.getPageData(queryInfo); //调用其组件中的方法
  const handleResetClick = () => pageContentRef.value?.getPageData(); //重置时也进行查询

  return {
    pageContentRef,
    handleSearchClick,
    handleResetClick
  };
}
