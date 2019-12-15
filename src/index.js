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

async function signIn(username, password) {
    const user = await Auth.signIn(username, password);
    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {

        initiallogin.style.display = "none";
        changepassword.style.display = "";

        changepass.onclick = async () => {
            await Auth.completeNewPassword(
                user,
                newpassword.value
            ).then((user) => {
                callApiGateway(user);
            });
        };
    } else {
        callApiGateway(user);
    }
}

function callApiGateway(user) {
    initiallogin.style.display = "none";
    changepassword.style.display = "none";
    results.style.display = "";

    user.getSession((err, session) => {
        accessToken.value = session.accessToken.jwtToken;
        idToken.value = session.idToken.jwtToken;
    });
}

login.onclick = () => signIn(username.value, password.value);