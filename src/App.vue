<template>
  <div id="app" class="app">
    <app-navigation v-if="travels.length" :travelLinks="travelLinks" :on-click="onClickToScroll"/>
    <world-map v-if="travels.length" :travels="travels"/>
    <travel-timeline v-if="travels.length" :travels="travels"/>
    <b-alert class="m-2 mt-4" :show="error" variant="danger">{{error}}</b-alert>
    <app-footer/>
  </div>
</template>

<script>
import _ from "lodash";
import JQuery from "jquery";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import "vue-flag-icon";

import AppNavigation from "./components/AppNavigation.vue";
import AppFooter from "./components/AppFooter.vue";
import WorldMap from "./components/WorldMap.vue";
import TravelTimeline from "./components/TravelTimeline.vue";

library.add(fas, fab);
const $ = JQuery;

const travelsFilePath = "/travels.json";

export default {
  name: "app",
  components: {
    AppNavigation,
    AppFooter,
    WorldMap,
    TravelTimeline
  },
  data() {
    return {
      error: null,
      travels: []
    };
  },
  computed: {
    travelLinks() {
      const groupedTravels = _.groupBy(this.travels, "status.id");
      const travelLinks = {};
      _.forEach(groupedTravels, (travels, status) => {
        travelLinks[status] =
          "#travel-timeline-item-" +
          _.maxBy(travels, travel => {
            return travel.id;
          }).id;
      });
      return travelLinks;
    }
  },
  mounted() {
    fetch(travelsFilePath)
      .then(response => response.json())
      .then(results => {
        this.initializeTravels(results);
        this.travels = results;
      })
      .catch(error => {
        this.error = "Error while reading data.";
      });
  },
  methods: {
    initializeTravels(travels) {
      if (travels == null) {
        return;
      }
      _.forEach(travels, (travel, index) => {
        this.initializeTravel(travel, index);
      });
    },
    initializeTravel(travel, index) {
      travel.id = index;
      if (travel.dates) {
        travel.dates.from = new Date(travel.dates.from);

        if (travel.dates.to) {
          travel.dates.to = new Date(travel.dates.to);
        }
        const today = new Date();
        if (today > travel.dates.to) {
          travel.status = {
            id: "visited",
            label: "Visited",
            mapLabel: "(visited)",
            icon: "check-circle"
          };
        } else if (
          today >= travel.dates.from &&
          (travel.dates.to == null || today <= travel.dates.to)
        ) {
          travel.status = {
            id: "current",
            label: "Current destination",
            mapLabel: "(current destination)",
            icon: "map-marker"
          };
        } else if (today < travel.dates.from) {
          travel.status = {
            id: "next",
            label: "Next destination",
            mapLabel: "(next destination)",
            icon: "bookmark"
          };
        } else {
          travel.status = {
            id: "unvisited",
            label: "Unvisited"
          };
        }
      } else {
        travel.status = {
          id: "home",
          label: "Home",
          mapLabel: "(home)",
          icon: "home"
        };
      }
    },
    onClickToScroll(event) {
      event.preventDefault();

      const element = $(
        $(event.target)
          .closest("a")
          .attr("href")
      );
      $("body, html").animate(
        {
          scrollTop: element.offset().top
        },
        800
      );

      return false;
    }
  }
};
</script>
