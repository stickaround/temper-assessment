import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import CommitList from '@/components/commits/CommitList.vue'
import CommitItem from '@/components/commits/CommitItem.vue'

const mockCommits = [
  { postId: 1, from: 0, to: 1 },
  { postId: 3, from: 2, to: 3 }
]

describe('<CommitList />', () => {
  it('renders commits', () => {
    const wrapper = mount(CommitList, {
      props: {
        commits: mockCommits
      }
    })

    const commitItems = wrapper.findAllComponents(CommitItem)
    expect(commitItems.length).toBe(mockCommits.length)

    commitItems.forEach((commitItem, index) => {
      expect(commitItem.props('commit')).toEqual(mockCommits[index])
      expect(commitItem.props('index')).toBe(index)
    })
  })

  it('shows no commit message when there is no commit history', () => {
    const wrapper = mount(CommitList, {
      props: {
        commits: []
      }
    })

    expect(wrapper.text()).toContain('No movement done so far')
  })
})
