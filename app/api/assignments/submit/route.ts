import { connectDB } from "@lib/db";
import { Answer } from "@lib/models/Answers";
import { Question } from "@lib/models/Answers"; // this exports "AnswersQuestion" model
import { Assignment } from "@lib/models/Assignment";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const {
      title,
      description,
      userId,
      type,
      name,
      assignmentId,
      questions,
      codeAnswer,
    } = body;

    console.log("body: ", body);

    if (type === "quiz") {
      // Step 1: Create and save each question document
      const questionIds = await Promise.all(
        questions.map(async (q: any) => {
          const questionDoc = new Question({
            question: q.question,
            options: q.options,
            correctIndex: q.correctIndex,
            choice: q.choice,
          });
          const savedQuestion = await questionDoc.save();
          return savedQuestion._id;
        })
      );

      console.error("Submitting quiz 1");
      // Step 2: Create the answer document referencing question IDs
      const answer = new Answer({
        title,
        description,
        type,
        userId,
        name,
        assignmentId,
        questions: questionIds,
      });
      await answer.save();
    }

    if (type === "coding") {
      const answer = new Answer({
        title,
        description,
        userId,
        type,
        name,
        assignmentId,
        codeAnswer,
      });
      await answer.save();
    }

    await Assignment.findByIdAndUpdate(assignmentId, {
      $addToSet: { students: userId }, // avoid duplicates
    });

    // console.error("assignment: ", updatedAssignment);

    return NextResponse.json(
      { message: "Answer submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Registration error:", error);
    return NextResponse.json(
      { message: "Internal Server Error, Contact +250794881466 for help." },
      { status: 500 }
    );
  }
}
