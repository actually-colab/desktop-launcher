# desktop

![Commit Validation](https://github.com/actually-colab/desktop-launcher/workflows/Commit%20Validation/badge.svg) ![PR Validation](https://github.com/actually-colab/desktop-launcher/workflows/PR%20Validation/badge.svg) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/actually-colab/desktop-launcher.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/actually-colab/desktop-launcher/context:javascript) [![Lines of Code](https://tokei.rs/b1/github/actually-colab/desktop-launcher)](https://github.com/actually-colab/desktop-launcher)

### The Kernel Gateway

This process is started by the kernel hidden renderer process and communicates with the main process via IPC.

```bash
jupyter kernelgateway --KernelGatewayApp.allow_origin="*" --KernelGatewayApp.allow_headers="content-type"
```

This will automatically pull the latest client (assuming proper directory structure), install and build it, remove it from `desktop` and add it back. This complicated process seems to be required from an issue where `yarn install` doesn't pick up the latest build of the local package.

## Starting Development

1. Start the website locally to sign in (see: `www` repo)
2. Start the app in the `dev` environment:

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
