<img src="https://raw.githubusercontent.com/actually-colab/graphics/master/header/header.png" width="100%">

[![Validation](https://github.com/actually-colab/desktop-launcher/actions/workflows/validation.yml/badge.svg)](https://github.com/actually-colab/desktop-launcher/actions/workflows/validation.yml) ![GitHub](https://img.shields.io/github/license/actually-colab/desktop-launcher) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/actually-colab/desktop-launcher.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/actually-colab/desktop-launcher/context:javascript) ![GitHub repo size](https://img.shields.io/github/repo-size/actually-colab/desktop-launcher) [![Lines of Code](https://tokei.rs/b1/github/actually-colab/desktop-launcher)](https://github.com/actually-colab/desktop-launcher)

[![Open Collective](https://opencollective.com/actuallycolab/tiers/badge.svg)](https://opencollective.com/actuallycolab) [![Patreon](https://img.shields.io/badge/Patreon-F96854?style=flat&logo=patreon&logoColor=white)](https://www.patreon.com/actuallycolab) [![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=flat&logo=youtube&logoColor=white)](https://www.youtube.com/watch?v=ParNlHsbSrY) [![HackIllinois](https://img.shields.io/badge/HackIllinois%201st%20place%20🏆-0A3E54?style=flat&logo=dev.to&logoColor=white)](https://devpost.com/software/actually-colab-real-time-collaborative-jupyter-editor)

# desktop-launcher

### The Kernel

This process is started by the kernel hidden renderer process and communicates with the main process via IPC. Normally this is taken care of for you if you are using the desktop companion, but you may prefer to launch it manually if you run into issues or we don't support your platform.

#### Starting the Kernel Manually

```bash
jupyter notebook --NotebookApp.open_browser="False" --NotebookApp.allow_origin="*" --NotebookApp.token="CHOOSE A TOKEN VALUE"
```

> Setting the CORS Access-Control-Allow-Origin to `*` is generally a bad practice for security reasons. This will allow any website or malicious agent to execute code against your machine if they know what to look for. Instead, use the following origins depending on if you are in development or production:
>
> - Development: `http://localhost:4000`
> - Production: `https://app.actuallycolab.org`
>
> Similarly, you should choose a secure value for the token to make sure malicious clients can't connect to execute code

#### Stopping the Kernel

Run the following command to stop the kernel process:

```bash
jupyter notebook stop
```

If the kernel is running on a port other than the default `8888`, you can add the port to the end of the command.

To get a list of running ports you can run the following:

```bash
jupyter notebook list
```

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

To package apps for all platforms:

```bash
yarn package:all
```

To notarize on macOS you need to create a file `macos.cred.sh` at the root of the project:

```bash
#!/bin/bash
export CI="true"
export APPLE_ID="email goes here"
export APPLE_ID_PASS="password goes here"
```

You may need an app specific password which you can generate on the AppleID webpage.

Then run the following command:

```bash
yarn package:notarize
```

## Docs

See [docs and guides here](https://docs.actuallycolab.org)

## Backers

Support us with monthly donations to help us continue development and keep the service free for all!

<a href="https://opencollective.com/actuallycolab/backer/0/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/1/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/2/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/3/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/4/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/5/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/6/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/7/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/8/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/9/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/10/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/11/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/12/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/13/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/14/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/15/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/16/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/17/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/18/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/19/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/20/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/21/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/22/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/23/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/24/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/25/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/26/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/27/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/28/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/backer/29/website" target="_blank"><img src="https://opencollective.com/actuallycolab/backer/29/avatar.svg"></a>

## Sponsors

Become a sponsor and we'll add your logo to our README and link to you on our website!

<a href="https://opencollective.com/actuallycolab/sponsor/0/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/1/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/2/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/3/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/4/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/5/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/6/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/7/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/8/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/9/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/10/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/11/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/12/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/13/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/14/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/15/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/16/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/17/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/18/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/19/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/20/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/21/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/22/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/23/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/24/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/25/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/26/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/27/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/28/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/actuallycolab/sponsor/29/website" target="_blank"><img src="https://opencollective.com/actuallycolab/sponsor/29/avatar.svg"></a>

## Maintainers

- [Jeff Taylor-Chang](https://github.com/jtaylorchang)
- [Bailey Tincher](https://github.com/baileytincher)

## License

`@actually-colab/desktop-launcher` is [BSD-3-Clause licensed](./LICENSE)
