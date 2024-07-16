import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRegion } from '../redux/action/regions'
import {
  deleteDomain,
  getDomain,
  postDomain,
  removeMaterial,
  updateDomain,
} from '../redux/action/domains'
import ModalMaterialDomain from './modals/ModalMaterialDomain'

const Domain = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const regionData = useSelector((state) => state.region.list)

  //PAGINATION REGION
  const [currentPageRegion, setCurrentPageRegion] = useState(0)
  const elementsPerPageRegion = 10
  const orderElementsRegion = 'name'

  const handlePageChangeRegion = (pageNumber) => {
    setCurrentPageRegion(pageNumber)
  }
  useEffect(() => {
    dispatch(
      getRegion(currentPageRegion, elementsPerPageRegion, orderElementsRegion)
    )
  }, [dispatch, currentPageRegion, elementsPerPageRegion, orderElementsRegion])

  //PAGINATION DOMAIN
  const [currentPageDomain, setCurrentPageDomain] = useState(0)
  const elementsPerPageDomain = 5
  const orderElementsDomain = 'name'

  const handlePageChangeDomain = (pageNumber) => {
    setCurrentPageDomain(pageNumber)
  }

  //GET DOMAIN
  const domainData = useSelector((state) => state.domain.list)
  useEffect(() => {
    dispatch(
      getDomain(currentPageDomain, elementsPerPageDomain, orderElementsDomain)
    )
  }, [dispatch, currentPageDomain, elementsPerPageDomain, orderElementsDomain])

  const handleDisplayData = (data) => {
    const words = data.split('_')
    const formattedData = words
      .map((word) => word.charAt(0) + word.slice(1))
      .join(' ')
    return formattedData
  }

  //CREATE DOMAIN
  const [domain, setDomain] = useState(null)
  const handleSave = async () => {
    try {
      await dispatch(postDomain(domain, token))
      console.log(domain)
      await dispatch(
        getDomain(currentPageDomain, elementsPerPageDomain, orderElementsDomain)
      )
    } catch (error) {
      console.log('Errore creazione dominio: ', error)
    }
  }

  //UPDATE DOMAIN
  const [updtDomain, setUpdtDomain] = useState(null)
  const [idDomain, setIdDomain] = useState('')

  const handlePencilUpdate = (domain) => {
    setUpdtDomain(domain)
    setIdDomain(domain.id)
    setDomain({
      name: domain.name,
      place: domain.description,
      domainType: domain.domainType,
      regionId: domain.regionId,
    })
    console.log('dominio passato: ', domain)
    console.log('id dominio selezionato: ', domain.id)
    console.log('matita cliccata')
  }

  const handleUpdate = async () => {
    try {
      await dispatch(updateDomain(idDomain, domain, token))
      dispatch(
        getDomain(currentPageDomain, elementsPerPageDomain, orderElementsDomain)
      )
      console.log('Modificato con successo')
    } catch (error) {
      console.log('Errore nella modifica', error)
    }
  }

  //DELETE DOMAIN
  const handleDelete = async (domain) => {
    try {
      await dispatch(deleteDomain(domain.id, token))
      dispatch(
        getDomain(currentPageDomain, elementsPerPageDomain, orderElementsDomain)
      )
      console.log('Dominio eliminato con successo!')
    } catch (error) {
      console.log("Errore nell'eliminazione", error)
    }
  }

  //GET MATERIALS
  const [showMaterialModal, setShowMaterialModal] = useState(false)
  const [selected, setSelected] = useState(null)

  const handlePlusButton = (idDomain) => {
    console.log('idDomain ricevuto: ', idDomain)
    setSelected(idDomain)
    setShowMaterialModal(true)
    console.log('dominio selezionato: ', selected)
  }

  //REMOVE MATERIAL
  const handleRemoveMaterial = async (idDomain, idMaterial) => {
    try {
      await dispatch(removeMaterial(idDomain, idMaterial, token))
      await dispatch(
        getDomain(currentPageDomain, elementsPerPageDomain, orderElementsDomain)
      )
    } catch (error) {
      console.log("Errore nell'eliminazione", error)
    }
  }

  return (
    <div>
      <h2 className="mt-5 text-2xl font-bold">Gestione Domini</h2>
      <div className="container my-6 w-full flex flex-col">
        {/* CREA DOMAIN */}
        <div className="flex justify-center">
          <form className="w-full  text-white">
            <div className=" p-7 h-auto">
              <h2 className="font-semibold leading-7 text-lg">
                Crea un Dominio
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
                      //value={domain.name}
                      onChange={(e) => {
                        setDomain({
                          ...domain,
                          name: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                      //value={domain.place}
                      onChange={(e) => {
                        setDomain({
                          ...domain,
                          place: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3 pt-5">
                <label
                  htmlFor="domainType"
                  className="block text-sm font-medium leading-6 text-left"
                >
                  Tipo Dominio
                </label>
                <div className="mt-2">
                  <select
                    id="domainType"
                    name="domainType"
                    autoComplete="domainType-name"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    //value={domain.domainType}
                    onChange={(e) => {
                      setDomain({
                        ...domain,
                        domainType: e.target.value,
                      })
                    }}
                  >
                    <option>Seleziona un tipo</option>
                    <option
                      label="Dominio della Conquista"
                      value={'Dominio_della_Conquista'}
                    />
                    <option>Manufatti</option>
                    <option
                      label="Materiali per armi"
                      value={'Materiali_per_armi'}
                    />
                    <option
                      label="Materiali per talenti"
                      value={'Materiali_per_talenti'}
                    />
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3 pt-5">
                <label
                  htmlFor="regionId"
                  className="block text-sm font-medium leading-6 text-left"
                >
                  Regione
                </label>
                <div className="mt-2">
                  <select
                    id="regionId"
                    name="regionId"
                    autoComplete="regionId-name"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    //value={domain.regionId}
                    onChange={(e) => {
                      setDomain({
                        ...domain,
                        regionId: e.target.value,
                      })
                    }}
                  >
                    <option>Seleziona Regione</option>
                    {regionData.content &&
                      regionData.content.map((region) => (
                        <option key={region.id} value={region.id}>
                          {region.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex gap-x-6">
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
                    handleSave()
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
        {/* FINE CREAZIONE DOMAIN */}
        {/* INIZIO LISTA DOMAIN */}
        <div>
          <p className="text-white text-lg">Lista Domini</p>
          <ul
            role="list"
            className="divide-y divide-gray-100 ms-5 overflow-y-scroll px-5 h-2/3"
          >
            {domainData.content &&
              domainData.content.map((domain) => (
                <li key={domain.id} className="my-3 text-left px-5 py-3">
                  <div className="flex justify-between">
                    <div className="w-3/4 ">
                      <p>
                        - Nome: <span className="italic"> {domain.name} </span>
                      </p>
                      <p>
                        - Luogo:{' '}
                        <span className="italic"> {domain.place} </span>
                      </p>

                      <p>
                        - Tipo:{' '}
                        <span className="italic" onChange={handleDisplayData}>
                          {' '}
                          {handleDisplayData(domain.domainType)}{' '}
                        </span>
                      </p>
                      <p>
                        - Regione:{' '}
                        <span className="italic"> {domain.regionId.name} </span>
                      </p>
                      <div className="mt-2">
                        <div className="flex">
                          <p>- Materiali: </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#15803d"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#15803d"
                            className="size-6 mx-2"
                            onClick={() => handlePlusButton(domain.id)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </div>

                        <div className="flex flex-wrap overflow-y-scroll h-20 mt-2 border border-2 rounded-lg">
                          {domain.materialList.length > 0 &&
                            domain.materialList.map((mater) => (
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
                                      domain.id,
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
                          viewBox="0 0 24 24"
                          fill="#facc15"
                          className="size-8 mx-2"
                          onClick={() => {
                            handlePencilUpdate(domain)
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
                            handleDelete(domain)
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
                  </div>

                  {showMaterialModal && selected && (
                    <ModalMaterialDomain
                      showModal={showMaterialModal}
                      setShowModal={setShowMaterialModal}
                      domainId={selected}
                      domain={domain}
                      currentPageDomain={currentPageDomain}
                      elementsPerPageDomain={elementsPerPageDomain}
                      orderElementsDomain={orderElementsDomain}
                    />
                  )}
                </li>
              ))}
          </ul>
          <div className="flex justify-center mt-4 text-white">
            {domainData && (
              <div className="justify-content-center custom-page">
                {[...Array(domainData.totalPages).keys()].map((number) => (
                  <button
                    key={number}
                    onClick={() => handlePageChangeDomain(number)}
                    className={`custom-item border p-4 ${
                      number === currentPageDomain - 1 ? 'active' : ''
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* FINE LISTA DOMAIN */}
      </div>
    </div>
  )
}

export default Domain
