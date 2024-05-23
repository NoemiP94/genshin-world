import { useDispatch, useSelector } from 'react-redux'
import { getRegion } from '../redux/action/regions'
import { useEffect } from 'react'
import { getAllUsers } from '../redux/action'

const ListRegion = () => {
  const data = useSelector((state) => state.region.list)

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('dati', data)
    dispatch(getRegion())
  }, [dispatch])

  return (
    <>
      <ul role="list" className="divide-y divide-gray-100">
        <p className="text-white">Lista regioni</p>
        {data.content &&
          data.content.map((region) => (
            <li key={region.id}>
              <p>Nome: {region.name}</p>
              <p>Tipo di visione: {region.visionType}</p>
            </li>
          ))}
      </ul>
    </>
  )
}

export default ListRegion
