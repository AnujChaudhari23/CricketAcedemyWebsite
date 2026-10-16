#!/usr/bin/env python3
"""check_contrast.py — WCAG contrast ratio checker.

Usage:
    python check_contrast.py "#ffffff" "#0a0a0a"
    python check_contrast.py --file styles.css --pairs
Exit 0 if all pass, 1 if any fail.
"""
import sys
import re
import argparse
from pathlib import Path

AA_BODY = 4.5
AA_LARGE = 3.0

def hex_to_rgb(hex_str):
    h = hex_str.lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    if len(h) != 6:
        raise ValueError(f"Invalid hex color: {hex_str}")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))

def relative_luminance(rgb):
    def channel(c):
        s = c / 255.0
        return s / 12.92 if s <= 0.03928 else ((s + 0.055) / 1.055) ** 2.4
    r, g, b = (channel(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def contrast_ratio(hex1, hex2):
    l1 = relative_luminance(hex_to_rgb(hex1))
    l2 = relative_luminance(hex_to_rgb(hex2))
    lighter, darker = max(l1, l2), min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)

def check_pair(fg, bg, label="", size="body"):
    try:
        ratio = contrast_ratio(fg, bg)
    except ValueError as e:
        return False, 0, f"ERROR: {e}"
    threshold = AA_LARGE if size == "large" else AA_BODY
    passed = ratio >= threshold
    status = "PASS" if passed else "FAIL"
    return passed, ratio, f"{status}  {label or f'{fg} on {bg}'}  {ratio:.2f}:1  (need {threshold}:1)"

def extract_colors(path):
    text = Path(path).read_text(encoding="utf-8", errors="ignore")
    return set(m.group(0).lower() for m in re.finditer(r"#[0-9a-fA-F]{3,6}\b", text))

def main():
    parser = argparse.ArgumentParser(description="WCAG contrast checker")
    parser.add_argument("colors", nargs="*", help="Two hex colors: fg bg")
    parser.add_argument("--file", "-f", help="CSS or HTML file to scan")
    parser.add_argument("--pairs", action="store_true", help="Check all pairs in a file")
    parser.add_argument("--large", action="store_true", help="Treat text as large")
    args = parser.parse_args()

    if args.file and args.pairs:
        colors = sorted(extract_colors(args.file))
        if len(colors) < 2:
            print(f"Only {len(colors)} color(s) found. Nothing to compare.")
            return 0
        if len(colors) > 20:
            print(f"Too many colors ({len(colors)}). Narrow to a token file.")
            return 1
        print(f"Checking {len(colors)} colors from {args.file}...\n")
        failures = 0
        for i, a in enumerate(colors):
            for b in colors[i + 1:]:
                passed, _, msg = check_pair(a, b, size="large" if args.large else "body")
                if not passed:
                    failures += 1
                print(f"  {msg}")
        print(f"\n{failures} failing pair(s).")
        return 0 if failures == 0 else 1

    if args.file:
        colors = sorted(extract_colors(args.file))
        print(f"Colors found in {args.file}:\n  " + "\n  ".join(colors))
        print("\nRun with --pairs to check all combinations.")
        return 0

    if len(args.colors) != 2:
        parser.print_help()
        return 1

    passed, _, msg = check_pair(args.colors[0], args.colors[1],
                                 size="large" if args.large else "body")
    print(msg)
    return 0 if passed else 1

if __name__ == "__main__":
    sys.exit(main())
