'use client'

import { useState } from 'react'

type FormData = {
  name: string
  age: string
  gender: string
  height: string
  weight: string
  goal: string
  level: string
}

type WorkoutItem = {
  exercise: string
  duration: string
  sets: string
  reps: string
}

type NutritionItem = {
  meal: string
  food: string
  calories: string
  protein: string
}

type Plan = {
  workout: WorkoutItem[]
  nutrition: NutritionItem[]
  motivation?: string
}

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    goal: '',
    level: ''
  })
  const [lastPlan, setLastPlan] = useState<Plan | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'workout' | 'nutrition'>('workout')
  const [statusMessage, setStatusMessage] = useState('')
  const [motivation, setMotivation] = useState('')
  const [isReading, setIsReading] = useState(false)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [motivationalImage, setMotivationalImage] = useState<string | null>(null)

  const generatePlan = async () => {
    // Validation
    if (!formData.name || !formData.age || !formData.gender || !formData.height || !formData.weight || !formData.goal || !formData.level) {
      setStatusMessage('⚠️ Please fill in all fields before generating a plan.')
      return
    }

    setIsLoading(true)
    setStatusMessage('🤖 AI is analyzing your profile and creating a personalized plan...')
    
    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to generate plan')
      }

      const plan = await response.json()
      
      setLastPlan(plan)
      setIsLoading(false)
      setStatusMessage('✅ Your personalized plan is ready!')
      setMotivation(plan.motivation || '💪 "The only bad workout is the one that didn\'t happen!" - Keep pushing!')
    } catch (error) {
      console.error('Error:', error)
      setIsLoading(false)
      setStatusMessage('❌ Failed to generate plan. Please try again.')
    }
  }

  const readPlan = () => {
    if (!lastPlan) return;
    
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const textToRead = `
      Your personalized fitness plan for ${formData.name}.
      
      Workout Plan:
      ${lastPlan.workout && lastPlan.workout.length > 0 ? lastPlan.workout.map((w, i) => 
        `Exercise ${i + 1}: ${w.exercise}. ${w.sets !== '-' ? `${w.sets} sets` : ''} ${w.reps !== '-' ? `of ${w.reps} reps` : ''} ${w.duration !== '-' ? `for ${w.duration}` : ''}`
      ).join('. ') : 'No workout data'}
      
      Nutrition Plan:
      ${lastPlan.nutrition && lastPlan.nutrition.length > 0 ? lastPlan.nutrition.map((n, i) => 
        `Meal ${i + 1}: ${n.meal}. ${n.food}. ${n.calories} calories, ${n.protein} protein`
      ).join('. ') : 'No nutrition data'}
      
      Motivation: ${lastPlan.motivation || 'Stay strong and keep pushing!'}
    `;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);
    
    window.speechSynthesis.speak(utterance);
    setIsReading(true);
  };

  const generateMotivationalImage = async () => {
    if (!lastPlan) return;
    
    setIsGeneratingImage(true);
    try {
      const imagePrompt = `Create a motivational fitness image for someone with goal: ${formData.goal}. Show an inspiring workout scene with vibrant colors and energy.`;
      
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: imagePrompt }),
      });

      const data = await response.json();
      
      if (data.image) {
        setMotivationalImage(data.image);
      } else {
        alert('Failed to generate image. Please try again.');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className={`min-h-full ${isDark ? 'dark' : ''}`}>
      <div className="min-h-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 transition-colors duration-500">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <header className="text-center mb-12 fade-in-up">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1"></div>
              <div className="flex-1 flex justify-center">
                <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <span className="text-5xl">💪</span>
                </div>
              </div>
              <div className="flex-1 flex justify-end">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  aria-label="Toggle theme"
                >
                  <span className="text-2xl">{isDark ? '☀️' : '🌙'}</span>
                </button>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
              AI Fitness Coach
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Your Personal AI-Powered Fitness & Nutrition Guide
            </p>
          </header>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Input Form */}
            <div className="space-y-6 fade-in-left">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100 dark:border-purple-900/50">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                  <span className="text-3xl">📋</span>
                  Your Profile
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors duration-300"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Age
                      </label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors duration-300"
                        placeholder="25"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Gender
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors duration-300"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        value={formData.height}
                        onChange={(e) => setFormData({...formData, height: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors duration-300"
                        placeholder="170"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors duration-300"
                        placeholder="70"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Fitness Goal
                    </label>
                    <select
                      value={formData.goal}
                      onChange={(e) => setFormData({...formData, goal: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Select your goal</option>
                      <option value="weight loss">Weight Loss</option>
                      <option value="muscle gain">Muscle Gain</option>
                      <option value="general fitness">General Fitness</option>
                      <option value="endurance">Endurance</option>
                      <option value="flexibility">Flexibility</option>
                      <option value="strength">Strength</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Fitness Level
                    </label>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({...formData, level: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Select your level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <button
                    onClick={generatePlan}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <span className="text-xl">✨</span>
                        Generate My Plan
                      </>
                    )}
                  </button>

                  {statusMessage && (
                    <div className={`p-4 rounded-xl text-center font-semibold ${
                      statusMessage.includes('✅') ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                      statusMessage.includes('⚠️') ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                      statusMessage.includes('❌') ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                      'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                    }`}>
                      {statusMessage}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6 fade-in-right">
              {lastPlan ? (
                <>
                  {/* Motivation Card */}
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">🎯</span>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3">Your Motivation</h3>
                        <p className="text-lg leading-relaxed opacity-95">
                          {motivation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={readPlan}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span className="text-xl">{isReading ? '⏸️' : '🔊'}</span>
                      {isReading ? 'Stop Reading' : 'Read My Plan'}
                    </button>
                    <button
                      onClick={generateMotivationalImage}
                      disabled={isGeneratingImage}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="text-xl">🎨</span>
                      {isGeneratingImage ? 'Generating...' : 'Get Motivation Image'}
                    </button>
                  </div>

                  {/* Motivational Image */}
                  {motivationalImage && (
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 overflow-hidden">
                      <img 
                        src={motivationalImage} 
                        alt="Motivational fitness" 
                        className="w-full h-64 object-cover rounded-xl"
                      />
                    </div>
                  )}

                  {/* Plan Tabs */}
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-purple-100 dark:border-purple-900/50">
                    <div className="flex border-b border-purple-100 dark:border-purple-900/50">
                      <button
                        onClick={() => setActiveTab('workout')}
                        className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                          activeTab === 'workout'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                        }`}
                      >
                        <span className="text-xl mr-2">🏋️</span>
                        Workout Plan
                      </button>
                      <button
                        onClick={() => setActiveTab('nutrition')}
                        className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                          activeTab === 'nutrition'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                        }`}
                      >
                        <span className="text-xl mr-2">🥗</span>
                        Nutrition Plan
                      </button>
                    </div>

                    <div className="p-6">
                      {activeTab === 'workout' && (
                        <div className="space-y-4">
                          {lastPlan.workout && lastPlan.workout.length > 0 ? (
                            lastPlan.workout.map((item, index) => (
                              <div
                                key={index}
                                className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 hover:shadow-md transition-shadow duration-300"
                              >
                                <h4 className="font-bold text-lg text-purple-900 dark:text-purple-300 mb-2">
                                  {item.exercise}
                                </h4>
                                <div className="grid grid-cols-3 gap-2 text-sm">
                                  <div className="text-gray-700 dark:text-gray-300">
                                    <span className="font-semibold">Duration:</span> {item.duration}
                                  </div>
                                  <div className="text-gray-700 dark:text-gray-300">
                                    <span className="font-semibold">Sets:</span> {item.sets}
                                  </div>
                                  <div className="text-gray-700 dark:text-gray-300">
                                    <span className="font-semibold">Reps:</span> {item.reps}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                              No workout data available
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === 'nutrition' && (
                        <div className="space-y-4">
                          {lastPlan.nutrition && lastPlan.nutrition.length > 0 ? (
                            lastPlan.nutrition.map((item, index) => (
                              <div
                                key={index}
                                className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 hover:shadow-md transition-shadow duration-300"
                              >
                                <h4 className="font-bold text-lg text-green-900 dark:text-green-300 mb-2">
                                  {item.meal}
                                </h4>
                                <p className="text-gray-700 dark:text-gray-300 mb-2">{item.food}</p>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div className="text-gray-700 dark:text-gray-300">
                                    <span className="font-semibold">Calories:</span> {item.calories}
                                  </div>
                                  <div className="text-gray-700 dark:text-gray-300">
                                    <span className="font-semibold">Protein:</span> {item.protein}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                              No nutrition data available
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-purple-100 dark:border-purple-900/50">
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                    Ready to Transform?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Fill in your details and let AI create your personalized fitness journey!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center text-gray-600 dark:text-gray-400">
            <p className="text-sm">
              Powered by AI • Your journey to a healthier you starts here 💪
            </p>
          </footer>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        .fade-in-left {
          animation: fadeInLeft 0.6s ease-out;
        }

        .fade-in-right {
          animation: fadeInRight 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}

