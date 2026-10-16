#!/usr/bin/env python3
"""audit_page.py — Accessibility and quality floor checks.

Usage:
    python audit_page.py index.html
    python audit_page.py index.html --css styles.css --json
Exit 0 if all pass, 1 if any fail.
"""
import sys
import re
import json
import argparse
from pathlib import Path

CHECKS = []

def check(name):
    def wrap(fn):
        CHECKS.append((name, fn))
        return fn
    return wrap

@check("alt-text")
def check_alt(html, css):
    return [f"<img> without alt: {m.group(0)[:80]}..."
            for m in re.finditer(r"<img\b[^>]*>", html, re.IGNORECASE)
            if "alt=" not in m.group(0).lower()]

@check("form-labels")
def check_labels(html, css):
    issues = []
    for m in re.finditer(r"<input\b[^>]*>", html, re.IGNORECASE):
        tag = m.group(0).lower()
        if 'type="hidden"' in tag or 'type="submit"' in tag:
            continue
        if "aria-label" not in tag and "id=" not in tag:
            issues.append(f"<input> without id or aria-label: {m.group(0)[:80]}...")
    return issues

@check("focus-visible")
def check_focus(html, css):
    combined = html + "\n" + css
    if re.search(r"outline\s*:\s*none", combined, re.IGNORECASE):
        if not re.search(r":focus(-visible)?\s*\{[^}]*(box-shadow|outline|border)", combined, re.IGNORECASE):
            return ["outline:none without a :focus-visible replacement"]
    return []

@check("reduced-motion")
def check_reduced_motion(html, css):
    combined = html + "\n" + css
    if re.search(r"(@keyframes|transition\s*:|animation\s*:)", combined, re.IGNORECASE) \
       and not re.search(r"prefers-reduced-motion", combined, re.IGNORECASE):
        return ["Motion present but no @media (prefers-reduced-motion) rule"]
    return []

@check("lang-attribute")
def check_lang(html, css):
    m = re.search(r"<html\b[^>]*>", html, re.IGNORECASE)
    if m and "lang=" not in m.group(0).lower():
        return ["<html> missing lang attribute"]
    return []

@check("heading-structure")
def check_headings(html, css):
    issues = []
    h1s = re.findall(r"<h1\b", html, re.IGNORECASE)
    if len(h1s) == 0:
        issues.append("No <h1> on the page")
    elif len(h1s) > 1:
        issues.append(f"{len(h1s)} <h1> elements (should be exactly 1)")
    levels = [int(m) for m in re.findall(r"<h([1-6])\b", html, re.IGNORECASE)]
    for i in range(1, len(levels)):
        if levels[i] - levels[i - 1] > 1:
            issues.append(f"Heading jump h{levels[i-1]} -> h{levels[i]}")
            break
    return issues

@check("touch-targets")
def check_touch_targets(html, css):
    combined = html + "\n" + css
    issues = []
    for m in re.finditer(r"(width|height|min-width|min-height)\s*:\s*(\d+)px", combined, re.IGNORECASE):
        value = int(m.group(2))
        if 0 < value < 44:
            context = combined[max(0, m.start() - 100):m.start()]
            if re.search(r"(btn|button|control|tap|target|icon-btn)", context, re.IGNORECASE):
                issues.append(f"Possible undersized touch target: {m.group(0)}")
    return issues

@check("colour-budget")
def check_colour_budget(html, css):
    colours = set(m.group(0).lower() for m in re.finditer(r"#[0-9a-fA-F]{6}\b", css))
    if len(colours) > 8:
        return [f"{len(colours)} distinct hex colours in CSS — check the 3-decorative-role budget"]
    return []

@check("token-usage")
def check_tokens(html, css):
    return [f"Raw hex in inline style: {m.group(0)[:60]}..."
            for m in re.finditer(r'style\s*=\s*["\'][^"\']*#[0-9a-fA-F]{3,6}', html, re.IGNORECASE)]

def run_checks(html_path, css_path=None, as_json=False):
    html = Path(html_path).read_text(encoding="utf-8", errors="ignore")
    css = Path(css_path).read_text(encoding="utf-8", errors="ignore") if css_path else ""
    results = {}
    total = 0
    for name, fn in CHECKS:
        issues = fn(html, css)
        results[name] = issues
        total += len(issues)
    if as_json:
        print(json.dumps(results, indent=2))
    else:
        print(f"Audit: {html_path}" + (f" + {css_path}" if css_path else ""))
        print("=" * 60)
        for name, issues in results.items():
            if not issues:
                print(f"  PASS  {name}")
            else:
                print(f"  FAIL  {name}")
                for issue in issues:
                    print(f"          - {issue}")
        print("=" * 60)
        print(f"{total} issue(s) found.")
    return 0 if total == 0 else 1

def main():
    parser = argparse.ArgumentParser(description="Accessibility audit")
    parser.add_argument("html")
    parser.add_argument("--css")
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()
    return run_checks(args.html, args.css, args.json)

if __name__ == "__main__":
    sys.exit(main())
