import Link from 'next/link'
import { 
  Plus, 
  Users, 
  Camera, 
  Brain, 
  Clock, 
  TrendingUp,
  Activity,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

// Mock data
const activeStudies = [
  {
    id: 'study-1',
    title: 'Urban Mobility Behaviors',
    participants: 24,
    submissions: 156,
    status: 'active',
    progress: 68,
    color: 'study'
  },
  {
    id: 'study-2', 
    title: 'Remote Work Environments',
    participants: 18,
    submissions: 89,
    status: 'active',
    progress: 45,
    color: 'study'
  },
  {
    id: 'study-3',
    title: 'Shopping Experience Journey',
    participants: 32,
    submissions: 203,
    status: 'pending',
    progress: 30,
    color: 'study'
  }
]

const recentInsights = [
  {
    id: '1',
    title: 'Morning commute patterns show increased bicycle usage',
    study: 'Urban Mobility Behaviors',
    timestamp: '2 hours ago',
    category: 'behavioral-pattern'
  },
  {
    id: '2', 
    title: 'Home office setups prioritize natural lighting',
    study: 'Remote Work Environments',
    timestamp: '5 hours ago',
    category: 'environmental-preference'
  },
  {
    id: '3',
    title: 'Emotional states vary significantly during shopping',
    study: 'Shopping Experience Journey', 
    timestamp: '1 day ago',
    category: 'emotional-analysis'
  }
]

const systemStatus = {
  aiPreprocessing: 'active',
  totalParticipants: 74,
  totalSubmissions: 448,
  processingQueue: 12
}

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PicTrace Dashboard</h1>
        <p className="text-gray-600">Monitor your active studies and recent insights</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Studies</p>
              <p className="text-2xl font-bold text-gray-900">{activeStudies.filter(s => s.status === 'active').length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Participants</p>
              <p className="text-2xl font-bold text-gray-900">{systemStatus.totalParticipants}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Submissions</p>
              <p className="text-2xl font-bold text-gray-900">{systemStatus.totalSubmissions}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Camera className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Processing Queue</p>
              <p className="text-2xl font-bold text-gray-900">{systemStatus.processingQueue}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Studies */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Active Studies</h2>
            <Link 
              href="/studies/create"
              className="flex items-center space-x-2 btn-primary"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Study</span>
            </Link>
          </div>
          
          <div className="space-y-4">
            {activeStudies.map((study) => (
              <Link 
                key={study.id} 
                href={`/studies/${study.id}/run`}
                className="card p-6 block hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{study.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{study.participants} participants</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Camera className="w-4 h-4" />
                        <span>{study.submissions} submissions</span>
                      </span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    study.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {study.status === 'active' ? 'Active' : 'Pending'}
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${study.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{study.progress}% complete</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Recent Insights */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Insights</h2>
            <div className="space-y-4">
              {recentInsights.map((insight) => (
                <div key={insight.id} className="card p-4">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{insight.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{insight.study}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{insight.timestamp}</span>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
            <Link 
              href="/reports"
              className="block text-center text-blue-600 hover:text-blue-800 text-sm font-medium mt-4"
            >
              View All Reports →
            </Link>
          </div>

          {/* System Status */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">System Status</h2>
            <div className="card p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">AI Preprocessing</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Object Detection</span>
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-600">Running</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Metadata Extraction</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">Healthy</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cluster Assignment</span>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-600">Processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 