<script setup lang="ts">
import { type PropType } from 'vue'
import { type Commit } from '@/types'

const props = defineProps({
  index: { type: Number, required: true },
  commit: {
    type: Object as PropType<Commit>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'timeTravel', index: number): void
}>()

const handleTimeTravel = () => emit('timeTravel', props.index)
</script>

<template>
  <div class="flex justify-between p-2">
    <p class="flex items-center text-gray-700">
      Moved post {{ commit.postId }} from index {{ commit.from + 1 }} to {{ commit.to + 1 }}
    </p>
    <button
      class="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded text-sm px-5 py-2.5"
      @click="handleTimeTravel"
    >
      Time Travel
    </button>
  </div>
</template>
