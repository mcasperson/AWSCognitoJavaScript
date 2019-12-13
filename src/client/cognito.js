const Amplify = window['aws-amplify'];

Amplify.configure({
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

        // REQUIRED - Amazon Cognito Region
        region: 'us-east-1',
    }
});

function signIn(usernme, password) {
    Amplify.Auth.signIn({
        username, // Required, the username
        password, // Optional, the password
    })
        .then(user => console.log(user))
        .catch(err => console.log(err));
}