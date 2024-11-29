module.exports = {
    name: 'ready',
    once: true,
    execute(client) {  
        setTimeout(() => {
            try {
                client.user.setPresence({
                    activities: [{ name: 'STATUS BOT', type: 3 }], // 3 'WATCHING' / 0 'Playing' / 1 'Streaming'/ 2 'Listening" / 5 'Competing'
                    status: 'online' // 'dnd' do not deride / 'online'
                });
            } catch (error) {
                console.error('Error setting presence:', error);
            }
        }, 5000);
    },
};
