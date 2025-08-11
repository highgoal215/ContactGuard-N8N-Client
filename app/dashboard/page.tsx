"use client"

import { useState } from "react"
import { Sidebar, MobileMenuButton } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, AlertTriangle, CheckCircle, Clock, TrendingUp, Upload } from "lucide-react"

const recentAnalyses = [
  {
    id: 1,
    name: "Service_Agreement_TechCorp_2024.pdf",
    status: "completed",
    riskScore: 76,
    date: "2 hours ago",
    requester: "John Smith",
  },
  {
    id: 2,
    name: "NDA_GlobalTech_Partners.docx",
    status: "completed",
    riskScore: 35,
    date: "1 day ago",
    requester: "Sarah Jones",
  },
  {
    id: 3,
    name: "Software_License_Agreement_Q1_2024.pdf",
    status: "analyzing",
    riskScore: null,
    date: "5 minutes ago",
    requester: "Mike Wilson",
  },
]

const stats = [
  {
    title: "Total Analyses",
    value: "24",
    change: "+12%",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "High Risk Contracts",
    value: "3",
    change: "-25%",
    icon: AlertTriangle,
    color: "text-red-600",
  },
  {
    title: "Completed This Week",
    value: "8",
    change: "+33%",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Avg. Processing Time",
    value: "2.3m",
    change: "-15%",
    icon: Clock,
    color: "text-purple-600",
  },
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Monitor your contract analysis workflow</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-xl lg:text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <stat.icon className={`w-6 h-6 lg:w-8 lg:h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Analyses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAnalyses.map((analysis) => (
                    <div
                      key={analysis.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                        <div className="flex-shrink-0">
                          <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 truncate">{analysis.name}</p>
                          <p className="text-sm text-gray-600">
                            {analysis.requester} • {analysis.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-end">
                        {analysis.status === "completed" ? (
                          <div className="text-right">
                            <div
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                analysis.riskScore! > 70
                                  ? "bg-red-100 text-red-800"
                                  : analysis.riskScore! > 40
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              Risk Score: {analysis.riskScore}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Completed</p>
                          </div>
                        ) : (
                          <div className="text-right">
                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Analyzing...
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" onClick={() => (window.location.href = "/upload")}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Contract
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => (window.location.href = "/history")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View All Analyses
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => (window.location.href = "/settings")}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Configure Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
