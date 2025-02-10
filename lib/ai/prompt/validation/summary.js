import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Analyze the validation of a business problem and provide focused validation summary for it:
    - Problem Statement Validation Score:
        - Problem validation score (1-10, evidence that problem exists)    
        - Problem impact score (1-10, severity of the problem)
        - Problem urgency score (1-10, how pressing is the need)
        - Problem frequency score (1-10, how often does this problem occur)
        - Willingness to pay score (1-10, would people pay to solve this)
        - Problem potential revenue score (1-10, how much revenue can be generated from this problem)
    - Potential revenue will be provided in the tamSamSom.market_landscape.market_revenue field.
    - Provide a decision "GO" or "NO-GO" based on the analysis with a description.
    - Provide a confidence score between 1 and 10 for the decision.
    - Provide an analysis of a potential revenue with a score between 0 and 1 of the achievability of the revenue.
    - Provide an explanation of a probability of the revenue to be achieved.
    - Provide a realistic revenue which you think is the most likely to be achieved.
    
    The final worth_solving score should include a detailed explanation that:
    1. Emphasizes revenue achievement vs target as the primary success metric
    2. Highlights when revenue significantly exceeds targets as strong validation
    3. Lists any concerns or risks (market size, competition, execution challenges)
    4. Provides context for score adjustments based on risk factors
    5. Suggests areas for improvement or risk mitigation

    For example:
    "Worth solving score: 9.0 - The projected revenue of $3.8K MRR is 3.8x the target revenue 
    of $1K MRR, demonstrating exceptional financial potential. While there are execution 
    challenges like high churn (80%) and competition, the large market size of 150K users
    provides room for achieving and maintaining target revenue even with conservative 
    conversion rates. Key risks include..."

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
        - Key assumptions validation
        - Revenue risk factors
`.trim();

const schema = {
    "recommendation": {
        "worth_solving": 0,
        "worth_solving_explanation": "",
        "worth_solving_challenges": [""],
        "revenue_validation": {
            "probability_of_achieving_revenue": 0,
            "explanation": "",
            "reasons": [""],
            "realistic_revenue": 0,
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
            "problem_impact": 0,
            "problem_urgency": 0,
            "problem_frequency": 0,
            "willingness_to_pay": 0,        
            "overall_problem_validity": 0,
            "revenue_potential": 0,
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
