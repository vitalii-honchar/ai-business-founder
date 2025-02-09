import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Provide comprehensive validation summary with balanced criteria:
    - Target Revenue Assessment (Primary Focus):
        - Target revenue feasibility score (1-10, considering growth potential)
        - Timeline achievability score (1-10, including acceleration opportunities)
        - Market size compatibility score (1-10, factoring market expansion)
        - Customer acquisition feasibility score (1-10, with optimization potential)
        - Resource adequacy score (1-10, including partnership possibilities)
        - Operational feasibility score (1-10, with efficiency gains)
        - Pricing strategy viability score (1-10, considering value-based pricing)
        - Revenue scaling risk score (1-10, with mitigation strategies)
        - Overall revenue viability score (1-10, weighted for opportunities)

    - Revenue-Based Risk Assessment:
        - Market penetration opportunities
        - Customer acquisition optimization
        - Pricing model flexibility
        - Scaling operation potential
        - Resource optimization possibilities
        - Timeline acceleration options
        - Competition differentiation potential
        - Market expansion opportunities

    - Go/No-Go Decision (Revenue-Centric):
        - Balanced revenue-based recommendation
        - Revenue achievement enablers
        - Resource optimization for revenue
        - Timeline optimization potential
        - Strategic investment opportunities
        - Revenue acceleration strategies

    - Revenue-Focused Alternatives:
        - Revenue optimization models
        - Growth acceleration strategies
        - Timeline optimization paths
        - Resource leveraging strategies
        - Market penetration tactics
        - Value-based pricing strategies

    - Secondary Validation Metrics:
        - Problem opportunity score (1-10)
        - Market potential score (1-10)
        - Execution optimization score (1-10)
        - Innovation advantage score (1-10)

- Use evidence-based assessment with growth potential
- Focus on revenue optimization opportunities
- Document clear success criteria
- Maintain balanced yet opportunity-focused analysis
- Provide actionable growth-oriented recommendations
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
    }
};

export default validationPrompts(instructions, schema);
