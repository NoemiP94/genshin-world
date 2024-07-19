import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteBlogpost,
  getBlogpost,
  postBlogpost,
  updateBlogpost,
} from '../redux/action/blogposts'
//import ModalImgBlogpost from './modals/ModalImgBlogpost'
import { Link } from 'react-router-dom'

const Blogpost = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  //PAGINATION
  const [currentPage, setCurrentPage] = useState(0)
  const elementsPerPage = 10
  const orderElements = 'date'

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  //SAVE BLOGPOST
  const [blogpost, setBlogpost] = useState({
    title: '',
    content: '',
  })

  const handleReset = () => {
    setBlogpost({
      title: '',
      content: '',
    })
  }

  const saveBlogpost = async () => {
    try {
      await dispatch(postBlogpost(blogpost, token))
      await dispatch(getBlogpost(currentPage, elementsPerPage, orderElements))
      await handleReset()
    } catch (error) {
      console.log('Errore nel salvataggio', error)
    }
  }

  //GET BLOGPOST
  const blogData = useSelector((state) => state.blogpost.list)
  useEffect(() => {
    dispatch(getBlogpost(currentPage, elementsPerPage, orderElements))
  }, [dispatch, currentPage, elementsPerPage, orderElements])

  //UPDATE BLOGPOST
  const [updtBlog, setUpdtBlog] = useState(null)
  const [idBlog, setIdBlog] = useState('')

  const handlePencilUpdate = (blogpost) => {
    setUpdtBlog(blogpost)
    setIdBlog(blogpost.id)
    setBlogpost({
      title: blogpost.title,
      content: blogpost.content,
    })
    console.log('blogpost passato: ', blogpost)
    console.log('id blogpost selezionato: ', blogpost.id)
    console.log('matita cliccata')
  }

  const handleUpdate = async () => {
    try {
      await dispatch(updateBlogpost(idBlog, blogpost, token))
      await dispatch(getBlogpost(currentPage, elementsPerPage, orderElements))
      await handleReset()
      console.log('Modificato con successo')
    } catch (error) {
      console.log('Errore nella modifica', error)
    }
  }

  //DELETE BLOGPOST
  const handleDelete = async (blogpost) => {
    try {
      await dispatch(deleteBlogpost(blogpost.id, token))
      await dispatch(getBlogpost(currentPage, elementsPerPage, orderElements))
      console.log('Blogpost eliminato con successo!')
    } catch (error) {
      console.log("Errore nell'eliminazione", error)
    }
  }

  return (
    <div>
      <h2 className="mt-5 text-2xl font-bold">Gestione Blog</h2>
      <div className="container my-6  w-full flex flex-col h-1/2">
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
                    Titolo *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      required
                      name="title"
                      id="title"
                      autoComplete="title"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={blogpost.title}
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
                  Contenuto *
                </label>
                <div className="mt-2">
                  <textarea
                    id="content"
                    required
                    name="content"
                    rows={5}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 "
                    value={blogpost.content}
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
                  onClick={handleReset}
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
                  onClick={(e) => {
                    e.preventDefault()
                    handleUpdate()
                  }}
                >
                  Salva modifiche
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* FINE CREA BLOG */}
        {/* INIZIO LISTA BLOG */}
        <div>
          <p className="text-white text-lg">Lista Articoli</p>
          <ul
            role="list"
            className="divide-y divide-gray-100 ms-5 px-5 overflow-y-scroll h-3/4"
          >
            {blogData.content &&
              blogData.content.map((blog) => (
                <li key={blog.id} className="my-3 text-left px-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="pt-2">
                        Titolo: <span className="italic">{blog.title}</span>
                      </p>
                    </div>
                    <div className="m-2 ">
                      <div className="flex my-1 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#facc15"
                          className="size-6 me-5"
                          onClick={() => handlePencilUpdate(blog)}
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#dc2626"
                          className="size-6 me-1"
                          onClick={() => {
                            handleDelete(blog)
                          }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <Link to={`/reserved/blog/${blog.id}`}>
                          <button className="ms-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Gestisci
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          <div className="flex justify-center mt-4 text-white">
            {blogData && (
              <div className="justify-content-center custom-page">
                {[...Array(blogData.totalPages).keys()].map((number) => (
                  <button
                    key={number}
                    onClick={() => handlePageChange(number)}
                    className={`custom-item border p-4 ${
                      number === currentPage - 1 ? 'active' : ''
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>{' '}
        {/* FINE LISTA BLOG */}
      </div>
    </div>
  )
}

export default Blogpost
