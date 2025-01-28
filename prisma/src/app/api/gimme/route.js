import { NextResponse } from "next/server";
import { MemeService } from "@/services/meme-service";

const memeService = new MemeService();

export async function GET() {
  try {
    const randomMeme = await memeService.generateRandomMeme();
    return NextResponse.json({ meme: randomMeme.url });
  } catch (error) {
    console.error(error);
    
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
