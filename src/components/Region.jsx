import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteRegion,
  GET_POST_REGION_IMG,
  getRegion,
  postRegion,
  postRegionImage,
  updateRegion,
} from '../redux/action/regions'
import { Menu, MenuButton, MenuItem, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import {
  deletePlace,
  GET_POST_PLACE_IMG,
  getPlace,
  postImage,
} from '../redux/action/places'
import Place from './Place'
import ModalImg from './modals/ModalImg'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Region = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  //PAGINATION REGION
  const [currentPage, setCurrentPage] = useState(0)
  const elementsPerPage = 2
  const orderElements = 'name'

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  //PAGINATION PLACE
  const [currentPagePlace, setCurrentPagePlace] = useState(0)
  const elementsPerPagePlace = 3
  const orderElementsPlace = 'name'

  const handlePageChangePlace = (pageNumber) => {
    setCurrentPagePlace(pageNumber)
  }

  //GET PLACE
  const placeData = useSelector((state) => state.place.list)
  useEffect(() => {
    dispatch(
      getPlace(currentPagePlace, elementsPerPagePlace, orderElementsPlace)
    )
  }, [dispatch, currentPagePlace, elementsPerPagePlace, orderElementsPlace])

  const [region, setRegion] = useState({
    name: '',
    vision: '',
    description: '',
    archon: '',
    ideal: '',
    capital: '',
    festival: '',
  })

  const handleReset = () => {
    setRegion({
      name: '',
      vision: '',
      description: '',
      archon: '',
      ideal: '',
      capital: '',
      festival: '',
    })
  }

  useEffect(() => {
    dispatch(getRegion(currentPage, elementsPerPage, orderElements))
  }, [dispatch, currentPage, elementsPerPage, orderElements])

  const data = useSelector((state) => state.region.list)
  const [updtRegion, setUpdtRegion] = useState(null)
  const [idRegion, setIdRegion] = useState('')

  const handlePencilUpdate = (region) => {
    setUpdtRegion(region)
    setIdRegion(region.id)
    setRegion({
      name: region.name,
      vision: region.vision,
      description: region.description,
      archon: region.archon,
      ideal: region.ideal,
      capital: region.capital,
      festival: region.festival,
    })
    console.log('regione passata', region)
    console.log('id regione selezionato', region.id)
    console.log('Matita cliccata')
  }

  //CREATE REGION
  const saveRegion = async () => {
    try {
      await dispatch(postRegion(region, token))
      await dispatch(getRegion(currentPage, elementsPerPage, orderElements))
      await handleReset()
    } catch (error) {
      console.log('Errore nel salvataggio', error)
    }
  }

  //UPDATE REGION

  const handleUpdate = async () => {
    try {
      await dispatch(updateRegion(idRegion, region, token))
      await dispatch(getRegion(currentPage, elementsPerPage, orderElements))
      await handleReset()
      console.log('Modificato con successo!')
    } catch (error) {
      console.log('Errore nella modifica', error)
    }
  }

  //DELETE REGION

  const handleDelete = async (region) => {
    try {
      await dispatch(deleteRegion(region.id, token))
      dispatch(getRegion(currentPage, elementsPerPage, orderElements))
      console.log('Eliminato con successo')
    } catch (error) {
      console.log("Errore nell'eliminazione", error)
    }
  }

  //DELETE PLACE
  const handleDeletePlace = async (placeId) => {
    console.log('place id delete', placeId)
    try {
      await dispatch(deletePlace(placeId, token))
      await dispatch(
        getPlace(currentPagePlace, elementsPerPagePlace, orderElementsPlace)
      )
      await dispatch(getRegion(currentPage, elementsPerPage, orderElements))
      console.log('Eliminato con successo!')
    } catch (error) {
      console.log("Errore nell'eliminazione", error)
    }
  }

  //IMG MODAL REGION
  const [showRegionImgModal, setShowRegionImgModal] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState(null)

  const showRegionModal = (idRegion) => {
    setSelectedRegion(idRegion)
    setShowRegionImgModal(true)
  }

  const [formImgRegion, setFormImgRegion] = useState(null)
  const handleUploadImageRegion = async (id) => {
    try {
      console.log('cliccato')
      if (formImgRegion) {
        console.log('entra nell if')
        const id_element = id ? id.toString() : null
        console.log('id_element', id_element)
        if (id_element) {
          const response = await postRegionImage(
            id_element,
            formImgRegion,
            token
          )
          if (response !== null) {
            console.log('Immagine caricata correttamente', response)

            dispatch({
              type: GET_POST_REGION_IMG,
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

  const handleSaveImgRegion = async (id) => {
    await handleUploadImageRegion(id)
    await dispatch(getRegion(currentPage, elementsPerPage, orderElements))
    setShowRegionImgModal(false)
  }

  //IMG MODAL PLACE
  const [showImgModal, setShowImgModal] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState(null)

  const showModalImg = (idPlace) => {
    console.log('Id place ricevuto :', idPlace)
    setSelectedPlace(idPlace)
    setShowImgModal(true)

    console.log('Luogo cliccato')
    console.log('Luogo selezionato', selectedPlace)
  }

  const [formImgPlace, setFormImgPlace] = useState(null)
  const handleUploadImagePlace = async (id) => {
    try {
      console.log('cliccato')
      if (formImgPlace) {
        console.log('entra nell if')
        const id_element = id ? id.toString() : null
        console.log('id_element', id_element)
        if (id_element) {
          const response = await postImage(id_element, formImgPlace, token)
          if (response !== null) {
            console.log('Immagine caricata correttamente', response)

            dispatch({
              type: GET_POST_PLACE_IMG,
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

  const handleSaveImgPlace = async (id) => {
    await handleUploadImagePlace(id)
    await dispatch(
      getPlace(currentPagePlace, elementsPerPagePlace, orderElementsPlace)
    )
    await dispatch(getRegion(currentPage, elementsPerPage, orderElements))
    setShowImgModal(false)
  }

  return (
    <div className="container">
      <h2 className="mt-5 text-2xl font-bold">Gestione Regioni di Teyvat</h2>
      <div className="container mt-4 w-full flex flex-col">
        {/* INIZIO CREA REGIONE */}
        <div className="flex justify-center">
          <form className="w-full  text-white">
            <div className=" p-7 h-auto">
              <h2 className="font-semibold leading-7 text-lg">
                Crea una Regione
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                      name="name"
                      id="name"
                      autoComplete="name"
                      required
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={region.name}
                      onChange={(e) => {
                        setRegion({
                          ...region,
                          name: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3 pt-5">
                <label
                  htmlFor="vision"
                  className="block text-sm font-medium leading-6 text-left"
                >
                  Visione
                </label>
                <div className="mt-2">
                  <select
                    id="vision"
                    name="vision"
                    autoComplete="vision-name"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={region.vision}
                    onChange={(e) => {
                      setRegion({
                        ...region,
                        vision: e.target.value,
                      })
                    }}
                  >
                    <option>Seleziona una visione</option>
                    <option>Anemo</option>
                    <option>Geo</option>
                    <option>Electro</option>
                    <option>Dendro</option>
                    <option>Hydro</option>
                    <option>Pyro</option>
                    <option>Cryo</option>
                  </select>
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
                    name="about"
                    rows={5}
                    required
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 "
                    value={region.description}
                    onChange={(e) => {
                      setRegion({
                        ...region,
                        description: e.target.value,
                      })
                    }}
                  />
                </div>
              </div>

              <div className="sm:col-span-3 pt-5">
                <label
                  htmlFor="archon"
                  className="block text-sm font-medium text-left"
                >
                  Archon
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="archon"
                    id="archon"
                    autoComplete="archon"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 "
                    value={region.archon}
                    onChange={(e) => {
                      setRegion({
                        ...region,
                        archon: e.target.value,
                      })
                    }}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="ideal"
                  className="block text-sm font-medium leading-6 text-left"
                >
                  Ideale
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="ideal"
                    id="ideal"
                    autoComplete="ideal"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={region.ideal}
                    onChange={(e) => {
                      setRegion({
                        ...region,
                        ideal: e.target.value,
                      })
                    }}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="capital"
                  className="block text-sm font-medium leading-6 text-left"
                >
                  Capitale
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="capital"
                    id="capital"
                    autoComplete="capital"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={region.capital}
                    onChange={(e) => {
                      setRegion({
                        ...region,
                        capital: e.target.value,
                      })
                    }}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="festival"
                  className="block text-sm font-medium leading-6 text-left"
                >
                  Festival
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="festival"
                    id="festival"
                    autoComplete="festival"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={region.festival}
                    onChange={(e) => {
                      setRegion({
                        ...region,
                        festival: e.target.value,
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
                    saveRegion()
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
        {/* FINE CREA REGIONE */}
        {/* INIZIO LISTA REGIONI */}
        <div className="flex">
          <div className="w-1/2">
            <p className="text-white text-lg">Lista regioni</p>
            <ul
              role="list"
              className="divide-y divide-gray-100 ms-5 px-5 overflow-y-scroll h-3/4"
            >
              {data.content &&
                data.content.map((region) => (
                  <li key={region.id} className="my-3 text-left px-5">
                    <div className="flex justify-between	">
                      <div>
                        <p className="pt-2">
                          Nome: <span className="italic">{region.name}</span>
                        </p>
                        <p className="overflow-y-scroll h-20">
                          Descrizione:{' '}
                          <span className="italic">{region.description}</span>
                        </p>
                        <p className="py-2">
                          Tipo di visione:{' '}
                          <span className="italic">{region.visionType}</span>
                        </p>
                        {region.ideal !== null ? (
                          <p className="pt-2">
                            Ideale:{' '}
                            <span className="italic">{region.ideal}</span>
                          </p>
                        ) : null}
                        {region.capital !== null ? (
                          <p className="pt-2">
                            Capitale:{' '}
                            <span className="italic">{region.capital}</span>
                          </p>
                        ) : null}
                        {region.festival !== null ? (
                          <p className="pt-2">
                            Festival:{' '}
                            <span className="italic">{region.festival}</span>
                          </p>
                        ) : null}

                        <div className="my-2">
                          <Menu
                            as="div"
                            className="relative inline-block text-left"
                          >
                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                              Lista località
                              <ChevronDownIcon
                                className="-mr-1 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                                onClick={() =>
                                  console.log('cliccato', region.name)
                                }
                              />
                            </MenuButton>
                            {region.placeList && region.placeList.length > 0
                              ? region.placeList.map((place) => (
                                  <Transition
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                    key={place.id}
                                  >
                                    <MenuItem className="flex">
                                      <a className="italic py-2">
                                        <div className="flex justify-between">
                                          <div className="pe-5">
                                            {place.name}
                                          </div>
                                          <div className="flex">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="#15803d"
                                              viewBox="0 0 24 24"
                                              strokeWidth={1.5}
                                              stroke="currentColor"
                                              className="size-8 mx-2"
                                              onClick={() =>
                                                showModalImg(place.id)
                                              }
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
                                              fill="#dc2626"
                                              className="size-6 me-1"
                                              onClick={() =>
                                                handleDeletePlace(place.id)
                                              }
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
                                    </MenuItem>
                                  </Transition>
                                ))
                              : null}
                          </Menu>
                        </div>
                        <div className="my-2">
                          <Menu
                            as="div"
                            className="relative inline-block text-left"
                          >
                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                              Lista domini
                              <ChevronDownIcon
                                className="-mr-1 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                                onClick={() =>
                                  console.log('cliccato', region.name)
                                }
                              />
                            </MenuButton>
                            {region.domainList && region.domainList.length > 0
                              ? region.domainList.map((domain) => (
                                  <Transition
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                    key={domain.id}
                                  >
                                    <MenuItem className="flex">
                                      <a className="italic py-2">
                                        <div className="flex">
                                          <div className="pe-5">
                                            {domain.name}
                                          </div>
                                        </div>
                                      </a>
                                    </MenuItem>
                                  </Transition>
                                ))
                              : null}
                          </Menu>
                        </div>
                      </div>
                      <div className="m-2 ">
                        <div className="flex flex-col my-1 items-center">
                          <div className="flex mb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#15803d"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-8 mx-2"
                              onClick={() => showRegionModal(region.id)}
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
                              className="size-6 me-1"
                              onClick={() => handlePencilUpdate(region)}
                            >
                              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="#dc2626"
                              className="size-6 me-1"
                              onClick={() => {
                                handleDelete(region)
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
                            {region.image !== null ? (
                              <img
                                src={region.image}
                                className="border mx-2 w-14 border-yellow-600"
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    {showRegionImgModal && selectedRegion && (
                      <ModalImg
                        setShowImgModal={setShowRegionImgModal}
                        elementId={selectedRegion}
                        handleSave={handleSaveImgRegion}
                        setFormImg={setFormImgRegion}
                      />
                    )}
                    {showImgModal && selectedPlace && (
                      <ModalImg
                        setShowImgModal={setShowImgModal}
                        elementId={selectedPlace}
                        handleSave={handleSaveImgPlace}
                        setFormImg={setFormImgPlace}
                      />
                    )}
                  </li>
                ))}
            </ul>
            <div className="flex justify-center mt-4 text-white">
              {data && (
                <div className="justify-content-center custom-page">
                  {[...Array(data.totalPages).keys()].map((number) => (
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
          <div className="container w-1/2">
            <Place
              currentPage={currentPage}
              elementsPerPage={elementsPerPage}
              orderElements={orderElements}
              handlePageChangePlace={handlePageChangePlace}
              currentPagePlace={currentPagePlace}
              elementsPerPagePlace={elementsPerPagePlace}
              orderElementsPlace={orderElementsPlace}
            />
          </div>
        </div>{' '}
        {/* FINE REGION */}{' '}
      </div>{' '}
    </div>
  )
}
export default Region
