
import { useEffect } from 'react'
import WhyusComp from '../components/WhyusComp'

const Whyus = () => {
    useEffect(()=>{
       window.scrollTo({
        top:0,
        behavior:'smooth'
       })
    },[])
  return (
    <WhyusComp/>
  )
}

export default Whyus