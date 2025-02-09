import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Perform comprehensive market analysis with strict validation criteria:
    - Market Size Validation:
        - Calculate conservative market size
        - Verify growth rate claims
        - Assess market saturation
        - Document entry barriers
        - Validate revenue potential
        - Evaluate target revenue feasibility
        - Calculate required market share for target revenue

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
        - Use Serviceable Obtainable Market (SOM) for market size metrics
        - Map demographic segments based on obtainable market
        - Calculate growth rates for SOM
        - Assess target revenue achievability
        - Recommend pricing strategy
        - Identify opportunities
        - List market risks
        - Provide timeline for target revenue achievement

    - Target Revenue Feasibility Analysis:
        - Validate monthly target revenue against SOM
        - Calculate required market penetration rate
        - Assess revenue timeline feasibility
        - Map resource requirements for target revenue
        - Document scaling constraints
        - Evaluate pricing strategy impact
        - Calculate customer acquisition requirements
        - Assess operational capacity needs
        - Identify revenue blockers
        - Provide timeline-based revenue projections

- Use conservative calculations
- Focus on evidence-based metrics
- Document clear limitations
- Maintain balanced projections
- Always use SOM values for market landscape analysis
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