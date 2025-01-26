import createHwwPrompts from '@/lib/ai/prompt/validation/hww';
import createTamSamSomPrompts from '@/lib/ai/prompt/validation/tamSamSom';
import createCompetitorAnalysisPrompts from '@/lib/ai/prompt/validation/competitorAnalysis';
import createValidationSummaryPrompts from '@/lib/ai/prompt/validation/summary';
import createNamePrompts from '@/lib/ai/prompt/validation/name';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

const analyze = (prompts) => {
    return anthropic.messages.create({
        max_tokens: 4096,
        model: 'claude-3-5-sonnet-latest',
        system: prompts.system,
        messages: [
            {
                role: 'user',
                content: prompts.user
            }
        ]
    }).then(message => JSON.parse(message.content[0].text));
};

const analyzeHww = (input) => analyze(createHwwPrompts(input));

const analyzeTamSamSom = (input) => {
    const prompts = createTamSamSomPrompts(input);
    return analyze(prompts);
}

const analyzeCompetitors = (input) => {
    const prompts = createCompetitorAnalysisPrompts(input);
    return analyze(prompts);
}

const summarizeValidation = (input) => {
    const prompts = createValidationSummaryPrompts(input);
    return analyze(prompts);
}

const createName = (input) => {
    const prompts = createNamePrompts(input);
    return analyze(prompts);
}

export { analyzeHww, analyzeTamSamSom, analyzeCompetitors, summarizeValidation, createName };