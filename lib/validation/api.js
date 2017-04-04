/*jshint laxcomma: true, smarttabs: true, node:true, mocha: true, esnext: true*/
'use strict';
/**
 * Provides api object schema validation
 * @module kingkong/lib/validation/api
 * @author Eric Satterwhite
 * @since 1.0.0
 * @requires joi
 */
var joi = require('joi')
  , pluginSchema = require('./plugin')
  ;

module.exports = joi.object({
    name:               joi.string()
  , request_path:       joi.string().optional()
  , uris:               joi.array().items(joi.string().optional())
  , request_host:       joi.string().when('request_path',{is:joi.empty(), then:joi.optional(), otherwise:joi.optional() })
  , hosts:              joi.array().unique()
  , strip_request_path: joi.boolean()
  , strip_uri:          joi.boolean()
  , preserve_host:      joi.boolean().description('Preserves the original Host header sent by the client, instead of replacing it with the hostname of the upstream_url')
  , upstream_url:       joi.string().required().description("The base target URL that points to your API server, this URL will be used for proxying requests. For example, https://mockbin.com")
  , plugins:            joi.object().unknown().optional()
  , http_if_terminated: joi.boolean()
  , https_only:         joi.boolean()
  , retries:            joi.number()
  , upstream_connect_timeout: joi.number()
  , upstream_read_timeout:    joi.number()
  , upstream_send_timeout:    joi.number()
});
