<script setup lang="ts">
import { type PropType, computed } from 'vue'
import { type Commit } from '@/types'
import CommitItem from './CommitItem.vue'

const props = defineProps({
  commits: {
    type: Array as PropType<Commit[]>,
    required: true
  },
  onTimeTravel: {
    type: Function as PropType<(index: number) => void>
  }
})

const reversedCommits = computed(() => props.commits.slice().reverse())
</script>

<template>
  <div>
    <div class="p-6 bg-gray-100 border border-gray-200 rounded-lg mb-0 shadow-xl">
      <h2 class="text-2xl text-gray-900">List of actions committed</h2>
      <div class="p-2 bg-white border border-gray-200 rounded shadow-lg mt-4" v-if="commits.length">
        <ul>
          <li v-for="(commit, index) in reversedCommits" :key="index">
            <CommitItem
              :commit="commit"
              :index="commits.length - 1 - index"
              @time-travel="onTimeTravel"
            />
          </li>
        </ul>
      </div>
      <p class="text-lg mt-2" v-else>No movement done so far</p>
    </div>
  </div>
</template>
