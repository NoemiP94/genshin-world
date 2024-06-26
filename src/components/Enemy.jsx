import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteEnemy,
  getEnemy,
  postEnemy,
  removeMaterial,
  updateEnemy,
} from '../redux/action/enemies'
import ModalEnemyImg from './modals/ModalEnemyImg'
import ModalMaterialEnemy from './modals/ModalMaterialEnemy'

const Enemy = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  //SAVE ENEMY
  const [enemy, setEnemy] = useState({
    name: '',
    description: '',
    codeName: '',
    place: '',
  })

  const saveEnemy = async () => {
    try {
      await dispatch(postEnemy(enemy, token))
      //   await dispatch(getEnemy())
    } catch (error) {
      console.log('Errore nel salvataggio', error)
    }
  }

  //GET ENEMY
  const enemyData = useSelector((state) => state.enemy.list)
  useEffect(() => {
    console.log(enemyData)
    dispatch(getEnemy())
  }, [dispatch])

  //IMG MODAL
  const [showEnemyImgModal, setShowEnemyImgModal] = useState(false)
  const [selectedEnemy, setSelectedEnemy] = useState(null)

  const showEnemyModal = (idEnemy) => {
    setSelectedEnemy(idEnemy)
    setShowEnemyImgModal(true)
  }

  //UPDATE ENEMY
  const [updtEnemy, setUpdtEnemy] = useState(null)
  const [idEnemy, setIdEnemy] = useState('')

  const handlePencilUpdate = (enemy) => {
    setUpdtEnemy(enemy)
    setIdEnemy(enemy.id)
    setEnemy({
      name: enemy.name,
      description: enemy.description,
      codeName: enemy.codeName,
      place: enemy.place,
    })
    console.log('nemico passato: ', enemy)
    console.log('id nemico selezionato: ', enemy.id)
    console.log('matita cliccata')
  }

  const handleUpdate = async () => {
    try {
      await dispatch(updateEnemy(idEnemy, enemy, token))
      dispatch(getEnemy())
      console.log('Modificato con successo')
    } catch (error) {
      console.log('Errore nella modifica', error)
    }
  }

  //DELETE ENEMY
  const handleDelete = async (enemy) => {
    try {
      await dispatch(deleteEnemy(enemy.id, token))
      dispatch(getEnemy())
      console.log('Nemico eliminata con successo!')
    } catch (error) {
      console.log("Errore nell'eliminazione", error)
    }
  }

  //GET MATERIALS
  const [showMaterialEnemyModal, setShowMaterialEnemyModal] = useState(false)
  const [selectedEnemyMaterial, setSelectedEnemyMaterial] = useState(null)

  const handlePlusButton = (idEnemy) => {
    console.log('idEnemy ricevuto: ', idEnemy)
    setSelectedEnemyMaterial(idEnemy)
    setShowMaterialEnemyModal(true)
    console.log('nemico selezionato: ', selectedEnemyMaterial)
  }

  //REMOVE MATERIAL
  const handleRemoveMaterial = async (idEnemy, idMaterial) => {
    try {
      await dispatch(removeMaterial(idEnemy, idMaterial, token))
      await dispatch(getEnemy())
    } catch (error) {
      console.log("Errore nell'eliminazione", error)
    }
  }

  return (
    <div className="h-screen">
      <h2 className="mt-5 text-2xl font-bold">Gestione Nemici</h2>
      <div className="container my-6 w-full flex">
        {/* CREA ENEMY */}
        <div className="w-2/4 flex justify-center">
          <form className="w-full  text-white">
            <div className=" p-7 h-auto">
              <h2 className="font-semibold leading-7 text-lg">
                Crea un Nemico
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                      value={enemy.name}
                      onChange={(e) => {
                        setEnemy({
                          ...enemy,
                          name: e.target.value,
                        })
                      }}
                    />
                  </div>
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
                    rows={4}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 "
                    value={enemy.description}
                    onChange={(e) => {
                      setEnemy({
                        ...enemy,
                        description: e.target.value,
                      })
                    }}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="codename"
                  className="block text-sm font-medium leading-6 text-left"
                >
                  Nome in codice
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="codename"
                    id="codename"
                    autoComplete="codename"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={enemy.codeName}
                    onChange={(e) => {
                      setEnemy({
                        ...enemy,
                        codeName: e.target.value,
                      })
                    }}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="place"
                  className="block text-sm font-medium leading-6 text-left"
                >
                  Luogo
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="place"
                    id="place"
                    autoComplete="place"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={enemy.place}
                    onChange={(e) => {
                      setEnemy({
                        ...enemy,
                        place: e.target.value,
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
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
                  onClick={(e) => {
                    e.preventDefault()
                    saveEnemy()
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
        {/* FINE CREAZIONE ENEMY */}
        {/* INIZIO LISTA ENEMY */}
        <div className="w-2/4">
          <p className="text-white text-lg">Lista Nemici</p>
          <ul
            role="list"
            className="divide-y divide-gray-100 ms-5 overflow-y-scroll px-5 h-2/3"
          >
            {enemyData.content &&
              enemyData.content.map((enemy) => (
                <li key={enemy.id} className="my-3 text-left px-5 py-3">
                  <div className="flex justify-between">
                    <div className="w-3/4 ">
                      <p>
                        - Nome: <span className="italic">{enemy.name}</span>
                      </p>
                      <p className=" overflow-y-scroll h-14 pt-2">
                        - Descrizione:{' '}
                        <span className="italic">{enemy.description}</span>
                      </p>
                      {enemy.codeName !== '' ? (
                        <p className=" overflow-y-scroll h-14 pt-2">
                          - Nome in codice:{' '}
                          <span className="italic"> {enemy.codeName} </span>
                        </p>
                      ) : null}
                      {enemy.place !== '' ? (
                        <p className="pt-2">
                          - Luogo:{' '}
                          <span className="italic"> {enemy.place} </span>
                        </p>
                      ) : null}

                      <div className="mt-2">
                        <div className="flex">
                          <p>- Materiali necessari</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#15803d"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#15803d"
                            className="size-6 mx-2"
                            onClick={() => handlePlusButton(enemy.id)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </div>

                        <div className="flex flex-wrap overflow-y-scroll h-20 mt-2 border border-2 rounded-lg">
                          {enemy.rewards.length > 0 &&
                            enemy.rewards.map((mater) => (
                              <div
                                key={mater.id}
                                className="flex flex-col mx-4 my-2 items-center w-16"
                              >
                                {mater.image !== null ? (
                                  <img
                                    src={mater.image}
                                    className="w-14 border border-yellow-600 rounded-lg w-14 mx-auto"
                                  />
                                ) : null}
                                <p className="text-center pt-1 truncate hover:text-clip w-14">
                                  {mater.name}
                                </p>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="#dc2626"
                                  className="size-5 mx-2"
                                  onClick={() => {
                                    handleRemoveMaterial(
                                      enemy.id,
                                      mater.id,
                                      token
                                    )
                                  }}
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="w-1/4 mt-4 mx-4 flex flex-col">
                      <div className="flex mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#15803d"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-8 mx-2"
                          onClick={() => showEnemyModal(enemy.id)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#facc15"
                          className="size-8 mx-2"
                          onClick={() => {
                            handlePencilUpdate(enemy)
                          }}
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#dc2626"
                          className="size-8 mx-2"
                          onClick={() => {
                            handleDelete(enemy)
                          }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        {enemy.image !== null ? (
                          <img
                            src={enemy.image}
                            className="border border-yellow-600 rounded-lg w-20 mx-auto"
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                  {showEnemyImgModal && selectedEnemy && (
                    <ModalEnemyImg
                      showImgModal={showEnemyImgModal}
                      setShowImgModal={setShowEnemyImgModal}
                      enemyId={selectedEnemy}
                    />
                  )}
                  {showMaterialEnemyModal && selectedEnemyMaterial && (
                    <ModalMaterialEnemy
                      showModal={showMaterialEnemyModal}
                      setShowModal={setShowMaterialEnemyModal}
                      enemyId={selectedEnemyMaterial}
                      enemy={enemy}
                    />
                  )}
                </li>
              ))}
          </ul>
        </div>
        {/* FINE LISTA ENEMY */}
      </div>
    </div>
  )
}

export default Enemy
