import createHwwPrompts from '@/lib/ai/prompt/hww';
import createTamSamSomPrompts from '@/lib/ai/prompt/tamSamSom';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

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
};


const analyzeHww = async (input) => analyze(createHwwPrompts(input));

const analyzeTamSamSom = async (input) => analyze(createTamSamSomPrompts(input));

export { analyzeHww, analyzeTamSamSom };