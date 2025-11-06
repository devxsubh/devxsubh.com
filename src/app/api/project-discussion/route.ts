import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import mongoose from 'mongoose';
import { sendEnhancedEmail } from '@/lib/enhanced-email';

// Create Project Discussion Schema
const projectDiscussionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  projectType: { type: String, required: true },
  budget: { type: String },
  timeline: { type: String },
  message: { type: String, required: true },
  serviceName: { type: String },
  // Additional fields from the enhanced form
  phone: { type: String },
  technologies: [{ type: String }],
  features: [{ type: String }],
  targetAudience: { type: String },
  hasDesign: { type: String },
  hasContent: { type: String },
  hasDomain: { type: String },
  maintenance: { type: String },
  additionalRequirements: { type: String },
  preferredContact: { type: String },
  urgency: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Create ProjectDiscussion model if it doesn't exist
const ProjectDiscussion = mongoose.models.ProjectDiscussion || mongoose.model('ProjectDiscussion', projectDiscussionSchema);

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { 
      name, 
      email, 
      company, 
      projectType, 
      budget, 
      timeline, 
      message, 
      serviceName,
      phone,
      technologies,
      features,
      targetAudience,
      hasDesign,
      hasContent,
      hasDomain,
      maintenance,
      additionalRequirements,
      preferredContact,
      urgency
    } = formData;

    // Validate required fields
    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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
    const projectDiscussion = await ProjectDiscussion.create({
      name,
      email,
      company,
      projectType,
      budget,
      timeline,
      message,
      serviceName,
      phone,
      technologies,
      features,
      targetAudience,
      hasDesign,
      hasContent,
      hasDomain,
      maintenance,
      additionalRequirements,
      preferredContact,
      urgency,
    });

    // Send thank you email to the person who filled the form
    await sendEnhancedEmail({
      to: email,
      subject: 'Thank you for your project discussion request! - Subham Mahapatra',
      template: 'thank-you',
      context: {
        name: name,
        email: email,
        projectType: projectType,
        message: message
      }
    });

    // Send notification email to you
    await sendEnhancedEmail({
      to: 'subhammahapatra004@gmail.com',
      subject: `💼 New Project Discussion Request: ${projectType}`,
      template: 'project-discussion-notification',
      context: {
        name,
        email,
        company: company || 'Not provided',
        projectType,
        budget: budget || 'Not specified',
        timeline: timeline || 'Not specified',
        message,
        serviceName: serviceName || 'General Inquiry',
        phone: phone || 'Not provided',
        technologies: technologies || [],
        features: features || [],
        targetAudience: targetAudience || 'Not specified',
        hasDesign: hasDesign || 'Not specified',
        hasContent: hasContent || 'Not specified',
        hasDomain: hasDomain || 'Not specified',
        maintenance: maintenance || 'Not specified',
        additionalRequirements: additionalRequirements || 'None',
        preferredContact: preferredContact || 'Email',
        urgency: urgency || 'Normal'
      }
    });

    return NextResponse.json({ 
      message: 'Project discussion request sent successfully! Check your email for confirmation.',
      success: true,
      id: projectDiscussion._id 
    });
  } catch (error: any) {
    console.error('Error processing project discussion form:', error);
    return NextResponse.json(
      { error: 'Failed to process project discussion form. Please try again.' },
      { status: 500 }
    );
  }
}
