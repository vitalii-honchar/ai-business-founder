import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Problem Optimization Suggestions:
    - Analyze user input and provide 5 optimized variations
    - IMPORTANT: Each user_input field must be extensively detailed with at least 3-4 sentences of specific information
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
            - problem: Detailed problem statement (minimum 3-4 sentences) including:
                - Core problem definition and scope (be specific about what the solution does)
                - Primary and secondary use cases with concrete examples
                - Detailed value proposition with quantifiable benefits
                - Unique selling points with specific differentiators
                - Problem validation methods and results with data points
                - Market gap analysis with competitor comparisons
                - Competitive advantages with concrete examples
                - Solution differentiation details
                - Innovation aspects with technical specifics
                - Scalability potential with growth scenarios
            - industry: Comprehensive industry analysis (minimum 3-4 sentences) including:
                - Market maturity and growth stage with specific metrics
                - Industry size with actual numbers (global and local)
                - Historical and projected growth rates with percentages
                - Key market trends and drivers with examples
                - Major players with market share data
                - Entry barriers with specific challenges
                - Technology requirements with detailed stack
                - Industry regulations with compliance requirements
                - Supply chain analysis with key components
                - Distribution channels with specific examples
            - location: Location-specific analysis (minimum 3-4 sentences) including:
                - Target market size with actual numbers
                - Competition landscape with named competitors
                - Local regulatory environment with specific requirements
                - Economic indicators with current data
                - Infrastructure requirements with costs
                - Cultural factors with market implications
                - Labor market conditions with salary ranges
                - Cost structure with detailed breakdown
                - Distribution networks with specific channels
                - Growth opportunities with market potential
            - platform: Platform strategy (minimum 3-4 sentences) including:
                - Technical architecture with specific technologies
                - Development methodology with timeline
                - Infrastructure requirements with costs
                - Scalability considerations with technical details
                - Security requirements with specific measures
                - User acquisition strategy with channels
                - Customer retention approach with tactics
                - Monetization models with pricing details
                - Integration requirements with specific APIs
                - Maintenance considerations with resources
            - auditory: Target audience analysis (minimum 3-4 sentences) including:
                - Detailed demographic segmentation with numbers
                - Psychographic profiles with specific characteristics
                - Behavior patterns with use case scenarios
                - Pain points with specific examples
                - Purchase power with price sensitivity
                - Market segment sizes with actual numbers
                - Customer journey with touchpoints
                - Adoption barriers with solutions
                - Brand preferences with competitors
                - Communication channels with effectiveness
            - Keep original:
                - language
                - currency
                - targetRevenue
                - targetRevenueRecurring
                - personalConstraints

    - Important guidelines:
        - Each field must contain detailed, specific information (not generic statements)
        - Include actual numbers, percentages, and metrics wherever possible
        - Provide specific examples and use cases
        - Name actual competitors and market players
        - Include technical specifications and requirements
        - Keep original personal constraints unchanged
        - Provide realistic and achievable modifications
        - Focus on market-validated opportunities
        - Consider resource limitations
        - Optimize for maximum revenue potential
        - Ensure each variation is distinctly different
        - Base recommendations on market research
        - Include quantitative data where possible
        - Consider competitive landscape
        - Account for market trends
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
                "targetRevenue": 0,
                "targetRevenueRecurring": ""
            }
        }
    ]
};

export default validationPrompts(instructions, schema); 