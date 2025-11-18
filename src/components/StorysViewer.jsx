import React, { useState, useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight, Pause, Play, MoreVertical } from 'lucide-react'

const StoriesViewer = ({ stories, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef(null)
  const STORY_DURATION = 5000 // 5 seconds

  useEffect(() => {
    if (!isPaused) {
      const interval = 50
      const increment = (interval / STORY_DURATION) * 100

      timerRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNext()
            return 0
          }
          return prev + increment
        })
      }, interval)

      return () => clearInterval(timerRef.current)
    } else {
      clearInterval(timerRef.current)
    }
  }, [currentIndex, isPaused])

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setProgress(0)
    } else {
      onClose()
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setProgress(0)
    }
  }

  const handleClose = () => {
    clearInterval(timerRef.current)
    onClose()
  }

  const currentStory = stories[currentIndex]

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Progress Bars */}
      <div className="absolute top-0 left-0 right-0 flex gap-1 p-2 z-10">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100"
              style={{
                width: index < currentIndex ? '100%' : index === currentIndex ? `${progress}%` : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-4 left-0 right-0 px-4 pt-8 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl">
            {currentStory.user.avatar}
          </div>
          <div>
            <p className="font-bold text-white text-sm">{currentStory.user.username}</p>
            <p className="text-xs text-gray-300">2h atrás</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 text-white hover:bg-white/10 rounded-full transition-all"
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
          </button>
          <button className="p-2 text-white hover:bg-white/10 rounded-full transition-all">
            <MoreVertical size={20} />
          </button>
          <button
            onClick={handleClose}
            className="p-2 text-white hover:bg-white/10 rounded-full transition-all"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Story Content */}
      <div className="relative w-full max-w-md h-full max-h-[800px] bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center">
        <div className="text-center p-8 text-white">
          <div className="text-8xl mb-4">{currentStory.user.avatar}</div>
          <h2 className="text-3xl font-bold mb-2">Story de {currentStory.user.username}</h2>
          <p className="text-xl opacity-90">
            Este é um story de exemplo! Em produção, aqui apareceria a imagem ou vídeo do story.
          </p>
        </div>

        {/* Navigation Areas */}
        <div className="absolute inset-0 flex">
          <button
            onClick={handlePrev}
            className="flex-1 cursor-pointer"
            disabled={currentIndex === 0}
          />
          <button
            onClick={handleNext}
            className="flex-1 cursor-pointer"
          />
        </div>

        {/* Navigation Buttons (visible on hover) */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all opacity-0 hover:opacity-100"
          >
            <ChevronLeft size={32} className="text-white" />
          </button>
        )}
        {currentIndex < stories.length - 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all opacity-0 hover:opacity-100"
          >
            <ChevronRight size={32} className="text-white" />
          </button>
        )}
      </div>

      {/* Response Bar (optional) */}
      <div className="absolute bottom-4 left-0 right-0 px-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Enviar mensagem..."
          className="w-full bg-white/20 backdrop-blur-xl text-white placeholder-white/70 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
      </div>
    </div>
  )
}

export default StoriesViewer
