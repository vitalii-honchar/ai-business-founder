import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Use the HWWW technique to structure your analysis:
   - How big a problem is this?: Include numbers and factual data to quantify the issue. Use web research to provide accurate results for today's data.
   - Why does the problem exist?: Describe the root cause of the problem.
   - Why is nobody solving it?: Discuss the main challenges or barriers preventing solutions.
   - Who faces the problem?: Include numbers to specify the affected demographics.
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
    }
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
