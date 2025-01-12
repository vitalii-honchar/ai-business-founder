import Anthropic from '@anthropic-ai/sdk';

import context from './prompt/context.mjs';
import createHwwPrompt from './prompt/hww.mjs';
import createTamSamSomPrompts from './prompt/tamSamSom.mjs';

// Competitor Analysis prompt
const competitorAnalysisPrompt = `${context}

Competitor Analysis: Provides the top 10 competitors in a detailed comparison table, detailing:

- Revenue
- User base
- Website/mobile app
- Effectiveness
- Main feature
- Pros and cons
- Ownership
- Public status
- Business model (prices)
- Price packages
- Demographics
- Sorted by user base
- Use provided user restrictions to find the strongest competitors.
- Provide competitors with free options as well.`;

// SWOT Analysis prompt
const swotAnalysisPrompt = `${context}

SWOT Analysis: Provides a SWOT analysis for the top 3 strongest competitors in a single table. Columns represent:

- Strengths
- Weaknesses
- Opportunities
- Threats.`;

// Market Landscape prompt
const marketLandscapePrompt = `${context}

Market Landscape: Highlight market landscape:

- Market size: based on the TAM-SAM-SOM analysis, provide real market size with users amount and money amount which can be acquired for this product idea.
- Demographics
- Growth rate
- Pricing: provide recommended pricing.
- Opportunities: highlight opportunities.
- Risks: provide possible risks.
- Use a table to represent Market Landscape.`;

// Features Recommendations prompt
const featuresRecommendationsPrompt = `${context}

Features Recommendations: Recommend what needs to be implemented to compete with current competitors and win some user base.

- List of recommended features in a table with two columns: feature and description.`;

// Marketing Recommendations prompt
const marketingRecommendationsPrompt = `${context}

Marketing Recommendations: Recommend marketing channels to acquire users for this product.

- List of recommended marketing channels in a table with two columns: marketing channel and description.`;

// Alternative Product Ideas prompt
const alternativeProductIdeasPrompt = `${context}

Alternative Product Ideas: Propose alternative product ideas related to the user idea in a table.

- The "Alternative Product Ideas" table should contain columns: product idea, description, why it's better than the original idea.
- The "Alternative Product Ideas" table should contain rows with product ideas, their descriptions, and why they are better than the original idea.
- Propose 5 alternative product ideas.`;


const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY // Requires ANTHROPIC_API_KEY environment variable
});

const analyze = async (prompts) => {
  const message = await anthropic.messages.create({
    max_tokens: 1024,
    model: 'claude-3-5-sonnet-latest',
    system: prompts.system,
    messages: [
      {
        role: 'user',
        content: prompts.user
      }
    ]
  });

  return JSON.parse(message.content[0].text);
}

async function main() {
  try {
    const userInput = {
      problem: "Many small and medium-sized businesses (SMBs) struggle to track and reduce their carbon footprint due to a lack of affordable, user-friendly tools. This prevents them from complying with environmental regulations and meeting consumer expectations for sustainable practices.",
      industry: "Small and medium-sized businesses in retail, manufacturing, and logistics.",
      location: "North America and Europe",
      language: "English",
      platform: "Web and mobile applications",
    }

    const tasks = [
      analyze(createHwwPrompt(userInput)),
      analyze(createTamSamSomPrompts(userInput)),
    ]
    const [hwwResponse, tamSamSomResponse] = await Promise.all(tasks);

    // 1. HWWW analysis
    console.log('1. HWWW analysis');
    console.log(JSON.stringify(hwwResponse, null, 2));

    // 2. TAM-SAM-SOM analysis
    console.log('2. TAM-SAM-SOM analysis');
    console.log(JSON.stringify(tamSamSomResponse, null, 2));

  } catch (error) {
    console.error('Error:', error.message);
  }
}

main().catch(console.error);