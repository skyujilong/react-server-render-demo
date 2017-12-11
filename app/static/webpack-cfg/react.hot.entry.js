const entryConfig = require('./entry.conf.js');
module.exports = {
    entry:(()=>{
        let entries = entryConfig.entry;
        let key, cfg = {};
        for (key in entries){
            cfg[key] = ['babel-polyfill', 'react-hot-loader/patch', entries[key]];
        }
        return cfg;
    })()
}