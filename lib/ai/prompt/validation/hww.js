import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Use the HWWW technique for critical problem assessment:
   - How big a problem is this?:
      - Include concrete numbers and factual data
      - Use current market research and statistics
      - Evaluate problem persistence
      - Assess solution urgency
      - Analyze historical solution attempts
   - Why does the problem exist?:
      - Identify root causes
      - Analyze failed solution attempts
      - Evaluate systemic barriers
      - Assess regulatory impacts
   - Why is nobody solving it?:
      - Analyze technical barriers
      - Evaluate resource requirements
      - Assess regulatory challenges
      - Examine market readiness
   - Who faces the problem?:
      - Quantify affected demographics
      - Assess payment willingness
      - Analyze adoption barriers
      - Evaluate market education needs
      - Assess customer acquisition complexity
- Be critically skeptical in all assessments
- Use conservative estimates
- Focus on evidence-based validation
- Identify clear failure points
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
