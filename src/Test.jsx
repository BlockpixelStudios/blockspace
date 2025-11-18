export default function Test() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      color: 'white',
      fontFamily: 'system-ui'
    }}>
      <div style={{ fontSize: '80px', marginBottom: '20px' }}>🚀</div>
      <div style={{ fontSize: '48px', fontWeight: 'bold' }}>BlockSpace FUNCIONANDO!</div>
      <div style={{ fontSize: '20px', marginTop: '10px', opacity: 0.8 }}>
        Se você está vendo isso, o React está OK! ✅
      </div>
    </div>
  )
}
