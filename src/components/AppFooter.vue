<template>
  <footer class="footer colors-2 shadow mt-4 py-1">
    <div class="container text-right">
      <p class="d-inline mx-1">Benjamin Guibert</p>
      <b-link
        href="https://github.com/benjamin-guibert/travel-map"
        target="_blank"
        title="Github repository"
      >
        <font-awesome-icon class="mx-1" :icon="['fab', 'github']" size="lg"/>
      </b-link>
    </div>
  </footer>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "app-footer",
  components: {
    FontAwesomeIcon
  }
};
</script>