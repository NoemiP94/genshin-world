import { useDispatch, useSelector } from 'react-redux'
import { getRegion } from '../redux/action/regions'
import { useEffect, useState } from 'react'
import ModalRegion from './ModalRegion'

const ListRegion = () => {
  const data = useSelector((state) => state.region.list)

  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  const handlePencilUpdate = () => {
    setShowModal(true)
    console.log('Matita cliccata')
  }

  useEffect(() => {
    console.log('dati', data)
    dispatch(getRegion())
  }, [dispatch])

  return (
    <>
      <ul role="list" className="divide-y divide-gray-100 ms-5">
        <p className="text-white">Lista regioni</p>
        {data.content &&
          data.content.map((region) => (
            <li key={region.id} className="my-3 text-left">
              <div className="flex justify-between	">
                <div>
                  <p className="pt-2">Nome: {region.name}</p>
                  <p>Tipo di visione: {region.visionType}</p>
                  <p>Lista località </p>
                </div>
                <div className="m-2 ">
                  <div className="flex my-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 me-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p>Aggiungi località</p>
                    </div>
                  </div>
                  <div className="flex my-1">
                    <div
                      data-modal-target="crud-modal"
                      data-modal-toggle="crud-modal"
                      className="block text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 me-1"
                        onClick={() => {
                          handlePencilUpdate()
                        }}
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                      </svg>
                    </div>
                    <div>
                      <p>Modifica regione</p>
                    </div>
                  </div>
                  <div className="flex my-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 me-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p>Elimina regione</p>
                    </div>
                  </div>
                </div>
              </div>
              {showModal && (
                <ModalRegion
                  setShowModal={setShowModal}
                  regionId={region.id}
                  region={region}
                />
              )}
            </li>
          ))}
      </ul>
    </>
  )
}

export default ListRegion
