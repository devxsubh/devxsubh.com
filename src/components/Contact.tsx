"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChangeEvent, FormEvent, useEffect } from "react";

import { About, SocialHandle } from "../utils/interface";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SectionHeading, TextReveal } from "@/components/ui/Typography";
import { SlideIn, Transition } from "@/components/ui/Transitions";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { submitContactForm, updateContactForm, resetContactForm } from "@/store/slices/portfolioSlice";
import { addNotification } from "@/store/slices/uiSlice";
import Footer from "./Footer";

// Add input styles
const inputStyles = "flex h-10 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200";

interface ContactProps {
  email: string;
  social_handle: SocialHandle[];
  about: About;
}
const Contact = ({ email, social_handle, about }: ContactProps) => {
  const dispatch = useAppDispatch();
  const { contactForm, isContactFormSubmitting, error } = useAppSelector(state => state.portfolio);

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
        message: 'Message sent successfully!',
        duration: 5000
      }));
      dispatch(resetContactForm());
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
    <motion.section className="relative" id="contact">
      <span className="blob size-1/2 absolute top-20 right-0 blur-[100px] -z-10" />
      <div className="p-4 md:p-8 md:px-16">
        <SectionHeading className="">
          <SlideIn className="text-white/40">Interested in talking,</SlideIn>{" "}
          <br /> <SlideIn>let&apos;s do it.</SlideIn>
        </SectionHeading>
        <div className="grid md:grid-cols-2 gap-10 md:pt-16">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <Transition className="w-full">
                <input
                  id="name"
                  name="name"
                  placeholder="Full name"
                  className={cn(inputStyles, "border-0 border-b rounded-none")}
                  required
                  value={contactForm.name}
                  onChange={handleInputChange}
                />
              </Transition>
              <Transition className="w-full">
                <input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  className={cn(inputStyles, "border-0 border-b rounded-none")}
                  required
                  value={contactForm.email}
                  onChange={handleInputChange}
                />
              </Transition>
            </div>
            <div className="space-y-2">
              <Transition>
                <input
                  id="subject"
                  name="subject"
                  placeholder="Enter the subject"
                  className={cn(inputStyles, "border-0 border-b rounded-none")}
                  required
                  value={contactForm.subject}
                  onChange={handleInputChange}
                />
              </Transition>
            </div>
            <div className="space-y-2">
              <Transition>
                <Textarea
                  className="min-h-[100px] rounded-none border-0 border-b resize-none"
                  id="message"
                  name="message"
                  placeholder="Enter your message"
                  required
                  value={contactForm.message}
                  onChange={handleInputChange}
                />
              </Transition>
            </div>
            <div>
              <Transition>
                <motion.button
                  whileHover="whileHover"
                  initial="initial"
                  className="border border-white/30 px-8 py-2 rounded-3xl relative overflow-hidden"
                  type="submit"
                >
                  <TextReveal className="uppercase">
                    {isContactFormSubmitting ? "Sending..." : "Let's Connect"}
                  </TextReveal>
                </motion.button>
              </Transition>
            </div>
          </form>
          <div className="md:justify-self-end flex flex-col">
            <div className="pb-4">
              <Transition>
                <span className="text-white/90">Get in touch</span>
              </Transition>
              <div className="text-xl md:text-3xl font-bold py-2">
                <Transition>
                  <TextReveal>{email}</TextReveal>
                </Transition>
              </div>
              <Transition>
                <div className="pb-1 text-white/80">{about.phoneNumber}</div>
              </Transition>
              <Transition>
                <div className="text-white/80">{about.address}</div>
              </Transition>
            </div>

            <div className="flex flex-wrap gap-3 md:gap-8 mt-auto md:pb-16 pt-6 md:pt-0">
              {social_handle.map((social, index) =>
                social.enabled ? (
                  <Transition
                    key={social._id}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Link 
                      href={social.url} 
                      target="_blank"
                      className="text-sm md:text-base hover:text-white/70 transition-colors"
                    >
                      <TextReveal>{social.platform}</TextReveal>
                    </Link>
                  </Transition>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </motion.section>
  );
};

export default Contact;