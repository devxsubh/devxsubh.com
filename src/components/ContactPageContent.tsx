"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { About, SocialHandle } from "../utils/interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { submitContactForm, updateContactForm, resetContactForm } from "@/store/slices/portfolioSlice";
import { addNotification } from "@/store/slices/uiSlice";
import { CheckCircle, Send } from "lucide-react";
import Footer from "./Footer";
import { TextReveal } from "./ui/Typography";

interface ContactPageContentProps {
  email: string;
  social_handle: SocialHandle[];
  about: About;
}

const ContactPageContent = ({ email, social_handle, about }: ContactPageContentProps) => {
  const dispatch = useAppDispatch();
  const { contactForm, isContactFormSubmitting } = useAppSelector(state => state.portfolio);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(updateContactForm({ [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      await dispatch(submitContactForm(contactForm)).unwrap();
      dispatch(addNotification({
        type: 'success',
        message: 'Message sent successfully! I&apos;ll get back to you soon.',
        duration: 5000
      }));
      dispatch(resetContactForm());
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error: any) {
      dispatch(addNotification({
        type: 'error',
        message: `Error sending message: ${error.message}`,
        duration: 5000
      }));
      console.error("Error sending message:", error.message);
    }
  };

  return (
    <>
    <section className="relative pt-16 md:pt-24 lg:pt-32 ">
            <span className="blob absolute top-[20%] left-0 w-1/3 h-5/6 blur-[100px] -z-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-12 lg:flex-row lg:gap-16 xl:gap-20">
          {/* Contact Information Section */}
          <div className="mx-auto flex max-w-lg flex-col justify-between gap-8 lg:mx-0 lg:max-w-md">
            <div className="text-center lg:text-left">
              <h1 className="mb-4 text-4xl font-semibold sm:text-5xl lg:mb-2 lg:text-6xl text-foreground">
                Contact Me
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                I&apos;m available for questions, feedback, or collaboration opportunities. Let me know how I can help you bring your ideas to life!
              </p>
            </div>
            
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-xl font-semibold lg:text-left lg:text-2xl text-foreground">
                Contact Details
              </h3>
              <ul className="ml-4 list-disc space-y-3">
                <li className="text-muted-foreground">
                  <span className="font-bold text-foreground">Phone: </span>
                  <a href={`tel:${about.phoneNumber}`} className="underline hover:text-primary transition-colors">
                    {about.phoneNumber}
                  </a>
                </li>
                <li className="text-muted-foreground">
                  <span className="font-bold text-foreground">Email: </span>
                  <a href={`mailto:${email}`} className="underline hover:text-primary transition-colors">
                    {email}
                  </a>
                </li>
                <li className="text-muted-foreground">
                  <span className="font-bold text-foreground">Location: </span>
                  {about.address}
                </li>
              </ul>
              
              {/* Social Links */}
              <div className="mt-8">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {social_handle.map((social) =>
                    social.enabled ? (
                      <a
                        key={social._id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-md transition-colors text-sm"
                      >
                        <TextReveal>{social.platform}</TextReveal>
                      </a>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form Section */}
          <div className="mx-auto w-full max-w-2xl lg:mx-0">
            <div className="rounded-xl border bg-card p-6 sm:p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8">
                {/* Name and Email Row - Responsive */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                    <Input 
                      type="text" 
                      id="name" 
                      name="name"
                      placeholder="Your full name" 
                      value={contactForm.name}
                      onChange={handleInputChange}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input 
                      type="email" 
                      id="email" 
                      name="email"
                      placeholder="your.email@example.com" 
                      value={contactForm.email}
                      onChange={handleInputChange}
                      required
                      className="h-11"
                    />
                  </div>
                </div>
                
                {/* Subject Field */}
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                  <Input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    placeholder="What's this about?" 
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    required
                    className="h-11"
                  />
                </div>
                
                {/* Message Field */}
                <div className="grid w-full gap-2">
                  <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                  <Textarea 
                    placeholder="Tell me about your project, ideas, or any questions you have..." 
                    id="message" 
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                    className="min-h-[140px] resize-none"
                  />
                </div>
                
                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-medium" 
                  disabled={isContactFormSubmitting}
                >
                  {isContactFormSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
    </section>
    <Footer />
    </>
  );
};

export default ContactPageContent;
