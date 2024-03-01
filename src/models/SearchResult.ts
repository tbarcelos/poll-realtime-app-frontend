export type SearchResult = {
  id: string;
  title: string;
  url: string;
  description: string;
  category: 'VIDEOS' | 'PLAYLISTS' | 'BLOG_POSTS';
};

export const Category = {
  VIDEOS: 'VIDEO',
  PLAYLISTS: 'PLAYLIST',
  BLOG_POSTS: 'BLOG POST',
};
