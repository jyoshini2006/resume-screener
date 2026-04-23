export default function HeatmapTab({ result }) {
  const matched = result?.matched_skills || [];
  const missing = result?.missing_skills || [];
  const resumeText = result?.resume_text || "No resume text available.";

  const highlightText = (text) => {
    const words = text.split(/(\s+)/);
    return words.map((word, i) => {
      const clean = word.replace(/[^a-zA-Z0-9.+#]/g, '');
      if (matched.some(s => s.toLowerCase() === clean.toLowerCase()))
        return <mark key={i} style={{ background: '#00e5a033', color: '#00e5a0', borderRadius: 3, padding: '1px 3px' }}>{word}</mark>;
      if (missing.some(s => s.toLowerCase() === clean.toLowerCase()))
        return <mark key={i} style={{ background: '#ff5c5c22', color: '#ff5c5c', borderRadius: 3, padding: '1px 3px' }}>{word}</mark>;
      return <span key={i}>{word}</span>;
    });
  };

  return (
    <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: 16, padding: 24 }}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <span style={{ background: '#00e5a033', color: '#00e5a0', padding: '3px 12px', borderRadius: 20, fontSize: 12 }}>Green = matched</span>
        <span style={{ background: '#ff5c5c22', color: '#ff5c5c', padding: '3px 12px', borderRadius: 20, fontSize: 12 }}>Red = missing</span>
      </div>
      <div style={{ fontSize: 14, lineHeight: 2.2, color: '#bbb', background: '#0d0d15', padding: 20, borderRadius: 12 }}>
        {highlightText(resumeText)}
      </div>
    </div>
  );
}