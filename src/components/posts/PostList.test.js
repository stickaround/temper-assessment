import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import PostList from '@/components/posts/PostList.vue'
import PostItem from '@/components/posts/PostItem.vue'

const mockPosts = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
  { id: 3, title: 'Post 3' },
  { id: 4, title: 'Post 4' },
  { id: 5, title: 'Post 5' }
]

describe('<PostList />', () => {
  it('renders posts', () => {
    const wrapper = mount(PostList, {
      props: {
        posts: mockPosts
      }
    })

    const postItems = wrapper.findAllComponents(PostItem)
    expect(postItems.length).toBe(mockPosts.length)

    postItems.forEach((postItem, index) => {
      expect(postItem.props('post')).toEqual(mockPosts[index])
      expect(postItem.props('index')).toBe(index)
    })
  })

  it('emits moveDown event when the move down arrow is clicked', async () => {
    const wrapper = mount(PostList, {
      props: {
        posts: mockPosts
      }
    })

    const postItems = wrapper.findAllComponents(PostItem)
    const firstPostItem = postItems[0]

    await firstPostItem.findComponent({ name: 'ArrowDown' }).trigger('click')

    expect(wrapper.emitted('moveDown')).toHaveLength(1)
    expect(wrapper.emitted('moveDown')[0][0]).toBe(0)
  })

  it('emits moveUp event when the move up arrow is clicked', async () => {
    const wrapper = mount(PostList, {
      props: {
        posts: mockPosts
      }
    })

    const postItems = wrapper.findAllComponents(PostItem)
    const lastPostItem = postItems[postItems.length - 1]

    await lastPostItem.findComponent({ name: 'ArrowUp' }).trigger('click')

    expect(wrapper.emitted('moveUp')).toHaveLength(1)
    expect(wrapper.emitted('moveUp')[0][0]).toBe(mockPosts.length - 1)
  })
})
