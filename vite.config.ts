import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs-extra'

// Copy USWDS assets to public folder
async function copyAssets() {
    try {
        await fs.copy(
            path.resolve(__dirname, 'node_modules/@uswds/uswds/dist/img/sprite.svg'),
            path.resolve(__dirname, 'public/assets/img/sprite.svg')
        );
        await fs.copy(
            path.resolve(__dirname, 'node_modules/@uswds/uswds/dist/fonts/source-sans-pro/sourcesanspro-regular-webfont.woff2'),
            path.resolve(__dirname, 'public/assets/fonts/sourcesanspro-regular-webfont.woff2')
        );
        await fs.copy(
            path.resolve(__dirname, 'node_modules/@uswds/uswds/dist/fonts/public-sans/PublicSans-Regular.woff2'),
            path.resolve(__dirname, 'public/assets/fonts/public-sans-regular.woff2')
        );
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