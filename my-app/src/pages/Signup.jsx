// src/pages/Signup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            // 1. Create the user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Create a user document in Firestore
            // We use user.uid as the unique document ID
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                role: 'user',
                createdAt: Timestamp.fromDate(new Date())
            });

            // 3. Navigate to the login page on success
            navigate('/login');

        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
    <div className="min-h-screen flex items-center justify-center bg-center bg-cover h-screen relative" style={{
    backgroundImage: "url('https://cdn.wallpapersafari.com/78/0/Emv7dc.jpg')",
  }}>
        
        <div className=" bg-[#FFF4FF]  border-black border-3 p-8 rounded-xl  w-full max-w-md" style={{ boxShadow: '0 4px 10px #8730C9' }}>
            <div className='flex'>
            <h2 className="text-3xl font-mono font-bold mb-6 text-center text-[#8730C9] mx-[100px]">SIGN UP</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
            {/*<div>
                <label className="block font-mono text-gray-700">Email</label>
                <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname"
                required
                className="w-full px-4 py-2 mt-1 font-mono text-[#8730C9] border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8730C9]"
                />
            </div>*/}
            <div>
                <label className="block font-mono text-gray-700">Email</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 mt-1 font-mono text-[#8730C9] border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8730C9]"
                />
            </div>
            <div>
                <label className="block font-mono text-gray-700">Password</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full font-mono px-4 py-2 mt-1 text-[#8730C9] border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8730C9]"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-[#8730C9] font-mono border border-3 border-black text-white font-semibold py-2 rounded-md transition duration-200"
            >
                Sign Up
            </button>
            <p className='text-[#8730C9] font-mono text-center'>Already a User ?</p>
            <button className="w-full border font-mono border-3 border-black bg-[#8730C9] text-white font-semibold py-2 rounded-md transition duration-200" onClick={()=>navigate('/login')}>Login</button>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </form>
        </div>
    </div>
    );
}
export default Signup;
