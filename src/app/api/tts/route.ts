import { NextResponse } from "next/server";
import { UnrealSpeechAPI, play, save } from "unrealspeech";

export async function POST(req: Request, res: Response) {
  const { text, voice } = await req.json();

  const unrealSpeech = new UnrealSpeechAPI(process.env.UNREAL_SPEECH_API_KEY!);

  try {
    const taskId = await unrealSpeech.createSynthesisTask(
      "Hello, world!",
      "Scarlett",
      "192k",
      "word"
    );
    const status = await unrealSpeech.getSynthesisTaskStatus(taskId);
    if (status.TaskStatus !== "completed") return;
    console.log(status);
    return NextResponse.json({ status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
