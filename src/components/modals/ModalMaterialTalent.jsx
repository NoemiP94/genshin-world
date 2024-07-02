import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getMaterial } from '../../redux/action/materials'
import { addMaterialToEnemy, getEnemy } from '../../redux/action/enemies'
import { addMaterialToTalent, getTalent } from '../../redux/action/talents'

const ModalMaterialTalent = ({ showModal, setShowModal, talentId, talent }) => {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()

  const materialData = useSelector((state) => state.material.list)
  useEffect(() => {
    dispatch(getMaterial())
  }, [dispatch])

  //quando si clicca sull'oggetto lo aggiunge
  const handleAddMaterial = async (talent, idTalent, idMaterial, token) => {
    try {
      console.log('idTalent: ', idTalent)
      console.log('idMaterial: ', idMaterial)
      console.log('talent selected: ', talent)
      console.log('token: ', token)
      await dispatch(addMaterialToTalent(talent, idTalent, idMaterial, token))
      await dispatch(getTalent())
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
                    onClick={() =>
                      handleAddMaterial(talent, talentId, material.id, token)
                    }
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
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalMaterialTalent
