"use client"
import { podcastData } from '@/constants'
import React from 'react'
import PodcastDetails from './podcast/[podcastId]/page';
import PodcastCard from '@/components/PodcastCard';

const page = () => {
  return (
    <div className=' flex flex-col gap-9'>
      
      <section className='flex flex-col gap-5'>
        <h1 className='text-20 font-bold text-white-1'>Trending Podcasts</h1>
        {podcastData.map(({id,description,imgURL,title})=>(
          <PodcastCard
          key={id}
          imgURL={imgURL}
          title={title}
          description={description}
          podcastId={id}

          />
        ))}
      </section>

    </div>
  )
}

export default page