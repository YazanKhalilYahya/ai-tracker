import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

type RecordItem = {
  id: string;
  text: string;
  amount: number;
  category: string;
  date: Date;
  userId: string;
  createdAt: Date;
};

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");

    let dateFilter = {};

    if (month && month !== "all") {
      const [year, monthNumber] = month.split("-").map(Number);

      if (!year || !monthNumber || monthNumber < 1 || monthNumber > 12) {
        return NextResponse.json(
          { error: "Invalid month format. Use YYYY-MM." },
          { status: 400 },
        );
      }

      const startDate = new Date(year, monthNumber - 1, 1);
      const endDate = new Date(year, monthNumber, 1);

      dateFilter = {
        gte: startDate,
        lt: endDate,
      };
    } else {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      dateFilter = {
        gte: thirtyDaysAgo,
      };
    }

    const records = await prisma.record.findMany({
      where: {
        userId: user.id,
        date: dateFilter,
      },
      orderBy: {
        date: "desc",
      },
    });

    if (records.length === 0) {
      return NextResponse.json({
        insights: [],
        message: "No expenses to analyze",
      });
    }

    const expenseSummary = prepareExpenseSummary(records, month);

    const apiResponse = await client.chat.completions.create({
      model: "openai/gpt-oss-120b:free",
      messages: [
        {
          role: "system",
          content: `You are a financial advisor AI. Analyze the user's spending data and provide 3-4 actionable insights.
For each insight, provide:
1. category: The spending category (e.g. "Shopping", "Transportation", "Food & Dining").
2. type: Either "warning" (overspending), "success" (good habits) or "info" (general advice).
3. title: A short, catchy title (e.g. "High spending on Shopping").
4. message: A brief explanation of what you noticed (1-2 sentences, include specific amounts).
5. recommendation: Specific actionable advice (1-2 sentences).
Respond ONLY with a valid JSON array. Example format:
[
  {
    "category": "Shopping",
    "type": "warning",
    "title": "High Spending on Shopping",
    "message": "You spent $50.00 on shopping for a bed, which is a significant portion of your recent expenses.",
    "recommendation": "Consider comparing prices or waiting for sales before making large purchases."
  }
]`,
        },
        {
          role: "user" as const,
          content: `Analyze this spending data and provide insights:\n\n${expenseSummary}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const aiResponse = apiResponse.choices[0]?.message?.content?.trim() || "[]";

    let insights;

    try {
      insights = JSON.parse(aiResponse);
    } catch (parseError) {
      insights = generateFallbackInsights(records);
    }

    insights = insights.map((insight: any, index: number) => ({
      id: `insight-${index}`,
      ...insight,
    }));

    return NextResponse.json({
      insights,
      message: "Insights generated successfully",
    });
  } catch (error) {
    console.error("Error generating AI insights:", error);
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 },
    );
  }
}

function prepareExpenseSummary(records: RecordItem[], month?: string | null) {
  const categoryTotals: { [key: string]: number } = {};

  records.forEach((record) => {
    if (categoryTotals[record.category]) {
      categoryTotals[record.category] += record.amount;
    } else {
      categoryTotals[record.category] = record.amount;
    }
  });

  const totalSpending = records.reduce((sum, r) => sum + r.amount, 0);

  const sortedRecords = [...records]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  const periodLabel = month && month !== "all" ? month : "last 30 days";

  return `
Analysis Period: ${periodLabel}
Total Expenses: ${records.length} transactions
Total Amount: $${totalSpending.toFixed(2)}

Spending by Category:
${Object.entries(categoryTotals)
  .map(([cat, amount]) => {
    const numericAmount = Number(amount);
    const percentage = totalSpending
      ? ((numericAmount / totalSpending) * 100).toFixed(1)
      : "0.0";

    return `- ${cat}: $${numericAmount.toFixed(2)} (${percentage}%)`;
  })
  .join("\n")}

Top 5 Expenses:
${sortedRecords
  .map((r) => `- $${r.amount.toFixed(2)} on ${r.text} (${r.category})`)
  .join("\n")}
`;
}

function generateFallbackInsights(records: RecordItem[]) {
  const insights = [];

  const categoryTotals: { [key: string]: number } = {};

  records.forEach((record) => {
    categoryTotals[record.category] =
      (categoryTotals[record.category] || 0) + record.amount;
  });

  const highestCategory = Object.entries(categoryTotals).sort(
    ([, a], [, b]) => b - a,
  )[0];

  if (highestCategory) {
    insights.push({
      category: highestCategory[0],
      type: "warning",
      title: `High Spending on ${highestCategory[0]}`,
      message: `You spent $${highestCategory[1].toFixed(2)} on ${highestCategory[0]}, which is a significant portion of your recent expenses.`,
      recommendation:
        "Consider setting a budget limit for this category and tracking it weekly.",
    });
  }

  insights.push({
    category: "Budget",
    type: "info",
    title: "Track Your Spending Regularly",
    message: "Regular expense tracking helps you stay on top of your finances.",
    recommendation:
      "Review your expenses weekly to identify patterns and adjust your budget accordingly.",
  });

  return insights;
}

/*import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // fetch user's recent expenses (last 30 days)

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const records = await prisma.record.findMany({
      where: {
        userId: user.id,
        date: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    // if no expenses, return empty insights

    if (records.length === 0) {
      return NextResponse.json({
        insights: [],
        message: "No expenses to analyze",
      });
    }

    // Prepare expense summary for AI
    const expenseSummary = prepareExpenseSummary(records);

    const apiResponse = await client.chat.completions.create({
      model: "openai/gpt-oss-120b:free",
      messages: [
        {
          role: "system",
          content: `You are a financial advisor AI. Analyze the user's spending data and provide 3-4 actionable insights. 
          For each insight, provide: 
          1. category: The spending category (e.g. "Shopping", "Transportation", "Food & Dining").
          2. type: Either "warning" (overspending), "success" (good habits) or "info" (general advice).
          3. title: A short, catchy title (e.g. "High spending on Shopping").
          4. message: A brief explanation of what you noticed (1-2 sentences, include specific amounts).
          5. recommendation: Specific actionable advice (1-2 sentences).
          Respond ONLY with a valid JSON array. Example format:
          [
            {
              "category": "Shopping",
              "type": "warning",
              "title": "High Spending on Shopping",
              "message": "You spent $50.00 on shopping for a bed, which is a significant portion of your recent expenses.",
              "recommendation": "Consider comparing prices or waiting for sales before making large purchases." 
            }
          ]`,
        },

        {
          role: "user" as const,
          content: `Analyze this spending data and provide insights:\n\n${expenseSummary}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    // call AI to generate insights

    const aiResponse = apiResponse.choices[0]?.message?.content?.trim() || "[]";

    let insights;

    try {
      insights = JSON.parse(aiResponse);
    } catch (parseError) {
      // if AI doesn't return a valid JSON, provide fallback insights
      insights = generateFallbackInsights(records);
    }

    // Add unique IDs to insights
    insights = insights.map((insight: any, index: number) => ({
      id: `insight-${index}`,
      ...insight,
    }));

    return NextResponse.json({
      insights,
      message: "Insights generated successfully",
    });
  } catch (error) {
    console.error("Error generating AI insights:", error);
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 },
    );
  }
}

function prepareExpenseSummary(records: any[]) {
  // Calculate totals by category
  const categoryTotals: { [key: string]: number } = {};

  records.forEach((record) => {
    if (categoryTotals[record.category]) {
      categoryTotals[record.category] += record.amount;
    } else {
      categoryTotals[record.category] = record.amount;
    }
  });

  // Calculate total spending
  const totalSpending = records.reduce((sum, r) => sum + r.amount, 0);

  // Find highest expenses
  const sortedRecords = [...records]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return `
Total Expenses: ${records.length} transactions
Total Amount: $${totalSpending.toFixed(2)}

Spending by Category:
${Object.entries(categoryTotals)
  .map(
    ([cat, amount]) =>
      `- ${cat}: $${amount.toFixed(2)} (${((amount / totalSpending) * 100).toFixed(1)}%)`,
  )
  .join("\n")}

Top 5 Expenses:
${sortedRecords.map((r) => `- $${r.amount.toFixed(2)} on ${r.text} (${r.category})`).join("\n")}
`;
}

function generateFallbackInsights(records: any[]) {
  const insights = [];

  // Calculate category spending
  const categoryTotals: { [key: string]: number } = {};
  records.forEach((record) => {
    categoryTotals[record.category] =
      (categoryTotals[record.category] || 0) + record.amount;
  });

  // Find highest spending category
  const highestCategory = Object.entries(categoryTotals).sort(
    ([, a], [, b]) => b - a,
  )[0];

  if (highestCategory) {
    insights.push({
      category: highestCategory[0],
      type: "warning",
      title: `High Spending on ${highestCategory[0]}`,
      message: `You spent $${highestCategory[1].toFixed(2)} on ${highestCategory[0]}, which is a significant portion of your recent expenses.`,
      recommendation:
        "Consider setting a budget limit for this category and tracking it weekly.",
    });
  }

  // Add general advice
  insights.push({
    category: "Budget",
    type: "info",
    title: "Track Your Spending Regularly",
    message: "Regular expense tracking helps you stay on top of your finances.",
    recommendation:
      "Review your expenses weekly to identify patterns and adjust your budget accordingly.",
  });

  return insights;
}
*/
