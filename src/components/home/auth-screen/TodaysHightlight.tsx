'use client'
import { CldVideoPlayer } from 'next-cloudinary';

const TodaysHightlight = () => {
    return (
        <div className='w-full md:w-3/4 mx-auto'>
            <CldVideoPlayer
            width='960'
            height='540'
            className='rounded-md'
            src='highlight-vid-kusn-1683'
            />
        </div>
    )
}

export default TodaysHightlight