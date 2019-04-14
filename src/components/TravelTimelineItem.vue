<template>
  <div class="travel-timeline-item position-relative py-2 px-4" :class="classes.container">
    <div :id="id" class="travel-timeline-item-anchor">&nbsp;</div>
    <div
      class="travel-timeline-item-bubble rounded-circle flag-icon-background flag-icon-squared flag-icon-2x"
      :class="classes.bubble"
    ></div>
    <div
      class="travel-timeline-item-content position-relative rounded p-2 p-lg-4"
      :class="classes.content"
    >
      <font-awesome-icon
        v-if="travel.status.icon"
        size="4x"
        class="travel-timeline-item-content-icon mx-2"
        :icon="travel.status.icon"
      />
      <h1
        class="travel-timeline-item-content-destination"
      >{{travel.city.name}}, {{travel.country.name}}</h1>
      <b-badge
        class="travel-timeline-item-content-status"
        variant="light"
        pill
      >{{travel.status.label}}</b-badge>
      <p v-if="travel.dates" class="travel-timeline-item-content-dates m-0 pl-2 pt-2">
        <span v-if="travel.dates.from">From {{getDateToString(travel.dates.from)}}</span>
        <span v-if="travel.dates.to">&nbsp;to {{getDateToString(travel.dates.to)}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "travel-timeline-item",
  components: {
    FontAwesomeIcon
  },
  props: {
    travel: {
      type: Object,
      required: true
    },
    orientation: {
      type: String,
      required: true,
      validator(value) {
        return _.includes(["left", "right"], value);
      }
    }
  },
  computed: {
    id() {
      return "travel-timeline-item-" + this.travel.id;
    },
    classes() {
      const classes = {
        container: [
          "travel-timeline-item-" + this.travel.status.id,
          "travel-timeline-item-" + this.orientation
        ],
        bubble: [
          "travel-timeline-item-bubble-" + this.orientation,
          "flag-icon-" + _.lowerCase(this.travel.country.id)
        ],
        content: "travel-timeline-item-content-" + this.travel.status.id
      };

      if (this.orientation === "right") {
        classes.container.push("pl-5");
      } else {
        classes.container.push("pr-5");
      }

      return classes;
    }
  },
  methods: {
    getDateToString(date) {
      return date.toLocaleDateString();
    }
  }
};
</script>