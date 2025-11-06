"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Send, User, Mail, MessageSquare, Briefcase, ChevronLeft, ChevronRight, Check, Phone } from "lucide-react"
import { useState } from "react"
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
import { Checkbox } from "@radix-ui/react-checkbox"
import Footer from "./Footer"

const steps = [
  { id: "personal", title: "Personal Info" },
  { id: "project", title: "Project Type" },
  { id: "details", title: "Project Details" },
  { id: "specifics", title: "Specifics" },
  { id: "final", title: "Final Details" },
]

interface ProjectDiscussionFormFullPageProps {
  onClose: () => void
  serviceName?: string
}

interface FormData {
  // Personal Info
  name: string
  email: string
  phone: string
  company: string
  
  // Project Type & Timeline
  projectType: string
  timeline: string
  
  // Dynamic Questions based on project type
  technologies: string[]
  features: string[]
  targetAudience: string
  budget: string
  hasDesign: string
  hasContent: string
  hasDomain: string
  maintenance: string
  
  // Project Details
  message: string
  additionalRequirements: string
  preferredContact: string
  urgency: string
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

export const ProjectDiscussionFormFullPage = ({ onClose, serviceName }: ProjectDiscussionFormFullPageProps) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    // Personal Info
    name: "",
    email: "",
    phone: "",
    company: "",
    
    // Project Type & Timeline
    projectType: "",
    timeline: "",
    
    // Dynamic Questions
    technologies: [],
    features: [],
    targetAudience: "",
    budget: "",
    hasDesign: "",
    hasContent: "",
    hasDomain: "",
    maintenance: "",
    
    // Project Details
    message: "",
    additionalRequirements: "",
    preferredContact: "",
    urgency: ""
  })

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  const updateArrayField = (field: 'technologies' | 'features', value: string) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[]
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value]
      return { ...prev, [field]: newArray }
    })
    setError(null)
  }

  const getProjectTypeQuestions = () => {
    switch (formData.projectType) {
      case 'Web Application':
        return {
          technologies: ['React', 'Next.js', 'Vue.js', 'Angular', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'AWS', 'Vercel'],
          features: ['User Authentication', 'Database Integration', 'API Development', 'Payment Processing', 'Real-time Features', 'Admin Dashboard', 'Mobile Responsive', 'SEO Optimization']
        }
      case 'Mobile App':
        return {
          technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Firebase', 'AWS Amplify', 'App Store', 'Google Play'],
          features: ['Push Notifications', 'Offline Support', 'Camera Integration', 'GPS/Location', 'Social Login', 'In-App Purchases', 'Biometric Auth', 'Cross-platform']
        }
      case 'E-commerce':
        return {
          technologies: ['Shopify', 'WooCommerce', 'Magento', 'React', 'Next.js', 'Stripe', 'PayPal', 'MongoDB', 'AWS'],
          features: ['Product Catalog', 'Shopping Cart', 'Payment Gateway', 'Inventory Management', 'Order Tracking', 'Customer Reviews', 'Multi-language', 'Analytics']
        }
      case 'Portfolio/Landing Page':
        return {
          technologies: ['React', 'Next.js', 'Gatsby', 'WordPress', 'Framer Motion', 'Tailwind CSS', 'Vercel', 'Netlify'],
          features: ['Responsive Design', 'Contact Forms', 'Blog Integration', 'SEO Optimization', 'Analytics', 'Social Media Integration', 'CMS', 'Fast Loading']
        }
      default:
        return {
          technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'AWS', 'TypeScript', 'Tailwind CSS', 'Vercel'],
          features: ['Custom Development', 'API Integration', 'Database Design', 'UI/UX Design', 'Testing', 'Deployment', 'Maintenance', 'Documentation']
        }
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0: // Personal Info
        return formData.name && formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      case 1: // Project Type
        return formData.projectType && formData.timeline
      case 2: // Project Details
        return formData.targetAudience && formData.budget
      case 3: // Specifics
        return formData.technologies.length > 0 && formData.features.length > 0
      case 4: // Final Details
        return formData.message.trim().length > 0 && formData.preferredContact
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    if (!isStepValid()) {
      setError("Please fill all required fields correctly")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/project-discussion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          service: serviceName,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit form")
      }

      setIsSubmitted(true)
      
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background Gradients */}
      <div className="absolute inset-0 -z-10">
        {/* Main gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90" />
        
        {/* Multiple animated blob gradients */}
        <div className="absolute top-[20%] left-0 w-1/3 h-5/6 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-500/15 to-teal-500/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-pink-500/15 to-rose-500/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
        
        {/* Additional floating gradients */}
        <div className="absolute top-3/4 left-1/2 w-72 h-72 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/6 right-1/6 w-56 h-56 bg-gradient-to-r from-indigo-500/15 to-blue-500/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden sm:inline">Back</span>
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 flex items-center justify-center min-h-screen">
        <motion.div
          className="w-full max-w-3xl"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {!isSubmitted ? (
            <div>
              {/* Header */}
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Let&apos;s Build Something Amazing
                </h1>
                {serviceName && (
                  <p className="text-lg text-white/70">
                    Interested in <span className="text-white font-semibold">{serviceName}</span>
                  </p>
                )}
              </motion.div>

              {/* Progress indicator */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex justify-between mb-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center flex-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <motion.div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2 transition-all duration-300",
                          index < currentStep
                            ? "bg-white border-white text-black"
                            : index === currentStep
                            ? "bg-white border-white text-black"
                            : "bg-white/10 border-white/30 text-white/50"
                        )}
                        animate={{
                          scale: index === currentStep ? 1.1 : 1,
                        }}
                      >
                        {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                      </motion.div>
                      <span
                        className={cn(
                          "text-xs md:text-sm transition-colors duration-300",
                          index <= currentStep ? "text-white" : "text-white/50"
                        )}
                      >
                        {step.title}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-white rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>

              {/* Form Card */}
              <Card className="bg-black/80 backdrop-blur-sm border-white/20 text-white shadow-2xl relative overflow-hidden">
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/70" />
                <div className="relative z-10">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (currentStep === steps.length - 1) {
                      handleSubmit()
                    } else {
                      nextStep()
                    }
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {/* Step 1: Personal Info */}
                      {currentStep === 0 && (
                        <>
                          <CardHeader className="pb-6">
                            <CardTitle className="text-white text-2xl">Tell us about yourself</CardTitle>
                            <CardDescription className="text-white/70">
                              {serviceName ? `Interested in ${serviceName}? ` : ""}Let&apos;s start with some basic information
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-5">
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
                                Email *
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
                                Phone Number
                              </Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                value={formData.phone}
                                onChange={(e) => updateFormData("phone", e.target.value)}
                                className="bg-white/5 border-white/20 text-white placeholder-white/50"
                              />
                            </motion.div>
                            <motion.div variants={fadeInUp} className="space-y-2">
                              <Label htmlFor="company" className="text-white/90">
                                <Briefcase className="w-4 h-4 inline mr-2" />
                                Company
                              </Label>
                              <Input
                                id="company"
                                placeholder="Your Company Inc."
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
                          <CardHeader className="pb-6">
                            <CardTitle className="text-white text-2xl">Project Details</CardTitle>
                            <CardDescription className="text-white/70">
                              What type of project are you looking to build?
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-5">
                            <motion.div variants={fadeInUp} className="space-y-3">
                              <Label className="text-white/90">Project Type *</Label>
                              <RadioGroup
                                value={formData.projectType}
                                onValueChange={(value) => updateFormData("projectType", value)}
                                className="space-y-2"
                              >
                                {["Web Application", "Mobile App", "E-commerce", "Portfolio/Landing Page", "Custom Solution", "Other"].map((type) => (
                                  <motion.div
                                    key={type}
                                    variants={fadeInUp}
                                    className="flex items-center space-x-3 p-3 rounded-lg border border-white/20 hover:bg-white/5 transition-colors"
                                  >
                                    <RadioGroupItem value={type} id={`type-${type}`} className="border-white/50" />
                                    <Label htmlFor={`type-${type}`} className="text-white/90 cursor-pointer flex-1">
                                      {type}
                                    </Label>
                                  </motion.div>
                                ))}
                              </RadioGroup>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="space-y-3">
                              <Label className="text-white/90">Project Timeline *</Label>
                              <RadioGroup
                                value={formData.timeline}
                                onValueChange={(value) => updateFormData("timeline", value)}
                                className="space-y-2"
                              >
                                {["ASAP", "1-3 months", "3-6 months", "6+ months", "Just exploring"].map((time) => (
                                  <motion.div
                                    key={time}
                                    variants={fadeInUp}
                                    className="flex items-center space-x-3 p-3 rounded-lg border border-white/20 hover:bg-white/5 transition-colors"
                                  >
                                    <RadioGroupItem value={time} id={`time-${time}`} className="border-white/50" />
                                    <Label htmlFor={`time-${time}`} className="text-white/90 cursor-pointer flex-1">
                                      {time}
                                    </Label>
                                  </motion.div>
                                ))}
                              </RadioGroup>
                            </motion.div>
                          </CardContent>
                        </>
                      )}

                      {/* Step 3: Project Details */}
                      {currentStep === 2 && (
                        <>
                          <CardHeader className="pb-6">
                            <CardTitle className="text-white text-2xl">Project Details</CardTitle>
                            <CardDescription className="text-white/70">
                              Help us understand your project better
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-5">
                            <motion.div variants={fadeInUp} className="space-y-3">
                              <Label className="text-white/90">Target Audience *</Label>
                              <RadioGroup
                                value={formData.targetAudience}
                                onValueChange={(value) => updateFormData("targetAudience", value)}
                                className="space-y-2"
                              >
                                {["General Public", "Businesses", "Developers", "Students", "Professionals", "Specific Industry", "Other"].map((audience) => (
                                  <motion.div
                                    key={audience}
                                    variants={fadeInUp}
                                    className="flex items-center space-x-3 p-3 rounded-lg border border-white/20 hover:bg-white/5 transition-colors"
                                  >
                                    <RadioGroupItem value={audience} id={`audience-${audience}`} className="border-white/50" />
                                    <Label htmlFor={`audience-${audience}`} className="text-white/90 cursor-pointer flex-1">
                                      {audience}
                                    </Label>
                                  </motion.div>
                                ))}
                              </RadioGroup>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="space-y-3">
                              <Label className="text-white/90">Budget Range *</Label>
                              <RadioGroup
                                value={formData.budget}
                                onValueChange={(value) => updateFormData("budget", value)}
                                className="space-y-2"
                              >
                                {["Under $5,000", "$5,000 - $10,000", "$10,000 - $25,000", "$25,000 - $50,000", "$50,000+", "Let's discuss"].map((budget) => (
                                  <motion.div
                                    key={budget}
                                    variants={fadeInUp}
                                    className="flex items-center space-x-3 p-3 rounded-lg border border-white/20 hover:bg-white/5 transition-colors"
                                  >
                                    <RadioGroupItem value={budget} id={`budget-${budget}`} className="border-white/50" />
                                    <Label htmlFor={`budget-${budget}`} className="text-white/90 cursor-pointer flex-1">
                                      {budget}
                                    </Label>
                                  </motion.div>
                                ))}
                              </RadioGroup>
                            </motion.div>
                          </CardContent>
                        </>
                      )}

                      {/* Step 4: Technology & Features */}
                      {currentStep === 3 && (
                        <>
                          <CardHeader className="pb-6">
                            <CardTitle className="text-white text-2xl">Technology & Features</CardTitle>
                            <CardDescription className="text-white/70">
                              Select the technologies and features you need for your {formData.projectType}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <motion.div variants={fadeInUp} className="space-y-3">
                              <Label className="text-white/90">Preferred Technologies *</Label>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {getProjectTypeQuestions().technologies.map((tech) => (
                                  <motion.div
                                    key={tech}
                                    variants={fadeInUp}
                                    className="flex items-center space-x-2"
                                  >
                                    <Checkbox
                                      id={`tech-${tech}`}
                                      checked={formData.technologies.includes(tech)}
                                      onCheckedChange={() => updateArrayField("technologies", tech)}
                                      className="border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-black"
                                    />
                                    <Label htmlFor={`tech-${tech}`} className="text-white/90 cursor-pointer text-sm">
                                      {tech}
                                    </Label>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="space-y-3">
                              <Label className="text-white/90">Required Features *</Label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {getProjectTypeQuestions().features.map((feature) => (
                                  <motion.div
                                    key={feature}
                                    variants={fadeInUp}
                                    className="flex items-center space-x-2"
                                  >
                                    <Checkbox
                                      id={`feature-${feature}`}
                                      checked={formData.features.includes(feature)}
                                      onCheckedChange={() => updateArrayField("features", feature)}
                                      className="border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-black"
                                    />
                                    <Label htmlFor={`feature-${feature}`} className="text-white/90 cursor-pointer text-sm">
                                      {feature}
                                    </Label>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          </CardContent>
                        </>
                      )}

                      {/* Step 5: Final Details */}
                      {currentStep === 4 && (
                        <>
                          <CardHeader className="pb-6">
                            <CardTitle className="text-white text-2xl">Final Details</CardTitle>
                            <CardDescription className="text-white/70">
                              Tell us more about your project and how you&apos;d like to proceed
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-5">
                            <motion.div variants={fadeInUp} className="space-y-2">
                              <Label htmlFor="message" className="text-white/90">
                                <MessageSquare className="w-4 h-4 inline mr-2" />
                                Project Description *
                              </Label>
                              <Textarea
                                id="message"
                                placeholder="Describe your project vision, goals, and any specific requirements..."
                                value={formData.message}
                                onChange={(e) => updateFormData("message", e.target.value)}
                                rows={6}
                                className="bg-white/5 border-white/20 text-white placeholder-white/50 resize-none"
                                required
                              />
                            </motion.div>

                            <motion.div variants={fadeInUp} className="space-y-3">
                              <Label className="text-white/90">Preferred Contact Method *</Label>
                              <RadioGroup
                                value={formData.preferredContact}
                                onValueChange={(value) => updateFormData("preferredContact", value)}
                                className="space-y-2"
                              >
                                {["Email", "Phone", "WhatsApp", "Video Call", "In-person"].map((method) => (
                                  <motion.div
                                    key={method}
                                    variants={fadeInUp}
                                    className="flex items-center space-x-3 p-3 rounded-lg border border-white/20 hover:bg-white/5 transition-colors"
                                  >
                                    <RadioGroupItem value={method} id={`contact-${method}`} className="border-white/50" />
                                    <Label htmlFor={`contact-${method}`} className="text-white/90 cursor-pointer flex-1">
                                      {method}
                                    </Label>
                                  </motion.div>
                                ))}
                              </RadioGroup>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="space-y-2">
                              <Label htmlFor="additionalRequirements" className="text-white/90">
                                Additional Requirements
                              </Label>
                              <Textarea
                                id="additionalRequirements"
                                placeholder="Any other specific requirements, constraints, or questions..."
                                value={formData.additionalRequirements}
                                onChange={(e) => updateFormData("additionalRequirements", e.target.value)}
                                rows={4}
                                className="bg-white/5 border-white/20 text-white placeholder-white/50 resize-none"
                              />
                            </motion.div>
                          </CardContent>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                        {error}
                      </p>
                    </motion.div>
                  )}

                  <CardFooter className="flex justify-between pt-6 pb-8">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        <ChevronLeft className="h-4 w-4" /> Back
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        type="button"
                        onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
                        disabled={!isStepValid() || isSubmitting}
                        className="flex items-center gap-2 bg-white text-black hover:bg-white/90"
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
                        ) : currentStep === steps.length - 1 ? (
                          <>
                            Submit <Send className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            Next <ChevronRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </CardFooter>
                </form>
                </div>
              </Card>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <Check className="w-12 h-12 text-black" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                Thank You!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-white/70 mb-8"
              >
                Your project discussion request has been submitted successfully.
                <br />
                I&apos;ll get back to you shortly!
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  onClick={onClose}
                  className="bg-white text-black hover:bg-white/90"
                >
                  Back to Home
                </Button>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}

