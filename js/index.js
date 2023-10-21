const URL = 'http://localhost:5000/api'

function Login() {
   const docAlert = document.getElementById('alert')
   const emailInput = document.getElementById('email')
   const passwordInput = document.getElementById('password')

   const email = emailInput.value
   const password = passwordInput.value

   if (!email) {
      console.log("Aviso: O campo de e-mail está vazio")
      alert("Aviso: O campo de e-mail está vazio")
      return
   }
   if (!password) {
      console.log("Aviso: O campo de senha está vazio")
      alert("Aviso: O campo de senha está vazio")
      return
   }
   // console.log(email, password)

   fetch(URL + '/User/login', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
      },
      body: JSON.stringify({
         "email":  email,
         "password": password })
   })
   .then(response => {
      if (response.ok) {
         return response.json()
      } else {
         throw new Error('Request failed with status ' + response.status)
      }
   })
   .then(data => {
      console.log(data.res.token)

      localStorage.setItem('Authorization', data.res.token)
      console.log('Token Index = ' + localStorage.getItem('Authorization'))
      window.location.replace('index.html')
   })
   .catch(error => {
      console.log('[ERROR]:', error)
      alert('[ERROR]:', error)
   })
}