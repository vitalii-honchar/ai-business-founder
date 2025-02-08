import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Use the Competitor Analysis technique to structure your analysis:
    - Provide top 5 competitors who solve the same problem
    - For each competitor analyze:
        - Revenue and growth rate
        - User base and growth rate
        - Platform coverage (web, mobile, both, physical)
        - Solution effectiveness (high, medium, low with explanation)
        - Core features and differentiators
        - Detailed pros and cons analysis
        - Ownership structure and funding
        - Business model and pricing strategy
        - Target demographics and market positioning
        - Customer satisfaction metrics
        - Failed product/feature attempts
    - Analyze market saturation:
        - Entry barrier assessment
        - Market maturity stage
        - Resource requirements vs competitors
        - Brand value impact
    - Provide SWOT Analysis for top 3 strongest competitors
    - Analyze patterns in:
        - Failed competitor attempts
        - Success factors
        - Customer complaints
        - Market positioning
    - Evaluate competitive edge sustainability:
        - Time-to-market advantage/disadvantage
        - Resource gap analysis
        - Defense strategy evaluation
- Be critically skeptical and conservative in all assessments
- Focus on evidence-based analysis
- Identify clear failure points and risks
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
