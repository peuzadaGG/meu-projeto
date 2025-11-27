<template>
  <div id="app">
    <header class="banner">
      <div class="banner-content">
        <h1>PORTAL GAMER</h1>
        <p>As novidades mais quentes dos E-sports</p>
      </div>
    </header>

    <div class="container">
      <section class="video-section">
        <h2><span class="highlight">|</span> Vídeo em Destaque</h2>
        <div class="video-wrapper">
          <video controls width="100%" poster="https://img.youtube.com/vi/QdBZY2fkU-0/maxresdefault.jpg">
           <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
            Seu navegador não suporta vídeos.
          </video>
        </div>
      </section>

      <section class="feed-section">
        <h2><span class="highlight">|</span> Últimas Notícias</h2>
        
        <div v-if="loading" class="loading">Carregando novidades...</div>

        <div v-else class="news-grid">
          <div v-for="item in noticias" :key="item.id" class="card">
            <div class="card-img" :style="{ backgroundImage: 'url(' + item.imagem_capa + '), url(https://via.placeholder.com/400x200)' }">
              <span class="tag">{{ item.categoria_nome }}</span>
            </div>
            <div class="card-content">
              <h3>{{ item.titulo }}</h3>
              <p>{{ item.resumo }}</p>
              <button>Ler mais</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      noticias: [],
      loading: true
    }
  },
  async mounted() {
    try {
      // Aqui ele bate na porta 3000 (onde está o Node) para pegar os dados
      const response = await axios.get('http://localhost:3000/api/noticias');
      this.noticias = response.data;
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
      alert("Erro: Não consegui conectar no servidor. O 'node server.js' está rodando?");
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style>
/* CSS estilo 'Dark Mode Gamer' */
body {
  margin: 0;
  background-color: #0f0f12; /* Fundo preto quase roxo */
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container { max-width: 1100px; margin: 0 auto; padding: 20px; }
.highlight { color: #00ff88; font-weight: bold; }

/* Banner */
.banner {
  background: linear-gradient(to right, #1a2a6c, #b21f1f, #fdbb2d);
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.banner h1 { font-size: 3rem; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }

/* Grid de Notícias */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.card {
  background: #1e1e24;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  border: 1px solid #333;
}
.card:hover { transform: translateY(-5px); border-color: #00ff88; }

.card-img {
  height: 180px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.tag {
  background: #00ff88;
  color: #000;
  padding: 4px 8px;
  position: absolute;
  top: 10px;
  right: 10px;
  font-weight: bold;
  font-size: 0.8rem;
  border-radius: 4px;
}

.card-content { padding: 15px; }
.card h3 { margin-top: 0; color: #fff; }
.card p { color: #aaa; font-size: 0.9rem; }
.card button {
  background: transparent;
  border: 1px solid #00ff88;
  color: #00ff88;
  padding: 8px 16px;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 4px;
}
.card button:hover { background: #00ff88; color: #000; }

/* Vídeo */
.video-section { margin-bottom: 40px; }
.video-wrapper {
  border: 2px solid #333;
  border-radius: 8px;
  overflow: hidden;
}
</style>