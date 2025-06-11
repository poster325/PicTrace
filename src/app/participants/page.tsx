'use client'

import { useState } from 'react'
import { 
  Camera,
  Upload,
  Mic,
  Smile,
  MapPin,
  Clock,
  Send,
  Image as ImageIcon,
  History,
  Edit,
  Trash2,
  Eye
} from 'lucide-react'

// Mock data for participant view
const currentPrompts = [
  {
    id: '1',
    title: 'Morning Commute Check-in',
    message: 'How are you getting to work today? Capture a moment that represents your morning commute experience.',
    type: 'time-based',
    expiresAt: '2024-01-20 10:00',
    isActive: true
  },
  {
    id: '2',
    title: 'Capture your current environment',
    message: 'Take a photo of your immediate surroundings and describe how this space makes you feel.',
    type: 'emotion-triggered',
    expiresAt: '2024-01-20 15:00',
    isActive: true
  }
]

const submissionHistory = [
  {
    id: '1',
    image: '/api/placeholder/300/200',
    caption: 'Waiting for the subway during rush hour. Feeling rushed but determined.',
    timestamp: '2024-01-20 08:15',
    location: 'Downtown Station',
    emotion: '😤',
    promptTitle: 'Morning Commute Check-in',
    status: 'submitted'
  },
  {
    id: '2',
    image: '/api/placeholder/300/200',
    caption: 'Peaceful coffee shop corner. Perfect spot to start the day.',
    timestamp: '2024-01-19 09:30',
    location: 'Local Café',
    emotion: '😊',
    promptTitle: 'Environment Check-in',
    status: 'submitted'
  },
  {
    id: '3',
    image: '/api/placeholder/300/200',
    caption: 'Traffic jam again. This is becoming exhausting.',
    timestamp: '2024-01-18 17:45',
    location: 'Highway 101',
    emotion: '😔',
    promptTitle: 'Evening Commute',
    status: 'submitted'
  }
]

const emoticons = ['😊', '😔', '😤', '😌', '🤔', '😴', '🥱', '😍', '😰', '🙂', '😅', '😑']

export default function ParticipantsPage() {
  const [activeTab, setActiveTab] = useState<'prompts' | 'capture' | 'history'>('prompts')
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)
  const [captureForm, setCaptureForm] = useState({
    image: null as File | null,
    caption: '',
    emotion: '',
    location: '',
    voiceNote: null as File | null
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setCaptureForm({ ...captureForm, image: file })
    }
  }

  const handleSubmit = () => {
    // In a real app, this would upload to backend
    console.log('Submitting:', captureForm)
    setCaptureForm({
      image: null,
      caption: '',
      emotion: '',
      location: '',
      voiceNote: null
    })
    setActiveTab('history')
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PicTrace Portal</h1>
        <p className="text-gray-600">Share your experiences through photos and reflections</p>
      </div>

      {/* Participant Info */}
      <div className="card p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-lg font-medium text-green-700">SM</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Sarah Martinez</h2>
            <p className="text-sm text-gray-600">Active in Urban Mobility Behaviors study</p>
          </div>
          <div className="ml-auto">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">12 submissions</p>
              <p className="text-xs text-gray-500">Last active: 2 hours ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8">
        <button
          onClick={() => setActiveTab('prompts')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'prompts' 
              ? 'bg-green-100 text-green-700' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          View Prompts
        </button>
        <button
          onClick={() => setActiveTab('capture')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'capture' 
              ? 'bg-green-100 text-green-700' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          Capture Photo
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'history' 
              ? 'bg-green-100 text-green-700' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          My Submissions
        </button>
      </div>

      {/* View Prompts Tab */}
      {activeTab === 'prompts' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Active Prompts</h2>
            <span className="text-sm text-gray-500">{currentPrompts.length} active</span>
          </div>

          {currentPrompts.map((prompt) => (
            <div key={prompt.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{prompt.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      prompt.type === 'time-based' ? 'bg-blue-100 text-blue-800' :
                      prompt.type === 'emotion-triggered' ? 'bg-pink-100 text-pink-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {prompt.type}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{prompt.message}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Expires: {prompt.expiresAt}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setSelectedPrompt(prompt.id)
                    setActiveTab('capture')
                  }}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  <Camera className="w-4 h-4" />
                  <span>Respond</span>
                </button>
              </div>
            </div>
          ))}

          {currentPrompts.length === 0 && (
            <div className="text-center py-12">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No active prompts</h3>
              <p className="text-gray-600">Check back later for new photo prompts</p>
            </div>
          )}
        </div>
      )}

      {/* Capture Photo Tab */}
      {activeTab === 'capture' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Capture & Share</h2>

          <div className="card p-6">
            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Photo *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                {captureForm.image ? (
                  <div className="space-y-4">
                    <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600">{captureForm.image.name}</p>
                    <button
                      onClick={() => setCaptureForm({ ...captureForm, image: null })}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-800 font-medium">
                          Upload a photo
                        </span>
                        <span className="text-gray-600"> or drag and drop</span>
                      </label>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Caption */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Caption & Reflection *
              </label>
              <textarea
                value={captureForm.caption}
                onChange={(e) => setCaptureForm({ ...captureForm, caption: e.target.value })}
                placeholder="Describe what's happening in this photo and how you're feeling..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Emotion Picker */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How are you feeling? 
              </label>
              <div className="grid grid-cols-6 gap-3">
                {emoticons.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setCaptureForm({ ...captureForm, emotion: emoji })}
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-2xl hover:bg-gray-50 ${
                      captureForm.emotion === emoji ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location (optional)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={captureForm.location}
                  onChange={(e) => setCaptureForm({ ...captureForm, location: e.target.value })}
                  placeholder="Where was this taken?"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Voice Note */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voice Note (optional)
              </label>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Mic className="w-4 h-4" />
                <span>Record voice note</span>
              </button>
            </div>

            {/* Submit */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setActiveTab('prompts')}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!captureForm.image || !captureForm.caption}
                className="flex items-center space-x-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>Submit</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submission History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">My Submissions</h2>
            <span className="text-sm text-gray-500">{submissionHistory.length} total submissions</span>
          </div>

          <div className="space-y-4">
            {submissionHistory.map((submission) => (
              <div key={submission.id} className="card p-6">
                <div className="flex space-x-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{submission.promptTitle}</h3>
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{submission.caption}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{submission.timestamp}</span>
                      {submission.location && (
                        <>
                          <span>•</span>
                          <span>{submission.location}</span>
                        </>
                      )}
                      {submission.emotion && (
                        <>
                          <span>•</span>
                          <span>{submission.emotion}</span>
                        </>
                      )}
                      <span>•</span>
                      <span className="text-green-600">Submitted</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {submissionHistory.length === 0 && (
            <div className="text-center py-12">
              <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
              <p className="text-gray-600 mb-4">Start by responding to an active prompt</p>
              <button
                onClick={() => setActiveTab('prompts')}
                className="btn-primary"
              >
                View Prompts
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 