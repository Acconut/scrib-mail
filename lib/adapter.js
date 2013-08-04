var nodemailer = require("nodemailer"),
    fmt = require("util").format,
    template = require("fs").readFileSync(__dirname + "/template.html", { encoding: "utf8" });

function formater(msg) {
    
    return {
        subject: fmt("Log: %s (%s) [%s]", msg.id, msg.priority, msg.category),
        html: fmt(template, msg.id, msg.category, msg.priority, new Date(msg.time).toGMTString(), JSON.stringify(msg.data, null, 4))
    };
    
}

/**
 * @param {Object} logger The Scrib object
 * @param {Object] config Configuration object
 * @param {Array|String} config.to Address(es) to send the mail to
 * @param {Object} config.from Config object for nodemailer (https://github.com/andris9/Nodemailer#setting-up-smtp)
 * @param {Function} config.filter Filter function
 * @param {Function} config.format Formater
 * @param {Function} callback Callback
 */
function Adapter(logger, config, callback) {
    
    if(!config.to || !config.from) return callback(new Error("`to` and/or `from` field is abset"));
    
    var to = Array.isArray(config.to) ? config.to : [config.to],
        filter = config.filter || function() { return true; },
        format = config.format || formater,
        transport = nodemailer.createTransport("SMTP", config.from);
    
    logger.on("log", function(m) {
        if(!filter(m)) return;
        
        var mail = format(m);
        mail.to = mail.to || to;
        mail.from = mail.from || config.from.address;
        
        transport.sendMail(mail, function(err, resp) {
            console.log(err, resp);
        });
        
    });
    
    process.nextTick(callback);
    
}

module.exports = Adapter;