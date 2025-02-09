import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Provide comprehensive validation summary with growth-oriented criteria:
    - Target Revenue Assessment (Primary Focus):
        - Target revenue opportunity score (1-10, emphasizing growth potential)
        - Timeline acceleration score (1-10, focusing on fast-track possibilities)
        - Market expansion score (1-10, highlighting growth markets)
        - Customer acquisition opportunity score (1-10, with growth channels)
        - Resource optimization score (1-10, including partnership synergies)
        - Operational scaling score (1-10, with efficiency multipliers)
        - Value-based pricing score (1-10, emphasizing premium positioning)
        - Growth acceleration score (1-10, with catalyst strategies)
        - Overall growth potential score (1-10, weighted for opportunities)

    - Growth Opportunity Assessment:
        - Market expansion catalysts
        - Customer acquisition accelerators
        - Premium pricing opportunities
        - Rapid scaling strategies
        - Resource optimization multipliers
        - Timeline acceleration enablers
        - Competitive advantage amplifiers
        - Market leadership opportunities

    - Go/No-Go Decision (Growth-Centric):
        - Growth-oriented recommendation
        - Revenue acceleration enablers
        - Resource optimization multipliers
        - Timeline compression potential
        - Strategic growth investments
        - Market domination strategies

    - Growth-Focused Alternatives:
        - Revenue maximization models
        - Rapid scaling strategies
        - Timeline compression paths
        - Resource leverage multipliers
        - Market penetration accelerators
        - Premium pricing strategies

    - Growth Validation Metrics:
        - Market opportunity score (1-10)
        - Growth potential score (1-10)
        - Innovation leadership score (1-10)
        - Market disruption score (1-10)

- Emphasize growth opportunities and market leadership potential
- Focus on revenue maximization strategies
- Document accelerated success paths
- Maintain balanced yet ambitious analysis
- Provide catalyst-focused recommendations
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
