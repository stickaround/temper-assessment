import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import PostItem from '@/components/posts/PostItem.vue'
import ArrowUp from '@/components/icons/ArrowUp.vue'
import ArrowDown from '@/components/icons/ArrowDown.vue'

describe('<PostItem />', () => {
  it('renders component', () => {
    const wrapper = mount(PostItem, {
      props: {
        index: 0,
        post: {
          id: 1,
          title: '1'
        }
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Post 1')
  })
})

it('renders only arrow down button when it is the first item', () => {
  const wrapper = mount(PostItem, {
    props: {
      index: 0,
      post: {
        id: 1,
        title: '1'
      }
    }
  })

  const arrowUpIcon = wrapper.findComponent(ArrowUp)
  expect(arrowUpIcon.exists()).toBe(false)
})

it('renders only arrow up button when it is the last item', () => {
  const wrapper = mount(PostItem, {
    props: {
      index: 4,
      post: {
        id: 1,
        title: '1'
      }
    }
  })

  const arrowDownIcon = wrapper.findComponent(ArrowDown)
  expect(arrowDownIcon.exists()).toBe(false)
})

it('emits moveUp & moveDown events when relevant button is clicked', async () => {
  const wrapper = mount(PostItem, {
    props: {
      index: 2,
      post: {
        id: 1,
        title: '1'
      }
    }
  })

  // moveUp event
  await wrapper.findComponent({ name: 'ArrowUp' }).trigger('click')
  expect(wrapper.emitted('moveUp')).toHaveLength(1)

  // moveDown event
  await wrapper.findComponent({ name: 'ArrowDown' }).trigger('click')
  expect(wrapper.emitted('moveDown')).toHaveLength(1)
})
