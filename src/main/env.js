const { Notyf } = require('notyf');

const env = {
    server: {
        domain: "192.168.1.8",
        port: 80,
        toString()
        {
            return `http://${this.domain}:${this.port}`;
        }
    },
    openedRoomUID: "001",
    notyfconfig: 
    {
        duration: 10000,
        position: {
            x: 'center',
            y: 'top',
        },
        types: [
            {
                type: 'error',
                dismissible: true
            },
            {
                type: 'success',
                dismissible: true
            }
        ]
    }
};

module.exports = env;