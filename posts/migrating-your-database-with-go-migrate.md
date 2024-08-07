---
title: 'Migrating your database with Go Migrate'
date: '2023-09-26T09:00:00.000Z'
description: 'Tips for database migrations using Migrate'
thumbnail: '/img/blog/thumbnail10.png'
---

# Migrating your database with Go migrate

Database migrations can be executed seamlessly using the Migrate tool. This allows developers to track and apply changes to their databases over time while ensuring consistency in the application's database schema.

You can install Go migrate at https://github.com/golang-migrate/migrate.

To get started, first, create a new migration file using the `migrate create` command, specify the file extension as SQL, and provide the directory path and a timestamp format for the new file:

```bash
migrate create -ext sql -dir meta/migrations/ -format "20060102150405"
```

To set up a connection to your database, use the `export` command to set an environment variable (`MY_DATABASE` in this case) with your database's connection string. Here, we are connecting to a MySQL database:

```bash
export MY_DATABASE='mysql://root:password@tcp/mydatabase'
```

If your database is in a Kubernetes pod, you can create a port forwarding rule to make it accessible locally:

```bash
kubectl port-forward svc/mariadb 3306:3306
```

Now, you can check your current migration version using:

```bash
migrate -database $MY_DATABASE -path meta/migrations version
```

In case your migration's state becomes out of sync, you can force a migration to a particular version using the `force` command in Migrate:

```bash
migrate -database $MY_DATABASE -path meta/migrations force 20230719122330
```

If you wish to roll back the last migration (i.e., go down one level), use the `down` command:

```bash
migrate -database $MY_DATABASE -path meta/migrations down 1
```

To apply the migrations (i.e., go up), use the `up` command:

```bash
migrate -database $MY_DATABASE -path meta/migrations up 1
```

If you wish to apply all migrations, simply drop the number: 

```bash
migrate -database $MY_DATABASE -path meta/migrations up
```
