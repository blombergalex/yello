import React from 'react'
import { Moirai_One } from 'next/font/google'

const moiraiOne = Moirai_One({
  weight: '400',
  subsets: ['latin'],
})

const header = () => {
  return (
    <div className='p-2'>
      <h1 className={`${moiraiOne.className} text-yellow-500 text-4xl`}>Yello</h1>
    </div>
  )
}

export default header
