"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
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

  const handleSave = () => {
    // Save settings logic here
    alert("Settings saved successfully!")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <SettingsIcon className="w-6 h-6" />
              Settings
            </h1>
            <p className="text-gray-600">Configure your contract analysis preferences and automation settings</p>
          </div>

          <div className="space-y-6">
            {/* Email Template Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Template Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="emailSubject">Email Subject Template</Label>
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
                  <Label htmlFor="emailSignature">Email Signature</Label>
                  <Textarea
                    id="emailSignature"
                    value={settings.emailSignature}
                    onChange={(e) => setSettings({ ...settings, emailSignature: e.target.value })}
                    className="mt-1 min-h-[80px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Include Risk Score in Email</Label>
                      <p className="text-sm text-gray-600">Show overall risk score in email subject and body</p>
                    </div>
                    <Switch
                      checked={settings.includeRiskScore}
                      onCheckedChange={(checked) => setSettings({ ...settings, includeRiskScore: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Include Recommendations</Label>
                      <p className="text-sm text-gray-600">Include AI-generated recommendations in email</p>
                    </div>
                    <Switch
                      checked={settings.includeRecommendations}
                      onCheckedChange={(checked) => setSettings({ ...settings, includeRecommendations: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Analysis Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-Send Analysis Email</Label>
                    <p className="text-sm text-gray-600">Automatically send analysis results via email</p>
                  </div>
                  <Switch
                    checked={settings.autoSendEmail}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoSendEmail: checked })}
                  />
                </div>

                <div>
                  <Label htmlFor="riskThreshold">High Risk Threshold</Label>
                  <Input
                    id="riskThreshold"
                    type="number"
                    value={settings.highRiskThreshold}
                    onChange={(e) => setSettings({ ...settings, highRiskThreshold: Number.parseInt(e.target.value) })}
                    className="mt-1 w-32"
                    min="1"
                    max="100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Scores above this threshold will be flagged as high risk</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Detailed Analysis</Label>
                      <p className="text-sm text-gray-600">
                        Provide more comprehensive analysis with additional context
                      </p>
                    </div>
                    <Switch
                      checked={settings.detailedAnalysis}
                      onCheckedChange={(checked) => setSettings({ ...settings, detailedAnalysis: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Include Legal Advice Disclaimer</Label>
                      <p className="text-sm text-gray-600">
                        Add disclaimer that analysis doesn't constitute legal advice
                      </p>
                    </div>
                    <Switch
                      checked={settings.legalDisclaimer}
                      onCheckedChange={(checked) => setSettings({ ...settings, legalDisclaimer: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email on Analysis Complete</Label>
                    <p className="text-sm text-gray-600">Get notified when analysis is completed</p>
                  </div>
                  <Switch
                    checked={settings.emailOnComplete}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailOnComplete: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email on High Risk Detection</Label>
                    <p className="text-sm text-gray-600">Get immediate alerts for high-risk contracts</p>
                  </div>
                  <Switch
                    checked={settings.emailOnHighRisk}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailOnHighRisk: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Summary Reports</Label>
                    <p className="text-sm text-gray-600">Receive weekly summaries of all analyses</p>
                  </div>
                  <Switch
                    checked={settings.weeklySummary}
                    onCheckedChange={(checked) => setSettings({ ...settings, weeklySummary: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-between items-center">
              <Button variant="outline" onClick={() => window.location.reload()}>
                Reset to Defaults
              </Button>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
