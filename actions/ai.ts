"use server";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
import dbConnect from "@/utils/db-connect";
import Query from "@/models/query";
export async function runAi(data: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = data;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

export async function saveQuery(
  template: object,
  email: string,
  query: string,
  content: string
) {
  try {
    await dbConnect();
    const newQuery = new Query({
      template,
      email,
      query,
      content,
    });
    await newQuery.save();
    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
}
export async function getQueries(
  email: string,
  page: number,
  pageSize: number
) {
  try {
    await dbConnect();
    // const queries = Query.find({ email }).sort({ createdAt: -1 });
    const skip = (page - 1) * pageSize;
    const totalQueries = await Query.countDocuments({ email });
    const queries = await Query.find({ email })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });
    return {
      queries,
      totalPages: Math.ceil(totalQueries / pageSize),
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
}

export async function usageCount(email: string) {
  await dbConnect();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentmonth = currentDate.getMonth() + 1;

  const result = await Query.aggregate([
    {
      $match: {
        email: email,
        $expr: {
          $and: [
            { $eq: [{ $year: "$createdAt" }, currentYear] },
            { $eq: [{ $month: "$createdAt" }, currentmonth] },
          ],
        },
      },
    },
    {
      $project: {
        wordCount: {
          $size: {
            $split: [{ $trim: { input: "$content" } }, " "],
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        totalWords: { $sum: "$wordCount" },
      },
    },
  ]);
  return result.length > 0 ? result[0].totalWords : 0;
}
