import Client from "shopify-buy";

const client = Client.buildClient({
  domain: "sandywyper-co-uk.myshopify.com",
  storefrontAccessToken: "8b066968ace6c0f3399eae24531d0293"
});

export default client;