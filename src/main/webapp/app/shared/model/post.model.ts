import dayjs from 'dayjs';
import { IBoard } from 'app/shared/model/board.model';

export interface IPost {
  id?: number;
  title?: string;
  contents?: string | null;
  readCnt?: number | null;
  goodCnt?: number | null;
  createdAt?: string;
  createdBy?: number;
  board?: IBoard | null;
}

export const defaultValue: Readonly<IPost> = {};
