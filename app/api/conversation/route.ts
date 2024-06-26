import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_API_BASE_URL,
});

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!process.env.OPENAI_API_KEY) {
            return new NextResponse("OpenAI API Key not configured.", {
                status: 500,
            });
        }

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                // { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: "You are a helpful assistant?" },
            ],
        });

        console.log(response.choices[0].message);
        return NextResponse.json(response.choices[0].message);
    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
