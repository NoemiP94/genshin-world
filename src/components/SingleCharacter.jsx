import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getSingleCharacter } from '../redux/action/characters'

const SingleCharacter = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { id } = useParams()
  const singleCharacter = useSelector(
    (state) => state.character.singleCharacter
  )

  useEffect(() => {
    dispatch(getSingleCharacter(id, token))
  }, [dispatch, id])
  return (
    <div className="h-screen">
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
              {/* <span className="italic">{singleCharacter.description}</span> */}
            </p>
            <p>
              - Talenti:{' '}
              {/* <span className="italic">{singleCharacter.description}</span> */}
            </p>
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
              //onClick={() => showWeaponModal(weapon.id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
          <div>
            - Aggiungi costellazione{' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#15803d"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#15803d"
              className="size-6 mx-2"
              //onClick={() => handlePlusButton(weapon.id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <div>
            - Aggiungi talenti{' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#15803d"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#15803d"
              className="size-6 mx-2"
              //onClick={() => handlePlusButton(weapon.id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
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
                //onClick={() => handlePlusButton(weapon.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
            <div className="flex flex-wrap overflow-y-scroll h-20 mt-2 border border-2 rounded-lg">
              {/* {weapon.materials.length > 0 &&
                            weapon.materials.map((mater) => ( */}
              <div
                // key={mater.id}
                className="flex flex-col mx-4 my-2 items-center w-16"
              >
                {/* {mater.image !== null ? (
                                  <img
                                    src={mater.image}
                                    className="w-14 border border-yellow-600 rounded-lg w-14 mx-auto"
                                  />
                                ) : null} */}
                <p className="text-center pt-1 truncate hover:text-clip w-14">
                  {/* {mater.name} */}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#dc2626"
                  className="size-5 mx-2"
                  //   onClick={() => {
                  //     handleRemoveMaterial(
                  //       weapon.id,
                  //       mater.id,
                  //       token
                  //     )
                  //   }}
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {/* ))} */}
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
                //onClick={() => handlePlusButton(weapon.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
            <div className="flex flex-wrap overflow-y-scroll h-20 mt-2 border border-2 rounded-lg">
              {/* {weapon.materials.length > 0 &&
                            weapon.materials.map((mater) => ( */}
              <div
                // key={mater.id}
                className="flex flex-col mx-4 my-2 items-center w-16"
              >
                {/* {mater.image !== null ? (
                                  <img
                                    src={mater.image}
                                    className="w-14 border border-yellow-600 rounded-lg w-14 mx-auto"
                                  />
                                ) : null} */}
                <p className="text-center pt-1 truncate hover:text-clip w-14">
                  {/* {mater.name} */}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#dc2626"
                  className="size-5 mx-2"
                  //   onClick={() => {
                  //     handleRemoveMaterial(
                  //       weapon.id,
                  //       mater.id,
                  //       token
                  //     )
                  //   }}
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {/* ))} */}
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
                //onClick={() => handlePlusButton(weapon.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
            <div className="flex flex-wrap overflow-y-scroll h-20 mt-2 border border-2 rounded-lg">
              {/* {weapon.materials.length > 0 &&
                            weapon.materials.map((mater) => ( */}
              <div
                // key={mater.id}
                className="flex flex-col mx-4 my-2 items-center w-16"
              >
                {/* {mater.image !== null ? (
                                  <img
                                    src={mater.image}
                                    className="w-14 border border-yellow-600 rounded-lg w-14 mx-auto"
                                  />
                                ) : null} */}
                <p className="text-center pt-1 truncate hover:text-clip w-14">
                  {/* {mater.name} */}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#dc2626"
                  className="size-5 mx-2"
                  //   onClick={() => {
                  //     handleRemoveMaterial(
                  //       weapon.id,
                  //       mater.id,
                  //       token
                  //     )
                  //   }}
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {/* ))} */}
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
      </div>
    </div>
  )
}

export default SingleCharacter
