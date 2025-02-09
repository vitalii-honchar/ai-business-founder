import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Problem Optimization Suggestions:
    - Analyze user input and provide 5 optimized variations
    - Each variation should be returned in the following structure:
        - name: A concise title for the optimized variation
        - explanation: Comprehensive analysis including:
            - Why this variation could succeed
            - Market validation evidence
            - Required resources and timeline
            - Risk analysis and mitigation strategies
            - Competitive advantages
            - Growth potential
            - Implementation roadmap
            - Success metrics
            - Critical success factors
            - Potential challenges and solutions
        - potential_score: Score from 1-10 based on:
            - Market size and potential
            - Revenue achievability
            - Resource optimization
            - Risk level
            - Competitive positioning
        - user_input: Modified version of original input with:
            - problem: Detailed problem statement including:
                - Specific use cases
                - Value proposition
                - Unique selling points
                - Problem validation
                - Market analysis
                - Competitive advantages
            - industry: Comprehensive industry analysis including:
                - Market maturity and trends
                - Growth potential
                - Key players
                - Entry barriers
                - Technology requirements
            - location: Location-specific analysis including:
                - Market size
                - Competition landscape
                - Regulatory environment
                - Economic factors
            - platform: Platform strategy including:
                - Technical requirements
                - User acquisition approach
                - Monetization strategy
                - Development considerations
            - auditory: Target audience analysis including:
                - Demographics
                - Behavior patterns
                - Pain points
                - Market segment size
            - targetRevenue: Revenue strategy including:
                - Revenue streams
                - Pricing strategy
                - Customer acquisition costs
                - Break-even analysis
            - Keep original:
                - language
                - currency
                - personalConstraints

    - Important guidelines:
        - Keep original personal constraints unchanged
        - Provide realistic and achievable modifications
        - Focus on market-validated opportunities
        - Consider resource limitations
        - Optimize for maximum revenue potential
        - Ensure each variation is distinctly different
        - Base recommendations on market research
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
            }
        }
    ]
};

export default validationPrompts(instructions, schema); 