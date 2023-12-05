module.exports = {
    type: "sqlite",
    database: "./src/database/db.sqlite",
    miagrations: [
        "./src/database/migrations"
    ],
    cli: {
        miagrationsDir: "./src/database/migrations"
    }
}