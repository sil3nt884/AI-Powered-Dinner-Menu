'use client'
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PushNotificationComponent = () => {
    const broadcastChannel = new BroadcastChannel('messages');

    useEffect(() => {
            broadcastChannel.addEventListener('message', (event) => {
                toast(event.data.title);
            });


            return () => broadcastChannel.addEventListener('message',()=> {})
        }, []);

    return (
        <div>
            <ToastContainer />
        </div>
    );
};

export default PushNotificationComponent;
