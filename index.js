/**
 *  main():  Main code.
 */

const app = new (require('./server/App'))();

app.initialize();
app.start();
