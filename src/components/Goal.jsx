import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getMainGoal, getSingleMainGoal } from '../redux/action/maingoals'
import { useEffect, useState } from 'react'
import {
  deleteGoal,
  getGoal,
  postGoal,
  updateGoal,
} from '../redux/action/goals'

const Goal = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { id } = useParams()

  //PAGINATION MAIN GOAL
  const [currentPageMainGoal, setCurrentPageMainGoal] = useState(0)
  const elementsPerPageMainGoal = 10
  const orderElementsMainGoal = 'name'

  const singleMainGoal = useSelector((state) => state.mainGoal.singleMainGoal)
  useEffect(() => {
    dispatch(getSingleMainGoal(id))
    console.log('id: ', id)
  }, [dispatch, id])

  useEffect(() => {
    dispatch(getGoal())
  }, [dispatch])

  //SAVE GOAL
  const [goal, setGoal] = useState({
    name: '',
    description: '',
    mainGoal_id: id,
  })

  const handleReset = () => {
    setGoal({
      name: '',
      description: '',
      mainGoal_id: id,
    })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await dispatch(postGoal(goal, token))
      await dispatch(
        getMainGoal(
          currentPageMainGoal,
          elementsPerPageMainGoal,
          orderElementsMainGoal
        )
      )
      await dispatch(getSingleMainGoal(singleMainGoal.id))
      await handleReset()
    } catch (error) {
      console.log('Errore creazione place: ', error)
    }
  }

  //UPDATE GOAL
  const [updtGoal, setUpdtGoal] = useState(null)
  const [idGoal, setIdGoal] = useState('')

  const handlePencilUpdate = (goal) => {
    setUpdtGoal(goal)
    setIdGoal(goal.id)
    setGoal({
      name: goal.name,
      description: goal.description,
      id: goal.id,
      mainGoal_id: id,
    })
    console.log('Matita cliccata')
  }

  const handleUpdate = async () => {
    try {
      await dispatch(updateGoal(idGoal, goal, token))
      await dispatch(
        getMainGoal(
          currentPageMainGoal,
          elementsPerPageMainGoal,
          orderElementsMainGoal
        )
      )
      await dispatch(getSingleMainGoal(singleMainGoal.id))
      await handleReset()
    } catch (error) {
      console.log('Errore nella modifica', error)
    }
  }

  //DELETE GOAL
  const handleDelete = async (goalId) => {
    console.log('goal id delete', goalId)
    try {
      await dispatch(deleteGoal(goalId, token))
      await dispatch(
        getMainGoal(
          currentPageMainGoal,
          elementsPerPageMainGoal,
          orderElementsMainGoal
        )
      )
      await dispatch(getSingleMainGoal(singleMainGoal.id))

      console.log('Eliminato con successo!')
    } catch (error) {
      console.log("Errore nell'eliminazione", error)
    }
  }

  return (
    <div>
      {singleMainGoal && (
        <>
          <h2 className="mt-5 text-2xl font-bold">
            Gestione singoli obiettivi per:
            <span> {singleMainGoal.name}</span>
          </h2>
          <div>
            {/* CREA GOAL */}
            <div className="w-2/4 flex justify-center">
              <form className="w-full text-white">
                <div className=" p-7 h-auto">
                  <h6 className="font-semibold leading-7 text-sm">
                    Crea/Modifica
                  </h6>
                  <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={goal.name}
                          onChange={(e) => {
                            setGoal({
                              ...goal,
                              name: e.target.value,
                            })
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-span-full pt-5">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-left"
                      >
                        Descrizione *
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="about"
                          required
                          name="about"
                          rows={5}
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 "
                          value={goal.description}
                          onChange={(e) => {
                            setGoal({
                              ...goal,
                              description: e.target.value,
                            })
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex items-center  gap-x-6">
                      <button
                        type="reset"
                        className="text-sm font-semibold bg-purple-400 px-3 py-2 rounded-md"
                        onClick={handleReset}
                      >
                        Svuota
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
                        onClick={handleSave}
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
                </div>
              </form>
            </div>
            {/* FINE CREA GOAL */}
            {/* INIZIO LISTA GOAL */}
            <div>
              <p className="text-white text-lg">Lista Goal</p>
              <ul
                role="list"
                className="divide-y divide-gray-100 ms-5 overflow-y-scroll px-5 h-2/3"
              >
                {singleMainGoal.goalList.length > 0
                  ? singleMainGoal.goalList.map((goal) => (
                      <a className="italic py-2" key={goal.id}>
                        <div className="flex  p-2  justify-between">
                          <div className="flex flex-col items-start">
                            <div className="pe-5 ps-5 text-sm">
                              - Nome: {goal.name}
                            </div>
                            <div className="pe-5 ps-5 text-sm text-start">
                              - Descrizione: {goal.description}
                            </div>
                          </div>
                          <div className="w-1/4 mt-4 mx-4 flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="#facc15"
                              className="size-4 mx-2"
                              onClick={() => {
                                handlePencilUpdate(goal, id)
                              }}
                            >
                              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="#dc2626"
                              className="size-4 mx-2"
                              onClick={() => {
                                handleDelete(goal.id)
                              }}
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </a>
                    ))
                  : null}
              </ul>
            </div>
            {/* FINE LISTA GOAL */}
            <Link
              to={`/reserved/goals`}
              className="text-light text-decoration-none"
            >
              <button className="ms-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-5">
                Indietro
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Goal
