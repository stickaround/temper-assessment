<script setup lang="ts">
import { type PropType } from 'vue'
import { type Post } from '@/types'
import { POST_COUNT } from '@/config/constants'
import ArrowUp from '@/components/icons/ArrowUp.vue'
import ArrowDown from '@/components/icons/ArrowDown.vue'

defineProps({
  index: {
    type: Number,
    required: true
  },
  post: {
    type: Object as PropType<Post>,
    required: true
  }
})

const emit = defineEmits(['moveUp', 'moveDown'])
</script>

<template>
  <div
    class="flex justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-xl mb-4 w-full"
  >
    <p class="w-[95%] truncate py-2">Post {{ post.id }}</p>
    <div
      class="flex flex-col"
      :class="index === 0 || index === POST_COUNT - 1 ? 'justify-center' : 'justify-between'"
    >
      <ArrowUp v-if="index !== 0" @click="emit('moveUp', index)" />
      <ArrowDown v-if="index !== POST_COUNT - 1" @click="emit('moveDown', index)" />
    </div>
  </div>
</template>
