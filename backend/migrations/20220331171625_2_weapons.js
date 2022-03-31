exports.up = function(knex) {
    return knex.schema.createTable("weapons", (table) => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('damage').notNullable()
        table.string('critial').notNullable()
        table.integer('penetration').notNullable()
        table.integer('encumberance').notNullable()
        table.string('price').notNullable()
        table.string('image')
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("weapons");
};