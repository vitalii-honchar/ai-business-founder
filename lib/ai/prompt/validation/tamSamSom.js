import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Perform comprehensive market analysis with balanced validation criteria:
    - Market Size Validation:
        - Calculate realistic market size with growth potential
        - Assess market expansion opportunities
        - Document market entry strategies
        - Validate revenue optimization potential
        - Evaluate target revenue pathways
        - Calculate achievable market share with optimization

    - Market Accessibility Assessment:
        - Map resource optimization opportunities
        - Identify channel expansion possibilities
        - Document geographic opportunities
        - List regulatory navigation strategies
        - Assess competitive advantages

    - Achievable Market Share:
        - Calculate realistic capture with growth potential
        - Document resource optimization strategies
        - Assess competitive differentiation
        - Create optimized timeline projections
        - Apply balanced risk assessment

    - Market Landscape Analysis:
        - Use Serviceable Obtainable Market (SOM) with growth potential
        - Map expanding demographic segments
        - Calculate optimistic yet achievable growth rates
        - Assess revenue optimization paths
        - Recommend value-based pricing
        - Identify growth opportunities
        - List risk mitigation strategies
        - Provide optimized timeline for revenue achievement

    - Target Revenue Feasibility Analysis:
        - Validate monthly target revenue with growth potential
        - Calculate optimal market penetration rate
        - Assess timeline optimization opportunities
        - Map resource optimization requirements
        - Document scaling strategies
        - Evaluate pricing optimization impact
        - Calculate efficient customer acquisition
        - Assess operational optimization
        - Identify revenue accelerators
        - Provide growth-oriented projections

- Use realistic calculations with growth potential
- Focus on evidence-based metrics with optimization
- Document clear opportunities
- Maintain balanced yet optimistic projections
- Use SOM values with growth potential for market analysis
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
    "main_restrictions": "",
    "target_revenue_feasibility": {
      "is_achievable": false,
      "timeline_months": 0,
      "required_market_share": 0,
      "monthly_penetration_rate": 0,
      "customer_acquisition_requirements": {
        "monthly_new_customers": 0,
        "estimated_cac": 0,
        "total_acquisition_cost": 0
      },
      "operational_requirements": [],
      "revenue_blockers": [],
      "monthly_projections": [
        {
          "month": 0,
          "revenue": 0,
          "customer_base": 0,
          "market_share": 0
        }
      ],
      "main_challenges": [],
      "recommended_adjustments": []
    }
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