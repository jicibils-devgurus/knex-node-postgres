exports.up = function (knex) {
  return knex.schema.hasColumn('companies', 'user_id').then(function (exists) {
    if (!exists) {
      knex.schema.withSchema('public').table('companies', function (table) {
        table
          .integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('cascade');
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema('public').table('companies', function (table) {
    table.dropColumn('user_id');
  });
};
