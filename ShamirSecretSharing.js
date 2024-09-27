const fs = require('fs');

// Function to decode a value from a given base
function decodeValue(base, value) {
    return parseInt(value, parseInt(base));
}

// Lagrange Interpolation to find the constant term 'c'
function lagrangeInterpolation(points, k) {
    let c = 0; // Constant term

    for (let i = 0; i < k; i++) {
        let xi = points[i].x;
        let yi = points[i].y;

        let li = 1; // Lagrange basis polynomial L_i(x)
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                li *= (0 - points[j].x) / (xi - points[j].x); // Using x=0 to find constant term
            }
        }

        c += li * yi; // Add contribution to the constant term
    }

    return c;
}

// Main function to read input and process data
function main() {
    // Read JSON input
    const jsonInput = fs.readFileSync('input.json', 'utf-8');
    const data = JSON.parse(jsonInput);
    const n = data.keys.n;
    const k = data.keys.k;

    let points = [];

    // Print available keys for debugging
    console.log("Available keys in the input data:", Object.keys(data));

    // Decode Y values and prepare points array
    for (let i = 1; i <= n; i++) {
        if (data[i]) { // Check if the key exists
            const base = data[i].base;
            const value = data[i].value;
            const y = decodeValue(base, value);
            const x = i; // Use the index as x
            points.push({ x, y });
        } else {
            console.error(`Key ${i} not found in input data.`);
        }
    }

    // Only use the first k points for interpolation
    if (points.length < k) {
        console.error(`Not enough points available for interpolation. Expected ${k}, got ${points.length}.`);
        return;
    }

    // Calculate the secret constant 'c' using Lagrange interpolation
    const c = lagrangeInterpolation(points.slice(0, k), k);
    console.log(`Constant term c: ${c}`);
}

// Run the main function
main();
