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
      • Competitive advantages identified
    
    - Scores 6-7: Good problems where:
      • Market size exceeds target revenue by 100-200%
      • Validated problem with clear user pain points
      • Identified market opportunity
      • Reasonable competitive position
    
    - Score 5: Baseline for problems where:
      • Market size meets target revenue (around 100%)
      • Problem is validated but needs more research
      • Average competitive position
    
    - Scores 3-4: Problems needing work where:
      • Market size is below target revenue
      • Limited problem validation
      • Strong competition without clear advantages
    
    - Scores 1-2: Reserved only for:
      • Market size far below target revenue
      • Unvalidated problems
      • No viable revenue model
    
    The final worth_solving explanation should:
    1. Lead with market size vs target revenue comparison
    2. Evaluate problem validation strength from research
    3. Assess competitive position and advantages
    4. Highlight key opportunities identified
    5. List specific areas needing more validation
    
    For example:
    "Worth solving score: 7.5 - Market size of $9.6K MRR is 960% of the $1K MRR target, showing exceptional revenue potential. 
    Problem validation reveals clear pain points around [specific issues]. While facing established competitors, 
    key differentiators include [advantages]. Main opportunities: [specific opportunities]. 
    Areas needing validation: [specific areas]."

    - Problem Validation Assessment:
        - Problem evidence points
        - Target audience validation
        - Current alternatives/workarounds
        - Pain points identified
        - Cost of the problem
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
