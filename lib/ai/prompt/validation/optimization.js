import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Problem Optimization Suggestions:
    - Analyze user input and provide 5 optimized variations
    - Each variation should modify different combinations of input properties while:
        - Keeping original personal constraints exactly as provided in user input
        - Suggesting separate actionable improvements for constraints
          (e.g., "Learn marketing basics", "Hire part-time developer")
        - For each field provide detailed explanation:
            Problem:
                - Detailed problem statement
                - Specific use cases
                - Clear value proposition
                - Unique selling points
                - Problem validation evidence
                - Current market solutions analysis
                - Competitive advantages
                - Target market pain points
                - Solution scalability
                - Implementation challenges
            
            Industry:
                - Industry segment specifics
                - Market maturity
                - Growth potential
                - Key players and market share
                - Entry barriers
                - Industry trends
                - Technology requirements
                - Regulatory landscape
                - Market dynamics
                - Future outlook
            
            Location:
                - Market size in the location
                - Local competition analysis
                - Regulatory environment
                - Market accessibility
                - Cultural considerations
                - Economic factors
                - Infrastructure requirements
                - Local partnerships needed
                - Distribution channels
                - Growth opportunities
            
            Platform:
                - Platform-specific advantages
                - Technical requirements
                - User acquisition channels
                - Monetization opportunities
                - Development complexity
                - Maintenance requirements
                - Scalability considerations
                - Integration capabilities
                - Security requirements
                - User experience factors
            
            Auditory:
                - Detailed demographic breakdown
                - Behavioral patterns
                - Spending capacity and habits
                - Decision-making factors
                - Pain points and needs
                - Market segment size
                - Growth potential
                - Customer lifetime value
                - Acquisition channels
                - Retention strategies
                - Brand preferences
                - Technology adoption patterns
                - Purchase frequency
                - Service expectations
            
            Target Revenue:
                - Revenue streams breakdown
                - Pricing strategy details
                - Market share requirements
                - Customer acquisition costs
                - Timeline to achieve
                - Revenue milestones
                - Scaling strategy
                - Resource requirements
                - Investment needs
                - Break-even analysis
                - Profit margins
                - Operational costs
            
        - Each optimization must include:
            - Detailed explanation of why this variation could succeed
            - Market validation evidence
            - Required resources and timeline
            - Risk analysis and mitigation strategies
            - Competitive advantages
            - Growth potential
            - Implementation roadmap
            - Success metrics
            - Critical success factors
            - Potential challenges and solutions
    
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
`.trim();

const schema = {
    "optimized_problems": [
        {
            "name": "",
            "explanation": "",
            "potential_score": 0,
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
            },
            "detailed_analysis": {
                "problem": {},
                "industry": {},
                "location": {},
                "platform": {},
                "auditory": {},
                "target_revenue": {}
            },
            "success_factors": {
                "explanation": "",
                "market_validation": [],
                "resources_timeline": {},
                "risk_analysis": {},
                "competitive_advantages": [],
                "growth_potential": "",
                "implementation_roadmap": [],
                "success_metrics": [],
                "critical_factors": [],
                "challenges_solutions": {}
            }
        }
    ]
};

export default validationPrompts(instructions, schema); 