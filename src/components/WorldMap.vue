<template>
  <div id="world-map" class="world-map">
    <div id="world-map-content" class="world-map-content"></div>
  </div>
</template>

<script>
import _ from "lodash";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4theme from "@amcharts/amcharts4/themes/animated";
import am4geodataWorldLow from "@amcharts/amcharts4-geodata/worldLow";

am4core.useTheme(am4theme);

const colors = {
  country: {
    unvisited: "#EBF7D4",
    home: "#5A781E",
    visited: "#98CA32",
    current: "#5A18C9",
    next: "#FC7307"
  },
  city: {
    border: "#FFFFFF",
    home: "#0F061F",
    visited: "#5A781E",
    current: "#350E79",
    next: "#9A4402"
  },
  line: {
    previous: "#5A781E",
    next: "#FEAD6F"
  }
};

export default {
  name: "world-map",
  props: {
    travels: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      map: null
    };
  },
  computed: {
    countries() {
      return _.map(this.travels, travel => {
        return {
          id: travel.country.id,
          name: travel.country.name,
          status: travel.status,
          fill: this.getCountryColorFromStatus(travel.status)
        };
      });
    },
    cities() {
      return _.map(this.travels, travel => {
        return {
          countryName: travel.country.name,
          name: travel.city.name,
          latitude: travel.city.latitude,
          longitude: travel.city.longitude,
          status: travel.status,
          fill: this.getCityColorFromStatus(travel.status)
        };
      });
    },
    previousLine() {
      const previousTravels = _.filter(this.travels, travel => {
        return _.includes(["home", "visited", "current"], travel.status.id);
      });
      return this.getLineFromTravels(previousTravels);
    },
    nextLine() {
      const nextTravels = _.filter(this.travels, travel => {
        return _.includes(["current", "next"], travel.status.id);
      });
      return this.getLineFromTravels(nextTravels);
    }
  },
  watch: {
    travels() {
      this.disposeMap();
      this.createMap();
    }
  },
  mounted() {
    this.disposeMap();
    this.createMap();
  },
  destroyed() {
    this.disposeMap();
  },
  methods: {
    getCountryColorFromStatus(status) {
      switch (status.id) {
        case "home":
          return colors.country.home;
        case "visited":
          return colors.country.visited;
        case "current":
          return colors.country.current;
        case "next":
          return colors.country.next;
        default:
          return colors.country.unvisited;
      }
    },
    getCityColorFromStatus(status) {
      switch (status.id) {
        case "home":
          return colors.city.home;
        case "visited":
          return colors.city.visited;
        case "current":
          return colors.city.current;
        case "next":
          return colors.city.next;
      }
    },
    getLineFromTravels(travels) {
      return _.map(travels, travel => {
        return {
          latitude: travel.city.latitude,
          longitude: travel.city.longitude
        };
      });
    },
    addCountriesToMap(map) {
      const polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;
      polygonSeries.exclude = ["AQ"];

      const countryData = this.countries;
      polygonSeries.data = JSON.parse(JSON.stringify(countryData));

      const polygonSeriesTemplate = polygonSeries.mapPolygons.template;
      polygonSeriesTemplate.tooltipText = "{name} {status.mapLabel}";
      polygonSeriesTemplate.fill = am4core.color(colors.country.unvisited);
      polygonSeriesTemplate.propertyFields.fill = "fill";

      this.addZoomToTraveledCountries(map, polygonSeries, countryData);
    },
    addCitiesToMap(map) {
      var imageSeries = map.series.push(new am4maps.MapImageSeries());
      imageSeries.data = JSON.parse(JSON.stringify(this.cities));

      var imageSeriesTemplate = imageSeries.mapImages.template;
      imageSeriesTemplate.propertyFields.latitude = "latitude";
      imageSeriesTemplate.propertyFields.longitude = "longitude";

      var circle = imageSeriesTemplate.createChild(am4core.Circle);
      circle.radius = 4;
      circle.propertyFields.fill = "fill";
      circle.stroke = am4core.color(colors.city.border);
      circle.strokeWidth = 1;
      circle.nonScaling = true;
      circle.tooltipText = "{name}, {countryName} {status.mapLabel}";
    },
    addLineToMap(map, line, color) {
      const lineSeries = map.series.push(new am4maps.MapLineSeries());
      lineSeries.data = [
        {
          multiGeoLine: [line]
        }
      ];

      const lineSeriesTemplate = lineSeries.mapLines.template;
      lineSeriesTemplate.line.strokeWidth = 1;
      lineSeriesTemplate.line.stroke = am4core.color(color);
    },
    addResetButtonToMap(map) {
      var button = map.chartContainer.createChild(am4core.Button);
      button.padding(0, 0, 20, 0);
      button.width = 30;
      button.height = 30;
      button.label.text = "-";
      button.align = "left";
      button.valign = "top";
      button.marginLeft = 5;
      button.marginTop = 5;
      button.events.on("hit", () => {
        map.goHome();
      });

      return button;
    },
    addTargetButtonToMap(map) {
      var button = map.chartContainer.createChild(am4core.Button);
      button.padding(0, 0, 20, 0);
      button.width = 30;
      button.height = 30;
      button.label.text = "+";
      button.align = "left";
      button.valign = "top";
      button.marginLeft = 40;
      button.marginTop = 5;

      return button;
    },
    addZoomToTraveledCountries(map, polygonSeries, countryData) {
      var countryIds = _.map(countryData, country => country.id);
      const targetButton = this.addTargetButtonToMap(map);

      targetButton.events.on("hit", event => {
        let north, south, west, east;

        for (let i = 0; i < countryIds.length; i++) {
          let country = polygonSeries.getPolygonById(countryIds[i]);
          if (north == null || country.north > north) {
            north = country.north;
          }
          if (south == null || country.south < south) {
            south = country.south;
          }
          if (west == null || country.west < west) {
            west = country.west;
          }
          if (east == null || country.east > east) {
            east = country.east;
          }
          country.isActive = true;
        }

        map.zoomToRectangle(north, east, south, west, 1, true);
      });

      map.events.on("ready", event => {
        let north, south, west, east;

        for (let i = 0; i < countryIds.length; i++) {
          let country = polygonSeries.getPolygonById(countryIds[i]);
          if (north == null || country.north > north) {
            north = country.north;
          }
          if (south == null || country.south < south) {
            south = country.south;
          }
          if (west == null || country.west < west) {
            west = country.west;
          }
          if (east == null || country.east > east) {
            east = country.east;
          }
          country.isActive = true;
        }

        map.zoomToRectangle(north, east, south, west, 1, true);
      });
    },
    createMap() {
      const map = am4core.create("world-map-content", am4maps.MapChart);
      map.geodata = am4geodataWorldLow;
      map.projection = new am4maps.projections.Miller();
      map.seriesContainer.draggable = false;
      map.seriesContainer.resizable = false;
      map.chartContainer.wheelable = false;

      this.addCountriesToMap(map);
      this.addLineToMap(map, this.previousLine, colors.line.previous);
      this.addLineToMap(map, this.nextLine, colors.line.next);
      this.addCitiesToMap(map);

      this.addResetButtonToMap(map);

      this.map = map;
    },
    disposeMap() {
      if (this.map) {
        this.map.dispose();
      }
    }
  }
};
</script>