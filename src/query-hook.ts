import {
  createMutationHookFactory,
  createQueryHook,
  queryKeyBuilder,
} from './builder.ts'
import {
  createPost,
  getPostById,
  getPosts,
  type Post,
  updatePost,
} from './service.ts'

export const postQueryKey = queryKeyBuilder('post')

export const usePost = ({ id }: Pick<Post, 'id'>) =>
  createQueryHook(postQueryKey.detail(id), () => getPostById({ id }))

export const usePosts = createQueryHook(
  postQueryKey.list({
    page: 1,
    limit: 10,
  }),
  getPosts,
)

// Example usage for mutations
export const useCreatePost = createMutationHookFactory(
  createPost,
  (queryClient) => ({
    onSuccess: () => {
      void queryClient.invalidateQueries(postQueryKey.lists())
    },
  }),
)

export const useUpdatePost = (postId: number) =>
  createMutationHookFactory(
    (data: Omit<Post, 'id'>) =>
      updatePost({
        ...data,
        id: postId,
      }),
    (queryClient) => ({
      onSuccess: (post) => {
        void queryClient.invalidateQueries(postQueryKey.detail(post?.id))
      },
    }),
  )
