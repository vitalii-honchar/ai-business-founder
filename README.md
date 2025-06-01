# ai-business-founder

## Development

### Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` - supabase url
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - supabase key
- `ANTHROPIC_API_KEY` - anthropic key
- `BASE_URL` - base url for the application
- `NODE_ENV` - environment (development, production, etc.)
- `NEXT_PUBLIC_API_URL` - next js url
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics measurement ID
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_HOBBY_PRICE_ID` - Stripe price ID for hobby plan
- `STRIPE_PRO_PRICE_ID` - Stripe price ID for pro plan

### Build process

1. Define env varibales in the `.env` file
2. Run `npm run docker-build`
