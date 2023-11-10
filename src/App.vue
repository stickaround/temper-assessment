<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { getPosts } from '@/services/apis'
import { type Post, type Commit } from '@/types'
import PostList from '@/components/posts/PostList.vue'
import CommitList from '@/components/commits/CommitList.vue'

const posts: Post[] = reactive([])
const commits: Commit[] = reactive([])

onMounted(async () => {
  const initialPosts = await getPosts()
  posts.push(...initialPosts.slice(0, 5))
})

const handleMoveUp = (index: number) => {
  const temp = posts[index]
  posts[index] = posts[index - 1]
  posts[index - 1] = temp

  commits.push({ postId: temp.id, from: index, to: index - 1 })
}

const handleMoveDown = (index: number) => {
  const temp = posts[index]
  posts[index] = posts[index + 1]
  posts[index + 1] = temp

  commits.push({ postId: temp.id, from: index, to: index + 1 })
}

const handleTimeTravel = (index: number) => {
  for (let i = commits.length - 1; i >= index; i--) {
    const { from, to } = commits[i]

    const temp = posts[from]
    posts[from] = posts[to]
    posts[to] = temp
  }

  commits.splice(index)
}
</script>

<template>
  <main class="h-64 bg-gradient-to-br from-indigo-500 from-50% via-white via-50% to-white to-100%">
    <div class="container mx-auto grid grid-cols-2 gap-40 py-8">
      <PostList :posts="posts" :on-move-up="handleMoveUp" :on-move-down="handleMoveDown" />
      <CommitList :commits="commits" :on-time-travel="handleTimeTravel" />
    </div>
  </main>
</template>
