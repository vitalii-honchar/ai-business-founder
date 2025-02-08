import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Use the TAM-SAM-SOM analysis with extremely strict validation criteria:
  - Total Addressable Market (TAM):
    - Use worst-case scenario market calculations
    - Challenge all growth rate assumptions
    - Assess market saturation impact critically
    - Identify all possible entry barriers
    - Question revenue potential assumptions
    - Consider market decline scenarios
  - Serviceable Available Market (SAM):
    - Challenge resource requirement assumptions
    - Question channel accessibility claims
    - Maximize geographic constraints impact
    - Emphasize regulatory limitations
    - Analyze competition intensity worst-case
    - Consider market access barriers
  - Serviceable Obtainable Market (SOM):
    - Use minimum capture estimates
    - Maximize resource-based limitations
    - Apply aggressive competition impact
    - Use conservative timeline projections
    - Apply maximum risk adjustments
    - Question market share assumptions
  - Market Readiness Analysis:
    - Challenge payment willingness assumptions
    - Maximize price sensitivity impact
    - Identify all possible adoption barriers
    - Emphasize market education costs
    - Question purchase decision factors
    - Consider worst-case adoption scenarios
- Provide exhaustive risk identification
- Use minimum numerical estimates
- Focus on resource-based limitations
- Emphasize market timing risks
- Challenge all positive assumptions
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
    ],
    "market_readiness": {
      "payment_willingness": "",
      "price_sensitivity": "",
      "adoption_barriers": [],
      "education_needs": [],
      "decision_factors": []
    },
    "risk_adjustments": {
      "market_timing": "",
      "resource_adequacy": "",
      "competition_impact": "",
      "regulatory_risks": []
    }
  },
};

export default validationPrompts(instructions, schema);