import { useState, useEffect } from 'react';
import './Main.css';

export default function Main() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dados de exemplo (em um caso real, viria de uma API)
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: "Smartphone Premium",
        price: 899.99,
        image: "https://via.placeholder.com/300x300?text=Smartphone",
        rating: 4.5,
        description: "O mais recente smartphone com câmera de alta resolução e bateria de longa duração."
      },
      {
        id: 2,
        name: "Fones de Ouvido Sem Fio",
        price: 129.99,
        image: "https://via.placeholder.com/300x300?text=Fones",
        rating: 4.2,
        description: "Som de alta qualidade com cancelamento de ruído ativo."
      },
      {
        id: 3,
        name: "Smartwatch Inteligente",
        price: 249.99,
        image: "https://via.placeholder.com/300x300?text=Smartwatch",
        rating: 4.7,
        description: "Monitoramento de saúde e notificações em tempo real."
      },
      {
        id: 4,
        name: "Tablet Ultrafino",
        price: 459.99,
        image: "https://via.placeholder.com/300x300?text=Tablet",
        rating: 4.3,
        description: "Perfeito para trabalho e entretenimento com tela de alta resolução."
      },
      {
        id: 5,
        name: "Console de Jogos",
        price: 499.99,
        image: "https://via.placeholder.com/300x300?text=Console",
        rating: 4.8,
        description: "Experiência de jogo imersiva com gráficos de última geração."
      },
      {
        id: 6,
        name: "Câmera Profissional",
        price: 799.99,
        image: "https://via.placeholder.com/300x300?text=Câmera",
        rating: 4.6,
        description: "Capture momentos especiais com qualidade profissional."
      }
    ];

    setProducts(mockProducts);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Carregando produtos...</div>;
  }

  return (
    <div className="main-container">
      <div className="main-header">
        <h1>Nossos Produtos em Destaque</h1>
        <p>Descubra as melhores ofertas e novidades</p>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <div className="product-overlay">
                <button className="quick-view">Visualizar</button>
              </div>
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-rating">
                {"★".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
                <span>({product.rating})</span>
              </div>
              <p className="product-description">{product.description}</p>
              <div className="product-price">R$ {product.price.toFixed(2)}</div>
              <div className="product-actions">
                <button className="add-to-cart">Adicionar ao Carrinho</button>
                <button className="buy-now">Comprar Agora</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}