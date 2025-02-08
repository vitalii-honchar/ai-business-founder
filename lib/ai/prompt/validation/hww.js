import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Use the HWWW technique for aggressive problem assessment:
   - How big a problem is this?:
      - Challenge all market size claims
      - Question growth rate assumptions
      - Maximize problem complexity
      - Question solution urgency claims
      - Analyze all failed solution attempts
      - Consider problem irrelevance risks
   - Why does the problem exist?:
      - Challenge claimed root causes
      - Analyze all failed solutions
      - Maximize systemic barriers
      - Emphasize regulatory impacts
      - Question problem persistence
   - Why is nobody solving it?:
      - Maximize technical barriers
      - Challenge resource assumptions
      - Emphasize regulatory challenges
      - Question market readiness claims
      - Consider solution irrelevance
   - Who faces the problem?:
      - Challenge demographic claims
      - Question payment willingness
      - Maximize adoption barriers
      - Emphasize education costs
      - Challenge acquisition assumptions
      - Consider audience disinterest
- Maintain aggressive skepticism
- Use minimum viable estimates
- Focus on failure identification
- Challenge all positive claims
- Maximize risk assessment
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
