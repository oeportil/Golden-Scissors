import Link from 'next/link'
import React from 'react'

const EntradasBlog = ({entrada}) => {
   const {titulo, contenido, id_blog} = entrada
  return (
    <div className='bg-white mt-4 p-4'>        
        <div className='text-center'>
            <h3 className='text-lg font-semibold'>{titulo}</h3>
            <div className='pb-4'>
                <p className='text-slate-600 line-clamp text-justify'>{contenido}</p>                
            </div>
            <hr className='mb-2' />
            <Link className='text-slate-600 p-2' href={`/blog/${id_blog}`}>Ir a la entrada</Link>
        </div>
    </div>
  )
}

export default EntradasBlog
