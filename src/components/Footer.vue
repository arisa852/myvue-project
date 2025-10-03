<template>
  <footer>
    <div class="container">
      <div class="footer-text">
        <p>© 2025 My project. All rights reserved.</p>
        <p>Built with Vue.js & SCSS</p>
      </div>

      <div class="footer-icon">
        <a href="https://github.com/your-github" target="_blank" rel="noopener" aria-label="GitHub">
          <i class="bi bi-github"></i>
        </a>
        <a href="mailto:your@email.com" aria-label="Email">
          <i class="bi bi-envelope"></i>
        </a>
      </div>
    </div>
  </footer>
</template>
<script></script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

footer {
  width: 100%;
  background-color: $text-color;
  padding: 20px 0;
  display: inline-block;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1080px;
    margin: 0 auto;
    flex-wrap: wrap;
    padding: 30px 20px;

    @include respond-to(pad) {
      flex-direction: column;
      gap: 20px;
      padding: 30px 10px;
      justify-content: flex-start;
      align-items: flex-start;
    }

    @include respond-to(mobile) {
      flex-direction: column;
      gap: 20px;
      padding: 30px 10px;
      justify-content: flex-start;
      align-items: flex-start;
    }

    .footer-text {
      p {
        color: #fff;
        font-size: 1.125rem;
        margin-bottom: 8px;
        line-height: 1.5;

        @include respond-to(pad) {
          font-size: 1.25rem;
        }

        @include respond-to(mobile) {
          font-size: 1.25rem;
        }
      }
    }
    .footer-icon {
      display: flex;
      gap: 20px;

      a {
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        @include respond-to(pad) {
          font-size: 30px;
        }
        @include respond-to(mobile) {
          font-size: 30px;
        }

        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
}
</style>
