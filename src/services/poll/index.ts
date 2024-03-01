import { createApiWithAuth } from '../../services/api';

export interface ICreatePoll {
  title: string;
  options?: string[];
}

export interface IUpdateVote {
  optionId: number;
  pollId: number;
}

export type Option = {
  id: string;
  title: string;
  votesCount: number;
};

export type Poll = {
  id: string;
  title: string;
  options?: Option[];
};

export const load = async (accessToken: string): Promise<Poll[]> => {
  try {
    const api = createApiWithAuth(accessToken);
    const response = await api.get<Poll[]>('/polls');
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const get = async (
  pollId: number,
  accessToken: string,
): Promise<Poll> => {
  try {
    const api = createApiWithAuth(accessToken);
    const response = await api.get<Poll>(`/polls/${pollId}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const create = async (
  createPoll: ICreatePoll,
  accessToken: string,
): Promise<Poll> => {
  try {
    const api = createApiWithAuth(accessToken);
    const response = await api.post<Poll>('/polls', createPoll);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const incrementVote = async (
  updateVote: IUpdateVote,
  accessToken: string,
): Promise<Poll> => {
  try {
    const api = createApiWithAuth(accessToken);
    const response = await api.patch<Poll>('/polls', updateVote);
    return response.data;
  } catch (e) {
    throw e;
  }
};
