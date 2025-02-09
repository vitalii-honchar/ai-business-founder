import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Perform comprehensive HWW analysis with strict validation criteria:
    - Critical Problem Assessment:
        - Verify problem existence
        - Classify as "Must-have" vs "Nice-to-have"
        - Validate problem persistence
        - Evaluate solution urgency
        - Analyze historical solutions
        - Investigate failed attempts

    - Market Readiness Validation:
        - Verify payment willingness
        - Analyze price sensitivity
        - Assess adoption barriers
        - Evaluate market education needs
        - Calculate customer acquisition complexity
        - Map purchase decision factors

    - Solution Viability Check:
        - Assess technical feasibility
        - Map resource requirements
        - Verify regulatory compliance
        - Project implementation timeline
        - Analyze cost structure
        - Evaluate scalability potential

    - Target Demographics Analysis:
        - Map geographic distribution
        - Document psychological patterns
        - Track behavioral characteristics
        - Identify trust factors
        - List acquisition channels
        - Validate pain point intensity
        - Assess budget availability
        - Map decision-making process
        - List adoption resistance factors

- Use evidence-based validation
- Focus on measurable metrics
- Document clear criteria
- Maintain balanced assessment
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
  }
};

export default validationPrompts(instructions, schema);
