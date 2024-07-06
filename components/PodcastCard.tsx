import React from 'react'
import Image from 'next/image'

const PodcastCard = ({
    imgURL,title,description,podcastId
}:{
    podcastId:number,
    description:string,
    imgURL:string,
    title:string,
}) => {
  return (
    <div className='cursor-point'>
        <figure className='flex flex-col gap-2'>
            <Image src={imgURL} alt={title} width={174} height={174} className='aspect-sqaure h-fit w-full rounded-xl 2xl:size-[200px]'/>
        </figure>
        <div className='flex flex-col'>
          <h1 className='text-white-1 truncate text-16 font-bold'>{title}</h1>
          <h2 className='text-white-4 truncate text-14 font-normal capitalize'>{description}</h2>
        </div>
    </div>
  )
}

export default PodcastCard