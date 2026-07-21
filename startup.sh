#!/bin/bash
# Startup script for serving static HTML site on Linux App Service

# Change to the app directory
cd /home/site/wwwroot

# Start a simple HTTP server on port 8080 (App Service on Linux expects port 8080)
python3 -m http.server 8080 --bind 0.0.0.0