# QualityLogic QA Sample

**Covers the JD points**  
- Object-oriented coding with **TypeScript** (Page-Object Model) and **Python** (pytest).  
- **Playwright** end-to-end tests (UI) + **API** tests.  
- Basic **load testing** via **k6**.  
- CI via **GitHub Actions**, parallel cross-browser runs.  
- Clean, maintainable structure and docs.


## CI Results
**All tests (Playwright TS, Python, and k6) are configured in GitHub Actions.**
- ✅ Playwright UI + API (TypeScript)
- ✅ Python Playwright + requests
- ✅ k6 smoke load test


## Run locally

### Playwright (TypeScript)
```bash
npm install
npm run install:browsers
npm test
npm run report
```

### Python + Playwright
```bash
pip install -r python/requirements.txt
python -m playwright install
pytest -q python
```

### k6 smoke
```bash
k6 run load/smoke.js
```

## Notes
- UI targets Playwright's public demo (`demo.playwright.dev`) to avoid credentials.
- API targets `reqres.in` (public test API).
- Artifacts (traces/screenshots/videos) retained on failure.
