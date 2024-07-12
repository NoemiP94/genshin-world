import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  addArtifactSetToCharacter,
  getCharacter,
  getSingleCharacter,
} from '../../redux/action/characters'
import { getArtifact } from '../../redux/action/artifacts'

const ModalArtifactSetCharacter = ({
  showModal,
  setShowModal,
  characterId,
  character,
  currentPageCharacter,
  elementsPerPageCharacter,
  orderElementsCharacter,
}) => {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()

  //PAGINATION
  const [currentPage, setCurrentPage] = useState(0)
  const elementsPerPage = 10
  const orderElements = 'name'

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const artifactData = useSelector((state) => state.artifact.list)
  useEffect(() => {
    dispatch(getArtifact(currentPage, elementsPerPage, orderElements))
  }, [dispatch])

  //quando si clicca sull'oggetto lo aggiunge
  const handleAddArtifactSet = async (
    character,
    idCharacter,
    idArtifactSet,
    token
  ) => {
    try {
      console.log('idCharacter: ', idCharacter)
      console.log('idArtifactSet: ', idArtifactSet)
      console.log('personaggio selected: ', character)
      console.log('token: ', token)
      await dispatch(
        addArtifactSetToCharacter(character, idCharacter, idArtifactSet, token)
      )
      await dispatch(
        getCharacter(
          currentPageCharacter,
          elementsPerPageCharacter,
          orderElementsCharacter
        )
      )
      await dispatch(getSingleCharacter(idCharacter))
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <>
      <div className="flex justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-51 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl ">
          <div className="bg-slate-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold text-black">
                Aggiungi Set Artefatti
              </h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => setShowModal(false)}
              >
                <span className="text-black h-6 w-6 text-xl block py-0">x</span>
              </button>
            </div>
            <div className="relative p-6 flex flex-wrap overflow-y-scroll border m-4 rounded-xl border-slate-900 border-2">
              {/* mostrare tutti i materiali */}
              {artifactData.content &&
                artifactData.content.map((artifact) => (
                  <div
                    key={artifact.id}
                    className="flex flex-col m-4 items-center w-20 "
                    onClick={() =>
                      handleAddArtifactSet(
                        character,
                        characterId,
                        artifact.id,
                        token
                      )
                    }
                  >
                    {artifact.image !== null ? (
                      <img
                        src={artifact.image}
                        className="w-14 border border-yellow-600 rounded-lg w-20 mx-auto"
                      />
                    ) : null}
                    <p className="text-center pt-1 truncate hover:text-clip w-20">
                      {artifact.name}
                    </p>
                  </div>
                ))}
            </div>
            <div className="flex justify-center my-4 text-white">
              {artifactData && (
                <div className="justify-content-center custom-page rounded border">
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
        </div>
      </div>
    </>
  )
}

export default ModalArtifactSetCharacter
