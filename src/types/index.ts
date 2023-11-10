export type Post = {
  id: number
  title: string
}

export type Commit = {
  postId: number
  from: number
  to: number
}
