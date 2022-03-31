exports.up = function(knex) {
    return knex.schema.createTable("items", (table) => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('description').notNullable()
        table.string('target_stat').notNullable()
        table.integer('amount').notNullable()
        table.string('image')
        table.integer('encumberance')
        table.string('price')
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("items");
};