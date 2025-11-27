<script setup>
  const emit = defineEmits(['navegar']);

  function clicar(botao) {
    emit('navegar', botao);
  }
</script>

<template>
  <nav class="navbar">
    <div class="logo">
      PDR <span class="destaque-logo">GAMES</span>
    </div>

    <ul class="nav-links">
      <li><a href="#" @click.prevent="clicar('inicio')">Início</a></li>
      <li><a href="#" @click.prevent="clicar('reviews')">Reviews</a></li>
      <li><a href="#" @click.prevent="clicar('esports')">E-Sports</a></li>
      
      <li><a href="#" class="btn-login" @click.prevent="clicar('login')">Login</a></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #111;
  border-bottom: 2px solid #ff4500;
  color: white;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  font-family: 'Arial Black', sans-serif;
}

.destaque-logo {
  color: #ff4500;
}

.nav-links {
  display: flex;
  gap: 25px;
  list-style: none;
  align-items: center;
}

.nav-links a {
  color: #ccc;
  text-decoration: none;
  font-weight: bold;
  transition: 0.3s;
}

.nav-links a:hover {
  color: #ff4500;
}

.btn-login {
  background-color: #ff4500;
  color: white !important;
  padding: 8px 20px;
  border-radius: 5px;
}
</style>