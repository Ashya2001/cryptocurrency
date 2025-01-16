
import NodeCache from "node-cache";


const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 }); 


function getFromCache(key) {
    const value = cache.get(key);
    return value || null;
}


function saveToCache(key, value, time = 60) {
    cache.set(key, value, time);
}


function deleteFromCache(key) {
    cache.del(key);
}


function clearCache() {
    cache.flushAll();
}

export default {
    getFromCache,
    saveToCache,
    deleteFromCache,
    clearCache,
};
