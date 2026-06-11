import { useEffect } from "react"
import BlogComp from "../components/BlogComp"




const Blog = () => {
    useEffect(()=>{
       window.scrollTo({
        top:0,
        behavior:'smooth'
       })
    },[])
  return (
    <>
    <BlogComp/>
    </>
  )
}

export default Blog