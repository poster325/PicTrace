import Link from 'next/link'
import { 
  FileText, 
  Download, 
  Eye, 
  Share, 
  Calendar,
  BarChart3,
  Image as ImageIcon,
  Filter,
  Search,
  Plus,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react'

// Mock data for reports
const reports = [
  {
    id: 'report-1',
    title: 'Urban Mobility Behaviors - Final Report',
    description: 'Comprehensive analysis of commuting patterns and transportation preferences in urban environments',
    studyId: 'study-1',
    studyTitle: 'Urban Mobility Behaviors',
    createdAt: '2024-01-18',
    lastModified: '2024-01-20',
    status: 'published',
    type: 'final-report',
    insights: 12,
    clusters: 8,
    participants: 24,
    pages: 15,
    exports: {
      pdf: true,
      csv: true,
      figma: false
    }
  },
  {
    id: 'report-2',
    title: 'Remote Work Environment Insights',
    description: 'Key findings on home office setup preferences and their impact on productivity',
    studyId: 'study-2',
    studyTitle: 'Remote Work Environments',
    createdAt: '2024-01-15',
    lastModified: '2024-01-19',
    status: 'draft',
    type: 'insight-summary',
    insights: 8,
    clusters: 5,
    participants: 18,
    pages: 8,
    exports: {
      pdf: false,
      csv: true,
      figma: true
    }
  },
  {
    id: 'report-3',
    title: 'Cross-Study Pattern Analysis',
    description: 'Behavioral patterns identified across multiple studies and participant groups',
    studyId: null,
    studyTitle: 'Multiple Studies',
    createdAt: '2024-01-10',
    lastModified: '2024-01-17',
    status: 'published',
    type: 'pattern-analysis',
    insights: 15,
    clusters: 12,
    participants: 64,
    pages: 22,
    exports: {
      pdf: true,
      csv: true,
      figma: true
    }
  }
]

const recentExports = [
  {
    id: '1',
    reportTitle: 'Urban Mobility Behaviors - Final Report',
    type: 'PDF',
    exportedAt: '2024-01-20 14:30',
    size: '2.4 MB'
  },
  {
    id: '2',
    reportTitle: 'Remote Work Environment Insights',
    type: 'CSV',
    exportedAt: '2024-01-19 09:15',
    size: '145 KB'
  },
  {
    id: '3',
    reportTitle: 'Cross-Study Pattern Analysis',
    type: 'Figma',
    exportedAt: '2024-01-17 16:45',
    size: 'N/A'
  }
]

export default function ReportsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
          <p className="text-gray-600">Access and manage your research insights and visual reports</p>
        </div>
        <Link
          href="/reports/create"
          className="flex items-center space-x-2 btn-primary"
        >
          <Plus className="w-4 h-4" />
          <span>Create Report</span>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
            </div>
            <FileText className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">{reports.filter(r => r.status === 'published').length}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Insights</p>
              <p className="text-2xl font-bold text-gray-900">{reports.reduce((sum, r) => sum + r.insights, 0)}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Recent Exports</p>
              <p className="text-2xl font-bold text-gray-900">{recentExports.length}</p>
            </div>
            <Download className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Visual Insight Reports */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Visual Insight Reports</h2>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
              </div>
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {reports.map((report) => (
              <div key={report.id} className="card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.type === 'final-report' ? 'bg-blue-100 text-blue-800' :
                        report.type === 'insight-summary' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {report.type.replace('-', ' ')}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{report.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Study: {report.studyTitle}</span>
                      <span>•</span>
                      <span>Created: {report.createdAt}</span>
                      <span>•</span>
                      <span>{report.pages} pages</span>
                    </div>
                  </div>
                </div>

                {/* Report Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 py-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                      <BarChart3 className="w-4 h-4" />
                      <span>{report.insights}</span>
                    </div>
                    <p className="text-xs text-gray-500">Insights</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                      <ImageIcon className="w-4 h-4" />
                      <span>{report.clusters}</span>
                    </div>
                    <p className="text-xs text-gray-500">Clusters</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{report.participants}</span>
                    </div>
                    <p className="text-xs text-gray-500">Participants</p>
                  </div>
                </div>

                {/* Report Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Available formats:</span>
                    {report.exports.pdf && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">PDF</span>
                    )}
                    {report.exports.csv && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">CSV</span>
                    )}
                    {report.exports.figma && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Figma</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
                      <Share className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded">
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Export Previous Reports */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Exports</h2>
            <div className="card p-6">
              <div className="space-y-4">
                {recentExports.map((exportItem) => (
                  <div key={exportItem.id} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{exportItem.reportTitle}</h4>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{exportItem.type}</span>
                        <span>•</span>
                        <span>{exportItem.exportedAt}</span>
                        {exportItem.size !== 'N/A' && (
                          <>
                            <span>•</span>
                            <span>{exportItem.size}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <button className="ml-2 text-gray-400 hover:text-gray-600">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-center text-red-600 hover:text-red-800 text-sm font-medium">
                View All Exports →
              </button>
            </div>
          </div>

          {/* Cross-Study Pattern View */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Pattern Analysis</h2>
            <div className="card p-6">
              <div className="text-center mb-4">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Cross-Study Patterns</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Discover behavioral patterns across multiple studies
                </p>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Commute Stress Patterns</span>
                  <span className="text-gray-900 font-medium">3 studies</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Environmental Preferences</span>
                  <span className="text-gray-900 font-medium">2 studies</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Time-based Behaviors</span>
                  <span className="text-gray-900 font-medium">4 studies</span>
                </div>
              </div>
              
              <button className="w-full btn-primary text-sm">
                Generate Pattern Report
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Stats</h2>
            <div className="card p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Most Active Study</span>
                  <span className="text-sm font-medium text-gray-900">Urban Mobility</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg Response Rate</span>
                  <span className="text-sm font-medium text-gray-900">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Data Points</span>
                  <span className="text-sm font-medium text-gray-900">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Report Downloads</span>
                  <span className="text-sm font-medium text-gray-900">43</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 