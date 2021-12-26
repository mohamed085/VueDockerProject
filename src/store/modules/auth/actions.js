export default {
    async login(context, payload) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let data = JSON.stringify({
            "email": payload.email,
            "password": payload.password
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        const response = await fetch("https://msafr.we-work.pro/api/admin/login", requestOptions);

        const responseData = await response.json();

        if (!responseData.status) {
            const error = new Error('اسم المستخدم او الرقم السري غير صحيح من فضل تاكد من البيانات');
            throw error;
        }


        localStorage.setItem('token', responseData.msg.token)
        localStorage.setItem('id', responseData.msg.id)
        localStorage.setItem('name', responseData.msg.name)
        localStorage.setItem('photo', responseData.msg.photo)

        context.commit('setUser', {
            token: responseData.msg.token,
            userId: responseData.msg.id,
            name: responseData.msg.name,
            photo: responseData.msg.photo,
        })

    },

    tryLogin(context) {
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')
        const name = localStorage.getItem('name')
        const photo = localStorage.getItem('photo')

        if (token && id) {
            context.commit('setUser', {
                token: token,
                userId: id,
                photo: photo,
                name: name
            })
        }
    },

    logout(context) {
        let myHeaders = new Headers();
        const token = localStorage.getItem('token')

        myHeaders.append("authToken", token);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://msafr.we-work.pro/api/auth/admin/logout", requestOptions)
            .then(response => response.json())

        context.commit('setUser', {
            token: null,
            userId: null,
            photo: null,
            name: null
        })
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('name')
        localStorage.removeItem('photo')
    }
}