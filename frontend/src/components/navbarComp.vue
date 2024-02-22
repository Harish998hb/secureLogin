<template>
  <nav class="top-bar container py-3">
    <div class="columns">
      <div class="column is-2">
        <p class="is-size-7">
          {{ $t("nav.title") }}
        </p>
      </div>
      <div class="column"></div>
      <div class="column is-3">
        <ul class="is-flex is-justify-content-end list-none nav-links">
          <li class="mx-3">{{ $t("nav.home") }}</li>
          <li class="mx-3">{{ $t("nav.two_step") }}</li>
          <li class="mx-3">{{ $t("nav.login") }}</li>
          <!-- <li><ProfileIcon></ProfileIcon></li> -->
        </ul>
      </div>
      <div class="column is-2 is-hidden-desktop">
        <!-- <ProfileIcon></ProfileIcon> -->
        Hi
      </div>
    </div>
  </nav>
</template>

<script setup>
import ProfileIcon from "assets/icons/profile.svg";
</script>

<style lang="scss" scoped>
.nav-links{

  @media screen {

  }
}
</style>
