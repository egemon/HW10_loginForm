function init(){
	loginApp = {
		loginForm : document.getElementById('login-form'),
		inputName : document.getElementById('inputName'),
		inputPass : document.getElementById('inputPass'),
		signBtn : document.getElementById('signBtn'),
		checkBox : document.getElementById('checkbox-box'),
		inputAuthority : '',
		
		title : document.getElementById('title'),
		users : [],

		bindEvents : function  () {
			
			loginApp.loginForm.addEventListener('submit',function  (event) {
				event.preventDefault();
				var user = loginApp.getUser();
				loginApp.addUser(user);
				loginApp.checkUser(user);
			})	
		},

		userConstructer : function  (id, name, pass, authority ) {
			this.id = id;
			this.name = name;
			this.pass = pass;
			this.authority = authority;
		},

		getUser : function () {
			var user = new loginApp.userConstructer(1, '', '', 'admin');
			return user;
		},

		checkUser : function  (user) {
			if (loginApp.inputName.value == user.name && loginApp.inputPass.value == user.pass) {
				loginApp.loginForm.removeChild(loginApp.loginForm.childNodes[5]);
				switch(user.authority) {
				 		case 'admin':
				 			loginApp.adminPanel();
				 			// loginApp.showAllUsers();
				 			break;
				 		default:
				 			loginApp.showStartPage(user);
				 			break;
				 } 	
			}
			else{
				loginApp.showErrorMessage(user);
			 };
		},

		adminPanel: function  () {
			loginApp.title.innerHTML = "Enter NEW user is, name, pass, authority:";
			var inputIDGroup = loginApp.loginForm.childNodes[1].cloneNode(true);
			inputIDGroup.childNodes[1].innerHTML = 'ID';
			inputIDGroup.childNodes[1].setAttribute('for','Id')
			var inputId = inputIDGroup.childNodes[3].childNodes[1];
			inputId.setAttribute('id','inputId');
			inputId.setAttribute('placeholder','ID');
			loginApp.loginForm.insertBefore(inputIDGroup, loginApp.loginForm.childNodes[1]);
			loginApp.inputId = inputId;
			
			var inputAuthorityGroup = loginApp.loginForm.childNodes[1].cloneNode(true);
			inputAuthorityGroup.childNodes[1].innerHTML = 'Authority';
			inputAuthorityGroup.childNodes[3].removeChild(inputAuthorityGroup.childNodes[3].childNodes[1]);
			inputAuthorityGroup.childNodes[3].innerHTML = "<select> <option>admin</option> <option>user</option> </select>";
			loginApp.loginForm.insertBefore(inputAuthorityGroup, loginApp.loginForm.childNodes[5]);			
			loginApp.inputAuthority = inputAuthorityGroup.childNodes[3].childNodes[0];
			
			
			var addUserBtn = document.createElement('a');
			var showAllUsersBtn = document.createElement('a');
			addUserBtn.setAttribute('class','btn btn-primary');
			addUserBtn.setAttribute('is','addUserBtn');
			addUserBtn.innerHTML = "Add User";
			addUserBtn.style.marginRight='10px';
			loginApp.signBtn.parentNode.appendChild(addUserBtn);
			addUserBtn.addEventListener('click', function  () {
				
				var id = loginApp.inputId.value; // почему я не могу обратиться к loginApp.inpuId.value ??
				var name = loginApp.inputName.value;
				var pass = loginApp.inputPass.value;
				var authority = loginApp.inputAuthority.value;
				var user = new loginApp.userConstructer(id, name, pass, authority)
				loginApp.addUser(user);

			} )

			showAllUsersBtn.setAttribute('class','btn btn-primary');
			showAllUsersBtn.setAttribute('is','showAllUsersBtn');
			showAllUsersBtn.innerHTML = "Show All Users";
			loginApp.signBtn.parentNode.appendChild(showAllUsersBtn);
			showAllUsersBtn.addEventListener('click',loginApp.showAllUsers)

			loginApp.signBtn.parentNode.removeChild(loginApp.signBtn);
		},

		addUser : function  (user) {
				loginApp.users.push(user);
		},

		showAllUsers : function  () {
			loginApp.loginForm.parentNode.removeChild(loginApp.loginForm);
			loginApp.title.innerHTML = "All owr users:";
			var panel = document.querySelector('.panel-body');
			var usersTabel = document.createElement('table');
			var tbody = document.createElement('tbody');
			var thead = document.createElement('thead');
			var tr = document.createElement('tr');
			
			var td1 = document.createElement('td');
			var td2 = document.createElement('td');
			var td3 = document.createElement('td');
			var td4 = document.createElement('td');

			td1.innerHTML = 'ID';
			td2.innerHTML = 'User Name';
			td3.innerHTML = 'User Pass';
			td4.innerHTML = 'User Authority';

			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			thead.appendChild(tr);
			usersTabel.appendChild(thead)

			usersTabel.setAttribute('class','table table-bordered .table-condensed .table-hover');
			
			for (var i = 0; i < loginApp.users.length; i++) {
				var tableRow =  document.createElement('tr');
				
				for (var key in loginApp.users[i]) {
					var tableData = document.createElement('td');
					tableData.innerHTML =loginApp.users[i][key];
					tableRow.appendChild(tableData);
				};

				tbody.appendChild(tableRow);
			};

			usersTabel.appendChild(tbody);
			panel.appendChild(usersTabel);
			var backToAddUserBtn = document.createElement('a');
			backToAddUserBtn.setAttribute('class','btn btn-primary');
			backToAddUserBtn.innerHTML = 'Back to adding';
			backToAddUserBtn.addEventListener('click',function  () {
				panel.removeChild(usersTabel);
				panel.removeChild(backToAddUserBtn);
				panel.removeChild(backToLoginBtn);
				panel.appendChild(loginApp.loginForm);
			})
			panel.appendChild(backToAddUserBtn);

			var backToLoginBtn = document.createElement('a');
			backToLoginBtn.setAttribute('class','btn btn-primary');
			backToLoginBtn.innerHTML = 'Back to Login';
			backToLoginBtn.style.marginLeft = '10px';
			backToLoginBtn.addEventListener('click',function  () {
				panel.removeChild(usersTabel);
				panel.removeChild(backToLoginBtn);
				panel.removeChild(backToAddUserBtn);
				// var iID = document.getElementById('#inpuId');
				// console.log(iID.parentNode);
				// console.log(iID.parentNode.parentNode);
				// loginApp.loginForm.removeChild(loginApp.inpuId.parentNode.parentNode);
				// loginApp.loginForm.removeChild(loginApp.inputAuthority.parentNode.parentNode);
				// loginApp.loginForm.insertAfter(loginApp.checkBox,loginApp.inputPass.parentNode.parentNode);
				panel.appendChild(loginApp.loginForm);
				loginApp.bindEvents();


			})
			panel.appendChild(backToLoginBtn);


		},

		showStartPage : function  () {
			loginApp.loginForm.parentNode.removeChild(loginApp.loginForm);
		},

		showErrorMessage : function  () {
			
		}

	};
loginApp.bindEvents();
	






};

window.addEventListener('load',init);

