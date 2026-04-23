import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function UploadForm({ onAnalyze, isLoading }) {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#00e5a0,#00b8d4)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⚡</div>
        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, color: '#e8e8f0' }}>ResumeAI</span>
      </div>

      <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 42, fontWeight: 800, textAlign: 'center', marginBottom: 12, letterSpacing: '-1px', lineHeight: 1.1 }}>
        Is your resume <span style={{ color: '#00e5a0' }}>ATS-ready?</span>
      </h1>
      <p style={{ color: '#555', fontSize: 15, marginBottom: 40, textAlign: 'center' }}>
        Upload your resume + paste the job description. Get your score in seconds.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, width: '100%', maxWidth: 800 }}>
        
        {/* Upload Zone */}
        <div
          {...getRootProps()}
          style={{
            background: '#111118', border: `2px dashed ${isDragActive ? '#00e5a0' : '#2a2a3e'}`,
            borderRadius: 16, padding: 40, textAlign: 'center', cursor: 'pointer',
            transition: 'all 0.3s', backgroundColor: isDragActive ? '#00e5a008' : '#111118'
          }}
        >
          <input {...getInputProps()} />
          <div style={{ fontSize: 12, color: '#555', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>01 — Resume</div>
          {file ? (
            <div>
              <div style={{ fontSize: 28, marginBottom: 8 }}>📄</div>
              <div style={{ color: '#00e5a0', fontWeight: 500, fontSize: 14 }}>{file.name}</div>
              <div style={{ color: '#444', fontSize: 12, marginTop: 4 }}>Click to change</div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⬆️</div>
              <div style={{ fontSize: 14, color: '#888' }}>Drop your PDF here</div>
              <div style={{ fontSize: 12, color: '#444', marginTop: 4 }}>or click to browse</div>
            </div>
          )}
        </div>

        {/* JD Input */}
        <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: 16, padding: 24 }}>
          <div style={{ fontSize: 12, color: '#555', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>02 — Job Description</div>
          <textarea
            rows={7}
            placeholder="Paste the job description here..."
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            style={{
              width: '100%', background: '#0d0d15', border: '1px solid #1e1e2e',
              borderRadius: 12, color: '#e8e8f0', fontFamily: 'Inter, sans-serif',
              fontSize: 13, padding: 14, resize: 'none', outline: 'none'
            }}
          />
        </div>
      </div>

      <button
        onClick={() => onAnalyze(file, jd)}
        disabled={!file || !jd.trim() || isLoading}
        style={{
          marginTop: 24, width: '100%', maxWidth: 800,
          background: (!file || !jd.trim() || isLoading) ? '#1a1a2e' : 'linear-gradient(135deg,#00e5a0,#00b8d4)',
          border: 'none', color: (!file || !jd.trim() || isLoading) ? '#444' : '#0a0a0f',
          fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15,
          padding: '16px 40px', borderRadius: 50, cursor: (!file || !jd.trim() || isLoading) ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s'
        }}
      >
        {isLoading ? '⚙️ Analyzing...' : 'Analyze My Resume →'}
      </button>
    </div>
  );
}