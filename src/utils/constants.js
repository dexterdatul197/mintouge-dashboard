export const Storage = {
  OptedUser: 'optedUser'
};

export const HeaderIDs = {
  PRODUCT_NAME: 'productName',
  DPP: 'dpp',
  PRICE: 'price',
  USER: 'user',
  INSURANCE: 'insurance',
  PRODUCT_URL: 'productUrl',

  CLIENT_NAME: 'name',
  CLIENT_EMAIL: 'email',
  CLIENT_PHONE: 'phone',
  CLIENT_ADDRESS: 'address',
};

export const OrderHeaders = [
  {
    id: HeaderIDs.PRODUCT_NAME,
    title: 'Product Name',
  },
  {
    id: HeaderIDs.DPP,
    title: 'Digital Passport',
    hasLink: true,
    uri: 'https://opensea.io/assets/matic/0x305803cd4ed8d28ea3ace264a6eaa33b6d71b146/',
  },
  {
    id: HeaderIDs.PRICE,
    title: 'Value',
  },
  {
    id: HeaderIDs.USER,
    title: 'User',
  },
  {
    id: HeaderIDs.INSURANCE,
    title: 'Insurance',
  },
];

export const ProductHeaders = [
  {
    id: HeaderIDs.PRODUCT_NAME,
    title: 'Product Name',
  },
  {
    id: HeaderIDs.PRICE,
    title: 'Value',
  },
  {
    id: HeaderIDs.PRODUCT_URL,
    title: 'Product URL',
    hasLink: true,
    uri: '',
  },
];

export const ClientHeaders = [
  {
    id: HeaderIDs.CLIENT_NAME,
    title: 'Full Name',
  },
  {
    id: HeaderIDs.CLIENT_EMAIL,
    title: 'Email',
  },
  {
    id: HeaderIDs.CLIENT_PHONE,
    title: 'Phone',
  },
  {
    id: HeaderIDs.CLIENT_ADDRESS,
    title: 'Address',
  },
];