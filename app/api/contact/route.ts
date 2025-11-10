import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

type ContactFormData = {
  name: string
  company: string
  email: string
  phone: string
  projectType: string
  timeline: string
  details: string
}

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    const body: ContactFormData = await request.json()

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'projectType', 'timeline', 'details']
    for (const field of requiredFields) {
      if (!body[field as keyof ContactFormData]?.trim()) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Send email via Resend (SendGrid alternative)
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #0B3C5D; border-bottom: 2px solid #C9A227; padding-bottom: 10px;">
              New Contact Form Submission
            </h1>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #0B3C5D; margin-top: 0;">Contact Information</h2>
              <p><strong>Name:</strong> ${body.name}</p>
              ${body.company ? `<p><strong>Company:</strong> ${body.company}</p>` : ''}
              <p><strong>Email:</strong> <a href="mailto:${body.email}">${body.email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${body.phone}">${body.phone}</a></p>
            </div>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #0B3C5D; margin-top: 0;">Project Details</h2>
              <p><strong>Project Type:</strong> ${body.projectType}</p>
              <p><strong>Timeline:</strong> ${body.timeline}</p>
              <p><strong>Details:</strong></p>
              <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #C9A227;">
                ${body.details.replace(/\n/g, '<br>')}
              </div>
            </div>

            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 4px; margin: 20px 0;">
              <p style="margin: 0; color: #856404;">
                <strong>Next Steps:</strong> Please respond to this inquiry within 24 hours.
                This lead came from the 1031 Exchange Los Angeles CA website.
              </p>
            </div>

            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

            <div style="text-align: center; color: #666; font-size: 12px;">
              <p>This email was sent from the 1031 Exchange Los Angeles CA contact form.</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email to business
    await resend.emails.send({
      from: '1031 Exchange LA <noreply@1031exchangelosangeles.com>',
      to: process.env.CONTACT_EMAIL || 'help@1031exchangelosangeles.com',
      subject: `New Contact: ${body.projectType} - ${body.name}`,
      html: emailHtml,
    })

    // Send confirmation email to prospect
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Thank you for contacting 1031 Exchange Los Angeles</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #0B3C5D;">1031 Exchange Los Angeles CA</h1>
            </div>

            <div style="background: #f8f9fa; padding: 30px; border-radius: 8px; text-align: center;">
              <h2 style="color: #0B3C5D; margin-top: 0;">Thank You for Your Inquiry</h2>
              <p style="font-size: 16px;">Hi ${body.name},</p>
              <p>Thank you for reaching out to 1031 Exchange Los Angeles CA. We've received your inquiry about ${body.projectType} and a member of our team will contact you within 24 hours.</p>

              <div style="background: white; padding: 20px; border-radius: 4px; margin: 20px 0;">
                <p><strong>Your inquiry summary:</strong></p>
                <p>Project: ${body.projectType}</p>
                <p>Timeline: ${body.timeline}</p>
              </div>

              <p>If you have any urgent questions, please don't hesitate to call us at <a href="tel:818-412-8402" style="color: #0B3C5D;">818-412-8402</a>.</p>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666;">
              <p><strong>1031 Exchange Los Angeles CA</strong></p>
              <p>722 S Broadway, Los Angeles CA 90014</p>
              <p>Phone: 818-412-8402 | Email: help@1031exchangelosangeles.com</p>
            </div>
          </div>
        </body>
      </html>
    `

    await resend.emails.send({
      from: '1031 Exchange LA <noreply@1031exchangelosangeles.com>',
      to: body.email,
      subject: 'Thank you for contacting 1031 Exchange Los Angeles CA',
      html: confirmationHtml,
    })

    // Send to Zapier webhook if configured
    if (process.env.ZAPIER_WEBHOOK_URL) {
      try {
        await fetch(process.env.ZAPIER_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...body,
            source: 'website_contact_form',
            timestamp: new Date().toISOString(),
            userAgent: request.headers.get('user-agent'),
            ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
          }),
        })
      } catch (error) {
        console.error('Failed to send to Zapier:', error)
        // Don't fail the request if Zapier fails
      }
    }

    return NextResponse.json({
      message: 'Contact form submitted successfully',
      success: true
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
