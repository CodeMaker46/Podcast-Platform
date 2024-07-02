'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { sidebarLinks } from '../constants/index';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const LeftSideBar = () => {

  const pathname = usePathname()
  const route = useRouter()

  return (
    <section className='left_sidebar'>
        <nav className='flex flex-col gap-6'>

            <Link href="" className='flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center'>
                <Image src="/icons/logo.svg" alt="logo" width={23} height={27}/>
                <p className='text-24 font-extrabold text-white max-lg:hidden'>Podcaster</p>
            </Link>

            {sidebarLinks.map(({route,label,imgURL})=>{
              const isActive = pathname === route || pathname.startsWith(`${route}/`);
              return <Link href={route} key={label} className={cn('flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start',
              {'bg-nav-focus border-r-4 border-orange-1':isActive})}>

                <Image src={imgURL} alt={label} width={24} height={24}/>
                <p>{label} </p>

              </Link>
            })}

        </nav>
    </section>
  )
}

export default LeftSideBar