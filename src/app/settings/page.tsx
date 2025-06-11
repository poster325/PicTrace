'use client'

import { useState } from 'react'
import { 
  Settings as SettingsIcon,
  Brain,
  Key,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Info
} from 'lucide-react'

interface AISettings {
  imageSensitivity: number
  clusterGranularity: 'low' | 'medium' | 'high'
  objectDetectionThreshold: number
  emotionAnalysisEnabled: boolean
  autoClusteringEnabled: boolean
  metadataExtraction: boolean
}

interface IntegrationSettings {
  googleVision: string
  amazonRekognition: string
  openaiApi: string
  customEndpoint: string
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'ai-tuning' | 'integrations'>('ai-tuning')
  const [showApiKeys, setShowApiKeys] = useState<{[key: string]: boolean}>({})
  const [aiSettings, setAiSettings] = useState<AISettings>({
    imageSensitivity: 75,
    clusterGranularity: 'medium',
    objectDetectionThreshold: 80,
    emotionAnalysisEnabled: true,
    autoClusteringEnabled: true,
    metadataExtraction: true
  })
  
  const [integrations, setIntegrations] = useState<IntegrationSettings>({
    googleVision: 'AIzaSyC...kL9X',
    amazonRekognition: 'AKIAIOSFOD...Q7X',
    openaiApi: 'sk-proj-...aB3d',
    customEndpoint: ''
  })

  const [connectionStatus, setConnectionStatus] = useState<{[key: string]: 'connected' | 'error' | 'testing'}>({
    googleVision: 'connected',
    amazonRekognition: 'connected',
    openaiApi: 'error',
    customEndpoint: 'error'
  })

  const toggleApiKeyVisibility = (key: string) => {
    setShowApiKeys(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const testConnection = async (service: string) => {
    setConnectionStatus(prev => ({ ...prev, [service]: 'testing' }))
    // Simulate API test
    setTimeout(() => {
      setConnectionStatus(prev => ({ 
        ...prev, 
        [service]: Math.random() > 0.3 ? 'connected' : 'error' 
      }))
    }, 2000)
  }

  const handleSave = () => {
    // Save settings logic here
    console.log('Saving settings:', { aiSettings, integrations })
  }

  const renderConnectionStatus = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'testing':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Configure AI models and manage integrations</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8">
        <button
          onClick={() => setActiveTab('ai-tuning')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'ai-tuning' 
              ? 'bg-yellow-100 text-yellow-700' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>AI Model Tuning</span>
        </button>
        <button
          onClick={() => setActiveTab('integrations')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'integrations' 
              ? 'bg-yellow-100 text-yellow-700' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>Integrations</span>
        </button>
      </div>

      {/* AI Model Tuning Tab */}
      {activeTab === 'ai-tuning' && (
        <div className="space-y-8">
          <div className="card p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Brain className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">AI Model Configuration</h2>
            </div>

            <div className="space-y-6">
              {/* Image Sensitivity */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">Image Sensitivity Level</label>
                    <div className="group relative">
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48">
                        Controls how sensitive the AI is to detecting objects and emotions in images
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">{aiSettings.imageSensitivity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={aiSettings.imageSensitivity}
                  onChange={(e) => setAiSettings({ 
                    ...aiSettings, 
                    imageSensitivity: parseInt(e.target.value) 
                  })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>

              {/* Cluster Granularity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Cluster Granularity</label>
                <div className="grid grid-cols-3 gap-3">
                  {['low', 'medium', 'high'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setAiSettings({ 
                        ...aiSettings, 
                        clusterGranularity: level as 'low' | 'medium' | 'high' 
                      })}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        aiSettings.clusterGranularity === level
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="capitalize">{level}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {level === 'low' && 'Broader categories'}
                        {level === 'medium' && 'Balanced grouping'}
                        {level === 'high' && 'Detailed clusters'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Object Detection Threshold */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">Object Detection Threshold</label>
                  <span className="text-sm text-gray-600">{aiSettings.objectDetectionThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={aiSettings.objectDetectionThreshold}
                  onChange={(e) => setAiSettings({ 
                    ...aiSettings, 
                    objectDetectionThreshold: parseInt(e.target.value) 
                  })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum confidence level for object detection
                </p>
              </div>

              {/* Feature Toggles */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700">AI Features</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm text-gray-700">Emotion Analysis</label>
                    <p className="text-xs text-gray-500">Analyze emotional context in photos</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aiSettings.emotionAnalysisEnabled}
                      onChange={(e) => setAiSettings({ 
                        ...aiSettings, 
                        emotionAnalysisEnabled: e.target.checked 
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm text-gray-700">Auto Clustering</label>
                    <p className="text-xs text-gray-500">Automatically group similar images</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aiSettings.autoClusteringEnabled}
                      onChange={(e) => setAiSettings({ 
                        ...aiSettings, 
                        autoClusteringEnabled: e.target.checked 
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm text-gray-700">Metadata Extraction</label>
                    <p className="text-xs text-gray-500">Extract location, time, and other metadata</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aiSettings.metadataExtraction}
                      onChange={(e) => setAiSettings({ 
                        ...aiSettings, 
                        metadataExtraction: e.target.checked 
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="space-y-8">
          <div className="card p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Key className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">API Integrations</h2>
            </div>

            <div className="space-y-6">
              {/* Google Vision API */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-sm font-medium text-gray-900">Google Vision API</h3>
                    {renderConnectionStatus(connectionStatus.googleVision)}
                  </div>
                  <button
                    onClick={() => testConnection('googleVision')}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Test Connection
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showApiKeys.googleVision ? 'text' : 'password'}
                    value={integrations.googleVision}
                    onChange={(e) => setIntegrations({ 
                      ...integrations, 
                      googleVision: e.target.value 
                    })}
                    placeholder="Enter Google Vision API key"
                    className="w-full pr-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => toggleApiKeyVisibility('googleVision')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showApiKeys.googleVision ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Amazon Rekognition */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-sm font-medium text-gray-900">Amazon Rekognition</h3>
                    {renderConnectionStatus(connectionStatus.amazonRekognition)}
                  </div>
                  <button
                    onClick={() => testConnection('amazonRekognition')}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Test Connection
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showApiKeys.amazonRekognition ? 'text' : 'password'}
                    value={integrations.amazonRekognition}
                    onChange={(e) => setIntegrations({ 
                      ...integrations, 
                      amazonRekognition: e.target.value 
                    })}
                    placeholder="Enter AWS access key"
                    className="w-full pr-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => toggleApiKeyVisibility('amazonRekognition')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showApiKeys.amazonRekognition ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* OpenAI API */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-sm font-medium text-gray-900">OpenAI API</h3>
                    {renderConnectionStatus(connectionStatus.openaiApi)}
                  </div>
                  <button
                    onClick={() => testConnection('openaiApi')}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Test Connection
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showApiKeys.openaiApi ? 'text' : 'password'}
                    value={integrations.openaiApi}
                    onChange={(e) => setIntegrations({ 
                      ...integrations, 
                      openaiApi: e.target.value 
                    })}
                    placeholder="Enter OpenAI API key"
                    className="w-full pr-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => toggleApiKeyVisibility('openaiApi')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showApiKeys.openaiApi ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Custom Endpoint */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-sm font-medium text-gray-900">Custom Endpoint</h3>
                    {renderConnectionStatus(connectionStatus.customEndpoint)}
                  </div>
                  <button
                    onClick={() => testConnection('customEndpoint')}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Test Connection
                  </button>
                </div>
                <input
                  type="url"
                  value={integrations.customEndpoint}
                  onChange={(e) => setIntegrations({ 
                    ...integrations, 
                    customEndpoint: e.target.value 
                  })}
                  placeholder="https://your-custom-api.com/v1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 btn-primary"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  )
} 