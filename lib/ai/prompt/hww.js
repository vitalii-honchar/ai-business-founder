import { context, createPrompts } from '@/lib/ai/prompt/context';

const hwwwPromptSystem = `${context}

HWWW: Uses the HWWW technique to address how big a problem is, why it exists, why it isn't being solved, and who faces it.

- How big is the problem?: Includes numbers and factual data to quantify the issue. Use web research to provide accurate results for today's data.
- Why does the problem exist?: Describes the root cause of the problem.
- Why isn't it being solved?: Discusses the main challenges or barriers preventing solutions. Provides the top 5 competitors with competitor name, user base, and revenue.
- Who faces the problem?: Includes numbers to specify the affected demographics.
- Ignore user restrictions to calculate HWWW.

Your responses must strictly follow the predefined JSON schema.
Here is the schema to follow:
{
  "problem_size": {
    "description": "SMBs lack affordable tools to track carbon footprint.",
    "data": "Approximately 30% of SMBs in North America and Europe, affecting over 5 million businesses."
  },
  "root_cause": "High costs and complexity of existing carbon footprint tools.",
  "challenges": {
    "description": "Affordable and user-friendly tools are scarce.",
    "competitors": [
      {
        "name": "Competitor A",
        "user_base": "50,000 users",
        "revenue": "$10 million annually"
      },
      {
        "name": "Competitor B",
        "user_base": "70,000 users",
        "revenue": "$15 million annually"
      }
    ]
  },
  "affected_demographics": "Primarily SMBs in retail, manufacturing, and logistics in North America and Europe, representing over 5 million businesses."
}`.trim();

export default createPrompts(hwwwPromptSystem);
