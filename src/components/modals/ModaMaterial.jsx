import { useDispatch, useSelector } from 'react-redux'
import {
  GET_POST_PLACE_IMG,
  getPlace,
  postImage,
} from '../../redux/action/places'
import { useEffect, useState } from 'react'
import { getMaterial, getMaterialByName } from '../../redux/action/materials'

const ModalMaterial = ({ showModal, setShowModal, weaponId }) => {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()

  //metodo che prende il testo dell'input e lo aggiunge all'endpoint
  const materialData = useSelector((state) => state.material.list)
  useEffect(() => {
    dispatch(getMaterial())
  }, [dispatch])

  // const handleShowMaterial = () => {
  //   try {
  //     console.log()
  //   } catch (error) {
  //     console.log('Error', error)
  //   }
  //getMaterialByName(qualcosa preso dall'input)
  //}
  //quando si clicca INVIA mostra i risultati trovati
  //quando si clicca AGGIUNGI aggiunge alla lista dei materiali per l'arma, ma non chiude il modale.

  return (
    <>
      <div className="flex justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-51 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl ">
          <div className="border-0 bg-slate-600 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold text-black">
                Aggiungi Materiali
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
              {materialData.content &&
                materialData.content.map((material) => (
                  <div
                    key={material.id}
                    className="flex flex-col m-4 items-center w-20 "
                  >
                    {material.image !== null ? (
                      <img
                        src={material.image}
                        className="w-14 border border-yellow-600 rounded-lg w-20 mx-auto"
                      />
                    ) : null}
                    <p className="text-center pt-1 truncate hover:text-clip w-20">
                      {material.name}
                    </p>
                  </div>
                ))}
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
              >
                Salva
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalMaterial
