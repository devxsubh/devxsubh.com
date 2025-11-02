import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import mongoose from 'mongoose';
import { sendEnhancedEmail } from '@/lib/enhanced-email';

// Create Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create Contact model if it doesn't exist
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Save to database
    await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Send thank you email to the person who filled the form
    await sendEnhancedEmail({
      to: email,
      subject: 'Thank you for reaching out! - Subham Mahapatra',
      template: 'thank-you',
      context: {
        name: name,
        email: email,
        subject: subject,
        message: message
      }
    });

    // Send notification email to you
    await sendEnhancedEmail({
      to: 'subhammahapatra004@gmail.com',
      subject: `🚀 New Contact Form Submission from ${name}`,
      template: 'contact-notification',
      context: {
        name: name,
        email: email,
        subject: subject,
        message: message
      }
    });

    return NextResponse.json({ 
      message: 'Message sent successfully! Check your email for confirmation.',
      success: true 
    });
  } catch (error: any) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form. Please try again.' },
      { status: 500 }
    );
  }
} 