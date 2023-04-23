# [SnailURL](https://wesleymcginn.github.io/SnailURL/home.html)
A free-to-use website with which you can create redirect links of various types, including a link that requires a password to redirect, a link that redirects for only some people, and a link that displays a custom HTML message and does not redirect.

### URL Parameters
In a URL, there are often parameters.  For example, if on pretendExampleSite.com you want to set "color" to 5 and "id" to "something", the URL may look something like this: `pretendExampleSite.com/?color=5&id=something`.

The URL parameters for this website go as follows:
| Parameter | What | Example |
| :-: | :-: | :-: |
| m | Message to display | `?m=Hello` |
| r | Redirect link (MUST INCLUDE PROTOCOL) | `?r=https://earth.google.com/web` |
| c | Background color (top) | `?c=#c0ffc0` |
| C | Background color (bottom) | `?C=#00ff00` |
| t | Timed Redirect in seconds | `?t=5` |
| an | Allowed Names | `?an=["bob","joe","nobody"]` |
| ap | Encoded password | `?ap=qr#$$(abb^**@4.2r}..dq` |
| s | Security Token | `?s=557248829011730` |
| script | Javascript code to run with message display | `?script=alert("Hello.")` |

All typable characters are allowed in the url parameter values except for "?", "&", and "=", since these characters are used for discerning where each parameter is located.

### Example:
Suppose you entered this parameter list:
```
?r=https://www.youtube.com/watch%3Fv%3DthOifuHs6eY&t=5&c=springgreen&C=forestgreen&s=557248829011730&an=%5B%22RobotMan%22%2C%22Grey%22%2C%22IamCOMPUTER%22%5D
```
[Try It](https://wesleymcginn.github.io/SnailURL/home.html?r=https://www.youtube.com/watch%3Fv%3DthOifuHs6eY&t=5&c=springgreen&C=forestgreen&s=557248829011730&an=%5B%22RobotMan%22%2C%22Grey%22%2C%22IamCOMPUTER%22%5D)

The SnailURL page would open with a background gradient of spring green to forest green, and an input field to enter your name into would appear with a "Submit" button next to it.  If you had already entered your name into SnailURL before, then your name would already be in the input field.  If you entered "RobotMan", "Grey", or "IamCOMPUTER", you would be redirected to a specific youtube video after a countdown timer of 5 seconds finished.

Currently, the allowed names can be plainly seen in the URL.  Later on, however, this parameter will be encrypted.  Unfortunately, this has not yet been programmed.

### Upcoming Changes:
 - [ ] Enhanced security (encrypted `an` and `ap` parameters),
 - [ ] User-friendly link-generator page,
 - [ ] Even better aesthetics!  (Application of "Snail" from "SnailURL" will be obvious.)
