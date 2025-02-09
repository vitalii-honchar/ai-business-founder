import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Provide focused validation summary for business problem assessment:
    - Problem Statement Validation:
        - Problem clarity score (1-10, how well defined is the problem)
        - Problem scope score (1-10, is the scope well-defined)
        - Problem impact score (1-10, severity of the problem)
        - Problem urgency score (1-10, how pressing is the need)
        - Target audience clarity score (1-10, how well defined is who has this problem)
        - Problem frequency score (1-10, how often does this problem occur)
        - Problem validation score (1-10, evidence that problem exists)
        - Willingness to pay score (1-10, would people pay to solve this)
        
    Note: The worth_solving score (0-10) should be calculated as the average of all scores in the scores object, rounded to 2 decimal places

    - Problem Validation Assessment:
        - Problem evidence points
        - Target audience validation
        - Current alternatives/workarounds
        - Pain points identified
        - Cost of the problem
        - Frequency of occurrence
        - Impact on users/business
        - Validation interviews/data

    - Initial Revenue Validation:
        - Target audience size
        - Problem frequency
        - Current spending on alternatives
        - Willingness to pay indicators
        - Revenue calculation methodology
        - Key assumptions validation
        - Initial pricing research
        - Revenue risk factors

    - Problem Validation Metrics:
        - Problem validity score (1-10)
        - Target audience clarity score (1-10)
        - Revenue potential confidence (1-10)
        - Problem evidence strength (1-10)

- Focus on validating the existence and significance of the problem
- Verify problem assumptions with data
- Document validation methodology
- Maintain objective analysis
- Highlight validation gaps

Revenue Calculation Guidelines:
- Verify revenue calculations with multiple validation steps
- Include detailed breakdown of revenue calculations:
    - Monthly Recurring Revenue (MRR) = Total Users * Revenue Per User * (1 - Churn Rate)
    - Annual Recurring Revenue (ARR) = MRR * 12
    - Total Revenue = ARR * Timeline (in years)
- Validate all revenue assumptions against market benchmarks
- Apply appropriate risk adjustments to revenue projections
- Document calculation methodology and verification steps
- Include confidence scoring for each revenue assumption
`.trim();

const schema = {
    "recommendation": {
        "valid": false,
        "explanation": "",
        "worth_solving": 0,
        "revenue_validation": {
            "amount": 0,
            "currency": "",
            "timeline": "",
            "confidence_score": 0,
            "calculation": {
                "total_users": 0,
                "revenue_per_user": 0,
                "churn_rate": 0,
                "conversion_rate": 0,
                "total_addressable_market": 0,
                "monthly_recurring_revenue": 0,
                "annual_recurring_revenue": 0
            },
            "key_assumptions": [
                ""
            ],
            "validation_checks": {
                "calculation_verified": false,
                "assumptions_validated": false,
                "timeline_realistic": false
            },
            "calculation_method": "",
            "verification_steps": [
                ""
            ],
            "error_margin": 0,
            "confidence_factors": [
                ""
            ],
            "risk_adjustments": [
                ""
            ],
            "assumption_validation": [
                ""
            ]
        },
        "problem_swot_analysis": {
            "strengths": [
                ""
            ],
            "weaknesses": [
                ""
            ],
            "opportunities": [
                ""
            ],
            "threats": [
                ""
            ]
        },
        "scores": {
            "problem_clarity": 0,
            "problem_scope": 0,
            "problem_impact": 0,
            "problem_urgency": 0,
            "target_audience_clarity": 0,
            "problem_frequency": 0,
            "problem_validation": 0,
            "willingness_to_pay": 0,
            "revenue_calculation_confidence": 0,
            "revenue_assumption_validity": 0,
            "overall_problem_validity": 0
        },
        "validation_gaps": {
            "missing_evidence": [
                ""
            ],
            "assumption_risks": [
                ""
            ],
            "data_needs": [
                ""
            ],
            "validation_requirements": [
                ""
            ]
        },
        "problem_evidence": {
            "validation_interviews": [
                ""
            ],
            "data_points": [
                ""
            ],
            "user_feedback": [
                ""
            ],
            "market_signals": [
                ""
            ],
            "current_solutions": [
                ""
            ],
            "problem_costs": [
                ""
            ],
            "occurrence_frequency": "",
            "impact_assessment": ""
        },
        "validation_decision": {
            "decision": "",
            "confidence_score": 0,
            "key_findings": [
                ""
            ],
            "critical_gaps": [
                ""
            ],
            "recommended_validation_steps": [
                ""
            ],
            "risk_assessment": "",
            "evidence_strength": ""
        }
    }
};

export default validationPrompts(instructions, schema);
