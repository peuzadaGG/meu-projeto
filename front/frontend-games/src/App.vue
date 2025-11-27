<script setup>
  import { ref } from 'vue';
  import Navbar from './components/Navbar.vue';

  // --- NAVEGAÇÃO ---
  const telaAtual = ref('inicio');
  function trocarTela(novaTela) { telaAtual.value = novaTela; }

  // --- LOGIN ---
  const email = ref('');
  const senha = ref('');

  async function fazerLogin() {
    try {
      const resposta = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value, senha: senha.value })
      });
      const dados = await resposta.json();
      if (resposta.ok) {
        alert('Bem-vindo, ' + dados.usuario + '! 🎮');
        trocarTela('inicio');
      } else {
        alert('Erro: ' + dados.mensagem);
      }
    } catch (error) { alert('Erro no servidor.'); }
  }

  // --- CADASTRO (NOVO!) ---
  const nomeCadastro = ref('');
  const emailCadastro = ref('');
  const senhaCadastro = ref('');

  async function fazerCadastro() {
    if(!nomeCadastro.value || !emailCadastro.value || !senhaCadastro.value) {
      alert('Preencha tudo!'); return;
    }
    try {
      const resposta = await fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nome: nomeCadastro.value, 
          email: emailCadastro.value, 
          senha: senhaCadastro.value 
        })
      });
      const dados = await resposta.json();
      if (resposta.ok) {
        alert('Conta criada! Agora faça login.');
        trocarTela('login'); // Manda o usuário para a tela de login
      } else {
        alert('Erro: ' + dados.mensagem);
      }
    } catch (error) { alert('Erro no servidor.'); }
  }

  // --- DADOS (Notícias, Reviews, Partidas...) ---
  const noticias = [
    { id: 1, titulo: 'GTA VI Adiado', categoria: 'Mundo Aberto', imagem: '/gta6.jpg' },
    { id: 2, titulo: 'Tinowns na Pain', categoria: 'MOBA', imagem: '/Tinowns.jpeg' },
    { id: 3, titulo: 'Furia Campeã', categoria: 'FPS', imagem: '/furia-campea-1.jpg' },
    { id: 4, titulo: 'Jogos Indie', categoria: 'Indie', imagem: '/indie.jpg' }
  ];
  const reviews = [
    { id: 1, jogo: 'GTA VI', nota: 9.8, imagem: '/gta6.jpg', resumo: 'A espera valeu a pena?' },
    { id: 2, jogo: 'CS 2', nota: 8.5, imagem: '/furia-campea-1.jpg', resumo: 'O FPS tático evoluiu.' },
    { id: 3, jogo: 'Indies 2025', nota: 10.0, imagem: '/indie.jpg', resumo: 'Grandes emoções.' },
    { id: 4, jogo: 'LoL Meta', nota: 7.5, imagem: '/Tinowns.jpeg', resumo: 'O estado do jogo.' }
  ];
  const partidas = [
    { id: 1, jogo: 'LoL', torneio: 'CBLOL', timeA: 'LOUD', timeB: 'paiN', data: 'AO VIVO 🔴', status: 'live' },
    { id: 2, jogo: 'CS2', torneio: 'IEM', timeA: 'FURIA', timeB: 'FaZe', data: '18:00', status: 'proximo' },
    { id: 3, jogo: 'Valorant', torneio: 'VCT', timeA: 'Sentinels', timeB: 'LOUD', data: 'Amanhã', status: 'proximo' },
    { id: 4, jogo: 'R6', torneio: 'BR6', timeA: 'W7M', timeB: 'Liquid', data: 'Sexta', status: 'proximo' }
  ];
</script>

<template>
  <div id="app">
    <Navbar @navegar="trocarTela" />

    <main class="container">
      
      <div v-if="telaAtual === 'inicio'" class="conteudo-centralizado">
        <section class="destaque">
          <span class="tag">Destaque</span>
          <h1>O Futuro dos Games</h1>
          <p>Confira as novidades mais quentes.</p>
          <div class="video-container">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/QdBZY2fkU-0" title="Video" frameborder="0" allowfullscreen></iframe>
          </div>
        </section>
        <section class="feed">
          <h2>Últimas Notícias</h2>
          <div class="lista-flex">
            <article v-for="news in noticias" :key="news.id" class="card">
              <img :src="news.imagem" class="card-image">
              <div class="card-content">
                <span class="card-tag">{{ news.categoria }}</span>
                <h3>{{ news.titulo }}</h3>
                <button>Ler mais</button>
              </div>
            </article>
          </div>
        </section>
      </div>

      <div v-if="telaAtual === 'reviews'" class="conteudo-centralizado">
        <h2 class="titulo-secao">Análises e Notas</h2>
        <div class="lista-flex">
          <div v-for="review in reviews" :key="review.id" class="review-card">
            <div class="nota-badge">{{ review.nota }}</div>
            <img :src="review.imagem" class="review-img">
            <div class="review-info">
              <h3>{{ review.jogo }}</h3>
              <p>{{ review.resumo }}</p>
              <button class="btn-ler">Ler Análise</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="telaAtual === 'esports'" class="conteudo-centralizado">
        <h2 class="titulo-secao">Agenda de Partidas</h2>
        <div class="lista-flex-coluna">
          <div v-for="partida in partidas" :key="partida.id" class="match-card" :class="{ 'live-border': partida.status === 'live' }">
            <div class="match-time">
              <span v-if="partida.status === 'live'" class="live-badge">AO VIVO</span>
              <span v-else>{{ partida.data }}</span>
            </div>
            <div class="match-teams">
              <span>{{ partida.timeA }}</span>
              <span class="versus">VS</span>
              <span>{{ partida.timeB }}</span>
            </div>
            <button class="btn-assistir">Assistir</button>
          </div>
        </div>
      </div>

      <div v-if="telaAtual === 'login'" class="conteudo-centralizado">
        <h1>Login</h1>
        <form class="form-login" @submit.prevent="fazerLogin">
          <input type="email" placeholder="Email" v-model="email" required>
          <input type="password" placeholder="Senha" v-model="senha" required>
          <button type="submit">Entrar</button>
        </form>
        <p class="link-texto">Não tem conta? <a href="#" @click.prevent="trocarTela('cadastro')">Crie agora</a></p>
      </div>

      <div v-if="telaAtual === 'cadastro'" class="conteudo-centralizado">
        <h1>Criar Conta</h1>
        <form class="form-login" @submit.prevent="fazerCadastro">
          <input type="text" placeholder="Seu Nome (ex: João Gamer)" v-model="nomeCadastro" required>
          <input type="email" placeholder="Seu Email" v-model="emailCadastro" required>
          <input type="password" placeholder="Crie uma Senha" v-model="senhaCadastro" required>
          <button type="submit">Cadastrar</button>
        </form>
        <p class="link-texto">Já tem conta? <a href="#" @click.prevent="trocarTela('login')">Faça Login</a></p>
      </div>

    </main>
  </div>
</template>

<style scoped>
/* --- GERAL --- */
.container { padding-top: 100px; background-color: #1a1a1a; min-height: 100vh; color: white; padding-bottom: 50px; display: flex; flex-direction: column; align-items: center; }
.conteudo-centralizado { width: 100%; max-width: 800px; display: flex; flex-direction: column; align-items: center; text-align: center; }
.titulo-secao { color: #ff4500; margin-bottom: 30px; text-transform: uppercase; border-bottom: 2px solid #ff4500; padding-bottom: 5px; display: inline-block; }

/* HOME */
.destaque { background: #222; padding: 30px; border-radius: 20px; width: 100%; margin-bottom: 40px; display: flex; flex-direction: column; align-items: center; box-shadow: 0 5px 20px rgba(0,0,0,0.5); }
.video-container { width: 100%; aspect-ratio: 16/9; margin-top: 20px; border-radius: 10px; overflow: hidden; }
.video-container iframe { border: none; }
.tag { background: #ff4500; padding: 5px 15px; border-radius: 20px; font-weight: bold; margin-bottom: 10px; }

/* LISTAS */
.lista-flex { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; width: 100%; }
.card, .review-card { background: #222; width: 250px; border-radius: 15px; overflow: hidden; display: flex; flex-direction: column; align-items: center; padding-bottom: 15px; border: 1px solid #333; }
.card-image, .review-img { width: 100%; height: 150px; object-fit: cover; }
.card-content, .review-info { padding: 15px; display: flex; flex-direction: column; align-items: center; gap: 10px; }
.card-tag { color: #ff4500; font-weight: bold; font-size: 0.8rem; }
h3 { margin: 0; font-size: 1.1rem; }
button, .btn-ler { background: transparent; border: 1px solid #555; color: white; padding: 5px 20px; border-radius: 20px; cursor: pointer; transition: 0.3s; }
button:hover, .btn-ler:hover { background: white; color: black; }

/* REVIEWS & ESPORTS */
.review-card { position: relative; }
.nota-badge { position: absolute; top: 10px; right: 10px; background: #ff4500; width: 40px; height: 40px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; box-shadow: 0 0 10px black; }
.lista-flex-coluna { display: flex; flex-direction: column; gap: 15px; width: 100%; align-items: center; }
.match-card { background: #222; width: 100%; padding: 20px; border-radius: 10px; display: flex; flex-direction: column; align-items: center; gap: 15px; border-left: 5px solid #555; text-align: center; }
.live-border { border-left-color: #ff0000; background: linear-gradient(to bottom, rgba(255,0,0,0.05), #222); }
.live-badge { background: red; padding: 3px 10px; border-radius: 5px; font-weight: bold; font-size: 0.8rem; }
.match-teams { font-size: 1.2rem; font-weight: bold; display: flex; gap: 10px; align-items: center; }
.versus { color: #ff4500; font-size: 0.9rem; }
.btn-assistir { background: #333; border: none; padding: 10px 30px; }
.btn-assistir:hover { background: #ff4500; color: white; }

/* FORMS */
.form-login { display: flex; flex-direction: column; gap: 15px; width: 100%; max-width: 300px; background: #222; padding: 30px; border-radius: 15px; border: 1px solid #333; }
.form-login input { padding: 12px; border-radius: 5px; border: 1px solid #444; background: #111; color: white; text-align: center; }
.form-login button { background: #ff4500; border: none; color: white; font-weight: bold; padding: 12px; cursor: pointer; }
.form-login button:hover { background: white; color: #ff4500; }
.link-texto { margin-top: 15px; color: #ccc; }
.link-texto a { color: #ff4500; text-decoration: none; font-weight: bold; }
</style>