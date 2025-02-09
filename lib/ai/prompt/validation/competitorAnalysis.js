import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Perform comprehensive competitor analysis with growth-oriented criteria:
    - Top 5 Competitor Opportunity Analysis:
        - Identify market leadership opportunities
        - Map high-growth segments
        - Assess disruption potential
        - Evaluate differentiation advantages
        - Study success accelerators
        - Analyze optimization multipliers
        - Review premium pricing opportunities
        - Map emerging demographics
        - Study rapid growth patterns
        - Identify service innovations
        - Map competitive breakthroughs
        - Assess market domination potential

    - Market Leadership Assessment:
        - Evaluate rapid growth potential
        - Map competitive advantages
        - Identify market capture opportunities
        - Document domination strategies
        - Optimize resource multipliers

    - Top 3 Competitor Growth Analysis:
        - Map breakthrough advantages
        - Identify innovation leadership
        - Document optimization catalysts
        - List expansion opportunities
        - Map scaling possibilities
        - Document risk optimizations
        - Assess market leadership potential

    - Market Success Accelerators:
        - Document breakthrough stories
        - Map rapid growth strategies
        - Track disruption opportunities
        - Study premium customer trends
        - Analyze innovation leadership

    - Market Leadership Opportunities:
        - Map breakthrough possibilities
        - Evaluate domination advantages
        - Assess resource multipliers
        - Rate disruption potential
        - Map innovation opportunities
        - Validate unique breakthroughs

- Use evidence-based assessment with breakthrough focus
- Maintain balanced yet ambitious analysis
- Focus on market leadership metrics
- Document clear domination opportunities
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
