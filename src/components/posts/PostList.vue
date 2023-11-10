<script setup lang="ts">
import { type PropType } from 'vue'
import type { Post } from '@/types'
import PostItem from './PostItem.vue'

defineProps({
  posts: {
    type: Array as PropType<Post[]>,
    required: true
  },
  onMoveUp: {
    type: Function as PropType<(index: number) => void>
  },
  onMoveDown: {
    type: Function as PropType<(index: number) => void>
  }
})
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold text-white mb-8">Sortable Post list</h2>
    <ul>
      <li v-for="(post, index) in posts" :key="post.id">
        <PostItem :post="post" :index="index" @move-up="onMoveUp" @move-down="onMoveDown" />
      </li>
    </ul>
  </div>
</template>
