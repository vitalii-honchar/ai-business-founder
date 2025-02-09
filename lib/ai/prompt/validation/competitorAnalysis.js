import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Perform comprehensive competitor analysis following strict validation criteria:
    - Top 5 Competitor Deep Dive:
        - Validate revenue claims with evidence
        - Verify user base metrics
        - Assess platform limitations
        - Evaluate effectiveness claims
        - Document ownership structure
        - Analyze business model viability
        - Review price packaging strategy
        - Map target demographics
        - Study failed competitor cases
        - Identify service gaps
        - Evaluate resource advantages
        - Assess brand value impact

    - Market Saturation Assessment:
        - Evaluate market maturity stage
        - Calculate competition intensity
        - Map market share distribution
        - Document entry barriers
        - Compare resource requirements

    - Top 3 Competitor SWOT Analysis:
        - Document market position strength
        - Identify resource capabilities
        - Map operational gaps
        - List market limitations
        - Identify untapped opportunities
        - Document market risks
        - Assess competitive pressures

    - Historical Market Learning:
        - Document failed competitor cases
        - Identify success patterns
        - Map market evolution trends
        - Track customer behavior changes
        - Study technology adoption patterns

    - Competitive Edge Analysis:
        - Map differentiation opportunities
        - Evaluate market positioning
        - Assess resource advantages
        - Rate innovation potential
        - Identify unaddressed pain points
        - Validate unique value propositions

- Use evidence-based assessment
- Maintain balanced analysis
- Focus on measurable metrics
- Document clear success criteria
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
