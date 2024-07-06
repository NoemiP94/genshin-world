import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postBlogpost } from '../redux/action/blogposts'

const Blogpost = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  //SAVE BLOGPOST
  const [blogpost, setBlogpost] = useState({
    title: '',
    content: '',
  })

  const saveBlogpost = async () => {
    try {
      await dispatch(postBlogpost(blogpost, token))
      // await dispatch(getBlogpost())
    } catch (error) {
      console.log('Errore nel salvataggio', error)
    }
  }

  return (
    <div>
      <h2 className="mt-5 text-2xl font-bold">Gestione Blog</h2>
      <div className="container my-6  w-full flex h-1/2">
        {/* INIZIO CREA BLOG */}
        <div className="w-2/4 flex justify-center">
          <form className="w-full  text-white">
            <div className=" p-7 h-auto">
              <h2 className="font-semibold leading-7 text-lg">
                Crea una Articolo
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Titolo
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="title"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      //   value={blogpost.title}
                      onChange={(e) => {
                        setBlogpost({
                          ...blogpost,
                          title: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full pt-5">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-left"
                >
                  Contenuto
                </label>
                <div className="mt-2">
                  <textarea
                    id="content"
                    name="content"
                    rows={5}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 "
                    // value={blogpost.content}
                    onChange={(e) => {
                      setBlogpost({
                        ...blogpost,
                        content: e.target.value,
                      })
                    }}
                  />
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="reset"
                  className="text-sm font-semibold bg-purple-400 px-3 py-2 rounded-md"
                >
                  Svuota
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={(e) => {
                    e.preventDefault()
                    saveBlogpost()
                  }}
                >
                  Salva
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  //   onClick={(e) => {
                  //     e.preventDefault()
                  //     handleUpdate()
                  //   }}
                >
                  Salva modifiche
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* FINE CREA BLOG */}
      </div>
    </div>
  )
}

export default Blogpost
