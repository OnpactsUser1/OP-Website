import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact";

function ticketReference() {
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  return `OP-${date}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form submission." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (String(form.get("company") ?? "")) {
    return NextResponse.json({ ok: true, ticket: ticketReference() });
  }

  const files = form.getAll("attachments").filter((v): v is File => v instanceof File && v.size > 0);
  const payload = {
    name: String(form.get("name") ?? ""),
    email: String(form.get("email") ?? ""),
    subject: String(form.get("subject") ?? ""),
    message: String(form.get("message") ?? ""),
  };

  const errors = validateContact({ ...payload, files });
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const ticket = ticketReference();

  // TODO(email-provider): deliver this message to support@onpacts.com
  // (e.g. Resend, Postmark, SendGrid or Amazon SES) and send the visitor an
  // acknowledgement quoting `ticket`. Attachments are available in `files`.
  // Note: Vercel Functions cap request bodies at 4.5 MB, so for 3 × 5 MB
  // attachments switch to direct-to-storage uploads (signed URLs) before launch.
  console.info("[contact] new message", {
    ticket,
    subject: payload.subject,
    attachments: files.map((f) => ({ name: f.name, size: f.size })),
  });

  return NextResponse.json({ ok: true, ticket });
}
