# AI Founder - Product Requirements Document (Current State)

## 1. Product Overview

### 1.1 Product Description
AI Founder is a SaaS platform designed to replace a business co-founder by providing AI-powered validation and analysis of business ideas. The system currently focuses on the initial validation phase of business development.

### 1.2 Core Features
1. Business Idea Validation
2. Market Analysis
3. Competitor Analysis
4. Validation Scoring System

## 2. Technical Architecture

### 2.1 Frontend
- Next.js application with React components
- Tailwind CSS for styling
- Responsive design supporting both mobile and desktop views

### 2.2 Backend
- Serverless architecture using API routes
- Supabase for database and authentication
- Anthropic's Claude AI (3.5 Sonnet) for analysis

### 2.3 Key Components
1. **Validation Analysis Pipeline**
   - Name Generation
   - HWW Analysis
   - TAM-SAM-SOM Analysis
   - Competitor Analysis
   - Validation Summary

2. **AI Integration**
   - Direct integration with Anthropic's API
   - JSON-structured responses
   - System prompts for specialized analysis
   - 4096 token limit per request

## 3. Current Feature Set

### 3.1 Project Management
- Project creation and deletion
- Project sharing capabilities
- Project status tracking
- Dashboard view with validation scores

### 3.2 Validation Analysis
1. **HWW Analysis**
   - Problem size quantification
   - Root cause analysis
   - Market gap analysis
   - Target demographic analysis

2. **TAM-SAM-SOM Analysis**
   - Market size calculations
   - User base estimations
   - Revenue potential analysis
   - Market restrictions identification

3. **Competitor Analysis**
   - Top 5 competitors identification
   - Revenue and user base analysis
   - Platform comparison
   - SWOT analysis for top 3 competitors

4. **Validation Summary**
   - Worth solving score (1-10)
   - SWOT analysis
   - Alternative problem suggestions
   - Validation recommendations

## 4. Data Structure

### 4.1 Project Data Model
```json
{
    "input": {},
    "tasks": {},
    "access": {},
    "analysis": {
        "validation": {}
    }
}
```


### 4.2 Analysis Components
- Validation Input
- Tasks Status
- Access Control
- Analysis Results

## 5. User Interface

### 5.1 Navigation
- Project-based navigation
- Step-by-step validation process
- Progress tracking

### 5.2 Key Screens
1. Dashboard
2. Project Editor
3. Analysis Views:
   - User Input
   - Problem Research
   - Market Size
   - Competitor Analysis
   - Summary

## 6. Current Limitations

### 6.1 Technical Limitations
- Limited to Claude 3.5 Sonnet capabilities
- Token limit constraints
- Asynchronous analysis processing

### 6.2 User Experience Gaps
- Lack of transparency in AI data sources
- Limited explanation of analysis methodology
- No real-time analysis updates

## 7. Integration Points

### 7.1 External Services
- Anthropic Claude AI
- Supabase Database
- Authentication System

### 7.2 API Structure
- Project Generation
- Project Updates
- Analysis Generation
- Name Updates
- Project Retrieval

## 8. Current User Feedback

### 8.1 Positive Feedback
- Valuable for serial entrepreneurs
- Appreciated by technical users
- Efficient validation process

### 8.2 Areas for Improvement
- AI reasoning transparency
- Data source citations
- Analysis methodology explanation

## 9. Beta Status
- Currently in open beta
- Data persistence not guaranteed
- Actively collecting user feedback
- Feedback form integration