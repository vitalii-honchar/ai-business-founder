import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Provide comprehensive business problem validation:
    - Critical assessment with strict validation criteria:
        - Problem validity (1-10)
        - Market opportunity (1-10)
        - Execution feasibility (1-10)
        - Resource adequacy (1-10)
        - Competitive advantage (1-10)
        - Overall viability (1-10)
    - Risk analysis:
        - Market timing risks
        - Resource adequacy risks
        - Competition risks
        - Execution risks
        - Regulatory risks
        - Technology risks
    - Clear Go/No-Go recommendation:
        - Critical failure points
        - Resource gaps
        - Timeline feasibility
        - Investment requirements
    - Alternative recommendations:
        - Pivot suggestions
        - Resource optimization
        - Timeline adjustments
        - Risk mitigation strategies
    - Similar problems with higher potential
- Maintain critically skeptical perspective
- Use conservative estimates
- Focus on evidence-based decisions
- Provide clear risk identification
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
