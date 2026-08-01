// Home.jsx - Removido o emoji do título
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const handleGoogleLogin = () => {
    alert("Login com Google clicado!");
    // Futuro: redirecionar para rota do backend
    // window.location.href = "http://localhost:4001/auth/google";
  };

  const handleGitHubLogin = () => {
    // Redireciona para o backend que inicia o OAuth do GitHub
    window.location.href = "http://localhost:4001/auth/github";
  };

  return (
    <div>
      <main>
        <div className="home-container">
          <div className="home-content">
            <h1>Bem-vindo à Nossa Plataforma</h1>
            <p>Faça login para acessar recursos exclusivos e uma experiência personalizada.</p>

            <div className="home-actions">
              <Link to="/login" className="home-button primary">
                Fazer Login
              </Link>
              <Link to="/register" className="home-button secondary">
                Criar Conta
              </Link>
            </div>

            <div className="social-login">
              <div className="social-divider">
                <span>ou continue com</span>
              </div>
              
              {/* Google */}
              <button onClick={handleGoogleLogin} className="home-button google">
                Entrar com Google
              </button>

              {/* GitHub */}
              <button onClick={handleGitHubLogin} className="home-button github">
                Entrar com GitHub
              </button>
            </div>

            <div className="forgot-password">
              Esqueceu sua senha? <Link to="/recovery">Recuperar acesso</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}