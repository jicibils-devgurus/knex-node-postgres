const errorResponse = {
  type: 'object',
  properties: {
    errors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description:
              'unique identifier for this particular occurrence of the problem'
          },
          code: {
            type: 'string',
            enum: ['001'],
            description: `> an internal specific error code:
             - 001: Request schema validation error
             
             `
          },
          status: {
            type: 'string',
            description: 'the HTTP status code applicable to this problem'
          },
          title: {
            type: 'string',
            description: 'a short, human-readable summary of the problem'
          },
          detail: {
            type: 'string',
            description: 'a human-readable explanation'
          },
          meta: {
            type: 'object',
            description:
              'a meta object containing non-standard meta-information',
            additionalProperties: true
          }
        },
        required: ['status']
      }
    }
  },
  required: ['errors']
};

const createTablesSchema = {
  title: 'Create some examples tables',
  description: 'Method to create some tables',

  response: {
    200: {
      type: 'object',
      properties: {},
      additionalProperties: true,
      required: []
    },
    404: errorResponse,
    '5xx': errorResponse
  }
};

const getUserByIdSchema = {
  title: 'Get User by Id',
  description: 'Method to get a particular user by id',

  response: {
    200: {
      type: 'object',
      properties: {},
      additionalProperties: true,
      required: []
    },
    404: errorResponse,
    '5xx': errorResponse
  }
};

const createUserSchema = {
  title: 'create new user',
  description: 'Method to create a new user',

  response: {
    200: {
      type: 'object',
      properties: {},
      additionalProperties: true,
      required: []
    },
    404: errorResponse,
    '5xx': errorResponse
  }
};

const deleteUserSchema = {
  title: 'delete  user',
  description: 'Method to delete an user and companies in cascade',

  response: {
    200: {
      type: 'object',
      properties: {},
      additionalProperties: true,
      required: []
    },
    404: errorResponse,
    '5xx': errorResponse
  }
};

const createCompanySchema = {
  title: 'create new company',
  description: 'Method to create a new company',

  response: {
    200: {
      type: 'object',
      properties: {},
      additionalProperties: true,
      required: []
    },
    404: errorResponse,
    '5xx': errorResponse
  }
};

const joinUsersCompaniesSchema = {
  title: 'join Users Companies',
  description: 'Method to return a collection with the companies of each user',

  response: {
    200: {
      type: 'object',
      properties: {},
      additionalProperties: true,
      required: []
    },
    404: errorResponse,
    '5xx': errorResponse
  }
};

const createManyUsersSchema = {
  title: 'create many users',
  description:
    'Method to create many users to test transactions without call commit and rollback manually',

  response: {
    200: {
      type: 'object',
      properties: {},
      additionalProperties: true,
      required: []
    },
    404: errorResponse,
    '5xx': errorResponse
  }
};

const getAllUsersSchema = {
  title: 'get all users',
  description: 'Method to get all users but paginated',

  response: {
    200: {
      type: 'object',
      properties: {},
      additionalProperties: true,
      required: []
    },
    404: errorResponse,
    '5xx': errorResponse
  }
};

const createManyCompaniesSchema = {
  title: 'create many companies',
  description:
    'Method to create many users to test transactions calling commit and rollback manually',

  response: {
    200: {
      type: 'object',
      properties: {},
      additionalProperties: true,
      required: []
    },
    404: errorResponse,
    '5xx': errorResponse
  }
};

const deleteCompanySchema = {
  title: 'delete  comapny',
  description: 'Method to delete a company',

  response: {
    200: {
      type: 'object',
      properties: {},
      additionalProperties: true,
      required: []
    },
    404: errorResponse,
    '5xx': errorResponse
  }
};

module.exports = {
  createTablesSchema,
  getUserByIdSchema,
  createUserSchema,
  deleteUserSchema,
  createCompanySchema,
  joinUsersCompaniesSchema,
  createManyUsersSchema,
  getAllUsersSchema,
  createManyCompaniesSchema,
  deleteCompanySchema
};
