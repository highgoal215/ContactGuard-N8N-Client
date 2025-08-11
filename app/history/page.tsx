"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, FileText, User, Mail, Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const analyses = [
  {
    id: 1,
    fileName: "Service_Agreement_TechCorp_2024.pdf",
    requester: "John Smith",
    email: "john.smith@company.com",
    date: "Aug 9, 2025",
    status: "completed",
    riskLevel: "critical",
    riskScore: 76,
    summary:
      "This service agreement presents several high-risk elements that require immediate attention before signing. The primary concerns are unlimited liability exposure, overly broad indemnification, and one-sided intellectual property terms. The non-compete clause is also unusually restrictive. While the contract length and basic termination...",
  },
  {
    id: 2,
    fileName: "NDA_GlobalTech_Partners.docx",
    requester: "Sarah Jones",
    email: "sarah.jones@company.com",
    date: "Aug 9, 2025",
    status: "completed",
    riskLevel: "medium",
    riskScore: 35,
    summary:
      "This NDA presents moderate risk with generally standard terms. The main concerns are the broad definition of confidential information and the lack of clearly stated mutual obligations. The 5-year post-termination confidentiality period is longer than typical but not unreasonable. Overall, this is a fairly standard NDA with minor...",
  },
  {
    id: 3,
    fileName: "Software_License_Agreement_Q1_2024.pdf",
    requester: "Mike Wilson",
    email: "mike.wilson@company.com",
    date: "Aug 9, 2025",
    status: "analyzing",
    riskLevel: null,
    riskScore: null,
    summary: null,
  },
]

export default function AnalysisHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Statuses")
  const [riskFilter, setRiskFilter] = useState("All Risk Levels")

  const getRiskBadge = (riskLevel: string | null, riskScore: number | null) => {
    if (!riskLevel || !riskScore) return null

    const variants = {
      critical: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800",
    }

    return (
      <Badge className={variants[riskLevel as keyof typeof variants]}>
        {riskLevel === "critical" && <AlertTriangle className="w-3 h-3 mr-1" />}
        {riskLevel === "medium" && <Clock className="w-3 h-3 mr-1" />}
        {riskLevel === "low" && <CheckCircle className="w-3 h-3 mr-1" />}
        {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-100 text-green-800",
      analyzing: "bg-blue-100 text-blue-800",
      failed: "bg-red-100 text-red-800",
    }

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
        {status === "analyzing" && <Clock className="w-3 h-3 mr-1" />}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Analysis History</h1>
            <p className="text-gray-600">View and manage all contract analyses</p>
            <p className="text-sm text-gray-500 mt-1">3 of 3 analyses shown</p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Filter className="w-5 h-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search by document name, requester..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All Statuses</option>
                  <option>Completed</option>
                  <option>Analyzing</option>
                  <option>Failed</option>
                </select>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                >
                  <option>All Risk Levels</option>
                  <option>Critical Risk</option>
                  <option>Medium Risk</option>
                  <option>Low Risk</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Analysis List */}
          <div className="space-y-4">
            {analyses.map((analysis) => (
              <Card key={analysis.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0 mt-1">
                        <FileText className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900 truncate">{analysis.fileName}</h3>
                          {getStatusBadge(analysis.status)}
                          {analysis.riskLevel && getRiskBadge(analysis.riskLevel, analysis.riskScore)}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {analysis.requester}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {analysis.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {analysis.date}
                          </div>
                        </div>

                        {analysis.summary && <p className="text-sm text-gray-700 line-clamp-2">{analysis.summary}</p>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {analysis.riskScore && (
                        <div className="text-right">
                          <div
                            className={`text-2xl font-bold ${
                              analysis.riskScore > 70
                                ? "text-red-600"
                                : analysis.riskScore > 40
                                  ? "text-yellow-600"
                                  : "text-green-600"
                            }`}
                          >
                            {analysis.riskScore}
                          </div>
                          <div className="text-xs text-gray-500">Risk Score</div>
                          <Badge variant="outline" className="mt-1">
                            Sent
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
