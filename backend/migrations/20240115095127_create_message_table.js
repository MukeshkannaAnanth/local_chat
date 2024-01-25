/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('message', function (table) {
        table.increments('id').primary(); // Auto-incrementing primary key
        table.integer('sender_id').notNullable();
        table.integer('receiver_id').notNullable();
        table.string('type', 300).notNullable();
        table.longtext('message').notNullable();
        table.longtext('img').notNullable();
        table.integer('unread').notNullable();
        table.string('time', 1000).notNullable();
        table.string('incoming', 50).notNullable();
        table.string('outgoing', 50).notNullable();
        table.string('subtype', 100).notNullable();
        table.longtext('chatmaster_id').notNullable();
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('message');
};
