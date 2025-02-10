import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Perform comprehensive market analysis with growth-oriented criteria:
    - Market Size Validation:
        - Calculate ambitious market size with expansion potential
        - Assess market leadership opportunities
        - Document market domination strategies
        - Validate revenue maximization potential
        - Evaluate premium revenue pathways
        - Calculate achievable market dominance

    - Market Leadership Assessment:
        - Map resource optimization multipliers
        - Identify channel domination possibilities
        - Document geographic expansion opportunities
        - List competitive advantage accelerators
        - Assess market disruption potential

    - Market Share Leadership:
        - Calculate ambitious capture with acceleration potential
        - Document resource multiplication strategies
        - Assess competitive breakthroughs
        - Create accelerated timeline projections
        - Apply growth-oriented assessment

    - Market Domination Analysis:
        - Use Serviceable Obtainable Market (SOM) with breakthrough potential
        - Map high-growth demographic segments
        - Calculate ambitious yet achievable growth rates
        - Assess revenue maximization paths
        - Recommend premium value pricing
        - Identify market leadership opportunities
        - List competitive advantage accelerators
        - Provide optimized timeline for market leadership

- Use ambitious calculations with breakthrough potential
- Focus on evidence-based metrics with acceleration
- Document clear leadership opportunities
- Maintain balanced yet ambitious projections
- Use SOM values with multiplication potential for market analysis
- Provide a conversion rate for the serviceable obtainable market in a number between 0 and 1
- Provide an explanation for the conversion rate
- Provide a growth rate for the serviceable obtainable market in a number between 0 and 1
- Provide an explanation for the growth rate
- In the demography section provide:
    - Age range
    - Occupation
    - Yearly income
    - Geographic location
    - Education level
    - Psychographic profile
    - Readiness to pay for the proposed problem solution
    - Other relevant information
`.trim();

const schema = {
  "total_addressable_market": {
    "number_of_users": 0,
    "main_restrictions": ""
  },
  "serviceable_available_market": {
    "number_of_users": 0,
    "main_restrictions": ""
  },
  "serviceable_obtainable_market": {
    "number_of_users": 0,
    "main_restrictions": ""
  },
  "market_landscape": {
    "conversion_rate": 0,
    "conversion_rate_explanation": "",
    "demographics": [
      {
        "name": "",
        "value": ""
      }
    ],
    "growth_rate": 0,
    "growth_rate_explanation": "",
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
      "adoption_barriers": [
        ""
      ],
      "education_needs": [
        ""
      ],
      "decision_factors": [
        ""
      ]
    },
    "risk_adjustments": {
      "market_timing": "",
      "resource_adequacy": "",
      "competition_impact": "",
      "regulatory_risks": [
        ""
      ]
    }
  },
};

export default validationPrompts(instructions, schema);