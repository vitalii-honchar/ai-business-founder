import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Use the Competitor Analysis technique with maximum skepticism:
    - Analyze top competitors aggressively:
        - Challenge revenue and growth claims
        - Question user base assumptions
        - Maximize platform limitations
        - Challenge effectiveness claims
        - Emphasize competitor advantages
        - Maximize competitor strengths
        - Challenge differentiation claims
        - Question pricing viability
        - Emphasize market dominance
    - Analyze market saturation critically:
        - Maximize entry barriers
        - Emphasize market maturity
        - Challenge resource adequacy
        - Question brand value claims
    - Provide critical SWOT Analysis:
        - Minimize strength claims
        - Maximize weakness impact
        - Question opportunity viability
        - Emphasize threat severity
    - Analyze patterns aggressively:
        - Study all market failures
        - Question success factors
        - Emphasize customer complaints
        - Challenge positioning claims
    - Challenge competitive edge claims:
        - Maximize time-to-market disadvantage
        - Emphasize resource gaps
        - Question defense strategy viability
- Maintain maximum skepticism
- Focus on failure patterns
- Emphasize market barriers
- Challenge all advantages
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
            "demographics": [],
            "growth_rate": 0,
            "user_growth_rate": 0,
            "customer_satisfaction": 0,
            "failed_attempts": [],
            "entry_barriers": [],
            "market_maturity": "",
            "resource_requirements": []
        }
    ],
    "swot_analysis": [
        {
            "competitor": "",
            "strengths": [],
            "weaknesses": [],
            "opportunities": [],
            "threats": []
        }
    ],
    "market_analysis": {
        "saturation_level": "",
        "entry_barriers": [],
        "success_patterns": [],
        "failure_patterns": [],
        "complaint_patterns": [],
        "competitive_edge_sustainability": {
            "time_to_market_impact": "",
            "resource_gaps": [],
            "defense_strategy": ""
        }
    }
};

export default validationPrompts(instructions, schema);
