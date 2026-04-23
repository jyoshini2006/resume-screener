export default function RewriterTab({ result }) {
  const bullets = result?.rewritten_bullets || [];

  if (bullets.length === 0) return (
    <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: 16, padding: 40, textAlign: 'center', color: '#444' }}>
      No bullet rewrites available.
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {bullets.map((b, i) => (
        <div key={i} style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: 16, padding: 24 }}>
          <div style={{ fontSize: 12, color: '#444', fontWeight: 600, marginBottom: 12, letterSpacing: '0.06em' }}>BULLET {i + 1}</div>
          <div style={{ padding: '12px 16px', background: '#ff5c5c10', border: '1px solid #ff5c5c20', borderRadius: 10, marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: '#ff5c5c60', marginBottom: 4 }}>ORIGINAL</div>
            <p style={{ fontSize: 13, color: '#ff5c5c80', margin: 0 }}>{b.original}</p>
          </div>
          <div style={{ padding: '12px 16px', background: '#00e5a010', border: '1px solid #00e5a030', borderRadius: 10 }}>
            <div style={{ fontSize: 11, color: '#00e5a0', marginBottom: 4 }}>✨ AI IMPROVED</div>
            <p style={{ fontSize: 13, color: '#ccc', margin: 0 }}>{b.improved}</p>
          </div>
        </div>
      ))}
    </div>
  );
}