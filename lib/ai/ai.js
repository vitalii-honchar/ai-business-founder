import createHwwPrompts from '@/lib/ai/prompt/validation/hww';
import createTamSamSomPrompts from '@/lib/ai/prompt/validation/tamSamSom';
import createCompetitorAnalysisPrompts from '@/lib/ai/prompt/validation/competitorAnalysis';
import createValidationSummaryPrompts from '@/lib/ai/prompt/validation/summary';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

const analyze = async (prompts) => {
    const message = await anthropic.messages.create({
        max_tokens: 4096,
        model: 'claude-3-5-sonnet-latest',
        system: prompts.system,
        messages: [
            {
                role: 'user',
                content: prompts.user
            }
        ]
    });

    const response = message.content[0].text;
    console.log('AI response:', response);
    return JSON.parse(response);
};


const analyzeHww = async (input) => analyze(createHwwPrompts(input));

const analyzeTamSamSom = async (input) => {
    const prompts = createTamSamSomPrompts(input);
    return analyze(prompts);
}

const analyzeCompetitors = async (input) => {
    const prompts = createCompetitorAnalysisPrompts(input);
    return analyze(prompts);
}

const summarizeValidation = async (input) => {
    const prompts = createValidationSummaryPrompts(input);
    return analyze(prompts);
}

export { analyzeHww, analyzeTamSamSom, analyzeCompetitors, summarizeValidation };