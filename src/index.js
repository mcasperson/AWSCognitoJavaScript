import Amplify, {Auth} from 'aws-amplify';

Amplify.configure({
    Auth: {
        // Amazon Cognito Region
        region: 'us-east-1',

        // Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_o9NwDYe4q',

        // Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '4h1rs6on5igul403mu5rui2fsh',

    }
});

async function signIn(username, password, newPassword, success) {
    const user = await Auth.signIn(username, password);
    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        await Auth.completeNewPassword(
            user,
            newPassword
        ).then((user) => {
            success(user);
        }).catch((err) => {
            console.log('ERROR:', err);
        });
    } else {
        success(user);
    }
}

async function callApiGateway(username, password, newPassword) {
    await signIn(username, password, newPassword, (user) => {
        console.log(user);
    });
}