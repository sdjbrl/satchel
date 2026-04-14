import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const phone = formData.get("phone") as string | null;
  const message = formData.get("message") as string | null;
  const file = formData.get("file") as File | null;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
  }

  const attachments: { filename: string; content: Buffer }[] = [];

  if (file && file.size > 0) {
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Fichier trop volumineux (max 5 Mo)." }, { status: 400 });
    }
    const bytes = await file.arrayBuffer();
    attachments.push({
      filename: file.name,
      content: Buffer.from(bytes),
    });
  }

  const { error } = await resend.emails.send({
    from: "Contact <contact@saiddev.fr>",
    to: "pro.saidahmed@yahoo.com",
    replyTo: email,
    subject: `Nouveau message de ${name} — saiddev.fr`,
    attachments,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <h2 style="color:#0f172a;margin-bottom:24px">Nouveau message depuis saiddev.fr</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:12px;background:#f8fafc;font-weight:600;width:120px;border-radius:4px 0 0 4px">Nom</td>
            <td style="padding:12px;background:#f1f5f9;border-radius:0 4px 4px 0">${name}</td>
          </tr>
          <tr>
            <td style="padding:12px;font-weight:600">Email</td>
            <td style="padding:12px"><a href="mailto:${email}" style="color:#0891b2">${email}</a></td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding:12px;background:#f8fafc;font-weight:600;border-radius:4px 0 0 4px">Téléphone</td>
            <td style="padding:12px;background:#f1f5f9;border-radius:0 4px 4px 0">${phone}</td>
          </tr>` : ""}
          <tr>
            <td style="padding:12px;font-weight:600;vertical-align:top">Message</td>
            <td style="padding:12px;white-space:pre-wrap">${message}</td>
          </tr>
          ${file && file.size > 0 ? `
          <tr>
            <td style="padding:12px;background:#f8fafc;font-weight:600;border-radius:4px 0 0 4px">Fichier</td>
            <td style="padding:12px;background:#f1f5f9;border-radius:0 4px 4px 0">${file.name} (${(file.size / 1024).toFixed(1)} Ko)</td>
          </tr>` : ""}
        </table>
        <p style="margin-top:24px;color:#64748b;font-size:14px">
          Réponds directement à cet email pour contacter ${name}.
        </p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
