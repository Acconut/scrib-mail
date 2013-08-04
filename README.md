Scrib-mail
===

An adapter for [Scrib](https://github.com/Acconut/scrib) to notify you about your logs using mails.

Example
---
```
npm install Acconut/scrib-mail
```
```javascript
var Scrib = require("scrib"),
    logger = new Scrib({
        "mail": {
            to: "hans.meier@goodmail.org",
            from: {
                host: "mail.mysite.com",
                auth: {
                    user: "logger",
                    pass: "password"
                },
                address: "Logger <logger@mysite.com>"
            }
        }
    }, function(err) {
        if(err) throw err;
        
        logger.put("Hello World", { node: "up" }, 4, "HELLO", "Greetings");
    });
```

This example will send you an e-mail to hans.meier@goodmail.org which was sent from logger@mysite.com.

Options
---

* `to`: A single e-mail address or an array containing them where to send the mails
* `from`: A object to set up SMTP ([see here](https://github.com/andris9/Nodemailer#setting-up-smtp))
* `from.address`: The e-mail address which sends the mail
* `format = null`: A function which formats the mail ([see code](https://github.com/Acconut/scrib-mail/blob/master/lib/adapter.js#L5-L12))

Testing
---

Currently there is no testing available because it requires a mailserver.

Licensed under [the MIT License](https://raw.github.com/Acconut/scrib/master/LICENSE).