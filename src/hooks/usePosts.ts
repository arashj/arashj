import { useQuery } from '@tanstack/react-query';
import { fetchPosts, fetchPostsByUserId } from '../services/api';

// Query keys for posts
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: string) => [...postKeys.lists(), { filters }] as const,
  byUser: (userId: number) => [...postKeys.all, 'byUser', userId] as const,
};

// Fetch all posts
export const usePosts = () => {
  return useQuery({
    queryKey: postKeys.lists(),
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Fetch posts by user ID
export const usePostsByUser = (userId: number) => {
  return useQuery({
    queryKey: postKeys.byUser(userId),
    queryFn: () => fetchPostsByUserId(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};