exports.up = function (knex) {
  return knex.schema.hasTable('users').then(function (exists) {
    if (!exists) {
      return knex.schema
        .withSchema('public')
        .createTable('users', function (table) {
          table.increments();
          table.string('name');
          table.timestamp('created_at').defaultTo(knex.fn.now());
          table.timestamp('updated_at').defaultTo(knex.fn.now());
        });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema('public').dropTable('users');
};
