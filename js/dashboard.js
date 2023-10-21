const URL = 'http://localhost:5000/api'

let categories = [
   "",
   "🏠 Housing",
   "🚗 Transportation",
   "🍔 Food",
   "🎬 Entertainment",
   "🏥 Health",
   "👕 Clothing",
   "🎓 Education",
   "💸 Debt",
   "📝 Taxes",
   "✈️ Travel",
   "📦 Others",
   "💰 Personal Income",
   "🏢 Business Income",
   "💼 Investment Income",
   "📈 Passive Income",
   "🎲 Gambling/Lottery Winnings",
   "❓ Other"
]

function ConstructTransactionsBody(data) {
   const tr = document.createElement('tr')

   const th1 = document.createElement('th')
   th1.setAttribute('scope' , 'col')
   th1.innerHTML = 'Description'

   const th2 = document.createElement('th')
   th2.setAttribute('scope' , 'col')
   th2.innerHTML = 'Value'

   const th3 = document.createElement('th')
   th3.setAttribute('scope' , 'col')
   th3.innerHTML = 'Date'

   const th4 = document.createElement('th')
   th4.setAttribute('scope' , 'col')
   th4.innerHTML = 'Category'

   const th5 = document.createElement('th')
   th5.setAttribute('scope' , 'col')
   th5.innerHTML = 'Modify'
         
   const th6 = document.createElement('th')
   th6.setAttribute('scope' , 'col')
   th6.innerHTML = 'Delete'

   tr.appendChild(th1)
   tr.appendChild(th2)
   tr.appendChild(th3)
   tr.appendChild(th4)
   tr.appendChild(th5)
   tr.appendChild(th6)

   if (thead && tbody) {
      thead.appendChild(tr)
   } else {
      console.log('Elementos <thead> e/ou <tbody> não encontrados.')
   }

   data.transaction.forEach(t => {
      const tr = document.createElement('tr')
      
      if (t.category < 12) {
         tr.className = 'expenses'
      } else {
         tr.className = 'income'
      }
      
      tr.id = 'transaction' + t.id

      const td = document.createElement('td')
      td.style = 'width: 18rem;'

      const td1 = document.createElement('td')
      const description = document.createElement('h4')
      description.innerHTML = t.description

      const td2 = document.createElement('td')
      const value = document.createElement('p')
      // value.innerHTML = parseFloat(t.value).toLocaleString('pt-BR', {
      //    style: 'currency',
      //    currency: 'BRL'
      // })
      value.innerHTML = parseFloat(t.value).toLocaleString('en-US', {
         style: 'currency',
         currency: 'USD'
      })

      const td3 = document.createElement('td')
      const date = document.createElement('p')
      const rawDate = new Date(1+t.date)
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      //date.innerHTML = rawDate.toLocaleDateString('pt-BR')
      date.innerHTML = rawDate.toLocaleDateString('en-US', options)

      const td4 = document.createElement('td')
      const category = document.createElement('p')
      category.innerHTML = categories[t.category]
      
      const td5 = document.createElement('td')
      const button = document.createElement('button')
      button.innerHTML = '✏️'
      button.id = t.id
      button.type = 'button'
      if (t.category < 12) {
         button.className = 'expenses'
      } else {
         button.className = 'income'
      }
      button.setAttribute('data-bs-toggle' , 'modal')
      button.setAttribute('data-bs-target' , '#modalCadastro')
      button.setAttribute("onclick","GetOneTransaction(this)")

      const td6 = document.createElement('td')
      const btn_delete = document.createElement('button')
      btn_delete.innerHTML = '❌'
      btn_delete.id = t.id
      btn_delete.type = 'button'
      if (t.category < 12) {
         btn_delete.className = 'expenses'
      } else {
         btn_delete.className = 'income'
      }
      btn_delete.setAttribute("onclick","DeleteOne(this)")

      td1.appendChild(description)
      td2.appendChild(value)
      td3.appendChild(date)
      td4.appendChild(category)
      td5.appendChild(button)
      td6.appendChild(btn_delete)

      tr.appendChild(td1)
      tr.appendChild(td2)
      tr.appendChild(td3)
      tr.appendChild(td4)
      tr.appendChild(td5)
      tr.appendChild(td6)
      tbody.appendChild(tr)
   })
}
function ClearForm() {
   document.getElementById('id').value = ''
   if(description)
   document.getElementById('description').value = ''
   if(value)
   document.getElementById('value').value = ''
   document.getElementById('type').value = 'E'
   if(date)
   document.getElementById('date').value = ''
   document.getElementById('category').value = 1
}

function openPopup() {
   document.getElementById('popup').style.display = 'block'
}
function closePopup() {
   document.getElementById('popup').style.display = 'none'
   ClearForm()
}

function GetAllTransactions() {
   const thead = document.getElementById('thead')
   const tbody = document.getElementById('tbody')

   fetch(URL + '/Transaction/', {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': localStorage.getItem('Authorization'),
         'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
      }
   })
   .then(response => {
      return response.json()
   })
   .then(data => {
      ConstructTransactionsBody(data)
   })
   .catch(error => {
      console.log('[ERROR]:', error)
      alert('[ERROR]:' + error)
   })
}
function GetAllIncomeTransactions() {
   const resumo = document.getElementById('resumo2')

   fetch(URL + '/Transaction/Income', {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': localStorage.getItem('Authorization')
      }
   })
   .then(response => {
      return response.json()
   })
   .then(data => {
      const h1 = document.createElement('h1')
      h1.className = 'income'

      let income = 0
      // console.log(data)

      data.transaction.forEach(t => {
         income += t.value
      })

      h1.innerHTML = parseFloat(income).toLocaleString('en-US', {
         style: 'currency',
         currency: 'USD'
      })
      resumo.appendChild(h1)
   })
   .catch(error => {
      console.log('[ERROR]:', error)
      alert('[ERROR]:' + error)
   })
}
function GetAllExpenseTransactions() {
   const resumo = document.getElementById('resumo2')

   fetch(URL + '/Transaction/Expenses', {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': localStorage.getItem('Authorization')
      }
   })
   .then(response => {
      return response.json()
   })
   .then(data => {
      const h1 = document.createElement('h1')
      h1.className = 'expenses'

      let expenses = 0
      // console.log(data)

      data.transaction.forEach(t => {
         expenses += t.value
      })

      h1.innerHTML = parseFloat(expenses).toLocaleString('en-US', {
         style: 'currency',
         currency: 'USD'
      })
      resumo.appendChild(h1)
   })
   .catch(error => {
      console.log('[ERROR]:', error)
      alert('[ERROR]:' + error)
   })
}

function GetOneTransaction(t) {
   // console.log(t.id)

   if (!t.id) {
      console.log("Warning: The id field is empty")
      alert("Warning: The id field is empty")
      return
   }

   fetch(URL + `/Transaction/${t.id}`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': localStorage.getItem('Authorization')
      }
   })
   .then(response => { 
      return response.json()
   })
   .then(response => {
      // console.log(response)
      // console.log('->'+response.transaction[0].id+'<-')
      // console.log('->'+response.transaction[0].description+'<-')
      // console.log('->'+response.transaction[0].value+'<-')
      // console.log('->'+response.transaction[0].date+'<-')
      // console.log('->'+response.transaction[0].type+'<-')
      // console.log('->'+response.transaction[0].category+'<-')

      id = response.transaction[0].id
      description = response.transaction[0].description
      value = response.transaction[0].value
      date = response.transaction[0].date
      type = response.transaction[0].type
      category = response.transaction[0].category

      document.getElementById('id').value = id
      if(description)
      document.getElementById('description').value = description
      if(value)
      document.getElementById('value').value = value
      document.getElementById('type').value = type
      if(date)
      document.getElementById('date').value = date
      document.getElementById('category').value = category
   })
   .catch(error => {
      console.log('[ERROR]:', error)
      alert('[ERROR]:' + error)
   })
   openPopup()
}

function CreateTransaction(){
   const idInput = document.getElementById('id')
   const descriptionInput = document.getElementById('description')
   const valueInput = document.getElementById('value')
   const typeInput = document.getElementById('type')
   const dateInput = document.getElementById('date')
   const categoryInput = document.getElementById('category')
   
   const id = idInput.value
   const description = descriptionInput.value
   const value = valueInput.value
   const type = typeInput.value
   const date = dateInput.value
   const category = categoryInput.value

   if (!description) {
      console.log("Warning: The description field is empty")
      alert("Warning: The description field is empty")
      return
   }
   if (!value) {
      console.log("Warning: The value field is empty")
      alert("Warning: The value field is empty")
      return
   }
   if (!date) {
      console.log("Warning: The date field is empty")
      alert("Warning: The date field is empty")
      return
   }
   
   if(!id) {
      fetch(URL + '/Transaction/', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization')
         },
         body: JSON.stringify({
            "description": description,
            "value": value,
            "type": type,
            "date": date,
            "fkCategory": category
         })
      })
      .then(response => {
         return response.json()
      })
      .then(response => {
         console.log(response)
         window.location.replace('dashboard.html')
      })
      .catch(error => {
         console.log('[ERROR]:', error)
         alert('[ERROR]:' + error)
      })
   } else {
      fetch(URL + '/Transaction/', {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization')
         },
         body: JSON.stringify({
            "transactionID": id,
            "description": description,
            "value": value,
            "type": type,
            "date": date,
            "fkCategory": category
         })
      })
      .then(response => {
         return response.json()
      })
      .then(response => {
         console.log(response)
         window.location.replace('dashboard.html')         
      })
      .catch(error => {
         console.log('[ERROR]:', error)
         alert('[ERROR]:' + error)
      })
   }
   closePopup()
}
function DeleteOne(t) {
   // console.log(t.id)

   if (!t.id) {
      console.log("Warning: The id field is empty")
      alert("Warning: The id field is empty")
      return
   }
   
   fetch(URL + `/Transaction/${t.id}`, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': localStorage.getItem('Authorization'),
      }
   })
   .then(response => {
      console.log(response)
      if(response.status != 200){
         alert(response.message)
      }
      else{
         window.location.replace('dashboard.html')
      }
   })
   .catch(error => {
      console.log('[ERROR]:', error)
      alert('[ERROR]:' + error)
   })
}

GetAllTransactions()
GetAllIncomeTransactions()
GetAllExpenseTransactions()