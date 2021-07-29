module.exports = {
    saveOne: (key, value, options = false) => {
        let ttl = null;
        const now = new Date();

        if (options?.ttl) { 
            ttl = options.ttl; 
        };
        
        localStorage.setItem(key, JSON.stringify({ ttl: now.getTime() + ttl , value}));
    },

    getOne: (key) => {
        let packet = localStorage.getItem(key);

        if (!packet) { 
            throw new Error(`Item does not exist, please check your key: > ${key}`); 
        }

        packet = JSON.parse(packet);
        
        let now = new Date();

        if (now.getTime() > packet.ttl) {
            return null;
        };
        return packet.value;
    }
}
