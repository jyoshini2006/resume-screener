export default function SkillsTab({ result }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: 16, padding: 24 }}>
        <div style={{ fontSize: 13, color: '#00e5a0', fontWeight: 600, marginBottom: 16 }}>✅ Matched Skills</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {result?.matched_skills?.map(skill => (
            <span key={skill} style={{ padding: '4px 14px', background: '#00e5a015', color: '#00e5a0', border: '1px solid #00e5a030', borderRadius: 20, fontSize: 13 }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: 16, padding: 24 }}>
        <div style={{ fontSize: 13, color: '#ff5c5c', fontWeight: 600, marginBottom: 16 }}>❌ Missing Skills</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {result?.missing_skills?.map(skill => (
            <span key={skill} style={{ padding: '4px 14px', background: '#ff5c5c15', color: '#ff5c5c', border: '1px solid #ff5c5c30', borderRadius: 20, fontSize: 13 }}>
              {skill}
            </span>
          ))}
        </div>
        <div style={{ marginTop: 16, fontSize: 12, color: '#444', lineHeight: 1.6 }}>
          💡 Add these to your resume or upskill before applying
        </div>
      </div>
    </div>
  );
}