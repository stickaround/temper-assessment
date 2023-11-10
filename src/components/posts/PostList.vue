<script setup lang="ts">
import { type PropType } from 'vue'
import type { Post } from '@/types'
import PostItem from './PostItem.vue'

defineProps({
  posts: {
    type: Array as PropType<Post[]>,
    required: true
  }
})

const emit = defineEmits(['moveUp', 'moveDown'])
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold text-white mb-8">Sortable Post list</h2>
    <transition-group tag="ul">
      <li v-for="(post, index) in posts" :key="post.id" class="transition-transform duration-1000">
        <PostItem
          :post="post"
          :index="index"
          @move-up="emit('moveUp', index)"
          @move-down="emit('moveDown', index)"
        />
      </li>
    </transition-group>
  </div>
</template>
