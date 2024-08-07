import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteArtifact,
  GET_POST_ARTIFACT_IMG,
  getArtifact,
  postArtifact,
  postArtifactImage,
  updateArtifact,
} from '../redux/action/artifacts'
import Piece from './Piece'
import {
  deletePiece,
  GET_POST_PIECE_IMG,
  getPiece,
  postPieceImage,
} from '../redux/action/pieces'
import { Menu, MenuButton, MenuItem, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import ModalImg from './modals/ModalImg'

const Artifacts = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const [artifact, setArtifact] = useState({
    name: '',
    description: '',
    origin: '',
  })

  const handleReset = () => {
    setArtifact({
      name: '',
      description: '',
      origin: '',
    })
  }

  //PAGINATION
  const [currentPage, setCurrentPage] = useState(0)
  const elementsPerPage = 10
  const orderElements = 'name'

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  //GET ARTIFACT
  const artifactData = useSelector((state) => state.artifact.list)
  useEffect(() => {
    dispatch(getArtifact(currentPage, elementsPerPage, orderElements))
  }, [dispatch, currentPage, elementsPerPage, orderElements])

  //SAVE ARTIFACT
  const saveArtifact = async () => {
    try {
      await dispatch(postArtifact(artifact, token))
      await dispatch(getArtifact(currentPage, elementsPerPage, orderElements))
      await handleReset()
    } catch (error) {
      console.log('Errore nel salvataggio', error)
    }
  }

  //DELETE ARTIFACT
  const handleDelete = async (artifact) => {
    try {
      await dispatch(deleteArtifact(artifact.id, token))
      await dispatch(getArtifact(currentPage, elementsPerPage, orderElements))
      console.log('Set Artefatti eliminato con successo!')
    } catch (error) {
      console.log("Errore nell'eliminazione", error)
    }
  }

  //UPDATE ARTIFACT
  const [updtArtifact, setUpdtArtifact] = useState(null)
  const [idArtifact, setIdArtifact] = useState('')

  const handlePencilUpdate = (artifact) => {
    setUpdtArtifact(artifact)
    setIdArtifact(artifact.id)
    setArtifact({
      name: artifact.name,
      description: artifact.description,
      origin: artifact.origin,
    })
    console.log('artifact passato: ', artifact)
    console.log('id artifact selezionato: ', artifact.id)
    console.log('matita cliccata')
  }

  const handleUpdate = async () => {
    try {
      await dispatch(updateArtifact(idArtifact, artifact, token))
      await dispatch(getArtifact(currentPage, elementsPerPage, orderElements))
      await handleReset()
      console.log('Modificato con successo')
    } catch (error) {
      console.log('Errore nella modifica', error)
    }
  }

  //GET PIECE
  const pieceData = useSelector((state) => state.piece.list)
  useEffect(() => {
    dispatch(getPiece())
  }, [dispatch])

  //MODALE IMG PIECE
  const [showPieceImgModal, setPieceShowImgModal] = useState(false)
  const [selectedPiece, setSelectedPiece] = useState(null)

  const showModalPieceImg = (idPiece) => {
    console.log('Id pezzo ricevuto :', idPiece)
    setSelectedPiece(idPiece)
    setPieceShowImgModal(true)

    console.log('Pezzo cliccato')
    console.log('Pezzo selezionato', selectedPiece)
  }

  const [formImgPiece, setFormImgPiece] = useState(null)
  const handleUploadPieceImg = async (id) => {
    try {
      console.log('cliccato')
      if (formImgPiece) {
        console.log('entra nell if')
        const id_piece = id ? id.toString() : null
        console.log('id_piece', id_piece)
        if (id_piece) {
          const response = await postPieceImage(id_piece, formImgPiece, token)
          if (response !== null) {
            console.log('Immagine caricata correttamente', response)

            dispatch({
              type: GET_POST_PIECE_IMG,
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

  const handlePieceSave = async (id) => {
    await handleUploadPieceImg(id)
    await dispatch(getPiece())
    await dispatch(getArtifact(currentPage, elementsPerPage, orderElements))
    setPieceShowImgModal(false)
  }

  //IMG MODAL ARTIFACT
  const [showArtifactImgModal, setShowArtifactImgModal] = useState(false)
  const [selectedArtifact, setSelectedArtifact] = useState(null)

  const showArtifactModal = (idArtifact) => {
    setSelectedArtifact(idArtifact)
    setShowArtifactImgModal(true)
    console.log('modale aperto')
  }
  const [formImg, setFormImg] = useState(null)
  const handleUploadImage = async (id) => {
    try {
      console.log('cliccato')
      if (formImg) {
        console.log('entra nell if')
        const id_element = id ? id.toString() : null
        console.log('id_element', id_element)
        if (id_element) {
          const response = await postArtifactImage(id_element, formImg, token)
          if (response !== null) {
            console.log('Immagine caricata correttamente', response)

            dispatch({
              type: GET_POST_ARTIFACT_IMG,
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

  const handleSave = async (id) => {
    await handleUploadImage(id)
    await dispatch(getArtifact(currentPage, elementsPerPage, orderElements))
    setShowArtifactImgModal(false)
  }

  //UPDATE PIECE
  const [piece, setPiece] = useState(null)
  const [newPiece, setNewPiece] = useState(null)

  const handleUpdatePieceButton = (piece) => {
    console.log('Bottone modifica cliccato')
    console.log('Piece da modificare: ', piece)
    //console.log('id artifact: ', artifact)
    console.log('piece.id: ', piece.id)
    setSelectedPiece(piece.id)
    setNewPiece(piece)

    console.log('selectedPiece: ', selectedPiece)
    setPiece((prevPiece) => ({
      ...prevPiece,
      name: piece.name,
      description: piece.description,
      id: piece.id,
      pieceType: piece.pieceType,
      artifactSet_id: piece.artifactSet_id,
    }))

    console.log('piece dopo il set', piece)
  }

  //HANDLE DELETE
  const handleDeletePiece = async (pieceId) => {
    console.log('piece id delete', pieceId)
    try {
      await dispatch(deletePiece(pieceId, token))
      await dispatch(getPiece())
      await dispatch(getArtifact(currentPage, elementsPerPage, orderElements))
    } catch (error) {
      console.log("Errore nell'eliminazione", error)
    }
  }

  useEffect(() => {
    console.log('selectedPiece aggiornato:', selectedPiece)
  }, [selectedPiece])
  return (
    <div>
      <div className="mt-5 text-2xl font-bold">Gestione Artefatti</div>
      <div className="container my-6 w-full flex">
        {/* CREA ARTIFACT */}
        <div className="w-2/4 flex justify-center">
          <form className="w-full  text-white">
            <div className=" ps-7 h-auto">
              <h2 className="font-semibold leading-7 text-lg">
                Crea un set di Artefatti
              </h2>

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
                      name="name"
                      id="name"
                      required
                      autoComplete="name"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={artifact.name}
                      onChange={(e) => {
                        setArtifact({
                          ...artifact,
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
                  Descrizione *
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={5}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 "
                    required
                    value={artifact.description}
                    onChange={(e) => {
                      setArtifact({
                        ...artifact,
                        description: e.target.value,
                      })
                    }}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="origin"
                  className="block text-sm font-medium leading-6 text-left"
                >
                  Origine
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="origin"
                    id="origin"
                    autoComplete="origin"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={artifact.origin}
                    onChange={(e) => {
                      setArtifact({
                        ...artifact,
                        origin: e.target.value,
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
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
                  onClick={(e) => {
                    e.preventDefault()
                    saveArtifact()
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
        {/* FINE CREAZIONE ARTIFACT */}{' '}
        <div className="container w-full flex">
          <Piece artifact={artifact} idPiece={selectedPiece} piece={piece} />
        </div>
      </div>
      {/* INIZIO LISTA ARTIFACT */}
      <div>
        <p className="text-white text-lg">Lista Set Artefatti</p>
        <ul
          role="list"
          className="divide-y divide-gray-100 ms-5 overflow-y-scroll px-5S"
        >
          {artifactData.content &&
            artifactData.content.map((artifact) => (
              <li key={artifact.id} className="my-3 text-left px-5 py-3 ">
                <div className="flex justify-between flex-col">
                  <div className=" flex">
                    <div className="flex flex-col">
                      <p>
                        - Nome: <span className="italic">{artifact.name}</span>
                      </p>
                      <p className=" overflow-y-scroll h-20 ">
                        - Descrizione:{' '}
                        <span className="italic">{artifact.description}</span>
                      </p>{' '}
                      {artifact.origin !== null ? (
                        <p>
                          - Origine:{' '}
                          <span className="italic">{artifact.origin}</span>
                        </p>
                      ) : null}
                    </div>

                    <div className="w-1/4 mt-4 mx-4 flex flex-col items-center">
                      <div className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#15803d"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-8 mx-2"
                          onClick={() => showArtifactModal(artifact.id)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>{' '}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#facc15"
                          className="size-8 mx-2"
                          onClick={() => {
                            handlePencilUpdate(artifact)
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
                            handleDelete(artifact)
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
                        {artifact.image !== null ? (
                          <img
                            src={artifact.image}
                            className="border mx-2 w-14 border-yellow-600 mt-2"
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Menu
                      as="div"
                      className="relative inline-block text-left mt-2"
                    >
                      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Lista pezzi
                        <ChevronDownIcon
                          className="-mr-1 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </MenuButton>
                      {artifact.pieceList.length > 0
                        ? artifact.pieceList.map((piece) => (
                            <Transition
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                              key={piece.id}
                            >
                              <MenuItem className="flex">
                                <a className="italic py-2">
                                  <div className="flex items-center">
                                    <div className="flex items-center">
                                      {piece.image !== null ? (
                                        <img
                                          src={piece.image}
                                          className="border mx-2 w-14 border-yellow-600"
                                        />
                                      ) : null}
                                      <p className="pe-5">{piece.name}</p>
                                    </div>

                                    <div className="flex justify-items-end">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#15803d"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-8 mx-2"
                                        onClick={() =>
                                          showModalPieceImg(piece.id)
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
                                        fill="#facc15"
                                        className="size-6 me-1"
                                        onClick={() =>
                                          handleUpdatePieceButton(
                                            piece
                                            // artifact.id
                                          )
                                        }
                                      >
                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                      </svg>

                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="#dc2626"
                                        className="size-6 me-1"
                                        onClick={() =>
                                          handleDeletePiece(piece.id)
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
                </div>
                {showPieceImgModal && selectedPiece && (
                  <ModalImg
                    elementId={selectedPiece}
                    handleSave={handlePieceSave}
                    setShowImgModal={setPieceShowImgModal}
                    setFormImg={setFormImgPiece}
                  />
                )}
                {showArtifactImgModal && selectedArtifact && (
                  <ModalImg
                    elementId={selectedArtifact}
                    handleSave={handleSave}
                    setShowImgModal={setShowArtifactImgModal}
                    setFormImg={setFormImg}
                  />
                )}
              </li>
            ))}
        </ul>
        <div className="flex justify-center my-4 text-white">
          {artifactData && (
            <div className="justify-content-center custom-page">
              {[...Array(artifactData.totalPages).keys()].map((number) => (
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
      {/* FINE LISTA ARTIFACT */}
    </div>
  )
}

export default Artifacts
