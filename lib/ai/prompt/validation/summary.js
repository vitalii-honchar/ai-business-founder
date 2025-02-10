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
    - Provide a confidence score between 1 and 10 for the decision based on validation evidence.
    
    The worth_solving score (1-10) should be calculated using these guidelines:
    - Scores 8-10: Outstanding problems where:
      • Market size exceeds target revenue by >200%
      • Strong evidence of market demand from research
      • Clear willingness to pay from target users
      • Strong market opportunity identified
    
    - Scores 6-7: Good problems where:
      • Market size exceeds target revenue by 100-200%
      • Validated problem with clear user pain points
      • Identified market opportunity
      • Clear evidence of user demand
    
    - Score 5: Baseline for problems where:
      • Market size meets target revenue (around 100%)
      • Problem is validated but needs more research
      • Average market potential
    
    - Scores 3-4: Problems needing work where:
      • Market size is below target revenue
      • Limited problem validation
      • Unclear market opportunity
    
    - Scores 1-2: Reserved only for:
      • Market size far below target revenue
      • Unvalidated problems
      • No clear revenue potential
    
    The final worth_solving explanation should:
    1. Lead with market size vs target revenue comparison
    2. Evaluate problem validation strength from research
    3. Assess market opportunity
    4. Highlight key opportunities identified
    5. List specific areas needing more validation
    
    For example:
    "Worth solving score: 7.5 - Market size of $9.6K MRR is 960% of the $1K MRR target, showing exceptional revenue potential. 
    Problem validation reveals clear pain points around [specific issues]. Market research shows strong demand for solutions. 
    Main opportunities: [specific opportunities]. Areas needing validation: [specific areas]."

    - Problem Validation Assessment:
        - Problem evidence points
        - Target audience validation
        - Current alternatives/workarounds
        - Pain points identified
        - Frequency of occurrence
        - Impact on users/business
        - Validation interviews/data

    - Market Opportunity Assessment:
        - Target audience size
        - Market accessibility
        - Current spending patterns
        - Willingness to pay indicators
        - Key market trends
        - Growth potential

    - Risk Assessment Should Focus On:
        - Market validation risks (e.g., insufficient market size evidence)
        - Problem validation risks (e.g., limited user feedback)
        - Revenue potential risks (e.g., unclear willingness to pay)
        - Target audience validation risks
        - Market trend validation risks
        
    Do not consider implementation risks, technical feasibility, or operational costs in the assessment.
`.trim();

const schema = {
    "recommendation": {
        "worth_solving": 0,
        "worth_solving_explanation": "",
        "worth_solving_challenges": [""],
        "revenue_validation": {
            "explanation": "",
            "reasons": [""],
            "market_assessment": {
                "strengths": [""],
                "challenges": [""],
                "opportunities": [""]
            }
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
