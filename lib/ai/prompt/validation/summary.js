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
    - Scores 8-10: Outstanding opportunities where:
      • Market size exceeds target revenue by >200%
      • Clear evidence of user pain points and demand
      • Strong willingness to pay from target users
      • Significant market growth potential
    
    - Scores 6-7: Good opportunities where:
      • Market size exceeds target revenue by 100-200%
      • Validated problem with clear user needs
      • Demonstrated market demand
      • Clear path to revenue
    
    - Score 5: Baseline opportunities where:
      • Market size meets target revenue (around 100%)
      • Problem is validated but needs more research
      • Basic market potential demonstrated
    
    - Scores 3-4: Early stage opportunities where:
      • Market size is below target revenue
      • Limited problem validation
      • Market potential needs more research
    
    - Scores 1-2: Reserved only for:
      • Market size far below target revenue
      • Unvalidated problems
      • No clear market demand
    
    The final worth_solving explanation should:
    1. Lead with market size and revenue potential
    2. Highlight key market opportunities identified
    3. Describe validated user pain points and needs
    4. Present evidence of market demand
    5. Suggest areas for further market validation
    
    For example:
    "Worth solving score: 7.5 - Market size of $9.6K MRR is 960% of the $1K MRR target, showing exceptional revenue potential. 
    Key opportunities include [specific opportunities]. Problem validation confirms strong user needs around [specific issues]. 
    Market research indicates growing demand and willingness to pay. Further validation needed for: [specific areas]."

    - Problem Validation Assessment:
        - Problem evidence points
        - Target audience needs
        - Market gaps and opportunities
        - Pain points identified
        - Frequency of occurrence
        - Impact on users/business
        - Validation interviews/data

    - Market Opportunity Assessment:
        - Target audience size
        - Market growth potential
        - Revenue opportunities
        - Willingness to pay indicators
        - Market trends and dynamics
        - Future market evolution
        
    Focus validation on identifying opportunities rather than historical limitations. 
    Consider how new approaches or technologies could transform the market.
    Remember that creative solutions can overcome traditional market barriers.
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
