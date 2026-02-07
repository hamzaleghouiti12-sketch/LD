import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api.js';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await login(email, password);
            if (res && res.token) {
                sessionStorage.setItem('token', res.token);
                navigate('/');
            } else {
                setError('Credenciales inválidas');
            }
        } catch (err) {
            setError(err.message || 'Error del servidor. Inténtalo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--color-cream)' }}>
            <div className="card" style={{ width: 380, padding: 32 }}>
                <h1 className="page-title" style={{ textAlign: 'center', marginBottom: 24 }}>Iniciar Sesión</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-ink)', marginBottom: 6, display: 'block' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--color-sand)', fontSize: 14 }}
                            placeholder="admin@empresa.com"
                            required
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-ink)', marginBottom: 6, display: 'block' }}>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--color-sand)', fontSize: 14 }}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div style={{ padding: '8px 12px', background: 'rgba(239,68,68,0.1)', color: '#dc2626', borderRadius: 8, fontSize: 13, fontWeight: 500, textAlign: 'center' }}>
                            {error}
                        </div>
                    )}

                    <button type="submit" className="btn btn-orange" style={{ justifyContent: 'center', marginTop: 8 }} disabled={loading}>
                        {loading ? 'Entrando...' : 'Entrar al Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
}
