import { useState } from 'react';
import './App.css';
import bearHugGif from './assets/bear-hug.gif';

export default function ValentinesVault() {
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showGifModal, setShowGifModal] = useState(false);
  const [redeemingCoupon, setRedeemingCoupon] = useState(null); // 'shopping', 'food', 'hugs'
  const [shoppingRedeemed, setShoppingRedeemed] = useState(false);
  const [foodRedeemed, setFoodRedeemed] = useState(false);
  const [hugsRedeemed, setHugsRedeemed] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [foodChecklist, setFoodChecklist] = useState({ pay: false, expensive: false, photo: false });
  const [cameraActive, setCameraActive] = useState(false);
  const [auraResult, setAuraResult] = useState(null);

  const triggerConfetti = () => {
    // Create confetti elements
    const confetti = document.querySelector('.confetti-container');
    if (!confetti) {
      const container = document.createElement('div');
      container.className = 'confetti-container';
      document.body.appendChild(container);

      for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.delay = Math.random() * 0.3 + 's';
        piece.style.animationDuration = Math.random() * 2 + 2.5 + 's';
        container.appendChild(piece);
      }

      setTimeout(() => {
        container.remove();
      }, 5000);
    }

    setShowFinalMessage(true);
  };

  // Shopping Spree Handler
  const handleShoppingRedeem = () => {
    setRedeemingCoupon('shopping');
    setTerminalOutput([]);
    const lines = [
      'Hacking Bank Account...',
      'Bypassing Spending Limits...',
      'Locating Miniso/Sephora...'
    ];
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setTerminalOutput(prev => [...prev, { text: lines[currentLine], status: 'OK' }]);
        currentLine++;
      } else {
        clearInterval(interval);
        setShoppingRedeemed(true);
        triggerThemeConfetti('shopping');
      }
    }, 800);
  };

  // Food Peace Handler
  const handleFoodRedeem = () => {
    setRedeemingCoupon('food');
    setFoodChecklist({ pay: false, expensive: false, photo: false });
  };

  const handleFoodCheckbox = (key) => {
    setFoodChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFoodConfirm = () => {
    if (foodChecklist.pay && foodChecklist.expensive && foodChecklist.photo) {
      setFoodRedeemed(true);
      triggerThemeConfetti('food');
    } else {
      alert('❌ You must agree to all terms!');
    }
  };

  // Hugs Aura Scan Handler
  const handleHugsRedeem = async () => {
    setRedeemingCoupon('hugs');
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.getElementById('aura-camera');
      if (videoElement) {
        videoElement.srcObject = stream;
      }
      
      setTimeout(() => {
        stream.getTracks().forEach(track => track.stop());
        setCameraActive(false);
        setAuraResult('Aura: Acceptable. Subscription Status: ACTIVE. Hugs are non-transferable and must be delivered in person immediately.');
        setHugsRedeemed(true);
        triggerThemeConfetti('hugs');
      }, 2000);
    } catch {
      alert('Camera access denied. Aura scan failed.');
      setCameraActive(false);
    }
  };

  // Themed Confetti
  const triggerThemeConfetti = (theme) => {
    const confetti = document.querySelector('.themed-confetti-container');
    if (!confetti) {
      const container = document.createElement('div');
      container.className = 'themed-confetti-container';
      document.body.appendChild(container);

      const emojis = {
        shopping: ['🛍️', '💳', '👜', '✨', '💄', '👗'],
        food: ['🌮', '🍕', '🍔', '🎉', '❤️', '🍽️'],
        hugs: ['🤗', '💞', '💕', '💖', '🫂', '✨']
      };

      const selectedEmojis = emojis[theme] || ['✨'];

      for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'themed-confetti';
        piece.textContent = selectedEmojis[Math.floor(Math.random() * selectedEmojis.length)];
        piece.style.left = Math.random() * 100 + '%';
        piece.style.delay = Math.random() * 0.3 + 's';
        piece.style.animationDuration = Math.random() * 2 + 2.5 + 's';
        piece.style.fontSize = Math.random() * 20 + 20 + 'px';
        container.appendChild(piece);
      }

      setTimeout(() => {
        container.remove();
      }, 5000);
    }
  };

  return (
    <div className="vault-container">
      {/* Header */}
      <div className="vault-header">
        <h1 className="vault-title">SYSTEM RESTORED: Version 2.0 Now Live</h1>
        <p className="vault-subtitle">User Devashya has been re-authenticated. Probation status: Active.</p>
      </div>

      {/* Apology Receipt */}
      <div className="vault-section receipt-section">
        <h2 className="vault-section-title">📋 Official Apology Receipt</h2>
        <div className="receipt">
          <div className="receipt-header">═══════════════════════════════</div>
          <div className="receipt-item">
            <span>100x "I am sorry" Manual Entries</span>
            <span>PAID ✓</span>
          </div>
          <div className="receipt-item">
            <span>Trust Reconstruction (Puzzle)</span>
            <span>COMPLETED ✓</span>
          </div>
          <div className="receipt-item">
            <span>Emotional Damage Fee</span>
            <span>DEDUCTED ✓</span>
          </div>
          <div className="receipt-divider">───────────────────────────────</div>
          <div className="receipt-total">
            <span className="total-label">TOTAL:</span>
            <span className="total-value">ONE SECOND CHANCE</span>
          </div>
          <div className="receipt-footer">═══════════════════════════════</div>
          <p className="receipt-note">
            Receipt non-refundable.<br />
            Terms and conditions apply.
          </p>
        </div>
      </div>

      {/* Service Level Agreement */}
      <div className="vault-section sla-section">
        <h2 className="vault-section-title">📋 Service Level Agreement (SLA)</h2>
        <div className="sla-box">
          <div className="sla-item">
            <span className="sla-icon">🔥</span>
            <div>
              <strong>No-Lying Firewall:</strong>
              <p>Any attempt to "make a fool" of the Admin results in an immediate system crash.</p>
            </div>
          </div>
          <div className="sla-item">
            <span className="sla-icon">📱</span>
            <div>
              <strong>Proximity Protocol:</strong>
              <p>When with friends, a "Thinking of You" ping must be sent every 120 minutes.</p>
            </div>
          </div>
          <div className="sla-item">
            <span className="sla-icon">🗣️</span>
            <div>
              <strong>Communication Update:</strong>
              <p>The phrase "chal hat" has been deleted from the source code. It has been replaced with: "I'm frustrated, but I value you."</p>
            </div>
          </div>
          <div className="sla-item">
            <span className="sla-icon">😴</span>
            <div>
              <strong>Priority Patch:</strong>
              <p>Night-time ignoring has been disabled. System must prioritize "Girlfriend Time" over "Work Threads."</p>
            </div>
          </div>
        </div>
      </div>

      {/* Redeemable Rewards */}
      <div className="vault-section rewards-section">
        <h2 className="vault-section-title">🎁 Redeemable Rewards</h2>
        <div className="rewards-grid">
          <div className="reward-coupon" style={{ opacity: shoppingRedeemed ? 0.6 : 1 }}>
            <div className="coupon-header">The "Shopping Spree"</div>
            <div className="coupon-body">
              <p>Valid at any store of the Admin's choosing.</p>
              <button className="coupon-btn" onClick={handleShoppingRedeem} disabled={shoppingRedeemed}>
                {shoppingRedeemed ? '✓ REDEEMED' : 'REDEEM'}
              </button>
            </div>
          </div>
          <div className="reward-coupon" style={{ opacity: foodRedeemed ? 0.6 : 1 }}>
            <div className="coupon-header">The "Food Peace Offering"</div>
            <div className="coupon-body">
              <p>Valid for one lunch where devashya pays and Admin picks the place.</p>
              <button className="coupon-btn" onClick={handleFoodRedeem} disabled={foodRedeemed}>
                {foodRedeemed ? '✓ REDEEMED' : 'REDEEM'}
              </button>
            </div>
          </div>
          <div className="reward-coupon" style={{ opacity: hugsRedeemed ? 0.6 : 1 }}>
            <div className="coupon-header">"Unlimited Hugs" Subscription</div>
            <div className="coupon-body">
              <p>Valid as long as devashya follows the new T&Cs.</p>
              <button className="coupon-btn" onClick={handleHugsRedeem} disabled={hugsRedeemed}>
                {hugsRedeemed ? '✓ REDEEMED' : 'REDEEM'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feelings Value Counter */}
      <div className="vault-section feelings-section">
        <div className="feelings-counter" style={{cursor: 'default'
        }} >
          <h2>Current Value of My Feelings for You:</h2>
          <div className="infinity-display">∞</div>
          <p className="infinity-note">
            Contrary to previous user input, these feelings were never wasted—just temporarily locked for maintenance.
          </p>
        </div>
      </div>

      {/* Close Vault Button */}
      <div className="vault-footer">
        <button className="close-vault-btn" onClick={triggerConfetti}>
          CLOSE VAULT & GO HUG HER
        </button>
      </div>

      {/* Final Message Modal */}
      {showFinalMessage && (
        <div className="final-message-overlay" onClick={() => setShowFinalMessage(false)}>
          <div className="final-message-box" onClick={(e) => e.stopPropagation()}>
            <div className="final-message-content">
              <span className="message-emoji">💖</span>
              <p>Now put your phone down, come find me, and tell me you're sorry in person. I'm waiting.</p>
              <button className="message-close-btn" onClick={() => setShowGifModal(true)}>
                ✓ Let's Go
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Spree Modal */}
      {redeemingCoupon === 'shopping' && (
        <div className="modal-overlay" onClick={() => !shoppingRedeemed && setRedeemingCoupon(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            {!shoppingRedeemed ? (
              <div className="terminal">
                <div className="terminal-header">Terminal - Bank Hack v2.0</div>
                <div className="terminal-output">
                  {terminalOutput.map((line, idx) => (
                    <div key={idx} className="terminal-line">
                      {line.text} <span className="status-ok">[{line.status}]</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="voucher">
                <div className="voucher-header">Digital Shopping Voucher</div>
                <div className="voucher-content">
                  <p>Transaction ID: <strong>BROKE-BOY-2026</strong></p>
                  <p>Status: <strong>✓ APPROVED</strong></p>
                  <p>Amount: <strong>UNLIMITED</strong></p>
                  <p className="voucher-note">Valid for shopping at any store (RIP wallet)</p>
                </div>
                <div className="modal-button-group">
                  <button className="send-confirmation-coupon-btn" onClick={() => {
                    const phoneNumber = '917874164018';
                    const message = '🛍️ Shopping Spree - Transaction ID: BROKE-BOY-2026\n→ I am ready to go shopping with you at any store!\n\nI have officially redeemed my second chance. I am ready to be a better boyfriend. Please come collect your shopping spree! 💖';
                    const encodedMessage = encodeURIComponent(message);
                    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
                  }}>📱 Send to WhatsApp</button>
                  <button className="modal-close-btn" onClick={() => setRedeemingCoupon(null)}>✓ Done</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Food Peace Modal */}
      {redeemingCoupon === 'food' && (
        <div className="modal-overlay" onClick={() => !foodRedeemed && setRedeemingCoupon(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            {!foodRedeemed ? (
              <div className="food-agreement">
                <h3 className="food-title">Executive Decision Menu</h3>
                <p className="food-subtitle">Terms & Conditions:</p>
                <div className="checklist">
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      checked={foodChecklist.pay}
                      onChange={() => handleFoodCheckbox('pay')}
                    />
                    <span>I will not act clueless</span>
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      checked={foodChecklist.expensive}
                      onChange={() => handleFoodCheckbox('expensive')}
                    />
                    <span>I will supportingly order whatever she thinks in her mind as she will not say it out loud.</span>
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      checked={foodChecklist.photo}
                      onChange={() => handleFoodCheckbox('photo')}
                    />
                    <span>I will take a cute photo of her with the food</span>
                  </label>
                </div>
                <button className="modal-confirm-btn" onClick={handleFoodConfirm}>
                  Confirm & Reserve
                </button>
              </div>
            ) : (
              <div className="reservation-stamp">
                <div className="stamp">RESERVATION CONFIRMED</div>
                <p>Your lunch is all set! 🍽️</p>
                <div className="modal-button-group">
                  <button className="send-confirmation-coupon-btn" onClick={() => {
                    const phoneNumber = '917874164018';
                    const message = '🍽️ Food Peace Offering - Reservation Confirmed\n→ I will come pick you up, and take cute photos!\n\nI have officially redeemed my second chance. I am ready to be a better boyfriend. Please come collect your lunch! 💖';
                    const encodedMessage = encodeURIComponent(message);
                    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
                  }}>📱 Send to WhatsApp</button>
                  <button className="modal-close-btn" onClick={() => setRedeemingCoupon(null)}>✓ Done</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hugs Aura Scan Modal */}
      {redeemingCoupon === 'hugs' && (
        <div className="modal-overlay" onClick={() => !hugsRedeemed && setRedeemingCoupon(null)}>
          <div className="modal-box aura-scan-box" onClick={(e) => e.stopPropagation()}>
            {!hugsRedeemed ? (
              <div className="aura-scan">
                <h3>Aura Scan in Progress...</h3>
                {cameraActive && (
                  <video id="aura-camera" autoPlay style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}></video>
                )}
                {!cameraActive && auraResult && (
                  <div className="aura-result">
                    <p className="aura-text">{auraResult}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="aura-result-final">
                <div className="aura-badge">✓ APPROVED</div>
                <p className="aura-text">{auraResult}</p>
                <div className="modal-button-group">
                  <button className="send-confirmation-coupon-btn" onClick={() => {
                    const phoneNumber = '917874164018';
                    const message = '🤗 Unlimited Hugs Subscription - Aura: Acceptable\n→ Hugs are active and ready to be delivered in person!\n\nI have officially redeemed my second chance. I am ready to be a better boyfriend. Please come collect your hugs! 💖';
                    const encodedMessage = encodeURIComponent(message);
                    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
                  }}>📱 Send to WhatsApp</button>
                  <button className="modal-close-btn" onClick={() => setRedeemingCoupon(null)}>✓ Done</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      

      {/* GIF Modal */}
      {showGifModal && (
        <div className="gif-modal-overlay" onClick={() => setShowGifModal(false)}>
          <div className="gif-modal-box" onClick={(e) => e.stopPropagation()}>
            <img 
              src={bearHugGif}
              alt="bear hug" 
              className="gif-display"
            />
            <button className="gif-close-btn" onClick={() => setShowGifModal(false)}>
               YAYYY
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
