import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {
  GET_POST_CHARACTER_IMG,
  getCharacter,
  getSingleCharacter,
  postCharacterImage,
  removeArtifactSet,
  removeMaterial,
  removeWeapon,
} from '../redux/action/characters'
import ModalMaterialCharacter from './modals/ModalMaterialCharacter'
import ModalArtifactSetCharacter from './modals/ModalArtifactSetCharacter'
import ModalWeaponCharacter from './modals/ModalWeaponCharacter'
import Talent from './Talent'
import { deleteTalent, removeMaterialTalent } from '../redux/action/talents'
import ModalMaterialTalent from './modals/ModalMaterialTalent'
import ModalTalentImg from './modals/ModalTalentImg'
import ModalImg from './modals/ModalImg'

const SingleCharacter = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { id } = useParams()
  const singleCharacter = useSelector(
    (state) => state.character.singleCharacter
  )

  const handleDisplayData = (data) => {
    const words = data.toLowerCase()
    const formattedData = words.charAt(0).toUpperCase() + words.slice(1)
    return formattedData
  }

  //PAGINATION CHARACTER
  const [currentPageCharacter, setCurrentPageCharacter] = useState(0)
  const elementsPerPageCharacter = 10
  const orderElementsCharacter = 'name'

  useEffect(() => {
    dispatch(getSingleCharacter(id))
  }, [dispatch, id])

  //IMG MODAL
  const [showCharacterImgModal, setShowCharacterImgModal] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  const showCharacterModal = (idCharacter) => {
    console.log('idCharacter ricevuto: ', idCharacter)
    setSelectedCharacter(idCharacter)
    setShowCharacterImgModal(true)

    console.log('Personaggio cliccata')
    console.log('Personaggio selezionato', selectedCharacter)
  }

  const [formImgCharacter, setFormImgCharacter] = useState(null)
  const handleUploadImageCharacter = async (id) => {
    try {
      console.log('cliccato')
      if (formImgCharacter) {
        console.log('entra nell if')
        const id_element = id ? id.toString() : null
        console.log('id_element', id_element)
        if (id_element) {
          const response = await postCharacterImage(
            id_element,
            formImgCharacter,
            token
          )
          if (response !== null) {
            console.log('Immagine caricata correttamente', response)

            dispatch({
              type: GET_POST_CHARACTER_IMG,
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

  const handleSaveImgCharacter = async (id) => {
    await handleUploadImageCharacter(id)
    await dispatch(
      getCharacter(
        currentPageCharacter,
        elementsPerPageCharacter,
        orderElementsCharacter
      )
    )
    await dispatch(getSingleCharacter(id))
    setShowCharacterImgModal(false)
  }

  //GET MATERIALS
  const [showMaterialCharacterModal, setShowMaterialCharacterModal] =
    useState(false)
  const [selectedCharacterMaterial, setSelectedCharacterMaterial] =
    useState(null)

  const handlePlusButton = (idCharacter) => {
    console.log('idCharacter ricevuto: ', idCharacter)
    setSelectedCharacterMaterial(idCharacter)
    setShowMaterialCharacterModal(true)
    console.log('personaggio selezionato: ', selectedCharacterMaterial)
  }

  //REMOVE MATERIAL
  const handleRemoveMaterial = async (idCharacter, idMaterial) => {
    try {
      await dispatch(removeMaterial(idCharacter, idMaterial, token))
      await dispatch(
        getCharacter(
          currentPageCharacter,
          elementsPerPageCharacter,
          orderElementsCharacter
        )
      )
      await dispatch(getSingleCharacter(idCharacter))
    } catch (error) {
      console.log("Errore nell'eliminazione", error)
    }
  }

  //GET ARTIFACTSET
  const [showArtifactSetModal, setShowArtifactSetModal] = useState(false)
  const [selectedCharacterArtifactSet, setSelectedCharacterArtifactSet] =
    useState(null)

  const handleAddArtifactSetButton = (idCharacter) => {
    setSelectedCharacterArtifactSet(idCharacter)
    setShowArtifactSetModal(true)
  }

  //REMOVE ARTIFACTSET
  const handleRemoveArtifactSet = async (idCharacter, idArtifactSet) => {
    try {
      await dispatch(removeArtifactSet(idCharacter, idArtifactSet, token))
      await dispatch(
        getCharacter(
          currentPageCharacter,
          elementsPerPageCharacter,
          orderElementsCharacter
        )
      )
      await dispatch(getSingleCharacter(idCharacter))
    } catch (error) {
      console.log("Errore nell'eliminazione", error)
    }
  }

  //GET WEAPON
  const [showWeaponModal, setShowWeaponModal] = useState(false)
  const [selectedCharacterWeapon, setSelectedCharacterWeapon] = useState(null)

  const handleAddWeaponButton = (idCharacter) => {
    setSelectedCharacterWeapon(idCharacter)
    setShowWeaponModal(true)
  }

  //REMOVE WEAPON
  const handleRemoveWeapon = async (idCharacter, idWeapon) => {
    try {
      await dispatch(removeWeapon(idCharacter, idWeapon, token))
      await dispatch(
        getCharacter(
          currentPageCharacter,
          elementsPerPageCharacter,
          orderElementsCharacter
        )
      )
      await dispatch(getSingleCharacter(idCharacter))
    } catch (error) {
      console.log("Errore nell'eliminazione", error)
    }
  }

  //UPDATE TALENT
  const [talent, setTalent] = useState(null)
  const [newTalent, setNewTalent] = useState(null)
  const [idTalent, setIdTalent] = useState('')

  const handleUpdateTalentButton = async (talent, singleCharacter) => {
    console.log('Bottone modifica cliccato')
    console.log('Talent da modificare: ', talent)
    console.log('id singleCharacter: ', singleCharacter)
    setNewTalent(talent)
    setIdTalent(talent.id)
    console.log('idTalent: ', idTalent)
    setTalent((prevTalent) => ({
      ...prevTalent,
      name: talent.name,
      info: talent.info,
      id: talent.id,
      character_id: singleCharacter.id,
    }))
  }

  //DELETE TALENT
  const handleDeleteTalent = async (talentId) => {
    console.log('talent id delete', talentId)
    try {
      await dispatch(deleteTalent(talentId, token))
      await dispatch(
        getCharacter(
          currentPageCharacter,
          elementsPerPageCharacter,
          orderElementsCharacter
        )
      )
      await dispatch(getSingleCharacter(singleCharacter.id))

      console.log('Eliminato con successo!')
    } catch (error) {
      console.log("Errore nell'eliminazione", error)
    }
  }

  //GET MATERIALS FOR TALENT
  const [showMaterialTalentModal, setShowMaterialTalentModal] = useState(false)
  const [selectedTalentMaterial, setSelectedTalentMaterial] = useState(null)

  const handlePlusMaterialTalent = (idTalent) => {
    console.log('idTalent ricevuto: ', idTalent)
    setSelectedTalentMaterial(idTalent)
    setSelectedCharacter(singleCharacter.id)
    setShowMaterialTalentModal(true)
    console.log('talent selezionato: ', selectedTalentMaterial)
  }

  //REMOVE MATERIALS FROM TALENT
  const handleRemoveMaterialFromTalent = async (idTalent, idMaterial) => {
    try {
      await dispatch(removeMaterialTalent(idTalent, idMaterial, token))
      await dispatch(getSingleCharacter(singleCharacter.id))
    } catch (error) {
      console.log("Errore nell'eliminazione", error)
    }
  }

  //IMG MODAL TALENT
  const [showTalentImgModal, setShowTalentImgModal] = useState(false)
  const [selectedTalent, setSelectedTalent] = useState(null)

  const showTalentModal = (idTalent) => {
    setSelectedTalent(idTalent)
    setSelectedCharacter(singleCharacter.id)
    setShowTalentImgModal(true)
  }

  return (
    <div>
      {singleCharacter && (
        <>
          <h2 className="mt-5 text-2xl font-bold">
            Dettagli {singleCharacter.name}{' '}
          </h2>
          <div className="flex">
            <div className="mt-4 text-left ms-5">
              <p>
                - Nome: <span className="italic">{singleCharacter.name}</span>
              </p>
              {singleCharacter.engVoice !== null ? (
                <p>
                  - Voce Inglese:{' '}
                  <span className="italic">{singleCharacter.engVoice}</span>
                </p>
              ) : null}
              {singleCharacter.japVoice !== null ? (
                <p>
                  - Voce Giapponese:{' '}
                  <span className="italic">{singleCharacter.japVoice}</span>
                </p>
              ) : null}
              {singleCharacter.chinVoice !== null ? (
                <p>
                  - Voce Cinese:{' '}
                  <span className="italic">{singleCharacter.chinVoice}</span>
                </p>
              ) : null}
              {singleCharacter.corVoice !== null ? (
                <p>
                  - Voce Coreana:{' '}
                  <span className="italic">{singleCharacter.corVoice}</span>
                </p>
              ) : null}
              {singleCharacter.birthday !== null ? (
                <p>
                  - Compleanno:{' '}
                  <span className="italic">{singleCharacter.birthday}</span>
                </p>
              ) : null}
              {singleCharacter.stars !== null ? (
                <p>
                  - Stelle:{' '}
                  <span className="italic">
                    {handleDisplayData(singleCharacter.stars)}
                  </span>
                </p>
              ) : null}
              {singleCharacter.affiliate !== null ? (
                <p>
                  - Affiliazione:{' '}
                  <span className="italic">{singleCharacter.affiliate}</span>
                </p>
              ) : null}
              {singleCharacter.visionType !== null ? (
                <p>
                  - Visione:{' '}
                  <span className="italic">{singleCharacter.visionType}</span>
                </p>
              ) : null}

              <p>
                - Arma:{' '}
                <span className="italic">{singleCharacter.weaponType}</span>
              </p>
              {singleCharacter.title !== null ? (
                <p>
                  - Titolo:{' '}
                  <span className="italic">{singleCharacter.title}</span>
                </p>
              ) : null}
              {singleCharacter.releaseVersion !== null ? (
                <p>
                  - Versione di rilascio:{' '}
                  <span className="italic">
                    {singleCharacter.releaseVersion}
                  </span>
                </p>
              ) : null}
              {singleCharacter.specialDish !== null ? (
                <p>
                  - Piatto speciale:{' '}
                  <span className="italic">{singleCharacter.specialDish}</span>
                </p>
              ) : null}
              {singleCharacter.region_id !== null ? (
                <p>
                  - Regione:{' '}
                  <span className="italic">
                    {singleCharacter.region_id.name}
                  </span>
                </p>
              ) : null}

              <p>
                - Descrizione:{' '}
                <span className="italic">{singleCharacter.description}</span>
              </p>

              {singleCharacter.constellation ? (
                <p>
                  - Costellazione:{' '}
                  <span className="italic">
                    {singleCharacter.constellation.name}
                  </span>
                </p>
              ) : null}
            </div>
            <div className="flex flex-col items-center m-auto">
              <div>
                {singleCharacter.image !== null ? (
                  <img
                    src={singleCharacter.image}
                    className="border border-yellow-600 rounded-lg w-40 mx-auto"
                  />
                ) : null}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#15803d"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 mx-2 mt-2"
                onClick={() => showCharacterModal(singleCharacter.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
          </div>

          <div className="h-96 mb-28 mt-5">
            <h5 className="font-bold my-2">Gestione Talenti</h5>
            <div className="flex">
              <Talent
                character={singleCharacter.id}
                singleCharacter={singleCharacter}
                idTalent={idTalent}
                currentPageCharacter={currentPageCharacter}
                elementsPerPageCharacter={elementsPerPageCharacter}
                orderElementsCharacter={orderElementsCharacter}
              />{' '}
              <div>
                <p className="text-white text-sm">Lista Talenti</p>
                <ul
                  role="list"
                  className="divide-y divide-gray-100 ms-5 overflow-y-scroll px-5 h-96 border rounded mx-2 mt-2"
                >
                  {singleCharacter.talentList.length > 0
                    ? singleCharacter.talentList.map((tal) => (
                        <li key={tal.id} className="my-3 text-left px-5 py-3">
                          <div className="flex items-center">
                            {tal.image !== null ? (
                              <img
                                src={tal.image}
                                className="border mx-2 w-14 border-yellow-600"
                              />
                            ) : null}
                            <p className="me-4">{tal.name}</p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#15803d"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-8 mx-2"
                              onClick={() => showTalentModal(tal.id)}
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
                              className="size-6 mx-2"
                              onClick={() => {
                                handleUpdateTalentButton(
                                  tal,
                                  singleCharacter.id
                                )
                              }}
                            >
                              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                            </svg>{' '}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="#dc2626"
                              className="size-6 mx-2"
                              onClick={() => {
                                handleDeleteTalent(tal.id)
                              }}
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>

                          <p className="overflow-y-scroll h-20 mt-2">
                            {tal.info}
                          </p>

                          <div className="mt-2">
                            <div className="flex">
                              <p>- Materiali per aumento talenti:</p>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#15803d"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="#15803d"
                                className="size-6 mx-2 "
                                onClick={() => handlePlusMaterialTalent(tal.id)}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 4.5v15m7.5-7.5h-15"
                                />
                              </svg>
                              <div className="flex flex-wrap overflow-y-scroll h-20 mt-2 border border-2 rounded-lg w-1/2">
                                {tal.necessaryMaterials.length > 0 &&
                                  tal.necessaryMaterials.map((mater) => (
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
                                          handleRemoveMaterialFromTalent(
                                            tal.id,
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
                          {showMaterialTalentModal &&
                            selectedTalentMaterial &&
                            selectedCharacter && (
                              <ModalMaterialTalent
                                showModal={showMaterialTalentModal}
                                setShowModal={setShowMaterialTalentModal}
                                talentId={selectedTalentMaterial}
                                talent={tal}
                                character={selectedCharacter}
                                currentPageCharacter={currentPageCharacter}
                                elementsPerPageCharacter={
                                  elementsPerPageCharacter
                                }
                                orderElementsCharacter={orderElementsCharacter}
                              />
                            )}
                          {showTalentImgModal &&
                            selectedTalent &&
                            selectedCharacter && (
                              <ModalTalentImg
                                showImgModal={showTalentImgModal}
                                setShowImgModal={setShowTalentImgModal}
                                talentId={selectedTalent}
                                character={selectedCharacter}
                                currentPageCharacter={currentPageCharacter}
                                elementsPerPageCharacter={
                                  elementsPerPageCharacter
                                }
                                orderElementsCharacter={orderElementsCharacter}
                              />
                            )}
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            </div>
          </div>

          {/* MATERIALS */}
          <div className="mx-4">
            <div className="flex">
              <p className="font-bold">- Materiali necessari per ascensione</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#15803d"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#15803d"
                className="size-6 mx-2"
                onClick={() => handlePlusButton(singleCharacter.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
            <div className="flex flex-wrap overflow-y-scroll h-20 mt-2 border border-2 rounded-lg">
              {singleCharacter.ascensionMaterials.length > 0 &&
                singleCharacter.ascensionMaterials.map((mater) => (
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
                          singleCharacter.id,
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
          {/* FINE MATERIALS */}
          {/* ARTIFACTS */}
          <div className="mx-4 my-5">
            <div className="flex">
              <p className="font-bold">- Artefatti consigliati</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#15803d"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#15803d"
                className="size-6 mx-2"
                onClick={() => handleAddArtifactSetButton(singleCharacter.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
            <div className="flex flex-wrap overflow-y-scroll h-20 mt-2 border border-2 rounded-lg">
              {singleCharacter.artifactSetList.length > 0 &&
                singleCharacter.artifactSetList.map((artifact) => (
                  <div
                    key={artifact.id}
                    className="flex flex-col mx-4 my-2 items-center w-16"
                  >
                    {artifact.image !== null ? (
                      <img
                        src={artifact.image}
                        className="w-14 border border-yellow-600 rounded-lg w-14 mx-auto"
                      />
                    ) : null}
                    <p className="text-center pt-1 truncate hover:text-clip w-14">
                      {artifact.name}
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#dc2626"
                      className="size-5 mx-2"
                      onClick={() => {
                        handleRemoveArtifactSet(
                          singleCharacter.id,
                          artifact.id,
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
          {/* FINE ARTIFACTS */}
          {/* WEAPON */}
          <div className="mx-4">
            <div className="flex">
              <p className="font-bold">- Armi consigliate</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#15803d"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#15803d"
                className="size-6 mx-2"
                onClick={() => handleAddWeaponButton(singleCharacter.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
            <div className="flex flex-wrap overflow-y-scroll h-20 mt-2 border border-2 rounded-lg">
              {singleCharacter.favWeapons.length > 0 &&
                singleCharacter.favWeapons.map((weapon) => (
                  <div
                    key={weapon.id}
                    className="flex flex-col mx-4 my-2 items-center w-16"
                  >
                    {weapon.image !== null ? (
                      <img
                        src={weapon.image}
                        className="w-14 border border-yellow-600 rounded-lg w-14 mx-auto"
                      />
                    ) : null}
                    <p className="text-center pt-1 truncate hover:text-clip w-14">
                      {weapon.name}
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#dc2626"
                      className="size-5 mx-2"
                      onClick={() => {
                        handleRemoveWeapon(singleCharacter.id, weapon.id, token)
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
          {/* FINE WEAPON */}
        </>
      )}
      <div>
        <Link
          to={`/reserved/character`}
          className="text-light text-decoration-none"
        >
          <button className="ms-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-5">
            Indietro
          </button>
        </Link>
        {showCharacterImgModal && selectedCharacter && (
          <ModalImg
            setShowImgModal={setShowCharacterImgModal}
            elementId={selectedCharacter}
            handleSave={handleSaveImgCharacter}
            setFormImg={setFormImgCharacter}
          />
        )}
        {showMaterialCharacterModal && selectedCharacterMaterial && (
          <ModalMaterialCharacter
            showModal={showMaterialCharacterModal}
            setShowModal={setShowMaterialCharacterModal}
            characterId={selectedCharacterMaterial}
            character={singleCharacter}
            currentPageCharacter={currentPageCharacter}
            elementsPerPageCharacter={elementsPerPageCharacter}
            orderElementsCharacter={orderElementsCharacter}
          />
        )}
        {showArtifactSetModal && selectedCharacterArtifactSet && (
          <ModalArtifactSetCharacter
            showModal={showArtifactSetModal}
            setShowModal={setShowArtifactSetModal}
            characterId={selectedCharacterArtifactSet}
            character={singleCharacter}
            currentPageCharacter={currentPageCharacter}
            elementsPerPageCharacter={elementsPerPageCharacter}
            orderElementsCharacter={orderElementsCharacter}
          />
        )}
        {showWeaponModal && selectedCharacterWeapon && (
          <ModalWeaponCharacter
            showModal={showWeaponModal}
            setShowModal={setShowWeaponModal}
            characterId={selectedCharacterWeapon}
            character={singleCharacter}
            currentPageCharacter={currentPageCharacter}
            elementsPerPageCharacter={elementsPerPageCharacter}
            orderElementsCharacter={orderElementsCharacter}
          />
        )}
      </div>
    </div>
  )
}

export default SingleCharacter
