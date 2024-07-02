import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {
  getCharacter,
  getSingleCharacter,
  removeArtifactSet,
  removeMaterial,
  removeWeapon,
} from '../redux/action/characters'
import ModalCharacterImg from './modals/ModalCharacterImg'
import ModalMaterialCharacter from './modals/ModalMaterialCharacter'
import ModalArtifactSetCharacter from './modals/ModalArtifactSetCharacter'
import ModalWeaponCharacter from './modals/ModalWeaponCharacter'
import Talent from './Talent'

const SingleCharacter = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { id } = useParams()
  const singleCharacter = useSelector(
    (state) => state.character.singleCharacter
  )

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

  //GET MATERIALS
  const [showMaterialCharacterModal, setShowMaterialCharacterModal] =
    useState(false)
  const [selectedCharacterMaterial, setSelectedCharacterMaterial] =
    useState(null)

  const handlePlusButton = (idCharacter) => {
    console.log('idWeapon ricevuto: ', idCharacter)
    setSelectedCharacterMaterial(idCharacter)
    setShowMaterialCharacterModal(true)
    console.log('personaggio selezionato: ', selectedCharacterMaterial)
  }

  //REMOVE MATERIAL
  const handleRemoveMaterial = async (idCharacter, idMaterial) => {
    try {
      await dispatch(removeMaterial(idCharacter, idMaterial, token))
      await dispatch(getCharacter())
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
      await dispatch(getCharacter())
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
      await dispatch(getCharacter())
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

  return (
    <div>
      {singleCharacter && (
        <>
          <h2 className="mt-5 text-2xl font-bold">
            Dettagli {singleCharacter.name}{' '}
          </h2>
          <div>
            <p>
              - Nome: <span className="italic">{singleCharacter.name}</span>
            </p>
            <p>
              - Voce: <span className="italic">{singleCharacter.voice}</span>
            </p>
            <p>
              - Compleanno:{' '}
              <span className="italic">{singleCharacter.birthday}</span>
            </p>
            <p>
              - Stelle: <span className="italic">{singleCharacter.stars}</span>
            </p>
            <p>
              - Affiliazione:{' '}
              <span className="italic">{singleCharacter.affiliate}</span>
            </p>
            <p>
              - Visione:{' '}
              <span className="italic">{singleCharacter.visionType}</span>
            </p>
            <p>
              - Arma:{' '}
              <span className="italic">{singleCharacter.weaponType}</span>
            </p>
            <p>
              - Regione:{' '}
              <span className="italic">{singleCharacter.region_id.name}</span>
            </p>
            <p>
              - Descrizione:{' '}
              <span className="italic">{singleCharacter.description}</span>
            </p>
            <p>
              - Costellazione:{' '}
              <span className="italic">
                {singleCharacter.constellation.name}
              </span>
            </p>
            {/* <p>
              - Talenti:{' '}
              {/* <span className="italic">{singleCharacter.description}</span> */}
            {/* </p> */}
          </div>
          <div>
            <div>
              {singleCharacter.image !== null ? (
                <img
                  src={singleCharacter.image}
                  className="border border-yellow-600 rounded-lg w-20 mx-auto"
                />
              ) : null}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#15803d"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 mx-2"
              onClick={() => showCharacterModal(singleCharacter.id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>

          <div className="h-96 mb-28">
            <h5>- Gestione Talenti</h5>
            <div className="flex">
              <Talent
                character={singleCharacter.id}
                singleCharacter={singleCharacter}
                idTalent={idTalent}
              />{' '}
              <div>
                <p className="text-white text-sm">Lista Talenti</p>
                <ul
                  role="list"
                  className="divide-y divide-gray-100 ms-5 overflow-y-scroll px-5 h-96 "
                >
                  {singleCharacter.talentList.length > 0
                    ? singleCharacter.talentList.map((tal) => (
                        <li key={tal.id} className="my-3 text-left px-5 py-3">
                          <div className="flex">
                            <p className="me-4">{tal.name}</p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="#facc15"
                              className="size-4 mx-2"
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
                              className="size-4 mx-2"
                              // onClick={() => {
                              //   handleDeleteDegree(degree.id)
                              // }}
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
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            </div>
          </div>

          {/* MATERIALS */}
          <div>
            <div className="flex">
              <p>- Materiali necessari per ascensione</p>
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
          <div>
            <div className="flex">
              <p>- Artefatti consigliati</p>
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
                    {/* {mater.image !== null ? (
                                  <img
                                    src={mater.image}
                                    className="w-14 border border-yellow-600 rounded-lg w-14 mx-auto"
                                  />
                                ) : null} */}
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
          <div>
            <div className="flex">
              <p>- Armi consigliate</p>
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
          <button className="ms-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Indietro
          </button>
        </Link>
        {showCharacterImgModal && selectedCharacter && (
          <ModalCharacterImg
            showImgModal={showCharacterImgModal}
            setShowImgModal={setShowCharacterImgModal}
            characterId={selectedCharacter}
          />
        )}
        {showMaterialCharacterModal && selectedCharacterMaterial && (
          <ModalMaterialCharacter
            showModal={showMaterialCharacterModal}
            setShowModal={setShowMaterialCharacterModal}
            characterId={selectedCharacterMaterial}
            character={singleCharacter}
          />
        )}
        {showArtifactSetModal && selectedCharacterArtifactSet && (
          <ModalArtifactSetCharacter
            showModal={showArtifactSetModal}
            setShowModal={setShowArtifactSetModal}
            characterId={selectedCharacterArtifactSet}
            character={singleCharacter}
          />
        )}
        {showWeaponModal && selectedCharacterWeapon && (
          <ModalWeaponCharacter
            showModal={showWeaponModal}
            setShowModal={setShowWeaponModal}
            characterId={selectedCharacterWeapon}
            character={singleCharacter}
          />
        )}
      </div>
    </div>
  )
}

export default SingleCharacter
