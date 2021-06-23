exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('companies')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('companies').insert([
        {
          name: 'Devgurus',
          user_id: 2
        },
        {
          name: 'DMI',
          user_id: 1
        },
        {
          name: 'Google',
          user_id: 3
        }
      ]);
    });
};
