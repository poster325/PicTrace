'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft,
  Filter,
  Clock,
  Heart,
  MapPin,
  Tag,
  Grid,
  List,
  Search,
  Plus,
  Brain,
  Network,
  Eye,
  Download
} from 'lucide-react'

interface AnalyzePageProps {
  params: any
}

// Mock data
const clusters = [
  {
    id: 'cluster-1',
    name: 'Transit Waiting',
    description: 'Moments of waiting for public transportation',
    imageCount: 23,
    commonObjects: ['platform', 'person', 'waiting', 'subway'],
    dominantEmotion: 'anticipation',
    timePatterns: ['morning-rush', 'evening-rush'],
    insights: ['High stress during rush hours', 'Preference for less crowded areas']
  },
  {
    id: 'cluster-2',
    name: 'Active Commuting',
    description: 'Walking, cycling, and active transportation',
    imageCount: 18,
    commonObjects: ['bicycle', 'walking', 'path', 'street'],
    dominantEmotion: 'energetic',
    timePatterns: ['morning', 'weekend'],
    insights: ['Weather significantly impacts choice', 'Strong preference for green routes']
  },
  {
    id: 'cluster-3',
    name: 'Traffic Frustration',
    description: 'Stuck in traffic or delayed journeys',
    imageCount: 15,
    commonObjects: ['car', 'traffic', 'road', 'delay'],
    dominantEmotion: 'frustrated',
    timePatterns: ['rush-hour'],
    insights: ['Consistent daily struggle', 'Time unpredictability is major stressor']
  },
  {
    id: 'cluster-4',
    name: 'Peaceful Transit',
    description: 'Calm and pleasant travel moments',
    imageCount: 12,
    commonObjects: ['view', 'window', 'nature', 'comfortable'],
    dominantEmotion: 'peaceful',
    timePatterns: ['off-peak', 'weekend'],
    insights: ['Less crowded environments preferred', 'Natural views enhance experience']
  }
]

const filters = {
  time: ['morning', 'afternoon', 'evening', 'weekend'],
  emotion: ['happy', 'frustrated', 'peaceful', 'energetic', 'anxious'],
  context: ['public-transport', 'walking', 'cycling', 'driving', 'waiting']
}

export default function AnalyzeDataPage({ params }: AnalyzePageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string[]}>({
    time: [],
    emotion: [],
    context: []
  })
  const [searchQuery, setSearchQuery] = useState('')

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }))
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link 
            href={`/studies/${params.id}/run`}
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Analysis</h1>
            <p className="text-gray-600">Explore clusters and build insights from your photo study data</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link
            href={`/studies/${params.id}/export`}
            className="flex items-center space-x-2 btn-secondary"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Link>
          <Link
            href={`/studies/${params.id}/iterate`}
            className="flex items-center space-x-2 btn-primary"
          >
            <Brain className="w-4 h-4" />
            <span>Generate Insights</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Panel */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-6">
            <div className="flex items-center space-x-2 mb-6">
              <Filter className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search clusters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Time Filter */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-4 h-4 text-blue-600" />
                <h3 className="font-medium text-gray-900">Time</h3>
              </div>
              <div className="space-y-2">
                {filters.time.map((time) => (
                  <label key={time} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.time.includes(time)}
                      onChange={() => toggleFilter('time', time)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{time}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Emotion Filter */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Heart className="w-4 h-4 text-pink-600" />
                <h3 className="font-medium text-gray-900">Emotion</h3>
              </div>
              <div className="space-y-2">
                {filters.emotion.map((emotion) => (
                  <label key={emotion} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.emotion.includes(emotion)}
                      onChange={() => toggleFilter('emotion', emotion)}
                      className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{emotion}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Context Filter */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Tag className="w-4 h-4 text-green-600" />
                <h3 className="font-medium text-gray-900">Context</h3>
              </div>
              <div className="space-y-2">
                {filters.context.map((context) => (
                  <label key={context} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.context.includes(context)}
                      onChange={() => toggleFilter('context', context)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{context.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => setSelectedFilters({ time: [], emotion: [], context: [] })}
              className="w-full text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Clear all filters
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Cluster Explorer Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-900">Cluster Explorer</h2>
              <span className="text-sm text-gray-500">{clusters.length} clusters found</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Clusters Grid/List */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-8' : 'space-y-4 mb-8'}>
            {clusters.map((cluster) => (
              <div key={cluster.id} className="card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{cluster.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{cluster.description}</p>
                  </div>
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {cluster.imageCount} photos
                  </span>
                </div>

                {/* Cluster Preview Images */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg"></div>
                  ))}
                </div>

                {/* Cluster Metadata */}
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Dominant Emotion</h4>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                      {cluster.dominantEmotion}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Time Patterns</h4>
                    <div className="flex flex-wrap gap-1">
                      {cluster.timePatterns.map((pattern) => (
                        <span key={pattern} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {pattern}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Key Insights</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {cluster.insights.slice(0, 2).map((insight, index) => (
                        <li key={index} className="flex items-start space-x-1">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View Details
                  </button>
                  <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800">
                    <Plus className="w-4 h-4" />
                    <span>Add to Report</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Theme Mapper */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Network className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">Theme Mapper</h2>
              </div>
              <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800">
                <Eye className="w-4 h-4" />
                <span>View Full Map</span>
              </button>
            </div>

            {/* Affinity Diagram Preview */}
            <div className="bg-gray-50 rounded-lg p-8 min-h-64 flex items-center justify-center">
              <div className="text-center">
                <Network className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Automated Theme Mapping</h3>
                <p className="text-gray-600 mb-4">AI-generated affinity diagram showing relationships between clusters</p>
                <button className="btn-primary">
                  Generate Theme Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 