import { apiHandler } from '@/lib/api';

export const createPost = async (payload: {
  title: string;
  content: string;
  community: string;
}) => {
  const res = await apiHandler({
    method: 'post',
    url: 'post/create',
    data: payload,
  });
  return res;
};

export const listPostApi = async (payload: {
  page: number;
  pageSize: number;
  search: string;
  community: string;
}) => {
  const res = await apiHandler({
    url: 'post/list',
    params: payload,
  });
  return res;
};
