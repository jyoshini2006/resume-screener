import { useState } from 'react';
import UploadForm from './components/UploadForm';
import ScoreCard from './components/ScoreCard';
import SkillsTab from './components/SkillsTab';
import HeatmapTab from './components/HeatmapTab';
import RewriterTab from './components/RewriterTab';
import RoleMatchTab from './components/RoleMatchTab';
import { analyzeResume } from './api';

const TABS = ['Score', 'Skills', 'Heatmap', 'Rewriter', 'Role Match'];

export default function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Score');
  const [error, setError] = useState(null);

  const handleAnalyze = async (file, jd) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyzeResume(file, jd);
      setResult(data);
      setActiveTab('Score');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#e8e8f0', fontFamily: 'Inter, sans-serif' }}>

      {/* Loading Overlay */}
      {isLoading && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,15,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16, animation: 'spin 1s linear infinite' }}>⚙️</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Analyzing your resume...</div>
            <div style={{ color: '#555', fontSize: 14 }}>Extracting skills · Scoring match · Generating insights</div>
          </div>
        </div>
      )}

      {!result ? (
        <UploadForm onAnalyze={handleAnalyze} isLoading={isLoading} />
      ) : (
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#00e5a0,#00b8d4)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⚡</div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18 }}>ResumeAI</span>
            </div>
            <button
              onClick={() => setResult(null)}
              style={{ background: 'none', border: '1px solid #2a2a3e', color: '#666', padding: '8px 18px', borderRadius: 20, cursor: 'pointer', fontSize: 13 }}
            >
              ← New Analysis
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: '#0d0d15', padding: 4, borderRadius: 24, width: 'fit-content' }}>
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? '#1a1a2e' : 'none',
                  border: 'none', color: activeTab === tab ? '#00e5a0' : '#555',
                  fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
                  padding: '8px 18px', borderRadius: 20, cursor: 'pointer', transition: 'all 0.2s'
                }}>
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Score'      && <ScoreCard result={result} />}
          {activeTab === 'Skills'     && <SkillsTab result={result} />}
          {activeTab === 'Heatmap'    && <HeatmapTab result={result} />}
          {activeTab === 'Rewriter'   && <RewriterTab result={result} />}
          {activeTab === 'Role Match' && <RoleMatchTab result={result} />}
        </div>
      )}

      {error && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#ff5c5c', color: 'white', padding: '12px 24px', borderRadius: 12, fontSize: 13 }}>
          {error}
        </div>
      )}
    </div>
  );
}