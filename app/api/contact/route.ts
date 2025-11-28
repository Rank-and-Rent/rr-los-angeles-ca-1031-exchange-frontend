import { NextRequest, NextResponse } from 'next/server'
import { getBrand } from '@/lib/brand'
import { sendCustomerConfirmation, sendInternalNotifications } from '@/lib/email/sendgrid'

type ContactFormData = {
  name: string
  company?: string
  email: string
  phone: string
  projectType: string
  timeline?: string
  details?: string
  property?: string
  estimatedCloseDate?: string
  city?: string
  message?: string
  turnstileToken?: string
}

async function verifyTurnstile(token: string): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    return true;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.projectType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify Turnstile token
    if (body.turnstileToken) {
      const isValid = await verifyTurnstile(body.turnstileToken);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid verification token' },
          { status: 400 }
        );
      }
    }

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
      }
    }

    // Send emails via SendGrid template
    const brand = getBrand();
    const lead = {
      name: String(body.name || ''),
      email: String(body.email || ''),
      phone: body.phone ? String(body.phone).replace(/\D/g, '') : undefined,
      phone_plain: body.phone ? String(body.phone).replace(/\D/g, '') : undefined,
      projectType: String(body.projectType || '1031 Exchange Project'),
      property: body.property ? String(body.property) : undefined,
      estimatedCloseDate: body.estimatedCloseDate ? String(body.estimatedCloseDate) : undefined,
      city: body.city ? String(body.city) : undefined,
      company: body.company ? String(body.company) : undefined,
      timeline: body.timeline ? String(body.timeline) : undefined,
      message: body.message ? String(body.message) : (body.details ? String(body.details) : undefined),
    };

    const brandWithDate = {
      ...brand,
      submitted_date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    try {
      await Promise.all([
        sendCustomerConfirmation(brandWithDate, lead),
        sendInternalNotifications(brandWithDate, lead),
      ]);
      console.log('SendGrid emails sent successfully to:', body.email);
    } catch (error) {
      console.error("SendGrid email failed", error);
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
