import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem');
            setLoading(false);
            return;
        }

        try {
            // ANTES (código fixo):
            // const response = await fetch("http://localhost:4000/api/register", {
            
            // DEPOIS (usando .env):
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao criar conta');
            }

            setSuccessMessage('Conta criada com sucesso! Redirecionando para login...');
            
            setTimeout(() => {
                navigate('/login', { 
                    replace: true
                });
            }, 2000);

        } catch (err) {
            setError(err.message || 'Erro ao criar conta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='auth-container'>
            <div className="auth-header">
                <div className="auth-text">Cadastro</div>
                <div className="auth-underline"></div>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            
            <form className="auth-inputs" onSubmit={handleSubmit}>
                <div className="auth-input">
                    <input 
                        type="text" 
                        name="name"
                        placeholder='Nome completo' 
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
               
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
                        placeholder='Senha' 
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                    />
                </div>
                <div className="auth-input">
                    <input 
                        type="password" 
                        name="confirmPassword"
                        placeholder='Confirmar senha' 
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        minLength="6"
                    />
                </div>
                
                <button 
                    type="submit" 
                    className="auth-submit-button"
                    disabled={loading}
                >
                    {loading ? 'Processando...' : 'Cadastrar'}
                </button>
            </form>
            
            <div className="auth-switch">
                Já tem uma conta? <Link to="/login">Faça login aqui</Link>
            </div>
        </div>
    );
};

export default Register;