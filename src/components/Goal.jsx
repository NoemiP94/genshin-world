import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getMainGoal, getSingleMainGoal } from '../redux/action/maingoals'
import { useEffect, useState } from 'react'
import { postGoal } from '../redux/action/goals'

const Goal = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { id } = useParams()

  const singleMainGoal = useSelector((state) => state.mainGoal.singleMainGoal)
  useEffect(() => {
    dispatch(getSingleMainGoal(id))
  }, [dispatch, id])

  //SAVE GOAL
  const [goal, setGoal] = useState({
    name: '',
    description: '',
    mainGoal_id: id,
  })

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await dispatch(postGoal(goal, token))
      await dispatch(getMainGoal())
      // await dispatch(getGoal())
    } catch (error) {
      console.log('Errore creazione place: ', error)
    }
  }

  return (
    <div>
      <h2 className="mt-5 text-2xl font-bold">
        Gestione singoli obiettivi per:
        {singleMainGoal.name}
      </h2>
      <div>
        {/* CREA GOAL */}
        <div className="w-2/4 flex justify-center">
          <form className="w-full text-white">
            <div className=" p-7 h-auto">
              <h6 className="font-semibold leading-7 text-sm">Crea/Modifica</h6>
              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-left"
                  >
                    Nome
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      //   value={constellation.name}
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
                    Descrizione
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={5}
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 "
                      //value={character.description}
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
                    //   onClick={(e) => {
                    //     e.preventDefault()
                    //     handleUpdate()
                    //   }}
                  >
                    Salva modifiche
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* FINE CREA GOAL */}
        <div>lista singoli goal del mainGoal</div>
      </div>
    </div>
  )
}

export default Goal
