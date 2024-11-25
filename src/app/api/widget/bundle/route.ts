// import { exec } from 'child_process';
// import fs from 'fs';
// import path from 'path';
// import { NextRequest, NextResponse } from 'next/server';

// // Helper function to run commands
// const runCommand = (command: string): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         exec(command, (error, stdout, stderr) => {
//             if (error) {
//                 return reject(new Error(stderr || error.message));
//             }
//             resolve(stdout);
//         });
//     });
// };

// // Helper function to read directory files
// const readDirectory = (directoryPath: string): Promise<string[]> => {
//     return new Promise((resolve, reject) => {
//         fs.readdir(directoryPath, (err, files) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(files);
//         });
//     });
// };

// // Handler for POST requests
// export async function POST(req: NextRequest) {
//     try {
//         // Run the Webpack bundling command
//         await runCommand('npx webpack --config webpack.config.js');

//         // Locate the generated file in the public/dist folder
//         const distPath = path.resolve('./public/dist');
//         const files = await readDirectory(distPath);
//         const widgetFile = files.find((file) => file.startsWith('widget-builder'));

//         if (!widgetFile) {
//             return NextResponse.json(
//                 { error: 'Bundling succeeded but no output file found' },
//                 { status: 500 }
//             );
//         }

//         return NextResponse.json({
//             message: `Bundling completed: ${widgetFile}`,
//         });
//     } catch (error) {
//         console.error(`Bundling error: ${error}`);
//         return NextResponse.json(
//             { error: 'Bundling failed', details: (error as Error).message },
//             { status: 500 }
//         );
//     }
// }

// // Reject other HTTP methods
// export function GET() {
//     return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
// }

















import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Helper function to run commands
const runCommand = (command: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                return reject(new Error(stderr || error.message));
            }
            resolve(stdout);
        });
    });
};

// Helper function to check if a directory exists
const directoryExists = (directoryPath: string): Promise<boolean> => {
    return new Promise((resolve) => {
        fs.access(directoryPath, fs.constants.F_OK, (err) => {
            resolve(!err);
        });
    });
};

// Helper function to delete a directory
const deleteDirectory = (directoryPath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        exec(`npx rimraf ./public/dist`, (error, stdout, stderr) => {
            if (error) {
                console.error('Error deleting directory:', stderr || error.message);
                return reject(new Error(stderr || error.message));
            }
            console.log(`Directory deleted: ${directoryPath}`);
            resolve();
        });
    });
};

// Helper function to read directory files
const readDirectory = (directoryPath: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                return reject(err);
            }
            resolve(files);
        });
    });
};

// Handler for POST requests
export async function POST(req: NextRequest) {
    try {
        const distPath = path.resolve('./public/dist');

        // Check if the /dist folder exists
        const distExists = await directoryExists(distPath);

        if (distExists) {
            // Delete the /dist folder
            console.log('Deleting existing /dist folder...');
            await deleteDirectory(distPath);
            console.log('/dist folder deleted.');
        }

        // Run the Webpack bundling command
        console.log('Running Webpack bundling...');
        await runCommand('npx webpack --config webpack.config.js');

        // Locate the generated file in the public/dist folder
        const files = await readDirectory(distPath);
        const widgetFile = files.find((file) => file.startsWith('widget-builder'));

        if (!widgetFile) {
            return NextResponse.json(
                { error: 'Bundling succeeded but no output file found' },
                { status: 500 }
            );
        }
        console.log('completed Webpack bundling...');
        return NextResponse.json({
            message: `Bundling completed: ${widgetFile}`,
        });
    } catch (error) {
        console.error(`Bundling error: ${error}`);
        return NextResponse.json(
            { error: 'Bundling failed', details: (error as Error).message },
            { status: 500 }
        );
    }
}

// Reject other HTTP methods
export function GET() {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
