import fs from 'fs';

fs.truncate('example.txt', 100, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('File truncated. All OK!');
    }
});
