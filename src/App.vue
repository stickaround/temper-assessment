<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { getPosts } from './services/apis'
import { type Post, type Commit } from './types'

const posts: Post[] = reactive([])
const commits: Commit[] = reactive([])

onMounted(async () => {
  const initialPosts = await getPosts()
  posts.push(...initialPosts.slice(0, 5))
})

const moveUp = (index: number) => {
  const temp = posts[index]
  posts[index] = posts[index - 1]
  posts[index - 1] = temp

  commits.push({ id: temp.id, from: index, to: index - 1 })
}

const moveDown = (index: number) => {
  const temp = posts[index]
  posts[index] = posts[index + 1]
  posts[index + 1] = temp

  commits.push({ id: temp.id, from: index, to: index + 1 })
}

const timeTravel = (index: number) => {
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
      <div>
        <h2 class="text-3xl font-bold text-white mb-8">Sortable Post list</h2>
        <ul>
          <li v-for="(post, index) in posts" :key="post.id">
            <div
              class="flex justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-xl mb-4 w-full transition"
            >
              <p class="w-[95%] truncate py-2">Post {{ post.id }}</p>
              <div
                class="flex flex-col"
                :class="index === 0 || index === 4 ? 'justify-center' : 'justify-between'"
              >
                <svg
                  class="w-3 h-3 text-purple-800 hover:text-gray-900 cursor-pointer"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 8"
                  v-if="index !== 0"
                  @click="moveUp(index)"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
                  />
                </svg>
                <svg
                  class="w-3 h-3 text-purple-800 hover:text-gray-900 cursor-pointer"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 8"
                  v-if="index !== 4"
                  @click="moveDown(index)"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                  />
                </svg>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <div class="p-6 bg-gray-100 border border-gray-200 rounded-lg mb-0 shadow-xl">
          <h2 class="text-2xl text-gray-900">List of actions committed</h2>
          <div
            class="p-2 bg-white border border-gray-200 rounded shadow-lg mt-4"
            v-if="commits.length"
          >
            <ul>
              <li v-for="({ id, from, to }, index) in commits" :key="index">
                <div class="flex justify-between p-2">
                  <p class="flex items-center text-gray-700">
                    Moved post {{ id }} from index {{ from }} to {{ to }}
                  </p>
                  <button
                    class="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded text-sm px-5 py-2.5"
                    @click="timeTravel(index)"
                  >
                    Time Travel
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <p class="text-lg mt-2" v-else>No movement done so far</p>
        </div>
      </div>
    </div>
  </main>
</template>
