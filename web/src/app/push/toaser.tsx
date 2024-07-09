'use client'
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PushNotificationComponent = () => {
    useEffect(() => {
        navigator.serviceWorker.addEventListener('message', event => {
            if (event.data && event.data.type === 'PUSH_NOTIFICATION_RECEIVED') {
                toast(`${event.data.title}: ${event.data.body}`);
            }
        });
    }, []);

    return (
        <div>
            <ToastContainer />
        </div>
    );
};

export default PushNotificationComponent;
