"use client"

import { useState } from "react"
import { Sidebar, MobileMenuButton } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, AlertTriangle, CheckCircle, Clock, TrendingUp, Upload, Plus, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

const recentAnalyses = [
  {
    id: 1,
    name: "Service_Agreement_TechCorp_2024.pdf",
    status: "completed",
    riskScore: 76,
    date: "Aug 9",
    requester: "John Smith",
  },
  {
    id: 2,
    name: "NDA_GlobalTech_Partners.docx",
    status: "completed",
    riskScore: 35,
    date: "Aug 9",
    requester: "Sarah Jones",
  },
  {
    id: 3,
    name: "Software_License_Agreement_Q1_2024.pdf",
    status: "analyzing",
    riskScore: null,
    date: "Aug 9",
    requester: "Mike Wilson",
  },
]

const stats = [
  {
    title: "Total Analyses",
    value: "3",
    change: "+12% this month",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "Completed",
    value: "2",
    change: "98% success rate",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "In Progress",
    value: "1",
    change: "Avg 2.5 min",
    icon: Clock,
    color: "text-orange-600",
  },
  {
    title: "High Risk Found",
    value: "1",
    change: "Risk prevented",
    icon: AlertTriangle,
    color: "text-red-600",
  },
]

const riskDistribution = [
  { level: "Low Risk", count: 0, color: "bg-green-500" },
  { level: "Medium Risk", count: 1, color: "bg-yellow-500" },
  { level: "High Risk", count: 0, color: "bg-orange-500" },
  { level: "Critical Risk", count: 1, color: "bg-red-500" },
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const handleAnalyzeNewContract = () => {
    router.push("/upload")
  }

  const totalAnalyzed = 2
  const highRiskRate = 50.0

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 overflow-auto">
        <div className="p-4 lg:p-8">
          {/* Mobile header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">ContractGuard</h1>
            </div>
            <MobileMenuButton onClick={() => setSidebarOpen(true)} />
          </div>

          {/* Header with title and Analyze New Contract button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Contract Analysis Dashboard</h1>
              <p className="text-sm sm:text-base text-gray-600">AI-powered contract risk assessment and automation</p>
            </div>
            <Button 
              onClick={handleAnalyzeNewContract} 
              className="bg-[#4A48FF] hover:bg-blue-700 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Analyze New Contract
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-3 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                      <p className="text-lg lg:text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs lg:text-sm text-green-600 flex items-center mt-1 truncate">
                        {stat.change}
                      </p>
                    </div>
                    <stat.icon className={`w-5 h-5 lg:w-8 lg:h-8 flex-shrink-0 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {/* Recent Analyses */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-lg">Recent Analyses</CardTitle>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 lg:space-y-4">
                  {recentAnalyses.map((analysis) => (
                    <div
                      key={analysis.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 lg:p-4 border border-gray-200 rounded-lg gap-3"
                    >
                      <div className="flex items-start sm:items-center space-x-3 min-w-0 flex-1">
                        <div className="flex-shrink-0">
                          <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 text-sm lg:text-base break-words">{analysis.name}</p>
                          <p className="text-xs lg:text-sm text-gray-600">
                            {analysis.requester} {analysis.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-end sm:justify-start space-x-2">
                        {analysis.status === "completed" ? (
                          <>
                            <div
                              className={`inline-flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 rounded-full text-xs font-medium ${
                                analysis.riskScore! > 70
                                  ? "bg-red-100 text-red-800"
                                  : analysis.riskScore! > 40
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {analysis.riskScore}
                            </div>
                            <Button size="sm" variant="outline" className="text-green-600 border-green-600 text-xs lg:text-sm">
                              Complete
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" variant="outline" className="text-blue-600 border-blue-600 text-xs lg:text-sm">
                            Analyzing
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Right Column */}
            <div className="space-y-4 lg:space-y-6">
              {/* Risk Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Risk Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {riskDistribution.map((risk) => (
                      <div key={risk.level} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${risk.color}`}></div>
                          <span className="text-sm text-gray-700">{risk.level}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{risk.count}</span>
                          {risk.count > 0 && (
                            <div className={`w-8 lg:w-12 h-2 rounded-full ${risk.color} opacity-60`}></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm">
                      <span className="text-gray-600">Total Analyzed: {totalAnalyzed}</span>
                      <span className="text-red-600 font-medium">High Risk Rate: {highRiskRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-[#4A48FF] text-white">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start bg-transparent text-white border-white hover:bg-white hover:text-blue-900 text-sm"
                    onClick={() => router.push("/upload")}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Upload New Contract
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start bg-transparent text-white border-white hover:bg-white hover:text-blue-900 text-sm"
                    onClick={() => router.push("/history")}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View All Analyses
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start bg-transparent text-white border-white hover:bg-white hover:text-blue-900 text-sm"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Email Templates
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
