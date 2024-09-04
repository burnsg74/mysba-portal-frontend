import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs-extra'

// Font: Source Sans Pro
const sourceSansProVariants = [
    "black",
    "blackitalic",
    "bold",
    "bolditalic",
    "extralight",
    "extralightitalic",
    "italic",
    "light",
    "lightitalic",
    "regular",
    "semibold",
    "semibolditalic"
];

// Public Sans
const publicSansVariants = [
    'Black',
    'BlackItalic',
    'Bold',
    'BoldItalic',
    'ExtraBold',
    'ExtraBoldItalic',
    'ExtraLight',
    'ExtraLightItalic',
    'Italic',
    'Light',
    'LightItalic',
    'Medium',
    'MediumItalic',
    'Regular',
    'SemiBold',
    'SemiBoldItalic',
    'Thin',
    'ThinItalic',
];

// Copy USWDS assets to public folder
async function copyAssets() {
    try {
        await fs.copy(
            path.resolve(__dirname, 'node_modules/@uswds/uswds/dist/img/sprite.svg'),
            path.resolve(__dirname, 'public/assets/img/sprite.svg')
        );

        sourceSansProVariants.map(async (variant) => {
            await fs.copy(
              path.resolve(__dirname, 'node_modules/@uswds/uswds/dist/fonts/source-sans-pro/sourcesanspro-' + variant + '-webfont.woff2'),
              path.resolve(__dirname, 'public/assets/fonts/sourcesanspro-' + variant + '-webfont.woff2')
            );
        });

        publicSansVariants.map(async (variant) => {
            await fs.copy(
              path.resolve(__dirname, 'node_modules/@uswds/uswds/dist/fonts/public-sans/PublicSans-' + variant + '.woff2'),
              path.resolve(__dirname, 'public/assets/fonts/public-sans-' + variant.toLowerCase() + '.woff2')
            );
        });

        await fs.copy(
          path.resolve(__dirname, "mock-data"),
          path.resolve(__dirname, "public/mock-data"));

        console.log("File copy was successful!")
    } catch (error) {
        console.error("Error occurred while copying file: ", error)
    }
}

copyAssets();

export default defineConfig({
    plugins: [
        react()
    ],
    resolve: {
        alias: {
            'src': path.resolve(__dirname, './src')
        }
    },
});