/* eslint-disable no-empty */
module.exports = fastify => {
  const service = require('./service')(fastify);

  const createTables = async (request, reply) => {
    try {
      await service.createTables();
      reply.code(200).send();
    } catch (error) {
      reply.code(500).send(error);
    }
  };

  const createUser = async (request, reply) => {
    const { user } = request.body;

    try {
      const newUser = await service.createUser(user);

      reply.code(200).send({ data: { user: newUser } });
    } catch (error) {
      reply.code(500).send(error);
    }
  };

  const getUserById = async (request, reply) => {
    const { userId } = request.params;

    try {
      const user = await service.getUserById(userId);

      reply.code(200).send({ data: { user } });
    } catch (error) {
      reply.code(500).send(error);
    }
  };

  const deleteUser = async (request, reply) => {
    const { userId } = request.params;

    try {
      const deletedUser = await service.deleteUser(userId);

      reply.code(200).send({ data: { user: deletedUser } });
    } catch (error) {
      reply.code(500).send(error);
    }
  };

  const createCompany = async (request, reply) => {
    const { company } = request.body;

    try {
      const newCompany = await service.createCompany(company);

      reply.code(200).send({ data: { company: newCompany } });
    } catch (error) {
      reply.code(500).send(error);
    }
  };

  const joinUsersCompanies = async (request, reply) => {
    try {
      const userCompanies = await service.joinUsersCompanies();

      reply.code(200).send({ data: userCompanies });
    } catch (error) {
      reply.code(500).send(error);
    }
  };

  /**
   * Transactions without call commit and rollback manually
   */
  const createManyUsers = async (request, reply) => {
    const { users } = request.body;
    try {
      const newUsers = await service.createManyUsers(users);

      reply.code(200).send({ data: { users: newUsers } });
    } catch (error) {
      reply.code(500).send(error);
    }
  };

  /**
   * Transactions calling commit and rollback manually
   */
  const createManyCompanies = async (request, reply) => {
    const { companies } = request.body;

    try {
      const newCompanies = await service.createManyCompanies(companies);
      reply.code(200).send({ data: { companies: newCompanies } });
    } catch (error) {
      reply.code(500).send(error);
    }
  };

  const getAllUsers = async (request, reply) => {
    try {
      const { perPage = 10, currentPage = 1 } = request.query;

      const paginatedUsers = await service.getAllUsers(perPage, currentPage);
      reply.code(200).send({ data: { users: paginatedUsers } });
    } catch (error) {
      reply.code(500).send(error);
    }
  };

  // Test cascade
  const deleteCompany = async (request, reply) => {
    const { companyId } = request.params;

    try {
      const deletedCompany = await service.deleteCompany(companyId);

      reply.code(200).send({ data: { company: deletedCompany } });
    } catch (error) {
      reply.code(500).send(error);
    }
  };

  return {
    getUserById,
    createUser,
    createTables,
    deleteUser,
    createCompany,
    joinUsersCompanies,
    createManyUsers,
    getAllUsers,
    createManyCompanies,
    deleteCompany
  };
};
