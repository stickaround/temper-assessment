<script setup lang="ts">
import { type PropType } from 'vue'
import { type Commit } from '@/types'
import CommitItem from './CommitItem.vue'

defineProps({
  commits: {
    type: Array as PropType<Commit[]>,
    required: true
  }
})

const emit = defineEmits(['timeTravel'])
</script>

<template>
  <div>
    <div class="p-6 bg-gray-100 border border-gray-200 rounded-lg mb-0 shadow-xl">
      <h2 class="text-2xl text-gray-900">List of actions committed</h2>
      <div v-if="commits.length" class="p-2 bg-white border border-gray-200 rounded shadow-lg mt-4">
        <transition-group tag="ul">
          <li
            v-for="(commit, index) in commits"
            :key="`${commit.postId}.${commit.from}.${commit.to}`"
            class="transition-transform duration-1000"
          >
            <CommitItem :commit="commit" :index="index" @time-travel="emit('timeTravel', index)" />
          </li>
        </transition-group>
      </div>
      <p v-else class="text-lg mt-2">No movement done so far</p>
    </div>
  </div>
</template>
