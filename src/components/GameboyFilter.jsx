<svg style={{ display: 'none' }}>
    <defs>
        <filter id="gameboy-dither">
            {/* 1. Grayscale */}
            <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0
                                           0.33 0.33 0.33 0 0
                                           0.33 0.33 0.33 0 0
                                           0 0 0 1 0" />

            {/* 2. Posterize (reduce levels) */}
            <feComponentTransfer>
                <feFuncR type="discrete" tableValues="0 0.33 0.66 1" />
                <feFuncG type="discrete" tableValues="0 0.33 0.66 1" />
                <feFuncB type="discrete" tableValues="0 0.33 0.66 1" />
            </feComponentTransfer>
        </filter>
    </defs>
</svg>
