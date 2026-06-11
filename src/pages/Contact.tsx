
import { useEffect } from 'react'
import ContactComp from '../components/ContactComp'

const Contact = () => {
    useEffect(()=>{
       window.scrollTo({
        top:0,
        behavior:'smooth'
       })
    },[])
  return (
    <ContactComp/>
  )
}

export default Contact