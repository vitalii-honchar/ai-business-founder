import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Use the Competitor Analysis technique to structure your analysis:
    - Provide top 5 competitors who solves the same problem.
    - Provide competitor revenue.
    - Provide competitor user base.
    - Provide competitor platform: web, mobile, both, some physical object.
    - Provide competitor effectiveness: high, medium, low.
    - Provide competitor main feature.
    - Provide competitor pros and cons.
    - Provide competitor ownership: private, public.
    - Provide competitor public status.
    - Provide competitor business model: prices.
    - Provide competitor price packages.
    - Provide competitor demographics.
- Based on the Competitor Analysis technique use SWOT Analysis to provide insights on the top 3 strongest competitors.
`.trim();

const schema = {
    "competitors": [
        {
            "name": "",
            "revenue": 0,
            "user_base": 0,
            "platform": [],
            "effectiveness": "",
            "main_feature": "",
            "pros": [],
            "cons": [],
            "ownership": [],
            "public_status": "",
            "business_model": "",
            "price_packages": [],
            "demographics": []
        }
    ],
    "swot_analysis": [
        {
            "strengths": [],
            "weaknesses": [],
            "opportunities": [],
            "threats": []
        }
    ]
};

export default validationPrompts(instructions, schema);
