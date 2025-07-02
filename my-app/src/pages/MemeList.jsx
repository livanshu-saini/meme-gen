import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import img1 from '../assets/newimg-1.jpg';
import img2 from '../assets/newimg-2.jpg';
import img3 from '../assets/newimg-3.jpg';
import img4 from '../assets/newimg-4.jpg';
import img5 from '../assets/newimg-5.jpg';
import img6 from '../assets/newimg-6.jpg';


const memeImages=[
    {id:1,src:img1},
    {id:2,src:img2},
    {id:3,src:img3},
    {id:4,src:img4},
    {id:5,src:img5},
    {id:6,src:img6},
]

export default function MemeList() {
  const navigate=useNavigate()
  return (
    <div>
      <h1 className='text-4xl font-mono font-bold pt-4 text-center text-black'>Welcome to <span className='text-[#8730C9]'>MEME-GEN</span> </h1>
      <div className="fixed top-0 right-0  pt-6 p-6 text-white">
        <button className='bg-[#8730C9] p-2 mx-2 rounded-md font-mono border border-black border-3' onClick={()=>navigate('/signup')}>Sign-Up</button>
        <button className='bg-[#8730C9] p-2 mx-2 rounded-md font-mono border border-black border-3' onClick={()=>navigate('/login')}>Login</button>
      </div>
      <h3 className='text-2xl pt-3 text-center font-mono text-[#8730C9] font-semibold'>Create and Customize your own memes!!</h3>
      <div className="flex flex-col md:flex-row w-full min-h-screen items-center justify-center bg-[#FFF4FF] p-6">
        {/* Carousel Section - 60% */}
        <div className="w-full md:w-3/5 p-4 overflow-hidden">
          <div className="relative w-full">
            <div className="flex w-max animate-slideX gap-6">
              {memeImages.map((img, index) => (
                <img
                  key={index}
                  src={img.src}
                  alt={`Meme ${index + 1}`}
                  className="w-[300px] h-[500px] object-cover rounded-md border border-black border-3 shadow-md cursor-pointer transition-transform hover:scale-105"
                  style={{ boxShadow: '0 4px 10px #8730C9' }}
                  onClick={() => navigate('/signup')}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Text Section - 40% */}
        <div className="w-full md:w-2/5 p-6 text-center md:text-left">
          <h2 className=" text-5xl font-extrabold text-[#8730C9] font-mono mb-4 mt-[-20px] transition-all duration-500 hover:tracking-wide">
            Discover the Meme Magic!
          </h2>
          <p className="text-lg font-[60px] text-gray-700 font-mono mb-4">
            Sign up now to unlock hilarious memes, share laughs, and join our vibrant meme community.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="mt-4 px-6 py-2 bg-[#8730C9] text-white font-semibold font-mono border-2 border-black rounded hover:bg-[#9d4edd] transition"
          >
            Get Started ➜
          </button>
        </div>
      </div>
    


    </div>
  )
}
