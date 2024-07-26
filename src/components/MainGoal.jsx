import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteMainGoal,
  GET_POST_MAINGOAL_IMG,
  getMainGoal,
  postMainGoal,
  postMainGoalImage,
  updateMainGoal,
} from '../redux/action/maingoals'
import { Link } from 'react-router-dom'
import ModalImg from './modals/ModalImg'

const MainGoal = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  //PAGINATION MAIN GOAL
  const [currentPage, setCurrentPage] = useState(0)
  const elementsPerPage = 10
  const orderElements = 'name'

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  //SAVE MAINGOAL
  const [mainGoal, setMainGoal] = useState({
    name: '',
  })

  const handleReset = () => {
    setMainGoal({
      name: '',
    })
  }
  const saveMainGoal = async () => {
    try {
      await dispatch(postMainGoal(mainGoal, token))
      await dispatch(getMainGoal(currentPage, elementsPerPage, orderElements))
      await handleReset()
    } catch (error) {
      console.log('Errore nel salvataggio', error)
    }
  }

  //GET MAINGOAL
  const maingoalData = useSelector((state) => state.mainGoal.list)
  useEffect(() => {
    dispatch(getMainGoal(currentPage, elementsPerPage, orderElements))
  }, [dispatch, currentPage, elementsPerPage, orderElements])

  //UPDATE MAINGOAL
  const [updtMainGoal, setUpdtMainGoal] = useState(null)
  const [idMainGoal, setIdMainGoal] = useState('')

  const handlePencilUpdate = (maingoal) => {
    console.log('Matita cliccata')
    setUpdtMainGoal(maingoal)
    setIdMainGoal(maingoal.id)
    setMainGoal({
      name: maingoal.name,
    })
    console.log('maingoal: ', maingoal)
  }

  const handleUpdate = async () => {
    try {
      await dispatch(updateMainGoal(idMainGoal, mainGoal, token))
      await dispatch(getMainGoal(currentPage, elementsPerPage, orderElements))
      await handleReset()
    } catch (error) {
      console.log('Errore nella modifica', error)
    }
  }

  //DELETE MAINGOAL
  const handleDelete = async (maingoal) => {
    try {
      await dispatch(deleteMainGoal(maingoal.id, token))
      await dispatch(getMainGoal(currentPage, elementsPerPage, orderElements))
    } catch (error) {
      console.log("Errore nell'eliminazione", error)
    }
  }

  //IMG MODAL
  const [showMainGoalImgModal, setShowMainGoalImgModal] = useState(false)
  const [selectedMainGoal, setSelectedMainGoal] = useState(null)

  const showMainGoalModal = (idMainGoal) => {
    setSelectedMainGoal(idMainGoal)
    setShowMainGoalImgModal(true)
  }

  const [formImgMainGoal, setFormImgMainGoal] = useState(null)
  const handleUploadImageMainGoal = async (id) => {
    try {
      console.log('cliccato')
      if (formImgMainGoal) {
        console.log('entra nell if')
        const id_element = id ? id.toString() : null
        console.log('id_element', id_element)
        if (id_element) {
          const response = await postMainGoalImage(
            id_element,
            formImgMainGoal,
            token
          )
          if (response !== null) {
            console.log('Immagine caricata correttamente', response)

            dispatch({
              type: GET_POST_MAINGOAL_IMG,
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

  const handleSaveImgMainGoal = async (id) => {
    await handleUploadImageMainGoal(id)
    await dispatch(getMainGoal(currentPage, elementsPerPage, orderElements))
    setShowMainGoalImgModal(false)
  }

  return (
    <div>
      <h2 className="mt-5 text-2xl font-bold">Gestione Obiettivi</h2>
      <div className="container my-6 w-full flex flex-col">
        {/* CREA MAINGOAL */}
        <div className="flex justify-center">
          <form className="w-full  text-white">
            <div className=" p-7 h-auto">
              <h2 className="font-semibold leading-7 text-lg">
                Crea un Obiettivo
              </h2>
              <div className="flex items-center">
                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-left"
                    >
                      Nome *
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        required
                        name="name"
                        id="name"
                        autoComplete="name"
                        className="block w-96 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={mainGoal.name}
                        onChange={(e) => {
                          setMainGoal({
                            ...mainGoal,
                            name: e.target.value,
                          })
                        }}
                      />
                    </div>
                  </div>{' '}
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
                    onClick={saveMainGoal}
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
            </div>{' '}
          </form>
        </div>
        {/* FINE MAINGOAL */}
        {/* LISTA MAINGOAL */}
        <div className="my-3">
          <p className="text-white text-lg">Lista Obiettivi</p>
          <ul
            role="list"
            className="divide-y divide-gray-100 ms-5 overflow-y-scroll px-5 h-1/4"
          >
            {maingoalData.content &&
              maingoalData.content.map((maingoal) => (
                <li
                  key={maingoal.id}
                  className="my-3 text-left px-5 py-3 flex justify-between items-center"
                >
                  <p>
                    Nome:<span className="italic"> {maingoal.name}</span>
                  </p>
                  {maingoal.image !== null ? (
                    <img
                      src={maingoal.image}
                      className="border mx-2 w-14 border-yellow-600"
                    />
                  ) : null}
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#15803d"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-8 mx-2"
                      onClick={() => showMainGoalModal(maingoal.id)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />{' '}
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#facc15"
                      className="size-8 mx-2"
                      onClick={() => {
                        handlePencilUpdate(maingoal)
                      }}
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                    </svg>{' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#dc2626"
                      className="size-8 mx-2"
                      onClick={() => {
                        handleDelete(maingoal)
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
                      />{' '}
                    </svg>
                    <Link to={`/reserved/goals/${maingoal.id}`}>
                      <button className="ms-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Gestisci
                      </button>
                    </Link>
                  </div>
                  {showMainGoalImgModal && selectedMainGoal && (
                    <ModalImg
                      setShowImgModal={setShowMainGoalImgModal}
                      elementId={selectedMainGoal}
                      handleSave={handleSaveImgMainGoal}
                      setFormImg={setFormImgMainGoal}
                    />
                  )}
                </li>
              ))}
          </ul>
          <div className="flex justify-center mt-4 text-white">
            {maingoalData && (
              <div className="justify-content-center custom-page">
                {[...Array(maingoalData.totalPages).keys()].map((number) => (
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
        </div>
        {/* FINE LISTA MAINGOAL */}
      </div>
    </div>
  )
}

export default MainGoal
