export const POST_BLOG = 'POST_BLOG'
export const GET_BLOG = 'GET_BLOG'
export const GET_POST_BLOG_IMG = 'GET_POST_BLOG_IMG'
export const PUT_BLOG = 'PUT_BLOG'
export const DELETE_BLOG = 'DELETE_BLOG'
export const SINGLE_BLOG = 'SINGLE_BLOG'

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

export const getBlogpost = (page, size, orderBy) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:3001/blogpost/getall?page=${page}&size=${size}&orderBy=${orderBy}`
      )
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

export const postBlogpostImage = async (id_blogpost, formImg, token) => {
  try {
    const res = await fetch(
      `http://localhost:3001/blogpost/${id_blogpost}/image`,
      {
        method: 'POST',
        body: formImg,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (res.ok) {
      alert('Immagine salvata correttamente!')
      return null
    } else {
      throw new Error('Failed to upload image')
    }
  } catch (error) {
    console.log('Error', error)
  }
}

export const getBlogpostImage = (image) => ({
  type: GET_POST_BLOG_IMG,
  payload: image,
})

export const updateBlogpost = (id, updateBlogpost, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/blogpost/' + id, {
        method: 'PUT',
        body: JSON.stringify(updateBlogpost),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data.content)
        dispatch({
          type: PUT_BLOG,
          payload: data.content,
        })
        alert('Modifica effettuata con successo!')
      } else {
        throw new Error('Errore durante la modifica')
      }
    } catch (error) {
      console.log('Error', error)
    }
  }
}

export const deleteBlogpost = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/blogpost/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        dispatch({
          type: DELETE_BLOG,
          payload: id,
        })
      } else {
        throw new Error("Errore durante l'eliminazione")
      }
    } catch (error) {
      console.log('Error', error)
    }
  }
}

export const getSingleBlogpost = (id) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3001/blogpost/detail/' + id, {
        method: 'GET',
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch({
          type: SINGLE_BLOG,
          payload: data,
        })
        console.log('Detail has been loaded correctly')
      } else {
        throw new Error('Detail load is fail')
      }
    } catch (error) {
      console.log('Error', error)
    }
  }
}
