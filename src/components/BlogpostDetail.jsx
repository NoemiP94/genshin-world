import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {
  GET_POST_BLOG_IMG,
  getSingleBlogpost,
  postBlogpostImage,
} from '../redux/action/blogposts'
import ModalImg from './modals/ModalImg'

const BlogpostDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  //GET SINGLE BLOGPOST
  const singleBlogpost = useSelector((state) => state.blogpost.singleBlogpost)
  useEffect(() => {
    dispatch(getSingleBlogpost(id))
  }, [dispatch, id])

  //MODAL IMG
  const [showBlogImgModal, setShowBlogImgModal] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState(null)

  const showImgBlogModal = (idBlog) => {
    console.log('Id blog ricevuto: ', idBlog)
    setSelectedBlog(idBlog)
    setShowBlogImgModal(true)
  }

  const [formImgBlog, setFormImgBlog] = useState(null)
  const handleUploadImage = async (id) => {
    try {
      console.log('cliccato')
      if (formImgBlog) {
        console.log('entra nell if')
        const id_element = id ? id.toString() : null
        console.log('id_element', id_element)
        if (id_element) {
          const response = await postBlogpostImage(
            id_element,
            formImgBlog,
            token
          )
          if (response !== null) {
            console.log('Immagine caricata correttamente', response)

            dispatch({
              type: GET_POST_BLOG_IMG,
              payload: response.url,
            })
            alert('Immagine caricata correttamente!')
          } else {
            console.log('Image upload successful, but no URL returned')
          }
        }
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

  const handleSaveImgBlog = async (id) => {
    await handleUploadImage(id)
    await dispatch(getSingleBlogpost(id))
    setShowBlogImgModal(false)
  }

  return (
    <div className="mx-4">
      {singleBlogpost && (
        <div>
          <h2 className="my-5 text-2xl font-bold">{singleBlogpost.title}</h2>
          <div className="my-3 mx-24 text-start ">
            <p>{singleBlogpost.content}</p>
          </div>
          <div className="flex flex-col items-center my-5">
            <p>Gestione immagine: </p>

            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#15803d"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 mx-2 my-2"
                onClick={() => showImgBlogModal(singleBlogpost.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
            <div>
              {singleBlogpost.image !== null ? (
                <img
                  src={singleBlogpost.image}
                  alt={singleBlogpost.title}
                  className="border mx-2 w-14 border-yellow-600"
                />
              ) : null}
            </div>
          </div>{' '}
          {showBlogImgModal && selectedBlog && (
            <ModalImg
              setShowImgModal={setShowBlogImgModal}
              elementId={selectedBlog}
              handleSave={handleSaveImgBlog}
              setFormImg={setFormImgBlog}
            />
          )}
          <div className="flex ms-10 mb-5">
            <Link
              to={`/reserved/blog`}
              className="text-light text-decoration-none"
            >
              <button className="ms-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-5">
                Indietro
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogpostDetail
