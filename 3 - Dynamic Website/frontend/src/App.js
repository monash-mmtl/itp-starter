import React, { useState, useEffect } from 'react';
import TipTapEditor from './TipTapEditor';
import ReactMarkdown from 'react-markdown';
import { marked } from 'marked';
import './App.css';

function htmlToText(html) {
  // Remove tiptap's <p> wrappers for empty content
  return html.replace(/<p><br\/?><\/p>/g, '').replace(/<p>(.*?)<\/p>/g, '$1\n').trim();
}

function App() {
  const [showInfo, setShowInfo] = useState(false);
  const [insights, setInsights] = useState('<p>Write your insights here</p>');
  const [context, setContext] = useState('<p>Copy in any articles here</p>');
  const [style, setStyle] = useState('<p>Paste a writing style here</p>');
  const [article, setArticle] = useState('Article will be generated here');
  const [articleMarkdown, setArticleMarkdown] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [synthwave, setSynthwave] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          insights: htmlToText(insights),
          context: htmlToText(context),
          style: htmlToText(style),
        }),
      });
      const data = await response.json();
      if (response.ok && data.article) {
        setArticle(marked.parse(data.article));
        setArticleMarkdown(data.article);
      } else {
        setArticle('<p>Failed to generate article</p>');
        setArticleMarkdown('');
      }
    } catch (e) {
      setArticle('<p>Failed to generate article</p>');
      setArticleMarkdown('');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyArticle = () => {
    // Prefer Markdown if available, otherwise copy the HTML content
    const textToCopy = articleMarkdown || (typeof article === 'string' ? article : '');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="app-outer-container">
      <div className={`top-header header-bar${synthwave ? ' synthwave' : ''}`} style={{ position: 'relative' }}>
        <span className="lighthouse-icon" onClick={() => setSynthwave((s) => !s)} style={{ cursor: 'pointer' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="8" width="4" height="10" rx="2" fill="#fbbf24"/>
            <rect x="9" y="18" width="6" height="2" rx="1" fill="#64748b"/>
            <polygon points="12,2 15,8 9,8" fill="#f87171"/>
            <rect x="11" y="6" width="2" height="2" rx="1" fill="#fbbf24"/>
          </svg>
        </span>
        <span className="alexandria-title">Alexandria</span>
        <span className="header-spacer" />
        <button
          className="theme-toggle-btn"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          onClick={() => setDarkMode((d) => !d)}
          style={{ marginRight: '0.5rem', background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', boxShadow: 'none' }}
        >
          {darkMode ? (
            // Sun icon
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="5" fill="#fbbf24" />
              <g stroke="#fbbf24" strokeWidth="2">
                <line x1="12" y1="2" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="2" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="22" y2="12" />
                <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
              </g>
            </svg>
          ) : (
            // Moon icon
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="#64748b" />
            </svg>
          )}
        </button>
        <button className="info-btn" title="About Alexandria" onClick={() => setShowInfo(true)}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="11" fill="#64748b"/>
            <rect x="10" y="7" width="2" height="2" rx="1" fill="#fff"/>
            <rect x="10" y="10" width="2" height="6" rx="1" fill="#fff"/>
          </svg>
        </button>
        {showInfo && (
          <div className="info-popup" onClick={() => setShowInfo(false)}>
            <div className="info-popup-content" onClick={e => e.stopPropagation()}>
              <div className="info-popup-lighthouse">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="8" width="4" height="10" rx="2" fill="#fbbf24"/>
                  <rect x="9" y="18" width="6" height="2" rx="1" fill="#64748b"/>
                  <polygon points="12,2 15,8 9,8" fill="#f87171"/>
                  <rect x="11" y="6" width="2" height="2" rx="1" fill="#fbbf24"/>
                </svg>
              </div>
              <div className="info-popup-title"><b>Alexandria</b></div>
              <div className="info-popup-desc">
                AI Writing Tool<br />
                Built by Khoa Cao<br />
                MMTL
              </div>
              <button className="close-info-btn" onClick={() => setShowInfo(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
      <div className="container">
        <div className="left-pane three-panel">
          <div className="panel-section">
            <div className="section-title header-bar">Insights</div>
            <div className="insights-editor three-panel-editor">
              <div className="editor-outer">
                <TipTapEditor value={insights} onChange={setInsights} loading={loading} initialContent="Write your insights here" />
              </div>
            </div>
          </div>
          <div className="panel-section">
            <div className="section-title header-bar">Context</div>
            <div className="context-editor three-panel-editor">
              <div className="editor-outer">
                <TipTapEditor value={context} onChange={setContext} loading={loading} initialContent="Copy in any articles here" />
              </div>
            </div>
          </div>
          <div className="panel-section">
            <div className="section-title header-bar">Style</div>
            <div className="style-editor three-panel-editor">
              <div className="editor-outer">
                <TipTapEditor value={style} onChange={setStyle} loading={loading} initialContent="Paste a writing style here" />
              </div>
            </div>
          </div>
        </div>
        <div className="divider" />
        <div className="right-pane">
          <div className="section-title header-bar">
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className="article-heading">Article</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {loading
                  ? <span style={{ display: 'flex', alignItems: 'center', color: '#fbbf24', fontWeight: 600, marginBottom: '6px' }}>
                      <svg className="spinner" width="18" height="18" viewBox="0 0 50 50" style={{ marginRight: '0.5em' }}>
                        <circle cx="25" cy="25" r="20" fill="none" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" strokeDasharray="31.4 31.4" transform="rotate(-90 25 25)">
                          <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.8s" repeatCount="indefinite" />
                        </circle>
                      </svg>
                      Generating!
                    </span>
                  : copied && <span style={{ color: '#22c55e', fontWeight: 600, marginBottom: '6px' }}>Copied!</span>
                }
                <button className="play-btn green" title="Generate Article" onClick={handleGenerate} disabled={loading} style={{background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', boxShadow: 'none', alignSelf: 'center', marginTop: '-4px'}}>
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="13" stroke="#64748b" strokeWidth="2" fill="none" />
                    <polygon points="13,11 21,16 13,21" fill="none" stroke="#64748b" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                </button>
                <button className="copy-btn" title="Copy current article content (works even before generation)" onClick={handleCopyArticle} style={{background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', boxShadow: 'none', alignSelf: 'center', marginTop: '-2px'}}>
                  <svg width="28" height="28" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="128" y="128" width="256" height="256" rx="32" fill="none" stroke="#64748b" strokeWidth="24"/>
                    <rect x="80" y="80" width="256" height="256" rx="32" fill="none" stroke="#64748b" strokeWidth="24"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="article-editor">
            <div className="editor-outer">
              <TipTapEditor value={article} onChange={setArticle} loading={loading} initialContent="Article will be generated here" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
