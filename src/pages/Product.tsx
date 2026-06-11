// @ts-nocheck
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


import pic20 from "../../public/pic20.jpeg";
import pic21 from "../../public/pic21.jpeg";
import pic22 from "../../public/pic22.jpeg";
import pic23 from "../../public/pic23.jpeg";
import pic24 from "../../public/pic24.jpeg";
import pic25 from "../../public/pic25.jpeg";
import axios from "axios";

const images = [pic20, pic21, pic22, pic23, pic24, pic25];

// 🔥 animation variants
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Product = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageList, setImageList] = useState(images); 

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

 useEffect(() => {
    const fetchProductImg = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/gallery/typeproduct`
        );

        const prefix = import.meta.env.VITE_BACKEND_URL;

        if (res.data) {
          const newImages = res.data.map(
            (val) => `${prefix}/${val.image}`
          );

          setImageList((prev) => [...newImages, ...prev]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductImg();
  }, []);
  return (
    <section className="min-h-screen py-24 px-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-light text-black mb-3">
          <span className="text-[#c9a84c] italic">Product</span>
        </h2>
        <p className="text-gray-400 text-sm">Explore product</p>
      </motion.div>

      {/* GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {imageList?.map((img, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ scale: 1.03 }}
            className="group relative overflow-hidden rounded-2xl border border-[#1a1a1e] bg-black"
            onClick={() => setSelectedImage(img)}
          >
            {/* IMAGE */}
            <motion.img
              src={img}
              alt={`gallery-${i}`}
              className="w-full h-65 object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-400 flex items-center justify-center">
              <span className="text-white text-sm tracking-wide">
                View Image
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* IMAGE CONTAINER */}
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white text-3xl font-light hover:opacity-70"
              >
                ✕
              </button>

              {/* FULL IMAGE */}
              <img
                src={selectedImage}
                alt="preview"
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Product;
