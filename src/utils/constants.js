export const Storage = {
  OptedUser: 'optedUser'
};

export const HeaderIDs = {
  PRODUCT_NAME: 'productName',
  REWARD_NAME: 'title',
  DPP: 'dpp',
  PRICE: 'price',
  USER: 'user',
  INSURANCE: 'insurance',
  PRODUCT_URL: 'productUrl',
  REWARD_ACTIVE: 'isActive',

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
    uri: 'https://goerli.etherscan.io/address/',
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

export const RewardHeaders = [
  {
    id: HeaderIDs.REWARD_NAME,
    title: 'Reward Name',
  },
  {
    id: 'category',
    title: 'Category',
  },
  {
    id: HeaderIDs.REWARD_ACTIVE,
    title: 'Active',
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