
import { useState, useEffect } from 'react'
import {getall,getbyid} from '../communication/FolderComunication';

import  {useSelector} from 'react-redux'


const useFolder = (codeInstitution) => {

    const [folder, setfolder] = useState(null)
    const [error, setError] = useState(null)
    const [isLoadingFolder, setisLoadingFolder] = useState(true)
  
    
  useEffect(() => {
    const fetchData = async () => {
       
      try {
        const coreResponse = await getall(codeInstitution) // results response (state,data,etc) //pasar el active aca
     
        if (coreResponse.state) {
          let i = 0
          var transformFolder = coreResponse.data.map(function(folder) {
            return { ...folder, id: i++ } 
            
          })
          setfolder(transformFolder)
        } else setfolder([])
        setisLoadingFolder(false)
      } catch (error) {
        setError(error)
        setisLoadingFolder(false)
      }
    }

    fetchData()
  }, [])// si pasamos un array vacio solo solo sera renderizadao una sola vez similar al component didmount es decir no se actualizara en cada momento

  return { folder, setfolder, isLoadingFolder, error }
}
export default useFolder
