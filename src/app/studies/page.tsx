import Link from 'next/link'
import { 
  Plus, 
  Users, 
  Camera, 
  Clock, 
  MoreHorizontal,
  Search,
  Filter
} from 'lucide-react'

// Mock data
const studies = [
  {
    id: 'study-1',
    title: 'Urban Mobility Behaviors',
    description: 'Understanding how people navigate urban environments and their transportation choices',
    participants: 24,
    submissions: 156,
    status: 'active',
    progress: 68,
    createdAt: '2024-01-15',
    lastActivity: '2 hours ago'
  },
  {
    id: 'study-2', 
    title: 'Remote Work Environments',
    description: 'Exploring the physical and emotional aspects of home office setups',
    participants: 18,
    submissions: 89,
    status: 'active',
    progress: 45,
    createdAt: '2024-01-10',
    lastActivity: '5 hours ago'
  },
  {
    id: 'study-3',
    title: 'Shopping Experience Journey',
    description: 'Capturing emotional and contextual aspects of retail experiences',
    participants: 32,
    submissions: 203,
    status: 'pending',
    progress: 30,
    createdAt: '2024-01-08',
    lastActivity: '1 day ago'
  },
  {
    id: 'study-4',
    title: 'Healthcare Waiting Room Experience',
    description: 'Understanding patient experiences and emotions in healthcare settings',
    participants: 12,
    submissions: 45,
    status: 'completed',
    progress: 100,
    createdAt: '2023-12-20',
    lastActivity: '5 days ago'
  },
  {
    id: 'study-5',
    title: 'Public Space Usage Patterns',
    description: 'Analyzing how people use and interact with urban public spaces',
    participants: 28,
    submissions: 134,
    status: 'active',
    progress: 72,
    createdAt: '2024-01-05',
    lastActivity: '3 hours ago'
  }
]

export default function StudiesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Studies</h1>
          <p className="text-gray-600">Manage and monitor your research studies</p>
        </div>
        <Link 
          href="/studies/create"
          className="flex items-center space-x-2 btn-primary"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Study</span>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search studies..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>Showing {studies.length} studies</span>
        </div>
      </div>

      {/* Studies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {studies.map((study) => (
          <div key={study.id} className="card p-6">
            {/* Study Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{study.title}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    study.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : study.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {study.status}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{study.description}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Study Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{study.participants}</span>
                </div>
                <p className="text-xs text-gray-500">Participants</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                  <Camera className="w-4 h-4" />
                  <span>{study.submissions}</span>
                </div>
                <p className="text-xs text-gray-500">Submissions</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium text-gray-900">{study.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${study.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Study Actions */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                <p>Last activity: {study.lastActivity}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Link 
                  href={`/studies/${study.id}/analyze`}
                  className="px-3 py-1 text-xs font-medium text-purple-600 bg-purple-50 rounded-md hover:bg-purple-100"
                >
                  Analyze
                </Link>
                <Link 
                  href={`/studies/${study.id}/run`}
                  className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                >
                  Manage
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no studies) */}
      {studies.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No studies yet</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first photo study</p>
          <Link 
            href="/studies/create"
            className="btn-primary"
          >
            Create Your First Study
          </Link>
        </div>
      )}
    </div>
  )
} 