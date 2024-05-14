const fs = require('fs');
const { Transform, pipeline } = require('stream');  

const csvToJsonTransform = new Transform({
  readableObjectMode: true,   // Set readableObjectMode to true for input objects
  writableObjectMode: true,
  // Convert the chunk (CSV row) to JSON object
  transform(chunk, encoding, callback) {
       const row = chunk.toString().trim().split(',');
    const jsonrow = { 
      index: parseInt(row[0], 10),   // Convert index to integer
      customerId: row[1],
      firstName: row[2],
      lastName: row[3],
      company: row[4],
       city: row[5],
       country: row[6],
      phone1: row[7],
       phone2: row[8],
      email: row[9],
       subscriptionDate: row[10],
      website: row[11],
    };
    this.push(JSON.stringify(jsonrow) + '\n');   // Pushing JSON object to the output stream
    callback();
  },
});

const inputStream = fs.createReadStream('customers-100000.csv', 'utf8');
const outputStream = fs.createWriteStream('customers.json');    // as you told me to make the two files and i made these two

pipeline(   // and i am using the pipeline to use stream the data from one file to another file//
  inputStream,
  csvToJsonTransform,
  outputStream,
  (err) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('csv file converted to json successfully!');    // this will create the json file 
    }
  }
);


// i use the websites like - >  node documentation and stackoverflow 