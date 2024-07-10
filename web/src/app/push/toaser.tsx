'use client'
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PushNotificationComponent = () => {
    const broadcastChannel = new BroadcastChannel('messages');

    useEffect(() => {
            broadcastChannel.onmessage = (event) => {
            console.log('Main thread received message:', event.data);
            toast(event.data.title);
         };

        }, []);

    return (
        <div>
            <ToastContainer />
        </div>
    );
};

export default PushNotificationComponent;
