const URL = 'http://localhost:5000/api'

function CreateUser() {
   const nameInput = document.getElementById('name')
   const lastNameInput = document.getElementById('lastName')
   const emailInput = document.getElementById('email')
   const passwordInput = document.getElementById('password')

   const name = nameInput.value
   const lastName = lastNameInput.value
   const email = emailInput.value
   const password = passwordInput.value

   if (!name) {
      console.log("Aviso: O campo de nome está vazio")
      alert("Aviso: O campo de nome está vazio")
      return
   }
   if (!lastName) {
      console.log("Aviso: O campo de sobrenome está vazio")
      alert("Aviso: O campo de sobrenome está vazio")
      return
   }
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
   // console.log(name, lastName, email, password)
   
   fetch(URL + '/User/register', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
      },
      body: JSON.stringify({
         "name": name,
         "lastName": lastName,
         "email": email,
         "password": password
      })
   })
   .then(response => {
      if(response.status != 200) {
         alert(response.message)
      }
      else {
         alert('Usuário criado com sucesso!')
         window.location.replace('index.html')
      }
   })
   .catch(error => {
      console.log('[ERROR]:', error)
      alert('[ERROR]:', error)
   })
}