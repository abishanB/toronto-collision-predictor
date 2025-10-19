import numpy as np
import pandas as pd
from sklearn.neighbors import KernelDensity
import folium

# Center map roughly on Toronto
m = folium.Map(location=[43.7, -79.4], zoom_start=12)

# Add a click listener to show coordinates
m.add_child(folium.LatLngPopup())

m
