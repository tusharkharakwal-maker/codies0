import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact";

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json(
      { message: "Please send a JSON brief." },
      { status: 415 },
    );
  if (Number(request.headers.get("content-length")) > 20_000)
    return NextResponse.json(
      { message: "That brief is a little too long." },
      { status: 413 },
    );
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > 20_000)
      return NextResponse.json(
        { message: "That brief is a little too long." },
        { status: 413 },
      );
    const parsed = contactSchema.safeParse(JSON.parse(body));
    if (!parsed.success)
      return NextResponse.json(
        {
          message: "Please check the details in your brief.",
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    // Integration point: send parsed.data through your email provider here.
    // Keep credentials in server-only environment variables. Add rate limiting
    // and abuse protection before enabling delivery. Do not log submitted PII.
    return NextResponse.json({
      ok: true,
      mode: "preview",
      message: "Brief validated. Email delivery is not configured.",
    });
  } catch {
    return NextResponse.json(
      { message: "We couldn't read that brief. Please try again." },
      { status: 400 },
    );
  }
}
