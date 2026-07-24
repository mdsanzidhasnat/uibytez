import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/*
  TODO: Sign up at https://resend.com (free tier: 100 emails/day, 3000/month)
  and add your API key to .env.local as RESEND_API_KEY.
  Also set ADMIN_EMAIL_PLACEHOLDER to the email that should receive order notifications.
  
  Resend requires a verified domain for production use.
  For testing, you can use the default "onboarding@resend.dev" sender.
*/

// TODO: Replace RESEND_API_KEY_PLACEHOLDER with your real Resend API key in .env.local
const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder_key");

const ADMIN_EMAIL = process.env.ADMIN_EMAIL_PLACEHOLDER || "uibytez@gmail.com";

interface OrderData {
  package: string;
  currency: string;
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  projectDetails: string;
  paymentMethod: string;
  transactionId: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const orderDataStr = formData.get("orderData") as string;
    const screenshot = formData.get("screenshot") as File | null;

    if (!orderDataStr) {
      return NextResponse.json({ error: "Missing order data" }, { status: 400 });
    }

    const order: OrderData = JSON.parse(orderDataStr);

    // Validate required fields
    if (!order.fullName || !order.email || !order.transactionId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Build email HTML
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #0d9488; border-bottom: 2px solid #0d9488; padding-bottom: 10px;">
          🎉 New Order Received — UIBytez
        </h2>
        
        <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <h3 style="margin-top: 0; color: #334155;">Package Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 4px 8px; color: #64748b;">Package:</td>
              <td style="padding: 4px 8px; font-weight: bold;">${order.package}</td>
            </tr>
            <tr>
              <td style="padding: 4px 8px; color: #64748b;">Currency:</td>
              <td style="padding: 4px 8px;">${order.currency.toUpperCase()}</td>
            </tr>
            <tr>
              <td style="padding: 4px 8px; color: #64748b;">Payment Method:</td>
              <td style="padding: 4px 8px;">${order.paymentMethod}</td>
            </tr>
            <tr>
              <td style="padding: 4px 8px; color: #64748b;">Transaction ID:</td>
              <td style="padding: 4px 8px; font-family: monospace; font-weight: bold;">${order.transactionId}</td>
            </tr>
          </table>
        </div>

        <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <h3 style="margin-top: 0; color: #334155;">Client Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 4px 8px; color: #64748b;">Name:</td>
              <td style="padding: 4px 8px; font-weight: bold;">${order.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 4px 8px; color: #64748b;">Email:</td>
              <td style="padding: 4px 8px;">${order.email}</td>
            </tr>
            <tr>
              <td style="padding: 4px 8px; color: #64748b;">Phone:</td>
              <td style="padding: 4px 8px;">${order.phone}</td>
            </tr>
            ${order.businessName ? `
            <tr>
              <td style="padding: 4px 8px; color: #64748b;">Business:</td>
              <td style="padding: 4px 8px;">${order.businessName}</td>
            </tr>` : ""}
          </table>
        </div>

        <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <h3 style="margin-top: 0; color: #334155;">Project Details</h3>
          <p style="color: #475569; white-space: pre-wrap; line-height: 1.6;">
            ${order.projectDetails}
          </p>
        </div>

        ${screenshot ? `
        <div style="background: #fef3c7; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <p style="margin: 0; color: #92400e;">
            📎 A payment screenshot was uploaded with this order. 
            Check the server logs or storage for the file.
          </p>
        </div>` : ""}

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="color: #94a3b8; font-size: 12px; text-align: center;">
          This order was submitted via the UIBytez website order form.
        </p>
      </div>
    `;

    // Send email notification to admin
    // TODO: Replace "onboarding@resend.dev" with your verified sender email once your domain is set up with Resend.
    await resend.emails.send({
      from: "UIBytez Orders <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      subject: `[New Order] ${order.package} package from ${order.fullName}`,
      html,
      replyTo: order.email,
    });

    // Also send a confirmation email to the customer
    const customerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #0d9488;">Order Confirmed — UIBytez</h2>
        <p style="color: #475569; line-height: 1.6;">
          Hi ${order.fullName},
        </p>
        <p style="color: #475569; line-height: 1.6;">
          Thank you for your order! We've received your payment details for the <strong>${order.package}</strong> package.
        </p>
        <p style="color: #475569; line-height: 1.6;">
          Our team will verify your payment and contact you within 24 hours to confirm and begin the project.
        </p>
        <div style="background: #f0fdfa; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <p style="margin: 0; color: #0f766e;">
            <strong>Order Reference:</strong> ${order.transactionId}
          </p>
        </div>
        <p style="color: #475569; line-height: 1.6;">
          If you have any questions, feel free to reply to this email or reach out on WhatsApp.
        </p>
        <p style="color: #475569; line-height: 1.6;">
          Best regards,<br />
          <strong>UIBytez Team</strong>
        </p>
      </div>
    `;

    await resend.emails.send({
      from: "UIBytez <onboarding@resend.dev>",
      to: order.email,
      subject: `Order Received — ${order.package} Package | UIBytez`,
      html: customerHtml,
    });

    return NextResponse.json({ success: true, message: "Order submitted successfully" });
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json(
      { error: "Failed to process order. Please try again." },
      { status: 500 }
    );
  }
}
