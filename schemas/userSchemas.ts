const emailProperties = {
  email: {
    type: 'string',
    format: 'email',
    minLength: 6,
    maxLength: 127,
    title: 'Email'
  }
};

const passwordProperties = {
  password: {
    type: 'string',
    minLength: 8,
    maxLength: 256,
    title: 'Password'
  }
};

const usernameProperties = {
  username: {
    type: 'string',
    minLength: 3,
    maxLength: 127,
    title: 'Username'
  }
};

export const loginSchema = {
  type: 'object',
  properties: {
    ...emailProperties,
    ...passwordProperties
  },
  required: ['email', 'password']
};

export const signupSchema = {
  type: 'object',
  properties: {
    ...emailProperties,
    ...passwordProperties,
    ...usernameProperties
  },
  required: ['username', 'email', 'password']
};

export const profileSchema = {
  type: 'object',
  properties: {
    ...emailProperties,
    ...usernameProperties
  },
  required: ['username', 'email']
};
