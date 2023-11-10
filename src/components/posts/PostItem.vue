<script setup lang="ts">
import { type PropType } from 'vue'
import { type Post } from '@/types'

const props = defineProps({
  index: {
    type: Number,
    required: true
  },
  post: {
    type: Object as PropType<Post>,
    required: true
  }
})
const emit = defineEmits<{
  (e: 'moveUp', index: number): void
  (e: 'moveDown', index: number): void
}>()

const handleMoveUp = () => emit('moveUp', props.index)

const handleMoveDown = () => emit('moveDown', props.index)
</script>

<template>
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
        @click="handleMoveUp"
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
        @click="handleMoveDown"
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
</template>
