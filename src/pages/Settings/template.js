
export const getCode = (title, isDev, apiPublicKey, apiSecretKey) => {
  const endpoint = isDev ? "https://dev-brand.api.vaultik.com" : "https://brand.api.vaultik.com";

  switch (title) {
    case "mini-web": {
      return getMiniWebCode({ isDev, apiPublicKey });
    }

    case "pricing": {
      return getPricingCode({ isDev, endpoint, apiSecretKey });
    }

    case "minting": {
      return getMintingCode({ isDev, endpoint, apiSecretKey });
    }

    case "fetch-rewards": {
      return getFetchRewardCode({ isDev, endpoint, apiSecretKey });
    }

    default: {
      return getMiniWebCode({ isDev, endpoint, apiPublicKey });
    }
  }
};

export const getPricingCode = ({ endpoint, apiSecretKey }) =>
  `// How to get Estimated Price using API Keys
try {
  const response = await axios.get(
    "${endpoint}/digital-passport/{productSKU}/fees", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer ${apiSecretKey}"
      }
    },
  );

  // ...
} catch (error) {
  throw error;
}
`;

export const getMintingCode = ({ isDev, endpoint, apiSecretKey }) =>
  `// How to Mint Insurance as a NFT using API Keys
try {
  const response = await axios.post(
    "${endpoint}/digital-passport", {
      productInfo: {
        productKey: productSKU_As_A_String, // string
      }, 
      consumerInfo: {
          "email": "consumer@gmail.com",
          "phone": "+0 000-000-0000",
          "firstName": "First",
          "lastName": "Name"
      },
      chain: "${isDev ? "goerli" : "polygon"}", // Blockchain
      dpp: productDigitalPassport, // string
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer ${apiSecretKey}"
      }
    },
  );

  // ...
} catch (error) {
  throw error;
}
`;

export const getOrdersCode = ({ endpoint, apiSecretKey }) =>
  `// How to get all transactins
try {
  const response = await axios.get(
    "${endpoint}/digital-passport/", {
      params: { // pagination
        page: 0,
        size: 15,
      },
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer ${apiSecretKey}"
      }
    },
  );

  // ...
} catch (error) {
  throw error;
}
`;

export const getProductsCode = ({ endpoint, apiPublicKey, apiSecretKey }) =>
  `// How to get Products List using API Keys
try {
  const response = await axios.get(
    "${endpoint}/product",
    {
      page: 0,
      size: 15,
      pubKey: ${apiPublicKey}
    },
    {
      "Content-Type": "application/json",
      "Authorization": "Bearer ${apiSecretKey}"
    }
  );

  // ...
} catch (error) {
  throw error;
}
`;

export const getAddProductCode = ({ endpoint, apiPublicKey, apiSecretKey }) =>
  `// How to get Products List using API Keys
try {
  const response = await axios.get(
    "${endpoint}/product",
    {
      page: 0,
      size: 15,
      pubKey: ${apiPublicKey}
    },
    {
      "Content-Type": "application/json",
      "Authorization": "Bearer ${apiSecretKey}"
    }
  );

  // ...
} catch (error) {
  throw error;
}
`;


export const getMiniWebCode = ({ isDev, apiPublicKey }) =>
  `// How to embed mini-web into your index.html
// Simply copy the following code and paste into your <body> of index.html
<!-- 
<body>
  ...
-->
  <script
    type="text/javascript"
    src="https://cdn.vaultik.com/mini-web/${isDev ? "dev" : "production"}/vaultik.js"
    brand="${apiPublicKey}"
  />
<!-- 
  ... 
</body >
-->
`;


export const getFetchRewardCode = ({ endpoint, apiSecretKey }) =>
  `// How to get all transactins
try {
  const response = await axios.get(
    "${endpoint}/reward/valid", {
      params: { // pagination
        email: "consumer@gmail.com",
        page: 0,
        size: 15,
      },
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer ${apiSecretKey}"
      }
    },
  );

  // ...
} catch (error) {
  throw error;
}
`;