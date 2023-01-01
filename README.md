# ShareX Image Hosting
Setup an ready-to-use ShareX file hoster on Replit!

You only need to do a few steps before it's up and running!

## 1) Set an API_KEY
The file host needs to verify that it's you trying to upload an file, so this uses "API keys" to do that.

All you need to do is [generate a UUID](https://www.uuidgenerator.net/), and put it in the `API_KEY` secret.

![generated UUID](https://i.haroon.repl.co/📝🕹️🟢🪢🫓.png) ![putting UUID in secrets](https://i.haroon.repl.co/🐜🖨️🥉🇻🇮🅾️.png)

## 2) Setup ShareX with your image host
If you've used other image hosts on ShareX, you know it won't automatically understand a new image host. So, you have to set it up yourself.

Start by opening the ShareX menu, `Destinations` and then `Custom uploader settings`.

Create a new custom uploader, and name it whatever you want. I'll name it "Replit", to keep things easy.

Set your `Destination type` to `Image uploader` and `File uploader`

At this point, you should run the Repl, to see your Repl's hosted URL.

![hosted URL](https://i.haroon.repl.co/⚕️🦛⛷️🖇️😼.png)

Take your hosted URL (in my case, `https://i.haroon.repl.co/`), and put it in the `Request URL` section, with an `/upload` at the end (`https://i.haroon.repl.co/upload`)

You're halfway done! Now, add a new "Header" called `Authorization`. In its value, put the `API_KEY`/UUID you generated!

Then, set the "File form name" to `image`, and the "URL:" to `{response}`.

Congrats, you've made a custom uploader! To make sure it works, change your Image uploader and File uploader (bottom-left of the window) to your custom uploader's name.

## (Optional if you haven't done this before) 
## 3) Set your "After capture" and "After upload" settings
By default, ShareX won't upload or copy a URL to clipboard once it has the image/file. You should change your ShareX After capture and After upload settings to do this.

### After capture
Open the ShareX menu, and hover over `After capture tasks`. Choose for it to "Upload image to host".

### After upload
While still in the ShareX menu, hover over "After upload tasks". Choose for it to "Copy URL to clipboard".

Everything should now be setup and you can now happily share files :smile: