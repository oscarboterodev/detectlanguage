document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            document.getElementById('loginMessage').innerText = 'Login successful!';
            document.getElementById('detectForm').style.display = 'block';
        } else {
            document.getElementById('loginMessage').innerText = `Error: ${data.error}`;
        }
    } catch (err) {
        document.getElementById('loginMessage').innerText = 'An error occurred.';
    }
});

document.getElementById('detectForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = document.getElementById('text').value;
    const token = localStorage.getItem('token');
    console.log(token)

    try {
        const response = await fetch('/api/language/detect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify({ text }),
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById('detectMessage').innerText = `Detected Language: ${data.language}\nTotal Cost: ${data.totalCost}`;
        } else {
            document.getElementById('detectMessage').innerText = `Error: ${data.error}`;
        }
    } catch (err) {
        document.getElementById('detectMessage').innerText = 'An error occurred.';
    }
});
