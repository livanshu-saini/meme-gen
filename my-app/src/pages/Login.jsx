// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // On successful login, we will be redirected by our App's auth listener
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError("Failed to log in. Check your email and password.");
        }
    };

    return (
    <div className="min-h-screen flex items-center justify-center bg-center bg-cover h-screen relative "style={{
    backgroundImage: "url('https://cdn.wallpapersafari.com/78/0/Emv7dc.jpg')"}}>
        <div className="bg-[#FFF4FF]  border-black border-3 p-8 rounded-xl shadow-md w-full max-w-md" style={{ boxShadow: '0 4px 10px #8730C9' }}>
            <div className='flex'>
            <h2 className="text-3xl font-mono  font-bold mb-6 text-center text-[#8730C9] mx-[120px]">Log In</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700 font-mono">Email</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 mt-1 text-[#8730C9] border border-slate-300 font-mono rounded-md focus:outline-none focus:ring-2 focus:ring-[#8730C9]"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-mono">Password</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 mt-1 text-[#8730C9] border border-slate-300 font-mono rounded-md focus:outline-none focus:ring-2 focus:ring-[#8730C9]"
                />
            </div>
            <button
                type="submit"
                className="w-full border border-3 font-mono border-black bg-[#8730C9] text-white font-semibold py-2 rounded-md transition duration-200"
            >
                Log In
            </button>
            <p className='text-[#8730C9] text-center font-mono'>New User ?</p>
            <button className="w-full bg-[#8730C9] border border-3 border-black font-mono text-white font-semibold py-2 rounded-md transition duration-200" onClick={()=>navigate('/signup')}>SIGN UP</button>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </form>
        </div>
   </div>

    );
}
export default Login;
