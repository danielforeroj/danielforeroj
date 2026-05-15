# Daniel Forero Portfolio

## Updating "Relevant Previous Experience"

The homepage section **Relevant Previous Experience** is driven by `initialHomeContent.relevant_experience` in:

- `data/mockData.ts`

Each item in the array renders one card (smaller than Ventures cards).  
Layout behavior:

- Mobile: 1 card per row
- Tablet: 2 cards per row
- Desktop: 3 cards per row

### Required fields per card

Each experience object should include:

- `company`
- `involvement`
- `industry`
- `niche`
- `description`
- `relevantAccomplishments`

### Example

```ts
relevant_experience: [
  {
    company: "Company Name",
    involvement: "Your role or contribution",
    industry: "Industry category",
    niche: "Specific area of focus",
    description: "What you did and context",
    relevantAccomplishments: "Impact and measurable outcomes"
  }
]
```

After updating content, run:

```bash
npm run build
```
