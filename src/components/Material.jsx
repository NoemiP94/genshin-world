import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteMaterial,
  getMaterial,
  postMaterial,
  updateMaterial,
} from '../redux/action/materials'
import ModalMaterialImg from './ModalMaterialImg'

const Material = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const [material, setMaterial] = useState({
    name: '',
    description: '',
    materialType: '',
  })

  const materialData = useSelector((state) => state.material.list)
  useEffect(() => {
    dispatch(getMaterial())
  }, [dispatch])

  //SAVE MATERIAL
  const saveMaterial = async () => {
    try {
      await dispatch(postMaterial(material, token))
    } catch (error) {
      console.log('Errore nel salvataggio', error)
    }
  }

  //IMG MODAL
  const [showImgModal, setShowImgModal] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState(null)

  const showModalImg = (idMaterial) => {
    console.log('Id materiale ricevuto :', idMaterial)
    setSelectedMaterial(idMaterial)
    setShowImgModal(true)

    console.log('Materiale cliccato')
    console.log('Materiale selezionato', selectedMaterial)
  }

  //DELETE MATERIAL
  const handleDelete = async (material) => {
    try {
      await dispatch(deleteMaterial(material.id, token))
      dispatch(getMaterial())
      console.log('Materiale eliminato con successo!')
    } catch (error) {
      console.log("Errore nell'eliminazione", error)
    }
  }

  //UPDATE MATERIAL
  const [updtMaterial, setUpdtMaterial] = useState(null)
  const [idMaterial, setIdMaterial] = useState('')

  const handlePencilUpdate = (material) => {
    setUpdtMaterial(material)
    setIdMaterial(material.id)
    setMaterial({
      name: material.name,
      description: material.description,
      materialType: material.materialType,
    })
    console.log('materiale passato: ', material)
    console.log('id materiale selezionato: ', material.id)
    console.log('matita cliccata')
  }

  const handleUpdate = async () => {
    try {
      await dispatch(updateMaterial(idMaterial, material, token))
      dispatch(getMaterial())
      console.log('Modificato con successo')
    } catch (error) {
      console.log('Errore nella modifica', error)
    }
  }

  return (
    <div className="h-screen">
      <h2 className="mt-5 text-2xl font-bold">Gestione Materiali</h2>
      <div className="container my-6 w-full flex">
        {/* CREA MATERIAL */}
        <div className="w-2/4 flex justify-center">
          <form className="w-full  text-white">
            <div className=" p-7 h-auto">
              <h2 className="font-semibold leading-7 text-lg">
                Crea un Materiale
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
                      value={material.name}
                      onChange={(e) => {
                        setMaterial({
                          ...material,
                          name: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3 pt-5">
                <label
                  htmlFor="materialType"
                  className="block text-sm font-medium leading-6 text-left"
                >
                  Tipo
                </label>
                <div className="mt-2">
                  <select
                    id="materialType"
                    name="materialType"
                    autoComplete="materialType-name"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={material.materialType}
                    onChange={(e) => {
                      setMaterial({
                        ...material,
                        materialType: e.target.value,
                      })
                    }}
                  >
                    <option>Seleziona un tipo</option>
                    <option>Risorsa</option>
                    <option>CiboPozioni</option>
                    <option>Trofei</option>
                    <option>OggettiUtili</option>
                  </select>
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
                    value={material.description}
                    onChange={(e) => {
                      setMaterial({
                        ...material,
                        description: e.target.value,
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
                    saveMaterial()
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

        {/* FINE CREAZIONE MATERIAL */}
        {/* INIZIO LISTA MATERIAL */}
        <div className="w-2/4">
          <p className="text-white text-lg">Lista Materiali</p>
          <ul
            role="list"
            className="divide-y divide-gray-100 ms-5 overflow-y-scroll px-5 h-2/3"
          >
            {materialData.content &&
              materialData.content.map((material) => (
                <li key={material.id} className="my-3 text-left px-5 py-3 ">
                  <div className="flex justify-between">
                    <div className="w-3/4 ">
                      <p>
                        - Nome: <span className="italic">{material.name}</span>
                      </p>
                      <p>
                        - Descrizione:{' '}
                        <span className="italic">{material.description}</span>
                      </p>
                      <p className=" overflow-x-scroll ">
                        - Link img:{' '}
                        <span className="italic">{material.image}</span>
                      </p>
                    </div>
                    <div className="w-1/4 mt-4 mx-4 flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#15803d"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-8 mx-2"
                        onClick={() => showModalImg(material.id)}
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
                          handlePencilUpdate(material)
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
                          handleDelete(material)
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
                  {showImgModal && selectedMaterial && (
                    <ModalMaterialImg
                      showImgModal={showImgModal}
                      setShowImgModal={setShowImgModal}
                      materialId={selectedMaterial}
                    />
                  )}
                </li>
              ))}
          </ul>
        </div>
        {/* FINE LISTA LUOGHI */}
      </div>
    </div>
  )
}

export default Material
