You can create table in supabase, and then get the credential such as host, db, username, password.

After that you can create table using this query below:
```
CREATE TABLE Sale(
   trans_hash TEXT
   seller_address TEXT
   buyer_address TEXT
   tokenId BIGINT
   collectionId BIGINT
   quantity NUMERIC
   amount DOUBLE PRECISION
);
```

Then you can copy your credential and add it to .env file, and it'll looks like this.
```
PGHOST=db.xxxxxxxx.supabase.co
PGDATABASE=postgres
PGPORT=5432
PGUSER=postgres
PGPASSWORD=xxxxxxxxxx
```

And then you can run the app to subscribe the event and record it to db.
Development
```
yarn dev
```
Production
```
yarn build
yarn start
```

If you want to use postgraphile you can follow this url: https://www.graphile.org/postgraphile/usage-cli/
Don't forget to change the configuration in .postgraphilerc.js to match your credential.
Then you can run this command:
```
postgraphile
```


Screenshots:
https://drive.google.com/file/d/1ygNiay9gFcMQp5hzaXzFW5e7wMjjVh0L/view?usp=sharing
https://drive.google.com/file/d/1tGOYt_BYourep-CyzyasQkRE1DR70FP-/view?usp=sharing
