<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { getPosts } from '@/services/apis'
import { type Post, type Commit } from '@/types'
import CommitList from '@/components/commits/CommitList.vue'
import PostList from '@/components/posts/PostList.vue'

const posts = reactive<Post[]>([])
const commits = reactive<Commit[]>([])

onMounted(async () => {
  const initialPosts = await getPosts()
  posts.push(...initialPosts)
})

const moveUp = (index: number) => {
  const temp = posts[index]
  posts[index] = posts[index - 1]
  posts[index - 1] = temp

  commits.unshift({ postId: temp.id, from: index, to: index - 1 })
}

const moveDown = (index: number) => {
  const temp = posts[index]
  posts[index] = posts[index + 1]
  posts[index + 1] = temp

  commits.unshift({ postId: temp.id, from: index, to: index + 1 })
}

const timeTravel = (index: number) => {
  for (let i = 0; i <= index; i++) {
    const { from, to } = commits[i]

    const temp = posts[from]
    posts[from] = posts[to]
    posts[to] = temp
  }

  commits.splice(0, index + 1)
}
</script>

<template>
  <main class="h-64 bg-gradient-to-br from-indigo-500 from-50% via-white via-50% to-white to-100%">
    <div class="container mx-auto grid grid-cols-2 gap-40 py-8">
      <PostList :posts="posts" @move-up="moveUp" @move-down="moveDown" />
      <CommitList :commits="commits" @time-travel="timeTravel" />
    </div>
  </main>
</template>
