const fs = require('fs');
const path = require('path');

// Path to the ingredients list file
const filePath = path.join(__dirname, 'ingredients_list.txt');

// Read the file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Split the data into lines
    const lines = data.split('\n');

    // Start the SQL statement
    let sql = "INSERT INTO INGREDIENTS (ID, NAME) VALUES\n";

    // Generate INSERT statements for each line
    lines.forEach((line, index) => {
        if (line.trim() !== '') {
            // Escape single quotes in the ingredient name
            const ingredient = line.replace(/'/g, "''");
            sql += `(${index + 1}, '${ingredient}')`;

            // Add a comma after each line except the last one
            if (index !== lines.length - 1) {
                sql += ',\n';
            } else {
                sql += ';\n';
            }
        }
    });

    // Output the SQL statement
    console.log(sql);

    // Optionally, write the SQL statement to a file
    const outputFilePath = path.join(__dirname, 'insert_ingredients.sql');
    fs.writeFile(outputFilePath, sql, (err) => {
        if (err) {
            console.error('Error writing the SQL file:', err);
        } else {
            console.log('SQL file has been saved.');
        }
    });
});
