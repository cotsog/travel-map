<template>
  <nav class="navigation colors-2 fixed-top shadow">
    <b-nav class="container justify-content-center" v-b-scrollspy>
      <b-nav-item href="#world-map" class="navigation-link" title="Map">
        <font-awesome-icon icon="map"/>
        <p class="navigation-link-label d-inline ml-2">Map</p>
      </b-nav-item>
      <b-nav-item v-if="nextTravelLink" class="navigation-link" title="Next" :href="nextTravelLink">
        <font-awesome-icon icon="bookmark"/>
        <p class="navigation-link-label d-inline ml-2">Next</p>
      </b-nav-item>
      <b-nav-item
        v-if="currentTravelLink"
        class="navigation-link"
        title="Current"
        :href="currentTravelLink"
      >
        <font-awesome-icon icon="map-marker"/>
        <p class="navigation-link-label d-inline ml-2">Current</p>
      </b-nav-item>
      <b-nav-item
        v-if="visitedTravelLink"
        class="navigation-link"
        title="Visited"
        :href="visitedTravelLink"
      >
        <font-awesome-icon icon="check-circle"/>
        <p class="navigation-link-label d-inline ml-2">Visited</p>
      </b-nav-item>
      <b-nav-item v-if="homeTravelLink" class="navigation-link" title="Home" :href="homeTravelLink">
        <font-awesome-icon icon="home"/>
        <p class="navigation-link-label d-inline ml-2">Home</p>
      </b-nav-item>
    </b-nav>
  </nav>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "app-navigation",
  components: {
    FontAwesomeIcon
  },
  props: {
    travelLinks: {
      type: Object,
      required: true
    }
  },
  computed: {
    nextTravelLink() {
      return this.travelLinks["next"];
    },
    currentTravelLink() {
      return this.travelLinks["current"];
    },
    visitedTravelLink() {
      return this.travelLinks["visited"];
    },
    homeTravelLink() {
      return this.travelLinks["home"];
    }
  }
};
</script>