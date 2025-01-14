import { context, createPrompts } from '@/lib/ai/prompt/context';

const hwwwPromptSystem = `${context}

HWWW: Uses the HWWW technique to address how big a problem is, why it exists, why it isn't being solved, and who faces it.

- How big a problem is this?: Includes numbers and factual data to quantify the issue. Use web research to provide accurate results for today's data.
- Why does the problem exist?: Describes the root cause of the problem.
- Why is nobody solving it?: Discusses the main challenges or barriers preventing solutions.
- Who faces the problem?: Includes numbers to specify the affected demographics.
- Ignore user restrictions to calculate HWWW.

Your responses must strictly follow the predefined JSON schema.
Here is the schema to follow:
{
  "how_big_a_problem_is": {
    "overview": {
      "description": "Small businesses and freelancers often lack the technical expertise to create AI-based document parsers, which can lead to inefficiencies and increased costs.",
      "size": 30000000,
      "dimension": "small businesses"
    },
    "frequency": [
      {
        "name": "Daily Operations",
        "explanation": "Many small businesses and freelancers deal with contracts, invoices, and other critical documents on a daily basis, requiring regular data extraction and analysis. For instance, the frequency of handling documents for financial transactions, legal compliance, and client communications is high."
      },
      {
        "name": "Recurring Need",
        "explanation": "Tasks such as reviewing contracts, processing invoices, and extracting data from various documents are recurring needs. A 2018 study found that 82% of businesses face issues with manual data entry, indicating a frequent need for automated solutions"
      },
      {
        "name": "Scaling with Growth",
        "explanation": "As businesses grow, the volume of documents they handle increases, further intensifying the need for efficient parsing tools. The adoption of digital tools and AI solutions has been accelerating, particularly post-pandemic, with many businesses integrating more technology into their workflows"
      }
    ],
    "readiness_to_pay": {
      "summary": "The market is ready and willing to pay for an app that solves the problem of automating document parsing and data extraction. The growing adoption of NoCode and AI tools, combined with the significant pain points and cost savings associated with manual data entry, make it highly likely that businesses will invest in such a solution. The competitive pricing of $10 per month aligns well with the budget constraints of small businesses, freelancers, and entrepreneurs.",
      "pricing": 10,
      "researches": [
        {
          "research": "Willingness to Pay for Automation",
          "explanation": "A survey by Zapier found that 63% of small businesses are already using automation tools, and 88% of them say it allows them to compete with larger companies. This indicates a high level of acceptance and willingness to invest in automation tools that solve real business problems"
        },
        {
          "research": "ROI on Automation Tools",
          "explanation: "Another study by McKinsey shows that businesses that adopt automation tools see an average ROI of 30-200% in the first year, further incentivizing the investment in such tools"
        }
      ]
    }
  },
  "why_does_this_problem_exist": {
    "summary": "Creating AI parsers typically requires significant technical expertise and resources that small businesses and freelancers do not possess.",
  },
  "why_nobody_solving_it": {
    "summary": "Existing solutions are either too complex, expensive, or require technical skills to set up and maintain. Many small businesses and freelancers cannot afford the time or cost associated with these solutions.",
  },
  "who_faces_this_problem": {
    "summary": "Around 30 million small businesses in the U.S., plus millions more in other English-speaking developed countries. Entrepreneurs and freelancers also face this problem, totaling a significant portion of the workforce in these regions.",
    "metrics": {
      "characteristics": [
        {
          "name": "Age",
          "value": "25-45 y.o"
        },
        {
          "name": "Occupation",
          "value": "Small business owners, entrepreneurs, freelancers, remote workers, consultants."
        },
        {
          "name": "Education Level",
          "value": "College-educated, often with degrees in business, technology, or liberal arts"
        },
        {
          "name": "Technical Proficiency",
          "value": "Intermediate; comfortable with basic software tools but not experts in AI or programming"
        }
      ],
      "geography": [
        "English-speaking developed countries, primarily the United States, Canada, the United Kingdom, Australia, and New Zealand."
      ],
      "psychology_patterns": [
        {
          "name": "Efficiency Seekers",
          "value": "Individuals who value productivity and efficiency, often looking for tools to automate repetitive tasks"
        },
        {
          "name": "Cost-Conscious",
          "value": "Small business owners and freelancers who are mindful of their budget and look for cost-effective solutions"
        },
        {
          "name": "DIY Mindset",
          "value": "Prefer to do things themselves rather than relying on external technical support"
        },
      ],
      "specific_interests": [
        "Interested in starting and growing their business",
        "Interested in technology and automation but lack deep technical skills",
        "Interested in improving business processes and increasing productivity"
      ],
      "habitual_behaviour": [
        {
          "name": "Routine Comfort",
          "value": "Prefer tools and platforms that fit seamlessly into their existing workflows without a steep learning curve"
        },
        {
          "name": "Trial and Error",
          "value": "Willing to experiment with new tools if they promise significant time savings or efficiency gains"
        },
        {
          "name": "Frequent Research",
          "value": "Regularly search online for new tools and resources to improve their business operations"
        },
      ],
      "trust_issues": [
        {
          "name": "Skeptical of New Solutions",
          "value": "May require strong testimonials and clear value propositions to trust new platforms"
        },
        {
          "name": "Data Privacy Concerns",
          "value": "Highly sensitive about the security and privacy of their business data, especially when using cloud-based solutions"
        }
      ],
      "where_to_find_them": [
        {
          "name": "Online Communities",
          "value": "Active in forums and groups related to small business management, entrepreneurship, and freelancing (e.g., Reddit, LinkedIn groups)"
        },
        {
          "name": "Social Media",
          "value": "Follow pages and influencers on platforms like LinkedIn, Twitter, and Facebook who discuss productivity tools and business automation"
        },
        {
          "name": "Professional Networks",
          "value": "Engage in professional networks such as Chambers of Commerce, local business associations, and industry-specific groups"
        },
        {
          "name": "Webinars and Online Courses",
          "value": "Participate in webinars and online courses focused on business growth, productivity, and automation"
        }
      ]
    }
  }
}`.trim();

export default createPrompts(hwwwPromptSystem);
