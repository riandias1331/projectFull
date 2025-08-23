import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3333/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao fazer login');
            }

            setSuccessMessage('Login realizado com sucesso! Redirecionando...');
            
            localStorage.setItem('token', data.token || '');
            localStorage.setItem('username', data.user?.username || 'Usuário');
            
            setTimeout(() => {
                navigate('/main', { 
                    replace: true,
                    state: { fromLogin: true }
                });
            }, 1000);

        } catch (err) {
            setError(err.message || 'Erro ao processar login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='auth-container'>
            <div className="auth-header">
                <div className="auth-text">Login</div>
                <div className="auth-underline"></div>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message login-success">{successMessage}</div>}
            
            <form className="auth-inputs" onSubmit={handleSubmit}>
                <div className="auth-input">
                    <input 
                        type="email" 
                        name="email"
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="auth-input">
                    <input 
                        type="password" 
                        name="password"
                        placeholder='Password' 
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                    />
                </div>
                
                <div className="forgot-password">
                    Esqueceu a senha? 
                    {/* <Link to="/register">Clique aqui!</Link> */}
                </div>
                
                <button 
                    type="submit" 
                    className="auth-submit-button"
                    disabled={loading}
                >
                    {loading ? 'Processando...' : 'Login'}
                </button>
            </form>
            
            <div className="auth-switch">
                Não tem uma conta? <Link to="/register">Cadastre-se aqui</Link>
            </div>
        </div>
    );
};

export default Login;