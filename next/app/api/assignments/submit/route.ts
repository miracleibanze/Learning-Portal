import { connectDB } from "@lib/db";
import { Answer, AnswerQuestion } from "@lib/models/Answers";
import { Assignment } from "@lib/models/Assignment";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { userId, type, name, assignmentId, answers, codeAnswer } = body;

    console.log(body);

    if (!userId || !assignmentId || !type) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    if (type === "quiz") {
      if (!Array.isArray(answers) || answers.length === 0) {
        return NextResponse.json(
          { message: "No quiz answers provided." },
          { status: 400 }
        );
      }

      await new Answer({
        userId,
        name,
        assignmentId,
        answers,
      }).save();
    }

    if (type === "coding") {
      if (!codeAnswer) {
        return NextResponse.json(
          { message: "No code answer provided." },
          { status: 400 }
        );
      }

      await new Answer({
        userId,
        name,
        assignmentId,
        codeAnswer,
      }).save();
    }

    await Assignment.findByIdAndUpdate(assignmentId, {
      $addToSet: { students: userId }, // add student once
    });

    return NextResponse.json(
      { message: "Answer submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Answer submission error:", error);
    return NextResponse.json(
      { message: "Internal Server Error. Contact +250794881466 for help." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  await connectDB();
  const body = await req.json();
  const { assignmentId, id, name, marks } = body;

  const mark: { id: string; name: string; marks: string } = {
    id,
    name,
    marks,
  };

  console.log("to update :", body);
  const update = await Assignment.findByIdAndUpdate(
    assignmentId,
    { $push: { marks: mark } },
    { upsert: true, new: true }
  );

  if (!update)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  console.log("update :", update);
  return NextResponse.json(update);
}
