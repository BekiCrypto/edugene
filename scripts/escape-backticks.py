"""
Properly escape inline backticks inside template literals.

State machine:
- "code": outside any template literal
- "template": inside a template literal, NOT inside inline code
- "inline": inside a template literal AND inside an inline code span

Transitions:
- "code" → "template": when we see `: ` + ` (start of template literal)
- "template" + see `:
    - Look ahead. If next non-whitespace is `,`, this is the template close → back to "code"
    - Otherwise, this is an inline code open → escape as \`, go to "inline"
- "inline" + see `:
    - This is an inline code close → escape as \`, go to "template"
"""
from pathlib import Path

TOPIC_FILES = [
    "/home/z/my-project/scripts/seed-data/topics/math.ts",
    "/home/z/my-project/scripts/seed-data/topics/english.ts",
    "/home/z/my-project/scripts/seed-data/topics/science.ts",
    "/home/z/my-project/scripts/seed-data/topics/social.ts",
    "/home/z/my-project/scripts/seed-data/topics/computing.ts",
]

def find_template_open(text, start):
    """Find next position where a template literal opens (pattern `: ` + backtick)."""
    i = start
    while i < len(text) - 2:
        if text[i] == ':' and text[i+1] in ' \t\n':
            # Skip whitespace
            j = i + 1
            while j < len(text) and text[j] in ' \t\n':
                j += 1
            if j < len(text) and text[j] == '`':
                # Make sure this backtick is not already escaped (no \ before it)
                # Actually in the original source, opening backticks are never escaped.
                return j
        i += 1
    return -1

def find_template_close(text, start):
    """From position `start` (just after the opening backtick), find the matching
    closing backtick using the state machine."""
    state = "template"  # we just entered the template literal
    i = start
    while i < len(text):
        c = text[i]
        # Handle escape: \X — output as-is, skip next
        if c == '\\' and i + 1 < len(text):
            i += 2
            continue
        if c == '`':
            if state == "template":
                # Could be inline code open or template close.
                # Look ahead for next non-whitespace char.
                k = i + 1
                while k < len(text) and text[k] in ' \t':
                    k += 1
                if k < len(text) and text[k] == ',':
                    # Template literal close
                    return i
                else:
                    # Inline code open — escape it
                    state = "inline"
            elif state == "inline":
                # Inline code close — escape it
                state = "template"
        i += 1
    return -1

def escape_inline_backticks(text):
    """Walk through the file, find each template literal, escape all inner backticks."""
    result = []
    i = 0
    while i < len(text):
        open_pos = find_template_open(text, i)
        if open_pos == -1:
            result.append(text[i:])
            break
        # Append everything up to and including the opening backtick
        result.append(text[i:open_pos + 1])
        close_pos = find_template_close(text, open_pos + 1)
        if close_pos == -1:
            # Couldn't find close — just append rest
            result.append(text[open_pos + 1:])
            break
        # Get the inner content and escape backticks (state machine)
        inner = text[open_pos + 1:close_pos]
        # Walk through inner with state machine, escaping inline backticks
        new_inner = []
        state = "template"
        j = 0
        while j < len(inner):
            c = inner[j]
            if c == '\\' and j + 1 < len(inner):
                new_inner.append(inner[j:j+2])
                j += 2
                continue
            if c == '`':
                if state == "template":
                    # Look ahead for next non-whitespace char in inner (or beyond, but
                    # we know close_pos has `,` after it)
                    k = j + 1
                    while k < len(inner) and inner[k] in ' \t':
                        k += 1
                    if k >= len(inner):
                        # We're at the end of inner — close_pos has `,` after it,
                        # so this is the template close. Output as-is.
                        new_inner.append(c)
                    elif inner[k] == ',':
                        # Looks like template close, but we already found close_pos
                        # beyond this point. So this must be an inline code close
                        # followed by `,` — escape it.
                        new_inner.append('\\`')
                        state = "inline"
                    else:
                        # Inline code open — escape
                        new_inner.append('\\`')
                        state = "inline"
                elif state == "inline":
                    # Inline code close — escape
                    new_inner.append('\\`')
                    state = "template"
            else:
                new_inner.append(c)
            j += 1
        result.append(''.join(new_inner))
        # Append the closing backtick
        result.append('`')
        i = close_pos + 1
    return ''.join(result)

for path in TOPIC_FILES:
    p = Path(path)
    original = p.read_text(encoding='utf-8')
    # First, undo any previous bad escaping (replace \` with `)
    unescaped = original.replace('\\`', '`')
    # Now properly escape
    escaped = escape_inline_backticks(unescaped)
    if escaped != original:
        p.write_text(escaped, encoding='utf-8')
        print(f"  ✓ Re-escaped inline backticks in {p.name}")
    else:
        print(f"  · No changes needed in {p.name}")

print("Done.")
