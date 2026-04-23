export default function ScoreCard({ result }) {
  const score = result?.score || 0;
  const color = score >= 75 ? '#00e5a0' : score >= 50 ? '#f5c542' : '#ff5c5c';
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20 }}>
      <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="128" height="128" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r="54" fill="none" stroke="#1e1e2e" strokeWidth="10" />
          <circle cx="64" cy="64" r="54" fill="none" stroke={color} strokeWidth="10"
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round" transform="rotate(-90 64 64)"
            style={{ transition: 'stroke-dashoffset 1s ease' }} />
          <text x="64" y="60" textAnchor="middle" fill={color} fontSize="26" fontWeight="700" fontFamily="Syne">{score}</text>
          <text x="64" y="76" textAnchor="middle" fill="#555" fontSize="11" fontFamily="Inter">/ 100</text>
        </svg>
        <div style={{ fontSize: 13, color: '#555', marginTop: 8 }}>Match Score</div>
        <div style={{ fontSize: 12, color, fontWeight: 600, marginTop: 4 }}>
          {score >= 75 ? '🎯 Strong Match' : score >= 50 ? '👍 Decent Match' : '⚠️ Needs Work'}
        </div>
      </div>

      <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: 16, padding: 24 }}>
        <div style={{ fontSize: 13, color: '#555', marginBottom: 12 }}>AI Feedback</div>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#ccc' }}>{result?.suggestion}</p>
        <div style={{ marginTop: 20, padding: '14px 16px', background: '#0d0d15', borderRadius: 10, border: '1px solid #1e1e2e', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, fontFamily: 'Syne', color: '#00e5a0' }}>{result?.matched_skills?.length || 0}</div>
            <div style={{ fontSize: 12, color: '#555' }}>Matched Skills</div>
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, fontFamily: 'Syne', color: '#ff5c5c' }}>{result?.missing_skills?.length || 0}</div>
            <div style={{ fontSize: 12, color: '#555' }}>Missing Skills</div>
          </div>
        </div>
      </div>
    </div>
  );
}