import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type TarotRequestBody = {
  fullName?: string;
  email?: string;
  topic?: string;
  question?: string;
  additionalNotes?: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date());
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TarotRequestBody;

    const fullName = body.fullName?.trim();
    const email = body.email?.trim();
    const topic = body.topic?.trim();
    const question = body.question?.trim();
    const additionalNotes = body.additionalNotes?.trim();

    if (!fullName || !email || !topic || !question) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 },
      );
    }

    if (
      !process.env.GMAIL_USER ||
      !process.env.GMAIL_APP_PASSWORD ||
      !process.env.GMAIL_RECEIVER
    ) {
      return NextResponse.json(
        { message: "Missing Gmail environment variables." },
        { status: 500 },
      );
    }

    const submittedAt = formatDate();

    const safeFullName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safeTopic = escapeHtml(topic);
    const safeQuestion = escapeHtml(question);
    const safeAdditionalNotes = escapeHtml(
      additionalNotes || "No additional notes.",
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"BestFlace Tarot" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_RECEIVER,
      replyTo: email,
      subject: `🌊 New Tarot Request from ${fullName} — ${topic}`,
      text: `
New Tarot Request from The Guidance Room

Submitted At:
${submittedAt}

Full Name:
${fullName}

Email Address:
${email}

Topic:
${topic}

Question / Story:
${question}

Additional Notes:
${additionalNotes || "No additional notes."}
      `,
      html: `
      <!DOCTYPE html>
      <html>
        <body style="margin:0; padding:0; background:#e9fbfb; font-family: Arial, sans-serif; color:#0f172a;">
          <div style="max-width:680px; margin:0 auto; padding:32px 18px;">
            <div style="
              background:linear-gradient(135deg,#bff9f4 0%,#e8fffb 45%,#fff8e8 100%);
              border:1px solid rgba(8,145,178,0.28);
              border-radius:28px;
              padding:28px;
              box-shadow:0 18px 45px rgba(15,23,42,0.12);
            ">
              <div style="text-align:center; padding-bottom:22px; border-bottom:1px solid rgba(8,145,178,0.22);">
                <div style="
                  display:inline-block;
                  padding:8px 14px;
                  border-radius:999px;
                  background:rgba(255,255,255,0.55);
                  border:1px solid rgba(8,145,178,0.22);
                  color:#0e7490;
                  font-size:12px;
                  font-weight:700;
                  letter-spacing:2px;
                  text-transform:uppercase;
                ">
                  BestFlace Tarot
                </div>

                <h1 style="
                  margin:18px 0 8px;
                  font-family: Georgia, 'Times New Roman', serif;
                  font-size:32px;
                  line-height:1.2;
                  color:#0f172a;
                ">
                  The Guidance Room
                </h1>

                <p style="margin:0; font-size:14px; line-height:1.7; color:rgba(15,23,42,0.68);">
                  A new story has arrived by the sea of intuition.
                </p>
              </div>

              <div style="padding:22px 0;">
                <div style="
                  background:rgba(255,255,255,0.72);
                  border:1px solid rgba(8,145,178,0.18);
                  border-radius:22px;
                  padding:18px 20px;
                  margin-bottom:16px;
                ">
                  <p style="margin:0 0 6px; font-size:12px; font-weight:700; color:#0e7490; text-transform:uppercase; letter-spacing:1.4px;">
                    Submitted At
                  </p>
                  <p style="margin:0; font-size:15px; color:#0f172a;">
                    ${submittedAt}
                  </p>
                </div>

                <div style="display:grid; gap:14px;">
                  <div style="
                    background:#fffaf0;
                    border:1px solid rgba(8,145,178,0.18);
                    border-radius:20px;
                    padding:16px 18px;
                  ">
                    <p style="margin:0 0 6px; font-size:12px; font-weight:700; color:#0e7490; text-transform:uppercase; letter-spacing:1.4px;">
                      Full Name
                    </p>
                    <p style="margin:0; font-size:16px; line-height:1.6; color:#0f172a;">
                      ${safeFullName}
                    </p>
                  </div>

                  <div style="
                    background:#fffaf0;
                    border:1px solid rgba(8,145,178,0.18);
                    border-radius:20px;
                    padding:16px 18px;
                  ">
                    <p style="margin:0 0 6px; font-size:12px; font-weight:700; color:#0e7490; text-transform:uppercase; letter-spacing:1.4px;">
                      Email Address
                    </p>
                    <p style="margin:0; font-size:16px; line-height:1.6; color:#0f172a;">
                      <a href="mailto:${safeEmail}" style="color:#0891b2; text-decoration:none; font-weight:700;">
                        ${safeEmail}
                      </a>
                    </p>
                  </div>

                  <div style="
                    background:#fffaf0;
                    border:1px solid rgba(8,145,178,0.18);
                    border-radius:20px;
                    padding:16px 18px;
                  ">
                    <p style="margin:0 0 6px; font-size:12px; font-weight:700; color:#0e7490; text-transform:uppercase; letter-spacing:1.4px;">
                      Topic
                    </p>
                    <p style="margin:0; font-size:16px; line-height:1.6; color:#0f172a;">
                      ${safeTopic}
                    </p>
                  </div>

                  <div style="
                    background:#ffffff;
                    border:1px solid rgba(8,145,178,0.22);
                    border-radius:22px;
                    padding:18px 20px;
                  ">
                    <p style="margin:0 0 10px; font-size:12px; font-weight:700; color:#0e7490; text-transform:uppercase; letter-spacing:1.4px;">
                      Question / Story
                    </p>
                    <p style="
                      margin:0;
                      font-size:16px;
                      line-height:1.8;
                      color:#0f172a;
                      white-space:pre-wrap;
                    ">${safeQuestion}</p>
                  </div>

                  <div style="
                    background:#ffffff;
                    border:1px solid rgba(8,145,178,0.22);
                    border-radius:22px;
                    padding:18px 20px;
                  ">
                    <p style="margin:0 0 10px; font-size:12px; font-weight:700; color:#0e7490; text-transform:uppercase; letter-spacing:1.4px;">
                      Additional Notes
                    </p>
                    <p style="
                      margin:0;
                      font-size:16px;
                      line-height:1.8;
                      color:#0f172a;
                      white-space:pre-wrap;
                    ">${safeAdditionalNotes}</p>
                  </div>
                </div>
              </div>

              <div style="
                margin-top:8px;
                padding-top:18px;
                border-top:1px solid rgba(8,145,178,0.22);
                text-align:center;
              ">
                <p style="
                  margin:0;
                  font-family: Georgia, 'Times New Roman', serif;
                  font-size:18px;
                  line-height:1.6;
                  color:#0f172a;
                ">
                  Reply to this email to answer the sender directly.
                </p>
                <p style="margin:8px 0 0; font-size:12px; color:rgba(15,23,42,0.55);">
                  BestFlace — Between Logic & Intuition
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
      `,
    });

    return NextResponse.json(
      { message: "Tarot request sent successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Tarot email error:", error);

    return NextResponse.json(
      { message: "Failed to send Tarot request." },
      { status: 500 },
    );
  }
}
