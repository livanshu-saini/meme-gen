// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Meme from './Meme';
function Dashboard() {
    const { currentUser, logout } = useAuth();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                // Fetch the user's document from Firestore using their UID
                const userDocRef = doc(db, 'users', currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    setUserData(userDocSnap.data());
                } else {
                    console.log("No such document!");
                }
            }
        };
        fetchUserData();
    }, [currentUser]);
    if (!userData) return <p>Loading...</p>; // Wait for data to load

    const Email = userData.email;
    return (
        <Meme email={Email}/>
    );
}
export default Dashboard;
