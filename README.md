# Hi There!
This is a Cloudflare Workers project that builds a linktree-style website by pulling links from a simple 'API'.


## Router

Selects the logic to respond to requests based on the `request` method and URL. Can be used with REST APIs or apps that require basic routing logic.

[`index.js`](https://github.com/cloudflare/worker-template-router/blob/master/index.js) is the content of the Workers script.

Live Demos are hosted on `workers-tooling.cf/demos/router`:
[Demo /bar](http://workers-tooling.cf/demos/router/bar) | [Demo /foo](http://workers-tooling.cf/demos/router/foo)

#### Wrangler

You can use [wrangler](https://github.com/cloudflare/wrangler) to generate a new Cloudflare Workers project based on this template by running the following command from your terminal:

```
wrangler generate myapp https://github.com/cloudflare/worker-template-router
```

Before publishing your code you need to edit `wrangler.toml` file and add your Cloudflare `account_id` - more information about publishing your code can be found [in the documentation](https://workers.cloudflare.com/docs/quickstart/configuring-and-publishing/).

Once you are ready, you can publish your code by running the following command:

```
wrangler publish
```

to test the app locally, run the following command in the root directory:

```
wrangler dev
```

#### Serverless

To deploy using serverless add a [`serverless.yml`](https://serverless.com/framework/docs/providers/cloudflare/) file.
