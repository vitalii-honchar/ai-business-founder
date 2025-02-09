import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Perform comprehensive HWW analysis with growth-oriented criteria:
    - Market Opportunity Assessment:
        - Validate breakthrough potential
        - Classify as "Market disruption" vs "Growth accelerator"
        - Identify innovation opportunities
        - Evaluate first-mover advantages
        - Analyze success accelerators
        - Study scaling opportunities

    - Market Leadership Validation:
        - Assess premium value potential
        - Analyze pricing optimization opportunities
        - Identify rapid adoption catalysts
        - Map market domination paths
        - Optimize customer acquisition channels
        - Document value multipliers

    - Solution Leadership Check:
        - Validate competitive advantages
        - Identify scaling opportunities
        - Map compliance innovations
        - Optimize launch timeline
        - Analyze efficiency multipliers
        - Evaluate market leadership potential

    - Target Demographics Analysis:
        - Map market domination potential
        - Document behavioral opportunities
        - Track engagement accelerators
        - Identify loyalty builders
        - Map growth multipliers
        - Validate premium positioning
        - Assess revenue optimization
        - Map decision catalysts
        - List adoption accelerators

    - Target Revenue Acceleration:
        - Validate revenue maximization potential
        - Provide growth opportunity score (1-10)
        - Map rapid scaling possibilities
        - Identify resource multipliers
        - Document breakthrough opportunities
        - Calculate optimized acquisition strategy
        - Assess operational excellence
        - Validate premium pricing
        - Map revenue acceleration paths

- Use evidence-based validation with breakthrough focus
- Focus on market leadership metrics
- Document clear domination paths
- Maintain balanced yet ambitious assessment
`.trim();

const schema = {
  "how_big_a_problem_is": {
    "overview": {
      "description": "",
      "size": 0,
      "dimension": ""
    },
    "frequency": [
      {
        "name": "",
        "explanation": ""
      }
    ],
    "readiness_to_pay": {
      "summary": "",
      "pricing": 0,
      "researches": [
        {
          "research": "",
          "explanation": ""
        }
      ]
    },
    "persistence": {
      "duration": "",
      "trend": "",
      "explanation": ""
    },
    "urgency": {
      "level": "",
      "explanation": ""
    },
    "historical_attempts": []
  },
  "why_does_this_problem_exist": {
    "summary": "",
    "reasons": [
      {
        "name": "",
        "explanation": ""
      }
    ]
  },
  "why_nobody_solving_it": {
    "summary": "",
    "reasons": [
      {
        "name": "",
        "explanation": ""
      }
    ]
  },
  "who_faces_this_problem": {
    "summary": "",
    "metrics": {
      "characteristics": [
        {
          "name": "",
          "value": ""
        }
      ],
      "geography": [],
      "psychology_patterns": [
        {
          "name": "",
          "value": ""
        }
      ],
      "specific_interests": [],
      "habitual_behaviour": [
        {
          "name": "",
          "value": ""
        }
      ],
      "trust_issues": [
        {
          "name": "",
          "value": ""
        }
      ],
      "where_to_find_them": [
        {
          "name": "",
          "value": ""
        }
      ]
    }
  },
  "target_revenue_validation": {
    "monthly_target": 0,
    "feasibility_score": 0,
    "timeline_months": 0,
    "key_requirements": [],
    "scaling_constraints": [],
    "acquisition_needs": {
      "customers_needed": 0,
      "monthly_acquisition_rate": 0,
      "estimated_cac": 0
    },
    "operational_requirements": [],
    "pricing_strategy": {
      "recommended_price_range": {
        "min": 0,
        "max": 0
      },
      "pricing_constraints": []
    },
    "timeline_risks": []
  }
};

export default validationPrompts(instructions, schema);
