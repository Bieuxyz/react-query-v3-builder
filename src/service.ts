const endpoint = 'https://jsonplaceholder.typicode.com'

export const getPostById = async ({ id }: Pick<Post, 'id'>) => {
  const response = await fetch(`${endpoint}/posts/${id}`)
  const json = await response.json()
  return json as Post
}

export const getPosts = async () => {
  const response = await fetch(`${endpoint}/posts`)
  return (await response.json()) as Post[]
}

export const createPost = async ({ id, ...data }: Post) => {
  const response = await fetch(`${endpoint}/posts/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return (await response.json()) as Post
}

export const updatePost = async ({
  id,
  ...data
}: Post) => {
  const response = await fetch(`${endpoint}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return (await response.json()) as Post
}

export interface Post {
  id: number
  userId: number
  title: string
  body: string
}
