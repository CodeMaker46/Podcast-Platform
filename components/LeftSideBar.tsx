import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const LeftSideBar = () => {
  return (
    <section className='left_sidebar'>
        <nav className='flex flex-col gap-6'>

            <Link href="" className='flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center'>
                <Image src="/icons/logo.svg" alt="logo" width={23} height={27}/>
                <p className='text-24 font-extrabold text-white max-lg:hidden'>Podcaster</p>
            </Link>

            {[
              {
                route:'/profile',
                label:'Profile',
                imageURL:'/icons/microphone.svg'
              },
              {
                route:'/home',
                label:'Home',
                imageURL:'/icons/home.svg'
              },

            
            ].map((route,label)=>{
               return <Link href={route}>
                {label}
               </Link>
            })}

        </nav>
    </section>
  )
}

export default LeftSideBar