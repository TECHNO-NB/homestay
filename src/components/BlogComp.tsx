
import  { useEffect, useState } from 'react'
import {
  ArrowRight,

} from "lucide-react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const BlogComp = () => {
const [blog,setblog]=useState([]);
const navigate=useNavigate();

useEffect(()=>{
 const getServices=async()=>{
  try {
    const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blogs`);
    setblog(res.data)
  } catch (error) {
    
  }
 }
 getServices();
},[])


  return (
     <section id="services" className="py-24 md:py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* heading */}
        <div className="text-center mb-16">
          {/* <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
            What We Do
          </p> */}

          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Magar Drainage Blog
          </h2>

          {/* <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From emergency blockages to planned maintenance — we have the
            expertise and equipment to handle every drainage challenge.
          </p> */}
        </div>

        {/* cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {blog.map((svc:any, i) => (
            <div
              key={i}
              className="group bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-500 transition duration-300 hover:-translate-y-1"
            >

              {/* image */}
              <div className="h-60 overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${svc?.image}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* content */}
              <div className="p-6">


                <h3 className="text-xl font-bold text-white mb-2">
                  {svc?.title}
                </h3>

              <p className="text-slate-400 text-sm mb-4">
                  {svc?.content?.length > 80
                    ? svc.content.slice(0, 80) + "..."
                    : svc?.content}
                </p>

                <div onClick={()=>navigate(`/blog/${svc.id}`)} className="flex cursor-pointer items-center text-cyan-400 text-sm font-semibold gap-1 group-hover:gap-2 transition-all ">
                  Learn more <ArrowRight size={16} />
                </div>

              </div>

            </div>
          ))}

        </div>
      </div>

        {/* <div className="flex items-center justify-center mt-10 text-cyan-400 text-sm font-semibold gap-1 cursor-pointer  hover:gap-2 transition-all">
                   More <ArrowRight size={16} />
                </div> */}
    </section>

  )
}

export default BlogComp