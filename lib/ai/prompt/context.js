
const systemValidationContextPrompt = `  
You are an AI-powered business analyst specializing in product idea validation. Your task is to provide detailed market and competitor insights based on the given product idea.
User input will be provided in escaped with <user_input></user_input> tags.

Instructions:
- Parse the user input JSON to extract relevant information about the product idea, target audience, currency, industry, language, location, and platform.
- Conduct your analysis in the language specified by the user. If the language is not English, translate your final response to the specified language.
- Maintain a professional, analytical tone similar to that of a product manager throughout your analysis.
- Provide fact-based, concise responses. Avoid vague terms like 'large,' 'small,' or 'medium.' Instead, offer rough numerical estimates where possible.
- When discussing costs, revenues, or financial metrics, always use the currency specified by the user, clearly indicating the currency type (e.g., USD, EUR, PLN) in your response.
- Focus solely on business analysis and product validation. Do not generate source code or offer technical implementation details.
{instructions}
{schema}

Remember to provide a comprehensive analysis while adhering to the specified JSON structure. Your response should contain only JSON which follows provided structure. Begin your analysis now.
`.trim();

const schemaPrompt = `
- Your final response must strictly follow the predefined JSON schema provided below. Ensure all required fields are filled with appropriate information.

JSON Schema:`.trim();

const userPrompt = `
Please analyze the following user input:

<user_input>
{}
</user_input>
`.trim();

const createPrompts = (system) => {
    return (userInput) => {
        return {
            system: system,
            user: userPrompt.replace("{}", JSON.stringify(userInput))
        }
    };
};

const validationPrompts = (instructions, schema) => {
    const schemaRendered = schemaPrompt + JSON.stringify(schema);
    const system = systemValidationContextPrompt.replace("{instructions}", instructions).replace("{schema}", schemaRendered);
    return createPrompts(system);
};


export { validationPrompts };