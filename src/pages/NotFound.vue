<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Page not found</p>
    <img src="../assets/logo.png" alt="404 Error Image" />
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.not-found h1 {
  font-size: 6rem;
  margin: 0;
}

.not-found p {
  font-size: 2rem;
  margin: 0;
  margin-bottom: 2rem;
}

.not-found img {
  width: 300px;
  margin-bottom: 2rem;
}

.not-found router-link {
  font-size: 1.5rem;
  text-decoration: none;
  color: #007bff;
}

.not-found router-link:hover {
  text-decoration: underline;
}
</style>
