var config = {}

config.user = process.env.SENDGRID_USR || 'crap';
config.pass = process.env.SENDGRID_PASS || 'moreCrap';

module.exports = config;