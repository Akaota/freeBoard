import dayjs from 'dayjs';
import { IPost } from 'app/shared/model/post.model';

export interface IBoard {
  id?: number;
  title?: string;
  category?: string;
  createdAt?: string;
  createdBy?: number;
  posts?: IPost[] | null;
}

export const defaultValue: Readonly<IBoard> = {};
