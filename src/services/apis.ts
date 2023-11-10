import axios from 'axios'

import { type Post } from '../types'
import { apiUrl } from '../config'

export const getPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>(`${apiUrl}/posts`)
  return response?.data?.slice(0, 5)
}
