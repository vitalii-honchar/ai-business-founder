import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Provide comprehensive validation summary with strict criteria:
    - Critical Validation Metrics:
        - Problem validity score (1-10)
        - Market opportunity score (1-10)
        - Execution feasibility score (1-10)
        - Resource adequacy score (1-10)
        - Competitive advantage score (1-10)
        - Overall viability score (1-10)

    - Critical Risk Assessment:
        - Market timing risks
        - Resource adequacy risks
        - Competition risks
        - Execution risks
        - Regulatory risks
        - Technology risks

    - Go/No-Go Decision:
        - Clear recommendation
        - Critical failure points
        - Resource gaps
        - Timeline feasibility
        - Investment requirements
        - Risk mitigation needs

    - Alternative Recommendations:
        - Pivot suggestions
        - Resource optimization
        - Timeline adjustments
        - Risk mitigation strategies
        - Alternative market approaches

- Use evidence-based assessment
- Focus on measurable metrics
- Document clear criteria
- Maintain balanced analysis
- Provide actionable recommendations
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
        },
        "scores": {
            "problem_validity": 0,
            "market_opportunity": 0,
            "execution_feasibility": 0,
            "resource_adequacy": 0,
            "competitive_advantage": 0,
            "overall_viability": 0
        },
        "risks": {
            "market_timing": [],
            "resource_adequacy": [],
            "competition": [],
            "execution": [],
            "regulatory": [],
            "technology": []
        },
        "feasibility": {
            "critical_failure_points": [],
            "resource_gaps": [],
            "timeline_feasibility": "",
            "investment_requirements": []
        },
        "alternatives": {
            "pivot_suggestions": [],
            "resource_optimization": [],
            "timeline_adjustments": [],
            "risk_mitigation": []
        }
    },
    "similar_problems": [
        {
            "name": "",
            "worth_solving": 0,
            "explanation": "",
            "user_input": {
                "problem": "",
                "industry": "",
                "location": "",
                "language": "",
                "platform": "",
                "currency": "",
                "auditory": "",
                "personalConstraints": "",
            }
        }
    ]
};

export default validationPrompts(instructions, schema);
