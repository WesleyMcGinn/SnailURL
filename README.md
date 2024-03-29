# [SnailURL](https://wesleymcginn.github.io/SnailURL/redirect.html)
A free-to-use website with which you can create redirect links of various types, including:
 - A link that requires a password to redirect
 - A link that redirects for only certain people
 - A link that displays a custom HTML message and does not redirect
 - A link that has a countdown timer before redirecting
 - A link that shows a message before redirecting

### Why Would I Want To Use This?  One Example:
You want to send a link to your friends, but you only want your friends to have access to the link.  You also want your friends to know not to click the green button on the website, but you only want them to get this information if they decide to click the link you sent them.

With SnailURL, this can be easily accomplished!  You can have your friends click a SnailURL link that takes them to a page where they must enter their name to proceed (or not), making other people unable to access the link.  They are then shown your message about not clicking the green button, while a countdown timer below the message states that "you will be redirected to [link] in [countdown] seconds".  If they finish reading your message early, they can click the "Go Now" button to skip the timer.  If they don't want to visit the link, they can click "Cancel", closing the tab.

### URL Parameters
In a URL, there are often parameters.  For example, if on pretendExampleSite.com you want to set `color` to `5` and `id` to `"something"`, the URL may look something like this: `pretendExampleSite.com/?color=5&id=something`.

The URL parameters for SnailURL work like this:


| Parameter | What It Is | Example |
| :-: | :-: | :-: |
| m | Message to display (in HTML format) | `?m=Hello` |
| r | Redirect link (MUST INCLUDE PROTOCOL) | `?r=https://earth.google.com/web` |
| c | Background color (top of gradient) | `?c=#c0ffc0` |
| C | Background color (bottom of gradient) | `?C=aquamarine` |
| t | Timed Redirect in seconds | `?t=5` |
| an | List of Allowed Names (Will redirect to link for these people, but not others.) | `?an=["bob","joe","nobody"]` |
| ap | Password (This will be made more secure later) | `?ap=qr$$(abb^**@4.2r}..dq` |
| script | Javascript code to run with message display | `?script=alert("Hello.")` |


Almost all typable characters are allowed in the url parameter values except for "?", "&", and "=", since these characters are used for discerning where each parameter is located.  A UI will be available soon to make it easier to create these links, but for now you can use URL encoding for strange characters. (exaple: "]" = "%5D")

### Example:
Suppose you entered this parameter list:
```
?r=https://www.youtube.com/watch%3Fv%3DthOifuHs6eY&t=5&c=springgreen&C=forestgreen&an=%5B%22Joe%22%2C%22Smith%22%2C%22IamCOMPUTER%22%5D
```
[Try It](https://wesleymcginn.github.io/SnailURL/redirect.html?r=https://www.youtube.com/watch%3Fv%3DthOifuHs6eY&t=5&c=springgreen&C=forestgreen&an=%5B%22Joe%22%2C%22Smith%22%2C%22IamCOMPUTER%22%5D)

The SnailURL page would open with a background gradient of spring green to forest green, and an input field to enter your name into would appear with a "Submit" button next to it.  If you had already entered your name into SnailURL before, then your name would already be in the input field.  If you entered "Joe", "Smith", or "IamCOMPUTER", you would be redirected to a specific youtube video after a countdown timer of 5 seconds finished.

Currently, the allowed names can be plainly seen in the URL.  Later on, however, this parameter will be encrypted.  Unfortunately, this has not yet been programmed.

### Upcoming Changes:
 - Enhanced security (encrypted `an` and `ap` parameters),
 - User-friendly link-generator page,
 - Even better aesthetics!  (Application of "Snail" from "SnailURL" will be obvious.)
