import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n[\u{1F512}] CorpAuth Challenge\n---------------------------`);
  console.log(`Server listening on port ${PORT}`);
  console.log(`DB URL: ${process.env.DATABASE_URL.split('@')[1] || 'localhost'}`);
  console.log(`Ready for security audit.\n`);
});
