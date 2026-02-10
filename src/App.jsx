
import './App.css'
import { useState, useEffect } from 'react'
import RehabilitationModule from './RehabilitationModule'

function App() {
  const [state, setState] = useState('error') // 'error', 'penance', 'valentine'
  const [apologyCount, setApologyCount] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [caughtPhoto, setCaughtPhoto] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const [requiredApologies, setRequiredApologies] = useState(() => {
    try {
      return localStorage.getItem('apologyCompleted') === 'true' ? 1 : 100
    } catch (e) {
      return 100
    }
  })
  const [inVault, setInVault] = useState(false)

  // helper to set favicon using an emoji rendered as SVG data URI
  const setFaviconEmoji = (emoji) => {
    try {
      const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><text x='50%' y='50%' dominant-baseline='central' text-anchor='middle' font-size='48'>${emoji}</text></svg>`
      const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
      let link = document.querySelector("link[rel~='icon']")
      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.getElementsByTagName('head')[0].appendChild(link)
      }
      link.href = url
    } catch (e) {
      // ignore
    }
  }

  const handleApologyInput = (e) => {
    const text = e.target.value
    setInputValue(text)
    const count = text.split('I am sorry').length - 1
    setApologyCount(Math.min(count, requiredApologies))
  }

  // When user reaches the full 100 the first time, persist that future visits only require 1
  useEffect(() => {
    if (apologyCount >= requiredApologies) {
      if (requiredApologies === 100) {
        try {
          localStorage.setItem('apologyCompleted', 'true')
        } catch (e) {
          // ignore
        }
        setRequiredApologies(1)
        setApologyCount(prev => Math.min(prev, 1))
      }
    }
  }, [apologyCount, requiredApologies])

  // manage document title + favicon when app state or vault entry changes
  useEffect(() => {
    if (inVault) {
      // inVault state handled by onEnterVault; avoid overwriting title/favicon
      return
    }
    // Default title
    document.title = 'ERROR 404: RELATIONSHIP_NOT_FOUND'
    // Show broken heart favicon during Penance and Puzzle phases (when not yet in vault)
    if (state === 'penance' || (state === 'valentine' && !inVault)) {
      setFaviconEmoji('💔')
    }
    // When in the Vault, title and favicon change are handled when entering vault via onEnterVault
  }, [state, inVault])

  const handlePaste = async (e) => {
    e.preventDefault()
    
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      const video = document.createElement('video')
      video.srcObject = stream
      video.play()
      
      // Wait a moment for video to load
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Capture photo
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0)
      
      // Stop the stream
      stream.getTracks().forEach(track => track.stop())
      
      // Store the photo and show alert
      const photoUrl = canvas.toDataURL('image/jpeg')
      setCaughtPhoto(photoUrl)
      setShowAlert(true)
      
      // Clear the text box
      setInputValue('')
    } catch (error) {
      // If camera access is denied or not available, show basic alert
      alert("📸 CAUGHT IN 4K! The Admin is watching. Type it manually or the 'Restoration' fails.")
      setInputValue('')
    }
  }

  const closeAlert = () => {
    setShowAlert(false)
    setCaughtPhoto(null)
  }

  const getProgressLabel = () => {
    if (apologyCount === 0) return "Start typing..."
    if (apologyCount < 10) return "I'm listening..."
    if (apologyCount < 40) return "I'm listening..."
    if (apologyCount < 70) return "Louder for the people in the back."
    if (apologyCount < 90) return "My ego is starting to recover."
    if (apologyCount < requiredApologies) return "One more and I might smile."
    return "Welcome back, you're forgiven... for now."
  }

  const progressPercent = (apologyCount / Math.max(1, requiredApologies)) * 100

  return (
    <>
      {state === 'error' && (
        <div className="error-container">
          <div className="glitch" data-text="404: GIRLFRIEND NOT FOUND">
            404: GIRLFRIEND NOT FOUND
          </div>
          <p className="error-code">Error code: ATTITUDE_ADJUSTMENT_REQUIRED.</p>
          <button
            className="btn-restore"
            onClick={() => setState('penance')}
          >
            Initiate Restoration Protocol
          </button>
        </div>
      )}

      {state === 'penance' && (
        <div className="penance-container">
          <h1>🚨 The Penance Protocol 🚨</h1>
          <p className="instruction">Type "I am sorry" {requiredApologies === 1 ? 'once' : `${requiredApologies} times`} to earn your forgiveness.</p>

          <div className="progress-section">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="progress-label">{getProgressLabel()}</p>
            <p className="progress-count">
              {apologyCount}/{requiredApologies}
            </p>
          </div>

          <textarea
            className="apology-input"
            value={inputValue}
            onChange={handleApologyInput}
            onPaste={handlePaste}
            placeholder="Start typing 'I am sorry'..."
            spellCheck="false"
          />

          <button
            className={`btn-proceed ${apologyCount === requiredApologies ? 'show' : ''}`}
            onClick={() => setState('valentine')}
            disabled={apologyCount < requiredApologies}
          >
            ✨ Proceed to Valentine's Dashboard ✨
          </button>
        </div>
      )}

      {state === 'valentine' && (
        <RehabilitationModule
          onRestart={() => {
            setState('error')
            setApologyCount(0)
            setInputValue('')
          }}
          onEnterVault={() => {
            try {
              setInVault(true)
              document.title = 'ACCESS GRANTED - My Favorite Girl ❤️'
              setFaviconEmoji('💖')
            } catch (e) { /* ignore */ }
          }}
        />
      )}

      {/* Security Alert Modal */}
      {showAlert && (
        <div className="security-alert-overlay" onClick={closeAlert}>
          <div className="security-alert-modal" onClick={(e) => e.stopPropagation()}>
            <button className="alert-close-btn" onClick={closeAlert}>✕</button>
            
            {caughtPhoto && (
              <div className="caught-photo-container">
                <img src={caughtPhoto} alt="Caught in 4K" className="caught-photo" />
                <div className="caught-overlay">
                  <div className="caught-text">CAUGHT IN 4K 📸</div>
                  <div className="caught-subtext">
                    Trying to shortcut your way out of an apology?<br />
                    Look at this cheater.
                  </div>
                </div>
              </div>
            )}
            
            <div className="alert-content">
              <h2>🚨 SECURITY ALERT 🚨</h2>
              <p className="alert-message">
                Paste detected! The Admin is watching. <br />
                <strong>Type it manually or the 'Restoration' fails.</strong>
              </p>
              <button className="alert-dismiss-btn" onClick={closeAlert}>
                I'll type it manually ✍️
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
