"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Send, User, Mail, MessageSquare, Briefcase, ChevronLeft, ChevronRight, Check, Phone } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const steps = [
  { id: "personal", title: "Personal Info" },
  { id: "project", title: "Project Type" },
  { id: "details", title: "Details" },
]

interface ProjectDiscussionFormProps {
  isOpen: boolean
  onClose: () => void
  serviceName?: string
}

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  projectType: string
  timeline: string
  message: string
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

const contentVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
}

export const ProjectDiscussionFormMultiStep = ({ isOpen, onClose, serviceName }: ProjectDiscussionFormProps) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const originalOverflowRef = useRef<string>("")

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    timeline: "",
    message: ""
  })

  useEffect(() => {
    if (isOpen) {
      originalOverflowRef.current = document.body.style.overflow
      document.body.style.overflow = "hidden"
      
      setIsSubmitted(false)
      setError(null)
      setCurrentStep(0)
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        timeline: "",
        message: "",
      })
    } else {
      document.body.style.overflow = originalOverflowRef.current || "auto"
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape)
      if (isOpen) {
        document.body.style.overflow = originalOverflowRef.current || "auto"
      }
    }
  }, [isOpen, onClose])

  useEffect(() => {
    return () => {
      document.body.style.overflow = originalOverflowRef.current || "auto"
    }
  }, [])

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError(null)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      const response = await fetch('/api/project-discussion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          serviceName
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit project discussion')
      }

      setIsSubmitting(false)
      setIsSubmitted(true)
      
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          projectType: "",
          timeline: "",
          message: ""
        })
        onClose()
      }, 3000)
    } catch (error: any) {
      setIsSubmitting(false)
      setError(error.message || 'Failed to submit project discussion')
      console.error('Error submitting project discussion:', error)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.name.trim() !== "" && formData.email.trim() !== "" && formData.phone.trim() !== ""
      case 1:
        return formData.projectType !== "" && formData.timeline !== ""
      case 2:
        return formData.message.trim() !== ""
      default:
        return true
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Form Container */}
          <motion.div
            className="relative w-full max-w-2xl z-10"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Close Button */}
            <button
              className="absolute -top-3 -right-3 md:-top-4 md:-right-4 z-20 w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-black/90 transition-colors duration-200"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="py-4">
              {/* Progress indicator */}
              {!isSubmitted && (
                <motion.div
                  className="mb-4 px-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-between mb-2">
                    {steps.map((step, index) => (
                      <motion.div
                        key={index}
                        className="flex flex-col items-center flex-1"
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.div
                          className={cn(
                            "w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer transition-colors duration-300 flex items-center justify-center",
                            index < currentStep
                              ? "bg-white text-black"
                              : index === currentStep
                                ? "bg-white text-black ring-4 ring-white/20"
                                : "bg-zinc-700 text-white",
                          )}
                          onClick={() => {
                            if (index <= currentStep) {
                              setCurrentStep(index)
                            }
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {index < currentStep ? (
                            <Check className="w-4 h-4 md:w-5 md:h-5" />
                          ) : (
                            <span className="text-xs md:text-sm font-bold">{index + 1}</span>
                          )}
                        </motion.div>
                        <motion.span
                          className={cn(
                            "text-[10px] md:text-xs mt-1.5 text-center",
                            index === currentStep
                              ? "text-white font-medium"
                              : "text-white/60",
                          )}
                        >
                          {step.title}
                        </motion.span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="w-full bg-zinc-700 h-1.5 rounded-full overflow-hidden mt-3">
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Form card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="px-4"
              >
                <Card className="border-white/10 bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden">
                  {!isSubmitted ? (
                    <>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={contentVariants}
                        >
                          {/* Error Message */}
                          {error && (
                            <div className="p-4">
                              <motion.div
                                className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                              >
                                <p className="text-red-400 text-sm">{error}</p>
                              </motion.div>
                            </div>
                          )}

                          {/* Step 1: Personal Info */}
                          {currentStep === 0 && (
                            <>
                              <CardHeader className="pb-4">
                                <CardTitle className="text-white text-xl">Tell us about yourself</CardTitle>
                                <CardDescription className="text-white/70 text-sm">
                                  {serviceName ? `Interested in ${serviceName}? ` : ""}Let&apos;s start with some basic information
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                <motion.div variants={fadeInUp} className="space-y-2">
                                  <Label htmlFor="name" className="text-white/90">
                                    <User className="w-4 h-4 inline mr-2" />
                                    Full Name *
                                  </Label>
                                  <Input
                                    id="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => updateFormData("name", e.target.value)}
                                    className="bg-white/5 border-white/20 text-white placeholder-white/50"
                                    required
                                  />
                                </motion.div>
                                <motion.div variants={fadeInUp} className="space-y-2">
                                  <Label htmlFor="email" className="text-white/90">
                                    <Mail className="w-4 h-4 inline mr-2" />
                                    Email Address *
                                  </Label>
                                  <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => updateFormData("email", e.target.value)}
                                    className="bg-white/5 border-white/20 text-white placeholder-white/50"
                                    required
                                  />
                                </motion.div>
                                <motion.div variants={fadeInUp} className="space-y-2">
                                  <Label htmlFor="phone" className="text-white/90">
                                    <Phone className="w-4 h-4 inline mr-2" />
                                    Phone Number *
                                  </Label>
                                  <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    value={formData.phone}
                                    onChange={(e) => updateFormData("phone", e.target.value)}
                                    className="bg-white/5 border-white/20 text-white placeholder-white/50"
                                    required
                                  />
                                </motion.div>
                                <motion.div variants={fadeInUp} className="space-y-2">
                                  <Label htmlFor="company" className="text-white/90">
                                    <Briefcase className="w-4 h-4 inline mr-2" />
                                    Company/Organization (Optional)
                                  </Label>
                                  <Input
                                    id="company"
                                    placeholder="Your Company"
                                    value={formData.company}
                                    onChange={(e) => updateFormData("company", e.target.value)}
                                    className="bg-white/5 border-white/20 text-white placeholder-white/50"
                                  />
                                </motion.div>
                              </CardContent>
                            </>
                          )}

                          {/* Step 2: Project Type & Timeline */}
                          {currentStep === 1 && (
                            <>
                              <CardHeader className="pb-4">
                                <CardTitle className="text-white text-xl">Project Details</CardTitle>
                                <CardDescription className="text-white/70 text-sm">
                                  What type of project are you looking to build?
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                <motion.div variants={fadeInUp} className="space-y-2">
                                  <Label className="text-white/90">Project Type *</Label>
                                  <RadioGroup
                                    value={formData.projectType}
                                    onValueChange={(value) => updateFormData("projectType", value)}
                                    className="space-y-2"
                                  >
                                    {[
                                      { value: "web-development", label: "Web Development" },
                                      { value: "mobile-app", label: "Mobile App" },
                                      { value: "ui-ux-design", label: "UI/UX Design" },
                                      { value: "automation-ai", label: "Automation & AI" },
                                      { value: "consulting", label: "Business Consulting" },
                                      { value: "other", label: "Other" },
                                    ].map((type, index) => (
                                      <motion.div
                                        key={type.value}
                                        className="flex items-center space-x-2 rounded-md border border-white/20 bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition-colors"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{
                                          opacity: 1,
                                          x: 0,
                                          transition: { delay: 0.1 * index, duration: 0.3 },
                                        }}
                                      >
                                        <RadioGroupItem value={type.value} id={type.value} />
                                        <Label htmlFor={type.value} className="cursor-pointer w-full text-white">
                                          {type.label}
                                        </Label>
                                      </motion.div>
                                    ))}
                                  </RadioGroup>
                                </motion.div>
                                <motion.div variants={fadeInUp} className="space-y-2">
                                  <Label className="text-white/90">Project Timeline *</Label>
                                  <RadioGroup
                                    value={formData.timeline}
                                    onValueChange={(value) => updateFormData("timeline", value)}
                                    className="space-y-2"
                                  >
                                    {[
                                      { value: "asap", label: "ASAP" },
                                      { value: "1-month", label: "Within 1 month" },
                                      { value: "2-3-months", label: "2-3 months" },
                                      { value: "3-6-months", label: "3-6 months" },
                                      { value: "6-plus-months", label: "6+ months" },
                                      { value: "flexible", label: "Flexible" },
                                    ].map((time, index) => (
                                      <motion.div
                                        key={time.value}
                                        className="flex items-center space-x-2 rounded-md border border-white/20 bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition-colors"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{
                                          opacity: 1,
                                          x: 0,
                                          transition: { delay: 0.1 * index, duration: 0.3 },
                                        }}
                                      >
                                        <RadioGroupItem value={time.value} id={time.value} />
                                        <Label htmlFor={time.value} className="cursor-pointer w-full text-white">
                                          {time.label}
                                        </Label>
                                      </motion.div>
                                    ))}
                                  </RadioGroup>
                                </motion.div>
                              </CardContent>
                            </>
                          )}

                          {/* Step 3: Project Message */}
                          {currentStep === 2 && (
                            <>
                              <CardHeader className="pb-4">
                                <CardTitle className="text-white text-xl">Project Description</CardTitle>
                                <CardDescription className="text-white/70 text-sm">
                                  Tell us more about your project vision
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                <motion.div variants={fadeInUp} className="space-y-2">
                                  <Label htmlFor="message" className="text-white/90">
                                    <MessageSquare className="w-4 h-4 inline mr-2" />
                                    Project Details *
                                  </Label>
                                  <Textarea
                                    id="message"
                                    placeholder="Tell me about your project, goals, and any specific requirements..."
                                    value={formData.message}
                                    onChange={(e) => updateFormData("message", e.target.value)}
                                    rows={4}
                                    className="bg-white/5 border-white/20 text-white placeholder-white/50 resize-none min-h-[100px]"
                                    required
                                  />
                                </motion.div>
                              </CardContent>
                            </>
                          )}
                        </motion.div>
                      </AnimatePresence>

                      <CardFooter className="flex justify-between pt-3 pb-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className="flex items-center gap-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                          >
                            <ChevronLeft className="h-4 w-4" /> Back
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            type="button"
                            onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
                            disabled={!isStepValid() || isSubmitting}
                            className="flex items-center gap-1 bg-white text-black hover:bg-white/90"
                          >
                            {isSubmitting ? (
                              <>
                                <motion.div
                                  className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                Sending...
                              </>
                            ) : (
                              <>
                                {currentStep === steps.length - 1 ? "Submit" : "Next"}
                                {currentStep === steps.length - 1 ? (
                                  <Check className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </CardFooter>
                    </>
                  ) : (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                      >
                        <Check className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                      <p className="text-white/70">Thank you for reaching out. I&apos;ll get back to you within 24 hours.</p>
                    </motion.div>
                  )}
                </Card>
              </motion.div>

              {/* Step indicator */}
              {!isSubmitted && (
                <motion.div
                  className="mt-4 text-center text-sm text-white/60 px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

