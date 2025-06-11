import Link from 'next/link'
import { 
  ArrowLeft,
  Users, 
  Camera, 
  Clock, 
  Brain,
  Activity,
  CheckCircle,
  AlertTriangle,
  Download,
  Eye,
  MoreHorizontal,
  Play,
  Pause,
  Send
} from 'lucide-react'

// Mock data for the study
const studyData = {
  id: 'study-1',
  title: 'Urban Mobility Behaviors',
  description: 'Understanding how people navigate urban environments and their transportation choices',
  status: 'active',
  participants: 24,
  submissions: 156,
  startDate: '2024-01-15',
  endDate: '2024-02-15'
}

const promptLog = [
  {
    id: '1',
    type: 'time-based',
    message: 'Morning Commute Check-in',
    sentTo: 24,
    responses: 18,
    timestamp: '2024-01-20 08:00',
    status: 'completed'
  },
  {
    id: '2',
    type: 'emotion-triggered',
    message: 'Capture your current environment',
    sentTo: 12,
    responses: 8,
    timestamp: '2024-01-20 10:30',
    status: 'active'
  },
  {
    id: '3',
    type: 'event-triggered',
    message: 'Transportation mode change',
    sentTo: 6,
    responses: 4,
    timestamp: '2024-01-20 12:15',
    status: 'active'
  }
]

const submissions = [
  {
    id: '1',
    participant: 'Sarah M.',
    image: '/api/placeholder/300/200',
    caption: 'Waiting for the subway during rush hour. Feeling rushed but determined.',
    timestamp: '2024-01-20 08:15',
    location: 'Downtown Station',
    emotion: 'determined',
    processed: true,
    objects: ['person', 'subway', 'crowd', 'platform'],
    clusters: ['transit-waiting', 'rush-hour']
  },
  {
    id: '2',
    participant: 'Michael R.',
    image: '/api/placeholder/300/200',
    caption: 'Cycling through the park path. Fresh air and peaceful morning.',
    timestamp: '2024-01-20 08:45',
    location: 'Central Park',
    emotion: 'peaceful',
    processed: true,
    objects: ['bicycle', 'path', 'trees', 'park'],
    clusters: ['active-transport', 'nature-commute']
  },
  {
    id: '3',
    participant: 'Elena K.',
    image: '/api/placeholder/300/200',
    caption: 'Stuck in traffic again. This is becoming my daily reality.',
    timestamp: '2024-01-20 09:00',
    location: 'Highway 101',
    emotion: 'frustrated',
    processed: false,
    objects: [],
    clusters: []
  }
]

const aiStatus = {
  objectDetection: { status: 'running', processed: 142, total: 156 },
  metadataExtraction: { status: 'healthy', processed: 156, total: 156 },
  clusterAssignment: { status: 'processing', processed: 128, total: 156 }
}

interface RunPageProps {
  params: any
}

export default function StudyRunPage({ params }: RunPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link 
            href="/studies"
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{studyData.title}</h1>
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Active
              </div>
            </div>
            <p className="text-gray-600">{studyData.description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link
            href={`/studies/${params.id}/analyze`}
            className="flex items-center space-x-2 btn-secondary"
          >
            <Brain className="w-4 h-4" />
            <span>Analyze Data</span>
          </Link>
          <button className="flex items-center space-x-2 btn-primary">
            <Send className="w-4 h-4" />
            <span>Send Prompt</span>
          </button>
        </div>
      </div>

      {/* Study Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Participants</p>
              <p className="text-2xl font-bold text-gray-900">{studyData.participants}</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Submissions</p>
              <p className="text-2xl font-bold text-gray-900">{studyData.submissions}</p>
            </div>
            <Camera className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Rate</p>
              <p className="text-2xl font-bold text-gray-900">78%</p>
            </div>
            <Activity className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Days Remaining</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Prompt Monitor */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Prompt Monitor</h2>
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Recent Prompts</h3>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View All
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {promptLog.map((prompt) => (
                  <div key={prompt.id} className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          prompt.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                        }`}></div>
                        <h4 className="font-medium text-gray-900">{prompt.message}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          prompt.type === 'time-based' ? 'bg-blue-100 text-blue-800' :
                          prompt.type === 'emotion-triggered' ? 'bg-pink-100 text-pink-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {prompt.type}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{prompt.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Sent to {prompt.sentTo} participants</span>
                      <span>•</span>
                      <span>{prompt.responses} responses</span>
                      <span>•</span>
                      <span>{Math.round((prompt.responses / prompt.sentTo) * 100)}% response rate</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submission Management */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Submissions</h2>
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Latest Photos</h3>
                  <Link 
                    href={`/studies/${params.id}/submissions`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View All
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <div key={submission.id} className="p-6">
                    <div className="flex space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                        {/* Placeholder for image */}
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                          <Camera className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{submission.participant}</h4>
                            <span className="text-sm text-gray-500">{submission.timestamp}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {submission.processed ? (
                              <div className="flex items-center space-x-1 text-green-600">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-xs">Processed</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-1 text-yellow-600">
                                <Clock className="w-4 h-4" />
                                <span className="text-xs">Processing</span>
                              </div>
                            )}
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{submission.caption}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{submission.location}</span>
                          {submission.emotion && (
                            <>
                              <span>•</span>
                              <span className="capitalize">Feeling {submission.emotion}</span>
                            </>
                          )}
                          {submission.processed && submission.clusters.length > 0 && (
                            <>
                              <span>•</span>
                              <span>{submission.clusters.length} clusters identified</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* AI Preprocessing Status */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">AI Preprocessing</h2>
            <div className="card p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Object Detection</span>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-blue-600">Running</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(aiStatus.objectDetection.processed / aiStatus.objectDetection.total) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {aiStatus.objectDetection.processed} / {aiStatus.objectDetection.total} processed
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Metadata Extraction</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">Complete</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(aiStatus.metadataExtraction.processed / aiStatus.metadataExtraction.total) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {aiStatus.metadataExtraction.processed} / {aiStatus.metadataExtraction.total} processed
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Cluster Assignment</span>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-yellow-600">Processing</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-600 h-2 rounded-full"
                      style={{ width: `${(aiStatus.clusterAssignment.processed / aiStatus.clusterAssignment.total) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {aiStatus.clusterAssignment.processed} / {aiStatus.clusterAssignment.total} processed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href={`/studies/${params.id}/iterate`}
                className="block w-full btn-secondary text-center"
              >
                Adjust Prompts
              </Link>
              <Link
                href={`/studies/${params.id}/participants`}
                className="block w-full btn-secondary text-center"
              >
                Manage Participants
              </Link>
              <Link
                href={`/studies/${params.id}/export`}
                className="block w-full btn-secondary text-center"
              >
                Export Data
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 