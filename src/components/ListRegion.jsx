import { useDispatch, useSelector } from 'react-redux'
import { getRegion } from '../redux/action/regions'
import { useEffect } from 'react'

const ListRegion = () => {
  const regionData = useSelector((state) => state.region.list)

  const dispatch = useDispatch()
  console.log('dati', regionData.content)
  useEffect(() => {
    dispatch(getRegion)
  }, [dispatch])
  return (
    <>
      <ul role="list" className="divide-y divide-gray-100">
        <p className="text-white">Lista regioni</p>
        {regionData.content &&
          regionData.content.map((region) => (
            <li key={region.id}>
              <p>Nome: {region.name}</p>
              <p>Tipo di visione: {region.visionType}</p>
              <p>Descrizione: {region.description}</p>
              <p>Archon: {region.archon}</p>
            </li>
          ))}
      </ul>
    </>
  )
}

export default ListRegion
