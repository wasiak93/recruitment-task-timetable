<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white rounded p-0">
    <div class="container-fluid px-4">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <router-link class="nav-link p-4" to="/" active-class="active-tab">
            Bus Lines
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link p-4"
            to="/stops"
            active-class="active-tab"
          >
            Stops
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.nav {
  --bs-nav-link-color: #9a9da4;
  --bs-nav-tabs-link-active-color: #33373c;
  --bs-nav-link-hover-color: #33373c;
}
.nav-tabs {
  border: none;
  font-weight: 500;
  .nav-link.active-tab {
    border-bottom: 2px solid #007bff;
    color: #33373c;
  }
  .nav-link {
    border: none;
  }
}
</style>
