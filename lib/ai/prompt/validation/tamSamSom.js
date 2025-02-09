import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Perform comprehensive market analysis with strict validation criteria:
    - Market Size Validation:
        - Calculate conservative market size
        - Verify growth rate claims
        - Assess market saturation
        - Document entry barriers
        - Validate revenue potential

    - Market Accessibility Assessment:
        - Map resource requirements
        - Evaluate channel accessibility
        - Document geographic constraints
        - List regulatory limitations
        - Assess competition intensity

    - Realistic Market Share:
        - Calculate conservative capture
        - Document resource limitations
        - Assess competition impact
        - Create timeline projections
        - Apply risk adjustments

    - Market Landscape Analysis:
        - Document market size metrics
        - Map demographic segments
        - Calculate growth rates
        - Recommend pricing strategy
        - Identify opportunities
        - List market risks

- Use conservative calculations
- Focus on evidence-based metrics
- Document clear limitations
- Maintain balanced projections
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