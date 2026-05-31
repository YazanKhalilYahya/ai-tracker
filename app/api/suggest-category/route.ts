import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { description } = await request.json();
    // First API call with reasoning
    const apiResponse = await client.chat.completions.create({
      model: "openai/gpt-oss-120b:free",
      messages: [
        {
          role: "system",
          content: `You are an expense categorization assistant. Choose exactly ONE category from the following list: [Food & Dining, Transportation,
            Shopping, Entertainment, Bills & Utilities, Healthcare, Education, Travel, Personal Care, Saving,
             Other]. Respond with only the category name, nothing else.
             Example responses: 
             "Food & Dining"
             "Transportation"
             `,
        },

        {
          role: "user" as const,
          content: `Categorize this expense: ${description}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 20,
    });

    const suggestedCategory =
      apiResponse.choices[0]?.message?.content?.trim() || "Other";
    return NextResponse.json({ category: suggestedCategory });
  } catch (error) {
    console.error("Error suggesting category:", error);
    return NextResponse.json(
      { error: "Failed to suggest category" },
      { status: 500 },
    );
  }
}
