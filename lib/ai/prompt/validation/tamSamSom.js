import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Use the TAM-SAM-SOM analysis with strict validation criteria:
  - Total Addressable Market (TAM):
    - Use conservative market calculations
    - Validate growth rate assumptions
    - Assess market saturation impact
    - Consider entry barriers
    - Verify revenue potential
  - Serviceable Available Market (SAM):
    - Validate resource requirements
    - Assess channel accessibility
    - Consider geographic constraints
    - Evaluate regulatory limitations
    - Analyze competition intensity
  - Serviceable Obtainable Market (SOM):
    - Use conservative capture estimates
    - Consider resource-based limitations
    - Assess competition impact
    - Make timeline-based projections
    - Apply risk adjustments
  - Market Readiness Analysis:
    - Evaluate payment willingness
    - Assess price sensitivity
    - Analyze adoption barriers
    - Consider market education needs
    - Examine purchase decision factors
- Provide clear risk identification
- Use conservative numerical estimates
- Focus on resource-based feasibility
- Consider market timing impact
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