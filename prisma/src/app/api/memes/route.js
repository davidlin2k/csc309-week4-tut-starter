import { NextResponse } from "next/server";
import { MemeService } from "@/services/meme-service";

const memeService = new MemeService();

export async function POST(req) {
  try {
    // For now, we assume that userId is passed in the request body
    const data = await req.json();
    const { title, imageUrl, description, userId } = data;

    // Simple validation to ensure required fields are present
    if (!title || !imageUrl || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    const newMeme = await memeService.createMeme({ title, imageUrl, description, userId });

    return NextResponse.json({ meme: newMeme }, { status: 201 });
  } catch (error) {
    console.error(error);
    
    // Return a generic error message for now
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
