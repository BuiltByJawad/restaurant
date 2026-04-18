# Replit Agent Skills Repository

## Overview
This repository contains the skill definitions and templates used by the Replit AI Agent. Skills are Markdown files that guide the agent in performing specialized tasks.

## Structure
- `.local/skills/` — Core agent capabilities (canvas, database, deployment, design, workflows, etc.)
- `.local/secondary_skills/` — Domain-specific skills (ad-creative, meal-planner, real-estate-analyzer, etc.)
- `.local/mcp_skills/` — MCP server integrations (Figma)
- `.local/state/` — Agent persistence data
- `index.html` — Landing page for the repository

## Running
The project serves a static landing page via Python's built-in HTTP server on port 5000.

**Workflow:** `python3 -m http.server 5000`

## Deployment
Configured as a static deployment with the root directory as the public directory.
