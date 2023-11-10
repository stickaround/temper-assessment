export type Post = {
  id: number
  title: string
  content: string
}

export type Commit = {
  postId: number
  from: number
  to: number
}
