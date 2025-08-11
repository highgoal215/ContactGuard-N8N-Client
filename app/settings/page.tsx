"use client"

import { useState } from "react"
import { Sidebar, MobileMenuButton } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { SettingsIcon, Mail, Bell, Shield, Save } from "lucide-react"

export default function Settings() {
  const [settings, setSettings] = useState({
    emailSubject: "Contract Risk Analysis Complete - [document_name]",
    emailSignature: "Best regards,\nContractGuard AI Analysis System",
    includeRiskScore: true,
    includeRecommendations: true,
    autoSendEmail: true,
    highRiskThreshold: 75,
    detailedAnalysis: true,
    legalDisclaimer: false,
    emailOnComplete: true,
    emailOnHighRisk: true,
    weeklySummary: false,
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSave = () => {
    // Save settings logic here
    alert("Settings saved successfully!")
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
                <SettingsIcon className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">ContractGuard</h1>
            </div>
            <MobileMenuButton onClick={() => setSidebarOpen(true)} />
          </div>

          <div className="mb-6 lg:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 lg:w-6 lg:h-6" />
              Settings
            </h1>
            <p className="text-sm sm:text-base text-gray-600">Configure your contract analysis preferences and automation settings</p>
          </div>

          <div className="space-y-4 lg:space-y-6">
            {/* Email Template Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mail className="w-4 h-4 lg:w-5 lg:h-5" />
                  Email Template Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="emailSubject" className="text-sm">Email Subject Template</Label>
                  <Input
                    id="emailSubject"
                    value={settings.emailSubject}
                    onChange={(e) => setSettings({ ...settings, emailSubject: e.target.value })}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Available variables: [document_name], [requester_name], [risk_score], [date]
                  </p>
                </div>

                <div>
                  <Label htmlFor="emailSignature" className="text-sm">Email Signature</Label>
                  <Textarea
                    id="emailSignature"
                    value={settings.emailSignature}
                    onChange={(e) => setSettings({ ...settings, emailSignature: e.target.value })}
                    className="mt-1 min-h-[80px]"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <Label className="text-sm">Include Risk Score in Email</Label>
                      <p className="text-xs lg:text-sm text-gray-600">Show overall risk score in email subject and body</p>
                    </div>
                    <Switch
                      checked={settings.includeRiskScore}
                      onCheckedChange={(checked) => setSettings({ ...settings, includeRiskScore: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <Label className="text-sm">Include Recommendations</Label>
                      <p className="text-xs lg:text-sm text-gray-600">Add actionable recommendations to email</p>
                    </div>
                    <Switch
                      checked={settings.includeRecommendations}
                      onCheckedChange={(checked) => setSettings({ ...settings, includeRecommendations: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <Label className="text-sm">Auto-send Email on Complete</Label>
                      <p className="text-xs lg:text-sm text-gray-600">Automatically send results via email</p>
                    </div>
                    <Switch
                      checked={settings.autoSendEmail}
                      onCheckedChange={(checked) => setSettings({ ...settings, autoSendEmail: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <Label className="text-sm">Email on High Risk</Label>
                      <p className="text-xs lg:text-sm text-gray-600">Send immediate notification for high-risk contracts</p>
                    </div>
                    <Switch
                      checked={settings.emailOnHighRisk}
                      onCheckedChange={(checked) => setSettings({ ...settings, emailOnHighRisk: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <Label className="text-sm">Weekly Summary</Label>
                      <p className="text-xs lg:text-sm text-gray-600">Receive weekly analysis summary</p>
                    </div>
                    <Switch
                      checked={settings.weeklySummary}
                      onCheckedChange={(checked) => setSettings({ ...settings, weeklySummary: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <Label className="text-sm">Legal Disclaimer</Label>
                      <p className="text-xs lg:text-sm text-gray-600">Include legal disclaimer in emails</p>
                    </div>
                    <Switch
                      checked={settings.legalDisclaimer}
                      onCheckedChange={(checked) => setSettings({ ...settings, legalDisclaimer: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-4 h-4 lg:w-5 lg:h-5" />
                  Analysis Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="highRiskThreshold" className="text-sm">High Risk Threshold</Label>
                  <div className="flex items-center gap-4 mt-1">
                    <Input
                      id="highRiskThreshold"
                      type="number"
                      min="0"
                      max="100"
                      value={settings.highRiskThreshold}
                      onChange={(e) => setSettings({ ...settings, highRiskThreshold: parseInt(e.target.value) })}
                      className="w-20"
                    />
                    <span className="text-sm text-gray-600">% (0-100)</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Contracts with risk scores above this threshold will be flagged as high risk
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <Label className="text-sm">Detailed Analysis</Label>
                    <p className="text-xs lg:text-sm text-gray-600">Perform comprehensive contract analysis</p>
                  </div>
                  <Switch
                    checked={settings.detailedAnalysis}
                    onCheckedChange={(checked) => setSettings({ ...settings, detailedAnalysis: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
