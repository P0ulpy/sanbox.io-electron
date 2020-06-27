const env = {
    server: {
        domain: "localhost",
        port: 80,
        toString()
        {
            return `http://${this.domain}:${this.port}`;
        }
    },
    openedRoomUID: "001",
};

module.exports = env;