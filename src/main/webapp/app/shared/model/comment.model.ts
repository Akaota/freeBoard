import dayjs from 'dayjs';
import { IPost } from 'app/shared/model/post.model';

export interface IComment {
  id?: number;
  depth?: number | null;
  comment?: string | null;
  readCnt?: number | null;
  goodCnt?: number | null;
  createdAt?: string;
  createdBy?: number;
  comments?: IComment[] | null;
  post?: IPost | null;
  parent?: IComment | null;
}

export const defaultValue: Readonly<IComment> = {};
