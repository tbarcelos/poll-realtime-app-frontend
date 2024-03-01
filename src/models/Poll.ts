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
