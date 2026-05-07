import { internalAction } from "./_generated/server";
import { v } from "convex/values";

export const sendStatusEmail = internalAction({
  args: {
    email: v.string(),
    userName: v.string(),
    caseTitle: v.string(),
    caseNumber: v.string(),
    status: v.string(),
    assignedLawyer: v.optional(v.string()),
    hearingDate: v.optional(v.string()),
    venue: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("Missing RESEND_API_KEY");

    const subjects: Record<string, string> = {
      approved: "Case Approval Notification",
      canceled: "Case Cancellation Notice",
      in_review: "Case Under Review",
      pending: "Case Submission Confirmed",
    };

    const approvalDetails =
      args.status === "approved"
        ? `
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Case Number</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:500">${args.caseNumber}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Case Title</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:500">${args.caseTitle}</td></tr>
        ${args.assignedLawyer ? `<tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Assigned Lawyer</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:500">${args.assignedLawyer}</td></tr>` : ""}
        ${args.hearingDate ? `<tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Hearing Date</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:500">${args.hearingDate}</td></tr>` : ""}
        ${args.venue ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Court Venue</td><td style="padding:8px 0;font-size:13px;font-weight:500">${args.venue}</td></tr>` : ""}
      </table>
      <p style="font-size:13px;color:#374151">Your assigned lawyer will contact you shortly to begin the next steps.</p>
    `
        : "";

    const bodyMessages: Record<string, string> = {
      approved: `We are pleased to inform you that your case has been successfully reviewed and <strong>approved</strong>.`,
      canceled: `We regret to inform you that your case <strong>${args.caseTitle}</strong> (${args.caseNumber}) has been <strong>canceled</strong>. Please contact us for more information.`,
      in_review: `Your case <strong>${args.caseTitle}</strong> (${args.caseNumber}) is currently <strong>under review</strong>. We will notify you once a decision has been made.`,
      pending: `Your case <strong>${args.caseTitle}</strong> has been received successfully. Your case number is <strong>${args.caseNumber}</strong>. We will begin review shortly.`,
    };

    const html = `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px">
        <h2 style="font-size:18px;font-weight:600;margin-bottom:8px">${subjects[args.status] ?? "Case Update"}</h2>
        <p style="font-size:14px;color:#374151;margin-bottom:4px">Hello ${args.userName},</p>
        <p style="font-size:14px;color:#374151;line-height:1.6;margin-bottom:8px">
          ${bodyMessages[args.status] ?? `Your case status has been updated to <strong>${args.status}</strong>.`}
        </p>
        ${approvalDetails}
        <p style="font-size:13px;color:#374151;margin-top:24px">If you have any questions, please do not hesitate to reach out to us.</p>
        <p style="font-size:13px;color:#374151;margin-top:16px">Kind regards,<br/><strong>Legal Support Team</strong></p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0"/>
        <p style="font-size:11px;color:#9ca3af">This is an automated message. Please do not reply directly to this email.</p>
      </div>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Legal Support Team <onboarding@resend.dev>",
        to: "chukwukaenudeme@gmail.com",
        subject: subjects[args.status] ?? "Case Update",
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Resend error: ${error.message}`);
    }

    return { success: true };
  },
});
