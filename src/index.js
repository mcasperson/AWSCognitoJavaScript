import Amplify, {Auth} from 'aws-amplify';

/*
    Configure the Amplify library with the details required to access a Cognito user pool
 */
var urlParams = new URLSearchParams(window.location.search);
Amplify.configure({
    Auth: {
        // Amazon Cognito Region
        region: 'us-east-1',

        // Amazon Cognito User Pool ID
        userPoolId: urlParams.get('poolId'),

        // Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: urlParams.get('appId'),

    }
});

/**
 * Attempt the initial login of a Cognito user. This may result in a password change
 * form being displayed if required. Once logged in, the id and access tokens will
 * be displayed.
 * @param username The Cognito username
 * @param password The Cognito password
 */
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
                displayTokens(user);
            });
        };
    } else {
        displayTokens(user);
    }
}

/**
 * Display the id and access tokens from the logged in Cognito user
 * @param user The CognitoUser returned as a result of a successful login
 */
function displayTokens(user) {
    initiallogin.style.display = "none";
    changepassword.style.display = "none";
    results.style.display = "";

    user.getSession((err, session) => {
        accessToken.value = session.accessToken.jwtToken;
        idToken.value = session.idToken.jwtToken;

        fetch(urlParams.get('invokeURL') + "/test", {headers: {'Authorization': session.idToken.jwtToken}})
            .then(response => response.text())
            .then(text => apiCall.value = text);
    });
}

/*
    Attach an event handler to the login click event
 */
login.onclick = () => signIn(username.value, password.value);