import Amplify, {Auth} from 'aws-amplify';

Amplify.configure({
    Auth: {
        // Amazon Cognito Region
        region: 'us-east-1',

        // Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_o9NwDYe4q',

        // Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: 'gi3jobbdupsil9d955rtc9v6r',

    }
});

async function signIn(username, password, newPassword, success) {
    const user = await Auth.signIn(username, password);
    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        await Auth.completeNewPassword(
            user,
            newPassword
        ).then((user) => {
            callApiGateway(user);
        }).catch((err) => {
            console.log('ERROR:', err);
        });
    } else {
        callApiGateway(user);
    }
}

function callApiGateway(user) {
    console.log(user);
    user.getSession((err, session) => {
        console.log(session);
        console.log(session.accessToken.jwtToken);
        console.log(session.idToken.jwtToken);
    });
}

document.getElementById("login").onclick = () => signIn(
    document.getElementById("username").value,
    document.getElementById("password").value,
    document.getElementById("newpassword").value);