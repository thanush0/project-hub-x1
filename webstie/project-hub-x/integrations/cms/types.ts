// Basic types for data items (replacing Wix Data types)
export interface WixDataItem {
  _id?: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  _owner?: string;
  [key: string]: any;
}

export interface WixDataResult<T = WixDataItem> {
  items: T[];
  length: number;
  pageSize?: number;
  totalCount?: number;
}

export type WixDataQueryResult = WixDataResult;
