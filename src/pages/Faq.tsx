
import { useEffect } from 'react'
import FaqComp from '../components/FaqComp'

const Faq = () => {
    useEffect(()=>{
       window.scrollTo({
        top:0,
        behavior:'smooth'
       })
    },[])
  return (
    <FaqComp/>
  )
}

export default Faq