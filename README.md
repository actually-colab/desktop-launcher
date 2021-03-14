# desktop-launcher

[![Validation](https://github.com/actually-colab/desktop-launcher/actions/workflows/validation.yml/badge.svg)](https://github.com/actually-colab/desktop-launcher/actions/workflows/validation.yml) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/actually-colab/desktop-launcher.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/actually-colab/desktop-launcher/context:javascript) [![Lines of Code](https://tokei.rs/b1/github/actually-colab/desktop-launcher)](https://github.com/actually-colab/desktop-launcher)

### The Kernel Gateway

This process is started by the kernel hidden renderer process and communicates with the main process via IPC.

```bash
jupyter kernelgateway --KernelGatewayApp.allow_origin="*" --KernelGatewayApp.allow_headers="content-type" --KernelGatewayApp.allow_methods="*"
```

> Setting the CORS Access-Control-Allow-Origin to `*` is generally a bad practice for security reasons. This will allow any website or malicious agent to execute code against your machine if they know what to look for. Instead, use the following origins depending on if you are in development or production:
>
> - Development: `http://localhost:4000`
> - Production: `https://app.actuallycolab.org`

## Starting Development

```bash
yarn start
```

## Debugging Prod

To run the production package with devtools and a visible kernel window:

```bash
yarn cross-env DEBUG_PROD=true yarn package
```

## Packaging for Production

To package apps for the local platform:

```bash
yarn package
```

## Docs

See [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)
