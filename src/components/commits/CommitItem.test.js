import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import CommitItem from '@/components/commits/CommitItem.vue'

const mockCommit = {
  postId: 1,
  from: 0,
  to: 1
}

describe('<CommitItem />', () => {
  it('renders component', () => {
    const wrapper = mount(CommitItem, {
      props: {
        commit: mockCommit
      }
    })

    expect(wrapper.text()).toContain('Moved post 1 from index 0 to 1')
    expect(wrapper.text()).toContain('Time Travel')
  })

  it('emits timeTravel event when button is clicked', async () => {
    const wrapper = mount(CommitItem, {
      props: {
        commit: mockCommit
      }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('timeTravel')).toHaveLength(1)
  })
})
