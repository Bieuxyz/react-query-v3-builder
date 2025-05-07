import {
  useCreatePost,
  usePost,
  usePosts,
  useUpdatePost,
} from './query-hook.ts'

const POST_ID = 1
const USER_ID = 123123

export function MainPage() {
  const { data: post } = usePost({ id: POST_ID })({
    onSuccess: (data) => {
      console.log('Post fetched successfully', data)
    },
  })

  const { data: posts } = usePosts({
    select: (data) => {
      return data
    },
  })

  const { mutate: createPost } = useCreatePost({
    onSuccess: (data) => {
      console.log('Post created successfully', data)
    },
    onError: (error) => {
      console.error('Failed to create post', error)
    },
  })

  const { mutate: updatePost } = useUpdatePost(POST_ID)({
    onSuccess: (data) => {
      console.log('Post created successfully', data)
    },
    onError: (error) => {
      console.error('Failed to create post', error)
    },
  })

  const handleSubmit = () => {
    createPost({
      title: 'New Post',
      id: POST_ID,
      userId: USER_ID,
      body: 'New content'
    })
  }

  const handleUpdate = () => {
    updatePost({
      title: 'Update Post',
      userId: USER_ID,
      body: 'Update content',
    })
  }

  return (
    <div>
      <h1>Hello world</h1>
      <pre>{JSON.stringify(post, null, 4)}</pre>
      <pre>{JSON.stringify(posts, null, 4)}</pre>
      <button onClick={handleSubmit}>Create New Post</button>
      <button onClick={handleUpdate}>update post</button>
    </div>
  )
}
