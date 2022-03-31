module.exports = {
    development: {
        client: "postgresql",
        connection: {
            database: "i_miss_dnd",
            user: "postgres",
            password: "postgres",
        },
        migrations: {
            tableName: './migrations'
        }
    },

};