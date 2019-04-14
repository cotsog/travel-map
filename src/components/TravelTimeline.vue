<template>
  <div class="travel-timeline pt-4">
    <div class="travel-timeline-content container position-relative">
      <travel-timeline-item
        v-for="(travel, index) in reversedTravels"
        :key="index"
        :travel="travel"
        :orientation="getOrientation(index)"
      />
    </div>
  </div>
</template>

<script>
import _ from "lodash";

import TravelTimelineItem from "./TravelTimelineItem.vue";

export default {
  name: "travel-timeline",
  components: {
    TravelTimelineItem
  },
  props: {
    travels: {
      type: Array,
      required: true
    }
  },
  computed: {
    reversedTravels() {
      return _.reverse(this.travels);
    }
  },
  methods: {
    getOrientation(index) {
      return index % 2 == 0 ? "left" : "right";
    }
  }
};
</script>