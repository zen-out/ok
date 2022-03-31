exports.up = function(knex) {
    return knex.schema.createTable("users", (table) => {
        table
            .increments('id')
            .primary()
        table.string('email').unique()
        table.string('password')
        table.boolean('gm')
        table.string('gmail_id')
        table.string('gmail_access')
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("users");
};