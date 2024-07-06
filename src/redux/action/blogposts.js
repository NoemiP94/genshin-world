export const POST_BLOG = 'POST_BLOG'
export const GET_BLOG = 'GET_BLOG'

export const postBlogpost = (blogpost, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/blogpost/create', {
        method: 'POST',
        body: JSON.stringify(blogpost),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: POST_BLOG,
          payload: data,
        })
        alert('Blogpost salvato con successo')
      } else {
        throw new Error('Salvataggio fallito!')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getBlogpost = () => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/blogpost/getall')
      console.log('res', res)
      if (res.ok) {
        const data = await res.json()
        console.log('fetch', data)
        dispatch({
          type: GET_BLOG,
          payload: data,
        })
        console.log('List loaded')
      } else {
        throw new Error('Loading of list is failed')
      }
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }
}
