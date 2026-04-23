export default function RoleMatchTab({ result }) {
  const roles = result?.role_scores || {};

  return (
    <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: 16, padding: 24 }}>
      <div style={{ fontSize: 13, color: '#555', marginBottom: 24 }}>How well your resume fits different roles</div>
      {Object.entries(roles).map(([role, score]) => (
        <div key={role} style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>{role}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: score >= 70 ? '#00e5a0' : score >= 50 ? '#f5c542' : '#ff5c5c' }}>{score}%</span>
          </div>
          <div style={{ height: 8, background: '#1e1e2e', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 8,
              width: `${score}%`,
              background: score >= 70 ? 'linear-gradient(90deg,#00e5a0,#00b8d4)' : score >= 50 ? '#f5c542' : '#ff5c5c',
              transition: 'width 1s ease'
            }} />
          </div>
        </div>
      ))}
      <div style={{ marginTop: 8, padding: '12px 16px', background: '#0d0d15', borderRadius: 10, fontSize: 13, color: '#555' }}>
        💡 Your resume is best suited for <span style={{ color: '#00e5a0', fontWeight: 600 }}>
          {Object.entries(roles).sort((a, b) => b[1] - a[1])[0]?.[0]} roles
        </span>
      </div>
    </div>
  );
}