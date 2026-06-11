
import { useEffect } from 'react'
import Services from '../components/Services'

const Service = () => {
    useEffect(()=>{
       window.scrollTo({
        top:0,
        behavior:'smooth'
       })
    },[])
  return (
   <Services/>
  )
}

export default Service