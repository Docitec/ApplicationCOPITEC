import os
import ast
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
TARGET_DIRS = ["models", "schemas", "routers", "tests"]
REPORT_PATH = BASE_DIR / "reports" / "audit_report.txt"

def extract_classes_and_imports(file_path):
    classes, imports = [], []
    with open(file_path, "r", encoding="utf-8") as f:
        try:
            tree = ast.parse(f.read(), filename=file_path)
            for node in ast.walk(tree):
                if isinstance(node, ast.ClassDef):
                    classes.append(node.name)
                elif isinstance(node, ast.ImportFrom):
                    if node.module:
                        imports.append(node.module)
        except SyntaxError:
            return [], []
    return classes, imports

def scan_project():
    report = []
    report.append("🎯 Project Coherence Audit Report")
    report.append(f"📁 Base directory: {BASE_DIR}")
    report.append("")

    for target in TARGET_DIRS:
        folder = BASE_DIR / "app" / target if target != "tests" else BASE_DIR / "tests"
        if not folder.exists():
            continue

        report.append(f"🔍 Scanning: {folder}")
        for py_file in folder.rglob("*.py"):
            classes, imports = extract_classes_and_imports(py_file)
            report.append(f"\n📄 File: {py_file.relative_to(BASE_DIR)}")
            if classes:
                report.append("  - Classes:")
                for cls in classes:
                    report.append(f"    • {cls}")
            if imports:
                report.append("  - Imports:")
                for imp in imports:
                    report.append(f"    • {imp}")
        report.append("")

    return "\n".join(report)

def save_report(content):
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(REPORT_PATH, "w", encoding="utf-8") as f:
        f.write(content)

if __name__ == "__main__":
    print("🚀 Running audit...")
    report = scan_project()
    save_report(report)
    print(f"✅ Audit saved to {REPORT_PATH}")
