import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsAuth from 'App/Models/SettingsAuth'
import oauthSignature from 'oauth-signature'
import * as queryString from 'query-string';
import Customer from 'App/Models/Customer'
import randomstring from 'randomstring'
import Env from '@ioc:Adonis/Core/Env'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
// @ts-ignore
import jsSHA from 'jssha/sha1'

export default class TwitterController {

    /**
     * Generate auth token to authenticate customer
     * Using Twitter
     * @param param0 
     * @returns 
     */
    public async redirect({ response }: HttpContextContract) {

        // Get auth settings
        const settings = await SettingsAuth.first()

        // Check if Twitter enabled
        if (settings?.enable_twitter_login) {
            
            // Set Twitter callback url
            const callback_url          = `${ Env.get('APP_URL') }/auth/twitter/callback`

            // Generate Twitter oAuth timestamp
            var   oauth_timestamp       = Math.round(new Date().getTime() / 1000.0)

            // Generate oAuth nonce
            const oauth_nonce           = randomstring.generate(42)

            // Set twitter endpoint
            const endpoint              = 'https://api.twitter.com/oauth/request_token';

            // Set twitter api keys
            const oauth_consumer_key    = settings.twitter_client_id;
            const oauth_consumer_secret = settings.twitter_secret_id;

            // Set all data in variable
            var requiredParameters      = {
                oauth_callback: callback_url,
                oauth_consumer_key,
                oauth_nonce,
                oauth_signature_method: 'HMAC-SHA1',
                oauth_timestamp,
                oauth_version: '1.0'
            };

            const sortString            = requiredParameters => {
                var base_signature_string = 'POST&' + encodeURIComponent(endpoint) + '&';
                var requiredParameterKeys = Object.keys(requiredParameters);
                for (var i = 0; i < requiredParameterKeys.length; i++) {
                if (i == requiredParameterKeys.length - 1) {
                    base_signature_string += encodeURIComponent(
                    requiredParameterKeys[i] +
                        '=' +
                        requiredParameters[requiredParameterKeys[i]]
                    );
                } else {
                    base_signature_string += encodeURIComponent(
                    requiredParameterKeys[i] +
                        '=' +
                        requiredParameters[requiredParameterKeys[i]] +
                        '&'
                    );
                }
                }
                return base_signature_string;
            };

            const sorted_string         = sortString(requiredParameters);

            const signing               = (signature_string, consumer_secret) => {
                let hmac;
                if (
                typeof signature_string !== 'undefined' &&
                signature_string.length > 0
                ) {
                    
                if (
                    typeof consumer_secret !== 'undefined' &&
                    consumer_secret.length > 0
                ) {

                    const secret = encodeURIComponent(consumer_secret) + '&';

                    var shaObj = new jsSHA('SHA-1', 'TEXT', {
                    hmacKey: { value: secret, format: 'TEXT' }
                    });
                    shaObj.update(signature_string);

                    hmac = encodeURIComponent(shaObj.getHash('B64'));
                }
                }
                return hmac;
            };

            const signed                = signing(sorted_string, oauth_consumer_secret);
            
            var data                    = {};
            var config                  = {
                method       : 'post',
                url          : endpoint,
                headers      : {
                Authorization: `OAuth oauth_consumer_key=${ settings.twitter_client_id },oauth_nonce=${oauth_nonce},oauth_signature=${signed},oauth_signature_method="HMAC-SHA1",oauth_timestamp=${oauth_timestamp},oauth_version="1.0",oauth_callback=${callback_url}`,
                'Content-Type': 'application/json'
                },
                data: data
            } as any

            // Send request
            const res                   = await axios(config);

            // Return auth token
            return response.json(res.data)

        } else {

            // Twitter login not enabled
            return response.badRequest()

        }

    }


    /**
     * Handle twitter callback
     * @param param0 
     * @returns 
     */
    public async callback({ request, response, auth }: HttpContextContract) {
        try {

            // Get auth settings
            const settings              = await SettingsAuth.first()
            
            // Get access token
            const access_token          = await axios({
                method       : 'post',
                url          : 'https://api.twitter.com/oauth/access_token',
                headers      : {
                    Authorization: `OAuth oauth_token=${ request.input('oauth_token') },oauth_verifier=${ request.input('oauth_verifier') }`,
                    'Content-Type': 'application/json'
                },
                data         : {}
            })

            // Parse access token
            const parsed                = queryString.parse(access_token.data);

            // Get oAuth token
            const oauth_token           = parsed.oauth_token

            // Get oAuth token secret
            const oauth_token_secret    = parsed.oauth_token_secret

            // Set twitter api keys
            const oauth_consumer_key    = settings?.twitter_client_id;
            const oauth_consumer_secret = settings?.twitter_secret_id;

            // Set request
            const timestamp             = Date.now() / 1000;
            const nonce                 = uuidv4().replace(/-/g, '');

            const params                = {
                include_email         : true,
                oauth_consumer_key    : oauth_consumer_key,
                oauth_nonce           : nonce,
                oauth_signature_method: 'HMAC-SHA1',
                oauth_timestamp       : timestamp,
                oauth_token           : oauth_token,
                oauth_version         : '1.0'
            };

            // Generate request signature
            const signature             = oauthSignature.generate('GET', 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true', params, oauth_consumer_secret, oauth_token_secret)
            
            // Show user profile
            const show_user             = await axios({
                method       : 'get',
                url          : `https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true`,
                headers      : {
                    Authorization: `OAuth oauth_consumer_key=${ settings?.twitter_client_id },oauth_nonce=${nonce},oauth_signature=${signature},oauth_signature_method="HMAC-SHA1",oauth_timestamp=${timestamp},oauth_version="1.0",oauth_token=${oauth_token}`,
                    'Content-Type': 'application/json'
                },
                data         : {}
            })

            // Create new customer
            const customer              = await this.create(show_user.data)

            // Generate token
            const token                 = await auth.use('api').generate(customer, { expiresIn: '7days', ip_address: request.ip() })

            // Return token
            return response.json(token.toJSON())

        } catch (error) {
            
            // Something went wrong
            console.log(error)

            // Return
            return response.badRequest(error)

        }
    }


    /**
     * Get or create new customer
     * @param profile 
     * @returns 
     */
     public async create(profile) {

        // Create new customer
        const customer = await Customer.firstOrCreate(
            {
                provider_name: 'twitter',
                provider_id  : profile.id
            },
            {
                uid          : randomstring.generate(32),
                username     : `${ profile.screen_name }_${ randomstring.generate({ length: 4, charset: 'numeric' }) }`,
                email        : profile.email,
                is_verified  : true
            }
        )

        // Return customer
        return customer

    }

}
