const schema = require('./user/schema');

module.exports = async fastify => {
  const controller = require('./user/controller')(fastify);

  fastify.route({
    method: 'POST',
    url: '/tables',
    schema: schema.createTablesSchema,
    handler: controller.createTables
  });

  fastify.route({
    method: 'GET',
    url: '/users/:userId',
    schema: schema.getUserByIdSchema,
    handler: controller.getUserById
  });

  fastify.route({
    method: 'POST',
    url: '/users',
    schema: schema.createUserSchema,
    handler: controller.createUser
  });

  fastify.route({
    method: 'DELETE',
    url: '/users/:userId',
    schema: schema.deleteUserSchema,
    handler: controller.deleteUser
  });

  fastify.route({
    method: 'POST',
    url: '/companies',
    schema: schema.createCompanySchema,
    handler: controller.createCompany
  });

  fastify.route({
    method: 'GET',
    url: '/users-companies',
    schema: schema.joinUsersCompaniesSchema,
    handler: controller.joinUsersCompanies
  });

  fastify.route({
    method: 'POST',
    url: '/many-users',
    schema: schema.createManyUsersSchema,
    handler: controller.createManyUsers
  });

  fastify.route({
    method: 'GET',
    url: '/users',
    schema: schema.getAllUsersSchema,
    handler: controller.getAllUsers
  });

  fastify.route({
    method: 'POST',
    url: '/many-companies',
    schema: schema.createManyCompaniesSchema,
    handler: controller.createManyCompanies
  });

  fastify.route({
    method: 'DELETE',
    url: '/companies/:companyId',
    schema: schema.deleteCompanySchema,
    handler: controller.deleteCompany
  });
};
