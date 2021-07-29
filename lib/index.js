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
            localStorage.removeItem(key);
            return null;
        };
        return packet.value;
    },

    deleteOne: (key) => {
        localStorage.removeItem(key);
    },

    saveMany: (items) => {
        items.forEach(({ key, value, options }) => {
            module.exports.saveOne(key, value, options);
        });
    },

    getMany: (keys) => {
        const results = [];
        keys.forEach(key => {
            const item = module.exports.getOne(key);
            results.push(item);
        });
        return results;
    },

    getAll: () => {
        const results = [];
        Object.keys(localStorage).forEach(key => {
            const item = module.exports.getOne(key);
            results.push(item);
        });
        return results;
    },

    deleteMany: (keys) => {
        keys.forEach(key => {
            module.exports.deleteOne(key);
        });
    },

    deleteAll: () => {
        localStorage.clear();
    },

    pruneExpired: () => {
        Object.keys(localStorage).forEach(key => {
            module.exports.getOne(key);
        });
    },
}
