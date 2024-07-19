import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArtifact } from '../redux/action/artifacts'
import { getPiece, postPiece, updatePiece } from '../redux/action/pieces'

const Piece = ({ idPiece, pieceOb }) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  //PAGINATION
  const [currentPage, setCurrentPage] = useState(0)
  const elementsPerPage = 10
  const orderElements = 'name'

  //GET ARTIFACT
  const artifactData = useSelector((state) => state.artifact.list)
  useEffect(() => {
    dispatch(getArtifact(currentPage, elementsPerPage, orderElements))
  }, [dispatch, currentPage, elementsPerPage, orderElements])

  //SAVE PIECE
  const [piece, setPiece] = useState({
    name: '',
    description: '',
    id: idPiece,
    pieceType: '',
    artifactSet_id: '',
  })

  const handleReset = () => {
    setPiece({
      name: '',
      description: '',
      id: '',
      pieceType: '',
      artifactSet_id: '',
    })
  }

  const [newPiece, setNewPiece] = useState({
    name: piece.name,
    description: piece.description,
    id: idPiece,
    pieceType: piece.pieceType,
    artifactSet_id: piece.artifactSet_id,
  })
  const handleSave = async (e) => {
    e.preventDefault()

    try {
      await dispatch(postPiece(piece, token))
      await dispatch(getArtifact(currentPage, elementsPerPage, orderElements))
      await dispatch(getPiece())
      await handleReset()
    } catch (error) {
      console.log('Errore creazione place: ', error)
    }
  }

  //UPDATE PIECE
  const handleUpdate = async () => {
    console.log('nell handleUpdate ', idPiece)
    if (!idPiece) {
      console.log('ID nn valido', idPiece)
      return
    }
    try {
      await dispatch(updatePiece(idPiece, piece, token))
      await dispatch(getPiece())
      await dispatch(getArtifact(currentPage, elementsPerPage, orderElements))
      await handleReset()
      console.log('modificato')
      console.log('piece: ', piece)
    } catch (error) {
      console.log('Errore nella modifica: ', error)
    }
  }

  return (
    <div>
      {/* CREAZIONE PEZZO   */}
      <div className="flex justify-center ">
        <form className="w-full text-white ">
          <div className="ps-10 h-auto">
            <h2 className="font-semibold leading-7 text-lg">
              Crea un Pezzo dell&apos;Artefatto
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 ">
                <label
                  htmlFor="set"
                  className="block text-sm font-medium leading-6 text-left"
                >
                  Set *
                </label>
                <div className="mt-2">
                  <select
                    id="set"
                    required
                    name="set"
                    autoComplete="set-name"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    //value={newPiece.artifactSet_id}
                    onChange={(e) => {
                      setPiece({
                        ...piece,
                        artifactSet_id: e.target.value,
                      })
                    }}
                  >
                    <option>Seleziona una set</option>
                    {artifactData.content &&
                      artifactData.content.map((artifact) => (
                        <option key={artifact.id} value={artifact.id}>
                          {artifact.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="sm:col-span-3 mt-2">
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
                  //value={newPiece.name}
                  onChange={(e) => {
                    setPiece({
                      ...piece,
                      name: e.target.value,
                    })
                  }}
                />
              </div>
            </div>
            <div className="col-span-full pt-5">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-left"
              >
                Descrizione *
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  required
                  name="about"
                  rows={5}
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300  "
                  //value={newPiece.description}
                  onChange={(e) => {
                    setPiece({
                      ...piece,
                      description: e.target.value,
                    })
                  }}
                />
              </div>
            </div>
            <div className="sm:col-span-3 pt-5">
              <label
                htmlFor="pieceType"
                className="block text-sm font-medium leading-6 text-left"
              >
                Tipo *
              </label>
              <div className="mt-2">
                <select
                  id="pieceType"
                  name="pieceType"
                  required
                  autoComplete="pieceType-name"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  //value={newPiece.pieceType}
                  onChange={(e) => {
                    setPiece({
                      ...piece,
                      pieceType: e.target.value,
                    })
                  }}
                >
                  <option>Seleziona un tipo</option>
                  <option label="Fiore della vita" value={'Fiore_della_vita'} />
                  <option
                    label="Piuma della morte"
                    value={'Piuma_della_morte'}
                  />
                  <option label="Sabbie del tempo" value={'Sabbie_del_tempo'} />
                  <option label="Calice eonotemo" value={'Calice_eonotemo'} />
                  <option
                    label="Corona della ragione"
                    value={'Corona_della_ragione'}
                  />
                </select>
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
                  console.log('idPiece', idPiece)
                }}
              >
                Salva modifiche
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* FINE CREAZIONE LUOGO  */}
    </div>
  )
}

export default Piece
