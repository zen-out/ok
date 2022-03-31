exports.up = function(knex) {
    return knex.schema.createTable("armour", (table) => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.integer('rating').notNullable()
        table.integer('encumberance').notNullable()
        table.string('image')
        table.string('price').notNullable()
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("armour");
};