import { NextResponse } from 'next/server';
import { Client } from '@gradio/client';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File | null;
    const language = (formData.get('language') as string) || 'English'; // Default language

    if (!imageFile) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    // Convert File to Blob for Gradio client
    const imageBlob = new Blob([await imageFile.arrayBuffer()], { type: imageFile.type });

    // Connect to the Gradio client
    // Use process.env.HF_TOKEN for authentication if the space is private
   const client = await Client.connect("dkg-2/Agroshield_disease_prediction", {
  // @ts-ignore - The type definition is incorrect in this pre-release version
  hf_token: process.env.HF_TOKEN,
});


    // Call the /predict endpoint
    const result = await client.predict("/predict", {
      image: imageBlob,
      language: language,
    });

    // Gradio client returns result.data, which is an array.
    // The first element should be the prediction string.
    const predictionResult = (result.data as any[])[0];

    return NextResponse.json({ prediction: predictionResult }, { status: 200 });
  } catch (error) {
    console.error('Error in plant-disease API route:', error);
    // Check if it's a Gradio client error for more specific messages
    if (error instanceof Error) {
      return NextResponse.json({ error: `API Error: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
