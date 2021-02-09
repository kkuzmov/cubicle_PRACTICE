// CHECKED!!

const config = {
    development: {
        PORT: 5000,
        SALT_ROUNDS: 10,
        SECRET: 'examSecrets'
    },
    production: {
        PORT: 80,
        SALT_ROUNDS: 10,
        SECRET: 'examSecrets'
    }
};

module.exports = config[process.env.NODE_ENV.trim()];


// ВНИМАВАЙ С DEPENDENCIES!!!



