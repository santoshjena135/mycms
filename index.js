const express = require("express");
const bodyParser = require('body-parser');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.static('content'));
app.use(express.static('admin'));
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'core', 'templates'));
app.use(bodyParser.json());

// ----------------- ROUTES --------------------

app.post('/createpage', (req, res) => {
    const { fname, dirPath, templateName } = req.body; 
    if (!fname || !dirPath || !templateName) {
        return res.status(400).json({ success: false, message: 'Missing fname or dirPath or templateName' });
    }
    const templatePath = path.join(__dirname, 'core/templates', templateName + '.ejs');
    const filePath = path.join(__dirname, dirPath, fname + '.html');
    if(fs.existsSync(filePath)){
        return res.status(500).json({ success: false, message: 'Error creating page', errorDetails: 'File already exists!' });
    }
    const data = {
        title: fname,
        content: `This is the content for ${fname}.`
    };

    ejs.renderFile(templatePath, data, (err, str) => {
        if (err) {
            console.error('Error rendering template:', err);
            if (typeof callback === 'function') {
                return callback({ success: false, message: 'Error rendering template' });
            }
        }
        fs.writeFile(filePath, str, (err) => {
            if (err) {
                console.error('Error creating HTML file:', err);
                return res.status(500).json({ success: false, message: 'Error creating page', errorDetails: err.message });
                
            }
            console.log('HTML file created:', filePath);
            return res.json({ success: true, message: 'Page created successfully' });
            
        });
    });
});

app.listen(3000,()=>{
    console.log("Server Running at 3000!");
})