exports.up = function(knex) {
    return knex.schema.createTable("skills", (table) => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('description').notNullable()
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("skills");
};