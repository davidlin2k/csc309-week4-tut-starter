import { prisma } from "@/lib/prisma";

export class MemeService {
  async generateRandomMeme() {
    // Implement the logic to generate a random meme
    const memes = await prisma.meme.findMany();

    if (memes.length === 0) {
      throw new Error("No memes found");
    }

    const randomIndex = Math.floor(Math.random() * memes.length);
    return memes[randomIndex];
  }

  async createMeme({ title, imageUrl, description, userId }) {
    const newMeme = await prisma.meme.create({
      data: {
        title,
        imageUrl,
        description,
        user: userId ? { connect: { id: userId } } : undefined,
      },
    });

    return newMeme;
  }
}