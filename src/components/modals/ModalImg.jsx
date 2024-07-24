import { useState } from 'react'
import { useDispatch } from 'react-redux'

const ModalImg = ({
  setShowImgModal,
  formImg,
  setFormImg,
  handleSave,
  elementId,
}) => {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  // const [formImg, setFormImg] = useState(null)

  //   const handleUploadImage = async (id) => {
  //     try {
  //       if (formImg) {
  //         const id_element = id ? id.toString() : null
  //         if (id_element) {
  //           const response = await postImage(id_element, formImg, token)
  //           if (response !== null) {
  //             dispatch({
  //               type: GET_IMG,
  //               payload: response.url,
  //             })
  //             alert('Immagine caricata correttamente!')
  //           } else {
  //             console.log('Image upload successful, but no URL returned')
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       console.log('Error', error)
  //     }
  //   }

  //   const handleSave = async (id) => {
  //     await handleUploadImage(id)
  //     await dispatch(getList(currentPage, elementsPerPage, orderElements))
  //     setShowImgModal(false)
  //   }

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-51 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-700 outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold text-black">
                Aggiungi immagine
              </h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => setShowImgModal(false)}
              >
                <span className="text-black h-6 w-6 text-xl block py-0">x</span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <form className=" shadow-md rounded px-8 pt-6 pb-8 w-full">
                <input
                  className="shadow appearance-none  rounded w-full py-2 px-1 "
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0]
                    if (file) {
                      const formData = new FormData()
                      formData.append('image', file)
                      setFormImg(formData)
                    }
                  }}
                />
              </form>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={
                  () => handleSave(elementId)
                  // setShowImgModal(false)
                }
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

export default ModalImg
