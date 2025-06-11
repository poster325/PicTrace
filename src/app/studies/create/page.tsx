'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Heart, 
  Calendar,
  Users,
  Mail,
  Plus,
  X
} from 'lucide-react'

interface StudyForm {
  title: string
  description: string
  goals: string
  promptLogic: {
    timeBased: boolean
    eventTriggered: boolean
    emotionTriggered: boolean
  }
  participants: string[]
}

const steps = [
  { id: 1, name: 'Define Topic & Goals', description: 'Set the foundation for your study' },
  { id: 2, name: 'Set Prompt Logic', description: 'Configure when participants will be prompted' },
  { id: 3, name: 'Assign Participants', description: 'Choose who will participate in your study' }
]

export default function CreateStudyPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [newParticipant, setNewParticipant] = useState('')
  const [form, setForm] = useState<StudyForm>({
    title: '',
    description: '',
    goals: '',
    promptLogic: {
      timeBased: false,
      eventTriggered: false,
      emotionTriggered: false
    },
    participants: []
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // In a real app, this would save to backend
    console.log('Creating study:', form)
    router.push('/studies/study-new/run')
  }

  const addParticipant = () => {
    if (newParticipant && !form.participants.includes(newParticipant)) {
      setForm({
        ...form,
        participants: [...form.participants, newParticipant]
      })
      setNewParticipant('')
    }
  }

  const removeParticipant = (email: string) => {
    setForm({
      ...form,
      participants: form.participants.filter(p => p !== email)
    })
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return form.title.trim() && form.description.trim() && form.goals.trim()
      case 2:
        return Object.values(form.promptLogic).some(Boolean)
      case 3:
        return form.participants.length > 0
      default:
        return false
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button 
          onClick={() => router.back()}
          className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Study</h1>
          <p className="text-gray-600">Set up a new photo-based research study</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.id 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'border-gray-300 text-gray-400'
              }`}>
                {step.id}
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {step.name}
                </p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-24 h-0.5 mx-8 ${
                  currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="card p-8">
        {/* Step 1: Define Topic & Goals */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Define Topic & Goals</h2>
              <p className="text-gray-600 mb-6">Provide basic information about your research study</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Study Title *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g., Urban Mobility Behaviors"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Study Description *
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe what you want to understand through this photo study..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Research Goals *
              </label>
              <textarea
                value={form.goals}
                onChange={(e) => setForm({ ...form, goals: e.target.value })}
                placeholder="What specific insights or outcomes are you hoping to achieve?"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Step 2: Set Prompt Logic */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Set Prompt Logic</h2>
              <p className="text-gray-600 mb-6">Choose when and how participants will be prompted to capture photos</p>
            </div>

            <div className="space-y-4">
              <div className="card p-6 border-2 border-dashed border-gray-200">
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    id="time-based"
                    checked={form.promptLogic.timeBased}
                    onChange={(e) => setForm({
                      ...form,
                      promptLogic: { ...form.promptLogic, timeBased: e.target.checked }
                    })}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <label htmlFor="time-based" className="font-medium text-gray-900">
                        Time-based Prompts
                      </label>
                    </div>
                    <p className="text-sm text-gray-600">
                      Send prompts at specific times (e.g., morning commute, lunch break, evening)
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-6 border-2 border-dashed border-gray-200">
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    id="event-triggered"
                    checked={form.promptLogic.eventTriggered}
                    onChange={(e) => setForm({
                      ...form,
                      promptLogic: { ...form.promptLogic, eventTriggered: e.target.checked }
                    })}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <label htmlFor="event-triggered" className="font-medium text-gray-900">
                        Event-triggered Prompts
                      </label>
                    </div>
                    <p className="text-sm text-gray-600">
                      Trigger prompts based on specific activities or locations
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-6 border-2 border-dashed border-gray-200">
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    id="emotion-triggered"
                    checked={form.promptLogic.emotionTriggered}
                    onChange={(e) => setForm({
                      ...form,
                      promptLogic: { ...form.promptLogic, emotionTriggered: e.target.checked }
                    })}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Heart className="w-5 h-5 text-pink-600" />
                      <label htmlFor="emotion-triggered" className="font-medium text-gray-900">
                        Emotion-triggered Prompts
                      </label>
                    </div>
                    <p className="text-sm text-gray-600">
                      Prompt participants when they experience certain emotions or feelings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Assign Participants */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Assign Participants</h2>
              <p className="text-gray-600 mb-6">Add participants who will contribute to this study</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Participant Email
              </label>
              <div className="flex space-x-2">
                <input
                  type="email"
                  value={newParticipant}
                  onChange={(e) => setNewParticipant(e.target.value)}
                  placeholder="participant@email.com"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
                />
                <button
                  onClick={addParticipant}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {form.participants.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Participants ({form.participants.length})
                </h3>
                <div className="space-y-2">
                  {form.participants.map((email, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm text-gray-900">{email}</span>
                      </div>
                      <button
                        onClick={() => removeParticipant(email)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-3">
            <button
              onClick={() => router.push('/studies')}
              className="btn-secondary"
            >
              Cancel
            </button>
            
            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center space-x-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Study
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 