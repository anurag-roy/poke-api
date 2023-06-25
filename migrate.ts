import ProgressBar from 'https://deno.land/x/progress@v1.3.8/mod.ts';

const URL = 'http://localhost:8000';
const TOTAL_NO_OF_POKEMON = 905;

const title = 'Inserting:';
const progress = new ProgressBar({
  title,
  total: TOTAL_NO_OF_POKEMON,
  clear: true,
});
let completed = 0;

for (let i = 1; i <= TOTAL_NO_OF_POKEMON; i++) {
  await fetch(`${URL}/pokemon/migrate`, {
    method: 'POST',
    body: JSON.stringify({
      id: i,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });
  progress.render(completed++);
}

progress.end();
console.log('Inserted all pokemon!');
