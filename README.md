# Belly Button Biodiversity — Interactive Dashboard (D3 + Plotly)

## Summary

A single-page dashboard that lets you explore the **Belly Button Biodiversity** dataset by **selecting a test subject ID** and viewing their **top 10 microbial OTUs (bar chart)**, **overall composition (bubble chart)**, **washing frequency (gauge)**, and **demographics**. Built with **D3** for data loading/transform and **Plotly** for charts; designed to run as a static page (GitHub Pages ready).

---

## Goal

Make microbiome data **intuitive and explorable** for non-technical users and students—so they can quickly compare individuals, see which microbes are most abundant, and relate **hygiene behavior (wfreq)** and demographics to observed OTUs.

---

## Procedure

1. **Data source**

   * Load `samples.json` (IDs, metadata like `age`, `gender`, `location`, `wfreq`, plus OTU ids/values/labels).
2. **UI scaffold**

   * `index.html` defines a dropdown for **Test Subject ID**, a metadata panel, and three chart containers (`#bar`, `#bubble`, `#gauge`).
3. **App logic**

   * `app.js` initializes the page, populates the dropdown, and registers a change handler.
   * On ID selection, it slices the JSON for that subject, transforms arrays, and renders/updates plots.
4. **Visualization**

   * **Bar chart**: Top 10 OTUs (sorted).
   * **Bubble chart**: All OTUs (marker size = abundance; color = OTU id).
   * **Gauge**: Weekly washing frequency (`wfreq`).
5. **Hosting**

   * Optional `_config.yml` enables Jekyll theme for GitHub Pages. No backend required.

---

## Result

* Fully interactive dashboard: changing the **ID** instantly updates **bar**, **bubble**, **gauge**, and **demographics**.
* Self-contained static app (HTML + JS + JSON) suitable for classroom demos, labs, or portfolio projects.

---

## Business Impact

* **Education & outreach:** Makes abstract microbiome concepts tangible; ideal for workshops or course assignments.
* **Exploratory analysis:** Quick way to spot patterns (e.g., recurring OTUs across individuals) before deeper statistics.
* **Reusable template:** The “dropdown → multi-panel charts” pattern can be adapted to any subject-level dataset.

---

## Next Steps to Make It Better

* **Analytics:** Add diversity indices (e.g., Shannon), correlation summaries, and a trend view if time series is added.
* **UX:** Provide legends, richer tooltips (taxonomy drill), and mobile-first layout tweaks.
* **Controls:** Let users switch x/y variables in the bubble chart; add filtering by taxonomy level or abundance threshold.
* **Performance:** Lazy-load or cache per-subject slices; debounce resize events.
* **Quality:** Validate JSON schema; handle missing `wfreq` gracefully with a neutral gauge state.
* **Engineering:** Split `app.js` into modules (data, charts, controls) and add a lightweight test harness; CI to auto-deploy Pages.

---

## Run Locally

```bash
# serve files to avoid CORS on local JSON
python -m http.server 8000
# then open
http://localhost:8000/index.html
```

## Repository Structure

```
.
├── index.html        # layout: dropdown, metadata panel, bar/bubble/gauge divs
├── app.js            # D3+Plotly logic (load, transform, render, update)
├── samples.json      # subject IDs, metadata (incl. wfreq), OTU arrays
└── _config.yml       # (optional) Pages/Jekyll theme
```
