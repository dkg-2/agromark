import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';
import { marked } from 'marked';

// Initialize Groq client with API key from environment variables
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    // Prepare messages for Groq API, ensuring content is a string
    const formattedMessages = messages.map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: String(msg.text), // Ensure content is a string
    }));

    const chatCompletion = await groq.chat.completions.create({
      messages: formattedMessages,
      model: 'groq/compound', // As specified in your documentation
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false, // For now, we'll get the full response; streaming can be added later
      stop: null,
      compound_custom: {
        tools: {
          enabled_tools: ['web_search', 'code_interpreter', 'visit_website'],
        },
      },
    });

    // Extract the markdown content from the response
    const markdownContent =
      chatCompletion.choices[0]?.message?.content || 'No response from AI.';

    // Convert markdown to HTML
    const htmlContent = await marked.parse(markdownContent);

    return NextResponse.json({ response: htmlContent }, { status: 200 });
  } catch (error) {
    console.error('Error in chat API route:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: `API Error: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
