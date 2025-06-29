import React from 'react'
import { Link } from 'react-router-dom'
import img1 from '../assets/img-1.jpg';
import img2 from '../assets/img-2.jpg';
import img3 from '../assets/img-3.jpg';
import img4 from '../assets/img-4.jpg';
import img5 from '../assets/img-5.jpg';
import img6 from '../assets/img-6.jpg';
import img7 from '../assets/img-7.jpg';
import img8 from '../assets/img-8.jpg';
import img9 from '../assets/img-9.jpg';
import img10 from '../assets/img-10.jpg';

const memeImages=[
    {id:1,src:img1},
    {id:2,src:img2},
    {id:3,src:img3},
    {id:4,src:img4},
    {id:5,src:img5},
    {id:6,src:img6},
    {id:7,src:img7},
    {id:8,src:img8},
    {id:9,src:img9},
    {id:10,src:img10}
]
export default function MemeList() {
  return (
    <div>
      <h1 className='text-4xl pt-4 text-center text-emerald-400'>Welcome to Meme-Gen</h1>
      <h3 className='text-2xl pt-3 text-center'>Create and Customize your own memes</h3>
      <div className='grid grid-cols-3 gap-4 p-6'>
        {memeImages.map((meme)=>(
            <Link key={meme.id} to={`/edit/${meme.id}`}>
                <img src={meme.src} alt={`Meme ${meme.id}`} className="w-full rounded shadow-md" />
            </Link>
        ))}
      </div>
    </div>
  )
}
