"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Upload, History, Settings, Shield, FileText, BarChart3, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Upload Contract", href: "/upload", icon: Upload },
  { name: "Analysis History", href: "/history", icon: History },
  { name: "Settings", href: "/settings", icon: Settings },
]

const stats = [
  { name: "Analyses", count: 0, icon: FileText },
  { name: "Reports Sent", count: 0, icon: BarChart3 },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-2 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">ContractGuard</h1>
                <p className="text-xs text-gray-500">AI Contract Analysis</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="flex-1 px-4 py-4">
            <div className="space-y-1">
              <p className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">WORKFLOW</p>
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700" : "text-gray-700 hover:bg-gray-50",
                    )}
                    onClick={onClose}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </div>

            <div className="mt-8 space-y-1">
              <p className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">QUICK STATS</p>
              {stats.map((item) => (
                <div key={item.name} className="flex items-center px-3 py-2">
                  <item.icon className="mr-3 h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className="ml-auto text-sm font-medium text-gray-900">{item.count}</span>
                </div>
              ))}
            </div>
          </nav>

          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                <span className="text-sm font-medium text-gray-700">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Contract Analyst</p>
                <p className="text-xs text-gray-500">Automated Risk Assessment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="lg:hidden"
      onClick={onClick}
    >
      <Menu className="h-5 w-5" />
    </Button>
  )
}
