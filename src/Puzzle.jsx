import React, { useEffect, useState, useMemo } from 'react'

export default function Puzzle({ imageUrl = '/src/assets/puzzle.png', onComplete }) {
  const SIZE = 4 // 4x4
  const TOTAL = SIZE * SIZE

  const solvedPositions = useMemo(() => Array.from({ length: TOTAL }, (_, i) => i), [TOTAL])

  // start with empty positions and scramble on mount to avoid triggering 'solved' immediately
  const [positions, setPositions] = useState([])
  const [selected, setSelected] = useState(null)
  const [progress, setProgress] = useState(0)
  const [solved, setSolved] = useState(false)
  const [completedOnce, setCompletedOnce] = useState(() => {
    try {
      return localStorage.getItem('puzzleCompleted') === 'true'
    } catch (e) {
      return false
    }
  })

  // Hint flow
  const [showHintPrompt, setShowHintPrompt] = useState(false)
  const [hintKeyInput, setHintKeyInput] = useState('')
  const [hintUnlocked, setHintUnlocked] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)

  useEffect(() => {
    scramble()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!positions || positions.length !== TOTAL) return
    const correct = positions.reduce((acc, p, i) => acc + (p === i ? 1 : 0), 0)
    setProgress(Math.round((correct / TOTAL) * 100))
    if (correct === TOTAL) {
      setSolved(true)
      // Do NOT auto-call onComplete — wait for user to click "Continue to Valentine's Vault"
    }
  }, [positions, TOTAL, onComplete])

  // When solved, persist that the puzzle has been completed at least once
  useEffect(() => {
    if (solved) {
      try {
        localStorage.setItem('puzzleCompleted', 'true')
      } catch (e) {
        // ignore
      }
      setCompletedOnce(true)
    }
  }, [solved])

  function shuffleArray(arr) {
    const a = arr.slice()
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  function scramble() {
    // try until not solved
    let s = shuffleArray(solvedPositions)
    while (s.every((v, i) => v === i)) {
      s = shuffleArray(solvedPositions)
    }
    setPositions(s)
    setSelected(null)
    setSolved(false)
    setProgress(0)
    setHintUnlocked(false)
    setShowFullImage(false)
  }

  function handleTileClick(index) {
    if (solved) return
    if (selected === null) {
      setSelected(index)
      return
    }
    if (selected === index) {
      setSelected(null)
      return
    }
    // swap
    const next = positions.slice()
    ;[next[selected], next[index]] = [next[index], next[selected]]
    setPositions(next)
    setSelected(null)
  }

  function requestHint() {
    setShowHintPrompt(true)
    setHintKeyInput('')
  }

  function submitHintKey(e) {
    e.preventDefault()
    const required = "I will never say chal hat again"
    if (hintKeyInput.trim() === required) {
      setHintUnlocked(true)
      setShowHintPrompt(false)
      setShowFullImage(true)
      setTimeout(() => setShowFullImage(false), 2000)
    } else {
      alert('Wrong phrase. No hint for you. Type exactly: "I will never say chal hat again"')
    }
  }

  return (
    <div className="puzzle-root">
      {!solved && (
        <>
          <h3 className="puzzle-header">RECONSTRUCTING DATA: Fix What You Broke.</h3>
          <p className="puzzle-subtext">Since you think these feelings were 'wasted,' you shouldn't mind putting the pieces back together.</p>
        </>
      )}

      {!solved && (
      <div className={`puzzle-board`} style={{ '--size': SIZE }}>
        {positions.map((pos, i) => {
          const row = Math.floor(pos / SIZE)
          const col = pos % SIZE
          const bgPosX = (100 / (SIZE - 1)) * col
          const bgPosY = (100 / (SIZE - 1)) * row
          return (
            <button
              aria-label={`tile-${i}`}
              key={i}
              className={`puzzle-tile ${selected === i ? 'selected' : ''} ${pos === i ? 'correct' : ''}`}
              onClick={() => handleTileClick(i)}
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: `${SIZE * 100}% ${SIZE * 100}%`,
                backgroundPosition: `${bgPosX}% ${bgPosY}%`
              }}
            />
          )
        })}
      </div>
      )}

      {!solved && (
      <div className="puzzle-controls">
        <button className="puzzle-btn" onClick={scramble}>Scramble</button>
        <button className="puzzle-btn" onClick={requestHint}>Hint</button>
        <div className="integrity">
          <div className="integrity-label">Structural Integrity</div>
          <div className="integrity-bar">
            <div className="integrity-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="integrity-percent">{progress}%</div>
        </div>
      </div>
      )}

      {/* Hint prompt modal */}
      {showHintPrompt && (
        <div className="hint-overlay" onClick={() => setShowHintPrompt(false)}>
          <div className="hint-modal" onClick={(e) => e.stopPropagation()}>
            <h4>Asking for help? Typical.</h4>
            <p>You must type <strong>"I will never say chal hat again"</strong> to unlock the hint.</p>
            <form onSubmit={submitHintKey} className="hint-form">
              <input value={hintKeyInput} onChange={(e) => setHintKeyInput(e.target.value)} placeholder='Type phrase exactly here' />
              <div className="hint-actions">
                <button type="submit" className="puzzle-btn">Unlock Hint</button>
                <button type="button" className="puzzle-btn ghost" onClick={() => setShowHintPrompt(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Full image overlay when hint unlocked or on solved */}
      {(showFullImage || solved) && (
        <div className={`full-image-overlay ${solved ? 'complete' : ''}`}>
          <img src={imageUrl} alt="full" />
          {solved && <div className="sync-badge">Sync Successful</div>}
          {solved && (
            <button className="vault-btn" onClick={() => onComplete ? onComplete() : null}>Continue to Valentine's Vault</button>
          )}
        </div>
      )}
      {/* Skip button: appears bottom-right after first completion, and on subsequent visits */}
      {(completedOnce || solved) && (
        <button
          className="skip-btn"
          onClick={() => onComplete ? onComplete() : null}
          style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 999, padding: '10px 14px', borderRadius: 8 }}
        >
          Skip
        </button>
      )}
    </div>
  )
}
