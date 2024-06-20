import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArtifact } from '../redux/action/artifacts'
import { getPiece, postPiece } from '../redux/action/pieces'

const Piece = (artifact) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  //GET ARTIFACT
  const artifactData = useSelector((state) => state.artifact.list)
  useEffect(() => {
    dispatch(getArtifact())
  }, [dispatch])

  //SAVE PIECE
  const [piece, setPiece] = useState(null)
  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await dispatch(postPiece(piece, token))
      await dispatch(getArtifact())
      await dispatch(getPiece())
    } catch (error) {
      console.log('Errore creazione place: ', error)
    }
  }
  return (
    <div>
      {/* CREAZIONE PEZZO   */}
      <div className="flex justify-center ">
        <form className="w-full text-white ">
          <div className="p-7 h-auto">
            <h2 className="font-semibold leading-7 text-lg">
              Crea un Pezzo dell&apos;Artefatto
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 pt-5">
                <label
                  htmlFor="set"
                  className="block text-sm font-medium leading-6 text-left"
                >
                  Set
                </label>
                <div className="mt-2">
                  <select
                    id="set"
                    name="set"
                    autoComplete="set-name"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    //value={place.region_id}
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
                    //value={place.name}
                    onChange={(e) => {
                      setPiece({
                        ...piece,
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
                className="block text-sm font-medium leading-6 text-left"
              >
                Descrizione
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={5}
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300  "
                  // value={place.description}
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
                Tipo
              </label>
              <div className="mt-2">
                <select
                  id="pieceType"
                  name="pieceType"
                  autoComplete="pieceType-name"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  // value={region.vision}
                  onChange={(e) => {
                    setPiece({
                      ...piece,
                      pieceType: e.target.value,
                    })
                  }}
                >
                  <option>Seleziona un tipo</option>
                  <option>Fiore</option>
                  <option>Piuma</option>
                  <option>Sabbie</option>
                  <option>Calice</option>
                  <option>Corona</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3 pt-5">
              <label
                htmlFor="stars"
                className="block text-sm font-medium leading-6 text-left"
              >
                Stelle
              </label>
              <div className="mt-2">
                <select
                  id="stars"
                  name="stars"
                  autoComplete="stars-name"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  // value={region.vision}
                  onChange={(e) => {
                    setPiece({
                      ...piece,
                      stars: e.target.value,
                    })
                  }}
                >
                  <option>Seleziona una stella</option>
                  <option>ONE</option>
                  <option>TWO</option>
                  <option>THREE</option>
                  <option>FOUR</option>
                  <option>FIVE</option>
                </select>
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
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSave}
              >
                Salva
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                // onClick={(e) => {
                //   e.preventDefault()
                //   handleUpdate()
                // }}
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
