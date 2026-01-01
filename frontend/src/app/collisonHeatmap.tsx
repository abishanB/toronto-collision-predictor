import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

interface CollisonHeatmapProps {
  map: mapboxgl.Map | null;
  showHeatmap: boolean;
}

const CollisonHeatmap = ({ map, showHeatmap }: CollisonHeatmapProps) => {
  useEffect(() => {
    if (!map) return;

    const addHeatmapLayers = () => {
      // Avoid re-adding if the style reloads
      if (map.getSource("collisions")) return;

      fetch("/collisions.geojson")
        .then((response) => response.json())
        .then((data) => {
          if (!map.getSource("collisions")) {
            map.addSource("collisions", {
              type: "geojson",
              data,
            });

            map.addLayer({
              id: "collisions-heat",
              type: "heatmap",
              source: "collisions",
              layout: { visibility: "visible" },
              paint: {
                "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 0.01, 15, 0.15],
                "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 1, 10, 10],
                "heatmap-color": [
                  "interpolate",
                  ["linear"],
                  ["heatmap-density"],
                  0.00, "rgba(33,102,172,0)",
                  0.05, "rgb(103,169,207)",
                  0.15, "rgb(209,229,240)",
                  0.35, "rgb(253,219,199)",
                  0.65, "rgb(239,138,98)",
                  1.00, "rgb(178,24,43)"
                ],
                "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 16, 0],
              },
            });

            // Circles help when zoomed in close to the collisions
            map.addLayer({
              id: "collisions-point",
              type: "circle",
              source: "collisions",
              minzoom: 14,
              paint: {
                "circle-radius": ["interpolate", ["linear"], ["zoom"], 14, 3, 18, 6],
                "circle-color": "rgba(178, 24, 43, 0.7)",
                "circle-stroke-color": "#ffffff",
                "circle-stroke-width": 1
              }
            });
          }
        })
        .catch((error) => console.error("Error loading collisions GeoJSON:", error));
    };

    if (map.isStyleLoaded()) {
      addHeatmapLayers();
    } else {
      map.once("load", addHeatmapLayers);
    }
  }, [map]);

  useEffect(() => {
    if (!map) return;
    const heatmapLayer = map.getLayer("collisions-heat");
    const pointLayer = map.getLayer("collisions-point");
    if (!heatmapLayer || !pointLayer) return;

    const visibility = showHeatmap ? "visible" : "none";
    map.setLayoutProperty("collisions-heat", "visibility", visibility);
    map.setLayoutProperty("collisions-point", "visibility", visibility);
  }, [map, showHeatmap]);

  return null;
};

export default CollisonHeatmap;
