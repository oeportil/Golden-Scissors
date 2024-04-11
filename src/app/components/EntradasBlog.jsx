import React from 'react'

const EntradasBlog = ({entrada}) => {
   const {titulo, contenido} = entrada
  return (
    <div className='bg-white mt-4 p-2'>        
        <div className='text-center'>
            <h3 className='text-lg font-semibold'>{titulo}</h3>
            <div>
                <p className='text-slate-600'>{contenido}</p>
            </div>
        </div>
    </div>
  )
}

export default EntradasBlog
