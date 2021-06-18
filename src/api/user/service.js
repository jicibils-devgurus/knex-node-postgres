module.exports = fastify => {
  const { knex } = fastify;

  const service = {};

  service.createTables = () => {
    return knex.schema
      .hasTable('users')
      .then(function (exists) {
        if (!exists) {
          return knex.schema
            .withSchema('public')
            .createTable('users', function (table) {
              table.increments();
              table.string('name');
              table.timestamps();
            });
        }
      })
      .then(() =>
        knex.schema.hasTable('companies').then(function (exists) {
          if (!exists) {
            return knex.schema
              .withSchema('public')
              .createTable('companies', function (table) {
                table.increments();
                table.string('name');
                table
                  .integer('user_id')
                  .unsigned()
                  .notNullable()
                  .references('id')
                  .inTable('users')
                  .onDelete('cascade');
                table.timestamps();
              });
          }
        })
      )
      .catch(error => error);
  };

  service.createUser = user =>
    knex('users').returning(['id', 'name']).insert(user);

  service.getUserById = userId => knex('users').where('id', userId);

  service.deleteUser = userId => knex('users').where('id', userId).del();

  service.createCompany = company =>
    knex('companies').returning('*').insert(company);

  service.joinUsersCompanies = () =>
    knex
      .select(['users.name', 'companies.name as company_name'])
      .from('users')
      .innerJoin('companies', 'users.id', 'companies.user_id');

  service.createManyUsers = users =>
    knex.transaction(function (trx) {
      return Promise.all(
        users.map(function (user) {
          return trx.returning('*').insert(user).into('users');
        })
      );
    });

  service.createManyCompanies = companies =>
    knex.transaction(function (t) {
      return knex('companies')
        .transacting(t)
        .returning('*')
        .insert(companies)
        .then(t.commit)
        .catch(function (e) {
          t.rollback();
          throw e;
        });
    });

  service.getAllUsers = (perPage, currentPage) => {
    let page = currentPage;
    if (page < 1) page = 1;
    const offset = (page - 1) * perPage;
    return Promise.all([
      knex.count('* as count').from('users').first(),
      knex.select('*').from('users').offset(offset).limit(perPage)
    ])
      .then(([total, rows]) => {
        const count = total.count;
        const pagination = {
          total: count,
          perPage: perPage,
          offset: offset,
          to: offset + rows.length,
          lastPage: Math.ceil(count / perPage),
          currentPage: page,
          from: offset,
          data: rows
        };

        return pagination;
      })
      .catch(err => {
        console.log('🚀 ~ err', err);
        return err;
      });
  };

  service.deleteCompany = companyId =>
    knex('companies').where('id', companyId).del();

  return service;
};
