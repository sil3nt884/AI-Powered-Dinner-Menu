'use client'
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PushNotificationComponent = () => {
    useEffect(() => {
            navigator.serviceWorker.addEventListener('push', event => {
                const data = event.data.json();
                toast(`${event.data.title}: ${event.data.body}`);

            });
            return () => navigator.serviceWorker.removeEventListener('push', () => {
            })
        }, []);

    return (
        <div>
            <ToastContainer />
        </div>
    );
};

export default PushNotificationComponent;
