module.exports = {
    HOST: "mysql-8-db",
    USER: "root",
    PASSWORD: "secret",
    DB: "dbtest",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}