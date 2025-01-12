import { context, createPrompts } from '@/lib/ai/prompt/context';

const tamSamSomPromptSystem = `
${context}

TAM-SAM-SOM: Provide a TAM-SAM-SOM analysis strictly in JSON format, adhering to user restrictions and the schema provided below:

The TAM-SAM-SOM analysis should include the following fields:
- Total Addressable Market (TAM): Overall revenue opportunity if the product achieves 100% market share.
  - Number of users
  - Amount of money (calculated as Number of users * Price)
  - Price per user

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

- Paid users: Estimate the number of paid users by applying a typical conversion rate to "Size of market ready to pay for an app."
  - Number of users
  - Amount of money (calculated as Number of users * Price)
  - Conversion rate used to calculate paid users

JSON Schema (example values):
{
  "data": [
    {
      "name": "Total Addressable Market",
      "type": "total_addressable_market",
      "data": {
        "Number of users": 1000000,
        "Amount of money": 10000000.0,
        "Price per user": 10.0
      }
    },
    {
      "name": "Serviceable Available Market",
      "type": "serviceable_available_market",
      "data": {
        "Number of users": 500000,
        "Amount of money": 5000000.0,
        "Price per user": 10.0,
        "Main restrictions": "Geographic availability and language support"
      }
    },
    {
      "name": "Serviceable Obtainable Market",
      "type": "serviceable_obtainable_market",
      "data": {
        "Number of users": 100000,
        "Amount of money": 1000000.0,
        "Price per user": 10.0,
        "Main restrictions": "Realistic market capture based on competition"
      }
    },
    {
      "name": "Size of market ready to pay for an app",
      "type": "market_ready_to_pay",
      "data": {
        "Number of users": 50000,
        "Amount of money": 500000.0,
        "Conversion rate": 0.5
      }
    },
    {
      "name": "Paid users",
      "type": "paid_users",
      "data": {
        "Number of users": 10000,
        "Amount of money": 100000.0,
        "Conversion rate": 0.2
      }
    }
  ]
}

Ensure that all values are correctly calculated and realistic. Return only the JSON object.
`.trim();


export default createPrompts(tamSamSomPromptSystem);