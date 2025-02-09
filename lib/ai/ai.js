import createHwwPrompts from '@/lib/ai/prompt/validation/hww';
import createTamSamSomPrompts from '@/lib/ai/prompt/validation/tamSamSom';
import createCompetitorAnalysisPrompts from '@/lib/ai/prompt/validation/competitorAnalysis';
import createValidationSummaryPrompts from '@/lib/ai/prompt/validation/summary';
import createNamePrompts from '@/lib/ai/prompt/validation/name';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

const analyze = (prompts, maxTokens = 4096) => {
    return anthropic.messages.create({
        max_tokens: maxTokens,
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

const analyzeTamSamSom = (input) => analyze(createTamSamSomPrompts(input));

const analyzeCompetitors = (input) => analyze(createCompetitorAnalysisPrompts(input));

const summarizeValidation = (input) => {
    const prompts = createValidationSummaryPrompts(input);
    return analyze(prompts, 8192);
};

const createName = (input) => analyze(createNamePrompts(input));

export { analyzeHww, analyzeTamSamSom, analyzeCompetitors, summarizeValidation, createName };