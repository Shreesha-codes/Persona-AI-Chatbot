import { useState, useRef, useEffect } from 'react';
import { Send, User, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { personas } from './personas';

function App() {
  const [activePersonaId, setActivePersonaId] = useState(personas[0].id);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const messagesEndRef = useRef(null);
  
  const activePersona = personas.find(p => p.id === activePersonaId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handlePersonaChange = (id) => {
    if (isLoading) return;
    setActivePersonaId(id);
    setMessages([]);
    setError('');
  };

  const handleSuggestionClick = (suggestion) => {
    if (isLoading) return;
    setInputValue(suggestion);
  };

  const callGeminiAPI = async (chatHistory) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
    }

    const formattedHistory = chatHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: activePersona.systemPrompt }]
        },
        contents: formattedHistory,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("API Error:", errorData);
      throw new Error(errorData?.error?.message || "Failed to get response from the AI");
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No response received from the AI.");
    }
    
    return data.candidates[0].content.parts[0].text;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { role: 'user', content: inputValue.trim() };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);
    setError('');

    try {
      const aiResponseText = await callGeminiAPI(newMessages);
      setMessages([...newMessages, { role: 'ai', content: aiResponseText }]);
    } catch (err) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar / Persona Switcher */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Scaler Personas</h1>
        </div>
        
        <div className="persona-list">
          {personas.map(persona => (
            <button
              key={persona.id}
              className={`persona-button ${activePersonaId === persona.id ? 'active' : ''}`}
              onClick={() => handlePersonaChange(persona.id)}
              disabled={isLoading}
            >
              <span className="persona-avatar" style={{ width: '32px', height: '32px', fontSize: '0.9rem' }}>
                {persona.avatar}
              </span>
              {persona.name}
              {activePersonaId === persona.id && <ChevronRight size={16} style={{ marginLeft: 'auto' }} />}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-area">
        <div className="chat-header">
          <div className="persona-avatar">
            {activePersona.avatar}
          </div>
          <div className="persona-info">
            <h2>{activePersona.name}</h2>
            <p>{activePersona.role}</p>
          </div>
        </div>

        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="empty-state" style={{ margin: 'auto', textAlign: 'center', maxWidth: '600px', padding: '2rem' }}>
              <div className="persona-avatar" style={{ width: '80px', height: '80px', margin: '0 auto 1rem', fontSize: '2rem' }}>
                {activePersona.avatar}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Chat with {activePersona.name}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{activePersona.description}</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="message-content">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="message ai">
              <div className="typing-indicator">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {error && (
          <div style={{ padding: '0 1.5rem' }}>
            <div className="error-message">{error}</div>
          </div>
        )}

        {messages.length === 0 && (
          <div className="suggestions">
            {activePersona.suggestions.map((suggestion, idx) => (
              <button 
                key={idx} 
                className="suggestion-chip"
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={isLoading}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <div className="input-area">
          <form className="input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="input-field"
              placeholder={`Message ${activePersona.name}...`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="send-button"
              disabled={!inputValue.trim() || isLoading}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
