const broadcastChannel = new BroadcastChannel('messages');

self.addEventListener('push', function(event) {
    const data = event.data.json();
    console.log('Push event!! ', data)
    self.registration.showNotification(data.title, {
        body: data.body,
    });

    broadcastChannel.postMessage({ event: 'push', data });


});
