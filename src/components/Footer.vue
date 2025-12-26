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
        <a href="mailto:divine54679@gmail.com" aria-label="Email">
          <i class="bi bi-envelope"></i>
        </a>
      </div>
    </div>
  </footer>
</template>
<script setup></script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

footer {
  width: 100%;
  padding: 0;
  display: inline-block;

  .container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: $space-md $space-xl;

    @include respond-to(pad) {
      flex-direction: column;
      gap: $space-lg;
      padding: $space-md $space-xl;
      justify-content: flex-start;
    }

    @include respond-to(mobile) {
      flex-direction: column;
      padding: $space-md $space-xl;
    }

    .footer-text {
      p {
        color: $white-color;
        font-size: 1.125rem;
        margin-bottom: $space-sm;
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
      gap: $space-lg;

      a {
        color: $white-color;
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
