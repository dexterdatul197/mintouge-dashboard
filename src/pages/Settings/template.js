
export const GetProductsCode = 
`// How to get Products List using API Keys
try {
  const response = await axios.get(
    "https://brand.api.vaultik.com/product",
    {
      page: 0,
      size: 15,
      pubKey: \`\${apiPublicKey}\`
    },
    {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${apiSecretKey}\`
    }
  );

  // ...
} catch (error) {
  throw error;
}
`;

export const AddProductCode = 
`// How to get Products List using API Keys
try {
  const response = await axios.get(
    "https://brand.api.vaultik.com/product",
    {
      page: 0,
      size: 15,
      pubKey: \`\${apiPublicKey}\`
    },
    {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${apiSecretKey}\`
    }
  );

  // ...
} catch (error) {
  throw error;
}
`;


export const EmbedMiniWebCode = 
`// How to embed mini-web into your index.html
// Simply copy the following code and paste into your <body> of index.html
<!-- 
<body>
  ...
-->
    <script
    type="text/javascript"
    src="https://cdn.vaultik.com/mini-web/production/vaultik.js"
    brand=\`\${apiPublicKey}\`
  />
<!-- 
  ... 
</body >
-->
`;

export const Templates = [
  {
    title: 'How to get Products',
    code: GetProductsCode,
  },
  {
    title: 'How to add a new Product',
    code: GetProductsCode,
  },
  {
    title: 'How to add a new Product',
    code: GetProductsCode,
  },
]