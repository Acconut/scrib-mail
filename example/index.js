var Scrib = require("scrib"),
    logger = new Scrib({
        "../": {
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
        console.log(err);
        
        logger.put("Hello World", { node: "up" }, 4, "HELLO", "Greetings");
    });