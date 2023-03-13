export default class HTTP {
    static request(url, conf, options) {
        return fetch(url, conf)
            .then(res => {
                return res
            })
            .catch(err => {
                throw err
            })
    }
}