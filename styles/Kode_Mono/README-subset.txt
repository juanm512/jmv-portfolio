KodeMono-latin-400-600.woff2 is generated from KodeMono-VariableFont_wght.ttf:
fontTools instancer limits the wght axis to 400-600 (the only weights the
site uses) and the subsetter keeps the latin range next/font uses plus the
arrows/keycap glyphs (U+2190-2193, U+21B5, U+2318, U+232B, U+2026).
Regenerate with fontTools + brotli if the source font changes.
