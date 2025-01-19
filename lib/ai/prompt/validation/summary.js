import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Analyze business problem valiadation:
    - Provide a recommendation if the business problem is valid and worth solving.
        - Be skeptical and critical during providing a recommendation because nobody wants to invest efforts in the not valid business problem.
    - Provide SWOT analysis for a business problem.
    - Provide a mark from 1 to 10 to show how much the business problem is worth solving.
    - Provide recommendation of 3 business problem similar to the analyzed one but which have more potential:
        - Provide a brief explanation of why they have more potential.
        - Explain why these business problems are more worth solving.
`.trim();

const schema = {
    "recommendation": {
        "valid": false,
        "explanation": "",
        "worth_solving": 0,
        "swot_analysis": {
            "strengths": [],
            "weaknesses": [],
            "opportunities": [],
            "threats": []
        }
    },
    "similar_problems": [
        {
            "name": "",
            "worth_solving": 0,
            "explanation": ""
        }
    ]
};

export default validationPrompts(instructions, schema);
