import { useState, useEffect } from 'react'
import Puzzle from './Puzzle'
import ValentinesVault from './ValentinesVault'
import puzzleImage from './assets/puzzle.png'

export default function RehabilitationModule({ onRestart, onEnterVault }) {
  const [accepted, setAccepted] = useState(false)
  const [puzzleCompleted, setPuzzleCompleted] = useState(false)
  const [checkedItems, setCheckedItems] = useState({
    truth: false,
    public: false,
    revaluation: false,
    respect: false
  })

  const handleCheckboxChange = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const allChecked = checkedItems.truth && checkedItems.public && checkedItems.revaluation && checkedItems.respect

  const handleAccept = () => {
    if (allChecked) {
      setAccepted(true)
    } else {
      alert("❌ You must check all boxes to proceed! No shortcuts allowed.")
    }
  }

  useEffect(() => {
    if (puzzleCompleted && typeof onEnterVault === 'function') {
      try { onEnterVault() } catch (e) { /* ignore */ }
    }
  }, [puzzleCompleted, onEnterVault])

  return (
    <div className="valentine-container">
      <div className="floating-hearts">
        {[...Array(15)].map((_, i) => (
          <span key={i} className="heart">❤️</span>
        ))}
      </div>


      {!accepted ? (
        <>
        
      <h1 className="valentine-title">
        REHABILITATION & RESTORATION MODULE 💻
      </h1>
        <div className="terms-section">
          <div className="terms-box">
            <h2>Legal Contract (Data Integrity Protocol)</h2>
            <div className="terms-list">
              <div className="term-item">
                <strong>Section 1: Data Integrity (No More Lying)</strong>
                <p>The User (Boyfriend) agrees to a "Zero Encryption" policy. Any attempt to "make a fool" of the Admin (Girlfriend) through deceptive data (lying) will result in a permanent account suspension.</p>
                <p>Transparency is the default setting. Hiding files/information is considered a breach of contract.</p>
              </div>
              <div className="term-item">
                <strong>Section 2: Server Availability (No More Ignoring)</strong>
                <p>The "Friend Mode" plugin must not disable the "Girlfriend Connection." Being with friends does not put the Admin in "Airplane Mode."</p>
                <p>Work-life balance must be recalibrated. If "Work" occupies 100% of the daytime CPU and "Ignoring" occupies 100% of the nighttime, the system will overheat and shut down.</p>
              </div>
              <div className="term-item">
                <strong>Section 3: Language & Protocol (Harsh Words)</strong>
                <p>The User is strictly prohibited from using the phrase "chal hat" or suggesting feelings were "wasted."</p>
                <p>The "Garbage In, Garbage Out" Rule: If the User inputs "harsh words" during an argument, the system will automatically block all "affection" outputs for a duration to be determined by the Admin.</p>
              </div>
            </div>
          </div>

          <div className="service-fee-box">
            <h2>Mandatory Maintenance Tasks (Re-Authentication Required)</h2>
            <div className="service-list">
              <div className="service-item">
                <input 
                  type="checkbox" 
                  id="truth"
                  checked={checkedItems.truth}
                  onChange={() => handleCheckboxChange('truth')}
                />
                <label htmlFor="truth">
                  <strong>The Truth Audit:</strong> Sit down and disclose one thing you've been hiding (no matter how small) to rebuild the "Trust Protocol"
                </label>
              </div>
              <div className="service-item">
                <input 
                  type="checkbox" 
                  id="public"
                  checked={checkedItems.public}
                  onChange={() => handleCheckboxChange('public')}
                />
                <label htmlFor="public">
                  <strong>The Public Patch:</strong> Next time with friends, proactively check in or include her in a way that proves she isn't "ignored" when others are around
                </label>
              </div>
              <div className="service-item">
                <input 
                  type="checkbox" 
                  id="revaluation"
                  checked={checkedItems.revaluation}
                  onChange={() => handleCheckboxChange('revaluation')}
                />
                <label htmlFor="revaluation">
                  <strong>The Revaluation Project:</strong> Write down (manually, no AI!) 10 reasons why those "wasted feelings" are actually an investment worth keeping
                </label>
              </div>
              <div className="service-item">
                <input 
                  type="checkbox" 
                  id="respect"
                  checked={checkedItems.respect}
                  onChange={() => handleCheckboxChange('respect')}
                />
                <label htmlFor="respect">
                  <strong>The "Respect" Update:</strong> Every urge to say "chal hat" = STOP, breathe, and use your "adult words" to express frustration respectfully
                </label>
              </div>
            </div>
          </div>

          <button
            className={`btn-accept ${allChecked ? 'enabled' : 'disabled'}`}
            onClick={handleAccept}
            disabled={!allChecked}
          >
            I acknowledge I have been a glitchy partner and I agree to these upgrades ⚙️
          </button>
        </div>
        </>
      ) : puzzleCompleted ? (
        <div className="vault-section-container">
          <ValentinesVault onRestart={onRestart} />
        </div>
      ) : (
        <div className="success-message">
          <Puzzle
            imageUrl={puzzleImage}
            onComplete={() => setPuzzleCompleted(true)}
          />
        </div>
      )}
    </div>
  )
}
