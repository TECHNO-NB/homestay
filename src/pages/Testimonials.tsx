
import { useEffect } from 'react'
import TestimonialsComp from '../components/TestimonialsComp'

const Testimonials = () => {
    useEffect(()=>{
       window.scrollTo({
        top:0,
        behavior:'smooth'
       })
    },[])
  return (
    <TestimonialsComp/>
  )
}

export default Testimonials