/* eslint-disable no-unused-vars */
/* eslint-disable standard/object-curly-even-spacing */

import { useState, useEffect } from 'react'
import {  getall} from '../communication/boxComunication'
import  {useSelector} from 'react-redux'


const useBox = (institution, active) => { // dentro de este parentesis colocas los parametros que va a tener el metodo  en este caso seria active
  const [Box, setBox] = useState(null)// recuperas el JSon
  const [error, setError] = useState(null)// al principio sera null y despues de llamar al fetch este estado se actualizara
  const [isLoadingBox, setLoadingBox] = useState(true)
 

  useEffect(() => {
    const fetchData = async () => {
       
      try {
        const coreResponse = await getall(institution, active) // results response (state,data,etc) //pasar el active aca
     
        if (coreResponse.state) {
          let i = 0
          var transformBox = coreResponse.data.map(function(Box) {
            return { ...Box, id: i++ } // para cada valor que viene en data creas un nuevo arreglo en donde se asigna un id
          })
          setBox(transformBox)
        } else setBox([])
        setLoadingBox(false)
      } catch (error) {
        setError(error)
        setLoadingBox(false)
      }
    }

    fetchData()
  }, [])// si pasamos un array vacio solo solo sera renderizadao una sola vez similar al component didmount es decir no se actualizara en cada momento

  return { Box, setBox, isLoadingBox, error }
}

export default useBox
