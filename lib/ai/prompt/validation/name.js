import { validationPrompts } from '@/lib/ai/prompt/context';

const instructions = `
- Analyze user input and generate a name for a business problem.
`.trim();

const schema = {
    "name": "",
};

export default validationPrompts(instructions, schema);
