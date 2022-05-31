import myRequest from '../../index';
import type { IDataType } from '@/service/types';

export function getPageListData(url: string, queryInfo: any) {
  return myRequest.post<IDataType>({
    url,
    data: queryInfo
  });
}
