import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
Generate both a project name and description based on the user input.

NAME GUIDELINES:
- Create a short, catchy name (1-3 words)
- Use business/tech-friendly terminology
- Avoid describing the problem - focus on a distinctive project identity
- Names can be:
  * Single words (e.g. "Nexus", "Catalyst")
  * Compound words (e.g. "DataFlow", "SmartScale")
  * Short phrases (e.g. "Blue Horizon", "Peak Performance")
- The name should be professional and appropriate for a business context
- Do not include words like "Project", "System", or "Solution" in the name

DESCRIPTION GUIDELINES:
- Write a clear, concise description (2-3 sentences)
- Explain the core business problem or challenge being addressed
- Focus on the main objectives and expected outcomes
- Keep it professional and easy to understand
- Avoid technical jargon unless necessary
`.trim();

const schema = {
    "name": "",
    "description": "",
};

export default validationPrompts(instructions, schema);
