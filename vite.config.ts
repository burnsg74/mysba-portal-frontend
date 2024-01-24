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