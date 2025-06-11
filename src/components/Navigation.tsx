'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  FlaskConical, 
  FileText, 
  Users, 
  Settings,
  Brain,
  Camera,
  BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  {
    name: 'Dashboard',
    href: '/home',
    icon: Home,
    color: 'home'
  },
  {
    name: 'Studies',
    href: '/studies',
    icon: FlaskConical,
    color: 'study'
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: FileText,
    color: 'reports'
  },
  {
    name: 'Participants',
    href: '/participants',
    icon: Users,
    color: 'participants'
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    color: 'settings'
  }
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">PicTrace</h1>
            <p className="text-xs text-gray-500">Research Platform</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-1">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href)
            const Icon = item.icon
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? `bg-accent-${item.color} text-white`
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Dr. Sarah Chen</p>
            <p className="text-xs text-gray-500">Research Lead</p>
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">SC</span>
          </div>
        </div>
      </div>
    </nav>
  )
} 