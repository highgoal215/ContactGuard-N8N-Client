"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar, MobileMenuButton } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, File, Clock, ArrowLeft, CheckCircle, User, Send, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function UploadContract() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleAnalysis = () => {
    setIsAnalyzing(true)
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false)
      // Redirect to results or show success message
      alert("Analysis complete! Results have been emailed to the requester.")
    }, 3000)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 overflow-auto">
        <div className="p-4 lg:p-8">
          {/* Mobile header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                <Upload className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">ContractGuard</h1>
            </div>
            <MobileMenuButton onClick={() => setSidebarOpen(true)} />
          </div>

          {/* Header with back button */}
          <div className="mb-8 flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Upload Contract for Analysis</h1>
              <p className="text-gray-600">AI-powered risk assessment and compliance checking</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Section: Upload Contract Document */}
            <div>
              <Card>
                <CardHeader>
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 mb-3">
                      <Upload className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle>Upload Contract Document</CardTitle>
                    <p className="text-sm text-gray-600">Upload your PDF or Word document for AI-powered risk analysis</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive
                        ? "border-blue-500 bg-blue-50"
                        : uploadedFile
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300 hover:border-gray-400"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-4">
                      <FileText className="mx-auto h-16 w-16 text-gray-400" />
                      <div>
                        <p className="text-lg font-medium text-gray-900">
                          {uploadedFile ? uploadedFile.name : "Drag and drop your file here, or click to browse"}
                        </p>
                                              <p className="text-sm text-gray-600">
                        Supports PDF, DOC, and DOCX files up to 10MB
                      </p>
                      </div>
                    </div>
                  </div>

                  {/* File Type Indicators */}
                  <div className="flex justify-center gap-8 mt-6">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-red-100">
                        <FileText className="h-5 w-5 text-red-600" />
                      </div>
                      <span className="text-xs text-gray-600 mt-1">PDF Files</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-100">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-xs text-gray-600 mt-1">Word Docs</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                        <AlertCircle className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="text-xs text-gray-600 mt-1">Up to 10MB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Section: Requester Information and Analysis Details */}
            <div className="space-y-6">
              {/* Requester Information */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    <CardTitle>Requester Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@company.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                                          <Textarea
                        id="notes"
                        placeholder="Any specific concerns or areas to focus on..."
                        className="mt-1"
                        rows={3}
                      />
                  </div>
                </CardContent>
              </Card>

              {/* What We'll Analyze */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <CardTitle>What We'll Analyze</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                      <span>Liability clauses and risk exposure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                      <span>Insurance requirements and gaps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                      <span>Termination conditions and penalties</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                      <span>Contract duration and renewal terms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                      <span>Other potential legal concerns</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Start AI Analysis Button */}
              <Button 
                onClick={handleAnalysis} 
                className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
                disabled={!uploadedFile || isAnalyzing}
              >
                <Send className="w-5 h-5 mr-2" />
                {isAnalyzing ? "Analyzing..." : "Start AI Analysis"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
