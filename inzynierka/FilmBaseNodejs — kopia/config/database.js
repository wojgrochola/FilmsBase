var mongo = process.env.VCAP_SERVICES;
var port = process.env.PORT || 3030;
var conn_str = "";

if (mongo) {
    var env = JSON.parse(mongo);
    if (env['mongodb-2.4']) {
        mongo = env['mongodb-2.4'][0]['credentials'];
        if (mongo.url) {
            conn_str = mongo.url;
        } else {
            console.log("No mongo found");
        }
    } else {
        conn_str = 'mongodb://localhost:27017';
    }
} else {
    conn_str = 'mongodb://localhost:27017';
}

module.exports = conn_str

