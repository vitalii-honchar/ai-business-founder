import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Use the TAM-SAM-SOM analysis to structure your analysis:
  - Total Addressable Market (TAM): Overall revenue opportunity if the product achieves 100% market share.
    - Number of users
    - Amount of money (calculated as Number of users * Price)
    - Price per user
    - Main restrictions (describe the restriction applied)
  - Serviceable Available Market (SAM): The segment of the TAM targeted by the product's services, constrained by user restrictions.
    - Number of users
    - Amount of money (calculated as Number of users * Price)
    - Price per user
    - Main restrictions (describe the restriction applied)
  - Serviceable Obtainable Market (SOM): The portion of the SAM that the product can realistically capture.
    - Number of users
    - Amount of money (calculated as Number of users * Price)
    - Price per user
    - Main restrictions (describe the restriction applied)
  - Size of market ready to pay for an app: Reduce SOM by applying typical rates for similar applications.
    - Number of users
    - Amount of money (calculated as Number of users * Price)
    - Conversion rate used to reduce SOM
    - Main restrictions (describe the restriction applied)
  - Paid users: Estimate the number of paid users by applying a typical conversion rate to "Size of market ready to pay for an app."
    - Number of users
    - Amount of money (calculated as Number of users * Price)
    - Conversion rate used to calculate paid users
    - Main restrictions (describe the restriction applied)
- Based on the TAM-SAM-SOM analysis use Market Landscape analysis to provide insights on the market size, demographics, growth rate, pricing, opportunities, risks.
- Based on the TAM-SAM-SOM analysis and Market Landscape analysis provide answer on the question: Who is my ideal client?
- Based on the TAM-SAM-SOM analysis and Market Landscape analysis provide answer on the question: What is a market size for ideal clients?
- Based on the TAM-SAM-SOM analysis and Market Landscape analysis provide answer on the question: How has the market changed during the last couple years?
`.trim();

const schema = {
  "total_addressable_market": {
    "number_of_users": 0,
    "amount_of_money": 0,
    "price_per_user": 0,
    "main_restrictions": ""
  },
  "serviceable_available_market": {
    "number_of_users": 0,
    "amount_of_money": 0,
    "price_per_user": 0,
    "main_restrictions": ""
  },
  "serviceable_obtainable_market": {
    "number_of_users": 0,
    "amount_of_money": 0,
    "price_per_user": 0,
    "main_restrictions": ""
  },
  "market_ready_to_pay": {
    "number_of_users": 0,
    "amount_of_money": 0,
    "conversion_rate": 0,
    "main_restrictions": ""
  },
  "paid_users": {
    "number_of_users": 0,
    "amount_of_money": 0,
    "conversion_rate": 0,
    "main_restrictions": ""
  },
  "market_landscape": {
    "market_size": 0,
    "demographics": [
      {
        "name": "",
        "value": ""
      }
    ],
    "growth_rate": 0,
    "pricing": [
      {
        "name": "",
        "value": ""
      }
    ],
    "opportunities": [
      ""
    ],
    "risks": [
      ""
    ]
  },
};

export default validationPrompts(instructions, schema);