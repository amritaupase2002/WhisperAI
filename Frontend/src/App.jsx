import { useState } from 'react';
import './App.css';
import { FaUserAstronaut, FaRobot, FaPaperPlane, FaVolumeUp } from 'react-icons/fa';
import { RiSendPlaneFill } from 'react-icons/ri';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await axios.post('https://whisper-ai-two.vercel.app/getResponse', {
        question: question
      });
      setResponse(res.data.response);
    } catch (err) {
      console.error(err);
      setResponse("🚨 Error: Our AI cosmic network is experiencing interference. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  const speakHandler = () => {
    if (!response) return;
    setIsSpeaking(true);
    const msg = new SpeechSynthesisUtterance(response);
    msg.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(msg);
  }

  return (
    <div className='app'>
      <div className='stars'></div>
      <div className='twinkling'></div>
      
      <div className='chat-container'>
        {/* User Input Section */}
        <div className='message-box user-box'>
          <div className='profile-circle user-circle'>
            <FaUserAstronaut className='profile-icon' />
            <div className='pulse-ring'></div>
          </div>
          <div className='message-content'>
            <textarea 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Transmit your query to the cosmos..."
              disabled={isLoading}
              className='neon-input'
            />
            <button 
              onClick={submitHandler} 
              disabled={!question.trim() || isLoading}
              className={`send-btn ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? (
                <div className='loading-dots'>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                <>
                  <RiSendPlaneFill className='btn-icon' />
                  <span>Transmit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI Response Section */}
        <div className='message-box ai-box'>
          <div className='profile-circle ai-circle'>
            <FaRobot className='profile-icon' />
            <div className='glowing-core'></div>
          </div>
          <div className='message-content'>
            <textarea 
              value={response} 
              readOnly 
              placeholder="Awaiting cosmic response..."
              className='neon-output'
            />
            <button 
              onClick={speakHandler} 
              disabled={!response || isSpeaking}
              className={`speak-btn ${isSpeaking ? 'active' : ''}`}
            >
              <FaVolumeUp className='btn-icon' />
              <span>{isSpeaking ? 'Broadcasting...' : 'Vocalize'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;