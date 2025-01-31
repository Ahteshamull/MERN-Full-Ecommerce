import React, { useState } from 'react'

import UploadProduct from './../components/UploadProducts';

const AllProducts = () => {
  const [uploadProduct, setUploadProduct] = useState(false)
  return (
    <div>

    <div className="bg-white py-2 px-4 flex justify-between items-center">
      <h2 className="font-bold text-lg ">All Products</h2>
        <button
      onClick={()=>setUploadProduct(true)}
          className="px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-blue-700 outline-none bg-transparent hover:bg-blue-700 text-blue-700 hover:text-white transition-all duration-300">
        Upload Products
      </button>
      </div>
      
      {/* 
      ============Upload product component */}

      {
        uploadProduct && (
        
           
              <UploadProduct onClose={() => setUploadProduct(false)} />
          
      
        )
      }
      {/* <UploadProduct/> */}

    </div>
  );
}

export default AllProducts