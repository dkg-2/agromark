import { NextResponse } from 'next/server';
import { Client } from '@gradio/client';

export async function POST(request: Request) {
  try {
    const { N, P, K, temperature, humidity, ph, rainfall } = await request.json();

    // Validate input (basic validation for numbers)
    if (
      typeof N !== 'number' ||
      typeof P !== 'number' ||
      typeof K !== 'number' ||
      typeof temperature !== 'number' ||
      typeof humidity !== 'number' ||
      typeof ph !== 'number' ||
      typeof rainfall !== 'number'
    ) {
      return NextResponse.json({ error: 'Invalid input data. All parameters must be numbers.' }, { status: 400 });
    }

    // Connect to the Gradio client
    // Use process.env.HF_TOKEN for authentication if the space is private
   const client = await Client.connect("dkg-2/Agroshield_Crop_Recommendation", {
  // @ts-ignore - The type definition is incorrect in this pre-release version
  hf_token: process.env.HF_TOKEN,
});


    // Call the /recommend_crop endpoint
    const result = await client.predict("/recommend_crop", {
      N,
      P,
      K,
      temperature,
      humidity,
      ph,
      rainfall,
    });

    // Gradio client returns result.data, which is an array.
    // The first element should be the recommendation string.
    const recommendation = result.data[0];

    return NextResponse.json({ recommendation }, { status: 200 });
  } catch (error) {
    console.error('Error in crop-recommendation API route:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: `API Error: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
