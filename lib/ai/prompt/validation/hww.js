import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Perform comprehensive HWW analysis with balanced validation criteria:
    - Critical Problem Assessment:
        - Validate problem opportunity
        - Classify as "Must-have solution" vs "Growth opportunity"
        - Identify solution potential
        - Evaluate market timing advantage
        - Analyze successful solutions
        - Study innovation opportunities

    - Market Readiness Validation:
        - Assess value perception
        - Analyze pricing optimization
        - Identify adoption accelerators
        - Map market education opportunities
        - Optimize customer acquisition paths
        - Document value drivers

    - Solution Viability Check:
        - Validate technical advantages
        - Identify resource optimization
        - Map compliance opportunities
        - Optimize implementation timeline
        - Analyze efficiency potential
        - Evaluate scaling opportunities

    - Target Demographics Analysis:
        - Map market expansion potential
        - Document behavioral opportunities
        - Track engagement patterns
        - Identify trust builders
        - Map growth channels
        - Validate solution fit
        - Assess budget optimization
        - Map decision accelerators
        - List adoption enablers

    - Target Revenue Validation:
        - Validate revenue optimization potential
        - Provide target revenue opportunity score (1-10)
        - Map accelerated timeline possibilities
        - Identify resource optimization paths
        - Document scaling opportunities
        - Calculate optimized acquisition strategy
        - Assess operational efficiency gains
        - Validate pricing optimization
        - Map revenue acceleration paths

- Use evidence-based validation with growth focus
- Focus on measurable opportunities
- Document clear success paths
- Maintain balanced yet optimistic assessment
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
