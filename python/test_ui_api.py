import re
import requests
import pytest
from playwright.sync_api import sync_playwright, expect

def test_ui_flow():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(base_url="https://demo.playwright.dev")
        page.goto("/todomvc", wait_until="domcontentloaded")
        # H1 tolerant: 'todos' or 'TodoMVC'
        h1 = page.get_by_role('heading', level=1)
        expect(h1).to_have_text(re.compile(r'todos?', re.I))
        # Ensure input exists
        expect(page.get_by_placeholder("What needs to be done?")).to_be_visible()
        # Add two items
        inp = page.get_by_placeholder("What needs to be done?")
        for item in ["Write tests", "Ship"]:
            inp.fill(item); inp.press("Enter")
        assert page.locator(".todo-list li").count() == 2
        browser.close()

def test_api_reqres():
    try:
        r = requests.get("https://reqres.in/api/users", params={"page": 2}, timeout=20)
    except requests.RequestException:
        pytest.skip("Network hiccup in CI")
    if r.status_code == 429:
        pytest.skip("Rate limited in CI")
    assert r.status_code == 200
    assert isinstance(r.json().get("data", []), list)
