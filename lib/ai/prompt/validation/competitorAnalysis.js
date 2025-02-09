import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Perform comprehensive competitor analysis with balanced validation criteria:
    - Top 5 Competitor Deep Dive:
        - Identify market share opportunities
        - Map underserved segments
        - Assess platform innovation potential
        - Evaluate differentiation opportunities
        - Study successful models
        - Analyze optimization potential
        - Review pricing opportunities
        - Map untapped demographics
        - Study success patterns
        - Identify service opportunities
        - Map competitive advantages
        - Assess brand positioning opportunities

    - Market Opportunity Assessment:
        - Evaluate market growth potential
        - Map competition gaps
        - Identify market share opportunities
        - Document entry strategies
        - Optimize resource allocation

    - Top 3 Competitor SWOT Analysis:
        - Map competitive advantages
        - Identify innovation opportunities
        - Document optimization potential
        - List growth opportunities
        - Map expansion possibilities
        - Document risk mitigation
        - Assess market positioning opportunities

    - Market Success Patterns:
        - Document success stories
        - Map growth strategies
        - Track market evolution opportunities
        - Study customer preference trends
        - Analyze innovation patterns

    - Competitive Edge Opportunities:
        - Map innovation possibilities
        - Evaluate positioning advantages
        - Assess resource optimization
        - Rate differentiation potential
        - Map solution opportunities
        - Validate unique advantages

- Use evidence-based assessment with growth focus
- Maintain balanced yet optimistic analysis
- Focus on actionable metrics
- Document clear differentiation opportunities
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
