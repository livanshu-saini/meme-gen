import React, { useEffect, useState } from 'react';
import { fetchDone, fetching, selectIsLoading } from '../slice/LoadingSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import domtoimage from 'dom-to-image-more';
import Draggable from 'react-draggable';
 
 
export default function Meme({email}) {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
 
  const [img, setImg] = useState('');
  const [allImages, setAllImages] = useState([]);
 
  const [page, setPage] = useState(0);
  const [inputText,setInputText]=useState("");
  const [AllTexts, setAllTexts] = useState([]);
 
  const imagesPerPage = 9;
  const startIndex = page * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = allImages.slice(startIndex, endIndex);
 
 
const memeRef = useRef();
 
const downloadImage = () => {
  if (!memeRef.current) return;
 
  domtoimage.toPng(memeRef.current)
    .then((dataUrl) => {
      const link = document.createElement('a');
      link.download = 'meme.png';
      link.href = dataUrl;
      link.click();
    })
    .catch((error) => {
      console.error('dom-to-image-more error:', error);
    });
};
 
 
  function handleImage(url)
  {
    setImg(url);
    setAllTexts([]);
  }
  const handleText = () => {
    if (inputText.trim() !== '') {
      const newItem = {
        id: Date.now(),      
        text: inputText,
        defaultPos: { x: 350, y: 50 }
      };
    setAllTexts(prev => [...prev, newItem]);
    setInputText('');
    }
  };
  useEffect(() => {
    dispatch(fetching());
    async function fetchImages() {
      try {
        const response = await fetch('https://api.imgflip.com/get_memes');
        const json = await response.json();
        const data = json.data.memes;
        const urls = data.map((item) => item.url);
        setAllImages(urls);
      } catch (err) {
        console.error('Error fetching the data:', err);
      } finally {
        dispatch(fetchDone());
      }
    }
 
    fetchImages();
  }, [dispatch]);
 
  if (isLoading) {
    return <div className="text-center mt-10 text-xl text-gray-800">Loading...</div>;
  }
 
  
 
  return (
    <div>
    <div className='flex justify-between items-center px-6 py-4'>
    
      <h2 className='text-4xl text-black font-bold font-mono'>
        Welcome <span className='text-[#8730C9] text-3xl'>{email.split('@')[0]}!!</span>
      </h2>

     
      <div className='flex gap-4'>
      <label className="cursor-pointer font-mono pt-3 font-bold inline-block bg-[#8730C9] border-3 border-black text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">
     Upload Image!
    <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setImg(reader.result);
              setAllTexts([]);
            };
            reader.readAsDataURL(file);
          }
        }}
        className="hidden"
      />
  </label>
        <button className='px-5 py-3 bg-[#8730C9] text-white font-semibold font-mono border-2 border-black rounded'>
          Your Memes
        </button>
        <button
          className='px-3 py-3 bg-[#8730C9] text-white font-semibold font-mono border-2 border-black rounded'
          onClick={() => navigate('/')}
        >
          Signout
        </button>
      </div>
    </div>
    <div className="bg-gradient-to-br  bg-[#FFF4FF] min-h-screen w-full flex flex-col md:flex-row justify-center items-start p-8 text-gray-800">
     
      <div className="md:w-1/2 w-full flex-row justify-center items-center p-4">
        <div className='flex'>
        <p className='font-mono text-md text-[#8730C9] ml-10'>Just Drag The Caption!!!</p>
        <button className='text-[#8730C9] ml-5 mb-5 rounded-md border-1 border-gray-500 px-[6px]' onClick={()=>setImg('')}>Reset</button></div>
        <div ref={memeRef} className="relative bg-white p-4 rounded-xl shadow-md inline-block">
          {img ? (
            <img
              src={img}
              alt="Selected Meme"
              className=" max-w-md rounded-xl shadow border border-gray-300 "
            />
          ) : (
            <p className="text-lg text-gray-500">Click a meme to preview it here.</p>
          )}
          {
            AllTexts.map((item) => (  
            <Draggable
                key={item.id}
                defaultPosition={item.defaultPos}
                bounds="parent"
            >
              <div
                style={{position: 'absolute',top: 0,left: 0,pointerEvents: 'auto',userSelect: 'none',
                background: 'transparent',border: 'none',boxShadow: 'none',}}
              >
              <p style={{fontFamily: 'Arial, sans-serif',fontSize: '40px',color: 'black',fontWeight: 'bold',
                background: 'transparent', WebkitTextStroke: '0px', textShadow: 'none',boxShadow: 'none',border: 'none',}}>
               {item.text}
              </p>
          </div>
          </Draggable>
 
            ))
          }
        </div>
        <div className='p-5 flex justify-center items-center g'>
            <input
            className='p-2 border-2 rounded-md border-black'
            type="text"
            value={inputText}
            placeholder='Enter the caption & drag'
            onChange={(e)=>setInputText(e.target.value)}
            />
            <br/>
            <button className="bg-[#8730c9e4] p-3 hover:bg-[#8730c9c5] rounded-xl m-2.5" onClick={handleText}>Add</button>
            <button
              onClick={downloadImage}
              className="ml-2 px-4 py-2 bg-[#8730c9e4] text-white rounded hover:bg-green-700"
            >
                Download Meme
            </button>
        </div>
      </div>
 
      <div className="md:w-1/2 w-full px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {currentImages.map((url, i) => (
            <img
              key={i}
              src={url}
              alt="meme"
              onClick={()=>handleImage(url)}
              className="h-32 w-full object-cover rounded-xl border border-gray-300 shadow-sm bg-white hover:scale-105 hover:shadow-lg cursor-pointer transition-all duration-300"
            />
          ))}
        </div>
 
 
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={page === 0}
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            className={`flex items-center gap-2 px-4 py-2 rounded font-medium shadow ${
              page === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#8730C9] text-white hover:bg-[#8730c9da]'
            }`}
          >
             Prev
          </button>
 
          <p className="text-sm text-gray-600">Page {page + 1} of {Math.ceil(allImages.length / imagesPerPage)}</p>
 
          <button
            disabled={endIndex >= allImages.length}
            onClick={() => setPage((prev) => prev + 1)}
            className={`flex items-center gap-2 px-4 py-2 rounded font-medium shadow ${
              endIndex >= allImages.length
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                :  'bg-[#8730C9] text-white hover:bg-[#8730c9da]'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}