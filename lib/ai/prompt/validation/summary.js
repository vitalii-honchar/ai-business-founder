import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Provide comprehensive validation summary with strict criteria:
    - Target Revenue Assessment (Primary Focus):
        - Target revenue feasibility score (1-10)
        - Timeline achievability score (1-10)
        - Market size compatibility score (1-10)
        - Customer acquisition feasibility score (1-10)
        - Resource adequacy score (1-10)
        - Operational feasibility score (1-10)
        - Pricing strategy viability score (1-10)
        - Revenue scaling risk score (1-10)
        - Overall revenue viability score (1-10)

    - Revenue-Based Risk Assessment:
        - Market penetration risks
        - Customer acquisition risks
        - Pricing model risks
        - Scaling operation risks
        - Resource scaling risks
        - Timeline risks
        - Competition impact on revenue
        - Market saturation impact

    - Go/No-Go Decision (Revenue-Centric):
        - Clear revenue-based recommendation
        - Revenue achievement blockers
        - Critical resource gaps for revenue
        - Revenue timeline feasibility
        - Required investment for target revenue
        - Revenue risk mitigation requirements

    - Revenue-Focused Alternatives:
        - Alternative revenue models
        - Revenue scaling strategies
        - Timeline optimization
        - Resource optimization for revenue
        - Market penetration strategies
        - Pricing strategy alternatives

    - Secondary Validation Metrics:
        - Problem validity score (1-10)
        - Market opportunity score (1-10)
        - Execution feasibility score (1-10)
        - Competitive advantage score (1-10)

    - Problem Optimization Suggestions:
        - Analyze user input and provide 5 optimized variations
        - Each variation should modify different combinations of input properties
        - Sort variations by revenue potential (1-10 score)
        - Calculate potential score based on:
            - Market size in the optimized location/industry
            - Revenue achievability with modified constraints
            - Resource optimization impact
            - Risk reduction potential
            - Competitive advantage in the new context
        - Explain why each optimization could lead to better results
        - Focus on realistic and achievable modifications
        - Consider market conditions and constraints
        - Optimize for maximum revenue potential

- Use evidence-based assessment
- Focus on revenue achievability
- Document clear revenue criteria
- Maintain balanced analysis
- Provide actionable revenue-focused recommendations
`.trim();

const schema = {
    "recommendation": {
        "valid": false,
        "explanation": "",
        "worth_solving": 0,
        "achievable_revenue": {
            "amount": 0,
            "currency": "",
            "timeline": "",
            "confidence_score": 0,
            "key_assumptions": []
        },
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
            "overall_viability": 0,
            "target_revenue_feasibility": 0,
            "timeline_achievability": 0,
            "market_compatibility": 0,
            "customer_acquisition": 0,
            "operational_feasibility": 0,
            "pricing_viability": 0,
            "scaling_risk": 0,
            "overall_revenue_viability": 0
        },
        "risks": {
            "market_timing": [],
            "resource_adequacy": [],
            "competition": [],
            "execution": [],
            "regulatory": [],
            "technology": [],
            "market_penetration": [],
            "customer_acquisition": [],
            "pricing_model": [],
            "scaling_operation": [],
            "resource_scaling": [],
            "timeline": [],
            "competition_impact": [],
            "market_saturation": []
        },
        "feasibility": {
            "critical_failure_points": [],
            "resource_gaps": [],
            "timeline_feasibility": "",
            "investment_requirements": [],
            "revenue_blockers": [],
            "revenue_timeline": "",
            "revenue_investment": "",
            "revenue_resources": []
        },
        "go_no_go_decision": {
            "decision": "",
            "confidence_score": 0,
            "key_factors": [],
            "revenue_achievability": "",
            "critical_prerequisites": [],
            "recommended_next_steps": [],
            "risk_threshold_assessment": "",
            "resource_readiness_status": ""
        },
        "alternatives": {
            "pivot_suggestions": [],
            "resource_optimization": [],
            "timeline_adjustments": [],
            "risk_mitigation": [],
            "revenue_models": [],
            "scaling_strategies": [],
            "market_penetration": [],
            "pricing_strategies": []
        }
    },
    "optimized_problems": [
        {
            "name": "",
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
                "targetRevenue": 0
            }
        }
    ]
};

export default validationPrompts(instructions, schema);
