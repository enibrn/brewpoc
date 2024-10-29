const emailElements = [
  {
    type: 'Control',
    scope: '#/properties/email'
  }
];

const passwordElements = [
  {
    type: 'Control',
    scope: '#/properties/password'
  }
];

const usernameElements = [
  {
    type: 'Control',
    scope: '#/properties/username'
  }
];

export const uiLoginSchema = {
  type: 'VerticalLayout',
  elements: [
    ...emailElements,
    ...passwordElements
  ]
};

export const uiSignupSchema = {
  type: 'VerticalLayout',
  elements: [
    ...usernameElements,
    ...emailElements,
    ...passwordElements
  ]
};

export const uiProfileSchema = {
  type: 'VerticalLayout',
  elements: [
    ...usernameElements,
    ...emailElements
  ]
};